const {
  create,
  getUserByUserEmail,
  getCategories,
  getCategoryByID,
  createCategory,
  getQuizByCategoryId,
  addQuestion,
  getQuestionByQuizId,
  getQuestionById,
  addInAttempted,
  quizAttempted,
  updateStatus,
  quizStatus,
  scoreByQuizId,
  attemptedQuizByUserId,
  updateUser,
  searchCategory,
  fetchData,
  checkAnswer,
  getProgressValue,
  checkAttempted,
  getReviewQuestion,
  getReviewQuestionList,
  reviewAnswer,
  updateAttemptedQuiz,
  addInQuizAttempted,
  getQuizById,
  categoryByType,
} = require("./user.service");
const { 
  hashSync, 
  genSaltSync, 
  compareSync 
} = require("bcrypt");
const jwt = require("jsonwebtoken");
const XLSX = require('xlsx');
const { getQuestionsImageUrl } = require("../admin/admin.service");

module.exports = {

  //#region : USER AUTH & CRUD

  createUser: async (req, res) => {
    /**
     * Body Require:
     * name
     * email_id
     * password
     * gender
     * type
     * mobile_number
     */
    try{
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const results = await new Promise((resolve, reject) => {
        create(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (results.length === 0) {
        return res.json({
          code: 400,
          status: false,
          message: "Unable to register user",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "User registered successfully",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  login: async (req, res) => {
    /**
     Body Require:
     * email_id
     * password
    */
    try{
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        getUserByUserEmail(body.email_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Invalid email",
          data: []
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = jwt.sign({
          id: results.id,
          email_id: results.email_id,
          type: results.type,
          role: "User"
        },
          "qwe1234",
          {
            expiresIn: "3h"
          });
        return res.json({
          code: 200,
          status: true,
          message: "Successfully Login",
          token: jsontoken,
          data: results
        });
      } else {
        return res.json({
          code: 400,
          status: false,
          message: "Invalid password",
          data: []
        });
      }
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  updateUsers: async (req, res) => {
    /**
    Body Require:
     * user_id
     * mobile_number
     * password
     * gender
     * type ('ECAT','MCAT','ET')
     * email_id
     * name
     */
    try{
      const body = req.body;
      console.log(body);
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const results = await new Promise((resolve, reject) => {
        updateUser(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        console.log("User details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update user",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Updated successfully",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  fetchData: async (req, res) => {
    /**
     * Body Require:
     * id as end-point
     */
    try{
      const id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        fetchData(id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Error fetching data from database",
          data: []
        });
      }
      // Converting Json in to an Array of Object
      const arr = Object.entries(results).map(([key, Value]) => (
        { 
          Key: key, 
          Value 
        }
      ));

      // Method for converting in to excel Sheet
      const convertJsonToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(arr);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Downloading the Excel Sheet 
        res.setHeader('Content-Disposition', `attachment; filename=${results.name}_Data.xlsx`);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(excelBuffer);
      }
      convertJsonToExcel();
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  //#endregion

  //#region : CATEGORY CRUD

  createCategory: async (req, res) => {
    /**
     * Body Require:
     * category_name
     * category_picture
     * no_of_quiz
     * type
     */
    try{
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        createCategory(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (results.length === 0) {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  getCategories: async (req, res) => {
    try{
      const results = await new Promise((resolve, reject) => {
        getCategories( (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (results.length === 0) {
        return res.json({
          code: 400,
          status: false,
          message: "Categories not found",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  getCategoryByID: async (req, res) => {
    try {
      const category_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getCategoryByID(category_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Failed to get Category By Id",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  searchCategory: async (req, res) => {
    /**
     * Body Require:
     * category_name
     * user_id
     */
    try {
      const body = req.body
      const name = body.category_name;
      const results = await new Promise((resolve, reject) => {
        searchCategory(name, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (results.length === 0) {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
      // });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  //#endregion

  //#region : QUIZ APIs

  getQuizByCategoryId: async (req, res) => {
    /**
     Body Requires:
     * user_id
     */
    try {
      const category_id = req.params.id;
      const user_id = req.body.user_id;

      const getQuizByCategoryIdAsync = (category_id) =>
        new Promise((resolve, reject) => {
          getQuizByCategoryId(category_id, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });

      const checkAttemptedAsync = (quizId, userId) =>
        new Promise((resolve, reject) => {
          checkAttempted(quizId, userId, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

      const results = await getQuizByCategoryIdAsync(category_id);

      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Quiz by category id not found",
          data: [],
        });
      }

      const quizzes = await Promise.all(results.map(async (quiz) => {
        if (quiz.no_of_attempts === 'one') {
          try {
            const key = await checkAttemptedAsync(quiz.id, user_id);
            console.log("key", key);
            return {
              ...quiz,
              key,
            };
          } catch (err) {
            console.error(err);
            throw err;
          }
        } else {
          return quiz;
        }
      }));

      res.json({
        code: 200,
        status: true,
        message: "Quiz by category id found",
        data: quizzes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: 500,
        status: false,
        message: "Internal server error",
        data: [],
      });
    }
  },

  addQuestion: async (req, res) => {
    /**
     Body Require:
     * quiz_id
     * question
     * option_1
     * option_2
     * option_3
     * option_4
     * correct_option
     */
    try{
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        addQuestion(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      return res.json({
        code: 200,
        status: true,
        message: "Question added successfully",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  attemptedQuizByUserId: async (req, res) => {
    /**
     * Body Require:
     * User id
     */
    try{
      const body = req.body;
      console.log(body);
      const results = await new Promise((resolve, reject) => {
        attemptedQuizByUserId(body.user_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (results.length === 0) {
        return res.json({
          code: 400,
          status: false,
          message: "Data not found",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  scoreByQuizId: async (req, res) => {
    /**
     * Body requires:
     * User id
     * attemptCode
     * Quiz id
     */
    try{
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        scoreByQuizId(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Score not calculated",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "The score has found successfully",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  getQuizById: async (req, res) => {
    try {
      const quiz_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getQuizById(quiz_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (results.length === 0) {
        return res.json({
          code: 400,
          status: false,
          message: "Failed to get quiz by id",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  //#endregion

  //#region : QUIZ APP QUESTIONS FLOW

  getQuestionByQuizId: async (req, res) => {
    /**
     * Body requires:
     * user_id
     * quiz_id
     */
    try{
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        getQuestionByQuizId(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "First Question not found",
          data: []
        });
      }
      // Generate a unique attempt_code using the current date and time
      const attemptCode = new Date().toISOString().replace(/[-:T.]/g, '');
      
      // Inserting the status = 0 in the quiz_completed to indicate the start of quiz
      const updateQuizStatus = await new Promise((resolve, reject) => {
        quizStatus(body, attemptCode, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (updateQuizStatus.length === 0) {
        console.log("Unable to insert in quiz completed");
        return res.json({
          code: 400,
          status: false,
          message: "Unable to insert in quiz completed",
          data: []
        });
      }

      // Function to get image URL for a field if it exists
      const getImageUrl = (question, field) => {
        if (question[field]) {
          return getQuestionsImageUrl(question[field]);
        }
        return null;
      };

      const Results = [results]
      // Add the image URL to each relevant field in the questions
      const questionsWithImage = Results.map((question) => {
        const imageFields = [
          'image_question',
          'image_option_1',
          'image_option_2',
          'image_option_3',
          'image_option_4',
          'image_correct_option'
        ];

        const updatedQuestion = { ...question };
        imageFields.forEach((field) => {
          updatedQuestion[field] = getImageUrl(question, field);
        });
        return updatedQuestion;
      });

      return res.json({
        code: 200,
        status: true,
        message: "First question found",
        data: questionsWithImage[0],
        attemptCode: attemptCode
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  userAnswer: async (req, res) => {
    /**
     * Body requires:
     * User id
     * Quiz id
     * attemptCode
     * Time
     * Question id
     * Entered option
     */

    try {
      // Getting the params
      const body = req.body;
      const user_id = body.user_id;
      const quiz_id = body.quiz_id;
      const question_id = body.question_id;
      const entered_option = body.entered_option;
      const time = body.time;
      const attemptCode = body.attemptCode;

      // Intializing flags
      var msg = "Sorry! Your answer is incorrect!";
      var check = 0;

      //Checking if the Answer is correct
      const isAnswerCorrect = await new Promise((resolve, reject) => {
        checkAnswer(question_id, entered_option, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (isAnswerCorrect == 1) {
        check = 1;
        msg = "Congratulations! Your answer is correct"
        console.log("Answer Status", msg);
      }
      await new Promise((resolve, reject) => {
        addInAttempted(user_id, question_id, quiz_id, entered_option, time, check, attemptCode, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log("The question added in attempted question")
      return res.json({
        code: 200,
        status: true,
        message: msg,
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  getNextQuestion: async (req, res) => {
    /**
     * Body requires:
     * user_id
     * attemptCode
     * quiz_id
     * time
     */
    try {
      const body = req.body;
      const user_id = body.user_id;
      const quiz_id = body.quiz_id;
      const attemptCode = body.attemptCode;

      const nextQuestion = await new Promise((resolve, reject) => {
        getQuestionByQuizId(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      const progressValue = await new Promise((resolve, reject) => {
        getProgressValue(user_id, quiz_id, attemptCode, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      if (!nextQuestion) {
        console.log("Next Question not found");

        //When there is no question left in quiz we need to calculate its score
        const results = await new Promise((resolve, reject) => {
          quizAttempted(body, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        console.log("From quizAttempted fun: ", !results);

        // Now getting the calculated score from quiz_attempted
        const Score = await new Promise((resolve, reject) => {
          scoreByQuizId(body, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });

        //update status in quiz completed table
        const statusInQuizCompleted = await new Promise((resolve, reject) => {
          updateStatus(user_id, quiz_id, attemptCode, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        console.log("From updateStatus fun: ", statusInQuizCompleted);
        return res.json({
          code: 200,
          status: true,
          message: "The quiz is ended",
          score: Score,
          progress: progressValue
        });
      }

      // Function to get image URL for a field if it exists
      const getImageUrl = (question, field) => {
        if (question[field]) {
          return getQuestionsImageUrl(question[field]);
        }
        return null;
      };

      const Results = [nextQuestion]
      // Add the image URL to each relevant field in the questions
      const questionsWithImage = Results.map((question) => {
        const imageFields = [
          'image_question',
          'image_option_1',
          'image_option_2',
          'image_option_3',
          'image_option_4',
          'image_correct_option'
        ];

        const updatedQuestion = { ...question };
        imageFields.forEach((field) => {
          updatedQuestion[field] = getImageUrl(question, field);
        });
        return updatedQuestion;
      });

      return res.json({
        code: 200,
        status: true,
        message: "This is the next question",
        data: questionsWithImage[0],
        attemptCode: attemptCode,
        progress: progressValue
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  //#endregion

  //#region : QUIZ APP REVIEW QUESTIONS FLOW
  
  getReviewQuestionList: async (req, res) => {
    /**
     * Body requires:
     * user_id
     * attemptCode
     * quiz_id
     */
    try{
      const body = req.body;
      // console.log(id);
      const results = await new Promise((resolve, reject) => {
        getReviewQuestionList(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (results.length === 0) {
        console.log("No Question found");
        return res.json({
          code: 400,
          status: false,
          message: "Review Questions not found",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Review questions found",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  getReviewQuestion: async (req, res) => {
    /**
     * Body requires:
     * user_id
     * attemptCode
     * quiz_id
     * question_id
     */
    try {
      const body = req.body;
      const user_id = body.user_id;
      const quiz_id = body.quiz_id;
      const attemptCode = body.attemptCode;
      const question_id = body.question_id;

      const results = await new Promise((resolve, reject) => {
        getReviewQuestion(question_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      if (!results) {
        console.log("No Question found");
        return res.json({
          code: 400,
          status: false,
          message: "Review Question not found",
          data: [],
        });
      } else {
        console.log("This is from get review question", results);
        const progress = await new Promise((resolve, reject) => {
          getProgressValue(user_id, quiz_id, attemptCode, (err, progress) => {
            if (err) {
              reject(err);
            } else {
              resolve(progress);
            }
          });
        });

        var progressValue = progress;

        // Function to get image URL for a field if it exists
        const getImageUrl = (question, field) => {
          if (question[field]) {
            return getQuestionsImageUrl(question[field]);
          }
          return null;
        };

        const Results = [results]
        // Add the image URL to each relevant field in the questions
        const questionsWithImage = Results.map((question) => {
          const imageFields = [
            'image_question',
            'image_option_1',
            'image_option_2',
            'image_option_3',
            'image_option_4',
            'image_correct_option'
          ];

          const updatedQuestion = { ...question };
          imageFields.forEach((field) => {
            updatedQuestion[field] = getImageUrl(question, field);
          });
          return updatedQuestion;
        });

        return res.json({
          code: 200,
          status: true,
          message: "First question found",
          data: questionsWithImage[0],
          attemptCode: attemptCode,
          progressValue: progressValue,
        });
      }
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  reviewAnswer: async (req, res) => {
    /**
     Body Requires:
     * user_id
     * quiz_id
     * attemptCode
     * question_id
     * time
     * entered_option
     */
    try {
      const body = req.body;
      const user_id = body.user_id;
      const quiz_id = body.quiz_id;
      const attemptCode = body.attemptCode;
      const question_id = body.question_id;

      // Initializing flags
      var msg = "Sorry! Your answer is incorrect!";
      var check = 0;

      // Checking the answered question
      const result = await new Promise((resolve, reject) => {
        checkAnswer(question_id, body.entered_option, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      if (result === 1) {
        check = 1;
        msg = "Congratulations! Your answer is correct";
        console.log("Answer Status", msg);
      }

      // Adding in question attempted
      const results = await new Promise((resolve, reject) => {
        reviewAnswer(body, check, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log("The review answer is updated");
      const progress = await new Promise((resolve, reject) => {
        getProgressValue(user_id, quiz_id, attemptCode, (err, progress) => {
          if (err) {
            reject(err);
          } else {
            resolve(progress);
          }
        });
      });

      var progressValue = progress;

      const reviewQuestionList = await new Promise((resolve, reject) => {
        getReviewQuestionList(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log("reviewQuestionList", reviewQuestionList)
      if (reviewQuestionList.length === 0) {
        const score = await new Promise((resolve, reject) => {
          scoreByQuizId(body, (err, score) => {
            if (err) {
              reject(err);
            } else {
              resolve(score);
            }
          });
        });

        var quizScore = score;
        console.log("quizScore", quizScore)

        const updateResult = await new Promise((resolve, reject) => {
          updateAttemptedQuiz(body, quizScore, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log("Attempted Quiz Updated");
              resolve(results);
            }
          });
        });

        console.log("No Question found");
        return res.json({
          code: 400,
          status: false,
          message: "Review Question not found. The quiz is ended",
          data: [],
          score: quizScore,
        });
      } else {
        console.log("This is from get next review question", reviewQuestionList);
        
        // Function to get image URL for a field if it exists
        const getImageUrl = (question, field) => {
          if (question[field]) {
            return getQuestionsImageUrl(question[field]);
          }
          return null;
        };

        const Results = [reviewQuestionList[0]]
        // Add the image URL to each relevant field in the questions
        const questionsWithImage = Results.map((question) => {
          const imageFields = [
            'image_question',
            'image_option_1',
            'image_option_2',
            'image_option_3',
            'image_option_4',
            'image_correct_option'
          ];

          const updatedQuestion = { ...question };
          imageFields.forEach((field) => {
            updatedQuestion[field] = getImageUrl(question, field);
          });
          return updatedQuestion;
        });

        return res.json({
          code: 200,
          status: true,
          message: "Next Review question found",
          data: questionsWithImage[0],
          attemptCode: attemptCode,
          progressValue: progressValue,
        });
      }
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  updateAttemptedQuestion: async (req, res) => {
    /**
     * Body requires:
     * User id
     * Quiz id
     * attemptCode
     * Time
     * Question id
     * Entered option
     */
    try {
      const body = req.body;
      const question_id = body.question_id;
      const entered_option = body.entered_option;

      var msg = "Sorry! Your answer is incorrect!";
      var check = 0;

      const results = await new Promise((resolve, reject) => {
        checkAnswer(question_id, entered_option, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      if (results === 1) {
        check = 1;
        msg = "Congratulations! Your answer is correct";
        console.log("Answer Status", msg);
      }

      await new Promise((resolve, reject) => {
        reviewAnswer(body, check, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      console.log("The question updated in attempted question");
      return res.json({
        code: 200,
        status: true,
        message: msg,
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
      });
    }
  },

  getQuestionById: async (req, res) => {
    /**
     Body Require:
     * question_id
     */
    try {
      const question_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getQuestionById(question_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        return res.json({
          code: 400,
          status: false,
          message: "Failed to get Question By Id",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results
      });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  //#endregion

  //#region : END QUIZ IMEDIATELY

  endQuiz: async (req, res) => {
    /**
     * Body requires:
     * User id
     * Quiz id
     * attemptCode
     * Time
     */
    try {
      const body = req.body;
      const user_id = body.user_id;
      const quiz_id = body.quiz_id;
      const attemptCode = body.attemptCode;

      const score = await new Promise((resolve, reject) => {
        scoreByQuizId(body, (err, score) => {
          if (err) {
            reject(err);
          } else {
            resolve(score);
          }
        });
      });

      var quizScore = score;
      console.log("quizScore", quizScore)

      const updateResult = await new Promise((resolve, reject) => {
        addInQuizAttempted(body, quizScore, (err, results) => {
          if (err) {
            reject(err);
          } else {
            console.log("Attempted Quiz inserted");
            resolve(results);
          }
        });
      });

      const updateQuizStatus = await new Promise((resolve, reject) => {
        updateStatus(user_id, quiz_id, attemptCode, (err, results) => {
          if (err) {
            reject(err);
          } else {
            console.log("Quiz Completed Status Updated");
            resolve(results);
          }
        });
      });
      
      return res.json({
        code: 200,
        status: true,
        message: "Quiz Ended Sucessfully...",
        score: quizScore,
        attemptCode: attemptCode
      });

    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  //#endregion

  //#region : BY TYPE

  getCategoryByType: async (req, res) => {
    /**
     * Body requires:
     * type
     */
    try {
      const { type } = req.body;
      if (type === 'ECAT' || type === 'MCAT' || type === 'ET') {
        const categories = await new Promise((resolve, reject) => {
          categoryByType(type, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log("getting categories by type");
              resolve(results);
            }
          });
        });
        if (categories.length === 0) {
          return res.json({
            code: 400,
            status: false,
            message: "No data found",
            data: []
          });
        }
        return res.json({
          code: 200,
          status: true,
          message: "Here are the categories by type...",
          data: categories
        });
      } else {
        return res.json({
          code: 400,
          status: false,
          message: "Incorrect type entered...",
          data: []
        });
      }

    } catch (error) {
      console.log(error);
      // Handle the error appropriately
      return res.json({
        code: 500,
        status: false,
        message: "An error occurred",
        data: [],
      });
    }
  },

  //#endregion

}

