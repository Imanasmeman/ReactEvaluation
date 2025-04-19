import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CourseContext = createContext(); // Ensure this is exported
const DB_URL = 'https://reactevaluation-2e47b-default-rtdb.firebaseio.com/courses';

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(DB_URL + '.json');
      const data = res.data || {};
      const parsed = Object.values(data);
      setCourses(parsed);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course) => {
    const id = Date.now().toString();
    const newCourse = { id, ...course };
    await axios.put(`${DB_URL}/${id}.json`, newCourse);
    fetchCourses();
  };

  const updateCourse = async (id, course) => {
    await axios.patch(`${DB_URL}/${id}.json`, course);
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`${DB_URL}/${id}.json`);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, fetchCourses, addCourse, updateCourse, deleteCourse, loading, error }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);