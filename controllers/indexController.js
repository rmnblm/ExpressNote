const store = require('../services/notesStore');

const controller = {};

controller.index = (req, res) => {
  store.readAll((err, notes) => {
    if (err) {
      throw new Error(err);
    }
    res.render('index', {
      title: 'Dashboard - ExpressNote',
      notes,
    });
  });
};

module.exports = controller;
