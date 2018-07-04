var clock;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 1000;
var leftMirror;
var rightMirror;
var imagesLeft=[];
var imagesRight=[];
var x=0;
var posX;
var posY;
var angle;
var desX;
var speed;
var colour;
var m1;
var c1;
var halfLength;
var imagesFromLeft=[];
var imagesFromRight=[];
var turn=1;
var ray1=[];
var ultimateSpeed=0;
var time=60000;
var f=[];
var angleGreater=0;
var animationFlag=0;
//Initialising the scene
function initialiseScene()
{
    f.length=27;
    clock=new THREE.Clock();
    PIEscene.add(new THREE.AmbientLight(0x606060));
    PIEscene.background=new THREE.Color( 0xbfd1e5 );
    PIEsetCameraFOV(45);
    PIEsetCameraAspect(ASPECT);
    PIEsetCameraDepth(FAR);
    PIEadjustCamera(0,0,80);
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff,linewidth:3} );
    var leftGeometry = new THREE.Geometry();
    //halfLength=window.innerHeight/70;
    halfLength=10;
    leftGeometry.vertices.push(new THREE.Vector3( 0, halfLength, 0) );
    leftGeometry.vertices.push(new THREE.Vector3( 0, -halfLength, 0) );
    for(var i=0;i<2*halfLength;i++)
    {
      leftGeometry.vertices.push(new THREE.Vector3( 0, halfLength-i, 0) );
      leftGeometry.vertices.push(new THREE.Vector3(-0.5,halfLength-(i+1),0));
      leftGeometry.vertices.push(new THREE.Vector3( 0, halfLength-i, 0) );
    }
    leftMirror = new THREE.Line( leftGeometry, material );
    PIEaddElement(leftMirror);
    //PIEdragElement(leftMirror);
    //PIEsetDragEnd(leftMirror,rotateMirror);
    var rightGeometry = new THREE.Geometry();
    rightGeometry.vertices.push(new THREE.Vector3( 0, halfLength, 0) );
    rightGeometry.vertices.push(new THREE.Vector3( 0, -halfLength, 0) );
    for(var i=0;i<2*halfLength;i++)
    {
      rightGeometry.vertices.push(new THREE.Vector3( 0, halfLength-i, 0) );
      rightGeometry.vertices.push(new THREE.Vector3(0.5,halfLength-(i+1),0));
      rightGeometry.vertices.push(new THREE.Vector3( 0, halfLength-i, 0) );
    }
    rightMirror=new THREE.Line( rightGeometry, material );
    PIEaddElement(rightMirror);
    //PIEdragElement(rightMirror);
    //PIEsetDragEnd(rightMirror,rotateMirror);

    leftMirror.position.x=-halfLength;
    leftMirror.position.y=0;
    leftMirror.rotation.z=0*Math.PI/180;

    rightMirror.position.x=halfLength;
    rightMirror.position.y=0;
    rightMirror.rotation.z=0*Math.PI/180;

    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    circle = new THREE.Mesh( geometryCircle, materialCircle );
    PIEaddElement( circle );
    circle.position.x=0;
    circle.position.y=0;
    setText();
    PIEstartButton.onclick=function()
    {
      if(animationFlag==1)
      {
        PIEshowDisplayPanel();
      }
      //PIEstopAnimation();
    };
    PIEstopButton.onclick=function()
    {
      if(animationFlag==1)
      {
        PIEshowDisplayPanel();
      }
      //PIEstopAnimation();
    };
    //document.getElementById("hello").innerHTML="<h2>Rahul</h2>";
    PIErender();
}

function loadExperimentElements()
{
    PIEsetExperimentTitle("A Multiple images with two parallel mirrors");
    PIEsetDeveloperName("Rahul Raj");
    PIEsetAreaOfInterest(-50, 20, 50, -20);
    document.title = "A Multiple images with two parallel mirrors";
    initialiseHelp();
    initialiseInfo();
    //updateExperimentElements();
    initialiseScene();
    PIErender();
    initialiseControls();
    formRay();
    //document.getElementsByClassName("close-button")[0].click();
    //PIEhideControlElement();
    //resetExperiment();
    //PIEhideControlElement();
    //animate();
}

function updateExperimentElements()
{

}

function setText()
{
  var bb3="font-family:Monospace; color:#000000; margin:0px; overflow:hidden;font-size:20px;"
  var text=document.createElement("p");
  text.setAttribute("id","hello");
  text.style=bb3;
  document.body.appendChild(text);
  text.style.position="absolute";
  text.style.left=15+'%';
  text.style.top=75+'%';
}

