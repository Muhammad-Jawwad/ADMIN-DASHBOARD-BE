const {
  getRegisteredStudents,
  getStudentById,
  createAdmin,
  getAdminByAdminEmail,
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
  getUserByType,
  getQuestionByType,
  getQuizByType,
  categoryByType,
  homeStatsByType,
  homeStatsByTypeAll,
  graphStatsByTypeAll,
  graphStatsByType,
  createUser,
  updateUser,
  getQuestionsImageUrl,
  getRegistrations,
  getRegistrationById,
  countRegistrations,
  registerStudent,
  updateRegistration,
  registrationStats,
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  createColleges,
  getColleges,
  getCollegeById,
  updateCollege,
  getRegistrationByCNIC,
  registerCredentials,
  countBlockedRegistrations,
  getBlockedRegistrations,
  getBlockedRegistrationByCNIC,
  addBlockedStudent,
  getBlockedRegistrationById,
  updateBlockedRegistration,
  checkBlockedRegistrationByCNIC,
  getCredentialByRegId,
  updateBlockedRegistrationAppearence,
  countPromotedStudents,
  getPromotedStudents,
  checkPromotedStudentByCNIC,
  getAllRegistrations
} = require("./admin.service");
const jwt = require("jsonwebtoken");
const XLSX = require('xlsx');
const config = require("../../config/config");
const crypto = require('crypto');

