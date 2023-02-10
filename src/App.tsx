import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { app } from 'electron'

import './App.scss'

import './fonts/DroidSans.ttf';

import Layout from './Layout';
import NoPage from './pages/NoPage';
import Versions from './pages/Versions';
import Projects from './pages/Projects';
import Config from './pages/Config';


console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Projects />} />
          <Route path="/versions" element={<Versions />} />
          <Route path="/config" element={<Config />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
  }