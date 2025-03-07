// import { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
// import { fetchBooks } from "../services/api";
// import SearchBar from "../components/SearchBar";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [featuredBooks, setFeaturedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadFeaturedBooks = async () => {
//       try {
//         const data = await fetchBooks("bestsellers");
//         setFeaturedBooks(data.items.slice(0, 6));
//       } catch (error) {
//         console.error("Error loading featured books:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFeaturedBooks();
//   }, []);

//   const categories = [
//     { name: 'Fiction', icon: '📚', query: 'subject:fiction' },
//     { name: 'Science', icon: '🔬', query: 'subject:science' },
//     { name: 'Technology', icon: '💻', query: 'subject:technology' },
//     { name: 'Business', icon: '💼', query: 'subject:business' }
//   ];
  
//     const handleCategoryClick = (category) => {
//       navigate(`/books?category=${category.query}`);
//     };
  

//   return (
//     <div className="home-page">
//       {/* Hero Section */}
//       <div className="hero-section text-center py-5 bg-light">
//         <Container>
//           <h1 className="display-4 mb-4">Welcome to BookStore</h1>
//           <p className="lead mb-4">
//             Discover millions of eBooks, audiobooks, and more
//           </p>
//           <SearchBar
//             onSearch={(query) => console.log("Searching:", query)}
//             className="max-w-md mx-auto"
//           />
//         </Container>
//       </div>

//       {/* Featured Books Carousel */}
//       <Container className="my-5">
//         <h2 className="mb-4">Featured Books</h2>
//         {loading ? (
//           <p>Loading featured books...</p>
//         ) : (
//           <Carousel className="book-carousel">
//             {featuredBooks.map((book, index) => (
//               <Carousel.Item key={index}>
//                 <img
//                   className="d-block w-100"
//                   src={book.volumeInfo?.imageLinks?.thumbnail?.replace(
//                     "http://",
//                     "https://"
//                   )}
//                   alt={book.volumeInfo?.title}
//                 />
//                 <Carousel.Caption>
//                   <h3>{book.volumeInfo?.title}</h3>
//                   <p>{book.volumeInfo?.authors?.join(", ")}</p>
//                 </Carousel.Caption>
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         )}
//       </Container>

//       {/* Categories Section */}
//       <Container className="my-5">
//         <h2 className="mb-4">Browse Categories</h2>
//         <Row xs={1} md={2} lg={4} className="g-4">
//           {categories.map((category, idx) => (
//             <Col key={idx}>
//               <Card className="category-card text-center h-100">
//                 <Card.Body>
//                   <div className="category-icon mb-3">{category.icon}</div>
//                   <Card.Title>{category.name}</Card.Title>
//                   <Button
//                     variant="outline-primary"
//                     onClick={() => handleCategoryClick(category)}
//                   >
//                     Explore
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Newsletter Section */}
//       <div className="newsletter-section bg-light py-5 mt-5">
//         <Container className="text-center">
//           <h2>Stay Updated</h2>
//           <p className="mb-4">
//             Subscribe to our newsletter for the latest books and updates
//           </p>
//           <Row className="justify-content-center">
//             <Col md={6}>
//               <div className="input-group">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Enter your email"
//                 />
//                 <Button variant="primary">Subscribe</Button>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default Home;

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { fetchBooks } from "../services/api";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        const data = await fetchBooks("bestsellers");
        setFeaturedBooks(data.items.slice(0, 6));
      } catch (error) {
        console.error("Error loading featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedBooks();
  }, []);

  // Function to get the best available image
  const getBestImage = (imageLinks) => {
    if (!imageLinks) return "/placeholder-book.jpg"; // Add a placeholder image path
    
    // Try to get images in order of preference
    return imageLinks.extraLarge || 
           imageLinks.large || 
           imageLinks.medium || 
           imageLinks.small || 
           imageLinks.thumbnail;
  };

  const categories = [
    { name: 'Fiction', icon: '📚', query: 'subject:fiction' },
    { name: 'Science', icon: '🔬', query: 'subject:science' },
    { name: 'Technology', icon: '💻', query: 'subject:technology' },
    { name: 'Business', icon: '💼', query: 'subject:business' }
  ];
  
  const handleCategoryClick = (category) => {
    navigate(`/books?category=${category.query}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-center py-5 bg-light">
        <Container>
          <h1 className="display-4 mb-4">Welcome to BookStore</h1>
          <p className="lead mb-4">
            Discover millions of eBooks, audiobooks, and more
          </p>
          <SearchBar
            onSearch={(query) => console.log("Searching:", query)}
            className="max-w-md mx-auto"
          />
        </Container>
      </div>

      {/* Featured Books Carousel */}
      <Container className="my-5">
        <h2 className="mb-4">Featured Books</h2>
        {loading ? (
          <p>Loading featured books...</p>
        ) : (
          <Carousel className="book-carousel">
            {featuredBooks.map((book, index) => (
              <Carousel.Item key={index}>
                <div className="carousel-image-container d-flex justify-content-center align-items-center">
                  <img
                    className="carousel-image"
                    src={getBestImage(book.volumeInfo?.imageLinks)}
                    alt={book.volumeInfo?.title}
                  />
                </div>
                <Carousel.Caption>
                  <h3>{book.volumeInfo?.title}</h3>
                  <p>{book.volumeInfo?.authors?.join(", ")}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>

      {/* Categories Section */}
      <Container className="my-5">
        <h2 className="mb-4">Browse Categories</h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {categories.map((category, idx) => (
            <Col key={idx}>
              <Card className="category-card text-center h-100">
                <Card.Body>
                  <div className="category-icon mb-3">{category.icon}</div>
                  <Card.Title>{category.name}</Card.Title>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleCategoryClick(category)}
                  >
                    Explore
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Newsletter Section */}
      <div className="newsletter-section bg-light py-5 mt-5">
        <Container className="text-center">
          <h2>Stay Updated</h2>
          <p className="mb-4">
            Subscribe to our newsletter for the latest books and updates
          </p>
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <Button variant="primary">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
