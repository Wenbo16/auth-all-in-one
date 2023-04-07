import axios from "axios";

export default function OAuth2() {
  const handleOAuthGoogle = () => {
    axios
      .get("http://localhost:8000/google/url", { withCredentials: true })
      .then(function (response) {
        console.log(response.data);
        window.open(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return <button onClick={handleOAuthGoogle}>Login with Goolge</button>;
}
