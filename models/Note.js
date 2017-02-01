class Note {
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this.updated = new Date();
  }
}

module.exports = Note;
