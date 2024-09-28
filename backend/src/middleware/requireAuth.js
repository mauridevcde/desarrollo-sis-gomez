import jwt from "jsonwebtoken";

export const VerifyAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({
      mensaje: "Unauthorized",
    });
    console.log(authHeader)
  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      mensaje: "Not token",
    });
    
  jwt.verify(token, process.env.SecretJWT, (err, user) => {
    if (err)
      return res.status(401).json({
        mensaje: "Unauthorized verify",
      });

    req.user = user;
    next();
  });
};
