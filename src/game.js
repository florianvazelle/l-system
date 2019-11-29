import * as dat from 'dat.gui'
import {
  MySystem
} from './objects/L-System'

window.onload = () => {
  setup();
}

// TODO : a deplacer
const tree1 = {
  alphabet: ['F'],
  constants: ['+', '-', '&', '^', '<', '>', '|', '[', ']'],
  axiom: 'F',
  rules: [{
    input: 'F',
    output: 'FF+[+F-F-F]-[-F+F+F]',
  }]
};

const tree2 = {
  alphabet: ['F', 'X'],
  constants: ['+', '-', '&', '^', '<', '>', '|', '[', ']'],
  axiom: 'X',
  rules: [{
    input: 'X',
    outputs: [{
      output: 'F[++X]F[-X]+X',
      probability: 0.2
    }, {
      output: 'F[+X]F[-X]+X',
      probability: 0.8
    }],
  }, {
    input: 'F',
    output: 'FF',
  }]
};

const tree3 = {
  alphabet: ['F', 'X'],
  constants: ['+', '-', '&', '^', '<', '>', '|', '[', ']'],
  axiom: 'X',
  rules: [{
    input: 'X',
    output: 'F+[[X]-X]-F[-FX]+X'
  }, {
    input: 'F',
    output: 'FF',
  }]
};

function setup() {
  setupGUI();
}

function setupGUI() {
  var text = new MySystem(tree3);
  var gui = new dat.GUI();

  /*
    var f1 = gui.addFolder('L-System');
    f1.add(text, 'alphabet');
    var axiomController = f1.add(text, 'axiom', text.alphabet);
    axiomController.onChange((value) => {
      text.setAxiom(value);
    });
    f1.add(text, 'rules');

    var f2 = gui.addFolder('Values');
    f2.add(text, 'len');
    f2.add(text, 'angle', 0, 360);
    f2.open();
  */

  var angleController = gui.add(text, 'angle', text.angle);
  angleController.onChange((value) => {
    text.setAngle(value);
  });

  gui.add(text, 'generate');
  gui.add(text, 'reset');
}