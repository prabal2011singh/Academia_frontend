import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../presentations/SpecializationCourses.css';
import {specializationAPI} from '../utils/httpUtil';

function SpecializationCourses() {
  const [courses, setCourses] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await specializationAPI.getCourses(id);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [id]);

  return (
    <div className='specializationContainer1' >
      <h2>Courses in Specialization</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpecializationCourses;