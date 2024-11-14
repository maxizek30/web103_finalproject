import express from 'express';
import passport from "passport";

const authRouter = express.Router();

authRouter.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ success: true, user: req.user })
    }
})

authRouter.get('/login/failed', (req, res) => {
    res.status(401).json({ success: true, message: "failure" })
})

authRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(error)
        }

        req.session.destroy((err) => {
            res.clearCookie('connect.sid')

            res.json({ status: "logout", user: {} })
        })
    })
})
authRouter.get(
    '/github',
    passport.authenticate('github', {
        scope: [ 'read:user' ]
    })
)
authRouter.get(
    '/github/callback',
    passport.authenticate('github', {
        successRedirect: 'http://localhost:5173/',
        failureRedirect: 'http://localhost:5173/login',
    })
)
export default authRouter;