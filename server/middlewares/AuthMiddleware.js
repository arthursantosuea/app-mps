const {verify} = require('jsonwebtoken');

const validateToken = (request, response, next) => {
    const accessToken = request.header("accessToken");

    if(!accessToken) return response.json({error: "usuário não logado!"});

    try {
        const validToken = verify(accessToken, "importantsecret");
        request.user = validToken;
        Comment.username = username;
        if(validToken){
            return next();
        }
    } catch (error) {  
        response.json({error: error});
        
    }
}
module.exports = {validateToken};