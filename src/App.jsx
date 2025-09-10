import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/js/Layout';
import Home from './pages/Home';
import Devices from './pages/Devices';
import Build from './pages/Build';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="devices" element={<Devices />} />
          <Route path="build" element={<Build />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
