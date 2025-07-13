# Okusuri v2 移行計画

## 概要

Next.js (App Router) + Better Auth + Tailwind CSS から Vite + React + React Router + TanStack Query + Biome への移行計画

## 現在の技術スタック (okusuri-frontend)

- **フレームワーク**: Next.js 15.3.0 (App Router)
- **認証**: Better Auth 1.2.6
- **スタイリング**: Tailwind CSS 4 + PostCSS
- **UI コンポーネント**: Radix UI, Lucide React
- **アニメーション**: Framer Motion
- **チャート**: Chart.js
- **バリデーション**: Zod
- **通知**: React Hot Toast
- **その他**: date-fns
- **リンター**: Biome

## 新しい技術スタック (okusuri-v2)

- **フレームワーク**: Vite 7.0.4 + React 19.1.0
- **ルーティング**: React Router (追加予定)
- **状態管理/データフェッチ**: TanStack Query (追加予定)
- **リンター/フォーマッター**: Biome (追加予定)
- **スタイリング**: 未定 (Tailwind CSS 推奨)

## 移行手順

### フェーズ 1: 環境セットアップ

1. **依存関係の追加**

   - React Router DOM
   - TanStack Query
   - Biome
   - 認証ライブラリ (Better Auth の代替または API ベース認証)
   - スタイリングライブラリ (Tailwind CSS 推奨)
   - UI コンポーネントライブラリ (Radix UI)

2. **設定ファイルの作成**
   - `biome.json` (リンター/フォーマッター設定)
   - `tailwind.config.js` (スタイリング設定)
   - `tsconfig.json` の調整

### フェーズ 2: プロジェクト構造の設計

```
src/
├── components/
│   ├── ui/           # 再利用可能なUIコンポーネント
│   └── features/     # 機能別コンポーネント
├── pages/            # ページコンポーネント
├── hooks/            # カスタムフック
├── services/         # API呼び出し
├── types/            # TypeScript型定義
├── utils/            # ユーティリティ関数
└── constants/        # 定数
```

### フェーズ 3: 認証システムの移行

1. **認証方式の決定**

   - Better Auth を使い続ける (クライアントサイドで設定)
   - または JWT ベースの認証に移行
   - または Firebase Auth に移行

2. **認証コンテキストの作成**
   - React Context + TanStack Query での認証状態管理
   - ルート保護の実装

### フェーズ 4: ルーティングの移行

1. **React Router の設定**

   - App Router から React Router への移行
   - ネストしたルーティングの実装
   - 動的ルーティングの実装

2. **ページコンポーネントの移行**
   - `/` (ホーム) → `pages/Home.tsx`
   - `/auth` → `pages/Auth.tsx`
   - `/calendar` → `pages/Calendar.tsx`
   - `/profile` → `pages/Profile.tsx`
   - `/setting` → `pages/Setting.tsx`
   - `/stats` → `pages/Stats.tsx`

### フェーズ 5: コンポーネントと UI の移行

1. **UI コンポーネントの移行**

   - `components/ui/` 配下のコンポーネントをそのまま移行
   - Tailwind CSS クラス名の調整（必要に応じて）

2. **機能コンポーネントの移行**
   - `MedicationTracker.tsx`
   - `MedicationCalendar.tsx`
   - `NotificationSettingContent.tsx`
   - チャート関連コンポーネント
   - ナビゲーションコンポーネント

### フェーズ 6: データフェッチングの移行

1. **API 層の移行**

   - 現在の fetcher 関数を TanStack Query のクエリに変換
   - `api/medication-log/fetcher.ts` → `services/medicationLog.ts`
   - `calendar/fetcher.ts` → `services/calendar.ts`
   - `setting/fetcher.ts` → `services/setting.ts`

2. **状態管理の統合**
   - Server Actions から TanStack Query の mutations に移行
   - 楽観的更新の実装
   - キャッシュ戦略の設計

### フェーズ 7: 通知と PWA 機能

1. **Web Push 通知**

   - Service Worker の移行
   - 通知許可の管理
   - バックエンドとの通信

2. **PWA 機能**
   - Manifest ファイルの移行
   - Service Worker の設定
   - オフライン対応

### フェーズ 8: スタイリングとアニメーション

1. **Tailwind CSS の設定**

   - カスタムクラスの移行
   - レスポンシブデザインの確認

2. **アニメーションライブラリ**
   - Framer Motion の移行（必要に応じて）
   - または CSS アニメーションへの変換

### フェーズ 9: テストとビルド設定

1. **テスト環境の構築**

   - Vitest の設定
   - React Testing Library の設定
   - コンポーネントテストの作成

2. **ビルド最適化**
   - Vite ビルド設定の最適化
   - バンドルサイズの最適化
   - 静的アセットの処理

### フェーズ 10: デプロイとモニタリング

1. **デプロイ設定**

   - 静的サイトホスティングの設定
   - 環境変数の管理

2. **モニタリング**
   - エラートラッキング
   - パフォーマンス監視

## 移行時の注意点

### データ互換性

- API エンドポイントの変更が必要な場合の対応
- データベーススキーマの変更の必要性確認

### 認証

- Better Auth のクライアントサイド設定
- セッション管理の方法
- トークンの保存方法

### パフォーマンス

- SSR から SPA への変更による SEO への影響
- 初期ロード時間の最適化
- コード分割の実装

### 互換性

- 既存の Push 通知システムとの互換性
- Service Worker の動作確認
- ブラウザサポートの確認

## マイルストーン

1. **Week 1**: 環境セットアップと基本構造の作成
2. **Week 2**: 認証システムとルーティングの実装
3. **Week 3**: 主要コンポーネントの移行
4. **Week 4**: データフェッチング層の移行
5. **Week 5**: 通知と PWA 機能の実装
6. **Week 6**: テストとパフォーマンス最適化
7. **Week 7**: デプロイと最終調整

## リスク評価

### 高リスク

- 認証システムの移行でセキュリティ問題が発生する可能性
- Push 通知システムの互換性問題

### 中リスク

- パフォーマンスの劣化
- SEO への影響
- データの整合性問題

### 低リスク

- UI コンポーネントの移行
- スタイリングの調整

## 成功指標

- 全機能の正常動作
- パフォーマンスの維持または改善
- セキュリティレベルの維持
- 開発体験の向上
- バンドルサイズの最適化
