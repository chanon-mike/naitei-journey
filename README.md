# 内定 Journey

内定Journeyとは就活状況を一括管理できるツールです! まずは、アカウントを作り、ボードにアクセスしましょう。

URL: https://naitei-journey.vercel.app/

この作品は技育 CAMP のマンスリーハッカソンで作成し、技育展に登壇します。

![image](https://github.com/chanon-mike/naitei-journey/assets/27944646/288c3564-905e-47af-acb1-885e9ae79890)

## ローカル環境構築

ローカル環境変数を追加し、.env.example を.env にコピーし、環境に合わせて編集します。

### バックエンド

```bash
# Backend
cp backend/.env.example backend/.env
```

```
POSTGRES_SERVER=naitei-journey-postgres-1:5432
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=app

CORS_ORIGIN=http://localhost:3000

AUTH0_DOMAIN=AUTH0_DOMAIN
AUTH0_AUDIENCE=AUTH0_AUDIENCE
```

### フロントエンド

```bash
# Frontend
cp frontend/.env.example frontend/.env
```

```
AUTH0_SECRET=KEY-VALUE
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://AUTH0-DOMAIN
AUTH0_CLIENT_ID=AUTH0-CLIENT-ID
AUTH0_CLIENT_SECRET=AUTH0-CLIENT-SECRET
AUTH0_AUDIENCE=AUTH-API-IDENTIFIER

NEXT_PUBLIC_API_ENDPOINT=http://localhost:8000
```

パッケージのインストール

```bash
cd frontend
npm install
```

### アプリを起動

ルートディレクトリからローカルで docker を実行する

```bash
docker-compose up -d --build
```

サーバーの依存関係を更新した場合は、以下のコマンドを実行してコンテナ内の依存関係を更新する必要がある

```bash
docker-compose down
docker-compose up -d --build
```

データベースが変更される場合、以下のコマンドを実行してデータベースを更新する必要がある

```bash
# モデルの変更
cd /backend/app/db/
# マイグレーションを作成した場合のみ
alembic revision --autogenerate -m '変更内容'
# マイグレーションを行う
alembic upgrade head
```

### フロントエンドのバグ

現在、フロントエンドが Docker で起動できないバグがあります。そのため、Docker のコンテイナーをストップしてから、フロントエンドはローカルで起動してください。

```bash
cd frontend
npm run dev
```

## ER 図

```mermaid
erDiagram
  User {
    string auth0Id PK
    string name
    string email UK
    datetime createdAt
  }
  Category {
    int id PK
    string type "インターンシップ｜本選考"
    string name "気になる｜選考中｜内定｜不通過"
    int userId FK
  }
  Job {
    int id PK
    int categoryId FK
    int cardPosition
    string companyName
    string companyIndustry
    string occupation
    string ranking "S｜A｜B｜C｜D"
    boolean isInternship
    string internshipDuration "日｜週｜月"
    date internshipStartDate "yyyy-mm-dd"
    date internshipEndDate "yyyy-mm-dd"
    string url
    string description
  }
  ApplicationStatus {
    int id PK
    int jobId FK
    string status "ES｜Webテスト｜1次面接｜2次面接｜3次面接｜最終面接｜その他（自由）"
    string process "未完了｜調整中｜結果待ち"
    date date "yyyy-mm-dd"
  }
  SelectionFlow {
    int id PK
    int jobId FK
    string process "ES｜Webテスト｜1次面接｜2次面接｜3次面接｜最終面接｜その他（自由）"
    int step
  }

  User ||--|{ Category: "has 4"
  Category ||--o{ Job: "contains"
  Job ||--|| ApplicationStatus: "has"
  Job ||--o{ SelectionFlow: "has"
```

## Error

#### フロントエンドとバックエンドを Docker で起動した際に、フロントエンドからバックエンドにリクエストを送ると、以下のエラーが発生する

```
Error: fetch failed localhost
```

これは、フロントエンドの Docker コンテナからバックエンドの Docker コンテナにリクエストを送る際に、問題が発生している。

```
docker ps
docker inspect コンテナID | grep IPAddress
```

参考：https://qiita.com/ryuichi1208/items/2a2e0e2b2f1d3e2b2a2e

#### フロントエンドからバックエンドにリクエストを送る際に、Request Timed Out が発生する

この場合はフロントエンドの Docker をストップして、ローカルから`npm run dev`を行うと解決する
