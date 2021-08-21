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
})({"app.js":[function(require,module,exports) {
"use strict"; /////////////////////
//change theme

var themeBtn = document.querySelector("#switch");
var headSwitch = document.querySelector(".heading__switch");
var backgroundImage = document.querySelector(".bg-image");
var iconMoon = document.querySelector(".heading__icon--moon");
var iconSun = document.querySelector(".heading__icon--sun");
themeBtn.addEventListener("click", function (e) {
  if (themeBtn.checked === true) {
    document.body.setAttribute("data-theme", "light");
    iconMoon.classList.remove("hidden");
    iconSun.classList.add("hidden");
  } else {
    document.body.setAttribute("data-theme", "");
    iconMoon.classList.add("hidden");
    iconSun.classList.remove("hidden");
  }
}); ////////////////////
// sortable list

var items = document.querySelectorAll(".list__item");
var el = document.getElementById("items");
new Sortable(el, {
  animation: 350,
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag"
}); //////////////////////
//adding new item in list

var inputField = document.querySelector(".input__field");
var inputBtn = document.querySelector(".input__button");
var listItem = document.querySelector("#list-item");
var itemsNum = document.querySelector(".items__num");
var menu = document.querySelector(".items__menu");
var itemsLeft = Number(itemsNum.innerText);
var num = 1;
inputField.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) addNewItem(inputField.value, num);
});

function addNewItem(str, digit) {
  if (!!str.trim()) {
    var clone = listItem.cloneNode(true);
    clone.childNodes[5].innerHTML = str;
    clone.classList.remove("hidden");
    clone.childNodes[1].id = "item-".concat(digit);
    clone.childNodes[3].htmlFor = "item-".concat(digit); //add event listener to close btn

    clone.childNodes[7].addEventListener("click", removeItem); //adding clone to DOM

    listItem.after(clone); //adding event listener to label

    clone.childNodes[3].addEventListener("click", completed);
    num++, itemsLeft++;
    itemsNum.innerText = itemsLeft;
    inputField.value = "";
    items = document.querySelectorAll(".list__item");
    addCurve(items); //remove top curve of menu

    if (menu.classList.contains("border-curve-all")) menu.classList.remove("border-curve-all");
  }
} ///////////////////////
//completed state


function completed(e) {
  var parent = e.target.parentElement;
  var words = e.target.parentElement.childNodes[5];
  var checkbox = e.target.parentElement.childNodes[1];

  if (checkbox.checked) {
    words.classList.remove("completed");
    parent.classList.add("active");
    itemsLeft++;
    itemsNum.innerText = itemsLeft;
  }

  if (!checkbox.checked) {
    words.classList.add("completed");
    parent.classList.remove("active");
    if (itemsLeft > 0) itemsLeft--;
    itemsNum.innerText = itemsLeft;
  }
} ////////////////////////
//removing item
//adding event listener to btn


function removeItem(e) {
  var parentDiv = e.target.parentElement;
  if (itemsLeft !== 0 && parentDiv.classList.contains("active")) itemsLeft--;
  itemsNum.innerText = itemsLeft;
  parentDiv.remove(); //add border radius to menu if all items are deleted

  var listItemAll = document.querySelectorAll(".list__item");
  if (listItemAll.length === 1) menu.classList.add("border-curve-all");
} /////////////////
//filtering


var allBtn = document.querySelector(".items__all");
var activeBtn = document.querySelector(".items__active");
var completedBtn = document.querySelector(".items__completed");
var allBtn2 = document.querySelector(".items__all--2");
var activeBtn2 = document.querySelector(".items__active--2");
var completedBtn2 = document.querySelector(".items__completed--2");
var clearBtn = document.querySelector(".items__clear");
var allItems; //adding event listeners

allBtn.addEventListener("click", showAll);
activeBtn.addEventListener("click", showActive);
completedBtn.addEventListener("click", showCompleted);
allBtn2.addEventListener("click", showAll);
activeBtn2.addEventListener("click", showActive);
completedBtn2.addEventListener("click", showCompleted);
clearBtn.addEventListener("click", clearCompleted);

function showActive() {
  showAll();
  var arr = [];
  allItems = document.querySelectorAll(".list__item");

  for (var i = 1; i < allItems.length; i++) {
    if (!allItems[i].classList.contains("active")) {
      allItems[i].classList.add("hidden");
    } else {
      arr.push(allItems[i]);
    }
  }

  if (arr.length > 0) borderCurve(arr[0]);
}

function showCompleted() {
  showAll();
  var arr = [];
  allItems = document.querySelectorAll(".list__item");

  for (var i = 1; i < allItems.length; i++) {
    if (allItems[i].classList.contains("active")) {
      allItems[i].classList.add("hidden");
    } else {
      arr.push(allItems[i]);
    }
  }

  if (arr.length > 0) borderCurve(arr[0]);
}

function clearCompleted() {
  var arr = [];
  allItems = document.querySelectorAll(".list__item");

  for (var i = 1; i < allItems.length; i++) {
    if (!allItems[i].classList.contains("active")) {
      allItems[i].remove();
    } else {
      arr.push(allItems[i]);
    }
  }

  if (arr.length > 0) borderCurve(arr[0]);
}

function showAll() {
  allItems = document.querySelectorAll(".list__item");

  for (var i = 1; i < allItems.length; i++) {
    if (allItems[i].classList.contains("hidden")) {
      allItems[i].classList.remove("hidden");
    }
  }

  if (allItems.length > 1) borderCurve(allItems[1]);
}

function addCurve(allItems) {
  for (var i = 1; i < allItems.length; i++) {
    if (allItems[i].classList.contains("border-curve")) {
      allItems[i].classList.remove("border-curve");
    }

    if (i === 1) {
      allItems[i].classList.add("border-curve");
    }
  }
}

function borderCurve(item) {
  item.classList.add("border-curve");
}
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51933" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map