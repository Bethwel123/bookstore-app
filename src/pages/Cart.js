import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch cart items from localStorage
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
    calculateTotal(items);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = (id, change) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h3>Your cart is empty</h3>
            <Button variant="primary" href="/books" className="mt-3">
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          <Col md={8}>
            {cartItems.map(item => (
              <Card key={item.id} className="mb-3 cart-item">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <Image src={item.image} alt={item.title} fluid />
                    </Col>
                    <Col xs={5}>
                      <h5>{item.title}</h5>
                      <p className="text-muted">${item.price}</p>
                    </Col>
                    <Col xs={2}>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="light" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <FaMinus />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="light" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <FaPlus />
                        </Button>
                      </div>
                    </Col>
                    <Col xs={2} className="text-end">
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
          
          <Col md={4}>
            <Card className="cart-summary">
              <Card.Body>
                <h4>Order Summary</h4>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
                <Button variant="primary" className="w-100">
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;