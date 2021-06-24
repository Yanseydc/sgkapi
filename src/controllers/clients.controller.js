import Client from './../models/Client';
import CheckIn from './../models/CheckIn';
import Payment from './../models/Payment';

export const createClient = async (req, res) => {    
    const { firstName, lastName, email, phone, birthDate, referenceName, referencePhone } = req.body;   
    const newClient = new Client({ 
        firstName, 
        lastName, 
        email,
        phone,
        birthDate: new Date(birthDate),        
        referenceName,
        referencePhone
    });

    const clientSaved = await newClient.save();
    res.status(201).json(clientSaved);    
}

export const getClients = async (req, res) => {
    try {
        let clients = await Client.find();//get all clients    

        const addPayments = await Promise.all(clients.map(async (client) => {    
            
            const clientPayment = await Payment.findOne(
                { client: client._id }, {}, { sort: { 'createdAt': -1 }}            
            ).populate('plan'); 
                        
            const { _id, firstName, lastName } = client; 

            return {
                _id,
                firstName,
                lastName,
                lastPayment: clientPayment?.createdAt,
                plan: clientPayment?.plan[0]
            };
        }));

        res.status(200).json(addPayments);
    }catch(error) {
        console.error("getClients-error: ", error);
    }
}

export const getCLientById = async (req, res) => {
    try {
        const { clientId } = req.params;

        const client = await Client.findById(clientId);

        if(!client) return res.status(404).json({ message: `No se encontro el cliente` });

        res.status(200).json(client);
    } catch(error) {
        console.log('get by id - error: ', error);
    }
}

export const updateClientById = async (req, res) => {
    const { clientId } = req.params;

    const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, {
        new: true //to return new data updated
    });

    res.status(200).json(updatedClient);
}

export const deleteClientById = async (req, res) => {
    const { clientId } = req.params;

    const clientDeleted = await Client.findByIdAndDelete(clientId);

    if(!clientDeleted) return res.status(404).json({ message: `Cliente no existe`});

    res.status(200).json({message: "El cliente se borro correctamente"});
}

export const checkInClient = async (req, res) => {
    try {
        const { clientId } = req.body;

        const clientFound = await Client.findById(clientId);

        if(!clientFound) return res.status(404).json({ message: "Cliente no existe"});

        const newCheckIn = new CheckIn({ client: clientId });

        await newCheckIn.save();

        res.status(200).json({message: "Entrada"})
    } catch(error) {
        console.error('checkIn-error: ', error);
    }
}

export const paymentClient = async (req, res) => {
    try {
        const { clientId, plan, entryDate, newCost } = req.body;

        const clientFound = await Client.findById(clientId);

        if(!clientFound) return res.status(404).json({ message: "Cliente no existe"});

        const newPayment = new Payment({ client: clientId, plan,  entryDate, newCost});

        await newPayment.save();

        res.status(200).json({message: "payment successfully"})
    } catch(error) {
        console.error('payment-error: ', error);
    }
}

