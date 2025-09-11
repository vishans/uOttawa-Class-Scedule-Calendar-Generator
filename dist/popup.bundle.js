/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 342:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


(function(){

  var
    buf,
    bufIdx = 0,
    hexBytes = [],
    i
  ;

  // Pre-calculate toString(16) for speed
  for (i = 0; i < 256; i++) {
    hexBytes[i] = (i + 0x100).toString(16).substr(1);
  }

  // Buffer random numbers for speed
  // Reduce memory usage by decreasing this number (min 16)
  // or improve speed by increasing this number (try 16384)
  uuid.BUFFER_SIZE = 4096;

  // Binary uuids
  uuid.bin = uuidBin;

  // Clear buffer
  uuid.clearBuffer = function() {
    buf = null;
    bufIdx = 0;
  };

  // Test for uuid
  uuid.test = function(uuid) {
    if (typeof uuid === 'string') {
      return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
    }
    return false;
  };

  // Node & Browser support
  var crypt0;
  if (typeof crypto !== 'undefined') {
    crypt0 = crypto;
  } else if( (typeof window !== 'undefined') && (typeof window.msCrypto !== 'undefined')) {
    crypt0 = window.msCrypto; // IE11
  }

  if (true) {
    crypt0 = crypt0 || __webpack_require__(575);
    module.exports = uuid;
  } else {}

  // Use best available PRNG
  // Also expose this so you can override it.
  uuid.randomBytes = (function(){
    if (crypt0) {
      if (crypt0.randomBytes) {
        return crypt0.randomBytes;
      }
      if (crypt0.getRandomValues) {
        if (typeof Uint8Array.prototype.slice !== 'function') {
          return function(n) {
            var bytes = new Uint8Array(n);
            crypt0.getRandomValues(bytes);
            return Array.from(bytes);
          };
        }
        return function(n) {
          var bytes = new Uint8Array(n);
          crypt0.getRandomValues(bytes);
          return bytes;
        };
      }
    }
    return function(n) {
      var i, r = [];
      for (i = 0; i < n; i++) {
        r.push(Math.floor(Math.random() * 256));
      }
      return r;
    };
  })();

  // Buffer some random bytes for speed
  function randomBytesBuffered(n) {
    if (!buf || ((bufIdx + n) > uuid.BUFFER_SIZE)) {
      bufIdx = 0;
      buf = uuid.randomBytes(uuid.BUFFER_SIZE);
    }
    return buf.slice(bufIdx, bufIdx += n);
  }

  // uuid.bin
  function uuidBin() {
    var b = randomBytesBuffered(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return b;
  }

  // String UUIDv4 (Random)
  function uuid() {
    var b = uuidBin();
    return hexBytes[b[0]] + hexBytes[b[1]] +
      hexBytes[b[2]] + hexBytes[b[3]] + '-' +
      hexBytes[b[4]] + hexBytes[b[5]] + '-' +
      hexBytes[b[6]] + hexBytes[b[7]] + '-' +
      hexBytes[b[8]] + hexBytes[b[9]] + '-' +
      hexBytes[b[10]] + hexBytes[b[11]] +
      hexBytes[b[12]] + hexBytes[b[13]] +
      hexBytes[b[14]] + hexBytes[b[15]]
    ;
  }

})();


/***/ }),

