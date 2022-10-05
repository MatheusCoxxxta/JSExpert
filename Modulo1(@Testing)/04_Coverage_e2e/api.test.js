const { describe, it } = require("mocha");
const request = require("supertest");
const api = require("./api");
const assert = require("assert");

describe("api", () => {
  describe("/contact", () => {
    it("should request the contact page and return http status 200", async () => {
      const response = await request(api).get("/contact").expect(200);

      assert.deepStrictEqual(response.text, "Contact us page");
    });
  });

  describe("/404", () => {
    it("should request an inexistent route and redirect to 404 Page", async () => {
      const response = await request(api).get("/hello").expect(200);
      const otherInexistentPage = await request(api).get("/other").expect(200);

      assert.deepStrictEqual(response.text, "404 Page");
      assert.deepStrictEqual(otherInexistentPage.text, "404 Page");
    });
  });

  describe("/login", () => {
    it("should login successfully on the login route and return Status 200", async () => {
      const response = await request(api)
        .post("/login")
        .send({ username: "MatheusCosta", password: "123" })
        .expect(200);

      assert.deepStrictEqual(response.text, "Login has succeded!");
    });

    it("should fail on login and return Status 401", async () => {
      const response = await request(api)
        .post("/login")
        .send({ username: "MatheusCosta", password: "wrong" })
        .expect(401);

      assert.deepStrictEqual(response.unauthorized, true);
    });
  });
});
