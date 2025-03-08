import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Nav } from 'react-bootstrap';
import { FaUser, FaHistory, FaHeart, FaCog, FaCamera } from 'react-icons/fa';

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Create updated user object with all form data
    const updatedUser = {
      ...user,
      firstName: e.target.elements.firstName.value,
      lastName: e.target.elements.lastName.value,
      email: e.target.elements.email.value,
      // Update avatar if a new one was selected
      avatar: imagePreview || user?.avatar
    };
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Container className="py-5">
      <Tab.Container defaultActiveKey="profile">
        <Row>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <div className="text-center mb-3">
                  <div className="position-relative d-inline-block">
                    <img
                      src={imagePreview || user?.avatar || 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid'}
                      alt="Profile"
                      className="rounded-circle profile-avatar"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    {editing && (
                      <div 
                        className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2"
                        onClick={triggerFileInput}
                        style={{ cursor: 'pointer' }}
                      >
                        <FaCamera color="white" />
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          className="d-none"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    )}
                  </div>
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
                        onClick={() => {
                          if (editing) {
                            // Reset image preview when canceling
                            setImagePreview(null);
                          }
                          setEditing(!editing);
                        }}
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
                              name="firstName"
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
                              name="lastName"
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
                          name="email"
                          defaultValue={user?.email}
                          disabled={!editing}
                        />
                      </Form.Group>
                      {editing && (
                        <div className="mt-3">
                          <Button type="submit" variant="primary">
                            Save Changes
                          </Button>
                        </div>
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