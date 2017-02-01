const Datastore = require('nedb');

const db = new Datastore({ filename: './data/notes.db', autoload: true });
const store = {};

store.read = (id, callback) => {
  db.findOne({ _id: id }, callback);
};

store.readAll = (callback) => {
  db.find({}, callback);
};

store.create = (note, callback) => {
  db.insert(note, callback);
};

store.update = (note, callback) => {
  const noteToUpdate = note;
  noteToUpdate.updated = new Date();
  db.update({ _id: noteToUpdate._id }, { $set: noteToUpdate }, { upsert: true }, callback);
};

store.delete = (id, callback) => {
  db.remove({ _id: id }, callback);
};

module.exports = store;
