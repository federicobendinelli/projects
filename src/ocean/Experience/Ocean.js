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

            this.setRayCaster()
            this.setGeometry()
            this.setMaterial()
            this.setInstance()
            this.setDebug()

      }

      setRayCaster()
      {
            this.touchPosition = new THREE.Vector3();

            this.mousePosition = new THREE.Vector2()
            this.raycaster = new THREE.Raycaster()

            var onPointerMove = ( event )  => {

                  this.mousePosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                  this.mousePosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            
            }
            
            window.addEventListener( 'pointermove', onPointerMove );

      }

      setDebug()
      {
            if (!this.debug) return console.warn('no debug enabled');

            const folder = this.debug.addFolder({
                  title:'ocean',
            })

            folder.addInput(
                  this.material.uniforms.uHeight,
                  'value',
                  { min: 0 , max: 3 , label:'uHeight' }
            )

            folder.addInput(
                  this.material.uniforms.uOceanCurrent,
                  'value',
                  { min: 0 , max: 3 , label:'uOceanCurrent' }
            )

            folder.addInput(
                  this.material.uniforms.uMoveStrength,
                  'value',
                  { min: 0 , max: 3 , label:'uMoveStrength' }
            )
      }

      setGeometry()
      {
            this.geometry = new THREE.PlaneGeometry(10 , 10 , 128 , 128)
            this.geometry.rotateX(-Math.PI/2)

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
                        uHeight: { value: 0.3 },
                        uMoveStrength: { value: 0.3 },
                        uOceanCurrent: { value: 1.0 },
                        uTouchPosition: { value: this.touchPosition }
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
      
      
            if (this.raycaster) 
            {
                  this.raycaster.setFromCamera( this.mousePosition, this.camera.instance );

                  const intersects = this.raycaster.intersectObjects( this.scene.children );
            
                  
                  if (intersects.length) 
                  {
                        this.touchPosition = intersects[0].point
                        this.material.uniforms.uTouchPosition.value = this.touchPosition;
                  }

            }
      }
}