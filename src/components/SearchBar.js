import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSubmit} className="search-container">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;