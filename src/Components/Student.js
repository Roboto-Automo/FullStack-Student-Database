import React, { useState, useEffect } from 'react';
import './Student.css';

export default function Student({ student, editStudent, deleteStudent, admin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: student.name,
    age: student.age,
    dob: student.dob,
    email: student.email,
  });

  useEffect(() => {
    // Update editedData when the student prop changes (e.g., sorting)
    setEditedData({
      name: student.name,
      age: student.age,
      dob: student.dob,
      email: student.email,
    });
  }, [student]);

  const handleEditSubmit = (e) => {
    // Call editStudent with updated values
    e.stopPropagation(); // Stop event propagation
    console.log("editedData",editedData);
    editStudent(student.id, editedData.name, editedData.age, editedData.dob, editedData.email);
    setIsEditing(false); // Exit edit mode after submission
  };

  const handleEditCancel = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsEditing(false); // Exit edit mode without saving changes
  };

  const handleDateChange = (e) => {
    setEditedData({ ...editedData, dob: e.target.value });
    console.log("object", editedData.dob);
  };

  const handleBlockClick = () => {
    if (admin) {
      setIsEditing(true); // Enter edit mode when the block is clicked (only for admin)
    }
  };

  return (
    <div  onClick={handleBlockClick}>
      {isEditing && admin ? (
        <>
        <h2 className='header' style={{display:'flex', justifyContent:'center'}}>Edit Student</h2>
          <input
          className='editbox'
            type='text'
            value={editedData.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          />
          <input
            className='editbox'
            type='number'
            value={editedData.age}
            onChange={(e) => setEditedData({ ...editedData, age: e.target.value })}
          />
          <input
          className='editbox'
            type='date'
            value={editedData.dob}
            onChange={handleDateChange}
          />
          <input
            className='editbox'
            type='email'
            value={editedData.email}
            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
          />
          <div className='editbuttonscontainer'>
          <button className='button2' onClick={handleEditSubmit}>Submit</button>
         <button className='button2' onClick={() => deleteStudent(student.id)}>Delete</button>
          <button className='button2' onClick={handleEditCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
        <div className='body2'>
          <p className='entry'>{student.name}</p>
          <p className='entry'>Age: {student.age}</p>
          <p className='entry'>{student.dob}</p>
          <p className='entry'>{student.email}</p>
          </div>
         
        </>
      )}
    </div>
  );
}
