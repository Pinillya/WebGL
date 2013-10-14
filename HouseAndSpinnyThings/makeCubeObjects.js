/*
  Behold as a box is born! It can be shaped and molded and be made into a big spinning cube of doooooooooom
  But dont take my word for it! Let me show you! 
*/

  //As you may see here, when we make the base of the cube, we dont want any extra clutter. We just want 
  //To make a small fine cube that we can mold into something nice. This is done in "drawCube"
    var boxPositionBuffer, boxColorBuffer;
    function makeCube() 
	{
      //We could just make one variable and make all of the -0.1 just say -withB. However I didnt find it THAT important to
      //go over everything and change it. I will do it later one day...
      var withB = 0.1 ;
      var hightB = -0.1;

        /*~~~~~~~~~~***Box***~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        boxPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, boxPositionBuffer);
		    vertices = [
            //Front
      			  hightB, hightB, hightB,
      			  withB,  hightB, hightB,
      			  hightB, withB,  hightB,
              withB,  withB,  hightB,
             //Left
              withB,  withB,  hightB,
              withB, hightB, hightB,
              withB, withB, withB,
              withB, hightB, withB,
             //Right
              hightB, withB, hightB,
              hightB, withB, withB,
              hightB, hightB, hightB,
              hightB, hightB, withB,
             //Back 
              hightB, hightB, withB,
              withB,  hightB, withB,
              hightB, withB,  withB,
              withB,  withB,  withB, 
              //Topp 
              withB,  withB,  withB,
              withB,  withB,  hightB,
              hightB, withB,  withB,
              hightB, withB,  hightB,
              //Bottom 
              withB,  hightB,  withB,
              withB,  hightB,  hightB,
              hightB, hightB,  withB,
              hightB, hightB,  hightB,
		];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        boxPositionBuffer.itemSize = 3;
        boxPositionBuffer.numItems = 24;

        boxColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, boxColorBuffer);
        colors = [
            //Front
      			0.0, 1.0, 0.0, 1.0,
      			0.0, 1.0, 0.0, 1.0,
      			0.0, 1.0, 0.0, 1.0,
      			0.0, 1.0, 0.0, 1.0,
             //Left
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
             //Back
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
             //Right
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            //Topp
            1.0, 0.5, 1.0, 1.0,
            1.0, 0.5, 1.0, 1.0,
            1.0, 0.5, 1.0, 1.0,
            1.0, 0.5, 1.0, 1.0,
             //Bottom
            0.0, 1.0, 1.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        boxColorBuffer.itemSize = 4;
        boxColorBuffer.numItems = 24;
    }


  var rBox = 45; 

  //Ok so here we draw the cube. We have a few different exiting options here!
  //The numbers for the different numbers for the variables are the numbers you gave the function when you called it. 
  // We then use the numbers in the mat4.translate/rotate/scale. And BOOOM! you have a new lovley box. 
	function drawCube(rotX, rotY, rotZ, transX, transY, transZ, scaleX, scaleY, scaleZ) 
	{
        /*~~~~~~~~~~***Box***~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

        mvPushMatrix();
        mat4.rotate(mvMatrix, rBox, [rotX, rotY, rotZ]); 
        mat4.translate(mvMatrix, [transX, transY, transZ]); 
        mat4.scale(mvMatrix, [scaleX, scaleY, scaleZ]);

        gl.bindBuffer(gl.ARRAY_BUFFER, boxPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, boxPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, boxColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, boxColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    		setMatrixUniforms();
    		gl.drawArrays(gl.TRIANGLE_STRIP, 0, boxPositionBuffer.numItems);
        mvPopMatrix();
	}