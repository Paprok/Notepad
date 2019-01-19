'use strict';

class Note {
    constructor(){
        this.id = null;
        this.title = "New Title";
        this.content = "New Note";
        this.x = 200;
        this.y = 200;
    }
}

'use strict';

let draggedEl,
    grabPointX,
    grabPointY,
    createNote;
let noteIndex = 0;

function onDragStart(ev) {
    if(ev.target.classList.contains('bar')){
        draggedEl = this;
        let boundingClientRect = draggedEl.getBoundingClientRect();
        grabPointX = boundingClientRect.left - ev.clientX - 100;
        grabPointY = boundingClientRect.top - ev.clientY - 200;
        document.addEventListener('mousemove', onDrag, false);
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
};

 function onDragEnd(ev){
    document.removeEventListener('mousemove', onDrag, false);
};

createNote = function(){
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
};

createNote();
document.addEventListener('mouseup', onDragEnd, false);
document.getElementById('createNote').addEventListener('dblclick', createNote, false);