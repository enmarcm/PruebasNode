const querys = {
    selectUsers: "SELECT * FROM user_web",
    selectUserId: "SELECT * FROM user_web WHERE id_user_web = $1",
    verifyUser: "select id_user_web from user_web WHERE us_user_web = $1",
    verifyBlock: "SELECT bl_user_web FROM user_web WHERE us_user_web = $1",
    verifyAttempts: "SELECT at_user_web FROM user_web WHERE us_user_web = $1" ,
    selectPassUser: "SELECT pa_user_web FROM user_web WHERE us_user_web = $1"
}

export default querys;