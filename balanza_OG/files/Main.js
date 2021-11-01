var game = new Phaser.Game(screen.width, screen.height, Phaser.CANVAS, 'phaser-container', { preload: preload, create: create });
 	var totalgridInACol=16;
var totalgridInARow=8;
var gridWd=82
var gridHt=89
var isFnd=false;
var isCloneDragging=false;
 var _objSV;
 var objGraphics;
 var tempSprite;
     var eraserBtn;
	 var selectedDragId;
	 var isSelectedTool="";
	 var eraserCursorGrp ;
	 var isGrpDragging=false;
	 var chkBoxArr= new Array();
	 var currentChkBoxId=1;
	 var showGridArr=new Array()
	 var  arrSelectedGridClone = new Array();
	 var currentRow,currentCol;
	 var isMoseStatus="";
	 var openGridId=1;
	 var nLeftWeight = 0;
	var nRightWeight = 0;
 
function preload() {

_objSV = this.game;
_objSV.cloneCounter=0;
this.game.stage.backgroundColor = "#022A45";	
	 $("#phaser-container").css({"height":window.innerHeight});	
	  $("#MainContainer").css({"height":window.innerHeight});	
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
	this.scale.pageAlignHorizontally = true;
	//this.scale.pageAlignVertically = true;
	this.scale.refresh();

//	document.fonts.load('21pt "MyriadPro-Regular"').then();   
    
      
    game.load.image('standbar', 'assets/images/stand.png'); 
	game.load.image('numberbar', 'assets/images/numberbar.png');
	
	
	//sagar//
	  
	game.load.image('erasercursor', 'assets/images/erasercursor.png');
	game.load.image('eraser', 'assets/images/eraser.png');
	game.load.image('toolbg', 'assets/images/toolbg.svg');
	
	
	game.load.image('tool1', 'assets/images/weight.png');    
    game.load.image('tool2', 'assets/images/equal.png');  
    game.load.image('tool3', 'assets/images/lessthan.png'); 
    game.load.image('tool4', 'assets/images/greaterthan.png'); 
	game.load.image('reset', 'assets/images/reset.png');
	game.load.image('weightHook', 'assets/images/weighthook.png');	
	
	game.load.image('tempWeight', 'assets/images/weight.png');
   

}



  

