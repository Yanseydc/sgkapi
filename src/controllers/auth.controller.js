import User from './../models/User';
import Role from './../models/Role';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    //before saving user we have to validate if existing
    // const userFound = User.find({ email });

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)        
    });

    //validate if has roles
    if(roles) {
        const foundRoles = await Role.find({ name: { $in: roles } }); //return an array of founded roles;
        newUser.roles = foundRoles.map( role => role._id); //founded roles just save the _id of them
    } else {
        const role = await Role.findOne({ name: 'user' });
        newUser.roles = [ role._id ];
    }
    
    const userSaved = await newUser.save();

    const token = jwt.sign({id: userSaved._id}, 'client_id', {
        expiresIn: 86400 //24 hrs
    });

    res.json(token);
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email }).populate("roles"); //adding populate(<param>) function returns the name object of the associated role

    if(!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(password, userFound.password);
    
    if(!matchPassword) return res.status(401).json({ token: null, message: "invalid username or password" });

    const token = jwt.sign({ id: userFound._id }, "client_id", {
        expiresIn: 86400 //24hrs
    });

    res.json({ token });
    /*
    {
        const userCompared = await User.comparePassword(userFound.password, password);
    } else {
        */
};