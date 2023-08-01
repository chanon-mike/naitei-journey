# 内定 Journey

就活管理アプリ

この作品は技育 CAMP のマンスリーハッカソンで作成し、技育展に登壇します

## Installation

Frontend install package

```
cd frontend
npm install
```

Running docker locally

```
docker-compose up -d --build
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
