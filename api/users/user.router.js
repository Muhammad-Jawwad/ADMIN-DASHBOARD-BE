const router = require("express").Router();
const authenticateToken = require("../../auth/token_validation");
const { 
    validateLogin, 
    validateCreateCategory, 
    validateCreateQuestion, 
    validateByType
} = require("../../util/adminInputValidation");
const { 
    validateUserSignUp, 
    validateUpdateUser, 
    validateQuizByCategoryId, 
    validateScoreByQuizId, 
    validateQuestionByQuizId, 
    validateUserAnswer, 
    validateNextQuestion, 
    validateUpdateAttemptedQuestion, 
    validateReviewQuestionList, 
    validateReviewQuestion, 
    validateReviewAnswer, 
    validateEndQuiz 
} = require("../../util/userInputValidation");
const {
    createUser,
    createCategory,
    login,
    getQuizByCategoryId,
    getCategories,
    getCategoryByID,
    addQuestion,
    getQuestionByQuizId,
    userAnswer,
    attemptedQuizByUserId,
    scoreByQuizId,
    updateUsers,
    searchCategory,
    fetchData,
    getNextQuestion,
    getReviewQuestionList,
    getReviewQuestion,
    reviewAnswer,
    updateAttemptedQuestion,
    endQuiz,
    getQuizById,
    getQuestionById,
    getCategoryByType,
} = require("./user.controller");

 
//#region : USER AUTH & CRUD

router.post("/register", validateUserSignUp, createUser);
router.post("/login", validateLogin, login);
router.patch("/updateuser", 
    authenticateToken, 
    validateUpdateUser,
    updateUsers
);
router.get("/fetchData/:id", authenticateToken, fetchData); //User by id

//#endregion


//#region : CATEGORY CRUD

router.post("/addcategory", 
    authenticateToken, 
    validateCreateCategory, 
    createCategory
);
router.get("/category",authenticateToken, getCategories);
router.get("/categoryById/:id",authenticateToken, getCategoryByID);
router.post("/searchcategory",authenticateToken, searchCategory);

//#endregion


//#region : QUIZ APIs

router.post("/addquestion", 
    authenticateToken, 
    validateCreateQuestion, 
    addQuestion
);
router.post("/quizbycategoryId/:id", 
    authenticateToken, 
    validateQuizByCategoryId, 
    getQuizByCategoryId
);
router.get("/quizattemtedbyuser", 
    authenticateToken, 
    validateQuizByCategoryId, 
    attemptedQuizByUserId
);
router.get("/quizscore", 
    authenticateToken, 
    validateScoreByQuizId, 
    scoreByQuizId
);
router.get("/quizbyid/:id", authenticateToken, getQuizById);

//#endregion


//#region : QUIZ APP QUESTIONS FLOW

router.post("/getquestion", 
    authenticateToken, 
    validateQuestionByQuizId, 
    getQuestionByQuizId
);
router.post("/useranswer",
    authenticateToken,  
    validateUserAnswer, 
    userAnswer
);
router.post("/nextquestion", 
    authenticateToken, 
    validateNextQuestion, 
    getNextQuestion
);

//#endregion


//#region : QUIZ APP REVIEW QUESTIONS FLOW

router.post("/getreviewquestionlist", 
    authenticateToken, 
    validateReviewQuestionList, 
    getReviewQuestionList
);
router.post("/getreviewquestion", 
    authenticateToken, 
    validateReviewQuestion, 
    getReviewQuestion
);
router.post("/reviewanswer", 
    authenticateToken, 
    validateReviewAnswer, 
    reviewAnswer
);
router.patch("/updateattemptedquestion",
    authenticateToken,
    validateUpdateAttemptedQuestion,
    updateAttemptedQuestion
); //For updating attempted question
router.get("/questionbyid/:id", authenticateToken, getQuestionById);

//#endregion


//#region : END QUIZ IMEDIATELY

router.post("/endquiz", 
    authenticateToken, 
    validateEndQuiz, 
    endQuiz
); //For End quiz imediately and store the score 

//#endregion


//#region : CATEGORY BY TYPE

router.post("/categoryByType",
    authenticateToken,
    validateByType,
    getCategoryByType
);

//#endregion


module.exports = router;

