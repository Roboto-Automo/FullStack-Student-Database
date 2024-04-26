
const express = require('express');
const { json } = require('express');
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(json());

let students = [
    {
        name: "John Doe",
        age: 20,
        dateofbirth: "2000-01-01",
        email: "doedoe@gmail.com",   
        id: "1" 
      },{
        name: "Jane Dee",
        age: 19,
        dateofbirth: "2000-02-01",
        email: "deedee@gmail.com",    
        id: "2"
      },
      {
        name: "Alan Bennett",
        age: 89,
        dateofbirth: "1935-05-09",
        email: "doedoe@gmail.com",   
        id: "3" 
      },
      {
        name: "bobby geezer",
        age: 20,
        dateofbirth: "2000-01-01",
        email: "doedoe@gmail.com",   
        id: "4" 
      },
];

// Routes

// GET all students
app.get('/api/students', (req, res) => {
  res.json(students);
});


// POST a new student
app.post('/api/students', (req, res) => {
    const { name, age, dob, email, id } = req.body;
    const newStudent = { 
      id,
      name,
      age,
      dob,
      email
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
  });

// PUT (update) a student by ID
app.put('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, age } = req.body;
  const studentIndex = students.findIndex(student => student.id === studentId);
  if (studentIndex === -1) {
    return res.status(404).send('Student not found');
  }
  students[studentIndex] = { ...students[studentIndex], name, age };
  res.json(students[studentIndex]);
});

// DELETE a student by ID
app.delete('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter(student => student.id !== studentId);
  res.status(204).send(); // No content in response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
