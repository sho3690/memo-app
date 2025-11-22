import React, { useMemo, useState } from 'react';
import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMemoContext } from '../context/MemoContext';
import MemoCard from '../components/MemoCard';
import { filterByPeriod, groupMemosByDate } from '../utils/memoUtils';
import FilterChips from '../components/FilterChips';
import { PeriodFilter } from '../types/memo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const TimelineScreen: React.FC = () => {
  const { memos, toggleStar } = useMemoContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState<PeriodFilter>('all');
  const [starredOnly, setStarredOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = filterByPeriod(memos, period);
    if (query.trim()) {
      result = result.filter((memo) => memo.text.toLowerCase().includes(query.toLowerCase()));
    }
    if (starredOnly) {
      result = result.filter((memo) => memo.is_starred);
    }
    return result.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  }, [memos, period, query, starredOnly]);

  const sections = useMemo(() => groupMemosByDate(filtered), [filtered]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="キーワード検索"
          style={styles.searchInput}
        />
        <FilterChips
          period={period}
          onChange={setPeriod}
          starredOnly={starredOnly}
          onToggleStarred={() => setStarredOnly((prev) => !prev)}
        />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
        renderItem={({ item }) => (
          <MemoCard
            memo={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            onToggleStar={() => toggleStar(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>メモがありません</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
    color: '#444',
  },
  listContent: {
    paddingBottom: 32,
  },
  empty: {
    color: '#666',
    marginTop: 24,
    textAlign: 'center',
  },
});

export default TimelineScreen;
