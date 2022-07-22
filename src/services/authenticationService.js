import jwt from "jsonwebtoken";
function authenticationService(request, response, next) {
    if (request.headers.authorization == undefined) {
        return response.status(403).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
    const token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY_JWT, function (err, decoded) {
        if (err == null || err == undefined) {
            request.id = decoded.id;
            next();
        } else {
            return response.status(403).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
        }
    })
}
export { authenticationService }