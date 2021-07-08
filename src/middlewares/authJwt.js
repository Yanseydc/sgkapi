//this script will work to validate the jwt on every route that the user wants to access
import User from './../models/User';
import { SECRET } from './../config'; 
import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
            
        if(!token) return res.status(403).json({ message: "Token de seguridad faltante" });
                
        const decoded = jwt.verify(token, SECRET); //if true will return the id of the user { id: 'userid };

        const userFound = await User.findById(decoded.id); //we must validate that the ID exist

        if(!userFound) return res.status(403).json({ message: "No tienes el permiso " });

        req.userId = decoded.id; //we add the user id to the req object, because it's going to be used in the isAdmin method

        next(); //this will allow to continue to the next function
    } catch(error) {
        res.status(401).json(error)
    }    
}

export const isAdmin = async (req, res, next) => {
    const { userId } = req;

    const userFound = await User.findById(userId).populate("roles");  //populare will help to bring the object of the roles

    const hasAdminRole = userFound.roles.some( role => role.name === 'admin'); //validate if there is a role with admin name

    if(!hasAdminRole) return res.status(403).json({ message: `Se requieren permisos de administrador para hacer esto`}); //403 status: forbidden
    
    next();
}