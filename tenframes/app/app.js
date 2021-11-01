gsap.registerPlugin(Draggable);

/* DRAW */
var drawTool = "draw";
function setTool(toolName) {
  document.querySelector(".drawTools .active").classList.remove("active");
  document.querySelector(".drawTools ." + toolName).classList.add("active");
  drawTool = toolName;
}

/* FRAMES */

var dropzones = document.querySelectorAll(".dropzoneFrame");
function rotateFrames() {
  document.querySelector(".framesArea").classList.toggle("vertical");
}

// Clone token
function cloneItem(target, dropzone) {
  var newElement = target.cloneNode(true);
  // ::::::::::  onetime utilities
  // remove span number
  if (newElement.querySelector("span")) {
    newElement.querySelector("span").remove();
  }
  // remove classes
  var classesToRemove = ["token1", "token5", "token10"];
  for (var i = 0; i < classesToRemove.length; i++) {
    if (newElement.classList.contains(classesToRemove[i])) {
      newElement.classList.remove(classesToRemove[i]);
    }
  }
  //::::::::::
  // Append to dropzone or to general
  if (dropzone) {
    appendTokenToDropzone(newElement, dropzone);
  } else {
    dropTokenOutside(newElement, target);
  }

  // Delete Token with doubleClick
  newElement.addEventListener("dblclick", deleteToken);
  // Delete Token double touch (mobile)
  newElement.lastClick = 0;
  newElement.addEventListener("touchstart", function (e) {
    e.preventDefault(); // to disable browser default zoom on double tap
    let date = new Date();
    let time = date.getTime();
    const time_between_taps = 1000; // 200ms
    //alert(time - newElement.lastClick +' || '+ time_between_taps)
    if (time - newElement.lastClick < time_between_taps) {
      deleteToken(e);
    }
    newElement.lastClick = time;
  });

  function deleteToken(event) {
    var _this = event.target.parentNode.parentNode;
    if (_this.parentNode.classList.contains("fill")) {
      _this.parentNode.classList.remove("fill");
    }
    _this.classList.add("removing");
    setTimeout(function () {
      _this.remove();
    }, 500);
  }

  Draggable.create(newElement, {
    type: "x,y",
    bounds: ".framesArea",
    onDragEnd: function (e) {
      dropToken(this, false); //noclone
    },
  });
}

// DRAG TOKEN FROM TOOLS
Draggable.create(".token", {
  type: "x,y",
  bounds: ".sectionFrames",
  onDragEnd: function (e) {
    var _this = this;
    // Floating token
    if (this.hitTest(document.querySelector(".framesArea"), "50%")) {
      //Clone 1
      if (this.target.classList.contains("token1")) {
        dropToken(this, true); //clone
      }
      // Clone 5
      if (this.target.classList.contains("token5")) {
        dropMultipleToken(_this, true, 5);
      }
      // Clone 10
      if (this.target.classList.contains("token10")) {
        dropMultipleToken(_this, true, 10);
      }
    }
    //Return to initial position after cloning
    TweenMax.to(this.target, 0.3, { x: 0, y: 0 });
  },
});

// -------------------------- drop Multiple TOKEN
function dropMultipleToken(_this, clone, tokens) {
  const dropzones = document.querySelectorAll(".dropzoneFrame.withframe");

  var droppedInDropzone = false;
  for (var i = 0; i < dropzones.length; i++) {
    // If hits fdrop
    if (_this.hitTest(dropzones[i], "50%")) {
      //Dropped inside dropzone withFrame
      droppedInDropzone = true;
      //Find empty fdrops
      const emptyFdrops = dropzones[i].querySelectorAll(".fdrop:not(.fill)");
      if (emptyFdrops.length >= tokens) {
        for (var i = 0; i < tokens; i++) {
          emptyFdrops[i].classList.add("fill");

          cloneItem(_this.target, emptyFdrops[i]);
        }
      }
    }
  }
  // If token wasn't dropped inside a Fdrop
  if (!droppedInDropzone) {
    if (clone) {
      var initx = _this.x;
      for (var i = 0; i < tokens; i++) {
        TweenMax.set(_this.target, {
          x:
            _this.x +
            _this.target.getBoundingClientRect().width * parseInt(i % 5),
          y: _this.y + (i > 4 ? _this.target.getBoundingClientRect().width : 0),
        });
        cloneItem(_this.target, null);
      }
    }
  }
}

