import React from 'react';
import "./Dashboard.css";
import { useState, useEffect } from 'react';
import Student from '../Components/Student';



export default function Home(
    {students, createStudent, setStudents}
) {
    

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch data from the Express.js server when the component mounts
        fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); // Empty dependency array means this effect runs once on mount
    
      const fetchData = async () => {
        try {
          const response = await fetch('/api/students');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setStudents(data); // Update state with fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (name && age && dob && email) {
          createStudent(name, age, dob, email);
          setName('');
    setAge('');
    setDob('');
    setEmail('');
        } else {
          alert('Please fill in all fields.');
        }
      };


      function editStudent(id, newName, newAge, newDob, newEmail) {
        const updatedStudents = students.map((student) => {
          if (student.id === id) {
            return {
              ...student,
              name: newName,
              age: newAge,
              dateofbirth: newDob,
              email: newEmail,
            };
          }
          return student;
        });
        setStudents(updatedStudents);
      }
      function deleteStudent(id) {
        const newStudents = students.filter((student) => student.id !== id);
        setStudents(newStudents);
      } 

      const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));


      const filteredStudents = sortedStudents.filter((student) => {
        return student.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    return (
        <>
        <h1 className='title'>Student Dashboard</h1>
        <div className='search'>
        <input className='search2'
        type='text'
        placeholder='Search by Name'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>
        <form className='form' onSubmit={handleSubmit}>
            <input type='text' placeholder='Name' value={name}
        onChange={(e) => setName(e.target.value)}/>
            <input type='number' placeholder='Age' 
        value={age} onChange={(e) => setAge(e.target.value)}
            />
            <input type='date' placeholder='Date of Birth' 
        value={dob} onChange={(e) => setDob(e.target.value)}
            />
            <input type='email' placeholder='Email' 
        value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' >Add Student</button>
        </form>

        {filteredStudents.map((student, index) => ( 
            <div key={index} className='student'>
               <Student student={student} editStudent={editStudent} deleteStudent={deleteStudent} />
            </div>
        ))}
       
        </>
    );
}

