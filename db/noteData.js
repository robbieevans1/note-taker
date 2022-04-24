// Dependendencies
const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Newest update

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

// Class template for adding removing and deleting notes
class Methods {
	write(note) {
		return writeNote("db/db.json", JSON.stringify(note));
	}

	read() {
		return readNote("db/db.json", "utf8");
	}

	getNotes() {
		return this.read().then((notes) => {
			let parsedNotes;
			try {
				parsedNotes = [].concat(JSON.parse(notes));
			} catch (err) {
				parsedNotes = [];
			}
			return parsedNotes;
		});
	}

	postNote(note) {
		const { title, text } = note;
		if (!title || !text) {
			throw new Error("Please enter text for a name or title");
		}
    // adds unique identifier for notes
		const newNote = { title, text, id: uuidv4() };

		return this.getNotes()
			.then((notes) => [...notes, newNote])
			.then((updatedNotes) => this.write(updatedNotes))
			.then(() => newNote);
	}

	deleteNote(id) {
		return this.getNotes()
			.then((notes) => notes.filter((note) => note.id !== id))
			.then((filteredNotes) => this.write(filteredNotes));
	}
}

module.exports = new Methods();