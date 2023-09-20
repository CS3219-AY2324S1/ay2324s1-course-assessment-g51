import request from "supertest";

import app from "../src/app";

describe("POST - success scenario", () => {
  it("successfully inserts a question into the database", async () => {
    const question = {
      title: "Title One",
      description: "Description one",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const response = await request(app).post("/api/questions").send(question);
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject(question);
  });
});

describe("GET - failure scenario", () => {
  it("returns a 404 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(404);
  });
});
