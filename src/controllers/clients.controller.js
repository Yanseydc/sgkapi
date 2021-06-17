import Client from './../models/Client';

export const createClient = async (req, res) => {
    const { name, lastName, birthDate } = req.body;    
    const newClient = new Client({ name, lastName, birthDate });
    const clientSaved = await newClient.save();
    res.status(201).json(clientSaved);    
}

export const getClients = async (req, res) => {
    const clients = await Client.find();//get all clients

    res.json(clients);
}

export const getCLientById = async (req, res) => {
    const { clientId } = req.params;
    const client = await Client.findById(clientId);

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
    await Client.findByIdAndDelete(clientId);

    res.status(204).json();
}


//bustboy & multer to upload images