function create() {
	
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
	{
 $('html, body').css('position', 'fixed');
	}
	
	
	document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

		
		    document.addEventListener('touchmove', function(event) {
        event = event.originalEvent || event;
        if (event.scale !== 1) {
           event.preventDefault();
        }
    }, false);

		
  this.game.input.maxPointers = 1;
 addEvents();
 
 _objSV.sf=1;
    $("#loader").hide();	
_objSV.toolBoxArr = new Array(
{name:"tool2",xPos:160, yPos:60, type:"drag"},{name:"tool1",xPos:50, yPos:60, type:"drag"},
{name:"tool4",xPos:160, yPos:250, type:"drag"},{name:"tool3",xPos:50, yPos:250, type:"drag"},
{name:"eraser",xPos:60, yPos:481, type:"eraser"},{name:"reset",xPos:158.25, yPos:487, type:"reset"},


    
);        
	this.game.input.addMoveCallback(myMove, this); 
 
	_objSV.tempGrpBg=game.add.group();
	_objSV.toolRefGrp=game.add.group();
	_objSV.gridGrp1to1000=game.add.group();	 
	_objSV.gridGrp1000to1=game.add.group();
	
	
	_objSV.balanceGrp=game.add.group();
 	_objSV.gridBoxGrp1000to1=game.add.group();


	

	

    
    
	var chkBoxCounter=0;
		 
	_objSV.toolBg = _objSV.add.sprite(0,0, 'toolbg');	 
	 	 _objSV.toolRefGrp.addChild(_objSV.toolBg); 
		  
		 
 	 for(var i=0; i<_objSV.toolBoxArr.length; i++)
	 {
		 _objSV["toolBtns"+i] = _objSV.add.button(_objSV.toolBoxArr[i].xPos,_objSV.toolBoxArr[i].yPos, _objSV.toolBoxArr[i].name); 
		  _objSV["toolBtns"+i].inputEnabled = true; 
		_objSV["toolBtns"+i].input.useHandCursor=true; 
		 if(_objSV.toolBoxArr[i].type=="drag")
			{		
		
		_objSV["toolBtns"+i].input.enableDrag(); 
		
		_objSV["toolBtns"+i].originalPosition = _objSV["toolBtns"+i].position.clone();
			 _objSV["toolBtns"+i].events.onDragStart.add(onToolBtnsDragStart, this); 
	 _objSV["toolBtns"+i].events.onDragStop.add(onToolBtnsDragStop, this);	
			}
			  
			else if(_objSV.toolBoxArr[i].type=="reset" || _objSV.toolBoxArr[i].type=="eraser")
			{
				
				 
					
					if(_objSV.toolBoxArr[i].type=="reset" || _objSV.toolBoxArr[i].type=="eraser")
					{				
						_objSV["toolBtns"+i].alpha=0.5;				 
					}
					
					if(_objSV.toolBoxArr[i].type=="reset")
					{
						_objSV.resetBtn=_objSV["toolBtns"+i];	
						_objSV.resetBtn.alpha=1;
					//	_objSV.resetBtn.scale.setTo(1.2,1.2) 
						 
					}
					else
					{
					_objSV.eraserBtn=_objSV["toolBtns"+i];
					_objSV.eraserBtn.scale.setTo(0.9,0.9) 
					}
					_objSV["toolBtns"+i].events.onInputDown.add(toolBtnClkHandler, this);
			}
					
			
			else
			{
				 _objSV["toolBtns"+i].events.onInputDown.add(toolBtnClkHandler, this);
			}
			_objSV["toolBtns"+i].name=_objSV.toolBoxArr[i].name
		
		_objSV.toolRefGrp.addChild(_objSV["toolBtns"+i]);
		
	 } 
	 	
	
	
	
	
	 
	 _objSV.toolRefGrp.x=screen.width-Number(_objSV.toolRefGrp.width+10);
	 _objSV.toolRefGrp.y=38;	 


	 
	  var standbar = _objSV.add.sprite(0,-20, 'standbar');	 
	  _objSV.balanceGrp.addChild(standbar);
	  
	  standbar.anchor.x=0.5;
	  
	  
	   var tempNumBar = _objSV.add.sprite(0,0, 'numberbar');	 
	  _objSV.balanceGrp.addChild(tempNumBar);
	tempNumBar.anchor.x=0.5;
	tempNumBar.x=tempNumBar.width/2;
	tempNumBar.alpha=0;
	tempNumBar.anchor.setTo(0.5, 0.5);
	
	

	
	
	   _objSV.numberbar = _objSV.add.sprite(0,0, 'numberbar');	 
	  _objSV.balanceGrp.addChild(_objSV.numberbar);
	 
	 _objSV.numberbar.anchor.setTo(0.5, 0.5);		
	_objSV.numberbar.x=_objSV.numberbar.width/2
	standbar.x=_objSV.numberbar.width/2
	_objSV.balanceGrp.x	= game.world.centerX-((_objSV.balanceGrp.width/2));
		
		 
	
  standbar.bringToTop();
	
		
	 
	  
//tbese are temporary hook for hittest
var xx = 13;//_objSV.numberbar.x;	
var yy=0;
for(var i=1;i<=10;i++)
{
	xx=xx+52;	
	_objSV["bulletRight"+i]= _objSV.add.sprite(xx,yy, 'weightHook');
	 _objSV["bulletRight"+i].counter=0;
    _objSV.numberbar.addChild(_objSV["bulletRight"+i]);  
    _objSV["bulletRight"+i].anchor.setTo(0.5,0)
    _objSV["bulletRight"+i].alpha=0;
    _objSV["bulletRight"+i].scale.setTo(0.3, 0.3);  	 
 

}


//for left side....
var xx = -13;//_objSV.numberbar.x;	
var yy=0;
for(var i=1;i<=10;i++)
{
xx=xx-52;
	
_objSV["bulletLeft"+i]= _objSV.add.sprite(xx,yy, 'weightHook');	 

  _objSV.numberbar.addChild(_objSV["bulletLeft"+i]);
   _objSV["bulletLeft"+i].counter=0;
  _objSV["bulletLeft"+i].anchor.setTo(0.5,0)
   _objSV["bulletLeft"+i].alpha=0;
   _objSV["bulletLeft"+i].scale.setTo(0.3, 0.3);
   

}
 


var initAngle= 0
 	 _objSV.numberbar.angle=initAngle;
	 
	var yy=0;
	var xx = 0;
	var _yy=0;
	var tempNumX=0
	var tempNumY=0;	
	
 
  
  
  if(initAngle>=0)
  {
var rightPosArr=[
{x:0,y:0},// 0 angle
{x:0,y:0},//2 angle
{x:0,y:0},//4 angle
{x:0,y:0},//6 angle
{x:1,y:1},//8 angle
{x:1,y:1},//10 angle
{x:1,y:1},//12 angle
{x:1.5,y:-1},//14 angle
{x:2.5,y:1},//16 angle
{x:3,y:1},//18 angle
{x:3.2,y:1},//20 angle
] 
}
else
{
var rightPosArr=[
{x:0,y:0},// -0 angle
{x:0,y:0},//-2 angle
{x:0,y:-0.4},//-4 angle
{x:0.3,y:-0.8},//-6 angle
{x:0.5,y:-1},//-8 angle
{x:0.5,y:-1},//-10 angle
{x:1,y:-1},//-12 angle
{x:1,y:-1.8},//-14 angle
{x:1,y:-1.8},//-16 angle
{x:1,y:-2},//-18 angle
{x:1.6,y:-2},//-20 angle
]
}
var arrIndex = Math.abs(initAngle)/2 ;
 tempNumX = rightPosArr[arrIndex].x;
 tempNumY = rightPosArr[arrIndex].y
	_objSV.wtGrpHolder =  game.add.group();
	for(var j=1;j<=10; j++)
	{
	xx= _objSV.numberbar.x+_objSV["bulletRight"+j].x-(tempNumX*j);//+(_objSV.numberbar.x-_objSV["bulletRight"+j].x);//+ _objSV["bulletRight"+j].x;//xx+ 49.5;//(initAngle*2.47);//xx+52;
	 
	yy= _objSV["bulletRight"+j].y-(-1*initAngle*j)-(tempNumY*j);	//yy+(initAngle*0.91);//18.2;//240;
	//console.log(xx,"  --------DD-------  ",(_objSV["bulletRight"+j].x))
	_yy=0;
	_yy=_yy+yy;
		for(var i=1;i<=5;i++)
		{
			_objSV["toolRW_"+j+"_"+i] = _objSV.add.sprite(xx, _yy, 'weightHook');
			_objSV["toolRW_"+j+"_"+i].counter=0;
			_objSV.wtGrpHolder.addChild(_objSV["toolRW_"+j+"_"+i]);
			_objSV.balanceGrp.addChild(_objSV.wtGrpHolder);
			_objSV["toolRW_"+j+"_"+i].sendToBack();
			_objSV["toolRW_"+j+"_"+i].anchor.setTo(0.5, 0);		
			  _objSV["toolRW_"+j+"_"+i].visible=false;
 //_objSV["toolRW_"+j+"_"+i].alpha=0.3
			  
		_objSV["toolRW_"+j+"_"+i].name =  "toolRW_"+j+"_"+i;
		_objSV["toolRW_"+j+"_"+i].inputEnabled = true; 
		_objSV["toolRW_"+j+"_"+i].input.useHandCursor=true;
		_objSV["toolRW_"+j+"_"+i].events.onInputDown.add(onRightWtDownHandler, this);
		_objSV["toolRW_"+j+"_"+i].events.onInputUp.add(onRightWtUpHandler, this);
		
			    _yy= _yy+11;	 
			 
		}
	}
	

	
	if(initAngle<=0)
	{ 
 
var leftPosArr=[
{x:0,y:0},// angle
{x:0,y:0},//-2 angle
{x:0,y:0},//-4 angle
{x:0,y:0},//-6 angle
{x:0,y:0},//-8 angle
{x:0,y:0},//-10 angle
{x:-1.0,y:0.1},//-12 angle
{x:-1.5,y:1},//-14 angle
{x:-1.5,y:1},//-16 angle
{x:-2.5,y:1},//-18 angle
{x:-3,y:0.9},//-20 angle
] 
}
else
{
var leftPosArr=[
{x:0,y:0},// 0 angle
{x:0,y:-1},//2 angle
{x:0,y:-1},//4 angle
{x:0,y:-1},//6 angle
{x:0,y:-1},//8 angle
{x:-0.8,y:-1.8},//10 angle
{x:-1.2,y:-1.6},//12 angle
{x:-1.8,y:-1.5},//14 angle
{x:-1.8,y:-1.5},//16 angle
{x:-2.0,y:-1.5},//18 angle
{x:-2.8,y:-1.5},//20 angle
] 
}
var arrIndex = Math.abs(initAngle)/2 ;  

 tempNumX = leftPosArr[arrIndex].x;
 tempNumY = leftPosArr[arrIndex].y
 	var yy=0;
	var xx = 0;
	 
	 
	for(var j=10;j>=1; j--)
	{
	xx= _objSV.numberbar.x+_objSV["bulletLeft"+j].x-(tempNumX*j)
	yy= _objSV["bulletLeft"+j].y+(-1*initAngle*j)-(tempNumY*j);	//yy+(initAngle*0.91);//18.2;//240;
 
	_yy=0;
	_yy=_yy+yy;
	//console.log(xx,"DD",_objSV["bulletRight"+j].y)
		for(var i=1;i<=5;i++)
		{
			 _objSV["toolLW_"+j+"_"+i] = _objSV.add.button(xx,_yy, 'weightHook');
			 _objSV["toolLW_"+j+"_"+i].counter=0;
			 _objSV.wtGrpHolder.addChild(_objSV["toolLW_"+j+"_"+i]);
			 _objSV.balanceGrp.addChild(_objSV.wtGrpHolder);
			 _objSV["toolLW_"+j+"_"+i].anchor.setTo(0.5, 0);	
			_objSV["toolLW_"+j+"_"+i].sendToBack();	
		 	_objSV["toolLW_"+j+"_"+i].visible=false; 
			 _yy=_yy+11;	 
			 
			 
		_objSV["toolLW_"+j+"_"+i].inputEnabled = true; 
		_objSV["toolLW_"+j+"_"+i].input.useHandCursor=true;
		 
			
		_objSV["toolLW_"+j+"_"+i].originalPosition = _objSV["toolLW_"+j+"_"+i].position.clone();		 
		_objSV["toolLW_"+j+"_"+i].name =  "toolLW_"+j+"_"+i;
		 
		_objSV["toolLW_"+j+"_"+i].events.onInputDown.add(onLeftWtDownHandler, this);
		_objSV["toolLW_"+j+"_"+i].events.onInputUp.add(onLeftWtUpHandler, this);


			 
		}
	 }
	
	  
	  
	  _objSV["signHolder"] = _objSV.add.sprite(0,-20, 'tool1');	
	   _objSV.balanceGrp.addChild(_objSV["signHolder"]);
		_objSV["signHolder"].x=_objSV.numberbar.x
		_objSV["signHolder"].anchor.setTo(0.5,0);
	_objSV["signHolder"].alpha=0;  
	 for(var i=2;i<=4;i++)
		{
		
		_objSV["sign"+i] = _objSV.add.button(0,0, 'tool'+i);		
		_objSV["sign"+i].inputEnabled = true;
		_objSV["sign"+i].useHandCursor = true;
		_objSV["sign"+i].input.enableDrag();	
	
	_objSV.balanceGrp.addChild(_objSV["sign"+i]);
	_objSV["sign"+i].x=_objSV.numberbar.x;
	_objSV["sign"+i].anchor.setTo(0.5,0);
	 _objSV["sign"+i].visible=false;
	_objSV["sign"+i].originalPosition = _objSV["sign"+i].position.clone();	
	_objSV["sign"+i].events.onDragStart.add(onSignBtnsDragStart, this); 
	_objSV["sign"+i].events.onDragStop.add(onSignBtnsDragStop, this);
		
		}
	  


	 eraserCursorGrp =  game.add.group();
  	 eraserCursor = game.add.sprite(0,0,'erasercursor');
	 eraserCursor.scale.setTo(0.5, 0.5);
	 eraserCursorGrp.addChild(eraserCursor);
	 eraserCursorGrp.visible=false;
	 
	 

 
		
		
	 
  	_objSV.tempWeight = game.add.sprite(0,0,'tempWeight');
	_objSV.tempWeight.scale.setTo(0.5, 0);
	_objSV.tempWeight.visible=false;
	 
	  
	   resizeApp();
    $( window ).resize(function() {
		resizeApp();	  
    })   
	 
	 
	 
function onLeftWtDownHandler(button)
	{
		
		var wtNum = button.name.split("_")[1];
		var totalCounter = _objSV["bulletLeft"+wtNum].counter;			
		_objSV.isMoseStatus="down"
		if(isSelectedTool!="eraser")
		{			
		_objSV.tempWeight.visible=true;
		_objSV.tempWeight.x = (_objSV.pointerX-10*_objSV.sf);
		_objSV.tempWeight.y = (_objSV.pointerY-10*_objSV.sf);
			_objSV.tempWeight.visible=true;	
		}
		_objSV["toolLW_"+wtNum+"_"+totalCounter].visible=false;
		_objSV["toolLW_"+wtNum+"_"+1].counter=totalCounter-1;
		_objSV["bulletLeft"+wtNum].counter=totalCounter-1;		
		
		
		nLeftWeight = nLeftWeight - wtNum;
			checkBalance();
	}
	


function onLeftWtUpHandler(button)
	{
		_objSV.isMoseStatus="up"
		var currentCounter=0;
			for(var i=1;i<=10; i++)
			{
			
				if(checkOverlap(_objSV.tempWeight,_objSV["bulletRight"+i]) )
				{
				if(isSelectedTool!="eraser"  && _objSV["bulletRight"+i].counter<5)
				{
				_objSV["toolRW_"+i+"_"+1].counter=_objSV["toolRW_"+i+"_"+1].counter+1;	
				currentCounter = _objSV["toolRW_"+i+"_"+1].counter;			
				_objSV["toolRW_"+i+"_"+currentCounter].visible=true;
				_objSV["bulletRight"+i].counter=currentCounter;
				nRightWeight = nRightWeight + i;
				break;	
				}
				else
				{
				_objSV.tempWeight.visible=false;
				break;
				}	
				}
			  else if(checkOverlap(_objSV.tempWeight,_objSV["bulletLeft"+i]))
				{
					 if(isSelectedTool!="eraser"  && _objSV["bulletLeft"+i].counter<5)
					 {
						 _objSV["toolLW_"+i+"_"+1].counter=_objSV["toolLW_"+i+"_"+1].counter+1;	
							currentCounter = _objSV["toolLW_"+i+"_"+1].counter;			
						_objSV["toolLW_"+i+"_"+currentCounter].visible=true;
						_objSV["bulletLeft"+i].counter=currentCounter;
						nLeftWeight = nLeftWeight + i;
						break;		
				 	}
				 	else
				 	{
				 		_objSV.tempWeight.visible=false;
					 }
				
				}
				 
			}
		_objSV.tempWeight.visible=false;	
			checkBalance();
	}		
	 
 
 
 
 	 
	 
function onRightWtDownHandler(button)
	{
		
		var wtNum = button.name.split("_")[1];
	 
		var totalCounter = _objSV["bulletRight"+wtNum].counter;			
		_objSV.isMoseStatus="down"
		if(isSelectedTool!="eraser")
		{			
		_objSV.tempWeight.visible=true;
		_objSV.tempWeight.x = (_objSV.pointerX-10*_objSV.sf);
		_objSV.tempWeight.y = (_objSV.pointerY-10*_objSV.sf);
		_objSV.tempWeight.visible=true;	
		}
		_objSV["toolRW_"+wtNum+"_"+totalCounter].visible=false;
		_objSV["toolRW_"+wtNum+"_"+1].counter=totalCounter-1;
		_objSV["bulletRight"+wtNum].counter=totalCounter-1;		
		

		nRightWeight = nRightWeight - wtNum;
		
		checkBalance();
	}
	


function onRightWtUpHandler(button)
	{
		_objSV.isMoseStatus="up"
		var currentCounter=0;
			for(var i=1;i<=10; i++)
			{			
				if(checkOverlap(_objSV.tempWeight,_objSV["bulletRight"+i]))
				{
					if(isSelectedTool!="eraser"  && _objSV["bulletRight"+i].counter<5)
					{
				_objSV["toolRW_"+i+"_"+1].counter=_objSV["toolRW_"+i+"_"+1].counter+1;	
				currentCounter = _objSV["toolRW_"+i+"_"+1].counter;			
				_objSV["toolRW_"+i+"_"+currentCounter].visible=true;
				_objSV["bulletRight"+i].counter=currentCounter;
				console.log("current Counter...  ",currentCounter)
				nRightWeight = nRightWeight + i;
					}
					else
					{
					_objSV.tempWeight.visible=false;
					}
				
				break;		
				}
			  else if(checkOverlap(_objSV.tempWeight,_objSV["bulletLeft"+i]) )
				{
				 if(isSelectedTool!="eraser" && _objSV["bulletLeft"+i].counter<5)
					{
				_objSV["toolLW_"+i+"_"+1].counter=_objSV["toolLW_"+i+"_"+1].counter+1;	
				currentCounter = _objSV["toolLW_"+i+"_"+1].counter;			
				_objSV["toolLW_"+i+"_"+currentCounter].visible=true;
				_objSV["bulletLeft"+i].counter=currentCounter;
				nLeftWeight = nLeftWeight + i;
					}
					else
					{
					_objSV.tempWeight.visible=false;
					}
				 
				break;		
				} 
			}
		_objSV.tempWeight.visible=false;	
		
			checkBalance();
	}

 
function myMove(pointer)
{
				
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
	{
	}
	

  pointerX=pointer.x;
  pointerY=pointer.y;
 
  _objSV.pointerX=pointer.x;
  _objSV.pointerY=pointer.y;
  
if(_objSV.tempWeight && _objSV.isMoseStatus=="down")
{
	_objSV.tempWeight.x = (_objSV.pointerX-10*_objSV.sf);
	_objSV.tempWeight.y = (_objSV.pointerY-10*_objSV.sf);
	
}
 
  
  if( _objSV.isShape!="moseUp" && 	_objSV.currentShape)
{
	 _objSV.isShape="moseMove"
	var diffX = Math.abs(_objSV.currentShape.initX-_objSV.pointerX)
	var diffY = Math.abs(_objSV.currentShape.initY-_objSV.pointerY);
	console.log(diffX," ",diffY)
	if(diffX>5 || diffY>5)
	{
   _objSV.currentShape.parent.x=_objSV.pointerMVX/_objSV.sf;
	_objSV.currentShape.parent.y=_objSV.pointerMVY/_objSV.sf;	
	 
	}		
}
 
 					  
 if(isSelectedTool=="eraser")
 {
	 
 
	 	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
	 	{ 	 
	 		eraserCursorGrp.visible=false;
		}
		else
		{
			game.world.bringToTop(eraserCursorGrp)
	 		eraserCursorGrp.visible=true;
		}
		eraserCursor.x=pointerX;
		eraserCursor.y= pointerY-20;
		 $("#phaser-container").addClass("hideCursor");
 }
 else
 {
	  
  eraserCursorGrp.visible=false;
   $("#phaser-container").removeClass("hideCursor");
 }
 
 
 	
}


	
}
 


