import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import HistoryPage from './pages/HistoryPage';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <Router>
      <Container maxWidth="lg" sx={{paddingBottom: '30px'}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
