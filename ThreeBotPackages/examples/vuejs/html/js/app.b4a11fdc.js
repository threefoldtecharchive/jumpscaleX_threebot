(function(t){function e(e){for(var r,a,i=e[0],u=e[1],s=e[2],c=0,f=[];c<i.length;c++)a=i[c],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);p&&p(e);while(f.length)f.shift()();return l.push.apply(l,s||[]),n()}function n(){for(var t,e=0;e<l.length;e++){for(var n=l[e],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(l.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={app:0},l=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/vuejs/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var s=0;s<i.length;s++)e(i[s]);var p=u;l.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"56d7":function(t,e,n){"use strict";n.r(e);var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t._v("\n  Hello to App\n  "),n("br"),n("router-link",{attrs:{to:"/hello"}},[t._v("Go to Hello world")]),n("br"),n("router-link",{attrs:{to:"/test"}},[t._v("Go to Test Page")]),n("router-view"),n("br")],1)},l=[],a={name:"app"},i=a,u=(n("034f"),n("2877")),s=Object(u["a"])(i,o,l,!1,null,null,null),p=s.exports,c=n("8c4f"),f=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},_=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"hello"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("p",[t._v("This is the main page")])])}],d={name:"HelloWorld",props:{msg:String}},h=d,v=Object(u["a"])(h,f,_,!1,null,null,null),g=v.exports,b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  Test getting some data from actor\n  "),n("br"),t._l(t.people_info,(function(e){return n("li",{key:e},[t._v("name: "+t._s(e.myname))])})),t._l(t.people_info,(function(e){return n("li",{key:e},[t._v("job: "+t._s(e.job))])})),t._l(t.people_info,(function(e){return n("li",{key:e},[t._v("aboutme: "+t._s(e.aboutme))])}))],2)},m=[],y=n("bc3a"),j=n.n(y);Object({NODE_ENV:"production",BASE_URL:"/vuejs/"}).NODE_TLS_REJECT_UNAUTHORIZED="0",j.a.defaults.headers.post["Content-Type"]="application/json";const w="https://172.17.0.2/web/gedis/http/vuejs";var O={data(){var t={};return{people_info:t}},methods:{async callActorWithArgs(t,e){let n=()=>j.a.post(`${w}/${t}`,{args:e}),r=await n();return r.data},async ping(){console.log("PING: ",await this.callActorWithArgs("ping",{}))},async get_people(){let t=await this.callActorWithArgs("get_info",{});this.people_info=t}},mounted(){this.ping(),this.get_people()}},E=O,x=Object(u["a"])(E,b,m,!1,null,null,null),T=x.exports;r["a"].config.productionTip=!1,r["a"].use(c["a"]);const A=[{path:"/hello",component:g},{path:"/test",component:T}],P=new c["a"]({routes:A});new r["a"]({render:t=>t(p),router:P}).$mount("#app")},"64a9":function(t,e,n){},cf05:function(t,e,n){t.exports=n.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.b4a11fdc.js.map