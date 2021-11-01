$(document).ready(function() {
	
	 $("body").prepend('<canvas id="canvas" width='+window.innerWidth+' height='+window.innerHeight+'></canvas>')
	 
	//$("#canvas").css({"height":window.innerHeight})
	$(".actContainer").css({"height":window.innerHeight})
	 
var scaleRatio = "";

window.addEventListener("orientationchange", function(event) {
  console.log("the orientation of the device is now " + event.target.screen.orientation.angle);
});
var gridArr =[".dropgrid_1",".dropgrid_3",".dropgrid_5",".dropgrid_7",".dropgrid_10"];
var gridArr2 =[".dropgrid2_2",".dropgrid2_4",".dropgrid2_7",".dropgrid2_10"];
var gridArr3 =[".dropgrid_1",".dropgrid_2",".dropgrid_3",".dropgrid_4",".dropgrid_5",".dropgrid_6",".dropgrid_7",".dropgrid_8",".dropgrid_9",".dropgrid_10",".dropgrid2_1",".dropgrid2_2",".dropgrid2_3",".dropgrid2_4",".dropgrid2_5",".dropgrid2_6",".dropgrid2_7",".dropgrid2_8",".dropgrid2_9",".dropgrid2_10"];
var gridcount1 = 0;
var gridcount2 = 0;
var overlap = false;
var elementRefArr =[];
var elementLocationContainer = [];
var howmanyVgridvisible =0;
var howmanyHgridvisible = 0;
hsequence =[1,0,3,2,5,4,7,6,9,8];
vsequence =[4,3,2,1,0,9,8,7,6,5];
var isValidDrop = false;
var colidearr=[];
var find = false;
var elementstartx =0;
var elementstarty = 0;
var isdone = false;
var last_mousex2 = "";
var last_mousey2 = "" ;
var elementremove = false;


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Variables
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw';


var totalgrid =10;
var imgArr=["tool_grid_1","tool_grid_2","red","yellow","counter_red5","counter_yellow5","counter_red10","counter_yellow10","draw_tool","eraser","reset"];

function createlayout(){

var dragtext = "";
dragtext +=  '<img src="./assets/images/toolbg.png" alt="back img" >';
for(var i=0; i<8; i++ ){

if(i< 2)dragtext +='<div acc-id="drag-grid" class="darg dargele'+(i+1)+' ">';
else dragtext +='<div  class="darg dargele'+(i+1)+' ">';
if(i< 2) dragtext +=  '<img   id="'+imgArr[i]+'" class="dragimg" src="./assets/images/'+imgArr[i]+'.png" alt="back img" >';
else dragtext +=  '<img  acc-id="drag-container"  id="'+imgArr[i]+'" class="dragimg" src="./assets/images/'+imgArr[i]+'.png" alt="back img" >';
dragtext +=  '</div>';
}

dragtext +='<div class="drawtool">'
dragtext +=  '<img  src="./assets/images/'+imgArr[8]+'.png" alt="back img" >';
dragtext +=  '</div>';

dragtext +='<div class="erasetool">'
dragtext +=  '<img  src="./assets/images/'+imgArr[9]+'.png" alt="back img" >';
dragtext +=  '</div>';

dragtext +='<div class="resettool">'
dragtext +=  '<img  src="./assets/images/'+imgArr[10]+'.png" alt="back img" >';
dragtext +=  '</div>';




var grid1="";
for(var i=0; i<10; i++ ){
 //   elementRefArr.push("dropgrid_"+ (i+1));
    grid1 += '<div class="dropgrid dropgrid_'+(i+1)+'">'
    for(var j=0; j<10; j++ ){
        elementRefArr.push("box_"+(i+1)+"_"+(j+1));
    grid1 += '<div   class ="dragbox box_'+(i+1)+ "_"+(j+1)+'">'
	
    grid1 +=  '<img   class="dragimg red" id="red" src="./assets/images/red.png" alt="red img" >';
	
    grid1 +=  '<img   class="dragimg yellow" id="yellow" src="./assets/images/yellow.png" alt="yellow img" >';
    grid1 +=  '</div>';
    }
    grid1 +=  '</div>';

}

//var grid2="";
for(var i=0; i<10; i++ ){
 //   elementRefArr.push("dropgrid_"+ (i+1));
    grid1 += '<div class="dropgrid2 dropgrid2_'+(i+1)+'">'
    for(var j=0; j<10; j++ ){
        elementRefArr.push("box2_"+(i+1)+"_"+(j+1));
    grid1 += '<div   class ="dragbox box2_'+(i+1)+ "_"+(j+1)+'">'
	
    grid1 +=  '<img   class="dragimg red" id="red" src="./assets/images/red.png" alt="red img" >';
	
    grid1 +=  '<img   class="dragimg yellow" id="yellow" src="./assets/images/yellow.png" alt="yellow img" >';
	
    grid1 +=  '</div>';
    }
    grid1 +=  '</div>';

}




$(".dropArea").html(grid1);
$(".sidebar").html(dragtext);
    
}
createlayout();

$(window).resize(function () {
	
	
   scaleActivity();
   scaleActivity2();
  
});
function scaleActivity2(){
	$(".dragclone2").css({               
				'width': $(".dragbox").find("img").width()*scaleRatio,
            });
	
	
};

 function scaleActivity () {
	 
	/*  alert($("body").height()+" "+window.innerHeight+" "+$(document).height())*/
	
	
	

var infoPopupRatio = Math.min(window.innerWidth/402, window.innerHeight/700);
//console.log(window.innerWidth+" infopopup----   "+window.innerHeight+" "+infoPopupRatio)
$("#infopopup").css({
					"transform": "scale("+infoPopupRatio+")",
					"-ms-transform": "scale("+infoPopupRatio+")",
					"-moz-transform": "scale("+infoPopupRatio+")",
					"-webkit-transform": "scale("+infoPopupRatio+")"
				});  
				
				$("#info").css({"top":window.innerHeight-35+"px"})
				$("#logo").css({"top":window.innerHeight-35+"px"});
				var pos = $("#info").position().top;
				 
				

$(".actContainer").css({"height":window.innerHeight})

				var win_h = $("body").height();
				var win_w = $("body").width();
	console.log("scaleRatio",win_h,win_w)			
				var h = $(".actarea").outerHeight();
				var w = $(".actarea").outerWidth();
				
		console.log("h,w",h,w)			
				var ratio = Math.min(win_h/h, win_w/w);
				var w = $(".actarea").outerWidth();
				 scaleRatio = Math.min(win_h/h, win_w/w);
	console.log("scaleRatio",scaleRatio)
				 $(".actarea").css({
					"transform": "scale("+ratio+")",
					"-ms-transform": "scale("+ratio+")",
					"-moz-transform": "scale("+ratio+")",
					"-webkit-transform": "scale("+ratio+")"
				}); 
				
				
				
				
				  $(".actarea").css({
					"top" : ( (h*scaleRatio)-h)/2 +"px",
					"left" : ((win_w - w)/2) + ((win_w - w*scaleRatio)/2) + "px"
				}); 
 

//setwidthofdrag element;





  


}


setTimeout(function(){
scaleActivity();	
	$("[acc-id='drag-grid']").draggable({        
        helper:function() {			
            return $(this).clone().appendTo('body').css({
                'zIndex': 5
				
				
            })
        },
		cursor: 'pointer',
        revert: function(isValidDrop) {           
        },
        start: function(event, ui) {
			
			
            currentDrag = ui.helper.clone(true);
			currentgrid = ui.helper[0].outerHTML
            grpHit = false;
            isSelectedTool = "";			
        },
        drag: function(event, ui) {
            isDraggable = true;
            currentDrag = ui.helper.clone(true);

        },
		stop: function(event, ui){	
	addgrid();
		}

    });
	
	
	function adddraggable() {
        $(".dragclone").draggable({
            cursor: 'pointer',
          
            drag: function() {
 currenteleclone =  $(".ui-draggable-dragging");				
            },
            stop: function(event, ui) {               
                var getlocation = ui.position;
                elementLocationContainer.push(getlocation);
                console.log(elementLocationContainer)
            }
        })
    }
	
	function addgrid(){
	if($(currentgrid).hasClass("dargele1")){
	griddisable("dargele1");
	
	//$(".dropgrid2").css("visibility","hidden");
	if(howmanyHgridvisible == 10){ 
	
	$(".dropgrid").each(function(){
		if($(this).css("visibility") == "visible"){}
		else{
			$(this).css("visibility","visible") ;  
			return false;
			}

		});
	
	
	
	return;}
	$(".dropgrid").eq(hsequence[howmanyHgridvisible]).css("visibility","initial");
	
	$(".dropgrid").eq(hsequence[howmanyHgridvisible]).addClass("dragclone");
	
	howmanyHgridvisible++;
	howmanyVgridvisible = 0;
	setTimeout(function(){ /* adddraggable(); */ }, 100);
	
} ;
if($(currentgrid).hasClass("dargele2")){
	$(".dargele1").draggable({ disabled: true });
	griddisable("dargele2");
	//$(".dropgrid").css("visibility","hidden");
if(howmanyVgridvisible == 10){ 
$(".dropgrid2").each(function(){
		if($(this).css("visibility") == "visible"){}
		else{
			$(this).css("visibility","visible") ;  
			return false;
			}

		});




return;}
	$(".dropgrid2").eq(vsequence[howmanyVgridvisible]).css("visibility","initial");
	
	$(".dropgrid2").eq(vsequence[howmanyVgridvisible]).addClass("dragclone");
	
	howmanyVgridvisible++;
	howmanyHgridvisible = 0;
	setTimeout(function(){ /* adddraggable(); */ }, 100);
	
}	;

	
} 
	
	
	
	
	
	
	
    
addEvents();


     $("[acc-id='drag-container']").draggable({
        containment: $(".actContainer"),
         helper:function(event) {	
		 isValidDrop = false;
		 console.log(">>>>>>>>44",event.pageX)
		 
				
            return $(this).clone().appendTo('body').css({
                'zIndex': 50,
				'width': $(".dragbox").find("img").width()*scaleRatio,
            })
        },
        zIndex : 6,
         revert:function()
           {
			console.log("/////////////////",last_mousex2,last_mousey2)	
		for(var i in elementRefArr){    
		//var  rect = document.getElementsByClassName("ui-draggable-dragging"); 
		var  rect2 = document.getElementsByClassName(elementRefArr[i]); 
		isCollapsed( last_mousex2,last_mousey2,rect2,elementRefArr[i] )
		} 
           },
           start:function(event, ui){
			   
			   var cX =  event.clientX
				var cY =  event.clientY
			   elementstartx = parseInt(cX-canvasx);
				 elementstarty = parseInt(cY-canvasy);

			 $(this).draggable("option", "cursorAt", {
            left: Math.floor(this.clientWidth / 2)*scaleRatio,
            top: Math.floor(this.clientHeight / 2)*scaleRatio
        }); 



			
			

           } ,
           drag:function(event, ui){  
          

            currenteleclone =  $(".ui-draggable-dragging");
				var cX =  event.clientX
				var cY =  event.clientY
			 last_mousex2 = mousex = parseInt(cX-canvasx);
			 last_mousey2 = mousey = parseInt(cY-canvasy);
			 console.log(last_mousex2,last_mousey2)
			 
           },          
           stop:function(event,ui)  {
               
			
			   
          
        
		
		
		if(isValidDrop) return;
			leftPosition  = ui.offset.left - $(this).offset().left;
			topPosition   = ui.offset.top - $(this).offset().top;
			console.log($(ui.helper).attr("id"));
			console.log(topPosition);
			
			
				
			if($(ui.helper).attr("id") == "counter_red5"){
				
				
				var getid = $(ui.helper).attr("id");
				var bwidth = Math.round($(ui.helper)[0].getBoundingClientRect().width);
				var bheight = Math.round($(ui.helper)[0].getBoundingClientRect().height);
				console.log("window.innerWidth",window.innerWidth)
				console.log("last_mousey2",last_mousey2)
				console.log("(bwidth*5)",(bwidth*5))
				
				var newtop = 0;
				var newy = last_mousey2;
				var newleft = last_mousex2;
				
				if((window.innerHeight) < ((bheight*2)+last_mousey2)) newy = window.innerHeight -  (bheight*2);
				if((window.innerWidth) < ((bwidth*5)+last_mousex2 + ($(".sidebar").width()+100)*scaleRatio)) newleft = window.innerWidth -  ((bwidth*5)+ $(".sidebar").width()*scaleRatio + (80*scaleRatio));
				console.log(bwidth,bheight)
				bwidth = bwidth + Number(10);
				
				for(var i = 0; i<5; i++){
					
				checkoverlap((newleft + ((i* bwidth))),(newy + newtop),$(".dragbox").find("img").width()*scaleRatio,$(".dragbox").find("img").height()*scaleRatio);  
				
					
				}
				
				if(overlap) { twinanim($(ui.helper),last_mousey2,last_mousex2);  overlap = false; return;}	
				
				
				for(var i = 0; i<5; i++){
				
			
				
				$("body").append($(".dargele3").find("img").clone().addClass("dragclone2").removeClass("ui-draggable-dragging").css({
                'left': (newleft + ((i* bwidth)))+"px",
				'top': (newy + newtop)+"px",
				'position':'absolute',
				'width': $(".dragbox").find("img").width()*scaleRatio,
            }));
			
			
				}
				
				
			}	
			else if($(ui.helper).attr("id") == "counter_yellow5"){
				var getid = $(ui.helper).attr("id");
				var bwidth = Math.round($(ui.helper)[0].getBoundingClientRect().width);
				var bheight = Math.round($(ui.helper)[0].getBoundingClientRect().height);
				var newtop = 0;
				console.log(bwidth,bheight)
				var newtop = 0;
				var newy = last_mousey2;
				var newleft = last_mousex2;
				
				if((window.innerHeight) < ((bheight*2)+last_mousey2)) newy = window.innerHeight -  (bheight*2);
				if((window.innerWidth) < ((bwidth*5)+last_mousex2+ ($(".sidebar").width()+100)*scaleRatio)) newleft = window.innerWidth -  ((bwidth*5)+ $(".sidebar").width()*scaleRatio + (80*scaleRatio));
				console.log(bwidth,bheight)
				bwidth = bwidth + Number(10);
				
				for(var i = 0; i<5; i++){
				checkoverlap((newleft + ((i* bwidth))),(newy + newtop),$(".dragbox").find("img").width()*scaleRatio,$(".dragbox").find("img").height()*scaleRatio);  
				
				}				
				
				if(overlap) {twinanim($(ui.helper),last_mousey2,last_mousex2);   overlap = false; return;}
				for(var i = 0; i<5; i++){
				/* checkoverlap((newleft + ((i* bwidth))),(newy + newtop),$(".dragbox").find("img").width()*scaleRatio,$(".dragbox").find("img").height()*scaleRatio);  
				if(overlap) {overlap = false; break;}	 */
				
				$("body").append($(".dargele4").find("img").clone().addClass("dragclone2").removeClass("ui-draggable-dragging").css({
                'left': (newleft + ((i* bwidth)))+"px",
				'top': (newy + newtop)+"px",
				'position':'absolute',
				'width': $(".dragbox").find("img").width()*scaleRatio,
            }));	
				}
				
				
			}	
			
			
			
			else if($(ui.helper).attr("id") == "counter_red10"){
				var getid = $(ui.helper).attr("id");
				var bwidth = Math.round($(ui.helper)[0].getBoundingClientRect().width);
				var bheight = Math.round($(ui.helper)[0].getBoundingClientRect().height);
				var newtop = 0;
				var newy = last_mousey2;
				var newleft = last_mousex2;
				
				if((window.innerHeight) < ((bheight*2)+last_mousey2)) newy = window.innerHeight -  (bheight*2);
				if((window.innerWidth) < ((bwidth*5)+last_mousex2+ ($(".sidebar").width()+100)*scaleRatio)) newleft = window.innerWidth -  ((bwidth*5)+ $(".sidebar").width()*scaleRatio + (80*scaleRatio));
				console.log(bwidth,bheight)
				bwidth = bwidth + Number(10);
				bheight = bheight + Number(10);
				var newtop2 = 0;
				for(var i = 0; i<10; i++){					 
				if(i == 5) newtop2 = bheight;	
				checkoverlap((newleft + ((i%5)* bwidth)),(newy + newtop2),$(".dragbox").find("img").width()*scaleRatio,$(".dragbox").find("img").height()*scaleRatio); 		
				}
				
				
				
				for(var i = 0; i<10; i++){
				if(i == 5) newtop = bheight;
				 
				
				if(overlap) {twinanim($(ui.helper),last_mousey2,last_mousex2);   overlap = false; break;}
				
				$("body").append($(".dargele3").find("img").clone().addClass("dragclone2").removeClass("ui-draggable-dragging").css({
                'left': (newleft + ((i%5)* bwidth))+"px",
				'top': (newy + newtop)+"px",
				'position':'absolute',
				'width': $(".dragbox").find("img").width()*scaleRatio,
            }));	
				}
						
				
			}	
			else if($(ui.helper).attr("id") == "counter_yellow10"){
				var getid = $(ui.helper).attr("id");
				var bwidth = Math.round($(ui.helper)[0].getBoundingClientRect().width);
				var bheight = Math.round($(ui.helper)[0].getBoundingClientRect().height);
				var newtop = 0;
				var newy = last_mousey2;
				var newleft = last_mousex2;
				
				if((window.innerHeight) < ((bheight*2)+last_mousey2)) newy = window.innerHeight -  (bheight*2);
				if((window.innerWidth) < ((bwidth*5)+last_mousex2+ ($(".sidebar").width()+100) *scaleRatio)) newleft = window.innerWidth -  ((bwidth*5)+ $(".sidebar").width()*scaleRatio + (80*scaleRatio));
				console.log(bwidth,bheight)
				console.log(bwidth,bheight)
				bwidth = bwidth + Number(10);
				bheight = bheight + Number(10);
				var newtop2 = 0;
				for(var i = 0; i<10; i++){
				
				if(i == 5) newtop2 = bheight;
				checkoverlap((newleft + ((i%5)* bwidth)),(newy + newtop2),$(".dragbox").find("img").width()*scaleRatio,$(".dragbox").find("img").height()*scaleRatio);
				}
				if(overlap) {twinanim($(ui.helper),last_mousey2,last_mousex2);     overlap = false; return;}
				
				for(var i = 0; i<10; i++){
				if(i == 5) newtop = bheight;				  
				  
				
				
				$("body").append($(".dargele4").find("img").clone().addClass("dragclone2").removeClass("ui-draggable-dragging").css({
                'left': (newleft + ((i%5)* bwidth))+"px",
				'top': (newy + newtop)+"px",
				'position':'absolute',
				'width': $(".dragbox").find("img").width()*scaleRatio,
            }));	
				}
				
				
			}	
			else{
				
				checkoverlap($(ui.helper).position().left,$(ui.helper).position().top,$(".dragbox").find("img").width()*scaleRatio,$(".dragbox").find("img").height()*scaleRatio); 			
				if(overlap) {twinanim($(ui.helper),last_mousey2,last_mousex2);    overlap = false; return;}	
				
				
				$("body").append($(ui.helper).clone().addClass("dragclone2").removeClass("ui-draggable-dragging").css({
                'zIndex': 2,
				'width': $(".dragbox").find("img").width()*scaleRatio,
            }));
				
			}
			
			setTimeout(function(){ adddraggable2(); }, 20);
		
		
		
		
		
		
		
		
        
        }
       
}); 


}, 100);




function adddraggable2() {
        $(".dragclone2").draggable({
            cursor: 'pointer',
			 revert:function(isValidDrop)
           {
			console.log("/////////////////",last_mousex2,last_mousey2)	
		for(var i in elementRefArr){    
		//var  rect = document.getElementsByClassName("ui-draggable-dragging"); 
		var  rect2 = document.getElementsByClassName(elementRefArr[i]); 
		isCollapsed( last_mousex2,last_mousey2,rect2,elementRefArr[i] )
		} 
           },
		   start: function(){
			    var cX =  event.clientX
				var cY =  event.clientY
			   elementstartx = parseInt(cX-canvasx);
				 elementstarty = parseInt(cY-canvasy);
			   
		   },
          
            drag: function() {
				$(this).addClass("cdrag");
				currenteleclone =  $(".ui-draggable-dragging");
				isValidDrop = false;	
				var cX =  event.clientX
				var cY =  event.clientY
			 last_mousex2 = mousex = parseInt(cX-canvasx);
			 last_mousey2 = mousey = parseInt(cY-canvasy); 
			
            },
            stop: function(event, ui) {  
				if(isValidDrop){ $(this).remove(); return;	}
				var ele = $(this);
				 checkoverlap($(this).position().left,$(this).position().top,$(".dragbox").find("img").width()*scaleRatio,$(".dragbox").find("img").height()*scaleRatio); 			
				if(overlap) {   overlap = false;  $(this).remove();    return;} 
				
				
				$(this).removeClass("cdrag");
				
			
                var getlocation = ui.position;
                elementLocationContainer.push(getlocation);
                console.log(elementLocationContainer)
				
            }
        })
		
		
		
		
		
		$(".visible").draggable({
			
			containment: $(".actContainer"),
			helper:function() {	
			isValidDrop = false;
			
            return $(this).clone().appendTo('body').css({
                'zIndex': 50,
				'width': $(".dragbox").find("img").width()*scaleRatio,
				}); 
			},
            cursor: 'pointer',
			 revert:function(isValidDrop)
           {
			
			console.log("/////////////////",last_mousex2,last_mousey2)	
	 for(var i in elementRefArr){    
		//var  rect = document.getElementsByClassName("ui-draggable-dragging"); 
		var  rect2 = document.getElementsByClassName(elementRefArr[i]); 
		isCollapsed( last_mousex2,last_mousey2,rect2,elementRefArr[i] )
		}  
           },
          
            drag: function() {
				 currenteleclone =  $(".ui-draggable-dragging");
				isValidDrop = false;	
				$(this).removeClass("visible");
				var cX =  event.clientX
				var cY =  event.clientY
			 last_mousex2 = mousex = parseInt(cX-canvasx);
			 last_mousey2 = mousey = parseInt(cY-canvasy); 
			
            },
            stop: function(event, ui) {  
			if(isValidDrop){ $(ui.helper).remove(); return;	}
			checkoverlap($(ui.helper).position().left,$(ui.helper).position().top,$(".dragbox").find("img").width()*scaleRatio,$(".dragbox").find("img").height()*scaleRatio); 			
				if(overlap) {overlap = false; return;}	
			
			
			leftPosition  = ui.offset.left - $(this).offset().left;
			topPosition   = ui.offset.top - $(this).offset().top;
			console.log(leftPosition);
			console.log(topPosition);
			$("body").append($(ui.helper).clone().addClass("dragclone2").removeClass("ui-draggable-dragging").removeClass("visible").css({
                'zIndex': 2,
				'width': $(".dragbox").find("img").width()*scaleRatio,
            }))			
			setTimeout(function(){ adddraggable2(); }, 20);
				
            }
        })
		
		
		
		
		
		
    }






 function isCollapsed(dragMex,dragMey, rect ,rect3){
	//if(isValidDrop) return;
   var object_2 = rect[0].getBoundingClientRect();
  
  if (dragMex < object_2.left + object_2.width  && dragMex   > object_2.left &&
		dragMey < object_2.top + object_2.height && dragMey > object_2.top)  {  
		 temprect3 = "."+rect3
		console.log("rect3",rect3,$(temprect3).parent().css("visibility"))
		if($(temprect3).parent().css("visibility") == "visible") ;
		else{ return}
		colidearr.push(rect3);
		console.log(colidearr);
		if(isValidDrop) return;
    var currentElementIdentifier = checkCurrentDragElement(currenteleclone)    
     makedraggedElementvisibleOnGrid(currentElementIdentifier , rect3);
	 isValidDrop = true;
	 adddraggable2();
	

    }
    else{
        
      console.log("doesn't colide")
    }
  }


  function checkCurrentDragElement(currenteleclone){
	  console.log("currenteleclone",currenteleclone)
var currentdrag ="";
if($(currenteleclone).attr('id') == "red" ) currentdrag = "red" ;
if($(currenteleclone).attr('id') == "yellow" )currentdrag = "yellow" ;
if($(currenteleclone).attr('id') == "counter_red5" )currentdrag = "counter_red5" ;
if($(currenteleclone).attr('id') == "counter_yellow5" )currentdrag = "counter_yellow5" ;
if($(currenteleclone).attr('id') == "counter_red10" )currentdrag = "counter_red10" ;
if($(currenteleclone).attr('id') == "counter_yellow10" )currentdrag = "counter_yellow10" ;
console.log("currentdrag",currentdrag)
return currentdrag;
  }





function makedraggedElementvisibleOnGrid(eleRef,boxref){
	
console.log("yupppppp2",eleRef,boxref)
boxref = "."+boxref
if(eleRef == "red"){
	if($(boxref).find("img").hasClass("visible")){findblanksinGrid(eleRef,boxref);   return;}
    $(boxref).find("img").removeClass("visible");
    $(boxref).find(".red").addClass("visible");

}

if(eleRef == "yellow"){
	if($(boxref).find("img").hasClass("visible")){findblanksinGrid(eleRef,boxref);   return;}
	
    $(boxref).find("img").removeClass("visible");
    $(boxref).find(".yellow").addClass("visible");
    
    }

 if(eleRef == "counter_red5"){
    
    fillcounter_red5(eleRef,boxref);
        
    }

    if(eleRef == "counter_yellow5"){
    
        fillcounter_yellow(eleRef,boxref);
    }

    if(eleRef == "counter_red10"){
    
        fillcounter_red10(eleRef,boxref);
    }

    if(eleRef == "counter_yellow10"){

        fillcounter_yellow10(eleRef,boxref);
        
    }




} 



function fillcounter_red5(eleRef,boxref){


    var splitboxref = boxref.split("_");
    var splitboxclass = splitboxref[0]+"_"+splitboxref[1]+"_";

console.log(eleRef,boxref,splitboxref,splitboxclass)

if( !$(".dargele1").attr("aria-disabled")){

if(splitboxref[2] < 6){
    for(var i= 1; i < 6; i++ ){
        var currentclass=  splitboxclass + i;
       if($(currentclass).find("img").hasClass("visible")){ findblanksinGrid(eleRef,boxref);   return;}	    
    }


    for(var i= 1; i < 6; i++ ){
        var currentclass=  splitboxclass + i     

        $(currentclass).find("img").removeClass("visible");
        $(currentclass).find(".red").addClass("visible");
    
    }

}
else{
for(var i= 6; i < 11; i++ ){
	var currentclass=  splitboxclass + i;
	if($(currentclass).find("img").hasClass("visible")){  findblanksinGrid(eleRef,boxref);    return;}	
	
}
    for(var i= 6; i < 11; i++ ){
        var currentclass=  splitboxclass + i
        $(currentclass).find("img").removeClass("visible");
        $(currentclass).find(".red").addClass("visible");
    
    }
}
}
else{	
	if((splitboxref[2] % 2) == 0){	
	
for(var i= 1; i < 11; i++ ){
	var currentclass =  splitboxclass + i ;
if(i%2 == 0){if($(currentclass).find("img").hasClass("visible")){  findblanksinGrid(eleRef,boxref);    return;}	}	
}	
	for(var i= 1; i < 11; i++ ){
	if(i%2 == 0){var currentclass =  splitboxclass + i ; $(currentclass).find("img").removeClass("visible"); $(currentclass).find(".red").addClass("visible");}    
    }}
	else{
		
		for(var i= 1; i < 11; i++ ){
			var currentclass =  splitboxclass + i ;
	if(i%2 != 0){	if($(currentclass).find("img").hasClass("visible")){  findblanksinGrid(eleRef,boxref);    return;}		}
		}
		for(var i= 1; i < 11; i++ ){
	if(i%2 != 0){var currentclass =  splitboxclass + i ;$(currentclass).find("img").removeClass("visible"); $(currentclass).find(".red").addClass("visible");}    
    }}
	
}



}




function fillcounter_yellow(eleRef,boxref){


    var splitboxref = boxref.split("_");
    var splitboxclass = splitboxref[0]+"_"+splitboxref[1]+"_";

console.log(eleRef,boxref,splitboxref,splitboxclass)

if( !$(".dargele1").attr("aria-disabled")){
if(splitboxref[2] < 6){
	
	for(var i= 1; i < 6; i++ ){
		var currentclass=  splitboxclass + i
	if($(currentclass).find("img").hasClass("visible")){  findblanksinGrid(eleRef,boxref);    return;}		
	}
    for(var i= 1; i < 6; i++ ){
        var currentclass=  splitboxclass + i
        $(currentclass).find("img").removeClass("visible");
        $(currentclass).find(".yellow").addClass("visible");
    
    }

}
else{
for(var i= 6; i < 11; i++ ){
	var currentclass=  splitboxclass + i
if($(currentclass).find("img").hasClass("visible")){  findblanksinGrid(eleRef,boxref);    return;}		
}
    for(var i= 6; i < 11; i++ ){
        var currentclass=  splitboxclass + i
        $(currentclass).find("img").removeClass("visible");
        $(currentclass).find(".yellow").addClass("visible");
    
    }
}
}

else{	
	if((splitboxref[2] % 2) == 0){	
	
for(var i= 1; i < 11; i++ ){
	var currentclass =  splitboxclass + i ;
if(i%2 == 0){if($(currentclass).find("img").hasClass("visible")){ findblanksinGrid(eleRef,boxref);    return;}	}	
}	
	for(var i= 1; i < 11; i++ ){
	if(i%2 == 0){var currentclass =  splitboxclass + i ; $(currentclass).find("img").removeClass("visible"); $(currentclass).find(".yellow").addClass("visible");}    
    }}
	else{
		
		for(var i= 1; i < 11; i++ ){
			var currentclass =  splitboxclass + i ;
	if(i%2 != 0){	if($(currentclass).find("img").hasClass("visible")){  findblanksinGrid(eleRef,boxref);    return;}		}
		}
		for(var i= 1; i < 11; i++ ){
	if(i%2 != 0){var currentclass =  splitboxclass + i ;$(currentclass).find("img").removeClass("visible"); $(currentclass).find(".yellow").addClass("visible");}    
    }}
	
}





}


function fillcounter_yellow10(eleRef,boxref){


    var splitboxref = boxref.split("_");
    var splitboxclass = splitboxref[0]+"_"+splitboxref[1]+"_";

console.log(eleRef,boxref,splitboxref,splitboxclass)
for(var i= 1; i < 11; i++ ){
	 var currentclass=  splitboxclass + i
if($(currentclass).find("img").hasClass("visible")){  findblanksinGrid(eleRef,boxref);    return;}		
	
}
    for(var i= 1; i < 11; i++ ){
        var currentclass=  splitboxclass + i
        $(currentclass).find("img").removeClass("visible");
        $(currentclass).find(".yellow").addClass("visible");
    
    }

}


function fillcounter_red10(eleRef,boxref){


    var splitboxref = boxref.split("_");
    var splitboxclass = splitboxref[0]+"_"+splitboxref[1]+"_";

console.log(eleRef,boxref,splitboxref,splitboxclass)
for(var i= 1; i < 11; i++ ){
	var currentclass=  splitboxclass + i
if($(currentclass).find("img").hasClass("visible")){  findblanksinGrid(eleRef,boxref);    return;}		
	
}
    for(var i= 1; i < 11; i++ ){
        var currentclass=  splitboxclass + i
        $(currentclass).find("img").removeClass("visible");
        $(currentclass).find(".red").addClass("visible"); 
    }
}

 





function addEvents() {		
        $(".erasetool").unbind("click").bind("click", function() { removecustomcruser(); disabledrag();  removeopacity(".erasetool");    setTimeout(function(){ $("body").addClass("custom1") ; use_tool('erase'); $("canvas").css("pointer-events","inherit"); }, 200);   })	;
		 $(".drawtool").unbind("click").bind("click", function() { removecustomcruser(); removeopacity(".drawtool"); disabledrag();     setTimeout(function(){ $("body").addClass("custom2") ;   use_tool('draw');  $("canvas").css("pointer-events","inherit"); }, 200);   })	;
	
	
	 }


function removecustomcruser(){
	
	
	if($("body").hasClass("custom1")){ setTimeout(function(){ $("body").removeClass("custom1");$("canvas").css("pointer-events","none"); }, 100);  }
	if($("body").hasClass("custom2")){ setTimeout(function(){ $("body").removeClass("custom2");$("canvas").css("pointer-events","none"); }, 100);  }
	enableledrags();
setopacity(".drawtool");
setopacity(".erasetool");
}


  //function cc
// code for drawing
  //Canvas



/* $('body').on('mousedown touchstart',function(e){
    $('div#extras').fadeTo('fast', 1);
});
$('body').on('mouseup touchend',function(e){
    $('div#extras').delay(2000).fadeTo(1500, 0);
});
 */











//Mousedown
$(canvas).on('mousedown touchstart', function(e) {
	
	var cX =  e.clientX
	var cY =  e.clientY
    last_mousex = mousex = parseInt(cX-canvasx);
	last_mousey = mousey = parseInt(cY-canvasy);
	
	//console.log(e.pageX," eeeeee   ",e.originalEvent.touches[0].clientX)
    mousedown = true;
});

$(canvas).on('touchstart touchdown', function(e) {
	
	var cX = e.originalEvent.touches[0].clientX || e.clientX
	var cY = e.originalEvent.touches[0].clientY || e.clientY
    last_mousex = mousex = parseInt(cX-canvasx);
	last_mousey = mousey = parseInt(cY-canvasy);
	
	//(window.innerWidth -  (($(".sidebar").width()*scaleRatio + (80*scaleRatio));
	
	
	//console.log(e.pageX," eeeeee   ",e.originalEvent.touches[0].clientX)
    mousedown = true;
	
});

//Mouseup


$(canvas).on('mouseup touchend', function(e) {
    mousedown = false;
	elementremove = false;
	if(e.type == 'touchend'){
        $(this).off('mouseup');
    }
	
 $(".drawtool").each(function(){
 
	isCollapsed5( last_mousex,last_mousey,$(this),$(this) )
  });

if(elementremove)return;  

  $(".erasetool").each(function(){
 
	isCollapsed5( last_mousex,last_mousey,$(this),$(this) )
  });
 if(elementremove)return; 
 $(".resettool").each(function(){
 
	isCollapsed5( last_mousex,last_mousey,$(this),$(this) )
  });  	
	
	
if($("body").hasClass("custom2"))	return;
	//console.log(last_mousex,last_mousey)
	$(".dropgrid").each(function(){
  
	isCollapsed4( last_mousex,last_mousey,$(this),$(this) )
  });
  $(".dropgrid2").each(function(){
  
	isCollapsed4( last_mousex,last_mousey,$(this),$(this) )
  });
	
	for(var i in elementRefArr){    
		var  rect = document.getElementsByClassName("ui-draggable-dragging"); 
		var  rect2 = document.getElementsByClassName(elementRefArr[i]); 
		isCollapsed2( last_mousex,last_mousey,rect2,elementRefArr[i] )
		} 
	
	 $(".dragclone2").each(function(){
  
	isCollapsed3( last_mousex,last_mousey,$(this),$(this) )
  });
  console.log("elementremove",elementremove)
  if(elementremove)return;
   $(".darg").each(function(){
 
	isCollapsed5( last_mousex,last_mousey,$(this),$(this) )
  });
 if(elementremove)return; 
  
  

	
	
	
});

//Mousemove




$(canvas).on('mousemove', function(e) {
	
	
		var cX =  e.clientX
	var cY =  e.clientY
    mousex = parseInt(cX-canvasx);
    mousey = parseInt(cY-canvasy);
	if(cX > (window.innerWidth -  (($(".sidebar").width()*scaleRatio + (80*scaleRatio)))))   mousedown = false;
    if(mousedown) {
        ctx.beginPath();
        if(tooltype=='draw') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
        } else {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        }
        ctx.moveTo(last_mousex,last_mousey);
        ctx.lineTo(mousex,mousey);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
		
	//	console.log(last_mousex,last_mousey," TOUCH MOVE ",mousex,mousey);
    }
    last_mousex = mousex;
    last_mousey = mousey;
    //Output
    $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);
});


