import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Toast } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { fetchBookById } from '../services/api';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

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

  const showNotification = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if book already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === book.id);
    
    if (existingItemIndex >= 0) {
      // Book already in cart, increase quantity
      cartItems[existingItemIndex].quantity += 1;
      showNotification('Book quantity updated in cart!');
    } else {
      // Add new book to cart
      const bookItem = {
        id: book.id,
        title: book.volumeInfo.title,
        price: 29.99, // You can set your own price logic
        image: book.volumeInfo.imageLinks?.thumbnail,
        quantity: 1
      };
      cartItems.push(bookItem);
      showNotification('Book added to cart!');
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const addToWishlist = () => {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if book already exists in wishlist
    const existingItem = wishlistItems.find(item => item.id === book.id);
    
    if (existingItem) {
      showNotification('This book is already in your wishlist!', 'info');
      return;
    }
    
    const wishlistItem = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      image: book.volumeInfo.imageLinks?.thumbnail,
      addedOn: new Date().toISOString()
    };
    
    localStorage.setItem('wishlist', JSON.stringify([...wishlistItems, wishlistItem]));
    showNotification('Book added to wishlist!');
  };

  const shareBook = () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: book.volumeInfo.title,
        text: `Check out this book: ${book.volumeInfo.title} by ${book.volumeInfo.authors?.join(', ')}`,
        url: window.location.href,
      })
      .then(() => showNotification('Book shared successfully!'))
      .catch((error) => showNotification('Error sharing book', 'danger'));
    } else {
      // Fallback - copy link to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => showNotification('Link copied to clipboard!'))
        .catch(() => showNotification('Failed to copy link', 'danger'));
    }
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
      {/* Toast notification */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          bg={toastVariant}
          delay={3000}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className={toastVariant === 'danger' ? 'text-white' : ''}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </div>
      
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
              <Button 
                variant="outline-danger" 
                className="me-3"
                onClick={addToWishlist}
              >
                <FaHeart className="me-2" />
                Add to Wishlist
              </Button>
              <Button 
                variant="outline-secondary"
                onClick={shareBook}
              >
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
