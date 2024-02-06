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
    validateByType
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
} = require("./admin.controller");
const router = require("express").Router();
const adminAuthenticateToken = require("../../auth/admin_token_validation");
const { validateUserSignUp, validateUpdateUser } = require("../../util/userInputValidation");


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
    validateCreateQuestion,
    createQuestion
);
router.get("/getquestion", adminAuthenticateToken, getQuestion);
router.get("/questionbyid/:id", adminAuthenticateToken, getQuestionById);
router.patch("/updatequestion", 
    adminAuthenticateToken, 
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


module.exports = router;