$(canvas).on('touchmove', function(e) {
	
	
		var cX = e.originalEvent.touches[0].clientX
	var cY = e.originalEvent.touches[0].clientY
	if(cX > (window.innerWidth -  (($(".sidebar").width()*scaleRatio + (80*scaleRatio)))))   mousedown = false;
	console.log("TM",mousedown)
    mousex = parseInt(cX-canvasx);
    mousey = parseInt(cY-canvasy);
    if(mousedown) {
        ctx.beginPath();
        if(tooltype=='draw') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
        } else {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        }
        ctx.moveTo(last_mousex,last_mousey);
        ctx.lineTo(mousex,mousey);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
		
	//	console.log(last_mousex,last_mousey," TOUCH MOVE ",mousex,mousey);
    }
    last_mousex = mousex;
    last_mousey = mousey;
    //Output
    $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);
});

//Use draw|erase
  function use_tool(tool) {
	console.log()
    tooltype = tool; //update
}




function isCollapsed2(dragMex,dragMey, rect, strikelement){
  //var object_1 = dragMe.getBoundingClientRect();
  var object_2 = rect[0].getBoundingClientRect();
  
  if (dragMex < object_2.left + object_2.width  && dragMex   > object_2.left &&
		dragMey < object_2.top + object_2.height && dragMey > object_2.top) {
			temprect3 = "."+strikelement;
		if($(temprect3).parent().css("visibility") == "visible") ;
		else{ return}	
    console.log("strikelement",strikelement)
	$(temprect3).find("img").removeClass("visible");
  }
  else{
    //rect.classList.remove("collide");
  }
}
function isCollapsed3(dragMex,dragMey, rect, strikelement){
  //var object_1 = dragMe.getBoundingClientRect();
  var object_2 = rect[0].getBoundingClientRect();
  
  if (dragMex < object_2.left + object_2.width  && dragMex   > object_2.left &&
		dragMey < object_2.top + object_2.height && dragMey > object_2.top) {
			
	rect.remove();
	elementremove =true;
  }
  else{
    //rect.classList.remove("collide");
  }
}


