'use strict';

let draggedEl,
    grabPointX,
    grabPointY;

function createNote(loadedNote) {
    let { noteText, noteTitle } = setTextAndTitle(loadedNote);
    let deleteButton = createDeleteButton();
    let textElement = createTextField(noteText);
    let barElement = createBar(noteTitle, deleteButton);
    let noteElement = createNoteDiv(barElement, textElement);
    save(noteTitle, noteText, noteIndex);
    addNoteListeners(deleteButton, noteElement);
    document.body.appendChild(noteElement);
    noteIndex++;
}

function addNoteListeners(deleteButton, noteElement) {
    deleteButton.addEventListener('click', deleteNote, false);
    noteElement.addEventListener('mousedown', onDragStart, false);
    noteElement.addEventListener('focusout', saveNote, true);
}

function setTextAndTitle(loadedNote) {
    let noteText;
    let noteTitle;
    if (loadedNote.title) {
        noteText = loadedNote.text;
        noteTitle = loadedNote.title;
        noteIndex = parseInt(loadedNote.id);
    }
    else {
        noteText = 'Note text here';
        noteTitle = 'Note title here';
    }
    return { noteText, noteTitle };
}

function createDeleteButton() {
    let deleteButtonImage = document.createElement('img');
    deleteButtonImage.setAttribute('src', '/img/close.png');
    deleteButtonImage.setAttribute('type', 'submit');
    let deleteButton = document.createElement('button');
    deleteButton.appendChild(deleteButtonImage);
    deleteButton.classList.add('delete');
    deleteButton.setAttribute('contenteditable', 'false');
    return deleteButton;
}

function createTextField(noteText) {
    let textElement = document.createElement('textarea');
    textElement.appendChild(document.createTextNode(noteText));
    return textElement;
}

function createBar(noteTitle, deleteButton) {
    let barText = document.createTextNode(noteTitle);
    let barField = document.createElement('div');
    barField.appendChild(barText);
    barField.setAttribute('contenteditable', 'true');
    let barElement = document.createElement('div');
    barElement.appendChild(barField);
    barElement.appendChild(deleteButton);
    barElement.classList.add('bar');
    return barElement;
}

function createNoteDiv(barElement, textElement) {
    let noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.appendChild(barElement);
    noteElement.appendChild(textElement);
    noteElement.setAttribute('id', (noteIndex + ''));
    return noteElement;
}

function onDragStart(ev) {
    if(ev.target.classList.contains('bar')){
        
        draggedEl = this;
        let boundingClientRect = draggedEl.getBoundingClientRect();
        grabPointX = boundingClientRect.left - ev.clientX - 100;
        grabPointY = boundingClientRect.top - ev.clientY - 200;
        document.addEventListener('mousemove', onDrag, false);
        document.addEventListener('mouseup', onDragEnd, false);
    } 
}

function onDrag(ev) {
    let posX = ev.clientX + grabPointX;
    let posY = ev.clientY + grabPointY;
    if(posX<0){
        posX = 0;
    }
    if(posY<-100){
        posY = -100;
    }
    draggedEl.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
}

function onDragEnd(){
    document.removeEventListener('mousemove', onDrag, false);
    document.removeEventListener('mouseup', onDragEnd, false);
}

function deleteNote(event){
    let note = getNoteDiv(event.target);
    let noteId = note.getAttribute('id');
    note.parentNode.removeChild(note);    
    localStorage.removeItem(noteId);

}

function getNoteDiv(element){
    if(element.classList.contains('note')){
        return element;
    } else {
        return getNoteDiv(element.parentNode);
    }
}

function saveNote(event){
    let note = getNoteDiv(event.target);
    let noteId = note.getAttribute('id');
    let noteText = getNoteText(note);
    let noteTitle = getNoteTitle(note);
    save(noteTitle, noteText, noteId);
}

function save(noteTitle, noteText, noteId) {
    noteId = noteId;
    let noteToSave = { title: noteTitle, text: noteText, id:noteId};
    let json = JSON.stringify(noteToSave);
    localStorage.setItem(noteId, json);
}

function getNoteText(note){
    return note.childNodes[1].value;
}

function getNoteTitle(note){
    return note.childNodes[0].textContent;
}

function loadNotes(){
    noteIndex = 0;
    let length = localStorage.length;
    for(let i = 0; i < length; i++){
        let loadedNote = localStorage.getItem(localStorage.key(i));
        createNote(JSON.parse(loadedNote));
    }
    length = localStorage.length;
    // deleteOldNotes(noteIndex, length);
}

function deleteOldNotes(last, length){
    for(let i = last; i <= length; i++){
        localStorage.removeItem(localStorage.key(i));
    }
}

let noteIndex = 0;
loadNotes();
document.getElementById('createNote').addEventListener('dblclick', createNote, false);
