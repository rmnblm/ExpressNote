const store = require('../services/notesStore');
const Note = require('../models/Note');

const controller = {};

controller.new = (req, res) => {
  res.render('./notes/new', {
    title: 'New Note - ExpressNote',
  });
};

controller.edit = (req, res) => {
  store.read(req.params.id, (err, note) => {
    res.render('./notes/edit', note);
  });
};

controller.add = (req, res) => {
  const note = new Note(req.body.title, req.body.content);
  store.create(note, (err) => {
    if (err) {
      throw new Error(err);
    }
    res.redirect('/');
  });
};

controller.update = (req, res) => {
  store.update(req.body, (err) => {
    if (err) {
      throw new Error(err);
    }
    res.redirect('/');
  });
};

controller.remove = (req, res) => {
  store.delete(req.params.id, (err) => {
    if (err) {
      throw new Error(err);
    }
    res.redirect('/');
  });
};

module.exports = controller;
