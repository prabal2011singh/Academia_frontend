import React from 'react';
import '../presentations/Card.css';

function Card({ specialization, onEdit, onDelete, onViewCourses }) {
  return (
    <div className='cardContainer'>
        <h3 
          onClick={() => onViewCourses(specialization.id)}
          style={{ cursor: 'pointer' }}>
          {specialization.name}
        </h3>
        <p><strong>Code:</strong> {specialization.code}</p>
        <p><strong>Description:</strong> {specialization.description}</p>
        <p><strong>Year:</strong> {specialization.year}</p>
        <p><strong>Credits Required:</strong> {specialization.creditsRequired}</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button className='cardButton' onClick={() => onEdit(specialization)}>Edit</button>
          <button className='cardButton' onClick={() => onDelete(specialization.id)}>Delete</button>
        </div>
      </div>
  )
}

export default Card;
