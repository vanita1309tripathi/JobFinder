import { body, validationResult } from "express-validator";

const validateJob = async (req, res, next) => {
  // Convert skills input from a string to an array
//   if (req.body.skills) {
//     req.body.skills = req.body.skills.split(",").map(skill => skill.trim());
//   }

  // Validation Rules
  const rules = [
    body("title").notEmpty().withMessage("Job title is required"),
    body("company").notEmpty().withMessage("Company name is required"),
    body("skills")
      .notEmpty()
      .withMessage("Skills are required"),
    //   .custom((value) => {
    //     if (!Array.isArray(value) || value.length === 0) {
    //       throw new Error("Skills must be a non-empty list");
    //     }
    //     return true;
    //   }),
    body("location").notEmpty().withMessage("Location is required"),
    body("salary")
      .notEmpty()
      .withMessage("Salary is required")
      .isFloat({ gt: 0 })
      .withMessage("Salary must be greater than 0"),
  ];

  // Running the rules (asynchronous)
  await Promise.all(rules.map((rule) => rule.run(req)));

  // Checking for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("newJob", { errors: errors.array(), success: false });
  } else {
    next(); // Proceed to the next middleware or controller
  }
};

export default validateJob;