function findImageCoord(a,b,c,p,q)
{
  var p1=(p*((a*a)-(b*b))-2*b*((a*q)+c))/((a*a)+(b*b));
  var q1=(q*(-1)*((a*a)-(b*b))-2*a*((b*p)+c))/((a*a)+(b*b));
  return [p1,q1];
}

function animate()
{
  f[0]=setTimeout( function() {
    x=0;
    posX=0;
    posY=0;
    m1=Math.tan(170*Math.PI/180);
    desX=-10;
    speed=0.2;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 1:Rays from the object hit the mirror.</h2>";
  }, Math.min(500,time));
  f[1]=setTimeout(function(){
    x=0;
    posX=0;
    posY=0;
    m1=(-1)*Math.tan(170*Math.PI/180);
    desX=-10;
    speed=0.2;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 1:Rays from the object hit the mirror.</h2>";
  },Math.min(1500,time));
  f[2]=setTimeout(function(){
    x=-10;
    posX=-10;
    posY=-10*Math.tan(170*Math.PI/180);
    m1=Math.tan(10*Math.PI/180);
    desX=-1;
    speed=0.2;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 2:Rays after reflecting from the mirror.</h2>";
  },Math.min(2500,time));
  f[3]=setTimeout(function(){
    x=-10;
    posX=-10;
    posY=10*Math.tan(170*Math.PI/180);
    m1=-Math.tan(10*Math.PI/180);
    desX=-1;
    speed=0.2;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 2:Rays after reflecting from the mirror.</h2>";
  },Math.min(3500,time));
  f[4]=setTimeout(function(){
    x=-10;
    posX=-10;
    posY=-10*Math.tan(170*Math.PI/180);
    m1=Math.tan(10*Math.PI/180);
    angle=10;
    desX=-20;
    speed=0.2;
    colour="pink";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 3:Tracing Back the rays from the reflected rays.</h2>";
  },Math.min(4500,time));
  f[5]=setTimeout(function(){
    x=-10;
    posX=-10;
    posY=10*Math.tan(170*Math.PI/180);
    m1=-Math.tan(10*Math.PI/180);
    angle=10;
    desX=-20;
    speed=0.2;
    colour="pink";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 3:Tracing Back the rays from the reflected rays.</h2>";
  },Math.min(5500,time));

  //right mirror
  f[6]=setTimeout( function() {
    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
    imagesFromLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
    imagesFromLeft[0].position.x=-20;
    PIEaddElement(imagesFromLeft[0]);
    x=0;
    posX=0;
    posY=0;
    m1=Math.tan(10*Math.PI/180);
    desX=10;
    speed=0.25;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 1:Rays from the object hit the mirror.</h2>";
  }, Math.min(6500,time));
  f[7]=setTimeout(function(){
    x=0;
    posX=0;
    posY=0;
    m1=(-1)*Math.tan(10*Math.PI/180);
    desX=10;
    speed=0.25;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 1:Rays from the object hit the mirror.</h2>";
  },Math.min(7500,time));
  f[8]=setTimeout(function(){
    x=10;
    posX=10;
    posY=10*Math.tan(10*Math.PI/180);
    m1=Math.tan(170*Math.PI/180);
    desX=1;
    speed=0.2;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 2:Rays after reflecting from the mirror.</h2>";
  },Math.min(8500,time));
  f[9]=setTimeout(function(){
    x=10;
    posX=10;
    posY=-10*Math.tan(10*Math.PI/180);
    m1=-Math.tan(170*Math.PI/180);
    desX=1;
    speed=0.2;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 2:Rays after reflecting from the mirror.</h2>";
  },Math.min(9500,time));
  f[10]=setTimeout(function(){
    x=10;
    posX=10;
    posY=10*Math.tan(10*Math.PI/180);
    m1=Math.tan(170*Math.PI/180);
    angle=10;
    desX=20;
    speed=0.2;
    colour="pink";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 3:Tracing Back the rays from the reflected rays.</h2>";
  },Math.min(11000,time));
  f[11]=setTimeout(function(){
    x=10;
    posX=10;
    posY=-10*Math.tan(10*Math.PI/180);
    m1=-Math.tan(170*Math.PI/180);
    angle=10;
    desX=20;
    speed=0.2;
    colour="pink";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>Step 3:Tracing Back the rays from the reflected rays.</h2>";
  },Math.min(12500,time));
  f[12]=setTimeout(function(){
    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
    imagesFromRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
    imagesFromRight[0].position.x=20;
  },Math.min(13500,time));
  f[13]=setTimeout(function(){
    PIEaddElement(imagesFromRight[0]);
    x=-20;
    posX=-20;
    posY=0
    m1=Math.tan(10*Math.PI/180);
    angle=10;
    desX=10;
    speed=0.5;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>The images formed by the mirror is used as the object for other mirror.</h2>";
  },Math.min(15500,time));
  f[14]=setTimeout(function(){
    x=-20;
    posX=-20;
    posY=0
    m1=-Math.tan(10*Math.PI/180);
    angle=10;
    desX=10;
    speed=0.5;
    colour="red";
    makeRay();
    document.getElementById("hello").innerHTML="<h2>These above steps are continued.</h2>";
  },Math.min(17500,time));
  f[15]=setTimeout(function(){
    x=10;
    posX=10;
    posY=30*Math.tan(10*Math.PI/180);
    m1=Math.tan(170*Math.PI/180);
    desX=1;
    speed=0.2;
    colour="green";
    makeRay();
    document.getElementById("hello").innerHTML="<h2></h2>";
  },Math.min(19500,time));
  f[16]=setTimeout(function(){
    x=10;
    posX=10;
    posY=-30*Math.tan(10*Math.PI/180);
    m1=-Math.tan(170*Math.PI/180);
    desX=1;
    speed=0.2;
    colour="green";
    makeRay();
  },Math.min(21500,time));
  f[17]=setTimeout(function(){
    x=10;
    posX=10;
    posY=30*Math.tan(10*Math.PI/180);
    m1=Math.tan(170*Math.PI/180);
    angle=10;
    desX=40;
    speed=0.6;
    colour="pink";
    makeRay();
  },Math.min(24000,time));
  f[18]=setTimeout(function(){
    x=10;
    posX=10;
    posY=-30*Math.tan(10*Math.PI/180);
    m1=-Math.tan(170*Math.PI/180);
    angle=10;
    desX=40;
    speed=0.6;
    colour="pink";
    makeRay();
  },Math.min(26500,time));
  f[19]=setTimeout(function(){
    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
    imagesFromRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
    imagesFromRight[1].position.x=40;
    PIEaddElement(imagesFromRight[1]);
  },Math.min(29000,time));
  f[20]=setTimeout( function() {
    x=20;
    posX=20;
    posY=0;
    m1=Math.tan(170*Math.PI/180);
    desX=-10;
    speed=0.6;
    colour="red";
    makeRay();
  }, Math.min(31500,time));
  f[21]=setTimeout(function(){
    x=20;
    posX=20;
    posY=0;
    m1=(-1)*Math.tan(170*Math.PI/180);
    desX=-10;
    speed=0.6;
    colour="red";
    makeRay();
  },Math.min(34000,time));
  f[22]=setTimeout(function(){
    x=-10;
    posX=-10;
    posY=-30*Math.tan(170*Math.PI/180);
    m1=Math.tan(10*Math.PI/180);
    desX=-1;
    speed=0.2;
    colour="green";
    makeRay();
  },Math.min(36500,time));
  f[23]=setTimeout(function(){
    x=-10;
    posX=-10;
    posY=30*Math.tan(170*Math.PI/180);
    m1=-Math.tan(10*Math.PI/180);
    desX=-1;
    speed=0.2;
    colour="green";
    makeRay();
  },Math.min(39000,time));
  f[24]=setTimeout(function(){
    x=-10;
    posX=-10;
    posY=-30*Math.tan(170*Math.PI/180);
    m1=Math.tan(10*Math.PI/180);
    angle=10;
    desX=-40;
    speed=0.6;
    colour="pink";
    makeRay();
  },Math.min(41500,time));
  f[25]=setTimeout(function(){
    x=-10;
    posX=-10;
    posY=30*Math.tan(170*Math.PI/180);
    m1=-Math.tan(10*Math.PI/180);
    angle=10;
    desX=-40;
    speed=0.6;
    colour="pink";
    makeRay();
  },Math.min(44500,time));
  f[26]=setTimeout(function(){
    var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
    var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
    imagesFromLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
    imagesFromLeft[1].position.x=-40;
    PIEaddElement(imagesFromLeft[1]);
    document.getElementById("hello").innerHTML="<h2>Following the above steps,Infinite Images are formed.</h2>";
    PIEshowInputPanel();
    var li=document.getElementsByTagName("li");
    li[13].style.display='';
    li[14].style.display='';
    li[15].style.display='';
    li[16].style.display='';
    animationFlag=0;
  },Math.min(46500,time));
}

