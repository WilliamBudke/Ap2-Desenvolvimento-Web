import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import cadeiraImg from '../src/assets/cadeira.jpg';

const DivStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: '5vh',
};

function DetalheProd() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProduto(data);
      })
      .catch((err) => console.error('Erro ao buscar detalhes do produto:', err));
  }, [id]);

  if (!produto) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={DivStyle}>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img src={cadeiraImg} variant="top" />
        <Card.Body>
          <Card.Title>{produto.nome}</Card.Title>
          <Card.Text>Descrição: {produto.descricao}</Card.Text>
          <Card.Text>Preço: R${produto.preco}</Card.Text>
          <Button variant="primary" onClick={() => navigate('/')}>Voltar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DetalheProd;
