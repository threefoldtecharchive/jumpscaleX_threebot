import{_ as a,a as n,b as s,c as e,i as t,s as c,d as o,S as r,q as i,e as u,t as f,r as g,f as h,g as p,h as k,j as l,m as d,o as m,n as v,L as b,I as x,J as B}from"./index.994cd339.js";function j(a){var n,s,e,t,c;return{c:function(){n=i(),s=u("h2"),e=f("3Bot Package Manager"),t=u("br"),c=u("br"),this.h()},l:function(a){n=g(a),s=h(a,"H2",{},!1);var o=p(s);e=k(o,"3Bot Package Manager"),o.forEach(l),t=h(a,"BR",{},!1),p(t).forEach(l),c=h(a,"BR",{},!1),p(c).forEach(l),this.h()},h:function(){document.title="3bot Package Manager"},m:function(a,o){d(a,n,o),d(a,s,o),m(s,e),d(a,t,o),d(a,c,o)},p:v,i:v,o:v,d:function(a){a&&(l(n),l(s),l(t),l(c))}}}function E(a,n,s){var e=n.packages,t=void 0===e?[]:e;return b(x(B.mark(function a(){return B.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:localGedisClient.executeCommand("package_manager","packages_list").then(function(a){console.log("packages",a.json())});case 1:case"end":return a.stop()}},a)}))),a.$set=function(a){"packages"in a&&s("packages",t=a.packages)},{packages:t}}export default(function(i){function u(a){var r;return n(this,u),r=s(this,e(u).call(this)),t(o(r),a,E,j,c,["packages"]),r}return a(u,r),u}());
