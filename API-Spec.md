# RESTful API: PostgreSQL, Nest.js, TypeORM

## Connect

Endpoint: POST /api/connect
Request Body:

```json
{
  "host": "localhost",
  "username": "didapatria",
  "password": "admin123",
  "database": "QueryBrowser"
}
```

Response Body (Success):

```json
{
  "message": "Connection Successful!!",
  "name": "Connected",
  "status": true
}
```

Response Body (Failed):

```json
{
  "errors": error.message,
  "message": "Connection Failed!",
  "name": "Not Connected",
  "status": false
}
```

## Query

Endpoint: POST /api/query
Headers:

```json
{
  "Connect": status
}
```

Request Body:

```json
{
  "query": "select * from some_table"
}
```

Response Body (Success):

```json
{
  "data": {
    "result": {
      "columns": ["column1", "column2", "column3"],
      "rows": [
        ["value1", "value2", "value3"],
        ["value1", "value2", "value3"]
      ],
      "total": 2
    }
  }
}
```

Response Body (Failed):

```json
{
  "errors": error.message
}
```

## Result

Endpoint: GET /api/result
Headers:

```json
{
  "Connect": status,
  "Query": query
}
```

Query Params:

```json
{
  "table": "table_name",
  "page": 1,
  "per_page": 10,
  "sort": "id",
  "order": "asc",
  "filter": {
    "id": 1,
    "name": "name"
  },
  "join": {
    "table": "table_name",
    "on": "table_name.id = table_name.id"
  },
  "select": "id, name"
}
```

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "result": {
        "columns": ["column1", "column2", "column3"],
        "rows": [
          ["value1", "value2", "value3"],
          ["value1", "value2", "value3"]
        ],
        "total": 2
      }
    },
    {
      "id": 2,
      "result": {
        "columns": ["column1", "column2", "column3"],
        "rows": [
          ["value1", "value2", "value3"],
          ["value1", "value2", "value3"]
        ],
        "total": 2
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 10,
    "total_data": 100,
    "per_page": 10,
    "next_page": 2,
    "prev_page": 0,
    "first_page": 1,
    "last_page": 10,
    "size": 10
  }
}
```

Response Body (Failed):

```json
{
  "errors": error.message
}
```
