const midCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
}

export default midCors
