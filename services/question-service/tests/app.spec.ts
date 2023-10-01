import request from "supertest";

import app from "../src/app";

const apiRoute = "/api/questions";
const nonExistentDocId = "507f1f77bcf86cd799439011";

describe("POST - success scenario", () => {
  it("successfully inserts a question into the database", async () => {
    const question = {
      title: "POST 1",
      description: "Description one",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const response = await request(app).post(apiRoute).send(question);
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject(question);
  });

  it("successfully inserts a question with extraneous fields", async () => {
    const question = {
      title: "POST 2",
      description: "Description one",
      category: ["greedy", "array"],
      complexity: "easy",
      extra: true,
    };
    const response = await request(app).post(apiRoute).send(question);
    expect(response.status).toEqual(201);
  });
});

describe("POST - failure scenario", () => {
  it("fails to insert question without title", async () => {
    const question = {
      description: "Description",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const response = await request(app).post(apiRoute).send(question);
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
    const response = await request(app).post(apiRoute).send(question);
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
    const response = await request(app).post(apiRoute).send(question);
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
    const response = await request(app).post(apiRoute).send(question);
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
    const response = await request(app).post(apiRoute).send(question);
    expect(response.status).toEqual(400);
    expect(response.body.message).toBe(
      "Question validation failed: complexity: Path `complexity` is required."
    );
  });
});

describe("GET - success scenario", () => {
  it("finds a question given its id", async () => {
    const question = {
      title: "GET 1",
      description: "Description",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const mockQuestion = await request(app).post(apiRoute).send(question);
    const mockQuestionId = mockQuestion.body._id;

    const response = await request(app).get(apiRoute + "/" + mockQuestionId);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject(question);
  });

  it("finds questions given complexity", async () => {
    const question = {
      title: "GET 2",
      description: "Description",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const mockQuestion = await request(app).post(apiRoute).send(question);
    const mockQuestionId = mockQuestion.body._id;

    const response = await request(app).get(apiRoute + "?complexity=easy");
    expect(response.status).toEqual(200);
    console.log(response.body);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET - failure scenario", () => {
  it("returns 404 status code for unregistered path", async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(404);
  });

  it("returns 500 status code for invalid id", async () => {
    const response = await request(app).get(apiRoute + "/1234567890");
    expect(response.status).toEqual(500);
    expect(response.body.message).toBe(
      `Cast to ObjectId failed for value "1234567890" (type string) at path "_id" for model "Question"`
    );
  });

  it("returns 404 status code for unknown id", async () => {
    const response = await request(app).get(apiRoute + "/" + nonExistentDocId);
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Question does not exist");
  });
});

describe("UPDATE - success scenario", () => {
  it("updates a question's title", async () => {
    const question = {
      title: "To be updated",
      description: "Description",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const mockQuestion = await request(app).post(apiRoute).send(question);
    const mockQuestionId = mockQuestion.body._id;
    const updateBody = {
      title: "Update 1",
    };
    const response = await request(app)
      .patch(apiRoute + "/" + mockQuestionId)
      .send(updateBody);
    expect(response.status).toEqual(200);
  });

  it("updates a question's description", async () => {
    const question = {
      title: "Update 2",
      description: "To be updated",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const mockQuestion = await request(app).post(apiRoute).send(question);
    const mockQuestionId = mockQuestion.body._id;
    const updateBody = {
      description: "Updated",
    };
    const response = await request(app)
      .patch(apiRoute + "/" + mockQuestionId)
      .send(updateBody);
    expect(response.status).toEqual(200);
  });

  it("updates a question's category", async () => {
    const question = {
      title: "Update 3",
      description: "Description",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const mockQuestion = await request(app).post(apiRoute).send(question);
    const mockQuestionId = mockQuestion.body._id;
    const updateBody = {
      category: ["dynamic programming"],
    };
    const response = await request(app)
      .patch(apiRoute + "/" + mockQuestionId)
      .send(updateBody);
    expect(response.status).toEqual(200);
  });

  it("updates a question's complexity", async () => {
    const question = {
      title: "Update 4",
      description: "Description",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const mockQuestion = await request(app).post(apiRoute).send(question);
    const mockQuestionId = mockQuestion.body._id;
    const updateBody = {
      complexity: "difficult",
    };
    const response = await request(app)
      .patch(apiRoute + "/" + mockQuestionId)
      .send(updateBody);
    expect(response.status).toEqual(200);
  });
});

describe("UPDATE - failure scenario", () => {
  it("returns 404 status code for unknown id", async () => {
    const response = await request(app).patch(
      apiRoute + "/" + nonExistentDocId
    );
    expect(response.status).toEqual(404);
  });

  it("fails to update invalid fields", async () => {});
});

describe("DELETE - success scenario", () => {
  it("deletes a question from the database", async () => {
    const question = {
      title: "DELETE 1",
      description: "Description one",
      category: ["greedy", "array"],
      complexity: "easy",
    };
    const mockQuestion = await request(app).post(apiRoute).send(question);
    const mockQuestionId = mockQuestion.body._id;
    const response = await request(app).delete(apiRoute + "/" + mockQuestionId);
    expect(response.status).toEqual(204);
  });
});

describe("DELETE - failure scenario", () => {
  it("returns 404 status code for unknown id", async () => {
    const response = await request(app).delete(
      apiRoute + "/" + nonExistentDocId
    );
    expect(response.status).toEqual(404);
  });
});