function makeRay()
{
  c1=posY-m1*posX;
  var material = new THREE.LineBasicMaterial( { color:colour,linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( posX, posY, 0) );
  geometry1.vertices.push(new THREE.Vector3( x, m1*x+c1, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);
  speed=Math.max(speed,ultimateSpeed);
  if(desX<posX)
  {
    x=x-speed;
  }
  else
  {
    x=x+speed;
  }
  //if(time==0){x=desX;}
  PIErender();
  if(desX>posX)
  {
    if(x<=desX)
    {
      requestAnimationFrame(makeRay);
    }
  }
  else
  {
    if(desX<posX)
    {
      if(x>=desX)
      {
        requestAnimationFrame(makeRay);
      }
    }
  }
}

function formRay()
{
  var m1=Math.tan(170*Math.PI/180);
  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( circle.position.x,circle.position.y, 0) );
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x, 0) );
  var y=m1*leftMirror.position.x;
  m1=Math.tan(10*Math.PI/180);
  var c=y-m1*leftMirror.position.x;
  geometry1.vertices.push(new THREE.Vector3( -1, (-1)*m1+c, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=-Math.tan(170*Math.PI/180);
  material = new THREE.LineBasicMaterial( { color:"red",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( circle.position.x,circle.position.y, 0) );
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x, 0) );
  y=m1*leftMirror.position.x;
  m1=-Math.tan(10*Math.PI/180);
  c=y-m1*leftMirror.position.x;
  geometry1.vertices.push(new THREE.Vector3( -1, (-1)*m1+c, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=Math.tan(10*Math.PI/180);
  material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x, 0) );
  geometry1.vertices.push(new THREE.Vector3( -20, 0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=-Math.tan(10*Math.PI/180);
  material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x, 0) );
  geometry1.vertices.push(new THREE.Vector3( -20, 0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var imageGeometry = new THREE.CircleBufferGeometry( 0.5, 32 );
  var imageMaterial = new THREE.MeshBasicMaterial( { color: "red" } );
  imagesFromLeft.push(new THREE.Mesh( imageGeometry, imageMaterial ));
  imagesFromLeft[imagesFromLeft.length-1].position.x=-20;
  PIEaddElement( imagesFromLeft[imagesFromLeft.length-1] );

  //right mirror image
  var m1=Math.tan(10*Math.PI/180);
  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( circle.position.x,circle.position.y, 0) );
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x, 0) );
  var y=m1*rightMirror.position.x;
  m1=-Math.tan(10*Math.PI/180);
  var c=y-m1*rightMirror.position.x;
  geometry1.vertices.push(new THREE.Vector3( 1, m1+c, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=-Math.tan(10*Math.PI/180);
  material = new THREE.LineBasicMaterial( { color:"red",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( circle.position.x,circle.position.y, 0) );
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x, 0) );
  y=m1*rightMirror.position.x;
  m1=Math.tan(10*Math.PI/180);
  c=y-m1*rightMirror.position.x;
  geometry1.vertices.push(new THREE.Vector3( 1, m1+c, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=Math.tan(10*Math.PI/180);
  material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x, 0) );
  geometry1.vertices.push(new THREE.Vector3( 20, 0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=-Math.tan(10*Math.PI/180);
  material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x, 0) );
  geometry1.vertices.push(new THREE.Vector3( 20, 0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var imageGeometry = new THREE.CircleBufferGeometry( 0.5, 32 );
  var imageMaterial = new THREE.MeshBasicMaterial( { color: "red" } );
  imagesFromRight.push(new THREE.Mesh( imageGeometry, imageMaterial ));
  imagesFromRight[imagesFromRight.length-1].position.x=20;
  PIEaddElement( imagesFromRight[imagesFromRight.length-1] );

  //image on the left mirror considering right image
  var m1=Math.tan(170*Math.PI/180);
  var c1=0-20*m1;
  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 20 , 0 , 0) );
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x+c1, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x+c1, 0) );
  var y=m1*leftMirror.position.x+c1;
  m1=Math.tan(10*Math.PI/180);
  var c=y-m1*leftMirror.position.x;
  geometry1.vertices.push(new THREE.Vector3( -1, (-1)*m1+c, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=-Math.tan(170*Math.PI/180);
  c1=0-20*m1;
  material = new THREE.LineBasicMaterial( { color:"red",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( 20 , 0 , 0) );
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x+c1, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x+c1, 0) );
  y=m1*leftMirror.position.x+c1;
  m1=-Math.tan(10*Math.PI/180);
  c=y-m1*leftMirror.position.x;
  geometry1.vertices.push(new THREE.Vector3( -1, (-1)*m1+c, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=Math.tan(10*Math.PI/180);
  material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x+c1, 0) );
  geometry1.vertices.push(new THREE.Vector3( -40, 0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=-Math.tan(10*Math.PI/180);
  c1=-m1*(20);
  material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( leftMirror.position.x, m1*leftMirror.position.x+c1, 0) );
  geometry1.vertices.push(new THREE.Vector3( -40, 0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var imageGeometry = new THREE.CircleBufferGeometry( 0.5, 32 );
  var imageMaterial = new THREE.MeshBasicMaterial( { color: "red" } );
  imagesFromLeft.push(new THREE.Mesh( imageGeometry, imageMaterial ));
  imagesFromLeft[imagesFromLeft.length-1].position.x=-40;
  PIEaddElement( imagesFromLeft[imagesFromLeft.length-1] );

  //image formed on right mirror considering left mirror image
  var m1=Math.tan(10*Math.PI/180);
  var c1=-m1*(-20);
  var material = new THREE.LineBasicMaterial( { color:"red",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -20, 0 , 0) );
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x+c1, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x+c1, 0) );
  var y=m1*rightMirror.position.x+c1;
  m1=-Math.tan(10*Math.PI/180);
  var c=y-m1*rightMirror.position.x;
  geometry1.vertices.push(new THREE.Vector3( 1, m1+c, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=-Math.tan(10*Math.PI/180);
  var c1=0-m1*(-20);
  material = new THREE.LineBasicMaterial( { color:"red",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( -20, 0 , 0) );
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x+c1, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  material = new THREE.LineBasicMaterial( { color:"green",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x+c1, 0) );
  y=m1*rightMirror.position.x+c1;
  m1=Math.tan(10*Math.PI/180);
  c=y-m1*rightMirror.position.x;
  geometry1.vertices.push(new THREE.Vector3( 1, m1+c, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=Math.tan(10*Math.PI/180);
  material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  geometry1 = new THREE.Geometry();
  var c1=0-m1*(-20);
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x+c1, 0) );
  geometry1.vertices.push(new THREE.Vector3( 40, 0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  m1=-Math.tan(10*Math.PI/180);
  var c1=0-m1*(-20);
  material = new THREE.LineBasicMaterial( { color:"pink",linewidth:2} );
  geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3( rightMirror.position.x, m1*rightMirror.position.x+c1, 0) );
  geometry1.vertices.push(new THREE.Vector3( 40, 0, 0) );
  ray1.push(new THREE.Line(geometry1,material));
  PIEaddElement(ray1[ray1.length-1]);

  var imageGeometry = new THREE.CircleBufferGeometry( 0.5, 32 );
  var imageMaterial = new THREE.MeshBasicMaterial( { color: "red" } );
  imagesFromRight.push(new THREE.Mesh( imageGeometry, imageMaterial ));
  imagesFromRight[imagesFromRight.length-1].position.x=40;
  PIEaddElement( imagesFromRight[imagesFromRight.length-1] );
}

//It initialize the controls
function initialiseControls(){
  PIEaddInputCheckbox("Rotate Mirror",false, function(){
    if(turn==0)
    {
      turn=1;
      time=60000;
      ultimateSpeed=0;
      //PIEchangeDisplayCheckbox("Rotate Mirror",true);
      for(var i=imagesLeft.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesLeft[i]);
        imagesLeft.pop();
      }
      for(var i=imagesRight.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesRight[i]);
        imagesRight.pop();
      }
      PIEremoveDragElement(leftMirror);
      PIEremoveDragElement(rightMirror);
      PIEremoveDragElement(circle);
      resetExperiment();
      formRay();
      PIErender();
      var li=document.getElementsByTagName("li");
      li[16].style.display='';
      //animate();
    }
    else
    {
      for(var i=0;i<f.length;i++)
      {
        clearTimeout(f[i]);
      }
      //setInterval(function(){time=0;x=desX;},5000);
      turn=0;
      time=0;
      ultimateSpeed=10;
      //PIEchangeDisplayCheckbox("Rotate Mirror",false);
      for(var i=ray1.length-1;i>=0;i--)
        {
          PIEremoveElement(ray1[i]);
          ray1.pop();
        }
      for(var i=imagesFromLeft.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesFromLeft[i]);
        imagesFromLeft.pop();
      }
      for(var i=imagesFromRight.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesFromRight[i]);
        imagesFromRight.pop();
      }
      document.getElementById("hello").innerHTML="<h2></h2>";
      // while(object.children.length)
      // {
      //   object.children.remove(object.children[0]);
      // }
      // for(var i=PIEsceneElements.length-1;i>=0;i--)
      // {
      //   PIEremoveElement(PIEsceneElements[i]);
      //   PIEsceneElements.pop();
      // }
      PIErender();
      //PIEaddElement(PIEscene);
      // PIEaddElement(leftMirror);
      // PIEaddElement(rightMirror);
      // PIEaddElement(circle);
      resetExperiment();
      rotateMirror();
      PIEdragElement(leftMirror);
      PIEsetDragEnd(leftMirror,rotateMirror);
      PIEdragElement(rightMirror);
      PIEsetDragEnd(rightMirror,rotateMirror);
      PIEdragElement(circle);
      PIEsetDragEnd(circle,rotateMirror);
      document.getElementById("hello").innerHTML="<h2>Angle Between the mirror is 0.</br>Number of images formed is infinite.</h2>";

      PIErender();
      var li=document.getElementsByTagName("li");
      li[16].style.display='none';
    }
    //console.log(turn);
  });
  PIEaddInputSlider("Rotate Left Mirror:", 0, function(){
    if(turn==0)
    {
      if((PIEgetInputSlider("Rotate Left Mirror:")+PIEgetInputSlider("Rotate Right Mirror:"))>90)
      {
        angleGreater=1;
        PIEremoveDragElement(leftMirror);
        PIEremoveDragElement(rightMirror);
        PIEremoveDragElement(circle);
        circle.position.set(0,5,0);
        leftMirror.position.set(-10,0,0);
        rightMirror.position.set(10,0,0);
        PIErender();
      }
      else
      {
        if(angleGreater==1)
        {
          angleGreater=0;
          PIEdragElement(leftMirror);
          PIEsetDragEnd(leftMirror,rotateMirror);
          PIEdragElement(rightMirror);
          PIEsetDragEnd(rightMirror,rotateMirror);
          PIEdragElement(circle);
          PIEsetDragEnd(circle,rotateMirror);
          circle.position.y=0;
          PIErender();
        }

      }
      rotateMirror();
    }
  }, 0, 90, 15);
  PIEaddInputSlider("Rotate Right Mirror:",0, function(){
    if(turn==0)
    {
      if((PIEgetInputSlider("Rotate Left Mirror:")+PIEgetInputSlider("Rotate Right Mirror:"))>90)
      {
        angleGreater=1;
        PIEremoveDragElement(leftMirror);
        PIEremoveDragElement(rightMirror);
        PIEremoveDragElement(circle);
        circle.position.set(0,5,0);
        leftMirror.position.set(-10,0,0);
        rightMirror.position.set(10,0,0);
        PIErender();
      }
      else
      {
        if(angleGreater==1)
        {
          angleGreater=0;
          PIEdragElement(leftMirror);
          PIEsetDragEnd(leftMirror,rotateMirror);
          PIEdragElement(rightMirror);
          PIEsetDragEnd(rightMirror,rotateMirror);
          PIEdragElement(circle);
          PIEsetDragEnd(circle,rotateMirror);
          circle.position.y=0;
          PIErender();
        }

      }
      rotateMirror();
    }
  } ,0,90,15);
  PIEaddInputCommand("Demo Mode", function(){
    if(turn==1)
    {
      var li=document.getElementsByTagName("li");
      li[13].style.display='none';
      li[14].style.display='none';
      li[15].style.display='none';
      li[16].style.display='none';
      PIEshowDisplayPanel();
      for(var i=ray1.length-1;i>=0;i--)
        {
          PIEremoveElement(ray1[i]);
          ray1.pop();
        }
      for(var i=imagesFromLeft.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesFromLeft[i]);
        imagesFromLeft.pop();
      }
      for(var i=imagesFromRight.length-1;i>=0;i--)
      {
        PIEremoveElement(imagesFromRight[i]);
        imagesFromRight.pop();
      }
      animationFlag=1;
      animate();
    }
  });
}

