(function(t){function e(e){for(var s,r,i=e[0],l=e[1],c=e[2],d=0,f=[];d<i.length;d++)r=i[d],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&f.push(n[r][0]),n[r]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],s=!0,r=1;r<a.length;r++){var i=a[r];0!==n[i]&&(s=!1)}s&&(o.splice(e--,1),t=l(l.s=a[0]))}return t}var s={},r={app:0},n={app:0},o=[];function i(t){return l.p+"js/"+({"capacity-page":"capacity-page","chat-page":"chat-page","token-page":"token-page"}[t]||t)+"."+{"capacity-page":"9bfd6839","chat-page":"391b6be3","token-page":"a32a9e85"}[t]+".js"}function l(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a={"capacity-page":1,"chat-page":1,"token-page":1};r[t]?e.push(r[t]):0!==r[t]&&a[t]&&e.push(r[t]=new Promise(function(e,a){for(var s="css/"+({"capacity-page":"capacity-page","chat-page":"chat-page","token-page":"token-page"}[t]||t)+"."+{"capacity-page":"24c1e69b","chat-page":"d9f4ced9","token-page":"8b5fefc0"}[t]+".css",n=l.p+s,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var c=o[i],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===s||d===n))return e()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){c=f[i],d=c.getAttribute("data-href");if(d===s||d===n)return e()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=e,u.onerror=function(e){var s=e&&e.target&&e.target.src||n,o=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=s,delete r[t],u.parentNode.removeChild(u),a(o)},u.href=n;var p=document.getElementsByTagName("head")[0];p.appendChild(u)}).then(function(){r[t]=0}));var s=n[t];if(0!==s)if(s)e.push(s[2]);else{var o=new Promise(function(e,a){s=n[t]=[e,a]});e.push(s[2]=o);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=i(t);var f=new Error;c=function(e){d.onerror=d.onload=null,clearTimeout(u);var a=n[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",f.name="ChunkLoadError",f.type=s,f.request=r,a[1](f)}n[t]=void 0}};var u=setTimeout(function(){c({type:"timeout",target:d})},12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(e)},l.m=t,l.c=s,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)l.d(a,s,function(e){return t[e]}.bind(null,s));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=e,c=c.slice();for(var f=0;f<c.length;f++)e(c[f]);var u=d;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0dc3":function(t,e,a){"use strict";var s=a("9c70"),r=a.n(s);r.a},1108:function(t,e,a){"use strict";var s=a("b545"),r=a.n(s);r.a},"13e3":function(t,e,a){},"17cd":function(t,e,a){"use strict";var s=a("4577"),r=a.n(s);r.a},"2e7f":function(t,e,a){"use strict";var s=a("fdd8"),r=a.n(s);r.a},"3bf4":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"tokenpricegraph",staticStyle:{height:"100%",position:"relative"}},[a("v-card",[a("v-card-title",{staticClass:"primary py-3 mb-5 white--text",attrs:{"primary-title":""}},[a("v-row",{staticClass:"pl-2"},[a("v-icon",{attrs:{left:"",small:"",color:"white"}},[t._v("fas fa-coins")]),t._v("\n          Daily Token Price\n          "),a("v-spacer"),a("v-btn",{attrs:{small:"",text:"",color:"white"}},[t._v("1 H")]),a("v-btn",{attrs:{small:"",text:"",color:"white"}},[t._v("12 H")]),a("v-btn",{attrs:{small:"",text:"",color:"white"}},[t._v("1 D")]),a("v-btn",{attrs:{small:"",text:"",color:"white"}},[t._v("1 W")]),a("v-btn",{attrs:{small:"",text:"",color:"white"}},[t._v("1 M")]),a("v-btn",{attrs:{small:"",text:"",color:"white"}},[t._v("6 M")]),a("v-btn",{staticClass:"secondary darken-2 ",attrs:{small:"",text:"",color:"white"}},[t._v("1 Y")]),a("v-btn",{attrs:{small:"",text:"",color:"white"}},[t._v("ALL")])],1)],1),a("v-card-text",[a("p",{staticClass:"display-1"},[t._v("$0.134 "),a("small",{staticClass:"red--text body-1"},[t._v("- $12,61 (0,1382%)")])]),a("p",{staticClass:"font-weight-bold mb-0 secondary--text"},[t._v("High: $0.145")]),a("p",{staticClass:"font-weight-bold mb-0 red--text"},[t._v("Low: $0.117")]),a("lineGraph",{staticStyle:{"max-height":"100%",position:"relative"},attrs:{"chart-data":t.dataCollection}})],1)],1)],1)},r=[],n=a("1fca");const{reactiveProp:o}=n["b"];var i,l,c={extends:n["a"],mixins:[o],data(){return{gradient:null}},mounted(){this.gradient=this.$refs.canvas.getContext("2d").createLinearGradient(0,0,0,400),this.gradient.addColorStop(0,this.$vuetify.theme.currentTheme.secondary),this.gradient.addColorStop(1,"rgba(255,255,255,0.25)"),this.renderChart(this.chartData,{elements:{line:{backgroundColor:this.gradient,borderColor:this.$vuetify.theme.currentTheme.secondary,fill:!0,borderWidth:5,tension:0},point:{borderWidth:0}},scales:{yAxes:[{display:!1}],xAxes:[{gridLines:{display:!1}}]},legend:{display:!1},maintainAspectRatio:!1,aspectRatio:4})},computed:{},methods:{}},d=c,f=(a("17cd"),a("2877")),u=Object(f["a"])(d,i,l,!1,null,"50279367",null),p=u.exports,v={name:"tokenpricegraph",components:{lineGraph:p},props:[],data(){return{dataCollection:{labels:["Jan","Feb","Mar","Apr","May","Jun"],datasets:[{data:[2,1,3,5,9,12]}]}}}},m=v,h=(a("3cc8"),a("6544")),b=a.n(h),g=a("8336"),x=a("b0af"),y=a("99d9"),_=a("132d"),k=a("0fd9"),j=a("2fa4"),C=Object(f["a"])(m,s,r,!1,null,"8334c8ee",null);e["a"]=C.exports;b()(C,{VBtn:g["a"],VCard:x["a"],VCardText:y["b"],VCardTitle:y["c"],VIcon:_["a"],VRow:k["a"],VSpacer:j["a"]})},"3cc8":function(t,e,a){"use strict";var s=a("bfa2"),r=a.n(s);r.a},4577:function(t,e,a){},4678:function(t,e,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(t){var e=n(t);return a(e)}function n(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}r.keys=function(){return Object.keys(s)},r.resolve=n,t.exports=r,r.id="4678"},"4aac":function(t,e,a){},"4fba":function(t,e,a){"use strict";var s=a("dcf7"),r=a.n(s);r.a},"56d7":function(t,e,a){"use strict";a.r(e);var s=a("2b0e"),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{attrs:{dark:""}},[s("v-navigation-drawer",{staticClass:"primary rounded",attrs:{"mini-variant":"",app:"",dark:""}},[s("v-layout",{attrs:{column:"","fill-height":"","justify-end":""}},[s("div",[s("v-toolbar",{staticClass:"py-3",attrs:{color:"secondary darken-2 "}},[s("v-badge",{attrs:{bottom:"",right:"",overlap:"",color:"primary"},scopedSlots:t._u([{key:"badge",fn:function(){return[s("v-icon",{attrs:{size:"12",dark:""}},[t._v(t._s(t.$route.meta.icon))])]},proxy:!0}])},[s("v-avatar",[s("v-img",{attrs:{src:a("b640")}})],1)],1)],1)],1),s("div",t._l(t.routes.filter(function(t){return"top"==t.meta.position}),function(e,a){return s("v-list-item",{key:a,attrs:{to:e,"active-class":"secondary--text"}},[s("v-list-item-icon",[s("v-icon",[t._v(t._s(e.meta.icon))])],1),s("v-list-item-content",[s("v-list-item-title",{staticClass:"title text-capitalize"},[t._v(t._s(e.meta.displayName))])],1)],1)}),1),s("v-spacer"),s("div",t._l(t.routes.filter(function(t){return"bottom"==t.meta.position}),function(e,a){return s("v-list-item",{key:a,attrs:{to:e,"active-class":"secondary--text"}},[s("v-list-item-icon",[s("v-icon",[t._v(t._s(e.meta.icon))])],1),s("v-list-item-content",[s("v-list-item-title",{staticClass:"title text-capitalize"},[t._v(t._s(e.meta.displayName))])],1)],1)}),1)],1)],1),s("v-content",{staticClass:"content"},[s("v-col",[s("v-row",{staticClass:"pa-4 mx-1"},[s("h1",{staticClass:"headline pt-0 pb-1 text-uppercase"},[s("span",[t._v("TF")]),s("span",{staticClass:"font-weight-light"},[t._v("cockpit")]),s("span",{staticClass:"title font-weight-light"},[t._v("- "+t._s(t.$route.meta.displayName))])]),s("v-spacer"),s("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":200,"offset-x":""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-badge",{attrs:{overlap:"",left:"",color:"secondary"},scopedSlots:t._u([{key:"badge",fn:function(){return[s("span",[t._v("1")])]},proxy:!0}],null,!0),model:{value:t.showBadge,callback:function(e){t.showBadge=e},expression:"showBadge"}},[s("v-btn",t._g({attrs:{text:"",icon:""}},a),[s("v-icon",[t._v("far fa-bell mr-2")])],1)],1)]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[s("v-card",[s("v-list",[s("v-list-item",[s("v-list-item-avatar",[s("v-icon",[t._v("fas fa-plus")])],1),s("v-list-item-content",[s("v-list-item-title",[t._v("A new node wants to join your farm")])],1),s("v-list-item-action",[s("v-btn",{attrs:{icon:""}})],1)],1)],1),s("v-divider"),s("v-list",[s("v-list-item",[s("v-list-item-title",[t._v("Node Id: Lochristi34")])],1),s("v-list-item",[s("v-list-item-title",[t._v("Node name: Lochristi Node 34")])],1)],1),s("v-card-actions",[s("div",{staticClass:"flex-grow-1"}),s("v-btn",{attrs:{text:""},on:{click:function(e){t.menu=!1}}},[t._v("Deny")]),s("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){t.menu=!1}}},[t._v("Allow")])],1)],1)],1),s("v-btn",{attrs:{icon:""}},[s("v-icon",[t._v("fas fa-user-circle")])],1)],1),s("router-view")],1)],1),t.$vuetify.breakpoint.mdAndDown?s("v-bottom-navigation",{staticClass:"primary topround",attrs:{grow:"",dark:"",app:"",fixed:"",shift:"",value:t.$route.name}},t._l(t.routes,function(e,a){return s("v-btn",{key:a,attrs:{value:e.name,icon:""},on:{click:function(a){return t.$router.push(e)}}},[s("span",[t._v(t._s(e.meta.displayName))]),s("v-icon",[t._v(t._s(e.meta.icon))])],1)}),1):t._e()],1)},n=[],o={name:"App",components:{},data:()=>({showDialog:!1,dilogTitle:"title",dialogBody:"",dialogActions:[],dialogImage:null,block:null,showBadge:!0,menu:!1}),computed:{routes(){return this.$router.options.routes}},mounted(){}},i=o,l=(a("5c0b"),a("2877")),c=a("6544"),d=a.n(c),f=a("7496"),u=a("8212"),p=a("4ca6"),v=a("b81c"),m=a("8336"),h=a("b0af"),b=a("99d9"),g=a("62ad"),x=a("a75b"),y=a("ce7e"),_=a("132d"),k=a("adda"),j=a("a722"),C=a("8860"),w=a("da13"),V=a("1800"),S=a("8270"),L=a("5d23"),N=a("34c3"),T=a("e449"),O=a("f774"),A=a("0fd9"),R=a("2fa4"),$=a("71d9"),B=Object(l["a"])(i,r,n,!1,null,null,null),D=B.exports;d()(B,{VApp:f["a"],VAvatar:u["a"],VBadge:p["a"],VBottomNavigation:v["a"],VBtn:m["a"],VCard:h["a"],VCardActions:b["a"],VCol:g["a"],VContent:x["a"],VDivider:y["a"],VIcon:_["a"],VImg:k["a"],VLayout:j["a"],VList:C["a"],VListItem:w["a"],VListItemAction:V["a"],VListItemAvatar:S["a"],VListItemContent:L["a"],VListItemIcon:N["a"],VListItemTitle:L["b"],VMenu:T["a"],VNavigationDrawer:O["a"],VRow:A["a"],VSpacer:R["a"],VToolbar:$["a"]});var F=a("8c4f"),E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"home"},[a("v-col",{staticClass:"px-2"},[a("v-flex",[a("v-row",{attrs:{wrap:""}},[a("v-flex",{staticClass:"pa-2",attrs:{md3:"",xs6:"","d-flex":""}},[a("miniGraph",{attrs:{title:"Average monthly price of 1 TFT",append:"USD"},model:{value:.13,callback:function(e){t.$set(0,"1300",e)},expression:"0.1300"}})],1),a("v-flex",{staticClass:"pa-2",attrs:{md3:"",xs6:"","d-flex":""}},[a("miniGraph",{attrs:{value:"12M",title:"Number of tokens",append:"TFT"}})],1),a("v-flex",{staticClass:"pa-2",attrs:{md3:"",xs6:"","d-flex":""}},[a("miniGraph",{attrs:{clickable:"",value:"Buy TFT"},on:{click:function(e){return t.$router.push({name:"token"})}}})],1)],1)],1),a("v-flex",{},[a("v-row",{staticClass:"fill-height",attrs:{wrap:""}},[a("v-flex",{staticClass:"fill-height pa-2",attrs:{md8:""}},[a("tokenPriceGraph")],1),a("v-flex",{staticClass:"ma-2",attrs:{"d-flex":""}},[a("lastTrades",{staticStyle:{width:"100%"}})],1)],1)],1),a("v-flex",[a("v-row",[a("v-flex",{staticClass:"ma-2",attrs:{"d-flex":"",md4:""}},[a("capacityMap",{staticStyle:{width:"100%"}})],1),a("v-flex",{staticClass:"ma-2",attrs:{"d-flex":""}},[a("nodesTable",{staticStyle:{height:"100%",width:"100%"}})],1)],1)],1)],1)],1)},I=[],U=a("7722"),z=a("cc8a"),M=a("c700"),P=a("3bf4"),H=a("e2a5"),G={name:"home",components:{miniGraph:U["a"],capacityMap:z["a"],tokenPriceGraph:P["a"],lastTrades:H["a"],nodesTable:M["a"]},props:[],data(){return{}},computed:{},mounted(){},methods:{}},q=G,W=(a("ea4d"),a("0e8f")),J=Object(l["a"])(q,E,I,!1,null,"479e92db",null),K=J.exports;d()(J,{VCol:g["a"],VFlex:W["a"],VRow:A["a"]}),s["default"].use(F["a"]);var X=new F["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:K,meta:{icon:"fas fa-home",position:"top",displayName:"Home"}},{path:"/token",name:"token",component:()=>a.e("token-page").then(a.bind(null,"0d32")),meta:{icon:"fas fa-coins",position:"top",displayName:"Token"}},{path:"/capacity",name:"Capacity",component:()=>a.e("capacity-page").then(a.bind(null,"2c1d")),meta:{icon:"fas fa-server",position:"top",displayName:"Capacity"}},{path:"/appstore",name:"dapps",component:()=>a.e("capacity-page").then(a.bind(null,"c9aa")),meta:{icon:"fas fa-th",position:"top",displayName:"ADApps"}},{path:"/farmmanagement",name:"FarmManagement",component:()=>a.e("chat-page").then(a.bind(null,"5c9f")),meta:{icon:"fas fa-tractor",position:"bottom",displayName:"Farm management"}}]}),Y=a("2f62"),Q=a("7c30"),Z={state:{registered3bots:0,onlinenodes:0,registeredFarms:0,farmsList:[],nodesList:[],originalNodesList:[],countries:0,cores:0},actions:{getRegistered3Bots(t){Q["a"].registered3bots().then(e=>{console.log("nodes",e.data),t.commit("setRegistered3Bots",e.data.nodes.length),t.commit("setNodesList",e.data.nodes),t.commit("setOriginalNodesList",e.data.nodes),t.commit("setCountriesFromNodes",e.data.nodes),t.commit("setCoresFromNodes",e.data.nodes),t.commit("setNodesOnline",e.data.nodes)})},getRegisteredFarms(t){Q["a"].registeredfarms().then(e=>{console.log("farms",e.data),t.commit("setRegisteredFarms",e.data.farms.length),t.commit("setFarmsList",e.data.farms)})}},mutations:{setRegistered3Bots(t,e){t.registered3bots=e},setRegisteredFarms(t,e){t.registeredFarms=e},setFarmsList(t,e){t.farmsList=e},setNodesList(t,e){t.nodesList=e},setOriginalNodesList(t,e){t.originalNodesList=e},setCountriesFromNodes(t,e){var a={};for(var s in e)a[e[s]["location"]["country"]]=1;t.countries=Object.keys(a).length},setCoresFromNodes(t,e){for(var a in t.cores=0,e)t.cores+=e[a]["total_resources"]["cru"]},setNodesOnline(t,e){t.onlinenodes=e.length}},getters:{registered3bots:t=>t.registered3bots,registeredfarms:t=>t.registeredFarms,farmslist:t=>t.farmsList,nodeslist:t=>t.nodesList,originalNodesList:t=>t.originalNodesList,cores:t=>t.cores,countries:t=>t.countries,onlinenodes:t=>t.onlinenodes}};s["default"].use(Y["a"]);var tt=new Y["a"].Store({modules:{transactionStore:Z}}),et=a("ce5b"),at=a.n(et);a("95ed"),a("15f5");s["default"].use(at.a);var st=new at.a({iconfont:"fa",theme:{themes:{light:{primary:"#2d4052",secondary:"#57be8e"}}}}),rt=a("d842");rt["a"].configure({language:"en",mapsApiKey:"AIzaSyC7lDq7-_tCyOW4_vR90gOl5lHXRlgtUCM"}),s["default"].use(rt["a"]);var nt=a("755e");s["default"].use(nt,{load:{key:"AIzaSyC7lDq7-_tCyOW4_vR90gOl5lHXRlgtUCM"}}),s["default"].config.productionTip=!1,new s["default"]({router:X,store:tt,vuetify:st,render:t=>t(D)}).$mount("#app")},"57f9":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"nodeinfo"},[a("v-row",{staticClass:"px-4"},[a("v-col",[a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Node ID ")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.id))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Node version")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.version))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Farmer")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.farmer))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Location")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.location.country)+", "+t._s(t.value.location.city))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Uptime")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.uptime))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Status")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.status.status))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Updated")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.updated))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Total CRU")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.totalResources.cru))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Total MRU")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.totalResources.mru))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Total HRU")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.totalResources.hru))])])],1),a("v-row",[a("v-flex",{staticClass:"text-left pr-2",attrs:{xs3:""}},[t._v("Total SRU")]),a("v-flex",{staticClass:"text-truncate font-weight-bold"},[a("span",[t._v(t._s(t.value.totalResources.sru))])])],1)],1)],1)],1)},r=[],n={name:"nodeinfo",props:["node"],data(){return{value:this.node}}},o=n,i=(a("0dc3"),a("2877")),l=a("6544"),c=a.n(l),d=a("62ad"),f=a("0e8f"),u=a("0fd9"),p=Object(i["a"])(o,s,r,!1,null,"4247d6e3",null);e["a"]=p.exports;c()(p,{VCol:d["a"],VFlex:f["a"],VRow:u["a"]})},"5c0b":function(t,e,a){"use strict";var s=a("13e3"),r=a.n(s);r.a},6521:function(t,e,a){},"6b0f":function(t,e,a){"use strict";var s=a("f576"),r=a.n(s);r.a},7722:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"minigraph"},[t.clickable?t._e():a("v-card",{staticStyle:{height:"100%"},attrs:{color:"secondary darken-2 ",dark:""}},[a("v-card-text",{staticClass:"pb-3 fill-height"},[a("v-layout",{staticClass:"fill-height",attrs:{column:"","align-center":"","justify-center":""}},[a("span",{staticClass:"title font-weight-bold"},[t._v(t._s(t.value)+" "+t._s(t.append))]),t.title?a("span",{staticClass:"body-2 font-weight-bold"},[t._v(t._s(t.title))]):t._e()])],1)],1),t.clickable?a("v-card",{staticStyle:{height:"100%","style=cursor":"pointer"},attrs:{color:"secondary darken-2 ",dark:""},on:{click:function(e){return t.$emit("click")}}},[a("v-card-text",{staticClass:"pb-3 fill-height"},[a("v-layout",{staticClass:"fill-height",attrs:{column:"","align-center":"","justify-center":""}},[a("span",{staticClass:"title font-weight-bold"},[t._v(t._s(t.value)+" "+t._s(t.append))]),t.title?a("span",{staticClass:"body-2 font-weight-bold"},[t._v(t._s(t.title))]):t._e()])],1)],1):t._e()],1)},r=[],n={name:"minigraph",components:{},props:{color:{type:String,default:"secondary darken-2 "},title:{type:String,default:""},value:{default:"0"},append:{type:String,default:""},special:{type:Boolean},clickable:{type:Boolean,default:!1}},mounted(){},data(){return{data:[]}},methods:{},computed:{}},o=n,i=(a("6b0f"),a("2877")),l=a("6544"),c=a.n(l),d=a("b0af"),f=a("99d9"),u=a("a722"),p=Object(i["a"])(o,s,r,!1,null,"5d2e37db",null);e["a"]=p.exports;c()(p,{VCard:d["a"],VCardText:f["b"],VLayout:u["a"]})},"7c30":function(t,e,a){"use strict";var s=a("bc3a"),r=a.n(s),n={tfApiUrl:"https://bcdb.test.grid.tf/api/actors/",tfExplorerUrl:"https://explorer.threefoldtoken.com/explorer"};e["a"]={registered3bots(){return r.a.post(`${n.tfApiUrl}nodes/list`)},registeredfarms(){return r.a.post(`${n.tfApiUrl}farms/list`)},news(){return r.a.post(`${n.tfApiUrl}news/list`)},getExplorerConstants(){return r.a.get(`${n.tfExplorerUrl}`)},getExplorerBlockByHeight(t){return r.a.get(`${n.tfExplorerUrl}/blocks/${t}`)}}},"8ce4":function(t,e,a){},"9c70":function(t,e,a){},a7a3:function(t,e,a){"use strict";var s=a("8ce4"),r=a.n(s);r.a},b545:function(t,e,a){},b640:function(t,e,a){t.exports=a.p+"img/logo.c6068f23.jpg"},bbd6:function(t,e,a){},bfa2:function(t,e,a){},c700:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"nodestable"},[a("v-card",{staticStyle:{width:"100%",height:"100%"}},[a("v-card-title",{staticClass:"primary py-3 mb-5 white--text",attrs:{"primary-title":""}},[t._v("\n          Nodes\n          "),a("v-spacer"),a("v-text-field",{staticClass:"pt-0",attrs:{dark:"","append-icon":"fa-search",label:"Search","single-line":"","hide-details":""},model:{value:t.searchNodes,callback:function(e){t.searchNodes=e},expression:"searchNodes"}})],1),a("v-card-text",[a("v-flex",{staticClass:"ml-3"},[a("v-layout",{attrs:{column:"","justify-space-around":""}},[a("v-data-table",{attrs:{"show-expand":"","item-key":"name",search:t.searchNodes,headers:t.headers,items:t.parsedNodesList,"items-per-page":10,"single-expand":"",expanded:t.expanded},on:{"update:expanded":function(e){t.expanded=e}},scopedSlots:t._u([{key:"item.farmer",fn:function(e){var s=e.item;return[a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("span",t._g({},r),[t._v(t._s(t.truncateString(s.farmer)))])]}}],null,!0)},[a("span",[t._v(t._s(s.farmer))])])]}},{key:"item.version",fn:function(e){var s=e.item;return[a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("span",t._g({},r),[t._v(t._s(t.truncateString(s.version)))])]}}],null,!0)},[a("span",[t._v(t._s(s.version))])])]}},{key:"item.uptime",fn:function(e){var s=e.item;return[a("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("span",t._g({},r),[t._v(t._s(t.truncateString(s.uptime)))])]}}],null,!0)},[a("span",[t._v(t._s(s.uptime))])])]}},{key:"item.status",fn:function(e){var s=e.item;return[a("p",{staticClass:"text-center mt-1 mb-0 "},[a("v-chip",{attrs:{color:s.status.color,dark:""}},[t._v(t._s(s.status.status))])],1)]}},{key:"expanded-item",fn:function(t){var e=t.headers,s=t.item;return[a("td",{attrs:{colspan:e.length}},[a("nodeInfo",{key:s.id,attrs:{node:s}})],1)]}}])})],1)],1)],1)],1)],1)},r=[],n=a("57f9"),o=a("2f62"),i=a("c1df"),l=a.n(i),c=a("4623"),d=a.n(c),f=a("2ef0");d()(l.a);var u={name:"nodestable",components:{nodeInfo:n["a"]},data(){return{showResult:!1,itemsPerPage:4,expanded:[],searchNodes:"",headers:[{text:"ID",value:"id"},{text:"Uptime",value:"uptime"},{text:"Version",value:"version"},{text:"Farmer",value:"farmer"},{text:"Status",value:"status",align:"center"}]}},computed:{...Object(o["c"])(["nodeslist","farmslist"]),parsedNodesList:function(){const t=this.nodeslist.map(t=>{const e=l.a.duration(t.uptime,"seconds").format(),a=Object(f["find"])(this.farmslist,e=>{return e.id.toString()===t.farm_id});let s=t.farm_id;return a&&(s=a.name),{uptime:e,version:t.os_version,id:t.node_id,farmer:s,name:"node "+t.node_id,totalResources:t.total_resources,updated:new Date(1e3*t.updated),status:this.getStatus(t),location:t.location}});return t}},methods:{getStatus(t){const{updated:e}=t;if(0===e)return{color:"red",status:"down"};const a=l()(),s=l()(e),r=a.diff(s,"minutes");return r<=10?{color:"green",status:"up"}:{color:"orange",status:"likely down"}},truncateString(t){return t.length<10?t:t.substr(0,10)+"..."}}},p=u,v=(a("1108"),a("2877")),m=a("6544"),h=a.n(m),b=a("b0af"),g=a("99d9"),x=a("cc20"),y=a("8fea"),_=a("0e8f"),k=a("a722"),j=a("2fa4"),C=a("8654"),w=a("3a2f"),V=Object(v["a"])(p,s,r,!1,null,"b129b42e",null);e["a"]=V.exports;h()(V,{VCard:b["a"],VCardText:g["b"],VCardTitle:g["c"],VChip:x["a"],VDataTable:y["a"],VFlex:_["a"],VLayout:k["a"],VSpacer:j["a"],VTextField:C["a"],VTooltip:w["a"]})},cc8a:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"capacitymap"},[a("v-card",{staticStyle:{width:"100%"}},[a("v-card-title",{staticClass:"primary py-3 mb-5 white--text",attrs:{"primary-title":""}},[a("v-icon",{attrs:{small:"",color:"white",left:""}},[t._v("fas fa-server")]),t._v("\n      Capacity finder\n    ")],1),a("v-card-text",[a("v-layout",{attrs:{column:"","align-content-space-between":""}},[a("geo-chart",{attrs:{colors:[t.$vuetify.theme.currentTheme.secondary],data:t.nodeLocation}}),a("v-flex",[a("v-select",{attrs:{items:t.allFarmsList,"prepend-icon":"fas fa-digging"},on:{input:t.setSelected},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}})],1),a("v-flex",[a("capacityselector",{attrs:{icon:"fa-microchip",label:"CRU"}})],1),a("v-flex",[a("capacityselector",{attrs:{icon:"fas fa-memory",label:"MRU"}})],1),a("v-flex",[a("capacityselector",{attrs:{icon:"fad fa-hdd",label:"HRU"}})],1),a("v-flex",[a("capacityselector",{attrs:{icon:"fas fa-hdd",label:"SRU"}})],1)],1)],1)],1)],1)},r=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"capacityselector py-2"},[a("v-range-slider",{staticClass:"align-center py-2",attrs:{max:t.max,min:t.min,"hide-details":"","thumb-label":"always","append-icon":t.icon,label:t.label,color:"secondary"},on:{input:t.handleInput},model:{value:t.range,callback:function(e){t.range=e},expression:"range"}})],1)},o=[],i=a("2f62"),l={name:"capacityselector",components:{},props:["icon","label"],data(){let t=0,e=[];switch(this.label){case"CRU":t=64,e=[8,58];break;case"HRU":t=5e3,e=[500,4500];break;case"MRU":t=512,e=[50,460];break;case"SRU":t=5e3,e=[500,4500];break}return{min:0,max:t,slider:40,range:e}},computed:{...Object(i["c"])(["nodeslist","originalNodesList"])},methods:{handleInput(t){const[e,a]=t;let s=this.originalNodesList.filter(t=>t.total_resources[this.label.toLowerCase()]<=a&&t.total_resources[this.label.toLowerCase()]>=e);this.setNodesList(s)},...Object(i["d"])({setNodesList:"setNodesList"})}},c=l,d=(a("2e7f"),a("2877")),f=a("6544"),u=a.n(f),p=a("5963"),v=Object(d["a"])(c,n,o,!1,null,"95d6fe1e",null),m=v.exports;u()(v,{VRangeSlider:p["a"]});var h=a("57f9"),b=a("2ef0"),g={name:"capacitymap",components:{capacityselector:m,nodeinfo:h["a"]},props:[],data(){return{select:{text:"All",value:"All"}}},computed:{...Object(i["c"])(["farmslist","nodeslist","originalNodesList"]),allFarmsList:function(){const t=this.farmslist.map(t=>{return{value:t,text:t.name}});return t.push({text:"All",value:"All"}),t},nodeLocation:function(){const t=Object(b["groupBy"])(this.nodeslist,t=>t.location.country),e=[];return Object(b["map"])(t,(t,a)=>{const s=[],r=t.length;s.push(a,r),e.push(s)}),e}},mounted(){},methods:{setSelected(t){if("All"===t)return this.setNodesList(this.originalNodesList);const e=this.originalNodesList.filter(e=>e.farm_id.toString()===t.id.toString());this.setNodesList(e)},...Object(i["d"])({setNodesList:"setNodesList"})}},x=g,y=(a("a7a3"),a("b0af")),_=a("99d9"),k=a("0e8f"),j=a("132d"),C=a("a722"),w=a("b974"),V=Object(d["a"])(x,s,r,!1,null,"66195ade",null);e["a"]=V.exports;u()(V,{VCard:y["a"],VCardText:_["b"],VCardTitle:_["c"],VFlex:k["a"],VIcon:j["a"],VLayout:C["a"],VSelect:w["a"]})},d0bd:function(t,e,a){"use strict";var s=a("4aac"),r=a.n(s);r.a},d366:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"scrollablecard"},[a("v-card",{staticClass:"fill-height"},[a("v-card-title",{staticClass:"primary py-3 white--text",attrs:{"primary-title":""}},[a("v-icon",{attrs:{dark:"",small:"",left:""}},[t._v(t._s(t.icon))]),t._v("\n      "+t._s(t.title)+"\n      "),a("v-spacer"),t.disableSearch?t._e():a("v-text-field",{staticClass:"pt-0",attrs:{dark:"","append-icon":"fa-search",label:"Search","single-line":"","hide-details":""}})],1),a("v-card-text",{staticClass:"pa-0 pb-3 fill-height",staticStyle:{height:"calc(100% - 56px)","min-height":"300px"}},[a("div",{staticClass:"pa-0",staticStyle:{position:"relative",width:"100%",height:"100%",overflow:"auto"}},[a("div",{staticClass:"pa-3",staticStyle:{position:"absolute",height:"100%",width:"100%"}},[t._t("default",t._l(100,function(e){return a("v-card",{key:e,staticClass:"my-2"},[a("v-card-text",[a("v-row",{staticClass:"px-2",attrs:{align:"center"}},[a("v-avatar",{attrs:{color:"secondary darken-2 "}},[a("v-icon",{attrs:{color:"white"}},[t._v("fas fa-exchange-alt")])],1),a("v-col",{staticClass:"py-0"},[a("div",[t._v("Trade info")]),a("div",[t._v("Even more info")])])],1)],1)],1)}))],2)])])],1)],1)},r=[],n={name:"scrollablecard",components:{},props:["title","icon","disableSearch"],data(){return{}},computed:{},mounted(){},methods:{}},o=n,i=(a("d0bd"),a("2877")),l=a("6544"),c=a.n(l),d=a("8212"),f=a("b0af"),u=a("99d9"),p=a("62ad"),v=a("132d"),m=a("0fd9"),h=a("2fa4"),b=a("8654"),g=Object(i["a"])(o,s,r,!1,null,"4f988b96",null);e["a"]=g.exports;c()(g,{VAvatar:d["a"],VCard:f["a"],VCardText:u["b"],VCardTitle:u["c"],VCol:p["a"],VIcon:v["a"],VRow:m["a"],VSpacer:h["a"],VTextField:b["a"]})},dcf7:function(t,e,a){},e2a5:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"lasttrades"},[t.blocks?a("scrollablecard",{staticStyle:{height:"100%"},attrs:{disableSearch:!0,title:"Last Blocks",icon:"fas fa-exchange-alt"}},t._l(t.blocks,function(e){return a("v-card",{key:e.blockid,staticClass:"my-2 grey lighten-5",on:{click:function(a){return t.showBlockDialog(e,!0)}}},[a("v-card-text",[a("v-row",{staticClass:"px-2"},[a("v-avatar",{attrs:{color:"secondary darken-2 "}},[a("v-icon",{attrs:{color:"white"}},[t._v("fas fa-exchange-alt")])],1),a("v-col",{staticClass:"py-0 text-truncate  d-inline-block"},[a("div",[t._v("Block #"+t._s(e.height))]),a("div",{},[t._v("ID: "+t._s(e.blockid))])])],1)],1)],1)}),1):t._e(),a("v-dialog",{attrs:{"max-width":"600px",scrollable:""},model:{value:t.showDialog,callback:function(e){t.showDialog=e},expression:"showDialog"}},[a("v-card",[a("v-toolbar",{staticClass:"mb-3 text-uppercase",attrs:{color:"secondary darken-2",dark:""}},[a("v-card-title",[t._v("Block #"+t._s(t.block.height))]),a("v-spacer"),a("v-btn",{staticClass:"mr-0",attrs:{icon:""},on:{click:function(e){return t.showBlockDialog(t.block,!1)}}},[a("v-icon",[t._v("fas fa-times")])],1)],1),a("v-card-text",[a("blockInfo",{attrs:{block:t.block,height:t.height}})],1),a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{text:""},on:{click:function(e){return t.showBlockDialog(t.block,!1)}}},[t._v("Ok")])],1)],1)],1)],1)},r=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"blockinfo"},[a("v-col",[a("v-row",[a("v-flex",{staticClass:"text-right pr-2",attrs:{xs3:""}},[t._v("Height")]),a("v-flex",{staticClass:"text-truncate font-weight-bold",attrs:{xs9:""}},[a("span",[t._v(t._s(t.block.height))])])],1),a("v-row",[a("v-flex",{staticClass:"text-right pr-2",attrs:{xs3:""}},[t._v("ID")]),a("v-flex",{staticClass:"text-truncate font-weight-bold",attrs:{xs9:""}},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[a("span",t._g({},s),[t._v(t._s(t.block.blockid))])]}}])},[a("span",[t._v(t._s(t.block.blockid))])])],1)],1),a("v-row",[a("v-flex",{staticClass:"text-right pr-2",attrs:{xs3:""}},[t._v("Parent Block ID")]),a("v-flex",{staticClass:"text-truncate font-weight-bold",attrs:{xs9:""}},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[a("span",t._g({},s),[t._v(t._s(t.block.rawblock.parentid))])]}}])},[a("span",[t._v(t._s(t.block.rawblock.parentid))])])],1)],1),a("v-row",[a("v-flex",{staticClass:"text-right pr-2",attrs:{xs3:""}},[t._v("Time")]),a("v-flex",{staticClass:"text-truncate font-weight-bold",attrs:{xs9:""}},[a("span",[t._v(t._s(t.timestamp))])])],1),a("v-row",[a("v-flex",{staticClass:"text-right pr-2",attrs:{xs3:""}},[t._v("Block Confirmations")]),a("v-flex",{staticClass:"text-truncate font-weight-bold",attrs:{xs9:""}},[a("span",[t._v(t._s(t.height-t.block.height))])])],1),a("v-row",[a("v-flex",{staticClass:"text-right pr-2",attrs:{xs3:""}},[t._v("Active BlockStake")]),a("v-flex",{staticClass:"text-truncate font-weight-bold",attrs:{xs9:""}},[a("span",[t._v(t._s(t.block.estimatedactivebs))])])],1)],1)],1)},o=[],i={name:"blockinfo",components:{},props:["block","height"],computed:{timestamp:function(){return new Date(1e3*this.block.rawblock.timestamp)}}},l=i,c=(a("4fba"),a("2877")),d=a("6544"),f=a.n(d),u=a("62ad"),p=a("0e8f"),v=a("0fd9"),m=a("3a2f"),h=Object(c["a"])(l,n,o,!1,null,"1ee8edba",null),b=h.exports;f()(h,{VCol:u["a"],VFlex:p["a"],VRow:v["a"],VTooltip:m["a"]});var g=a("d366"),x=a("7c30"),y={name:"lasttrades",components:{scrollablecard:g["a"],blockInfo:b},props:[],data(){return{showDialog:!1,blocks:[],block:{},height:0}},computed:{},mounted(){x["a"].getExplorerConstants().then(t=>{const{height:e}=t.data;this.height=e;for(let a=0;a<50;a++)x["a"].getExplorerBlockByHeight(e-a).then(t=>{this.blocks.push(t.data.block)})})},methods:{showBlockDialog(t,e){this.block=t,this.showDialog=e}}},_=y,k=(a("f334"),a("8212")),j=a("8336"),C=a("b0af"),w=a("99d9"),V=a("169a"),S=a("132d"),L=a("2fa4"),N=a("71d9"),T=Object(c["a"])(_,s,r,!1,null,"14098919",null);e["a"]=T.exports;f()(T,{VAvatar:k["a"],VBtn:j["a"],VCard:C["a"],VCardActions:w["a"],VCardText:w["b"],VCardTitle:w["c"],VCol:u["a"],VDialog:V["a"],VIcon:S["a"],VRow:v["a"],VSpacer:L["a"],VToolbar:N["a"]})},ea4d:function(t,e,a){"use strict";var s=a("6521"),r=a.n(s);r.a},f334:function(t,e,a){"use strict";var s=a("bbd6"),r=a.n(s);r.a},f576:function(t,e,a){},fdd8:function(t,e,a){}});
//# sourceMappingURL=app.1fdd9262.js.map