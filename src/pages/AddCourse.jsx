import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [level, setLevel] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const { addCourse } = useCourses();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCourse({
      title,
      price: Number(price),
      tag,
      level,
      syllabus: syllabus.split(',').map(item => item.trim()),
      createdBy: user.email,
    });
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="text" placeholder="Tag" value={tag} onChange={e => setTag(e.target.value)} required />
        <input type="text" placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} required />
        <textarea placeholder="Syllabus (comma-separated)" value={syllabus} onChange={e => setSyllabus(e.target.value)} required />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;