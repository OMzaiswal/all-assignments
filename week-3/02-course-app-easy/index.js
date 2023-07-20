const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req, res, next) => {
  const {username, password} = req.headers;
  const admin = ADMINS.find(a => a.username === username && a.password === password)
  if (admin) {
    next();
  } else {
    res.status(403).json({message: "Admin authentication failed"})
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body
  const existingAdmin = ADMINS.find(a => a.username === admin.username)
  if (existingAdmin){
    res.status(403).json({message: 'Admin already exist'})
  } else {
    USERS.push(admin)
    res.status(200).json({message: "Admin created sussessfully"})
  }
});

app.post('/admin/login', adminAuthentication, (req, res) => {
  // logic to log in admin
  res.status(200).json({message: "Logged in sussessfully"})
});

app.post('/admin/courses', adminAuthentication, (req, res) => {
  // logic to create a course
  const course = req.body;
  course.id = Date.now()
  COURSES.push(course)
  res.json({message: "Course created successfully", courseId: course.id})
});

app.put('/admin/courses/:courseId',adminAuthentication, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId)
  const course = COURSES.find(c => c.id === courseId);
  if (course){
    Object.assign(course, req.body);
    res.json({message: "Course updated sussessfully"})
  } else {
    res.status(404).json({message: "Course not found"})
  }
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
  // logic to get all courses
  res.json({courses: COURSES});
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
