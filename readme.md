# Structure-oriented to-do list API
An Express and TypeScript application with focus on structural parts (such as usage of layered architecture, logger, etc.) of an API, rather than functional parts.

# Documentation

## GET `/` - Healthcheck
Check whether the API is running

### Success example
```json
HTTP/1.1 200 OK

"To-do list TypeScript app"
```

## POST `/tasks` - Create task
Create one new task

### Request body
- **body** (required, String) - Description or details of the task
- **deadline** (optional, Date) - Task deadline

### Request body example
```json
{
	"body": "Complete API docs",
	"deadline": "2022-12-08"
}
```

### Success example
```json
HTTP/1.1 200 OK

{
	"body": "Complete API docs",
	"deadline": "2022-12-08T00:00:00.000Z",
	"_id": "638f80eadf4d6b087719cc0c",
	"createdAt": "2022-12-06T17:50:34.295Z",
	"updatedAt": "2022-12-06T17:50:34.295Z"
}
```

## GET `/tasks` - Get many tasks
Get a list of tasks

### Query parameters
- **sort[createdAt]** (optional, String ("asc" or "desc")) - Sort by task creation date s
- **sort[deadline]** (optional, String ("asc" or "desc")) - Sort by task deadlines
- **sort[completed]** (optional, String ("asc" or "desc")) - Sort by task completion dates
- **filter[body]** (optional, String) - Text that must be included in the task bodies
- **filter[createdAt][start]** (optional, Date) - Lower bound of task creation dates
- **filter[createdAt][end]** (optional, Date) - Upper bound of task creation dates
- **filter[deadline][start]** (optional, Date) - Lower bound of task deadlines
- **filter[deadline][end]** (optional, Date) - Upper bound of task deadlines
- **filter[completed][start]** (optional, Date) - Lower bound of task completion dates
- **filter[completed][end]** (optional, Date) - Upper bound of task completion dates
- **skip** (optional, Number) - Number of tasks to skip
- **limit** (optional, Number) - Maximum number of tasks to return

### Request URL example
```
/tasks/?sort[createdAt]=desc&sort[deadline]=asc&filter[deadline][start]=2022-10-28&filter[deadline][end]=2023-10-29&filter[body]=o&skip=1&limit=2
```

### Success example
```json
HTTP/1.1 200 OK

[
	{
		"_id": "638f80eadf4d6b087719cc0c",
		"body": "Complete API docs",
		"deadline": "2022-12-08T00:00:00.000Z",
		"createdAt": "2022-12-06T17:50:34.295Z",
		"updatedAt": "2022-12-06T17:50:34.295Z"
	},
	{
		"_id": "6359790b7d7456d42773d400",
		"body": "The quick brown fox",
		"deadline": "2022-11-05T00:00:00.000Z",
		"createdAt": "2022-10-26T18:14:35.244Z",
		"updatedAt": "2022-10-26T18:14:35.244Z"
	}
]
```

## DELETE `/tasks/:taskId` - Delete task
Delete one task by its ID

### Parameters
- **taskId** (required, ObjectId) - Task ID

### Request URL example
```
/tasks/6359788211ec4cf2b0fc099c
```

### Success example
```json
HTTP/1.1 200 OK

{
	"_id": "6359788211ec4cf2b0fc099c",
	"body": "The quick brown fox",
	"deadline": "2022-11-05T00:00:00.000Z",
	"createdAt": "2022-10-26T18:12:18.240Z",
	"updatedAt": "2022-10-26T18:12:18.240Z"
}
```

## PATCH `/tasks/:taskId` - Update task
Update one task by its ID

### Parameters
- **taskId** (required, ObjectId) - Task ID

### Request URL example
```
/tasks/638f80eadf4d6b087719cc0c
```

### Request body
- **body** (required, String) - Description or details of the task
- **deadline** (optional, Date) - Task deadline

### Request body example
```json
{
	"body": "Dolor sit",
	"deadline": "2022-12-09"
}
```

### Success example
```json
HTTP/1.1 200 OK

{
	"_id": "638f80eadf4d6b087719cc0c",
	"body": "Dolor sit",
	"deadline": "2022-12-09T00:00:00.000Z",
	"createdAt": "2022-12-06T17:50:34.295Z",
	"updatedAt": "2022-12-07T11:03:06.791Z"
}
```

## PATCH `/tasks/:taskId/complete` - Complete task
Complete one task by its ID

### Parameters
- **taskId** (required, ObjectId) - Task ID

### Request URL example
```
/tasks/638f80eadf4d6b087719cc0c/complete
```

### Success example
```json
HTTP/1.1 200 OK

{
	"_id": "638f80eadf4d6b087719cc0c",
	"body": "Dolor sit",
	"deadline": "2022-12-09T00:00:00.000Z",
	"createdAt": "2022-12-06T17:50:34.295Z",
	"updatedAt": "2022-12-07T11:03:49.707Z",
	"completed": "2022-12-07T11:03:49.706Z"
}
```