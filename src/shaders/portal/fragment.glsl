varying vec2 vUv;

uniform float uTime;
uniform vec3 uInnerColor;
uniform vec3 uOuterColor;

#pragma glslify:noise = require('../partials/noise.glsl')

void main()
{
      // Displace UV by adding perlin nouise
      vec2 displacedUv = vUv + noise(vec3(vUv * 7.0, uTime * 0.1));

      // Perlin noise
      float strength = noise(vec3(displacedUv * 5.0, uTime * 0.2));

      // Outer glow
      float outerGlow = distance(vUv, vec2(0.5)) * 5.0 - 1.4;
      strength += outerGlow;

      // Step 
      strength += step(-0.2, strength) * 0.8;

      // Clamp
      strength = clamp(strength, 0.0, 1.0);

      // Final Color
      vec3 color = mix(uInnerColor, uOuterColor, strength);
      gl_FragColor = vec4(color, 1.0);
}