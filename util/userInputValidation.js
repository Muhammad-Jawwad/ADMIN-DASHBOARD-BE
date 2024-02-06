const { body, validationResult } = require("express-validator");

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.array()
        });
    }
    next();
};

module.exports = {

    // Validation middleware for Register User
    validateUserSignUp: [
        body("name").notEmpty().withMessage("name is required"),
        body("email_id")
            .notEmpty().withMessage("email_id is required")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email_id"),
        body("password")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
        body("mobile_number")
            .notEmpty().withMessage("mobile_number(923.........) is required")
            .isLength({ max: 12 }).withMessage("mobile_number(923.........) should be 12 digits long"),
        body("gender")
            .notEmpty().withMessage("gender is required")
            .custom(value => {
                if (value !== 'Male' && value !== 'Female') {
                    throw new Error("gender must be 'Male' or 'Female'");
                }
                return true;
            }).withMessage("Invalid gender"),
        body("type")
            .notEmpty().withMessage("type is required")
            .custom(value => {
                if (value !== 'ECAT' && value !== 'MCAT' && value !== 'ET') {
                    throw new Error("type must be 'ECAT' or 'MCAT' or 'ET'");
                }
                return true;
            }).withMessage("Invalid type"),
        handleValidationErrors,
    ],

    // Validation middleware for Update User
    validateUpdateUser: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("name").notEmpty().withMessage("name is required"),
        body("email_id")
            .notEmpty().withMessage("email_id is required")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email_id"),
        body("mobile_number")
            .notEmpty().withMessage("mobile_number(923.........) is required")
            .isLength({ max: 12 }).withMessage("mobile_number(923.........) should be 12 digits long"),
        body("gender")
            .notEmpty().withMessage("gender is required")
            .custom(value => {
                if (value !== 'Male' && value !== 'Female') {
                    throw new Error("gender must be 'Male' or 'Female'");
                }
                return true;
            }).withMessage("Invalid gender"),
        body("status")
            .custom(value => {
                if (value !== 1 && value !== 0) {
                    throw new Error("status must be 0 or 1");
                }
                return true;
            }).withMessage("Invalid status"),
        body("type")
            .notEmpty().withMessage("type is required")
            .custom(value => {
                if (value !== 'ECAT' && value !== 'MCAT' && value !== 'ET' ) {
                    throw new Error("type must be 'ECAT' or 'MCAT' or 'ET'");
                }
                return true;
            }).withMessage("Invalid type"),
        handleValidationErrors,
    ],

    // Validation middleware for QuizByCategoryId
    validateQuizByCategoryId: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        handleValidationErrors,  
    ],

    // Validation middleware for ScoreByQuizId
    validateScoreByQuizId: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("attemptCode")
            .notEmpty().withMessage("attemptCode is required")
            .isString().withMessage("attemptCode must be a string."),
        handleValidationErrors,  
    ],

    // Validation middleware for QuestionByQuizId
    validateQuestionByQuizId: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        handleValidationErrors,  
    ],

    // Validation middleware for UserAnswer
    validateUserAnswer: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),  
        body("question_id")
            .notEmpty().withMessage("question_id is required")
            .isNumeric().withMessage("question_id must be a number"),  
        body("attemptCode")
            .notEmpty().withMessage("attemptCode is required")
            .isString().withMessage("attemptCode must be a string."),
        body("entered_option")
            .notEmpty().withMessage("entered_option is required")
            .isString().withMessage("entered_option must be a string"),  
        body("time")
            .notEmpty().withMessage("time is required")
            .isString().withMessage("time must be a string"),
        handleValidationErrors,  
    ],

    // Validation middleware for Next Question
    validateNextQuestion: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),  
        body("attemptCode")
            .notEmpty().withMessage("attemptCode is required")
            .isString().withMessage("attemptCode must be a string."),
        body("time")
            .notEmpty().withMessage("time is required")
            .isString().withMessage("time must be a string"),
        handleValidationErrors,  
    ],

    // Validation middleware for Update Attempted Question
    validateUpdateAttemptedQuestion: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("question_id")
            .notEmpty().withMessage("question_id is required")
            .isNumeric().withMessage("question_id must be a number"),
        body("attemptCode")
            .notEmpty().withMessage("attemptCode is required")
            .isString().withMessage("attemptCode must be a string."),
        body("entered_option")
            .notEmpty().withMessage("entered_option is required")
            .isString().withMessage("entered_option must be a string"),
        body("time")
            .notEmpty().withMessage("time is required")
            .isString().withMessage("time must be a string"),
        handleValidationErrors,  
    ],

    // Validation middleware for ReviewQuestionList
    validateReviewQuestionList: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("attemptCode")
            .notEmpty().withMessage("attemptCode is required")
            .isString().withMessage("attemptCode must be a string."),
        handleValidationErrors,
    ],

    // Validation middleware for ReviewQuestion
    validateReviewQuestion: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("question_id")
            .notEmpty().withMessage("question_id is required")
            .isNumeric().withMessage("question_id must be a number"),
        body("attemptCode")
            .notEmpty().withMessage("attemptCode is required")
            .isString().withMessage("attemptCode must be a string."),
        handleValidationErrors,
    ],

    // Validation middleware for ReviewAnswer
    validateReviewAnswer: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("question_id")
            .notEmpty().withMessage("question_id is required")
            .isNumeric().withMessage("question_id must be a number"),
        body("attemptCode")
            .notEmpty().withMessage("attemptCode is required")
            .isString().withMessage("attemptCode must be a string."),
        body("entered_option")
            .notEmpty().withMessage("entered_option is required")
            .isString().withMessage("entered_option must be a string"),
        body("time")
            .notEmpty().withMessage("time is required")
            .isString().withMessage("time must be a string"),
        handleValidationErrors,
    ],

    // Validation middleware for EndQuiz
    validateEndQuiz: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id mush be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("attemptCode")
            .notEmpty().withMessage("attemptCode is required")
            .isString().withMessage("attemptCode must be a string."),
        body("time")
            .notEmpty().withMessage("time is required")
            .isString().withMessage("time must be a string"),
        handleValidationErrors,
    ],
};
