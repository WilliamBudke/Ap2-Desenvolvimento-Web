import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cadeiraImg from '../src/assets/cadeira.jpg';
import { useNavigate } from 'react-router-dom';

const DivStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: '5vh',
};

const BottonStyle = {
  marginRight: '5px'
};

function ListaProd() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/produtos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProdutos(data);
      })
      .catch((err) => console.error('Erro ao buscar dados:', err));
  }, []);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setProdutos(produtos.filter((produto) => produto.id !== id));
        alert('Produto removido com sucesso!');
      } else {
        alert('Erro ao remover produto.');
      }
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  const handleDetalhesClick = (id) => {
    navigate(`/detalhes/${id}`);
  };
  
  return (
    <div style={DivStyle}>
      {produtos.map((produto) => (
        <Card key={produto.id} style={{ width: '18rem', margin: '10px' }}>
          <Card.Img src={cadeiraImg} variant="top" />
          <Card.Body>
            <Card.Title>{produto.nome}</Card.Title>
            <Card.Text>Preço: R${produto.preco}</Card.Text>
            <Button 
            style={BottonStyle} 
            variant="primary" 
            onClick={() => handleDetalhesClick(produto.id)}>
            Detalhes
            </Button>
            <Button
              style={BottonStyle}
              variant="danger"
              onClick={() => handleRemove(produto.id)}
            >
              Remover
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ListaProd;
