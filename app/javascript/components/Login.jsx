import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [zipCode, setZipCode] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = {
            email: email,
            password: password,
            zipCode: zipCode
        }
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {return response.json()})
            .then((res) => {
                console.log({res})
                window.location.href = "/vote"})
            .catch((error) => console.error(error.message))
            
    }

    return (
        <div>
            <h1>Sign in to vote</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Your email address"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="zipcode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="text"
                        value={zipCode}
                        onChange={(event) => setZipCode(event.target.value)}
                        placeholder="zip code"
                        required
                    />
                </Form.Group>

                <Button
                    type="submit"
                    variant="dark"
                >
                    Sign in
                </Button>
            </Form>
        </div>
    )
}

export default Login;