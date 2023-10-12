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
    getDataSession: "SELECT uw.id_user_web, uw.us_user_web, uw.em_user_web, p.na_profile FROM user_web uw INNER JOIN user_profile up ON uw.id_user_web = up.id_user_web INNER JOIN profile p ON up.id_profile = p.id_profile WHERE uw.us_user_web = $1",
    obtenerPermisos: 'select p.na_profile profile, m.na_method method, o.de_object object, a.de_area area FROM permission pe INNER JOIN profile p ON pe.id_profile = p.id_profile INNER JOIN method m ON pe.id_method = m.id_method INNER JOIN "object" o ON o.id_object = m.id_object INNER JOIN area a ON a.id_area = o.id_object',
    addUser: "INSERT INTO user_web (us_user_web, pa_user_web, em_user_web) VALUES ($1, $2, $3) RETURNING id_user_web",
    seeUser: 'SELECT us_user_web as user, em_user_web as email FROM user_web WHERE us_user_web = $1',
    verifyMethod: 'SELECT m.id_method, m.na_method FROM method m INNER JOIN object o ON m.id_object = o.id_object INNER JOIN area a ON a.id_area = o.id_area WHERE a.de_area = $1 AND o.de_object = $2 AND m.na_method = $3',
    verifyProfile: 'SELECT id_profile FROM profile WHERE na_profile = $1',
    removePermission: 'DELETE from permission WHERE id_method = $1 AND id_profile = $2',
    addPermission: 'INSERT INTO permission (id_method, id_profile) VALUES ($1, $2)',
    blockProfile: 'DELETE FROM permission WHERE id_profile = $1',
    blockMethod: 'DELETE FROM permission WHERE id_method = $1'
}

export default querys;