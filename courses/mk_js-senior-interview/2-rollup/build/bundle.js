(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function fn1() {
  console.log('fn1');
}

function fn2() {
  console.log('fn2');
}

var x1 = {
  x1: 1
};

fn1();
fn2();
console.log(x1);

// [1, 2, 3].map(item => item + 1)

})));
