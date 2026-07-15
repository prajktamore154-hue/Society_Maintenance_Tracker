# API Documentation

## Authentication

### Register Resident

POST /api/auth/register

Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "flatNumber": "A-101"
}
```

---

### Login

POST /api/auth/login

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Complaints

### Create Complaint

POST /api/complaints

Form Data

- title
- description
- category
- image

---

### Get Resident Complaints

GET

```
/api/complaints/my
```

---

### Get All Complaints (Admin)

GET

```
/api/complaints/all
```

---

### Update Complaint

PUT

```
/api/complaints/status/:id
```

```json
{
  "status":"Resolved",
  "priority":"High",
  "assignedTo":"Plumber"
}
```

---

## Notice

### Create Notice

POST

```
/api/notices
```

```json
{
"title":"Water Supply",
"description":"Water will be unavailable from 9AM to 2PM.",
"important":true
}
```

---

### Get Notices

GET

```
/api/notices
```

---

### Delete Notice

DELETE

```
/api/notices/:id
```