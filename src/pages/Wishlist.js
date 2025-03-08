import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(items);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const moveToCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    removeFromWishlist(item.id);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Wishlist</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {wishlistItems.map((item) => (
          <Col key={item.id}>
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={item.image?.replace('zoom=1', 'zoom=2')}
                alt={item.title}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white">
                <Button 
                  variant="primary" 
                  className="w-100 mb-2"
                  onClick={() => moveToCart(item)}
                >
                  <FaShoppingCart className="me-2" />
                  Move to Cart
                </Button>
                <Button 
                  variant="outline-danger" 
                  className="w-100"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <FaTrash className="me-2" />
                  Remove
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Wishlist;