/***/ 575:
/***/ (() => {

/* (ignored) */

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/uuid-random/index.js
var uuid_random = __webpack_require__(342);
;// ./node_modules/ical-generator/dist/index.js
var b=(u=>(u.SECONDLY="SECONDLY",u.MINUTELY="MINUTELY",u.HOURLY="HOURLY",u.DAILY="DAILY",u.WEEKLY="WEEKLY",u.MONTHLY="MONTHLY",u.YEARLY="YEARLY",u))(b||{}),A=(u=>(u.SU="SU",u.MO="MO",u.TU="TU",u.WE="WE",u.TH="TH",u.FR="FR",u.SA="SA",u))(A||{});function o(a,t,e,n){if(a?.startsWith("/")&&(a=a.substr(1)),typeof t=="string"||t instanceof Date){let i=new Date(t),s=i.getUTCFullYear()+String(i.getUTCMonth()+1).padStart(2,"0")+i.getUTCDate().toString().padStart(2,"0");return a&&(s=i.getFullYear()+String(i.getMonth()+1).padStart(2,"0")+i.getDate().toString().padStart(2,"0")),e?s:a?(s+="T"+i.getHours().toString().padStart(2,"0")+i.getMinutes().toString().padStart(2,"0")+i.getSeconds().toString().padStart(2,"0"),s):(s+="T"+i.getUTCHours().toString().padStart(2,"0")+i.getUTCMinutes().toString().padStart(2,"0")+i.getUTCSeconds().toString().padStart(2,"0")+(n?"":"Z"),s)}else if(S(t)){let i=a?F(t)&&!t.tz()?t.clone().tz(a):t:n||e&&F(t)&&t.tz()?t:t.utc();return i.format("YYYYMMDD")+(e?"":"T"+i.format("HHmmss")+(n||a?"":"Z"))}else if(R(t)){let i=a?t.setZone(a):n||e&&t.zone.type!=="system"?t:t.setZone("utc");return i.toFormat("yyyyLLdd")+(e?"":"T"+i.toFormat("HHmmss")+(n||a?"":"Z"))}else{let i=t;if(a)i=typeof t.tz=="function"?t.tz(a):t;else if(!n)if(typeof t.utc=="function")i=t.utc();else throw new Error("Unable to convert dayjs object to UTC value: UTC plugin is not available!");return i.format("YYYYMMDD")+(e?"":"T"+i.format("HHmmss")+(n||a?"":"Z"))}}function E(a,t,e,n){let i="",s=n?.floating||!1;return n?.timezone&&(i=";TZID="+n.timezone,s=!0),t+i+":"+o(a,e,!1,s)}function r(a,t){return String(a).replace(t?/[\\"]/g:/[\\;,]/g,function(e){return"\\"+e}).replace(/(?:\r\n|\r|\n)/g,"\\n")}function v(a){return a.split(`\r
`).map(function(t){let e="",n=0;for(let i=0;i<t.length;i++){let s=t.charAt(i);s>="\uD800"&&s<="\uDBFF"&&(s+=t.charAt(++i));let k=new TextEncoder().encode(s).length;n+=k,n>74&&(e+=`\r
 `,n=k),e+=s}return e}).join(`\r
`)}function l(a,t,e){if(Array.isArray(t))a.x=t.map(n=>{if(Array.isArray(n))return n;if(typeof n.key!="string"||typeof n.value!="string")throw new Error("Either key or value is not a string!");if(n.key.substr(0,2)!=="X-")throw new Error("Key has to start with `X-`!");return[n.key,n.value]});else if(typeof t=="object")a.x=Object.entries(t).map(([n,i])=>{if(typeof n!="string"||typeof i!="string")throw new Error("Either key or value is not a string!");if(n.substr(0,2)!=="X-")throw new Error("Key has to start with `X-`!");return[n,i]});else if(typeof t=="string"&&typeof e=="string"){if(t.substr(0,2)!=="X-")throw new Error("Key has to start with `X-`!");a.x.push([t,e])}else return a.x.map(n=>({key:n[0],value:n[1]}))}function D(a){let t=a.x.map(([e,n])=>e.toUpperCase()+":"+r(n,!1)).join(`\r
`);return t.length?t+`\r
`:""}function p(a,t){let e=null;if(typeof t=="string"){let n=t.match(/^(.+) ?<([^>]+)>$/);n?e={name:n[1].trim(),email:n[2].trim()}:t.includes("@")&&(e={name:t.trim(),email:t.trim()})}else typeof t=="object"&&(e={name:t.name,email:t.email,mailto:t.mailto,sentBy:t.sentBy});if(!e&&typeof t=="string")throw new Error("`"+a+"` isn't formated correctly. See https://sebbo2002.github.io/ical-generator/develop/reference/interfaces/ICalOrganizer.html");if(!e)throw new Error("`"+a+"` needs to be a valid formed string or an object. See https://sebbo2002.github.io/ical-generator/develop/reference/interfaces/ICalOrganizer.html");if(!e.name)throw new Error("`"+a+".name` is empty!");return e}function d(a,t){let e=Object.values(a),n=String(t).toUpperCase();if(!n||!e.includes(n))throw new Error(`Input must be one of the following: ${e.join(", ")}`);return n}function h(a,t){if(a instanceof Date&&isNaN(a.getTime())||typeof a=="string"&&isNaN(new Date(a).getTime()))throw new Error(`\`${t}\` has to be a valid date!`);if(a instanceof Date||typeof a=="string"||R(a)&&a.isValid===!0||(S(a)||j(a))&&a.isValid())return a;throw new Error(`\`${t}\` has to be a valid date!`)}function N(a){return typeof a=="string"||a instanceof Date?new Date(a):R(a)?a.toJSDate():a.toDate()}function S(a){return a!=null&&a._isAMomentObject!=null}function F(a){return S(a)&&"tz"in a&&typeof a.tz=="function"}function j(a){return typeof a=="object"&&a!==null&&!(a instanceof Date)&&!S(a)&&!R(a)}function R(a){return typeof a=="object"&&a!==null&&"toJSDate"in a&&typeof a.toJSDate=="function"}function J(a){return a!==null&&typeof a=="object"&&"asSeconds"in a&&typeof a.asSeconds=="function"}function x(a){return a!==null&&typeof a=="object"&&"between"in a&&typeof a.between=="function"&&typeof a.toString=="function"}function g(a){return a?typeof a=="string"?a:a.toJSON():null}function C(a){let t="";return a<0&&(t="-",a*=-1),t+="P",a>=86400&&(t+=Math.floor(a/86400)+"D",a%=86400),!a&&t.length>1||(t+="T",a>=3600&&(t+=Math.floor(a/3600)+"H",a%=3600),a>=60&&(t+=Math.floor(a/60)+"M",a%=60),a>0?t+=a+"S":t.length<=2&&(t+="0S")),t}var O=(i=>(i.CHAIR="CHAIR",i.REQ="REQ-PARTICIPANT",i.OPT="OPT-PARTICIPANT",i.NON="NON-PARTICIPANT",i))(O||{}),M=(s=>(s.ACCEPTED="ACCEPTED",s.TENTATIVE="TENTATIVE",s.DECLINED="DECLINED",s.DELEGATED="DELEGATED",s.NEEDSACTION="NEEDS-ACTION",s))(M||{}),w=(s=>(s.INDIVIDUAL="INDIVIDUAL",s.GROUP="GROUP",s.RESOURCE="RESOURCE",s.ROOM="ROOM",s.UNKNOWN="UNKNOWN",s))(w||{}),f=class a{data;parent;constructor(t,e){if(this.data={name:null,email:"",mailto:null,sentBy:null,status:null,role:"REQ-PARTICIPANT",rsvp:null,type:null,delegatedTo:null,delegatedFrom:null,x:[]},this.parent=e,!this.parent)throw new Error("`event` option required!");if(!t.email)throw new Error("No value for `email` in ICalAttendee given!");t.name!==void 0&&this.name(t.name),t.email!==void 0&&this.email(t.email),t.mailto!==void 0&&this.mailto(t.mailto),t.sentBy!==void 0&&this.sentBy(t.sentBy),t.status!==void 0&&this.status(t.status),t.role!==void 0&&this.role(t.role),t.rsvp!==void 0&&this.rsvp(t.rsvp),t.type!==void 0&&this.type(t.type),t.delegatedTo!==void 0&&this.delegatedTo(t.delegatedTo),t.delegatedFrom!==void 0&&this.delegatedFrom(t.delegatedFrom),t.delegatesTo&&this.delegatesTo(t.delegatesTo),t.delegatesFrom&&this.delegatesFrom(t.delegatesFrom),t.x!==void 0&&this.x(t.x)}name(t){return t===void 0?this.data.name:(this.data.name=t||null,this)}email(t){return t?(this.data.email=t,this):this.data.email}mailto(t){return t===void 0?this.data.mailto:(this.data.mailto=t||null,this)}sentBy(t){return t?(this.data.sentBy=t,this):this.data.sentBy}role(t){return t===void 0?this.data.role:(this.data.role=d(O,t),this)}rsvp(t){return t===void 0?this.data.rsvp:t===null?(this.data.rsvp=null,this):(this.data.rsvp=!!t,this)}status(t){return t===void 0?this.data.status:t?(this.data.status=d(M,t),this):(this.data.status=null,this)}type(t){return t===void 0?this.data.type:t?(this.data.type=d(w,t),this):(this.data.type=null,this)}delegatedTo(t){return t===void 0?this.data.delegatedTo:t?(typeof t=="string"?this.data.delegatedTo=new a({email:t,...p("delegatedTo",t)},this.parent):t instanceof a?this.data.delegatedTo=t:this.data.delegatedTo=new a(t,this.parent),this.data.status="DELEGATED",this):(this.data.delegatedTo=null,this.data.status==="DELEGATED"&&(this.data.status=null),this)}delegatedFrom(t){return t===void 0?this.data.delegatedFrom:(t?typeof t=="string"?this.data.delegatedFrom=new a({email:t,...p("delegatedFrom",t)},this.parent):t instanceof a?this.data.delegatedFrom=t:this.data.delegatedFrom=new a(t,this.parent):this.data.delegatedFrom=null,this)}delegatesTo(t){let e=t instanceof a?t:this.parent.createAttendee(t);return this.delegatedTo(e),e.delegatedFrom(this),e}delegatesFrom(t){let e=t instanceof a?t:this.parent.createAttendee(t);return this.delegatedFrom(e),e.delegatedTo(this),e}x(t,e){if(t===void 0)return l(this.data);if(typeof t=="string"&&typeof e=="string")l(this.data,t,e);else if(typeof t=="object")l(this.data,t);else throw new Error("Either key or value is not a string!");return this}toJSON(){return Object.assign({},this.data,{delegatedTo:this.data.delegatedTo?.email()||null,delegatedFrom:this.data.delegatedFrom?.email()||null,x:this.x()})}toString(){let t="ATTENDEE";if(!this.data.email)throw new Error("No value for `email` in ICalAttendee given!");return t+=";ROLE="+this.data.role,this.data.type&&(t+=";CUTYPE="+this.data.type),this.data.status&&(t+=";PARTSTAT="+this.data.status),this.data.rsvp!==null&&(t+=";RSVP="+this.data.rsvp.toString().toUpperCase()),this.data.sentBy!==null&&(t+=';SENT-BY="mailto:'+this.data.sentBy+'"'),this.data.delegatedTo&&(t+=';DELEGATED-TO="'+this.data.delegatedTo.email()+'"'),this.data.delegatedFrom&&(t+=';DELEGATED-FROM="'+this.data.delegatedFrom.email()+'"'),this.data.name&&(t+=';CN="'+r(this.data.name,!0)+'"'),this.data.email&&this.data.mailto&&(t+=";EMAIL="+r(this.data.email,!1)),this.data.x.length&&(t+=";"+this.data.x.map(([e,n])=>e.toUpperCase()+"="+r(n,!1)).join(";")),t+=":MAILTO:"+r(this.data.mailto||this.data.email,!1)+`\r
`,t}};var V=(n=>(n.display="display",n.audio="audio",n.email="email",n))(V||{}),Y={end:"END",start:"START"},I=class{data;event;constructor(t,e){if(this.data={type:"display",trigger:-600,relatesTo:null,repeat:null,interval:null,attach:null,description:null,summary:null,attendees:[],x:[]},this.event=e,!e)throw new Error("`event` option required!");t.type!==void 0&&this.type(t.type),"trigger"in t&&t.trigger!==void 0&&this.trigger(t.trigger),"triggerBefore"in t&&t.triggerBefore!==void 0&&this.triggerBefore(t.triggerBefore),"triggerAfter"in t&&t.triggerAfter!==void 0&&this.triggerAfter(t.triggerAfter),t.repeat&&this.repeat(t.repeat),t.attach!==void 0&&this.attach(t.attach),t.description!==void 0&&this.description(t.description),t.summary!==void 0&&this.summary(t.summary),t.attendees!==void 0&&this.attendees(t.attendees),t.x!==void 0&&this.x(t.x)}type(t){if(t===void 0)return this.data.type;if(!t||!Object.keys(V).includes(t))throw new Error("`type` is not correct, must be either `display` or `audio`!");return this.data.type=t,this}trigger(t){if(t===void 0&&typeof this.data.trigger=="number")return-1*this.data.trigger;if(t===void 0)return this.data.trigger;if(typeof t=="number"&&isFinite(t))this.data.trigger=-1*t;else{if(!t||typeof t=="number")throw new Error("`trigger` is not correct, must be a finite number or a supported date!");this.data.trigger=h(t,"trigger")}return this}relatesTo(t){if(t===void 0)return this.data.relatesTo;if(!t)return this.data.relatesTo=null,this;if(!Object.values(Y).includes(t))throw new Error("`relatesTo` is not correct, must be either `START` or `END`!");return this.data.relatesTo=t,this}triggerAfter(t){return t===void 0?this.data.trigger:this.trigger(typeof t=="number"?-1*t:t)}triggerBefore(t){return t===void 0?this.trigger():this.trigger(t)}repeat(t){if(t===void 0)return this.data.repeat;if(!t)return this.data.repeat=null,this;if(typeof t!="object")throw new Error("`repeat` is not correct, must be an object!");if(typeof t.times!="number"||!isFinite(t.times))throw new Error("`repeat.times` is not correct, must be numeric!");if(typeof t.interval!="number"||!isFinite(t.interval))throw new Error("`repeat.interval` is not correct, must be numeric!");return this.data.repeat=t,this}attach(t){if(t===void 0)return this.data.attach;if(!t)return this.data.attach=null,this;let e=null;if(typeof t=="string")e={uri:t,mime:null};else if(typeof t=="object")e={uri:t.uri,mime:t.mime||null};else throw new Error("`attachment` needs to be a valid formed string or an object. See https://sebbo2002.github.io/ical-generator/develop/reference/classes/ICalAlarm.html#attach");if(!e.uri)throw new Error("`attach.uri` is empty!");return this.data.attach={uri:e.uri,mime:e.mime},this}description(t){return t===void 0?this.data.description:t?(this.data.description=t,this):(this.data.description=null,this)}summary(t){return t===void 0?this.data.summary:t?(this.data.summary=t,this):(this.data.summary=null,this)}createAttendee(t){if(t instanceof f)return this.data.attendees.push(t),t;typeof t=="string"&&(t={email:t,...p("data",t)});let e=new f(t,this);return this.data.attendees.push(e),e}attendees(t){return t?(t.forEach(e=>this.createAttendee(e)),this):this.data.attendees}x(t,e){if(t===void 0)return l(this.data);if(typeof t=="string"&&typeof e=="string")l(this.data,t,e);else if(typeof t=="object")l(this.data,t);else throw new Error("Either key or value is not a string!");return this}toJSON(){let t=this.trigger();return Object.assign({},this.data,{trigger:typeof t=="number"?t:g(t),x:this.x()})}toString(){let t=`BEGIN:VALARM\r
`;if(t+="ACTION:"+this.data.type.toUpperCase()+`\r
`,typeof this.data.trigger=="number"&&this.data.relatesTo===null?this.data.trigger>0?t+="TRIGGER;RELATED=END:"+C(this.data.trigger)+`\r
`:t+="TRIGGER:"+C(this.data.trigger)+`\r
`:typeof this.data.trigger=="number"?t+="TRIGGER;RELATED="+this.data.relatesTo?.toUpperCase()+":"+C(this.data.trigger)+`\r
`:t+="TRIGGER;VALUE=DATE-TIME:"+o(this.event.timezone(),this.data.trigger)+`\r
`,this.data.repeat){if(!this.data.repeat.times)throw new Error("No value for `repeat.times` in ICalAlarm given, but required for `interval`!");if(!this.data.repeat.interval)throw new Error("No value for `repeat.interval` in ICalAlarm given, but required for `repeat`!");t+="REPEAT:"+this.data.repeat.times+`\r
`,t+="DURATION:"+C(this.data.repeat.interval)+`\r
`}return this.data.type==="audio"&&this.data.attach&&this.data.attach.mime?t+="ATTACH;FMTTYPE="+r(this.data.attach.mime,!1)+":"+r(this.data.attach.uri,!1)+`\r
`:this.data.type==="audio"&&this.data.attach?t+="ATTACH;VALUE=URI:"+r(this.data.attach.uri,!1)+`\r
`:this.data.type==="audio"&&(t+=`ATTACH;VALUE=URI:Basso\r
`),this.data.type!=="audio"&&this.data.description?t+="DESCRIPTION:"+r(this.data.description,!1)+`\r
`:this.data.type!=="audio"&&(t+="DESCRIPTION:"+r(this.event.summary(),!1)+`\r
`),this.data.type==="email"&&this.data.summary?t+="SUMMARY:"+r(this.data.summary,!1)+`\r
`:this.data.type==="email"&&(t+="SUMMARY:"+r(this.event.summary(),!1)+`\r
`),this.data.type==="email"&&this.data.attendees.forEach(e=>{t+=e.toString()}),t+=D(this.data),t+=`END:VALARM\r
`,t}};var c=class{data;constructor(t){if(this.data={name:""},!t.name)throw new Error("No value for `name` in ICalCategory given!");this.name(t.name)}name(t){return t===void 0?this.data.name:(this.data.name=t,this)}toJSON(){return Object.assign({},this.data)}toString(){return r(this.data.name,!1)}};var L=(n=>(n.CONFIRMED="CONFIRMED",n.TENTATIVE="TENTATIVE",n.CANCELLED="CANCELLED",n))(L||{}),z=(i=>(i.FREE="FREE",i.TENTATIVE="TENTATIVE",i.BUSY="BUSY",i.OOF="OOF",i))(z||{}),U=(e=>(e.TRANSPARENT="TRANSPARENT",e.OPAQUE="OPAQUE",e))(U||{}),B=(n=>(n.PUBLIC="PUBLIC",n.PRIVATE="PRIVATE",n.CONFIDENTIAL="CONFIDENTIAL",n))(B||{}),y=class{data;calendar;constructor(t,e){if(this.data={id:uuid_random(),sequence:0,start:new Date,end:null,recurrenceId:null,timezone:null,stamp:new Date,allDay:!1,floating:!1,repeating:null,summary:"",location:null,description:null,organizer:null,attendees:[],alarms:[],categories:[],status:null,busystatus:null,priority:null,url:null,attachments:[],transparency:null,created:null,lastModified:null,class:null,x:[]},this.calendar=e,!e)throw new Error("`calendar` option required!");t.id&&this.id(t.id),t.sequence!==void 0&&this.sequence(t.sequence),t.start&&this.start(t.start),t.end!==void 0&&this.end(t.end),t.recurrenceId!==void 0&&this.recurrenceId(t.recurrenceId),t.timezone!==void 0&&this.timezone(t.timezone),t.stamp!==void 0&&this.stamp(t.stamp),t.allDay!==void 0&&this.allDay(t.allDay),t.floating!==void 0&&this.floating(t.floating),t.repeating!==void 0&&this.repeating(t.repeating),t.summary!==void 0&&this.summary(t.summary),t.location!==void 0&&this.location(t.location),t.description!==void 0&&this.description(t.description),t.organizer!==void 0&&this.organizer(t.organizer),t.attendees!==void 0&&this.attendees(t.attendees),t.alarms!==void 0&&this.alarms(t.alarms),t.categories!==void 0&&this.categories(t.categories),t.status!==void 0&&this.status(t.status),t.busystatus!==void 0&&this.busystatus(t.busystatus),t.priority!==void 0&&this.priority(t.priority),t.url!==void 0&&this.url(t.url),t.attachments!==void 0&&this.attachments(t.attachments),t.transparency!==void 0&&this.transparency(t.transparency),t.created!==void 0&&this.created(t.created),t.lastModified!==void 0&&this.lastModified(t.lastModified),t.class!==void 0&&this.class(t.class),t.x!==void 0&&this.x(t.x)}id(t){return t===void 0?this.data.id:(this.data.id=String(t),this)}uid(t){return t===void 0?this.id():this.id(t)}sequence(t){if(t===void 0)return this.data.sequence;let e=parseInt(String(t),10);if(isNaN(e))throw new Error("`sequence` must be a number!");return this.data.sequence=t,this}start(t){return t===void 0?(this.swapStartAndEndIfRequired(),this.data.start):(this.data.start=h(t,"start"),this)}end(t){return t===void 0?(this.swapStartAndEndIfRequired(),this.data.end):t===null?(this.data.end=null,this):(this.data.end=h(t,"end"),this)}swapStartAndEndIfRequired(){if(this.data.start&&this.data.end&&N(this.data.start).getTime()>N(this.data.end).getTime()){let t=this.data.start;this.data.start=this.data.end,this.data.end=t}}recurrenceId(t){return t===void 0?this.data.recurrenceId:t===null?(this.data.recurrenceId=null,this):(this.data.recurrenceId=h(t,"recurrenceId"),this)}timezone(t){return t===void 0&&this.data.timezone!==null?this.data.timezone:t===void 0?this.calendar.timezone():(this.data.timezone=t&&t!=="UTC"?t.toString():null,this.data.timezone&&(this.data.floating=!1),this)}stamp(t){return t===void 0?this.data.stamp:(this.data.stamp=h(t,"stamp"),this)}timestamp(t){return t===void 0?this.stamp():this.stamp(t)}allDay(t){return t===void 0?this.data.allDay:(this.data.allDay=!!t,this)}floating(t){return t===void 0?this.data.floating:(this.data.floating=!!t,this.data.floating&&(this.data.timezone=null),this)}repeating(t){if(t===void 0)return this.data.repeating;if(!t)return this.data.repeating=null,this;if(x(t)||typeof t=="string")return this.data.repeating=t,this;if(this.data.repeating={freq:d(b,t.freq)},t.count){if(!isFinite(t.count))throw new Error("`repeating.count` must be a finite number!");this.data.repeating.count=t.count}if(t.interval){if(!isFinite(t.interval))throw new Error("`repeating.interval` must be a finite number!");this.data.repeating.interval=t.interval}if(t.until!==void 0&&(this.data.repeating.until=h(t.until,"repeating.until")),t.byDay){let e=Array.isArray(t.byDay)?t.byDay:[t.byDay];this.data.repeating.byDay=e.map(n=>d(A,n))}if(t.byMonth){let e=Array.isArray(t.byMonth)?t.byMonth:[t.byMonth];this.data.repeating.byMonth=e.map(n=>{if(typeof n!="number"||n<1||n>12)throw new Error("`repeating.byMonth` contains invalid value `"+n+"`!");return n})}if(t.byMonthDay){let e=Array.isArray(t.byMonthDay)?t.byMonthDay:[t.byMonthDay];this.data.repeating.byMonthDay=e.map(n=>{if(typeof n!="number"||n<-31||n>31||n===0)throw new Error("`repeating.byMonthDay` contains invalid value `"+n+"`!");return n})}if(t.bySetPos){if(!this.data.repeating.byDay)throw"`repeating.bySetPos` must be used along with `repeating.byDay`!";let e=Array.isArray(t.bySetPos)?t.bySetPos:[t.bySetPos];this.data.repeating.bySetPos=e.map(n=>{if(typeof n!="number"||n<-366||n>366||n===0)throw"`repeating.bySetPos` contains invalid value `"+n+"`!";return n})}if(t.exclude){let e=Array.isArray(t.exclude)?t.exclude:[t.exclude];this.data.repeating.exclude=e.map((n,i)=>h(n,`repeating.exclude[${i}]`))}return t.startOfWeek&&(this.data.repeating.startOfWeek=d(A,t.startOfWeek)),this}summary(t){return t===void 0?this.data.summary:(this.data.summary=t?String(t):"",this)}location(t){if(t===void 0)return this.data.location;if(typeof t=="string")return this.data.location={title:t},this;if(t&&("title"in t&&!t.title||t?.geo&&(typeof t.geo.lat!="number"||!isFinite(t.geo.lat)||typeof t.geo.lon!="number"||!isFinite(t.geo.lon))||!("title"in t)&&!t?.geo))throw new Error("`location` isn't formatted correctly. See https://sebbo2002.github.io/ical-generator/develop/reference/classes/ICalEvent.html#location");return this.data.location=t||null,this}description(t){return t===void 0?this.data.description:t===null?(this.data.description=null,this):(typeof t=="string"?this.data.description={plain:t}:this.data.description=t,this)}organizer(t){return t===void 0?this.data.organizer:t===null?(this.data.organizer=null,this):(this.data.organizer=p("organizer",t),this)}createAttendee(t){if(t instanceof f)return this.data.attendees.push(t),t;typeof t=="string"&&(t={email:t,...p("data",t)});let e=new f(t,this);return this.data.attendees.push(e),e}attendees(t){return t?(t.forEach(e=>this.createAttendee(e)),this):this.data.attendees}createAlarm(t){let e=t instanceof I?t:new I(t,this);return this.data.alarms.push(e),e}alarms(t){return t?(t.forEach(e=>this.createAlarm(e)),this):this.data.alarms}createCategory(t){let e=t instanceof c?t:new c(t);return this.data.categories.push(e),e}categories(t){return t?(t.forEach(e=>this.createCategory(e)),this):this.data.categories}status(t){return t===void 0?this.data.status:t===null?(this.data.status=null,this):(this.data.status=d(L,t),this)}busystatus(t){return t===void 0?this.data.busystatus:t===null?(this.data.busystatus=null,this):(this.data.busystatus=d(z,t),this)}priority(t){if(t===void 0)return this.data.priority;if(t===null)return this.data.priority=null,this;if(t<0||t>9)throw new Error("`priority` is invalid, musst be 0 \u2264 priority \u2264 9.");return this.data.priority=Math.round(t),this}url(t){return t===void 0?this.data.url:(this.data.url=t?String(t):null,this)}createAttachment(t){return this.data.attachments.push(t),this}attachments(t){return t?(t.forEach(e=>this.createAttachment(e)),this):this.data.attachments}transparency(t){return t===void 0?this.data.transparency:t?(this.data.transparency=d(U,t),this):(this.data.transparency=null,this)}created(t){return t===void 0?this.data.created:t===null?(this.data.created=null,this):(this.data.created=h(t,"created"),this)}lastModified(t){return t===void 0?this.data.lastModified:t===null?(this.data.lastModified=null,this):(this.data.lastModified=h(t,"lastModified"),this)}class(t){return t===void 0?this.data.class:t===null?(this.data.class=null,this):(this.data.class=d(B,t),this)}x(t,e){return t===void 0?l(this.data):(typeof t=="string"&&typeof e=="string"&&l(this.data,t,e),typeof t=="object"&&l(this.data,t),this)}toJSON(){let t=null;return x(this.data.repeating)||typeof this.data.repeating=="string"?t=this.data.repeating.toString():this.data.repeating&&(t=Object.assign({},this.data.repeating,{until:g(this.data.repeating.until)||void 0,exclude:this.data.repeating.exclude?.map(e=>g(e))})),this.swapStartAndEndIfRequired(),Object.assign({},this.data,{start:g(this.data.start)||null,end:g(this.data.end)||null,recurrenceId:g(this.data.recurrenceId)||null,stamp:g(this.data.stamp)||null,created:g(this.data.created)||null,lastModified:g(this.data.lastModified)||null,repeating:t,x:this.x()})}toString(){let t="";if(t+=`BEGIN:VEVENT\r
`,t+="UID:"+this.data.id+`\r
`,t+="SEQUENCE:"+this.data.sequence+`\r
`,this.swapStartAndEndIfRequired(),t+="DTSTAMP:"+o(this.calendar.timezone(),this.data.stamp)+`\r
`,this.data.allDay?(t+="DTSTART;VALUE=DATE:"+o(this.timezone(),this.data.start,!0)+`\r
`,this.data.end&&(t+="DTEND;VALUE=DATE:"+o(this.timezone(),this.data.end,!0)+`\r
`),t+=`X-MICROSOFT-CDO-ALLDAYEVENT:TRUE\r
`,t+=`X-MICROSOFT-MSNCALENDAR-ALLDAYEVENT:TRUE\r
`):(t+=E(this.timezone(),"DTSTART",this.data.start,this.data)+`\r
`,this.data.end&&(t+=E(this.timezone(),"DTEND",this.data.end,this.data)+`\r
`)),x(this.data.repeating)||typeof this.data.repeating=="string"){let e=this.data.repeating.toString().replace(/\r\n/g,`
`).split(`
`).filter(n=>n&&!n.startsWith("DTSTART:")).join(`\r
`);!e.includes(`\r
`)&&!e.startsWith("RRULE:")&&(e="RRULE:"+e),t+=e.trim()+`\r
`}else this.data.repeating&&(t+="RRULE:FREQ="+this.data.repeating.freq,this.data.repeating.count&&(t+=";COUNT="+this.data.repeating.count),this.data.repeating.interval&&(t+=";INTERVAL="+this.data.repeating.interval),this.data.repeating.until&&(t+=";UNTIL="+o(this.calendar.timezone(),this.data.repeating.until,!1,this.floating())),this.data.repeating.byDay&&(t+=";BYDAY="+this.data.repeating.byDay.join(",")),this.data.repeating.byMonth&&(t+=";BYMONTH="+this.data.repeating.byMonth.join(",")),this.data.repeating.byMonthDay&&(t+=";BYMONTHDAY="+this.data.repeating.byMonthDay.join(",")),this.data.repeating.bySetPos&&(t+=";BYSETPOS="+this.data.repeating.bySetPos.join(",")),this.data.repeating.startOfWeek&&(t+=";WKST="+this.data.repeating.startOfWeek),t+=`\r
`,this.data.repeating.exclude&&(this.data.allDay?t+="EXDATE;VALUE=DATE:"+this.data.repeating.exclude.map(e=>o(this.calendar.timezone(),e,!0)).join(",")+`\r
`:(t+="EXDATE",this.timezone()?t+=";TZID="+this.timezone()+":"+this.data.repeating.exclude.map(e=>o(this.timezone(),e,!1,!0)).join(",")+`\r
`:t+=":"+this.data.repeating.exclude.map(e=>o(this.timezone(),e,!1,this.floating())).join(",")+`\r
`)));return this.data.recurrenceId&&(t+=E(this.timezone(),"RECURRENCE-ID",this.data.recurrenceId,this.data)+`\r
`),t+="SUMMARY:"+r(this.data.summary,!1)+`\r
`,this.data.transparency&&(t+="TRANSP:"+r(this.data.transparency,!1)+`\r
`),this.data.location&&"title"in this.data.location&&this.data.location.title&&(t+="LOCATION:"+r(this.data.location.title+(this.data.location.address?`
`+this.data.location.address:""),!1)+`\r
`,this.data.location.radius&&this.data.location.geo&&(t+="X-APPLE-STRUCTURED-LOCATION;VALUE=URI;"+(this.data.location.address?"X-ADDRESS="+r(this.data.location.address,!1)+";":"")+"X-APPLE-RADIUS="+r(this.data.location.radius,!1)+";X-TITLE="+r(this.data.location.title,!1)+":geo:"+r(this.data.location.geo?.lat,!1)+","+r(this.data.location.geo?.lon,!1)+`\r
`)),this.data.location?.geo?.lat&&this.data.location.geo.lon&&(t+="GEO:"+r(this.data.location.geo.lat,!1)+";"+r(this.data.location.geo.lon,!1)+`\r
`),this.data.description&&(t+="DESCRIPTION:"+r(this.data.description.plain,!1)+`\r
`,this.data.description.html&&(t+="X-ALT-DESC;FMTTYPE=text/html:"+r(this.data.description.html,!1)+`\r
`)),this.data.organizer&&(t+='ORGANIZER;CN="'+r(this.data.organizer.name,!0)+'"',this.data.organizer.sentBy&&(t+=';SENT-BY="mailto:'+r(this.data.organizer.sentBy,!0)+'"'),this.data.organizer.email&&this.data.organizer.mailto&&(t+=";EMAIL="+r(this.data.organizer.email,!1)),t+=":",this.data.organizer.email&&(t+="mailto:"+r(this.data.organizer.mailto||this.data.organizer.email,!1)),t+=`\r
`),this.data.attendees.forEach(function(e){t+=e.toString()}),this.data.alarms.forEach(function(e){t+=e.toString()}),this.data.categories.length>0&&(t+="CATEGORIES:"+this.data.categories.map(e=>e.toString()).join()+`\r
`),this.data.url&&(t+="URL;VALUE=URI:"+r(this.data.url,!1)+`\r
`),this.data.attachments.length>0&&this.data.attachments.forEach(e=>{t+="ATTACH:"+r(e,!1)+`\r
`}),this.data.status&&(t+="STATUS:"+this.data.status.toUpperCase()+`\r
`),this.data.busystatus&&(t+="X-MICROSOFT-CDO-BUSYSTATUS:"+this.data.busystatus.toUpperCase()+`\r
`),this.data.priority!==null&&(t+="PRIORITY:"+this.data.priority+`\r
`),t+=D(this.data),this.data.created&&(t+="CREATED:"+o(this.calendar.timezone(),this.data.created)+`\r
`),this.data.lastModified&&(t+="LAST-MODIFIED:"+o(this.calendar.timezone(),this.data.lastModified)+`\r
`),this.data.class&&(t+="CLASS:"+this.data.class.toUpperCase()+`\r
`),t+=`END:VEVENT\r
`,t}};var P=(m=>(m.PUBLISH="PUBLISH",m.REQUEST="REQUEST",m.REPLY="REPLY",m.ADD="ADD",m.CANCEL="CANCEL",m.REFRESH="REFRESH",m.COUNTER="COUNTER",m.DECLINECOUNTER="DECLINECOUNTER",m))(P||{}),T=class{data;constructor(t={}){this.data={prodId:"//sebbo.net//ical-generator//EN",method:null,name:null,description:null,timezone:null,source:null,url:null,scale:null,ttl:null,events:[],x:[]},t.prodId!==void 0&&this.prodId(t.prodId),t.method!==void 0&&this.method(t.method),t.name!==void 0&&this.name(t.name),t.description!==void 0&&this.description(t.description),t.timezone!==void 0&&this.timezone(t.timezone),t.source!==void 0&&this.source(t.source),t.url!==void 0&&this.url(t.url),t.scale!==void 0&&this.scale(t.scale),t.ttl!==void 0&&this.ttl(t.ttl),t.events!==void 0&&this.events(t.events),t.x!==void 0&&this.x(t.x)}prodId(t){if(!t)return this.data.prodId;if(typeof t=="string")return this.data.prodId=t,this;if(typeof t!="object")throw new Error("`prodid` needs to be a string or an object!");if(!t.company)throw new Error("`prodid.company` is a mandatory item!");if(!t.product)throw new Error("`prodid.product` is a mandatory item!");let e=(t.language||"EN").toUpperCase();return this.data.prodId="//"+t.company+"//"+t.product+"//"+e,this}method(t){return t===void 0?this.data.method:t?(this.data.method=d(P,t),this):(this.data.method=null,this)}name(t){return t===void 0?this.data.name:(this.data.name=t?String(t):null,this)}description(t){return t===void 0?this.data.description:(this.data.description=t?String(t):null,this)}timezone(t){return t===void 0?this.data.timezone?.name||null:(t==="UTC"?this.data.timezone=null:typeof t=="string"?this.data.timezone={name:t}:t===null?this.data.timezone=null:this.data.timezone=t,this)}source(t){return t===void 0?this.data.source:(this.data.source=t||null,this)}url(t){return t===void 0?this.data.url:(this.data.url=t||null,this)}scale(t){return t===void 0?this.data.scale:(t===null?this.data.scale=null:this.data.scale=t.toUpperCase(),this)}ttl(t){return t===void 0?this.data.ttl:(J(t)?this.data.ttl=t.asSeconds():t&&t>0?this.data.ttl=t:this.data.ttl=null,this)}createEvent(t){let e=t instanceof y?t:new y(t,this);return this.data.events.push(e),e}events(t){return t?(t.forEach(e=>this.createEvent(e)),this):this.data.events}clear(){return this.data.events=[],this}x(t,e){if(t===void 0)return l(this.data);if(typeof t=="string"&&typeof e=="string")l(this.data,t,e);else if(typeof t=="object")l(this.data,t);else throw new Error("Either key or value is not a string!");return this}toJSON(){return Object.assign({},this.data,{timezone:this.timezone(),events:this.data.events.map(t=>t.toJSON()),x:this.x()})}length(){return this.data.events.length}toString(){let t="";return t=`BEGIN:VCALENDAR\r
VERSION:2.0\r
`,t+="PRODID:-"+this.data.prodId+`\r
`,this.data.url&&(t+="URL:"+this.data.url+`\r
`),this.data.source&&(t+="SOURCE;VALUE=URI:"+this.data.source+`\r
`),this.data.scale&&(t+="CALSCALE:"+this.data.scale+`\r
`),this.data.method&&(t+="METHOD:"+this.data.method+`\r
`),this.data.name&&(t+="NAME:"+this.data.name+`\r
`,t+="X-WR-CALNAME:"+this.data.name+`\r
`),this.data.description&&(t+="X-WR-CALDESC:"+this.data.description+`\r
`),this.data.timezone?.generator&&[...new Set([this.timezone(),...this.data.events.map(n=>n.timezone())])].filter(n=>n!==null&&!n.startsWith("/")).forEach(n=>{if(!this.data.timezone?.generator)return;let i=this.data.timezone.generator(n);i&&(t+=i.replace(/\r\n/g,`
`).replace(/\n/g,`\r
`).trim()+`\r
`)}),this.data.timezone?.name&&(t+="TIMEZONE-ID:"+this.data.timezone.name+`\r
`,t+="X-WR-TIMEZONE:"+this.data.timezone.name+`\r
`),this.data.ttl&&(t+="REFRESH-INTERVAL;VALUE=DURATION:"+C(this.data.ttl)+`\r
`,t+="X-PUBLISHED-TTL:"+C(this.data.ttl)+`\r
`),this.data.events.forEach(e=>t+=e.toString()),t+=D(this.data),t+="END:VCALENDAR",v(t)}};function H(a){return new T(a)}var It=H;
//# sourceMappingURL=index.js.map
;// ./helper.js

// --- overhaul ----

class Class{
    constructor(className){
        this.className = className;
        this.components = null;
    }

    getSubjectCode(){
        return this.className.match(/[A-Z]{3}/)[0];
    }

    getCourseCode(){
        return this.className.match(/\d{3,4}/)[0];
    }

    getCourseName(){
        return this.className.split("-").pop().trim();
    }

    setComponents(components){
        this.components = components;
    }

}

class Component{
    constructor(number, section, component, daysNTimes, room, instructor, startEndDate){
        this.number = number;
        this.section = section;
        this.component = component;
        this.daysNTimes = daysNTimes;
        this.room = room;
        this.instructor = instructor;
        
        // only match the date range
        const matches = startEndDate.match(/\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{2}\/\d{4}/g);
        this.startEndDate = matches[0];
    }


      // the date when the component starts in the semester
      getStartDate(){
          return this.startEndDate.match(/\b\d{2}\/\d{2}\/\d{4}\b/g)[0];
      }

      // the date when the component ends in the semester
      getEndDate(){
          return this.startEndDate.match(/\b\d{2}\/\d{2}\/\d{4}\b/g)[1];
      }

    static toDateObject(text, language){

          // English date (MM/DD/YYYY)
          let monthIndex = 0;
          let dayIndex = 1;

          // Date francaise
          if(language == "Fr"){
            // (DD/MM/YYYY)
            monthIndex = 1;
            dayIndex = 0;

          }

          const startDateComponents = text.split("/");
          const year = Number(startDateComponents[2]);
          const month = Number(startDateComponents[monthIndex]) - 1; // The date object has month range 0-11 (which i find weird)
          const day = Number(startDateComponents[dayIndex]);

          return new Date(year, month, day);
      }

    // get a Date object of when the first day of this component is
    getStart(){
        // const startDateComponents = this.getStartDate().split("/");
        // const year = Number(startDateComponents[2]);
        // const month = Number(startDateComponents[0]) - 1; // The date object has month range 0-11 (which i find weird)
        // const day = Number(startDateComponents[1]);

        // const startDate = new Date(year, month, day);
        const startDate = Component.toDateObject(this.getStartDate(), this.getLanguage());

        const week = Array.from({length: 7}, (_, i) => i);
        let i = startDate.getDay();

        let count = 0;
        const stopDay = this.getDay();
        console.log(`Index day is ${i}`);
        console.log(`Stop day is ${stopDay}`);
        while(true){
            if(i == stopDay){
                break
            }

            count++;
            i = (i + 1) % 7
            
        }
        console.log(`count is ${count}`);
        

        // console.log(startDate);
        startDate.setDate(startDate.getDate() + count);
        
        let _, hour, minute, period;

        const timeStr = this.daysNTimes.match(/\b\d{1,2}:\d{2}(?:AM|PM)\b/g);
        if(timeStr){
            const match = timeStr[0].match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

            [_, hour, minute, period] = match;
            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);

            if (period === "PM" && hour !== 12) hour += 12;
            if (period === "AM" && hour === 12) hour = 0;

            startDate.setHours(hour, minute, 0, 0);
        }else{
            console.log(this.daysNTimes)
            let matchStr = this.daysNTimes.match(/(\d{2}):(\d{2})/g)[0];
            let match = /(\d{2}):(\d{2})/.exec(matchStr);
            console.log(`match: ${match}`);
            [_, hour, minute] = match;
            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);

            startDate.setHours(hour, minute, 0, 0);
        }

        console.log(`hour ${hour}`);
        console.log(`minute ${minute}`);
        console.log(startDate.toLocaleString("en-CA", { timeZone: "America/Toronto" }));
        
        return startDate;
    }

    // get a Date object of when the component ends (on the first day it started)
    getEnd(){
        // const startDateComponents = this.getStartDate().split("/");
        // const year = Number(startDateComponents[2]);
        // const month = Number(startDateComponents[0]) - 1; // The date object has month range 0-11 (which i find weird)
        // const day = Number(startDateComponents[1]);

        // const startDate = new Date(year, month, day);
        const startDate = Component.toDateObject(this.getStartDate(), this.getLanguage());

        const week = Array.from({length: 7}, (_, i) => i);
        let i = startDate.getDay();

        let count = 0;
        const stopDay = this.getDay();
        console.log(`Index day is ${i}`);
        console.log(`Stop day is ${stopDay}`);
        while(true){
            if(i == stopDay){
                break
            }

            count++;
            i = (i + 1) % 7
            
        }
        console.log(`count is ${count}`);
        

        // console.log(startDate);
        startDate.setDate(startDate.getDate() + count);
        
        let _, hour, minute, period;

        const timeStr = this.daysNTimes.match(/\b\d{1,2}:\d{2}(?:AM|PM)\b/g);
        if(timeStr){
            const match = timeStr[1].match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

            [_, hour, minute, period] = match;
            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);

            if (period === "PM" && hour !== 12) hour += 12;
            if (period === "AM" && hour === 12) hour = 0;

            startDate.setHours(hour, minute, 0, 0);
        }else{
            console.log(this.daysNTimes)
            let matchStr = this.daysNTimes.match(/(\d{2}):(\d{2})/g)[1];
            let match = /(\d{2}):(\d{2})/.exec(matchStr);
            console.log(`match: ${match}`);
            [_, hour, minute] = match;
            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);

            startDate.setHours(hour, minute, 0, 0);
        }

        console.log(`hour ${hour}`);
        console.log(`minute ${minute}`);
        console.log(startDate.toLocaleString("en-CA", { timeZone: "America/Toronto" }));
        
        return startDate;
    }


      // get the day of the week when the component happens
      // like the day of the lecture/lab/tutorial
      getDay(){

          const weekdayMap = {
              Su: 0,
              Mo: 1,
              Tu: 2,
              We: 3,
              Th: 4,
              Fr: 5,
              Sa: 6,

              Dim: 0,
              Lun: 1,
              Mar: 2,
              Mer: 3,
              Jeu: 4,
              Ven: 5,
              Sam: 6
          };

          let  result = weekdayMap[this.daysNTimes.slice(0, 2)];
          if (result){
            return result
          }
          
          // Francais
          return weekdayMap[this.daysNTimes.slice(0, 3)];


      }

    // get the language of the component (either "En" or "Fr")
    // This depends on the language setting on uoZone
    getLanguage(){
        const keywords = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

        const found = keywords.some(keyword => this.daysNTimes.includes(keyword));

        if(found){
            return "Fr";
        }

        return "En"
    }
}

