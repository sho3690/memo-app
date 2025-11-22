import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PeriodFilter } from '../types/memo';

type Props = {
  period: PeriodFilter;
  onChange: (value: PeriodFilter) => void;
  starredOnly: boolean;
  onToggleStarred: () => void;
};

const FilterChips: React.FC<Props> = ({ period, onChange, starredOnly, onToggleStarred }) => {
  const renderChip = (value: PeriodFilter, label: string) => (
    <Pressable
      key={value}
      onPress={() => onChange(value)}
      style={[styles.chip, period === value && styles.chipActive]}
    >
      <Text style={[styles.chipText, period === value && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>{['today', 'week', 'all'].map((value) => renderChip(value as PeriodFilter, labelMap[value as PeriodFilter]))}</View>
      <Pressable onPress={onToggleStarred} style={[styles.chip, starredOnly && styles.chipActive]}>
        <Text style={[styles.chipText, starredOnly && styles.chipTextActive]}>★スターのみ</Text>
      </Pressable>
    </View>
  );
};

const labelMap: Record<PeriodFilter, string> = {
  today: '今日',
  week: '今週',
  all: 'すべて',
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 16,
  },
  chipActive: {
    backgroundColor: '#111',
  },
  chipText: {
    color: '#444',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FilterChips;
