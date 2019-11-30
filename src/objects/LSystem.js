import { randexec } from '../util'
import { MyThree } from './Three'

export class LSystem {
	constructor(tree) {
		// Setup tree data
		this.alphabet = tree.alphabet;
		this.constants = tree.constants;
		this.axiom = tree.axiom;
		this.rules = tree.rules;

		this.sentence = this.axiom;
		this.len = 10;
		this.angle = 20;

		// Setup the WebGL screen
		this.configThree = new MyThree();
		this.animate();
	}

	setAngle(newAngle) {
		this.angle = newAngle;
	}

	setAxiom(value) {
		this.axiom = value;
		this.sentence = value;
	}

	reset() {
		this.sentence = this.axiom;
		this.len = 10;
	}

	generate() {
		this.len *= 0.5;
		let next_sentence = '';
		for (let i = 0; i < this.sentence.length; i++) {
			let letter = this.sentence.charAt(i);
			let found = false;
			for (let j = 0; j < this.rules.length; j++) {
				if (letter == this.rules[j].input) {
					found = true;
					if (this.rules[j].hasOwnProperty('outputs')) {
						next_sentence += randexec(this.rules[j].outputs);
					} else {
						next_sentence += this.rules[j].output;
					}
					break;
				}
			}
			if (!found) {
				next_sentence += letter;
			}
		}
		this.sentence = next_sentence;
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));
		this.configThree.controls.update();
		this.draw()
		this.configThree.renderer.render(this.configThree.scene, this.configThree.camera);
	}
}