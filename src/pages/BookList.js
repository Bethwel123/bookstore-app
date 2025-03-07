import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { useSearchParams, Link } from "react-router-dom";
import { fetchBooks } from "../services/api";

function BookList() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    const category = searchParams.get("category");
    const query = category || searchParams.get("search") || "programming";
    loadBooks(query);
  }, [searchParams, sortBy]);

  const loadBooks = async (query) => {
    setLoading(true);
    try {
      const data = await fetchBooks(query);
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortBooks = (books) => {
    switch (sortBy) {
      case "title":
        return [...books].sort((a, b) =>
          a.volumeInfo.title.localeCompare(b.volumeInfo.title)
        );
      case "author":
        return [...books].sort((a, b) =>
          (a.volumeInfo.authors?.[0] || "").localeCompare(
            b.volumeInfo.authors?.[0] || ""
          )
        );
      default:
        return books;
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortBooks(books).slice(
    indexOfFirstBook,
    indexOfLastBook
  );
  const totalPages = Math.ceil(books.length / booksPerPage);

  const renderPagination = () => {
    return (
      <div className="d-flex justify-content-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "primary" : "outline-primary"}
            onClick={() => setCurrentPage(index + 1)}
            className="mx-1"
          >
            {index + 1}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Book Collection</h1>
        <Form.Select
          style={{ width: "auto" }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
        </Form.Select>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {currentBooks.map((book) => (
              <Col key={book.id}>
                <Card className="h-100 book-card">
                  <Card.Img
                    variant="top"
                    src={
                      book.volumeInfo?.imageLinks?.thumbnail?.replace(
                        "http://",
                        "https://"
                      ) || "/placeholder.png"
                    }
                    alt={book.volumeInfo?.title}
                    className="book-cover"
                  />
                  <Card.Body>
                    <Card.Title className="text-truncate">
                      {book.volumeInfo?.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {book.volumeInfo?.authors?.join(", ")}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top-0">
                    <Button
                      as={Link}
                      to={`/book/${book.id}`}
                      variant="primary"
                      className="w-100"
                    >
                      View Details
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          {renderPagination()}
        </>
      )}
    </Container>
  );
}

export default BookList;
