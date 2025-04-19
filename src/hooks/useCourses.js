import { useContext } from 'react';
import { CourseContext } from '../contexts/CourseContext';

export const useCourses = () => {
  return useContext(CourseContext);
};
