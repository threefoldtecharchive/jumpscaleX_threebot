import{_ as a,a as s,b as n,c as e,i as c,s as t,d as r,S as o,q as i,e as u,t as g,r as f,f as p,g as k,h,j as l,m as d,o as m,n as v,L as b,I as x,J as B}from"./index.994cd339.js";function j(a){var s,n,e,c,t;return{c:function(){s=i(),n=u("h2"),e=g("3Bot Package Manager"),c=u("br"),t=u("br"),this.h()},l:function(a){s=f(a),n=p(a,"H2",{},!1);var r=k(n);e=h(r,"3Bot Package Manager"),r.forEach(l),c=p(a,"BR",{},!1),k(c).forEach(l),t=p(a,"BR",{},!1),k(t).forEach(l),this.h()},h:function(){document.title="3bot Package Manager"},m:function(a,r){d(a,s,r),d(a,n,r),m(n,e),d(a,c,r),d(a,t,r)},p:v,i:v,o:v,d:function(a){a&&(l(s),l(n),l(c),l(t))}}}function E(a,s,n){var e=s.packages,c=void 0===e?[]:e;return b(x(B.mark(function a(){return B.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:localGedisClient.executeCommand("package_manager","packages_list").then(function(a){a.ok?(n("packages",c=a.json().packages),console.log("packages",c)):console.log("errrrrror")});case 1:case"end":return a.stop()}},a)}))),a.$set=function(a){"packages"in a&&n("packages",c=a.packages)},{packages:c}}export default(function(i){function u(a){var o;return s(this,u),o=n(this,e(u).call(this)),c(r(o),a,E,j,t,["packages"]),o}return a(u,o),u}());
