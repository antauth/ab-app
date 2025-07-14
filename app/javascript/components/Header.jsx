import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Header = ({ user }) => {
  const [me, setMe] = useState([])
  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => setMe(data))
  }, [])
  return (
    <header className="bg-light mb-3">
      <Row>
        <Col>
          <h1 className="display-4 px-3">Voting App</h1>
        </Col>
        <Col>
          {me ? <p className="text-end mt-3 pe-3">Logged in as {me.voter}</p> : ''}
        </Col>
      </Row>

    </header>
  );
};

export default Header;
