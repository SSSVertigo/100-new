import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products'; // Импорт данных о товарах

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: false
  });

  // Фильтрация товаров
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesPrice = (!filters.minPrice || product.price >= filters.minPrice) && 
                        (!filters.maxPrice || product.price <= filters.maxPrice);
    const matchesStock = !filters.inStock || product.stock > 0;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  const categories = [...new Set(productsData.map(product => product.category))];

  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      inStock: false
    });
  };

  return (
    <Container className="py-5">
      {/* Заголовок и поиск */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 fw-bold mb-4">Каталог товаров</h1>
          
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              variant={showFilters ? 'danger' : 'outline-secondary'}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <FaTimes /> : <FaFilter />}
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Фильтры */}
      {showFilters && (
        <Row className="mb-4 bg-light p-3 rounded-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Категория</Form.Label>
              <Form.Select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">Все категории</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={3}>
            <Form.Group>
              <Form.Label>Минимальная цена</Form.Label>
              <Form.Control
                type="number"
                placeholder="От"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
            </Form.Group>
          </Col>
          
          <Col md={3}>
            <Form.Group>
              <Form.Label>Максимальная цена</Form.Label>
              <Form.Control
                type="number"
                placeholder="До"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </Form.Group>
          </Col>
          
          <Col md={3} className="d-flex align-items-end">
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Только в наличии"
                checked={filters.inStock}
                onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
              />
            </Form.Group>
            
            <Button 
              variant="outline-secondary" 
              className="ms-3"
              onClick={resetFilters}
            >
              Сбросить
            </Button>
          </Col>
        </Row>
      )}

      {/* Список товаров */}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h4>Товары не найдены</h4>
            <p>Попробуйте изменить параметры поиска</p>
            <Button variant="primary" onClick={resetFilters}>
              Сбросить фильтры
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Products;