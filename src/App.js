import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaProd from './ListaProdutos';
import NavBar from './NavBar';
import CadastraProd from './CadastraProd';
import DetalheProd from './DetalhesProd';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<ListaProd />} />
          <Route path="/cadastrar" element={<CadastraProd />} />
          <Route path="/detalhes/:id" element={<DetalheProd />} />
        </Routes>
      </div>
    </Router>
  );
}
