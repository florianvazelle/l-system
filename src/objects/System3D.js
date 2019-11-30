import * as THREE from 'three';
import { deg2rad } from '../util';
import { LSystem } from './LSystem'

export class System3D extends LSystem {
    constructor(tree) {
        super(tree)
    }
    
    draw() {
        this.configThree.clearScene();
        let geometry = new THREE.Geometry();
        let matrix = new THREE.Matrix4().makeTranslation(0, -this.configThree.height / 20, 0);
        let angle = deg2rad(this.angle);

        // Creation des matrices de rotation
        var RU = (angle) => {
            angle = deg2rad(angle);
            let cos = Math.cos(angle);
            let sin = Math.sin(angle);

            let ru = new THREE.Matrix4();
            ru.set(cos, sin, 0, 0,
                -sin, cos, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);
            return ru;
        }

        var RL = (angle) => {
            angle = deg2rad(angle);
            let cos = Math.cos(angle);
            let sin = Math.sin(angle);

            let rl = new THREE.Matrix4();
            rl.set(cos, 0, -sin, 0,
                0, 1, 0, 0,
                sin, 0, cos, 0,
                0, 0, 0, 1);
            return rl;
        }

        var RH = (angle) => {
            angle = deg2rad(angle);
            let cos = Math.cos(angle);
            let sin = Math.sin(angle);

            let rh = new THREE.Matrix4();
            rh.set(1, 0, 0, 0,
                0, cos, -sin, 0,
                0, sin, cos, 0,
                0, 0, 0, 1);
            return rh;
        }

        let listMat = [];

        const myTranslate = new THREE.Matrix4().makeTranslation(0, this.len, 0);
        const matRotatZ1 = new THREE.Matrix4().makeRotationZ(angle);
        const matRotatZ2 = new THREE.Matrix4().makeRotationZ(-angle);

        for (var i = 0; i < this.sentence.length; i++) {
            let letter = this.sentence.charAt(i);
            if (letter === 'F') {
                // draw a line
                let orig = new THREE.Vector3(0, 0, 0);
                let dest = new THREE.Vector3(0, this.len, 0);
                orig.applyMatrix4(matrix);
                dest.applyMatrix4(matrix);
                geometry.vertices.push(orig);
                geometry.vertices.push(dest);
                matrix.multiply(myTranslate);
            } else if (letter === 'X') {
                // draw a line ending in a leaf
                // TODO : ending in a leaf
                let orig = new THREE.Vector3(0, 0, 0);
                let dest = new THREE.Vector3(0, this.len, 0);
                orig.applyMatrix4(matrix);
                dest.applyMatrix4(matrix);
                geometry.vertices.push(orig);
                geometry.vertices.push(dest);
                matrix.multiply(myTranslate);
            } else if (letter == "+") {
                matrix.multiply(RU(this.angle));
            } else if (letter == "-") {
                matrix.multiply(RU(-this.angle));
            } else if (letter == "&") {
                matrix.multiply(RL(this.angle));
            } else if (letter == "^") {
                matrix.multiply(RL(-this.angle));
            } else if (letter == "/") {
                matrix.multiply(RH(this.angle));
            } else if (letter == "\\") {
                matrix.multiply(RH(-this.angle));
            } else if (letter == "|") {
                matrix.multiply(RU(180));
            } else if (letter == "[") {
                listMat.push(matrix.clone());
            } else if (letter == "]") {
                matrix = listMat.pop();
            }
        }

        let line = new THREE.LineSegments(geometry, this.configThree.material);
        this.configThree.scene.add(line);
    }
}