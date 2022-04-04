import * as THREE from 'three'
import Experience from './Experience'


import vertexShader from './shaders/ocean/vertex.glsl'
import fragmentShader from './shaders/ocean/fragment.glsl'


export default class Ocean
{
      constructor() 
      {

            this.expirience = new Experience()
            this.scene = this.expirience.scene
            this.camera = this.expirience.camera
            this.debug = this.expirience.debug
            this.time = this.expirience.time

            this.setGeometry()
            this.setMaterial()
            this.setInstance()
            this.setDebug()

      }


      setDebug()
      {
            if (!this.debug) return console.warn('no debug enabled');

            const folder = this.debug.addFolder({
                  title:'ocean',
            })

            folder.addInput(
                  this.material.uniforms.uWaveRadius,
                  'value',
                  { min: 0 , max: 3 , label:'uWaveRadius' }
            )

            folder.addInput(
                  this.material.uniforms.uWavesFrequency,
                  'value',
                  { min: 0 , max: 3 , label:'uWavesFrequency' }
            )

            folder.addInput(
                  this.material.uniforms.uWaveHeight,
                  'value',
                  { min: 0 , max: 3 , label:'uWaveHeight' }
            )

      }

      setGeometry()
      {
            this.geometry = new THREE.PlaneGeometry(10 , 10 , 128 , 128)
            this.geometry.rotateX(-Math.PI/2)


            const randomWaveArray = new Float32Array(128 * 128)

            for (let i = 0; i < randomWaveArray.length; i++) {
                  randomWaveArray [ i ] = Math.random()     
                  // randomWaveArray [ i * 3 + 2 ] = Math.random()                               
            }

            this.geometry.setAttribute('aRandom' , new THREE.BufferAttribute(randomWaveArray , 1))

      }

      setMaterial()
      {

            this.material = new THREE.ShaderMaterial({
                  transparent: true,
                  depthTest: false,

                  vertexShader: vertexShader,
                  fragmentShader: fragmentShader,

                  uniforms: {
                        uTime: { value: 0.0 },

                        uWaveRadius: { value: 0.3 },
                        uWavesFrequency: { value: 1.0 },

                        uWaveHeight: { value: 1.0 }
                  },

                  wireframe:true,
            })

      }



      setInstance()
      {

            this.instance = new THREE.Mesh(this.geometry , this.material)

            this.scene.add( this.instance )


      }

      update()
      {
            this.material.uniforms.uTime.value = this.time.elapsed / 400
      
      
      }
}