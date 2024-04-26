import './App.css';
import React, { useState } from 'react';
import Home from './Pages/Home';
import {Routes, Route} from "react-router-dom";

export default function App() {

let [students, setStudents] = useState([

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

  const randomId = Math.floor(Math.random() * 1000000) + 1;
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