function isCollapsed4(dragMex,dragMey, rect, strikelement){
  //var object_1 = dragMe.getBoundingClientRect();
  var object_2 = rect[0].getBoundingClientRect();
  
  if (dragMex < object_2.left + object_2.width  && dragMex   > object_2.left &&
		dragMey < object_2.top + object_2.height && dragMey > object_2.top) {
			console.log(">>>>>>>",rect.find("img").hasClass("visible"))
			
	if(rect.css("visibility") == "visible")	{
		if(rect.find("img").hasClass("visible"));
		else rect.css("visibility","hidden") ;
		
	}	
	//rect.remove();
  }
  else{
    //rect.classList.remove("collide");
  }
}

function isCollapsed5(dragMex,dragMey, rect, strikelement){
  //var object_1 = dragMe.getBoundingClientRect();
  var object_2 = rect[0].getBoundingClientRect();
  
  if (dragMex < object_2.left + object_2.width  && dragMex   > object_2.left &&
		dragMey < object_2.top + object_2.height && dragMey > object_2.top) {
			console.log(">>>>>>>555555555555", rect,strikelement)
			//removecustomcruser();
			elementremove = true;
			if(rect.hasClass("drawtool")){
				
			if($("body").hasClass("custom2")){ removecustomcruser(); }
			else{ removecustomcruser(); setTimeout(function(){ disabledrag();  removeopacity(".drawtool"); $("body").addClass("custom2"); use_tool('draw');  $("canvas").css("pointer-events","inherit");}, 200) }			
				
			}
			else if(rect.hasClass("erasetool")){
				
			if($("body").hasClass("custom1"))removecustomcruser();
			else{removecustomcruser(); setTimeout(function(){ disabledrag(); removeopacity(".erasetool");    $("body").addClass("custom1") ; use_tool('erase'); $("canvas").css("pointer-events","inherit"); }, 200) }			
				
			}
			
		else if(rect.hasClass("resettool")){
				
			location.reload();	
			}
			else{
				
			removecustomcruser();	
			}
			
			
			
			
			
	/* if(rect.css("visibility") == "visible")	{
		if(rect.find("img").hasClass("visible"));
		else rect.css("visibility","hidden") ;
		
	}	 */
	//rect.remove();
  }
  else{
    //rect.classList.remove("collide");
  }
}




