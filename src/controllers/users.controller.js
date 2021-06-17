import User from './../models/User';

export const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    res.status(200).json({ message: "creating user...." });
}

export const getUsers = async (req, res) => {
    const users = await User.find();

    return res.status(200).json(users);
}