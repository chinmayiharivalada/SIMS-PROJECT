const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data file paths
const dataDir = path.join(__dirname, 'data');
const studentsFile = path.join(dataDir, 'students.json');
const coursesFile = path.join(dataDir, 'courses.json');
const attendanceFile = path.join(dataDir, 'attendance.json');
const marksFile = path.join(dataDir, 'marks.json');

// Utility functions to read/write JSON files
function readFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return data ? JSON.parse(data) : [];
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return [];
}

function writeFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
}

// STUDENT ROUTES
app.get('/api/students', (req, res) => {
  const students = readFile(studentsFile);
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const students = readFile(studentsFile);
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    enrollmentDate: req.body.enrollmentDate,
    createdAt: new Date().toISOString()
  };
  students.push(newStudent);
  if (writeFile(studentsFile, students)) {
    res.status(201).json(newStudent);
  } else {
    res.status(500).json({ error: 'Failed to add student' });
  }
});

app.get('/api/students/:id', (req, res) => {
  const students = readFile(studentsFile);
  const student = students.find(s => s.id == req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.put('/api/students/:id', (req, res) => {
  const students = readFile(studentsFile);
  const index = students.findIndex(s => s.id == req.params.id);
  if (index > -1) {
    students[index] = { ...students[index], ...req.body };
    if (writeFile(studentsFile, students)) {
      res.json(students[index]);
    } else {
      res.status(500).json({ error: 'Failed to update student' });
    }
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.delete('/api/students/:id', (req, res) => {
  const students = readFile(studentsFile);
  const filteredStudents = students.filter(s => s.id != req.params.id);
  if (filteredStudents.length < students.length) {
    if (writeFile(studentsFile, filteredStudents)) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete student' });
    }
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// COURSE ROUTES
app.get('/api/courses', (req, res) => {
  const courses = readFile(coursesFile);
  res.json(courses);
});

app.post('/api/courses', (req, res) => {
  const courses = readFile(coursesFile);
  const newCourse = {
    id: Date.now(),
    courseName: req.body.courseName,
    courseCode: req.body.courseCode,
    instructor: req.body.instructor,
    credits: req.body.credits,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    createdAt: new Date().toISOString()
  };
  courses.push(newCourse);
  if (writeFile(coursesFile, courses)) {
    res.status(201).json(newCourse);
  } else {
    res.status(500).json({ error: 'Failed to add course' });
  }
});

app.put('/api/courses/:id', (req, res) => {
  const courses = readFile(coursesFile);
  const index = courses.findIndex(c => c.id == req.params.id);
  if (index > -1) {
    courses[index] = { ...courses[index], ...req.body };
    if (writeFile(coursesFile, courses)) {
      res.json(courses[index]);
    } else {
      res.status(500).json({ error: 'Failed to update course' });
    }
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
});

app.delete('/api/courses/:id', (req, res) => {
  const courses = readFile(coursesFile);
  const filteredCourses = courses.filter(c => c.id != req.params.id);
  if (filteredCourses.length < courses.length) {
    if (writeFile(coursesFile, filteredCourses)) {
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete course' });
    }
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
});

// ATTENDANCE ROUTES
app.get('/api/attendance', (req, res) => {
  const attendance = readFile(attendanceFile);
  res.json(attendance);
});

app.post('/api/attendance', (req, res) => {
  const attendance = readFile(attendanceFile);
  const newRecord = {
    id: Date.now(),
    studentId: req.body.studentId,
    courseId: req.body.courseId,
    date: req.body.date,
    status: req.body.status,
    createdAt: new Date().toISOString()
  };
  attendance.push(newRecord);
  if (writeFile(attendanceFile, attendance)) {
    res.status(201).json(newRecord);
  } else {
    res.status(500).json({ error: 'Failed to add attendance record' });
  }
});

app.delete('/api/attendance/:id', (req, res) => {
  const attendance = readFile(attendanceFile);
  const filteredAttendance = attendance.filter(a => a.id != req.params.id);
  if (filteredAttendance.length < attendance.length) {
    if (writeFile(attendanceFile, filteredAttendance)) {
      res.json({ message: 'Attendance record deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete attendance record' });
    }
  } else {
    res.status(404).json({ error: 'Attendance record not found' });
  }
});

// MARKS ROUTES
app.get('/api/marks', (req, res) => {
  const marks = readFile(marksFile);
  res.json(marks);
});

app.post('/api/marks', (req, res) => {
  const marks = readFile(marksFile);
  const newMark = {
    id: Date.now(),
    studentId: req.body.studentId,
    courseId: req.body.courseId,
    exam: req.body.exam,
    marks: req.body.marks,
    maxMarks: req.body.maxMarks,
    examDate: req.body.examDate,
    createdAt: new Date().toISOString()
  };
  marks.push(newMark);
  if (writeFile(marksFile, marks)) {
    res.status(201).json(newMark);
  } else {
    res.status(500).json({ error: 'Failed to add marks record' });
  }
});

app.put('/api/marks/:id', (req, res) => {
  const marks = readFile(marksFile);
  const index = marks.findIndex(m => m.id == req.params.id);
  if (index > -1) {
    marks[index] = { ...marks[index], ...req.body };
    if (writeFile(marksFile, marks)) {
      res.json(marks[index]);
    } else {
      res.status(500).json({ error: 'Failed to update marks' });
    }
  } else {
    res.status(404).json({ error: 'Marks record not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`SIMS Backend running on http://localhost:${PORT}`);
});
