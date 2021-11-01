var path;
var _this = this;
//Opciones para detectar los objetos al borrar
var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
}


// Llamar a dibujar o a borrar (depende de la herramienta)
function onMouseDown(event){
    if(window.drawTool === 'draw'){
        drawFn()
    } else {
        deleteFn(event)
    }
}
// Drag = añadir puntos o llamar a borrar
function onMouseDrag(event){
    if(window.drawTool === 'draw'){
        path.add(event.point);
        path.blendMode = 'multiply';
    } else {
        deleteFn(event);
    }
}
//Simplificar trazo
function onMouseUp(event){
    if(window.drawTool === 'draw'){
        path.simplify();
    }
}
//Dibujar : Características del trazo
function drawFn () {
    path = new Path();
    path.strokeColor = '#2591EE';
    path.strokeWidth = 4;
    path.strokeCap = 'round';
    path.strokeJoin = 'round';
}
// Borrar
function deleteFn (event){
    var hitResult = project.hitTest(event.point, hitOptions)
    if(!hitResult){
        return
    }

    if(hitResult){
        hitResult.item.remove()
    }
}

// Limpiar todo
var clearPaper = function () {
    _this.project.clear()
}
// Convertir en global
window.clearPaper = clearPaper;