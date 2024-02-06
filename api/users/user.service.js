const { query } = require("express");
const pool = require("../../config/database");

module.exports = {

    /**
     * USER AUTH & CRUD
     */

    create: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into register_table(name, email_id, password, gender, mobile_number, profile_picture, type)
              values(?,?,?,?,?,?,?)`,
            [
                data.name,
                data.email_id,
                data.password,
                data.gender,
                data.mobile_number,
                ("https://avatars.dicebear.com/api/identicon/" + data.name + ".svg").replace(/\s/g, ''),
                data.type
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from register_table where email_id = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateUser: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update register_table set name=?, email_id=?, password=?, gender=?, mobile_number=?, profile_picture=?, type=? where id = ?`,
            [
                data.name,
                data.email_id,
                data.password,
                data.gender,
                data.mobile_number,
                ("https://avatars.dicebear.com/api/identicon/" + data.name + ".svg").replace(/\s/g, ''),
                data.user_id,
                data.type
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    fetchData: (user_id, callBack) => {
        console.log("Calling from service: ", user_id);

        pool.query(
            `SELECT * FROM register_table WHERE id = ?`,
            [
                user_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                // console.log(query);
                return callBack(null, results[0]);
            }
        );
    },

    /**
     * CATEGORY CRUD
     */

    createCategory: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into quiz_categories(category_name,category_picture,no_of_quiz,type) 
              values(?,?,?,?)`,
            [
                data.category_name,
                data.category_picture,
                data.no_of_quiz,
                data.type
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCategories: callBack => {
        pool.query(
            `select * from quiz_categories where status = 1`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCategoryByID: (id, callBack) => {
        pool.query(
            `select id,category_name,category_picture,no_of_quiz from quiz_categories where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    searchCategory: (name, callBack) => {
        console.log(name);
        pool.query(
            `select * from quiz_categories where status = 1 and category_name like ?`,
            ['%' + name + '%'],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    /**
    * QUIZ APIs
    */

    addQuestion: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into quiz_questions(quiz_id,question,option_1,option_2,option_3,option_4,correct_option) 
              values(?,?,?,?,?,?,?)`,
            [
                data.quiz_id,
                data.question,
                data.option_1,
                data.option_2,
                data.option_3,
                data.option_4,
                data.correct_option,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },   
  
    getQuizByCategoryId: (id, callBack) => {
        pool.query(
            `select * from quiz_by_category where category_id = ? and status = 1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                } else {
                    if (results.length === 0) {
                        callBack(null, null); // No category found with the given id
                    } else {
                        callBack(null, results); // Return the array of categories
                    }
                }
            }
        );
    },

    attemptedQuizByUserId: (id, callBack) => {
        pool.query(
            `select * from attempted_quiz where user_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    scoreByQuizId: (data, callBack) => {
        pool.query(
            `select sum(answer) as score from attempted_questions where user_id = ? and attempt_code = ? and quiz_id = ?;`,
            [
                data.user_id,
                data.attemptCode,
                data.quiz_id,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log("From db score:", results[0].score);
                return callBack(null, results[0].score);
            }
        );
    },

    getQuizById: (quiz_id, callBack) => {
        pool.query(
            `select * from quiz_by_category where id = ?`,
            [
                quiz_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    /**
    * QUIZ APP QUESTIONS FLOW
    */

    checkAttempted: (quiz_id, user_id, callBack) => {
        console.log("quiz_id", quiz_id)
        console.log("user_id", user_id)
        pool.query(
            `SELECT * FROM attempted_quiz WHERE quiz_id = ? AND user_id = ?`,
            [
                quiz_id,
                user_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                } else {
                    const isAttempted = results.length > 0;
                    console.log("isAttempted", isAttempted)
                    const result = isAttempted ? 'attempted' : 'unattempted';
                    console.log("result from service", result)
                    callBack(null, result);
                }
            }
        );
    },
    
    //For Questions
    quizStatus: (data, attemptCode, callBack) => {
        const status = false;
        pool.query(
            `insert into quiz_completed(user_id,quiz_id,quiz_status,attempt_code) 
            values(?,?,?,?)`,
            [
                data.user_id,
                data.quiz_id,
                status,
                attemptCode
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    
    updateStatus: (user_id, quiz_id, attemptCode, callback) => {
        const sql = "UPDATE quiz_completed SET quiz_status = 1 WHERE user_id = ? AND attempt_code = ? AND quiz_id = ?";
        pool.query(sql,
            [
                user_id,
                attemptCode,
                quiz_id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("Quiz status updated in the quiz_completed table.");
                    callback(null, result);
                }
            });
    },
    
    quizAttempted: (body, callBack) => {
        pool.query(
            `INSERT INTO attempted_quiz(time,quiz_id,user_id,attempt_code,score) VALUES (?,?,?,?,(select sum(answer) from attempted_questions where user_id = ? and attempt_code = ? and question_id IN (SELECT id FROM quiz_questions WHERE quiz_id = ?)));`,
            [
                ("00:" + body.time),
                body.quiz_id,
                body.user_id,
                body.attemptCode,
                body.user_id,
                body.attemptCode,
                body.quiz_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getQuestionByQuizId: (body, callback) => {
        const sql = "SELECT * FROM quiz_questions WHERE status = 1 AND quiz_id = ? AND id NOT IN (SELECT question_id FROM attempted_questions WHERE user_id = ? AND attempt_code = ? AND quiz_id = ?) ORDER BY RAND() LIMIT 1;";
        pool.query(sql,
        [
            body.quiz_id,
            body.user_id,
            body.attemptCode,
            body.quiz_id
        ],
        (error, result) => {
            if (error) {
                console.error(error);
                callback(error, null);
            } else {
                console.log("Next question found:", result[0]);
                callback(null, result[0]);
            }
        });
    },

    addInAttempted: (user_id, question_id, quiz_id, entered_option, time, is_correct, attemptCode, callback) => {
        const sql = "INSERT INTO attempted_questions (user_id, question_id, quiz_id, entered_option, time, answer,attempt_code) VALUES (?, ?, ?, ?, ?, ?, ?)";
        pool.query(sql,
            [
                user_id,
                question_id,
                quiz_id,
                entered_option,
                ("00:" + time),
                is_correct,
                attemptCode
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("Inserted in the attempted question table.");
                    callback(null, result);
                }
            });
    },

    checkAnswer: (question_id, entered_option, callBack) => {
        const sql = `SELECT count(id) as count FROM quiz_questions WHERE id = ? AND correct_option = ? ;`;
        pool.query(
            sql,
            [
                question_id,
                entered_option
            ],
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let r = results[0].count;
                    console.log("From db ", r);
                    callBack(null,r);
                }
            }
        );
    },

    getProgressValue: (user_id, quiz_id, attemptCode, callback) => {
        const sql = "SELECT CAST((COUNT(*) - (SELECT COUNT(*) FROM attempted_questions WHERE user_id = ? AND attempt_code = ? AND quiz_id = ? AND entered_option = 'review')) / (SELECT COUNT(*) FROM quiz_questions WHERE quiz_id = ? AND status = 1) * 100 AS INT) AS progress FROM attempted_questions WHERE user_id = ? AND attempt_code = ? AND quiz_id = ?;";
        pool.query(sql,
            [
                user_id,
                attemptCode,
                quiz_id,
                quiz_id,
                user_id,
                attemptCode,
                quiz_id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("Quiz status updated in the quiz_completed table.");
                    callback(null, result);
                }
            });
    },

    updateAttemptedQuiz: (body, score, callback) => {
        const sql = "UPDATE attempted_quiz SET score = ?, time = ? WHERE user_id = ? AND quiz_id = ? AND attempt_code =?; "
        pool.query(sql,
            [
                score,
                ("00:" + body.time),
                body.user_id,
                body.quiz_id,
                body.attemptCode,

            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("Review question found question found:", result[0]);
                    callback(null, result[0]);
                }
            });
    },

    /**
   * QUIZ APP REVIEW QUESTIONS FLOW
   */

    getReviewQuestionList: (body, callback) => {
        const sql = "SELECT * FROM attempted_questions WHERE quiz_id = ? AND attempt_code = ? AND user_id = ? AND entered_option = 'review';";
        pool.query(sql,
        [
            body.quiz_id,
            body.attemptCode,
            body.user_id
        ],
        (error, result) => {
            if (error) {
                console.error(error);
                callback(error, null);
            } else {
                console.log("review question found:", result);
                callback(null, result);
            }
        });
    },

    getReviewQuestion: (question_id, callback) => {
        const sql = "SELECT * FROM quiz_questions WHERE id = ?";
        pool.query(sql,
        [
            question_id
        ],
        (error, result) => {
            if (error) {
                console.error(error);
                callback(error, null);
            } else {
                console.log("Review question found question found:", result[0]);
                callback(null, result[0]);
            }
        });
    },

    reviewAnswer: (body, is_correct, callback) => {
        const sql = "UPDATE attempted_questions SET entered_option = ?, answer = ?,time = ? WHERE user_id = ? AND quiz_id = ? AND question_id = ? AND attempt_code =?; "
        pool.query(sql,
        [
            body.entered_option,
            is_correct,
            ("00:" + body.time),
            body.user_id,
            body.quiz_id,
            body.question_id,
            body.attemptCode,

        ],
        (error, result) => {
            if (error) {
                console.error(error);
                callback(error, null);
            } else {
                console.log("Review question found question found:", result[0]);
                callback(null, result[0]);
            }
        });
    },

    getQuestionById: (question_id, callBack) => {
        pool.query(
            `select * from quiz_questions where id = ?`,
            [
                question_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    /**
     * END QUIZ IMEDIATELY
     */

    addInQuizAttempted: (body, score, callBack) => {
        pool.query(
            `INSERT INTO attempted_quiz(quiz_id,user_id,attempt_code,score,time) VALUES (?,?,?,?,?);`,
            [
                body.quiz_id,
                body.user_id,
                body.attemptCode,
                score,
                ("00:" + body.time),
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    /**
     * By Type
     */

    categoryByType: (type, callback) => {
        const sql = "SELECT * FROM quiz_categories WHERE type = ?;"
        pool.query(sql,
            [
                type
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("category:", result);
                    callback(null, result);
                }
            });
    },
}
