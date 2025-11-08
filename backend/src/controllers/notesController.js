export function getAllNotes(req, res) {
    res.status(200).send("you have 10 notes");
};

export function createNote(req, res) {
    res.status(201).json("note created successfully");
};

export function updateNote(req, res) {
    res.status(201).json("note update successfully");
};

export function deleteNote(req, res) {
    res.status(201).json("note deleted successfully");
};

