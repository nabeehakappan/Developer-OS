import { useState } from "react";
import Desktop from "./pages/Desktop";
import Login from "./pages/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return loggedIn ? (
    <Desktop />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default App;