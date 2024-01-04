const express = require('express');
const Note = require('./mongoose/modals');

const router = express.Router();

//Create data

router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "missing field" })
    } else if (title.length > 100) {
        return res.status(400).json({ message: "Title exceeds max length of 100" })
    }
    Note.create({ title, content }).then((data) => res.status(201).json(data))
        .catch(err => res.status(500).json({ message: "Something went wrong" }))
})


//Get all data
router.get('/', (req, res) => {
    Note.find().then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ message: "Something went wrong" }))
})


//Get specific data
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await Note.findById(id);
        if (!data) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
})


//Update data
router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const id = req.params.id;
        if (!title || !content) {
            return res.status(400).json({ message: "missing field" })
        } else if (title.length > 100) {
            return res.status(400).json({ message: "Title exceeds max length of 100" })
        }

        const updatedData = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedData) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedData)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
})



//delete data
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteNote = await Note.findByIdAndDelete(id)
        if (!deleteNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }

})

module.exports = router;