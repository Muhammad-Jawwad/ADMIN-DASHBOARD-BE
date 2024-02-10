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

    // Validation middleware for Login Admin
    validateLogin: [
        body('email_id')
            .notEmpty().withMessage("email_id is required")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email_id"),
        body('password')
            .notEmpty().withMessage("password is required")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
        handleValidationErrors,
    ],

    // Validation middleware for Register Admin
    validateSignUp: [
        body("name").notEmpty().withMessage("name is required"),
        body("email_id")
            .notEmpty().withMessage("email_id is required")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email_id"),
        body("password")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
        body("mobile_number")
            .notEmpty().withMessage("mobile_number(923.........) is required")
            .isLength({ min: 12, max: 12 }).withMessage("mobile_number(923.........) should be 12 digits long"),
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
                if (value !== 'ECAT' && value !== 'MCAT' && value !== 'ET' && value !== 'ADMIN') {
                    throw new Error("type must be 'ECAT' or 'MCAT' or 'ET' or 'ADMIN'");
                }
                return true;
            }).withMessage("Invalid type"),
        handleValidationErrors,
    ],

    // Validation middleware for Update Admin
    validateUpdateAdmin: [
        body("admin_id")
            .notEmpty().withMessage("admin_id is required")
            .isNumeric().withMessage("admin_id mush be a number"),
        body("name").notEmpty().withMessage("name is required"),
        body("email_id")
            .notEmpty().withMessage("email_id is required")
            .isEmail().normalizeEmail({ gmail_remove_dots: false }).withMessage("Invalid email_id"),
        body("password")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
        body("mobile_number")
            .notEmpty().withMessage("mobile_number(923.........) is required")
            .isLength({ min: 12, max: 12 }).withMessage("mobile_number(923.........) should be 12 digits long"),
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
                if (value !== 'ECAT' && value !== 'MCAT' && value !== 'ET' && value !== 'ADMIN') {
                    throw new Error("type must be 'ECAT' or 'MCAT' or 'ET' or 'ADMIN'");
                }
                return true;
            }).withMessage("Invalid type"),
        handleValidationErrors,
    ],

    // Validation middleware for Create Category
    validateCreateCategory: [
        body("category_name")
            .notEmpty().withMessage("category_name is required")
            .isString().withMessage("category_name must be a string"),
        body("no_of_quiz")
            .notEmpty().withMessage("no_of_quiz is required")
            .isNumeric().withMessage("no_of_quiz must be numeric"),
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

    // Validation middleware for Update Category
    validateUpdateCategory: [
        body("category_id")
            .notEmpty().withMessage("category_id is required")
            .isNumeric().withMessage("category_id must be a number"),
        body("category_name")
            .notEmpty().withMessage("category_name is required")
            .isString().withMessage("category_name must be a string"),
        body("category_picture")
            .notEmpty().withMessage("category_picture is required"),
        body("no_of_quiz")
            .notEmpty().withMessage("no_of_quiz is required")
            .isNumeric().withMessage("no_of_quiz must be numeric"),
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

    // Validation middleware for Create Quiz
    validateCreateQuiz: [
        body("category_id")
            .notEmpty().withMessage("category_id is required")
            .isNumeric().withMessage("category_id must be a number"),
        body("quiz_no")
            .notEmpty().withMessage("quiz_no is required")
            .isString().withMessage("quiz_no must be a string (Eg: Quiz 1)"),
        body("quiz_name")
            .notEmpty().withMessage("quiz_name is required")
            .isString().withMessage("quiz_name must be a string"),
        body("description")
            .notEmpty().withMessage("description is required")
            .isString().withMessage("description must be a string"),
        body("no_of_questions")
            .notEmpty().withMessage("no_of_questions is required")
            .isNumeric().withMessage("no_of_questions must be numeric"),
        body("duration")
            .notEmpty().withMessage("duration in minutes is required")
            .isNumeric().withMessage("duration in minutes must be numeric"),
        body("no_of_attempts")
            .notEmpty().withMessage("no_of_attempts is required")
            .custom(value => {
                if (value !== 'one' && value !== 'infinite') {
                    throw new Error("no_of_attempts must be 'one' or 'infinite'");
                }
                return true;
            }).withMessage("Invalid no_of_attempts"),
        handleValidationErrors
    ],

    // Validation middleware for Update Quiz
    validateUpdateQuiz: [
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("category_id")
            .notEmpty().withMessage("category_id is required")
            .isNumeric().withMessage("category_id must be a number"),
        body("quiz_no")
            .notEmpty().withMessage("quiz_no is required")
            .isString().withMessage("quiz_no must be a string (Eg: Quiz 1)"),
        body("picture")
            .notEmpty().withMessage("picture is required"),
        body("quiz_name")
            .notEmpty().withMessage("quiz_name is required")
            .isString().withMessage("quiz_name must be a string"),
        body("description")
            .notEmpty().withMessage("description is required")
            .isString().withMessage("description must be a string"),
        body("no_of_questions")
            .notEmpty().withMessage("no_of_questions is required")
            .isNumeric().withMessage("no_of_questions must be numeric"),
        body("duration")
            .notEmpty().withMessage("duration in minutes is required")
            .isNumeric().withMessage("duration in minutes must be numeric"),
        body("no_of_attempts")
            .notEmpty().withMessage("no_of_attempts is required")
            .custom(value => {
                if (value !== 'one' && value !== 'infinite') {
                    throw new Error("no_of_attempts must be 'one' or 'infinite'");
                }
                return true;
            }).withMessage("Invalid no_of_attempts"),
        handleValidationErrors,
        body("status")
            .custom(value => {
                if (value !== 1 && value !== 0) {
                    throw new Error("status must be 0 or 1");
                }
                return true;
            }).withMessage("Invalid status"),
        handleValidationErrors,
    ],

    // Validation middleware for Create Question
    validateCreateQuestion: [
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("question")
            .custom((value, { req }) => {
                if (!value && !req.files['image_question']) {
                    throw new Error('Either question text or image_question is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('question must be a string');
                }
                return true;
            }),
        body("option_1")
            .custom((value, { req }) => {
                if (!value && !req.files['image_option_1']) {
                    throw new Error('Either option_1 text or image_option_1 is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('option_1 must be a string');
                }
                return true;
            }),
        body("option_2")
            .custom((value, { req }) => {
                if (!value && !req.files['image_option_2']) {
                    throw new Error('Either option_2 text or image_option_2 is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('option_2 must be a string');
                }
                return true;
            }),
        body("option_3")
            .custom((value, { req }) => {
                if (!value && !req.files['image_option_3']) {
                    throw new Error('Either option_3 text or image_option_3 is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('option_3 must be a string');
                }
                return true;
            }),
        body("option_4")
            .custom((value, { req }) => {
                if (!value && !req.files['image_option_4']) {
                    throw new Error('Either option_4 text or image_option_4 is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('option_4 must be a string');
                }
                return true;
            }),
        body("correct_option")
            .custom((value, { req }) => {
                if (!value && !req.files['image_correct_option']) {
                    throw new Error('Either correct_option text or image_correct_option is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('correct_option must be a string');
                }
                return true;
            }),
        handleValidationErrors,
    ],


    // Validation middleware for Update Question
    validateUpdateQuestion: [
        body("question_id")
            .notEmpty().withMessage("question_id is required")
            .isNumeric().withMessage("question_id must be a number"),
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        body("question")
            .custom((value, { req }) => {
                if (!value && !req.files['image_question']) {
                    throw new Error('Either question text or image_question is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('question must be a string');
                }
                return true;
            }),
        body("option_1")
            .custom((value, { req }) => {
                if (!value && !req.files['image_option_1']) {
                    throw new Error('Either option_1 text or image_option_1 is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('option_1 must be a string');
                }
                return true;
            }),
        body("option_2")
            .custom((value, { req }) => {
                if (!value && !req.files['image_option_2']) {
                    throw new Error('Either option_2 text or image_option_2 is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('option_2 must be a string');
                }
                return true;
            }),
        body("option_3")
            .custom((value, { req }) => {
                if (!value && !req.files['image_option_3']) {
                    throw new Error('Either option_3 text or image_option_3 is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('option_3 must be a string');
                }
                return true;
            }),
        body("option_4")
            .custom((value, { req }) => {
                if (!value && !req.files['image_option_4']) {
                    throw new Error('Either option_4 text or image_option_4 is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('option_4 must be a string');
                }
                return true;
            }),
        body("correct_option")
            .custom((value, { req }) => {
                if (!value && !req.files['image_correct_option']) {
                    throw new Error('Either correct_option text or image_correct_option is required');
                }
                if (value && typeof value !== 'string') {
                    throw new Error('correct_option must be a string');
                }
                return true;
            }),
        handleValidationErrors,
    ],   

    // Validation middleware for User Result
    validateUserResult: [
        body("user_id")
            .notEmpty().withMessage("user_id is required")
            .isNumeric().withMessage("user_id must be a number"),
        handleValidationErrors, 
    ],

    // Validation middleware for Quiz Result
    validateQuizResult: [
        body("quiz_id")
            .notEmpty().withMessage("quiz_id is required")
            .isNumeric().withMessage("quiz_id must be a number"),
        handleValidationErrors, 
    ],

    // Validation middleware for Home Stats
    validateHomeStats: [
        body("type")
            .notEmpty().withMessage("type is required")
            .custom(value => {
                if (value !== 'ECAT' && value !== 'MCAT' && value !== 'ET' && value !== 'ALL') {
                    throw new Error("type must be 'ECAT' or 'MCAT' or 'ET' or 'ALL'");
                }
                return true;
            }).withMessage("Invalid type"),
        handleValidationErrors,
    ],

    // Validation middleware for By Type
    validateByType: [
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
};
