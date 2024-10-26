const frag = `

#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float seed;

uniform sampler2D image;

varying vec2 v_texcoord;

vec2 aspect(vec2 uv, float texture_ratio, float canvas_ratio) {
    if (canvas_ratio < texture_ratio) {
        float diff = canvas_ratio / texture_ratio;
        uv.x *= diff;
        uv.x += (1.0 - diff) / 2.0;
    } else {
        float diff = texture_ratio / canvas_ratio;
        uv.y *= diff;
        uv.y += (1.0 - diff) / 2.0;
    }
    return uv;
}

void main() {
    vec2 uv = v_texcoord;

    float texture_ratio = 1200.0 / 1800.0;
    float canvas_ratio = u_resolution.x / u_resolution.y;
    
    vec2 coords = aspect(uv, texture_ratio, canvas_ratio); 
    coords = mix(vec2(0.2, 0.2), vec2(0.8, 0.8), coords);
    
    float blocks = 10.0;
    float x = floor(uv.x * blocks) / blocks;
    float y = floor(uv.y * blocks) / blocks;

       vec2 mouse = u_mouse / u_resolution;

    vec2 distortion = 0.1 * vec2(
        cos(u_time * 0.5 + x + y * 1.2 + mouse.x + mouse.y + seed),
        sin(u_time * 0.2 + x * 1.1 + y + mouse.x + mouse.y + seed)
    );
    
    vec4 color = texture2D(image, coords + distortion);
    gl_FragColor = color;
}

`;
