const midNotFound = (req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
    next();     
}

export default midNotFound