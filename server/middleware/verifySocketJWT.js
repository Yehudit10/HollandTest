 const jwt= require("jsonwebtoken")
 
 const verifySocketJWT=(socket, next) => {
   const authHeader = socket.handshake.headers.authorization;
 
   if (!authHeader || !authHeader.startsWith("Bearer "))
     return next(new Error("Unauthorized"));
   
 
   const token = authHeader.split(" ")[1];
 
   jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
     if (err) return next(new Error("Forbidden"));
 
     socket.user = decoded; 
     next();
   })
}
 module.exports=verifySocketJWT