// -------------------------- drop ONE TOKEN
function dropToken(_this, clone) {
  const fdrops = document.querySelectorAll(".fdrop");
  var droppedInFDrop = false;
  for (var i = 0; i < fdrops.length; i++) {
    // If hits fdrop
    if (_this.hitTest(fdrops[i], "30%")) {
      //if is dropped over Fdrop
      // if fdrop is filled the action is aborted with this varaible
      droppedInFDrop = true;
      // If fdrop is empty or fill
      if (!fdrops[i].classList.contains("fill")) {
        if (clone) {
          cloneItem(_this.target, fdrops[i]);
        } else {
          appendTokenToDropzone(_this.target, fdrops[i]);
        }
        fdrops[i].classList.add("fill");
      }
    }
  }
  // If token wasn't dropped inside a Fdrop
  if (!droppedInFDrop) {
    if (clone) {
      cloneItem(_this.target, null);
    } else {
      dropTokenOutside(_this, null);
    }
  }
}

// drop TOKEN outside of fdrops
function dropTokenOutside(_this, extraTarget) {
  if (_this.target && _this.target.parentNode.classList.contains("fill")) {
    _this.target.parentNode.classList.remove("fill");
  }

  var generalParent = document.querySelector(".framesArea");
  var targetPosition = extraTarget
    ? extraTarget.getBoundingClientRect()
    : _this.target.getBoundingClientRect();
  var parentPosition = generalParent.getBoundingClientRect();

  var leftX = targetPosition.left - parentPosition.left;
  var topY = targetPosition.top - parentPosition.top;

  var newElement = null;
  if (extraTarget) {
    newElement = _this;
  } else {
    newElement = _this.target;
  }
  TweenMax.set(newElement, {
    x: 0,
    y: 0,
    left: leftX,
    top: topY,
  });
  generalParent.appendChild(newElement);
}

// drop TOKEN inside dropzone
function appendTokenToDropzone(token, dropzone) {
  if (token.parentNode && token.parentNode.classList.contains("fill")) {
    token.parentNode.classList.remove("fill");
  }
  TweenMax.set(token, { clearProps: "all" });
  dropzone.appendChild(token);
}

// --------------------- #### DRAG FRAMES
Draggable.create(".frame", {
  type: "x,y",
  bounds: ".sectionFrames",
  onDrag: function (e) {
    for (var i = 0; i < dropzones.length; i++) {
      if (this.hitTest(dropzones[i], "50%")) {
        if (!dropzones[i].classList.contains("withframe")) {
          dropzones[i].classList.add("hover");
        }
      } else {
        if (dropzones[i].classList.contains("hover")) {
          dropzones[i].classList.remove("hover");
        }
      }
    }
  },
  onDragEnd: function (e) {
    for (var i = 0; i < dropzones.length; i++) {
      if (this.hitTest(dropzones[i], "50%")) {
        if (!dropzones[i].classList.contains("withframe")) {
          dropzones[i].classList.remove("hover");
          dropzones[i].classList.add("withframe");
          frameDropzones(dropzones[i]);
        }
      }
    }
    //Return to initial position after adding grid
    TweenMax.to(this.target, 0.3, { x: 0, y: 0 });
  },
});

function frameDropzones(dropzone) {
  for (var x = 0; x < 2; x++) {
    let fdropContainer = document.createElement("div");
    fdropContainer.classList.add("fdropContainer");
    for (var i = 0; i < 5; i++) {
      let fdrop = document.createElement("div");
      fdrop.classList.add("fdrop");
      fdropContainer.appendChild(fdrop);
    }
    dropzone.appendChild(fdropContainer);
  }
}

function closeInstructions() {
  document.querySelector(".instructions").classList.add("close");
}

function resetFrames() {
  const dropzonesWframe = document.querySelectorAll(".withframe");
  for (var i = 0; i < dropzonesWframe.length; i++) {
    dropzonesWframe[i].classList.remove("withframe");
    dropzonesWframe[i].innerHTML = "";
  }
  const floatingTokens = document.querySelectorAll(".framesArea .token");
  for (var i = 0; i < floatingTokens.length; i++) {
    floatingTokens[i].remove();
  }
}
