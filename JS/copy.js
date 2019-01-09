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

function onDragStart(ev){
    if(ev.target.classList.contains('bar')){
        let draggedElement = this;
        let boundingNoteCoords = draggedElement.getBoundingNoteCoords();
        let grabPointX = boundingNoteCoords.x - ev.clientX;
        let grabPointY = boundingNoteCoords.y - ev.clientY;
    }
}
