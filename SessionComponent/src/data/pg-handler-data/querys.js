const querys = {
    selectUsers: "SELECT * FROM user_web",
    selectUserId: "SELECT * FROM user_web WHERE id_user_web = $1",
    verifyUser: "select id_user_web from user_web WHERE us_user_web = $1",
    verifyBlock: "SELECT bl_user_web FROM user_web WHERE us_user_web = $1",
    verifyAttempts: "SELECT at_user_web FROM user_web WHERE us_user_web = $1" ,
    selectPassUser: "SELECT pa_user_web FROM user_web WHERE us_user_web = $1",
    restoreIntentos: "UPDATE user_web SET at_user_web = 3 WHERE us_user_web = $1",
    disminuirIntentos: "UPDATE user_web SET at_user_web = at_user_web - 1 WHERE us_user_web = $1",
    verifyIntentos: "SELECT at_user_web FROM user_web WHERE us_user_web = $1",
    bloquear: "UPDATE user_web SET bl_user_web = true, at_user_web = 0 WHERE us_user_web = $1",
    getDataSession : "SELECT uw.id_user_web, uw.us_user_web, uw.em_user_web, p.na_profile FROM user_web uw INNER JOIN user_profile up ON uw.id_user_web = up.id_user_web INNER JOIN profile p ON up.id_profile = p.id_profile WHERE uw.us_user_web = $1"
}

export default querys;