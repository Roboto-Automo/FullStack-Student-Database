
const express = require('express');
const { json } = require('express');
const fs = require('fs').promises; 
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(json());

let students = []; 

// Read initial data from students.json when the server starts
async function loadStudents() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'students.json'));
    students = JSON.parse(data);
  } catch (error) {
    console.error('Error loading students:', error);
  }
}
loadStudents();

async function saveStudents() {
  try {
    await fs.writeFile(path.join(__dirname, 'students.json'), JSON.stringify(students, null, 2));
  } catch (error) {
    console.error('Error saving students:', error);
  }
}

// Routes

// GET all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

//GET student by ID
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id); 
  console.log('Requested student ID:', studentId);
  const student = students.find(student => student.id === studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
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
app.put('/api/students/:id', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id); 
    const { name, age, dob, email} = req.body;

    // Find the student by ID
    const studentIndex = students.findIndex(student => student.id === studentId);
    if (studentIndex === -1) {
      return res.status(404).send('Student not found');
    }

    // Update the student's data
    students[studentIndex] = {
      ...students[studentIndex],
      name,
      age,
      dob,
      email,
    };

    await saveStudents(); // Save updated data to students.json
    res.json(students[studentIndex]); // Send back the updated student data
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Error updating student');
  }
});

// DELETE a student by ID
app.delete('/api/students/:id', async (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter(student => student.id !== studentId);
  await saveStudents(); // Save updated data to students.json
  res.status(204).send(); // No content in response
});


//code inserted here below >>>

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/FullStack-Student-Database')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/FullStack-Student-Database/public/index.html'));
});

//code inserted here above >>>

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
