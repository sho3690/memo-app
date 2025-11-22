import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Memo } from '../types/memo';
import { summarizeText } from '../utils/memoUtils';

interface Props {
  memo: Memo;
  onPress?: () => void;
  onToggleStar?: () => void;
}

const MemoCard: React.FC<Props> = ({ memo, onPress, onToggleStar }) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{new Date(memo.created_at).toLocaleString()}</Text>
        <Pressable onPress={onToggleStar} hitSlop={8}>
          <Text style={[styles.star, memo.is_starred && styles.starred]}>{memo.is_starred ? '★' : '☆'}</Text>
        </Pressable>
      </View>
      <Text style={styles.text}>{summarizeText(memo.text)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  star: {
    fontSize: 20,
    color: '#ccc',
  },
  starred: {
    color: '#f5a623',
  },
  text: {
    color: '#111',
    fontSize: 16,
  },
});

export default MemoCard;
