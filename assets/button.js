!function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s(s.s=1)}([function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return pe}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const n="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},r=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${r}--\x3e`,a=new RegExp(`${r}|${o}`);class l{constructor(e,t){this.parts=[],this.element=t;const s=[],n=[],i=document.createTreeWalker(t.content,133,null,!1);let o=0,l=-1,d=0;const{strings:u,values:{length:m}}=e;for(;d<m;){const e=i.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let n=0;for(let e=0;e<s;e++)c(t[e].name,"$lit$")&&n++;for(;n-- >0;){const t=u[d],s=p.exec(t)[2],n=s.toLowerCase()+"$lit$",i=e.getAttribute(n);e.removeAttribute(n);const r=i.split(a);this.parts.push({type:"attribute",index:l,name:s,strings:r}),d+=r.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(r)>=0){const n=e.parentNode,i=t.split(a),r=i.length-1;for(let t=0;t<r;t++){let s,r=i[t];if(""===r)s=h();else{const e=p.exec(r);null!==e&&c(e[2],"$lit$")&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(r)}n.insertBefore(s,e),this.parts.push({type:"node",index:++l})}""===i[r]?(n.insertBefore(h(),e),s.push(e)):e.data=i[r],d+=r}}else if(8===e.nodeType)if(e.data===r){const t=e.parentNode;null!==e.previousSibling&&l!==o||(l++,t.insertBefore(h(),e)),o=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(s.push(e),l--),d++}else{let t=-1;for(;-1!==(t=e.data.indexOf(r,t+1));)this.parts.push({type:"node",index:-1}),d++}}else i.currentNode=n.pop()}for(const e of s)e.parentNode.removeChild(e)}}const c=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},d=e=>-1!==e.index,h=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:s},parts:n}=e,i=document.createTreeWalker(s,133,null,!1);let r=f(n),o=n[r],a=-1,l=0;const c=[];let d=null;for(;i.nextNode();){a++;const e=i.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,r=f(n,r),o=n[r]}c.forEach(e=>e.parentNode.removeChild(e))}const m=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},f=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(d(t))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const g=new WeakMap,y=e=>"function"==typeof e&&g.has(e),_={},b={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class S{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],s=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let r,o=0,a=0,l=i.nextNode();for(;o<s.length;)if(r=s[o],d(r)){for(;a<r.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),i.currentNode=l.content),null===(l=i.nextNode())&&(i.currentNode=t.pop(),l=i.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return n&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=` ${r} `;class w{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let n=0;n<e;n++){const e=this.strings[n],i=e.lastIndexOf("\x3c!--");s=(i>-1||s)&&-1===e.indexOf("--\x3e",i+1);const a=p.exec(e);t+=null===a?e+(s?v:o):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+r}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const x=e=>null===e||!("object"==typeof e||"function"==typeof e),P=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class N{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1;let s="";for(let n=0;n<t;n++){s+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(x(e)||!P(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||x(e)&&e===this.value||(this.value=e,y(e)||(this.committer.dirty=!0))}commit(){for(;y(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class E{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(h()),this.endNode=e.appendChild(h())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=h()),e.__insert(this.endNode=h())}insertAfterPart(e){e.__insert(this.startNode=h()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):P(e)?this.__commitIterable(e):e===b?(this.value=b,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof S&&this.value.template===t)this.value.update(e.values);else{const s=new S(t,e.processor,this.options),n=s._clone();s.update(e.values),this.__commitNode(n),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,n=0;for(const i of e)s=t[n],void 0===s&&(s=new E(this.options),t.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(t[n-1])),s.setValue(i),s.commit(),n++;n<t.length&&(t.length=n,this.clear(s&&s.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class T extends N{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends C{}let O=!1;(()=>{try{const e={get capture(){return O=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class V{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;y(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=j(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const j=e=>e&&(O?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function U(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(r);return s=t.keyString.get(n),void 0===s&&(s=new l(e,e.getTemplateElement()),t.keyString.set(n,s)),t.stringsArray.set(e.strings,s),s}const M=new Map,I=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const F=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,s,n){const i=t[0];if("."===i){return new T(e,t.slice(1),s).parts}if("@"===i)return[new V(e,t.slice(1),n.eventContext)];if("?"===i)return[new k(e,t.slice(1),s)];return new N(e,t,s).parts}handleTextExpression(e){return new E(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const R=(e,...t)=>new w(e,t,"html",F),$=(e,t)=>`${e}--${t}`;let B=!0;void 0===window.ShadyCSS?B=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),B=!1);const L=e=>t=>{const s=$(t.type,e);let n=M.get(s);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},M.set(s,n));let i=n.stringsArray.get(t.strings);if(void 0!==i)return i;const o=t.strings.join(r);if(i=n.keyString.get(o),void 0===i){const s=t.getTemplateElement();B&&window.ShadyCSS.prepareTemplateDom(s,e),i=new l(t,s),n.keyString.set(o,i)}return n.stringsArray.set(t.strings,i),i},q=["html","svg"],H=new Set,W=(e,t,s)=>{H.add(e);const n=s?s.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:r}=i;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(n,e);const o=document.createElement("style");for(let e=0;e<r;e++){const t=i[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{q.forEach(t=>{const s=M.get($(t,e));void 0!==s&&s.keyString.forEach(e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{s.add(e)}),u(e,s)})})})(e);const a=n.content;s?function(e,t,s=null){const{element:{content:n},parts:i}=e;if(null==s)return void n.appendChild(t);const r=document.createTreeWalker(n,133,null,!1);let o=f(i),a=0,l=-1;for(;r.nextNode();){l++;for(r.currentNode===s&&(a=m(t),s.parentNode.insertBefore(t,s));-1!==o&&i[o].index===l;){if(a>0){for(;-1!==o;)i[o].index+=a,o=f(i,o);return}o=f(i,o)}}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),u(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const z={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},D=(e,t)=>t!==e&&(t==t||e==e),J={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:D};class G extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,s)=>{const n=this._attributeNameForProperty(s,t);void 0!==n&&(this._attributeToPropertyMap.set(n,s),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=J){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(s){const n=this[e];this[t]=s,this._requestUpdate(e,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||J}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=D){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,n=t.converter||z,i="function"==typeof n?n:n.fromAttribute;return i?i(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,n=t.converter;return(n&&n.toAttribute||z.toAttribute)(e,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=J){const n=this.constructor,i=n._attributeNameForProperty(e,s);if(void 0!==i){const e=n._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,n=s._attributeToPropertyMap.get(e);if(void 0!==n){const e=s.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}_requestUpdate(e,t){let s=!0;if(void 0!==e){const n=this.constructor,i=n.getPropertyOptions(e);n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}G.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const K="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol();class X{constructor(e,t){if(t!==Q)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(K?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Y=(e,...t)=>{const s=t.reduce((t,s,n)=>t+(e=>{if(e instanceof X)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[n+1],e[0]);return new X(s,Q)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const Z={};class ee extends G{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(void 0===e)this._styles=[];else if(Array.isArray(e)){const t=(e,s)=>e.reduceRight((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e),s),s=t(e,new Set),n=[];s.forEach(e=>n.unshift(e)),this._styles=n}else this._styles=[e]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?K?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Z&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return Z}}function te(e,t,s){var n,i,r,o,a,l;if(e/=255,t/=255,s/=255,i=0,l=0,r=((o=Math.max(e,t,s))+(a=Math.min(e,t,s)))/2,o===a)i=l=0;else{switch(n=o-a,l=r>.5?n/(2-o-a):n/(o+a),o){case e:i=(t-s)/n+(t<s?6:0);break;case t:i=(s-e)/n+2;break;case s:i=(e-t)/n+4}i/=6}return[i=Math.ceil(360*i),l=Math.ceil(100*l)+"%",r=Math.ceil(100*r)+"%"]}ee.finalized=!0,ee.render=(e,t,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName,r=I.has(t),o=B&&11===t.nodeType&&!!t.host,a=o&&!H.has(n),l=a?document.createDocumentFragment():t;if(((e,t,s)=>{let n=I.get(t);void 0===n&&(i(t,t.firstChild),I.set(t,n=new E(Object.assign({templateFactory:U},s))),n.appendInto(t)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:L(n)},s)),a){const e=I.get(l);I.delete(l);const s=e.value instanceof S?e.value.template:void 0;W(n,l,s),i(t,t.firstChild),t.appendChild(l),I.set(t,e)}!r&&o&&window.ShadyCSS.styleElement(t.host)};var se=function(e){const[t,s,n]=te.apply(te,function(e){e.charAt&&"#"===e.charAt(0)&&(e=function(e){var t=e.split("");return t.shift(),t.join("")}(e)),3===e.length&&(e=function(e){return e.split("").reduce((function(e,t){return e.concat([t,t])}),[]).join("")}(e));var t=parseInt(e,16);return[t>>16&255,t>>8&255,255&t]}(e));return[t,parseInt(s,10),parseInt(n,10)]};customElements.define("become-spinner",class extends ee{static get styles(){return Y`
      :host {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
      }

      svg {
        width: 100%;
        heigth: 100%;
        animation: rotate 2s linear infinite;
        transform-origin: center center;
      }

      circle {
        stroke: white;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
        stroke-width: 5px;
      }

      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
    `}render(){return R`
      <svg viewBox="25 25 50 50">
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokewidth="2"
          strokemiterlimit="10"
        />
      </svg>
    `}});const ne={blue:"#3757FF",green:"#00B257",red:"#EB5757",pink:"#FF527E",orange:"#F2994A",yellow:"#FFBD00"},ie={en:{verify:"Verify me"},es:{verify:"Verifícame"},fr:{verify:"Vérifie moi"},pt:{verify:"Me confirma"}};customElements.define("become-button-element",class extends ee{static get properties(){return{role:{type:String,reflect:!0},tabindex:{type:Number,reflect:!0},ariaPressed:{type:String,reflect:!0,attribute:"aria-pressed"},disabled:{type:Boolean},loading:{type:Boolean,reflect:!0},language:{type:String},color:{type:String}}}static get styles(){return Y`
      :host {
        position: relative;
        width: 100%;
        display: inline-flex;
        align-items: stretch;
        height: 43px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
        transition: box-shadow 200ms ease-in-out;
        border-radius: 4px;
        outline: 0;
        overflow: hidden;
        font-family: sans-serif;
        font-size: 15px;
        letter-spacing: 0.8px;
        white-space: nowrap;
        user-select: none;
      }

      :host(:not([disabled])) {
        cursor: pointer;
      }

      :host([disabled]) main {
        background: #eee;
        cursor: default;
      }

      :host(:active:not([disabled])) {
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
      }

      figure {
        margin: 0;
        padding: 0 15px;
        background: white;
        display: flex;
        align-items: center;
      }

      figure svg,
      figure img {
        width: 24px;
      }

      main {
        transition: background-color 100ms linear;
        padding: 0 40px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      :host([loading]) label {
        visibility: hidden;
      }
      
      label {
        cursor: pointer;
      }

      become-spinner {
        position: absolute;
      }
      
    `}constructor(){super(),this.role="button",this.tabindex=0,this.ariaPressed="false",this.color="green",this.defaultLanguage="en",this.language=this.defaultLanguage}set color(e){const t=this.color;this._color=e,this.requestUpdate("color",t)}get color(){let e=this._color;return e&&(Object.keys(ne).includes(e)||e.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))||(e="green"),ne[e]||e}get translations(){return ie[this.language]||ie[this.defaultLanguage]}render(){return R`
      <figure><img src="https://cdn.shopify.com/s/files/1/0516/5478/7271/files/logo192.ce18d155.jpg?v=1620751247" alt="Become" /></figure>
      <main>
        ${this.loading?R`
              <become-spinner />
            `:null}
        <label>${this.translations.verify}</label>
      </main>
    `}updateStyles(){this.shadowRoot.querySelector("main").style.backgroundColor=this.color,this.shadowRoot.querySelector("main").style.color=function(e){const[,,t]=se(e);return t<70}(this.color)?"white":"black"}firstUpdated(){this.updateStyles()}updated(e){e.has("color")&&this.updateStyles()}});function re(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function oe(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?re(Object(s),!0).forEach((function(t){ae(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):re(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function ae(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}customElements.define("become-frame",class extends ee{static get properties(){return{clientId:{type:String},token:{type:String},userId:{type:String},contractId:{type:String},country:{type:String},state:{type:String},disabled:{type:Boolean,reflect:!0},signupHost:{type:String},metadata:{type:String},flowId:{type:String}}}static get styles(){return Y`
          iframe {
            z-index: 2147483647;
            background: rgba(0, 0, 0, 0.004);
            border: 0px none transparent;
            overflow: hidden auto;
            visibility: visible;
            margin: 0px;
            padding: 0px;
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            -webkit-tap-highlight-color: transparent;
          }
        `}constructor(){super(),this.metadata=null}render(){const e=new URL(this.signupHost);return[["accessToken",this.token],["userId",this.userId],["contractId",this.contractId],["country",this.country],["state",this.state]].filter(e=>{let[t,s]=e;return s}).forEach(t=>{let[s,n]=t;return e.searchParams.append(s,n)}),R`
            <iframe
                    frameborder="0"
                    src="${e}"
                    allow="geolocation; microphone; camera; midi; encrypted-media;"
            ></iframe>
        `}});const le="loaded",ce="errorSdk",de="exitedSdk",he="userFinishedSdk";class pe extends ee{static get properties(){return{clientId:{type:String},token:{type:String},userId:{type:String},contractId:{type:String},country:{type:String},state:{type:String},apiHost:{type:String},signupHost:{type:String},disabled:{type:Boolean},loading:{type:Boolean},color:{type:String},language:{type:String},metadata:{type:String},flowId:{type:String}}}static get styles(){return Y`
      :host {
        display: inline-block;
      }
    `}constructor(){super(),this.disabled=!0,this.loading=!0,this.apiHost="https://api.become.com",this.signupHost="https://jamar-panama.becomedigital.net/",[this.language]=navigator.language.split("-"),this.metadata=null,this.addEventListener("click",this.openIframe),window.addEventListener("message",this.handleFrameMessages.bind(this))}get metadata(){return this._metadata?function(e){const t=document.createElement("textarea");return t.innerHTML=e,0===t.childNodes.length?"":t.childNodes[0].nodeValue}(this._metadata):this._metadata}set metadata(e){this._metadata=e}handleFrameMessages(e){let{origin:t,data:s}=e;try{const{action:e,payload:t}=JSON.parse(s),[,n]=e.split("::");switch(n){case le:this.disabled=!1,this.loading=!1;break;case de:case he:this.removeFrame()}this.emitEvent(n,t)}catch(e){console.error("Become: unable to read info from become popup",e),this.emitEvent(ce,e)}}emitEvent(e,t){const s=new CustomEvent("become:"+e,{detail:oe({},t)});this.dispatchEvent(s)}removeFrame(){const e=document.querySelector("become-frame");e&&e.remove()}openIframe(){this.disabled=!0,this.loading=!0,this.removeFrame();const e=document.createElement("become-frame");for(const t of["signupHost","userId","contractId","token","country","state"])this[t]&&e.setAttribute(t,this[t]);window.document.body.appendChild(e),setTimeout(()=>{this.disabled=!1,this.loading=!1},2e3)}async firstUpdated(){this.apiHost,this.clientId;try{setTimeout(()=>{this.loading=!1},1e3)}catch(e){setTimeout(()=>{this.loading=!1},1e3),console.error("Become: unable to read data for the client")}}render(){return R`
      <become-button-element
        ?disabled="${this.disabled}"
        ?loading="${this.loading}"
        color="${this.color}"
        language="${this.language}"
      ></become-button-element>
    `}}customElements.define("become-button",pe)},function(e,t,s){const n="https://unpkg.com/@webcomponents/webcomponentsjs@2.3.0/";window.WebComponents=window.WebComponents||{},window.WebComponents.root=window.WebComponents.root||n;const i=document.querySelector("script#webcomponentsLoader")||document.createElement("script");i.id="webcomponentsLoader",i.src=n+"webcomponents-loader.js",document.head.appendChild(i),WebComponents.ready?s(0):addEventListener("WebComponentsReady",()=>s(0))}]);