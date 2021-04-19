const {Strategy, ExtractJwt} = require("passport-jwt")
const passport = require("passport")
const {env} = require("../config")

const {userService} = require("../services")


const jwtStrategyOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.secret
}
const fnVerify = (payload, done) => {
    console.log("Chegou aqui mané")
    userService.findByUsername(payload.sub)
        .then((user) => {
            done(null, user, {})
        }).catch((err) => {
            done(err, false, {})
        })
}
const strategy = new Strategy(jwtStrategyOpt, fnVerify)

passport.use(strategy)

const auth = passport.authenticate("jwt", {session: false})


module.exports = {
    passport,
    auth,
}
