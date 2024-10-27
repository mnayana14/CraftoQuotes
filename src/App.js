import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import QuoteListPage from './QuoteListPage';
import QuoteCreationPage from './QuoteCreationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/create-quote" element={<QuoteCreationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
