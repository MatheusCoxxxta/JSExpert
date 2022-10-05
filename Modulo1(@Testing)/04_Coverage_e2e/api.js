const http = require("http");
const DEFAULT_USER = { username: "MatheusCosta", password: "123" };

const routes = {
  "/contact:get": (request, response) => {
    response.write("Contact us page");
    return response.end();
  },
  "/login:post": async (request, response) => {
    // response é um iterator!
    for await (const data of request) {
      const user = JSON.parse(data);

      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write("Login has failed...");
        return response.end();
      }

      response.write("Login has succeded!");
      return response.end();
    }
  },
  default: (request, response) => {
    response.write("404 Page");
    return response.end();
  },
};

const handler = function (request, response) {
  const { url, method } = request;

  const routeKey = `${url}:${method.toLowerCase()}`;

  const chosen = routes[routeKey] || routes.default;

  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(6001, () => console.log("app running on", 6001));

module.exports = app;
