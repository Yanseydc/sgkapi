import Client from './../models/Client';
import CheckIn from './../models/CheckIn';
import Payment from './../models/Payment';
import fs from 'fs';

export const createClient = async (req, res) => {    
    const { firstName, lastName, email, phone, birthDate, referenceName, referencePhone, image64 } = req.body;  
    
    let imagePath = image64 ? getImagePath(image64) : '';

    const newClient = new Client({ 
        firstName, 
        lastName, 
        email,
        phone,
        birthDate: birthDate ? new Date(birthDate) : '',        
        referenceName,
        referencePhone,
        imagePath
    });

    const clientSaved = await newClient.save();
    res.status(201).json({ message: "Cliente registrado correctamente"});    
}

export const getClients = async (req, res) => {
    try {
        let clients = await Client.find({}, {}, { sort: { createdAt: -1 } });//get all clients    

        const addPayments = await Promise.all(clients.map(async (client) => {    
            
            const clientPayment = await Payment.findOne({ client: client._id }, {}, { sort: { createdAt: -1 }})
                        
            const { _id, firstName, lastName, imagePath } = client; 

            return {
                _id,
                firstName,
                lastName,
                lastPayment: clientPayment?.entryDate,
                months: clientPayment?.months,
                imagePath
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

        const { _id, firstName, lastName } = client; 

        const clientPayment = await Payment.findOne({ client: client._id }, {}, { sort: { 'createdAt': -1 }});

        res.status(200).json({
            _id,
            firstName,
            lastName,
            lastPayment: clientPayment?.entryDate,
            months: clientPayment?.months
        });
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
    try {
        const { clientId } = req.params;

        const clientDeleted = await Client.findByIdAndDelete(clientId);

        if(!clientDeleted) return res.status(404).json({ message: `Cliente no existe`});

        res.status(200).json({message: "El cliente se borro correctamente"});
    } catch (error) {
        console.error('delete client: ', error);
    }

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
        const { clientId, months, cost, entryDate } = req.body;

        const clientFound = await Client.findById(clientId);

        if(!clientFound) return res.status(404).json({ message: "Cliente no existe"});

        const newPayment = new Payment({ client: clientId, months, cost, entryDate });

        await newPayment.save();

        res.status(200).json({message: "payment successfully"})
    } catch(error) {
        console.error('payment-error: ', error);
    }
}


const getImagePath = (image64) => {

    let match = image64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    let buffer =  Buffer.from(match[2], 'base64');
    
    let imageName = `photo_${new Date().getTime()}.png`;
    let imagePath = `public/${imageName}`;
    
    fs.writeFile( imagePath, buffer, (err) => {
        if(err) console.error('image save error: ', err);
    });

    return imageName;
}