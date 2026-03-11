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

## 📡 API Usage (Quick Guide)

### **Authentication**
- `POST /api/auth/register`  
- `POST /api/auth/login`

### **Projects**
- `POST /api/projects`  
- `GET /api/projects`  
- `POST /api/projects/:id/members`

### **Submissions**
- `POST /api/submissions`  
- `GET /api/projects/:id/submissions`  
- `GET /api/submissions/:id`

### **Comments**
- `POST /api/submissions/:id/comments`

### **Reviews**
- `POST /api/submissions/:id/approve`  
- `POST /api/submissions/:id/request-changes`

### **Notifications**
- `GET /api/users/:id/notifications`

### **Stats**
- `GET /api/projects/:id/stats`



## 🙌 Final Notes

This API can be extended with:

- AI-assisted code review  
- Frontend dashboard  
- Reviewer scoring  
- Code comparison tools  

It is built to be modular, scalable, and ready for real team usage.

