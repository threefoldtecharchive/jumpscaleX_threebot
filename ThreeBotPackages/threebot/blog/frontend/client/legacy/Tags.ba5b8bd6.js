import{_ as n,a,b as r,c as s,i as t,s as i,d as o,S as e,j as f,k as u,v as c,l as h,m as l,o as v,p as g,x as m,y as p,q as d,r as b,u as j,n as x,P as E,X as P}from"./index.90b7e5dc.js";import{_ as A,a as S}from"./app.7b9d4ac4.js";function _(n,a,r){var s=n.slice();return s[6]=a[r],s}function k(n){var a,r,s,t,i,o,e=n[6]+"";return{c:function(){a=f("a"),r=f("p"),s=u("#"),t=u(e),o=c(),this.h()},l:function(n){a=h(n,"A",{href:!0});var i=l(a);r=h(i,"P",{});var f=l(r);s=v(f,"#"),t=v(f,e),f.forEach(g),i.forEach(g),o=m(n),this.h()},h:function(){p(a,"href",i=n[1]+"/tags/"+n[6].trim())},m:function(n,i){d(n,a,i),b(a,r),b(r,s),b(r,t),d(n,o,i)},p:function(n,r){1&r&&e!==(e=n[6]+"")&&j(t,e),3&r&&i!==(i=n[1]+"/tags/"+n[6].trim())&&p(a,"href",i)},d:function(n){n&&g(a),n&&g(o)}}}function q(n){for(var a,r=n[0],s=[],t=0;t<r.length;t+=1)s[t]=k(_(n,r,t));return{c:function(){a=f("span");for(var n=0;n<s.length;n+=1)s[n].c()},l:function(n){a=h(n,"SPAN",{});for(var r=l(a),t=0;t<s.length;t+=1)s[t].l(r);r.forEach(g)},m:function(n,r){d(n,a,r);for(var t=0;t<s.length;t+=1)s[t].m(a,null)},p:function(n,t){var i=A(t,1)[0];if(3&i){var o;for(r=n[0],o=0;o<r.length;o+=1){var e=_(n,r,o);s[o]?s[o].p(e,i):(s[o]=k(e),s[o].c(),s[o].m(a,null))}for(;o<s.length;o+=1)s[o].d(1);s.length=r.length}},i:x,o:x,d:function(n){n&&g(a),E(s,n)}}}function y(n,a,r){var s,t=a.tags,i=void 0===t?[]:t,o=S(),e=(o.preloading,o.page);o.session;P(n,e,function(n){return r(3,s=n)});var f=a.username,u=void 0===f?s.params.theuser:f;return n.$set=function(n){"tags"in n&&r(0,i=n.tags),"username"in n&&r(1,u=n.username)},[i,u,e]}var N=function(f){function u(n){var e;return a(this,u),e=r(this,s(u).call(this)),t(o(e),n,y,q,i,{tags:0,username:1}),e}return n(u,e),u}();export{N as T};