// keep
function parseClass(text){

    let components = [];
    // split text in lines
    let lines = text.split(/[\n][\n\r]*/);

    // filter array, i.e get rid of empty strings and whitespaces/tabs
    lines = lines.filter(str => str.trim() != "");

    console.log(lines);
    
    let section = '';
    let component = '';
    let number = '';

    let index = 0;
    let current = '';
    let captured = false;
    while(index < lines.length){
        let daysNTimes = ''
        let room = '';
        let instructor = '';
        let startEndDate = '';

        current = lines[index];

        if(/^\d{4}$/.test(current)){ // Look for class Number
            number = current;
            // Next should be the section
            section = lines[++index];

            // And then component
            component = lines[++index];

            // Then days and times
            daysNTimes = lines[++index];
            
            // Room (but really it's the location)
            room = lines[++index];

            // Instructor
            instructor = lines[++index];
            // If there are many instructors, there might be more names on the next line
            while(lines[index].includes(",")){ // This works for now, might need to look into better parsing
                                              // strat if something similar happens
                instructor += lines[++index]
            }

            // Start and end date
            startEndDate = lines[++index]

            captured = true;

        }else if( 
            /[A-Za-z]{2}\s\d{1,2}:\d{2}[AP]M\s-\s\d{1,2}:\d{2}[AP]M/
            .test(current) ||
            /^[A-Za-z]{3}\s\d{1,2}:\d{2}\s-\s\d{1,2}:\d{2}$/
            .test(current)
        ){

            // Then days and times
            daysNTimes = lines[index];
            
            // Room (but really it's the location)
            room = lines[++index];

            // Instructor
            instructor = lines[++index];
            // If there are many instructors, there might be more names on the next line
            while(lines[index].includes(",")){ // This works for now, might need to look into better parsing
                                              // strat if something similar happens
                instructor += lines[++index]
            }

            // Start and end date
            startEndDate = lines[++index]

            captured = true;
        }

        index++;

        if (captured){
            components.push(
                new Component(
                    number, 
                    section,
                    component,
                    daysNTimes, 
                    room,
                    instructor,
                    startEndDate
                )
            );
            // console.log('====');
            // console.log(section);
            // console.log(component);
            // console.log(daysNTimes);
            // console.log(room);
            // console.log(instructor);
            // console.log(startEndDate);
            // console.log('====');
            // console.log('\n\n');
        }

        captured = false;
        
    }

    // console.log(section);
    // console.log(component);
    // console.log(daysNTimes);
    // console.log(room);
    // console.log(instructor);
    // console.log(startEndDate);
    // console.log('\n\n\n');
    return components;

}

