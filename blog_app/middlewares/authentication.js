const { validateToken } = require("../services/authentication");
const cookieparser = require('cookie-parser');

function checkForAuthenticationCookie(cookieName){
    return (req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            
        }
        catch(Error){}
         return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};