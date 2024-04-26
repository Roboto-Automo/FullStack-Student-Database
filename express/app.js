
const express = require('express');
const { json } = require('express');
const fs = require('fs').promises; 
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(json());

// let students = [
//     {
//         name: "John Doe",
//         age: 20,
//         dateofbirth: "2000-01-01",
//         email: "doedoe@gmail.com",   
//         id: "1" 
//       },{
//         name: "Jane Dee",
//         age: 19,
//         dateofbirth: "2000-02-01",
//         email: "deedee@gmail.com",    
//         id: "2"
//       },
//       {
//         name: "Alan Bennett",
//         age: 89,
//         dateofbirth: "1935-05-09",
//         email: "doedoe@gmail.com",   
//         id: "3" 
//       },
//       {
//         name: "bobby geezer",
//         age: 20,
//         dateofbirth: "2000-01-01",
//         email: "doedoe@gmail.com",   
//         id: "4" 
//       },
// ];

let students = []; 

// Read initial data from students.json when the server starts
async function loadStudents() {
  try {
    const data = await fs.readFile('students.json');
    students = JSON.parse(data);
  } catch (error) {
    console.error('Error loading students:', error);
  }
}
loadStudents();

async function saveStudents() {
  try {
    await fs.writeFile('students.json', JSON.stringify(students, null, 2));
  } catch (error) {
    console.error('Error saving students:', error);
  }
}

// Routes

// GET all students
app.get('/api/students', (req, res) => {
  res.json(students);
});


// POST a new student
app.post('/api/students', async (req, res) => {
  const { name, age, dob, email, id } = req.body;
  const newStudent = { id, name, age, dob, email };
  students.push(newStudent);
  await saveStudents(); // Save updated data to students.json
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
