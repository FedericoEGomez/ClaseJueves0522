module.exports = (req, res, next ) =>{
    if (!req.session.user) {
        res.json({
            msg: "no estas en session"
        })
    }
    next()
}