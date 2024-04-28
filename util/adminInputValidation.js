const { body, validationResult } = require("express-validator");
const config = require("../config/config");

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
                if (value !== 'ECAT' && value !== 'MCAT' && value !== 'ET' && value !== 'ADMIN' && value !== 'REGISTRAR') {
                    throw new Error("type must be 'ECAT' or 'MCAT' or 'ET' or 'ADMIN' or 'REGISTRAR'");
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

    validateStudentRegistration: [
        body("group_name").isIn(config.group_name).withMessage("Invalid group name ['COMPUTER-SCIENCE', 'MEDICAL-SCIENCE', 'PRE-ENGINEERING', 'PRE-MEDICAL']"),
        body("class").isIn(config.class).withMessage("Invalid class ['IX', 'X', 'XI', 'XII']"),
        body("full_name").notEmpty().withMessage("Full name is required").isString().withMessage("Full name must be a string"),
        body("b_form").notEmpty().withMessage("B-Form/CNIC Number is required")
            .isString().withMessage("B-Form/CNIC Number must be a string")
            .matches(/^\d{13}$/).withMessage("Invalid B-Form/CNIC Number format. It should be a 13-digit number without dashes."),
        body("father_name").notEmpty().withMessage("Father's name is required").isString().withMessage("Father's name must be a string"),
        body("father_status").notEmpty().withMessage("Father's status is required").isString().withMessage("Father's name must be a string")
            .isIn(config.father_status).withMessage("Invalid father_status: ['ALIVE', 'LATE', 'MARTYRED', 'MISSING', 'SEPERATED']"),
        body("father_designation").notEmpty().withMessage("Father's designation is required").isString().withMessage("Father's designation must be a string"),
        body("mother_name").notEmpty().withMessage("Mother's name is required").isString().withMessage("Mother's name must be a string"),
        body("mother_occupation").notEmpty().withMessage("Mother's occupation is required").isString().withMessage("Mother's occupation must be a string"),
        body("student_contact").matches(/^\+923\d{9}$/).withMessage("Student contact must start with +923 and have 13 digits"),
        // body("area").notEmpty().withMessage("Area is required").isString().withMessage("Area must be a string"),
        body("last_school_attended").notEmpty().withMessage("Last school attended is required").isString().withMessage("Last school attended must be a string"),
        body("percentage_last_class").optional().isInt({ min: 0, max: 100 }).withMessage("Percentage in last class must be between 0 and 100"),
        // body("earning_siblings").isInt({ min: 0 }).withMessage("Earning siblings must not be negative"),
        body("reference_contact").optional().matches(/^\+923\d{9}$/).withMessage("Reference contact must start with +923 and have 13 digits"),
        body("medical_illness").notEmpty().withMessage("Medical illness information is required").isString().withMessage("Medical illness information must be a string"),
        body("father_contact").matches(/^\+923\d{9}$/).withMessage("Father's contact must start with +923 and have 13 digits"),
        body("father_workplace").notEmpty().withMessage("Father's workplace is required").isString().withMessage("Father's workplace must be a string"),
        body("family_income").isString().withMessage("Father's income must not be a string"),
        // body("mother_workplace").optional().isString().withMessage("Mother's workplace must be a string"),
        // body("mother_income").optional().isInt({ min: 0 }).withMessage("Mother's income must not be negative"),
        body("address").notEmpty().withMessage("Address is required").isString().withMessage("Address must be a string"),
        body("domicile").notEmpty().withMessage("Domicile information is required").isString().withMessage("Domicile information must be a string"),
        body("previous_education_board").optional().isString().withMessage("Previous education board must be a string"),
        body("percentage_preliminary_examination").optional().isInt({ min: 0, max: 100 }).withMessage("Percentage in preliminary examination must be between 0 and 100"),
        body("siblings_count").isInt({ min: 0 }).withMessage("Siblings count must not be negative"),
        body("current_residence").notEmpty().withMessage("Current residence information is required").isString().withMessage("Current residence information must be a string"),
        body("reference_name").optional().isString().withMessage("Reference name must be a string"),
        body("reference_relation").optional().isString().withMessage("Reference relation must be a string"),
        body("description").optional().isString().withMessage("Note must be a string"),
        body("year").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year must be a 4-digit number")
            .isInt({ min: 1901, max: 2155 }).withMessage("Year must be within the range of 1901 to 2155"),
        handleValidationErrors,
    ],

    validateUpdateRegistration: [
        body("group_name").isIn(config.group_name).withMessage("Invalid group name ['SCIENCE', 'MEDICAL', 'PRE-ENGINEERING', 'PRE-MEDICAL']"),
        body("class").isIn(config.class).withMessage("Invalid class ['IX', 'X', 'XI', 'XII']"),
        body("status").isIn(config.status).withMessage("Invalid status ['ACTIVE', 'INACTIVE', 'BLOCKED']"),
        body("b_form").notEmpty().withMessage("B-Form/CNIC Number is required")
            .isString().withMessage("B-Form/CNIC Number must be a string")
            .matches(/^\d{13}$/).withMessage("Invalid B-Form/CNIC Number format. It should be a 13-digit number without dashes."),
        body("father_status").notEmpty().withMessage("Father's status is required").isString().withMessage("Father's name must be a string")
            .isIn(config.father_status).withMessage("Invalid father_status: ['ALIVE', 'LATE', 'MARTYRED', 'MISSING', 'SEPERATED']"),
        body("registration_id").notEmpty().withMessage("registration_id is required").isNumeric().withMessage("registration_id must be a number"),
        body("full_name").notEmpty().withMessage("Full name is required").isString().withMessage("Full name must be a string"),
        body("father_name").notEmpty().withMessage("Father's name is required").isString().withMessage("Father's name must be a string"),
        body("father_designation").notEmpty().withMessage("Father's designation is required").isString().withMessage("Father's designation must be a string"),
        body("mother_name").notEmpty().withMessage("Mother's name is required").isString().withMessage("Mother's name must be a string"),
        body("mother_occupation").optional().isString().withMessage("Mother's occupation must be a string"),
        body("student_contact").matches(/^\+923\d{9}$/).withMessage("Student contact must start with +923 and have 13 digits"),
        body("last_school_attended").notEmpty().withMessage("Last school attended is required").isString().withMessage("Last school attended must be a string"),
        body("percentage_last_class").optional().isInt({ min: 0, max: 100 }).withMessage("Percentage in last class must be between 0 and 100"),
        body("reference_contact").optional().matches(/^\+923\d{9}$/).withMessage("Reference contact must start with +923 and have 13 digits"),
        body("medical_illness").notEmpty().withMessage("Medical illness information is required").isString().withMessage("Medical illness information must be a string"),
        body("father_contact").matches(/^\+923\d{9}$/).withMessage("Father's contact must start with +923 and have 13 digits"),
        body("father_workplace").notEmpty().withMessage("Father's workplace is required").isString().withMessage("Father's workplace must be a string"),
        body("family_income").isString().withMessage("Father's income must not be string"),
        body("address").notEmpty().withMessage("Address is required").isString().withMessage("Address must be a string"),
        body("domicile").notEmpty().withMessage("Domicile information is required").isString().withMessage("Domicile information must be a string"),
        body("previous_education_board").optional().isString().withMessage("Previous education board must be a string"),
        body("percentage_preliminary_examination").optional().isInt({ min: 0, max: 100 }).withMessage("Percentage in preliminary examination must be between 0 and 100"),
        body("siblings_count").isInt({ min: 0 }).withMessage("Siblings count must not be negative"),
        body("current_residence").notEmpty().withMessage("Current residence information is required").isString().withMessage("Current residence information must be a string"),
        body("reference_name").optional().isString().withMessage("Reference name must be a string"),
        body("reference_relation").optional().isString().withMessage("Reference relation must be a string"),
        body("description").optional().isString().withMessage("Note must be a string"),
        body("year").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year must be a 4-digit number")
            .isInt({ min: 1901, max: 2155 }).withMessage("Year must be within the range of 1901 to 2155"),
        handleValidationErrors,
    ],

    validateUpdateRegistrationAppearence: [
        body("registration_id").notEmpty().withMessage("registration_id is required").isNumeric().withMessage("registration_id must be a number"),
        body("appeared")
            .custom((value) => {
                if (value !== 0 && value !== 1) {
                    throw new Error("Appearance must be either 0 or 1");
                }
                return true;
            }), handleValidationErrors,
    ],
};
