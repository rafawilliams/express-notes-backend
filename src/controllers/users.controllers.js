const userModel = require('./../models/User');
const usersControllers = {};


usersControllers.getUsers = async(req, res, next) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

usersControllers.createUser = async(req, res, next) => {
    try {
        const {username} = req.body;
        const newUser = new userModel({
            username
        });
        await newUser.save();
        res.status(201).json({message: 'create a new user'});
    } catch (error) {
        next(error);
    }
} 

usersControllers.deleteUser =  async(req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json({message: 'user has deleted'})
    } catch (error) {
        next(error);
    }
};

module.exports = usersControllers;