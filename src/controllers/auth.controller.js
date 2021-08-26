import User from './../models/User';
import Role from './../models/Role';
import jwt from 'jsonwebtoken';
import { SECRET } from './../config'

export const signUp = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;

        if(!username, !password) return res.status(404).json({ message: "Usuario y contraseña no deben ir vacias" });
        //before saving user we have to validate if existing, update: there is a middle ware verifying that 
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)        
        });

        //validate if has roles, if not add user role as default
        if(roles) {
            const foundRoles = await Role.find({ name: { $in: roles } }); //return an array of founded roles;
            newUser.roles = foundRoles.map( role => role._id); //founded roles just save the _id of them
        } else {
            const role = await Role.findOne({ name: 'user' });
            newUser.roles = [ role._id ];
        }
        
        await newUser.save();
        //now the user won't be authenticated from the beggining
        // const token = jwt.sign({id: userSaved._id}, SECRET, { expiresIn: 14400 }); //86400s == 24 hrs

        res.json({message: 'El usuario se registro correctamente'});
    } catch(error) {
        res.json({message: error.response.data.message});
    }
};

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) return res.status(404).json({ message: "Usuario y contraseña no deben ir vacias" });

        //from the logging we find the user
        const userFound = await User.findOne({ username }).populate("roles"); //adding populate(<param>) function returns the name object of the associated role

        if(!userFound) return res.status(404).json({ message: "Usuario no existe" });

        //then we'll compare passwords of the userFound with the enteres password
        const matchPassword = await User.comparePassword(password, userFound.password);
        
        if(!matchPassword) return res.status(401).json({ token: null, message: "Usuario o contraseña incorrectos" });

        //once the password matched, we create the sign token to send back to the user.
        const token = jwt.sign({ id: userFound._id }, SECRET, { expiresIn: 14400 }); //14400 == 4hrs

        res.json({ token, username: userFound.username, email: userFound.email });
    }catch(error) {
        res.json({message: error.response?.data.message});
    }
};

