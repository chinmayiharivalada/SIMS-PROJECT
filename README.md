# SIMS Backend API Documentation

## Overview
The SIMS Backend is a Node.js/Express server that provides RESTful API endpoints for managing students, courses, attendance, and marks.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create a new student
- `GET /api/students/:id` - Get a specific student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Attendance
- `GET /api/attendance` - Get all attendance records
- `POST /api/attendance` - Create attendance record
- `DELETE /api/attendance/:id` - Delete attendance record

### Marks
- `GET /api/marks` - Get all marks
- `POST /api/marks` - Create marks record
- `PUT /api/marks/:id` - Update marks record
- `DELETE /api/marks/:id` - Delete marks record

## Request/Response Examples

### Create a Student
**Request:**
```bash
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "dateOfBirth": "2000-01-15",
  "enrollmentDate": "2023-09-01"
}
```

**Response:**
```json
{
  "id": 1684756532345,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "dateOfBirth": "2000-01-15",
  "enrollmentDate": "2023-09-01",
  "createdAt": "2023-05-22T10:35:32.345Z"
}
```

### Create a Course
**Request:**
```bash
POST http://localhost:5000/api/courses
Content-Type: application/json

{
  "courseName": "Introduction to Web Development",
  "courseCode": "CS101",
  "instructor": "Dr. Smith",
  "credits": 3,
  "startDate": "2023-09-01",
  "endDate": "2023-12-15"
}
```

### Record Attendance
**Request:**
```bash
POST http://localhost:5000/api/attendance
Content-Type: application/json

{
  "studentId": 1684756532345,
  "courseId": 1684756532346,
  "date": "2023-05-22",
  "status": "Present"
}
```

### Record Marks
**Request:**
```bash
POST http://localhost:5000/api/marks
Content-Type: application/json

{
  "studentId": 1684756532345,
  "courseId": 1684756532346,
  "exam": "Midterm",
  "marks": 85,
  "maxMarks": 100,
  "examDate": "2023-05-15"
}
```

## Data Storage
All data is stored in JSON files in the `data/` directory:
- `students.json` - Student records
- `courses.json` - Course records
- `attendance.json` - Attendance records
- `marks.json` - Marks records

## Error Handling
The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, you can modify the PORT variable in `server.js`

### Module Not Found
Make sure to run `npm install` before starting the server

### CORS Issues
The backend has CORS enabled for all origins. Ensure the frontend is running on a different port.
