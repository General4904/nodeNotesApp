const express = require("express");
const router = express.Router();
const fs = require("fs");

const readJSONFile = (JSONFile, callback) => {
  fs.readFile(JSONFile, "utf-8", (err, data) => {
    if (err) return callback(err, null);

    try {
      const parsedData = JSON.parse(data);
      callback(null, parsedData);
    } catch (parseErr) {
      callback(parseErr, null);
    }
  });
};

const writeJSONFile = (JSONFile, data, callback) => {
  try {
    const stringifiedData = JSON.stringify(data, null, 2);

    fs.writeFile(JSONFile, stringifiedData, "utf-8", (err) => {
      if (err) return callback(err);
      callback(null);
    });
  } catch (stringifyErr) {
    callback(stringifyErr);
  }
};

router.post("/addNote", (req, res) => {
  const { note } = req.body;
  const id = Date.now().toString();
  const timestamp = new Date().toISOString();

  readJSONFile("./notes.json", (err, notesData) => {
    const noteData = {
      id: id,
      timestamp: timestamp,
      note: note,
    };

    notesData.push(noteData);

    const stringOfData = JSON.stringify(notesData, null, 2);

    writeJSONFile("./notes.json", notesData, (writeErr) => {
      if (writeErr)
        return res.status(500).json({ message: "Unable to write file" });

      res.status(201).json({ message: "Note added successfully" });
    });
  });
});

router.delete("/removeNote/:id", (req, res) => {
  const noteId = String(req.params.id);

  readJSONFile("./notes.json", (err, notesData) => {
    const noteExists = notesData.some((note) => String(note.id) === noteId);
    if (!noteExists)
      return res.status(404).json({ message: "Note doesn't exist" });

    const updatedNotes = notesData.filter((note) => String(note.id) !== noteId);

    writeJSONFile("./notes.json", updatedNotes, (writeErr) => {
      if (writeErr)
        return res.status(500).json({ message: "Unable to update file" });

      res.status(200).json({ message: "Note sucesfully deleted" });
    });
  });
});

module.exports = router;
