import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定 (MVP)</Text>
      <Text>アプリバージョン: 1.0.0</Text>
      <Text style={styles.note}>将来的なバックアップ、テーマ設定の置き場所として拡張予定。</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  note: {
    color: '#666',
    marginTop: 8,
  },
});

export default SettingsScreen;
