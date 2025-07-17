const { createGoogleGenerativeAI } = require("@ai-sdk/google");
const { fetch, ProxyAgent } = require("undici");

const dispatcher = process.env.http_proxy ? new ProxyAgent(process.env.http_proxy) : undefined;

const google = createGoogleGenerativeAI({
  fetch: async (req, options) => {
    return fetch(req, {
      ...options,
      ...(dispatcher && { dispatcher }),
    });
  },
});

module.exports = {
  google,
};