function rotateMirror()
{
  for(var i=19;i>=0;i--)
  {
    PIEremoveElement(imagesLeft[i]);
    imagesLeft.pop();
    PIEremoveElement(imagesRight[i]);
    imagesRight.pop();
  }

  var geometryCircle = new THREE.CircleBufferGeometry( 0.5, 32 );
  var materialCircle = new THREE.MeshBasicMaterial( { color: "red" } );
  angleLeft=PIEgetInputSlider("Rotate Left Mirror:");
  leftMirror.rotation.z=angleLeft*Math.PI/180;
  var m=Math.tan((90+angleLeft)*Math.PI/180);
  var c=leftMirror.position.y-m*leftMirror.position.x;
  var coords=findImageCoord(1,-m,-c,circle.position.x,circle.position.y);

  imagesLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
  imagesLeft[0].position.x=coords[0];
  imagesLeft[0].position.y=coords[1];
  PIEaddElement(imagesLeft[0]);

  angleRight=PIEgetInputSlider("Rotate Right Mirror:");
  rightMirror.rotation.z=-angleRight*Math.PI/180;
  var m=Math.tan((90-angleRight)*Math.PI/180);
  var c=rightMirror.position.y-m*rightMirror.position.x;
  var coords=findImageCoord(1,-m,-c,circle.position.x,circle.position.y);

  imagesRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
  imagesRight[0].position.x=coords[0];
  imagesRight[0].position.y=coords[1];
  PIEaddElement(imagesRight[0]);
  //console.log("object: "+circle.position.x+" "+circle.position.y);
  for(var i=1;i<20;i++)
  {
    angleLeft=PIEgetInputSlider("Rotate Left Mirror:");
    leftMirror.rotation.z=angleLeft*Math.PI/180;
    var m=Math.tan((90+angleLeft)*Math.PI/180);
    var c=leftMirror.position.y-m*leftMirror.position.x;
    var coords=findImageCoord(1,-m,-c,imagesRight[i-1].position.x,imagesRight[i-1].position.y);
    imagesLeft.push(new THREE.Mesh( geometryCircle, materialCircle ));
    //console.log("image: "+(Math.round(coords[0]*1000)/1000)+" "+(Math.round(coords[1]*1000)/1000));
    if((Math.round(coords[0]))==Math.round(circle.position.x) && (Math.round(coords[1]))==Math.round(circle.position.y))
    {
      imagesLeft[i].position.x=imagesLeft[0].position.x;
      imagesLeft[i].position.y=imagesLeft[0].position.y;
      PIEaddElement(imagesLeft[i]);
    }
    else
    {
      imagesLeft[i].position.x=(Math.round(coords[0]*1000)/1000);
      imagesLeft[i].position.y=(Math.round(coords[1]*1000)/1000);
      PIEaddElement(imagesLeft[i]);
    }

    angleRight=PIEgetInputSlider("Rotate Right Mirror:");
    rightMirror.rotation.z=-angleRight*Math.PI/180;
    var m=Math.tan((90-angleRight)*Math.PI/180);
    var c=rightMirror.position.y-m*rightMirror.position.x;
    var coords=findImageCoord(1,-m,-c,imagesLeft[i-1].position.x,imagesLeft[i-1].position.y);
    imagesRight.push(new THREE.Mesh( geometryCircle, materialCircle ));
    //console.log("image: "+(Math.round(coords[0]*1000)/1000)+" "+(Math.round(coords[1]*1000)/1000));
    if((Math.round(coords[0]))==Math.round(circle.position.x) && (Math.round(coords[1]))==Math.round(circle.position.y))
    {
      imagesRight[i].position.x=imagesRight[0].position.x;
      imagesRight[i].position.y=imagesRight[0].position.y;
      PIEaddElement(imagesRight[i]);
    }
    else
    {
      imagesRight[i].position.x=(Math.round(coords[0]*1000)/1000);
      imagesRight[i].position.y=(Math.round(coords[1]*1000)/1000);
      PIEaddElement(imagesRight[i]);
    }
  }
  var ImageNumber;
  angleLeft=PIEgetInputSlider("Rotate Left Mirror:");
  angleRight=PIEgetInputSlider("Rotate Right Mirror:");
  //document.getElementById("hello").innerHTML="<h2>Angle between the mirrors "+(angleLeft+angleRight)+".</h2>";
  if((angleLeft+angleRight)==0)
  {
      document.getElementById("hello").innerHTML="<h2>Angle between the mirrors "+(angleLeft+angleRight)+".</br>Number of Images Formed is infinite.</h2>";
  }
  else
  {
    ImageNumber=360/(angleLeft+angleRight)-1;
    document.getElementById("hello").innerHTML="<h2>Angle between the mirrors "+(angleLeft+angleRight)+".</br>Number of Images Formed is "+Math.round(ImageNumber*100)/100+".</h2>";
  }
  PIErender();
}

