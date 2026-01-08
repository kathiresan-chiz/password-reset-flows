import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const submit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return setMsg({ type: "danger", text: "Password must be at least 6 characters" });
    }

    if (password !== confirm) {
      return setMsg({ type: "danger", text: "Passwords do not match" });
    }

    try {
      setLoading(true);
      await api.post("/auth/reset-password", { token, password });
      setMsg({ type: "success", text: "Password reset successful 🎉" });
      setPassword("");
      setConfirm("");
    } catch (err) {
      setMsg({
        type: "danger",
        text: err.response?.data?.message || "Invalid or expired link"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card className="auth-card p-4" style={{ width: "380px" }}>
        <h4 className="text-center auth-title mb-3">
          Reset Password 🔑
        </h4>

        {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}

        <Form onSubmit={submit}>
          <Form.Group className="mb-3 icon-input">
            <i className="bi bi-lock-fill"></i>
            <Form.Control
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 icon-input">
            <i className="bi bi-shield-lock-fill"></i>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Reset Password"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
