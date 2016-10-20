import React, { Component } from "react";
import Note from "./Note";

const newNoteText = "New note :-)";
const newNoteButtonText = "ADD NEW";

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };

    // Bindings
    this.update = this.update.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.nextId = this.nextId.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  componentWillMount() {
    // Get notes from local storage
    var notes = JSON.parse(localStorage.getItem("notesStorage")) || [];
    notes.map((single) => {
      this.add(single.note, single.position);
    });
  }

  // Save to localStorage
  saveToStorage(notes) {
    this.setState({notes});
    localStorage.setItem("notesStorage", JSON.stringify(notes));
  }

  // Get next ID
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  // Add note to localStorage and state
  add(text, position) {
    const { notes } = this.state;
    notes.push({
      id: this.nextId(),
      note: text,
      position
    });

    this.saveToStorage(notes);
  }

  // Update note text
  update(newText, i) {
    const { notes } = this.state;
    notes[i].note = newText;
    this.saveToStorage(notes);
  }

  // Update note position
  updatePosition(position, i) {
    const { notes } = this.state;
    notes[i].position = position;
    this.saveToStorage(notes);
  }

  // Remove note
  remove(i) {
    const { notes } = this.state;
    notes.splice(i, 1);
    this.saveToStorage(notes);
  }

  // Render Notes
  renderNotes(note, i) {
    return (
      <Note key={note.id}
            index={i}
            position={note.position}
            onChange={this.update}
            onDrag={this.updatePosition}
            onRemove={this.remove} >
        {note.note}
      </Note>
    );
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="board">
        <header className="main-header">
          <div className="main-header__text fadein" onClick={this.add.bind(null, newNoteText, false)}>
            {newNoteButtonText}
          </div>
        </header>
        {notes.map(this.renderNotes)}
      </div>
    );
  }

}
