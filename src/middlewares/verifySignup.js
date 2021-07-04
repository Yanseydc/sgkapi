import Role from './../models/Role';
import User from './../models/User';

export const verifyUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        const usernameFound = await User.findOne({ username: username });        
        if(usernameFound) return res.status(400).json({ message: 'El usuario ya existe' }); //409 status: conflict

        const emailFound = await User.findOne({ email: email });
        if(emailFound) return res.status(400).json({ message: 'El email ya existe' }); //409 status: conflict

        next();
    } catch(error) {
        res.status(400).json(error);
    }
}

export const checkRolesExist = async (req, res, next) => {
    try {
        const { roles } = req.body;

        if(!roles) { next(); return; }  //next and break script;

        const rolesObj = await Role.find(); //go get the roels
        
        if(!rolesObj) return res.status(404).json({ message: "No se encontraron roles en el sistema" })

        const dbRoles = rolesObj.map( roleObj => roleObj.name); //get only the role names

        //from the sended roles, validate that exist in database roles
        for(let role in roles) {
            if(!dbRoles.includes(roles[role])) {
                return res.status(404).json({ message: `El rol ${roles[role]} no existe en el sistema` });            
            }
        };
        
        next();
    } catch(error) {
        res.status(400).json(error);
    }
};