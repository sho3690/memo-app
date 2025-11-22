import { Memo, PeriodFilter } from '../types/memo';

export const isToday = (date: Date) => {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

export const isThisWeek = (date: Date) => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return date >= start && date < end;
};

export const filterByPeriod = (memos: Memo[], period: PeriodFilter): Memo[] => {
  switch (period) {
    case 'today':
      return memos.filter((memo) => isToday(new Date(memo.created_at)));
    case 'week':
      return memos.filter((memo) => isThisWeek(new Date(memo.created_at)));
    default:
      return memos;
  }
};

export const groupMemosByDate = (memos: Memo[]): { title: string; data: Memo[] }[] => {
  const grouped: Record<string, Memo[]> = {};
  memos.forEach((memo) => {
    const date = new Date(memo.created_at);
    const key = date.toISOString().split('T')[0];
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(memo);
  });

  return Object.keys(grouped)
    .sort((a, b) => (a > b ? -1 : 1))
    .map((title) => ({ title, data: grouped[title].sort((a, b) => (a.created_at > b.created_at ? -1 : 1)) }));
};

export const summarizeText = (text: string, maxLength = 120) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
};
