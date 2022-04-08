uniform float uTime;
uniform sampler2D uMask;

varying vec3 vColor;

void main()
{
      float a = texture2D(uMask , gl_PointCoord).r;
      gl_FragColor = vec4(vColor, a);
}