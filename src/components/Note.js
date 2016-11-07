import React, { Component } from "react";
import ReactDOM from "react-dom";

const saveText = "SAVE";
const removeToolTipText = "Remove note";

export default class Note extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  updatePosition({position}) {
    this.style = {
      left: (position ? position.xPos : this.randomBetween(0, window.innerWidth - 280) + "px"),
      top: (position ? position.yPos : this.randomBetween(0, window.innerHeight - 280) + "px")
    };
  }

  componentWillMount() {
    this.updatePosition(this.props);
  }

  componentWillUpdate(nextProps) {
    this.updatePosition(nextProps);
  }

  onDragStart(e) {
    const { index } = this.props;
    e.dataTransfer.setData("application/x-note", index);
  }

  // Get random position
  randomBetween(min, max) {
    return (min + Math.ceil(Math.random() * max));
  }

  // Turn on edit moge
  edit() {
    this.setState({editing: true});
  }

  // Save edits
  save() {
    const { index } = this.props;
    this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value, index);
    this.setState({editing: false});
  }

  // Remove note
  remove() {
    const { index } = this.props;
    this.props.onRemove(index);
  }

  // Render note body
  renderNoteBody(content, save) {
    return (
      <div draggable="true" onDragStart={(e) => this.onDragStart(e)} onDoubleClick={() => this.edit()} className="note" style={this.style}>
        <article>
          <header className="note__header">
            <div className="wrapper-tooltip">
               <span onClick={() => this.remove()} className="close hairline"></span>
               <div className="tooltip">{removeToolTipText}</div>
            </div>
          </header>
          <div className="note__content">{content}</div>
          <footer className="note__footer">
            <div className="note__fold"></div>
            {save ? <div className="note__save" onClick={() => this.save()}>{saveText}</div> : ""}
          </footer>
        </article>
      </div>
    );
  }

  // Render note preview
  renderDisplay() {
    const { children } = this.props;
    return this.renderNoteBody(children);
  }

  // Render note edit mode
  renderForm() {
    const { children } = this.props;
    const content = (
      <div>
        <textarea ref="newText" defaultValue={children} className="note__textarea"></textarea>
      </div>
    );

    return this.renderNoteBody(content, true);
  }

  render() {
    const { editing } = this.state;
    return (editing ? this.renderForm() : this.renderDisplay());
  }

}
