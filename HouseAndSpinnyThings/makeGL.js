    /*
      Say hallo to the main document in our little creation! This is where we will add the scene, 
      where the objects will be made, and where the camera will be moved. 

      I will explain what -I- have done here, as for what gl.XXX does and so on, I suggest a tutorial. It's basic stuff
      and not basic stuff I have enough controll over to teach anyone else. When I come back and read it, I will know my
      share, but I will probably have to read up on things to. 
    */

    var gl;
    function initGL(canvas) 
	{
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }

    function initScene() 
	{
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		    mat4.identity(pMatrix);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, [1, 1, -7.0]);


        mat4.translate(mvMatrix, [translasjonX, translasjonY, translasjonZ]);


    }

    var pwgl={};

    function draw() {  //This is our on frame loop. :)

        //Starting some functions... dont want it all in here now do we? 
        animate();
        movingObjects();
        staticObjects();
        pwgl.requestId = requestAnimFrame(draw); //Here is where it goes to the next frame. To get this, we needed the 
                                                 //basic "webgl-utils.js" 

        //This is where we turn the camera! See how we can rotate it and everything? How neet!
        mat4.translate(mvMatrix, [ translasjonX, translasjonY, translasjonZ]);
        mat4.rotate(mvMatrix, rotasjonX, [ 1, 0, 0], mvMatrix);
        mat4.rotate(mvMatrix, rotasjonY, [ 0, 1, 0], mvMatrix);
        mat4.rotate(mvMatrix, rotasjonZ, [ 0, 0, 1], mvMatrix);

    }

    //So first things first. Lets make the moving objects. (It doesnt really matter what we make first right now....)
    //We will make the objects by calling on the sript that make objects. This means that we dont have to make one and 
    //one object, but instead we can write two simple function calls, and add values to the functions! 
    //("Illy did you make this system yourself?" "Why yes! thanks for notesing") 
