import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/js/Layout';
import Home from './pages/Home';
import Devices from './pages/Devices';
import Build from './pages/Build';

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const path = params.get('path');

    if (path) {
      params.delete('path');
      const newSearch = params.toString() ? `?${params.toString()}` : '';

      navigate(
        {
          pathname: `/${path}`,
          search: newSearch,
          hash: location.hash,
        },
        { replace: true }
      );
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="devices" element={<Devices />} />
        <Route path="build" element={<Build />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