function onSignBtnsDragStart(button)
  {
	  

 
	game.world.bringToTop(button)
	addEvents(); 
  }
function onSignBtnsDragStop(button)
{
	if(checkOverlap(button, _objSV["signHolder"]))
	{
	button.visible=true;
	}
	else
	{
	button.visible=false;	
	}
	button.position.copyFrom(button.originalPosition);
	 if(isSelectedTool=="eraser")
 {
	 button.visible=false;
	 
	 return;
  
 }
}




  function onToolBtnsDragStart(button)
  {	 
	_objSV.toolRefGrp.addChild(button);	 
	button.alpha=0.7
	isSelectedTool="";
	_objSV.eraserBtn.alpha=0.5; 
	game.world.bringToTop(_objSV.toolRefGrp)
	addEvents(); 
  }
function onToolBtnsDragStop(button)
{
	
	if(button.name!="tool1")
	{
		if(checkOverlap(button, _objSV["signHolder"]))
		{
		for(var i=2;i<=4;i++)
		{
		_objSV["sign"+i].visible=false;
		}
		var toolName = button.name.split("tool")[1];
		_objSV["sign"+toolName].visible=true;
		_objSV.resetBtn.alpha=1;
		}
	}
	else
	{
			var isHitFound=false;
			var currentCounter=0;
			for(var i=1;i<=10; i++)
			{		 
				if(checkOverlap(button,_objSV["bulletRight"+i]) && _objSV["bulletRight"+i].counter<5)
				{
					isHitFound=true;
				_objSV["toolRW_"+i+"_"+1].counter=_objSV["toolRW_"+i+"_"+1].counter+1;	
				currentCounter = _objSV["toolRW_"+i+"_"+1].counter;			
				_objSV["toolRW_"+i+"_"+currentCounter].visible=true;
				_objSV["bulletRight"+i].counter=currentCounter;
				  nRightWeight += i;
				  _objSV.resetBtn.alpha=1;
				 
				break;		
				}
			  else if(checkOverlap(button,_objSV["bulletLeft"+i])  && _objSV["bulletLeft"+i].counter<5)
				{
				
			
					isHitFound=true;
				_objSV["toolLW_"+i+"_"+1].counter=_objSV["toolLW_"+i+"_"+1].counter+1;	
				currentCounter = _objSV["toolLW_"+i+"_"+1].counter;			
				_objSV["toolLW_"+i+"_"+currentCounter].visible=true;
					console.log(i," FFFFFFF  ",currentCounter)
				_objSV["bulletLeft"+i].counter=currentCounter;
				nLeftWeight += i;
				_objSV.resetBtn.alpha=1;
				break;		
				} 
			}
	if(isHitFound)
	{
	checkBalance();
	}
	
	}
	button.alpha=1
	button.position.copyFrom(button.originalPosition);
}

  function resizeApp()
 {
	  if(tempSprite)
	 {
		 tempSprite.destroy();
	 }
	 
	$("#phaser-container").css({"height":window.innerHeight});	
    $("#MainContainer").css({"height":window.innerHeight});	  
	game.scale.setGameSize(window.innerWidth, window.innerHeight);
	  
	  var sf = Math.min(window.innerWidth/1920, window.innerHeight/((1080)));		 
	  
	   if(/(iPad)/i.test(navigator.userAgent)) 
			 {				 
				sf = Math.min(window.innerWidth/1600,window.innerHeight/900); 
			 }
		    _objSV.sf=sf;		 
		    _objSV.toolRefGrp.scale.setTo(sf, sf);	 
			
		//_objSV.balanceGrp.x=window.innerWidth/2-(_objSV.balanceGrp.width/2);
			  _objSV.balanceGrp.scale.setTo(sf, sf);	
		_objSV.balanceGrp.x =  window.innerWidth/2-((_objSV.balanceGrp.width+  _objSV.toolRefGrp.width+(100*_objSV.sf))/2);	 
		_objSV.toolRefGrp.y=105*sf;
			 
		_objSV.balanceGrp.y=280*sf;
		_objSV.toolRefGrp.x  =  _objSV.balanceGrp.x+_objSV.balanceGrp.width+(100*_objSV.sf);  
		  
	_objSV.tempWeight.scale.setTo(sf, sf);		
	
	
	
			//$("#infopopup").css("transform-origin","0% 0%")
			//$("#infopopup").css("transform", "matrix("+ 0.5 +", 0, 0, "+ 0.5 +", " + 155 + ", " + 108 + ")");

 
	
 }
 
 

 
 

 



 function checkHit(button)
  {	 

  if (checkOverlap(button, _objSV.hitBG))
	  {
		   
		  createClone(button);
	  }
	button.position.copyFrom(button.originalPosition);
	_objSV.input.deleteMoveCallback(toolBtnsMoving, this);
 
  }
  function checkOverlap(spriteA, spriteB) {
		   
		
	 
			var boundsA = spriteA.getBounds();	
			var boundsB = spriteB.getBounds();
			_objSV.hitX = boundsB.x;
			_objSV.hitY = boundsB.y;
		 
			return Phaser.Rectangle.intersects(boundsA, boundsB);
		 
	}
	
 
   
 	
