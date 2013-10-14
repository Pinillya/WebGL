/*
Im working on making a sircle... I have come as fare as making a document with the pyramide code in it. Oooooh how adwanced! 
*/

    var pyramidePositionBuffer, pyramideColorBuffer;
    function makePyramide() 
	{
        pyramidePositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidePositionBuffer);
		    var vertices = [
            // Front face
             0.0,  1.0,  0.0,
             0.0,  0.0,  1.0,
            -1.0,  0.0,  0.0,
            // Right face
             0.0,  1.0,  0.0,
             1.0,  0.0,  0.0,
             0.0,  0.0,  1.0,
            // Back face
             0.0,  1.0,  0.0,
             0.0,  0.0, -1.0,
            -1.0,  0.0,  0.0,
            // Left face
             0.0,  1.0,  0.0,
             1.0,  0.0,  0.0,
             0.0,  0.0, -1.0,
		];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        pyramidePositionBuffer.itemSize = 3;
        pyramidePositionBuffer.numItems = 12;

        pyramideColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramideColorBuffer);
        var colors = [
            // Front face
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            // Right face
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            // Back face
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            // Left face
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        pyramideColorBuffer.itemSize = 4;
        pyramideColorBuffer.numItems = 12;
    }
    var rPyramide = 0;
    var rBox = 45;

	function drawPyramide(rotX, rotY, rotZ, transX, transY, transZ, scaleX, scaleY, scaleZ) 
	{
        mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(rPyramide), [rotX, rotY, rotZ]); 
        mat4.scale(mvMatrix, [scaleX, scaleY, scaleZ]); 
        mat4.translate(mvMatrix, [transX, transY, transZ]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidePositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidePositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, pyramideColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute2, pyramideColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    		setMatrixUniforms();
    		gl.drawArrays(gl.TRIANGLES, 0, pyramidePositionBuffer.numItems);
        mvPopMatrix();
	}

    /*

    // Mobile Systemer H2013
    // subDivide.js 
    //
    // Approksimasjon av kule med rekursiv tetraeder subdivisjon
    // Se [Angel] Kap 6.6, side 315-317
    
        var unitBallVertices = [
             0.0,       0.0,        1.0,
             0.0,       0.942809,   -0.333333,
            -0.816497,  -0.471405,  -0.333333,
             0.816497,  -0.471405,  -0.333333
        ];
        var n;              // rekursjonsnivåer
        
        var sluttVertices = []; // Lager en stack
        
        function abs(x)
        {
            if (x>=0.0)
                return x;
            else return (-x);
        }
        
        // Parametre inn: xyz koordinatene til et triangle v1, v2, v3 ccw
        // Bevarer orienteringen av hjørnene
        var tell=0;
        function lagTriangel(v1, v2, v3)
        {
            for (var i=2; i>=0; i--)
                sluttVertices.push(v3[i]);
            for (var i=2; i>=0; i--)
                sluttVertices.push(v2[i]);
            for (var i=2; i>=0; i--)
                sluttVertices.push(v1[i]);  
                
            var w = subtract(v2, v1); // gir v1v2
            var x = subtract(v3, v1); // gir v1v3
            var y = cross(w, x);
            var l = y[0]*y[0]+y[1]*y[1]+y[2]*y[2];
            l = Math.sqrt(l);
            tell++
            //console.log("lagtriangel", l, tell);
        }
    
        // Egen normaliseringsfunksjon
        function normalize(p)
        {
            var d=0.0;
            
            for (var i=0; i<3; i++)
                d = d + p[i]*p[i];
            d = Math.sqrt(d);
            if (d > 0.0)
                for (var i=0; i<3; i++)
                    p[i] = p[i]/d;
        }
        
        function cross(u, v)
        {
            var w = [0.0, 0.0, 0.0];
            w[0] =  u[1]*v[2] - u[2]*v[1];
            w[1] =  u[2]*v[0] - u[0]*v[2];
            w[2] =  u[0]*v[1] - u[1]*v[0];
            return w;
        }
        function subtract(u, v)
        {
            var w = [0.0, 0.0, 0.0];
            w[0] =  u[0] - v[0];
            w[1] =  u[1] - v[1];
            w[2] =  u[2] - v[2];
            return w;       
        }
        
        // Rekursiv subdivisjon av triangel
        function subDivide(a, b, c, n)
        {
            // console.log("n, a, b, c", n, a, b, c);
            var v1 = [0.0, 0.0, 0.0];
            var v2 = [0.0, 0.0, 0.0];
            var v3 = [0.0, 0.0, 0.0];

            if (n>0)
            {
                for (var j=0; j<3; j++) v1[j] = a[j]+b[j];
                    normalize(v1);
                for (var j=0; j<3; j++) v2[j] = a[j]+c[j];
                    normalize(v2);
                for (var j=0; j<3; j++) v3[j] = c[j]+b[j];
                    normalize(v3);
    
                subDivide(a, v1, v2, n-1);
                subDivide(c, v2, v3, n-1);
                subDivide(b, v3, v1, n-1);
                // console.log("n, v3, v2, v1: ", n, v3, v2, v1);
                subDivide(v3, v2, v1, n-1);
            }
            else
            {
                lagTriangel(a, b, c);
            }

        }

        // Hvis n == 0, vil funksjonen (lagTriangel i subDivide) lage 4 triangler
        // med dupliserte vertexer
        function tetraUnitBall(n)
        {
            var v0 = [0.0, 0.0, 1.0];
            var v1 = [0.0, 0.942809, -0.333333];
            var v2 = [-0.816497, -0.471405, -0.333333];
            var v3 = [0.816497, -0.471405, -0.333333];

            subDivide(v0, v1, v2, n);
            subDivide(v0, v2, v3, n);
            subDivide(v0, v3, v1, n);
            subDivide(v3, v2, v1, n);
    
             
            if ( n>=0 )
                return new Float32Array(sluttVertices);
            
        }




    */
