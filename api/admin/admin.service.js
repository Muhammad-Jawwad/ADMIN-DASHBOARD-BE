const { query } = require("express");
const pool = require("../../config/database");

module.exports = {

    /**
    * STUDENT DATA FOR ADMINS
    */

    createUser: (data, callBack) => {
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
                ("https://api.dicebear.com/6.x/initials/svg?seed=" + data.name + "&chars=1").replace(/\s/g, ''),
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

    updateUser: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update register_table set name=?, email_id=?, status=?, gender=?, mobile_number=?, profile_picture=?, type=? where id = ?`,
            [
                data.name,
                data.email_id,
                data.status,
                data.gender,
                data.mobile_number,
                ("https://api.dicebear.com/6.x/initials/svg?seed=" + data.name + "&chars=1").replace(/\s/g, ''),
                data.type,
                data.user_id,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getRegisteredStudents: (callBack) => {
        pool.query(
            `select * from register_table where status = 1`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getStudentById: (user_id, callBack) => {
        pool.query(
            `select * from register_table where id = ?`,
            [
                user_id
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
     * Admin Register and login
    */
        
    createAdmin: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into admin_register_table(name, email_id, password, mobile_number, profile_picture,gender,type) 
              values(?,?,?,?,?,?,?)`,
            [
                data.name,
                data.email_id,
                data.password,
                data.mobile_number,
                ("https://api.dicebear.com/6.x/initials/svg?seed=" + data.name + "&chars=1").replace(/\s/g, ''),
                data.gender,
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

    getAdminByAdminEmail: (email, callBack) => {
        pool.query(
            `select * from admin_register_table where email_id = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateAdmin: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update admin_register_table set name=?, email_id=?, password=?, mobile_number=?, gender=?, profile_picture=?, type=? where id = ?`,
            [
                data.name,
                data.email_id,
                data.password,
                data.mobile_number,
                data.gender,
                ("https://api.dicebear.com/6.x/initials/svg?seed=" + data.name + "&chars=1").replace(/\s/g, ''),
                data.admin_id,
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

    /**
     * Catagory CRUD
     */

    getCategory: (callBack) => {
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

    getCategoryById: (category_id, callBack) => {
        pool.query(
            `select * from quiz_categories where id = ?`,
            [
                category_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    createCategory: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into quiz_categories(category_name,category_picture,no_of_quiz,type) 
              values(?,?,?,?)`,
            [
                data.category_name,
                ("https://api.dicebear.com/6.x/initials/svg?seed=" + data.category_name + "&chars=1").replace(/\s/g, ''),
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

    updateCategory: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update quiz_categories set category_name=?, category_picture=?, no_of_quiz=?, type=?, status=? where id = ?`,
            [
                data.category_name,
                ("https://api.dicebear.com/6.x/initials/svg?seed=" + data.category_name + "&chars=1").replace(/\s/g, ''),
                data.no_of_quiz,
                data.type,
                data.status,
                data.category_id,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
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
     * Quiz CRUD
     */

    createQuiz: (data, callBack) => {
        console.log(data);
        pool.query(
            `insert into quiz_by_category(category_id,quiz_no,picture,quiz_name,no_of_questions,description,no_of_attempts) 
              values(?,?,?,?,?,?,?)`,
            [
                data.category_id,
                data.quiz_no,
                ("https://api.dicebear.com/6.x/initials/svg?seed=" + data.quiz_name + "&chars=1").replace(/\s/g, ''),
                data.quiz_name,
                data.no_of_questions,
                data.description,
                data.no_of_attempts
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getQuiz: (callBack) => {
        pool.query(
            `SELECT qc.*, qc_cat.category_name FROM quiz_by_category qc JOIN quiz_categories qc_cat ON qc.category_id = qc_cat.id WHERE qc.status = 1;`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getQuizById: (quiz_id, callBack) => {
        pool.query(
            `SELECT qc.*, qc_cat.category_name FROM quiz_by_category qc JOIN quiz_categories qc_cat ON qc.category_id = qc_cat.id WHERE qc.id = ?;`,
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

    updateQuiz: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update quiz_by_category set category_id=?, quiz_no=?, picture=?, quiz_name=?, no_of_questions=?, description=?, no_of_attempts=?, status=?, duration=? where id = ?`,
            [
                data.category_id,
                data.quiz_no,
                ("https://api.dicebear.com/6.x/initials/svg?seed=" + data.quiz_name + "&chars=1").replace(/\s/g, ''),
                data.quiz_name,
                data.no_of_questions,
                data.description,
                data.no_of_attempts,
                data.status,
                data.duration,
                data.quiz_id
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
     * Question CRUD
     */

    createQuestion: (data, callBack) => {
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
                data.correct_option
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getQuestion: (callBack) => {
        pool.query(
            `SELECT qq.*, qc.quiz_name FROM quiz_questions qq JOIN quiz_by_category qc ON qq.quiz_id = qc.id WHERE qq.status = 1;`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getQuestionById: (question_id, callBack) => {
        pool.query(
            `SELECT qq.*, qc.quiz_name FROM quiz_questions qq JOIN quiz_by_category qc ON qq.quiz_id = qc.id WHERE qq.id = ?;`,
            [
                question_id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateQuestion: (data, callBack) => {
        // console.log(data);
        pool.query(
            `update quiz_questions set quiz_id=?, question=?, option_1=?, option_2=?, option_3=?, option_4=?, correct_option=?, status=? where id = ?`,
            [
                data.quiz_id,
                data.question,
                data.option_1,
                data.option_2,
                data.option_3,
                data.option_4,
                data.correct_option,
                data.status,
                data.question_id
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
     * Result APIs
     */

    userResultById: (user_id, callback) => {
        const sql = "SELECT qbc.quiz_name, qbc.duration, qbc.no_of_questions, aq.score, aq.time, qc.updated_at as date, rt.name AS user_name, rt.email_id AS email, qcat.category_name, qcat.type FROM quiz_completed AS qc JOIN quiz_by_category AS qbc ON qc.quiz_id = qbc.id JOIN attempted_quiz AS aq ON qc.attempt_code = aq.attempt_code JOIN register_table AS rt ON qc.user_id = rt.id JOIN quiz_categories AS qcat ON qbc.category_id = qcat.id WHERE qc.user_id = ? AND qc.quiz_status = 1 ORDER BY qc.created_at DESC;";
        pool.query(sql,
        [
            user_id
        ],
        (error, result) => {
            if (error) {
                console.error(error);
                callback(error, null);
            } else {
                console.log("userResultById found in the service:", result);
                callback(null, result);
            }
        });
    },

    quizResultById: (quiz_id, callback) => {
        const sql = "SELECT qbc.quiz_name, qbc.no_of_questions, qbc.duration, aq.score, aq.time, qc.updated_at as date, rt.name AS user_name, rt.email_id AS email, qcat.category_name, qcat.type FROM quiz_completed AS qc JOIN quiz_by_category AS qbc ON qc.quiz_id = qbc.id JOIN attempted_quiz AS aq ON qc.attempt_code = aq.attempt_code JOIN register_table AS rt ON qc.user_id = rt.id JOIN quiz_categories AS qcat ON qbc.category_id = qcat.id WHERE qc.quiz_id = ? AND qc.quiz_status = 1 ORDER BY qc.created_at DESC;";
        pool.query(sql,
        [
            quiz_id
        ],
        (error, result) => {
            if (error) {
                console.error(error);
                callback(error, null);
            } else {
                console.log("quizResultById found in the service:", result);
                callback(null, result);
            }
        });
    },

    /**
     * By Type
     */

    homeStatsByTypeAll: (callback) => {
        const sql = "SELECT (SELECT COUNT(*) FROM quiz_categories) AS category, (SELECT COUNT(*) FROM quiz_by_category) AS quiz, (SELECT COUNT(*) FROM quiz_questions) AS question, (SELECT COUNT(*) FROM register_table) AS user;"
        pool.query(sql,
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("home stats", result);
                    callback(null, result);
                }
            });
    },

    homeStatsByType: (type, callback) => {
        const sql = "SELECT (SELECT COUNT(*) FROM quiz_categories WHERE type = ?) AS category, (SELECT COUNT(*) FROM quiz_by_category qc  JOIN quiz_categories c ON qc.category_id = c.id WHERE c.type = ?) AS quiz, (SELECT COUNT(*) FROM quiz_questions qq JOIN quiz_by_category qc ON qq.quiz_id = qc.id JOIN quiz_categories c ON qc.category_id = c.id WHERE c.type = ?) AS question,(SELECT COUNT(*) FROM register_table WHERE type = ?) AS user;"
        pool.query(sql,
            [
                type,
                type,
                type,
                type
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("home stats:", result);
                    callback(null, result);
                }
            });
    },

    graphStatsByTypeAll: (callback) => {
        // const sql = "SELECT qc.quiz_name, COUNT(CASE WHEN qcpl.created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH) THEN 1 ELSE NULL END) AS number_of_attempts FROM quiz_by_category qc JOIN quiz_categories c ON qc.category_id = c.id LEFT JOIN quiz_completed qcpl ON qc.id = qcpl.quiz_id GROUP BY qc.quiz_name LIMIT 0, 25;"
        const sql = "SELECT DATE_FORMAT(qcpl.created_at, '%b') AS name, COUNT(DISTINCT qcpl.user_id) AS Total FROM quiz_completed qcpl WHERE qcpl.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH) GROUP BY MONTH(qcpl.created_at) ORDER BY MONTH(qcpl.created_at);"
        pool.query(sql,
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("graph stats", result);
                    callback(null, result);
                }
            });
    },

    graphStatsByType: (type, callback) => {
        const sql = "SELECT DATE_FORMAT(qcpl.created_at, '%b') AS name, COUNT(DISTINCT qcpl.user_id) AS Total FROM quiz_by_category qc JOIN quiz_categories c ON qc.category_id = c.id LEFT JOIN quiz_completed qcpl ON qc.id = qcpl.quiz_id WHERE c.type = ? AND qcpl.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH) GROUP BY MONTH(qcpl.created_at) ORDER BY MONTH(qcpl.created_at) LIMIT 0, 25;"
        // const sql = "SELECT qc.quiz_name, COUNT(CASE WHEN qcpl.created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH) THEN 1 ELSE NULL END) AS number_of_attempts FROM quiz_by_category qc JOIN quiz_categories c ON qc.category_id = c.id LEFT JOIN quiz_completed qcpl ON qc.id = qcpl.quiz_id WHERE c.type = ? GROUP BY qc.quiz_name LIMIT 0, 25;"
        pool.query(sql,
            [
                type,
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("graph stats:", result);
                    callback(null, result);
                }
            });
    },

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

    getQuizByType: (type, callback) => {
        const sql = "SELECT qc.*, qc_cat.category_name FROM quiz_by_category qc JOIN quiz_categories qc_cat ON qc.category_id = qc_cat.id WHERE qc_cat.type = ?;"
        pool.query(sql,
            [
                type
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("quiz:", result);
                    callback(null, result);
                }
            });
    },

    getQuestionByType: (type, callback) => {
        const sql = "SELECT qq.*, qc.quiz_name FROM quiz_questions qq JOIN quiz_by_category qc ON qq.quiz_id = qc.id WHERE qc.category_id IN (SELECT id FROM quiz_categories WHERE type = ?);"
        pool.query(sql,
            [
                type
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("questions:", result);
                    callback(null, result);
                }
            });
    },

    getUserByType: (type, callback) => {
        const sql = "SELECT * FROM register_table WHERE type = ?;"
        pool.query(sql,
            [
                type
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    callback(error, null);
                } else {
                    console.log("users:", result);
                    callback(null, result);
                }
            });
    },
}
