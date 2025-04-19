import React, { useState, useMemo } from 'react';
import { useCourses } from '../hooks/useCourses';
import { Link } from 'react-router';

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const CoursesPage = () => {
  const { courses, loading, error } = useCourses();
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('All');
  const [sort, setSort] = useState('title-asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const tags = ['All', ...new Set(courses.map(c => c.tag))];

  const filtered = useMemo(() => {
    let result = [...courses];
    if (search) {
      result = result.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (tag !== 'All') {
      result = result.filter(c => c.tag === tag);
    }
    if (sort === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'title-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [courses, search, tag, sort]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <h2>All Courses</h2>

      <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />

      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="price-asc">Price Low-High</option>
        <option value="price-desc">Price High-Low</option>
      </select>

      {tags.map(t => (
        <button key={t} onClick={() => setTag(t)} disabled={t === tag}>{t}</button>
      ))}

      <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
        {PAGE_SIZE_OPTIONS.map(size => (
          <option key={size} value={size}>{size} per page</option>
        ))}
      </select>

      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <ul>
          {paginated.map(c => (
            <li key={c.id}>
              <Link to={`/courses/${c.id}`}>{c.title} - ₹{c.price}</Link>
            </li>
          ))}
        </ul>
      )}

      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button key={num} onClick={() => setPage(num)} disabled={num === page}>{num}</button>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
