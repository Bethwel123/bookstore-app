import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Nav } from 'react-bootstrap';
import { FaUser, FaHistory, FaHeart, FaCog } from 'react-icons/fa';

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update user logic here
    setEditing(false);
  };

  return (
    <Container className="py-5">
      <Tab.Container defaultActiveKey="profile">
        <Row>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <div className="text-center mb-3">
                  <img
                    src={user?.avatar || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="rounded-circle profile-avatar"
                  />
                  <h5 className="mt-3">{user?.firstName} {user?.lastName}</h5>
                </div>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="profile">
                      <FaUser className="me-2" /> Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders">
                      <FaHistory className="me-2" /> Order History
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wishlist">
                      <FaHeart className="me-2" /> Wishlist
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings">
                      <FaCog className="me-2" /> Settings
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4>Profile Information</h4>
                      <Button 
                        variant="outline-primary"
                        onClick={() => setEditing(!editing)}
                      >
                        {editing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    </div>
                    <Form onSubmit={handleUpdate}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={user?.firstName}
                              disabled={!editing}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={user?.lastName}
                              disabled={!editing}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          defaultValue={user?.email}
                          disabled={!editing}
                        />
                      </Form.Group>
                      {editing && (
                        <Button type="submit" variant="primary">
                          Save Changes
                        </Button>
                      )}
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="orders">
                <Card>
                  <Card.Body>
                    <h4>Order History</h4>
                    {/* Order history content */}
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="wishlist">
                <Card>
                  <Card.Body>
                    <h4>My Wishlist</h4>
                    {/* Wishlist content */}
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="settings">
                <Card>
                  <Card.Body>
                    <h4>Account Settings</h4>
                    {/* Settings content */}
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Profile;