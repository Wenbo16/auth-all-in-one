import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function OAuth2() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button onClick={() => loginWithRedirect()}>Login with Auth0</button>
      <Link to="/protected">Fetch protected data</Link>
    </>
  );
}
