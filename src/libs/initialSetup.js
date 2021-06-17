import Role from './../models/Role'

export const createRoles = async () => {
    try {    
        const count = await Role.estimatedDocumentCount();
        //if role counter has register return 0;
        if(count > 0) return;

        //if roles doesn't exist, create them
        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'admin' }).save()
        ]);

        console.log(values);
    } catch(error) {
        console.error(error);
    }
}