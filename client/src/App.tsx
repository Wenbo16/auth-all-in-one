import { Navigate, Route, Routes } from "react-router";
import OAuth2 from "./pages/OAuth2";
import Session from "./pages/Session";
import Home from "./pages/Home";
import Auth0 from "./pages/Auth0";

import { Link } from "react-router-dom";
import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { ProtectedPage } from "./pages/protected-page";

import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/session">Session</Link>
          </li>
          <li>
            <Link to="/oauth2">Auth2</Link>
          </li>
          <li>
            <Link to="/Auth0">Auth0</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/oauth2" element={<OAuth2 />} />
        <Route path="/Auth0" element={<Auth0 />} />
        {/* this route is for test usage */}
        <Route
          path="/protected"
          element={<AuthenticationGuard component={ProtectedPage} />}
        />
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
