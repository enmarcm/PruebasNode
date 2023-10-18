const midNotProfile = (req, res, next) => {
    if(req.session.profile){
        return next()
    }
    return res.send("No tienes un perfil agregado")
}

export default midNotProfile