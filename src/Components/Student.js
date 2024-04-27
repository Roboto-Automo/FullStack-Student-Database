import React, { useState, useEffect } from 'react';
import './Student.css';

export default function Student({ student, editStudent, deleteStudent, admin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: student.name,
    age: student.age,
    dateofbirth: student.dateofbirth,
    email: student.email,
  });

  useEffect(() => {
    // Update editedData when the student prop changes (e.g., sorting)
    setEditedData({
      name: student.name,
      age: student.age,
      dateofbirth: student.dateofbirth,
      email: student.email,
    });
  }, [student]);

  const handleEditSubmit = (e) => {
    // Call editStudent with updated values
    e.stopPropagation(); // Stop event propagation
    editStudent(student.id, editedData.name, editedData.age, editedData.dateofbirth, editedData.email);
    setIsEditing(false); // Exit edit mode after submission
  };

  const handleEditCancel = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsEditing(false); // Exit edit mode without saving changes
  };

  const handleBlockClick = () => {
    if (admin) {
      setIsEditing(true); // Enter edit mode when the block is clicked (only for admin)
    }
  };

  return (
    <div className={`student-block ${isEditing ? 'editing' : ''}`} onClick={handleBlockClick}>
      {isEditing ? (
        <>
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
            value={editedData.dateofbirth}
            onChange={(e) => setEditedData({ ...editedData, dateofbirth: e.target.value })}
          />
          <input
            className='editbox'
            type='email'
            value={editedData.email}
            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
          />
          <button className='button2' onClick={handleEditSubmit}>Submit</button>
         <button className='button2' onClick={() => deleteStudent(student.id)}>Delete</button>
          <button className='button2' onClick={handleEditCancel}>Cancel</button>
        </>
      ) : (
        <>
        <div className='body2'>
          <p className='entry'>{student.name}</p>
          <p className='entry'>Age: {student.age}</p>
          <p className='entry'>{student.dateofbirth}</p>
          <p className='entry'>{student.email}</p>
          </div>
         
        </>
      )}
    </div>
  );
}
