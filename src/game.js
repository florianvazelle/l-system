import * as dat from 'dat.gui';
import { System2D } from './objects/System2D';
import { System3D } from './objects/System3D';

import * as fractalPlant from './data/fractal-plant';

window.onload = () => {
	setup();
}

function setup() {
	setupGUI();
}

function setupGUI() {
	var system = new System3D(fractalPlant);
	var gui = new dat.GUI();

	var angleController = gui.add(system, 'angle', system.angle);
	angleController.onChange((value) => {
		system.setAngle(value);
	});

	gui.add(system, 'generate');
	gui.add(system, 'reset');
}
