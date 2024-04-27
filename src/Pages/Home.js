import React from 'react';
import "./Dashboard.css";
import { useState, useEffect } from 'react';
import Student from '../Components/Student';



export default function Home(
    {students, createStudent, setStudents}
) {
    
    const [admin, setAdmin] = useState(true);
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
          console.log("created dob",dob);
          createStudent(name, age, dob, email);
          setName('');
    setAge('');
    setDob('');
    setEmail('');
        } else {
          alert('Please fill in all fields.');
        }
      };

//Edit student function with PUT request
function editStudent(id, newName, newAge, newDob, newEmail) {
  fetch(`/api/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newName, age: newAge, dob: newDob, email: newEmail }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(updatedStudent => {
      // Update the state with the updated student data
      const updatedStudents = students.map(student => {
        return student.id === id ? updatedStudent : student;
      });
      setStudents(updatedStudents);
    })
    .catch(error => {
      console.error('Error updating student:', error);
      // Handle error or show a notification
    });
}



  // DELETE student by ID
  const deleteStudent = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this student?');
    if (!confirmed) {
      return; // User canceled the deletion
    }

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update state after successful deletion
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error deleting student:', error);
      // Handle error or show a notification
    }
  };

      const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));


      const filteredStudents = sortedStudents.filter((student) => {
        return student.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    return (
        <div className='main'>
        <h1 className='title'>Student Database</h1>
        <button className='button1' style={{marginLeft:'11%'}} onClick={() => setAdmin(!admin)}>
  {admin ? "Student View" : "Admin View"}
</button>
        <div className='search'>
        <input className='search2'
        type='text'
        placeholder='Search by Name'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>
        {admin && <form className='form' onSubmit={handleSubmit}>
            <input className='search3' type='text' placeholder='Name' value={name}
        onChange={(e) => setName(e.target.value)}/>
            <input className='search3' type='number' placeholder='Age' 
        value={age} onChange={(e) => setAge(e.target.value)}
            />

            <input className='search3' type='date' placeholder='Date of Birth' 
        value={dob} onChange={(e) => setDob(e.target.value)}
            />
            <input className='search3' type='email' placeholder='Email' 
        value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <button className='button1' type='submit' >Add Student</button>
        </form>}
        <div className='bodyCategories '>
        <div className='body3'>
          <p className='head'>Name</p>
          <p className='head'>Age</p>
          <p className='head'>D.O.B</p>
          <p className='head'>Email</p>
          </div>
        </div>
        {filteredStudents.map((student, index) => ( 
            <div key={index} className={`student ${index % 2 === 0 ? 'even' : 'odd'}`}>
               <Student student={student} editStudent={editStudent} deleteStudent={deleteStudent} admin={admin} />
            </div>
        ))}
       
        </div>
    );
}

