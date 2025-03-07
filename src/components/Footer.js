import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>BookStore</h5>
            <p>Your one-stop shop for all books</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/books" className="text-light">Books</a></li>
              <li><a href="/cart" className="text-light">Cart</a></li>
              <li><a href="/profile" className="text-light">Profile</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: contact@bookstore.com</p>
            <p>Phone: (555) 123-4567</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;