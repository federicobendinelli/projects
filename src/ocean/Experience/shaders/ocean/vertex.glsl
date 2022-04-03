varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uHeight;
uniform float uMoveStrength;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')


vec3 getWaterPosition(vec3 _position)
{
      vec3 updatedPosition = _position;

      float waveSin = sin(updatedPosition.z + cos(updatedPosition.x) + (uTime)) * uHeight;
      float waveCos = cos(updatedPosition.z + sin(updatedPosition.x) + (uTime)) * uHeight;


      updatedPosition.y += waveSin;
      updatedPosition.y += waveCos;


      return updatedPosition;
}

void main()
{

      vec4 modelPosition = modelMatrix * vec4(getWaterPosition(position) , 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;

      gl_Position = projectionMatrix * viewPosition;

      vUv = uv;
      vPosition = getWaterPosition(position);
}