var doorPos = 0;
    function movingObjects() {
      //The object has been spawned as a small object. To mold it into the object 
      //you need, use the "draw"object"" variables. You can not yet change colors.
        makePyramide();
        drawPyramide( 0, 1, 0,          //rotX, rotY, rotZ,
                      0, 0.6, 0,          //transX, transY, transZ,
                      5.5, 5.0, 5.5);   //scaleX, scaleY, scaleZ

        makeCube(); 
        drawCube( 1, 1, 1,      //rotX, rotY, rotZ,   
                  0, 0, 0,      //transX, transY, transZ, 
                  4, 9, 1);     //scaleX, scaleY, scaleZ
   
        makeElementBoxBuffer();
        drawElementBox( 0, 0, 0,   //rotX, rotY, rotZ,
                        0, -1.0, 0,   //transX, transY, transZ,
                        2, 2, 2);  //scaleX, scaleY, scaleZ 

        //Door - We see as a comment here what you can change. Door also has the "doorPos" this will change if you press O
        //this is so that we can open and close the door! How interactive we are! 
        makePlaneBuffer(1, 0.7, 0.2, 0.4, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(doorPos,-1,4.01,1,2,1); //transX, transY, transZ, scaleX, scaleY, scaleZ 
    }

    //As above, we have two functions that we ass values to, to make out objects. As you can see the priorety 
    //of what we can add is diferent. This is just cause I didnt want exessive amounts of variables. 
    //That could be added if you insisted. 
    function staticObjects() {

        //The coord system is just for orientation. No need to fancy it up. 
        makeCoordSystem();
        drawCoordSystem();

        makePlaneBuffer(1, 0.5, 0.0, 0.5, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(0,0,0,3,3,3); //transX, transY, transZ, scaleX, scaleY, scaleZ   

        makePlaneBuffer(2, 0.5, 0.5, 0.0, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(0,0,0,3,3,3); //transX, transY, transZ, scaleX, scaleY, scaleZ   

        makePlaneBuffer(2, 0.5, 0.5, 0.0, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(-6,0,0,3,3,3); //transX, transY, transZ, scaleX, scaleY, scaleZ 

        makePlaneBuffer(3, 0.5, 0.5, 0.5, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(0,-6,0,3,3,3); //transX, transY, transZ, scaleX, scaleY, scaleZ   

        //FrontWall
        //RightSide
        makePlaneBuffer(1, 0.2, 0.3, 0.9, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(2,-2,4,1,1,1); //transX, transY, transZ, scaleX, scaleY, scaleZ 

        makePlaneBuffer(1, 0.2, 0.3, 0.9, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(2,0,4,1,1,1); //transX, transY, transZ, scaleX, scaleY, scaleZ 

        makePlaneBuffer(1, 0.2, 0.3, 0.9, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(2,2,4,1,1,1); //transX, transY, transZ, scaleX, scaleY, scaleZ 

        //Midle
        makePlaneBuffer(1, 0.2, 0.3, 0.9, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(0,2,4,1,1,1); //transX, transY, transZ, scaleX, scaleY, scaleZ 

        //LeftSide
        makePlaneBuffer(1, 0.2, 0.3, 0.9, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(-2,-2,4,1,1,1); //transX, transY, transZ, scaleX, scaleY, scaleZ 

        makePlaneBuffer(1, 0.2, 0.3, 0.9, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(-2,0,4,1,1,1); //transX, transY, transZ, scaleX, scaleY, scaleZ 

        makePlaneBuffer(1, 0.2, 0.3, 0.9, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(-2,2,4,1,1,1); //transX, transY, transZ, scaleX, scaleY, scaleZ 
    }

  //We start our scene!
  function webGLStart()
	{
        //We make and clear the canvas. See tutorial noob
        var canvas = document.getElementById("illy-canvas");
        initGL(canvas);
        initShaders();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

  		  initScene();

        //The camera:
        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, [0.5, -2.5, -15.0]);

        //starts the draw thing. It has its own //stuff
        draw();

        //Calls the key up and key down. This is also dependant on an external script like the frameloop thing. 
        document.addEventListener('keydown', handleKeyDown, false);
        document.addEventListener('keyup', handleKeyUp, false);
  }

    //This will be used to move the camera.
    //Shouldnt have this many global variables, but you shouldnt smell, and here we both are!
    var rotasjonX = 0;
    var rotasjonY = 0;
    var rotasjonZ = 0;//-Math.PI/6;

    var translasjonX = 0.0;
    var translasjonY = 0.0;
    var translasjonZ = 0.0;

    //Lets move around and marvel at the nice boxes. 
    //We also have an o key (79) that will Ooooopen the door. If the door is open, it will close with the same key.
    var dOpened = false; 
    function handleKeyDown(event)
    {
      var delta = 0.05;
      console.log("keyCode=%d", event.keyCode); 
      
      switch(event.keyCode) {
        case 37: translasjonX += delta; break; // venstre
        case 38: translasjonY -= delta; break; // opp
        case 39: translasjonX -= delta; break; // høyre
        case 40: translasjonY += delta; break; // ned
        
        case 87: translasjonZ += delta; break; // w
        case 83: translasjonZ -= delta; break; // s

        case 68: rotasjonY -= delta; break; // d
        case 65: rotasjonY += delta; break; // a

        case 79: //o opening and closing the door.
        if (dOpened == false){
            doorPos -= delta;
        } else {
            doorPos += delta;
        }
        if (doorPos < -2){
          dOpened = true;
        }
        if (doorPos >= 0){
          dOpened = false;
        }
        break;  
    };

  }

    //Stops the actions started, from just continuing foreeeeeeeveeeeer. 
    function handleKeyUp(event)
      {
        translasjonX = 0;
        translasjonY = 0;
        translasjonZ = 0;

        rotasjonX = 0;
        rotasjonY = 0;
        rotasjonZ = 0;
      }
