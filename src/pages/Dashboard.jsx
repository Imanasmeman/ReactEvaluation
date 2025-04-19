import React from 'react';
import { Link } from 'react-router';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { courses, deleteCourse } = useCourses();
  const { user } = useAuth();

  const userCourses = courses.filter(course => course.createdBy === user.email);

  return (
    <div>
      <h2>Your Courses</h2>
      <Link to="/dashboard/new">
        <button>Add New Course</button>
      </Link>
      {userCourses.length === 0 ? (
        <p>No courses found. Start by adding a new course.</p>
      ) : (
        <ul>
          {userCourses.map(course => (
            <li key={course.id}>
              <strong>{course.title}</strong> - ₹{course.price}
              <Link to={`/dashboard/edit/${course.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => deleteCourse(course.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;