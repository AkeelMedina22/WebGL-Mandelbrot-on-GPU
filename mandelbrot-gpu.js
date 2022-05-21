"use strict";

let gl;  // WebGL "context"
let pixellen;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available" );

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0 , 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Compute data.
    let vertices = [];

    // Number of Pixels.
    pixellen = canvas.height * canvas.width;

    for (var i = 0; i < canvas.height; i++)
    {
        // Mapping of each pixel to relevant point from -2 to 2, where mandelbrot occurs.
        var x = map_point(0, canvas.height, -2, 2, i);
        
        for (var j = 0; j < canvas.width; j++)
        {
            var y = map_point(0, canvas.width, -2, 2, j);

            // Our canvas only takes from -1 to 1, so we map each point previously mapped
            vertices.push(vec2(map_point(-2, 2, -1, 1, x), map_point(-2, 2, -1, 1, y)));
        }
    }
    
    // Load the data into the GPU and bind to shader variables.
    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    // Associate out shader variables with our data buffer
    let vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    var locationOfnt = gl.getUniformLocation(program, "iter");
    gl.useProgram(program);
    gl.uniform1f(locationOfnt, 20.0);

    document.getElementById("myRange").oninput = function() 
    {
        gl.uniform1f(locationOfnt, this.value);
        render();
    }

    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, pixellen );

}

