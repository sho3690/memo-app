import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMemoContext } from '../context/MemoContext';
import MemoCard from '../components/MemoCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const { memos, addMemo, draft, setDraft, toggleStar } = useMemoContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    if (!draft.trim()) return;
    setIsSaving(true);
    try {
      await addMemo(draft.trim());
    } catch (error) {
      Alert.alert('保存できませんでした', String(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>今、何を考えていますか？</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="ひらめき・気づきをすぐメモ"
          multiline
          value={draft}
          onChangeText={setDraft}
          blurOnSubmit={false}
          returnKeyType="done"
          accessibilityLabel="メモ入力"
          // OSキーボードのマイクボタンで音声入力が利用可能（追加ライブラリ不要）
        />
        <Button title={isSaving ? '保存中...' : '保存'} onPress={handleSave} disabled={!draft.trim() || isSaving} />
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>直近のメモ</Text>
          <Text style={styles.sectionSub}>最大5件を表示</Text>
        </View>
        {memos.slice(0, 5).map((memo) => (
          <MemoCard
            key={memo.id}
            memo={memo}
            onPress={() => navigation.navigate('Detail', { id: memo.id })}
            onToggleStar={() => toggleStar(memo.id)}
          />
        ))}
        {memos.length === 0 && <Text style={styles.empty}>まだメモはありません。すぐに残してみましょう。</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 120,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionSub: {
    color: '#666',
  },
  empty: {
    color: '#666',
    marginTop: 12,
  },
});

export default HomeScreen;
