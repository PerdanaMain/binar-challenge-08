const request = require("supertest");
const app = require("../../app/index");

describe("POST /v1/auth/login", () => {
  const email = "firman@gmail.com";
  const password = "firman";

  it("should response with 201 as status code", async () => {
    return request(app)
      .post("/v1/auth/login")
      .send({
        email,
        password,
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(res.body);
      });
  });
});
