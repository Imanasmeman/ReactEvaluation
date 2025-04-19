import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useCourses } from '../hooks/useCourses';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { courses } = useCourses();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);

  if (!course) return <p>Course not found</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{course.title}</h2>
      <p><strong>Price:</strong> ₹{course.price}</p>
      <p><strong>Tag:</strong> {course.tag}</p>
      <p><strong>Level:</strong> {course.level}</p>
      <p><strong>Instructor:</strong> {course.createdBy}</p>
      <h4>Syllabus:</h4>
      <ul>
        {course.syllabus.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetailPage;
