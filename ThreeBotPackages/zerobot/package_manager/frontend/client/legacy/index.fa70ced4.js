import{_ as a,a as t,b as n,c,i as e,d as r,S as s,s as o,e as l,t as u,f as i,g as h,h as p,j as f,k as d,m as g,o as k,A as m,q as v,r as E,K as b,L as _,M as T,N as P,n as S,O as y,P as D,Q as C,R as O,I as w,T as I}from"./index.6c2f17b0.js";function N(a,t,n){var c=Object.create(a);return c.pkg=t[n],c}function x(a){var t,n;return{c:function(){t=l("div"),n=u(a.lastError),this.h()},l:function(c){t=i(c,"DIV",{class:!0,role:!0},!1);var e=h(t);n=p(e,a.lastError),e.forEach(f),this.h()},h:function(){d(t,"class","alert alert-danger"),d(t,"role","alert")},m:function(a,c){g(a,t,c),k(t,n)},p:function(a,t){a.lastError&&m(n,t.lastError)},d:function(a){a&&f(t)}}}function B(a){var t,n,c;function e(){return a.click_handler_1(a)}return{c:function(){t=l("button"),n=u("Start"),this.h()},l:function(a){t=i(a,"BUTTON",{type:!0,class:!0},!1);var c=h(t);n=p(c,"Start"),c.forEach(f),this.h()},h:function(){d(t,"type","button"),d(t,"class","btn btn-success btn-sm"),c=b(t,"click",e)},m:function(a,c){g(a,t,c),k(t,n)},p:function(t,n){a=n},d:function(a){a&&f(t),c()}}}function A(a){var t,n,c;function e(){return a.click_handler_2(a)}return{c:function(){t=l("button"),n=u("Stop"),this.h()},l:function(a){t=i(a,"BUTTON",{type:!0,class:!0},!1);var c=h(t);n=p(c,"Stop"),c.forEach(f),this.h()},h:function(){d(t,"type","button"),d(t,"class","btn btn-danger btn-sm"),c=b(t,"click",e)},m:function(a,c){g(a,t,c),k(t,n)},p:function(t,n){a=n},d:function(a){a&&f(t),c()}}}function H(a){var t,n,c;function e(){return a.click_handler_3(a)}return{c:function(){t=l("button"),n=u("Enable"),this.h()},l:function(a){t=i(a,"BUTTON",{type:!0,class:!0},!1);var c=h(t);n=p(c,"Enable"),c.forEach(f),this.h()},h:function(){d(t,"type","button"),d(t,"class","btn btn-primary btn-sm"),c=b(t,"click",e)},m:function(a,c){g(a,t,c),k(t,n)},p:function(t,n){a=n},d:function(a){a&&f(t),c()}}}function R(a){var t,n,c;function e(){return a.click_handler_4(a)}return{c:function(){t=l("button"),n=u("Disable"),this.h()},l:function(a){t=i(a,"BUTTON",{type:!0,class:!0},!1);var c=h(t);n=p(c,"Disable"),c.forEach(f),this.h()},h:function(){d(t,"type","button"),d(t,"class","btn btn-light btn-sm"),c=b(t,"click",e)},m:function(a,c){g(a,t,c),k(t,n)},p:function(t,n){a=n},d:function(a){a&&f(t),c()}}}function U(a){var t,n,c;function e(){return a.click_handler_5(a)}return{c:function(){t=l("button"),n=u("Delete"),this.h()},l:function(a){t=i(a,"BUTTON",{type:!0,class:!0},!1);var c=h(t);n=p(c,"Delete"),c.forEach(f),this.h()},h:function(){d(t,"type","button"),d(t,"class","btn btn-dark btn-sm"),c=b(t,"click",e)},m:function(a,c){g(a,t,c),k(t,n)},p:function(t,n){a=n},d:function(a){a&&f(t),c()}}}function V(a){var t,n,c,e,r,s,o,b,_,T,P,S,y,D,C,O,w=a.pkg.name+"",I=a.pkgStatus[a.pkg.status].name+"",N=a.pkg.path+"",x=a.pkgStatus[a.pkg.status].actions.includes("start"),V=a.pkgStatus[a.pkg.status].actions.includes("stop"),j=a.pkgStatus[a.pkg.status].actions.includes("enable"),M=a.pkgStatus[a.pkg.status].actions.includes("disable"),F=a.pkgStatus[a.pkg.status].actions.includes("delete"),L=x&&B(a),G=V&&A(a),q=j&&H(a),K=M&&R(a),Q=F&&U(a);return{c:function(){t=l("tr"),n=l("th"),c=u(w),e=v(),r=l("td"),s=u(I),o=v(),b=l("td"),_=u(N),T=v(),P=l("td"),L&&L.c(),S=v(),G&&G.c(),y=v(),q&&q.c(),D=v(),K&&K.c(),C=v(),Q&&Q.c(),O=v(),this.h()},l:function(a){t=i(a,"TR",{},!1);var l=h(t);n=i(l,"TH",{scope:!0},!1);var u=h(n);c=p(u,w),u.forEach(f),e=E(l),r=i(l,"TD",{},!1);var d=h(r);s=p(d,I),d.forEach(f),o=E(l),b=i(l,"TD",{},!1);var g=h(b);_=p(g,N),g.forEach(f),T=E(l),P=i(l,"TD",{},!1);var k=h(P);L&&L.l(k),S=E(k),G&&G.l(k),y=E(k),q&&q.l(k),D=E(k),K&&K.l(k),C=E(k),Q&&Q.l(k),k.forEach(f),O=E(l),l.forEach(f),this.h()},h:function(){d(n,"scope","row")},m:function(a,l){g(a,t,l),k(t,n),k(n,c),k(t,e),k(t,r),k(r,s),k(t,o),k(t,b),k(b,_),k(t,T),k(t,P),L&&L.m(P,null),k(P,S),G&&G.m(P,null),k(P,y),q&&q.m(P,null),k(P,D),K&&K.m(P,null),k(P,C),Q&&Q.m(P,null),k(t,O)},p:function(a,t){a.packages&&w!==(w=t.pkg.name+"")&&m(c,w),a.packages&&I!==(I=t.pkgStatus[t.pkg.status].name+"")&&m(s,I),a.packages&&N!==(N=t.pkg.path+"")&&m(_,N),a.packages&&(x=t.pkgStatus[t.pkg.status].actions.includes("start")),x?L||((L=B(t)).c(),L.m(P,S)):L&&(L.d(1),L=null),a.packages&&(V=t.pkgStatus[t.pkg.status].actions.includes("stop")),V?G||((G=A(t)).c(),G.m(P,y)):G&&(G.d(1),G=null),a.packages&&(j=t.pkgStatus[t.pkg.status].actions.includes("enable")),j?q||((q=H(t)).c(),q.m(P,D)):q&&(q.d(1),q=null),a.packages&&(M=t.pkgStatus[t.pkg.status].actions.includes("disable")),M?K||((K=R(t)).c(),K.m(P,C)):K&&(K.d(1),K=null),a.packages&&(F=t.pkgStatus[t.pkg.status].actions.includes("delete")),F?Q||((Q=U(t)).c(),Q.m(P,null)):Q&&(Q.d(1),Q=null)},d:function(a){a&&f(t),L&&L.d(),G&&G.d(),q&&q.d(),K&&K.d(),Q&&Q.d()}}}function j(a){for(var t,n,c,e,r,s,o,m,C,w,I,B,A,H,R,U,j,M,F,L,G,q,K,Q,Y,z,J,W,X,Z,$,aa,ta,na,ca,ea,ra,sa,oa,la,ua,ia,ha,pa,fa=null!=a.lastError&&x(a),da=a.packages,ga=[],ka=0;ka<da.length;ka+=1)ga[ka]=V(N(a,da,ka));return{c:function(){t=v(),n=l("h2"),c=u("3Bot Package Manager"),e=l("br"),r=l("br"),s=v(),o=l("form"),fa&&fa.c(),m=v(),C=l("div"),w=l("div"),I=l("select"),B=l("option"),A=u("path"),H=l("option"),R=u("giturl"),U=v(),j=l("div"),M=l("div"),F=l("input"),L=v(),G=l("div"),q=l("button"),K=u("Add package"),Q=v(),Y=l("table"),z=l("caption"),J=u("Packages"),W=v(),X=l("thead"),Z=l("tr"),$=l("th"),aa=u("Name"),ta=v(),na=l("th"),ca=u("Status"),ea=v(),ra=l("th"),sa=u("Path"),oa=v(),la=l("th"),ua=u("Actions"),ia=v(),ha=l("tbody");for(var a=0;a<ga.length;a+=1)ga[a].c();this.h()},l:function(a){t=E(a),n=i(a,"H2",{},!1);var l=h(n);c=p(l,"3Bot Package Manager"),l.forEach(f),e=i(a,"BR",{},!1),h(e).forEach(f),r=i(a,"BR",{},!1),h(r).forEach(f),s=E(a),o=i(a,"FORM",{},!1);var u=h(o);fa&&fa.l(u),m=E(u),C=i(u,"DIV",{class:!0},!1);var d=h(C);w=i(d,"DIV",{class:!0},!1);var g=h(w);I=i(g,"SELECT",{class:!0,id:!0},!1);var k=h(I);B=i(k,"OPTION",{value:!0,selected:!0},!1);var v=h(B);A=p(v,"path"),v.forEach(f),H=i(k,"OPTION",{value:!0},!1);var b=h(H);R=p(b,"giturl"),b.forEach(f),k.forEach(f),g.forEach(f),U=E(d),j=i(d,"DIV",{class:!0},!1);var _=h(j);M=i(_,"DIV",{class:!0},!1);var T=h(M);F=i(T,"INPUT",{type:!0,class:!0,id:!0},!1),h(F).forEach(f),T.forEach(f),_.forEach(f),L=E(d),G=i(d,"DIV",{class:!0},!1);var P=h(G);q=i(P,"BUTTON",{type:!0,class:!0},!1);var S=h(q);K=p(S,"Add package"),S.forEach(f),P.forEach(f),d.forEach(f),u.forEach(f),Q=E(a),Y=i(a,"TABLE",{class:!0,style:!0},!1);var y=h(Y);z=i(y,"CAPTION",{},!1);var D=h(z);J=p(D,"Packages"),D.forEach(f),W=E(y),X=i(y,"THEAD",{},!1);var O=h(X);Z=i(O,"TR",{},!1);var N=h(Z);$=i(N,"TH",{scope:!0},!1);var x=h($);aa=p(x,"Name"),x.forEach(f),ta=E(N),na=i(N,"TH",{scope:!0},!1);var V=h(na);ca=p(V,"Status"),V.forEach(f),ea=E(N),ra=i(N,"TH",{scope:!0},!1);var pa=h(ra);sa=p(pa,"Path"),pa.forEach(f),oa=E(N),la=i(N,"TH",{scope:!0},!1);var da=h(la);ua=p(da,"Actions"),da.forEach(f),N.forEach(f),O.forEach(f),ia=E(y),ha=i(y,"TBODY",{},!1);for(var ka=h(ha),ma=0;ma<ga.length;ma+=1)ga[ma].l(ka);ka.forEach(f),y.forEach(f),this.h()},h:function(){document.title="3bot Package Manager",B.__value="path",B.value=B.__value,B.selected=!0,H.__value="git_url",H.value=H.__value,void 0===a.method&&O(function(){return a.select_change_handler.call(I)}),d(I,"class","custom-select mr-sm-3"),d(I,"id","inlineFormCustomSelect"),d(w,"class","col-auto"),d(F,"type","text"),d(F,"class","form-control"),d(F,"id","inlineFormInputGroup"),d(M,"class","input-group mb-2"),d(j,"class","col-6"),d(q,"type","button"),d(q,"class","btn btn-prweblibs/gedis/gedis_http.jsimary mb-2"),d(G,"class","col-auto"),d(C,"class","form-row align-items-center"),d($,"scope","col"),d(na,"scope","col"),d(ra,"scope","col"),d(la,"scope","col"),d(Y,"class","table"),_(Y,"margin-top","20px"),pa=[b(I,"change",a.select_change_handler),b(F,"input",a.input_input_handler),b(q,"click",a.click_handler)]},m:function(l,u){g(l,t,u),g(l,n,u),k(n,c),g(l,e,u),g(l,r,u),g(l,s,u),g(l,o,u),fa&&fa.m(o,null),k(o,m),k(o,C),k(C,w),k(w,I),k(I,B),k(B,A),k(I,H),k(H,R),T(I,a.method),k(C,U),k(C,j),k(j,M),k(M,F),P(F,a.newPackagePath),k(C,L),k(C,G),k(G,q),k(q,K),g(l,Q,u),g(l,Y,u),k(Y,z),k(z,J),k(Y,W),k(Y,X),k(X,Z),k(Z,$),k($,aa),k(Z,ta),k(Z,na),k(na,ca),k(Z,ea),k(Z,ra),k(ra,sa),k(Z,oa),k(Z,la),k(la,ua),k(Y,ia),k(Y,ha);for(var i=0;i<ga.length;i+=1)ga[i].m(ha,null)},p:function(a,t){if(null!=t.lastError?fa?fa.p(a,t):((fa=x(t)).c(),fa.m(o,m)):fa&&(fa.d(1),fa=null),a.method&&T(I,t.method),a.newPackagePath&&F.value!==t.newPackagePath&&P(F,t.newPackagePath),a.pkgStatus||a.packages){var n;for(da=t.packages,n=0;n<da.length;n+=1){var c=N(t,da,n);ga[n]?ga[n].p(a,c):(ga[n]=V(c),ga[n].c(),ga[n].m(ha,null))}for(;n<ga.length;n+=1)ga[n].d(1);ga.length=da.length}},i:S,o:S,d:function(a){a&&(f(t),f(n),f(e),f(r),f(s),f(o)),fa&&fa.d(),a&&(f(Q),f(Y)),y(ga,a),D(pa)}}}function M(a,t,n){var c=new GedisHTTPClient("".concat(location.protocol,"//").concat(location.hostname,"/web/gedis/http")),e="path",r="",s=null,o=[];function l(){c.executeCommand("package_manager","packages_list").then(function(a){if(!a.ok){var t=new Error(a);throw n("lastError",s=t),t}a.json().then(function(a){n("packages",o=a.packages),n("lastError",s=null)})})}function u(){var a={};a[e]=r,c.executeCommand("package_manager","package_add",a).then(function(a){a.ok?(n("lastError",s=null),l()):n("lastError",s="Couldn't add package "+r)})}function i(a){var t={name:a};c.executeCommand("package_manager","package_enable",t).then(function(t){t.ok?(n("lastError",s=null),l()):n("lastError",s="Couldn't enable package "+a)})}function h(a){var t={name:a};c.executeCommand("package_manager","package_disable",t).then(function(t){t.ok?(n("lastError",s=null),l()):n("lastError",s="Couldn't disable package "+a)})}function p(a){var t={name:a};c.executeCommand("package_manager","package_stop",t).then(function(t){t.ok?(n("lastError",s=null),l()):n("lastError",s="Couldn't stop package "+a)})}function f(a){var t={name:a};c.executeCommand("package_manager","package_start",t).then(function(t){t.ok?(n("lastError",s=null),l()):n("lastError",s="Couldn't start package "+a)})}function d(a){var t={name:a};c.executeCommand("package_manager","package_delete",t).then(function(t){t.ok?(n("lastError",s=null),l()):n("lastError",s="Couldn't delete package "+a)})}C(function(){return w.async(function(a){for(;;)switch(a.prev=a.next){case 0:l();case 1:case"end":return a.stop()}})});return{method:e,newPackagePath:r,lastError:s,packages:o,pkgStatus:{0:{name:"Init",actions:["delete"]},1:{name:"Installed",actions:["delete","start"]},2:{name:"Running",actions:["delete","stop"]},3:{name:"Halted",actions:["delete","start","disable"]},4:{name:"Disabled",actions:["delete","enable"]},5:{name:"Error",actions:["delete"]}},packageAdd:u,packageEnable:i,packageDisable:h,packageStop:p,packageStart:f,packageDelete:d,select_change_handler:function(){e=I(this),n("method",e)},input_input_handler:function(){r=this.value,n("newPackagePath",r)},click_handler:function(){return u()},click_handler_1:function(a){return f(a.pkg.name)},click_handler_2:function(a){return p(a.pkg.name)},click_handler_3:function(a){return i(a.pkg.name)},click_handler_4:function(a){return h(a.pkg.name)},click_handler_5:function(a){return d(a.pkg.name)}}}export default(function(l){function u(a){var s;return t(this,u),s=n(this,c(u).call(this)),e(r(s),a,M,j,o,[]),s}return a(u,s),u}());
