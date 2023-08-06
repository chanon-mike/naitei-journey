# API 仕様書

## 選考情報作成 API

### リクエスト

```
POST /job
```

### リクエストボディ

```
{
  "job": {
    "category_id": "65b75720-2dc6-41bf-8a95-672704d70033",
    "card_position": 1,
    "company_name": "A社",
    "company_industry": "IT",
    "occupation": "エンジニア",
    "ranking": "A",
    "is_internship": true,
    "internship_duration": "1ヶ月",
    "internship_start_date": "2023-09-01",
    "internship_end_date": "2023-10-01",
    "url": "https://companyA.com",
    "description": "TLorem ipsum dolor sit amet."
  },
  "application_status": {
    "status": "Webテスト",
    "process": "結果待ち",
    "date": "2023-08-15"
  },
  "selection_flows": [
    {
      "step": 1,
      "process": "ES"
    },
    {
      "step": 2,
      "process": "Webテスト"
    },
    {
      "step": 3,
      "process": "1次面接"
    }
  ]
}
```

### レスポンス

```
{
  "message": "Successfully created job data"
}
```

## 選考情報変更 API

### リクエスト

```
PUT /job/:job_id
```

### リクエストボディ

```
{
  "job": {
    "category_id": 1,
    "card_position": 1,
    "company_name": "B社",
    "company_industry": "IT",
    "occupation": "エンジニア",
    "ranking": "S",
    "is_internship": true,
    "internship_duration": "1 日",
    "internship_start_date": "2023-09-01",
    "internship_end_date": "2023-09-02",
    "url": "https://companyB.com",
    "description": "Lorem ipsum dolor sit amet."
  },
  "application_status": {
    "job_id": 1,
    "status": "1次面接",
    "process": "結果待ち",
    "date": "2023-08-18"
  },
  "selection_flows": [
    {
        "id": 1,
        "job_id": 1,
        "step": 1,
        "process": "ES"
    },
    {
        "id": 2,
        "job_id": 1,
        "step": 2,
        "process": "Webテスト"
    },
    {
        "id": 3,
        "job_id": 1,
        "step": 3,
        "process": "1次面接"
    }
  ]
}
```

### レスポンス

```
{
  "message": "Successfully created job data"
}
```
