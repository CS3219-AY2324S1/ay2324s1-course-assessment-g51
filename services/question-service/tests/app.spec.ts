import chai, { expect } from "chai";
import chaiSubset from "chai-subset";
import mongoUnit from "mongo-unit";
import request from "supertest";

import app from "../src/app";
import * as mockData from "./fixtures/mockData";

// chai plugins
chai.use(chaiSubset);

// global constants
const apiRoute = "/api/questions";
const nonExistentDocId = "507f1f77bcf86cd799439011";

describe("POST - success scenario", () => {
  afterEach(() => mongoUnit.drop());

  it("successfully inserts a question into the database", async () => {
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionJson);
    expect(response.status).to.equal(201);
    expect(response.body).to.containSubset(mockData.validQuestionJson);
  });

  it("successfully inserts a question with extraneous fields", async () => {
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionWithExtraFieldsJson);
    expect(response.status).to.equal(201);
  });
});

describe("POST - failure scenario", () => {
  afterEach(() => mongoUnit.drop());

  it("returns 404 status code for unregistered path", async () => {
    const response = await request(app)
      .post("/api/unknown")
      .send(mockData.validQuestionJson);
    expect(response.status).to.equal(404);
  });

  it("fails to insert question with duplicated title", async () => {
    await request(app).post(apiRoute).send(mockData.validQuestionJson);
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionJson);
    expect(response.status).to.equal(400);
  });

  it("fails to insert question without title", async () => {
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.invalidQuestionWithoutTitleJson);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "Question validation failed: title: Path `title` is required."
    );
  });

  it("fails to insert question without description", async () => {
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.invalidQuestionWithoutDescriptionJson);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "Question validation failed: description: Path `description` is required."
    );
  });

  it("fails to insert question with category of length 0", async () => {
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.invalidQuestionWithEmptyCategoryJson);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "Question validation failed: category: Validator failed for path `category` with value ``"
    );
  });

  it("fails to insert question without category", async () => {
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.invalidQuestionWithoutCategoryJson);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "Question validation failed: category: Validator failed for path `category` with value ``"
    );
  });

  it("fails to insert question without complexity", async () => {
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.invalidQuestionWithoutComplexityJson);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "Question validation failed: complexity: Path `complexity` is required."
    );
  });

  it("fails to insert question with invalid complexity", async () => {
    const response = await request(app)
      .post(apiRoute)
      .send(mockData.invalidQuestionWithInvalidComplexityJson);
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      "Question validation failed: complexity: `very difficult` is not a valid enum value for path `complexity`."
    );
  });
});

describe("GET - success scenario", () => {
  afterEach(() => mongoUnit.drop());

  it("finds a question given its id", async () => {
    const question = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionJson);
    const questionId = question.body._id;
    const response = await request(app).get(apiRoute + "/" + questionId);
    expect(response.status).to.equal(200);
    expect(response.body).containSubset(mockData.validQuestionJson);
  });

  it("finds questions given complexity", async () => {
    await request(app).post(apiRoute).send(mockData.validQuestionJson);
    const response = await request(app).get(
      apiRoute + `?complexity=${mockData.validQuestionJson["complexity"]}`
    );
    expect(response.status).to.equal(200);
    expect(response.body.length).to.greaterThan(0);
  });
});

describe("GET - failure scenario", () => {
  it("returns 404 status code for unregistered path", async () => {
    const response = await request(app).get("/");
    expect(response.status).to.equal(404);
  });

  it("returns 500 status code for invalid id", async () => {
    const response = await request(app).get(apiRoute + "/1234567890");
    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal(
      `Cast to ObjectId failed for value "1234567890" (type string) at path "_id" for model "Question"`
    );
  });

  it("returns 404 status code for unknown id", async () => {
    const response = await request(app).get(apiRoute + "/" + nonExistentDocId);
    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal("Question does not exist");
  });
});

describe("UPDATE - success scenario", () => {
  afterEach(() => mongoUnit.drop());

  it("updates a question's title", async () => {
    const question = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionJson);
    const questionId = question.body._id;
    const newTitle = "New Title";
    const updateBody = {
      title: newTitle,
    };
    const response = await request(app)
      .patch(apiRoute + "/" + questionId)
      .send(updateBody);
    expect(response.status).to.equal(200);
    expect(response.body.title).to.equal(newTitle);
  });

  it("updates a question's description", async () => {
    const question = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionJson);
    const questionId = question.body._id;
    const newDescription = "New description";
    const updateBody = {
      description: newDescription,
    };
    const response = await request(app)
      .patch(apiRoute + "/" + questionId)
      .send(updateBody);
    expect(response.status).to.equal(200);
    expect(response.body.description).to.equal(newDescription);
  });

  it("updates a question's category", async () => {
    const question = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionJson);
    const questionId = question.body._id;
    const newCategory = ["dynamic programming"];
    const updateBody = {
      category: newCategory,
    };
    const response = await request(app)
      .patch(apiRoute + "/" + questionId)
      .send(updateBody);
    expect(response.status).to.equal(200);
    expect(response.body.category).to.eql(newCategory);
  });

  it("updates a question's complexity", async () => {
    const question = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionJson);
    const questionId = question.body._id;
    const newComplexity = "medium";
    const updateBody = {
      complexity: newComplexity,
    };
    const response = await request(app)
      .patch(apiRoute + "/" + questionId)
      .send(updateBody);
    expect(response.status).to.equal(200);
    expect(response.body.complexity).to.equal(newComplexity);
  });
});

describe("UPDATE - failure scenario", () => {
  afterEach(() => mongoUnit.drop());

  it("returns 404 status code for unknown id", async () => {
    const response = await request(app).patch(
      apiRoute + "/" + nonExistentDocId
    );
    expect(response.status).to.equal(404);
  });

  it("fails to update unique constraint field wit conflict", async () => {
    // TODO
  });
});

describe("DELETE - success scenario", () => {
  it("deletes a question from the database", async () => {
    const question = await request(app)
      .post(apiRoute)
      .send(mockData.validQuestionJson);
    const questionId = question.body._id;
    const response = await request(app).delete(apiRoute + "/" + questionId);
    expect(response.status).to.equal(204);
  });
});

describe("DELETE - failure scenario", () => {
  it("returns 404 status code for unknown id", async () => {
    const response = await request(app).delete(
      apiRoute + "/" + nonExistentDocId
    );
    expect(response.status).to.equal(404);
  });
});
