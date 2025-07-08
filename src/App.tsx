import './App.css'

import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import MainLayout from './layouts/MainLayout';
import { lazy } from 'react';
import ArchiveIndex from './pages/archives';
import SearchResult from './pages/reader/search-result';
import MagazinePDFFlipBook from './pages/reader/MagazinePDFFlipbook';
import MagazinesAll from './pages/reader/MagazineAll';
const SingleArticle = lazy(() => import('./pages/reader/article'));
const ArticlesByCategory = lazy(() => import('./pages/articles-by-category'));


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route //responsible for routing FrontEnd UI (eshen, code tracing)
        path="/dost"
        element={<MainLayout />}>
        <Route path=":slug" element={<SingleArticle />} />
      </Route>

      <Route path="/category" element={<MainLayout />} >
        <Route path=":slug" element={<ArticlesByCategory />} key="category-route"/>
      </Route>

      <Route path="/magazines-all" element={<MagazinesAll />} />
      <Route path="/search/:search" element={<SearchResult />} />
      <Route path="/magazines" element={<MainLayout />} >
        <Route path="flipbook/:slug" element={<MagazinePDFFlipBook />} key="magazine-route"/>
      </Route>

      <Route element={<MainLayout />} >
        <Route path="/archives" element={<ArchiveIndex />} />
      </Route>

    </Routes>
  )
}

export default App
