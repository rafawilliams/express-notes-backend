const noteModel = require('./../models/Note');
const notesControllers = {};

notesControllers.getNotes = async (req, res) =>{
  const notes = await noteModel.find();
  res.json(notes)
};

notesControllers.getNote = async(req, res) => {
    const _id = req.params.id;

    const note = await noteModel.findById(_id);
    res.json(note);
};

notesControllers.createNote = async (req, res) => {
    const {title, description, autor, date} = req.body;
    const newNote = new noteModel({
        title, 
        description, 
        autor, 
        date
    });
    await newNote.save();
    res.json({message: 'Note created!'})
};

notesControllers.updateNote = async (req, res) => {
    const _id = req.params.id;
    const {title, description, autor} = req.body;
    const note = await noteModel.findOneAndUpdate(_id, {
        title, 
        description, 
        autor
    });

    res.json({message: 'update Note'})
};

notesControllers.deleteNote = async (req, res) => {

    const _id = req.params.id;
    await noteModel.findByIdAndDelete(_id);

    res.json({message: 'delete Note'})
};

module.exports = notesControllers;