function parseAllClassNames(text){

    let lines = text.split(/[\n][\n\r]*/);

    // filter array, i.e get rid of empty strings and whitespaces/tabs
    lines = lines.filter(str => str.trim() != "");

    const names = [];
    for(const line of lines){
        const match = line.match(/[A-Z]{3}\s\d{3,4}\s-\s.+/gm);
        if(match){
            names.push(match[0]);

        }
    }

    return names;
}
;// ./popup.js



var filename = 'calendar.ics'

let state = {
    title: null,
    isListView: null,
};

function isRightPage(){
    return state.isListView && (state.title == "My Class Schedule" || state.title == "Votre horaire cours") ;
}

document.addEventListener("DOMContentLoaded", async () => {
    // get the current active tab's URL
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (tab && tab.url) {
      let currentUrl = tab.url;
      console.log("current URL:", currentUrl);
  
      // check if a substring is in the URL
      if (currentUrl.includes("uocampus.uottawa.ca")) {
        let response = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: ()=>{
                const pageTitleHeader = document.querySelector("#pagetitleheader .titletext");
                const iframe = document.getElementById("ptifrmtgtframe"); // Select the iframe

                let isListView = null;
                if(iframe){
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

                    if (iframeDoc) {
                        isListView = iframeDoc.querySelector('input[type="radio"]').checked;
                    }
                }

                return {title: pageTitleHeader.outerText, isListView}

            }
        });

        state.title = response[0].result.title;
        state.isListView = response[0].result.isListView;
        console.log(state.title);

        if(isRightPage()){
            const overlay = document.getElementById('overlay');
            overlay.style.display = 'none';
        }
      } else {
        console.log("The URL does not contain uottawa's url.");
      }
    } else {
      console.log("Unable to retrieve the current tab's URL.");
    }
});