function toolBtnClkHandler(button)
 {
	 
	 addEvents()
	 
	 if(button.name=="reset")
	 {		 
			 isSelectedTool="";
			eraserCursorGrp.visible=false;
			 _objSV.resetBtn.alpha=1;
	 
	  deleteAllHangingWeights();
			
			
	 }
	 else if(button.name=="eraser")
	 {
		 if(isSelectedTool!="eraser")
		 {
			 isSelectedTool="eraser";
			 button.alpha=1;
			 $("#phaser-container").addClass("hideCursor");
		 }
		 else
		 {
			 isSelectedTool="";
			 button.alpha=0.5;
			  $("#phaser-container").addClass("showCursor");
		 }
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
	 	{ 	 
	 		eraserCursorGrp.visible=false;
		}
	 }
	 
 
 
	 
 }
  function deleteAllHangingWeights()
 {			
	eraserCursorGrp.visible=false;
	
	_objSV.resetBtn.alpha=1;
	_objSV.eraserBtn.alpha=0.5;	 
			
			
	for(var j=1;j<=10; j++)
	{	
		for(var i=1;i<=5;i++)
		{
			 _objSV["toolRW_"+j+"_"+i].visible=false;
			 _objSV["toolRW_"+j+"_"+i].counter=0;			 
			 _objSV["toolLW_"+j+"_"+i].visible=false;
			 _objSV["toolLW_"+j+"_"+i].counter=0;
			
		_objSV["bulletRight"+j].counter=0;	
		_objSV["bulletLeft"+j].counter=0;				 
		}
	}
			
		 	   nLeftWeight = 0;
	  nRightWeight = 0;
		
		
	for(var i=2;i<=4;i++)
	{
		_objSV["sign"+i].visible=false;
	}
	isSelectedTool="";
	
_objSV.numberbar.angle=0;
		
 }
 
 
 
 function addEvents()
{
	$("#infopopup").hide();
			$("#info").removeClass("infoClicked");
	 $(".clickable").unbind("click").bind("click", function() {
		 var divId = $(this).attr("id")
		 
		if(divId=="info")
	 {
		 if($("#info").hasClass("infoClicked")==false)
		 {
				$("#infopopup").show();
				$("#infopopup").css({"display":"table-cell"});
				if( /Android|webOS|iPhone|iPod|Opera Mini/i.test(navigator.userAgent) ) 
				{
				//	$("#infopopup").css("transform-origin","0% 0%")
					//$("#infopopup").css("transform", "matrix("+ 0.5 +", 0, 0, "+ 0.5 +", " + 155 + ", " + 108 + ")");
				}		
				$("#info").addClass("infoClicked");
		 }
		 else if($("#info").hasClass("infoClicked"))
		 {
			$("#infopopup").hide();
			$("#info").removeClass("infoClicked");
		 }
	 }
	 
	 
	 	if(divId=="infopopupclosebtn")
		{
				 isInfoPopUp = false;
				$("#infopopup").hide();
						$("#info").css({"opacity":"1"});
		}	
	 
	 })
	 
	 
} 
 
 
 
 
  
 
 
 
 function onTempRectDragStart()
 {
	 
	 for(var i=0; i<_objSV.grpBtns.length; i++)
				{
					_objSV.tempRect.initX = _objSV.tempRect.x;
					_objSV.tempRect.initY = _objSV.tempRect.y;
					
					_objSV.grpBtns[i].initX= _objSV.grpBtns[i].toolBtn.x ;
					_objSV.grpBtns[i].initY= _objSV.grpBtns[i].toolBtn.y ;
					
					//_objSV.grpBtns[i].diffX = _objSV.pointerMVX - _objSV.grpBtns[i].initX;
					//_objSV.grpBtns[i].diffY = _objSV.pointerMVY - _objSV.grpBtns[i].initY;	
											 
				}
				
		 
	  _objSV.input.addMoveCallback(onTempRectDragMove, this);
	 
 }
 
