// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/Snake.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snake = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Snake =
/*#__PURE__*/
function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.coords = [{
      x: 100,
      y: 150
    }, {
      x: 90,
      y: 150
    }, {
      x: 80,
      y: 150
    }, {
      x: 70,
      y: 150
    }, {
      x: 60,
      y: 150
    }];
    this.fillColor = 'lightgreen';
    this.borderColor = 'darkgreen';
    this.vx = 10;
    this.vy = 0;
    this.direction = 'RIGHT';
  }

  _createClass(Snake, [{
    key: "resetCoords",
    value: function resetCoords() {
      this.coords = [{
        x: 100,
        y: 150
      }, {
        x: 90,
        y: 150
      }, {
        x: 80,
        y: 150
      }, {
        x: 70,
        y: 150
      }, {
        x: 60,
        y: 150
      }];
      this.vx = 10;
      this.vy = 0;
      this.direction = 'RIGHT';
    }
  }, {
    key: "advance",
    value: function advance(game) {
      var newHead = {
        x: this.coords[0].x + this.vx,
        y: this.coords[0].y + this.vy
      };
      this.coords.unshift(newHead);

      if (!game.isCollision()) {
        if (newHead.x === game.food.coords.x && newHead.y === game.food.coords.y) {
          game.handleEatFood();
        } else {
          game.snake.coords.pop();
        }
      } else {
        throw "Collision...";
      }
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(keyCode) {
      var keyPressed = keyCode;
      var LEFT_KEY = 37;
      var RIGHT_KEY = 39;
      var UP_KEY = 38;
      var DOWN_KEY = 40;

      if (keyPressed === LEFT_KEY && this.direction !== 'RIGHT') {
        this.vx = -10;
        this.vy = 0;
        this.direction = 'LEFT';
      }

      if (keyPressed === UP_KEY && this.direction !== 'DOWN') {
        this.vx = 0;
        this.vy = -10;
        this.direction = 'UP';
      }

      if (keyPressed === RIGHT_KEY && this.direction !== 'LEFT') {
        this.vx = 10;
        this.vy = 0;
        this.direction = 'RIGHT';
      }

      if (keyPressed === DOWN_KEY && this.direction !== 'UP') {
        this.vx = 0;
        this.vy = 10;
        this.direction = 'DOWN';
      }
    }
  }]);

  return Snake;
}();

exports.Snake = Snake;
},{}],"lib/Food.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Food = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Food =
/*#__PURE__*/
function () {
  function Food() {
    _classCallCheck(this, Food);

    this.coords = {
      x: 50,
      y: 50
    };
    this.color = 'red';
  }

  _createClass(Food, [{
    key: "getRandomCoords",
    value: function getRandomCoords(canvasSize) {
      return [Math.floor(Math.random() * canvasSize / 10) * 10, Math.floor(Math.random() * canvasSize / 10) * 10];
    }
  }, {
    key: "getRandomAndUnusedCoords",
    value: function getRandomAndUnusedCoords(canvasWidth, canvasHeight, snake) {
      var rand = this.getRandomCoords(canvasWidth, canvasHeight);

      while (snake.coords.filter(function (coord) {
        return coord.x === rand[0] && coord.y === rand[1];
      }).length) {
        rand = this.getRandomCoords(canvasWidth, canvasHeight);
      }

      return rand;
    }
  }, {
    key: "randomlySetFood",
    value: function randomlySetFood(canvasWidth, canvasHeight, snake) {
      var coords = this.getRandomAndUnusedCoords(canvasWidth, canvasHeight, snake);
      this.coords.x = coords[0];
      this.coords.y = coords[1];
    }
  }]);

  return Food;
}();