document.addEventListener('DOMContentLoaded', async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getSemeseterInfo 
    });

    if(!isRightPage()) return;
    if(response[0].result === undefined) return;

    const infos = response[0].result[1].split('|').slice(0,2);

    let downloadLink = infos[0].trim().split(' ').join('-');

    console.log(downloadLink);
    
    filename = downloadLink + '.ics';

    const textbox = document.getElementById('file-name');
    textbox.value = filename;

});

document.getElementById("scrape-btn").addEventListener("click", async () => {
    console.log("Inside scrape");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeDataFromPage
    });

    const semester = response[0].result.meta[1];
    console.log(response[0].result.meta)
    console.log(response[0].result.data)
    const text = response[0].result.data.join("") + "#"; // add a # at the end make it easier to grab the last block

    let regex = /(Class Nbr|Nº cours)[\s\S]*?(?=Class Nbr|Nº cours|#)/gm;
    console.log(text)

    const blocks = text.match(regex);

    console.log(`The value of blocks is ${blocks}`);

    const title_regex = /[A-Z]{3}.*-.*/gm;
    const titles = text.match(title_regex);

    let index = 0;

    const includeCourseName = document.getElementById('include-course').checked;
    const includeSectionNo = document.getElementById('include-section').checked;
    const includeComponent = document.getElementById('include-component').checked;
    const multipleCals = document.getElementById('multiple-cals').checked;

   const cals = new Map();

    cals.set("default", 
             It({ domain: 'uoCal', name: 'default', timezone: false }));

    // TODO: 
    // include flexible custom mode with $var replacable variable (nice to have, not critical)

    const times = [];
    const classes = [];

    const classNames = parseAllClassNames(text);
    let classIndex = 0;
    for(let block of blocks){
    console.log('####!!!!')
    // console.log(block);
    const components = parseClass(block);
    const cls = new Class(classNames[classIndex++]);
    cls.setComponents(components);
    console.log('class component =')
    console.table(cls.components);

    console.table(cls);
    classes.push(cls);
    console.log('####!!!!')

    }

    console.table(classes);

    // a class consists of one or more components
    // a component could be a lecture, tutorial, lab...
    for(let cls of classes){
        for(let component of cls.components){
            let eventName = cls.getSubjectCode() + ' ' + cls.getCourseCode();
            let section = "";
            let component_ = "";
            let fullCourseName = "";

            if(component.daysNTimes == "N/A" || component.room == "N/A" ||
               component.daysNTimes == "S/O" || component.room == "S/O"
            ){
                continue;
            }

            if(includeSectionNo){
                section = component.section;
            }

            if(includeComponent){
                component_ = (includeSectionNo ? "-": "") +component.component;
            }

            if(includeCourseName){
                // include full course name
                fullCourseName = `- ${cls.getCourseName()} `;

            }

            eventName +=  ` ${fullCourseName}(${section}${component_})`;

            let currentCal;
            if(!multipleCals){
                currentCal = cals.get("default")
            }else{
                if(!cals.has(component_)){
                    cals.set(component_, 
                            It({ domain: 'uoCal', name: component_, timezone: false }));
                }

                currentCal = cals.get(component_);
            }

            currentCal.createEvent({
                start: component.getStart(),
                end: component.getEnd(),
                summary: eventName, //cls.getCourseName(), //+ component.component,       
                description: component.instructor, 
                location:  component.room, 
                repeating: {
                    freq: 'WEEKLY',         
                    interval: 1,            
                    until: Component.toDateObject(component.getEndDate(), component.getLanguage())
                }
            });

        }

    }



    for(const [key, value] of cals){
        if(multipleCals && key === "default") continue;

        let calString = value.toString();

        let calStringLines = calString.split('\n');
        console.log(calString);

        
        console.log(calStringLines);
        const blob = new Blob([calString], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);

        // Create an anchor element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        
        const textbox = document.getElementById('file-name');
        link.download = textbox.value;

        if(multipleCals){
            console.log(`Adding components ${key} at the end`);
            link.download = `(${key.slice(1)})` + link.download;
            console.log(link.download);
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        URL.revokeObjectURL(url);
    }
});

function scrapeDataFromPage() {
    const data = [];
    let meta;
    const iframe = document.getElementById("ptifrmtgtframe"); // Select the iframe

    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDoc) {
            iframeDoc.querySelectorAll(".PSGROUPBOXWBO").forEach(el => {
                data.push(el.innerText.trim());
            });

            const metaElements = iframeDoc.querySelectorAll("span.PABOLDTEXT");
            meta = Array.from(metaElements).map(el => el.textContent);
            
            

            console.log("Scraped data from iframe:", data);
        } else {
            console.log("Iframe document is not accessible.");
        }
    } else {
        console.log("Iframe not found.");
    }

    return {meta,data};
}

function getSemeseterInfo() {
   
    let meta;
    const iframe = document.getElementById("ptifrmtgtframe"); // Select the iframe

    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDoc) {

            const metaElements = iframeDoc.querySelectorAll("span.PABOLDTEXT");
            meta = Array.from(metaElements).map(el => el.textContent);
            
            

            console.log("Scraped data from iframe:", meta);
        } else {
            console.log("Iframe document is not accessible.");
        }
    } else {
        console.log("Iframe not found.");
    }

   
    return meta;
}

})();

/******/ })()
;