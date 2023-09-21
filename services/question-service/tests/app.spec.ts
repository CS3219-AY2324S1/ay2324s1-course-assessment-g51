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

describe("POST - failure scenario", () => {
  it("fails to insert question without title", async () => {
    const question = {
      description: "Description",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const response = await request(app).post("/api/questions").send(question);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe(
      "Question validation failed: title: Path `title` is required."
    );
  });

  it("fails to insert question without description", async () => {
    const question = {
      title: "Title",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const response = await request(app).post("/api/questions").send(question);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe(
      "Question validation failed: description: Path `description` is required."
    );
  });

  it("fails to insert question with category of length 0", async () => {
    const question: any = {
      title: "Title",
      description: "Description",
      complexity: "easy",
      category: [],
    };
    const response = await request(app).post("/api/questions").send(question);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe(
      "Question validation failed: category: Validator failed for path `category` with value ``"
    );
  });

  it("fails to insert question without category", async () => {
    const question: any = {
      title: "Title",
      description: "Description",
      complexity: "easy",
    };
    const response = await request(app).post("/api/questions").send(question);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe(
      "Question validation failed: category: Validator failed for path `category` with value ``"
    );
  });

  it("fails to insert question without complexity", async () => {
    const question = {
      title: "Title",
      description: "Description",
      category: ["greedy", "array"],
    };
    const response = await request(app).post("/api/questions").send(question);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe(
      "Question validation failed: complexity: Path `complexity` is required."
    );
  });
});

describe("GET - failure scenario", () => {
  it("returns a 404 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(404);
  });
});
