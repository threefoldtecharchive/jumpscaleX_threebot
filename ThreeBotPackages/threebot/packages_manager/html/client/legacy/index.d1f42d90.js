import{_ as a,a as t,b as e,c,i as s,s as n,d as o,S as r,q as i,e as l,t as u,r as h,f,g as p,h as d,j as g,k as v,L as m,m as _,o as k,M as P,N as E,n as b,O as w,P as I,Q as O,I as T,J as y,R as N}from"./index.9a30a072.js";function B(a){var t,e,c,s,n,o,r,I,T,y,N,B,D,M,V,x,R,S,C,F,j,A,G,H;return{c:function(){t=i(),e=l("h2"),c=u("3Bot Package Manager"),s=l("br"),n=l("br"),o=i(),r=l("form"),I=i(),T=l("div"),y=l("div"),N=l("select"),B=l("option"),D=u("path"),M=l("option"),V=u("giturl"),x=i(),R=l("div"),S=l("div"),C=l("input"),F=i(),j=l("div"),A=l("button"),G=u("Add package"),this.h()},l:function(a){t=h(a),e=f(a,"H2",{},!1);var i=p(e);c=d(i,"3Bot Package Manager"),i.forEach(g),s=f(a,"BR",{},!1),p(s).forEach(g),n=f(a,"BR",{},!1),p(n).forEach(g),o=h(a),r=f(a,"FORM",{},!1);var l=p(r);I=h(l),T=f(l,"DIV",{class:!0},!1);var u=p(T);y=f(u,"DIV",{class:!0},!1);var v=p(y);N=f(v,"SELECT",{class:!0,id:!0},!1);var m=p(N);B=f(m,"OPTION",{value:!0,selected:!0},!1);var _=p(B);D=d(_,"path"),_.forEach(g),M=f(m,"OPTION",{value:!0},!1);var k=p(M);V=d(k,"giturl"),k.forEach(g),m.forEach(g),v.forEach(g),x=h(u),R=f(u,"DIV",{class:!0},!1);var P=p(R);S=f(P,"DIV",{class:!0},!1);var E=p(S);C=f(E,"INPUT",{type:!0,class:!0,id:!0},!1),p(C).forEach(g),E.forEach(g),P.forEach(g),F=h(u),j=f(u,"DIV",{class:!0},!1);var b=p(j);A=f(b,"BUTTON",{type:!0,class:!0},!1);var w=p(A);G=d(w,"Add package"),w.forEach(g),b.forEach(g),u.forEach(g),l.forEach(g),this.h()},h:function(){document.title="3bot Package Manager",B.__value="path",B.value=B.__value,B.selected=!0,M.__value="git_url",M.value=M.__value,void 0===a.method&&O(function(){return a.select_change_handler.call(N)}),v(N,"class","custom-select mr-sm-3"),v(N,"id","inlineFormCustomSelect"),v(y,"class","col-auto"),v(C,"type","text"),v(C,"class","form-control"),v(C,"id","inlineFormInputGroup"),v(S,"class","input-group mb-2"),v(R,"class","col-6"),v(A,"type","button"),v(A,"class","btn btn-primary mb-2"),v(j,"class","col-auto"),v(T,"class","form-row align-items-center"),H=[m(N,"change",a.select_change_handler),m(C,"input",a.input_input_handler)]},m:function(i,l){_(i,t,l),_(i,e,l),k(e,c),_(i,s,l),_(i,n,l),_(i,o,l),_(i,r,l),k(r,I),k(r,T),k(T,y),k(y,N),k(N,B),k(B,D),k(N,M),k(M,V),P(N,a.method),k(T,x),k(T,R),k(R,S),k(S,C),E(C,a.newPackagePath),k(T,F),k(T,j),k(j,A),k(A,G)},p:function(a,t){a.method&&P(N,t.method),a.newPackagePath&&C.value!==t.newPackagePath&&E(C,t.newPackagePath)},i:b,o:b,d:function(a){a&&(g(t),g(e),g(s),g(n),g(o),g(r)),w(H)}}}function D(a,t,e){var c=new GedisHTTPClient("".concat(location.protocol,"//").concat(location.hostname,"/web/gedis/http")),s="path",n="",o=t.packages,r=void 0===o?[]:o;return I(T(y.mark(function a(){return y.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:c.actors.package_manager.packages_list().then(function(a){console.log("debug",JSON.stringify(a))});case 1:case"end":return a.stop()}},a)}))),a.$set=function(a){"packages"in a&&e("packages",r=a.packages)},{method:s,newPackagePath:n,packages:r,select_change_handler:function(){s=N(this),e("method",s)},input_input_handler:function(){n=this.value,e("newPackagePath",n)}}}export default(function(i){function l(a){var r;return t(this,l),r=e(this,c(l).call(this)),s(o(r),a,D,B,n,["packages"]),r}return a(l,r),l}());
