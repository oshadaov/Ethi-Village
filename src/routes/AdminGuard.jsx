import { useState, useEffect } from "react";

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_EMAIL || "admin";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
      return;
    }
    setError("Invalid admin username or password.");
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Enter your admin credentials to continue.</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={ADMIN_USERNAME}
            />
          </div>
          <div className="admin-form-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-submit-btn">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

export default function AdminGuard({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(localStorage.getItem("adminAuth") === "true");
  }, []);

  const handleLogin = () => {
    localStorage.setItem("adminAuth", "true");
    setAuthenticated(true);
  };

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return children;
}
