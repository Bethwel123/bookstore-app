import { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Tab,
  Nav,
} from "react-bootstrap";
import { FaUser, FaHistory, FaHeart, FaCog, FaCamera } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
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
      avatar: imagePreview || user?.avatar,
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
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

  const [settings, setSettings] = useState({
    language: "English",
    currency: "USD ($)",
    notifications: {
      email: false,
      orders: true,
      promotional: false,
    },
    privacy: {
      publicProfile: true,
      readingHistory: false,
    },
  });

  // Add this useEffect to load saved settings
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Add these handler functions
  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => {
      const newSettings = category
        ? { ...prev, [category]: { ...prev[category], [setting]: value } }
        : { ...prev, [setting]: value };
      localStorage.setItem("userSettings", JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const handlePasswordChange = () => {
    const currentPassword = prompt("Enter current password:");
    const newPassword = prompt("Enter new password:");
    if (currentPassword && newPassword) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.password = newPassword;
      localStorage.setItem("user", JSON.stringify(user));
      alert("Password updated successfully!");
    }
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirm) {
      localStorage.removeItem("user");
      localStorage.removeItem("userSettings");
      localStorage.removeItem("wishlist");
      localStorage.removeItem("cartItems");
      window.location.href = "/";
    }
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
                      src={
                        imagePreview ||
                        user?.avatar ||
                        "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid"
                      }
                      alt="Profile"
                      className="rounded-circle profile-avatar"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                    {editing && (
                      <div
                        className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2"
                        onClick={triggerFileInput}
                        style={{ cursor: "pointer" }}
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
                  <h5 className="mt-3">
                    {user?.firstName} {user?.lastName}
                  </h5>
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
                      <span className="badge bg-primary ms-2">
                        {JSON.parse(localStorage.getItem("wishlist"))?.length ||
                          0}
                      </span>
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
                        {editing ? "Cancel" : "Edit Profile"}
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
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4>My Wishlist</h4>
                      <span className="text-muted">
                        {JSON.parse(localStorage.getItem("wishlist"))?.length ||
                          0}{" "}
                        items
                      </span>
                    </div>
                    <Row xs={1} md={2} lg={3} className="g-4">
                      {JSON.parse(localStorage.getItem("wishlist"))?.map(
                        (item) => (
                          <Col key={item.id}>
                            <Card className="h-100 book-card">
                              <Card.Img
                                variant="top"
                                src={item.image?.replace("http://", "https://")}
                                alt={item.title}
                                className="book-cover"
                              />
                              <Card.Body>
                                <Card.Title className="text-truncate">
                                  {item.title}
                                </Card.Title>
                                <Card.Text className="text-muted">
                                  by {item.authors?.join(", ")}
                                </Card.Text>
                                <Card.Text className="fw-bold">
                                  ${item.price}
                                </Card.Text>
                              </Card.Body>
                              <Card.Footer className="bg-white border-top-0">
                                <Button
                                  variant="primary"
                                  className="w-100 mb-2"
                                  onClick={() => {
                                    const cartItems =
                                      JSON.parse(
                                        localStorage.getItem("cartItems")
                                      ) || [];
                                    cartItems.push({ ...item, quantity: 1 });
                                    localStorage.setItem(
                                      "cartItems",
                                      JSON.stringify(cartItems)
                                    );

                                    const wishlist = JSON.parse(
                                      localStorage.getItem("wishlist")
                                    ).filter((book) => book.id !== item.id);
                                    localStorage.setItem(
                                      "wishlist",
                                      JSON.stringify(wishlist)
                                    );

                                    window.location.reload();
                                  }}
                                >
                                  Move to Cart
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  className="w-100"
                                  onClick={() => {
                                    const wishlist = JSON.parse(
                                      localStorage.getItem("wishlist")
                                    ).filter((book) => book.id !== item.id);
                                    localStorage.setItem(
                                      "wishlist",
                                      JSON.stringify(wishlist)
                                    );
                                    window.location.reload();
                                  }}
                                >
                                  Remove
                                </Button>
                              </Card.Footer>
                            </Card>
                          </Col>
                        )
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="settings">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4>Account Settings</h4>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setEditing(!editing);
                          if (editing) {
                            localStorage.setItem(
                              "userSettings",
                              JSON.stringify(settings)
                            );
                          }
                        }}
                      >
                        {editing ? "Save Changes" : "Edit Settings"}
                      </Button>
                    </div>

                    <Form>
                      <h5 className="mb-3">Account Preferences</h5>
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Language</Form.Label>
                            <Form.Select
                              disabled={!editing}
                              value={settings.language}
                              onChange={(e) =>
                                handleSettingChange(
                                  null,
                                  "language",
                                  e.target.value
                                )
                              }
                            >
                              <option>English</option>
                              <option>Spanish</option>
                              <option>French</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Currency</Form.Label>
                            <Form.Select
                              disabled={!editing}
                              value={settings.currency}
                              onChange={(e) =>
                                handleSettingChange(
                                  null,
                                  "currency",
                                  e.target.value
                                )
                              }
                            >
                              <option>USD ($)</option>
                              <option>EUR (€)</option>
                              <option>GBP (£)</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <h5 className="mb-3">Notification Settings</h5>
                      <div className="mb-4">
                        <Form.Check
                          type="switch"
                          id="email-notifications"
                          label="Email Notifications"
                          disabled={!editing}
                          checked={settings.notifications.email}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "email",
                              e.target.checked
                            )
                          }
                        />
                        <Form.Check
                          type="switch"
                          id="order-updates"
                          label="Order Updates"
                          disabled={!editing}
                          checked={settings.notifications.orders}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "orders",
                              e.target.checked
                            )
                          }
                        />
                        <Form.Check
                          type="switch"
                          id="promotional-emails"
                          label="Promotional Emails"
                          disabled={!editing}
                          checked={settings.notifications.promotional}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "promotional",
                              e.target.checked
                            )
                          }
                        />
                      </div>

                      <h5 className="mb-3">Privacy Settings</h5>
                      <div className="mb-4">
                        <Form.Check
                          type="switch"
                          id="profile-visibility"
                          label="Public Profile"
                          disabled={!editing}
                          checked={settings.privacy.publicProfile}
                          onChange={(e) =>
                            handleSettingChange(
                              "privacy",
                              "publicProfile",
                              e.target.checked
                            )
                          }
                        />
                        <Form.Check
                          type="switch"
                          id="reading-history"
                          label="Share Reading History"
                          disabled={!editing}
                          checked={settings.privacy.readingHistory}
                          onChange={(e) =>
                            handleSettingChange(
                              "privacy",
                              "readingHistory",
                              e.target.checked
                            )
                          }
                        />
                      </div>

                      <h5 className="mb-3">Security</h5>
                      <Row>
                        <Col md={6}>
                          <Button
                            variant="outline-primary"
                            className="w-100 mb-2"
                            onClick={handlePasswordChange}
                          >
                            Change Password
                          </Button>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="outline-danger"
                            className="w-100 mb-2"
                            onClick={handleDeleteAccount}
                          >
                            Delete Account
                          </Button>
                        </Col>
                      </Row>
                    </Form>
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
