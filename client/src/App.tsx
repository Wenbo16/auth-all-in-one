import { Navigate, Route, Routes } from "react-router";
import OAuth2 from "./pages/OAuth2";
import Session from "./pages/Session";
import Home from "./pages/Home";
import "./App.css";
import { Link } from "react-router-dom";

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
        </ul>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/oauth2" element={<OAuth2 />} />

        {/* this route is for test usage */}
        {/* <Route
          path="/protected"
          element={<AuthenticationGuard component={ProtectedPage} />}
        /> */}
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
