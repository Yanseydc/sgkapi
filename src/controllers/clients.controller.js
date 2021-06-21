import Client from './../models/Client';
import CheckIn from './../models/CheckIn';

export const createClient = async (req, res) => {
    console.log('im creating a client');
    const { name, lastName, birthDate } = req.body;    
    const newClient = new Client({ name, lastName, birthDate });
    const clientSaved = await newClient.save();
    res.status(201).json(clientSaved);    
}

export const getClients = async (req, res) => {
    const clients = await Client.find();//get all clients

    res.status(200).json(clients);
}

export const getCLientById = async (req, res) => {
    const { clientId } = req.params;

    const client = await Client.findById(clientId);

    if(!client) return res.status(404).json({ message: `Client not found` });

    res.status(200).json(client);
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

export const checkIn = async (req, res) => {
    try {
        const { clientId } = req.body;

        const clientFound = await Client.findById(clientId);

        console.log('client', clientId);
        console.log('clientFound', clientFound);
        

        if(!clientFound) return res.status(404).json({ message: "Cliente no existe"});

        const newCheckIn = new CheckIn({ client: clientId });

        await newCheckIn.save();

        res.status(200).json({message: "Entrada"})
    } catch(error) {
        console.error(error);
    }
}


//bustboy & multer to upload images