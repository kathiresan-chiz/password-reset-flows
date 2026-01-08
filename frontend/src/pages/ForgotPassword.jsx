import { useState } from "react";
import api from "../services/api";
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const submit = async (e) => {
    e.preventDefault();

    if (!email) {
      return setMsg({ type: "danger", text: "Email is required" });
    }

    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });
      setMsg({ type: "success", text: "Reset link sent to your email" });
      setEmail("");
    } catch (err) {
      setMsg({
        type: "danger",
        text: err.response?.data?.message || "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card className="auth-card p-4" style={{ width: "380px" }}>
        {/* <h1 style={{ color: 'red', textAlign: 'center' }}>
    Forgot Password Loaded
  </h1> */}
        <h4 className="text-center auth-title mb-3">
          Forgot Password 🔐
        </h4>

        <p className="text-muted text-center mb-4">
          Enter your registered email
        </p>

        {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}

        <Form onSubmit={submit}>
          <Form.Group className="mb-3 icon-input">
            {/* <i className="bi bi-envelope-fill"></i> */}
            <Form.Control
              type="email"
              placeholder=" Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Send Reset Link"}
          </Button>
        </Form>
        <div className="alert alert-info mt-4">
        <strong>Instructions:</strong>
        <ol className="mt-2 mb-0">
          <li>Enter your registered email</li>
          <li>Check your inbox for reset link</li>
          <li>Link expires in 15 minutes</li>
          <li>Enter your new Password</li>
        </ol>
      </div>
      </Card>
      
    </div>
  );
}
