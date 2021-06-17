import Client from './../models/Client';

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

    if(!clientDeleted) return res.status(404).json({ message: `Client doesn't exist`});

    res.status(200).json({message: "client deleted correctly"});
}



//bustboy & multer to upload images