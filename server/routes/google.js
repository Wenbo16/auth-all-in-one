var express = require("express");
var router = express.Router();
const { google } = require("googleapis");
require("dotenv").config();
var jwt = require("jsonwebtoken");
var axios = require("axios");
var querystring = require("querystring");

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const redirectURI = "oauth/redirect";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `http://localhost:8000/google/${redirectURI}`
);

// Access scopes for read-only Drive activity.
const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  /** Pass in the scopes array defined above.
   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true,
});

function getTokens({ code }) {
  /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    // redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch auth tokens`);
      throw new Error(error.message);
    });
}

router.get("/url", function (req, res) {
  res.send({ url: authorizationUrl });
});

// Getting the user from Google with the code
router.get(`/${redirectURI}`, async (req, res) => {
  const code = req.query.code;
  console.log(code);
  // const { id_token, access_token } = await getTokens({
  //   code,
  // });
  const { tokens } = await oauth2Client.getToken("code");
  oauth2Client.setCredentials(tokens);
  console.log(tokens);

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });

  // const token = jwt.sign(googleUser, JWT_SECRET);

  // res.cookie(COOKIE_NAME, token, {
  //   maxAge: 900000,
  //   httpOnly: true,
  //   secure: false,
  // });

  res.redirect("http://localhost:3000");
});

module.exports = router;