function resetExperiment()
{
  if(turn==0)
  {
    leftMirror.position.x=-halfLength;
    leftMirror.position.y=0;
    leftMirror.rotation.z=0*Math.PI/180;

    rightMirror.position.x=halfLength;
    rightMirror.position.y=0;
    rightMirror.rotation.z=0*Math.PI/180;

    circle.position.x=0;
    circle.position.y=0;

    for(var i=ray1.length-1;i>=0;i--)
      {
        PIEremoveElement(ray1[i]);
        ray1.pop();
      }
    for(var i=imagesFromLeft.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesFromLeft[i]);
      imagesFromLeft.pop();
    }
    for(var i=imagesFromRight.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesFromRight[i]);
      imagesFromRight.pop();
    }
    for(var i=imagesLeft.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesLeft[i]);
      imagesLeft.pop();
    }
    for(var i=imagesRight.length-1;i>=0;i--)
    {
      PIEremoveElement(imagesRight[i]);
      imagesRight.pop();
    }

    document.getElementById("hello").innerHTML="<h2></h2>";
    PIEchangeInputSlider("Rotate Left Mirror:",0);
    PIEchangeInputSlider("Rotate Right Mirror:",0);
    PIErender();
    //document.getElementById("hello").innerHTML="<h2></h2>";
  }
  else {
    leftMirror.position.x=-halfLength;
    leftMirror.position.y=0;
    leftMirror.rotation.z=0*Math.PI/180;

    rightMirror.position.x=halfLength;
    rightMirror.position.y=0;
    rightMirror.rotation.z=0*Math.PI/180;

    circle.position.x=0;
    circle.position.y=0;
    document.getElementById("hello").innerHTML="<h2></h2>";
  }
}

