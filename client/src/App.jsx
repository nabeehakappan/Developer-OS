import { useState } from "react";
import Desktop from "./pages/Desktop.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return isLoggedIn ? (
    <Desktop />
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}