# Code Reviwer

---

## 📌 Project Overview

The **Code Reviewer** is a backend API that allows developers and teams to submit code, perform structured reviews, comment inline, track review decisions, and receive real-time notifications. The platform creates a simplified, organized, and asynchronous code review workflow—far more structured than standard GitHub pull request conversations.

It is designed for teams who want a dedicated environment for code review collaboration, reviewer performance insight, and clean workflow tracking.

---

## 🎯 Use-case Scenario

A software team working on multiple repositories wants clearer communication and feedback during code review.

They can use this platform to:

- Upload code snippets or files.
- Assign reviewers to projects.
- Comment inline on specific lines of code.
- Approve or request changes.
- Track submission status and review history.
- Receive real-time notifications.
- View project analytics (review time, approval stats, reviewer activity).

---

## ⭐ Core Features

### 🔐 Authentication & User Management

- Register & Login using JWT
- Profile management

### 📁 Projects

- Create & manage projects
- Add/remove members
- Assign reviewer roles

### 📝 Code Submissions

- Upload code (string/text only)
- Link submissions to a specific project
- Status workflow: `pending`, `in_review`, `approved`, `changes_requested`

### 💬 Comments (Inline + General)

- Add inline comments linked to line numbers
- List/edit/delete comments
- Permission-based commenting (Submitters cannot comment)

### 🧪 Review Workflow

- Approve submissions
- Request changes
- Track review history

### 🔔 Notifications

- Pull notifications via REST
- Real-time updates using WebSockets

### 📊 Analytics / Stats

Project-level insights:

- Average review time
- Approval vs rejection rate
- Reviewer activity ranking
- Submission with most comments

---

## 🛠️ Tech Stack

### **Backend**

- **Node.js** (TypeScript)
- **Express.js**
- **PostgreSQL** (Primary database)
- **pg** Node PostgreSQL client
- **JWT** for authentication
- **bcrypt** for password hashing

### **Development Tools**

- **Nodemon / ts-node-dev**
- **Postman / Thunder Client** for API testing

## 🚀 How to Use the Project (Setup & Running)

### **1. Clone the Repository**

```bash
git clone https://github.com/siyabongamasiya/code-review-platform.git
cd code-review-platform
```

### **2. Install Dependencies**

```bash
npm install
```

### **4. Run Local PostgreSQL**

### **6. Start the Server**

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

## 📡 API Routes & Usage Examples

### Base URL

```
http://localhost:4040
```

### Authentication Header (required for protected routes)

All routes under these base paths are protected by JWT:

- `/api/users/*`
- `/api/projects/*`
- `/api/submissions/*`
- `/api/comments/*`

Use the JWT from `POST /api/auth/login`:

```
Authorization: Bearer <token>
```

### How to use the examples

For each endpoint below:

- Set the **HTTP method** and **URL** in Postman/Thunder Client.
- Add the listed **headers**.
- Paste the **JSON body** example into the **Body** (raw JSON).

---

## 🔐 Authentication

### Register

`POST /api/auth/register`

Headers:

```json
{
  "Content-Type": "application/json"
}
```

```json
{
  "name": "Masiya",
  "email": "masiya@gmail.com",
  "password": "P@ssw0rd123!",
  "profile_picture": null
}
```

### Login

`POST /api/auth/login`

Headers:

```json
{
  "Content-Type": "application/json"
}
```

```json
{
  "email": "masiya@gmail.com",
  "password": "P@ssw0rd123!"
}
```

---

## 👤 Users (Protected)

### Get all users

`GET /api/users`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

### Get user by id

`GET /api/users/:id`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

### Get notifications

`GET /api/users/:id/notifications`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

---

## 📁 Projects (Protected)

### Create project

`POST /api/projects`

Body fields required by the API:

- `name`
- `description`
- `created_by` (user id)

Headers:

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

```json
{
  "name": "POS Backend",
  "description": "API work",
  "created_by": 1
}
```

### Get all projects

`GET /api/projects`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

### Add project member

`POST /api/projects/:id/members`

Body fields required by the API:

- `user_Id`
- `role_in_project`

Headers:

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

```json
{
  "user_Id": 2,
  "role_in_project": "reviewer"
}
```

### Remove project member

`DELETE /api/projects/:id/members/:userId`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

### Project stats

`GET /api/projects/:id/stats`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

### Get submissions by project id

`POST /api/projects/:id/submissions`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

---

## 📝 Submissions (Protected)

### Create submission

`POST /api/submissions`

Body fields required by the API:

- `project_id`
- `submitted_by` (user id)
- `code_content`
- `status` (e.g. `pending`, `in_review`, `approved`, `changes_requested`)

Headers:

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

```json
{
  "project_id": 1,
  "submitted_by": 1,
  "code_content": "console.log('hello')",
  "status": "pending"
}
```

### Get submission by id

`GET /api/submissions/:id`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

### Delete submission

`DELETE /api/submissions/:id`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

### Update submission status

`POST /api/submissions/:id/status`

Headers:

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

```json
{
  "status": "in_review"
}
```

---

## 💬 Submission Comments (Protected)

### Add comment to a submission

`POST /api/submissions/:id/comments`

Body fields used by the service:

- `submission_id`
- `commented_by` (user id)
- `line_number`
- `content`

Headers:

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

```json
{
  "submission_id": 1,
  "commented_by": 2,
  "line_number": 10,
  "content": "Consider renaming this variable"
}
```

### Get comments for a submission

`GET /api/submissions/:id/comments`

Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

---

## ✅ Reviews (Protected)

### Approve submission

`POST /api/submissions/:id/approve`

```json
{
  "method": "POST",
  "url": "http://localhost:4040/api/submissions/1/approve",
  "headers": {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
  },
  "body": {
    "submission_id": 1,
    "reviewer_id": 2,
    "decision": "approved",
    "remarks": "Looks good"
  }
}
```

### Request changes

`POST /api/submissions/:id/request-changes`

```json
{
  "method": "POST",
  "url": "http://localhost:4040/api/submissions/1/request-changes",
  "headers": {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
  },
  "body": {
    "submission_id": 1,
    "reviewer_id": 2,
    "decision": "changes_requested",
    "remarks": "Please add tests"
  }
}
```

### Review history

`GET /api/submissions/:id/reviews`

```json
{
  "method": "GET",
  "url": "http://localhost:4040/api/submissions/1/reviews",
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

---

## 💬 Comment Management (Protected)

These routes operate directly on the `usercomments` table.

### Create comment

`POST /api/comments`

```json
{
  "method": "POST",
  "url": "http://localhost:4040/api/comments",
  "headers": {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
  },
  "body": {
    "submission_id": 1,
    "commented_by": 2,
    "line_number": 10,
    "content": "Another note"
  }
}
```

### Update comment

`PATCH /api/comments/:id`

```json
{
  "method": "PATCH",
  "url": "http://localhost:4040/api/comments/1",
  "headers": {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
  },
  "body": {
    "content": "Updated comment text"
  }
}
```

### Delete comment

`DELETE /api/comments/:id`

```json
{
  "method": "DELETE",
  "url": "http://localhost:4040/api/comments/1",
  "headers": {
    "Authorization": "Bearer <token>"
  }
}
```

## 🙌 Final Notes

This API can be extended with:

- AI-assisted code review
- Frontend dashboard
- Reviewer scoring
- Code comparison tools

It is built to be modular, scalable, and ready for real team usage.
