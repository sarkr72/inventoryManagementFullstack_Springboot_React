
import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import '../css/WelcomePage.css';
import { isUserLoggedIn } from '../services/AuthService';
import { useState, useEffect } from 'react'

const WelcomePage = () => {
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [detailMessage, setDetailMessage] = useState("");

    useEffect(() => {
        const message1 = "   Welcome to our Inventory Management System";
        const message2 = "   Streamline your inventory processes and make informed decisions with our powerful tools.";
        let index = 0;
    
        const typingEffect = setInterval(() => {
            if (index < (message1.length + message2.length)) {
                if (index >= message1.length) {
                    setDetailMessage((prev) => prev + message2.charAt(index - message1.length));
                } else {
                    setWelcomeMessage((prev) => prev + message1.charAt(index));
                }
                index++;
            } else {
                clearInterval(typingEffect);
            }
        }, 60); // Adjust the speed as needed
        return () => clearInterval(typingEffect);
    }, []);
    return (
        <div>
            <Container fluid className="hero-section text-center text-white">
                <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Col md={8} style={{ marginTop: "10px", marginBottom: "10px" }} className='bg-dark p-5 border border-light rounded-4 shadow-lg text-center'>
                        <img
                            src="assets/images/logo.png"
                            alt="Inventory Management System Logo"
                            className="mb-4 rounded-3"
                            style={{ maxWidth: '200px', height: 'auto' }}
                        />
                        <h1 className="display-4 text-white">{welcomeMessage}</h1>
                        <p className="lead text-white">
                            {detailMessage}
                        </p>
                        <Button variant="primary" size="lg" href={`${isUserLoggedIn() ? "/homepage" : "/login"}`}>
                            {isUserLoggedIn() ? "Go to Homepage" : "Log In"}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default WelcomePage;