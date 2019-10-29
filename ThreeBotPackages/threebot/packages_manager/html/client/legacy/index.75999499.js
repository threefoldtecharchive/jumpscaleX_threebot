import{_ as a,a as t,b as e,c,i as n,s as r,d as s,S as o,e as l,t as i,f as h,g as u,h as f,j as p,k as g,m as d,o as v,A as m,q as E,r as k,L as P,M as T,N as _,O as b,n as w,P as I,Q as D,R as O,T as S,I as H,J as N,U as y}from"./index.5be34265.js";function A(a,t,e){var c=Object.create(a);return c.pkg=t[e],c}function B(a){var t,e;return{c:function(){t=l("div"),e=i(a.lastError),this.h()},l:function(c){t=h(c,"DIV",{class:!0,role:!0},!1);var n=u(t);e=f(n,a.lastError),n.forEach(p),this.h()},h:function(){g(t,"class","alert alert-danger"),g(t,"role","alert")},m:function(a,c){d(a,t,c),v(t,e)},p:function(a,t){a.lastError&&m(e,t.lastError)},d:function(a){a&&p(t)}}}function R(a){var t,e,c,n,r,s,o,P,T,_,b,w,I=a.pkg.name+"",D=a.pkgStatus[a.pkg.status].name+"",O=a.pkg.path+"";return{c:function(){t=l("tr"),e=l("th"),c=i(I),n=E(),r=l("td"),s=i(D),o=E(),P=l("td"),T=i(O),_=E(),b=l("td"),w=E(),this.h()},l:function(a){t=h(a,"TR",{},!1);var l=u(t);e=h(l,"TH",{scope:!0},!1);var i=u(e);c=f(i,I),i.forEach(p),n=k(l),r=h(l,"TD",{},!1);var g=u(r);s=f(g,D),g.forEach(p),o=k(l),P=h(l,"TD",{},!1);var d=u(P);T=f(d,O),d.forEach(p),_=k(l),b=h(l,"TD",{},!1),u(b).forEach(p),w=k(l),l.forEach(p),this.h()},h:function(){g(e,"scope","row")},m:function(a,l){d(a,t,l),v(t,e),v(e,c),v(t,n),v(t,r),v(r,s),v(t,o),v(t,P),v(P,T),v(t,_),v(t,b),v(t,w)},p:function(a,t){a.packages&&I!==(I=t.pkg.name+"")&&m(c,I),a.packages&&D!==(D=t.pkgStatus[t.pkg.status].name+"")&&m(s,D),a.packages&&O!==(O=t.pkg.path+"")&&m(T,O)},d:function(a){a&&p(t)}}}function V(a){for(var t,e,c,n,r,s,o,m,O,H,N,y,V,x,M,j,C,F,L,U,G,J,q,Q,Y,$,z,K,W,X,Z,aa,ta,ea,ca,na,ra,sa,oa,la,ia,ha,ua,fa,pa=null!=a.lastError&&B(a),ga=a.packages,da=[],va=0;va<ga.length;va+=1)da[va]=R(A(a,ga,va));return{c:function(){t=E(),e=l("h2"),c=i("3Bot Package Manager"),n=l("br"),r=l("br"),s=E(),o=l("form"),pa&&pa.c(),m=E(),O=l("div"),H=l("div"),N=l("select"),y=l("option"),V=i("path"),x=l("option"),M=i("giturl"),j=E(),C=l("div"),F=l("div"),L=l("input"),U=E(),G=l("div"),J=l("button"),q=i("Add package"),Q=E(),Y=l("table"),$=l("caption"),z=i("Packages"),K=E(),W=l("thead"),X=l("tr"),Z=l("th"),aa=i("Name"),ta=E(),ea=l("th"),ca=i("Status"),na=E(),ra=l("th"),sa=i("Path"),oa=E(),la=l("th"),ia=i("Actions"),ha=E(),ua=l("tbody");for(var a=0;a<da.length;a+=1)da[a].c();this.h()},l:function(a){t=k(a),e=h(a,"H2",{},!1);var l=u(e);c=f(l,"3Bot Package Manager"),l.forEach(p),n=h(a,"BR",{},!1),u(n).forEach(p),r=h(a,"BR",{},!1),u(r).forEach(p),s=k(a),o=h(a,"FORM",{},!1);var i=u(o);pa&&pa.l(i),m=k(i),O=h(i,"DIV",{class:!0},!1);var g=u(O);H=h(g,"DIV",{class:!0},!1);var d=u(H);N=h(d,"SELECT",{class:!0,id:!0},!1);var v=u(N);y=h(v,"OPTION",{value:!0,selected:!0},!1);var E=u(y);V=f(E,"path"),E.forEach(p),x=h(v,"OPTION",{value:!0},!1);var P=u(x);M=f(P,"giturl"),P.forEach(p),v.forEach(p),d.forEach(p),j=k(g),C=h(g,"DIV",{class:!0},!1);var T=u(C);F=h(T,"DIV",{class:!0},!1);var _=u(F);L=h(_,"INPUT",{type:!0,class:!0,id:!0},!1),u(L).forEach(p),_.forEach(p),T.forEach(p),U=k(g),G=h(g,"DIV",{class:!0},!1);var b=u(G);J=h(b,"BUTTON",{type:!0,class:!0},!1);var w=u(J);q=f(w,"Add package"),w.forEach(p),b.forEach(p),g.forEach(p),i.forEach(p),Q=k(a),Y=h(a,"TABLE",{class:!0,style:!0},!1);var I=u(Y);$=h(I,"CAPTION",{},!1);var D=u($);z=f(D,"Packages"),D.forEach(p),K=k(I),W=h(I,"THEAD",{},!1);var S=u(W);X=h(S,"TR",{},!1);var A=u(X);Z=h(A,"TH",{scope:!0},!1);var B=u(Z);aa=f(B,"Name"),B.forEach(p),ta=k(A),ea=h(A,"TH",{scope:!0},!1);var R=u(ea);ca=f(R,"Status"),R.forEach(p),na=k(A),ra=h(A,"TH",{scope:!0},!1);var fa=u(ra);sa=f(fa,"Path"),fa.forEach(p),oa=k(A),la=h(A,"TH",{scope:!0},!1);var ga=u(la);ia=f(ga,"Actions"),ga.forEach(p),A.forEach(p),S.forEach(p),ha=k(I),ua=h(I,"TBODY",{},!1);for(var va=u(ua),ma=0;ma<da.length;ma+=1)da[ma].l(va);va.forEach(p),I.forEach(p),this.h()},h:function(){document.title="3bot Package Manager",y.__value="path",y.value=y.__value,y.selected=!0,x.__value="git_url",x.value=x.__value,void 0===a.method&&S(function(){return a.select_change_handler.call(N)}),g(N,"class","custom-select mr-sm-3"),g(N,"id","inlineFormCustomSelect"),g(H,"class","col-auto"),g(L,"type","text"),g(L,"class","form-control"),g(L,"id","inlineFormInputGroup"),g(F,"class","input-group mb-2"),g(C,"class","col-6"),g(J,"type","button"),g(J,"class","btn btn-primary mb-2"),g(G,"class","col-auto"),g(O,"class","form-row align-items-center"),g(Z,"scope","col"),g(ea,"scope","col"),g(ra,"scope","col"),g(la,"scope","col"),g(Y,"class","table"),P(Y,"margin-top","20px"),fa=[T(N,"change",a.select_change_handler),T(L,"input",a.input_input_handler)]},m:function(l,i){d(l,t,i),d(l,e,i),v(e,c),d(l,n,i),d(l,r,i),d(l,s,i),d(l,o,i),pa&&pa.m(o,null),v(o,m),v(o,O),v(O,H),v(H,N),v(N,y),v(y,V),v(N,x),v(x,M),_(N,a.method),v(O,j),v(O,C),v(C,F),v(F,L),b(L,a.newPackagePath),v(O,U),v(O,G),v(G,J),v(J,q),d(l,Q,i),d(l,Y,i),v(Y,$),v($,z),v(Y,K),v(Y,W),v(W,X),v(X,Z),v(Z,aa),v(X,ta),v(X,ea),v(ea,ca),v(X,na),v(X,ra),v(ra,sa),v(X,oa),v(X,la),v(la,ia),v(Y,ha),v(Y,ua);for(var h=0;h<da.length;h+=1)da[h].m(ua,null)},p:function(a,t){if(null!=t.lastError?pa?pa.p(a,t):((pa=B(t)).c(),pa.m(o,m)):pa&&(pa.d(1),pa=null),a.method&&_(N,t.method),a.newPackagePath&&L.value!==t.newPackagePath&&b(L,t.newPackagePath),a.packages||a.pkgStatus){var e;for(ga=t.packages,e=0;e<ga.length;e+=1){var c=A(t,ga,e);da[e]?da[e].p(a,c):(da[e]=R(c),da[e].c(),da[e].m(ua,null))}for(;e<da.length;e+=1)da[e].d(1);da.length=ga.length}},i:w,o:w,d:function(a){a&&(p(t),p(e),p(n),p(r),p(s),p(o)),pa&&pa.d(),a&&(p(Q),p(Y)),I(da,a),D(fa)}}}function x(a,t,e){var c=new GedisHTTPClient("".concat(location.protocol,"//").concat(location.hostname,"/web/gedis/http")),n="path",r="",s=null,o=t.packages,l=void 0===o?[]:o;return O(H(N.mark(function a(){return N.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:c.actors.package_manager.packages_list().then(function(a){if(!a.ok)throw new Error(res);e("packages",l=a.json()),console.log("aaaaaaa",JSON.stringify(a))}).catch(function(a){throw e("lastError",s=a),a});case 1:case"end":return a.stop()}},a)}))),a.$set=function(a){"packages"in a&&e("packages",l=a.packages)},{method:n,newPackagePath:r,lastError:s,packages:l,pkgStatus:{0:{name:"Init",actions:["delete"]},1:{name:"Installed",actions:["delete","start"]},2:{name:"Running",actions:["delete","stop"]},3:{name:"Halted",actions:["delete","start","disable"]},4:{name:"Disabled",actions:["delete","enable"]},5:{name:"Error",actions:["delete"]}},select_change_handler:function(){n=y(this),e("method",n)},input_input_handler:function(){r=this.value,e("newPackagePath",r)}}}export default(function(l){function i(a){var o;return t(this,i),o=e(this,c(i).call(this)),n(s(o),a,x,V,r,["packages"]),o}return a(i,o),i}());
