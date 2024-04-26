import './App.css';
import React, { useState } from 'react';
import Home from './Pages/Home';
import {Routes, Route} from "react-router-dom";

export default function App() {

let [students, setStudents] = useState([
//   {
//   name: "John Doe",
//   age: 20,
//   dateofbirth: "2000-01-01",
//   email: "doedoe@gmail.com",   
//   id: "1" 
// },{
//   name: "Jane Dee",
//   age: 19,
//   dateofbirth: "2000-02-01",
//   email: "deedee@gmail.com",    
//   id: "2"
// },
// {
//   name: "Alan Bennett",
//   age: 89,
//   dateofbirth: "1935-05-09",
//   email: "doedoe@gmail.com",   
//   id: "3" 
// },
// {
//   name: "bobby geezer",
//   age: 20,
//   dateofbirth: "2000-01-01",
//   email: "doedoe@gmail.com",   
//   id: "4" 
// },
]);

async function sendStudentToServer(student) {
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error creating student:', error);
  }
}

function createStudent(name, age, dob, email) {

  const randomId = Math.random().toString(36).substring(2, 9);
  let student = {
    name: name,
    age: age,
    dateofbirth: dob,
    email: email,
    id: randomId
    
  };
  setStudents([...students, student]);
  sendStudentToServer(student);
}

  return (
      <Routes>
      <Route exact path="/" element={<Home students={students} setStudents={setStudents} createStudent={createStudent}/>} />
      </Routes>
  );
}

