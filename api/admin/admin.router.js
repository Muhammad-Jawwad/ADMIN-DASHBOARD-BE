const { 
    validateLogin, 
    validateSignUp, 
    validateUpdateAdmin, 
    validateCreateCategory, 
    validateUpdateCategory, 
    validateCreateQuiz, 
    validateUpdateQuiz,
    validateCreateQuestion,
    validateUpdateQuestion,
    validateUserResult,
    validateQuizResult,
    validateHomeStats,
    validateByType,
    validateStudentRegistration,
    validateUpdateRegistration,
    validateUpdateRegistrationAppearence
} = require("../../util/adminInputValidation");
const {
    getRegisteredStudents,
    getStudentById,
    createAdmin,
    login,
    updateAdmin,
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    searchCategory,
    getQuiz,
    getQuizById,
    createQuiz,
    updateQuiz,
    createQuestion,
    getQuestion,
    getQuestionById,
    updateQuestion,
    userResultById,
    quizResultById,
    homeStatsByType,
    getCategoryByType,
    getQuizByType,
    getQuestionByType,
    getUserByType,
    graphStatsByType,
    createUser,
    updateUsers,
    registerStudent,
    getRegistrations,
    getRegistrationById,
    updateRegistration,
    registrationStats,
    createSchool,
    getSchools,
    getSchoolById,
    updateSchool,
    createCollege,
    getColleges,
    getCollegeById,
    updateCollege,
    getBlockedRegistrations,
    addBlockedStudent,
    getBlockedRegistrationById,
    updateBlockedRegistration,
    updateBlockedRegistrationAppearence,
} = require("./admin.controller");
const router = require("express").Router();
const adminAuthenticateToken = require("../../auth/admin_token_validation");
const { validateUserSignUp, validateUpdateUser } = require("../../util/userInputValidation");

//Image handling
const upload = require("../../util/multer"); // Adjust the path based on the file location
const allowedFileTypes = ["image/jpeg", "image/png"]; // Add more file types if needed

//#region : STUDENT DATA FOR ADMINS

router.post("/createuser", 
    adminAuthenticateToken, 
    validateUserSignUp, 
    createUser
);
router.patch("/updateuser",
    adminAuthenticateToken,
    validateUpdateUser,
    updateUsers
);
router.get("/registeredstudents", adminAuthenticateToken, getRegisteredStudents);
router.get("/studentbyid/:id", adminAuthenticateToken, getStudentById);

//#endregion


//#region : ADMIN LOGIN & SIGN-UP

router.post("/register", validateSignUp, createAdmin);
router.post("/login", validateLogin, login);
router.patch("/updateadmin", adminAuthenticateToken, validateUpdateAdmin, updateAdmin);

//#endregion


//#region : CATEGORY CRUD

router.post("/addcategory", 
    adminAuthenticateToken, 
    validateCreateCategory, 
    createCategory
);
router.get("/getcategory", adminAuthenticateToken, getCategory);
router.get("/categorybyid/:id", adminAuthenticateToken, getCategoryById);
router.patch("/updatecategory", 
    adminAuthenticateToken, 
    validateUpdateCategory, 
    updateCategory
);
router.post("/searchcategory", adminAuthenticateToken, searchCategory)

//#endregion


//#region : QUIZ CRUD

router.post("/addquiz", 
    adminAuthenticateToken, 
    validateCreateQuiz, 
    createQuiz
);
router.get("/getquiz", adminAuthenticateToken, getQuiz);
router.get("/quizbyid/:id", adminAuthenticateToken, getQuizById);
router.patch("/updatequiz", 
    adminAuthenticateToken, 
    validateUpdateQuiz, 
    updateQuiz
);

//#endregion


//#region : QUESTION CRUD

router.post("/addquestion", 
    adminAuthenticateToken, 
    upload("uploads/questionImages", allowedFileTypes).fields([
        { name: 'image_question', maxCount: 1 },
        { name: 'image_option_1', maxCount: 1 },
        { name: 'image_option_2', maxCount: 1 },
        { name: 'image_option_3', maxCount: 1 },
        { name: 'image_option_4', maxCount: 1 },
        { name: 'image_correct_option', maxCount: 1 }
    ]),
    validateCreateQuestion,
    createQuestion
);
router.get("/getquestion", adminAuthenticateToken, getQuestion);
router.get("/questionbyid/:id", adminAuthenticateToken, getQuestionById);
router.patch("/updatequestion", 
    adminAuthenticateToken, 
    upload("uploads/questionImages", allowedFileTypes).fields([
        { name: 'image_question', maxCount: 1 },
        { name: 'image_option_1', maxCount: 1 },
        { name: 'image_option_2', maxCount: 1 },
        { name: 'image_option_3', maxCount: 1 },
        { name: 'image_option_4', maxCount: 1 },
        { name: 'image_correct_option', maxCount: 1 }
    ]),
    validateUpdateQuestion,
    updateQuestion
);

//#endregion


//#region : RESULT APIs

router.post("/userResult", 
    adminAuthenticateToken,
    validateUserResult, 
    userResultById
);
router.post("/quizResult", 
    adminAuthenticateToken, 
    validateQuizResult,
    quizResultById
);

//#endregion


//#region : BY TYPE

router.post("/homeStats", 
    adminAuthenticateToken,
    validateHomeStats,
    homeStatsByType
);
router.post("/graphStats", 
    adminAuthenticateToken,
    validateHomeStats,
    graphStatsByType
);
router.post("/categoryByType", 
    adminAuthenticateToken,
    validateByType,
    getCategoryByType
);
router.post("/quizByType", 
    adminAuthenticateToken,
    validateByType,
    getQuizByType
);
router.post("/questionByType", 
    adminAuthenticateToken,
    validateByType,
    getQuestionByType
);
router.post("/userByType", 
    adminAuthenticateToken,
    validateByType,
    getUserByType
);

//#endregion


//#region : REGISTRATION CRUD

router.get("/registrationStats",
    // adminAuthenticateToken,
    registrationStats
);
router.post("/registerStudent",
    validateStudentRegistration,
    registerStudent
);
router.get("/getRegistrations", getRegistrations);
router.get("/getRegistrations/:id", getRegistrationById);
router.patch("/updateRegistration", 
    validateUpdateRegistration,
    updateRegistration
);


// Not in use right now changes required
router.get("/getBlockedRegistrations", getBlockedRegistrations);
router.post("/addBlockedStudent",
    validateStudentRegistration,
    addBlockedStudent
);
router.get("/getBlockedRegistration/:id", getBlockedRegistrationById);
router.patch("/updateBlockedRegistration",
    validateUpdateRegistration,
    updateBlockedRegistration
);
router.patch("/appearedBlockedRegistration",
    validateUpdateRegistrationAppearence,
    updateBlockedRegistrationAppearence
);

//#endregion


//#region : SCHOOLS CRUD

router.post("/createSchool",
    createSchool
);
router.get("/getSchools", getSchools);
router.get("/getSchool/:id", getSchoolById);
router.patch("/updateSchool",
    updateSchool
);

//#endregion


//#region : COLLEGES CRUD

router.post("/createCollege",
    createCollege
);
router.get("/getColleges", getColleges);
router.get("/getCollege/:id", getCollegeById);
router.patch("/updateCollege",
    updateCollege
);

//#endregion

module.exports = router;
