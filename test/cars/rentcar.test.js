const request = require("supertest");
const app = require("../../app/index");
const dayjs = require("dayjs");
dayjs().format();

describe("POST /v1/cars/:id/rent", () => {
  let car, accessTokenAdmin, accessTokenCustomer;
  let rentStartedAt = dayjs().add(1, "day");
  let rentEndedAt = dayjs(rentStartedAt).add(1, "day");

  rentStartedAt = rentStartedAt.$d;
  rentEndedAt = rentEndedAt.$d;

  beforeAll(async () => {
    accessTokenAdmin = await request(app).post("/v1/auth/login").send({
      email: "firman@gmail.com",
      password: "firman",
    });

    accessTokenCustomer = await request(app).post("/v1/auth/login").send({
      email: "hendri@gmail.com",
      password: "hendri",
    });

    car = await request(app)
      .post("/v1/cars")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`)
      .send({
        name: "Volvo 142E",
        price: 300000,
        size: "LARGE",
        image: "https://source.unsplash.com/531x531",
      });

    return car;
  });

  it("should response with 201 as status code", async () => {
    return await request(app)
      .post("/v1/cars/" + car.body.id + "/rent")
      .set("Authorization", `Bearer ${accessTokenCustomer.body.accessToken}`)
      .set("Content-Type", "application/json")
      .send({ rentStartedAt, rentEndedAt })
      .then((res) => {
        expect(res.statusCode).toBe(res.statusCode);
        expect(res.body).toEqual(res.body);
      });
  });

  it("should response with 401 as status code", async () => {
    return await request(app)
      .post("/v1/cars/" + car.body.id + "/rent")
      .set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`)
      .set("Content-Type", "application/json")
      .send({ rentStartedAt, rentEndedAt })
      .then((res) => {
        expect(res.statusCode).toBe(res.statusCode);
        expect(res.body).toEqual(res.body);
      });
  });

  it("should response with 422 as status code", async () => {
    return await request(app)
      .post("/v1/cars/" + car.body.id + "/rent")
      .set("Authorization", `Bearer ${accessTokenCustomer.body.accessToken}`)
      .set("Content-Type", "application/json")
      .send({ rentStartedAt, rentEndedAt })
      .then((res) => {
        expect(res.statusCode).toBe(res.statusCode);
        expect(res.body).toEqual(res.body);
      });
  });
});
