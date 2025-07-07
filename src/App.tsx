import './App.css'

import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import MainLayout from './layouts/MainLayout';
import { lazy } from 'react';
const SingleArticle = lazy(() => import('./pages/reader/article'));


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route //responsible for routing FrontEnd UI (eshen, code tracing)
        path="/dost"
        element={<MainLayout />}>
        
        <Route path=":slug" element={<SingleArticle />} />

        {/* <Route path="/category" element={<MainLayout />} >
          <Route path=":slug" element={<ArticlesByCategory />} key="category-route"/>
        </Route> */}

        {/* <Route path="/magazines-all" element={<MagazinesAll />} />
					<Route path="/search/:search" element={<SearchResult />} />
					<Route path="/magazines" element={<MainLayout />} >
						<Route path="flipbook/:slug" element={<MagazinePDFFlipBook />} key="magazine-route"/>
        </Route> */}
        
        {/* <Route element={<MainLayout />} >
          <Route path="/archives" element={<ArchiveIndex />} />
        </Route> */}

      </Route>

    </Routes>
  )
}

export default App
