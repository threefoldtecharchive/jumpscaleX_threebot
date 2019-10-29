import{_ as a,a as t,b as e,c as n,i as c,s as r,d as o,S as s,e as l,t as i,f as h,g as u,h as f,j as p,k as g,m as d,o as v,A as m,q as E,r as k,L as _,M as P,N as T,O as b,n as w,P as I,Q as D,R as O,T as A,I as H,J as S,U as x}from"./index.5be34265.js";function N(a,t,e){var n=Object.create(a);return n.pkg=t[e],n}function y(a){var t,e;return{c:function(){t=l("div"),e=i(a.lastError),this.h()},l:function(n){t=h(n,"DIV",{class:!0,role:!0},!1);var c=u(t);e=f(c,a.lastError),c.forEach(p),this.h()},h:function(){g(t,"class","alert alert-danger"),g(t,"role","alert")},m:function(a,n){d(a,t,n),v(t,e)},p:function(a,t){a.lastError&&m(e,t.lastError)},d:function(a){a&&p(t)}}}function B(a){var t,e,n,c,r,o,s,_,P,T,b,w,I,D=a.pkg.name+"",O=a.pkgStatus[a.pkg.status].name+"",A=a.pkg.path+"";return{c:function(){t=l("tr"),e=l("th"),n=i(D),c=E(),r=l("td"),o=i(O),s=E(),_=l("td"),P=i(A),T=E(),b=l("td"),w=i("aaaa"),I=E(),this.h()},l:function(a){t=h(a,"TR",{},!1);var l=u(t);e=h(l,"TH",{scope:!0},!1);var i=u(e);n=f(i,D),i.forEach(p),c=k(l),r=h(l,"TD",{},!1);var g=u(r);o=f(g,O),g.forEach(p),s=k(l),_=h(l,"TD",{},!1);var d=u(_);P=f(d,A),d.forEach(p),T=k(l),b=h(l,"TD",{},!1);var v=u(b);w=f(v,"aaaa"),v.forEach(p),I=k(l),l.forEach(p),this.h()},h:function(){g(e,"scope","row")},m:function(a,l){d(a,t,l),v(t,e),v(e,n),v(t,c),v(t,r),v(r,o),v(t,s),v(t,_),v(_,P),v(t,T),v(t,b),v(b,w),v(t,I)},p:function(a,t){a.packages&&D!==(D=t.pkg.name+"")&&m(n,D),a.packages&&O!==(O=t.pkgStatus[t.pkg.status].name+"")&&m(o,O),a.packages&&A!==(A=t.pkg.path+"")&&m(P,A)},d:function(a){a&&p(t)}}}function R(a){for(var t,e,n,c,r,o,s,m,O,H,S,x,R,C,V,j,M,F,L,U,G,q,J,Q,Y,z,K,W,X,Z,$,aa,ta,ea,na,ca,ra,oa,sa,la,ia,ha,ua,fa,pa=null!=a.lastError&&y(a),ga=a.packages,da=[],va=0;va<ga.length;va+=1)da[va]=B(N(a,ga,va));return{c:function(){t=E(),e=l("h2"),n=i("3Bot Package Manager"),c=l("br"),r=l("br"),o=E(),s=l("form"),pa&&pa.c(),m=E(),O=l("div"),H=l("div"),S=l("select"),x=l("option"),R=i("path"),C=l("option"),V=i("giturl"),j=E(),M=l("div"),F=l("div"),L=l("input"),U=E(),G=l("div"),q=l("button"),J=i("Add package"),Q=E(),Y=l("table"),z=l("caption"),K=i("Packages"),W=E(),X=l("thead"),Z=l("tr"),$=l("th"),aa=i("Name"),ta=E(),ea=l("th"),na=i("Status"),ca=E(),ra=l("th"),oa=i("Path"),sa=E(),la=l("th"),ia=i("Actions"),ha=E(),ua=l("tbody");for(var a=0;a<da.length;a+=1)da[a].c();this.h()},l:function(a){t=k(a),e=h(a,"H2",{},!1);var l=u(e);n=f(l,"3Bot Package Manager"),l.forEach(p),c=h(a,"BR",{},!1),u(c).forEach(p),r=h(a,"BR",{},!1),u(r).forEach(p),o=k(a),s=h(a,"FORM",{},!1);var i=u(s);pa&&pa.l(i),m=k(i),O=h(i,"DIV",{class:!0},!1);var g=u(O);H=h(g,"DIV",{class:!0},!1);var d=u(H);S=h(d,"SELECT",{class:!0,id:!0},!1);var v=u(S);x=h(v,"OPTION",{value:!0,selected:!0},!1);var E=u(x);R=f(E,"path"),E.forEach(p),C=h(v,"OPTION",{value:!0},!1);var _=u(C);V=f(_,"giturl"),_.forEach(p),v.forEach(p),d.forEach(p),j=k(g),M=h(g,"DIV",{class:!0},!1);var P=u(M);F=h(P,"DIV",{class:!0},!1);var T=u(F);L=h(T,"INPUT",{type:!0,class:!0,id:!0},!1),u(L).forEach(p),T.forEach(p),P.forEach(p),U=k(g),G=h(g,"DIV",{class:!0},!1);var b=u(G);q=h(b,"BUTTON",{type:!0,class:!0},!1);var w=u(q);J=f(w,"Add package"),w.forEach(p),b.forEach(p),g.forEach(p),i.forEach(p),Q=k(a),Y=h(a,"TABLE",{class:!0,style:!0},!1);var I=u(Y);z=h(I,"CAPTION",{},!1);var D=u(z);K=f(D,"Packages"),D.forEach(p),W=k(I),X=h(I,"THEAD",{},!1);var A=u(X);Z=h(A,"TR",{},!1);var N=u(Z);$=h(N,"TH",{scope:!0},!1);var y=u($);aa=f(y,"Name"),y.forEach(p),ta=k(N),ea=h(N,"TH",{scope:!0},!1);var B=u(ea);na=f(B,"Status"),B.forEach(p),ca=k(N),ra=h(N,"TH",{scope:!0},!1);var fa=u(ra);oa=f(fa,"Path"),fa.forEach(p),sa=k(N),la=h(N,"TH",{scope:!0},!1);var ga=u(la);ia=f(ga,"Actions"),ga.forEach(p),N.forEach(p),A.forEach(p),ha=k(I),ua=h(I,"TBODY",{},!1);for(var va=u(ua),ma=0;ma<da.length;ma+=1)da[ma].l(va);va.forEach(p),I.forEach(p),this.h()},h:function(){document.title="3bot Package Manager",x.__value="path",x.value=x.__value,x.selected=!0,C.__value="git_url",C.value=C.__value,void 0===a.method&&A(function(){return a.select_change_handler.call(S)}),g(S,"class","custom-select mr-sm-3"),g(S,"id","inlineFormCustomSelect"),g(H,"class","col-auto"),g(L,"type","text"),g(L,"class","form-control"),g(L,"id","inlineFormInputGroup"),g(F,"class","input-group mb-2"),g(M,"class","col-6"),g(q,"type","button"),g(q,"class","btn btn-prweblibs/gedis/gedis_http.jsimary mb-2"),g(G,"class","col-auto"),g(O,"class","form-row align-items-center"),g($,"scope","col"),g(ea,"scope","col"),g(ra,"scope","col"),g(la,"scope","col"),g(Y,"class","table"),_(Y,"margin-top","20px"),fa=[P(S,"change",a.select_change_handler),P(L,"input",a.input_input_handler),P(q,"click",a.click_handler)]},m:function(l,i){d(l,t,i),d(l,e,i),v(e,n),d(l,c,i),d(l,r,i),d(l,o,i),d(l,s,i),pa&&pa.m(s,null),v(s,m),v(s,O),v(O,H),v(H,S),v(S,x),v(x,R),v(S,C),v(C,V),T(S,a.method),v(O,j),v(O,M),v(M,F),v(F,L),b(L,a.newPackagePath),v(O,U),v(O,G),v(G,q),v(q,J),d(l,Q,i),d(l,Y,i),v(Y,z),v(z,K),v(Y,W),v(Y,X),v(X,Z),v(Z,$),v($,aa),v(Z,ta),v(Z,ea),v(ea,na),v(Z,ca),v(Z,ra),v(ra,oa),v(Z,sa),v(Z,la),v(la,ia),v(Y,ha),v(Y,ua);for(var h=0;h<da.length;h+=1)da[h].m(ua,null)},p:function(a,t){if(null!=t.lastError?pa?pa.p(a,t):((pa=y(t)).c(),pa.m(s,m)):pa&&(pa.d(1),pa=null),a.method&&T(S,t.method),a.newPackagePath&&L.value!==t.newPackagePath&&b(L,t.newPackagePath),a.packages||a.pkgStatus){var e;for(ga=t.packages,e=0;e<ga.length;e+=1){var n=N(t,ga,e);da[e]?da[e].p(a,n):(da[e]=B(n),da[e].c(),da[e].m(ua,null))}for(;e<da.length;e+=1)da[e].d(1);da.length=ga.length}},i:w,o:w,d:function(a){a&&(p(t),p(e),p(c),p(r),p(o),p(s)),pa&&pa.d(),a&&(p(Q),p(Y)),I(da,a),D(fa)}}}function C(a,t,e){var n=new GedisHTTPClient("".concat(location.protocol,"//").concat(location.hostname,"/web/gedis/http")),c="path",r="",o=null,s=[];function l(){n.executeCommand("package_manager","packages_list").then(function(a){if(!a.ok){var t=new Error(a);throw e("lastError",o=t),t}a.json().then(function(a){e("packages",s=a.packages),e("lastError",o=null)})})}function i(){var a={};a[c]=r,n.executeCommand("package_manager","package_add",a).then(function(a){res.ok?(e("lastError",o=null),l()):res.text().then(function(a){throw new Error(a)})}).catch(function(a){console.log("caught it!",a)})}O(H(S.mark(function a(){return S.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:l();case 1:case"end":return a.stop()}},a)})));return{method:c,newPackagePath:r,lastError:o,packages:s,pkgStatus:{0:{name:"Init",actions:["delete"]},1:{name:"Installed",actions:["delete","start"]},2:{name:"Running",actions:["delete","stop"]},3:{name:"Halted",actions:["delete","start","disable"]},4:{name:"Disabled",actions:["delete","enable"]},5:{name:"Error",actions:["delete"]}},packageAdd:i,select_change_handler:function(){c=x(this),e("method",c)},input_input_handler:function(){r=this.value,e("newPackagePath",r)},click_handler:function(){return i()}}}export default(function(l){function i(a){var s;return t(this,i),s=e(this,n(i).call(this)),c(o(s),a,C,R,r,[]),s}return a(i,s),i}());