$('.resettool').click(function() {
    location.reload();
});

 $("#info").unbind("click").bind("click", function() {removecustomcruser();    $("#infopopup").show(); $("#info").css({"opacity": 0.4})                    })	;
 $("#infopopup").find(".clickable").unbind("click").bind("click", function() {$("#infopopup").hide();   $("#info").css({"opacity": 1})  })	;
 
 function griddisable(val){
	
	if(val == "dargele1"){	
	$(".dargele2").draggable({ disabled: true });
	$(".dargele2").css({"-webkit-user-drag": "none","opacity":0.5});
	$(".dargele2").find("img").css({"-webkit-user-drag": "none"});
	}
	else{
	$(".dargele1").draggable({ disabled: true });
	$(".dargele1").css({"-webkit-user-drag": "none"});
	$(".dargele1").find("img").css({"-webkit-user-drag": "none" ,"opacity": 0.5});
		
	}
	
	 
	 
 }
 
function  disabledrag(){
	var disarr =[".dargele1",".dargele2",".dargele3",".dargele4",".dargele5",".dargele6",".dargele7",".dargele8"];
	for(var i in  disarr){
		
	$(disarr[i]).css({"opacity":0.5})
		
	}
	return;
	$(".dargele2").draggable({ disabled: true });
	$(".dargele2").css({"-webkit-user-drag": "none","opacity":0.5});
	$(".dargele2").find("img").css({"-webkit-user-drag": "none"});
	
	
	$(".dargele1").draggable({ disabled: true });
	$(".dargele1").css({"-webkit-user-drag": "none"});
	$(".dargele1").find("img").css({"-webkit-user-drag": "none" ,"opacity": 0.5});
	
	
	$(".dargele3").draggable({ disabled: true });
	$(".dargele3").css({"-webkit-user-drag": "none","opacity":0.5});
	$(".dargele3").find("img").css({"-webkit-user-drag": "none"});
	
	
	$(".dargele4").draggable({ disabled: true });
	$(".dargele4").css({"-webkit-user-drag": "none"});
	$(".dargele4").find("img").css({"-webkit-user-drag": "none" ,"opacity": 0.5});
	
	
	//$(".dargele5").draggable({ disabled: true });
	$(".dargele5").css({"opacity":0.5});
	//$(".dargele5").find("img").css({"-webkit-user-drag": "none"});
	
	
	$(".dargele6").draggable({ disabled: true });
	$(".dargele6").css({"-webkit-user-drag": "none"});
	$(".dargele6").find("img").css({"-webkit-user-drag": "none" ,"opacity": 0.5});
	
	
	
	
	$(".dargele7").draggable({ disabled: true });
	$(".dargele7").css({"-webkit-user-drag": "none","opacity":0.5});
	$(".dargele7").find("img").css({"-webkit-user-drag": "none"});
	
	
	$(".dargele8").draggable({ disabled: true });
	$(".dargele8").css({"-webkit-user-drag": "none"});
	$(".dargele8").find("img").css({"-webkit-user-drag": "none" ,"opacity": 0.5});	
	
 }
 
