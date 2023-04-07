import axios from "axios";

export default function Session() {
  const handleLoginWithSession = () => {
    axios
      .post(
        "http://localhost:8000/session/login",
        {
          id: "Fred",
          password: "123123123",
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleGetData = () => {
    axios
      .get("http://localhost:8000/session/data", { withCredentials: true })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleLoginWithSession}>Login using session</button>
      <button onClick={handleGetData}>Get Data</button>
    </>
  );
}
