const validQuestion: any = {
  title: "Question 1",
  description: "This is a description",
  category: ["array", "greedy"],
  complexity: "easy",
};

const validQuestionWithExtraFields = { ...validQuestion, hello: "world" };

const invalidQuestionWithoutTitle = Object.keys(validQuestion)
  .filter((key) => key !== "title")
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: validQuestion[key],
    };
  }, {});

const invalidQuestionWithoutDescription = Object.keys(validQuestion)
  .filter((key) => key !== "description")
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: validQuestion[key],
    };
  }, {});

const invalidQuestionWithoutCategory = Object.keys(validQuestion)
  .filter((key) => key !== "category")
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: validQuestion[key],
    };
  }, {});

const invalidQuestionWithEmptyCategory = Object.keys(validQuestion)
  .filter((key) => key !== "category")
  .reduce(
    (obj, key) => {
      return {
        ...obj,
        [key]: validQuestion[key],
      };
    },
    { category: [] }
  );

const invalidQuestionWithoutComplexity = Object.keys(validQuestion)
  .filter((key) => key !== "complexity")
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: validQuestion[key],
    };
  }, {});

const invalidQuestionWithInvalidComplexity = Object.keys(validQuestion)
  .filter((key) => key !== "complexity")
  .reduce(
    (obj, key) => {
      return {
        ...obj,
        [key]: validQuestion[key],
      };
    },
    { complexity: "very difficult" }
  );

const validQuestionJson = JSON.parse(JSON.stringify(validQuestion));
const validQuestionWithExtraFieldsJson = JSON.parse(
  JSON.stringify(validQuestionWithExtraFields)
);
const invalidQuestionWithoutTitleJson = JSON.parse(
  JSON.stringify(invalidQuestionWithoutTitle)
);
const invalidQuestionWithoutDescriptionJson = JSON.parse(
  JSON.stringify(invalidQuestionWithoutDescription)
);
const invalidQuestionWithoutCategoryJson = JSON.parse(
  JSON.stringify(invalidQuestionWithoutCategory)
);
const invalidQuestionWithEmptyCategoryJson = JSON.parse(
  JSON.stringify(invalidQuestionWithEmptyCategory)
);
const invalidQuestionWithoutComplexityJson = JSON.parse(
  JSON.stringify(invalidQuestionWithoutComplexity)
);
const invalidQuestionWithInvalidComplexityJson = JSON.parse(
  JSON.stringify(invalidQuestionWithInvalidComplexity)
);

export {
  validQuestionJson,
  validQuestionWithExtraFieldsJson,
  invalidQuestionWithoutTitleJson,
  invalidQuestionWithoutDescriptionJson,
  invalidQuestionWithoutCategoryJson,
  invalidQuestionWithEmptyCategoryJson,
  invalidQuestionWithoutComplexityJson,
  invalidQuestionWithInvalidComplexityJson,
};
