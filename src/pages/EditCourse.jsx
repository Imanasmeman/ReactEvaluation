import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useCourses } from '../hooks/useCourses';

const EditCourse = () => {
  const { id } = useParams();
  const { courses, updateCourse } = useCourses();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [level, setLevel] = useState('');
  const [syllabus, setSyllabus] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setPrice(course.price);
      setTag(course.tag);
      setLevel(course.level);
      setSyllabus(course.syllabus.join(', '));
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCourse(id, {
      title,
      price: Number(price),
      tag,
      level,
      syllabus: syllabus.split(',').map(item => item.trim()),
    });
    navigate('/dashboard');
  };

  if (!course) return <p>Course not found</p>;

  return (
    <div>
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="text" placeholder="Tag" value={tag} onChange={e => setTag(e.target.value)} required />
        <input type="text" placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} required />
        <textarea placeholder="Syllabus (comma-separated)" value={syllabus} onChange={e => setSyllabus(e.target.value)} required />
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
