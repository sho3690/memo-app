import React, { useMemo, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useMemoContext } from '../context/MemoContext';

const DetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const navigation = useNavigation();
  const { getMemoById, toggleStar, updateMemo, deleteMemo } = useMemoContext();
  const memo = useMemo(() => getMemoById(route.params.id), [getMemoById, route.params.id]);
  const [editingText, setEditingText] = useState(memo?.text ?? '');
  const [isEditing, setIsEditing] = useState(false);

  if (!memo) {
    return (
      <View style={styles.container}>
        <Text>メモが見つかりませんでした。</Text>
      </View>
    );
  }

  const handleSave = async () => {
    await updateMemo(memo.id, editingText);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    Alert.alert('削除しますか？', 'この操作は取り消せません', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除',
        style: 'destructive',
        onPress: async () => {
          await deleteMemo(memo.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Text style={styles.dateLabel}>作成: {new Date(memo.created_at).toLocaleString()}</Text>
        <Button title={memo.is_starred ? '★ ON' : '☆ OFF'} onPress={() => toggleStar(memo.id)} />
      </View>
      <Text style={styles.dateLabel}>更新: {new Date(memo.updated_at).toLocaleString()}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editingText}
          onChangeText={setEditingText}
          multiline
          textAlignVertical="top"
        />
      ) : (
        <Text style={styles.body}>{memo.text}</Text>
      )}
      <View style={styles.actions}>
        {isEditing ? (
          <Button title="保存" onPress={handleSave} disabled={!editingText.trim()} />
        ) : (
          <Button title="編集" onPress={() => setIsEditing(true)} />
        )}
        <Button title="削除" color="#d9534f" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    color: '#666',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  input: {
    minHeight: 200,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});

export default DetailScreen;
