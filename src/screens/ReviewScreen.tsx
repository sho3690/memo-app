import React, { useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useMemoContext } from '../context/MemoContext';
import MemoCard from '../components/MemoCard';
import { filterByPeriod, groupMemosByDate } from '../utils/memoUtils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const tabs = [
  { key: 'today', label: '今日' },
  { key: 'week', label: '今週' },
];

const ReviewScreen: React.FC = () => {
  const { memos, toggleStar } = useMemoContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');

  const filtered = useMemo(() => filterByPeriod(memos, activeTab === 'today' ? 'today' : 'week'), [memos, activeTab]);
  const sections = useMemo(() => groupMemosByDate(filtered), [filtered]);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key as 'today' | 'week')}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </Pressable>
        ))}
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
        ListEmptyComponent={<Text style={styles.empty}>まだメモがありません</Text>}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f8f8' },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#555',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
    color: '#444',
  },
  empty: {
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
  content: {
    paddingBottom: 32,
  },
});

export default ReviewScreen;