function onTempRectDragMove()
 {
	_objSV.tempRect.deltaX = _objSV.tempRect.initX - _objSV.tempRect.x;
	_objSV.tempRect.deltaY = _objSV.tempRect.initY - _objSV.tempRect.y;
	
	  for(var i=0; i<_objSV.grpBtns.length; i++)
		{
			
		 	_objSV.grpBtns[i].toolBtn.x = _objSV.grpBtns[i].initX - _objSV.tempRect.deltaX/_objSV.sf;
		 	_objSV.grpBtns[i].toolBtn.y =  _objSV.grpBtns[i].initY - _objSV.tempRect.deltaY/_objSV.sf;
			 
		}  
		
		 
 }
 
 
 function onTempRectDragStop()
 {
	 
 
	 if (checkOverlap(_objSV.tempRect, _objSV.toolRefGrp))
	 {
		
		for(var i=0; i<_objSV.grpBtns.length; i++)
		{
		    _objSV.grpBtns[i].toolBtn.x =_objSV.grpBtns[i].initX ;
			_objSV.grpBtns[i].toolBtn.y = _objSV.grpBtns[i].initY;
		}
					
	 }
 
	 _objSV.tempRect.destroy();
	   _objSV.input.deleteMoveCallback(onTempRectDragMove, this);
	  _objSV.tempRect.events.onDragStop.remove(onTempRectDragStop, this);
 }
 
