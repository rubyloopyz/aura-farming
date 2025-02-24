import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Modal } from "antd";
import "./Login.css"; // Keep your existing styles

const Login = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = (values) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("authToken", "your-token"); // Simulate authentication
      setIsAuthenticated(true);
      message.success("Login successful!");
      navigate("/dashboard");
    }, 1000);
  };

  const handleForgotPassword = () => {
    if (!email) {
      message.error("Please enter your email.");
      return;
    }
    message.success("Password reset link sent to your email.");
    setForgotPasswordVisible(false);
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo"><p></p></div>
        <h6 className="title">Hotel Management System</h6>
        <div className="welcome-image"><p></p></div>
      </div>
      <div className="right-section">
        <h3 className="admin">Admin Login</h3>
        <Form onFinish={handleLogin}>
          <Form.Item name="username" rules={[{ required: true, message: "Enter username!" }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Enter password!" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" loading={loading} className="login-button">
            LOGIN
          </Button>
          <a onClick={() => setForgotPasswordVisible(true)} className="forgot-password">
            Forgot Password?
          </a>
        </Form>
        
      </div>
      {/* Forgot Password Modal */}
      <Modal
        title="Forgot Password"
        open={forgotPasswordVisible}
        onCancel={() => setForgotPasswordVisible(false)}
        onOk={handleForgotPassword}
        okText="Reset Password"
      >
        <p>Enter your email address to reset your password:</p>
        <Input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
    </div>

  );
};

export default Login;
