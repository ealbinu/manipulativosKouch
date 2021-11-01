gsap.registerPlugin(Draggable);


/* FRAMES */

var dropzones = document.querySelectorAll(".drop");

// DRAG COMPARE WEIGHTS
Draggable.create(".compare", {
  type: "x,y",
  bounds: ".activity",
  onDragEnd: function () {
    var _this = this;
    // Drop weight
    var dropcompare = document.querySelector('.dropCompare')
    if(this.hitTest(dropcompare, "60%")) {
      if(dropcompare.childElementCount>0){
        document.querySelector('.comparers').appendChild(document.querySelector('.dropCompare .compare'))
      }
      TweenMax.set(this.target, {clearProps: 'all'})
      dropcompare.appendChild(this.target)
    } else {
      document.querySelector('.comparers').appendChild(document.querySelector('.dropCompare .compare'))
    }
    //Return to initial position after cloning
    TweenMax.to(this.target, 0.3, { x: 0, y: 0 });
  },
});

// DRAG WEIGHTS FROM TOOLS
Draggable.create(".peso", {
  type: "x,y",
  bounds: ".activity",
  onDragEnd: function () {
    var _this = this;
    // Drop weight
    for(var i = 0; i<dropzones.length; i++){
      if (this.hitTest(dropzones[i], "60%")) {
        if(dropzones[i].childElementCount<5){
          dropWeight(this.target, dropzones[i])
        }
      }
    }
    //Return to initial position after cloning
    TweenMax.to(this.target, 0.3, { x: 0, y: 0 });
  },
});


function dropWeight(weight, drop){
  var item =  weight.cloneNode(true)
  item.classList.add('animate__animated', 'animate__swing', 'animate__fast')
  TweenMax.set(item, {clearProps: 'all'})
  drop.appendChild(item)
  
  calculateBalance()

  setTimeout(function(){
    item.classList.remove('animate__animated', 'animate__swing', 'animate__fast')
    Draggable.create(item, {
      type: "x,y",
      bounds: ".activity",
      onDragEnd: function () {
        // Drop weight
        var dropped = false
        for(var i = 0; i<dropzones.length; i++){
          if (this.hitTest(dropzones[i], "60%")) {
            if(dropzones[i].childElementCount<5){
              dropzones[i].appendChild(this.target)
              TweenMax.set(item, {clearProps: 'all'})
              calculateBalance()
              dropped = true
            }
          }
        }
        if(!dropped){
          deleteToken(this)
        }
      }

    });
}, 800)
  
}



function calculateBalance () {
  var balance = 0;
  //drops
  var drops = document.querySelectorAll('.drop')
  for(var i = 0; i<drops.length; i++){
    let bars = drops[i].childElementCount
    let weight = parseInt(drops[i].getAttribute('data'))
    balance += bars*weight
  }

  var balanceRotation = balance/5
  if(balanceRotation>15){
    balanceRotation = 15
  }

  TweenMax.to(document.querySelector('.balanza'), {
    rotation: balanceRotation
  })
  TweenMax.to(document.querySelectorAll('.drop'), {
    rotation: -(balanceRotation)
  })

}


function deleteToken(event) {
  var _this = event.target;
  _this.classList.add("animate__animated", "animate__fadeOutDown");
  setTimeout(function () {
    _this.remove();
    calculateBalance()
  }, 500);
}


function closeInstructions() {
  document.querySelector(".instructions").classList.add("close");
}

function resetAll() {
  var drops = document.querySelectorAll('.drop')
  for(var i = 0; i<drops.length; i++){
    drops[i].innerHTML = ''
    var dropcompare = document.querySelector('.dropCompare')
    if(dropcompare.childElementCount>0){
      document.querySelector('.comparers').appendChild(document.querySelector('.dropCompare .compare'))
    }
    calculateBalance()
  }

}
