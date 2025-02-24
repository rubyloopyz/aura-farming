import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DashboardOutlined, CalendarOutlined } from "@ant-design/icons";
import Dashboard from "./components/Dashboard";
import Bookings from "./components/Bookings";
import Calendar from "./components/Calendar";
import Login from "./components/Auth/Login";
import PrivateRoute from "./PrivateRoute";

const { Header, Content, Sider } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar Menu (Only show if logged in) */}
        {isAuthenticated && (
          <Sider collapsible>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]} style={{ fontSize: "16px", fontWeight: "bold" }}>
              <Menu.Item key="dashboard" icon={<DashboardOutlined />} style={{ marginTop: "20px" }}>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="bookings" icon={<CalendarOutlined />}>
                <Link to="/bookings">Bookings</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        )}

        {/* Main Layout */}
        <Layout>
          <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "20px" }}>
            Admin Dashboard
          </Header>
          <Content style={{ margin: "20px" }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} component={Dashboard} />} />
              <Route path="/bookings" element={<PrivateRoute isAuthenticated={isAuthenticated} component={Bookings} />} />
              <Route path="/calendar" element={<PrivateRoute isAuthenticated={isAuthenticated} component={Calendar} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
