/*The Implementation for the middleware*/
let authenticated = true;
// middleware function to log requests
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}
// middleware function to authenticate users
const authenticate = (req, res, next) => {
  // authenticate user logic here
  if (authenticated) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}
// add middleware functions to the application
app.use(logger);
app.use(authenticate);
// define routes and controllers
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Used  in app.js
var cors = require('cors')
app.use(cors())


=================================================================================================
//API for data fetching and download excel
fetchData: (req, res) => {
  /**
   * Body Require:
   * id as end-point
   */
  const id = req.params.id;
  fetchData(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        code: 400,
        status: false,
        message: "Error fetching data from database",
        data: []
      });
    } else {

      const arr = Object.entries(results).map(([key, value]) => ({ name: key, value }));

      console.log(arr);
      // let userData = Array.from(arr);
      console.log("The object is an array", Array.isArray(arr));
      console.log("There is no error in data fetching", results);

      // THis method is working
      const convertJsonToExcel = () => {

        const workSheet = XLSX.utils.json_to_sheet(arr);
        const workBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workBook, workSheet, "arr")
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

        XLSX.writeFile(workBook, "usersData.xlsx")

      }
      convertJsonToExcel()
      return res.json({
        code: 200,
        status: true,
        message: "The category at a particular Id",
        data: results
      });
    }
  });
},

=================================================================================================
  attempted_questions

select * from table where quizid = 'quizid' and questionid = 'question' and answer = 'answer'


=================================================================================================
const logger = require("morgan");
const jwt = require('jsonwebtoken');

// Middleware Function
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
}
/*The Implementation for the middleware*/
app.use((req, res, next) => {
  console.log("Middleware is calling:", "\nRequest Method -> ", req.method, "\nRequest IP -> ", req.ip, "\nRequest Path -> ", req.path);
  next();
});
app.use(logger());
app.use('/api/users', authenticateToken, userRouter);

// In the userAnswer.router
router.get('/protected', authenticateToken);    // To Protect the API routes using the authenticateToken middleware function

