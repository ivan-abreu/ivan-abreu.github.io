
class Sketch {
  constructor(opts) {
    this.scene = new THREE.Scene();
    this.vertex = `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}`;
    this.fragment = opts.fragment;
    this.uniforms = opts.uniforms;
    this.renderer = new THREE.WebGLRenderer();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.duration = opts.duration || 1;
    this.debug = opts.debug || false
    this.easing = opts.easing || 'easeInOut'


    this.container = document.getElementById("slider");

    this.imagesDic = {
      "portada00": "../images/portada00B.jpg", // 0
      "portada01": "../images/portada01.jpg", // 0
      "portada02": "../images/portada02.jpg", // 1
      "portada03": "../images/portada04.jpg", // 2
      "gradacion1": "../images/gradationrv.jpg", // 3
      "gradacion2" : "../images/gradationva.jpg", // 5
      "gradacion3" : "../images/gradationblancomorado2.jpg", // 5
      "gradacion4" : "../images/gradationblancoverde2.jpg", // 5
      "gradacionblancoverde": "../images/gradationblancoverde.jpg",
      "gradacionblancomorado": "../images/gradationblancomorado.jpg",
      "gradacionrojomoradosat": "../images/gradationrv.jpg", // 3 
      "elles" : "../images/elles00.jpg", // 4
      "bicicleta": "../images/bicicleta.jpg", // 24   
      "cierrefisico":"../images/pese-al-cierre-fisico.jpg", // 32
      "centroamerica": "../images/gradationcentroamerica.jpg", // 9
      "comunidad01": "../images/comunidad01.jpg", // 20
      "comunidad02": "../images/comunidad02.jpg", // 21
      "comunidad03": "../images/comunidad04.jpg", // 23
      "cadenasdeviolencia": "../images/estas-cadenas.jpg", // 33
      "juancarlos01": "../images/by-juancarlos01.jpg", // 26
      "juancarlos02": "../images/juan-carlos-02.jpg", // 16
      "metrobalderas": "../images/metro-balderas.jpg", // 25
      "potenciallgbti": "../images/potenciallgbt.jpg", // 8
      "mario1": "../images/mario_01.jpg", // 10
      "mario2": "../images/mario_02.jpg", // 11
      "mario3": "../images/mario_04.jpg", // 11
      "dianamario" : "../images/diana_mario.jpg", // 17
      "diana1": "../images/diana_01.jpg", // 13
      "diana2": "../images/diana_03.jpg", // 18
      "samantha1": "../images/es-lo-que-le-digo-a-samantha.jpg", // 27
      "apapachadora": "../images/la-comunidad-somos-muy-apapachadora.jpg", // 29
      "whatsapp1": "../images/nos-seguiamos-contactando.jpg", // 30
      "oportunidad": "../images/la-pandemia-me-dio-la-oportunidad.jpg", // 34
      "exploras": "../images/si-te-restringen-algo-pues-exploras.jpg", // 31
      "aves": "../images/aves.jpg" // 28
    }

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 2);
    this.time = 0;
    this.current = 0;
    this.textures = [];
    this.texturesDic = {};

    this.paused = true;
    this.initiate(()=>{
      this.setupResize();
      this.settings();
      this.addObjects();
      this.resize();
      this.play();
      d3.select("#scrolldowniconwrapper").style("display", "initial")
      d3.select(".menuicon").style("display", "initial")
      d3.select(".tooltip").style("display", "initial")
      d3.select("#cargando").style("display", "none")
      enableScroll();
      playAnimacionPortada();
    })
    


  }

  initiate(cb){
    
    const promises = [];
    let that = this;

    for (const imagename in this.imagesDic) {
      console.log ( this.imagesDic[imagename] )
      let promise = new Promise(resolve => {
        that.texturesDic[imagename] = new THREE.TextureLoader().load( this.imagesDic[imagename] , resolve );
      });
      promises.push(promise);
    }
    

    Promise.all(promises).then((result) => {
      //console.log( result );
      cb();
      console.log( "listo" );
    }).catch( (error) => {
      console.log( error)
    });
  }


  settings() {
    let that = this;
    if(this.debug) this.gui = new dat.GUI();
    this.settings = {progress:0.5};

    Object.keys(this.uniforms).forEach((item)=> {
      this.settings[item] = this.uniforms[item].value;
      if(this.debug) this.gui.add(this.settings, item, this.uniforms[item].min, this.uniforms[item].max, 0.01);
    })
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    

    // image cover
    this.imageAspect = this.texturesDic["portada00"].image.height/this.texturesDic["portada00"].image.width;
    let a1; let a2;
    if(this.height/this.width>this.imageAspect) {
      a1 = (this.width/this.height) * this.imageAspect ;
      a2 = 1;
    } else{
      a1 = 1;
      a2 = (this.height/this.width) / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    const dist  = this.camera.position.z;
    const height = 1;
    this.camera.fov = 2*(180/Math.PI)*Math.atan(height/(2*dist));

    this.plane.scale.x = this.camera.aspect;
    this.plane.scale.y = 1;

    this.camera.updateProjectionMatrix();


  }

  addObjects() {
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        progress: { type: "f", value: 0 },
        border: { type: "f", value: 0 },
        intensity: { type: "f", value: 0 },
        scaleX: { type: "f", value: 40 },
        scaleY: { type: "f", value: 40 },
        transition: { type: "f", value: 40 },
        swipe: { type: "f", value: 0 },
        width: { type: "f", value: 0 },
        radius: { type: "f", value: 0 },
        texture1: { type: "f", value: this.texturesDic["portada00"] },
        texture2: { type: "f", value: this.texturesDic["portada01"] },
        displacement: { type: "f", value: new THREE.TextureLoader().load('../img/disp1.jpg') },
        resolution: { type: "v4", value: new THREE.Vector4() },
      },
      // wireframe: true,
      vertexShader: this.vertex,
      fragmentShader: this.fragment
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
    this.render();
  }


  transitionToImagename(imgname) {
    this.isRunning = true;
    let len = Object.keys(this.texturesDic).length;
    let nextTexture = this.texturesDic[imgname];
    this.material.uniforms.texture2.value = nextTexture;
    let tl = new TimelineMax();
    tl.to(this.material.uniforms.progress,this.duration,{
      value:1,
      ease: Power2[this.easing],
      onComplete:()=>{
        this.current = imgname;
        this.material.uniforms.texture1.value = nextTexture;
        this.material.uniforms.progress.value = 0;
        this.isRunning = false;
    }})
  }

  render() {
    if (this.paused) return;
    this.time += 0.05; // 0.05
    this.material.uniforms.time.value = this.time;

    Object.keys(this.uniforms).forEach((item)=> {
      this.material.uniforms[item].value = this.settings[item];
    });

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