function checkShapeHits(cloneBtn)
{
 
var currentDragBtn=cloneBtn;
var currentDropBtn;
var sector="";
var hitCounter=0;	
		 	 	 	 
				if (checkOverlap(cloneBtn,_objSV.toolBg))
				 {
					 
					 return;
				 }
	for(var i=1; i<= _objSV.cloneCounter; i++)
		{
			if(cloneBtn.id!=i)
			{
				if( _objSV["toolBtnsClone"+i]!=null)
				{
						if (checkOverlap(cloneBtn, _objSV["toolBtnsClone"+i]))
				 		{
							 hitCounter=hitCounter+1;
					 		if(hitCounter>=2)
					 		{
							 return;
						 	}
				 		}
				}
				
			}
		}		
				
				 
 
 	
			
			
		
 
		 	 
			
			
			
			
			
		
}
 
 
 
 
 
 function checkBalance()
{
	_objSV.numberbar.angle=0;
	var diff=0;
	
	console.log(nLeftWeight," --- ",nRightWeight)
	if(nLeftWeight>nRightWeight)
	{
	var diff = nRightWeight - nLeftWeight;
	
	if(diff<=-10)
	{
	diff=-10
	}
	_objSV.numberbar.angle=diff*2;
	}
	else
	{
	var diff = nRightWeight - nLeftWeight;
	if(diff>=10)
	{
	diff=10;
	}
	_objSV.numberbar.angle=diff*2;
	}
	 
	initAngle = diff*2;
 
	 console.log(initAngle,' --- ');
	  setBalanceNow(initAngle);
	 
	 
}
 
 function setBalanceNow(initAngle)
 {
 
  
  if(initAngle>=0)
  {
var rightPosArr=[
{x:0,y:0},// 0 angle
{x:0,y:0},//2 angle
{x:0,y:0},//4 angle
{x:0,y:0},//6 angle
{x:1,y:1},//8 angle
{x:1,y:1},//10 angle
{x:1,y:1},//12 angle
{x:1.5,y:0},//14 angle
{x:2.5,y:1},//16 angle
{x:3,y:1},//18 angle
{x:3.2,y:1},//20 angle
] 
}
else
{
var rightPosArr=[
{x:0,y:0},// -0 angle
{x:0,y:0},//-2 angle
{x:0,y:-0.4},//-4 angle
{x:0.3,y:-0.8},//-6 angle
{x:0.5,y:-1},//-8 angle
{x:0.5,y:-1},//-10 angle
{x:1,y:-1},//-12 angle
{x:1,y:-1.8},//-14 angle
{x:1,y:-1.8},//-16 angle
{x:1,y:-2},//-18 angle
{x:1.6,y:-2},//-20 angle
]
}
var arrIndex = Math.abs(initAngle)/2 ;
 tempNumX = rightPosArr[arrIndex].x;
 tempNumY = rightPosArr[arrIndex].y
	_objSV.wtGrpHolder =  game.add.group();
	for(var j=1;j<=10; j++)
	{
	xx= _objSV.numberbar.x+_objSV["bulletRight"+j].x-(tempNumX*j); 	 
	yy= _objSV["bulletRight"+j].y-(-1*initAngle*j)-(tempNumY*j);	
	_yy=0;
	_yy=_yy+yy;
		for(var i=1;i<=5;i++)
		{		
			_objSV["toolRW_"+j+"_"+i].x =xx;
			_objSV["toolRW_"+j+"_"+i].y=_yy;	
		    _yy= _yy+11;	 
		}
	}
	
	
	
		
	if(initAngle<=0)
	{ 
 
var leftPosArr=[
{x:0,y:0},// angle
{x:0,y:0},//-2 angle
{x:0,y:0},//-4 angle
{x:0,y:0},//-6 angle
{x:0,y:0},//-8 angle
{x:0,y:0},//-10 angle
{x:-1.0,y:0.1},//-12 angle
{x:-1.5,y:1},//-14 angle
{x:-1.5,y:1},//-16 angle
{x:-2.5,y:1},//-18 angle
{x:-3,y:0.9},//-20 angle
] 
}
else
{
var leftPosArr=[
{x:0,y:0},// 0 angle
{x:0,y:-1},//2 angle
{x:0,y:-1},//4 angle
{x:0,y:-1},//6 angle
{x:0,y:-1},//8 angle
{x:-0.8,y:-1.8},//10 angle
{x:-1.2,y:-1.6},//12 angle
{x:-1.8,y:-1.5},//14 angle
{x:-1.8,y:-1.5},//16 angle
{x:-2.0,y:-1.5},//18 angle
{x:-2.8,y:-1.5},//20 angle
] 
}
var arrIndex = Math.abs(initAngle)/2 ;  

 tempNumX = leftPosArr[arrIndex].x;
 tempNumY = leftPosArr[arrIndex].y
 	var yy=0;
	var xx = 0;
	 
	 
	for(var j=10;j>=1; j--)
	{
	xx= _objSV.numberbar.x+_objSV["bulletLeft"+j].x-(tempNumX*j)
	yy= _objSV["bulletLeft"+j].y+(-1*initAngle*j)-(tempNumY*j);	//yy+(initAngle*0.91);//18.2;//240;
 
	_yy=0;
	_yy=_yy+yy;
	//console.log(xx,"DD",_objSV["bulletRight"+j].y)
		for(var i=1;i<=5;i++)
		{
			 _objSV["toolLW_"+j+"_"+i].x=xx;
			  _objSV["toolLW_"+j+"_"+i].y=_yy;		 
			   _yy=_yy+11;	 
		}
	 }
	
	
 
 }
 
 