// In the userAnswer.controller
authenticateToken: (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! This is a protected API route.` });
}
=================================================================================================

userAnswer: (req, res) => {
  const body = req.body;
  const user_id = req.body.user_id;
  const quiz_id = req.body.quiz_id;
  const question_id = req.body.question_id;
  const entered_option = req.body.entered_option;

  var msg = "Sorry! Your answer is incorrect!";
  var check;
  console.log("Checking the answered question (return 0 if wrong and 1 if correct)");
  // Checking the answered question (return 0 if wrong and 1 if correct)
  var ans = checkAnswer(question_id, entered_option, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(results.count);
    // return results.count;
    // console.log(!results);
    if (!results) {
      return res.json({
        code: 400,
        status: false,
        message: "Question you want to answer not found",
        data: []
      });
    }
    check = results;
    console.log("---> ", check);
    console.log("The previous question that answered: ", results);
    return check;
  });
  console.log(ans);
  return res.json({
    code: 200,
    status: true,
    data: check,
    message: msg
  });
}


// var check = checkAnswer(question_id, entered_option, () => {
//   console.log("callback");
// });
// console.log("From checkAnswer: ", ans);
// if (ans == 1) {
//   msg = "Congratulations! Your answer is correct"
//   console.log("Answer Status", msg);
// }

//   // Now adding the answered question in an attempted_question table
//   addInAttempted(user_id, question_id, quiz_id, entered_option, check, (error, result) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(`addInAttempted function status: ${result}`);
//     }
//   });
//   console.log("Added in the answered question in the addInAttempted");

//   // Getting the next question from question table that is not attempted by that user
//   const next_result = getQuestionByQuizId(body, () => {
//     console.log("callback");
//   });
//   console.log("Next question found: ", next_result);

//   if (next_result == '') {
//     console.log("Next question is not found");
//     //When there is no question left in quiz we need to calculate it's score
//     const calScore = quizAttempted(body, () => {
//       console.log("callback");
//     });

//     // Getting the calculated score from attempted question table
//     const Score = scoreByQuizId(body, () => {
//       console.log("callback");
//     });

//     //update status in quiz completed table
//     updateStatus(user_id, quiz_id, () => {
//       console.log("callback");
//     });

//     return res.json({
//       code: 200,
//       status: true,
//       message: msg,
//       data: "The quiz is ended",
//       score: Score
//     });
//   } else {
//     console.log("The next question after answer", next_result);
//     return res.json({
//       code: 200,
//       status: true,
//       data: next_result,
//       message: msg,
//     });
//   }
// }
// userAnswer: (req, res) => {
//   /**
//    * Body requires:
//    * User id
//    * Quiz id
//    * Question id
//    * Entered option
//    */
//   const body = req.body;
//   const user_id = req.body.user_id;
//   const quiz_id = req.body.quiz_id;
//   const question_id = req.body.question_id;
//   const entered_option = req.body.entered_option;
//   console.log("Checking the answered question (return 0 if wrong and 1 if correct)");
//   // Checking the answered question (return 0 if wrong and 1 if correct)
//   var check = checkAnswer(question_id, entered_option)
//   // , (error, result) => {
//   //   if (error) {
//   //     console.error(error);
//   //   } else {
//   //     console.log("The check result is:", result)
//   //   }
//   // });
//   console.log("From checkAnswer: ", check);

//   // Now adding the answered question in an attempted_question table
//   addInAttempted(user_id, question_id, quiz_id, entered_option, check, (error, result) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(`addInAttempted function status: ${result}`);
//     }
//   });
//   console.log("Added in the answered question in the addInAttempted");

//   // Getting the next question from question table that is not attempted by that user
//   var next_result = getQuestionByQuizId(body);
//   console.log("Next question found: ", next_result);

//   if (next_result == '') {
//     console.log("Next question is not found");
//     //When there is no question left in quiz we need to calculate it's score
//     var calScore = quizAttempted(body);

//     // Getting the calculated score from attempted question table
//     var Score = scoreByQuizId(body);

//     //update status in quiz completed table
//     updateStatus(user_id, quiz_id);

//     return res.json({
//       code: 200,
//       status: true,
//       message: msg,
//       data: "The quiz is ended",
//       score: Score
//     });
//   }
//   else {
//     console.log("The next question after answer", next_result);
//     return res.json({
//       code: 200,
//       status: true,
//       message: "Congratulations! Your answer is correct",
//       data: next_result
//     });
//   }
// }
//   userAnswer: (req, res) => {
//     /**
//      * Body requires:
//      * User id
//      * Quiz id
//      * Question id
//      * Entered option
//      */
//     const body = req.body;
//     var check = false;
//     var msg = "Sorry! Your answer is incorrect!";
//     getQuestionById(body.question_id, (err, results) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log(!results);
//       if (!results) {
//         return res.json({
//           code: 400,
//           status: false,
//           message: "Question you want to answer not found",
//           data: []
//         });
//       }
//       console.log("The previous question that answered: ", results);
//       //Checking answer
//       if (results.correct_option == body.entered_option) {
//         check = true;
//         msg = "Congratulations! Your answer is correct"
//         console.log("Answer Status", check);
//       }
//       //Adding the question into attempted question
//       addInAttempted(body, check, (err, results) => {
//         if (err) {
//           console.log(err);
//           return res.json({
//             code: 400,
//             status: false,
//             message: "Data not added to attempted question table",
//             data: []
//           });
//         }
//       });
//       console.log("The question added in attempted question")
//     });
//     //Calling next question
//     getQuestionByQuizId(body, (err, next_results) => {
//       if (err) {
//         console.log("Next Question finding error: ", err);
//         return;
//       }
//       console.log(!next_results);
//       if (!next_results) {
//         console.log("No Question found");
//         //When there is no question left in quiz we need to calculate it's score
//         quizAttempted(body, (err, results) => {
//           if (err) {
//             console.log(err);
//             return;
//           }
//           console.log("From quizAttempted fun: ", !results);
//           if (!results) {
//             return res.json({
//               code: 400,
//               status: false,
//               message: msg,
//               data: "Score not calculated"
//             });
//           }
//           // Now getting the calculated score from quiz_attempted
//           scoreByQuizId(body, (err, results) => {
//             if (err) {
//               console.log(err);
//               return;
//             }
//             console.log("From scoreByQuizId fun: ", !results);
//             if (!results) {
//               return res.json({
//                 code: 400,
//                 status: false,
//                 message: msg,
//                 data: "Score not found"
//               });
//             }
//             //update status in quiz completed table
//             updateStatus(body, (err, results) => {
//               if (err) {
//                 console.log(err);
//                 return;
//               }
//               console.log("From updateStatus fun: ", !results);
//               if (!results) {
//                 return res.json({
//                   code: 400,
//                   status: false,
//                   message: msg,
//                   data: "Status not Updated"
//                 });
//               }
//             });
//             return res.json({
//               code: 200,
//               status: true,
//               message: msg,
//               data: "The quiz is ended",
//               score: results
//             });
//           });
//         });
//       }
//       else {
//         console.log("The next question after answer", next_results);
//         return res.json({
//           code: 200,
//           status: true,
//           message: msg,
//           data: next_results
//         });
//       }
//     });
//   }
==================================================================================================
 // addInAttempted: (user_id, question_id, quiz_id, entered_option, check, callBack) => {
    //     pool.query(
    //         `insert into attempted_questions(question_id,user_id,quiz_id,entered_option,answer) 
    //               values(?,?,?,?,?)`,
    //         [
    //             question_id,
    //             user_id,
    //             quiz_id,
    //             entered_option,
    //             check
    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },

    // getQuestionByQuizId: (body, callBack) => {
    //     const quiz_id = body.quiz_id;
    //     const user_id = body.user_id;
    //     console.log(quiz_id);
    //     console.log(user_id);

    //     pool.query(
    //         // `select id,question,option_1,option_2,option_3,option_4 from quiz_questions where quiz_id = ? and (id,?) NOT IN (SELECT question_id,user_id FROM attempted_questions) ORDER BY RAND() LIMIT 1;`,
    //         `SELECT * FROM quiz_questions WHERE id NOT IN (SELECT question_id FROM attempted_questions WHERE quiz_id = ? AND user_id = ? ) AND quiz_id = ? ORDER BY RAND() LIMIT 1;`,
    //         [
    //             quiz_id,
    //             user_id,
    //             quiz_id
    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },

      // updateStatus: (data, callBack) => {
    //     pool.query(
    //         `update quiz_completed set quiz_status = 1 where (quiz_id,user_id) = (?,?)`,
    //         [
    //             data.quiz_id,
    //             data.user_id
    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     )
    // },

     // checkAnswer: (question_id, option, callBack) => {
    //     pool.query(
    //         `SELECT COUNT(id) FROM quiz_questions WHERE id = ? AND correct_option= ? `,
    //         [
    //             question_id,
    //             option
    //         ],
    //         (error, results) => {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 callBack(null, results);
    //             }
    //         }
    //     );
    // }

    ==================================================================================================
