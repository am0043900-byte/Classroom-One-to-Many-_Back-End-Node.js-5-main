# Classroom Management API

A Node.js REST API for managing classrooms and students with a one-to-many relationship using Express.js and MongoDB.

## 📋 Project Overview

This project demonstrates a **One-to-Many relationship** between Classrooms and Students:
- One classroom can have multiple students
- Each student belongs to one classroom
- Uses MongoDB references and Mongoose population for data retrieval

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Environment:** dotenv
- **Dev Tool:** Nodemon

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or remote)
- npm or yarn

### Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd Task5-Classroom-(One-to-Many)
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URL=mongodb://127.0.0.1:27017/classroom-db
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   Server will run on `http://localhost:3000`

## 📁 Project Structure

```
.
├── models/
│   ├── Classroom.js      # Classroom schema
│   └── Student.js        # Student schema
├── routes/
│   ├── classroomRoutes.js # Classroom endpoints
│   └── studentRoutes.js   # Student endpoints
├── server.js              # Main server file
├── .env                   # Environment variables
└── package.json           # Dependencies
```

## 📊 Database Schema

### Student
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  __v: Number
}
```

### Classroom
```javascript
{
  _id: ObjectId,
  name: String (required),
  students: [ObjectId], 
  __v: Number
}
```

## 🔌 API Endpoints

### Students

#### Create Student
```http
POST /api/students
Content-Type: application/json

{
  "name": "Ahmed",
  "email": "ahmed@test.com"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "698ef5b7601f1cc887d75ed7",
    "name": "Ahmed",
    "email": "ahmed@test.com",
    "__v": 0
  }
}
```

#### Delete Student
```http
DELETE /api/students/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Student deleted"
}
```

### Classrooms

#### Create Classroom
```http
POST /api/classrooms
Content-Type: application/json

{
  "name": "Node.js Class",
  "students": ["698ef5b7601f1cc887d75ed7", "698ef5fb601f1cc887d75edd"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "698ef600601f1cc887d75edf",
    "name": "Node.js Class",
    "students": ["698ef5b7601f1cc887d75ed7", "698ef5fb601f1cc887d75edd"],
    "__v": 0
  }
}
```

#### Get All Classrooms (with populated students)
```http
GET /api/classrooms
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "698ef600601f1cc887d75edf",
      "name": "Node.js Class",
      "students": [
        {
          "_id": "698ef5b7601f1cc887d75ed7",
          "name": "Ahmed"
        },
        {
          "_id": "698ef5fb601f1cc887d75edd",
          "name": "Sara"
        }
      ],
      "__v": 0
    }
  ]
}
```

## 💡 Key Features

✨ **One-to-Many Relationships**
- Using Mongoose references and population
- `.populate("students", "name")` - Loads only name field from related students

🔒 **Data Validation**
- Required fields enforcement
- Unique email constraint for students
- Error handling for duplicate emails

📈 **RESTful API Design**
- Standard HTTP methods (GET, POST, DELETE)
- Proper status codes (201, 400, 404, 500)
- JSON responses with success flags

## 🧪 Testing Example

### Step 1: Create Students

**Ahmed:**
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Ahmed","email":"ahmed@test.com"}'
```

**Sara:**
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Sara","email":"sara@test.com"}'
```

Copy the returned `_id` values for both students.

### Step 2: Create Classroom

```bash
curl -X POST http://localhost:3000/api/classrooms \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Node.js Class",
    "students":["PASTE_STUDENT_ID_1","PASTE_STUDENT_ID_2"]
  }'
```

### Step 3: Get Classrooms with Students

```bash
curl http://localhost:3000/api/classrooms
```

The response will show classrooms with fully populated student details (name only, no email).

## 🚀 Available Scripts

```bash
# Start server (with nodemon for development)
npm start

# Run server directly
node server.js
```

## ⚠️ Error Handling

### Email Already Exists (400)
```json
{
  "success": false,
  "message": "Email already exists"
}
```

### Student Not Found (404)
```json
{
  "success": false,
  "message": "Student not found"
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Please enter student name"
}
```

## 📝 Notes

- The populate query in GET `/api/classrooms` uses `.populate("students", "name")` which means it returns only the `name` field from student documents (not email)
- Email field is set to unique with sparse index to allow null values
- All responses follow a consistent JSON structure with `success` flag

## 🔗 Related Concepts

- **MongoDB References vs Embedding:** This project uses references (ObjectId) for flexibility
- **Mongoose Population:** Used to automatically replace specified paths in document with document(s) from other collection(s)
- **One-to-Many Relationship:** One classroom contains many students

## 📄 License

This is a learning project for Node.js and MongoDB relationships.
