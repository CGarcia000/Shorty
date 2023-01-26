
export async function authenticateToken(req, res, next) {
    const authHeader = req.headers("Authorization");
    // TODO - implementar funcao q lida com as respostas de erro
    if (!authHeader) {
        return res.sendStatus(400).send({
            message: "no authorization header"
        })
    }   

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(400).send({
            message: "no token"
        })
    }   

    try {
        
    } catch (error) {
        
    }
}
