// Dependency
const router = require("express").Router();

// Pulls in noteData functions
const noteData = require("../db/noteData");

// GET request
router.get("/notes", (req, res) => {
	noteData
		.getNotes()
		.then((notes) => res.json(notes))
		.catch((err) => res.status(500).json(err));
});

// POST request
router.post("/notes", (req, res) => {
	noteData
		.postNote(req.body)
		.then((note) => res.json(note))
		.catch((err) => res.status(500).json(err));
});

// DELETE request
router.delete("/notes/:id", (req, res) => {
	noteData
		.deleteNote(req.params.id)
		.then(() => res.json({ ok: true }))
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
