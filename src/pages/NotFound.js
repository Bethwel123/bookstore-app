import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button 
        variant="primary" 
        onClick={() => navigate('/')}
      >
        Return to Home
      </Button>
    </Container>
  );
}

export default NotFound;