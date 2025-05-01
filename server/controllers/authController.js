const bcrypt = require("bcrypt")
const User=require("../models/User")
const jwt = require("jsonwebtoken")
const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.status(401).send({ error: true, message: "All fields are required", data: null })

    foundUser = await User.findOne({username})

    if (!foundUser)
        return res.status(401).send({ error: true, message: "Unauthorized", data: null })
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).send({ error: true, message: "Unauthorized", data: null })
    const userDetails = {
        _id:foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
        imgUrl:foundUser.imgUrl,
        isActive:foundUser.isActive


    }
    
    const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ _id: userDetails._id }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge:  24 * 60 * 60 * 1000
    })
    res.json({ accessToken })
}
const refresh = async (req, res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).send({ error: true, message: "Unauthorized", data: null })
    }
    jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN, async (err, decode) => {
        if (err)
            return res.status(403).send({ error: true, message: "Unauthorized", data: null })
        const foundUser = await User.findById(decode._id).lean()
        const userDetails = {
            _id:foundUser._id,
            username: foundUser.username,
            // firstname:foundUser.firstname,
            // lastname:foundUser.lastname,
            imgUrl:foundUser.imgUrl,
            role: foundUser.role,
            isActive:foundUser.isActive
            // email:foundUser.email,
            // phone:foundUser.phone,
            // address:foundUser.address

        }
      
        const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN, { expiresIn: '15m' })
        res.json({ accessToken })
    })

}
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt)
        return res.status(204).send({ error: true, message: "No Content", data: null })
    res.clearCookie("jwt", { httpOnly: true })
    return res.json({ error: true, message: "No Content", data: null })

}
module.exports = { login, refresh, logout }
