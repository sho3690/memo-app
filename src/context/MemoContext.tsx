import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Memo } from '../types/memo';
import { memoStorage } from '../storage/memoStorage';
import { v4 as uuidv4 } from 'uuid';

// Context API keeps setup light-weight for MVP while still enabling
// shared state across screens without extra dependencies.
type MemoContextValue = {
  memos: Memo[];
  draft: string;
  setDraft: (text: string) => void;
  addMemo: (text: string) => Promise<void>;
  updateMemo: (id: string, text: string) => Promise<void>;
  deleteMemo: (id: string) => Promise<void>;
  toggleStar: (id: string) => Promise<void>;
  getMemoById: (id: string) => Memo | undefined;
};

const MemoContext = createContext<MemoContextValue | undefined>(undefined);

export const useMemoContext = () => {
  const ctx = useContext(MemoContext);
  if (!ctx) throw new Error('MemoContext missing');
  return ctx;
};

export const MemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [draft, setDraftState] = useState('');

  useEffect(() => {
    (async () => {
      const loaded = await memoStorage.loadMemos();
      setMemos(loaded);
      const draftText = await memoStorage.loadDraft();
      setDraftState(draftText);
    })();
  }, []);

  useEffect(() => {
    memoStorage.saveMemos(memos);
  }, [memos]);

  useEffect(() => {
    memoStorage.saveDraft(draft);
  }, [draft]);

  const setDraft = (text: string) => setDraftState(text);

  const addMemo = async (text: string) => {
    const now = new Date().toISOString();
    const newMemo: Memo = {
      id: uuidv4(),
      text,
      created_at: now,
      updated_at: now,
      tags: [],
      is_starred: false,
      is_pinned: false,
      location: { lat: null, lng: null },
    };
    setMemos((prev) => [newMemo, ...prev]);
    await memoStorage.clearDraft();
    setDraftState('');
  };

  const updateMemo = async (id: string, text: string) => {
    const now = new Date().toISOString();
    setMemos((prev) =>
      prev.map((memo) => (memo.id === id ? { ...memo, text, updated_at: now } : memo))
    );
  };

  const deleteMemo = async (id: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  const toggleStar = async (id: string) => {
    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === id
          ? { ...memo, is_starred: !memo.is_starred, updated_at: new Date().toISOString() }
          : memo
      )
    );
  };

  const getMemoById = (id: string) => memos.find((memo) => memo.id === id);

  const value = useMemo(
    () => ({ memos, draft, setDraft, addMemo, updateMemo, deleteMemo, toggleStar, getMemoById }),
    [memos, draft]
  );

  return <MemoContext.Provider value={value}>{children}</MemoContext.Provider>;
};
