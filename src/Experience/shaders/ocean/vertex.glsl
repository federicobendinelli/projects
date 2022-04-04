varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uWaveRadius;
uniform float uWavesFrequency;
uniform float uWaveHeight;

attribute float aRandom;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')


vec3 getWaterPosition(vec3 _position)
{
      vec3 updatedPosition = _position;

      float circledPosition = (updatedPosition.z * 1.0 + updatedPosition.x );

      float xCos = cos( circledPosition * uWavesFrequency + uTime ) * uWaveRadius;
      float ySin = sin( circledPosition * uWavesFrequency + uTime )* uWaveRadius;

      updatedPosition.y += ySin * uWaveHeight;
      updatedPosition.x += xCos;
      updatedPosition.x -= (ySin * 3.0);


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