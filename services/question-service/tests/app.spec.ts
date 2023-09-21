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

describe("GET - success scenario", () => {});

describe("GET - failure scenario", () => {
  it("returns 404 status code for unregistered path", async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(404);
  });

  it("returns 500 status code for invalid id", async () => {
    const response = await request(app).get("/api/questions/1234567890");
    expect(response.status).toEqual(500);
  });

  it("returns 404 status code for unknown id", async () => {
    const response = await request(app).get(
      "/api/questions/507f1f77bcf86cd799439011"
    );
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Question does not exist");
  });
});

describe("UPDATE - success scenario", () => {});

describe("UPDATE - failure scenario", () => {});

describe("DELETE - success scenario", () => {});

describe("DELETE - failure scenario", () => {});