module.exports = {

  //#region : STUDENT DATA FOR ADMINS

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
    try {
      const body = req.body;
      console.log("API Called", body);
      const results = await new Promise((resolve, reject) => {
        createUser(body, (err, results) => {
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

  updateUsers: async (req, res) => {
    /**
    Body Require:
     * user_id
     * mobile_number
     * gender
     * type ('ECAT','MCAT','ET')
     * email_id
     * name
     */
    try {
      const body = req.body;
      console.log(body);
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

  getRegisteredStudents: async (req, res) => {
    try {
      const results = await new Promise((resolve, reject) => {
        getRegisteredStudents((err, results) => {
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
          message: "Unable to getRegisteredStudents",
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

  getStudentById: async (req, res) => {
    try {
      const user_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getStudentById(user_id, (err, results) => {
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
          message: "Unable to getStudentById",
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

  //#region : ADMIN LOGIN & SIGN-UP

  createAdmin: async (req, res) => {
    /**
     Body Require:
     * name
     * email_id
     * password
     * mobile_number
     * gender
     * type
     */
    try {
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        createAdmin(body, (err, results) => {
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
          message: "Unable to register Admin",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Admin registered successfully",
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
    try {
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        getAdminByAdminEmail(body.email_id, (err, results) => {
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
      if (body.password === results.password) {
        results.password = undefined;
        const jsontoken = jwt.sign({
          id: results.id,
          email_id: results.email_id,
          type: results.type,
          role: "Admin"
        },
          "admin1234",
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

  updateAdmin: async (req, res) => {
    /**
    Body Require:
     * admin_id
     * mobile_number
     * password
     * email_id
     * gender
     * name
     * type ('ECAT','MCAT','ET','Admin')
     */
    try {
      const body = req.body;
      console.log(body);
      const results = await new Promise((resolve, reject) => {
        updateAdmin(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        console.log("Admin details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update admin",
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

  //#endregion

  //#region : CATEGORY CRUD

  createCategory: async (req, res) => {
    /**
     Body Require:
     * category_name
     * category_picture
     * no_of_quiz
     * type
     */
    try {
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

  getCategory: async (req, res) => {
    try {
      const results = await new Promise((resolve, reject) => {
        getCategory((err, results) => {
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
          message: "Failed to get Categories",
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

  getCategoryById: async (req, res) => {
    try {
      const category_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getCategoryById(category_id, (err, results) => {
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

  updateCategory: async (req, res) => {
    /**
      Body Require:
       * catagory_id
       * category_name
       * category_picture
       * no_of_quiz
       * type
       * status
       */
    try {
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        updateCategory(body, (err, results) => {
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
          message: "Failed to update category",
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

  searchCategory: async (req, res) => {
    /**
     Body Require:
     * category_name
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

  //#region : QUIZ CRUD

  createQuiz: async (req, res) => {
    /**
     Body Require:
     * category_id
     * quiz_no
     * quiz_name
     * no_of_questions
     * no_of_attempts
     * description
     * duration
     */
    try {
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        createQuiz(body, (err, results) => {
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
          message: "Quiz creation failed",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Sucessfully created new Quiz"
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

  getQuiz: async (req, res) => {
    try {
      const results = await new Promise((resolve, reject) => {
        getQuiz((err, results) => {
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
          message: "Failed to get quiz",
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

  updateQuiz: async (req, res) => {
    /**
      Body Require:
       * quiz_id
       * category_id
       * quiz_no
       * picture
       * quiz_name
       * no_of_questions
       * description
       * duration
       * no_of_attempts
       * status
       */
    try {
      const body = req.body;
      console.log(body);
      const results = await new Promise((resolve, reject) => {
        updateQuiz(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (results.length === 0) {
        console.log("Quiz details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update quiz",
          data: []
        });
      }
      console.log("Quiz details are updating");
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

  //#endregion

  //#region : QUESTION CRUD

  createQuestion: async (req, res) => {
    /**
     Body Require:
      * quiz_id
      * question
      * option_1
      * option_2
      * option_3
      * option_4
      * correct_option
      * image_question
      * image_option_1
      * image_option_2
      * image_option_3
      * image_option_4
      * image_correct_option
      */
    try {
      const body = req.body;
      console.log("body", body);

      // For images handling
      const images = Object.values(req.files); // Extract files from req.files object
      console.log("images", images);

      // Get unique filenames and store them in an array
      const imageFilenames = images.map(image => image[0].filename); // Assuming each field has one file

      // Add imageFilenames to the data to be saved in the database
      body.image_question = imageFilenames[0]; // Or any other logic for assigning images
      body.image_option_1 = imageFilenames[1];
      body.image_option_2 = imageFilenames[2];
      body.image_option_3 = imageFilenames[3];
      body.image_option_4 = imageFilenames[4];
      body.image_correct_option = imageFilenames[5];

      console.log("image_question", body.image_question);

      const results = await new Promise((resolve, reject) => {
        createQuestion(body, (err, results) => {
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
          message: "Failed to create Questions",
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

  getQuestion: async (req, res) => {
    try {
      const results = await new Promise((resolve, reject) => {
        getQuestion((err, results) => {
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
          message: "Failed to get Questions",
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

      // Add the image URL to each relevant field in the questions
      const questionsWithImage = results.map((question) => {
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
        message: "Data found",
        data: questionsWithImage
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
      // Function to get image URL for a field if it exists
      const getImageUrl = (question, field) => {
        if (question[field]) {
          return getQuestionsImageUrl(question[field]);
        }
        return null;
      };

      // Add the image URL to each relevant field in the questions
      const questionsWithImage = results.map((question) => {
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
        message: "Data found",
        data: questionsWithImage
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

  updateQuestion: async (req, res) => {
    /**
   Body Require:
    * quiz_id
    * question_id
    * question
    * option_1
    * option_2
    * option_3
    * option_4
    * correct_option
    * image_question
    * image_option_1
    * image_option_2
    * image_option_3
    * image_option_4
    * image_correct_option
    */
    try {
      const body = req.body;
      console.log("body", body);

      // For images handling
      const images = Object.values(req.files); // Extract files from req.files object
      console.log("images", images);

      // Get unique filenames and store them in an array
      const imageFilenames = images.map(image => image[0].filename); // Assuming each field has one file

      // Add imageFilenames to the data to be saved in the database
      body.image_question = imageFilenames[0]; // Or any other logic for assigning images
      body.image_option_1 = imageFilenames[1];
      body.image_option_2 = imageFilenames[2];
      body.image_option_3 = imageFilenames[3];
      body.image_option_4 = imageFilenames[4];
      body.image_correct_option = imageFilenames[5];

      console.log("image_question", body.image_question);
      const results = await new Promise((resolve, reject) => {
        updateQuestion(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log("Quiz details are updating");
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

  //#endregion

  //#region : RESULT APIs

  userResultById: async (req, res) => {
    /**
     Body Require:
      * user_id
      */
    try {
      const body = req.body;
      const user_id = body.user_id;
      console.log(user_id)

      const results = await new Promise((resolve, reject) => {
        userResultById(user_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      if (results.length === 0) {
        console.log("No Result found");
        return res.json({
          code: 400,
          status: false,
          message: "User didn't attempt a quiz yet",
          data: [],
        });
      } else {
        console.log("This is from get user result", results);
        return res.json({
          code: 200,
          status: true,
          message: "User Result found",
          data: results,
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

  quizResultById: async (req, res) => {
    /**
     Body Require:
      * quiz_id
      */
    try {
      const body = req.body;
      const quiz_id = body.quiz_id;
      console.log(quiz_id)

      const results = await new Promise((resolve, reject) => {
        quizResultById(quiz_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      if (results.length === 0) {
        console.log("No Result found");
        return res.json({
          code: 400,
          status: false,
          message: "Quiz didn't attempt by any user yet",
          data: [],
        });
      } else {
        console.log("This is from get quiz result", results);
        return res.json({
          code: 200,
          status: true,
          message: "Quiz Result found",
          data: results,
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

  //#region : BY TYPE

  homeStatsByType: async (req, res) => {
    /**
     * Body requires:
     * type
     */
    try {
      const { type } = req.body;
      if (type === 'ALL') {
        const homeStats = await new Promise((resolve, reject) => {
          homeStatsByTypeAll((err, results) => {
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
          message: "Here are the home stats for type All...",
          data: homeStats
        });
      } else if (type === 'ECAT' || type === 'MCAT' || type === 'ET') {
        const homeStats = await new Promise((resolve, reject) => {
          homeStatsByType(type, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log("getting home stats");
              resolve(results);
            }
          });
        });
        return res.json({
          code: 200,
          status: true,
          message: "Here are the home stats for type...",
          data: homeStats
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

  graphStatsByType: async (req, res) => {
    /**
     * Body requires:
     * type
     */
    try {
      const { type } = req.body;
      console.log("type", type);
      if (type === 'ALL') {
        const graphStats = await new Promise((resolve, reject) => {
          graphStatsByTypeAll((err, results) => {
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
          message: "Here are the graph stats for type All...",
          data: graphStats
        });
      } else if (type === 'ECAT' || type === 'MCAT' || type === 'ET') {
        const graphStats = await new Promise((resolve, reject) => {
          graphStatsByType(type, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log("getting home stats");
              resolve(results);
            }
          });
        });
        return res.json({
          code: 200,
          status: true,
          message: "Here are the graph stats for type...",
          data: graphStats
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

  getQuizByType: async (req, res) => {
    /**
     * Body requires:
     * type
     */
    try {
      const { type } = req.body;
      if (type === 'ECAT' || type === 'MCAT' || type === 'ET') {
        const quiz = await new Promise((resolve, reject) => {
          getQuizByType(type, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log("getting quiz by type");
              resolve(results);
            }
          });
        });
        if (quiz.length === 0) {
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
          message: "Here are the quiz by type...",
          data: quiz
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

  getQuestionByType: async (req, res) => {
    /**
     * Body requires:
     * type
     */
    try {
      const { type } = req.body;
      if (type === 'ECAT' || type === 'MCAT' || type === 'ET') {
        const question = await new Promise((resolve, reject) => {
          getQuestionByType(type, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log("getting question by type");
              resolve(results);
            }
          });
        });
        if (question.length === 0) {
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
          message: "Here are the question by type...",
          data: question
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

  getUserByType: async (req, res) => {
    /**
     * Body requires:
     * type
     */
    try {
      const { type } = req.body;
      if (type === 'ECAT' || type === 'MCAT' || type === 'ET') {
        const user = await new Promise((resolve, reject) => {
          getUserByType(type, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log("getting user by type");
              resolve(results);
            }
          });
        });
        if (user.length === 0) {
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
          message: "Here are the user by type...",
          data: user
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

  //#region : REGISTRATION CRUD

  registrationStats: async (req, res) => {
    try {
        const homeStats = await new Promise((resolve, reject) => {
          registrationStats((err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log("Registration Stats");
              resolve(results);
            }
          });
        });
        return res.json({
          code: 200,
          status: true,
          message: "Here are the registration stats...",
          data: homeStats
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

  checkPromotedStudentByCNIC: async (req, res) => {
    try {
      const body = req.body;
      console.log("body.b_form", body.b_form)
      const isBformExist = await new Promise((resolve, reject) => {
        checkPromotedStudentByCNIC(body.b_form, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (isBformExist.length !== 0) {
        return res.json({
          code: 403,
          status: false,
          message: "This B-Form/CNIC Number is promoted already.",
          data: isBformExist
        });
      }
      console.log("isBformExist", isBformExist)
      return res.json({
        code: 200,
        status: true,
        message: "This B-Form/CNIC Number is not promoted already."
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

  getRegistrations: async (req, res) => {
    try {
      // Pagination parameters
      const { page = 1, limit = 100, status = null, group_name = null, year = null, studentClass= null } = req.query;
      const offset = (page - 1) * limit;

      const countResults = await new Promise((resolve, reject) => {
        countRegistrations({ status, group_name, year, studentClass }, (err, count) => {
          if (err) {
            reject(err);
          } else {
            resolve(count);
          }
        });
      });

      const totalPages = Math.ceil(countResults / limit);

      const results = await new Promise((resolve, reject) => {
        getRegistrations({ offset, limit, status, studentClass, group_name, year }, (err, results) => {
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
          message: "Failed to get Registrations",
          data: []
        });
      }

      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results,
        totalPages: totalPages
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

  registerStudent: async (req, res) => {
  /**
  Body Required for Student Registration:
 
  Required Fields:
  * - full_name
  * - father_name
  * - father_designation
  * - mother_name
  * - mother_occupation
  * - student_contact
  * - last_school_attended
  * - percentage_last_class
  * - group_name
  * - reference_contact
  * - medical_illness
  * - class
  * - father_contact
  * - father_workplace
  * - family_income
  * - address
  * - domicile
  * - previous_education_board
  * - percentage_preliminary_examination
  * - siblings_count
  * - current_residence
  * - reference_name
  * - reference_relation
  * - year
  * - father_status
  * - b_form
  */
    try {
      const body = req.body;
      var blocked = 0;
      console.log("body.b_form", body.b_form)
      const isBformBlocked = await new Promise((resolve, reject) => {
        checkBlockedRegistrationByCNIC(body.b_form, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (isBformBlocked.length !== 0) {
        blocked = 1
      }
      const isBformExist = await new Promise((resolve, reject) => {
        getRegistrationByCNIC(body.b_form, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (isBformExist.length !== 0) {
        return res.json({
          code: 403,
          status: false,
          message: "This B-Form/CNIC Number already exist.",
          data: []
        });
      }
      console.log("isBformExist", isBformExist)

      const registration = await new Promise((resolve, reject) => {
        getAllRegistrations((err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      console.log("registration", registration)
      console.log("registration.lenght", registration.length)

      let count = registration.length + 1;

      var rollNumber;
      if(count > 99){
        rollNumber = `TEL-${count}`;
      } else if (count > 9){
        rollNumber = `TEL-0${count}`;
      } else {
        rollNumber = `TEL-00${count}`;
      }
      
      console.log("rollNumber", rollNumber);

      var testCenter = "Hasan Academy Secondary Campus";
      
      // if (count > 200){
      //   testCenter = "Young Citizen Model School";
      // } else if (count > 100) {
      //   testCenter = "Hasan Academy Primary Campus";
      // }

      body.test_center = testCenter;
      body.roll_number = rollNumber;
      body.test_time = "06:00 PM - 08:00 PM";
      body.test_date = "5th-July-2024";

      // Here we need to generate Roll number E-001
      const results = await new Promise((resolve, reject) => {
        registerStudent(body, blocked, (err, results) => {
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
          message: "Student registered failed",
          data: []
        });
      }
      console.log("results id", results[0]);
      const registration_id = results[0].id
      console.log("inserted id", results[0].id);
      const email = `${body.full_name.replace(/\s+/g, '').toLowerCase()}${registration_id}@edutel.com`;
      const password = `E-${body.year}-${registration_id}`;
      console.log("email",email)
      console.log("password",password)
      const credentials = await new Promise((resolve, reject) => {
        registerCredentials(email, password, registration_id, (err, results) => {
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
        message: "Student registered successfully",
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

  getRegistrationById: async (req, res) => {
    try {
      const registration_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getRegistrationById(registration_id, (err, results) => {
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
          message: "Failed to get Registration By Id",
          data: []
        });
      }
      const credentials = await new Promise((resolve, reject) => {
        getCredentialByRegId(registration_id, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (credentials.length === 0) {
        return res.json({
          code: 400,
          status: false,
          message: "Failed to get credentials By Registration Id",
          data: []
        });
      }
      
      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results,
        credentials: credentials
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

  updateRegistration: async (req, res) => {
    /**
    Body Required for Student Registration Updation:
   
    Required Fields:
    * - full_name
    * - father_name
    * - father_designation
    * - mother_name
    * - mother_designation
    * - student_contact
    * - area
    * - last_school_attended
    * - percentage_last_class
    * - group_name
    * - earning_siblings
    * - reference_contact
    * - medical_illness
    * - class
    * - father_contact
    * - father_workplace
    * - father_income
    * - mother_workplace
    * - mother_income
    * - address
    * - domicile
    * - previous_education_board
    * - percentage_preliminary_examination
    * - sillings_count
    * - current_residence
    * - reference_name
    * - reference_relation
    * - year
    * - registration_id
    * - status
    * - b_form 
    * - father_status
    */
    try {
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        updateRegistration(body, (err, results) => {
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
          message: "Failed to update registration",
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

  getBlockedRegistrations: async (req, res) => {
    try {
      // Pagination parameters
      const { page = 1, limit = 100, status = null, group_name = null, year = null } = req.query;
      const offset = (page - 1) * limit;

      const countResults = await new Promise((resolve, reject) => {
        countBlockedRegistrations({ status, group_name, year }, (err, count) => {
          if (err) {
            reject(err);
          } else {
            resolve(count);
          }
        });
      });

      const totalPages = Math.ceil(countResults / limit);

      const results = await new Promise((resolve, reject) => {
        getBlockedRegistrations({ offset, limit, status, group_name, year }, (err, results) => {
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
          message: "Failed to get Blocked Registrations",
          data: []
        });
      }

      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results,
        totalPages: totalPages
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

  getPromotedStudents: async (req, res) => {
    try {
      // Pagination parameters
      const { page = 1, limit = 100, status = null, group_name = null, year = null } = req.query;
      const offset = (page - 1) * limit;

      const countResults = await new Promise((resolve, reject) => {
        countPromotedStudents({ status, group_name, year }, (err, count) => {
          if (err) {
            reject(err);
          } else {
            resolve(count);
          }
        });
      });

      const totalPages = Math.ceil(countResults / limit);

      const results = await new Promise((resolve, reject) => {
        getPromotedStudents({ offset, limit, status, group_name, year }, (err, results) => {
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
          message: "Failed to get Promoted Students",
          data: []
        });
      }

      return res.json({
        code: 200,
        status: true,
        message: "Data found",
        data: results,
        totalPages: totalPages
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

  addBlockedStudent: async (req, res) => {
    /**
    Body Required for Student Registration:
   
    Required Fields:
    * - full_name
    * - father_name
    * - father_designation
    * - mother_name
    * - mother_designation
    * - student_contact
    * - area
    * - last_school_attended
    * - percentage_last_class
    * - group_name
    * - earning_siblings
    * - reference_contact
    * - medical_illness
    * - class
    * - father_contact
    * - father_workplace
    * - father_income
    * - mother_workplace
    * - mother_income
    * - address
    * - domicile
    * - previous_education_board
    * - percentage_preliminary_examination
    * - siblings_count
    * - current_residence
    * - reference_name
    * - reference_relation
    * - year
    * - father_status
    * - b_form
    */
    try {
      const body = req.body;
      console.log("body.b_form", body.b_form)
      const isBformExist = await new Promise((resolve, reject) => {
        getBlockedRegistrationByCNIC(body.b_form, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (isBformExist.length !== 0) {
        return res.json({
          code: 403,
          status: false,
          message: "This B-Form/CNIC Number already exist.",
          data: []
        });
      }
      console.log("isBformExist", isBformExist)

      const results = await new Promise((resolve, reject) => {
        addBlockedStudent(body, (err, results) => {
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
          message: "Blocked Student registered failed",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Blocked Student registered successfully",
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

  getBlockedRegistrationById: async (req, res) => {
    try {
      const registration_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getBlockedRegistrationById(registration_id, (err, results) => {
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
          message: "Failed to get Blocked Registration By Id",
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

  updateBlockedRegistration: async (req, res) => {
    /**
    Body Required for Student Registration Updation:
   
    Required Fields:
    * - full_name
    * - father_name
    * - father_designation
    * - mother_name
    * - mother_designation
    * - student_contact
    * - area
    * - last_school_attended
    * - percentage_last_class
    * - group_name
    * - earning_siblings
    * - reference_contact
    * - medical_illness
    * - class
    * - father_contact
    * - father_workplace
    * - father_income
    * - mother_workplace
    * - mother_income
    * - address
    * - domicile
    * - previous_education_board
    * - percentage_preliminary_examination
    * - sillings_count
    * - current_residence
    * - reference_name
    * - reference_relation
    * - year
    * - registration_id
    * - status
    * - b_form 
    * - father_status
    */
    try {
      const body = req.body;
      console.log("body", body)
      const results = await new Promise((resolve, reject) => {
        updateBlockedRegistration(body, (err, results) => {
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
          message: "Failed to update blocked registration",
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
  
  updateBlockedRegistrationAppearence: async (req, res) => {
    /**
    Body Required for Student Registration Updation:
   
    Required Fields:
    * - registration_id
    * - appeared
    */
    try {
      const body = req.body;
      console.log("body", body)
      const results = await new Promise((resolve, reject) => {
        updateBlockedRegistrationAppearence(body, (err, results) => {
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
          message: "Failed to update blocked registration appearence",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Appearence Updated successfully",
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

  //#region : SCHOOLS CRUD

  createSchool: async (req, res) => {
    /**
     Body Require:
     * name
     */
    try {
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        createSchool(body, (err, results) => {
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
          message: "School creation failed",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Sucessfully created new School",
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

  getSchools: async (req, res) => {
    try {
      const results = await new Promise((resolve, reject) => {
        getSchools((err, results) => {
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
          message: "Failed to get Schools",
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

  getSchoolById: async (req, res) => {
    try {
      const school_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getSchoolById(school_id, (err, results) => {
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
          message: "Failed to get school by id",
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

  updateSchool: async (req, res) => {
    /**
      Body Require:
       * school_id
       * name
       */
    try {
      const body = req.body;
      console.log(body);
      const results = await new Promise((resolve, reject) => {
        updateSchool(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        console.log("School details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update School",
          data: []
        });
      }
      console.log("School details are updating");
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

  //#endregion

  //#region : COLLEGES CRUD

  createCollege: async (req, res) => {
    /**
     Body Require:
     * name
     */
    try {
      const body = req.body;
      const results = await new Promise((resolve, reject) => {
        createColleges(body, (err, results) => {
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
          message: "College creation failed",
          data: []
        });
      }
      return res.json({
        code: 200,
        status: true,
        message: "Sucessfully created new College",
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

  getColleges: async (req, res) => {
    try {
      const results = await new Promise((resolve, reject) => {
        getColleges((err, results) => {
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
          message: "Failed to get Colleges",
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

  getCollegeById: async (req, res) => {
    try {
      const college_id = req.params.id;
      const results = await new Promise((resolve, reject) => {
        getCollegeById(college_id, (err, results) => {
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
          message: "Failed to get College by id",
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

  updateCollege: async (req, res) => {
    /**
      Body Require:
       * college_id
       * name
       */
    try {
      const body = req.body;
      console.log(body);
      const results = await new Promise((resolve, reject) => {
        updateCollege(body, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (!results) {
        console.log("College details are not updating")
        return res.json({
          code: 400,
          status: false,
          message: "Failed to update College",
          data: []
        });
      }
      console.log("College details are updating");
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

  //#endregion

}

