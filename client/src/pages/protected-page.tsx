import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { callExternalApi } from "../services/external-api.service";

export const ProtectedPage = () => {
  const [message, setMessage] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const config = {
        url: `http://localhost:8000/auth0/protected`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data, error } = await callExternalApi({ config });

      console.log(accessToken);
      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <div>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          {message}
        </div>
      </div>
    </div>
  );
};
