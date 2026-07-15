# Database Schema

## User

| Field | Type |
|-------|------|
| name | String |
| email | String |
| password | String |
| flatNumber | String |
| role | Resident/Admin |

---

## Complaint

| Field | Type |
|-------|------|
| title | String |
| description | String |
| category | String |
| priority | Low/Medium/High |
| assignedTo | String |
| status | Pending/In Progress/Resolved |
| image | String |
| resident | ObjectId(User) |
| history | Array |
| createdAt | Date |

---

## Notice

| Field | Type |
|-------|------|
| title | String |
| description | String |
| important | Boolean |
| createdAt | Date |