function enableledrags(){
	var disarr =[".dargele1",".dargele2",".dargele3",".dargele4",".dargele5",".dargele6",".dargele7",".dargele8"];
	for(var i in  disarr){
		
	$(disarr[i]).css({"opacity":1})
	
	
		
	}
	 
	
	
	$(".dropgrid").each(function(){  if($(this).css("visibility") == "visible")griddisable("dargele1");  });
	$(".dropgrid2").each(function(){  if($(this).css("visibility") == "visible")griddisable("dargele2");  })
		
	return;
	
	$(".dargele2").draggable({ disabled: false });
	$(".dargele2").css({"-webkit-user-drag": "none","opacity": 1});
	$(".dargele2").find("img").css({"-webkit-user-drag": ""});
	
	
	$(".dargele1").draggable({ disabled: false });
	$(".dargele1").css({"-webkit-user-drag": ""});
	$(".dargele1").find("img").css({"-webkit-user-drag": "" ,"opacity": 1});
	
	
	$(".dargele3").draggable({ disabled: false });
	$(".dargele3").css({"-webkit-user-drag": "","opacity": 1});
	$(".dargele3").find("img").css({"-webkit-user-drag": ""});
	
	
	$(".dargele4").draggable({ disabled: false });
	$(".dargele4").css({"-webkit-user-drag": ""});
	$(".dargele4").find("img").css({"-webkit-user-drag": "" ,"opacity": 1});
	
	
	//$(".dargele5").draggable({ disabled: false });
	$(".dargele5").css({"opacity": 1});
	//$(".dargele5").find("img").css({"-webkit-user-drag": ""});
	
	
	$(".dargele6").draggable({ disabled: false });
	$(".dargele6").css({"-webkit-user-drag": ""});
	$(".dargele6").find("img").css({"-webkit-user-drag": "" ,"opacity": 1});
	
	
	
	
	$(".dargele7").draggable({ disabled: false });
	$(".dargele7").css({"-webkit-user-drag": "","opacity":1});
	$(".dargele7").find("img").css({"-webkit-user-drag": ""});
	
	
	$(".dargele8").draggable({ disabled: false });
	$(".dargele8").css({"-webkit-user-drag": ""});
	$(".dargele8").find("img").css({"-webkit-user-drag": "" ,"opacity": 1});	
	
	/* if($(".dropgrid").css("visibility") == "visible")griddisable("dargele1");
	if($(".dropgrid2").css("visibility") == "visible")griddisable("dargele1"); */
	

setopacity(".drawtool");
setopacity(".erasetool");
	
 }
 
  function setopacity(val){
	$(val).find("img").css({"opacity": 0.5});  
	  
  }
  
   function removeopacity(val){
	$(val).find("img").css({"opacity": 1});  
	  
  }
