import Role from './../models/Role';
import Plan from './../models/Plan';

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

export const createPlans = async () => {
    try {
        const count = await Plan.estimatedDocumentCount();
        
        if(count > 0) return;

        const values = await Promise.all([
            new Plan({ name: 'Mensual', cost: '300', months: 1 }).save(),
            new Plan({ name: 'Bimestral', cost: '550', months: 2 }).save(),
            new Plan({ name: 'Semestral', cost: '1500', months: 6 }).save(),
        ]);

    } catch(error) {
        console.error(error);
    }
}