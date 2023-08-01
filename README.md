# 内定 Journey

就活管理アプリ

この作品は技育 CAMP のマンスリーハッカソンで作成し、技育展に登壇します

## Installation

Add local environment variable, copy .env.exaaample to .env and edit it based on your environment.

Backend

```
# Backend
$ cp backend/.env.example backend/.env
```

```
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=app

CORS_ORIGIN=http://localhost:3000

AUTH0_DOMAIN=AUTH0_DOMAIN
AUTH0_AUDIENCE=AUTH0_AUDIENCE
```

Frontend

```
# Frontend
$ cp frontend/.env.example frontend/.env
```

```
AUTH0_SECRET=KEY-VALUE
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://AUTH0-DOMAIN
AUTH0_CLIENT_ID=AUTH0-CLIENT-ID
AUTH0_CLIENT_SECRET=AUTH0-CLIENT-SECRET
```

Frontend install package

```
$ cd frontend
$ npm install
```

Running docker locally from root directory

```
$ docker-compose up -d --build
```

When server dependencies are updated, build docker again using above command.

## ER 図

```mermaid
erDiagram
  User {
    int id
    string auth0Id UK
    string name
    string email UK
    datetime createdAt
  }
  Category {
    int id
    string name "気になる, 選考中, 内定, 不通過"
    int userId FK
  }
  Job {
    int id
    int categoryId FK
    string companyName
    string companyIndustry
    string position
    string ranking "S,A,B,C,D"
    boolean isInternship
    int internshipDuration "day"
    datetime internshipDate "yyyy-mm-dd"
    string url
    string description
    datetime createdAt
  }
  ApplicationStatus {
    int id
    int jobId FK
    string status "ES, Webテスト, 1次面接, 2次面接, 3次面接, 最終面接, その他（自由）"
    string process "未完了, 調整中, 結果待ち"
    datetime date "yyyy-mm-dd"
  }
  SelectionFlow {
    int id
    int jobId FK
    string step "ES, Webテスト, 1次面接, 2次面接, 3次面接, 最終面接, その他（自由）"
  }

  User ||--|{ Category: "has 4"
  Category ||--o{ Job: "contains"
  Job ||--|| ApplicationStatus: "has"
  Job ||--o{ SelectionFlow: "has"
```
