# Memo App (React Native + Expo)

"日常で思ったことを、2タップ以内の低い摩擦で即メモでき、あとから時系列やタグで振り返れる" コンセプトのMVPです。

## 特徴
- アプリ起動直後にメモ入力画面を表示。テキスト入力→保存の2操作で記録
- 未保存の下書きをAsyncStorageに自動保存し、アプリ再開や画面回転で消えないよう配慮
- 作成/更新日時やスター情報を保持し、タイムライン/振り返りビューで日付ごとにグルーピング
- キーワード検索、期間フィルタ（今日/今週/すべて）、スターのみ表示フィルタ
- 詳細画面での編集・削除、スターON/OFF
- 「今日」「今週」タブでの振り返りビュー、設定プレースホルダー

## 技術スタック
- React Native + TypeScript + Expo
- React Navigation (Stack + Bottom Tabs)
- 状態管理: React Context + Hooks（MVPの軽量さを優先）
- 永続化: AsyncStorage（セットアップが軽く、MVPに適したローカル保存のため）

## セットアップ
```
# 依存関係をインストール
npm install

# Expo 開発サーバー起動
npm run start
# またはプラットフォーム別
npm run ios
npm run android
```

## ディレクトリ構成
```
App.tsx                  # エントリ。Provider + Navigator
src/
  navigation/AppNavigator.tsx
  context/MemoContext.tsx
  storage/memoStorage.ts
  types/memo.ts
  utils/memoUtils.ts
  components/
    MemoCard.tsx
    FilterChips.tsx
  screens/
    HomeScreen.tsx
    TimelineScreen.tsx
    DetailScreen.tsx
    ReviewScreen.tsx
    SettingsScreen.tsx
```

## 主要な実装メモ
- HomeScreen: 起動直後に表示され、TextInputで即入力。下書きをAsyncStorageに保持。直近5件をカード表示。
- TimelineScreen: キーワード検索とフィルタ、日付グループ表示。
- DetailScreen: 本文表示・編集、スター切替、削除。
- ReviewScreen: 「今日」「今週」タブでの簡易振り返り。
- memoStorage: AsyncStorageでメモ一覧と下書きを保存。UUIDでID採番。

## 将来拡張の余地
- 位置情報や自動タグ付けの実装（型フィールドは用意済み）
- ピン留めUI、リマインダー、クラウド同期、テーマ切り替え
- 音声入力はOS標準キーボードのマイクボタンで利用可能。専用ボタン導入も容易。
