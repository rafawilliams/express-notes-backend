const userModel = require('./../models/User');
const usersControllers = {};


usersControllers.getUsers = async(req, res) => {

    const users = await userModel.find();
    res.json(users);
};

usersControllers.createUser = async(req, res) => {

    const {username} = req.body;
    const newUser = new userModel({
        username
    });
    await newUser.save();
    res.json({message: 'create a new user'});
} 

usersControllers.deleteUser =  async(req, res) => {

    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.json({message: 'user has deleted'})
};

module.exports = usersControllers;