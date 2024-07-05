import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const DivStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: '5vh',
  height: '100vh'
};

function CadastraProd() {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
  });

  const handleFormEdit = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch('http://localhost:5000/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/'); 
        },);
      } else {
        const json = await response.json();
        console.error('Erro ao cadastrar:', json.error);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <div style={DivStyle}>
      <Form onSubmit={handleForm}>
        <h1>Cadastro de Produto</h1>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridNome">
            <Form.Label>Nome do produto</Form.Label>
            <Form.Control
              name="nome"
              value={formData.nome}
              placeholder="Cadeira Azul"
              onChange={handleFormEdit}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPreco">
            <Form.Label>Valor R$</Form.Label>
            <Form.Control
              name="preco"
              value={formData.preco}
              type="text"
              placeholder="213.50"
              onChange={handleFormEdit}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            name="descricao"
            value={formData.descricao}
            placeholder="Cadeira azul simples com rodinha"
            onChange={handleFormEdit}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}

export default CadastraProd;
