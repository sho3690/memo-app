export type LocationPayload = {
  lat: number | null;
  lng: number | null;
};

export type Memo = {
  id: string;
  text: string;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
  tags: string[];
  is_starred: boolean;
  is_pinned: boolean;
  location?: LocationPayload;
};

export type PeriodFilter = 'today' | 'week' | 'all';
