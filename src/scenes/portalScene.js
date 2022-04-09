import * as THREE from "three";
import * as dat from 'lil-gui'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import portalVertexShader from '../shaders/portal/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'

var Portal =(function(active)
{
      if (!active) return
      /** 
       * Base
       */

      // Canvas
      const canvas = document.querySelector("canvas.webgl");

      // Scene
      const scene = new THREE.Scene();


      var useDebug = true;


      /**
       * Portal
       */

      const portalMap = new THREE.TextureLoader().load('https://assets.codepen.io/22914/baked-02.jpg');
      portalMap.encoding = THREE.sRGBEncoding;
      portalMap.flipY = false;


      const loader = new GLTFLoader();

      const colors = {
            inner: '#934f9a',
            outer: '#602a7c',

      }

      const portalLightMaterial = new THREE.ShaderMaterial({
            vertexShader: portalVertexShader, 
            fragmentShader: portalFragmentShader,

            blending: THREE.AdditiveBlending,

            uniforms: {
                  uTime: {value: 0.0},

                  uInnerColor: {
                        value: new THREE.Color(colors.inner)
                  },
                  uOuterColor: {
                        value: new THREE.Color(colors.outer)
                  },
            },

            side:2,
      })

      const poleLightMaterial = new THREE.MeshBasicMaterial({ color: "#f0bf94" });


      loader.load('/assets/Portal.glb' , (gltf) =>
      {
            const portalMesh = gltf.scene.children.find((child) => child.userData.name === "baked");
            portalMesh.material = new THREE.MeshBasicMaterial({map: portalMap});

            const portalLight = gltf.scene.children.find(
                  (child) => child.userData.name === "portalCircle"
            );

            gltf.scene.children
            .filter((child) => child.name.includes("lampLight"))
            .forEach((light) => {
            light.material = poleLightMaterial;
            });

            console.log(gltf.scene.children);
            portalLight.material = portalLightMaterial;


            scene.add(gltf.scene)
      })


      /**
       * Sizes
       */
      const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
      };

      window.addEventListener("resize", () => 
      {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });



      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            100
      );
      camera.position.x = 3;
      camera.position.y = 3;
      camera.position.z = 3;
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderOptions = {
            clearColor: '#000000'
      }

      const renderer = new THREE.WebGLRenderer({
            canvas: canvas
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;


      /**
       * Debug
       */

      function debug() 
      {
            if (!useDebug) return console.warn('No debug enabled')
            const gui = new dat.GUI();
            gui.domElement.style.width = '375px'


            gui
            .addColor(
                  colors,
                  'inner'
            )
            .onChange((v) =>
            {
                  portalLightMaterial.uniforms.uInnerColor.value = new THREE.Color(v);
            })

            gui
            .addColor(
                  colors,
                  'outer'
            )
            .onChange((v) =>
            {
                  portalLightMaterial.uniforms.uOuterColor.value = new THREE.Color(v);
            })

            gui
            .addColor(
                  renderOptions,
                  'clearColor'
            )
            .onChange((v) =>
            {
                  renderer.setClearColor(v);
            })

      }

      debug()


      /**
       * Animate
       */
      const clock = new THREE.Clock();

      const tick = () => 
      {
            const elapsedTime = clock.getElapsedTime();
            portalLightMaterial.uniforms.uTime.value = elapsedTime;


            // Update controls
            controls.update();

            // Render
            renderer.render(scene, camera);

            // Call tick again on the next frame
            window.requestAnimationFrame(tick);

      };

      tick();
     
})(window.location.hash == '#debug+portal')

export default Portal;