var helpContent;
//Help content
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>A Multiple images with two parallel mirrors</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows the multiple images formation between 2 parallel mirrors.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see 2 mirrors,a object(shown by yellow color) and ray diagrams and the images formed(shown by red color)";
    helpContent = helpContent + "The rules of the experiment are given below.</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>The incident ray is shown in red colour.";
    helpContent = helpContent + "<li>The reflected ray is shown in green colour.";
    helpContent = helpContent + "<li>The backward traced ray is shown in pink colour.(Virtual image formation)";
    helpContent = helpContent + "<li>When the demo mode is clicked,the rays diagram starts to form when the rotate mirror check box is unchecked";
    helpContent = helpContent + "<li>Demo mode does nothing when the rotate mirror check box is checked";
    helpContent = helpContent + "<li>After the successful image formation,user can click on the rotate mirror check box to enable rotation of mirror.";
    helpContent = helpContent + "<li>The mirrors and objects can be dragged.";
    helpContent = helpContent + "<li>Change the angle between the mirrors by using the slider.";
    helpContent = helpContent + "<li>The range of slider is from 0 to 90.";
    helpContent = helpContent + "<li>The left mirror is rotated leftwards as the slider slides.";
    helpContent = helpContent + "<li>The right mirror is rotated rightwards as the slider slides.";
    helpContent = helpContent + "<li>Keep the angle(A) between the mirror so that angle(A) can divide 360.";
    helpContent = helpContent + "<li>The number of images formed can be seen.";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>The images are shown in red color and object is shown in yellow color.</p>";
    helpContent = helpContent + "<p>The steps written can also be seen as the image forms via animation.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}
//Initialise Info
var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>A Multiple images with two parallel mirrors</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows the multiple image formation with ray diagram .</p>";
    infoContent = infoContent + "<p>The red line shows the incident ray.</p>";
    infoContent = infoContent + "<p>The green line shows the incident ray.</p>";
    infoContent = infoContent + "<p>The pink line shows the traced ray in backward direction (virtual image formation).</p>";
    infoContent = infoContent + "<p>The Number of images formed is (360/A)-1 where A is angle between the mirrors.</p>";
    infoContent = infoContent + "<p>The angle A must be choosen so that 360 is divisible by A.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}
