// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"launch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

const carlo = require('carlo');

const path = require('path'); // [API](https://github.com/GoogleChromeLabs/carlo/blob/master/API.md)


async function _default() {
  // Launch the browser.
  const app = await carlo.launch(); // Terminate Node.js process on app window closing.

  app.on('exit', () => {
    process.exit();
  }); // Tell carlo where your web files are located.

  app.serveFolder(path.resolve(__dirname));
  app.serveFolder(path.resolve(__dirname, '..'));
  app.serveFolder(path.resolve(__dirname, '..', 'client'));
  await app.exposeFunction('exit', () => {
    app.exit();
    process.exit();
  }); // Expose 'env' function in the web environment.
  // await app.exposeFunction('env', _ => process.env);
  // Navigate to the main page of your app.

  await app.load(path.resolve(__dirname, '..', 'client', 'index.html'));
}
},{}],"../util/discord/getGuildNames.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (client) {
  return Array.from(client.guilds).map(function (v) {
    return v[1].name;
  });
};
},{}],"discord/onReady.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getGuildNames_1 = __importDefault(require("../../util/discord/getGuildNames"));

exports.default = function (store) {
  return function () {
    getGuildNames_1.default(store.client);
  };
};
},{"../../util/discord/getGuildNames":"../util/discord/getGuildNames.ts"}],"discord/main.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var _this = this;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var discord_js_1 = require("discord.js");

var onReady_1 = __importDefault(require("./onReady"));

exports.default = function (token, loginResponse, store) {
  return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      store.client = new discord_js_1.Client();
      store.client.on('ready', onReady_1.default(store));
      store.client.login(token).then(function () {
        return loginResponse.status(200).send('Success');
      }).then(function () {
        store.guilds = store.client.guilds;
      }).then(function () {// console.log(store.client);
      }).catch(function (e) {
        return loginResponse.status(400).send('LoginFailed');
      });
      return [2
      /*return*/
      ];
    });
  });
};
},{"./onReady":"discord/onReady.ts"}],"../util/stringifyAvoidCircularReference.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var mapToArray = function (any) {
  return any instanceof Map ? Array.from(any) : any;
};

exports.default = function (any) {
  var cache = [];
  return JSON.stringify(any, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      } // Store value in our collection


      cache.push(value);
    }

    return mapToArray(value);
  });
};
},{}],"app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var launch_1 = __importDefault(require("./launch"));

var express_1 = __importDefault(require("express"));

var body_parser_1 = __importDefault(require("body-parser"));

var main_1 = __importDefault(require("./discord/main"));

var stringifyAvoidCircularReference_1 = __importDefault(require("../util/stringifyAvoidCircularReference"));

var app = express_1.default();
var PORT = 3000;

var Store =
/** @class */
function () {
  function Store() {
    this.guilds = undefined;
    this.client = undefined;
  }

  Object.defineProperty(Store.prototype, "guildNames", {
    get: function () {
      return this.client ? Array.from(this.client.guilds).map(function (v) {
        return v[1].name;
      }) : [];
    },
    enumerable: true,
    configurable: true
  });
  return Store;
}();

exports.Store = Store;
var store = new Store();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {});
app.get('/guilds', function (req, res) {
  if (store.guilds) {
    res.send({
      guilds: stringifyAvoidCircularReference_1.default(store.guilds)
    });
  } else {
    res.send(400);
  }
});
app.post('/token', function (req, res) {
  main_1.default(req.body.token, res, store);
});
app.listen(PORT, function () {
  console.log("app listen in port " + PORT);
});
launch_1.default();
},{"./launch":"launch.js","./discord/main":"discord/main.ts","../util/stringifyAvoidCircularReference":"../util/stringifyAvoidCircularReference.ts"}]},{},["app.ts"], null)
//# sourceMappingURL=app.map