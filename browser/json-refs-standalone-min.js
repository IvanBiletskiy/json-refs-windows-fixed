(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JsonRefs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function getRemoteJson(e,r){var t=remoteCache[e],n=Promise.resolve(),i=-1===e.indexOf(":")?void 0:e.split(":")[0];return _.isUndefined(t)?-1!==supportedSchemes.indexOf(i)||_.isUndefined(i)?(n=pathLoader.load(e,r),n=r.processContent?n.then(function(t){return r.processContent(t,e)}):n.then(JSON.parse),n.then(function(r){return remoteCache[e]=r,r})):n=n.then(function(){return Promise.reject(new Error("Unsupported remote reference scheme: "+i))}):n=n.then(function(){return t}),n}function combineRefs(e,r){var t=pathFromPointer(e);return isRemotePointer(r)&&(r=-1===r.indexOf("#")?"#":r.substring(r.indexOf("#"))),pathToPointer(t.concat(pathFromPointer(r))).replace(/\/\$ref/g,"")}function computeUrl(e,r){function t(e){".."===e?i.pop():"."!==e&&i.push(e)}var n="#"!==r.charAt(0)&&-1===r.indexOf(":"),i=[],o=(r.indexOf("#")>-1?r.split("#")[0]:r).split("/");return e&&e.length>1&&"/"===e[e.length-1]&&(e=e.substring(0,e.length-1)),e&&e.split("#")[0].split("/").forEach(t),n?o.forEach(t):i=o,i.join("/")}function realResolveRefs(e,r,t){function n(e){var r=e.slice(0,e.lastIndexOf("allOf")),i=t[pathToPointer(r)];return _.isUndefined(i)?r.indexOf("allOf")>-1?n(r):void 0:pathToPointer(r)}function i(e){var r=[],i=e.map(function(){var e,i=pathToPointer(this.path),o=t[i];this.circular&&(r.push(i),_.isUndefined(o)&&(e=n(this.path),o=t[e]),_.isUndefined(o)||(o.circular=!0),0===s?this.update({}):this.update(traverse(this.node).map(function(){this.circular&&this.parent.update({})})))});return _.each(r,function(e){var r,t=[],n=pathFromPointer(e),o=traverse(i).get(n);for(r=0;s>r;r++)t.push.apply(t,n),traverse(i).set(t,_.cloneDeep(o))}),i}function o(e,r){var n=combineRefs(r,"#"),i=e=-1===e.indexOf("#")?"#":e.substring(e.indexOf("#")),o=pathFromPointer(i),s=!a.has(o),u=a.get(o),f=pathFromPointer(r),c=f.slice(0,f.length-1),d=t[n]||{ref:e};s?d.missing=!0:0===c.length?(a.value===u&&(u={},d.circular=!0),a.value=u):(a.get(c)===u&&(u={},d.circular=!0),a.set(c,u)),t[n]=d}var s=_.isUndefined(r.depth)?1:r.depth,a=traverse(e);return _.each(findRefs(e),function(e,r){isRemotePointer(e)||o(e,r)}),_.isUndefined(r.location)||_.each(t,function(e){var t=e.ref;t=t.replace(r.location,""),"/"===t.charAt(0)&&(t=t.substring(1)),e.ref=t}),{metadata:t,resolved:i(a)}}function resolveRemoteRefs(e,r,t,n,i){function o(e,r,o,s,a){var f,c=o+("#"===s?"":s),d=combineRefs(t,e),h=i[d]||{},p=pathFromPointer(e);_.isUndefined(a)?(h.circular=!0,f=n[o].ref):(f=traverse(a).get(pathFromPointer(s)),f.$ref?f=f.$ref:p.pop()),0===p.length?u.value=f:u.set(p,f),h.ref=c,i[d]=h}function s(){return{metadata:i,resolved:u.value}}var a=Promise.resolve(),u=traverse(e);return _.each(findRefs(e),function(e,s){isRemotePointer(e)&&(a=a.then(function(){var a=computeUrl(r.location,e),u=e.split("#"),f="#"+(u[1]||"");return _.isUndefined(n[a])?getRemoteJson(a,r).then(function(e){return e},function(e){return e}).then(function(c){var d=u[0],h=_.cloneDeep(r),p=combineRefs(t,s);return d=d.substring(0,d.lastIndexOf("/")+1),h.location=computeUrl(r.location,d),n[a]={ref:t},_.isError(c)?void(i[p]={err:c,missing:!0,ref:e}):resolveRemoteRefs(c,h,p,n,i).then(function(r){delete n[a],o(s,e,a,f,r.resolved)})}):void o(s,e,a,f)}))}),a=a.then(s,s)}"undefined"==typeof Promise&&require("native-promise-only");var _=require("./lib/utils"),pathLoader=require("path-loader"),traverse=require("traverse"),remoteCache={},supportedSchemes=["file","http","https"];module.exports.clearCache=function(){remoteCache={}};var isJsonReference=module.exports.isJsonReference=function(e){return _.isPlainObject(e)&&_.isString(e.$ref)},pathToPointer=module.exports.pathToPointer=function(e){if(_.isUndefined(e))throw new Error("path is required");if(!_.isArray(e))throw new Error("path must be an array");var r="#";return e.length>0&&(r+="/"+e.map(function(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}).join("/")),r},findRefs=module.exports.findRefs=function(e){if(_.isUndefined(e))throw new Error("json is required");if(!_.isPlainObject(e))throw new Error("json must be an object");return traverse(e).reduce(function(e){var r=this.node;return"$ref"===this.key&&isJsonReference(this.parent.node)&&(e[pathToPointer(this.path)]=r),e},{})},isRemotePointer=module.exports.isRemotePointer=function(e){if(_.isUndefined(e))throw new Error("ptr is required");if(!_.isString(e))throw new Error("ptr must be a string");return""!==e&&"#"!==e.charAt(0)},pathFromPointer=module.exports.pathFromPointer=function(e){if(_.isUndefined(e))throw new Error("ptr is required");if(!_.isString(e))throw new Error("ptr must be a string");var r=[],t=["","#","#/"];return isRemotePointer(e)?r=e:-1===t.indexOf(e)&&"#"===e.charAt(0)&&(r=e.substring(e.indexOf("/")).split("/").reduce(function(e,r){return""!==r&&e.push(r.replace(/~0/g,"~").replace(/~1/g,"/")),e},[])),r};module.exports.resolveRefs=function(e,r,t){var n=Promise.resolve();return 2===arguments.length&&_.isFunction(r)&&(t=r,r={}),_.isUndefined(r)&&(r={}),n=n.then(function(){if(_.isUndefined(e))throw new Error("json is required");if(!_.isPlainObject(e))throw new Error("json must be an object");if(!_.isPlainObject(r))throw new Error("options must be an object");if(!_.isUndefined(t)&&!_.isFunction(t))throw new Error("done must be a function");if(!_.isUndefined(r.processContent)&&!_.isFunction(r.processContent))throw new Error("options.processContent must be a function");if(!_.isUndefined(r.prepareRequest)&&!_.isFunction(r.prepareRequest))throw new Error("options.prepareRequest must be a function");if(!_.isUndefined(r.location)&&!_.isString(r.location))throw new Error("options.location must be a string");if(!_.isUndefined(r.depth)&&!_.isNumber(r.depth))throw new Error("options.depth must be a number");if(!_.isUndefined(r.depth)&&r.depth<0)throw new Error("options.depth must be greater or equal to zero")}),e=traverse(e).clone(),r=traverse(r).clone(),n=n.then(function(){return resolveRemoteRefs(e,r,"#",{},{})}).then(function(e){return realResolveRefs(e.resolved,r,e.metadata)}),!_.isUndefined(t)&&_.isFunction(t)&&(n=n.then(function(e){t(void 0,e.resolved,e.metadata)},function(e){t(e)})),n};
},{"./lib/utils":2,"native-promise-only":3,"path-loader":4,"traverse":10}],2:[function(require,module,exports){
"use strict";function isType(e,r){return Object.prototype.toString.call(e)==="[object "+r+"]"}var traverse=require("traverse");module.exports.cloneDeep=function(e){return traverse(e).clone()};var isArray=module.exports.isArray=function(e){return isType(e,"Array")};module.exports.isError=function(e){return isType(e,"Error")},module.exports.isFunction=function(e){return isType(e,"Function")},module.exports.isNumber=function(e){return isType(e,"Number")};var isPlainObject=module.exports.isPlainObject=function(e){return isType(e,"Object")};module.exports.isString=function(e){return isType(e,"String")},module.exports.isUndefined=function(e){return"undefined"==typeof e},module.exports.each=function(e,r){isArray(e)?e.forEach(r):isPlainObject(e)&&Object.keys(e).forEach(function(t){r(e[t],t)})};

},{"traverse":10}],3:[function(require,module,exports){
(function (global){
!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(c=n(o))?t(function(){var t=new f(u);try{c.call(o,function(){r.apply(t,arguments)},function(){i.apply(t,arguments)})}catch(n){i.call(t,n)}}):(u.msg=o,u.state=1,u.chain.length>0&&t(e,u))}catch(a){i.call(new f(u),a)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return a.prototype=g,s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
"use strict";function getLoader(e){return supportedLoaders[e.split(":")[0]]||defaultLoader}var supportedLoaders={file:require("./lib/loaders/file"),http:require("./lib/loaders/http"),https:require("./lib/loaders/http")},defaultLoader="undefined"==typeof window?supportedLoaders.file:supportedLoaders.http;"undefined"==typeof Promise&&require("native-promise-only"),module.exports.load=function(e,t,o){var r=Promise.resolve();return 2===arguments.length&&"function"==typeof t&&(o=t,t=void 0),r=r.then(function(){if("undefined"==typeof e)throw new TypeError("location is required");if("string"!=typeof e)throw new TypeError("location must be a string");if("undefined"!=typeof t){if("object"!=typeof t)throw new TypeError("options must be an object")}else t={};if("undefined"!=typeof o&&"function"!=typeof o)throw new TypeError("callback must be a function")}),r=r.then(function(){return new Promise(function(o,r){var n=getLoader(e);n.load(e,t,function(e,t){e?r(e):o(t)})})}),"function"==typeof o&&(r=r.then(function(e){o(void 0,e)},function(e){o(e)})),r};

},{"./lib/loaders/file":5,"./lib/loaders/http":6,"native-promise-only":3}],5:[function(require,module,exports){
"use strict";module.exports.load=function(e,o,r){r(new TypeError("The 'file' scheme is not supported in the browser"))};

},{}],6:[function(require,module,exports){
"use strict";var request=require("superagent"),supportedHttpMethods=["delete","get","head","patch","post","put"];module.exports.load=function(e,t,o){var p,r,s=e.split("#")[0],d=t.method?t.method.toLowerCase():"get";"undefined"!=typeof t.prepareRequest&&"function"!=typeof t.prepareRequest?p=new TypeError("options.prepareRequest must be a function"):"undefined"!=typeof t.method&&("string"!=typeof t.method?p=new TypeError("options.method must be a string"):-1===supportedHttpMethods.indexOf(t.method)&&(p=new TypeError("options.method must be one of the following: "+supportedHttpMethods.slice(0,supportedHttpMethods.length-1).join(", ")+" or "+supportedHttpMethods[supportedHttpMethods.length-1]))),p?o(p):(r=request["delete"===d?"del":d](s),t.prepareRequest&&t.prepareRequest(r),"function"==typeof r.buffer&&r.buffer(!0),r.end(function(e,t){o(e,t?t.text:t)}))};

},{"superagent":7}],7:[function(require,module,exports){
function noop(){}function isHost(t){var e={}.toString.call(t);switch(e){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}}function isObject(t){return t===Object(t)}function serialize(t){if(!isObject(t))return t;var e=[];for(var r in t)null!=t[r]&&e.push(encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return e.join("&")}function parseString(t){for(var e,r,s={},i=t.split("&"),o=0,n=i.length;n>o;++o)r=i[o],e=r.split("="),s[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return s}function parseHeader(t){var e,r,s,i,o=t.split(/\r?\n/),n={};o.pop();for(var a=0,u=o.length;u>a;++a)r=o[a],e=r.indexOf(":"),s=r.slice(0,e).toLowerCase(),i=trim(r.slice(e+1)),n[s]=i;return n}function type(t){return t.split(/ *; */).shift()}function params(t){return reduce(t.split(/ *; */),function(t,e){var r=e.split(/ *= */),s=r.shift(),i=r.shift();return s&&i&&(t[s]=i),t},{})}function Response(t,e){e=e||{},this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||"undefined"==typeof this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText,this.setStatusProperties(this.xhr.status),this.header=this.headers=parseHeader(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this.setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this.parseBody(this.text?this.text:this.xhr.response):null}function Request(t,e){var r=this;Emitter.call(this),this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",function(){var t=null,e=null;try{e=new Response(r)}catch(s){return t=new Error("Parser is unable to parse the response"),t.parse=!0,t.original=s,r.callback(t)}if(r.emit("response",e),t)return r.callback(t,e);if(e.status>=200&&e.status<300)return r.callback(t,e);var i=new Error(e.statusText||"Unsuccessful HTTP response");i.original=t,i.response=e,i.status=e.status,r.callback(t||i,e)})}function request(t,e){return"function"==typeof e?new Request("GET",t).end(e):1==arguments.length?new Request("GET",t):new Request(t,e)}var Emitter=require("emitter"),reduce=require("reduce"),root="undefined"==typeof window?this||self:window;request.getXHR=function(){if(!(!root.XMLHttpRequest||root.location&&"file:"==root.location.protocol&&root.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}return!1};var trim="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};request.serializeObject=serialize,request.parseString=parseString,request.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},request.serialize={"application/x-www-form-urlencoded":serialize,"application/json":JSON.stringify},request.parse={"application/x-www-form-urlencoded":parseString,"application/json":JSON.parse},Response.prototype.get=function(t){return this.header[t.toLowerCase()]},Response.prototype.setHeaderProperties=function(t){var e=this.header["content-type"]||"";this.type=type(e);var r=params(e);for(var s in r)this[s]=r[s]},Response.prototype.parseBody=function(t){var e=request.parse[this.type];return e&&t&&(t.length||t instanceof Object)?e(t):null},Response.prototype.setStatusProperties=function(t){1223===t&&(t=204);var e=t/100|0;this.status=t,this.statusType=e,this.info=1==e,this.ok=2==e,this.clientError=4==e,this.serverError=5==e,this.error=4==e||5==e?this.toError():!1,this.accepted=202==t,this.noContent=204==t,this.badRequest=400==t,this.unauthorized=401==t,this.notAcceptable=406==t,this.notFound=404==t,this.forbidden=403==t},Response.prototype.toError=function(){var t=this.req,e=t.method,r=t.url,s="cannot "+e+" "+r+" ("+this.status+")",i=new Error(s);return i.status=this.status,i.method=e,i.url=r,i},request.Response=Response,Emitter(Request.prototype),Request.prototype.use=function(t){return t(this),this},Request.prototype.timeout=function(t){return this._timeout=t,this},Request.prototype.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},Request.prototype.abort=function(){return this.aborted?void 0:(this.aborted=!0,this.xhr.abort(),this.clearTimeout(),this.emit("abort"),this)},Request.prototype.set=function(t,e){if(isObject(t)){for(var r in t)this.set(r,t[r]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},Request.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},Request.prototype.getHeader=function(t){return this._header[t.toLowerCase()]},Request.prototype.type=function(t){return this.set("Content-Type",request.types[t]||t),this},Request.prototype.accept=function(t){return this.set("Accept",request.types[t]||t),this},Request.prototype.auth=function(t,e){var r=btoa(t+":"+e);return this.set("Authorization","Basic "+r),this},Request.prototype.query=function(t){return"string"!=typeof t&&(t=serialize(t)),t&&this._query.push(t),this},Request.prototype.field=function(t,e){return this._formData||(this._formData=new root.FormData),this._formData.append(t,e),this},Request.prototype.attach=function(t,e,r){return this._formData||(this._formData=new root.FormData),this._formData.append(t,e,r),this},Request.prototype.send=function(t){var e=isObject(t),r=this.getHeader("Content-Type");if(e&&isObject(this._data))for(var s in t)this._data[s]=t[s];else"string"==typeof t?(r||this.type("form"),r=this.getHeader("Content-Type"),"application/x-www-form-urlencoded"==r?this._data=this._data?this._data+"&"+t:t:this._data=(this._data||"")+t):this._data=t;return!e||isHost(t)?this:(r||this.type("json"),this)},Request.prototype.callback=function(t,e){var r=this._callback;this.clearTimeout(),r(t,e)},Request.prototype.crossDomainError=function(){var t=new Error("Origin is not allowed by Access-Control-Allow-Origin");t.crossDomain=!0,this.callback(t)},Request.prototype.timeoutError=function(){var t=this._timeout,e=new Error("timeout of "+t+"ms exceeded");e.timeout=t,this.callback(e)},Request.prototype.withCredentials=function(){return this._withCredentials=!0,this},Request.prototype.end=function(t){var e=this,r=this.xhr=request.getXHR(),s=this._query.join("&"),i=this._timeout,o=this._formData||this._data;this._callback=t||noop,r.onreadystatechange=function(){if(4==r.readyState){var t;try{t=r.status}catch(s){t=0}if(0==t){if(e.timedout)return e.timeoutError();if(e.aborted)return;return e.crossDomainError()}e.emit("end")}};var n=function(t){t.total>0&&(t.percent=t.loaded/t.total*100),e.emit("progress",t)};this.hasListeners("progress")&&(r.onprogress=n);try{r.upload&&this.hasListeners("progress")&&(r.upload.onprogress=n)}catch(a){}if(i&&!this._timer&&(this._timer=setTimeout(function(){e.timedout=!0,e.abort()},i)),s&&(s=request.serializeObject(s),this.url+=~this.url.indexOf("?")?"&"+s:"?"+s),r.open(this.method,this.url,!0),this._withCredentials&&(r.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof o&&!isHost(o)){var u=request.serialize[this.getHeader("Content-Type")];u&&(o=u(o))}for(var h in this.header)null!=this.header[h]&&r.setRequestHeader(h,this.header[h]);return this.emit("request",this),r.send(o),this},request.Request=Request,request.get=function(t,e,r){var s=request("GET",t);return"function"==typeof e&&(r=e,e=null),e&&s.query(e),r&&s.end(r),s},request.head=function(t,e,r){var s=request("HEAD",t);return"function"==typeof e&&(r=e,e=null),e&&s.send(e),r&&s.end(r),s},request.del=function(t,e){var r=request("DELETE",t);return e&&r.end(e),r},request.patch=function(t,e,r){var s=request("PATCH",t);return"function"==typeof e&&(r=e,e=null),e&&s.send(e),r&&s.end(r),s},request.post=function(t,e,r){var s=request("POST",t);return"function"==typeof e&&(r=e,e=null),e&&s.send(e),r&&s.end(r),s},request.put=function(t,e,r){var s=request("PUT",t);return"function"==typeof e&&(r=e,e=null),e&&s.send(e),r&&s.end(r),s},module.exports=request;

},{"emitter":8,"reduce":9}],8:[function(require,module,exports){
function Emitter(t){return t?mixin(t):void 0}function mixin(t){for(var e in Emitter.prototype)t[e]=Emitter.prototype[e];return t}module.exports=Emitter,Emitter.prototype.on=Emitter.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},Emitter.prototype.once=function(t,e){function i(){r.off(t,i),e.apply(this,arguments)}var r=this;return this._callbacks=this._callbacks||{},i.fn=e,this.on(t,i),this},Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var i=this._callbacks[t];if(!i)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var r,s=0;s<i.length;s++)if(r=i[s],r===e||r.fn===e){i.splice(s,1);break}return this},Emitter.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),i=this._callbacks[t];if(i){i=i.slice(0);for(var r=0,s=i.length;s>r;++r)i[r].apply(this,e)}return this},Emitter.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},Emitter.prototype.hasListeners=function(t){return!!this.listeners(t).length};

},{}],9:[function(require,module,exports){
module.exports=function(l,n,e){for(var r=0,t=l.length,u=3==arguments.length?e:l[r++];t>r;)u=n.call(null,u,l[r],++r,l);return u};

},{}],10:[function(require,module,exports){
function Traverse(e){this.value=e}function walk(e,t,r){var o=[],n=[],a=!0;return function i(e){function c(){if("object"==typeof l.node&&null!==l.node){l.keys&&l.node_===l.node||(l.keys=objectKeys(l.node)),l.isLeaf=0==l.keys.length;for(var t=0;t<n.length;t++)if(n[t].node_===e){l.circular=n[t];break}}else l.isLeaf=!0,l.keys=null;l.notLeaf=!l.isLeaf,l.notRoot=!l.isRoot}var s=r?copy(e):e,u={},f=!0,l={node:s,node_:e,path:[].concat(o),parent:n[n.length-1],parents:n,key:o.slice(-1)[0],isRoot:0===o.length,level:o.length,circular:null,update:function(e,t){l.isRoot||(l.parent.node[l.key]=e),l.node=e,t&&(f=!1)},"delete":function(e){delete l.parent.node[l.key],e&&(f=!1)},remove:function(e){isArray(l.parent.node)?l.parent.node.splice(l.key,1):delete l.parent.node[l.key],e&&(f=!1)},keys:null,before:function(e){u.before=e},after:function(e){u.after=e},pre:function(e){u.pre=e},post:function(e){u.post=e},stop:function(){a=!1},block:function(){f=!1}};if(!a)return l;c();var p=t.call(l,l.node);return void 0!==p&&l.update&&l.update(p),u.before&&u.before.call(l,l.node),f?("object"!=typeof l.node||null===l.node||l.circular||(n.push(l),c(),forEach(l.keys,function(e,t){o.push(e),u.pre&&u.pre.call(l,l.node[e],e);var n=i(l.node[e]);r&&hasOwnProperty.call(l.node,e)&&(l.node[e]=n.node),n.isLast=t==l.keys.length-1,n.isFirst=0==t,u.post&&u.post.call(l,n),o.pop()}),n.pop()),u.after&&u.after.call(l,l.node),l):l}(e).node}function copy(e){if("object"==typeof e&&null!==e){var t;if(isArray(e))t=[];else if(isDate(e))t=new Date(e.getTime?e.getTime():e);else if(isRegExp(e))t=new RegExp(e);else if(isError(e))t={message:e.message};else if(isBoolean(e))t=new Boolean(e);else if(isNumber(e))t=new Number(e);else if(isString(e))t=new String(e);else if(Object.create&&Object.getPrototypeOf)t=Object.create(Object.getPrototypeOf(e));else if(e.constructor===Object)t={};else{var r=e.constructor&&e.constructor.prototype||e.__proto__||{},o=function(){};o.prototype=r,t=new o}return forEach(objectKeys(e),function(r){t[r]=e[r]}),t}return e}function toS(e){return Object.prototype.toString.call(e)}function isDate(e){return"[object Date]"===toS(e)}function isRegExp(e){return"[object RegExp]"===toS(e)}function isError(e){return"[object Error]"===toS(e)}function isBoolean(e){return"[object Boolean]"===toS(e)}function isNumber(e){return"[object Number]"===toS(e)}function isString(e){return"[object String]"===toS(e)}var traverse=module.exports=function(e){return new Traverse(e)};Traverse.prototype.get=function(e){for(var t=this.value,r=0;r<e.length;r++){var o=e[r];if(!t||!hasOwnProperty.call(t,o)){t=void 0;break}t=t[o]}return t},Traverse.prototype.has=function(e){for(var t=this.value,r=0;r<e.length;r++){var o=e[r];if(!t||!hasOwnProperty.call(t,o))return!1;t=t[o]}return!0},Traverse.prototype.set=function(e,t){for(var r=this.value,o=0;o<e.length-1;o++){var n=e[o];hasOwnProperty.call(r,n)||(r[n]={}),r=r[n]}return r[e[o]]=t,t},Traverse.prototype.map=function(e){return walk(this.value,e,!0)},Traverse.prototype.forEach=function(e){return this.value=walk(this.value,e,!1),this.value},Traverse.prototype.reduce=function(e,t){var r=1===arguments.length,o=r?this.value:t;return this.forEach(function(t){this.isRoot&&r||(o=e.call(this,o,t))}),o},Traverse.prototype.paths=function(){var e=[];return this.forEach(function(t){e.push(this.path)}),e},Traverse.prototype.nodes=function(){var e=[];return this.forEach(function(t){e.push(this.node)}),e},Traverse.prototype.clone=function(){var e=[],t=[];return function r(o){for(var n=0;n<e.length;n++)if(e[n]===o)return t[n];if("object"==typeof o&&null!==o){var a=copy(o);return e.push(o),t.push(a),forEach(objectKeys(o),function(e){a[e]=r(o[e])}),e.pop(),t.pop(),a}return o}(this.value)};var objectKeys=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t},isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},forEach=function(e,t){if(e.forEach)return e.forEach(t);for(var r=0;r<e.length;r++)t(e[r],r,e)};forEach(objectKeys(Traverse.prototype),function(e){traverse[e]=function(t){var r=[].slice.call(arguments,1),o=new Traverse(t);return o[e].apply(o,r)}});var hasOwnProperty=Object.hasOwnProperty||function(e,t){return t in e};

},{}]},{},[1])(1)
});