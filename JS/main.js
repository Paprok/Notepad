'use strict';

var draggedEl,
    onDragStart,
    onDrag,
    onDragEnd,
    grabPointX,
    grabPointY,
    createNote;

onDragStart = function (ev) {
    var boundingClientRect;
    if(ev.target.className.indexOf('bar') === -1){
        return;
    } 
    draggedEl = this;
    boundingClientRect = draggedEl.getBoundingClientRect();

    grabPointX = boundingClientRect.left - ev.clientX - 100;
    grabPointY = boundingClientRect.top - ev.clientY - 200;

};

onDrag = function(ev) {
    if(!draggedEl){
        return;
    }
    var posX = ev.clientX + grabPointX;
    var posY = ev.clientY + grabPointY;

    if(posX<0){
        posX = 0;
    }
    if(posY<-100){
        posY = -100;
    }

    draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
};

onDragEnd = function(){
    draggedEl = null;
    grabPointX = null;
    grabPointY = null;
};

createNote = function(){
    var noteElement = document.createElement('div');
    var barElement = document.createElement('div');
    var textElement = document.createElement('textarea');
    textElement.appendChild(document.createTextNode('text here'));
    let barText = document.createTextNode('title here');
    
    barElement.appendChild(barText);
    barElement.setAttribute('contenteditable', 'true')
    noteElement.classList.add('note');
    barElement.classList.add('bar');

    noteElement.appendChild(barElement);
    noteElement.appendChild(textElement);

    noteElement.addEventListener('mousedown', onDragStart, false);
    

    document.body.appendChild(noteElement);
};

createNote();
document.addEventListener('mousemove', onDrag, false);
document.addEventListener('mouseup', onDragEnd, false);
document.getElementById('createNote').addEventListener('dblclick', createNote, false);