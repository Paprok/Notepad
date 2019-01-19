'use strict';
let noteIndex = 0;


let draggedEl,
    grabPointX,
    grabPointY;

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
    draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
}

function onDragEnd(){
    document.removeEventListener('mousemove', onDrag, false);
    document.removeEventListener('mouseup', onDragEnd, false);
}

function createNote() {
    let textElement = document.createElement('textarea');
    textElement.appendChild(document.createTextNode('text here'));
    
    let barText = document.createTextNode('title here');
    
    let barElement = document.createElement('div');
    barElement.appendChild(barText);
    barElement.setAttribute('contenteditable', 'true')
    barElement.classList.add('bar');
    
    let noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.appendChild(barElement);
    noteElement.appendChild(textElement);
    noteElement.addEventListener('mousedown', onDragStart, false);
    noteElement.setAttribute('id', (noteIndex + ''));
    noteIndex++;

    document.body.appendChild(noteElement);
}

createNote();
document.getElementById('createNote').addEventListener('dblclick', createNote, false);