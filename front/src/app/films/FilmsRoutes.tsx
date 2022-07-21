import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { PageFilms } from '@/app/films/PageFilms';
import { Error404 } from '@/errors';

const FilmsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageFilms />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default FilmsRoutes;