setopacity(".drawtool");
setopacity(".erasetool");
document.addEventListener('contextmenu', function(e) {
 //e.preventDefault();
});

function checkoverlap(elementx,elementy,width,height){
	



$("body").find(".dragclone2").each(function(i) {
 // var object_1 = dragMe.getBoundingClientRect();
  if($(this).hasClass("cdrag"))return;
  var object_2 = $(this)[0].getBoundingClientRect();
  
  if (elementx < object_2.left + object_2.width  && elementx + width  > object_2.left &&
		elementy < object_2.top + object_2.height && elementy + height > object_2.top) {
    console.log("collide");
	
	overlap = true;
//	$(this)[0].remove();
  }
  else{
    console.log("not collide");
  }
})

$("body").find(".dropgrid").each(function(i) {
 // var object_1 = dragMe.getBoundingClientRect();
 
  var object_2 = $(this)[0].getBoundingClientRect();
  
  if (elementx < object_2.left + object_2.width  && elementx + width  > object_2.left &&
		elementy < object_2.top + object_2.height && elementy + height > object_2.top) {
    console.log("collide");
	
if($(this).css("visibility") == "visible" )	overlap = true;
//	$(this)[0].remove();
  }
  else{
    console.log("not collide");
  }
})


$("body").find(".dropgrid2").each(function(i) {
 // var object_1 = dragMe.getBoundingClientRect();

  var object_2 = $(this)[0].getBoundingClientRect();
  
  if (elementx < object_2.left + object_2.width  && elementx + width  > object_2.left &&
		elementy < object_2.top + object_2.height && elementy + height > object_2.top) {
    console.log("collide");
	
if($(this).css("visibility") == "visible" )	overlap = true;
//	$(this)[0].remove();
  }
  else{
    console.log("not collide");
  }
})


$("body").find(".sidebar").each(function(i) {
 // var object_1 = dragMe.getBoundingClientRect();
  var object_2 = $(this)[0].getBoundingClientRect();
  
  if (elementx < object_2.left + object_2.width  && elementx + width  > object_2.left &&
		elementy < object_2.top + object_2.height && elementy + height > object_2.top) {
    console.log("collide");
	
if($(this).css("visibility") == "visible" )	overlap = true;
//	$(this)[0].remove();
  }
  else{
    console.log("not collide");
  }
})




}

	
	
	
	
	
function findblanksinGrid(eleRef,boxref){
	if(find) return;
	find = true;
	//alert("findblanksinGrid");
	fillblankarea(eleRef,boxref);
	console.log("pppppppp>>>>>",eleRef,boxref);
	console.log(boxref.split);
	setTimeout(function(){ find = false; }, 500);
	

}	
	

	function getbox(boxref){
		var boxgrid = boxref.split("_")[0]+"_"+ boxref.split("_")[1]+"_";
		return  boxgrid;
	}
  
	
	
	function findCorrectblankspace(eleRef){
		return;
	//space in right	
	//if(($(".actContainer").width() - ($(".actarea").width()*scaleRatio)) > (($(".dragbox").find("img").width()*scaleRatio)*7) && gridcount1<5 )	{
		//fillblankarea(eleRef,"case1");
		//gridcount1++;
		//console.log( "space in right");
		//247 10
	}
		
	



	
	
	function fillblankarea(eleRef,boxref,context ){
		
	
	
		
		if(eleRef == "counter_red5"){
		isdone=false;
			
				for(var i = 0; i< gridArr3.length;  i++){
				var counter =0;	
				if($(gridArr3[i]).css("visibility") != "visible"){ continue;}	
				//alert(gridArr3[i]);
				
				if( !$(".dargele1").attr("aria-disabled")){
				for(var j=0; j<5; j++){
				console.log("gridArr3[i]).children().eq(j)", $(gridArr3[i]).children().eq(j))	
				if($(gridArr3[i]).children().eq(j).find("img").hasClass("visible")){ }
					else{counter++ ; }				
				}
				if(counter == 5) {makedraggedElementvisibleOnGrid(eleRef,$(gridArr3[i]).children().eq(0)[0].className.split(' ')[1]); isdone=true; break; }
				counter =0;
				for(var j=5; j<10; j++){
					
				if($(gridArr3[i]).children().eq(j).find("img").hasClass("visible")){ counter =0}
					else{counter++;  }				
				}
				if(counter == 5) {makedraggedElementvisibleOnGrid(eleRef,$(gridArr3[i]).children().eq(6)[0].className.split(' ')[1]); isdone=true; break; }
				}
				else{
					
					
					for(var j=0; j<10; j++){
				console.log("gridArr3[i]).children().eq(j)", $(gridArr3[i]).children().eq(j))	
				if(j%2 == 0){
				if($(gridArr3[i]).children().eq(j).find("img").hasClass("visible")  ){ }
					else{counter++ ;  }
					}					
				}
				if(counter == 5) { makedraggedElementvisibleOnGrid(eleRef,$(gridArr3[i]).children().eq(0)[0].className.split(' ')[1]);isdone=true; return; break; }
				
				
				counter =0;
				for(var j=0; j<10; j++){
				if(j%2 != 0){	
				if($(gridArr3[i]).children().eq(j).find("img").hasClass("visible")){ counter =0}
					else{counter++;  }	
				}					
				}
				if(counter == 5) {   makedraggedElementvisibleOnGrid(eleRef,$(gridArr3[i]).children().eq(1)[0].className.split(' ')[1]); isdone=true; return; break; }
					
					
					
				}
					
				}
				
			
			if(!isdone)twinanim($(".dargele5").find("img"),last_mousey2,last_mousex2);	
				
			}	
			 else if(eleRef == "counter_yellow5"){
				isdone = false;
				for(var i = 0; i< gridArr3.length;  i++){
				var counter =0;	
				if($(gridArr3[i]).css("visibility") != "visible"){ continue;}	
				//alert(gridArr3[i]);
				
				if( !$(".dargele1").attr("aria-disabled")){
				for(var j=0; j<5; j++){
				console.log("gridArr3[i]).children().eq(j)", $(gridArr3[i]).children().eq(j))	
				if($(gridArr3[i]).children().eq(j).find("img").hasClass("visible")){ }
					else{counter++ ; }				
				}
				if(counter == 5) {makedraggedElementvisibleOnGrid(eleRef,$(gridArr3[i]).children().eq(0)[0].className.split(' ')[1]); isdone=true; break; }
				counter =0;
				for(var j=5; j<10; j++){
					
				if($(gridArr3[i]).children().eq(j).find("img").hasClass("visible")){ counter =0}
					else{counter++;  }				
				}
				if(counter == 5) {makedraggedElementvisibleOnGrid(eleRef,$(gridArr3[i]).children().eq(6)[0].className.split(' ')[1]); isdone=true; break; }
				}
				else{
					
					
					for(var j=0; j<10; j++){
				console.log("gridArr3[i]).children().eq(j)", $(gridArr3[i]).children().eq(j))	
				if(j%2 == 0){
				if($(gridArr3[i]).children().eq(j).find("img").hasClass("visible")  ){ }
					else{counter++ ;  }
					}					
				}
				if(counter == 5) { makedraggedElementvisibleOnGrid(eleRef,$(gridArr3[i]).children().eq(0)[0].className.split(' ')[1]); isdone=true; return; break; }
				
				
				counter =0;
				for(var j=0; j<10; j++){
				if(j%2 != 0){	
				if($(gridArr3[i]).children().eq(j).find("img").hasClass("visible")){ counter =0}
					else{counter++;  }	
				}					
				}
				if(counter == 5) {   makedraggedElementvisibleOnGrid(eleRef,$(gridArr3[i]).children().eq(1)[0].className.split(' ')[1]); isdone=true; return; break; }
					
					
					
				}
					
				}
				if(!isdone)twinanim($(".dargele6").find("img"),last_mousey2,last_mousex2);;
				
			}	
			
			
			
			else if(eleRef == "counter_red10"){
				isdone =false;
				var done =false;				
				for(var i = 0; i< gridArr3.length;  i++){	
					var counter = 0;
					if($(gridArr3[i]).css("visibility") != "visible"){ continue;}
					
				$(gridArr3[i]).find(".dragbox").each(function(){
					if($(this).find("img").hasClass("visible")){ isemptybox = false;}
					else {
					counter++;	
					if(counter == 10){makedraggedElementvisibleOnGrid(eleRef,$(this)[0].className.split(' ')[1]) ;  done = true; isdone =true;	return false; 	}	
					};
						
				})	
			if(done)break;		
				}
			if(!isdone)twinanim($(".dargele7").find("img"),last_mousey2,last_mousex2);			
				
			}	
			else if(eleRef == "counter_yellow10"){
				isdone =false;
				var done =false;				
				for(var i = 0; i< gridArr3.length;  i++){	
					var counter = 0;
					if($(gridArr3[i]).css("visibility") != "visible"){ continue;}
					
				$(gridArr3[i]).find(".dragbox").each(function(){
					if($(this).find("img").hasClass("visible")){ isemptybox = false;}
					else {
					counter++;	
					if(counter == 10){makedraggedElementvisibleOnGrid(eleRef,$(this)[0].className.split(' ')[1]) ;  done = true; isdone =true;	return false; 	}	
					};
						
				})	
			if(done)break;		
				}
			if(!isdone)twinanim($(".dargele8").find("img"),last_mousey2,last_mousex2);				
				
			}	 
			else if(eleRef == "red"){
				isdone =false;
					var getcurrentbox = getbox(boxref);				
				for(var i= 1; i<11; i++){
					var box = getcurrentbox+i;
					console.log("box",box)
					if($(box).find("img").hasClass("visible")){ }
					else 
					{					
						makedraggedElementvisibleOnGrid(eleRef,box.slice(1));
						isdone =true;
						return; 
						}}
				
				var done =false;				
				for(var i = 0; i< gridArr3.length;  i++){	
		if($(gridArr3[i]).css("visibility") != "visible"){ continue;}				
				$(gridArr3[i]).find(".dragbox").each(function(){
					if($(this).find("img").hasClass("visible")){ }
					else 
					{				
						makedraggedElementvisibleOnGrid(eleRef,$(this)[0].className.split(' ')[1]);	
						isdone =true;						
						done = true;
						return false;											
					}	
				})	
				if(done)break;	
				}
			if(!isdone)twinanim($(".dargele3").find("img"),last_mousey2,last_mousex2);		
			}
			else if(eleRef == "yellow"){	
				isdone =false;			
				var getcurrentbox = getbox(boxref);				
				for(var i= 1; i<11; i++){
					var box = getcurrentbox+i;
					console.log("box",box)
					if($(box).find("img").hasClass("visible")){ }
					else 
					{					
						makedraggedElementvisibleOnGrid(eleRef,box.slice(1));
						isdone =true;
						return; 
						}}
				
				var done =false;				
				for(var i = 0; i< gridArr3.length;  i++){
				if($(gridArr3[i]).css("visibility") != "visible"){ continue;}	
				$(gridArr3[i]).find(".dragbox").each(function(){
					if($(this).find("img").hasClass("visible")){ console.log("pp>>5",$(this)) }
					else 
					{					
						makedraggedElementvisibleOnGrid(eleRef,$(this)[0].className.split(' ')[1]);		
						isdone =true;						
						done = true;
						return false;											
					}	
				})	
				if(done)break;	
				}
			if(!isdone)twinanim($(".dargele4").find("img"),last_mousey2,last_mousex2);	
				
			}
			
			setTimeout(function(){ adddraggable2(); }, 20);
		
		
		
	}
	
	function twinanim(ele, left ,top){
		//alert();
		console.log("pp11",ele,left,top);
		
		$("body").append(ele.clone().addClass("twin").removeClass("ui-draggable-dragging").css({
                'left': (top)+"px",
				'top': (left)+"px",
				'position':'absolute',
				'width': $(".dragbox").find("img").width()*scaleRatio,
            }));
		
		//elementstartx = parseInt(cX-canvasx);
				 
		$(".twin").animate({
    opacity: 1,
    left: elementstartx,
    top: elementstarty,
	zIndex:100
  }, 300, function() {
    // Animation complete.
  });
		
setTimeout(function(){$(".twin").remove() }, 310);		

	}
	function twinanim2(ele, left ,top){
		//alert();
		console.log("pp11",ele,left,top);
		
		$("body").append(ele.clone().addClass("twin").removeClass("ui-draggable-dragging").css({
                'left': (top)+"px",
				'top': (left)+"px",
				'position':'absolute',
				'width': $(".dragbox").find("img").width()*scaleRatio,
            }));
		
		//elementstartx = parseInt(cX-canvasx);
				 
		$(".twin").animate({
    opacity: 1,
    left: elementstartx,
    top: elementstarty,
	zIndex:100
  }, 300, function() {
    // Animation complete.
  });
		
//setTimeout(function(){$(".twin").remove() }, 310);		

	}
	
	
	
	
	


});