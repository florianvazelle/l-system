import * as THREE from 'three';

export class MyThree {
  constructor() {
    this.width = 400;
    this.height = 400;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 500);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);

    this.scene = new THREE.Scene();

    this.material = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });
    this.material2 = new THREE.LineBasicMaterial({
      color: 0x00ffff
    });
  }

  clearScene() {
    this.scene.children.forEach(function(object) {
      this.scene.remove(object);
    }.bind(this));
  }
}