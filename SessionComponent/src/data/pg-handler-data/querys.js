const querys = {
    selectUsers: "SELECT * FROM user_web",
    selectUserId: "SELECT * FROM user_web WHERE id_user_web = $1",
    verifyUser: "select id_user_web from user_web WHERE us_user_web = $1"
}

export default querys;