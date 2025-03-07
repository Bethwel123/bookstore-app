import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { fetchBookById } from '../services/api';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      const data = await fetchBookById(id);
      setBook(data);
    } catch (err) {
      setError('Failed to load book details');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const bookItem = {
      id: book.id,
      title: book.volumeInfo.title,
      price: 29.99, // You can set your own price logic
      image: book.volumeInfo.imageLinks?.thumbnail,
      quantity: 1
    };
    
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, bookItem]));
    alert('Book added to cart!');
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <div className="book-image-container">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://')}
              alt={book.volumeInfo.title}
              className="img-fluid rounded shadow"
            />
          </div>
        </Col>
        <Col md={8}>
          <div className="book-details">
            <h1 className="mb-3">{book.volumeInfo.title}</h1>
            <h5 className="text-muted mb-4">
              by {book.volumeInfo.authors?.join(', ')}
            </h5>

            <div className="mb-4">
              <span className="badge bg-primary me-2">
                {book.volumeInfo.categories?.[0]}
              </span>
              <span className="badge bg-secondary">
                {book.volumeInfo.pageCount} pages
              </span>
            </div>

            <div className="book-actions mb-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="me-3"
                onClick={addToCart}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </Button>
              <Button variant="outline-danger" className="me-3">
                <FaHeart className="me-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline-secondary">
                <FaShare className="me-2" />
                Share
              </Button>
            </div>

            <div className="book-description mb-4">
              <h4>Description</h4>
              <p>{book.volumeInfo.description}</p>
            </div>

            <div className="book-info">
              <Row>
                <Col md={6}>
                  <h4>Book Details</h4>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Publisher:</strong> {book.volumeInfo.publisher}
                    </li>
                    <li>
                      <strong>Published Date:</strong> {book.volumeInfo.publishedDate}
                    </li>
                    <li>
                      <strong>Language:</strong> {book.volumeInfo.language}
                    </li>
                    <li>
                      <strong>ISBN:</strong> {book.volumeInfo.industryIdentifiers?.[0]?.identifier}
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetail;