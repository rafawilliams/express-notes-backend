const noteModel = require('./../models/Note');
const notesControllers = {};

notesControllers.getNotes = async (req, res, next) =>{
    try {
        const notes = await noteModel.find();
        res.json(notes);
    } catch (error) {
        next(error);
    }
};

notesControllers.getNote = async(req, res, next) => {
    try {
        const _id = req.params.id;
        const note = await noteModel.findById(_id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        next(error);
    }
};

notesControllers.createNote = async (req, res, next) => {
    try {
        const {title, description, autor, date} = req.body;
        const newNote = new noteModel({
            title, 
            description, 
            autor, 
            date
        });
        await newNote.save();
        res.status(201).json({message: 'Note created!'})
    } catch (error) {
        next(error);
    }
};

notesControllers.updateNote = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const {title, description, autor} = req.body;
        const note = await noteModel.findByIdAndUpdate(_id, {
            title, 
            description, 
            autor
        }, { new: true });
        
        if (!note) {
             return res.status(404).json({ message: 'Note not found' });
        }

        res.json({message: 'Note updated', note})
    } catch (error) {
        next(error);
    }
};

notesControllers.deleteNote = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const note = await noteModel.findByIdAndDelete(_id);
        if (!note) {
             return res.status(404).json({ message: 'Note not found' });
        }
        res.json({message: 'Note deleted'})
    } catch (error) {
        next(error);
    }
};

module.exports = notesControllers;