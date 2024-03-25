/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ (() => {

class App {
  constructor() {
    console.log("App working good ");
  }
}
new App();

/***/ }),

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML;

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
var _defColors = {
  reset: ['fff', '000'],
  // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
};
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
};
var _openTags = {
  '1': 'font-weight:bold',
  // bold
  '2': 'opacity:0.5',
  // dim
  '3': '<i>',
  // italic
  '4': '<u>',
  // underscore
  '8': 'display:none',
  // hidden
  '9': '<del>' // delete
};
var _closeTags = {
  '23': '</i>',
  // reset italic
  '24': '</u>',
  // reset underscore
  '29': '</del>' // reset delete
};
[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>';
});

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML(text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text;
  }

  // Cache opened sequence.
  var ansiCodes = [];
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq];
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) {
        // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop();
        return '</span>';
      }
      // Open tag.
      ansiCodes.push(seq);
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
    }
    var ct = _closeTags[seq];
    if (ct) {
      // Pop sequence
      ansiCodes.pop();
      return ct;
    }
    return '';
  });

  // Make sure tags are closed.
  var l = ansiCodes.length;
  l > 0 && (ret += Array(l + 1).join('</span>'));
  return ret;
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.');
  }
  var _finalColors = {};
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
    if (!hex) {
      _finalColors[key] = _defColors[key];
      continue;
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex];
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string';
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
      }
      var defHexColor = _defColors[key];
      if (!hex[0]) {
        hex[0] = defHexColor[0];
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]];
        hex.push(defHexColor[1]);
      }
      hex = hex.slice(0, 2);
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
    }
    _finalColors[key] = hex;
  }
  _setTags(_finalColors);
};

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors);
};

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {};
if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () {
      return _openTags;
    }
  });
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () {
      return _closeTags;
    }
  });
} else {
  ansiHTML.tags.open = _openTags;
  ansiHTML.tags.close = _closeTags;
}
function _setTags(colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1];
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey;
  for (var code in _styles) {
    var color = _styles[code];
    var oriColor = colors[color] || '000';
    _openTags[code] = 'color:#' + oriColor;
    code = parseInt(code);
    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
  }
}
ansiHTML.reset();

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }
  var handler = events[type];
  if (handler === undefined) return false;
  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    ;
    eventTargetAgnosticAddListener(emitter, name, resolver, {
      once: true
    });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, {
        once: true
      });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), {
  all: named_references_1.namedReferences.html5
});
function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {
  macroRegExp.lastIndex = 0;
  var replaceMatch = macroRegExp.exec(macroText);
  var replaceResult;
  if (replaceMatch) {
    replaceResult = "";
    var replaceLastIndex = 0;
    do {
      if (replaceLastIndex !== replaceMatch.index) {
        replaceResult += macroText.substring(replaceLastIndex, replaceMatch.index);
      }
      var replaceInput = replaceMatch[0];
      replaceResult += macroReplacer(replaceInput);
      replaceLastIndex = replaceMatch.index + replaceInput.length;
    } while (replaceMatch = macroRegExp.exec(macroText));
    if (replaceLastIndex !== macroText.length) {
      replaceResult += macroText.substring(replaceLastIndex);
    }
  } else {
    replaceResult = macroText;
  }
  return replaceResult;
}
var encodeRegExps = {
  specialChars: /[<>'"&]/g,
  nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g
};
var defaultEncodeOptions = {
  mode: "specialChars",
  level: "all",
  numeric: "decimal"
};
function encode(text, _a) {
  var _b = _a === void 0 ? defaultEncodeOptions : _a,
    _c = _b.mode,
    mode = _c === void 0 ? "specialChars" : _c,
    _d = _b.numeric,
    numeric = _d === void 0 ? "decimal" : _d,
    _e = _b.level,
    level = _e === void 0 ? "all" : _e;
  if (!text) {
    return "";
  }
  var encodeRegExp = encodeRegExps[mode];
  var references = allNamedReferences[level].characters;
  var isHex = numeric === "hexadecimal";
  return replaceUsingRegExp(text, encodeRegExp, function (input) {
    var result = references[input];
    if (!result) {
      var code = input.length > 1 ? surrogate_pairs_1.getCodePoint(input, 0) : input.charCodeAt(0);
      result = (isHex ? "&#x" + code.toString(16) : "&#" + code) + ";";
    }
    return result;
  });
}
exports.encode = encode;
var defaultDecodeOptions = {
  scope: "body",
  level: "all"
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
  xml: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.xml
  },
  html4: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.html4
  },
  html5: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.html5
  }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), {
  all: baseDecodeRegExps.html5
});
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
  level: "all"
};
function getDecodedEntity(entity, references, isAttribute, isStrict) {
  var decodeResult = entity;
  var decodeEntityLastChar = entity[entity.length - 1];
  if (isAttribute && decodeEntityLastChar === "=") {
    decodeResult = entity;
  } else if (isStrict && decodeEntityLastChar !== ";") {
    decodeResult = entity;
  } else {
    var decodeResultByReference = references[entity];
    if (decodeResultByReference) {
      decodeResult = decodeResultByReference;
    } else if (entity[0] === "&" && entity[1] === "#") {
      var decodeSecondChar = entity[2];
      var decodeCode = decodeSecondChar == "x" || decodeSecondChar == "X" ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));
      decodeResult = decodeCode >= 1114111 ? outOfBoundsChar : decodeCode > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode] || decodeCode);
    }
  }
  return decodeResult;
}
function decodeEntity(entity, _a) {
  var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level,
    level = _b === void 0 ? "all" : _b;
  if (!entity) {
    return "";
  }
  return getDecodedEntity(entity, allNamedReferences[level].entities, false, false);
}
exports.decodeEntity = decodeEntity;
function decode(text, _a) {
  var _b = _a === void 0 ? defaultDecodeOptions : _a,
    _c = _b.level,
    level = _c === void 0 ? "all" : _c,
    _d = _b.scope,
    scope = _d === void 0 ? level === "xml" ? "strict" : "body" : _d;
  if (!text) {
    return "";
  }
  var decodeRegExp = decodeRegExps[level][scope];
  var references = allNamedReferences[level].entities;
  var isAttribute = scope === "attribute";
  var isStrict = scope === "strict";
  return replaceUsingRegExp(text, decodeRegExp, function (entity) {
    return getDecodedEntity(entity, references, isAttribute, isStrict);
  });
}
exports.decode = decode;

/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.bodyRegExps = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
};
exports.namedReferences = {
  xml: {
    entities: {
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'",
      "&amp;": "&"
    },
    characters: {
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
      "&": "&amp;"
    }
  },
  html4: {
    entities: {
      "&apos;": "'",
      "&nbsp": " ",
      "&nbsp;": " ",
      "&iexcl": "¡",
      "&iexcl;": "¡",
      "&cent": "¢",
      "&cent;": "¢",
      "&pound": "£",
      "&pound;": "£",
      "&curren": "¤",
      "&curren;": "¤",
      "&yen": "¥",
      "&yen;": "¥",
      "&brvbar": "¦",
      "&brvbar;": "¦",
      "&sect": "§",
      "&sect;": "§",
      "&uml": "¨",
      "&uml;": "¨",
      "&copy": "©",
      "&copy;": "©",
      "&ordf": "ª",
      "&ordf;": "ª",
      "&laquo": "«",
      "&laquo;": "«",
      "&not": "¬",
      "&not;": "¬",
      "&shy": "­",
      "&shy;": "­",
      "&reg": "®",
      "&reg;": "®",
      "&macr": "¯",
      "&macr;": "¯",
      "&deg": "°",
      "&deg;": "°",
      "&plusmn": "±",
      "&plusmn;": "±",
      "&sup2": "²",
      "&sup2;": "²",
      "&sup3": "³",
      "&sup3;": "³",
      "&acute": "´",
      "&acute;": "´",
      "&micro": "µ",
      "&micro;": "µ",
      "&para": "¶",
      "&para;": "¶",
      "&middot": "·",
      "&middot;": "·",
      "&cedil": "¸",
      "&cedil;": "¸",
      "&sup1": "¹",
      "&sup1;": "¹",
      "&ordm": "º",
      "&ordm;": "º",
      "&raquo": "»",
      "&raquo;": "»",
      "&frac14": "¼",
      "&frac14;": "¼",
      "&frac12": "½",
      "&frac12;": "½",
      "&frac34": "¾",
      "&frac34;": "¾",
      "&iquest": "¿",
      "&iquest;": "¿",
      "&Agrave": "À",
      "&Agrave;": "À",
      "&Aacute": "Á",
      "&Aacute;": "Á",
      "&Acirc": "Â",
      "&Acirc;": "Â",
      "&Atilde": "Ã",
      "&Atilde;": "Ã",
      "&Auml": "Ä",
      "&Auml;": "Ä",
      "&Aring": "Å",
      "&Aring;": "Å",
      "&AElig": "Æ",
      "&AElig;": "Æ",
      "&Ccedil": "Ç",
      "&Ccedil;": "Ç",
      "&Egrave": "È",
      "&Egrave;": "È",
      "&Eacute": "É",
      "&Eacute;": "É",
      "&Ecirc": "Ê",
      "&Ecirc;": "Ê",
      "&Euml": "Ë",
      "&Euml;": "Ë",
      "&Igrave": "Ì",
      "&Igrave;": "Ì",
      "&Iacute": "Í",
      "&Iacute;": "Í",
      "&Icirc": "Î",
      "&Icirc;": "Î",
      "&Iuml": "Ï",
      "&Iuml;": "Ï",
      "&ETH": "Ð",
      "&ETH;": "Ð",
      "&Ntilde": "Ñ",
      "&Ntilde;": "Ñ",
      "&Ograve": "Ò",
      "&Ograve;": "Ò",
      "&Oacute": "Ó",
      "&Oacute;": "Ó",
      "&Ocirc": "Ô",
      "&Ocirc;": "Ô",
      "&Otilde": "Õ",
      "&Otilde;": "Õ",
      "&Ouml": "Ö",
      "&Ouml;": "Ö",
      "&times": "×",
      "&times;": "×",
      "&Oslash": "Ø",
      "&Oslash;": "Ø",
      "&Ugrave": "Ù",
      "&Ugrave;": "Ù",
      "&Uacute": "Ú",
      "&Uacute;": "Ú",
      "&Ucirc": "Û",
      "&Ucirc;": "Û",
      "&Uuml": "Ü",
      "&Uuml;": "Ü",
      "&Yacute": "Ý",
      "&Yacute;": "Ý",
      "&THORN": "Þ",
      "&THORN;": "Þ",
      "&szlig": "ß",
      "&szlig;": "ß",
      "&agrave": "à",
      "&agrave;": "à",
      "&aacute": "á",
      "&aacute;": "á",
      "&acirc": "â",
      "&acirc;": "â",
      "&atilde": "ã",
      "&atilde;": "ã",
      "&auml": "ä",
      "&auml;": "ä",
      "&aring": "å",
      "&aring;": "å",
      "&aelig": "æ",
      "&aelig;": "æ",
      "&ccedil": "ç",
      "&ccedil;": "ç",
      "&egrave": "è",
      "&egrave;": "è",
      "&eacute": "é",
      "&eacute;": "é",
      "&ecirc": "ê",
      "&ecirc;": "ê",
      "&euml": "ë",
      "&euml;": "ë",
      "&igrave": "ì",
      "&igrave;": "ì",
      "&iacute": "í",
      "&iacute;": "í",
      "&icirc": "î",
      "&icirc;": "î",
      "&iuml": "ï",
      "&iuml;": "ï",
      "&eth": "ð",
      "&eth;": "ð",
      "&ntilde": "ñ",
      "&ntilde;": "ñ",
      "&ograve": "ò",
      "&ograve;": "ò",
      "&oacute": "ó",
      "&oacute;": "ó",
      "&ocirc": "ô",
      "&ocirc;": "ô",
      "&otilde": "õ",
      "&otilde;": "õ",
      "&ouml": "ö",
      "&ouml;": "ö",
      "&divide": "÷",
      "&divide;": "÷",
      "&oslash": "ø",
      "&oslash;": "ø",
      "&ugrave": "ù",
      "&ugrave;": "ù",
      "&uacute": "ú",
      "&uacute;": "ú",
      "&ucirc": "û",
      "&ucirc;": "û",
      "&uuml": "ü",
      "&uuml;": "ü",
      "&yacute": "ý",
      "&yacute;": "ý",
      "&thorn": "þ",
      "&thorn;": "þ",
      "&yuml": "ÿ",
      "&yuml;": "ÿ",
      "&quot": '"',
      "&quot;": '"',
      "&amp": "&",
      "&amp;": "&",
      "&lt": "<",
      "&lt;": "<",
      "&gt": ">",
      "&gt;": ">",
      "&OElig;": "Œ",
      "&oelig;": "œ",
      "&Scaron;": "Š",
      "&scaron;": "š",
      "&Yuml;": "Ÿ",
      "&circ;": "ˆ",
      "&tilde;": "˜",
      "&ensp;": " ",
      "&emsp;": " ",
      "&thinsp;": " ",
      "&zwnj;": "‌",
      "&zwj;": "‍",
      "&lrm;": "‎",
      "&rlm;": "‏",
      "&ndash;": "–",
      "&mdash;": "—",
      "&lsquo;": "‘",
      "&rsquo;": "’",
      "&sbquo;": "‚",
      "&ldquo;": "“",
      "&rdquo;": "”",
      "&bdquo;": "„",
      "&dagger;": "†",
      "&Dagger;": "‡",
      "&permil;": "‰",
      "&lsaquo;": "‹",
      "&rsaquo;": "›",
      "&euro;": "€",
      "&fnof;": "ƒ",
      "&Alpha;": "Α",
      "&Beta;": "Β",
      "&Gamma;": "Γ",
      "&Delta;": "Δ",
      "&Epsilon;": "Ε",
      "&Zeta;": "Ζ",
      "&Eta;": "Η",
      "&Theta;": "Θ",
      "&Iota;": "Ι",
      "&Kappa;": "Κ",
      "&Lambda;": "Λ",
      "&Mu;": "Μ",
      "&Nu;": "Ν",
      "&Xi;": "Ξ",
      "&Omicron;": "Ο",
      "&Pi;": "Π",
      "&Rho;": "Ρ",
      "&Sigma;": "Σ",
      "&Tau;": "Τ",
      "&Upsilon;": "Υ",
      "&Phi;": "Φ",
      "&Chi;": "Χ",
      "&Psi;": "Ψ",
      "&Omega;": "Ω",
      "&alpha;": "α",
      "&beta;": "β",
      "&gamma;": "γ",
      "&delta;": "δ",
      "&epsilon;": "ε",
      "&zeta;": "ζ",
      "&eta;": "η",
      "&theta;": "θ",
      "&iota;": "ι",
      "&kappa;": "κ",
      "&lambda;": "λ",
      "&mu;": "μ",
      "&nu;": "ν",
      "&xi;": "ξ",
      "&omicron;": "ο",
      "&pi;": "π",
      "&rho;": "ρ",
      "&sigmaf;": "ς",
      "&sigma;": "σ",
      "&tau;": "τ",
      "&upsilon;": "υ",
      "&phi;": "φ",
      "&chi;": "χ",
      "&psi;": "ψ",
      "&omega;": "ω",
      "&thetasym;": "ϑ",
      "&upsih;": "ϒ",
      "&piv;": "ϖ",
      "&bull;": "•",
      "&hellip;": "…",
      "&prime;": "′",
      "&Prime;": "″",
      "&oline;": "‾",
      "&frasl;": "⁄",
      "&weierp;": "℘",
      "&image;": "ℑ",
      "&real;": "ℜ",
      "&trade;": "™",
      "&alefsym;": "ℵ",
      "&larr;": "←",
      "&uarr;": "↑",
      "&rarr;": "→",
      "&darr;": "↓",
      "&harr;": "↔",
      "&crarr;": "↵",
      "&lArr;": "⇐",
      "&uArr;": "⇑",
      "&rArr;": "⇒",
      "&dArr;": "⇓",
      "&hArr;": "⇔",
      "&forall;": "∀",
      "&part;": "∂",
      "&exist;": "∃",
      "&empty;": "∅",
      "&nabla;": "∇",
      "&isin;": "∈",
      "&notin;": "∉",
      "&ni;": "∋",
      "&prod;": "∏",
      "&sum;": "∑",
      "&minus;": "−",
      "&lowast;": "∗",
      "&radic;": "√",
      "&prop;": "∝",
      "&infin;": "∞",
      "&ang;": "∠",
      "&and;": "∧",
      "&or;": "∨",
      "&cap;": "∩",
      "&cup;": "∪",
      "&int;": "∫",
      "&there4;": "∴",
      "&sim;": "∼",
      "&cong;": "≅",
      "&asymp;": "≈",
      "&ne;": "≠",
      "&equiv;": "≡",
      "&le;": "≤",
      "&ge;": "≥",
      "&sub;": "⊂",
      "&sup;": "⊃",
      "&nsub;": "⊄",
      "&sube;": "⊆",
      "&supe;": "⊇",
      "&oplus;": "⊕",
      "&otimes;": "⊗",
      "&perp;": "⊥",
      "&sdot;": "⋅",
      "&lceil;": "⌈",
      "&rceil;": "⌉",
      "&lfloor;": "⌊",
      "&rfloor;": "⌋",
      "&lang;": "〈",
      "&rang;": "〉",
      "&loz;": "◊",
      "&spades;": "♠",
      "&clubs;": "♣",
      "&hearts;": "♥",
      "&diams;": "♦"
    },
    characters: {
      "'": "&apos;",
      " ": "&nbsp;",
      "¡": "&iexcl;",
      "¢": "&cent;",
      "£": "&pound;",
      "¤": "&curren;",
      "¥": "&yen;",
      "¦": "&brvbar;",
      "§": "&sect;",
      "¨": "&uml;",
      "©": "&copy;",
      "ª": "&ordf;",
      "«": "&laquo;",
      "¬": "&not;",
      "­": "&shy;",
      "®": "&reg;",
      "¯": "&macr;",
      "°": "&deg;",
      "±": "&plusmn;",
      "²": "&sup2;",
      "³": "&sup3;",
      "´": "&acute;",
      "µ": "&micro;",
      "¶": "&para;",
      "·": "&middot;",
      "¸": "&cedil;",
      "¹": "&sup1;",
      "º": "&ordm;",
      "»": "&raquo;",
      "¼": "&frac14;",
      "½": "&frac12;",
      "¾": "&frac34;",
      "¿": "&iquest;",
      "À": "&Agrave;",
      "Á": "&Aacute;",
      "Â": "&Acirc;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "Å": "&Aring;",
      "Æ": "&AElig;",
      "Ç": "&Ccedil;",
      "È": "&Egrave;",
      "É": "&Eacute;",
      "Ê": "&Ecirc;",
      "Ë": "&Euml;",
      "Ì": "&Igrave;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "Ï": "&Iuml;",
      "Ð": "&ETH;",
      "Ñ": "&Ntilde;",
      "Ò": "&Ograve;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "Õ": "&Otilde;",
      "Ö": "&Ouml;",
      "×": "&times;",
      "Ø": "&Oslash;",
      "Ù": "&Ugrave;",
      "Ú": "&Uacute;",
      "Û": "&Ucirc;",
      "Ü": "&Uuml;",
      "Ý": "&Yacute;",
      "Þ": "&THORN;",
      "ß": "&szlig;",
      "à": "&agrave;",
      "á": "&aacute;",
      "â": "&acirc;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "å": "&aring;",
      "æ": "&aelig;",
      "ç": "&ccedil;",
      "è": "&egrave;",
      "é": "&eacute;",
      "ê": "&ecirc;",
      "ë": "&euml;",
      "ì": "&igrave;",
      "í": "&iacute;",
      "î": "&icirc;",
      "ï": "&iuml;",
      "ð": "&eth;",
      "ñ": "&ntilde;",
      "ò": "&ograve;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "õ": "&otilde;",
      "ö": "&ouml;",
      "÷": "&divide;",
      "ø": "&oslash;",
      "ù": "&ugrave;",
      "ú": "&uacute;",
      "û": "&ucirc;",
      "ü": "&uuml;",
      "ý": "&yacute;",
      "þ": "&thorn;",
      "ÿ": "&yuml;",
      '"': "&quot;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "Œ": "&OElig;",
      "œ": "&oelig;",
      "Š": "&Scaron;",
      "š": "&scaron;",
      "Ÿ": "&Yuml;",
      "ˆ": "&circ;",
      "˜": "&tilde;",
      " ": "&ensp;",
      " ": "&emsp;",
      " ": "&thinsp;",
      "‌": "&zwnj;",
      "‍": "&zwj;",
      "‎": "&lrm;",
      "‏": "&rlm;",
      "–": "&ndash;",
      "—": "&mdash;",
      "‘": "&lsquo;",
      "’": "&rsquo;",
      "‚": "&sbquo;",
      "“": "&ldquo;",
      "”": "&rdquo;",
      "„": "&bdquo;",
      "†": "&dagger;",
      "‡": "&Dagger;",
      "‰": "&permil;",
      "‹": "&lsaquo;",
      "›": "&rsaquo;",
      "€": "&euro;",
      "ƒ": "&fnof;",
      "Α": "&Alpha;",
      "Β": "&Beta;",
      "Γ": "&Gamma;",
      "Δ": "&Delta;",
      "Ε": "&Epsilon;",
      "Ζ": "&Zeta;",
      "Η": "&Eta;",
      "Θ": "&Theta;",
      "Ι": "&Iota;",
      "Κ": "&Kappa;",
      "Λ": "&Lambda;",
      "Μ": "&Mu;",
      "Ν": "&Nu;",
      "Ξ": "&Xi;",
      "Ο": "&Omicron;",
      "Π": "&Pi;",
      "Ρ": "&Rho;",
      "Σ": "&Sigma;",
      "Τ": "&Tau;",
      "Υ": "&Upsilon;",
      "Φ": "&Phi;",
      "Χ": "&Chi;",
      "Ψ": "&Psi;",
      "Ω": "&Omega;",
      "α": "&alpha;",
      "β": "&beta;",
      "γ": "&gamma;",
      "δ": "&delta;",
      "ε": "&epsilon;",
      "ζ": "&zeta;",
      "η": "&eta;",
      "θ": "&theta;",
      "ι": "&iota;",
      "κ": "&kappa;",
      "λ": "&lambda;",
      "μ": "&mu;",
      "ν": "&nu;",
      "ξ": "&xi;",
      "ο": "&omicron;",
      "π": "&pi;",
      "ρ": "&rho;",
      "ς": "&sigmaf;",
      "σ": "&sigma;",
      "τ": "&tau;",
      "υ": "&upsilon;",
      "φ": "&phi;",
      "χ": "&chi;",
      "ψ": "&psi;",
      "ω": "&omega;",
      "ϑ": "&thetasym;",
      "ϒ": "&upsih;",
      "ϖ": "&piv;",
      "•": "&bull;",
      "…": "&hellip;",
      "′": "&prime;",
      "″": "&Prime;",
      "‾": "&oline;",
      "⁄": "&frasl;",
      "℘": "&weierp;",
      "ℑ": "&image;",
      "ℜ": "&real;",
      "™": "&trade;",
      "ℵ": "&alefsym;",
      "←": "&larr;",
      "↑": "&uarr;",
      "→": "&rarr;",
      "↓": "&darr;",
      "↔": "&harr;",
      "↵": "&crarr;",
      "⇐": "&lArr;",
      "⇑": "&uArr;",
      "⇒": "&rArr;",
      "⇓": "&dArr;",
      "⇔": "&hArr;",
      "∀": "&forall;",
      "∂": "&part;",
      "∃": "&exist;",
      "∅": "&empty;",
      "∇": "&nabla;",
      "∈": "&isin;",
      "∉": "&notin;",
      "∋": "&ni;",
      "∏": "&prod;",
      "∑": "&sum;",
      "−": "&minus;",
      "∗": "&lowast;",
      "√": "&radic;",
      "∝": "&prop;",
      "∞": "&infin;",
      "∠": "&ang;",
      "∧": "&and;",
      "∨": "&or;",
      "∩": "&cap;",
      "∪": "&cup;",
      "∫": "&int;",
      "∴": "&there4;",
      "∼": "&sim;",
      "≅": "&cong;",
      "≈": "&asymp;",
      "≠": "&ne;",
      "≡": "&equiv;",
      "≤": "&le;",
      "≥": "&ge;",
      "⊂": "&sub;",
      "⊃": "&sup;",
      "⊄": "&nsub;",
      "⊆": "&sube;",
      "⊇": "&supe;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "⊥": "&perp;",
      "⋅": "&sdot;",
      "⌈": "&lceil;",
      "⌉": "&rceil;",
      "⌊": "&lfloor;",
      "⌋": "&rfloor;",
      "〈": "&lang;",
      "〉": "&rang;",
      "◊": "&loz;",
      "♠": "&spades;",
      "♣": "&clubs;",
      "♥": "&hearts;",
      "♦": "&diams;"
    }
  },
  html5: {
    entities: {
      "&AElig": "Æ",
      "&AElig;": "Æ",
      "&AMP": "&",
      "&AMP;": "&",
      "&Aacute": "Á",
      "&Aacute;": "Á",
      "&Abreve;": "Ă",
      "&Acirc": "Â",
      "&Acirc;": "Â",
      "&Acy;": "А",
      "&Afr;": "𝔄",
      "&Agrave": "À",
      "&Agrave;": "À",
      "&Alpha;": "Α",
      "&Amacr;": "Ā",
      "&And;": "⩓",
      "&Aogon;": "Ą",
      "&Aopf;": "𝔸",
      "&ApplyFunction;": "⁡",
      "&Aring": "Å",
      "&Aring;": "Å",
      "&Ascr;": "𝒜",
      "&Assign;": "≔",
      "&Atilde": "Ã",
      "&Atilde;": "Ã",
      "&Auml": "Ä",
      "&Auml;": "Ä",
      "&Backslash;": "∖",
      "&Barv;": "⫧",
      "&Barwed;": "⌆",
      "&Bcy;": "Б",
      "&Because;": "∵",
      "&Bernoullis;": "ℬ",
      "&Beta;": "Β",
      "&Bfr;": "𝔅",
      "&Bopf;": "𝔹",
      "&Breve;": "˘",
      "&Bscr;": "ℬ",
      "&Bumpeq;": "≎",
      "&CHcy;": "Ч",
      "&COPY": "©",
      "&COPY;": "©",
      "&Cacute;": "Ć",
      "&Cap;": "⋒",
      "&CapitalDifferentialD;": "ⅅ",
      "&Cayleys;": "ℭ",
      "&Ccaron;": "Č",
      "&Ccedil": "Ç",
      "&Ccedil;": "Ç",
      "&Ccirc;": "Ĉ",
      "&Cconint;": "∰",
      "&Cdot;": "Ċ",
      "&Cedilla;": "¸",
      "&CenterDot;": "·",
      "&Cfr;": "ℭ",
      "&Chi;": "Χ",
      "&CircleDot;": "⊙",
      "&CircleMinus;": "⊖",
      "&CirclePlus;": "⊕",
      "&CircleTimes;": "⊗",
      "&ClockwiseContourIntegral;": "∲",
      "&CloseCurlyDoubleQuote;": "”",
      "&CloseCurlyQuote;": "’",
      "&Colon;": "∷",
      "&Colone;": "⩴",
      "&Congruent;": "≡",
      "&Conint;": "∯",
      "&ContourIntegral;": "∮",
      "&Copf;": "ℂ",
      "&Coproduct;": "∐",
      "&CounterClockwiseContourIntegral;": "∳",
      "&Cross;": "⨯",
      "&Cscr;": "𝒞",
      "&Cup;": "⋓",
      "&CupCap;": "≍",
      "&DD;": "ⅅ",
      "&DDotrahd;": "⤑",
      "&DJcy;": "Ђ",
      "&DScy;": "Ѕ",
      "&DZcy;": "Џ",
      "&Dagger;": "‡",
      "&Darr;": "↡",
      "&Dashv;": "⫤",
      "&Dcaron;": "Ď",
      "&Dcy;": "Д",
      "&Del;": "∇",
      "&Delta;": "Δ",
      "&Dfr;": "𝔇",
      "&DiacriticalAcute;": "´",
      "&DiacriticalDot;": "˙",
      "&DiacriticalDoubleAcute;": "˝",
      "&DiacriticalGrave;": "`",
      "&DiacriticalTilde;": "˜",
      "&Diamond;": "⋄",
      "&DifferentialD;": "ⅆ",
      "&Dopf;": "𝔻",
      "&Dot;": "¨",
      "&DotDot;": "⃜",
      "&DotEqual;": "≐",
      "&DoubleContourIntegral;": "∯",
      "&DoubleDot;": "¨",
      "&DoubleDownArrow;": "⇓",
      "&DoubleLeftArrow;": "⇐",
      "&DoubleLeftRightArrow;": "⇔",
      "&DoubleLeftTee;": "⫤",
      "&DoubleLongLeftArrow;": "⟸",
      "&DoubleLongLeftRightArrow;": "⟺",
      "&DoubleLongRightArrow;": "⟹",
      "&DoubleRightArrow;": "⇒",
      "&DoubleRightTee;": "⊨",
      "&DoubleUpArrow;": "⇑",
      "&DoubleUpDownArrow;": "⇕",
      "&DoubleVerticalBar;": "∥",
      "&DownArrow;": "↓",
      "&DownArrowBar;": "⤓",
      "&DownArrowUpArrow;": "⇵",
      "&DownBreve;": "̑",
      "&DownLeftRightVector;": "⥐",
      "&DownLeftTeeVector;": "⥞",
      "&DownLeftVector;": "↽",
      "&DownLeftVectorBar;": "⥖",
      "&DownRightTeeVector;": "⥟",
      "&DownRightVector;": "⇁",
      "&DownRightVectorBar;": "⥗",
      "&DownTee;": "⊤",
      "&DownTeeArrow;": "↧",
      "&Downarrow;": "⇓",
      "&Dscr;": "𝒟",
      "&Dstrok;": "Đ",
      "&ENG;": "Ŋ",
      "&ETH": "Ð",
      "&ETH;": "Ð",
      "&Eacute": "É",
      "&Eacute;": "É",
      "&Ecaron;": "Ě",
      "&Ecirc": "Ê",
      "&Ecirc;": "Ê",
      "&Ecy;": "Э",
      "&Edot;": "Ė",
      "&Efr;": "𝔈",
      "&Egrave": "È",
      "&Egrave;": "È",
      "&Element;": "∈",
      "&Emacr;": "Ē",
      "&EmptySmallSquare;": "◻",
      "&EmptyVerySmallSquare;": "▫",
      "&Eogon;": "Ę",
      "&Eopf;": "𝔼",
      "&Epsilon;": "Ε",
      "&Equal;": "⩵",
      "&EqualTilde;": "≂",
      "&Equilibrium;": "⇌",
      "&Escr;": "ℰ",
      "&Esim;": "⩳",
      "&Eta;": "Η",
      "&Euml": "Ë",
      "&Euml;": "Ë",
      "&Exists;": "∃",
      "&ExponentialE;": "ⅇ",
      "&Fcy;": "Ф",
      "&Ffr;": "𝔉",
      "&FilledSmallSquare;": "◼",
      "&FilledVerySmallSquare;": "▪",
      "&Fopf;": "𝔽",
      "&ForAll;": "∀",
      "&Fouriertrf;": "ℱ",
      "&Fscr;": "ℱ",
      "&GJcy;": "Ѓ",
      "&GT": ">",
      "&GT;": ">",
      "&Gamma;": "Γ",
      "&Gammad;": "Ϝ",
      "&Gbreve;": "Ğ",
      "&Gcedil;": "Ģ",
      "&Gcirc;": "Ĝ",
      "&Gcy;": "Г",
      "&Gdot;": "Ġ",
      "&Gfr;": "𝔊",
      "&Gg;": "⋙",
      "&Gopf;": "𝔾",
      "&GreaterEqual;": "≥",
      "&GreaterEqualLess;": "⋛",
      "&GreaterFullEqual;": "≧",
      "&GreaterGreater;": "⪢",
      "&GreaterLess;": "≷",
      "&GreaterSlantEqual;": "⩾",
      "&GreaterTilde;": "≳",
      "&Gscr;": "𝒢",
      "&Gt;": "≫",
      "&HARDcy;": "Ъ",
      "&Hacek;": "ˇ",
      "&Hat;": "^",
      "&Hcirc;": "Ĥ",
      "&Hfr;": "ℌ",
      "&HilbertSpace;": "ℋ",
      "&Hopf;": "ℍ",
      "&HorizontalLine;": "─",
      "&Hscr;": "ℋ",
      "&Hstrok;": "Ħ",
      "&HumpDownHump;": "≎",
      "&HumpEqual;": "≏",
      "&IEcy;": "Е",
      "&IJlig;": "Ĳ",
      "&IOcy;": "Ё",
      "&Iacute": "Í",
      "&Iacute;": "Í",
      "&Icirc": "Î",
      "&Icirc;": "Î",
      "&Icy;": "И",
      "&Idot;": "İ",
      "&Ifr;": "ℑ",
      "&Igrave": "Ì",
      "&Igrave;": "Ì",
      "&Im;": "ℑ",
      "&Imacr;": "Ī",
      "&ImaginaryI;": "ⅈ",
      "&Implies;": "⇒",
      "&Int;": "∬",
      "&Integral;": "∫",
      "&Intersection;": "⋂",
      "&InvisibleComma;": "⁣",
      "&InvisibleTimes;": "⁢",
      "&Iogon;": "Į",
      "&Iopf;": "𝕀",
      "&Iota;": "Ι",
      "&Iscr;": "ℐ",
      "&Itilde;": "Ĩ",
      "&Iukcy;": "І",
      "&Iuml": "Ï",
      "&Iuml;": "Ï",
      "&Jcirc;": "Ĵ",
      "&Jcy;": "Й",
      "&Jfr;": "𝔍",
      "&Jopf;": "𝕁",
      "&Jscr;": "𝒥",
      "&Jsercy;": "Ј",
      "&Jukcy;": "Є",
      "&KHcy;": "Х",
      "&KJcy;": "Ќ",
      "&Kappa;": "Κ",
      "&Kcedil;": "Ķ",
      "&Kcy;": "К",
      "&Kfr;": "𝔎",
      "&Kopf;": "𝕂",
      "&Kscr;": "𝒦",
      "&LJcy;": "Љ",
      "&LT": "<",
      "&LT;": "<",
      "&Lacute;": "Ĺ",
      "&Lambda;": "Λ",
      "&Lang;": "⟪",
      "&Laplacetrf;": "ℒ",
      "&Larr;": "↞",
      "&Lcaron;": "Ľ",
      "&Lcedil;": "Ļ",
      "&Lcy;": "Л",
      "&LeftAngleBracket;": "⟨",
      "&LeftArrow;": "←",
      "&LeftArrowBar;": "⇤",
      "&LeftArrowRightArrow;": "⇆",
      "&LeftCeiling;": "⌈",
      "&LeftDoubleBracket;": "⟦",
      "&LeftDownTeeVector;": "⥡",
      "&LeftDownVector;": "⇃",
      "&LeftDownVectorBar;": "⥙",
      "&LeftFloor;": "⌊",
      "&LeftRightArrow;": "↔",
      "&LeftRightVector;": "⥎",
      "&LeftTee;": "⊣",
      "&LeftTeeArrow;": "↤",
      "&LeftTeeVector;": "⥚",
      "&LeftTriangle;": "⊲",
      "&LeftTriangleBar;": "⧏",
      "&LeftTriangleEqual;": "⊴",
      "&LeftUpDownVector;": "⥑",
      "&LeftUpTeeVector;": "⥠",
      "&LeftUpVector;": "↿",
      "&LeftUpVectorBar;": "⥘",
      "&LeftVector;": "↼",
      "&LeftVectorBar;": "⥒",
      "&Leftarrow;": "⇐",
      "&Leftrightarrow;": "⇔",
      "&LessEqualGreater;": "⋚",
      "&LessFullEqual;": "≦",
      "&LessGreater;": "≶",
      "&LessLess;": "⪡",
      "&LessSlantEqual;": "⩽",
      "&LessTilde;": "≲",
      "&Lfr;": "𝔏",
      "&Ll;": "⋘",
      "&Lleftarrow;": "⇚",
      "&Lmidot;": "Ŀ",
      "&LongLeftArrow;": "⟵",
      "&LongLeftRightArrow;": "⟷",
      "&LongRightArrow;": "⟶",
      "&Longleftarrow;": "⟸",
      "&Longleftrightarrow;": "⟺",
      "&Longrightarrow;": "⟹",
      "&Lopf;": "𝕃",
      "&LowerLeftArrow;": "↙",
      "&LowerRightArrow;": "↘",
      "&Lscr;": "ℒ",
      "&Lsh;": "↰",
      "&Lstrok;": "Ł",
      "&Lt;": "≪",
      "&Map;": "⤅",
      "&Mcy;": "М",
      "&MediumSpace;": " ",
      "&Mellintrf;": "ℳ",
      "&Mfr;": "𝔐",
      "&MinusPlus;": "∓",
      "&Mopf;": "𝕄",
      "&Mscr;": "ℳ",
      "&Mu;": "Μ",
      "&NJcy;": "Њ",
      "&Nacute;": "Ń",
      "&Ncaron;": "Ň",
      "&Ncedil;": "Ņ",
      "&Ncy;": "Н",
      "&NegativeMediumSpace;": "​",
      "&NegativeThickSpace;": "​",
      "&NegativeThinSpace;": "​",
      "&NegativeVeryThinSpace;": "​",
      "&NestedGreaterGreater;": "≫",
      "&NestedLessLess;": "≪",
      "&NewLine;": "\n",
      "&Nfr;": "𝔑",
      "&NoBreak;": "⁠",
      "&NonBreakingSpace;": " ",
      "&Nopf;": "ℕ",
      "&Not;": "⫬",
      "&NotCongruent;": "≢",
      "&NotCupCap;": "≭",
      "&NotDoubleVerticalBar;": "∦",
      "&NotElement;": "∉",
      "&NotEqual;": "≠",
      "&NotEqualTilde;": "≂̸",
      "&NotExists;": "∄",
      "&NotGreater;": "≯",
      "&NotGreaterEqual;": "≱",
      "&NotGreaterFullEqual;": "≧̸",
      "&NotGreaterGreater;": "≫̸",
      "&NotGreaterLess;": "≹",
      "&NotGreaterSlantEqual;": "⩾̸",
      "&NotGreaterTilde;": "≵",
      "&NotHumpDownHump;": "≎̸",
      "&NotHumpEqual;": "≏̸",
      "&NotLeftTriangle;": "⋪",
      "&NotLeftTriangleBar;": "⧏̸",
      "&NotLeftTriangleEqual;": "⋬",
      "&NotLess;": "≮",
      "&NotLessEqual;": "≰",
      "&NotLessGreater;": "≸",
      "&NotLessLess;": "≪̸",
      "&NotLessSlantEqual;": "⩽̸",
      "&NotLessTilde;": "≴",
      "&NotNestedGreaterGreater;": "⪢̸",
      "&NotNestedLessLess;": "⪡̸",
      "&NotPrecedes;": "⊀",
      "&NotPrecedesEqual;": "⪯̸",
      "&NotPrecedesSlantEqual;": "⋠",
      "&NotReverseElement;": "∌",
      "&NotRightTriangle;": "⋫",
      "&NotRightTriangleBar;": "⧐̸",
      "&NotRightTriangleEqual;": "⋭",
      "&NotSquareSubset;": "⊏̸",
      "&NotSquareSubsetEqual;": "⋢",
      "&NotSquareSuperset;": "⊐̸",
      "&NotSquareSupersetEqual;": "⋣",
      "&NotSubset;": "⊂⃒",
      "&NotSubsetEqual;": "⊈",
      "&NotSucceeds;": "⊁",
      "&NotSucceedsEqual;": "⪰̸",
      "&NotSucceedsSlantEqual;": "⋡",
      "&NotSucceedsTilde;": "≿̸",
      "&NotSuperset;": "⊃⃒",
      "&NotSupersetEqual;": "⊉",
      "&NotTilde;": "≁",
      "&NotTildeEqual;": "≄",
      "&NotTildeFullEqual;": "≇",
      "&NotTildeTilde;": "≉",
      "&NotVerticalBar;": "∤",
      "&Nscr;": "𝒩",
      "&Ntilde": "Ñ",
      "&Ntilde;": "Ñ",
      "&Nu;": "Ν",
      "&OElig;": "Œ",
      "&Oacute": "Ó",
      "&Oacute;": "Ó",
      "&Ocirc": "Ô",
      "&Ocirc;": "Ô",
      "&Ocy;": "О",
      "&Odblac;": "Ő",
      "&Ofr;": "𝔒",
      "&Ograve": "Ò",
      "&Ograve;": "Ò",
      "&Omacr;": "Ō",
      "&Omega;": "Ω",
      "&Omicron;": "Ο",
      "&Oopf;": "𝕆",
      "&OpenCurlyDoubleQuote;": "“",
      "&OpenCurlyQuote;": "‘",
      "&Or;": "⩔",
      "&Oscr;": "𝒪",
      "&Oslash": "Ø",
      "&Oslash;": "Ø",
      "&Otilde": "Õ",
      "&Otilde;": "Õ",
      "&Otimes;": "⨷",
      "&Ouml": "Ö",
      "&Ouml;": "Ö",
      "&OverBar;": "‾",
      "&OverBrace;": "⏞",
      "&OverBracket;": "⎴",
      "&OverParenthesis;": "⏜",
      "&PartialD;": "∂",
      "&Pcy;": "П",
      "&Pfr;": "𝔓",
      "&Phi;": "Φ",
      "&Pi;": "Π",
      "&PlusMinus;": "±",
      "&Poincareplane;": "ℌ",
      "&Popf;": "ℙ",
      "&Pr;": "⪻",
      "&Precedes;": "≺",
      "&PrecedesEqual;": "⪯",
      "&PrecedesSlantEqual;": "≼",
      "&PrecedesTilde;": "≾",
      "&Prime;": "″",
      "&Product;": "∏",
      "&Proportion;": "∷",
      "&Proportional;": "∝",
      "&Pscr;": "𝒫",
      "&Psi;": "Ψ",
      "&QUOT": '"',
      "&QUOT;": '"',
      "&Qfr;": "𝔔",
      "&Qopf;": "ℚ",
      "&Qscr;": "𝒬",
      "&RBarr;": "⤐",
      "&REG": "®",
      "&REG;": "®",
      "&Racute;": "Ŕ",
      "&Rang;": "⟫",
      "&Rarr;": "↠",
      "&Rarrtl;": "⤖",
      "&Rcaron;": "Ř",
      "&Rcedil;": "Ŗ",
      "&Rcy;": "Р",
      "&Re;": "ℜ",
      "&ReverseElement;": "∋",
      "&ReverseEquilibrium;": "⇋",
      "&ReverseUpEquilibrium;": "⥯",
      "&Rfr;": "ℜ",
      "&Rho;": "Ρ",
      "&RightAngleBracket;": "⟩",
      "&RightArrow;": "→",
      "&RightArrowBar;": "⇥",
      "&RightArrowLeftArrow;": "⇄",
      "&RightCeiling;": "⌉",
      "&RightDoubleBracket;": "⟧",
      "&RightDownTeeVector;": "⥝",
      "&RightDownVector;": "⇂",
      "&RightDownVectorBar;": "⥕",
      "&RightFloor;": "⌋",
      "&RightTee;": "⊢",
      "&RightTeeArrow;": "↦",
      "&RightTeeVector;": "⥛",
      "&RightTriangle;": "⊳",
      "&RightTriangleBar;": "⧐",
      "&RightTriangleEqual;": "⊵",
      "&RightUpDownVector;": "⥏",
      "&RightUpTeeVector;": "⥜",
      "&RightUpVector;": "↾",
      "&RightUpVectorBar;": "⥔",
      "&RightVector;": "⇀",
      "&RightVectorBar;": "⥓",
      "&Rightarrow;": "⇒",
      "&Ropf;": "ℝ",
      "&RoundImplies;": "⥰",
      "&Rrightarrow;": "⇛",
      "&Rscr;": "ℛ",
      "&Rsh;": "↱",
      "&RuleDelayed;": "⧴",
      "&SHCHcy;": "Щ",
      "&SHcy;": "Ш",
      "&SOFTcy;": "Ь",
      "&Sacute;": "Ś",
      "&Sc;": "⪼",
      "&Scaron;": "Š",
      "&Scedil;": "Ş",
      "&Scirc;": "Ŝ",
      "&Scy;": "С",
      "&Sfr;": "𝔖",
      "&ShortDownArrow;": "↓",
      "&ShortLeftArrow;": "←",
      "&ShortRightArrow;": "→",
      "&ShortUpArrow;": "↑",
      "&Sigma;": "Σ",
      "&SmallCircle;": "∘",
      "&Sopf;": "𝕊",
      "&Sqrt;": "√",
      "&Square;": "□",
      "&SquareIntersection;": "⊓",
      "&SquareSubset;": "⊏",
      "&SquareSubsetEqual;": "⊑",
      "&SquareSuperset;": "⊐",
      "&SquareSupersetEqual;": "⊒",
      "&SquareUnion;": "⊔",
      "&Sscr;": "𝒮",
      "&Star;": "⋆",
      "&Sub;": "⋐",
      "&Subset;": "⋐",
      "&SubsetEqual;": "⊆",
      "&Succeeds;": "≻",
      "&SucceedsEqual;": "⪰",
      "&SucceedsSlantEqual;": "≽",
      "&SucceedsTilde;": "≿",
      "&SuchThat;": "∋",
      "&Sum;": "∑",
      "&Sup;": "⋑",
      "&Superset;": "⊃",
      "&SupersetEqual;": "⊇",
      "&Supset;": "⋑",
      "&THORN": "Þ",
      "&THORN;": "Þ",
      "&TRADE;": "™",
      "&TSHcy;": "Ћ",
      "&TScy;": "Ц",
      "&Tab;": "\t",
      "&Tau;": "Τ",
      "&Tcaron;": "Ť",
      "&Tcedil;": "Ţ",
      "&Tcy;": "Т",
      "&Tfr;": "𝔗",
      "&Therefore;": "∴",
      "&Theta;": "Θ",
      "&ThickSpace;": "  ",
      "&ThinSpace;": " ",
      "&Tilde;": "∼",
      "&TildeEqual;": "≃",
      "&TildeFullEqual;": "≅",
      "&TildeTilde;": "≈",
      "&Topf;": "𝕋",
      "&TripleDot;": "⃛",
      "&Tscr;": "𝒯",
      "&Tstrok;": "Ŧ",
      "&Uacute": "Ú",
      "&Uacute;": "Ú",
      "&Uarr;": "↟",
      "&Uarrocir;": "⥉",
      "&Ubrcy;": "Ў",
      "&Ubreve;": "Ŭ",
      "&Ucirc": "Û",
      "&Ucirc;": "Û",
      "&Ucy;": "У",
      "&Udblac;": "Ű",
      "&Ufr;": "𝔘",
      "&Ugrave": "Ù",
      "&Ugrave;": "Ù",
      "&Umacr;": "Ū",
      "&UnderBar;": "_",
      "&UnderBrace;": "⏟",
      "&UnderBracket;": "⎵",
      "&UnderParenthesis;": "⏝",
      "&Union;": "⋃",
      "&UnionPlus;": "⊎",
      "&Uogon;": "Ų",
      "&Uopf;": "𝕌",
      "&UpArrow;": "↑",
      "&UpArrowBar;": "⤒",
      "&UpArrowDownArrow;": "⇅",
      "&UpDownArrow;": "↕",
      "&UpEquilibrium;": "⥮",
      "&UpTee;": "⊥",
      "&UpTeeArrow;": "↥",
      "&Uparrow;": "⇑",
      "&Updownarrow;": "⇕",
      "&UpperLeftArrow;": "↖",
      "&UpperRightArrow;": "↗",
      "&Upsi;": "ϒ",
      "&Upsilon;": "Υ",
      "&Uring;": "Ů",
      "&Uscr;": "𝒰",
      "&Utilde;": "Ũ",
      "&Uuml": "Ü",
      "&Uuml;": "Ü",
      "&VDash;": "⊫",
      "&Vbar;": "⫫",
      "&Vcy;": "В",
      "&Vdash;": "⊩",
      "&Vdashl;": "⫦",
      "&Vee;": "⋁",
      "&Verbar;": "‖",
      "&Vert;": "‖",
      "&VerticalBar;": "∣",
      "&VerticalLine;": "|",
      "&VerticalSeparator;": "❘",
      "&VerticalTilde;": "≀",
      "&VeryThinSpace;": " ",
      "&Vfr;": "𝔙",
      "&Vopf;": "𝕍",
      "&Vscr;": "𝒱",
      "&Vvdash;": "⊪",
      "&Wcirc;": "Ŵ",
      "&Wedge;": "⋀",
      "&Wfr;": "𝔚",
      "&Wopf;": "𝕎",
      "&Wscr;": "𝒲",
      "&Xfr;": "𝔛",
      "&Xi;": "Ξ",
      "&Xopf;": "𝕏",
      "&Xscr;": "𝒳",
      "&YAcy;": "Я",
      "&YIcy;": "Ї",
      "&YUcy;": "Ю",
      "&Yacute": "Ý",
      "&Yacute;": "Ý",
      "&Ycirc;": "Ŷ",
      "&Ycy;": "Ы",
      "&Yfr;": "𝔜",
      "&Yopf;": "𝕐",
      "&Yscr;": "𝒴",
      "&Yuml;": "Ÿ",
      "&ZHcy;": "Ж",
      "&Zacute;": "Ź",
      "&Zcaron;": "Ž",
      "&Zcy;": "З",
      "&Zdot;": "Ż",
      "&ZeroWidthSpace;": "​",
      "&Zeta;": "Ζ",
      "&Zfr;": "ℨ",
      "&Zopf;": "ℤ",
      "&Zscr;": "𝒵",
      "&aacute": "á",
      "&aacute;": "á",
      "&abreve;": "ă",
      "&ac;": "∾",
      "&acE;": "∾̳",
      "&acd;": "∿",
      "&acirc": "â",
      "&acirc;": "â",
      "&acute": "´",
      "&acute;": "´",
      "&acy;": "а",
      "&aelig": "æ",
      "&aelig;": "æ",
      "&af;": "⁡",
      "&afr;": "𝔞",
      "&agrave": "à",
      "&agrave;": "à",
      "&alefsym;": "ℵ",
      "&aleph;": "ℵ",
      "&alpha;": "α",
      "&amacr;": "ā",
      "&amalg;": "⨿",
      "&amp": "&",
      "&amp;": "&",
      "&and;": "∧",
      "&andand;": "⩕",
      "&andd;": "⩜",
      "&andslope;": "⩘",
      "&andv;": "⩚",
      "&ang;": "∠",
      "&ange;": "⦤",
      "&angle;": "∠",
      "&angmsd;": "∡",
      "&angmsdaa;": "⦨",
      "&angmsdab;": "⦩",
      "&angmsdac;": "⦪",
      "&angmsdad;": "⦫",
      "&angmsdae;": "⦬",
      "&angmsdaf;": "⦭",
      "&angmsdag;": "⦮",
      "&angmsdah;": "⦯",
      "&angrt;": "∟",
      "&angrtvb;": "⊾",
      "&angrtvbd;": "⦝",
      "&angsph;": "∢",
      "&angst;": "Å",
      "&angzarr;": "⍼",
      "&aogon;": "ą",
      "&aopf;": "𝕒",
      "&ap;": "≈",
      "&apE;": "⩰",
      "&apacir;": "⩯",
      "&ape;": "≊",
      "&apid;": "≋",
      "&apos;": "'",
      "&approx;": "≈",
      "&approxeq;": "≊",
      "&aring": "å",
      "&aring;": "å",
      "&ascr;": "𝒶",
      "&ast;": "*",
      "&asymp;": "≈",
      "&asympeq;": "≍",
      "&atilde": "ã",
      "&atilde;": "ã",
      "&auml": "ä",
      "&auml;": "ä",
      "&awconint;": "∳",
      "&awint;": "⨑",
      "&bNot;": "⫭",
      "&backcong;": "≌",
      "&backepsilon;": "϶",
      "&backprime;": "‵",
      "&backsim;": "∽",
      "&backsimeq;": "⋍",
      "&barvee;": "⊽",
      "&barwed;": "⌅",
      "&barwedge;": "⌅",
      "&bbrk;": "⎵",
      "&bbrktbrk;": "⎶",
      "&bcong;": "≌",
      "&bcy;": "б",
      "&bdquo;": "„",
      "&becaus;": "∵",
      "&because;": "∵",
      "&bemptyv;": "⦰",
      "&bepsi;": "϶",
      "&bernou;": "ℬ",
      "&beta;": "β",
      "&beth;": "ℶ",
      "&between;": "≬",
      "&bfr;": "𝔟",
      "&bigcap;": "⋂",
      "&bigcirc;": "◯",
      "&bigcup;": "⋃",
      "&bigodot;": "⨀",
      "&bigoplus;": "⨁",
      "&bigotimes;": "⨂",
      "&bigsqcup;": "⨆",
      "&bigstar;": "★",
      "&bigtriangledown;": "▽",
      "&bigtriangleup;": "△",
      "&biguplus;": "⨄",
      "&bigvee;": "⋁",
      "&bigwedge;": "⋀",
      "&bkarow;": "⤍",
      "&blacklozenge;": "⧫",
      "&blacksquare;": "▪",
      "&blacktriangle;": "▴",
      "&blacktriangledown;": "▾",
      "&blacktriangleleft;": "◂",
      "&blacktriangleright;": "▸",
      "&blank;": "␣",
      "&blk12;": "▒",
      "&blk14;": "░",
      "&blk34;": "▓",
      "&block;": "█",
      "&bne;": "=⃥",
      "&bnequiv;": "≡⃥",
      "&bnot;": "⌐",
      "&bopf;": "𝕓",
      "&bot;": "⊥",
      "&bottom;": "⊥",
      "&bowtie;": "⋈",
      "&boxDL;": "╗",
      "&boxDR;": "╔",
      "&boxDl;": "╖",
      "&boxDr;": "╓",
      "&boxH;": "═",
      "&boxHD;": "╦",
      "&boxHU;": "╩",
      "&boxHd;": "╤",
      "&boxHu;": "╧",
      "&boxUL;": "╝",
      "&boxUR;": "╚",
      "&boxUl;": "╜",
      "&boxUr;": "╙",
      "&boxV;": "║",
      "&boxVH;": "╬",
      "&boxVL;": "╣",
      "&boxVR;": "╠",
      "&boxVh;": "╫",
      "&boxVl;": "╢",
      "&boxVr;": "╟",
      "&boxbox;": "⧉",
      "&boxdL;": "╕",
      "&boxdR;": "╒",
      "&boxdl;": "┐",
      "&boxdr;": "┌",
      "&boxh;": "─",
      "&boxhD;": "╥",
      "&boxhU;": "╨",
      "&boxhd;": "┬",
      "&boxhu;": "┴",
      "&boxminus;": "⊟",
      "&boxplus;": "⊞",
      "&boxtimes;": "⊠",
      "&boxuL;": "╛",
      "&boxuR;": "╘",
      "&boxul;": "┘",
      "&boxur;": "└",
      "&boxv;": "│",
      "&boxvH;": "╪",
      "&boxvL;": "╡",
      "&boxvR;": "╞",
      "&boxvh;": "┼",
      "&boxvl;": "┤",
      "&boxvr;": "├",
      "&bprime;": "‵",
      "&breve;": "˘",
      "&brvbar": "¦",
      "&brvbar;": "¦",
      "&bscr;": "𝒷",
      "&bsemi;": "⁏",
      "&bsim;": "∽",
      "&bsime;": "⋍",
      "&bsol;": "\\",
      "&bsolb;": "⧅",
      "&bsolhsub;": "⟈",
      "&bull;": "•",
      "&bullet;": "•",
      "&bump;": "≎",
      "&bumpE;": "⪮",
      "&bumpe;": "≏",
      "&bumpeq;": "≏",
      "&cacute;": "ć",
      "&cap;": "∩",
      "&capand;": "⩄",
      "&capbrcup;": "⩉",
      "&capcap;": "⩋",
      "&capcup;": "⩇",
      "&capdot;": "⩀",
      "&caps;": "∩︀",
      "&caret;": "⁁",
      "&caron;": "ˇ",
      "&ccaps;": "⩍",
      "&ccaron;": "č",
      "&ccedil": "ç",
      "&ccedil;": "ç",
      "&ccirc;": "ĉ",
      "&ccups;": "⩌",
      "&ccupssm;": "⩐",
      "&cdot;": "ċ",
      "&cedil": "¸",
      "&cedil;": "¸",
      "&cemptyv;": "⦲",
      "&cent": "¢",
      "&cent;": "¢",
      "&centerdot;": "·",
      "&cfr;": "𝔠",
      "&chcy;": "ч",
      "&check;": "✓",
      "&checkmark;": "✓",
      "&chi;": "χ",
      "&cir;": "○",
      "&cirE;": "⧃",
      "&circ;": "ˆ",
      "&circeq;": "≗",
      "&circlearrowleft;": "↺",
      "&circlearrowright;": "↻",
      "&circledR;": "®",
      "&circledS;": "Ⓢ",
      "&circledast;": "⊛",
      "&circledcirc;": "⊚",
      "&circleddash;": "⊝",
      "&cire;": "≗",
      "&cirfnint;": "⨐",
      "&cirmid;": "⫯",
      "&cirscir;": "⧂",
      "&clubs;": "♣",
      "&clubsuit;": "♣",
      "&colon;": ":",
      "&colone;": "≔",
      "&coloneq;": "≔",
      "&comma;": ",",
      "&commat;": "@",
      "&comp;": "∁",
      "&compfn;": "∘",
      "&complement;": "∁",
      "&complexes;": "ℂ",
      "&cong;": "≅",
      "&congdot;": "⩭",
      "&conint;": "∮",
      "&copf;": "𝕔",
      "&coprod;": "∐",
      "&copy": "©",
      "&copy;": "©",
      "&copysr;": "℗",
      "&crarr;": "↵",
      "&cross;": "✗",
      "&cscr;": "𝒸",
      "&csub;": "⫏",
      "&csube;": "⫑",
      "&csup;": "⫐",
      "&csupe;": "⫒",
      "&ctdot;": "⋯",
      "&cudarrl;": "⤸",
      "&cudarrr;": "⤵",
      "&cuepr;": "⋞",
      "&cuesc;": "⋟",
      "&cularr;": "↶",
      "&cularrp;": "⤽",
      "&cup;": "∪",
      "&cupbrcap;": "⩈",
      "&cupcap;": "⩆",
      "&cupcup;": "⩊",
      "&cupdot;": "⊍",
      "&cupor;": "⩅",
      "&cups;": "∪︀",
      "&curarr;": "↷",
      "&curarrm;": "⤼",
      "&curlyeqprec;": "⋞",
      "&curlyeqsucc;": "⋟",
      "&curlyvee;": "⋎",
      "&curlywedge;": "⋏",
      "&curren": "¤",
      "&curren;": "¤",
      "&curvearrowleft;": "↶",
      "&curvearrowright;": "↷",
      "&cuvee;": "⋎",
      "&cuwed;": "⋏",
      "&cwconint;": "∲",
      "&cwint;": "∱",
      "&cylcty;": "⌭",
      "&dArr;": "⇓",
      "&dHar;": "⥥",
      "&dagger;": "†",
      "&daleth;": "ℸ",
      "&darr;": "↓",
      "&dash;": "‐",
      "&dashv;": "⊣",
      "&dbkarow;": "⤏",
      "&dblac;": "˝",
      "&dcaron;": "ď",
      "&dcy;": "д",
      "&dd;": "ⅆ",
      "&ddagger;": "‡",
      "&ddarr;": "⇊",
      "&ddotseq;": "⩷",
      "&deg": "°",
      "&deg;": "°",
      "&delta;": "δ",
      "&demptyv;": "⦱",
      "&dfisht;": "⥿",
      "&dfr;": "𝔡",
      "&dharl;": "⇃",
      "&dharr;": "⇂",
      "&diam;": "⋄",
      "&diamond;": "⋄",
      "&diamondsuit;": "♦",
      "&diams;": "♦",
      "&die;": "¨",
      "&digamma;": "ϝ",
      "&disin;": "⋲",
      "&div;": "÷",
      "&divide": "÷",
      "&divide;": "÷",
      "&divideontimes;": "⋇",
      "&divonx;": "⋇",
      "&djcy;": "ђ",
      "&dlcorn;": "⌞",
      "&dlcrop;": "⌍",
      "&dollar;": "$",
      "&dopf;": "𝕕",
      "&dot;": "˙",
      "&doteq;": "≐",
      "&doteqdot;": "≑",
      "&dotminus;": "∸",
      "&dotplus;": "∔",
      "&dotsquare;": "⊡",
      "&doublebarwedge;": "⌆",
      "&downarrow;": "↓",
      "&downdownarrows;": "⇊",
      "&downharpoonleft;": "⇃",
      "&downharpoonright;": "⇂",
      "&drbkarow;": "⤐",
      "&drcorn;": "⌟",
      "&drcrop;": "⌌",
      "&dscr;": "𝒹",
      "&dscy;": "ѕ",
      "&dsol;": "⧶",
      "&dstrok;": "đ",
      "&dtdot;": "⋱",
      "&dtri;": "▿",
      "&dtrif;": "▾",
      "&duarr;": "⇵",
      "&duhar;": "⥯",
      "&dwangle;": "⦦",
      "&dzcy;": "џ",
      "&dzigrarr;": "⟿",
      "&eDDot;": "⩷",
      "&eDot;": "≑",
      "&eacute": "é",
      "&eacute;": "é",
      "&easter;": "⩮",
      "&ecaron;": "ě",
      "&ecir;": "≖",
      "&ecirc": "ê",
      "&ecirc;": "ê",
      "&ecolon;": "≕",
      "&ecy;": "э",
      "&edot;": "ė",
      "&ee;": "ⅇ",
      "&efDot;": "≒",
      "&efr;": "𝔢",
      "&eg;": "⪚",
      "&egrave": "è",
      "&egrave;": "è",
      "&egs;": "⪖",
      "&egsdot;": "⪘",
      "&el;": "⪙",
      "&elinters;": "⏧",
      "&ell;": "ℓ",
      "&els;": "⪕",
      "&elsdot;": "⪗",
      "&emacr;": "ē",
      "&empty;": "∅",
      "&emptyset;": "∅",
      "&emptyv;": "∅",
      "&emsp13;": " ",
      "&emsp14;": " ",
      "&emsp;": " ",
      "&eng;": "ŋ",
      "&ensp;": " ",
      "&eogon;": "ę",
      "&eopf;": "𝕖",
      "&epar;": "⋕",
      "&eparsl;": "⧣",
      "&eplus;": "⩱",
      "&epsi;": "ε",
      "&epsilon;": "ε",
      "&epsiv;": "ϵ",
      "&eqcirc;": "≖",
      "&eqcolon;": "≕",
      "&eqsim;": "≂",
      "&eqslantgtr;": "⪖",
      "&eqslantless;": "⪕",
      "&equals;": "=",
      "&equest;": "≟",
      "&equiv;": "≡",
      "&equivDD;": "⩸",
      "&eqvparsl;": "⧥",
      "&erDot;": "≓",
      "&erarr;": "⥱",
      "&escr;": "ℯ",
      "&esdot;": "≐",
      "&esim;": "≂",
      "&eta;": "η",
      "&eth": "ð",
      "&eth;": "ð",
      "&euml": "ë",
      "&euml;": "ë",
      "&euro;": "€",
      "&excl;": "!",
      "&exist;": "∃",
      "&expectation;": "ℰ",
      "&exponentiale;": "ⅇ",
      "&fallingdotseq;": "≒",
      "&fcy;": "ф",
      "&female;": "♀",
      "&ffilig;": "ﬃ",
      "&fflig;": "ﬀ",
      "&ffllig;": "ﬄ",
      "&ffr;": "𝔣",
      "&filig;": "ﬁ",
      "&fjlig;": "fj",
      "&flat;": "♭",
      "&fllig;": "ﬂ",
      "&fltns;": "▱",
      "&fnof;": "ƒ",
      "&fopf;": "𝕗",
      "&forall;": "∀",
      "&fork;": "⋔",
      "&forkv;": "⫙",
      "&fpartint;": "⨍",
      "&frac12": "½",
      "&frac12;": "½",
      "&frac13;": "⅓",
      "&frac14": "¼",
      "&frac14;": "¼",
      "&frac15;": "⅕",
      "&frac16;": "⅙",
      "&frac18;": "⅛",
      "&frac23;": "⅔",
      "&frac25;": "⅖",
      "&frac34": "¾",
      "&frac34;": "¾",
      "&frac35;": "⅗",
      "&frac38;": "⅜",
      "&frac45;": "⅘",
      "&frac56;": "⅚",
      "&frac58;": "⅝",
      "&frac78;": "⅞",
      "&frasl;": "⁄",
      "&frown;": "⌢",
      "&fscr;": "𝒻",
      "&gE;": "≧",
      "&gEl;": "⪌",
      "&gacute;": "ǵ",
      "&gamma;": "γ",
      "&gammad;": "ϝ",
      "&gap;": "⪆",
      "&gbreve;": "ğ",
      "&gcirc;": "ĝ",
      "&gcy;": "г",
      "&gdot;": "ġ",
      "&ge;": "≥",
      "&gel;": "⋛",
      "&geq;": "≥",
      "&geqq;": "≧",
      "&geqslant;": "⩾",
      "&ges;": "⩾",
      "&gescc;": "⪩",
      "&gesdot;": "⪀",
      "&gesdoto;": "⪂",
      "&gesdotol;": "⪄",
      "&gesl;": "⋛︀",
      "&gesles;": "⪔",
      "&gfr;": "𝔤",
      "&gg;": "≫",
      "&ggg;": "⋙",
      "&gimel;": "ℷ",
      "&gjcy;": "ѓ",
      "&gl;": "≷",
      "&glE;": "⪒",
      "&gla;": "⪥",
      "&glj;": "⪤",
      "&gnE;": "≩",
      "&gnap;": "⪊",
      "&gnapprox;": "⪊",
      "&gne;": "⪈",
      "&gneq;": "⪈",
      "&gneqq;": "≩",
      "&gnsim;": "⋧",
      "&gopf;": "𝕘",
      "&grave;": "`",
      "&gscr;": "ℊ",
      "&gsim;": "≳",
      "&gsime;": "⪎",
      "&gsiml;": "⪐",
      "&gt": ">",
      "&gt;": ">",
      "&gtcc;": "⪧",
      "&gtcir;": "⩺",
      "&gtdot;": "⋗",
      "&gtlPar;": "⦕",
      "&gtquest;": "⩼",
      "&gtrapprox;": "⪆",
      "&gtrarr;": "⥸",
      "&gtrdot;": "⋗",
      "&gtreqless;": "⋛",
      "&gtreqqless;": "⪌",
      "&gtrless;": "≷",
      "&gtrsim;": "≳",
      "&gvertneqq;": "≩︀",
      "&gvnE;": "≩︀",
      "&hArr;": "⇔",
      "&hairsp;": " ",
      "&half;": "½",
      "&hamilt;": "ℋ",
      "&hardcy;": "ъ",
      "&harr;": "↔",
      "&harrcir;": "⥈",
      "&harrw;": "↭",
      "&hbar;": "ℏ",
      "&hcirc;": "ĥ",
      "&hearts;": "♥",
      "&heartsuit;": "♥",
      "&hellip;": "…",
      "&hercon;": "⊹",
      "&hfr;": "𝔥",
      "&hksearow;": "⤥",
      "&hkswarow;": "⤦",
      "&hoarr;": "⇿",
      "&homtht;": "∻",
      "&hookleftarrow;": "↩",
      "&hookrightarrow;": "↪",
      "&hopf;": "𝕙",
      "&horbar;": "―",
      "&hscr;": "𝒽",
      "&hslash;": "ℏ",
      "&hstrok;": "ħ",
      "&hybull;": "⁃",
      "&hyphen;": "‐",
      "&iacute": "í",
      "&iacute;": "í",
      "&ic;": "⁣",
      "&icirc": "î",
      "&icirc;": "î",
      "&icy;": "и",
      "&iecy;": "е",
      "&iexcl": "¡",
      "&iexcl;": "¡",
      "&iff;": "⇔",
      "&ifr;": "𝔦",
      "&igrave": "ì",
      "&igrave;": "ì",
      "&ii;": "ⅈ",
      "&iiiint;": "⨌",
      "&iiint;": "∭",
      "&iinfin;": "⧜",
      "&iiota;": "℩",
      "&ijlig;": "ĳ",
      "&imacr;": "ī",
      "&image;": "ℑ",
      "&imagline;": "ℐ",
      "&imagpart;": "ℑ",
      "&imath;": "ı",
      "&imof;": "⊷",
      "&imped;": "Ƶ",
      "&in;": "∈",
      "&incare;": "℅",
      "&infin;": "∞",
      "&infintie;": "⧝",
      "&inodot;": "ı",
      "&int;": "∫",
      "&intcal;": "⊺",
      "&integers;": "ℤ",
      "&intercal;": "⊺",
      "&intlarhk;": "⨗",
      "&intprod;": "⨼",
      "&iocy;": "ё",
      "&iogon;": "į",
      "&iopf;": "𝕚",
      "&iota;": "ι",
      "&iprod;": "⨼",
      "&iquest": "¿",
      "&iquest;": "¿",
      "&iscr;": "𝒾",
      "&isin;": "∈",
      "&isinE;": "⋹",
      "&isindot;": "⋵",
      "&isins;": "⋴",
      "&isinsv;": "⋳",
      "&isinv;": "∈",
      "&it;": "⁢",
      "&itilde;": "ĩ",
      "&iukcy;": "і",
      "&iuml": "ï",
      "&iuml;": "ï",
      "&jcirc;": "ĵ",
      "&jcy;": "й",
      "&jfr;": "𝔧",
      "&jmath;": "ȷ",
      "&jopf;": "𝕛",
      "&jscr;": "𝒿",
      "&jsercy;": "ј",
      "&jukcy;": "є",
      "&kappa;": "κ",
      "&kappav;": "ϰ",
      "&kcedil;": "ķ",
      "&kcy;": "к",
      "&kfr;": "𝔨",
      "&kgreen;": "ĸ",
      "&khcy;": "х",
      "&kjcy;": "ќ",
      "&kopf;": "𝕜",
      "&kscr;": "𝓀",
      "&lAarr;": "⇚",
      "&lArr;": "⇐",
      "&lAtail;": "⤛",
      "&lBarr;": "⤎",
      "&lE;": "≦",
      "&lEg;": "⪋",
      "&lHar;": "⥢",
      "&lacute;": "ĺ",
      "&laemptyv;": "⦴",
      "&lagran;": "ℒ",
      "&lambda;": "λ",
      "&lang;": "⟨",
      "&langd;": "⦑",
      "&langle;": "⟨",
      "&lap;": "⪅",
      "&laquo": "«",
      "&laquo;": "«",
      "&larr;": "←",
      "&larrb;": "⇤",
      "&larrbfs;": "⤟",
      "&larrfs;": "⤝",
      "&larrhk;": "↩",
      "&larrlp;": "↫",
      "&larrpl;": "⤹",
      "&larrsim;": "⥳",
      "&larrtl;": "↢",
      "&lat;": "⪫",
      "&latail;": "⤙",
      "&late;": "⪭",
      "&lates;": "⪭︀",
      "&lbarr;": "⤌",
      "&lbbrk;": "❲",
      "&lbrace;": "{",
      "&lbrack;": "[",
      "&lbrke;": "⦋",
      "&lbrksld;": "⦏",
      "&lbrkslu;": "⦍",
      "&lcaron;": "ľ",
      "&lcedil;": "ļ",
      "&lceil;": "⌈",
      "&lcub;": "{",
      "&lcy;": "л",
      "&ldca;": "⤶",
      "&ldquo;": "“",
      "&ldquor;": "„",
      "&ldrdhar;": "⥧",
      "&ldrushar;": "⥋",
      "&ldsh;": "↲",
      "&le;": "≤",
      "&leftarrow;": "←",
      "&leftarrowtail;": "↢",
      "&leftharpoondown;": "↽",
      "&leftharpoonup;": "↼",
      "&leftleftarrows;": "⇇",
      "&leftrightarrow;": "↔",
      "&leftrightarrows;": "⇆",
      "&leftrightharpoons;": "⇋",
      "&leftrightsquigarrow;": "↭",
      "&leftthreetimes;": "⋋",
      "&leg;": "⋚",
      "&leq;": "≤",
      "&leqq;": "≦",
      "&leqslant;": "⩽",
      "&les;": "⩽",
      "&lescc;": "⪨",
      "&lesdot;": "⩿",
      "&lesdoto;": "⪁",
      "&lesdotor;": "⪃",
      "&lesg;": "⋚︀",
      "&lesges;": "⪓",
      "&lessapprox;": "⪅",
      "&lessdot;": "⋖",
      "&lesseqgtr;": "⋚",
      "&lesseqqgtr;": "⪋",
      "&lessgtr;": "≶",
      "&lesssim;": "≲",
      "&lfisht;": "⥼",
      "&lfloor;": "⌊",
      "&lfr;": "𝔩",
      "&lg;": "≶",
      "&lgE;": "⪑",
      "&lhard;": "↽",
      "&lharu;": "↼",
      "&lharul;": "⥪",
      "&lhblk;": "▄",
      "&ljcy;": "љ",
      "&ll;": "≪",
      "&llarr;": "⇇",
      "&llcorner;": "⌞",
      "&llhard;": "⥫",
      "&lltri;": "◺",
      "&lmidot;": "ŀ",
      "&lmoust;": "⎰",
      "&lmoustache;": "⎰",
      "&lnE;": "≨",
      "&lnap;": "⪉",
      "&lnapprox;": "⪉",
      "&lne;": "⪇",
      "&lneq;": "⪇",
      "&lneqq;": "≨",
      "&lnsim;": "⋦",
      "&loang;": "⟬",
      "&loarr;": "⇽",
      "&lobrk;": "⟦",
      "&longleftarrow;": "⟵",
      "&longleftrightarrow;": "⟷",
      "&longmapsto;": "⟼",
      "&longrightarrow;": "⟶",
      "&looparrowleft;": "↫",
      "&looparrowright;": "↬",
      "&lopar;": "⦅",
      "&lopf;": "𝕝",
      "&loplus;": "⨭",
      "&lotimes;": "⨴",
      "&lowast;": "∗",
      "&lowbar;": "_",
      "&loz;": "◊",
      "&lozenge;": "◊",
      "&lozf;": "⧫",
      "&lpar;": "(",
      "&lparlt;": "⦓",
      "&lrarr;": "⇆",
      "&lrcorner;": "⌟",
      "&lrhar;": "⇋",
      "&lrhard;": "⥭",
      "&lrm;": "‎",
      "&lrtri;": "⊿",
      "&lsaquo;": "‹",
      "&lscr;": "𝓁",
      "&lsh;": "↰",
      "&lsim;": "≲",
      "&lsime;": "⪍",
      "&lsimg;": "⪏",
      "&lsqb;": "[",
      "&lsquo;": "‘",
      "&lsquor;": "‚",
      "&lstrok;": "ł",
      "&lt": "<",
      "&lt;": "<",
      "&ltcc;": "⪦",
      "&ltcir;": "⩹",
      "&ltdot;": "⋖",
      "&lthree;": "⋋",
      "&ltimes;": "⋉",
      "&ltlarr;": "⥶",
      "&ltquest;": "⩻",
      "&ltrPar;": "⦖",
      "&ltri;": "◃",
      "&ltrie;": "⊴",
      "&ltrif;": "◂",
      "&lurdshar;": "⥊",
      "&luruhar;": "⥦",
      "&lvertneqq;": "≨︀",
      "&lvnE;": "≨︀",
      "&mDDot;": "∺",
      "&macr": "¯",
      "&macr;": "¯",
      "&male;": "♂",
      "&malt;": "✠",
      "&maltese;": "✠",
      "&map;": "↦",
      "&mapsto;": "↦",
      "&mapstodown;": "↧",
      "&mapstoleft;": "↤",
      "&mapstoup;": "↥",
      "&marker;": "▮",
      "&mcomma;": "⨩",
      "&mcy;": "м",
      "&mdash;": "—",
      "&measuredangle;": "∡",
      "&mfr;": "𝔪",
      "&mho;": "℧",
      "&micro": "µ",
      "&micro;": "µ",
      "&mid;": "∣",
      "&midast;": "*",
      "&midcir;": "⫰",
      "&middot": "·",
      "&middot;": "·",
      "&minus;": "−",
      "&minusb;": "⊟",
      "&minusd;": "∸",
      "&minusdu;": "⨪",
      "&mlcp;": "⫛",
      "&mldr;": "…",
      "&mnplus;": "∓",
      "&models;": "⊧",
      "&mopf;": "𝕞",
      "&mp;": "∓",
      "&mscr;": "𝓂",
      "&mstpos;": "∾",
      "&mu;": "μ",
      "&multimap;": "⊸",
      "&mumap;": "⊸",
      "&nGg;": "⋙̸",
      "&nGt;": "≫⃒",
      "&nGtv;": "≫̸",
      "&nLeftarrow;": "⇍",
      "&nLeftrightarrow;": "⇎",
      "&nLl;": "⋘̸",
      "&nLt;": "≪⃒",
      "&nLtv;": "≪̸",
      "&nRightarrow;": "⇏",
      "&nVDash;": "⊯",
      "&nVdash;": "⊮",
      "&nabla;": "∇",
      "&nacute;": "ń",
      "&nang;": "∠⃒",
      "&nap;": "≉",
      "&napE;": "⩰̸",
      "&napid;": "≋̸",
      "&napos;": "ŉ",
      "&napprox;": "≉",
      "&natur;": "♮",
      "&natural;": "♮",
      "&naturals;": "ℕ",
      "&nbsp": " ",
      "&nbsp;": " ",
      "&nbump;": "≎̸",
      "&nbumpe;": "≏̸",
      "&ncap;": "⩃",
      "&ncaron;": "ň",
      "&ncedil;": "ņ",
      "&ncong;": "≇",
      "&ncongdot;": "⩭̸",
      "&ncup;": "⩂",
      "&ncy;": "н",
      "&ndash;": "–",
      "&ne;": "≠",
      "&neArr;": "⇗",
      "&nearhk;": "⤤",
      "&nearr;": "↗",
      "&nearrow;": "↗",
      "&nedot;": "≐̸",
      "&nequiv;": "≢",
      "&nesear;": "⤨",
      "&nesim;": "≂̸",
      "&nexist;": "∄",
      "&nexists;": "∄",
      "&nfr;": "𝔫",
      "&ngE;": "≧̸",
      "&nge;": "≱",
      "&ngeq;": "≱",
      "&ngeqq;": "≧̸",
      "&ngeqslant;": "⩾̸",
      "&nges;": "⩾̸",
      "&ngsim;": "≵",
      "&ngt;": "≯",
      "&ngtr;": "≯",
      "&nhArr;": "⇎",
      "&nharr;": "↮",
      "&nhpar;": "⫲",
      "&ni;": "∋",
      "&nis;": "⋼",
      "&nisd;": "⋺",
      "&niv;": "∋",
      "&njcy;": "њ",
      "&nlArr;": "⇍",
      "&nlE;": "≦̸",
      "&nlarr;": "↚",
      "&nldr;": "‥",
      "&nle;": "≰",
      "&nleftarrow;": "↚",
      "&nleftrightarrow;": "↮",
      "&nleq;": "≰",
      "&nleqq;": "≦̸",
      "&nleqslant;": "⩽̸",
      "&nles;": "⩽̸",
      "&nless;": "≮",
      "&nlsim;": "≴",
      "&nlt;": "≮",
      "&nltri;": "⋪",
      "&nltrie;": "⋬",
      "&nmid;": "∤",
      "&nopf;": "𝕟",
      "&not": "¬",
      "&not;": "¬",
      "&notin;": "∉",
      "&notinE;": "⋹̸",
      "&notindot;": "⋵̸",
      "&notinva;": "∉",
      "&notinvb;": "⋷",
      "&notinvc;": "⋶",
      "&notni;": "∌",
      "&notniva;": "∌",
      "&notnivb;": "⋾",
      "&notnivc;": "⋽",
      "&npar;": "∦",
      "&nparallel;": "∦",
      "&nparsl;": "⫽⃥",
      "&npart;": "∂̸",
      "&npolint;": "⨔",
      "&npr;": "⊀",
      "&nprcue;": "⋠",
      "&npre;": "⪯̸",
      "&nprec;": "⊀",
      "&npreceq;": "⪯̸",
      "&nrArr;": "⇏",
      "&nrarr;": "↛",
      "&nrarrc;": "⤳̸",
      "&nrarrw;": "↝̸",
      "&nrightarrow;": "↛",
      "&nrtri;": "⋫",
      "&nrtrie;": "⋭",
      "&nsc;": "⊁",
      "&nsccue;": "⋡",
      "&nsce;": "⪰̸",
      "&nscr;": "𝓃",
      "&nshortmid;": "∤",
      "&nshortparallel;": "∦",
      "&nsim;": "≁",
      "&nsime;": "≄",
      "&nsimeq;": "≄",
      "&nsmid;": "∤",
      "&nspar;": "∦",
      "&nsqsube;": "⋢",
      "&nsqsupe;": "⋣",
      "&nsub;": "⊄",
      "&nsubE;": "⫅̸",
      "&nsube;": "⊈",
      "&nsubset;": "⊂⃒",
      "&nsubseteq;": "⊈",
      "&nsubseteqq;": "⫅̸",
      "&nsucc;": "⊁",
      "&nsucceq;": "⪰̸",
      "&nsup;": "⊅",
      "&nsupE;": "⫆̸",
      "&nsupe;": "⊉",
      "&nsupset;": "⊃⃒",
      "&nsupseteq;": "⊉",
      "&nsupseteqq;": "⫆̸",
      "&ntgl;": "≹",
      "&ntilde": "ñ",
      "&ntilde;": "ñ",
      "&ntlg;": "≸",
      "&ntriangleleft;": "⋪",
      "&ntrianglelefteq;": "⋬",
      "&ntriangleright;": "⋫",
      "&ntrianglerighteq;": "⋭",
      "&nu;": "ν",
      "&num;": "#",
      "&numero;": "№",
      "&numsp;": " ",
      "&nvDash;": "⊭",
      "&nvHarr;": "⤄",
      "&nvap;": "≍⃒",
      "&nvdash;": "⊬",
      "&nvge;": "≥⃒",
      "&nvgt;": ">⃒",
      "&nvinfin;": "⧞",
      "&nvlArr;": "⤂",
      "&nvle;": "≤⃒",
      "&nvlt;": "<⃒",
      "&nvltrie;": "⊴⃒",
      "&nvrArr;": "⤃",
      "&nvrtrie;": "⊵⃒",
      "&nvsim;": "∼⃒",
      "&nwArr;": "⇖",
      "&nwarhk;": "⤣",
      "&nwarr;": "↖",
      "&nwarrow;": "↖",
      "&nwnear;": "⤧",
      "&oS;": "Ⓢ",
      "&oacute": "ó",
      "&oacute;": "ó",
      "&oast;": "⊛",
      "&ocir;": "⊚",
      "&ocirc": "ô",
      "&ocirc;": "ô",
      "&ocy;": "о",
      "&odash;": "⊝",
      "&odblac;": "ő",
      "&odiv;": "⨸",
      "&odot;": "⊙",
      "&odsold;": "⦼",
      "&oelig;": "œ",
      "&ofcir;": "⦿",
      "&ofr;": "𝔬",
      "&ogon;": "˛",
      "&ograve": "ò",
      "&ograve;": "ò",
      "&ogt;": "⧁",
      "&ohbar;": "⦵",
      "&ohm;": "Ω",
      "&oint;": "∮",
      "&olarr;": "↺",
      "&olcir;": "⦾",
      "&olcross;": "⦻",
      "&oline;": "‾",
      "&olt;": "⧀",
      "&omacr;": "ō",
      "&omega;": "ω",
      "&omicron;": "ο",
      "&omid;": "⦶",
      "&ominus;": "⊖",
      "&oopf;": "𝕠",
      "&opar;": "⦷",
      "&operp;": "⦹",
      "&oplus;": "⊕",
      "&or;": "∨",
      "&orarr;": "↻",
      "&ord;": "⩝",
      "&order;": "ℴ",
      "&orderof;": "ℴ",
      "&ordf": "ª",
      "&ordf;": "ª",
      "&ordm": "º",
      "&ordm;": "º",
      "&origof;": "⊶",
      "&oror;": "⩖",
      "&orslope;": "⩗",
      "&orv;": "⩛",
      "&oscr;": "ℴ",
      "&oslash": "ø",
      "&oslash;": "ø",
      "&osol;": "⊘",
      "&otilde": "õ",
      "&otilde;": "õ",
      "&otimes;": "⊗",
      "&otimesas;": "⨶",
      "&ouml": "ö",
      "&ouml;": "ö",
      "&ovbar;": "⌽",
      "&par;": "∥",
      "&para": "¶",
      "&para;": "¶",
      "&parallel;": "∥",
      "&parsim;": "⫳",
      "&parsl;": "⫽",
      "&part;": "∂",
      "&pcy;": "п",
      "&percnt;": "%",
      "&period;": ".",
      "&permil;": "‰",
      "&perp;": "⊥",
      "&pertenk;": "‱",
      "&pfr;": "𝔭",
      "&phi;": "φ",
      "&phiv;": "ϕ",
      "&phmmat;": "ℳ",
      "&phone;": "☎",
      "&pi;": "π",
      "&pitchfork;": "⋔",
      "&piv;": "ϖ",
      "&planck;": "ℏ",
      "&planckh;": "ℎ",
      "&plankv;": "ℏ",
      "&plus;": "+",
      "&plusacir;": "⨣",
      "&plusb;": "⊞",
      "&pluscir;": "⨢",
      "&plusdo;": "∔",
      "&plusdu;": "⨥",
      "&pluse;": "⩲",
      "&plusmn": "±",
      "&plusmn;": "±",
      "&plussim;": "⨦",
      "&plustwo;": "⨧",
      "&pm;": "±",
      "&pointint;": "⨕",
      "&popf;": "𝕡",
      "&pound": "£",
      "&pound;": "£",
      "&pr;": "≺",
      "&prE;": "⪳",
      "&prap;": "⪷",
      "&prcue;": "≼",
      "&pre;": "⪯",
      "&prec;": "≺",
      "&precapprox;": "⪷",
      "&preccurlyeq;": "≼",
      "&preceq;": "⪯",
      "&precnapprox;": "⪹",
      "&precneqq;": "⪵",
      "&precnsim;": "⋨",
      "&precsim;": "≾",
      "&prime;": "′",
      "&primes;": "ℙ",
      "&prnE;": "⪵",
      "&prnap;": "⪹",
      "&prnsim;": "⋨",
      "&prod;": "∏",
      "&profalar;": "⌮",
      "&profline;": "⌒",
      "&profsurf;": "⌓",
      "&prop;": "∝",
      "&propto;": "∝",
      "&prsim;": "≾",
      "&prurel;": "⊰",
      "&pscr;": "𝓅",
      "&psi;": "ψ",
      "&puncsp;": " ",
      "&qfr;": "𝔮",
      "&qint;": "⨌",
      "&qopf;": "𝕢",
      "&qprime;": "⁗",
      "&qscr;": "𝓆",
      "&quaternions;": "ℍ",
      "&quatint;": "⨖",
      "&quest;": "?",
      "&questeq;": "≟",
      "&quot": '"',
      "&quot;": '"',
      "&rAarr;": "⇛",
      "&rArr;": "⇒",
      "&rAtail;": "⤜",
      "&rBarr;": "⤏",
      "&rHar;": "⥤",
      "&race;": "∽̱",
      "&racute;": "ŕ",
      "&radic;": "√",
      "&raemptyv;": "⦳",
      "&rang;": "⟩",
      "&rangd;": "⦒",
      "&range;": "⦥",
      "&rangle;": "⟩",
      "&raquo": "»",
      "&raquo;": "»",
      "&rarr;": "→",
      "&rarrap;": "⥵",
      "&rarrb;": "⇥",
      "&rarrbfs;": "⤠",
      "&rarrc;": "⤳",
      "&rarrfs;": "⤞",
      "&rarrhk;": "↪",
      "&rarrlp;": "↬",
      "&rarrpl;": "⥅",
      "&rarrsim;": "⥴",
      "&rarrtl;": "↣",
      "&rarrw;": "↝",
      "&ratail;": "⤚",
      "&ratio;": "∶",
      "&rationals;": "ℚ",
      "&rbarr;": "⤍",
      "&rbbrk;": "❳",
      "&rbrace;": "}",
      "&rbrack;": "]",
      "&rbrke;": "⦌",
      "&rbrksld;": "⦎",
      "&rbrkslu;": "⦐",
      "&rcaron;": "ř",
      "&rcedil;": "ŗ",
      "&rceil;": "⌉",
      "&rcub;": "}",
      "&rcy;": "р",
      "&rdca;": "⤷",
      "&rdldhar;": "⥩",
      "&rdquo;": "”",
      "&rdquor;": "”",
      "&rdsh;": "↳",
      "&real;": "ℜ",
      "&realine;": "ℛ",
      "&realpart;": "ℜ",
      "&reals;": "ℝ",
      "&rect;": "▭",
      "&reg": "®",
      "&reg;": "®",
      "&rfisht;": "⥽",
      "&rfloor;": "⌋",
      "&rfr;": "𝔯",
      "&rhard;": "⇁",
      "&rharu;": "⇀",
      "&rharul;": "⥬",
      "&rho;": "ρ",
      "&rhov;": "ϱ",
      "&rightarrow;": "→",
      "&rightarrowtail;": "↣",
      "&rightharpoondown;": "⇁",
      "&rightharpoonup;": "⇀",
      "&rightleftarrows;": "⇄",
      "&rightleftharpoons;": "⇌",
      "&rightrightarrows;": "⇉",
      "&rightsquigarrow;": "↝",
      "&rightthreetimes;": "⋌",
      "&ring;": "˚",
      "&risingdotseq;": "≓",
      "&rlarr;": "⇄",
      "&rlhar;": "⇌",
      "&rlm;": "‏",
      "&rmoust;": "⎱",
      "&rmoustache;": "⎱",
      "&rnmid;": "⫮",
      "&roang;": "⟭",
      "&roarr;": "⇾",
      "&robrk;": "⟧",
      "&ropar;": "⦆",
      "&ropf;": "𝕣",
      "&roplus;": "⨮",
      "&rotimes;": "⨵",
      "&rpar;": ")",
      "&rpargt;": "⦔",
      "&rppolint;": "⨒",
      "&rrarr;": "⇉",
      "&rsaquo;": "›",
      "&rscr;": "𝓇",
      "&rsh;": "↱",
      "&rsqb;": "]",
      "&rsquo;": "’",
      "&rsquor;": "’",
      "&rthree;": "⋌",
      "&rtimes;": "⋊",
      "&rtri;": "▹",
      "&rtrie;": "⊵",
      "&rtrif;": "▸",
      "&rtriltri;": "⧎",
      "&ruluhar;": "⥨",
      "&rx;": "℞",
      "&sacute;": "ś",
      "&sbquo;": "‚",
      "&sc;": "≻",
      "&scE;": "⪴",
      "&scap;": "⪸",
      "&scaron;": "š",
      "&sccue;": "≽",
      "&sce;": "⪰",
      "&scedil;": "ş",
      "&scirc;": "ŝ",
      "&scnE;": "⪶",
      "&scnap;": "⪺",
      "&scnsim;": "⋩",
      "&scpolint;": "⨓",
      "&scsim;": "≿",
      "&scy;": "с",
      "&sdot;": "⋅",
      "&sdotb;": "⊡",
      "&sdote;": "⩦",
      "&seArr;": "⇘",
      "&searhk;": "⤥",
      "&searr;": "↘",
      "&searrow;": "↘",
      "&sect": "§",
      "&sect;": "§",
      "&semi;": ";",
      "&seswar;": "⤩",
      "&setminus;": "∖",
      "&setmn;": "∖",
      "&sext;": "✶",
      "&sfr;": "𝔰",
      "&sfrown;": "⌢",
      "&sharp;": "♯",
      "&shchcy;": "щ",
      "&shcy;": "ш",
      "&shortmid;": "∣",
      "&shortparallel;": "∥",
      "&shy": "­",
      "&shy;": "­",
      "&sigma;": "σ",
      "&sigmaf;": "ς",
      "&sigmav;": "ς",
      "&sim;": "∼",
      "&simdot;": "⩪",
      "&sime;": "≃",
      "&simeq;": "≃",
      "&simg;": "⪞",
      "&simgE;": "⪠",
      "&siml;": "⪝",
      "&simlE;": "⪟",
      "&simne;": "≆",
      "&simplus;": "⨤",
      "&simrarr;": "⥲",
      "&slarr;": "←",
      "&smallsetminus;": "∖",
      "&smashp;": "⨳",
      "&smeparsl;": "⧤",
      "&smid;": "∣",
      "&smile;": "⌣",
      "&smt;": "⪪",
      "&smte;": "⪬",
      "&smtes;": "⪬︀",
      "&softcy;": "ь",
      "&sol;": "/",
      "&solb;": "⧄",
      "&solbar;": "⌿",
      "&sopf;": "𝕤",
      "&spades;": "♠",
      "&spadesuit;": "♠",
      "&spar;": "∥",
      "&sqcap;": "⊓",
      "&sqcaps;": "⊓︀",
      "&sqcup;": "⊔",
      "&sqcups;": "⊔︀",
      "&sqsub;": "⊏",
      "&sqsube;": "⊑",
      "&sqsubset;": "⊏",
      "&sqsubseteq;": "⊑",
      "&sqsup;": "⊐",
      "&sqsupe;": "⊒",
      "&sqsupset;": "⊐",
      "&sqsupseteq;": "⊒",
      "&squ;": "□",
      "&square;": "□",
      "&squarf;": "▪",
      "&squf;": "▪",
      "&srarr;": "→",
      "&sscr;": "𝓈",
      "&ssetmn;": "∖",
      "&ssmile;": "⌣",
      "&sstarf;": "⋆",
      "&star;": "☆",
      "&starf;": "★",
      "&straightepsilon;": "ϵ",
      "&straightphi;": "ϕ",
      "&strns;": "¯",
      "&sub;": "⊂",
      "&subE;": "⫅",
      "&subdot;": "⪽",
      "&sube;": "⊆",
      "&subedot;": "⫃",
      "&submult;": "⫁",
      "&subnE;": "⫋",
      "&subne;": "⊊",
      "&subplus;": "⪿",
      "&subrarr;": "⥹",
      "&subset;": "⊂",
      "&subseteq;": "⊆",
      "&subseteqq;": "⫅",
      "&subsetneq;": "⊊",
      "&subsetneqq;": "⫋",
      "&subsim;": "⫇",
      "&subsub;": "⫕",
      "&subsup;": "⫓",
      "&succ;": "≻",
      "&succapprox;": "⪸",
      "&succcurlyeq;": "≽",
      "&succeq;": "⪰",
      "&succnapprox;": "⪺",
      "&succneqq;": "⪶",
      "&succnsim;": "⋩",
      "&succsim;": "≿",
      "&sum;": "∑",
      "&sung;": "♪",
      "&sup1": "¹",
      "&sup1;": "¹",
      "&sup2": "²",
      "&sup2;": "²",
      "&sup3": "³",
      "&sup3;": "³",
      "&sup;": "⊃",
      "&supE;": "⫆",
      "&supdot;": "⪾",
      "&supdsub;": "⫘",
      "&supe;": "⊇",
      "&supedot;": "⫄",
      "&suphsol;": "⟉",
      "&suphsub;": "⫗",
      "&suplarr;": "⥻",
      "&supmult;": "⫂",
      "&supnE;": "⫌",
      "&supne;": "⊋",
      "&supplus;": "⫀",
      "&supset;": "⊃",
      "&supseteq;": "⊇",
      "&supseteqq;": "⫆",
      "&supsetneq;": "⊋",
      "&supsetneqq;": "⫌",
      "&supsim;": "⫈",
      "&supsub;": "⫔",
      "&supsup;": "⫖",
      "&swArr;": "⇙",
      "&swarhk;": "⤦",
      "&swarr;": "↙",
      "&swarrow;": "↙",
      "&swnwar;": "⤪",
      "&szlig": "ß",
      "&szlig;": "ß",
      "&target;": "⌖",
      "&tau;": "τ",
      "&tbrk;": "⎴",
      "&tcaron;": "ť",
      "&tcedil;": "ţ",
      "&tcy;": "т",
      "&tdot;": "⃛",
      "&telrec;": "⌕",
      "&tfr;": "𝔱",
      "&there4;": "∴",
      "&therefore;": "∴",
      "&theta;": "θ",
      "&thetasym;": "ϑ",
      "&thetav;": "ϑ",
      "&thickapprox;": "≈",
      "&thicksim;": "∼",
      "&thinsp;": " ",
      "&thkap;": "≈",
      "&thksim;": "∼",
      "&thorn": "þ",
      "&thorn;": "þ",
      "&tilde;": "˜",
      "&times": "×",
      "&times;": "×",
      "&timesb;": "⊠",
      "&timesbar;": "⨱",
      "&timesd;": "⨰",
      "&tint;": "∭",
      "&toea;": "⤨",
      "&top;": "⊤",
      "&topbot;": "⌶",
      "&topcir;": "⫱",
      "&topf;": "𝕥",
      "&topfork;": "⫚",
      "&tosa;": "⤩",
      "&tprime;": "‴",
      "&trade;": "™",
      "&triangle;": "▵",
      "&triangledown;": "▿",
      "&triangleleft;": "◃",
      "&trianglelefteq;": "⊴",
      "&triangleq;": "≜",
      "&triangleright;": "▹",
      "&trianglerighteq;": "⊵",
      "&tridot;": "◬",
      "&trie;": "≜",
      "&triminus;": "⨺",
      "&triplus;": "⨹",
      "&trisb;": "⧍",
      "&tritime;": "⨻",
      "&trpezium;": "⏢",
      "&tscr;": "𝓉",
      "&tscy;": "ц",
      "&tshcy;": "ћ",
      "&tstrok;": "ŧ",
      "&twixt;": "≬",
      "&twoheadleftarrow;": "↞",
      "&twoheadrightarrow;": "↠",
      "&uArr;": "⇑",
      "&uHar;": "⥣",
      "&uacute": "ú",
      "&uacute;": "ú",
      "&uarr;": "↑",
      "&ubrcy;": "ў",
      "&ubreve;": "ŭ",
      "&ucirc": "û",
      "&ucirc;": "û",
      "&ucy;": "у",
      "&udarr;": "⇅",
      "&udblac;": "ű",
      "&udhar;": "⥮",
      "&ufisht;": "⥾",
      "&ufr;": "𝔲",
      "&ugrave": "ù",
      "&ugrave;": "ù",
      "&uharl;": "↿",
      "&uharr;": "↾",
      "&uhblk;": "▀",
      "&ulcorn;": "⌜",
      "&ulcorner;": "⌜",
      "&ulcrop;": "⌏",
      "&ultri;": "◸",
      "&umacr;": "ū",
      "&uml": "¨",
      "&uml;": "¨",
      "&uogon;": "ų",
      "&uopf;": "𝕦",
      "&uparrow;": "↑",
      "&updownarrow;": "↕",
      "&upharpoonleft;": "↿",
      "&upharpoonright;": "↾",
      "&uplus;": "⊎",
      "&upsi;": "υ",
      "&upsih;": "ϒ",
      "&upsilon;": "υ",
      "&upuparrows;": "⇈",
      "&urcorn;": "⌝",
      "&urcorner;": "⌝",
      "&urcrop;": "⌎",
      "&uring;": "ů",
      "&urtri;": "◹",
      "&uscr;": "𝓊",
      "&utdot;": "⋰",
      "&utilde;": "ũ",
      "&utri;": "▵",
      "&utrif;": "▴",
      "&uuarr;": "⇈",
      "&uuml": "ü",
      "&uuml;": "ü",
      "&uwangle;": "⦧",
      "&vArr;": "⇕",
      "&vBar;": "⫨",
      "&vBarv;": "⫩",
      "&vDash;": "⊨",
      "&vangrt;": "⦜",
      "&varepsilon;": "ϵ",
      "&varkappa;": "ϰ",
      "&varnothing;": "∅",
      "&varphi;": "ϕ",
      "&varpi;": "ϖ",
      "&varpropto;": "∝",
      "&varr;": "↕",
      "&varrho;": "ϱ",
      "&varsigma;": "ς",
      "&varsubsetneq;": "⊊︀",
      "&varsubsetneqq;": "⫋︀",
      "&varsupsetneq;": "⊋︀",
      "&varsupsetneqq;": "⫌︀",
      "&vartheta;": "ϑ",
      "&vartriangleleft;": "⊲",
      "&vartriangleright;": "⊳",
      "&vcy;": "в",
      "&vdash;": "⊢",
      "&vee;": "∨",
      "&veebar;": "⊻",
      "&veeeq;": "≚",
      "&vellip;": "⋮",
      "&verbar;": "|",
      "&vert;": "|",
      "&vfr;": "𝔳",
      "&vltri;": "⊲",
      "&vnsub;": "⊂⃒",
      "&vnsup;": "⊃⃒",
      "&vopf;": "𝕧",
      "&vprop;": "∝",
      "&vrtri;": "⊳",
      "&vscr;": "𝓋",
      "&vsubnE;": "⫋︀",
      "&vsubne;": "⊊︀",
      "&vsupnE;": "⫌︀",
      "&vsupne;": "⊋︀",
      "&vzigzag;": "⦚",
      "&wcirc;": "ŵ",
      "&wedbar;": "⩟",
      "&wedge;": "∧",
      "&wedgeq;": "≙",
      "&weierp;": "℘",
      "&wfr;": "𝔴",
      "&wopf;": "𝕨",
      "&wp;": "℘",
      "&wr;": "≀",
      "&wreath;": "≀",
      "&wscr;": "𝓌",
      "&xcap;": "⋂",
      "&xcirc;": "◯",
      "&xcup;": "⋃",
      "&xdtri;": "▽",
      "&xfr;": "𝔵",
      "&xhArr;": "⟺",
      "&xharr;": "⟷",
      "&xi;": "ξ",
      "&xlArr;": "⟸",
      "&xlarr;": "⟵",
      "&xmap;": "⟼",
      "&xnis;": "⋻",
      "&xodot;": "⨀",
      "&xopf;": "𝕩",
      "&xoplus;": "⨁",
      "&xotime;": "⨂",
      "&xrArr;": "⟹",
      "&xrarr;": "⟶",
      "&xscr;": "𝓍",
      "&xsqcup;": "⨆",
      "&xuplus;": "⨄",
      "&xutri;": "△",
      "&xvee;": "⋁",
      "&xwedge;": "⋀",
      "&yacute": "ý",
      "&yacute;": "ý",
      "&yacy;": "я",
      "&ycirc;": "ŷ",
      "&ycy;": "ы",
      "&yen": "¥",
      "&yen;": "¥",
      "&yfr;": "𝔶",
      "&yicy;": "ї",
      "&yopf;": "𝕪",
      "&yscr;": "𝓎",
      "&yucy;": "ю",
      "&yuml": "ÿ",
      "&yuml;": "ÿ",
      "&zacute;": "ź",
      "&zcaron;": "ž",
      "&zcy;": "з",
      "&zdot;": "ż",
      "&zeetrf;": "ℨ",
      "&zeta;": "ζ",
      "&zfr;": "𝔷",
      "&zhcy;": "ж",
      "&zigrarr;": "⇝",
      "&zopf;": "𝕫",
      "&zscr;": "𝓏",
      "&zwj;": "‍",
      "&zwnj;": "‌"
    },
    characters: {
      "Æ": "&AElig;",
      "&": "&amp;",
      "Á": "&Aacute;",
      "Ă": "&Abreve;",
      "Â": "&Acirc;",
      "А": "&Acy;",
      "𝔄": "&Afr;",
      "À": "&Agrave;",
      "Α": "&Alpha;",
      "Ā": "&Amacr;",
      "⩓": "&And;",
      "Ą": "&Aogon;",
      "𝔸": "&Aopf;",
      "⁡": "&af;",
      "Å": "&angst;",
      "𝒜": "&Ascr;",
      "≔": "&coloneq;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "∖": "&ssetmn;",
      "⫧": "&Barv;",
      "⌆": "&doublebarwedge;",
      "Б": "&Bcy;",
      "∵": "&because;",
      "ℬ": "&bernou;",
      "Β": "&Beta;",
      "𝔅": "&Bfr;",
      "𝔹": "&Bopf;",
      "˘": "&breve;",
      "≎": "&bump;",
      "Ч": "&CHcy;",
      "©": "&copy;",
      "Ć": "&Cacute;",
      "⋒": "&Cap;",
      "ⅅ": "&DD;",
      "ℭ": "&Cfr;",
      "Č": "&Ccaron;",
      "Ç": "&Ccedil;",
      "Ĉ": "&Ccirc;",
      "∰": "&Cconint;",
      "Ċ": "&Cdot;",
      "¸": "&cedil;",
      "·": "&middot;",
      "Χ": "&Chi;",
      "⊙": "&odot;",
      "⊖": "&ominus;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "∲": "&cwconint;",
      "”": "&rdquor;",
      "’": "&rsquor;",
      "∷": "&Proportion;",
      "⩴": "&Colone;",
      "≡": "&equiv;",
      "∯": "&DoubleContourIntegral;",
      "∮": "&oint;",
      "ℂ": "&complexes;",
      "∐": "&coprod;",
      "∳": "&awconint;",
      "⨯": "&Cross;",
      "𝒞": "&Cscr;",
      "⋓": "&Cup;",
      "≍": "&asympeq;",
      "⤑": "&DDotrahd;",
      "Ђ": "&DJcy;",
      "Ѕ": "&DScy;",
      "Џ": "&DZcy;",
      "‡": "&ddagger;",
      "↡": "&Darr;",
      "⫤": "&DoubleLeftTee;",
      "Ď": "&Dcaron;",
      "Д": "&Dcy;",
      "∇": "&nabla;",
      "Δ": "&Delta;",
      "𝔇": "&Dfr;",
      "´": "&acute;",
      "˙": "&dot;",
      "˝": "&dblac;",
      "`": "&grave;",
      "˜": "&tilde;",
      "⋄": "&diamond;",
      "ⅆ": "&dd;",
      "𝔻": "&Dopf;",
      "¨": "&uml;",
      "⃜": "&DotDot;",
      "≐": "&esdot;",
      "⇓": "&dArr;",
      "⇐": "&lArr;",
      "⇔": "&iff;",
      "⟸": "&xlArr;",
      "⟺": "&xhArr;",
      "⟹": "&xrArr;",
      "⇒": "&rArr;",
      "⊨": "&vDash;",
      "⇑": "&uArr;",
      "⇕": "&vArr;",
      "∥": "&spar;",
      "↓": "&downarrow;",
      "⤓": "&DownArrowBar;",
      "⇵": "&duarr;",
      "̑": "&DownBreve;",
      "⥐": "&DownLeftRightVector;",
      "⥞": "&DownLeftTeeVector;",
      "↽": "&lhard;",
      "⥖": "&DownLeftVectorBar;",
      "⥟": "&DownRightTeeVector;",
      "⇁": "&rightharpoondown;",
      "⥗": "&DownRightVectorBar;",
      "⊤": "&top;",
      "↧": "&mapstodown;",
      "𝒟": "&Dscr;",
      "Đ": "&Dstrok;",
      "Ŋ": "&ENG;",
      "Ð": "&ETH;",
      "É": "&Eacute;",
      "Ě": "&Ecaron;",
      "Ê": "&Ecirc;",
      "Э": "&Ecy;",
      "Ė": "&Edot;",
      "𝔈": "&Efr;",
      "È": "&Egrave;",
      "∈": "&isinv;",
      "Ē": "&Emacr;",
      "◻": "&EmptySmallSquare;",
      "▫": "&EmptyVerySmallSquare;",
      "Ę": "&Eogon;",
      "𝔼": "&Eopf;",
      "Ε": "&Epsilon;",
      "⩵": "&Equal;",
      "≂": "&esim;",
      "⇌": "&rlhar;",
      "ℰ": "&expectation;",
      "⩳": "&Esim;",
      "Η": "&Eta;",
      "Ë": "&Euml;",
      "∃": "&exist;",
      "ⅇ": "&exponentiale;",
      "Ф": "&Fcy;",
      "𝔉": "&Ffr;",
      "◼": "&FilledSmallSquare;",
      "▪": "&squf;",
      "𝔽": "&Fopf;",
      "∀": "&forall;",
      "ℱ": "&Fscr;",
      "Ѓ": "&GJcy;",
      ">": "&gt;",
      "Γ": "&Gamma;",
      "Ϝ": "&Gammad;",
      "Ğ": "&Gbreve;",
      "Ģ": "&Gcedil;",
      "Ĝ": "&Gcirc;",
      "Г": "&Gcy;",
      "Ġ": "&Gdot;",
      "𝔊": "&Gfr;",
      "⋙": "&ggg;",
      "𝔾": "&Gopf;",
      "≥": "&geq;",
      "⋛": "&gtreqless;",
      "≧": "&geqq;",
      "⪢": "&GreaterGreater;",
      "≷": "&gtrless;",
      "⩾": "&ges;",
      "≳": "&gtrsim;",
      "𝒢": "&Gscr;",
      "≫": "&gg;",
      "Ъ": "&HARDcy;",
      "ˇ": "&caron;",
      "^": "&Hat;",
      "Ĥ": "&Hcirc;",
      "ℌ": "&Poincareplane;",
      "ℋ": "&hamilt;",
      "ℍ": "&quaternions;",
      "─": "&boxh;",
      "Ħ": "&Hstrok;",
      "≏": "&bumpeq;",
      "Е": "&IEcy;",
      "Ĳ": "&IJlig;",
      "Ё": "&IOcy;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "И": "&Icy;",
      "İ": "&Idot;",
      "ℑ": "&imagpart;",
      "Ì": "&Igrave;",
      "Ī": "&Imacr;",
      "ⅈ": "&ii;",
      "∬": "&Int;",
      "∫": "&int;",
      "⋂": "&xcap;",
      "⁣": "&ic;",
      "⁢": "&it;",
      "Į": "&Iogon;",
      "𝕀": "&Iopf;",
      "Ι": "&Iota;",
      "ℐ": "&imagline;",
      "Ĩ": "&Itilde;",
      "І": "&Iukcy;",
      "Ï": "&Iuml;",
      "Ĵ": "&Jcirc;",
      "Й": "&Jcy;",
      "𝔍": "&Jfr;",
      "𝕁": "&Jopf;",
      "𝒥": "&Jscr;",
      "Ј": "&Jsercy;",
      "Є": "&Jukcy;",
      "Х": "&KHcy;",
      "Ќ": "&KJcy;",
      "Κ": "&Kappa;",
      "Ķ": "&Kcedil;",
      "К": "&Kcy;",
      "𝔎": "&Kfr;",
      "𝕂": "&Kopf;",
      "𝒦": "&Kscr;",
      "Љ": "&LJcy;",
      "<": "&lt;",
      "Ĺ": "&Lacute;",
      "Λ": "&Lambda;",
      "⟪": "&Lang;",
      "ℒ": "&lagran;",
      "↞": "&twoheadleftarrow;",
      "Ľ": "&Lcaron;",
      "Ļ": "&Lcedil;",
      "Л": "&Lcy;",
      "⟨": "&langle;",
      "←": "&slarr;",
      "⇤": "&larrb;",
      "⇆": "&lrarr;",
      "⌈": "&lceil;",
      "⟦": "&lobrk;",
      "⥡": "&LeftDownTeeVector;",
      "⇃": "&downharpoonleft;",
      "⥙": "&LeftDownVectorBar;",
      "⌊": "&lfloor;",
      "↔": "&leftrightarrow;",
      "⥎": "&LeftRightVector;",
      "⊣": "&dashv;",
      "↤": "&mapstoleft;",
      "⥚": "&LeftTeeVector;",
      "⊲": "&vltri;",
      "⧏": "&LeftTriangleBar;",
      "⊴": "&trianglelefteq;",
      "⥑": "&LeftUpDownVector;",
      "⥠": "&LeftUpTeeVector;",
      "↿": "&upharpoonleft;",
      "⥘": "&LeftUpVectorBar;",
      "↼": "&lharu;",
      "⥒": "&LeftVectorBar;",
      "⋚": "&lesseqgtr;",
      "≦": "&leqq;",
      "≶": "&lg;",
      "⪡": "&LessLess;",
      "⩽": "&les;",
      "≲": "&lsim;",
      "𝔏": "&Lfr;",
      "⋘": "&Ll;",
      "⇚": "&lAarr;",
      "Ŀ": "&Lmidot;",
      "⟵": "&xlarr;",
      "⟷": "&xharr;",
      "⟶": "&xrarr;",
      "𝕃": "&Lopf;",
      "↙": "&swarrow;",
      "↘": "&searrow;",
      "↰": "&lsh;",
      "Ł": "&Lstrok;",
      "≪": "&ll;",
      "⤅": "&Map;",
      "М": "&Mcy;",
      " ": "&MediumSpace;",
      "ℳ": "&phmmat;",
      "𝔐": "&Mfr;",
      "∓": "&mp;",
      "𝕄": "&Mopf;",
      "Μ": "&Mu;",
      "Њ": "&NJcy;",
      "Ń": "&Nacute;",
      "Ň": "&Ncaron;",
      "Ņ": "&Ncedil;",
      "Н": "&Ncy;",
      "​": "&ZeroWidthSpace;",
      "\n": "&NewLine;",
      "𝔑": "&Nfr;",
      "⁠": "&NoBreak;",
      " ": "&nbsp;",
      "ℕ": "&naturals;",
      "⫬": "&Not;",
      "≢": "&nequiv;",
      "≭": "&NotCupCap;",
      "∦": "&nspar;",
      "∉": "&notinva;",
      "≠": "&ne;",
      "≂̸": "&nesim;",
      "∄": "&nexists;",
      "≯": "&ngtr;",
      "≱": "&ngeq;",
      "≧̸": "&ngeqq;",
      "≫̸": "&nGtv;",
      "≹": "&ntgl;",
      "⩾̸": "&nges;",
      "≵": "&ngsim;",
      "≎̸": "&nbump;",
      "≏̸": "&nbumpe;",
      "⋪": "&ntriangleleft;",
      "⧏̸": "&NotLeftTriangleBar;",
      "⋬": "&ntrianglelefteq;",
      "≮": "&nlt;",
      "≰": "&nleq;",
      "≸": "&ntlg;",
      "≪̸": "&nLtv;",
      "⩽̸": "&nles;",
      "≴": "&nlsim;",
      "⪢̸": "&NotNestedGreaterGreater;",
      "⪡̸": "&NotNestedLessLess;",
      "⊀": "&nprec;",
      "⪯̸": "&npreceq;",
      "⋠": "&nprcue;",
      "∌": "&notniva;",
      "⋫": "&ntriangleright;",
      "⧐̸": "&NotRightTriangleBar;",
      "⋭": "&ntrianglerighteq;",
      "⊏̸": "&NotSquareSubset;",
      "⋢": "&nsqsube;",
      "⊐̸": "&NotSquareSuperset;",
      "⋣": "&nsqsupe;",
      "⊂⃒": "&vnsub;",
      "⊈": "&nsubseteq;",
      "⊁": "&nsucc;",
      "⪰̸": "&nsucceq;",
      "⋡": "&nsccue;",
      "≿̸": "&NotSucceedsTilde;",
      "⊃⃒": "&vnsup;",
      "⊉": "&nsupseteq;",
      "≁": "&nsim;",
      "≄": "&nsimeq;",
      "≇": "&ncong;",
      "≉": "&napprox;",
      "∤": "&nsmid;",
      "𝒩": "&Nscr;",
      "Ñ": "&Ntilde;",
      "Ν": "&Nu;",
      "Œ": "&OElig;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "О": "&Ocy;",
      "Ő": "&Odblac;",
      "𝔒": "&Ofr;",
      "Ò": "&Ograve;",
      "Ō": "&Omacr;",
      "Ω": "&ohm;",
      "Ο": "&Omicron;",
      "𝕆": "&Oopf;",
      "“": "&ldquo;",
      "‘": "&lsquo;",
      "⩔": "&Or;",
      "𝒪": "&Oscr;",
      "Ø": "&Oslash;",
      "Õ": "&Otilde;",
      "⨷": "&Otimes;",
      "Ö": "&Ouml;",
      "‾": "&oline;",
      "⏞": "&OverBrace;",
      "⎴": "&tbrk;",
      "⏜": "&OverParenthesis;",
      "∂": "&part;",
      "П": "&Pcy;",
      "𝔓": "&Pfr;",
      "Φ": "&Phi;",
      "Π": "&Pi;",
      "±": "&pm;",
      "ℙ": "&primes;",
      "⪻": "&Pr;",
      "≺": "&prec;",
      "⪯": "&preceq;",
      "≼": "&preccurlyeq;",
      "≾": "&prsim;",
      "″": "&Prime;",
      "∏": "&prod;",
      "∝": "&vprop;",
      "𝒫": "&Pscr;",
      "Ψ": "&Psi;",
      '"': "&quot;",
      "𝔔": "&Qfr;",
      "ℚ": "&rationals;",
      "𝒬": "&Qscr;",
      "⤐": "&drbkarow;",
      "®": "&reg;",
      "Ŕ": "&Racute;",
      "⟫": "&Rang;",
      "↠": "&twoheadrightarrow;",
      "⤖": "&Rarrtl;",
      "Ř": "&Rcaron;",
      "Ŗ": "&Rcedil;",
      "Р": "&Rcy;",
      "ℜ": "&realpart;",
      "∋": "&niv;",
      "⇋": "&lrhar;",
      "⥯": "&duhar;",
      "Ρ": "&Rho;",
      "⟩": "&rangle;",
      "→": "&srarr;",
      "⇥": "&rarrb;",
      "⇄": "&rlarr;",
      "⌉": "&rceil;",
      "⟧": "&robrk;",
      "⥝": "&RightDownTeeVector;",
      "⇂": "&downharpoonright;",
      "⥕": "&RightDownVectorBar;",
      "⌋": "&rfloor;",
      "⊢": "&vdash;",
      "↦": "&mapsto;",
      "⥛": "&RightTeeVector;",
      "⊳": "&vrtri;",
      "⧐": "&RightTriangleBar;",
      "⊵": "&trianglerighteq;",
      "⥏": "&RightUpDownVector;",
      "⥜": "&RightUpTeeVector;",
      "↾": "&upharpoonright;",
      "⥔": "&RightUpVectorBar;",
      "⇀": "&rightharpoonup;",
      "⥓": "&RightVectorBar;",
      "ℝ": "&reals;",
      "⥰": "&RoundImplies;",
      "⇛": "&rAarr;",
      "ℛ": "&realine;",
      "↱": "&rsh;",
      "⧴": "&RuleDelayed;",
      "Щ": "&SHCHcy;",
      "Ш": "&SHcy;",
      "Ь": "&SOFTcy;",
      "Ś": "&Sacute;",
      "⪼": "&Sc;",
      "Š": "&Scaron;",
      "Ş": "&Scedil;",
      "Ŝ": "&Scirc;",
      "С": "&Scy;",
      "𝔖": "&Sfr;",
      "↑": "&uparrow;",
      "Σ": "&Sigma;",
      "∘": "&compfn;",
      "𝕊": "&Sopf;",
      "√": "&radic;",
      "□": "&square;",
      "⊓": "&sqcap;",
      "⊏": "&sqsubset;",
      "⊑": "&sqsubseteq;",
      "⊐": "&sqsupset;",
      "⊒": "&sqsupseteq;",
      "⊔": "&sqcup;",
      "𝒮": "&Sscr;",
      "⋆": "&sstarf;",
      "⋐": "&Subset;",
      "⊆": "&subseteq;",
      "≻": "&succ;",
      "⪰": "&succeq;",
      "≽": "&succcurlyeq;",
      "≿": "&succsim;",
      "∑": "&sum;",
      "⋑": "&Supset;",
      "⊃": "&supset;",
      "⊇": "&supseteq;",
      "Þ": "&THORN;",
      "™": "&trade;",
      "Ћ": "&TSHcy;",
      "Ц": "&TScy;",
      "\t": "&Tab;",
      "Τ": "&Tau;",
      "Ť": "&Tcaron;",
      "Ţ": "&Tcedil;",
      "Т": "&Tcy;",
      "𝔗": "&Tfr;",
      "∴": "&therefore;",
      "Θ": "&Theta;",
      "  ": "&ThickSpace;",
      " ": "&thinsp;",
      "∼": "&thksim;",
      "≃": "&simeq;",
      "≅": "&cong;",
      "≈": "&thkap;",
      "𝕋": "&Topf;",
      "⃛": "&tdot;",
      "𝒯": "&Tscr;",
      "Ŧ": "&Tstrok;",
      "Ú": "&Uacute;",
      "↟": "&Uarr;",
      "⥉": "&Uarrocir;",
      "Ў": "&Ubrcy;",
      "Ŭ": "&Ubreve;",
      "Û": "&Ucirc;",
      "У": "&Ucy;",
      "Ű": "&Udblac;",
      "𝔘": "&Ufr;",
      "Ù": "&Ugrave;",
      "Ū": "&Umacr;",
      _: "&lowbar;",
      "⏟": "&UnderBrace;",
      "⎵": "&bbrk;",
      "⏝": "&UnderParenthesis;",
      "⋃": "&xcup;",
      "⊎": "&uplus;",
      "Ų": "&Uogon;",
      "𝕌": "&Uopf;",
      "⤒": "&UpArrowBar;",
      "⇅": "&udarr;",
      "↕": "&varr;",
      "⥮": "&udhar;",
      "⊥": "&perp;",
      "↥": "&mapstoup;",
      "↖": "&nwarrow;",
      "↗": "&nearrow;",
      "ϒ": "&upsih;",
      "Υ": "&Upsilon;",
      "Ů": "&Uring;",
      "𝒰": "&Uscr;",
      "Ũ": "&Utilde;",
      "Ü": "&Uuml;",
      "⊫": "&VDash;",
      "⫫": "&Vbar;",
      "В": "&Vcy;",
      "⊩": "&Vdash;",
      "⫦": "&Vdashl;",
      "⋁": "&xvee;",
      "‖": "&Vert;",
      "∣": "&smid;",
      "|": "&vert;",
      "❘": "&VerticalSeparator;",
      "≀": "&wreath;",
      " ": "&hairsp;",
      "𝔙": "&Vfr;",
      "𝕍": "&Vopf;",
      "𝒱": "&Vscr;",
      "⊪": "&Vvdash;",
      "Ŵ": "&Wcirc;",
      "⋀": "&xwedge;",
      "𝔚": "&Wfr;",
      "𝕎": "&Wopf;",
      "𝒲": "&Wscr;",
      "𝔛": "&Xfr;",
      "Ξ": "&Xi;",
      "𝕏": "&Xopf;",
      "𝒳": "&Xscr;",
      "Я": "&YAcy;",
      "Ї": "&YIcy;",
      "Ю": "&YUcy;",
      "Ý": "&Yacute;",
      "Ŷ": "&Ycirc;",
      "Ы": "&Ycy;",
      "𝔜": "&Yfr;",
      "𝕐": "&Yopf;",
      "𝒴": "&Yscr;",
      "Ÿ": "&Yuml;",
      "Ж": "&ZHcy;",
      "Ź": "&Zacute;",
      "Ž": "&Zcaron;",
      "З": "&Zcy;",
      "Ż": "&Zdot;",
      "Ζ": "&Zeta;",
      "ℨ": "&zeetrf;",
      "ℤ": "&integers;",
      "𝒵": "&Zscr;",
      "á": "&aacute;",
      "ă": "&abreve;",
      "∾": "&mstpos;",
      "∾̳": "&acE;",
      "∿": "&acd;",
      "â": "&acirc;",
      "а": "&acy;",
      "æ": "&aelig;",
      "𝔞": "&afr;",
      "à": "&agrave;",
      "ℵ": "&aleph;",
      "α": "&alpha;",
      "ā": "&amacr;",
      "⨿": "&amalg;",
      "∧": "&wedge;",
      "⩕": "&andand;",
      "⩜": "&andd;",
      "⩘": "&andslope;",
      "⩚": "&andv;",
      "∠": "&angle;",
      "⦤": "&ange;",
      "∡": "&measuredangle;",
      "⦨": "&angmsdaa;",
      "⦩": "&angmsdab;",
      "⦪": "&angmsdac;",
      "⦫": "&angmsdad;",
      "⦬": "&angmsdae;",
      "⦭": "&angmsdaf;",
      "⦮": "&angmsdag;",
      "⦯": "&angmsdah;",
      "∟": "&angrt;",
      "⊾": "&angrtvb;",
      "⦝": "&angrtvbd;",
      "∢": "&angsph;",
      "⍼": "&angzarr;",
      "ą": "&aogon;",
      "𝕒": "&aopf;",
      "⩰": "&apE;",
      "⩯": "&apacir;",
      "≊": "&approxeq;",
      "≋": "&apid;",
      "'": "&apos;",
      "å": "&aring;",
      "𝒶": "&ascr;",
      "*": "&midast;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "⨑": "&awint;",
      "⫭": "&bNot;",
      "≌": "&bcong;",
      "϶": "&bepsi;",
      "‵": "&bprime;",
      "∽": "&bsim;",
      "⋍": "&bsime;",
      "⊽": "&barvee;",
      "⌅": "&barwedge;",
      "⎶": "&bbrktbrk;",
      "б": "&bcy;",
      "„": "&ldquor;",
      "⦰": "&bemptyv;",
      "β": "&beta;",
      "ℶ": "&beth;",
      "≬": "&twixt;",
      "𝔟": "&bfr;",
      "◯": "&xcirc;",
      "⨀": "&xodot;",
      "⨁": "&xoplus;",
      "⨂": "&xotime;",
      "⨆": "&xsqcup;",
      "★": "&starf;",
      "▽": "&xdtri;",
      "△": "&xutri;",
      "⨄": "&xuplus;",
      "⤍": "&rbarr;",
      "⧫": "&lozf;",
      "▴": "&utrif;",
      "▾": "&dtrif;",
      "◂": "&ltrif;",
      "▸": "&rtrif;",
      "␣": "&blank;",
      "▒": "&blk12;",
      "░": "&blk14;",
      "▓": "&blk34;",
      "█": "&block;",
      "=⃥": "&bne;",
      "≡⃥": "&bnequiv;",
      "⌐": "&bnot;",
      "𝕓": "&bopf;",
      "⋈": "&bowtie;",
      "╗": "&boxDL;",
      "╔": "&boxDR;",
      "╖": "&boxDl;",
      "╓": "&boxDr;",
      "═": "&boxH;",
      "╦": "&boxHD;",
      "╩": "&boxHU;",
      "╤": "&boxHd;",
      "╧": "&boxHu;",
      "╝": "&boxUL;",
      "╚": "&boxUR;",
      "╜": "&boxUl;",
      "╙": "&boxUr;",
      "║": "&boxV;",
      "╬": "&boxVH;",
      "╣": "&boxVL;",
      "╠": "&boxVR;",
      "╫": "&boxVh;",
      "╢": "&boxVl;",
      "╟": "&boxVr;",
      "⧉": "&boxbox;",
      "╕": "&boxdL;",
      "╒": "&boxdR;",
      "┐": "&boxdl;",
      "┌": "&boxdr;",
      "╥": "&boxhD;",
      "╨": "&boxhU;",
      "┬": "&boxhd;",
      "┴": "&boxhu;",
      "⊟": "&minusb;",
      "⊞": "&plusb;",
      "⊠": "&timesb;",
      "╛": "&boxuL;",
      "╘": "&boxuR;",
      "┘": "&boxul;",
      "└": "&boxur;",
      "│": "&boxv;",
      "╪": "&boxvH;",
      "╡": "&boxvL;",
      "╞": "&boxvR;",
      "┼": "&boxvh;",
      "┤": "&boxvl;",
      "├": "&boxvr;",
      "¦": "&brvbar;",
      "𝒷": "&bscr;",
      "⁏": "&bsemi;",
      "\\": "&bsol;",
      "⧅": "&bsolb;",
      "⟈": "&bsolhsub;",
      "•": "&bullet;",
      "⪮": "&bumpE;",
      "ć": "&cacute;",
      "∩": "&cap;",
      "⩄": "&capand;",
      "⩉": "&capbrcup;",
      "⩋": "&capcap;",
      "⩇": "&capcup;",
      "⩀": "&capdot;",
      "∩︀": "&caps;",
      "⁁": "&caret;",
      "⩍": "&ccaps;",
      "č": "&ccaron;",
      "ç": "&ccedil;",
      "ĉ": "&ccirc;",
      "⩌": "&ccups;",
      "⩐": "&ccupssm;",
      "ċ": "&cdot;",
      "⦲": "&cemptyv;",
      "¢": "&cent;",
      "𝔠": "&cfr;",
      "ч": "&chcy;",
      "✓": "&checkmark;",
      "χ": "&chi;",
      "○": "&cir;",
      "⧃": "&cirE;",
      "ˆ": "&circ;",
      "≗": "&cire;",
      "↺": "&olarr;",
      "↻": "&orarr;",
      "Ⓢ": "&oS;",
      "⊛": "&oast;",
      "⊚": "&ocir;",
      "⊝": "&odash;",
      "⨐": "&cirfnint;",
      "⫯": "&cirmid;",
      "⧂": "&cirscir;",
      "♣": "&clubsuit;",
      ":": "&colon;",
      ",": "&comma;",
      "@": "&commat;",
      "∁": "&complement;",
      "⩭": "&congdot;",
      "𝕔": "&copf;",
      "℗": "&copysr;",
      "↵": "&crarr;",
      "✗": "&cross;",
      "𝒸": "&cscr;",
      "⫏": "&csub;",
      "⫑": "&csube;",
      "⫐": "&csup;",
      "⫒": "&csupe;",
      "⋯": "&ctdot;",
      "⤸": "&cudarrl;",
      "⤵": "&cudarrr;",
      "⋞": "&curlyeqprec;",
      "⋟": "&curlyeqsucc;",
      "↶": "&curvearrowleft;",
      "⤽": "&cularrp;",
      "∪": "&cup;",
      "⩈": "&cupbrcap;",
      "⩆": "&cupcap;",
      "⩊": "&cupcup;",
      "⊍": "&cupdot;",
      "⩅": "&cupor;",
      "∪︀": "&cups;",
      "↷": "&curvearrowright;",
      "⤼": "&curarrm;",
      "⋎": "&cuvee;",
      "⋏": "&cuwed;",
      "¤": "&curren;",
      "∱": "&cwint;",
      "⌭": "&cylcty;",
      "⥥": "&dHar;",
      "†": "&dagger;",
      "ℸ": "&daleth;",
      "‐": "&hyphen;",
      "⤏": "&rBarr;",
      "ď": "&dcaron;",
      "д": "&dcy;",
      "⇊": "&downdownarrows;",
      "⩷": "&eDDot;",
      "°": "&deg;",
      "δ": "&delta;",
      "⦱": "&demptyv;",
      "⥿": "&dfisht;",
      "𝔡": "&dfr;",
      "♦": "&diams;",
      "ϝ": "&gammad;",
      "⋲": "&disin;",
      "÷": "&divide;",
      "⋇": "&divonx;",
      "ђ": "&djcy;",
      "⌞": "&llcorner;",
      "⌍": "&dlcrop;",
      $: "&dollar;",
      "𝕕": "&dopf;",
      "≑": "&eDot;",
      "∸": "&minusd;",
      "∔": "&plusdo;",
      "⊡": "&sdotb;",
      "⌟": "&lrcorner;",
      "⌌": "&drcrop;",
      "𝒹": "&dscr;",
      "ѕ": "&dscy;",
      "⧶": "&dsol;",
      "đ": "&dstrok;",
      "⋱": "&dtdot;",
      "▿": "&triangledown;",
      "⦦": "&dwangle;",
      "џ": "&dzcy;",
      "⟿": "&dzigrarr;",
      "é": "&eacute;",
      "⩮": "&easter;",
      "ě": "&ecaron;",
      "≖": "&eqcirc;",
      "ê": "&ecirc;",
      "≕": "&eqcolon;",
      "э": "&ecy;",
      "ė": "&edot;",
      "≒": "&fallingdotseq;",
      "𝔢": "&efr;",
      "⪚": "&eg;",
      "è": "&egrave;",
      "⪖": "&eqslantgtr;",
      "⪘": "&egsdot;",
      "⪙": "&el;",
      "⏧": "&elinters;",
      "ℓ": "&ell;",
      "⪕": "&eqslantless;",
      "⪗": "&elsdot;",
      "ē": "&emacr;",
      "∅": "&varnothing;",
      " ": "&emsp13;",
      " ": "&emsp14;",
      " ": "&emsp;",
      "ŋ": "&eng;",
      " ": "&ensp;",
      "ę": "&eogon;",
      "𝕖": "&eopf;",
      "⋕": "&epar;",
      "⧣": "&eparsl;",
      "⩱": "&eplus;",
      "ε": "&epsilon;",
      "ϵ": "&varepsilon;",
      "=": "&equals;",
      "≟": "&questeq;",
      "⩸": "&equivDD;",
      "⧥": "&eqvparsl;",
      "≓": "&risingdotseq;",
      "⥱": "&erarr;",
      "ℯ": "&escr;",
      "η": "&eta;",
      "ð": "&eth;",
      "ë": "&euml;",
      "€": "&euro;",
      "!": "&excl;",
      "ф": "&fcy;",
      "♀": "&female;",
      "ﬃ": "&ffilig;",
      "ﬀ": "&fflig;",
      "ﬄ": "&ffllig;",
      "𝔣": "&ffr;",
      "ﬁ": "&filig;",
      fj: "&fjlig;",
      "♭": "&flat;",
      "ﬂ": "&fllig;",
      "▱": "&fltns;",
      "ƒ": "&fnof;",
      "𝕗": "&fopf;",
      "⋔": "&pitchfork;",
      "⫙": "&forkv;",
      "⨍": "&fpartint;",
      "½": "&half;",
      "⅓": "&frac13;",
      "¼": "&frac14;",
      "⅕": "&frac15;",
      "⅙": "&frac16;",
      "⅛": "&frac18;",
      "⅔": "&frac23;",
      "⅖": "&frac25;",
      "¾": "&frac34;",
      "⅗": "&frac35;",
      "⅜": "&frac38;",
      "⅘": "&frac45;",
      "⅚": "&frac56;",
      "⅝": "&frac58;",
      "⅞": "&frac78;",
      "⁄": "&frasl;",
      "⌢": "&sfrown;",
      "𝒻": "&fscr;",
      "⪌": "&gtreqqless;",
      "ǵ": "&gacute;",
      "γ": "&gamma;",
      "⪆": "&gtrapprox;",
      "ğ": "&gbreve;",
      "ĝ": "&gcirc;",
      "г": "&gcy;",
      "ġ": "&gdot;",
      "⪩": "&gescc;",
      "⪀": "&gesdot;",
      "⪂": "&gesdoto;",
      "⪄": "&gesdotol;",
      "⋛︀": "&gesl;",
      "⪔": "&gesles;",
      "𝔤": "&gfr;",
      "ℷ": "&gimel;",
      "ѓ": "&gjcy;",
      "⪒": "&glE;",
      "⪥": "&gla;",
      "⪤": "&glj;",
      "≩": "&gneqq;",
      "⪊": "&gnapprox;",
      "⪈": "&gneq;",
      "⋧": "&gnsim;",
      "𝕘": "&gopf;",
      "ℊ": "&gscr;",
      "⪎": "&gsime;",
      "⪐": "&gsiml;",
      "⪧": "&gtcc;",
      "⩺": "&gtcir;",
      "⋗": "&gtrdot;",
      "⦕": "&gtlPar;",
      "⩼": "&gtquest;",
      "⥸": "&gtrarr;",
      "≩︀": "&gvnE;",
      "ъ": "&hardcy;",
      "⥈": "&harrcir;",
      "↭": "&leftrightsquigarrow;",
      "ℏ": "&plankv;",
      "ĥ": "&hcirc;",
      "♥": "&heartsuit;",
      "…": "&mldr;",
      "⊹": "&hercon;",
      "𝔥": "&hfr;",
      "⤥": "&searhk;",
      "⤦": "&swarhk;",
      "⇿": "&hoarr;",
      "∻": "&homtht;",
      "↩": "&larrhk;",
      "↪": "&rarrhk;",
      "𝕙": "&hopf;",
      "―": "&horbar;",
      "𝒽": "&hscr;",
      "ħ": "&hstrok;",
      "⁃": "&hybull;",
      "í": "&iacute;",
      "î": "&icirc;",
      "и": "&icy;",
      "е": "&iecy;",
      "¡": "&iexcl;",
      "𝔦": "&ifr;",
      "ì": "&igrave;",
      "⨌": "&qint;",
      "∭": "&tint;",
      "⧜": "&iinfin;",
      "℩": "&iiota;",
      "ĳ": "&ijlig;",
      "ī": "&imacr;",
      "ı": "&inodot;",
      "⊷": "&imof;",
      "Ƶ": "&imped;",
      "℅": "&incare;",
      "∞": "&infin;",
      "⧝": "&infintie;",
      "⊺": "&intercal;",
      "⨗": "&intlarhk;",
      "⨼": "&iprod;",
      "ё": "&iocy;",
      "į": "&iogon;",
      "𝕚": "&iopf;",
      "ι": "&iota;",
      "¿": "&iquest;",
      "𝒾": "&iscr;",
      "⋹": "&isinE;",
      "⋵": "&isindot;",
      "⋴": "&isins;",
      "⋳": "&isinsv;",
      "ĩ": "&itilde;",
      "і": "&iukcy;",
      "ï": "&iuml;",
      "ĵ": "&jcirc;",
      "й": "&jcy;",
      "𝔧": "&jfr;",
      "ȷ": "&jmath;",
      "𝕛": "&jopf;",
      "𝒿": "&jscr;",
      "ј": "&jsercy;",
      "є": "&jukcy;",
      "κ": "&kappa;",
      "ϰ": "&varkappa;",
      "ķ": "&kcedil;",
      "к": "&kcy;",
      "𝔨": "&kfr;",
      "ĸ": "&kgreen;",
      "х": "&khcy;",
      "ќ": "&kjcy;",
      "𝕜": "&kopf;",
      "𝓀": "&kscr;",
      "⤛": "&lAtail;",
      "⤎": "&lBarr;",
      "⪋": "&lesseqqgtr;",
      "⥢": "&lHar;",
      "ĺ": "&lacute;",
      "⦴": "&laemptyv;",
      "λ": "&lambda;",
      "⦑": "&langd;",
      "⪅": "&lessapprox;",
      "«": "&laquo;",
      "⤟": "&larrbfs;",
      "⤝": "&larrfs;",
      "↫": "&looparrowleft;",
      "⤹": "&larrpl;",
      "⥳": "&larrsim;",
      "↢": "&leftarrowtail;",
      "⪫": "&lat;",
      "⤙": "&latail;",
      "⪭": "&late;",
      "⪭︀": "&lates;",
      "⤌": "&lbarr;",
      "❲": "&lbbrk;",
      "{": "&lcub;",
      "[": "&lsqb;",
      "⦋": "&lbrke;",
      "⦏": "&lbrksld;",
      "⦍": "&lbrkslu;",
      "ľ": "&lcaron;",
      "ļ": "&lcedil;",
      "л": "&lcy;",
      "⤶": "&ldca;",
      "⥧": "&ldrdhar;",
      "⥋": "&ldrushar;",
      "↲": "&ldsh;",
      "≤": "&leq;",
      "⇇": "&llarr;",
      "⋋": "&lthree;",
      "⪨": "&lescc;",
      "⩿": "&lesdot;",
      "⪁": "&lesdoto;",
      "⪃": "&lesdotor;",
      "⋚︀": "&lesg;",
      "⪓": "&lesges;",
      "⋖": "&ltdot;",
      "⥼": "&lfisht;",
      "𝔩": "&lfr;",
      "⪑": "&lgE;",
      "⥪": "&lharul;",
      "▄": "&lhblk;",
      "љ": "&ljcy;",
      "⥫": "&llhard;",
      "◺": "&lltri;",
      "ŀ": "&lmidot;",
      "⎰": "&lmoustache;",
      "≨": "&lneqq;",
      "⪉": "&lnapprox;",
      "⪇": "&lneq;",
      "⋦": "&lnsim;",
      "⟬": "&loang;",
      "⇽": "&loarr;",
      "⟼": "&xmap;",
      "↬": "&rarrlp;",
      "⦅": "&lopar;",
      "𝕝": "&lopf;",
      "⨭": "&loplus;",
      "⨴": "&lotimes;",
      "∗": "&lowast;",
      "◊": "&lozenge;",
      "(": "&lpar;",
      "⦓": "&lparlt;",
      "⥭": "&lrhard;",
      "‎": "&lrm;",
      "⊿": "&lrtri;",
      "‹": "&lsaquo;",
      "𝓁": "&lscr;",
      "⪍": "&lsime;",
      "⪏": "&lsimg;",
      "‚": "&sbquo;",
      "ł": "&lstrok;",
      "⪦": "&ltcc;",
      "⩹": "&ltcir;",
      "⋉": "&ltimes;",
      "⥶": "&ltlarr;",
      "⩻": "&ltquest;",
      "⦖": "&ltrPar;",
      "◃": "&triangleleft;",
      "⥊": "&lurdshar;",
      "⥦": "&luruhar;",
      "≨︀": "&lvnE;",
      "∺": "&mDDot;",
      "¯": "&strns;",
      "♂": "&male;",
      "✠": "&maltese;",
      "▮": "&marker;",
      "⨩": "&mcomma;",
      "м": "&mcy;",
      "—": "&mdash;",
      "𝔪": "&mfr;",
      "℧": "&mho;",
      "µ": "&micro;",
      "⫰": "&midcir;",
      "−": "&minus;",
      "⨪": "&minusdu;",
      "⫛": "&mlcp;",
      "⊧": "&models;",
      "𝕞": "&mopf;",
      "𝓂": "&mscr;",
      "μ": "&mu;",
      "⊸": "&mumap;",
      "⋙̸": "&nGg;",
      "≫⃒": "&nGt;",
      "⇍": "&nlArr;",
      "⇎": "&nhArr;",
      "⋘̸": "&nLl;",
      "≪⃒": "&nLt;",
      "⇏": "&nrArr;",
      "⊯": "&nVDash;",
      "⊮": "&nVdash;",
      "ń": "&nacute;",
      "∠⃒": "&nang;",
      "⩰̸": "&napE;",
      "≋̸": "&napid;",
      "ŉ": "&napos;",
      "♮": "&natural;",
      "⩃": "&ncap;",
      "ň": "&ncaron;",
      "ņ": "&ncedil;",
      "⩭̸": "&ncongdot;",
      "⩂": "&ncup;",
      "н": "&ncy;",
      "–": "&ndash;",
      "⇗": "&neArr;",
      "⤤": "&nearhk;",
      "≐̸": "&nedot;",
      "⤨": "&toea;",
      "𝔫": "&nfr;",
      "↮": "&nleftrightarrow;",
      "⫲": "&nhpar;",
      "⋼": "&nis;",
      "⋺": "&nisd;",
      "њ": "&njcy;",
      "≦̸": "&nleqq;",
      "↚": "&nleftarrow;",
      "‥": "&nldr;",
      "𝕟": "&nopf;",
      "¬": "&not;",
      "⋹̸": "&notinE;",
      "⋵̸": "&notindot;",
      "⋷": "&notinvb;",
      "⋶": "&notinvc;",
      "⋾": "&notnivb;",
      "⋽": "&notnivc;",
      "⫽⃥": "&nparsl;",
      "∂̸": "&npart;",
      "⨔": "&npolint;",
      "↛": "&nrightarrow;",
      "⤳̸": "&nrarrc;",
      "↝̸": "&nrarrw;",
      "𝓃": "&nscr;",
      "⊄": "&nsub;",
      "⫅̸": "&nsubseteqq;",
      "⊅": "&nsup;",
      "⫆̸": "&nsupseteqq;",
      "ñ": "&ntilde;",
      "ν": "&nu;",
      "#": "&num;",
      "№": "&numero;",
      " ": "&numsp;",
      "⊭": "&nvDash;",
      "⤄": "&nvHarr;",
      "≍⃒": "&nvap;",
      "⊬": "&nvdash;",
      "≥⃒": "&nvge;",
      ">⃒": "&nvgt;",
      "⧞": "&nvinfin;",
      "⤂": "&nvlArr;",
      "≤⃒": "&nvle;",
      "<⃒": "&nvlt;",
      "⊴⃒": "&nvltrie;",
      "⤃": "&nvrArr;",
      "⊵⃒": "&nvrtrie;",
      "∼⃒": "&nvsim;",
      "⇖": "&nwArr;",
      "⤣": "&nwarhk;",
      "⤧": "&nwnear;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "о": "&ocy;",
      "ő": "&odblac;",
      "⨸": "&odiv;",
      "⦼": "&odsold;",
      "œ": "&oelig;",
      "⦿": "&ofcir;",
      "𝔬": "&ofr;",
      "˛": "&ogon;",
      "ò": "&ograve;",
      "⧁": "&ogt;",
      "⦵": "&ohbar;",
      "⦾": "&olcir;",
      "⦻": "&olcross;",
      "⧀": "&olt;",
      "ō": "&omacr;",
      "ω": "&omega;",
      "ο": "&omicron;",
      "⦶": "&omid;",
      "𝕠": "&oopf;",
      "⦷": "&opar;",
      "⦹": "&operp;",
      "∨": "&vee;",
      "⩝": "&ord;",
      "ℴ": "&oscr;",
      "ª": "&ordf;",
      "º": "&ordm;",
      "⊶": "&origof;",
      "⩖": "&oror;",
      "⩗": "&orslope;",
      "⩛": "&orv;",
      "ø": "&oslash;",
      "⊘": "&osol;",
      "õ": "&otilde;",
      "⨶": "&otimesas;",
      "ö": "&ouml;",
      "⌽": "&ovbar;",
      "¶": "&para;",
      "⫳": "&parsim;",
      "⫽": "&parsl;",
      "п": "&pcy;",
      "%": "&percnt;",
      ".": "&period;",
      "‰": "&permil;",
      "‱": "&pertenk;",
      "𝔭": "&pfr;",
      "φ": "&phi;",
      "ϕ": "&varphi;",
      "☎": "&phone;",
      "π": "&pi;",
      "ϖ": "&varpi;",
      "ℎ": "&planckh;",
      "+": "&plus;",
      "⨣": "&plusacir;",
      "⨢": "&pluscir;",
      "⨥": "&plusdu;",
      "⩲": "&pluse;",
      "⨦": "&plussim;",
      "⨧": "&plustwo;",
      "⨕": "&pointint;",
      "𝕡": "&popf;",
      "£": "&pound;",
      "⪳": "&prE;",
      "⪷": "&precapprox;",
      "⪹": "&prnap;",
      "⪵": "&prnE;",
      "⋨": "&prnsim;",
      "′": "&prime;",
      "⌮": "&profalar;",
      "⌒": "&profline;",
      "⌓": "&profsurf;",
      "⊰": "&prurel;",
      "𝓅": "&pscr;",
      "ψ": "&psi;",
      " ": "&puncsp;",
      "𝔮": "&qfr;",
      "𝕢": "&qopf;",
      "⁗": "&qprime;",
      "𝓆": "&qscr;",
      "⨖": "&quatint;",
      "?": "&quest;",
      "⤜": "&rAtail;",
      "⥤": "&rHar;",
      "∽̱": "&race;",
      "ŕ": "&racute;",
      "⦳": "&raemptyv;",
      "⦒": "&rangd;",
      "⦥": "&range;",
      "»": "&raquo;",
      "⥵": "&rarrap;",
      "⤠": "&rarrbfs;",
      "⤳": "&rarrc;",
      "⤞": "&rarrfs;",
      "⥅": "&rarrpl;",
      "⥴": "&rarrsim;",
      "↣": "&rightarrowtail;",
      "↝": "&rightsquigarrow;",
      "⤚": "&ratail;",
      "∶": "&ratio;",
      "❳": "&rbbrk;",
      "}": "&rcub;",
      "]": "&rsqb;",
      "⦌": "&rbrke;",
      "⦎": "&rbrksld;",
      "⦐": "&rbrkslu;",
      "ř": "&rcaron;",
      "ŗ": "&rcedil;",
      "р": "&rcy;",
      "⤷": "&rdca;",
      "⥩": "&rdldhar;",
      "↳": "&rdsh;",
      "▭": "&rect;",
      "⥽": "&rfisht;",
      "𝔯": "&rfr;",
      "⥬": "&rharul;",
      "ρ": "&rho;",
      "ϱ": "&varrho;",
      "⇉": "&rrarr;",
      "⋌": "&rthree;",
      "˚": "&ring;",
      "‏": "&rlm;",
      "⎱": "&rmoustache;",
      "⫮": "&rnmid;",
      "⟭": "&roang;",
      "⇾": "&roarr;",
      "⦆": "&ropar;",
      "𝕣": "&ropf;",
      "⨮": "&roplus;",
      "⨵": "&rotimes;",
      ")": "&rpar;",
      "⦔": "&rpargt;",
      "⨒": "&rppolint;",
      "›": "&rsaquo;",
      "𝓇": "&rscr;",
      "⋊": "&rtimes;",
      "▹": "&triangleright;",
      "⧎": "&rtriltri;",
      "⥨": "&ruluhar;",
      "℞": "&rx;",
      "ś": "&sacute;",
      "⪴": "&scE;",
      "⪸": "&succapprox;",
      "š": "&scaron;",
      "ş": "&scedil;",
      "ŝ": "&scirc;",
      "⪶": "&succneqq;",
      "⪺": "&succnapprox;",
      "⋩": "&succnsim;",
      "⨓": "&scpolint;",
      "с": "&scy;",
      "⋅": "&sdot;",
      "⩦": "&sdote;",
      "⇘": "&seArr;",
      "§": "&sect;",
      ";": "&semi;",
      "⤩": "&tosa;",
      "✶": "&sext;",
      "𝔰": "&sfr;",
      "♯": "&sharp;",
      "щ": "&shchcy;",
      "ш": "&shcy;",
      "­": "&shy;",
      "σ": "&sigma;",
      "ς": "&varsigma;",
      "⩪": "&simdot;",
      "⪞": "&simg;",
      "⪠": "&simgE;",
      "⪝": "&siml;",
      "⪟": "&simlE;",
      "≆": "&simne;",
      "⨤": "&simplus;",
      "⥲": "&simrarr;",
      "⨳": "&smashp;",
      "⧤": "&smeparsl;",
      "⌣": "&ssmile;",
      "⪪": "&smt;",
      "⪬": "&smte;",
      "⪬︀": "&smtes;",
      "ь": "&softcy;",
      "/": "&sol;",
      "⧄": "&solb;",
      "⌿": "&solbar;",
      "𝕤": "&sopf;",
      "♠": "&spadesuit;",
      "⊓︀": "&sqcaps;",
      "⊔︀": "&sqcups;",
      "𝓈": "&sscr;",
      "☆": "&star;",
      "⊂": "&subset;",
      "⫅": "&subseteqq;",
      "⪽": "&subdot;",
      "⫃": "&subedot;",
      "⫁": "&submult;",
      "⫋": "&subsetneqq;",
      "⊊": "&subsetneq;",
      "⪿": "&subplus;",
      "⥹": "&subrarr;",
      "⫇": "&subsim;",
      "⫕": "&subsub;",
      "⫓": "&subsup;",
      "♪": "&sung;",
      "¹": "&sup1;",
      "²": "&sup2;",
      "³": "&sup3;",
      "⫆": "&supseteqq;",
      "⪾": "&supdot;",
      "⫘": "&supdsub;",
      "⫄": "&supedot;",
      "⟉": "&suphsol;",
      "⫗": "&suphsub;",
      "⥻": "&suplarr;",
      "⫂": "&supmult;",
      "⫌": "&supsetneqq;",
      "⊋": "&supsetneq;",
      "⫀": "&supplus;",
      "⫈": "&supsim;",
      "⫔": "&supsub;",
      "⫖": "&supsup;",
      "⇙": "&swArr;",
      "⤪": "&swnwar;",
      "ß": "&szlig;",
      "⌖": "&target;",
      "τ": "&tau;",
      "ť": "&tcaron;",
      "ţ": "&tcedil;",
      "т": "&tcy;",
      "⌕": "&telrec;",
      "𝔱": "&tfr;",
      "θ": "&theta;",
      "ϑ": "&vartheta;",
      "þ": "&thorn;",
      "×": "&times;",
      "⨱": "&timesbar;",
      "⨰": "&timesd;",
      "⌶": "&topbot;",
      "⫱": "&topcir;",
      "𝕥": "&topf;",
      "⫚": "&topfork;",
      "‴": "&tprime;",
      "▵": "&utri;",
      "≜": "&trie;",
      "◬": "&tridot;",
      "⨺": "&triminus;",
      "⨹": "&triplus;",
      "⧍": "&trisb;",
      "⨻": "&tritime;",
      "⏢": "&trpezium;",
      "𝓉": "&tscr;",
      "ц": "&tscy;",
      "ћ": "&tshcy;",
      "ŧ": "&tstrok;",
      "⥣": "&uHar;",
      "ú": "&uacute;",
      "ў": "&ubrcy;",
      "ŭ": "&ubreve;",
      "û": "&ucirc;",
      "у": "&ucy;",
      "ű": "&udblac;",
      "⥾": "&ufisht;",
      "𝔲": "&ufr;",
      "ù": "&ugrave;",
      "▀": "&uhblk;",
      "⌜": "&ulcorner;",
      "⌏": "&ulcrop;",
      "◸": "&ultri;",
      "ū": "&umacr;",
      "ų": "&uogon;",
      "𝕦": "&uopf;",
      "υ": "&upsilon;",
      "⇈": "&uuarr;",
      "⌝": "&urcorner;",
      "⌎": "&urcrop;",
      "ů": "&uring;",
      "◹": "&urtri;",
      "𝓊": "&uscr;",
      "⋰": "&utdot;",
      "ũ": "&utilde;",
      "ü": "&uuml;",
      "⦧": "&uwangle;",
      "⫨": "&vBar;",
      "⫩": "&vBarv;",
      "⦜": "&vangrt;",
      "⊊︀": "&vsubne;",
      "⫋︀": "&vsubnE;",
      "⊋︀": "&vsupne;",
      "⫌︀": "&vsupnE;",
      "в": "&vcy;",
      "⊻": "&veebar;",
      "≚": "&veeeq;",
      "⋮": "&vellip;",
      "𝔳": "&vfr;",
      "𝕧": "&vopf;",
      "𝓋": "&vscr;",
      "⦚": "&vzigzag;",
      "ŵ": "&wcirc;",
      "⩟": "&wedbar;",
      "≙": "&wedgeq;",
      "℘": "&wp;",
      "𝔴": "&wfr;",
      "𝕨": "&wopf;",
      "𝓌": "&wscr;",
      "𝔵": "&xfr;",
      "ξ": "&xi;",
      "⋻": "&xnis;",
      "𝕩": "&xopf;",
      "𝓍": "&xscr;",
      "ý": "&yacute;",
      "я": "&yacy;",
      "ŷ": "&ycirc;",
      "ы": "&ycy;",
      "¥": "&yen;",
      "𝔶": "&yfr;",
      "ї": "&yicy;",
      "𝕪": "&yopf;",
      "𝓎": "&yscr;",
      "ю": "&yucy;",
      "ÿ": "&yuml;",
      "ź": "&zacute;",
      "ž": "&zcaron;",
      "з": "&zcy;",
      "ż": "&zdot;",
      "ζ": "&zeta;",
      "𝔷": "&zfr;",
      "ж": "&zhcy;",
      "⇝": "&zigrarr;",
      "𝕫": "&zopf;",
      "𝓏": "&zscr;",
      "‍": "&zwj;",
      "‌": "&zwnj;"
    }
  }
};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.numericUnicodeMap = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376
};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fromCodePoint = String.fromCodePoint || function (astralCodePoint) {
  return String.fromCharCode(Math.floor((astralCodePoint - 65536) / 1024) + 55296, (astralCodePoint - 65536) % 1024 + 56320);
};
exports.getCodePoint = String.prototype.codePointAt ? function (input, position) {
  return input.codePointAt(position);
} : function (input, position) {
  return (input.charCodeAt(position) - 55296) * 1024 + input.charCodeAt(position + 1) - 56320 + 65536;
};
exports.highSurrogateFrom = 55296;
exports.highSurrogateTo = 56319;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* eslint-env browser */
/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */
var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");
var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;

/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */
function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this;
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };
    clearTimeout(timeout);

    // @ts-ignore
    timeout = setTimeout(functionCall, time);
  };
}
function noop() {}

/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */
function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];
  if (!src) {
    if (document.currentScript) {
      src = ( /** @type {HTMLScriptElement} */document.currentScript).src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];
      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */
  return function (fileMap) {
    if (!src) {
      return null;
    }
    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace(".js", ".css")];
    }
    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }
    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

/**
 * @param {TODO} el
 * @param {string} [url]
 */
function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    }

    // eslint-disable-next-line
    url = el.href.split("?")[0];
  }
  if (!isUrlRequest( /** @type {string} */url)) {
    return;
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }
  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());
  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */
function getReloadUrl(href, src) {
  var ret;

  // eslint-disable-next-line no-param-reassign
  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

/**
 * @param {string} [src]
 * @returns {boolean}
 */
function reloadStyle(src) {
  if (!src) {
    return false;
  }
  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }
    var url = getReloadUrl(el.href, src);
    if (!isUrlRequest(url)) {
      return;
    }
    if (el.visited === true) {
      return;
    }
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}
function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }
    updateCss(el);
  });
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isUrlRequest(url) {
  // An URL is not an request if

  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }
  return true;
}

/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */
module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }
  var getScriptSrc = getCurrentScriptUrl(moduleId);
  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);
    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }
    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }
  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;
      case ".":
        break;
      default:
        accumulator.push(item);
    }
    return accumulator;
  }, /** @type {string[]} */[]).join("/");
}

/**
 * @param {string} urlString
 * @returns {string}
 */
module.exports = function (urlString) {
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return urlString;
  }
  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  return _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />










/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (typeof overlayOptions === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        var overlayFilterFunction = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
        overlayOptions[property] = overlayFilterFunction;
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // eslint-disable-next-line camelcase
  currentHash: __webpack_require__.h()
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = true;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}
if (options.logging) {
  setAllLogLevel(options.logging);
}
(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/(function () {
  // webpackBootstrap
  /******/
  "use strict";

  /******/
  var __webpack_modules__ = {
    /***/"./client-src/modules/logger/tapable.js": (
    /*!**********************************************!*\
      !*** ./client-src/modules/logger/tapable.js ***!
      \**********************************************/
    /***/
    function (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_404__) {
      __nested_webpack_require_404__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_404__.d(__nested_webpack_exports__, {
        /* harmony export */SyncBailHook: function () {
          return /* binding */SyncBailHook;
        }
        /* harmony export */
      });
      function SyncBailHook() {
        return {
          call: function call() {}
        };
      }

      /**
       * Client stub for tapable SyncBailHook
       */
      // eslint-disable-next-line import/prefer-default-export

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/Logger.js": (
    /*!****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/Logger.js ***!
      \****************************************************/
    /***/
    function (__unused_webpack_module, exports) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _iterableToArray(iter) {
        if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == typeof i ? i : i + "";
      }
      function _toPrimitive(t, r) {
        if ("object" != typeof t || !t) return t;
        var e = t[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).toPrimitive];
        if (void 0 !== e) {
          var i = e.call(t, r || "default");
          if ("object" != typeof i) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
      }
      var LogType = Object.freeze({
        error: ( /** @type {"error"} */"error"),
        // message, c style arguments
        warn: ( /** @type {"warn"} */"warn"),
        // message, c style arguments
        info: ( /** @type {"info"} */"info"),
        // message, c style arguments
        log: ( /** @type {"log"} */"log"),
        // message, c style arguments
        debug: ( /** @type {"debug"} */"debug"),
        // message, c style arguments

        trace: ( /** @type {"trace"} */"trace"),
        // no arguments

        group: ( /** @type {"group"} */"group"),
        // [label]
        groupCollapsed: ( /** @type {"groupCollapsed"} */"groupCollapsed"),
        // [label]
        groupEnd: ( /** @type {"groupEnd"} */"groupEnd"),
        // [label]

        profile: ( /** @type {"profile"} */"profile"),
        // [profileName]
        profileEnd: ( /** @type {"profileEnd"} */"profileEnd"),
        // [profileName]

        time: ( /** @type {"time"} */"time"),
        // name, time as [seconds, nanoseconds]

        clear: ( /** @type {"clear"} */"clear"),
        // no arguments
        status: ( /** @type {"status"} */"status") // message, arguments
      });
      exports.LogType = LogType;

      /** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

      var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger raw log method");
      var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger times");
      var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger aggregated times");
      var WebpackLogger = /*#__PURE__*/function () {
        /**
         * @param {function(LogTypeEnum, any[]=): void} log log function
         * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
         */
        function WebpackLogger(log, getChildLogger) {
          _classCallCheck(this, WebpackLogger);
          this[LOG_SYMBOL] = log;
          this.getChildLogger = getChildLogger;
        }
        return _createClass(WebpackLogger, [{
          key: "error",
          value: function error() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            this[LOG_SYMBOL](LogType.error, args);
          }
        }, {
          key: "warn",
          value: function warn() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            this[LOG_SYMBOL](LogType.warn, args);
          }
        }, {
          key: "info",
          value: function info() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            this[LOG_SYMBOL](LogType.info, args);
          }
        }, {
          key: "log",
          value: function log() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            this[LOG_SYMBOL](LogType.log, args);
          }
        }, {
          key: "debug",
          value: function debug() {
            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }
            this[LOG_SYMBOL](LogType.debug, args);
          }
        }, {
          key: "assert",
          value: function assert(assertion) {
            if (!assertion) {
              for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
              }
              this[LOG_SYMBOL](LogType.error, args);
            }
          }
        }, {
          key: "trace",
          value: function trace() {
            this[LOG_SYMBOL](LogType.trace, ["Trace"]);
          }
        }, {
          key: "clear",
          value: function clear() {
            this[LOG_SYMBOL](LogType.clear);
          }
        }, {
          key: "status",
          value: function status() {
            for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }
            this[LOG_SYMBOL](LogType.status, args);
          }
        }, {
          key: "group",
          value: function group() {
            for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }
            this[LOG_SYMBOL](LogType.group, args);
          }
        }, {
          key: "groupCollapsed",
          value: function groupCollapsed() {
            for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }
            this[LOG_SYMBOL](LogType.groupCollapsed, args);
          }
        }, {
          key: "groupEnd",
          value: function groupEnd() {
            for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              args[_key10] = arguments[_key10];
            }
            this[LOG_SYMBOL](LogType.groupEnd, args);
          }
        }, {
          key: "profile",
          value: function profile(label) {
            this[LOG_SYMBOL](LogType.profile, [label]);
          }
        }, {
          key: "profileEnd",
          value: function profileEnd(label) {
            this[LOG_SYMBOL](LogType.profileEnd, [label]);
          }
        }, {
          key: "time",
          value: function time(label) {
            this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
            this[TIMERS_SYMBOL].set(label, process.hrtime());
          }
        }, {
          key: "timeLog",
          value: function timeLog(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
            }
            var time = process.hrtime(prev);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }, {
          key: "timeEnd",
          value: function timeEnd(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
            }
            var time = process.hrtime(prev);
            this[TIMERS_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }, {
          key: "timeAggregate",
          value: function timeAggregate(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
            }
            var time = process.hrtime(prev);
            this[TIMERS_SYMBOL].delete(label);
            this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
            var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (current !== undefined) {
              if (time[1] + current[1] > 1e9) {
                time[0] += current[0] + 1;
                time[1] = time[1] - 1e9 + current[1];
              } else {
                time[0] += current[0];
                time[1] += current[1];
              }
            }
            this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
          }
        }, {
          key: "timeAggregateEnd",
          value: function timeAggregateEnd(label) {
            if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
            var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (time === undefined) return;
            this[TIMERS_AGGREGATES_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }]);
      }();
      exports.Logger = WebpackLogger;

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/createConsoleLogger.js": (
    /*!*****************************************************************!*\
      !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
      \*****************************************************************/
    /***/
    function (module, __unused_webpack_exports, __nested_webpack_require_13431__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _iterableToArray(iter) {
        if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      var _require = __nested_webpack_require_13431__( /*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        LogType = _require.LogType;

      /** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
      /** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
      /** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

      /** @typedef {function(string): boolean} FilterFunction */

      /**
       * @typedef {Object} LoggerConsole
       * @property {function(): void} clear
       * @property {function(): void} trace
       * @property {(...args: any[]) => void} info
       * @property {(...args: any[]) => void} log
       * @property {(...args: any[]) => void} warn
       * @property {(...args: any[]) => void} error
       * @property {(...args: any[]) => void=} debug
       * @property {(...args: any[]) => void=} group
       * @property {(...args: any[]) => void=} groupCollapsed
       * @property {(...args: any[]) => void=} groupEnd
       * @property {(...args: any[]) => void=} status
       * @property {(...args: any[]) => void=} profile
       * @property {(...args: any[]) => void=} profileEnd
       * @property {(...args: any[]) => void=} logTime
       */

      /**
       * @typedef {Object} LoggerOptions
       * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
       * @property {FilterTypes|boolean} debug filter for debug logging
       * @property {LoggerConsole} console the console to log to
       */

      /**
       * @param {FilterItemTypes} item an input item
       * @returns {FilterFunction} filter function
       */
      var filterToFunction = function filterToFunction(item) {
        if (typeof item === "string") {
          var regExp = new RegExp("[\\\\/]".concat(item.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
          return function (ident) {
            return regExp.test(ident);
          };
        }
        if (item && typeof item === "object" && typeof item.test === "function") {
          return function (ident) {
            return item.test(ident);
          };
        }
        if (typeof item === "function") {
          return item;
        }
        if (typeof item === "boolean") {
          return function () {
            return item;
          };
        }
      };

      /**
       * @enum {number}
       */
      var LogLevel = {
        none: 6,
        false: 6,
        error: 5,
        warn: 4,
        info: 3,
        log: 2,
        true: 2,
        verbose: 1
      };

      /**
       * @param {LoggerOptions} options options object
       * @returns {function(string, LogTypeEnum, any[]): void} logging function
       */
      module.exports = function (_ref) {
        var _ref$level = _ref.level,
          level = _ref$level === void 0 ? "info" : _ref$level,
          _ref$debug = _ref.debug,
          debug = _ref$debug === void 0 ? false : _ref$debug,
          console = _ref.console;
        var debugFilters = typeof debug === "boolean" ? [function () {
          return debug;
        }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
        /** @type {number} */
        var loglevel = LogLevel["".concat(level)] || 0;

        /**
         * @param {string} name name of the logger
         * @param {LogTypeEnum} type type of the log entry
         * @param {any[]} args arguments of the log entry
         * @returns {void}
         */
        var logger = function logger(name, type, args) {
          var labeledArgs = function labeledArgs() {
            if (Array.isArray(args)) {
              if (args.length > 0 && typeof args[0] === "string") {
                return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
              } else {
                return ["[".concat(name, "]")].concat(_toConsumableArray(args));
              }
            } else {
              return [];
            }
          };
          var debug = debugFilters.some(function (f) {
            return f(name);
          });
          switch (type) {
            case LogType.debug:
              if (!debug) return;
              if (typeof console.debug === "function") {
                console.debug.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.log:
              if (!debug && loglevel > LogLevel.log) return;
              console.log.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.info:
              if (!debug && loglevel > LogLevel.info) return;
              console.info.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.warn:
              if (!debug && loglevel > LogLevel.warn) return;
              console.warn.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.error:
              if (!debug && loglevel > LogLevel.error) return;
              console.error.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.trace:
              if (!debug) return;
              console.trace();
              break;
            case LogType.groupCollapsed:
              if (!debug && loglevel > LogLevel.log) return;
              if (!debug && loglevel > LogLevel.verbose) {
                if (typeof console.groupCollapsed === "function") {
                  console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
                } else {
                  console.log.apply(console, _toConsumableArray(labeledArgs()));
                }
                break;
              }
            // falls through
            case LogType.group:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.group === "function") {
                console.group.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.groupEnd:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.groupEnd === "function") {
                console.groupEnd();
              }
              break;
            case LogType.time:
              {
                if (!debug && loglevel > LogLevel.log) return;
                var ms = args[1] * 1000 + args[2] / 1000000;
                var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
                if (typeof console.logTime === "function") {
                  console.logTime(msg);
                } else {
                  console.log(msg);
                }
                break;
              }
            case LogType.profile:
              if (typeof console.profile === "function") {
                console.profile.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.profileEnd:
              if (typeof console.profileEnd === "function") {
                console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.clear:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.clear === "function") {
                console.clear();
              }
              break;
            case LogType.status:
              if (!debug && loglevel > LogLevel.info) return;
              if (typeof console.status === "function") {
                if (args.length === 0) {
                  console.status();
                } else {
                  console.status.apply(console, _toConsumableArray(labeledArgs()));
                }
              } else {
                if (args.length !== 0) {
                  console.info.apply(console, _toConsumableArray(labeledArgs()));
                }
              }
              break;
            default:
              throw new Error("Unexpected LogType ".concat(type));
          }
        };
        return logger;
      };

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/runtime.js": (
    /*!*****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/runtime.js ***!
      \*****************************************************/
    /***/
    function (__unused_webpack_module, exports, __nested_webpack_require_23772__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _extends() {
        _extends = Object.assign ? Object.assign.bind() : function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      var _require = __nested_webpack_require_23772__( /*! tapable */"./client-src/modules/logger/tapable.js"),
        SyncBailHook = _require.SyncBailHook;
      var _require2 = __nested_webpack_require_23772__( /*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        Logger = _require2.Logger;
      var createConsoleLogger = __nested_webpack_require_23772__( /*! ./createConsoleLogger */"./node_modules/webpack/lib/logging/createConsoleLogger.js");

      /** @type {createConsoleLogger.LoggerOptions} */
      var currentDefaultLoggerOptions = {
        level: "info",
        debug: false,
        console: console
      };
      var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

      /**
       * @param {string} name name of the logger
       * @returns {Logger} a logger
       */
      exports.getLogger = function (name) {
        return new Logger(function (type, args) {
          if (exports.hooks.log.call(name, type, args) === undefined) {
            currentDefaultLogger(name, type, args);
          }
        }, function (childName) {
          return exports.getLogger("".concat(name, "/").concat(childName));
        });
      };

      /**
       * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
       * @returns {void}
       */
      exports.configureDefaultLogger = function (options) {
        _extends(currentDefaultLoggerOptions, options);
        currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
      };
      exports.hooks = {
        log: new SyncBailHook(["origin", "type", "args"])
      };

      /***/
    })

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __nested_webpack_require_26256__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_26256__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/
  !function () {
    /******/ // define getter functions for harmony exports
    /******/__nested_webpack_require_26256__.d = function (exports, definition) {
      /******/for (var key in definition) {
        /******/if (__nested_webpack_require_26256__.o(definition, key) && !__nested_webpack_require_26256__.o(exports, key)) {
          /******/Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  !function () {
    /******/__nested_webpack_require_26256__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/
  !function () {
    /******/ // define __esModule on exports
    /******/__nested_webpack_require_26256__.r = function (exports) {
      /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  }();
  /******/
  /************************************************************************/
  var __nested_webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  !function () {
    /*!********************************************!*\
      !*** ./client-src/modules/logger/index.js ***!
      \********************************************/
    __nested_webpack_require_26256__.r(__nested_webpack_exports__);
    /* harmony export */
    __nested_webpack_require_26256__.d(__nested_webpack_exports__, {
      /* harmony export */"default": function () {
        return /* reexport default export from named module */webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__;
      }
      /* harmony export */
    });
    /* harmony import */
    var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_26256__( /*! webpack/lib/logging/runtime.js */"./node_modules/webpack/lib/logging/runtime.js");
  }();
  var __webpack_export_target__ = exports;
  for (var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
  if (__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: true
  });
  /******/
})();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js");
/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ "./node_modules/webpack-dev-server/client/overlay/state-machine.js");
/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ "./node_modules/webpack-dev-server/client/overlay/styles.js");
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).






var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
}

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      ( /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      containerElement = /** @type {Document} */
      ( /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      ( /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad( /** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML("") : "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    showOverlay: function showOverlay(_ref) {
      var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "error" : _ref$level,
        messages = _ref.messages,
        messageSource = _ref.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)
          }]
        });
      }
    };
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }
      handleError(error, message);
    });
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenToRuntimeError: () => (/* binding */ listenToRuntimeError),
/* harmony export */   listenToUnhandledRejection: () => (/* binding */ listenToUnhandledRejection),
/* harmony export */   parseErrorToStacks: () => (/* binding */ parseErrorToStacks)
/* harmony export */ });
/**
 *
 * @param {Error} error
 */
function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
}

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
}

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ "./node_modules/webpack-dev-server/client/overlay/fsm.js");


/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
  return overlayMachine;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createOverlayMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containerStyle: () => (/* binding */ containerStyle),
/* harmony export */   dismissButtonStyle: () => (/* binding */ dismissButtonStyle),
/* harmony export */   headerStyle: () => (/* binding */ headerStyle),
/* harmony export */   iframeStyle: () => (/* binding */ iframeStyle),
/* harmony export */   msgStyles: () => (/* binding */ msgStyles),
/* harmony export */   msgTextStyle: () => (/* binding */ msgTextStyle),
/* harmony export */   msgTypeStyle: () => (/* binding */ msgTypeStyle)
/* harmony export */ });
// styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   logEnabledFeatures: () => (/* binding */ logEnabledFeatures),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);
  if (!features || enabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");


/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }
  return options;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");



/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */
function reloadApp(_ref, status) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (status.isUnloading) {
    return;
  }
  var currentHash = status.currentHash,
    previousHash = status.previousHash;
  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(ansiRegex, "");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
  /** @type {undefined|string} */
  var lastHash;
  var upToDate = function upToDate() {
    return /** @type {string} */lastHash.indexOf(__webpack_require__.h()) >= 0;
  };
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  var check = function check() {
    module.hot.check(true).then(function (updatedModules) {
      if (!updatedModules) {
        log("warning", "[HMR] Cannot find update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] (Probably because of restarting the webpack-dev-server)");
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        return;
      }
      if (!upToDate()) {
        check();
      }
      __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
      if (upToDate()) {
        log("info", "[HMR] App is up to date.");
      }
    }).catch(function (err) {
      var status = module.hot.status();
      if (["abort", "fail"].indexOf(status) >= 0) {
        log("warning", "[HMR] Cannot apply update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] " + log.formatError(err));
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        log("warning", "[HMR] Update failed: " + log.formatError(err));
      }
    });
  };
  var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
  hotEmitter.on("webpackHotUpdate", function (currentHash) {
    lastHash = currentHash;
    if (!upToDate() && module.hot.status() === "idle") {
      log("info", "[HMR] Checking for updates on the server...");
      check();
    }
  });
  log("info", "[HMR] Waiting for update signal from WDS...");
} else {}

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function (moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  if (unacceptedModules.length > 0) {
    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
    unacceptedModules.forEach(function (moduleId) {
      log("warning", "[HMR]  - " + moduleId);
    });
  }
  if (!renewedModules || renewedModules.length === 0) {
    log("info", "[HMR] Nothing hot updated.");
  } else {
    log("info", "[HMR] Updated modules:");
    renewedModules.forEach(function (moduleId) {
      if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
        var parts = moduleId.split("!");
        log.groupCollapsed("info", "[HMR]  - " + parts.pop());
        log("info", "[HMR]  - " + moduleId);
        log.groupEnd("info");
      } else {
        log("info", "[HMR]  - " + moduleId);
      }
    });
    var numberIds = renewedModules.every(function (moduleId) {
      return typeof moduleId === "number";
    });
    if (numberIds) log("info", '[HMR] Consider using the optimization.moduleIds: "named" for module names.');
  }
};

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";
function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
  var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
  return function (level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
  logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
  var message = err.message;
  var stack = err.stack;
  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  } else {
    return stack;
  }
};

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1711373816624
      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"publicPath":"","locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("71f3e6ab6d53232f3125")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "boilerplate:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdateboilerplate"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	__webpack_require__("./app/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./styles/index.scss");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VCxVQUFVO01BQ1YsUUFBUTtNQUNSLFNBQVM7TUFDVCxTQUFTO01BQ1QsVUFBVTtNQUNWLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxRQUFRO01BQ1IsU0FBUztNQUNULFFBQVE7TUFDUixTQUFTO01BQ1QsUUFBUTtNQUNSLFNBQVM7TUFDVCxTQUFTO01BQ1QsVUFBVTtNQUNWLFFBQVE7TUFDUixTQUFTO01BQ1QsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsU0FBUztNQUNULFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixRQUFRO01BQ1IsU0FBUztNQUNULFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osU0FBUztNQUNULFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsUUFBUTtNQUNSLFNBQVM7TUFDVCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osU0FBUztNQUNULFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtNQUNWLFFBQVE7TUFDUixTQUFTO01BQ1QsT0FBTztNQUNQLFFBQVE7TUFDUixPQUFPO01BQ1AsUUFBUTtNQUNSLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFlBQVk7TUFDWixVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsVUFBVTtNQUNWLFlBQVk7TUFDWixVQUFVO01BQ1YsU0FBUztNQUNULFNBQVM7TUFDVCxTQUFTO01BQ1QsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWTtNQUNaLFlBQVk7TUFDWixZQUFZO01BQ1osWUFBWTtNQUNaLFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLGFBQWE7TUFDYixVQUFVO01BQ1YsU0FBUztNQUNULFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixRQUFRO01BQ1IsUUFBUTtNQUNSLFFBQVE7TUFDUixhQUFhO01BQ2IsUUFBUTtNQUNSLFNBQVM7TUFDVCxXQUFXO01BQ1gsU0FBUztNQUNULGFBQWE7TUFDYixTQUFTO01BQ1QsU0FBUztNQUNULFNBQVM7TUFDVCxXQUFXO01BQ1gsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLGFBQWE7TUFDYixVQUFVO01BQ1YsU0FBUztNQUNULFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixRQUFRO01BQ1IsUUFBUTtNQUNSLFFBQVE7TUFDUixhQUFhO01BQ2IsUUFBUTtNQUNSLFNBQVM7TUFDVCxZQUFZO01BQ1osV0FBVztNQUNYLFNBQVM7TUFDVCxhQUFhO01BQ2IsU0FBUztNQUNULFNBQVM7TUFDVCxTQUFTO01BQ1QsV0FBVztNQUNYLGNBQWM7TUFDZCxXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixZQUFZO01BQ1osV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxhQUFhO01BQ2IsVUFBVTtNQUNWLFVBQVU7TUFDVixVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsVUFBVTtNQUNWLFVBQVU7TUFDVixVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsUUFBUTtNQUNSLFVBQVU7TUFDVixTQUFTO01BQ1QsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsU0FBUztNQUNULFFBQVE7TUFDUixTQUFTO01BQ1QsU0FBUztNQUNULFNBQVM7TUFDVCxZQUFZO01BQ1osU0FBUztNQUNULFVBQVU7TUFDVixXQUFXO01BQ1gsUUFBUTtNQUNSLFdBQVc7TUFDWCxRQUFRO01BQ1IsUUFBUTtNQUNSLFNBQVM7TUFDVCxTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFlBQVk7TUFDWixVQUFVO01BQ1YsVUFBVTtNQUNWLFNBQVM7TUFDVCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO0lBQUE7SUFFZmhDLFVBQUEsRUFBYztNQUNWLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztN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QVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxXQUFXO01BQ1gsV0FBVztNQUNYLFFBQVE7TUFDUixXQUFXO01BQ1gsV0FBVztNQUNYLFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixZQUFZO01BQ1osWUFBWTtNQUNaLFdBQVc7TUFDWCxXQUFXO01BQ1gsVUFBVTtNQUNWLFlBQVk7TUFDWixZQUFZO01BQ1osV0FBVztNQUNYLFVBQVU7TUFDVixZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxRQUFRO01BQ1IsU0FBUztNQUNULFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixVQUFVO01BQ1YsU0FBUztNQUNULFVBQVU7TUFDVixZQUFZO01BQ1osWUFBWTtNQUNaLFNBQVM7TUFDVCxVQUFVO01BQ1YsWUFBWTtNQUNaLFVBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtNQUNWLGFBQWE7TUFDYixVQUFVO01BQ1YsVUFBVTtNQUNWLFNBQVM7TUFDVCxVQUFVO0lBQUE7SUFFZGhDLFVBQUEsRUFBYztNQUNWLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTG1DLENBQUEsRUFBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTEMsQ0FBQSxFQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTEMsRUFBQSxFQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxL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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFLElBQUk7V0FDTjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0Esc0NBQXNDO1dBQ3RDO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7O1dBRUE7O1dBRUE7Ozs7O1VFOWZBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvYW5zaS1odG1sLWNvbW11bml0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uLi9zcmMvbmFtZWQtcmVmZXJlbmNlcy50cyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uLi9zcmMvbnVtZXJpYy11bmljb2RlLW1hcC50cyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uLi9zcmMvc3Vycm9nYXRlLXBhaXJzLnRzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL25vcm1hbGl6ZS11cmwuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9jbGllbnRzL1dlYlNvY2tldENsaWVudC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS9mc20uanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5L3J1bnRpbWUtZXJyb3IuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5L3N0YXRlLW1hY2hpbmUuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5L3N0eWxlcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3NvY2tldC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2NyZWF0ZVNvY2tldFVSTC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2dldEN1cnJlbnRTY3JpcHRTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9sb2cuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9wYXJzZVVSTC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3JlbG9hZEFwcC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3NlbmRNZXNzYWdlLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvc3RyaXBBbnNpLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2ctYXBwbHktcmVzdWx0LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgdXBkYXRlIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9nZXQgbWluaS1jc3MgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2dldCB1cGRhdGUgbWFuaWZlc3QgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaG90IG1vZHVsZSByZXBsYWNlbWVudCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY3NzIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFwcCB3b3JraW5nIGdvb2QgXCIpXHJcbiAgICB9XHJcbn1cclxubmV3IEFwcCgpIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKyltL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XG4gICAgdmFyIG90ID0gX29wZW5UYWdzW3NlcV1cbiAgICBpZiAob3QpIHtcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cbiAgICAgIGlmICghIX5hbnNpQ29kZXMuaW5kZXhPZihzZXEpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0cmEtYm9vbGVhbi1jYXN0XG4gICAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXG4gICAgICB9XG4gICAgICAvLyBPcGVuIHRhZy5cbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcbiAgICAgIHJldHVybiBvdFswXSA9PT0gJzwnID8gb3QgOiAnPHNwYW4gc3R5bGU9XCInICsgb3QgKyAnO1wiPidcbiAgICB9XG5cbiAgICB2YXIgY3QgPSBfY2xvc2VUYWdzW3NlcV1cbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICByZXR1cm4gY3RcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH0pXG5cbiAgLy8gTWFrZSBzdXJlIHRhZ3MgYXJlIGNsb3NlZC5cbiAgdmFyIGwgPSBhbnNpQ29kZXMubGVuZ3RoXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcblxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bjb2xvcnNgIHBhcmFtZXRlciBtdXN0IGJlIGFuIE9iamVjdC4nKVxuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XG4gICAgdmFyIGhleCA9IGNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gY29sb3JzW2tleV0gOiBudWxsXG4gICAgaWYgKCFoZXgpIHtcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaGV4ID0gW2hleF1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZXgpIHx8IGhleC5sZW5ndGggPT09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBoICE9PSAnc3RyaW5nJ1xuICAgICAgfSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIEFycmF5IGFuZCBlYWNoIGl0ZW0gY291bGQgb25seSBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgICB9XG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGlmICghaGV4WzBdKSB7XG4gICAgICAgIGhleFswXSA9IGRlZkhleENvbG9yWzBdXG4gICAgICB9XG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMSB8fCAhaGV4WzFdKSB7XG4gICAgICAgIGhleCA9IFtoZXhbMF1dXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgIH1cbiAgICBfZmluYWxDb2xvcnNba2V5XSA9IGhleFxuICB9XG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcbn1cblxuLyoqXG4gKiBSZXNldCBjb2xvcnMuXG4gKi9cbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICBfc2V0VGFncyhfZGVmQ29sb3JzKVxufVxuXG4vKipcbiAqIEV4cG9zZSB0YWdzLCBpbmNsdWRpbmcgb3BlbiBhbmQgY2xvc2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5hbnNpSFRNTC50YWdzID0ge31cblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ29wZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxuICB9KVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ2Nsb3NlJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XG4gIH0pXG59IGVsc2Uge1xuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcbiAgYW5zaUhUTUwudGFncy5jbG9zZSA9IF9jbG9zZVRhZ3Ncbn1cblxuZnVuY3Rpb24gX3NldFRhZ3MgKGNvbG9ycykge1xuICAvLyByZXNldCBhbGxcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxuICAvLyBpbnZlcnNlXG4gIF9vcGVuVGFnc1snNyddID0gJ2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzFdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzBdXG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXlcblxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcbiAgICB2YXIgY29sb3IgPSBfc3R5bGVzW2NvZGVdXG4gICAgdmFyIG9yaUNvbG9yID0gY29sb3JzW2NvbG9yXSB8fCAnMDAwJ1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXG4gICAgY29kZSA9IHBhcnNlSW50KGNvZGUpXG4gICAgX29wZW5UYWdzWyhjb2RlICsgMTApLnRvU3RyaW5nKCldID0gJ2JhY2tncm91bmQ6IycgKyBvcmlDb2xvclxuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KClcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLG51bGwsbnVsbCxudWxsLG51bGwsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbi8qXG4gIGVzbGludC1kaXNhYmxlXG4gIG5vLWNvbnNvbGUsXG4gIGZ1bmMtbmFtZXNcbiovXG5cbi8qKiBAdHlwZWRlZiB7YW55fSBUT0RPICovXG5cbnZhciBub3JtYWxpemVVcmwgPSByZXF1aXJlKFwiLi9ub3JtYWxpemUtdXJsXCIpO1xudmFyIHNyY0J5TW9kdWxlSWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xudmFyIG5vRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCI7XG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG4vKipcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICogQHJldHVybnMgeyhmdW5jdGlvbigpOiB2b2lkKXwqfVxuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmbiwgdGltZSkge1xuICB2YXIgdGltZW91dCA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGZ1bmN0aW9uQ2FsbCA9IGZ1bmN0aW9uIGZ1bmN0aW9uQ2FsbCgpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbkNhbGwsIHRpbWUpO1xuICB9O1xufVxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8qKlxuICogQHBhcmFtIHtUT0RPfSBtb2R1bGVJZFxuICogQHJldHVybnMge1RPRE99XG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRTY3JpcHRVcmwobW9kdWxlSWQpIHtcbiAgdmFyIHNyYyA9IHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdO1xuICBpZiAoIXNyYykge1xuICAgIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgICBzcmMgPSAoIC8qKiBAdHlwZSB7SFRNTFNjcmlwdEVsZW1lbnR9ICovZG9jdW1lbnQuY3VycmVudFNjcmlwdCkuc3JjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuICAgICAgdmFyIGxhc3RTY3JpcHRUYWcgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV07XG4gICAgICBpZiAobGFzdFNjcmlwdFRhZykge1xuICAgICAgICBzcmMgPSBsYXN0U2NyaXB0VGFnLnNyYztcbiAgICAgIH1cbiAgICB9XG4gICAgc3JjQnlNb2R1bGVJZFttb2R1bGVJZF0gPSBzcmM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVNYXBcbiAgICogQHJldHVybnMge251bGwgfCBzdHJpbmdbXX1cbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiAoZmlsZU1hcCkge1xuICAgIGlmICghc3JjKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHNwbGl0UmVzdWx0ID0gc3JjLnNwbGl0KC8oW15cXFxcL10rKVxcLmpzJC8pO1xuICAgIHZhciBmaWxlbmFtZSA9IHNwbGl0UmVzdWx0ICYmIHNwbGl0UmVzdWx0WzFdO1xuICAgIGlmICghZmlsZW5hbWUpIHtcbiAgICAgIHJldHVybiBbc3JjLnJlcGxhY2UoXCIuanNcIiwgXCIuY3NzXCIpXTtcbiAgICB9XG4gICAgaWYgKCFmaWxlTWFwKSB7XG4gICAgICByZXR1cm4gW3NyYy5yZXBsYWNlKFwiLmpzXCIsIFwiLmNzc1wiKV07XG4gICAgfVxuICAgIHJldHVybiBmaWxlTWFwLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24gKG1hcFJ1bGUpIHtcbiAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiXCIuY29uY2F0KGZpbGVuYW1lLCBcIlxcXFwuanMkXCIpLCBcImdcIik7XG4gICAgICByZXR1cm4gbm9ybWFsaXplVXJsKHNyYy5yZXBsYWNlKHJlZywgXCJcIi5jb25jYXQobWFwUnVsZS5yZXBsYWNlKC97ZmlsZU5hbWV9L2csIGZpbGVuYW1lKSwgXCIuY3NzXCIpKSk7XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtUT0RPfSBlbFxuICogQHBhcmFtIHtzdHJpbmd9IFt1cmxdXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUNzcyhlbCwgdXJsKSB7XG4gIGlmICghdXJsKSB7XG4gICAgaWYgKCFlbC5ocmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgdXJsID0gZWwuaHJlZi5zcGxpdChcIj9cIilbMF07XG4gIH1cbiAgaWYgKCFpc1VybFJlcXVlc3QoIC8qKiBAdHlwZSB7c3RyaW5nfSAqL3VybCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVsLmlzTG9hZGVkID09PSBmYWxzZSkge1xuICAgIC8vIFdlIHNlZW0gdG8gYmUgYWJvdXQgdG8gcmVwbGFjZSBhIGNzcyBsaW5rIHRoYXQgaGFzbid0IGxvYWRlZCB5ZXQuXG4gICAgLy8gV2UncmUgcHJvYmFibHkgY2hhbmdpbmcgdGhlIHNhbWUgZmlsZSBtb3JlIHRoYW4gb25jZS5cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCF1cmwgfHwgISh1cmwuaW5kZXhPZihcIi5jc3NcIikgPiAtMSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZWwudmlzaXRlZCA9IHRydWU7XG4gIHZhciBuZXdFbCA9IGVsLmNsb25lTm9kZSgpO1xuICBuZXdFbC5pc0xvYWRlZCA9IGZhbHNlO1xuICBuZXdFbC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKG5ld0VsLmlzTG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5ld0VsLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfSk7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKG5ld0VsLmlzTG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG5ld0VsLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfSk7XG4gIG5ld0VsLmhyZWYgPSBcIlwiLmNvbmNhdCh1cmwsIFwiP1wiKS5jb25jYXQoRGF0ZS5ub3coKSk7XG4gIGlmIChlbC5uZXh0U2libGluZykge1xuICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbC5uZXh0U2libGluZyk7XG4gIH0gZWxzZSB7XG4gICAgZWwucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdFbCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gaHJlZlxuICogQHBhcmFtIHtUT0RPfSBzcmNcbiAqIEByZXR1cm5zIHtUT0RPfVxuICovXG5mdW5jdGlvbiBnZXRSZWxvYWRVcmwoaHJlZiwgc3JjKSB7XG4gIHZhciByZXQ7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGhyZWYgPSBub3JtYWxpemVVcmwoaHJlZik7XG4gIHNyYy5zb21lKFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICBmdW5jdGlvbiAodXJsKSB7XG4gICAgaWYgKGhyZWYuaW5kZXhPZihzcmMpID4gLTEpIHtcbiAgICAgIHJldCA9IHVybDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3JjXVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHJlbG9hZFN0eWxlKHNyYykge1xuICBpZiAoIXNyYykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlua1wiKTtcbiAgdmFyIGxvYWRlZCA9IGZhbHNlO1xuICBmb3JFYWNoLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbCkge1xuICAgIGlmICghZWwuaHJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdXJsID0gZ2V0UmVsb2FkVXJsKGVsLmhyZWYsIHNyYyk7XG4gICAgaWYgKCFpc1VybFJlcXVlc3QodXJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZWwudmlzaXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodXJsKSB7XG4gICAgICB1cGRhdGVDc3MoZWwsIHVybCk7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBsb2FkZWQ7XG59XG5mdW5jdGlvbiByZWxvYWRBbGwoKSB7XG4gIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rXCIpO1xuICBmb3JFYWNoLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbCkge1xuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHVwZGF0ZUNzcyhlbCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1VybFJlcXVlc3QodXJsKSB7XG4gIC8vIEFuIFVSTCBpcyBub3QgYW4gcmVxdWVzdCBpZlxuXG4gIC8vIEl0IGlzIG5vdCBodHRwIG9yIGh0dHBzXG4gIGlmICghL15bYS16QS1aXVthLXpBLVpcXGQrXFwtLl0qOi8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VE9ET30gbW9kdWxlSWRcbiAqIEBwYXJhbSB7VE9ET30gb3B0aW9uc1xuICogQHJldHVybnMge1RPRE99XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIGlmIChub0RvY3VtZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJubyB3aW5kb3cuZG9jdW1lbnQgZm91bmQsIHdpbGwgbm90IEhNUiBDU1NcIik7XG4gICAgcmV0dXJuIG5vb3A7XG4gIH1cbiAgdmFyIGdldFNjcmlwdFNyYyA9IGdldEN1cnJlbnRTY3JpcHRVcmwobW9kdWxlSWQpO1xuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHNyYyA9IGdldFNjcmlwdFNyYyhvcHRpb25zLmZpbGVuYW1lKTtcbiAgICB2YXIgcmVsb2FkZWQgPSByZWxvYWRTdHlsZShzcmMpO1xuICAgIGlmIChvcHRpb25zLmxvY2Fscykge1xuICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBEZXRlY3RlZCBsb2NhbCBjc3MgbW9kdWxlcy4gUmVsb2FkIGFsbCBjc3NcIik7XG4gICAgICByZWxvYWRBbGwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlbG9hZGVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIGNzcyByZWxvYWQgJXNcIiwgc3JjLmpvaW4oXCIgXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBSZWxvYWQgYWxsIGNzc1wiKTtcbiAgICAgIHJlbG9hZEFsbCgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVib3VuY2UodXBkYXRlLCA1MCk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhdGhDb21wb25lbnRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVVcmwocGF0aENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHBhdGhDb21wb25lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGl0ZW0pIHtcbiAgICBzd2l0Y2ggKGl0ZW0pIHtcbiAgICAgIGNhc2UgXCIuLlwiOlxuICAgICAgICBhY2N1bXVsYXRvci5wb3AoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiLlwiOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFjY3VtdWxhdG9yLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgfSwgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9bXSkuam9pbihcIi9cIik7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsU3RyaW5nKSB7XG4gIHVybFN0cmluZyA9IHVybFN0cmluZy50cmltKCk7XG4gIGlmICgvXmRhdGE6L2kudGVzdCh1cmxTdHJpbmcpKSB7XG4gICAgcmV0dXJuIHVybFN0cmluZztcbiAgfVxuICB2YXIgcHJvdG9jb2wgPSB1cmxTdHJpbmcuaW5kZXhPZihcIi8vXCIpICE9PSAtMSA/IHVybFN0cmluZy5zcGxpdChcIi8vXCIpWzBdICsgXCIvL1wiIDogXCJcIjtcbiAgdmFyIGNvbXBvbmVudHMgPSB1cmxTdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKHByb3RvY29sLCBcImlcIiksIFwiXCIpLnNwbGl0KFwiL1wiKTtcbiAgdmFyIGhvc3QgPSBjb21wb25lbnRzWzBdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFwuJC8sIFwiXCIpO1xuICBjb21wb25lbnRzWzBdID0gXCJcIjtcbiAgdmFyIHBhdGggPSBub3JtYWxpemVVcmwoY29tcG9uZW50cyk7XG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRoO1xufTsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBfdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSB0eXBlb2YgaSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgIXQpIHJldHVybiB0OyB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHZvaWQgMCAhPT0gZSkgeyB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIGkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL3V0aWxzL2xvZy5qc1wiO1xudmFyIFdlYlNvY2tldENsaWVudCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBmdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQodXJsKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYlNvY2tldENsaWVudCk7XG4gICAgdGhpcy5jbGllbnQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgdGhpcy5jbGllbnQub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKGVycm9yKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAqL1xuICByZXR1cm4gX2NyZWF0ZUNsYXNzKFdlYlNvY2tldENsaWVudCwgW3tcbiAgICBrZXk6IFwib25PcGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3BlbihmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbm9wZW4gPSBmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwib25DbG9zZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsb3NlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9uY2xvc2UgPSBmO1xuICAgIH1cblxuICAgIC8vIGNhbGwgZiB3aXRoIHRoZSBtZXNzYWdlIHN0cmluZyBhcyB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcIm9uTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lc3NhZ2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZihlLmRhdGEpO1xuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcbn0oKTtcbmV4cG9ydCB7IFdlYlNvY2tldENsaWVudCBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnksIF9fd2VicGFja19oYXNoX18gKi9cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwid2VicGFjay9tb2R1bGVcIiAvPlxuaW1wb3J0IHdlYnBhY2tIb3RMb2cgZnJvbSBcIndlYnBhY2svaG90L2xvZy5qc1wiO1xuaW1wb3J0IHN0cmlwQW5zaSBmcm9tIFwiLi91dGlscy9zdHJpcEFuc2kuanNcIjtcbmltcG9ydCBwYXJzZVVSTCBmcm9tIFwiLi91dGlscy9wYXJzZVVSTC5qc1wiO1xuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCB7IGZvcm1hdFByb2JsZW0sIGNyZWF0ZU92ZXJsYXkgfSBmcm9tIFwiLi9vdmVybGF5LmpzXCI7XG5pbXBvcnQgeyBsb2csIGxvZ0VuYWJsZWRGZWF0dXJlcywgc2V0TG9nTGV2ZWwgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcbmltcG9ydCBzZW5kTWVzc2FnZSBmcm9tIFwiLi91dGlscy9zZW5kTWVzc2FnZS5qc1wiO1xuaW1wb3J0IHJlbG9hZEFwcCBmcm9tIFwiLi91dGlscy9yZWxvYWRBcHAuanNcIjtcbmltcG9ydCBjcmVhdGVTb2NrZXRVUkwgZnJvbSBcIi4vdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3ZlcmxheU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFt3YXJuaW5nc11cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFtlcnJvcnNdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiBib29sZWFufSBbcnVudGltZUVycm9yc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdHJ1c3RlZFR5cGVzUG9saWN5TmFtZV1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaG90XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxpdmVSZWxvYWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IE92ZXJsYXlPcHRpb25zfSBvdmVybGF5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xvZ2dpbmddXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXR1c1xuICogQHByb3BlcnR5IHtib29sZWFufSBpc1VubG9hZGluZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGN1cnJlbnRIYXNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ByZXZpb3VzSGFzaF1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IHsgd2FybmluZ3M/OiBib29sZWFuIHwgc3RyaW5nOyBlcnJvcnM/OiBib29sZWFuIHwgc3RyaW5nOyBydW50aW1lRXJyb3JzPzogYm9vbGVhbiB8IHN0cmluZzsgfX0gb3ZlcmxheU9wdGlvbnNcbiAqL1xudmFyIGRlY29kZU92ZXJsYXlPcHRpb25zID0gZnVuY3Rpb24gZGVjb2RlT3ZlcmxheU9wdGlvbnMob3ZlcmxheU9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvdmVybGF5T3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuICAgIFtcIndhcm5pbmdzXCIsIFwiZXJyb3JzXCIsIFwicnVudGltZUVycm9yc1wiXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgaWYgKHR5cGVvZiBvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIG92ZXJsYXlGaWx0ZXJGdW5jdGlvblN0cmluZyA9IGRlY29kZVVSSUNvbXBvbmVudChvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0pO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgICB2YXIgb3ZlcmxheUZpbHRlckZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKFwibWVzc2FnZVwiLCBcInZhciBjYWxsYmFjayA9IFwiLmNvbmNhdChvdmVybGF5RmlsdGVyRnVuY3Rpb25TdHJpbmcsIFwiXFxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSlcIikpO1xuICAgICAgICBvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0gPSBvdmVybGF5RmlsdGVyRnVuY3Rpb247XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHR5cGUge1N0YXR1c31cbiAqL1xudmFyIHN0YXR1cyA9IHtcbiAgaXNVbmxvYWRpbmc6IGZhbHNlLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGN1cnJlbnRIYXNoOiBfX3dlYnBhY2tfaGFzaF9fXG59O1xuXG4vKiogQHR5cGUge09wdGlvbnN9ICovXG52YXIgb3B0aW9ucyA9IHtcbiAgaG90OiBmYWxzZSxcbiAgbGl2ZVJlbG9hZDogZmFsc2UsXG4gIHByb2dyZXNzOiBmYWxzZSxcbiAgb3ZlcmxheTogZmFsc2Vcbn07XG52YXIgcGFyc2VkUmVzb3VyY2VRdWVyeSA9IHBhcnNlVVJMKF9fcmVzb3VyY2VRdWVyeSk7XG52YXIgZW5hYmxlZEZlYXR1cmVzID0ge1xuICBcIkhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcIjogZmFsc2UsXG4gIFwiTGl2ZSBSZWxvYWRpbmdcIjogZmFsc2UsXG4gIFByb2dyZXNzOiBmYWxzZSxcbiAgT3ZlcmxheTogZmFsc2Vcbn07XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgZW5hYmxlZEZlYXR1cmVzW1wiSG90IE1vZHVsZSBSZXBsYWNlbWVudFwiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICBlbmFibGVkRmVhdHVyZXNbXCJMaXZlIFJlbG9hZGluZ1wiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5wcm9ncmVzcyA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5wcm9ncmVzcyA9IHRydWU7XG4gIGVuYWJsZWRGZWF0dXJlcy5Qcm9ncmVzcyA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5vdmVybGF5KSB7XG4gIHRyeSB7XG4gICAgb3B0aW9ucy5vdmVybGF5ID0gSlNPTi5wYXJzZShwYXJzZWRSZXNvdXJjZVF1ZXJ5Lm92ZXJsYXkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yKFwiRXJyb3IgcGFyc2luZyBvdmVybGF5IG9wdGlvbnMgZnJvbSByZXNvdXJjZSBxdWVyeTpcIiwgZSk7XG4gIH1cblxuICAvLyBGaWxsIGluIGRlZmF1bHQgXCJ0cnVlXCIgcGFyYW1zIGZvciBwYXJ0aWFsbHktc3BlY2lmaWVkIG9iamVjdHMuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcIm9iamVjdFwiKSB7XG4gICAgb3B0aW9ucy5vdmVybGF5ID0gX29iamVjdFNwcmVhZCh7XG4gICAgICBlcnJvcnM6IHRydWUsXG4gICAgICB3YXJuaW5nczogdHJ1ZSxcbiAgICAgIHJ1bnRpbWVFcnJvcnM6IHRydWVcbiAgICB9LCBvcHRpb25zLm92ZXJsYXkpO1xuICAgIGRlY29kZU92ZXJsYXlPcHRpb25zKG9wdGlvbnMub3ZlcmxheSk7XG4gIH1cbiAgZW5hYmxlZEZlYXR1cmVzLk92ZXJsYXkgPSB0cnVlO1xufVxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZykge1xuICBvcHRpb25zLmxvZ2dpbmcgPSBwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmc7XG59XG5pZiAodHlwZW9mIHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIG9wdGlvbnMucmVjb25uZWN0ID0gTnVtYmVyKHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWxcbiAqL1xuZnVuY3Rpb24gc2V0QWxsTG9nTGV2ZWwobGV2ZWwpIHtcbiAgLy8gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgSE1SIGxvZ2dlciBvcGVyYXRlIHNlcGFyYXRlbHkgZnJvbSBkZXYgc2VydmVyIGxvZ2dlclxuICB3ZWJwYWNrSG90TG9nLnNldExvZ0xldmVsKGxldmVsID09PSBcInZlcmJvc2VcIiB8fCBsZXZlbCA9PT0gXCJsb2dcIiA/IFwiaW5mb1wiIDogbGV2ZWwpO1xuICBzZXRMb2dMZXZlbChsZXZlbCk7XG59XG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG5sb2dFbmFibGVkRmVhdHVyZXMoZW5hYmxlZEZlYXR1cmVzKTtcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvdmVybGF5ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IGNyZWF0ZU92ZXJsYXkodHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJvYmplY3RcIiA/IHtcbiAgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZTogb3B0aW9ucy5vdmVybGF5LnRydXN0ZWRUeXBlc1BvbGljeU5hbWUsXG4gIGNhdGNoUnVudGltZUVycm9yOiBvcHRpb25zLm92ZXJsYXkucnVudGltZUVycm9yc1xufSA6IHtcbiAgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZTogZmFsc2UsXG4gIGNhdGNoUnVudGltZUVycm9yOiBvcHRpb25zLm92ZXJsYXlcbn0pIDoge1xuICBzZW5kOiBmdW5jdGlvbiBzZW5kKCkge31cbn07XG52YXIgb25Tb2NrZXRNZXNzYWdlID0ge1xuICBob3Q6IGZ1bmN0aW9uIGhvdCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIH0sXG4gIGxpdmVSZWxvYWQ6IGZ1bmN0aW9uIGxpdmVSZWxvYWQoKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7XG5cbiAgICAvLyBGaXhlcyAjMTA0Mi4gb3ZlcmxheSBkb2Vzbid0IGNsZWFyIGlmIGVycm9ycyBhcmUgZml4ZWQgYnV0IHdhcm5pbmdzIHJlbWFpbi5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gICAqL1xuICBoYXNoOiBmdW5jdGlvbiBoYXNoKF9oYXNoKSB7XG4gICAgc3RhdHVzLnByZXZpb3VzSGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaDtcbiAgICBzdGF0dXMuY3VycmVudEhhc2ggPSBfaGFzaDtcbiAgfSxcbiAgbG9nZ2luZzogc2V0QWxsTG9nTGV2ZWwsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBvdmVybGF5OiBmdW5jdGlvbiBvdmVybGF5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgICBkZWNvZGVPdmVybGF5T3B0aW9ucyhvcHRpb25zLm92ZXJsYXkpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIHJlY29ubmVjdCh2YWx1ZSkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMucmVjb25uZWN0ID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBwcm9ncmVzczogZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICBvcHRpb25zLnByb2dyZXNzID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge3sgcGx1Z2luTmFtZT86IHN0cmluZywgcGVyY2VudDogbnVtYmVyLCBtc2c6IHN0cmluZyB9fSBkYXRhXG4gICAqL1xuICBcInByb2dyZXNzLXVwZGF0ZVwiOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSA/IFwiW1wiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUsIFwiXSBcIikgOiBcIlwiKS5jb25jYXQoZGF0YS5wZXJjZW50LCBcIiUgLSBcIikuY29uY2F0KGRhdGEubXNnLCBcIi5cIikpO1xuICAgIH1cbiAgICBzZW5kTWVzc2FnZShcIlByb2dyZXNzXCIsIGRhdGEpO1xuICB9LFxuICBcInN0aWxsLW9rXCI6IGZ1bmN0aW9uIHN0aWxsT2soKSB7XG4gICAgbG9nLmluZm8oXCJOb3RoaW5nIGNoYW5nZWQuXCIpO1xuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VuZE1lc3NhZ2UoXCJTdGlsbE9rXCIpO1xuICB9LFxuICBvazogZnVuY3Rpb24gb2soKSB7XG4gICAgc2VuZE1lc3NhZ2UoXCJPa1wiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXNcbiAgICovXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MsIHBhcmFtcykge1xuICAgIGxvZy53YXJuKFwiV2FybmluZ3Mgd2hpbGUgY29tcGlsaW5nLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbShcIndhcm5pbmdcIiwgZXJyb3IpLFxuICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludGFibGVXYXJuaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLndhcm4ocHJpbnRhYmxlV2FybmluZ3NbaV0pO1xuICAgIH1cbiAgICB2YXIgb3ZlcmxheVdhcm5pbmdzU2V0dGluZyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS53YXJuaW5ncztcbiAgICBpZiAob3ZlcmxheVdhcm5pbmdzU2V0dGluZykge1xuICAgICAgdmFyIHdhcm5pbmdzVG9EaXNwbGF5ID0gdHlwZW9mIG92ZXJsYXlXYXJuaW5nc1NldHRpbmcgPT09IFwiZnVuY3Rpb25cIiA/IF93YXJuaW5ncy5maWx0ZXIob3ZlcmxheVdhcm5pbmdzU2V0dGluZykgOiBfd2FybmluZ3M7XG4gICAgICBpZiAod2FybmluZ3NUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcIndhcm5pbmdcIixcbiAgICAgICAgICBtZXNzYWdlczogX3dhcm5pbmdzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wcmV2ZW50UmVsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlRXJyb3JzID0gX2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0yID0gZm9ybWF0UHJvYmxlbShcImVycm9yXCIsIGVycm9yKSxcbiAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0yLmhlYWRlcixcbiAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJFcnJvcnNcIiwgcHJpbnRhYmxlRXJyb3JzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuICAgIHZhciBvdmVybGF5RXJyb3JzU2V0dGluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkuZXJyb3JzO1xuICAgIGlmIChvdmVybGF5RXJyb3JzU2V0dGluZ3MpIHtcbiAgICAgIHZhciBlcnJvcnNUb0Rpc3BsYXkgPSB0eXBlb2Ygb3ZlcmxheUVycm9yc1NldHRpbmdzID09PSBcImZ1bmN0aW9uXCIgPyBfZXJyb3JzLmZpbHRlcihvdmVybGF5RXJyb3JzU2V0dGluZ3MpIDogX2Vycm9ycztcbiAgICAgIGlmIChlcnJvcnNUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZXM6IF9lcnJvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5pbmZvKFwiRGlzY29ubmVjdGVkIVwiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG52YXIgc29ja2V0VVJMID0gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFJlc291cmNlUXVlcnkpO1xuc29ja2V0KHNvY2tldFVSTCwgb25Tb2NrZXRNZXNzYWdlLCBvcHRpb25zLnJlY29ubmVjdCk7IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgU3luY0JhaWxIb29rOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gU3luY0JhaWxIb29rOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbmZ1bmN0aW9uIFN5bmNCYWlsSG9vaygpIHtcbiAgcmV0dXJuIHtcbiAgICBjYWxsOiBmdW5jdGlvbiBjYWxsKCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBDbGllbnQgc3R1YiBmb3IgdGFwYWJsZSBTeW5jQmFpbEhvb2tcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcbiAgcmV0dXJuIGFycjI7XG59XG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KHQpIHtcbiAgdmFyIGkgPSBfdG9QcmltaXRpdmUodCwgXCJzdHJpbmdcIik7XG4gIHJldHVybiBcInN5bWJvbFwiID09IHR5cGVvZiBpID8gaSA6IGkgKyBcIlwiO1xufVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHtcbiAgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkudG9QcmltaXRpdmVdO1xuICBpZiAodm9pZCAwICE9PSBlKSB7XG4gICAgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIGkpIHJldHVybiBpO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpO1xufVxudmFyIExvZ1R5cGUgPSBPYmplY3QuZnJlZXplKHtcbiAgZXJyb3I6ICggLyoqIEB0eXBlIHtcImVycm9yXCJ9ICovXCJlcnJvclwiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgd2FybjogKCAvKiogQHR5cGUge1wid2FyblwifSAqL1wid2FyblwiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgaW5mbzogKCAvKiogQHR5cGUge1wiaW5mb1wifSAqL1wiaW5mb1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgbG9nOiAoIC8qKiBAdHlwZSB7XCJsb2dcIn0gKi9cImxvZ1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgZGVidWc6ICggLyoqIEB0eXBlIHtcImRlYnVnXCJ9ICovXCJkZWJ1Z1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcblxuICB0cmFjZTogKCAvKiogQHR5cGUge1widHJhY2VcIn0gKi9cInRyYWNlXCIpLFxuICAvLyBubyBhcmd1bWVudHNcblxuICBncm91cDogKCAvKiogQHR5cGUge1wiZ3JvdXBcIn0gKi9cImdyb3VwXCIpLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwQ29sbGFwc2VkOiAoIC8qKiBAdHlwZSB7XCJncm91cENvbGxhcHNlZFwifSAqL1wiZ3JvdXBDb2xsYXBzZWRcIiksXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBFbmQ6ICggLyoqIEB0eXBlIHtcImdyb3VwRW5kXCJ9ICovXCJncm91cEVuZFwiKSxcbiAgLy8gW2xhYmVsXVxuXG4gIHByb2ZpbGU6ICggLyoqIEB0eXBlIHtcInByb2ZpbGVcIn0gKi9cInByb2ZpbGVcIiksXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgcHJvZmlsZUVuZDogKCAvKiogQHR5cGUge1wicHJvZmlsZUVuZFwifSAqL1wicHJvZmlsZUVuZFwiKSxcbiAgLy8gW3Byb2ZpbGVOYW1lXVxuXG4gIHRpbWU6ICggLyoqIEB0eXBlIHtcInRpbWVcIn0gKi9cInRpbWVcIiksXG4gIC8vIG5hbWUsIHRpbWUgYXMgW3NlY29uZHMsIG5hbm9zZWNvbmRzXVxuXG4gIGNsZWFyOiAoIC8qKiBAdHlwZSB7XCJjbGVhclwifSAqL1wiY2xlYXJcIiksXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBzdGF0dXM6ICggLyoqIEB0eXBlIHtcInN0YXR1c1wifSAqL1wic3RhdHVzXCIpIC8vIG1lc3NhZ2UsIGFyZ3VtZW50c1xufSk7XG5leHBvcnRzLkxvZ1R5cGUgPSBMb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge3R5cGVvZiBMb2dUeXBlW2tleW9mIHR5cGVvZiBMb2dUeXBlXX0gTG9nVHlwZUVudW0gKi9cblxudmFyIExPR19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHJhdyBsb2cgbWV0aG9kXCIpO1xudmFyIFRJTUVSU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHRpbWVzXCIpO1xudmFyIFRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgYWdncmVnYXRlZCB0aW1lc1wiKTtcbnZhciBXZWJwYWNrTG9nZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTG9nVHlwZUVudW0sIGFueVtdPSk6IHZvaWR9IGxvZyBsb2cgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcgfCBmdW5jdGlvbigpOiBzdHJpbmcpOiBXZWJwYWNrTG9nZ2VyfSBnZXRDaGlsZExvZ2dlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQgbG9nZ2VyXG4gICAqL1xuICBmdW5jdGlvbiBXZWJwYWNrTG9nZ2VyKGxvZywgZ2V0Q2hpbGRMb2dnZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0xvZ2dlcik7XG4gICAgdGhpc1tMT0dfU1lNQk9MXSA9IGxvZztcbiAgICB0aGlzLmdldENoaWxkTG9nZ2VyID0gZ2V0Q2hpbGRMb2dnZXI7XG4gIH1cbiAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJwYWNrTG9nZ2VyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwid2FyblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS53YXJuLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5pbmZvLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUubG9nLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVidWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmRlYnVnLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXNzZXJ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2VydChhc3NlcnRpb24pIHtcbiAgICAgIGlmICghYXNzZXJ0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiA+IDEgPyBfbGVuNiAtIDEgOiAwKSwgX2tleTYgPSAxOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5NiAtIDFdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZXJyb3IsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cmFjZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmFjZSgpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50cmFjZSwgW1wiVHJhY2VcIl0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5jbGVhcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN0YXR1c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGF0dXMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjcpLCBfa2V5NyA9IDA7IF9rZXk3IDwgX2xlbjc7IF9rZXk3KyspIHtcbiAgICAgICAgYXJnc1tfa2V5N10gPSBhcmd1bWVudHNbX2tleTddO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnN0YXR1cywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjggPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW44KSwgX2tleTggPSAwOyBfa2V5OCA8IF9sZW44OyBfa2V5OCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleThdID0gYXJndW1lbnRzW19rZXk4XTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwQ29sbGFwc2VkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwQ29sbGFwc2VkKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjkgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW45KSwgX2tleTkgPSAwOyBfa2V5OSA8IF9sZW45OyBfa2V5OSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTldID0gYXJndW1lbnRzW19rZXk5XTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cENvbGxhcHNlZCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwRW5kKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjEwID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMTApLCBfa2V5MTAgPSAwOyBfa2V5MTAgPCBfbGVuMTA7IF9rZXkxMCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTEwXSA9IGFyZ3VtZW50c1tfa2V5MTBdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwRW5kLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZSwgW2xhYmVsXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByb2ZpbGVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvZmlsZUVuZChsYWJlbCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnByb2ZpbGVFbmQsIFtsYWJlbF0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWUobGFiZWwpIHtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0gPSB0aGlzW1RJTUVSU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uc2V0KGxhYmVsLCBwcm9jZXNzLmhydGltZSgpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUxvZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lTG9nKGxhYmVsKSB7XG4gICAgICB2YXIgcHJldiA9IHRoaXNbVElNRVJTX1NZTUJPTF0gJiYgdGhpc1tUSU1FUlNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVMb2coKVwiKSk7XG4gICAgICB9XG4gICAgICB2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKHByZXYpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVFbmQobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUVuZCgpXCIpKTtcbiAgICAgIH1cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZShsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lQWdncmVnYXRlKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIHRoaXNbVElNRVJTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXSB8fCBuZXcgTWFwKCk7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5nZXQobGFiZWwpO1xuICAgICAgaWYgKGN1cnJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGltZVsxXSArIGN1cnJlbnRbMV0gPiAxZTkpIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF0gKyAxO1xuICAgICAgICAgIHRpbWVbMV0gPSB0aW1lWzFdIC0gMWU5ICsgY3VycmVudFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF07XG4gICAgICAgICAgdGltZVsxXSArPSBjdXJyZW50WzFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uc2V0KGxhYmVsLCB0aW1lKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZUFnZ3JlZ2F0ZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lQWdncmVnYXRlRW5kKGxhYmVsKSB7XG4gICAgICBpZiAodGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHZhciB0aW1lID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZGVsZXRlKGxhYmVsKTtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS50aW1lLCBbbGFiZWxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkodGltZSkpKTtcbiAgICB9XG4gIH1dKTtcbn0oKTtcbmV4cG9ydHMuTG9nZ2VyID0gV2VicGFja0xvZ2dlcjtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7XG59XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuICByZXR1cm4gYXJyMjtcbn1cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gIExvZ1R5cGUgPSBfcmVxdWlyZS5Mb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVyVHlwZXN9IEZpbHRlclR5cGVzICovXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4vTG9nZ2VyXCIpLkxvZ1R5cGVFbnVtfSBMb2dUeXBlRW51bSAqL1xuXG4vKiogQHR5cGVkZWYge2Z1bmN0aW9uKHN0cmluZyk6IGJvb2xlYW59IEZpbHRlckZ1bmN0aW9uICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTG9nZ2VyQ29uc29sZVxuICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiB2b2lkfSBjbGVhclxuICogQHByb3BlcnR5IHtmdW5jdGlvbigpOiB2b2lkfSB0cmFjZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGluZm9cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBsb2dcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSB3YXJuXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZXJyb3JcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZGVidWdcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBDb2xsYXBzZWRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gZ3JvdXBFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gc3RhdHVzXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHByb2ZpbGVcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gcHJvZmlsZUVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBsb2dUaW1lXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMb2dnZXJPcHRpb25zXG4gKiBAcHJvcGVydHkge2ZhbHNlfHRydWV8XCJub25lXCJ8XCJlcnJvclwifFwid2FyblwifFwiaW5mb1wifFwibG9nXCJ8XCJ2ZXJib3NlXCJ9IGxldmVsIGxvZ2xldmVsXG4gKiBAcHJvcGVydHkge0ZpbHRlclR5cGVzfGJvb2xlYW59IGRlYnVnIGZpbHRlciBmb3IgZGVidWcgbG9nZ2luZ1xuICogQHByb3BlcnR5IHtMb2dnZXJDb25zb2xlfSBjb25zb2xlIHRoZSBjb25zb2xlIHRvIGxvZyB0b1xuICovXG5cbi8qKlxuICogQHBhcmFtIHtGaWx0ZXJJdGVtVHlwZXN9IGl0ZW0gYW4gaW5wdXQgaXRlbVxuICogQHJldHVybnMge0ZpbHRlckZ1bmN0aW9ufSBmaWx0ZXIgZnVuY3Rpb25cbiAqL1xudmFyIGZpbHRlclRvRnVuY3Rpb24gPSBmdW5jdGlvbiBmaWx0ZXJUb0Z1bmN0aW9uKGl0ZW0pIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJbXFxcXFxcXFwvXVwiLmNvbmNhdChpdGVtLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIiksIFwiKFtcXFxcXFxcXC9dfCR8IXxcXFxcPylcIikpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiByZWdFeHAudGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuICBpZiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgaXRlbS50ZXN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkZW50KSB7XG4gICAgICByZXR1cm4gaXRlbS50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9O1xuICB9XG59O1xuXG4vKipcbiAqIEBlbnVtIHtudW1iZXJ9XG4gKi9cbnZhciBMb2dMZXZlbCA9IHtcbiAgbm9uZTogNixcbiAgZmFsc2U6IDYsXG4gIGVycm9yOiA1LFxuICB3YXJuOiA0LFxuICBpbmZvOiAzLFxuICBsb2c6IDIsXG4gIHRydWU6IDIsXG4gIHZlcmJvc2U6IDFcbn07XG5cbi8qKlxuICogQHBhcmFtIHtMb2dnZXJPcHRpb25zfSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0XG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBMb2dUeXBlRW51bSwgYW55W10pOiB2b2lkfSBsb2dnaW5nIGZ1bmN0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIF9yZWYkbGV2ZWwgPSBfcmVmLmxldmVsLFxuICAgIGxldmVsID0gX3JlZiRsZXZlbCA9PT0gdm9pZCAwID8gXCJpbmZvXCIgOiBfcmVmJGxldmVsLFxuICAgIF9yZWYkZGVidWcgPSBfcmVmLmRlYnVnLFxuICAgIGRlYnVnID0gX3JlZiRkZWJ1ZyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGRlYnVnLFxuICAgIGNvbnNvbGUgPSBfcmVmLmNvbnNvbGU7XG4gIHZhciBkZWJ1Z0ZpbHRlcnMgPSB0eXBlb2YgZGVidWcgPT09IFwiYm9vbGVhblwiID8gW2Z1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVidWc7XG4gIH1dIDogLyoqIEB0eXBlIHtGaWx0ZXJJdGVtVHlwZXNbXX0gKi9bXS5jb25jYXQoZGVidWcpLm1hcChmaWx0ZXJUb0Z1bmN0aW9uKTtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gIHZhciBsb2dsZXZlbCA9IExvZ0xldmVsW1wiXCIuY29uY2F0KGxldmVsKV0gfHwgMDtcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gICAqIEBwYXJhbSB7TG9nVHlwZUVudW19IHR5cGUgdHlwZSBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEBwYXJhbSB7YW55W119IGFyZ3MgYXJndW1lbnRzIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICB2YXIgbG9nZ2VyID0gZnVuY3Rpb24gbG9nZ2VyKG5hbWUsIHR5cGUsIGFyZ3MpIHtcbiAgICB2YXIgbGFiZWxlZEFyZ3MgPSBmdW5jdGlvbiBsYWJlbGVkQXJncygpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICByZXR1cm4gW1wiW1wiLmNvbmNhdChuYW1lLCBcIl0gXCIpLmNvbmNhdChhcmdzWzBdKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzLnNsaWNlKDEpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdXCIpXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBMb2dUeXBlLmRlYnVnOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5kZWJ1Zy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUubG9nOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLmluZm86XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZXJyb3I6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5lcnJvcikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLnRyYWNlOlxuICAgICAgICBpZiAoIWRlYnVnKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLnZlcmJvc2UpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5ncm91cC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBFbmQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUudGltZTpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgICB2YXIgbXMgPSBhcmdzWzFdICogMTAwMCArIGFyZ3NbMl0gLyAxMDAwMDAwO1xuICAgICAgICAgIHZhciBtc2cgPSBcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSwgXCI6IFwiKS5jb25jYXQobXMsIFwiIG1zXCIpO1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5sb2dUaW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nVGltZShtc2cpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGU6XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5wcm9maWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGUuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlRW5kOlxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5wcm9maWxlRW5kLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuY2xlYXI6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuc3RhdHVzOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuc3RhdHVzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBMb2dUeXBlIFwiLmNvbmNhdCh0eXBlKSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbG9nZ2VyO1xufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHRhcGFibGUgKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qc1wiKSxcbiAgU3luY0JhaWxIb29rID0gX3JlcXVpcmUuU3luY0JhaWxIb29rO1xudmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gIExvZ2dlciA9IF9yZXF1aXJlMi5Mb2dnZXI7XG52YXIgY3JlYXRlQ29uc29sZUxvZ2dlciA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vY3JlYXRlQ29uc29sZUxvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiKTtcblxuLyoqIEB0eXBlIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9ICovXG52YXIgY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zID0ge1xuICBsZXZlbDogXCJpbmZvXCIsXG4gIGRlYnVnOiBmYWxzZSxcbiAgY29uc29sZTogY29uc29sZVxufTtcbnZhciBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAqIEByZXR1cm5zIHtMb2dnZXJ9IGEgbG9nZ2VyXG4gKi9cbmV4cG9ydHMuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBMb2dnZXIoZnVuY3Rpb24gKHR5cGUsIGFyZ3MpIHtcbiAgICBpZiAoZXhwb3J0cy5ob29rcy5sb2cuY2FsbChuYW1lLCB0eXBlLCBhcmdzKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjdXJyZW50RGVmYXVsdExvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKTtcbiAgICB9XG4gIH0sIGZ1bmN0aW9uIChjaGlsZE5hbWUpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5nZXRMb2dnZXIoXCJcIi5jb25jYXQobmFtZSwgXCIvXCIpLmNvbmNhdChjaGlsZE5hbWUpKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSBvcHRpb25zIG5ldyBvcHRpb25zLCBtZXJnZSB3aXRoIG9sZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcbiAgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG59O1xuZXhwb3J0cy5ob29rcyA9IHtcbiAgbG9nOiBuZXcgU3luY0JhaWxIb29rKFtcIm9yaWdpblwiLCBcInR5cGVcIiwgXCJhcmdzXCJdKVxufTtcblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIHJlZXhwb3J0IGRlZmF1bHQgZXhwb3J0IGZyb20gbmFtZWQgbW9kdWxlICovIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHdlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiKTtcblxufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBpIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19baV0gPSBfX3dlYnBhY2tfZXhwb3J0c19fW2ldO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8vIFRoZSBlcnJvciBvdmVybGF5IGlzIGluc3BpcmVkIChhbmQgbW9zdGx5IGNvcGllZCkgZnJvbSBDcmVhdGUgUmVhY3QgQXBwIChodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2tpbmN1YmF0b3IvY3JlYXRlLXJlYWN0LWFwcClcbi8vIFRoZXksIGluIHR1cm4sIGdvdCBpbnNwaXJlZCBieSB3ZWJwYWNrLWhvdC1taWRkbGV3YXJlIChodHRwczovL2dpdGh1Yi5jb20vZ2xlbmphbWluL3dlYnBhY2staG90LW1pZGRsZXdhcmUpLlxuXG5pbXBvcnQgYW5zaUhUTUwgZnJvbSBcImFuc2ktaHRtbC1jb21tdW5pdHlcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCJodG1sLWVudGl0aWVzXCI7XG5pbXBvcnQgeyBsaXN0ZW5Ub1J1bnRpbWVFcnJvciwgbGlzdGVuVG9VbmhhbmRsZWRSZWplY3Rpb24sIHBhcnNlRXJyb3JUb1N0YWNrcyB9IGZyb20gXCIuL292ZXJsYXkvcnVudGltZS1lcnJvci5qc1wiO1xuaW1wb3J0IGNyZWF0ZU92ZXJsYXlNYWNoaW5lIGZyb20gXCIuL292ZXJsYXkvc3RhdGUtbWFjaGluZS5qc1wiO1xuaW1wb3J0IHsgY29udGFpbmVyU3R5bGUsIGRpc21pc3NCdXR0b25TdHlsZSwgaGVhZGVyU3R5bGUsIGlmcmFtZVN0eWxlLCBtc2dTdHlsZXMsIG1zZ1RleHRTdHlsZSwgbXNnVHlwZVN0eWxlIH0gZnJvbSBcIi4vb3ZlcmxheS9zdHlsZXMuanNcIjtcbnZhciBjb2xvcnMgPSB7XG4gIHJlc2V0OiBbXCJ0cmFuc3BhcmVudFwiLCBcInRyYW5zcGFyZW50XCJdLFxuICBibGFjazogXCIxODE4MThcIixcbiAgcmVkOiBcIkUzNjA0OVwiLFxuICBncmVlbjogXCJCM0NCNzRcIixcbiAgeWVsbG93OiBcIkZGRDA4MFwiLFxuICBibHVlOiBcIjdDQUZDMlwiLFxuICBtYWdlbnRhOiBcIjdGQUNDQVwiLFxuICBjeWFuOiBcIkMzQzJFRlwiLFxuICBsaWdodGdyZXk6IFwiRUJFN0UzXCIsXG4gIGRhcmtncmV5OiBcIjZENzg5MVwiXG59O1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nOyBzdGFjaz86IHN0cmluZ1tdIH19IGl0ZW1cbiAqIEByZXR1cm5zIHt7IGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcgfX1cbiAqL1xuZnVuY3Rpb24gZm9ybWF0UHJvYmxlbSh0eXBlLCBpdGVtKSB7XG4gIHZhciBoZWFkZXIgPSB0eXBlID09PSBcIndhcm5pbmdcIiA/IFwiV0FSTklOR1wiIDogXCJFUlJPUlwiO1xuICB2YXIgYm9keSA9IFwiXCI7XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGJvZHkgKz0gaXRlbTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZmlsZSA9IGl0ZW0uZmlsZSB8fCBcIlwiO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgIHZhciBtb2R1bGVOYW1lID0gaXRlbS5tb2R1bGVOYW1lID8gaXRlbS5tb2R1bGVOYW1lLmluZGV4T2YoXCIhXCIpICE9PSAtMSA/IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZS5yZXBsYWNlKC9eKFxcc3xcXFMpKiEvLCBcIlwiKSwgXCIgKFwiKS5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLCBcIilcIikgOiBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUpIDogXCJcIjtcbiAgICB2YXIgbG9jID0gaXRlbS5sb2M7XG4gICAgaGVhZGVyICs9IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUgfHwgZmlsZSA/IFwiIGluIFwiLmNvbmNhdChtb2R1bGVOYW1lID8gXCJcIi5jb25jYXQobW9kdWxlTmFtZSkuY29uY2F0KGZpbGUgPyBcIiAoXCIuY29uY2F0KGZpbGUsIFwiKVwiKSA6IFwiXCIpIDogZmlsZSkuY29uY2F0KGxvYyA/IFwiIFwiLmNvbmNhdChsb2MpIDogXCJcIikgOiBcIlwiKTtcbiAgICBib2R5ICs9IGl0ZW0ubWVzc2FnZSB8fCBcIlwiO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uc3RhY2spKSB7XG4gICAgaXRlbS5zdGFjay5mb3JFYWNoKGZ1bmN0aW9uIChzdGFjaykge1xuICAgICAgaWYgKHR5cGVvZiBzdGFjayA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBib2R5ICs9IFwiXFxyXFxuXCIuY29uY2F0KHN0YWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGhlYWRlcjogaGVhZGVyLFxuICAgIGJvZHk6IGJvZHlcbiAgfTtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDcmVhdGVPdmVybGF5T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiB2b2lkfSBbY2F0Y2hSdW50aW1lRXJyb3JdXG4gKi9cblxuLyoqXG4gKlxuICogQHBhcmFtIHtDcmVhdGVPdmVybGF5T3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheSA9IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXkob3B0aW9ucykge1xuICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cbiAgdmFyIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQ7XG4gIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgY29udGFpbmVyRWxlbWVudDtcbiAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG4gIHZhciBoZWFkZXJFbGVtZW50O1xuICAvKiogQHR5cGUge0FycmF5PChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZD59ICovXG4gIHZhciBvbkxvYWRRdWV1ZSA9IFtdO1xuICAvKiogQHR5cGUge1RydXN0ZWRUeXBlUG9saWN5IHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcih0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKSB7XG4gICAgLy8gRW5hYmxlIFRydXN0ZWQgVHlwZXMgaWYgdGhleSBhcmUgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gICAgaWYgKHdpbmRvdy50cnVzdGVkVHlwZXMpIHtcbiAgICAgIG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPSB3aW5kb3cudHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSh0cnVzdGVkVHlwZXNQb2xpY3lOYW1lIHx8IFwid2VicGFjay1kZXYtc2VydmVyI292ZXJsYXlcIiwge1xuICAgICAgICBjcmVhdGVIVE1MOiBmdW5jdGlvbiBjcmVhdGVIVE1MKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5XCI7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zcmMgPSBcImFib3V0OmJsYW5rXCI7XG4gICAgYXBwbHlTdHlsZShpZnJhbWVDb250YWluZXJFbGVtZW50LCBpZnJhbWVTdHlsZSk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGVudEVsZW1lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKCAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQpLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb250YWluZXJFbGVtZW50ID0gLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cbiAgICAgICggLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuY29udGVudERvY3VtZW50KS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29udGVudEVsZW1lbnQuaWQgPSBcIndlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheS1kaXZcIjtcbiAgICAgIGFwcGx5U3R5bGUoY29udGVudEVsZW1lbnQsIGNvbnRhaW5lclN0eWxlKTtcbiAgICAgIGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgaGVhZGVyRWxlbWVudC5pbm5lclRleHQgPSBcIkNvbXBpbGVkIHdpdGggcHJvYmxlbXM6XCI7XG4gICAgICBhcHBseVN0eWxlKGhlYWRlckVsZW1lbnQsIGhlYWRlclN0eWxlKTtcbiAgICAgIHZhciBjbG9zZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgYXBwbHlTdHlsZShjbG9zZUJ1dHRvbkVsZW1lbnQsIGRpc21pc3NCdXR0b25TdHlsZSk7XG4gICAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuaW5uZXJUZXh0ID0gXCLDl1wiO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmFyaWFMYWJlbCA9IFwiRGlzbWlzc1wiO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgICAgICBvdmVybGF5U2VydmljZS5zZW5kKHtcbiAgICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyRWxlbWVudCk7XG4gICAgICBjb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbkVsZW1lbnQpO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAgIC8qKiBAdHlwZSB7RG9jdW1lbnR9ICovXG4gICAgICAoIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuYm9keS5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICBvbkxvYWRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvbkxvYWQpIHtcbiAgICAgICAgb25Mb2FkKCAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL2NvbnRlbnRFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgICAgb25Mb2FkUXVldWUgPSBbXTtcblxuICAgICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gbnVsbDtcbiAgICB9O1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsoZWxlbWVudDogSFRNTERpdkVsZW1lbnQpID0+IHZvaWR9IGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gdHJ1c3RlZFR5cGVzUG9saWN5TmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gZW5zdXJlT3ZlcmxheUV4aXN0cyhjYWxsYmFjaywgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZSkge1xuICAgIGlmIChjb250YWluZXJFbGVtZW50KSB7XG4gICAgICBjb250YWluZXJFbGVtZW50LmlubmVySFRNTCA9IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPyBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoXCJcIikgOiBcIlwiO1xuICAgICAgLy8gRXZlcnl0aGluZyBpcyByZWFkeSwgY2FsbCB0aGUgY2FsbGJhY2sgcmlnaHQgYXdheS5cbiAgICAgIGNhbGxiYWNrKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbkxvYWRRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjcmVhdGVDb250YWluZXIodHJ1c3RlZFR5cGVzUG9saWN5TmFtZSk7XG4gIH1cblxuICAvLyBTdWNjZXNzZnVsIGNvbXBpbGF0aW9uLlxuICBmdW5jdGlvbiBoaWRlKCkge1xuICAgIGlmICghaWZyYW1lQ29udGFpbmVyRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENsZWFuIHVwIGFuZCByZXNldCBpbnRlcm5hbCBzdGF0ZS5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICAgIGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgLy8gQ29tcGlsYXRpb24gd2l0aCBlcnJvcnMgKGUuZy4gc3ludGF4IGVycm9yIG9yIG1pc3NpbmcgbW9kdWxlcykuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZyAgfCB7IG1vZHVsZUlkZW50aWZpZXI/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gICAqIEBwYXJhbSB7J2J1aWxkJyB8ICdydW50aW1lJ30gbWVzc2FnZVNvdXJjZVxuICAgKi9cbiAgZnVuY3Rpb24gc2hvdyh0eXBlLCBtZXNzYWdlcywgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZSwgbWVzc2FnZVNvdXJjZSkge1xuICAgIGVuc3VyZU92ZXJsYXlFeGlzdHMoZnVuY3Rpb24gKCkge1xuICAgICAgaGVhZGVyRWxlbWVudC5pbm5lclRleHQgPSBtZXNzYWdlU291cmNlID09PSBcInJ1bnRpbWVcIiA/IFwiVW5jYXVnaHQgcnVudGltZSBlcnJvcnM6XCIgOiBcIkNvbXBpbGVkIHdpdGggcHJvYmxlbXM6XCI7XG4gICAgICBtZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHZhciBlbnRyeUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgbXNnU3R5bGUgPSB0eXBlID09PSBcIndhcm5pbmdcIiA/IG1zZ1N0eWxlcy53YXJuaW5nIDogbXNnU3R5bGVzLmVycm9yO1xuICAgICAgICBhcHBseVN0eWxlKGVudHJ5RWxlbWVudCwgX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBtc2dTdHlsZSksIHt9LCB7XG4gICAgICAgICAgcGFkZGluZzogXCIxcmVtIDFyZW0gMS41cmVtIDFyZW1cIlxuICAgICAgICB9KSk7XG4gICAgICAgIHZhciB0eXBlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBfZm9ybWF0UHJvYmxlbSA9IGZvcm1hdFByb2JsZW0odHlwZSwgbWVzc2FnZSksXG4gICAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0uaGVhZGVyLFxuICAgICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgICB0eXBlRWxlbWVudC5pbm5lclRleHQgPSBoZWFkZXI7XG4gICAgICAgIGFwcGx5U3R5bGUodHlwZUVsZW1lbnQsIG1zZ1R5cGVTdHlsZSk7XG4gICAgICAgIGlmIChtZXNzYWdlLm1vZHVsZUlkZW50aWZpZXIpIHtcbiAgICAgICAgICBhcHBseVN0eWxlKHR5cGVFbGVtZW50LCB7XG4gICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gZWxlbWVudC5kYXRhc2V0IG5vdCBzdXBwb3J0ZWQgaW4gSUVcbiAgICAgICAgICB0eXBlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNhbi1vcGVuXCIsIHRydWUpO1xuICAgICAgICAgIHR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmZXRjaChcIi93ZWJwYWNrLWRldi1zZXJ2ZXIvb3Blbi1lZGl0b3I/ZmlsZU5hbWU9XCIuY29uY2F0KG1lc3NhZ2UubW9kdWxlSWRlbnRpZmllcikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFrZSBpdCBsb29rIHNpbWlsYXIgdG8gb3VyIHRlcm1pbmFsLlxuICAgICAgICB2YXIgdGV4dCA9IGFuc2lIVE1MKGVuY29kZShib2R5KSk7XG4gICAgICAgIHZhciBtZXNzYWdlVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBhcHBseVN0eWxlKG1lc3NhZ2VUZXh0Tm9kZSwgbXNnVGV4dFN0eWxlKTtcbiAgICAgICAgbWVzc2FnZVRleHROb2RlLmlubmVySFRNTCA9IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPyBvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwodGV4dCkgOiB0ZXh0O1xuICAgICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xuICAgICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVRleHROb2RlKTtcblxuICAgICAgICAvKiogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAqL1xuICAgICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGVudHJ5RWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9LCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKTtcbiAgfVxuICB2YXIgb3ZlcmxheVNlcnZpY2UgPSBjcmVhdGVPdmVybGF5TWFjaGluZSh7XG4gICAgc2hvd092ZXJsYXk6IGZ1bmN0aW9uIHNob3dPdmVybGF5KF9yZWYpIHtcbiAgICAgIHZhciBfcmVmJGxldmVsID0gX3JlZi5sZXZlbCxcbiAgICAgICAgbGV2ZWwgPSBfcmVmJGxldmVsID09PSB2b2lkIDAgPyBcImVycm9yXCIgOiBfcmVmJGxldmVsLFxuICAgICAgICBtZXNzYWdlcyA9IF9yZWYubWVzc2FnZXMsXG4gICAgICAgIG1lc3NhZ2VTb3VyY2UgPSBfcmVmLm1lc3NhZ2VTb3VyY2U7XG4gICAgICByZXR1cm4gc2hvdyhsZXZlbCwgbWVzc2FnZXMsIG9wdGlvbnMudHJ1c3RlZFR5cGVzUG9saWN5TmFtZSwgbWVzc2FnZVNvdXJjZSk7XG4gICAgfSxcbiAgICBoaWRlT3ZlcmxheTogaGlkZVxuICB9KTtcbiAgaWYgKG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Vycm9yIHwgdW5kZWZpbmVkfSBlcnJvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmYWxsYmFja01lc3NhZ2VcbiAgICAgKi9cbiAgICB2YXIgaGFuZGxlRXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvciwgZmFsbGJhY2tNZXNzYWdlKSB7XG4gICAgICB2YXIgZXJyb3JPYmplY3QgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IgOiBuZXcgRXJyb3IoZXJyb3IgfHwgZmFsbGJhY2tNZXNzYWdlKTtcbiAgICAgIHZhciBzaG91bGREaXNwbGF5ID0gdHlwZW9mIG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IG9wdGlvbnMuY2F0Y2hSdW50aW1lRXJyb3IoZXJyb3JPYmplY3QpIDogdHJ1ZTtcbiAgICAgIGlmIChzaG91bGREaXNwbGF5KSB7XG4gICAgICAgIG92ZXJsYXlTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgIHR5cGU6IFwiUlVOVElNRV9FUlJPUlwiLFxuICAgICAgICAgIG1lc3NhZ2VzOiBbe1xuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JPYmplY3QubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3JPYmplY3QpXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBsaXN0ZW5Ub1J1bnRpbWVFcnJvcihmdW5jdGlvbiAoZXJyb3JFdmVudCkge1xuICAgICAgLy8gZXJyb3IgcHJvcGVydHkgbWF5IGJlIGVtcHR5IGluIG9sZGVyIGJyb3dzZXIgbGlrZSBJRVxuICAgICAgdmFyIGVycm9yID0gZXJyb3JFdmVudC5lcnJvcixcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yRXZlbnQubWVzc2FnZTtcbiAgICAgIGlmICghZXJyb3IgJiYgIW1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UpO1xuICAgIH0pO1xuICAgIGxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uKGZ1bmN0aW9uIChwcm9taXNlUmVqZWN0aW9uRXZlbnQpIHtcbiAgICAgIHZhciByZWFzb24gPSBwcm9taXNlUmVqZWN0aW9uRXZlbnQucmVhc29uO1xuICAgICAgaGFuZGxlRXJyb3IocmVhc29uLCBcIlVua25vd24gcHJvbWlzZSByZWplY3Rpb24gcmVhc29uXCIpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBvdmVybGF5U2VydmljZTtcbn07XG5leHBvcnQgeyBmb3JtYXRQcm9ibGVtLCBjcmVhdGVPdmVybGF5IH07IiwiZnVuY3Rpb24gb3duS2V5cyhlLCByKSB7IHZhciB0ID0gT2JqZWN0LmtleXMoZSk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBvID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsIHIpLmVudW1lcmFibGU7IH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pOyB9IHJldHVybiB0OyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdGVEZWZpbml0aW9uc1xuICogQHByb3BlcnR5IHt7W2V2ZW50OiBzdHJpbmddOiB7IHRhcmdldDogc3RyaW5nOyBhY3Rpb25zPzogQXJyYXk8c3RyaW5nPiB9fX0gW29uXVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHt7W3N0YXRlOiBzdHJpbmddOiBTdGF0ZURlZmluaXRpb25zfX0gc3RhdGVzXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29udGV4dDtcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbml0aWFsXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBJbXBsZW1lbnRhdGlvblxuICogQHByb3BlcnR5IHt7W2FjdGlvbk5hbWU6IHN0cmluZ106IChjdHg6IG9iamVjdCwgZXZlbnQ6IGFueSkgPT4gb2JqZWN0fX0gYWN0aW9uc1xuICovXG5cbi8qKlxuICogQSBzaW1wbGlmaWVkIGBjcmVhdGVNYWNoaW5lYCBmcm9tIGBAeHN0YXRlL2ZzbWAgd2l0aCB0aGUgZm9sbG93aW5nIGRpZmZlcmVuY2VzOlxuICpcbiAqICAtIHRoZSByZXR1cm5lZCBtYWNoaW5lIGlzIHRlY2huaWNhbGx5IGEgXCJzZXJ2aWNlXCIuIE5vIGBpbnRlcnByZXQobWFjaGluZSkuc3RhcnQoKWAgaXMgbmVlZGVkLlxuICogIC0gdGhlIHN0YXRlIGRlZmluaXRpb24gb25seSBzdXBwb3J0IGBvbmAgYW5kIHRhcmdldCBtdXN0IGJlIGRlY2xhcmVkIHdpdGggeyB0YXJnZXQ6ICduZXh0U3RhdGUnLCBhY3Rpb25zOiBbXSB9IGV4cGxpY2l0bHkuXG4gKiAgLSBldmVudCBwYXNzZWQgdG8gYHNlbmRgIG11c3QgYmUgYW4gb2JqZWN0IHdpdGggYHR5cGVgIHByb3BlcnR5LlxuICogIC0gYWN0aW9ucyBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIFthc3NpZ24gYWN0aW9uXShodHRwczovL3hzdGF0ZS5qcy5vcmcvZG9jcy9ndWlkZXMvY29udGV4dC5odG1sI2Fzc2lnbi1hY3Rpb24pIGlmIHlvdSByZXR1cm4gYW55IHZhbHVlLlxuICogIERvIG5vdCByZXR1cm4gYW55dGhpbmcgaWYgeW91IGp1c3Qgd2FudCB0byBpbnZva2Ugc2lkZSBlZmZlY3QuXG4gKlxuICogVGhlIGdvYWwgb2YgdGhpcyBjdXN0b20gZnVuY3Rpb24gaXMgdG8gYXZvaWQgaW5zdGFsbGluZyB0aGUgZW50aXJlIGAneHN0YXRlL2ZzbSdgIHBhY2thZ2UsIHdoaWxlIGVuYWJsaW5nIG1vZGVsaW5nIHVzaW5nXG4gKiBzdGF0ZSBtYWNoaW5lLiBZb3UgY2FuIGNvcHkgdGhlIGZpcnN0IHBhcmFtZXRlciBpbnRvIHRoZSBlZGl0b3IgYXQgaHR0cHM6Ly9zdGF0ZWx5LmFpL3ZpeiB0byB2aXN1YWxpemUgdGhlIHN0YXRlIG1hY2hpbmUuXG4gKlxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zXG4gKiBAcGFyYW0ge0ltcGxlbWVudGF0aW9ufSBpbXBsZW1lbnRhdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGVNYWNoaW5lKF9yZWYsIF9yZWYyKSB7XG4gIHZhciBzdGF0ZXMgPSBfcmVmLnN0YXRlcyxcbiAgICBjb250ZXh0ID0gX3JlZi5jb250ZXh0LFxuICAgIGluaXRpYWwgPSBfcmVmLmluaXRpYWw7XG4gIHZhciBhY3Rpb25zID0gX3JlZjIuYWN0aW9ucztcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IGluaXRpYWw7XG4gIHZhciBjdXJyZW50Q29udGV4dCA9IGNvbnRleHQ7XG4gIHJldHVybiB7XG4gICAgc2VuZDogZnVuY3Rpb24gc2VuZChldmVudCkge1xuICAgICAgdmFyIGN1cnJlbnRTdGF0ZU9uID0gc3RhdGVzW2N1cnJlbnRTdGF0ZV0ub247XG4gICAgICB2YXIgdHJhbnNpdGlvbkNvbmZpZyA9IGN1cnJlbnRTdGF0ZU9uICYmIGN1cnJlbnRTdGF0ZU9uW2V2ZW50LnR5cGVdO1xuICAgICAgaWYgKHRyYW5zaXRpb25Db25maWcpIHtcbiAgICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNpdGlvbkNvbmZpZy50YXJnZXQ7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uQ29uZmlnLmFjdGlvbnMpIHtcbiAgICAgICAgICB0cmFuc2l0aW9uQ29uZmlnLmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0TmFtZSkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbkltcGwgPSBhY3Rpb25zW2FjdE5hbWVdO1xuICAgICAgICAgICAgdmFyIG5leHRDb250ZXh0VmFsdWUgPSBhY3Rpb25JbXBsICYmIGFjdGlvbkltcGwoY3VycmVudENvbnRleHQsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChuZXh0Q29udGV4dFZhbHVlKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBjdXJyZW50Q29udGV4dCksIG5leHRDb250ZXh0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWFjaGluZTsiLCIvKipcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICovXG5mdW5jdGlvbiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3IpIHtcbiAgaWYgKCFlcnJvciB8fCAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicGFyc2VFcnJvclRvU3RhY2tzIGV4cGVjdHMgRXJyb3Igb2JqZWN0XCIpO1xuICB9XG4gIGlmICh0eXBlb2YgZXJyb3Iuc3RhY2sgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZXJyb3Iuc3RhY2suc3BsaXQoXCJcXG5cIikuZmlsdGVyKGZ1bmN0aW9uIChzdGFjaykge1xuICAgICAgcmV0dXJuIHN0YWNrICE9PSBcIkVycm9yOiBcIi5jb25jYXQoZXJyb3IubWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgRXJyb3JDYWxsYmFja1xuICogQHBhcmFtIHtFcnJvckV2ZW50fSBlcnJvclxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0Vycm9yQ2FsbGJhY2t9IGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvUnVudGltZUVycm9yKGNhbGxiYWNrKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgY2FsbGJhY2spO1xuICByZXR1cm4gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGNhbGxiYWNrKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgVW5oYW5kbGVkUmVqZWN0aW9uQ2FsbGJhY2tcbiAqIEBwYXJhbSB7UHJvbWlzZVJlamVjdGlvbkV2ZW50fSByZWplY3Rpb25FdmVudFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge1VuaGFuZGxlZFJlamVjdGlvbkNhbGxiYWNrfSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbihjYWxsYmFjaykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLCBjYWxsYmFjayk7XG4gIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidW5oYW5kbGVkcmVqZWN0aW9uXCIsIGNhbGxiYWNrKTtcbiAgfTtcbn1cbmV4cG9ydCB7IGxpc3RlblRvUnVudGltZUVycm9yLCBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbiwgcGFyc2VFcnJvclRvU3RhY2tzIH07IiwiaW1wb3J0IGNyZWF0ZU1hY2hpbmUgZnJvbSBcIi4vZnNtLmpzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU2hvd092ZXJsYXlEYXRhXG4gKiBAcHJvcGVydHkgeyd3YXJuaW5nJyB8ICdlcnJvcid9IGxldmVsXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZyAgfCB7IG1vZHVsZUlkZW50aWZpZXI/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAqIEBwcm9wZXJ0eSB7J2J1aWxkJyB8ICdydW50aW1lJ30gbWVzc2FnZVNvdXJjZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ3JlYXRlT3ZlcmxheU1hY2hpbmVPcHRpb25zXG4gKiBAcHJvcGVydHkgeyhkYXRhOiBTaG93T3ZlcmxheURhdGEpID0+IHZvaWR9IHNob3dPdmVybGF5XG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IGhpZGVPdmVybGF5XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0NyZWF0ZU92ZXJsYXlNYWNoaW5lT3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheU1hY2hpbmUgPSBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TWFjaGluZShvcHRpb25zKSB7XG4gIHZhciBoaWRlT3ZlcmxheSA9IG9wdGlvbnMuaGlkZU92ZXJsYXksXG4gICAgc2hvd092ZXJsYXkgPSBvcHRpb25zLnNob3dPdmVybGF5O1xuICB2YXIgb3ZlcmxheU1hY2hpbmUgPSBjcmVhdGVNYWNoaW5lKHtcbiAgICBpbml0aWFsOiBcImhpZGRlblwiLFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICBtZXNzYWdlczogW10sXG4gICAgICBtZXNzYWdlU291cmNlOiBcImJ1aWxkXCJcbiAgICB9LFxuICAgIHN0YXRlczoge1xuICAgICAgaGlkZGVuOiB7XG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wic2V0TWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgUlVOVElNRV9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlSdW50aW1lRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkaXNwbGF5QnVpbGRFcnJvcjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIERJU01JU1M6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImRpc21pc3NNZXNzYWdlc1wiLCBcImhpZGVPdmVybGF5XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBCVUlMRF9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlCdWlsZEVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJhcHBlbmRNZXNzYWdlc1wiLCBcInNob3dPdmVybGF5XCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzcGxheVJ1bnRpbWVFcnJvcjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIERJU01JU1M6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImRpc21pc3NNZXNzYWdlc1wiLCBcImhpZGVPdmVybGF5XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBSVU5USU1FX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheVJ1bnRpbWVFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiYXBwZW5kTWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wic2V0TWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGFjdGlvbnM6IHtcbiAgICAgIGRpc21pc3NNZXNzYWdlczogZnVuY3Rpb24gZGlzbWlzc01lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgICAgIG1lc3NhZ2VTb3VyY2U6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGFwcGVuZE1lc3NhZ2VzOiBmdW5jdGlvbiBhcHBlbmRNZXNzYWdlcyhjb250ZXh0LCBldmVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBjb250ZXh0Lm1lc3NhZ2VzLmNvbmNhdChldmVudC5tZXNzYWdlcyksXG4gICAgICAgICAgbGV2ZWw6IGV2ZW50LmxldmVsIHx8IGNvbnRleHQubGV2ZWwsXG4gICAgICAgICAgbWVzc2FnZVNvdXJjZTogZXZlbnQudHlwZSA9PT0gXCJSVU5USU1FX0VSUk9SXCIgPyBcInJ1bnRpbWVcIiA6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHNldE1lc3NhZ2VzOiBmdW5jdGlvbiBzZXRNZXNzYWdlcyhjb250ZXh0LCBldmVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBldmVudC5tZXNzYWdlcyxcbiAgICAgICAgICBsZXZlbDogZXZlbnQubGV2ZWwgfHwgY29udGV4dC5sZXZlbCxcbiAgICAgICAgICBtZXNzYWdlU291cmNlOiBldmVudC50eXBlID09PSBcIlJVTlRJTUVfRVJST1JcIiA/IFwicnVudGltZVwiIDogXCJidWlsZFwiXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaGlkZU92ZXJsYXk6IGhpZGVPdmVybGF5LFxuICAgICAgc2hvd092ZXJsYXk6IHNob3dPdmVybGF5XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG92ZXJsYXlNYWNoaW5lO1xufTtcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU92ZXJsYXlNYWNoaW5lOyIsIi8vIHN0eWxlcyBhcmUgaW5zcGlyZWQgYnkgYHJlYWN0LWVycm9yLW92ZXJsYXlgXG5cbnZhciBtc2dTdHlsZXMgPSB7XG4gIGVycm9yOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjA2LCAxNywgMzgsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmNjZmNmXCJcbiAgfSxcbiAgd2FybmluZzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1MSwgMjQ1LCAxODAsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmJmNWI0XCJcbiAgfVxufTtcbnZhciBpZnJhbWVTdHlsZSA9IHtcbiAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgdG9wOiAwLFxuICBsZWZ0OiAwLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogXCIxMDB2d1wiLFxuICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgYm9yZGVyOiBcIm5vbmVcIixcbiAgXCJ6LWluZGV4XCI6IDk5OTk5OTk5OTlcbn07XG52YXIgY29udGFpbmVyU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgd2lkdGg6IFwiMTAwdndcIixcbiAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gIGZvbnRTaXplOiBcImxhcmdlXCIsXG4gIHBhZGRpbmc6IFwiMnJlbSAycmVtIDRyZW0gMnJlbVwiLFxuICBsaW5lSGVpZ2h0OiBcIjEuMlwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIG92ZXJmbG93OiBcImF1dG9cIixcbiAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwgMCwgMCwgMC45KVwiLFxuICBjb2xvcjogXCJ3aGl0ZVwiXG59O1xudmFyIGhlYWRlclN0eWxlID0ge1xuICBjb2xvcjogXCIjZTgzYjQ2XCIsXG4gIGZvbnRTaXplOiBcIjJlbVwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIGZvbnRGYW1pbHk6IFwic2Fucy1zZXJpZlwiLFxuICBtYXJnaW46IFwiMCAycmVtIDJyZW0gMFwiLFxuICBmbGV4OiBcIjAgMCBhdXRvXCIsXG4gIG1heEhlaWdodDogXCI1MCVcIixcbiAgb3ZlcmZsb3c6IFwiYXV0b1wiXG59O1xudmFyIGRpc21pc3NCdXR0b25TdHlsZSA9IHtcbiAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICBsaW5lSGVpZ2h0OiBcIjFyZW1cIixcbiAgZm9udFNpemU6IFwiMS41cmVtXCIsXG4gIHBhZGRpbmc6IFwiMXJlbVwiLFxuICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICByaWdodDogMCxcbiAgdG9wOiAwLFxuICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgYm9yZGVyOiBcIm5vbmVcIlxufTtcbnZhciBtc2dUeXBlU3R5bGUgPSB7XG4gIGNvbG9yOiBcIiNlODNiNDZcIixcbiAgZm9udFNpemU6IFwiMS4yZW1cIixcbiAgbWFyZ2luQm90dG9tOiBcIjFyZW1cIixcbiAgZm9udEZhbWlseTogXCJzYW5zLXNlcmlmXCJcbn07XG52YXIgbXNnVGV4dFN0eWxlID0ge1xuICBsaW5lSGVpZ2h0OiBcIjEuNVwiLFxuICBmb250U2l6ZTogXCIxcmVtXCIsXG4gIGZvbnRGYW1pbHk6IFwiTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2VcIlxufTtcbmV4cG9ydCB7IG1zZ1N0eWxlcywgaWZyYW1lU3R5bGUsIGNvbnRhaW5lclN0eWxlLCBoZWFkZXJTdHlsZSwgZGlzbWlzc0J1dHRvblN0eWxlLCBtc2dUeXBlU3R5bGUsIG1zZ1RleHRTdHlsZSB9OyIsIi8qIGdsb2JhbCBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAqL1xuXG5pbXBvcnQgV2ViU29ja2V0Q2xpZW50IGZyb20gXCIuL2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcblxuLy8gdGhpcyBXZWJzb2NrZXRDbGllbnQgaXMgaGVyZSBhcyBhIGRlZmF1bHQgZmFsbGJhY2ssIGluIGNhc2UgdGhlIGNsaWVudCBpcyBub3QgaW5qZWN0ZWRcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xudmFyIENsaWVudCA9XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbnR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0ICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCA6IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fIDogV2ViU29ja2V0Q2xpZW50O1xuLyogZXNsaW50LWVuYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIHJldHJpZXMgPSAwO1xudmFyIG1heFJldHJpZXMgPSAxMDtcblxuLy8gSW5pdGlhbGl6ZWQgY2xpZW50IGlzIGV4cG9ydGVkIHNvIGV4dGVybmFsIGNvbnN1bWVycyBjYW4gdXRpbGl6ZSB0aGUgc2FtZSBpbnN0YW5jZVxuLy8gSXQgaXMgbXV0YWJsZSB0byBlbmZvcmNlIHNpbmdsZXRvblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmV4cG9ydCB2YXIgY2xpZW50ID0gbnVsbDtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge3sgW2hhbmRsZXI6IHN0cmluZ106IChkYXRhPzogYW55LCBwYXJhbXM/OiBhbnkpID0+IGFueSB9fSBoYW5kbGVyc1xuICogQHBhcmFtIHtudW1iZXJ9IFtyZWNvbm5lY3RdXG4gKi9cbnZhciBzb2NrZXQgPSBmdW5jdGlvbiBpbml0U29ja2V0KHVybCwgaGFuZGxlcnMsIHJlY29ubmVjdCkge1xuICBjbGllbnQgPSBuZXcgQ2xpZW50KHVybCk7XG4gIGNsaWVudC5vbk9wZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHJpZXMgPSAwO1xuICAgIGlmICh0eXBlb2YgcmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBtYXhSZXRyaWVzID0gcmVjb25uZWN0O1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmV0cmllcyA9PT0gMCkge1xuICAgICAgaGFuZGxlcnMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICAvLyBUcnkgdG8gcmVjb25uZWN0LlxuICAgIGNsaWVudCA9IG51bGw7XG5cbiAgICAvLyBBZnRlciAxMCByZXRyaWVzIHN0b3AgdHJ5aW5nLCB0byBwcmV2ZW50IGxvZ3NwYW0uXG4gICAgaWYgKHJldHJpZXMgPCBtYXhSZXRyaWVzKSB7XG4gICAgICAvLyBFeHBvbmVudGlhbGx5IGluY3JlYXNlIHRpbWVvdXQgdG8gcmVjb25uZWN0LlxuICAgICAgLy8gUmVzcGVjdGZ1bGx5IGNvcGllZCBmcm9tIHRoZSBwYWNrYWdlIGBnb3RgLlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuICAgICAgdmFyIHJldHJ5SW5NcyA9IDEwMDAgKiBNYXRoLnBvdygyLCByZXRyaWVzKSArIE1hdGgucmFuZG9tKCkgKiAxMDA7XG4gICAgICByZXRyaWVzICs9IDE7XG4gICAgICBsb2cuaW5mbyhcIlRyeWluZyB0byByZWNvbm5lY3QuLi5cIik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc29ja2V0KHVybCwgaGFuZGxlcnMsIHJlY29ubmVjdCk7XG4gICAgICB9LCByZXRyeUluTXMpO1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbk1lc3NhZ2UoXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgKi9cbiAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgaWYgKGhhbmRsZXJzW21lc3NhZ2UudHlwZV0pIHtcbiAgICAgIGhhbmRsZXJzW21lc3NhZ2UudHlwZV0obWVzc2FnZS5kYXRhLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgfVxuICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBzb2NrZXQ7IiwiLyoqXG4gKiBAcGFyYW0ge3sgcHJvdG9jb2w/OiBzdHJpbmcsIGF1dGg/OiBzdHJpbmcsIGhvc3RuYW1lPzogc3RyaW5nLCBwb3J0Pzogc3RyaW5nLCBwYXRobmFtZT86IHN0cmluZywgc2VhcmNoPzogc3RyaW5nLCBoYXNoPzogc3RyaW5nLCBzbGFzaGVzPzogYm9vbGVhbiB9fSBvYmpVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdChvYmpVUkwpIHtcbiAgdmFyIHByb3RvY29sID0gb2JqVVJMLnByb3RvY29sIHx8IFwiXCI7XG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSBcIjpcIikge1xuICAgIHByb3RvY29sICs9IFwiOlwiO1xuICB9XG4gIHZhciBhdXRoID0gb2JqVVJMLmF1dGggfHwgXCJcIjtcbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCBcIjpcIik7XG4gICAgYXV0aCArPSBcIkBcIjtcbiAgfVxuICB2YXIgaG9zdCA9IFwiXCI7XG4gIGlmIChvYmpVUkwuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArIChvYmpVUkwuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgPT09IC0xID8gb2JqVVJMLmhvc3RuYW1lIDogXCJbXCIuY29uY2F0KG9ialVSTC5ob3N0bmFtZSwgXCJdXCIpKTtcbiAgICBpZiAob2JqVVJMLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gXCI6XCIuY29uY2F0KG9ialVSTC5wb3J0KTtcbiAgICB9XG4gIH1cbiAgdmFyIHBhdGhuYW1lID0gb2JqVVJMLnBhdGhuYW1lIHx8IFwiXCI7XG4gIGlmIChvYmpVUkwuc2xhc2hlcykge1xuICAgIGhvc3QgPSBcIi8vXCIuY29uY2F0KGhvc3QgfHwgXCJcIik7XG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gXCIvXCIpIHtcbiAgICAgIHBhdGhuYW1lID0gXCIvXCIuY29uY2F0KHBhdGhuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gXCJcIjtcbiAgfVxuICB2YXIgc2VhcmNoID0gb2JqVVJMLnNlYXJjaCB8fCBcIlwiO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09IFwiP1wiKSB7XG4gICAgc2VhcmNoID0gXCI/XCIuY29uY2F0KHNlYXJjaCk7XG4gIH1cbiAgdmFyIGhhc2ggPSBvYmpVUkwuaGFzaCB8fCBcIlwiO1xuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gXCIjXCIpIHtcbiAgICBoYXNoID0gXCIjXCIuY29uY2F0KGhhc2gpO1xuICB9XG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFwiI1wiLCBcIiUyM1wiKTtcbiAgcmV0dXJuIFwiXCIuY29uY2F0KHByb3RvY29sKS5jb25jYXQoaG9zdCkuY29uY2F0KHBhdGhuYW1lKS5jb25jYXQoc2VhcmNoKS5jb25jYXQoaGFzaCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtVUkwgJiB7IGZyb21DdXJyZW50U2NyaXB0PzogYm9vbGVhbiB9fSBwYXJzZWRVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVNvY2tldFVSTChwYXJzZWRVUkwpIHtcbiAgdmFyIGhvc3RuYW1lID0gcGFyc2VkVVJMLmhvc3RuYW1lO1xuXG4gIC8vIE5vZGUuanMgbW9kdWxlIHBhcnNlcyBpdCBhcyBgOjpgXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxTdHJpbmddKWAgcGFyc2VzIGl0IGFzICdbOjpdJ1xuICB2YXIgaXNJbkFkZHJBbnkgPSBob3N0bmFtZSA9PT0gXCIwLjAuMC4wXCIgfHwgaG9zdG5hbWUgPT09IFwiOjpcIiB8fCBob3N0bmFtZSA9PT0gXCJbOjpdXCI7XG5cbiAgLy8gd2h5IGRvIHdlIG5lZWQgdGhpcyBjaGVjaz9cbiAgLy8gaG9zdG5hbWUgbi9hIGZvciBmaWxlIHByb3RvY29sIChleGFtcGxlLCB3aGVuIHVzaW5nIGVsZWN0cm9uLCBpb25pYylcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvcHVsbC8zODRcbiAgaWYgKGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24uaG9zdG5hbWUgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKSA9PT0gMCkge1xuICAgIGhvc3RuYW1lID0gc2VsZi5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgfVxuICB2YXIgc29ja2V0VVJMUHJvdG9jb2wgPSBwYXJzZWRVUkwucHJvdG9jb2wgfHwgc2VsZi5sb2NhdGlvbi5wcm90b2NvbDtcblxuICAvLyBXaGVuIGh0dHBzIGlzIHVzZWQgaW4gdGhlIGFwcCwgc2VjdXJlIHdlYiBzb2NrZXRzIGFyZSBhbHdheXMgbmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGJyb3dzZXIgZG9lc24ndCBhY2NlcHQgbm9uLXNlY3VyZSB3ZWIgc29ja2V0cy5cbiAgaWYgKHNvY2tldFVSTFByb3RvY29sID09PSBcImF1dG86XCIgfHwgaG9zdG5hbWUgJiYgaXNJbkFkZHJBbnkgJiYgc2VsZi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIikge1xuICAgIHNvY2tldFVSTFByb3RvY29sID0gc2VsZi5sb2NhdGlvbi5wcm90b2NvbDtcbiAgfVxuICBzb2NrZXRVUkxQcm90b2NvbCA9IHNvY2tldFVSTFByb3RvY29sLnJlcGxhY2UoL14oPzpodHRwfC4rLWV4dGVuc2lvbnxmaWxlKS9pLCBcIndzXCIpO1xuICB2YXIgc29ja2V0VVJMQXV0aCA9IFwiXCI7XG5cbiAgLy8gYG5ldyBVUkwodXJsU3RyaW5nLCBbYmFzZVVSTHN0cmluZ10pYCBkb2Vzbid0IGhhdmUgYGF1dGhgIHByb3BlcnR5XG4gIC8vIFBhcnNlIGF1dGhlbnRpY2F0aW9uIGNyZWRlbnRpYWxzIGluIGNhc2Ugd2UgbmVlZCB0aGVtXG4gIGlmIChwYXJzZWRVUkwudXNlcm5hbWUpIHtcbiAgICBzb2NrZXRVUkxBdXRoID0gcGFyc2VkVVJMLnVzZXJuYW1lO1xuXG4gICAgLy8gU2luY2UgSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvbiBkb2VzIG5vdCBhbGxvdyBlbXB0eSB1c2VybmFtZSxcbiAgICAvLyB3ZSBvbmx5IGluY2x1ZGUgcGFzc3dvcmQgaWYgdGhlIHVzZXJuYW1lIGlzIG5vdCBlbXB0eS5cbiAgICBpZiAocGFyc2VkVVJMLnBhc3N3b3JkKSB7XG4gICAgICAvLyBSZXN1bHQ6IDx1c2VybmFtZT46PHBhc3N3b3JkPlxuICAgICAgc29ja2V0VVJMQXV0aCA9IHNvY2tldFVSTEF1dGguY29uY2F0KFwiOlwiLCBwYXJzZWRVUkwucGFzc3dvcmQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEluIGNhc2UgdGhlIGhvc3QgaXMgYSByYXcgSVB2NiBhZGRyZXNzLCBpdCBjYW4gYmUgZW5jbG9zZWQgaW5cbiAgLy8gdGhlIGJyYWNrZXRzIGFzIHRoZSBicmFja2V0cyBhcmUgbmVlZGVkIGluIHRoZSBmaW5hbCBVUkwgc3RyaW5nLlxuICAvLyBOZWVkIHRvIHJlbW92ZSB0aG9zZSBhcyB1cmwuZm9ybWF0IGJsaW5kbHkgYWRkcyBpdHMgb3duIHNldCBvZiBicmFja2V0c1xuICAvLyBpZiB0aGUgaG9zdCBzdHJpbmcgY29udGFpbnMgY29sb25zLiBUaGF0IHdvdWxkIGxlYWQgdG8gbm9uLXdvcmtpbmdcbiAgLy8gZG91YmxlIGJyYWNrZXRzIChlLmcuIFtbOjpdXSkgaG9zdFxuICAvL1xuICAvLyBBbGwgb2YgdGhlc2Ugd2ViIHNvY2tldCB1cmwgcGFyYW1zIGFyZSBvcHRpb25hbGx5IHBhc3NlZCBpbiB0aHJvdWdoIHJlc291cmNlUXVlcnksXG4gIC8vIHNvIHdlIG5lZWQgdG8gZmFsbCBiYWNrIHRvIHRoZSBkZWZhdWx0IGlmIHRoZXkgYXJlIG5vdCBwcm92aWRlZFxuICB2YXIgc29ja2V0VVJMSG9zdG5hbWUgPSAoaG9zdG5hbWUgfHwgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcImxvY2FsaG9zdFwiKS5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvLCBcIiQxXCIpO1xuICB2YXIgc29ja2V0VVJMUG9ydCA9IHBhcnNlZFVSTC5wb3J0O1xuICBpZiAoIXNvY2tldFVSTFBvcnQgfHwgc29ja2V0VVJMUG9ydCA9PT0gXCIwXCIpIHtcbiAgICBzb2NrZXRVUkxQb3J0ID0gc2VsZi5sb2NhdGlvbi5wb3J0O1xuICB9XG5cbiAgLy8gSWYgcGF0aCBpcyBwcm92aWRlZCBpdCdsbCBiZSBwYXNzZWQgaW4gdmlhIHRoZSByZXNvdXJjZVF1ZXJ5IGFzIGFcbiAgLy8gcXVlcnkgcGFyYW0gc28gaXQgaGFzIHRvIGJlIHBhcnNlZCBvdXQgb2YgdGhlIHF1ZXJ5c3RyaW5nIGluIG9yZGVyIGZvciB0aGVcbiAgLy8gY2xpZW50IHRvIG9wZW4gdGhlIHNvY2tldCB0byB0aGUgY29ycmVjdCBsb2NhdGlvbi5cbiAgdmFyIHNvY2tldFVSTFBhdGhuYW1lID0gXCIvd3NcIjtcbiAgaWYgKHBhcnNlZFVSTC5wYXRobmFtZSAmJiAhcGFyc2VkVVJMLmZyb21DdXJyZW50U2NyaXB0KSB7XG4gICAgc29ja2V0VVJMUGF0aG5hbWUgPSBwYXJzZWRVUkwucGF0aG5hbWU7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdCh7XG4gICAgcHJvdG9jb2w6IHNvY2tldFVSTFByb3RvY29sLFxuICAgIGF1dGg6IHNvY2tldFVSTEF1dGgsXG4gICAgaG9zdG5hbWU6IHNvY2tldFVSTEhvc3RuYW1lLFxuICAgIHBvcnQ6IHNvY2tldFVSTFBvcnQsXG4gICAgcGF0aG5hbWU6IHNvY2tldFVSTFBhdGhuYW1lLFxuICAgIHNsYXNoZXM6IHRydWVcbiAgfSk7XG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTb2NrZXRVUkw7IiwiLyoqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0U291cmNlKCkge1xuICAvLyBgZG9jdW1lbnQuY3VycmVudFNjcmlwdGAgaXMgdGhlIG1vc3QgYWNjdXJhdGUgd2F5IHRvIGZpbmQgdGhlIGN1cnJlbnQgc2NyaXB0LFxuICAvLyBidXQgaXMgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuXG4gIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgdG8gZ2V0dGluZyBhbGwgc2NyaXB0cyBydW5uaW5nIGluIHRoZSBkb2N1bWVudC5cbiAgdmFyIHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQuc2NyaXB0cyB8fCBbXTtcbiAgdmFyIHNjcmlwdEVsZW1lbnRzV2l0aFNyYyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChzY3JpcHRFbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0pO1xuICBpZiAoc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgY3VycmVudFNjcmlwdCA9IHNjcmlwdEVsZW1lbnRzV2l0aFNyY1tzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9XG5cbiAgLy8gRmFpbCBhcyB0aGVyZSB3YXMgbm8gc2NyaXB0IHRvIHVzZS5cbiAgdGhyb3cgbmV3IEVycm9yKFwiW3dlYnBhY2stZGV2LXNlcnZlcl0gRmFpbGVkIHRvIGdldCBjdXJyZW50IHNjcmlwdCBzb3VyY2UuXCIpO1xufVxuZXhwb3J0IGRlZmF1bHQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZTsiLCJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi9tb2R1bGVzL2xvZ2dlci9pbmRleC5qc1wiO1xudmFyIG5hbWUgPSBcIndlYnBhY2stZGV2LXNlcnZlclwiO1xuLy8gZGVmYXVsdCBsZXZlbCBpcyBzZXQgb24gdGhlIGNsaWVudCBzaWRlLCBzbyBpdCBkb2VzIG5vdCBuZWVkXG4vLyB0byBiZSBzZXQgYnkgdGhlIENMSSBvciBBUElcbnZhciBkZWZhdWx0TGV2ZWwgPSBcImluZm9cIjtcblxuLy8gb3B0aW9ucyBuZXcgb3B0aW9ucywgbWVyZ2Ugd2l0aCBvbGQgb3B0aW9uc1xuLyoqXG4gKiBAcGFyYW0ge2ZhbHNlIHwgdHJ1ZSB8IFwibm9uZVwiIHwgXCJlcnJvclwiIHwgXCJ3YXJuXCIgfCBcImluZm9cIiB8IFwibG9nXCIgfCBcInZlcmJvc2VcIn0gbGV2ZWxcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBzZXRMb2dMZXZlbChsZXZlbCkge1xuICBsb2dnZXIuY29uZmlndXJlRGVmYXVsdExvZ2dlcih7XG4gICAgbGV2ZWw6IGxldmVsXG4gIH0pO1xufVxuc2V0TG9nTGV2ZWwoZGVmYXVsdExldmVsKTtcbnZhciBsb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKG5hbWUpO1xudmFyIGxvZ0VuYWJsZWRGZWF0dXJlcyA9IGZ1bmN0aW9uIGxvZ0VuYWJsZWRGZWF0dXJlcyhmZWF0dXJlcykge1xuICB2YXIgZW5hYmxlZEZlYXR1cmVzID0gT2JqZWN0LmtleXMoZmVhdHVyZXMpO1xuICBpZiAoIWZlYXR1cmVzIHx8IGVuYWJsZWRGZWF0dXJlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxvZ1N0cmluZyA9IFwiU2VydmVyIHN0YXJ0ZWQ6XCI7XG5cbiAgLy8gU2VydmVyIHN0YXJ0ZWQ6IEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgZW5hYmxlZCwgTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZCwgT3ZlcmxheSBkaXNhYmxlZC5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmFibGVkRmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gZW5hYmxlZEZlYXR1cmVzW2ldO1xuICAgIGxvZ1N0cmluZyArPSBcIiBcIi5jb25jYXQoa2V5LCBcIiBcIikuY29uY2F0KGZlYXR1cmVzW2tleV0gPyBcImVuYWJsZWRcIiA6IFwiZGlzYWJsZWRcIiwgXCIsXCIpO1xuICB9XG4gIC8vIHJlcGxhY2UgbGFzdCBjb21tYSB3aXRoIGEgcGVyaW9kXG4gIGxvZ1N0cmluZyA9IGxvZ1N0cmluZy5zbGljZSgwLCAtMSkuY29uY2F0KFwiLlwiKTtcbiAgbG9nLmluZm8obG9nU3RyaW5nKTtcbn07XG5leHBvcnQgeyBsb2csIGxvZ0VuYWJsZWRGZWF0dXJlcywgc2V0TG9nTGV2ZWwgfTsiLCJpbXBvcnQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSBmcm9tIFwiLi9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzXCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlUXVlcnlcbiAqIEByZXR1cm5zIHt7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfX1cbiAqL1xuZnVuY3Rpb24gcGFyc2VVUkwocmVzb3VyY2VRdWVyeSkge1xuICAvKiogQHR5cGUge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIH19ICovXG4gIHZhciBvcHRpb25zID0ge307XG4gIGlmICh0eXBlb2YgcmVzb3VyY2VRdWVyeSA9PT0gXCJzdHJpbmdcIiAmJiByZXNvdXJjZVF1ZXJ5ICE9PSBcIlwiKSB7XG4gICAgdmFyIHNlYXJjaFBhcmFtcyA9IHJlc291cmNlUXVlcnkuc2xpY2UoMSkuc3BsaXQoXCImXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoUGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFpciA9IHNlYXJjaFBhcmFtc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICBvcHRpb25zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBFbHNlLCBnZXQgdGhlIHVybCBmcm9tIHRoZSA8c2NyaXB0PiB0aGlzIGZpbGUgd2FzIGNhbGxlZCB3aXRoLlxuICAgIHZhciBzY3JpcHRTb3VyY2UgPSBnZXRDdXJyZW50U2NyaXB0U291cmNlKCk7XG4gICAgdmFyIHNjcmlwdFNvdXJjZVVSTDtcbiAgICB0cnkge1xuICAgICAgLy8gVGhlIHBsYWNlaG9sZGVyIGBiYXNlVVJMYCB3aXRoIGB3aW5kb3cubG9jYXRpb24uaHJlZmAsXG4gICAgICAvLyBpcyB0byBhbGxvdyBwYXJzaW5nIG9mIHBhdGgtcmVsYXRpdmUgb3IgcHJvdG9jb2wtcmVsYXRpdmUgVVJMcyxcbiAgICAgIC8vIGFuZCB3aWxsIGhhdmUgbm8gZWZmZWN0IGlmIGBzY3JpcHRTb3VyY2VgIGlzIGEgZnVsbHkgdmFsaWQgVVJMLlxuICAgICAgc2NyaXB0U291cmNlVVJMID0gbmV3IFVSTChzY3JpcHRTb3VyY2UsIHNlbGYubG9jYXRpb24uaHJlZik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFVSTCBwYXJzaW5nIGZhaWxlZCwgZG8gbm90aGluZy5cbiAgICAgIC8vIFdlIHdpbGwgc3RpbGwgcHJvY2VlZCB0byBzZWUgaWYgd2UgY2FuIHJlY292ZXIgdXNpbmcgYHJlc291cmNlUXVlcnlgXG4gICAgfVxuICAgIGlmIChzY3JpcHRTb3VyY2VVUkwpIHtcbiAgICAgIG9wdGlvbnMgPSBzY3JpcHRTb3VyY2VVUkw7XG4gICAgICBvcHRpb25zLmZyb21DdXJyZW50U2NyaXB0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5leHBvcnQgZGVmYXVsdCBwYXJzZVVSTDsiLCJpbXBvcnQgaG90RW1pdHRlciBmcm9tIFwid2VicGFjay9ob3QvZW1pdHRlci5qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vbG9nLmpzXCI7XG5cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuT3B0aW9uc30gT3B0aW9uc1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9pbmRleFwiKS5TdGF0dXN9IFN0YXR1c1xuXG4vKipcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHBhcmFtIHtTdGF0dXN9IHN0YXR1c1xuICovXG5mdW5jdGlvbiByZWxvYWRBcHAoX3JlZiwgc3RhdHVzKSB7XG4gIHZhciBob3QgPSBfcmVmLmhvdCxcbiAgICBsaXZlUmVsb2FkID0gX3JlZi5saXZlUmVsb2FkO1xuICBpZiAoc3RhdHVzLmlzVW5sb2FkaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjdXJyZW50SGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaCxcbiAgICBwcmV2aW91c0hhc2ggPSBzdGF0dXMucHJldmlvdXNIYXNoO1xuICB2YXIgaXNJbml0aWFsID0gY3VycmVudEhhc2guaW5kZXhPZiggLyoqIEB0eXBlIHtzdHJpbmd9ICovcHJldmlvdXNIYXNoKSA+PSAwO1xuICBpZiAoaXNJbml0aWFsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7V2luZG93fSByb290V2luZG93XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbElkXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWxvYWRpbmcuLi5cIik7XG4gICAgcm9vdFdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICB2YXIgc2VhcmNoID0gc2VsZi5sb2NhdGlvbi5zZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFsbG93VG9Ib3QgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1ob3Q9ZmFsc2VcIikgPT09IC0xO1xuICB2YXIgYWxsb3dUb0xpdmVSZWxvYWQgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1saXZlLXJlbG9hZD1mYWxzZVwiKSA9PT0gLTE7XG4gIGlmIChob3QgJiYgYWxsb3dUb0hvdCkge1xuICAgIGxvZy5pbmZvKFwiQXBwIGhvdCB1cGRhdGUuLi5cIik7XG4gICAgaG90RW1pdHRlci5lbWl0KFwid2VicGFja0hvdFVwZGF0ZVwiLCBzdGF0dXMuY3VycmVudEhhc2gpO1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLndpbmRvdykge1xuICAgICAgLy8gYnJvYWRjYXN0IHVwZGF0ZSB0byB3aW5kb3dcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoXCJ3ZWJwYWNrSG90VXBkYXRlXCIuY29uY2F0KHN0YXR1cy5jdXJyZW50SGFzaCksIFwiKlwiKTtcbiAgICB9XG4gIH1cbiAgLy8gYWxsb3cgcmVmcmVzaGluZyB0aGUgcGFnZSBvbmx5IGlmIGxpdmVSZWxvYWQgaXNuJ3QgZGlzYWJsZWRcbiAgZWxzZSBpZiAobGl2ZVJlbG9hZCAmJiBhbGxvd1RvTGl2ZVJlbG9hZCkge1xuICAgIHZhciByb290V2luZG93ID0gc2VsZjtcblxuICAgIC8vIHVzZSBwYXJlbnQgd2luZG93IGZvciByZWxvYWQgKGluIGNhc2Ugd2UncmUgaW4gYW4gaWZyYW1lIHdpdGggbm8gdmFsaWQgc3JjKVxuICAgIHZhciBpbnRlcnZhbElkID0gc2VsZi5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocm9vdFdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gXCJhYm91dDpcIikge1xuICAgICAgICAvLyByZWxvYWQgaW1tZWRpYXRlbHkgaWYgcHJvdG9jb2wgaXMgdmFsaWRcbiAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290V2luZG93ID0gcm9vdFdpbmRvdy5wYXJlbnQ7XG4gICAgICAgIGlmIChyb290V2luZG93LnBhcmVudCA9PT0gcm9vdFdpbmRvdykge1xuICAgICAgICAgIC8vIGlmIHBhcmVudCBlcXVhbHMgY3VycmVudCB3aW5kb3cgd2UndmUgcmVhY2hlZCB0aGUgcm9vdCB3aGljaCB3b3VsZCBjb250aW51ZSBmb3JldmVyLCBzbyB0cmlnZ2VyIGEgcmVsb2FkIGFueXdheXNcbiAgICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCByZWxvYWRBcHA7IiwiLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBXb3JrZXJHbG9iYWxTY29wZSAqL1xuXG4vLyBTZW5kIG1lc3NhZ2VzIHRvIHRoZSBvdXRzaWRlLCBzbyBwbHVnaW5zIGNhbiBjb25zdW1lIGl0LlxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHthbnl9IFtkYXRhXVxuICovXG5mdW5jdGlvbiBzZW5kTXNnKHR5cGUsIGRhdGEpIHtcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgPT09IFwidW5kZWZpbmVkXCIgfHwgIShzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpKSkge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJ3ZWJwYWNrXCIuY29uY2F0KHR5cGUpLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgc2VuZE1zZzsiLCJ2YXIgYW5zaVJlZ2V4ID0gbmV3IFJlZ0V4cChbXCJbXFxcXHUwMDFCXFxcXHUwMDlCXVtbXFxcXF0oKSM7P10qKD86KD86KD86KD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKykqfFthLXpBLVpcXFxcZF0rKD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKikqKT9cXFxcdTAwMDcpXCIsIFwiKD86KD86XFxcXGR7MSw0fSg/OjtcXFxcZHswLDR9KSopP1tcXFxcZEEtUFItVFpjZi1ucS11eT0+PH5dKSlcIl0uam9pbihcInxcIiksIFwiZ1wiKTtcblxuLyoqXG4gKlxuICogU3RyaXAgW0FOU0kgZXNjYXBlIGNvZGVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlKSBmcm9tIGEgc3RyaW5nLlxuICogQWRhcHRlZCBmcm9tIGNvZGUgb3JpZ2luYWxseSByZWxlYXNlZCBieSBTaW5kcmUgU29yaHVzXG4gKiBMaWNlbnNlZCB0aGUgTUlUIExpY2Vuc2VcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmlwQW5zaShzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBgc3RyaW5nYCwgZ290IGBcIi5jb25jYXQodHlwZW9mIHN0cmluZywgXCJgXCIpKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYW5zaVJlZ2V4LCBcIlwiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IHN0cmlwQW5zaTsiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLyogZ2xvYmFscyBfX3dlYnBhY2tfaGFzaF9fICovXG5pZiAobW9kdWxlLmhvdCkge1xuXHQvKiogQHR5cGUge3VuZGVmaW5lZHxzdHJpbmd9ICovXG5cdHZhciBsYXN0SGFzaDtcblx0dmFyIHVwVG9EYXRlID0gZnVuY3Rpb24gdXBUb0RhdGUoKSB7XG5cdFx0cmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAobGFzdEhhc2gpLmluZGV4T2YoX193ZWJwYWNrX2hhc2hfXykgPj0gMDtcblx0fTtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblx0dmFyIGNoZWNrID0gZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0bW9kdWxlLmhvdFxuXHRcdFx0LmNoZWNrKHRydWUpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0aWYgKCF1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSBDYW5ub3QgZmluZCB1cGRhdGUuIFwiICtcblx0XHRcdFx0XHRcdFx0KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiXG5cdFx0XHRcdFx0XHRcdFx0OiBcIlBsZWFzZSByZWxvYWQgbWFudWFsbHkhXCIpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gKFByb2JhYmx5IGJlY2F1c2Ugb2YgcmVzdGFydGluZyB0aGUgd2VicGFjay1kZXYtc2VydmVyKVwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXVwVG9EYXRlKCkpIHtcblx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVxdWlyZShcIi4vbG9nLWFwcGx5LXJlc3VsdFwiKSh1cGRhdGVkTW9kdWxlcywgdXBkYXRlZE1vZHVsZXMpO1xuXG5cdFx0XHRcdGlmICh1cFRvRGF0ZSgpKSB7XG5cdFx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIEFwcCBpcyB1cCB0byBkYXRlLlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSBtb2R1bGUuaG90LnN0YXR1cygpO1xuXHRcdFx0XHRpZiAoW1wiYWJvcnRcIiwgXCJmYWlsXCJdLmluZGV4T2Yoc3RhdHVzKSA+PSAwKSB7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIENhbm5vdCBhcHBseSB1cGRhdGUuIFwiICtcblx0XHRcdFx0XHRcdFx0KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiXG5cdFx0XHRcdFx0XHRcdFx0OiBcIlBsZWFzZSByZWxvYWQgbWFudWFsbHkhXCIpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFVwZGF0ZSBmYWlsZWQ6IFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fTtcblx0dmFyIGhvdEVtaXR0ZXIgPSByZXF1aXJlKFwiLi9lbWl0dGVyXCIpO1xuXHRob3RFbWl0dGVyLm9uKFwid2VicGFja0hvdFVwZGF0ZVwiLCBmdW5jdGlvbiAoY3VycmVudEhhc2gpIHtcblx0XHRsYXN0SGFzaCA9IGN1cnJlbnRIYXNoO1xuXHRcdGlmICghdXBUb0RhdGUoKSAmJiBtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImlkbGVcIikge1xuXHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIENoZWNraW5nIGZvciB1cGRhdGVzIG9uIHRoZSBzZXJ2ZXIuLi5cIik7XG5cdFx0XHRjaGVjaygpO1xuXHRcdH1cblx0fSk7XG5cdGxvZyhcImluZm9cIiwgXCJbSE1SXSBXYWl0aW5nIGZvciB1cGRhdGUgc2lnbmFsIGZyb20gV0RTLi4uXCIpO1xufSBlbHNlIHtcblx0dGhyb3cgbmV3IEVycm9yKFwiW0hNUl0gSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBkaXNhYmxlZC5cIik7XG59XG4iLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbm1vZHVsZS5leHBvcnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuLyoqXG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudW1iZXIpW119IHVwZGF0ZWRNb2R1bGVzIHVwZGF0ZWQgbW9kdWxlc1xuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKVtdIHwgbnVsbH0gcmVuZXdlZE1vZHVsZXMgcmVuZXdlZCBtb2R1bGVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVwZGF0ZWRNb2R1bGVzLCByZW5ld2VkTW9kdWxlcykge1xuXHR2YXIgdW5hY2NlcHRlZE1vZHVsZXMgPSB1cGRhdGVkTW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0cmV0dXJuIHJlbmV3ZWRNb2R1bGVzICYmIHJlbmV3ZWRNb2R1bGVzLmluZGV4T2YobW9kdWxlSWQpIDwgMDtcblx0fSk7XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cblx0aWYgKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcblx0XHRsb2coXG5cdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiAoVGhleSB3b3VsZCBuZWVkIGEgZnVsbCByZWxvYWQhKVwiXG5cdFx0KTtcblx0XHR1bmFjY2VwdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gTm90aGluZyBob3QgdXBkYXRlZC5cIik7XG5cdH0gZWxzZSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZWQgbW9kdWxlczpcIik7XG5cdFx0cmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdGlmICh0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIgJiYgbW9kdWxlSWQuaW5kZXhPZihcIiFcIikgIT09IC0xKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IG1vZHVsZUlkLnNwbGl0KFwiIVwiKTtcblx0XHRcdFx0bG9nLmdyb3VwQ29sbGFwc2VkKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgcGFydHMucG9wKCkpO1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHRcdGxvZy5ncm91cEVuZChcImluZm9cIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dmFyIG51bWJlcklkcyA9IHJlbmV3ZWRNb2R1bGVzLmV2ZXJ5KGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJudW1iZXJcIjtcblx0XHR9KTtcblx0XHRpZiAobnVtYmVySWRzKVxuXHRcdFx0bG9nKFxuXHRcdFx0XHRcImluZm9cIixcblx0XHRcdFx0J1tITVJdIENvbnNpZGVyIHVzaW5nIHRoZSBvcHRpbWl6YXRpb24ubW9kdWxlSWRzOiBcIm5hbWVkXCIgZm9yIG1vZHVsZSBuYW1lcy4nXG5cdFx0XHQpO1xuXHR9XG59O1xuIiwiLyoqIEB0eXBlZGVmIHtcImluZm9cIiB8IFwid2FybmluZ1wiIHwgXCJlcnJvclwifSBMb2dMZXZlbCAqL1xuXG4vKiogQHR5cGUge0xvZ0xldmVsfSAqL1xudmFyIGxvZ0xldmVsID0gXCJpbmZvXCI7XG5cbmZ1bmN0aW9uIGR1bW15KCkge31cblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlLCBpZiBzaG91bGQgbG9nXG4gKi9cbmZ1bmN0aW9uIHNob3VsZExvZyhsZXZlbCkge1xuXHR2YXIgc2hvdWxkTG9nID1cblx0XHQobG9nTGV2ZWwgPT09IFwiaW5mb1wiICYmIGxldmVsID09PSBcImluZm9cIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJlcnJvclwiKTtcblx0cmV0dXJuIHNob3VsZExvZztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyhtc2c/OiBzdHJpbmcpID0+IHZvaWR9IGxvZ0ZuIGxvZyBmdW5jdGlvblxuICogQHJldHVybnMgeyhsZXZlbDogTG9nTGV2ZWwsIG1zZz86IHN0cmluZykgPT4gdm9pZH0gZnVuY3Rpb24gdGhhdCBsb2dzIHdoZW4gbG9nIGxldmVsIGlzIHN1ZmZpY2llbnRcbiAqL1xuZnVuY3Rpb24gbG9nR3JvdXAobG9nRm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdFx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRcdGxvZ0ZuKG1zZyk7XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TG9nTGV2ZWx9IGxldmVsIGxvZyBsZXZlbFxuICogQHBhcmFtIHtzdHJpbmd8RXJyb3J9IG1zZyBtZXNzYWdlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRpZiAobGV2ZWwgPT09IFwiaW5mb1wiKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwid2FybmluZ1wiKSB7XG5cdFx0XHRjb25zb2xlLndhcm4obXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcImVycm9yXCIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqL1xubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcblx0bG9nTGV2ZWwgPSBsZXZlbDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyIGVycm9yXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmb3JtYXR0ZWQgZXJyb3JcbiAqL1xubW9kdWxlLmV4cG9ydHMuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdHZhciBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG5cdHZhciBzdGFjayA9IGVyci5zdGFjaztcblx0aWYgKCFzdGFjaykge1xuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHN0YWNrLmluZGV4T2YobWVzc2FnZSkgPCAwKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHN0YWNrO1xuXHR9XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcxMTM3MzgxNjYyNFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJwdWJsaWNQYXRoXCI6XCJcIixcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7IGhhbmRsZXIoZXhlY09wdGlvbnMpOyB9KTtcblx0bW9kdWxlID0gZXhlY09wdGlvbnMubW9kdWxlO1xuXHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGV4ZWN1dGlvbiBpbnRlcmNlcHRvclxuX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gW107XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5odSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIHVuZGVmaW5lZDtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGID0gKCkgPT4gKFwibWFpbi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjcxZjNlNmFiNmQ1MzIzMmYzMTI1XCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwiYm9pbGVycGxhdGU6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgY3VycmVudE1vZHVsZURhdGEgPSB7fTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jO1xuXG4vLyBtb2R1bGUgYW5kIHJlcXVpcmUgY3JlYXRpb25cbnZhciBjdXJyZW50Q2hpbGRNb2R1bGU7XG52YXIgY3VycmVudFBhcmVudHMgPSBbXTtcblxuLy8gc3RhdHVzXG52YXIgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzID0gW107XG52YXIgY3VycmVudFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4vLyB3aGlsZSBkb3dubG9hZGluZ1xudmFyIGJsb2NraW5nUHJvbWlzZXMgPSAwO1xudmFyIGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nID0gW107XG5cbi8vIFRoZSB1cGRhdGUgaW5mb1xudmFyIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzO1xudmFyIHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJEID0gY3VycmVudE1vZHVsZURhdGE7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaS5wdXNoKGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHZhciBtb2R1bGUgPSBvcHRpb25zLm1vZHVsZTtcblx0dmFyIHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKG9wdGlvbnMucmVxdWlyZSwgb3B0aW9ucy5pZCk7XG5cdG1vZHVsZS5ob3QgPSBjcmVhdGVNb2R1bGVIb3RPYmplY3Qob3B0aW9ucy5pZCwgbW9kdWxlKTtcblx0bW9kdWxlLnBhcmVudHMgPSBjdXJyZW50UGFyZW50cztcblx0bW9kdWxlLmNoaWxkcmVuID0gW107XG5cdGN1cnJlbnRQYXJlbnRzID0gW107XG5cdG9wdGlvbnMucmVxdWlyZSA9IHJlcXVpcmU7XG59KTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkgPSB7fTtcblxuZnVuY3Rpb24gY3JlYXRlUmVxdWlyZShyZXF1aXJlLCBtb2R1bGVJZCkge1xuXHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblx0aWYgKCFtZSkgcmV0dXJuIHJlcXVpcmU7XG5cdHZhciBmbiA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG5cdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcblx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG5cdFx0XHRcdHZhciBwYXJlbnRzID0gaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzO1xuXHRcdFx0XHRpZiAocGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRwYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG5cdFx0XHRcdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG5cdFx0XHR9XG5cdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcblx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG5cdFx0XHRcdFx0cmVxdWVzdCArXG5cdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcblx0XHRcdFx0XHRtb2R1bGVJZFxuXHRcdFx0KTtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW107XG5cdFx0fVxuXHRcdHJldHVybiByZXF1aXJlKHJlcXVlc3QpO1xuXHR9O1xuXHR2YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gcmVxdWlyZVtuYW1lXTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRyZXF1aXJlW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblx0Zm9yICh2YXIgbmFtZSBpbiByZXF1aXJlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXF1aXJlLCBuYW1lKSAmJiBuYW1lICE9PSBcImVcIikge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSkpO1xuXHRcdH1cblx0fVxuXHRmbi5lID0gZnVuY3Rpb24gKGNodW5rSWQsIGZldGNoUHJpb3JpdHkpIHtcblx0XHRyZXR1cm4gdHJhY2tCbG9ja2luZ1Byb21pc2UocmVxdWlyZS5lKGNodW5rSWQsIGZldGNoUHJpb3JpdHkpKTtcblx0fTtcblx0cmV0dXJuIGZuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNb2R1bGVIb3RPYmplY3QobW9kdWxlSWQsIG1lKSB7XG5cdHZhciBfbWFpbiA9IGN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQ7XG5cdHZhciBob3QgPSB7XG5cdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuXHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG5cdFx0X2FjY2VwdGVkRXJyb3JIYW5kbGVyczoge30sXG5cdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcblx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcblx0XHRfc2VsZkludmFsaWRhdGVkOiBmYWxzZSxcblx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcblx0XHRfbWFpbjogX21haW4sXG5cdFx0X3JlcXVpcmVTZWxmOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjdXJyZW50UGFyZW50cyA9IG1lLnBhcmVudHMuc2xpY2UoKTtcblx0XHRcdGN1cnJlbnRDaGlsZE1vZHVsZSA9IF9tYWluID8gdW5kZWZpbmVkIDogbW9kdWxlSWQ7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcblx0XHR9LFxuXG5cdFx0Ly8gTW9kdWxlIEFQSVxuXHRcdGFjdGl2ZTogdHJ1ZSxcblx0XHRhY2NlcHQ6IGZ1bmN0aW9uIChkZXAsIGNhbGxiYWNrLCBlcnJvckhhbmRsZXIpIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIgJiYgZGVwICE9PSBudWxsKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG5cdFx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwW2ldXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG5cdFx0XHRcdGhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcF0gPSBlcnJvckhhbmRsZXI7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkZWNsaW5lOiBmdW5jdGlvbiAoZGVwKSB7XG5cdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIgJiYgZGVwICE9PSBudWxsKVxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcblx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuXHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuXHRcdH0sXG5cdFx0ZGlzcG9zZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9LFxuXHRcdGludmFsaWRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX3NlbGZJbnZhbGlkYXRlZCA9IHRydWU7XG5cdFx0XHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRcdFx0Y2FzZSBcImlkbGVcIjpcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNldFN0YXR1cyhcInJlYWR5XCIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInByZXBhcmVcIjpcblx0XHRcdFx0Y2FzZSBcImNoZWNrXCI6XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBseVwiOlxuXHRcdFx0XHRcdChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSBxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgfHwgW10pLnB1c2goXG5cdFx0XHRcdFx0XHRtb2R1bGVJZFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gaWdub3JlIHJlcXVlc3RzIGluIGVycm9yIHN0YXRlc1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuXHRcdGNoZWNrOiBob3RDaGVjayxcblx0XHRhcHBseTogaG90QXBwbHksXG5cdFx0c3RhdHVzOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0aWYgKCFsKSByZXR1cm4gY3VycmVudFN0YXR1cztcblx0XHRcdHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuXHRcdH0sXG5cdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24gKGwpIHtcblx0XHRcdHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuXHRcdH0sXG5cdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24gKGwpIHtcblx0XHRcdHZhciBpZHggPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcblx0XHRcdGlmIChpZHggPj0gMCkgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cblx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcblx0XHRkYXRhOiBjdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cblx0fTtcblx0Y3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gaG90O1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0dXMobmV3U3RhdHVzKSB7XG5cdGN1cnJlbnRTdGF0dXMgPSBuZXdTdGF0dXM7XG5cdHZhciByZXN1bHRzID0gW107XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG5cdFx0cmVzdWx0c1tpXSA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdHMpLnRoZW4oZnVuY3Rpb24gKCkge30pO1xufVxuXG5mdW5jdGlvbiB1bmJsb2NrKCkge1xuXHRpZiAoLS1ibG9ja2luZ1Byb21pc2VzID09PSAwKSB7XG5cdFx0c2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdFx0XHR2YXIgbGlzdCA9IGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nO1xuXHRcdFx0XHRibG9ja2luZ1Byb21pc2VzV2FpdGluZyA9IFtdO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsaXN0W2ldKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiB0cmFja0Jsb2NraW5nUHJvbWlzZShwcm9taXNlKSB7XG5cdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0c2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcblx0XHQvKiBmYWxsdGhyb3VnaCAqL1xuXHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRibG9ja2luZ1Byb21pc2VzKys7XG5cdFx0XHRwcm9taXNlLnRoZW4odW5ibG9jaywgdW5ibG9jayk7XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pIHtcblx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHJldHVybiBmbigpO1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0XHRibG9ja2luZ1Byb21pc2VzV2FpdGluZy5wdXNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlc29sdmUoZm4oKSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBob3RDaGVjayhhcHBseU9uVXBkYXRlKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcImlkbGVcIikge1xuXHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuXHR9XG5cdHJldHVybiBzZXRTdGF0dXMoXCJjaGVja1wiKVxuXHRcdC50aGVuKF9fd2VicGFja19yZXF1aXJlX18uaG1yTSlcblx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlKSB7XG5cdFx0XHRpZiAoIXVwZGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIikudGhlbihcblx0XHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJwcmVwYXJlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgdXBkYXRlZE1vZHVsZXMgPSBbXTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDKS5yZWR1Y2UoZnVuY3Rpb24gKFxuXHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRrZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yQ1trZXldKFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUuYyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlLnIsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5tLFxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZWRNb2R1bGVzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2VzO1xuXHRcdFx0XHRcdH0sIFtdKVxuXHRcdFx0XHQpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXBwbHlPblVwZGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShhcHBseU9uVXBkYXRlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdXBkYXRlZE1vZHVsZXM7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xufVxuXG5mdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcInJlYWR5XCIpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzIChzdGF0ZTogXCIgK1xuXHRcdFx0XHRcdGN1cnJlbnRTdGF0dXMgK1xuXHRcdFx0XHRcdFwiKVwiXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0YXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuXHR2YXIgcmVzdWx0cyA9IGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLm1hcChmdW5jdGlvbiAoaGFuZGxlcikge1xuXHRcdHJldHVybiBoYW5kbGVyKG9wdGlvbnMpO1xuXHR9KTtcblx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSB1bmRlZmluZWQ7XG5cblx0dmFyIGVycm9ycyA9IHJlc3VsdHNcblx0XHQubWFwKGZ1bmN0aW9uIChyKSB7XG5cdFx0XHRyZXR1cm4gci5lcnJvcjtcblx0XHR9KVxuXHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0aWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImFib3J0XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG5cdHZhciBkaXNwb3NlUHJvbWlzZSA9IHNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG5cblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmRpc3Bvc2UpIHJlc3VsdC5kaXNwb3NlKCk7XG5cdH0pO1xuXG5cdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2Vcblx0dmFyIGFwcGx5UHJvbWlzZSA9IHNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG5cdHZhciBlcnJvcjtcblx0dmFyIHJlcG9ydEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuXHR9O1xuXG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmFwcGx5KSB7XG5cdFx0XHR2YXIgbW9kdWxlcyA9IHJlc3VsdC5hcHBseShyZXBvcnRFcnJvcik7XG5cdFx0XHRpZiAobW9kdWxlcykge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChtb2R1bGVzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKFtkaXNwb3NlUHJvbWlzZSwgYXBwbHlQcm9taXNlXSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcblx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJmYWlsXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGxpc3QpIHtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGxpc3Q7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiaWRsZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcblx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdGlmICghY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMpIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG52YXIgY3JlYXRlU3R5bGVzaGVldCA9IChjaHVua0lkLCBmdWxsaHJlZiwgb2xkVGFnLCByZXNvbHZlLCByZWplY3QpID0+IHtcblx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0bGlua1RhZy5ub25jZSA9IF9fd2VicGFja19yZXF1aXJlX18ubmM7XG5cdH1cblx0dmFyIG9uTGlua0NvbXBsZXRlID0gKGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzLlxuXHRcdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gbnVsbDtcblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnKSB7XG5cdFx0XHRyZXNvbHZlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiBldmVudC50eXBlO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyBlcnJvclR5cGUgKyBcIjogXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5uYW1lID0gXCJDaHVua0xvYWRFcnJvclwiO1xuXHRcdFx0ZXJyLmNvZGUgPSBcIkNTU19DSFVOS19MT0FEX0ZBSUxFRFwiO1xuXHRcdFx0ZXJyLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRlcnIucmVxdWVzdCA9IHJlYWxIcmVmO1xuXHRcdFx0aWYgKGxpbmtUYWcucGFyZW50Tm9kZSkgbGlua1RhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpbmtUYWcpXG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9XG5cdH1cblx0bGlua1RhZy5vbmVycm9yID0gbGlua1RhZy5vbmxvYWQgPSBvbkxpbmtDb21wbGV0ZTtcblx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG5cblxuXHRpZiAob2xkVGFnKSB7XG5cdFx0b2xkVGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpbmtUYWcsIG9sZFRhZy5uZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcblx0fVxuXHRyZXR1cm4gbGlua1RhZztcbn07XG52YXIgZmluZFN0eWxlc2hlZXQgPSAoaHJlZiwgZnVsbGhyZWYpID0+IHtcblx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHRhZztcblx0fVxuXHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcblx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiB0YWc7XG5cdH1cbn07XG52YXIgbG9hZFN0eWxlc2hlZXQgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdGlmKGZpbmRTdHlsZXNoZWV0KGhyZWYsIGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcblx0XHRjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBudWxsLCByZXNvbHZlLCByZWplY3QpO1xuXHR9KTtcbn1cbi8vIG5vIGNodW5rIGxvYWRpbmdcblxudmFyIG9sZFRhZ3MgPSBbXTtcbnZhciBuZXdUYWdzID0gW107XG52YXIgYXBwbHlIYW5kbGVyID0gKG9wdGlvbnMpID0+IHtcblx0cmV0dXJuIHsgZGlzcG9zZTogKCkgPT4ge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvbGRUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgb2xkVGFnID0gb2xkVGFnc1tpXTtcblx0XHRcdGlmKG9sZFRhZy5wYXJlbnROb2RlKSBvbGRUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRUYWcpO1xuXHRcdH1cblx0XHRvbGRUYWdzLmxlbmd0aCA9IDA7XG5cdH0sIGFwcGx5OiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG5ld1RhZ3MubGVuZ3RoOyBpKyspIG5ld1RhZ3NbaV0ucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdFx0bmV3VGFncy5sZW5ndGggPSAwO1xuXHR9IH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMubWluaUNzcyA9IChjaHVua0lkcywgcmVtb3ZlZENodW5rcywgcmVtb3ZlZE1vZHVsZXMsIHByb21pc2VzLCBhcHBseUhhbmRsZXJzLCB1cGRhdGVkTW9kdWxlc0xpc3QpID0+IHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGNodW5rSWRzLmZvckVhY2goKGNodW5rSWQpID0+IHtcblx0XHR2YXIgaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YoY2h1bmtJZCk7XG5cdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcblx0XHR2YXIgb2xkVGFnID0gZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpO1xuXHRcdGlmKCFvbGRUYWcpIHJldHVybjtcblx0XHRwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB0YWcgPSBjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBvbGRUYWcsICgpID0+IHtcblx0XHRcdFx0dGFnLmFzID0gXCJzdHlsZVwiO1xuXHRcdFx0XHR0YWcucmVsID0gXCJwcmVsb2FkXCI7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0sIHJlamVjdCk7XG5cdFx0XHRvbGRUYWdzLnB1c2gob2xkVGFnKTtcblx0XHRcdG5ld1RhZ3MucHVzaCh0YWcpO1xuXHRcdH0pKTtcblx0fSk7XG59IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbnZhciBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0O1xudmFyIHdhaXRpbmdVcGRhdGVSZXNvbHZlcyA9IHt9O1xuZnVuY3Rpb24gbG9hZFVwZGF0ZUNodW5rKGNodW5rSWQsIHVwZGF0ZWRNb2R1bGVzTGlzdCkge1xuXHRjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0ID0gdXBkYXRlZE1vZHVsZXNMaXN0O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHJlc29sdmU7XG5cdFx0Ly8gc3RhcnQgdXBkYXRlIGNodW5rIGxvYWRpbmdcblx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5odShjaHVua0lkKTtcblx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0XHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZFxuXHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgaG90IHVwZGF0ZSBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCk7XG5cdH0pO1xufVxuXG5zZWxmW1wid2VicGFja0hvdFVwZGF0ZWJvaWxlcnBsYXRlXCJdID0gKGNodW5rSWQsIG1vcmVNb2R1bGVzLCBydW50aW1lKSA9PiB7XG5cdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHRpZihjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0KSBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBjdXJyZW50VXBkYXRlUnVudGltZS5wdXNoKHJ1bnRpbWUpO1xuXHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0oKTtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdH1cbn07XG5cbnZhciBjdXJyZW50VXBkYXRlQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGU7XG52YXIgY3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZVJ1bnRpbWU7XG5mdW5jdGlvbiBhcHBseUhhbmRsZXIob3B0aW9ucykge1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSBkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0gdW5kZWZpbmVkO1xuXHRmdW5jdGlvbiBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHModXBkYXRlTW9kdWxlSWQpIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGFpbjogW2lkXSxcblx0XHRcdFx0aWQ6IGlkXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG5cdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG5cdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdGlmIChcblx0XHRcdFx0IW1vZHVsZSB8fFxuXHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG5cdFx0XHQpXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcblx0XHRcdFx0dmFyIHBhcmVudCA9IF9fd2VicGFja19yZXF1aXJlX18uY1twYXJlbnRJZF07XG5cdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcblx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuXHRcdFx0XHRxdWV1ZS5wdXNoKHtcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuXHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuXHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG5cdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuXHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuXHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG5cdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cblx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZShtb2R1bGUpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIG1vZHVsZS5pZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuXHRcdCk7XG5cdH07XG5cblx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gY3VycmVudFVwZGF0ZSkge1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0XHR2YXIgbmV3TW9kdWxlRmFjdG9yeSA9IGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdO1xuXHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmIChuZXdNb2R1bGVGYWN0b3J5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyhtb2R1bGVJZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cblx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG5cdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG5cdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcblx0XHRcdH1cblx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXJyb3I6IGFib3J0RXJyb3Jcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChkb0FwcGx5KSB7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gbmV3TW9kdWxlRmFjdG9yeTtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG5cdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGN1cnJlbnRVcGRhdGUgPSB1bmRlZmluZWQ7XG5cblx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuXHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG5cdGZvciAodmFyIGogPSAwOyBqIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbal07XG5cdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRpZiAoXG5cdFx0XHRtb2R1bGUgJiZcblx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgfHwgbW9kdWxlLmhvdC5fbWFpbikgJiZcblx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcblx0XHRcdGFwcGxpZWRVcGRhdGVbb3V0ZGF0ZWRNb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuXHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcblx0XHRcdCFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWRcblx0XHQpIHtcblx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0bW9kdWxlOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRyZXF1aXJlOiBtb2R1bGUuaG90Ll9yZXF1aXJlU2VsZixcblx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcblxuXHRyZXR1cm4ge1xuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdH0pO1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHZhciBpZHg7XG5cdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdHZhciBkYXRhID0ge307XG5cblx0XHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG5cdFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRkaXNwb3NlSGFuZGxlcnNbal0uY2FsbChudWxsLCBkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckRbbW9kdWxlSWRdID0gZGF0YTtcblxuXHRcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuXHRcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuXHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuXHRcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG5cdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuXHRcdFx0dmFyIGRlcGVuZGVuY3k7XG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhcHBseTogZnVuY3Rpb24gKHJlcG9ydEVycm9yKSB7XG5cdFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcblx0XHRcdGZvciAodmFyIHVwZGF0ZU1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhhcHBsaWVkVXBkYXRlLCB1cGRhdGVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bdXBkYXRlTW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVt1cGRhdGVNb2R1bGVJZF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcnVuIG5ldyBydW50aW1lIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFVwZGF0ZVJ1bnRpbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWVbaV0oX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0dmFyIGFjY2VwdENhbGxiYWNrID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoYWNjZXB0Q2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoYWNjZXB0Q2FsbGJhY2spICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goYWNjZXB0Q2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnMucHVzaChlcnJvckhhbmRsZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcy5wdXNoKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGNhbGxiYWNrcy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrc1trXS5jYWxsKG51bGwsIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBlcnJvckhhbmRsZXJzW2tdID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnNba10oZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba11cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgbyA9IDA7IG8gPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBvKyspIHtcblx0XHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbb107XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGl0ZW0ucmVxdWlyZShtb2R1bGVJZCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZTogX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH1cblx0fTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1ySS5qc29ucCA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgYXBwbHlIYW5kbGVycykge1xuXHRpZiAoIWN1cnJlbnRVcGRhdGUpIHtcblx0XHRjdXJyZW50VXBkYXRlID0ge307XG5cdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IFtdO1xuXHRcdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHR9XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gX193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXTtcblx0fVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5qc29ucCA9IGZ1bmN0aW9uIChcblx0Y2h1bmtJZHMsXG5cdHJlbW92ZWRDaHVua3MsXG5cdHJlbW92ZWRNb2R1bGVzLFxuXHRwcm9taXNlcyxcblx0YXBwbHlIYW5kbGVycyxcblx0dXBkYXRlZE1vZHVsZXNMaXN0XG4pIHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB7fTtcblx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSByZW1vdmVkQ2h1bmtzO1xuXHRjdXJyZW50VXBkYXRlID0gcmVtb3ZlZE1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHRcdG9ialtrZXldID0gZmFsc2U7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwge30pO1xuXHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0aWYgKFxuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpKTtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtciA9IGZ1bmN0aW9uIChjaHVua0lkLCBwcm9taXNlcykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzICYmXG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0XHQhY3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXVxuXHRcdFx0KSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpKTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNID0gKCkgPT4ge1xuXHRpZiAodHlwZW9mIGZldGNoID09PSBcInVuZGVmaW5lZFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnQ6IG5lZWQgZmV0Y2ggQVBJXCIpO1xuXHRyZXR1cm4gZmV0Y2goX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGKCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHJldHVybjsgLy8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuXHRcdGlmKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBtYW5pZmVzdCBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pO1xufTtcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIiIsIi8vIG1vZHVsZSBjYWNoZSBhcmUgdXNlZCBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9pbmRleC5qcz9wcm90b2NvbD13cyUzQSZob3N0bmFtZT0wLjAuMC4wJnBvcnQ9ODA4MCZwYXRobmFtZT0lMkZ3cyZsb2dnaW5nPWluZm8mb3ZlcmxheT10cnVlJnJlY29ubmVjdD0xMCZob3Q9dHJ1ZSZsaXZlLXJlbG9hZD10cnVlXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9hcHAvaW5kZXguanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3N0eWxlcy9pbmRleC5zY3NzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIkFwcCIsImNvbnN0cnVjdG9yIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJhbnNpSFRNTCIsIl9yZWdBTlNJIiwiX2RlZkNvbG9ycyIsInJlc2V0IiwiYmxhY2siLCJyZWQiLCJncmVlbiIsInllbGxvdyIsImJsdWUiLCJtYWdlbnRhIiwiY3lhbiIsImxpZ2h0Z3JleSIsImRhcmtncmV5IiwiX3N0eWxlcyIsIl9vcGVuVGFncyIsIl9jbG9zZVRhZ3MiLCJmb3JFYWNoIiwibiIsInRleHQiLCJ0ZXN0IiwiYW5zaUNvZGVzIiwicmV0IiwicmVwbGFjZSIsIm1hdGNoIiwic2VxIiwib3QiLCJpbmRleE9mIiwicG9wIiwicHVzaCIsImN0IiwibCIsImxlbmd0aCIsIkFycmF5Iiwiam9pbiIsInNldENvbG9ycyIsImNvbG9ycyIsIkVycm9yIiwiX2ZpbmFsQ29sb3JzIiwia2V5IiwiaGV4IiwiaGFzT3duUHJvcGVydHkiLCJpc0FycmF5Iiwic29tZSIsImgiLCJkZWZIZXhDb2xvciIsInNsaWNlIiwiX3NldFRhZ3MiLCJ0YWdzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJvcGVuIiwiY2xvc2UiLCJjb2RlIiwiY29sb3IiLCJvcmlDb2xvciIsInBhcnNlSW50IiwidG9TdHJpbmciLCJSIiwiUmVmbGVjdCIsIlJlZmxlY3RBcHBseSIsImFwcGx5IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJhcmdzIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwiUmVmbGVjdE93bktleXMiLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImNvbmNhdCIsIlByb2Nlc3NFbWl0V2FybmluZyIsIndhcm5pbmciLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm9uY2UiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJjaGVja0xpc3RlbmVyIiwibGlzdGVuZXIiLCJUeXBlRXJyb3IiLCJlbnVtZXJhYmxlIiwic2V0IiwiYXJnIiwiUmFuZ2VFcnJvciIsImdldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwic2V0TWF4TGlzdGVuZXJzIiwiX2dldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJkb0Vycm9yIiwiZXZlbnRzIiwiZXJyb3IiLCJlciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwib25jZVdyYXBwZXIiLCJmaXJlZCIsInJlbW92ZUxpc3RlbmVyIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiYmluZCIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJpbmRleCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyb3JMaXN0ZW5lciIsInJlc29sdmVyIiwiZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyIiwiYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIiLCJmbGFncyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3cmFwTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibmFtZWRfcmVmZXJlbmNlc18xIiwicmVxdWlyZSIsIm51bWVyaWNfdW5pY29kZV9tYXBfMSIsInN1cnJvZ2F0ZV9wYWlyc18xIiwiYWxsTmFtZWRSZWZlcmVuY2VzIiwiX19hc3NpZ24iLCJuYW1lZFJlZmVyZW5jZXMiLCJhbGwiLCJodG1sNSIsInJlcGxhY2VVc2luZ1JlZ0V4cCIsIm1hY3JvVGV4dCIsIm1hY3JvUmVnRXhwIiwibWFjcm9SZXBsYWNlciIsImxhc3RJbmRleCIsInJlcGxhY2VNYXRjaCIsImV4ZWMiLCJyZXBsYWNlUmVzdWx0IiwicmVwbGFjZUxhc3RJbmRleCIsInN1YnN0cmluZyIsInJlcGxhY2VJbnB1dCIsImVuY29kZVJlZ0V4cHMiLCJzcGVjaWFsQ2hhcnMiLCJub25Bc2NpaSIsIm5vbkFzY2lpUHJpbnRhYmxlIiwibm9uQXNjaWlQcmludGFibGVPbmx5IiwiZXh0ZW5zaXZlIiwiZGVmYXVsdEVuY29kZU9wdGlvbnMiLCJtb2RlIiwibGV2ZWwiLCJudW1lcmljIiwiZW5jb2RlIiwiX2EiLCJfYiIsIl9jIiwiX2QiLCJfZSIsImVuY29kZVJlZ0V4cCIsInJlZmVyZW5jZXMiLCJjaGFyYWN0ZXJzIiwiaXNIZXgiLCJpbnB1dCIsInJlc3VsdCIsImdldENvZGVQb2ludCIsImNoYXJDb2RlQXQiLCJkZWZhdWx0RGVjb2RlT3B0aW9ucyIsInNjb3BlIiwic3RyaWN0IiwiYXR0cmlidXRlIiwiYmFzZURlY29kZVJlZ0V4cHMiLCJ4bWwiLCJib2R5IiwiYm9keVJlZ0V4cHMiLCJodG1sNCIsImRlY29kZVJlZ0V4cHMiLCJmcm9tQ2hhckNvZGUiLCJvdXRPZkJvdW5kc0NoYXIiLCJkZWZhdWx0RGVjb2RlRW50aXR5T3B0aW9ucyIsImdldERlY29kZWRFbnRpdHkiLCJlbnRpdHkiLCJpc0F0dHJpYnV0ZSIsImlzU3RyaWN0IiwiZGVjb2RlUmVzdWx0IiwiZGVjb2RlRW50aXR5TGFzdENoYXIiLCJkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZSIsImRlY29kZVNlY29uZENoYXIiLCJkZWNvZGVDb2RlIiwic3Vic3RyIiwiZnJvbUNvZGVQb2ludCIsIm51bWVyaWNVbmljb2RlTWFwIiwiZGVjb2RlRW50aXR5IiwiZW50aXRpZXMiLCJkZWNvZGUiLCJkZWNvZGVSZWdFeHAiLCJfIiwiJCIsImZqIiwiYXN0cmFsQ29kZVBvaW50IiwiTWF0aCIsImZsb29yIiwiY29kZVBvaW50QXQiLCJoaWdoU3Vycm9nYXRlRnJvbSIsImhpZ2hTdXJyb2dhdGVUbyIsIm5vcm1hbGl6ZVVybCIsInNyY0J5TW9kdWxlSWQiLCJub0RvY3VtZW50IiwiZG9jdW1lbnQiLCJkZWJvdW5jZSIsImZuIiwidGltZSIsInRpbWVvdXQiLCJzZWxmIiwiZnVuY3Rpb25DYWxsIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIm5vb3AiLCJnZXRDdXJyZW50U2NyaXB0VXJsIiwibW9kdWxlSWQiLCJzcmMiLCJjdXJyZW50U2NyaXB0Iiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibGFzdFNjcmlwdFRhZyIsImZpbGVNYXAiLCJzcGxpdFJlc3VsdCIsInNwbGl0IiwiZmlsZW5hbWUiLCJtYXAiLCJtYXBSdWxlIiwicmVnIiwiUmVnRXhwIiwidXBkYXRlQ3NzIiwiZWwiLCJ1cmwiLCJocmVmIiwiaXNVcmxSZXF1ZXN0IiwiaXNMb2FkZWQiLCJ2aXNpdGVkIiwibmV3RWwiLCJjbG9uZU5vZGUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJEYXRlIiwibm93IiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImdldFJlbG9hZFVybCIsInJlbG9hZFN0eWxlIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibG9hZGVkIiwicmVsb2FkQWxsIiwib3B0aW9ucyIsImdldFNjcmlwdFNyYyIsInVwZGF0ZSIsInJlbG9hZGVkIiwibG9jYWxzIiwicGF0aENvbXBvbmVudHMiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsIml0ZW0iLCJ1cmxTdHJpbmciLCJ0cmltIiwicHJvdG9jb2wiLCJjb21wb25lbnRzIiwiaG9zdCIsInRvTG93ZXJDYXNlIiwicGF0aCIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiZGVzY3JpcHRvciIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiX3RvUHJvcGVydHlLZXkiLCJfY3JlYXRlQ2xhc3MiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJ0IiwiX3RvUHJpbWl0aXZlIiwiciIsImUiLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsIldlYlNvY2tldENsaWVudCIsImNsaWVudCIsIldlYlNvY2tldCIsIm9uZXJyb3IiLCJvbk9wZW4iLCJmIiwib25vcGVuIiwib25DbG9zZSIsIm9uY2xvc2UiLCJvbk1lc3NhZ2UiLCJvbm1lc3NhZ2UiLCJkYXRhIiwiZGVmYXVsdCIsIm8iLCJmaWx0ZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfb2JqZWN0U3ByZWFkIiwiX2RlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJvYmoiLCJ3ZWJwYWNrSG90TG9nIiwic3RyaXBBbnNpIiwicGFyc2VVUkwiLCJzb2NrZXQiLCJmb3JtYXRQcm9ibGVtIiwiY3JlYXRlT3ZlcmxheSIsImxvZ0VuYWJsZWRGZWF0dXJlcyIsInNldExvZ0xldmVsIiwic2VuZE1lc3NhZ2UiLCJyZWxvYWRBcHAiLCJjcmVhdGVTb2NrZXRVUkwiLCJkZWNvZGVPdmVybGF5T3B0aW9ucyIsIm92ZXJsYXlPcHRpb25zIiwicHJvcGVydHkiLCJvdmVybGF5RmlsdGVyRnVuY3Rpb25TdHJpbmciLCJkZWNvZGVVUklDb21wb25lbnQiLCJvdmVybGF5RmlsdGVyRnVuY3Rpb24iLCJzdGF0dXMiLCJpc1VubG9hZGluZyIsImN1cnJlbnRIYXNoIiwiX193ZWJwYWNrX2hhc2hfXyIsImhvdCIsImxpdmVSZWxvYWQiLCJwcm9ncmVzcyIsIm92ZXJsYXkiLCJwYXJzZWRSZXNvdXJjZVF1ZXJ5IiwiX19yZXNvdXJjZVF1ZXJ5IiwiZW5hYmxlZEZlYXR1cmVzIiwiUHJvZ3Jlc3MiLCJPdmVybGF5IiwiSlNPTiIsInBhcnNlIiwiZXJyb3JzIiwid2FybmluZ3MiLCJydW50aW1lRXJyb3JzIiwibG9nZ2luZyIsInJlY29ubmVjdCIsInNldEFsbExvZ0xldmVsIiwid2luZG93IiwidHJ1c3RlZFR5cGVzUG9saWN5TmFtZSIsImNhdGNoUnVudGltZUVycm9yIiwic2VuZCIsIm9uU29ja2V0TWVzc2FnZSIsImludmFsaWQiLCJpbmZvIiwiaGFzaCIsIl9oYXNoIiwicHJldmlvdXNIYXNoIiwicHJvZ3Jlc3NVcGRhdGUiLCJwbHVnaW5OYW1lIiwicGVyY2VudCIsIm1zZyIsInN0aWxsT2siLCJvayIsInN0YXRpY0NoYW5nZWQiLCJmaWxlIiwibG9jYXRpb24iLCJyZWxvYWQiLCJfd2FybmluZ3MiLCJwYXJhbXMiLCJwcmludGFibGVXYXJuaW5ncyIsIl9mb3JtYXRQcm9ibGVtIiwiaGVhZGVyIiwib3ZlcmxheVdhcm5pbmdzU2V0dGluZyIsIndhcm5pbmdzVG9EaXNwbGF5IiwibWVzc2FnZXMiLCJwcmV2ZW50UmVsb2FkaW5nIiwiX2Vycm9ycyIsInByaW50YWJsZUVycm9ycyIsIl9mb3JtYXRQcm9ibGVtMiIsIm92ZXJsYXlFcnJvcnNTZXR0aW5ncyIsImVycm9yc1RvRGlzcGxheSIsIl9lcnJvciIsInNvY2tldFVSTCIsIl9fd2VicGFja19tb2R1bGVzX18iLCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvdGFwYWJsZS5qcyIsIl9fdW51c2VkX3dlYnBhY2tfbW9kdWxlIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJkIiwiU3luY0JhaWxIb29rIiwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanMiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJfYXJyYXlXaXRob3V0SG9sZXMiLCJfaXRlcmFibGVUb0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlU3ByZWFkIiwibWluTGVuIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJmcm9tIiwiaXRlciIsIml0ZXJhdG9yIiwiYXJyMiIsIkxvZ1R5cGUiLCJmcmVlemUiLCJkZWJ1ZyIsInRyYWNlIiwiZ3JvdXAiLCJncm91cENvbGxhcHNlZCIsImdyb3VwRW5kIiwicHJvZmlsZSIsInByb2ZpbGVFbmQiLCJjbGVhciIsIkxPR19TWU1CT0wiLCJUSU1FUlNfU1lNQk9MIiwiVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MIiwiV2VicGFja0xvZ2dlciIsImdldENoaWxkTG9nZ2VyIiwiX2xlbiIsIl9rZXkiLCJfbGVuMiIsIl9rZXkyIiwiX2xlbjMiLCJfa2V5MyIsIl9sZW40IiwiX2tleTQiLCJfbGVuNSIsIl9rZXk1IiwiYXNzZXJ0IiwiYXNzZXJ0aW9uIiwiX2xlbjYiLCJfa2V5NiIsIl9sZW43IiwiX2tleTciLCJfbGVuOCIsIl9rZXk4IiwiX2xlbjkiLCJfa2V5OSIsIl9sZW4xMCIsIl9rZXkxMCIsImxhYmVsIiwiTWFwIiwicHJvY2VzcyIsImhydGltZSIsInRpbWVMb2ciLCJwcmV2IiwidGltZUVuZCIsImRlbGV0ZSIsInRpbWVBZ2dyZWdhdGUiLCJjdXJyZW50IiwidGltZUFnZ3JlZ2F0ZUVuZCIsIkxvZ2dlciIsIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qcyIsIl9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cyIsIl9yZXF1aXJlIiwiZmlsdGVyVG9GdW5jdGlvbiIsInJlZ0V4cCIsImlkZW50IiwiTG9nTGV2ZWwiLCJub25lIiwiZmFsc2UiLCJ0cnVlIiwidmVyYm9zZSIsIl9yZWYiLCJfcmVmJGxldmVsIiwiX3JlZiRkZWJ1ZyIsImRlYnVnRmlsdGVycyIsImxvZ2xldmVsIiwibG9nZ2VyIiwibGFiZWxlZEFyZ3MiLCJtcyIsImxvZ1RpbWUiLCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMiLCJfZXh0ZW5kcyIsImFzc2lnbiIsInNvdXJjZSIsIl9yZXF1aXJlMiIsImNyZWF0ZUNvbnNvbGVMb2dnZXIiLCJjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMiLCJjdXJyZW50RGVmYXVsdExvZ2dlciIsImdldExvZ2dlciIsImhvb2tzIiwiY2hpbGROYW1lIiwiY29uZmlndXJlRGVmYXVsdExvZ2dlciIsIl9fd2VicGFja19tb2R1bGVfY2FjaGVfXyIsImNhY2hlZE1vZHVsZSIsImRlZmluaXRpb24iLCJwcm9wIiwidG9TdHJpbmdUYWciLCJ3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIl9fd2VicGFja19leHBvcnRfdGFyZ2V0X18iLCJfX2VzTW9kdWxlIiwibGlzdGVuVG9SdW50aW1lRXJyb3IiLCJsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbiIsInBhcnNlRXJyb3JUb1N0YWNrcyIsImNyZWF0ZU92ZXJsYXlNYWNoaW5lIiwiY29udGFpbmVyU3R5bGUiLCJkaXNtaXNzQnV0dG9uU3R5bGUiLCJoZWFkZXJTdHlsZSIsImlmcmFtZVN0eWxlIiwibXNnU3R5bGVzIiwibXNnVGV4dFN0eWxlIiwibXNnVHlwZVN0eWxlIiwibW9kdWxlTmFtZSIsImxvYyIsInN0YWNrIiwiaWZyYW1lQ29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJoZWFkZXJFbGVtZW50Iiwib25Mb2FkUXVldWUiLCJvdmVybGF5VHJ1c3RlZFR5cGVzUG9saWN5IiwiYXBwbHlTdHlsZSIsImVsZW1lbnQiLCJzdHlsZSIsImNyZWF0ZUNvbnRhaW5lciIsInRydXN0ZWRUeXBlcyIsImNyZWF0ZVBvbGljeSIsImNyZWF0ZUhUTUwiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJvbmxvYWQiLCJjb250ZW50RWxlbWVudCIsImNvbnRlbnREb2N1bWVudCIsImlubmVyVGV4dCIsImNsb3NlQnV0dG9uRWxlbWVudCIsImFyaWFMYWJlbCIsIm92ZXJsYXlTZXJ2aWNlIiwib25Mb2FkIiwiZW5zdXJlT3ZlcmxheUV4aXN0cyIsImNhbGxiYWNrIiwiaW5uZXJIVE1MIiwiaGlkZSIsInNob3ciLCJtZXNzYWdlU291cmNlIiwiZW50cnlFbGVtZW50IiwibXNnU3R5bGUiLCJwYWRkaW5nIiwidHlwZUVsZW1lbnQiLCJtb2R1bGVJZGVudGlmaWVyIiwiY3Vyc29yIiwic2V0QXR0cmlidXRlIiwiZmV0Y2giLCJtZXNzYWdlVGV4dE5vZGUiLCJzaG93T3ZlcmxheSIsImhpZGVPdmVybGF5IiwiaGFuZGxlRXJyb3IiLCJmYWxsYmFja01lc3NhZ2UiLCJlcnJvck9iamVjdCIsInNob3VsZERpc3BsYXkiLCJlcnJvckV2ZW50IiwicHJvbWlzZVJlamVjdGlvbkV2ZW50IiwicmVhc29uIiwiY3JlYXRlTWFjaGluZSIsIl9yZWYyIiwic3RhdGVzIiwiaW5pdGlhbCIsImFjdGlvbnMiLCJjdXJyZW50U3RhdGUiLCJjdXJyZW50Q29udGV4dCIsImV2ZW50IiwiY3VycmVudFN0YXRlT24iLCJ0cmFuc2l0aW9uQ29uZmlnIiwiYWN0TmFtZSIsImFjdGlvbkltcGwiLCJuZXh0Q29udGV4dFZhbHVlIiwiY2xlYW51cCIsIm92ZXJsYXlNYWNoaW5lIiwiaGlkZGVuIiwiQlVJTERfRVJST1IiLCJSVU5USU1FX0VSUk9SIiwiZGlzcGxheUJ1aWxkRXJyb3IiLCJESVNNSVNTIiwiZGlzcGxheVJ1bnRpbWVFcnJvciIsImRpc21pc3NNZXNzYWdlcyIsImFwcGVuZE1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJ3aWR0aCIsImhlaWdodCIsImJvcmRlciIsImJveFNpemluZyIsImZvbnRTaXplIiwibGluZUhlaWdodCIsIndoaXRlU3BhY2UiLCJvdmVyZmxvdyIsImZvbnRGYW1pbHkiLCJtYXJnaW4iLCJmbGV4IiwibWF4SGVpZ2h0IiwibWFyZ2luQm90dG9tIiwiQ2xpZW50IiwiX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18iLCJyZXRyaWVzIiwibWF4UmV0cmllcyIsImluaXRTb2NrZXQiLCJoYW5kbGVycyIsInJldHJ5SW5NcyIsInBvdyIsInJhbmRvbSIsImZvcm1hdCIsIm9ialVSTCIsImF1dGgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJob3N0bmFtZSIsInBvcnQiLCJwYXRobmFtZSIsInNsYXNoZXMiLCJjaGFyQXQiLCJzZWFyY2giLCJwYXJzZWRVUkwiLCJpc0luQWRkckFueSIsInNvY2tldFVSTFByb3RvY29sIiwic29ja2V0VVJMQXV0aCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJzb2NrZXRVUkxIb3N0bmFtZSIsInNvY2tldFVSTFBvcnQiLCJzb2NrZXRVUkxQYXRobmFtZSIsImZyb21DdXJyZW50U2NyaXB0IiwiZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSIsImdldEF0dHJpYnV0ZSIsInNjcmlwdEVsZW1lbnRzIiwic2NyaXB0RWxlbWVudHNXaXRoU3JjIiwiZGVmYXVsdExldmVsIiwiZmVhdHVyZXMiLCJsb2dTdHJpbmciLCJyZXNvdXJjZVF1ZXJ5Iiwic2VhcmNoUGFyYW1zIiwicGFpciIsInNjcmlwdFNvdXJjZSIsInNjcmlwdFNvdXJjZVVSTCIsIlVSTCIsImhvdEVtaXR0ZXIiLCJpc0luaXRpYWwiLCJhcHBseVJlbG9hZCIsInJvb3RXaW5kb3ciLCJpbnRlcnZhbElkIiwiY2xlYXJJbnRlcnZhbCIsImFsbG93VG9Ib3QiLCJhbGxvd1RvTGl2ZVJlbG9hZCIsInBvc3RNZXNzYWdlIiwic2V0SW50ZXJ2YWwiLCJwYXJlbnQiLCJzZW5kTXNnIiwiV29ya2VyR2xvYmFsU2NvcGUiLCJhbnNpUmVnZXgiLCJzdHJpbmciLCJsYXN0SGFzaCIsInVwVG9EYXRlIiwiY2hlY2siLCJ0aGVuIiwidXBkYXRlZE1vZHVsZXMiLCJjYXRjaCIsImZvcm1hdEVycm9yIiwicmVuZXdlZE1vZHVsZXMiLCJ1bmFjY2VwdGVkTW9kdWxlcyIsInBhcnRzIiwibnVtYmVySWRzIiwiZXZlcnkiLCJsb2dMZXZlbCIsImR1bW15Iiwic2hvdWxkTG9nIiwibG9nR3JvdXAiLCJsb2dGbiJdLCJzb3VyY2VSb290IjoiIn0=