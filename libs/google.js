const qs = require("qs");
const axios = require("axios");
const jwt = require("jsonwebtoken");

module.exports = {
  getOAuthTokens: async (code) => {
    const url = "https://oauth2.googleapis.com/token";

    const body = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    };

    try {
      const { data } = await axios.post(url, qs.stringify(body), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return data;
      // access_token
      // expires_in
      // refresh_token
      // scope
      // id_token
    } catch (error) {
      console.log(error.response);
      throw new Error("Could not retrieve Google OAuth Tokens");
    }
  },
  decodeUser: (idToken) => {
    const user = jwt.decode(idToken);
    return user;
  },
};
