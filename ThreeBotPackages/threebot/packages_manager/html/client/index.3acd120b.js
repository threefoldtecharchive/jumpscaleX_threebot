import{S as a,i as t,s as e,e as s,t as r,c,a as l,b as o,d as n,f as h,h as i,j as p,w as d,l as g,m as u,E as f,F as m,G as v,H as E,n as k,I as _,J as P,K as T,L as b,M as w}from"./index.92d55523.js";function I(a,t,e){const s=Object.create(a);return s.pkg=t[e],s}function D(a){var t,e;return{c(){t=s("div"),e=r(a.lastError),this.h()},l(s){t=c(s,"DIV",{class:!0,role:!0},!1);var r=l(t);e=o(r,a.lastError),r.forEach(n),this.h()},h(){h(t,"class","alert alert-danger"),h(t,"role","alert")},m(a,s){i(a,t,s),p(t,e)},p(a,t){a.lastError&&d(e,t.lastError)},d(a){a&&n(t)}}}function H(a){var t,e,f,m,v,E,k,_,P,T,b,w,I,D=a.pkg.name+"",H=a.pkgStatus[a.pkg.status].name+"",O=a.pkg.path+"";return{c(){t=s("tr"),e=s("th"),f=r(D),m=g(),v=s("td"),E=r(H),k=g(),_=s("td"),P=r(O),T=g(),b=s("td"),w=r("aaaa"),I=g(),this.h()},l(a){t=c(a,"TR",{},!1);var s=l(t);e=c(s,"TH",{scope:!0},!1);var r=l(e);f=o(r,D),r.forEach(n),m=u(s),v=c(s,"TD",{},!1);var h=l(v);E=o(h,H),h.forEach(n),k=u(s),_=c(s,"TD",{},!1);var i=l(_);P=o(i,O),i.forEach(n),T=u(s),b=c(s,"TD",{},!1);var p=l(b);w=o(p,"aaaa"),p.forEach(n),I=u(s),s.forEach(n),this.h()},h(){h(e,"scope","row")},m(a,s){i(a,t,s),p(t,e),p(e,f),p(t,m),p(t,v),p(v,E),p(t,k),p(t,_),p(_,P),p(t,T),p(t,b),p(b,w),p(t,I)},p(a,t){a.packages&&D!==(D=t.pkg.name+"")&&d(f,D),a.packages&&H!==(H=t.pkgStatus[t.pkg.status].name+"")&&d(E,H),a.packages&&O!==(O=t.pkg.path+"")&&d(P,O)},d(a){a&&n(t)}}}function O(a){var t,e,d,T,w,O,S,x,y,A,B,N,C,R,V,j,M,F,G,L,U,$,J,K,Y,q,z,Q,W,X,Z,aa,ta,ea,sa,ra,ca,la,oa,na,ha,ia,pa,da,ga=null!=a.lastError&&D(a);let ua=a.packages,fa=[];for(let t=0;t<ua.length;t+=1)fa[t]=H(I(a,ua,t));return{c(){t=g(),e=s("h2"),d=r("3Bot Package Manager"),T=s("br"),w=s("br"),O=g(),S=s("form"),ga&&ga.c(),x=g(),y=s("div"),A=s("div"),B=s("select"),N=s("option"),C=r("path"),R=s("option"),V=r("giturl"),j=g(),M=s("div"),F=s("div"),G=s("input"),L=g(),U=s("div"),$=s("button"),J=r("Add package"),K=g(),Y=s("table"),q=s("caption"),z=r("Packages"),Q=g(),W=s("thead"),X=s("tr"),Z=s("th"),aa=r("Name"),ta=g(),ea=s("th"),sa=r("Status"),ra=g(),ca=s("th"),la=r("Path"),oa=g(),na=s("th"),ha=r("Actions"),ia=g(),pa=s("tbody");for(let a=0;a<fa.length;a+=1)fa[a].c();this.h()},l(a){t=u(a),e=c(a,"H2",{},!1);var s=l(e);d=o(s,"3Bot Package Manager"),s.forEach(n),T=c(a,"BR",{},!1),l(T).forEach(n),w=c(a,"BR",{},!1),l(w).forEach(n),O=u(a),S=c(a,"FORM",{},!1);var r=l(S);ga&&ga.l(r),x=u(r),y=c(r,"DIV",{class:!0},!1);var h=l(y);A=c(h,"DIV",{class:!0},!1);var i=l(A);B=c(i,"SELECT",{class:!0,id:!0},!1);var p=l(B);N=c(p,"OPTION",{value:!0,selected:!0},!1);var g=l(N);C=o(g,"path"),g.forEach(n),R=c(p,"OPTION",{value:!0},!1);var f=l(R);V=o(f,"giturl"),f.forEach(n),p.forEach(n),i.forEach(n),j=u(h),M=c(h,"DIV",{class:!0},!1);var m=l(M);F=c(m,"DIV",{class:!0},!1);var v=l(F);G=c(v,"INPUT",{type:!0,class:!0,id:!0},!1),l(G).forEach(n),v.forEach(n),m.forEach(n),L=u(h),U=c(h,"DIV",{class:!0},!1);var E=l(U);$=c(E,"BUTTON",{type:!0,class:!0},!1);var k=l($);J=o(k,"Add package"),k.forEach(n),E.forEach(n),h.forEach(n),r.forEach(n),K=u(a),Y=c(a,"TABLE",{class:!0,style:!0},!1);var _=l(Y);q=c(_,"CAPTION",{},!1);var P=l(q);z=o(P,"Packages"),P.forEach(n),Q=u(_),W=c(_,"THEAD",{},!1);var b=l(W);X=c(b,"TR",{},!1);var I=l(X);Z=c(I,"TH",{scope:!0},!1);var D=l(Z);aa=o(D,"Name"),D.forEach(n),ta=u(I),ea=c(I,"TH",{scope:!0},!1);var H=l(ea);sa=o(H,"Status"),H.forEach(n),ra=u(I),ca=c(I,"TH",{scope:!0},!1);var da=l(ca);la=o(da,"Path"),da.forEach(n),oa=u(I),na=c(I,"TH",{scope:!0},!1);var ua=l(na);ha=o(ua,"Actions"),ua.forEach(n),I.forEach(n),b.forEach(n),ia=u(_),pa=c(_,"TBODY",{},!1);var ma=l(pa);for(let a=0;a<fa.length;a+=1)fa[a].l(ma);ma.forEach(n),_.forEach(n),this.h()},h(){document.title="3bot Package Manager",N.__value="path",N.value=N.__value,N.selected=!0,R.__value="git_url",R.value=R.__value,void 0===a.method&&b(()=>a.select_change_handler.call(B)),h(B,"class","custom-select mr-sm-3"),h(B,"id","inlineFormCustomSelect"),h(A,"class","col-auto"),h(G,"type","text"),h(G,"class","form-control"),h(G,"id","inlineFormInputGroup"),h(F,"class","input-group mb-2"),h(M,"class","col-6"),h($,"type","button"),h($,"class","btn btn-prweblibs/gedis/gedis_http.jsimary mb-2"),h(U,"class","col-auto"),h(y,"class","form-row align-items-center"),h(Z,"scope","col"),h(ea,"scope","col"),h(ca,"scope","col"),h(na,"scope","col"),h(Y,"class","table"),f(Y,"margin-top","20px"),da=[m(B,"change",a.select_change_handler),m(G,"input",a.input_input_handler),m($,"click",a.click_handler)]},m(s,r){i(s,t,r),i(s,e,r),p(e,d),i(s,T,r),i(s,w,r),i(s,O,r),i(s,S,r),ga&&ga.m(S,null),p(S,x),p(S,y),p(y,A),p(A,B),p(B,N),p(N,C),p(B,R),p(R,V),v(B,a.method),p(y,j),p(y,M),p(M,F),p(F,G),E(G,a.newPackagePath),p(y,L),p(y,U),p(U,$),p($,J),i(s,K,r),i(s,Y,r),p(Y,q),p(q,z),p(Y,Q),p(Y,W),p(W,X),p(X,Z),p(Z,aa),p(X,ta),p(X,ea),p(ea,sa),p(X,ra),p(X,ca),p(ca,la),p(X,oa),p(X,na),p(na,ha),p(Y,ia),p(Y,pa);for(let a=0;a<fa.length;a+=1)fa[a].m(pa,null)},p(a,t){if(null!=t.lastError?ga?ga.p(a,t):((ga=D(t)).c(),ga.m(S,x)):ga&&(ga.d(1),ga=null),a.method&&v(B,t.method),a.newPackagePath&&G.value!==t.newPackagePath&&E(G,t.newPackagePath),a.packages||a.pkgStatus){let e;for(ua=t.packages,e=0;e<ua.length;e+=1){const s=I(t,ua,e);fa[e]?fa[e].p(a,s):(fa[e]=H(s),fa[e].c(),fa[e].m(pa,null))}for(;e<fa.length;e+=1)fa[e].d(1);fa.length=ua.length}},i:k,o:k,d(a){a&&(n(t),n(e),n(T),n(w),n(O),n(S)),ga&&ga.d(),a&&(n(K),n(Y)),_(fa,a),P(da)}}}function S(a,t,e){const s=new GedisHTTPClient(`${location.protocol}//${location.hostname}/web/gedis/http`);let r="path",c="",l=null,o=[];function n(){s.executeCommand("package_manager","packages_list").then(a=>{if(!a.ok){let t=new Error(a);throw e("lastError",l=t),t}a.json().then(a=>{e("packages",o=a.packages),e("lastError",l=null)})})}function h(){let a={};a[r]=c,s.executeCommand("package_manager","package_add",a).then(a=>{a.ok&&(n(),e("lastError",l=null))}).catch(a=>{a.text().then(a=>{console.log("aaaaaaa",a)})})}T(async()=>{n()});return{method:r,newPackagePath:c,lastError:l,packages:o,pkgStatus:{0:{name:"Init",actions:["delete"]},1:{name:"Installed",actions:["delete","start"]},2:{name:"Running",actions:["delete","stop"]},3:{name:"Halted",actions:["delete","start","disable"]},4:{name:"Disabled",actions:["delete","enable"]},5:{name:"Error",actions:["delete"]}},packageAdd:h,select_change_handler:function(){r=w(this),e("method",r)},input_input_handler:function(){c=this.value,e("newPackagePath",c)},click_handler:()=>h()}}export default class extends a{constructor(a){super(),t(this,a,S,O,e,[])}}
