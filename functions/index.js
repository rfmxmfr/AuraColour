const { onRequest } = require("firebase-functions/v2/https");

const nextjsFunc = onRequest(
  {
    region: "us-central1",
    memory: "1GiB",
    timeoutSeconds: 60,
  },
  async (req, res) => {
    const { default: server } = await import("./nextjs/server.js");
    return server(req, res);
  }
);

module.exports = { nextjsFunc };