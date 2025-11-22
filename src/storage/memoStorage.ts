import AsyncStorage from '@react-native-async-storage/async-storage';
import { Memo } from '../types/memo';

const STORAGE_KEY = 'memo_app_memos';
const DRAFT_KEY = 'memo_app_draft';

// AsyncStorage is chosen over SQLite for MVP to minimize setup/friction
// and keep the installation light while still providing persistence.
export const memoStorage = {
  async loadMemos(): Promise<Memo[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Memo[]) : [];
  },
  async saveMemos(memos: Memo[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  },
  async loadDraft(): Promise<string> {
    const raw = await AsyncStorage.getItem(DRAFT_KEY);
    return raw ?? '';
  },
  async saveDraft(text: string): Promise<void> {
    await AsyncStorage.setItem(DRAFT_KEY, text);
  },
  async clearDraft(): Promise<void> {
    await AsyncStorage.removeItem(DRAFT_KEY);
  },
};
