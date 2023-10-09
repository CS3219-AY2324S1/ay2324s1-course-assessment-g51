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

// describe("UPDATE - success scenario", () => {
//   it("updates a question's title", async () => {
//     const question = {
//       title: "To be updated",
//       description: "Description",
//       category: ["greedy", "array"],
//       complexity: "easy",
//     };
//     const mockQuestion = await request(app).post(apiRoute).send(question);
//     const mockQuestionId = mockQuestion.body._id;
//     const updateBody = {
//       title: "Update 1",
//     };
//     const response = await request(app)
//       .patch(apiRoute + "/" + mockQuestionId)
//       .send(updateBody);
//     expect(response.status).toEqual(200);
//   });

//   it("updates a question's description", async () => {
//     const question = {
//       title: "Update 2",
//       description: "To be updated",
//       category: ["greedy", "array"],
//       complexity: "easy",
//     };
//     const mockQuestion = await request(app).post(apiRoute).send(question);
//     const mockQuestionId = mockQuestion.body._id;
//     const updateBody = {
//       description: "Updated",
//     };
//     const response = await request(app)
//       .patch(apiRoute + "/" + mockQuestionId)
//       .send(updateBody);
//     expect(response.status).toEqual(200);
//   });

//   it("updates a question's category", async () => {
//     const question = {
//       title: "Update 3",
//       description: "Description",
//       category: ["greedy", "array"],
//       complexity: "easy",
//     };
//     const mockQuestion = await request(app).post(apiRoute).send(question);
//     const mockQuestionId = mockQuestion.body._id;
//     const updateBody = {
//       category: ["dynamic programming"],
//     };
//     const response = await request(app)
//       .patch(apiRoute + "/" + mockQuestionId)
//       .send(updateBody);
//     expect(response.status).toEqual(200);
//   });

//   it("updates a question's complexity", async () => {
//     const question = {
//       title: "Update 4",
//       description: "Description",
//       category: ["greedy", "array"],
//       complexity: "easy",
//     };
//     const mockQuestion = await request(app).post(apiRoute).send(question);
//     const mockQuestionId = mockQuestion.body._id;
//     const updateBody = {
//       complexity: "difficult",
//     };
//     const response = await request(app)
//       .patch(apiRoute + "/" + mockQuestionId)
//       .send(updateBody);
//     expect(response.status).toEqual(200);
//   });
// });

// describe("UPDATE - failure scenario", () => {
//   it("returns 404 status code for unknown id", async () => {
//     const response = await request(app).patch(
//       apiRoute + "/" + nonExistentDocId
//     );
//     expect(response.status).toEqual(404);
//   });

//   it("fails to update invalid fields", async () => {});
// });

// describe("DELETE - success scenario", () => {
//   it("deletes a question from the database", async () => {
//     const question = {
//       title: "DELETE 1",
//       description: "Description one",
//       category: ["greedy", "array"],
//       complexity: "easy",
//     };
//     const mockQuestion = await request(app).post(apiRoute).send(question);
//     const mockQuestionId = mockQuestion.body._id;
//     const response = await request(app).delete(apiRoute + "/" + mockQuestionId);
//     expect(response.status).toEqual(204);
//   });
// });

// describe("DELETE - failure scenario", () => {
//   it("returns 404 status code for unknown id", async () => {
//     const response = await request(app).delete(
//       apiRoute + "/" + nonExistentDocId
//     );
//     expect(response.status).toEqual(404);
//   });
// });