exports.Food = Food;
},{}],"lib/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(snake, food, canvas) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Game);

    this.snake = snake;
    this.food = food;
    this.canvas = canvas;
    this.gameOver = true;
    this.score = 0;
    this.context = canvas.getContext("2d");
    this.settings = {
      bgColor: 'transparent',
      borderColor: 'black',
      speed: 40,
      scoreElem: options.scoreElem
    };
  }

  _createClass(Game, [{
    key: "previewGame",
    value: function previewGame() {
      this.clearCanvas();
      this.drawSnake();
      this.drawFood();
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.gameOver = false;
      this.score = 0;
      this.updateDOMScore();
      this.snake.resetCoords();
      this.food.randomlySetFood(this.canvas.width, this.canvas.height, this.snake);
      var gameStartEvent = new CustomEvent('gameStart');
      window.dispatchEvent(gameStartEvent);
      this.gameLoop();
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(keyCode) {
      if (this.gameOver) {
        this.startGame();
      } else {
        this.snake.changeDirection(keyCode);
      }
    }
  }, {
    key: "gameLoop",
    value: function gameLoop() {
      var self = this;
      setTimeout(function () {
        self.clearCanvas();

        try {
          self.snake.advance(self);
        } catch (e) {
          self.drawSnake();
          self.gameOver = true;
          var gameOverEvent = new CustomEvent('gameOver', {
            detail: {
              score: self.score
            }
          });
          window.dispatchEvent(gameOverEvent);
          return;
        }

        self.drawSnake();
        self.drawFood();
        self.gameLoop();
      }, self.settings.speed);
    }
  }, {
    key: "clearCanvas",
    value: function clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = this.settings.bgColor;
      this.context.strokestyle = this.settings.borderColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "drawSnake",
    value: function drawSnake() {
      var self = this;
      this.snake.coords.forEach(function (snakePart) {
        self.context.fillStyle = self.snake.fillColor;
        self.context.strokestyle = self.snake.borderColor;
        self.context.fillRect(snakePart.x, snakePart.y, 10, 10);
        self.context.strokeRect(snakePart.x, snakePart.y, 10, 10);
      });
    }
  }, {
    key: "drawFood",
    value: function drawFood() {
      this.context.fillStyle = this.food.color;
      this.context.fillRect(this.food.coords.x, this.food.coords.y, 10, 10);
    }
  }, {
    key: "isCollision",
    value: function isCollision() {
      var snakeHead = this.snake.coords[0];
      if (snakeHead.x < 0 || snakeHead.x >= this.canvas.width) return true;else if (snakeHead.y < 0 || snakeHead.y >= this.canvas.height) return true;

      var headlessSnake = _toConsumableArray(this.snake.coords);

      headlessSnake.shift();
      if (headlessSnake.filter(function (coords) {
        return coords.x === snakeHead.x && coords.y === snakeHead.y;
      }).length) return true;
      return false;
    }
  }, {
    key: "handleEatFood",
    value: function handleEatFood() {
      this.score++;
      this.updateDOMScore();
      this.food.randomlySetFood(this.canvas.width, this.canvas.height, this.snake);
    }
  }, {
    key: "updateDOMScore",
    value: function updateDOMScore() {
      if (this.settings.scoreElem !== undefined) {
        var scoreElem = document.getElementById(this.settings.scoreElem);
        scoreElem.textContent = this.score;
      }
    }
  }]);

  return Game;
}();

exports.Game = Game;
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _Snake = require("./lib/Snake.js");

var _Food = require("./lib/Food.js");

var _Game = require("./lib/Game.js");

//import {Camera} from './lib/Camera.js';
window.addEventListener('load', function () {
  var food = new _Food.Food();
  var canvas = document.getElementById("game-canvas"); //const camera = new Camera('game-cube', canvas.width);

  var snake = new _Snake.Snake();
  var options = {
    scoreElem: 'score'
  };
  var game = new _Game.Game(snake, food, canvas, options);
  game.clearCanvas();
  document.addEventListener("keydown", function (e) {
    game.handleKeyPress(e.keyCode);
  });
});
window.addEventListener('gameStart', function (e) {
  // e.target matches elem
  console.log(e);
  console.log('start event');
});
window.addEventListener('gameOver', function (e) {
  // e.target matches elem
  console.log(e);
  console.log('end event');
});
},{"./lib/Snake.js":"lib/Snake.js","./lib/Food.js":"lib/Food.js","./lib/Game.js":"lib/Game.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51638" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map