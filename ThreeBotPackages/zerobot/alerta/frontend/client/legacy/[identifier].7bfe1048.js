import{a0 as n,a1 as t,_ as i,b as r,d as f,e,i as a,s as o,f as u,S as c,x as s,o as m,y as l,E as p,R as d,D as $,l as v,Z as A,Q as y,A as b,B as g,C as h,z as w,F as x,t as j,p as k,r as N}from"./client.895fb79f.js";import{b as S,S as z,A as B,l as C}from"./data.f74ae0bb.js";function D(n){var t,i=new z({});return{c:function(){b(i.$$.fragment)},l:function(n){g(i.$$.fragment,n)},m:function(n,r){h(i,n,r),t=!0},p:w,i:function(n){t||($(i.$$.fragment,n),t=!0)},o:function(n){p(i.$$.fragment,n),t=!1},d:function(n){x(i,n)}}}function E(n){var t,i,r,f,e=[Q,F],a=[];function o(n,t){return n[0].identifier?0:1}return t=o(n),i=a[t]=e[t](n),{c:function(){i.c(),r=s()},l:function(n){i.l(n),r=s()},m:function(n,i){a[t].m(n,i),m(n,r,i),f=!0},p:function(n,f){var u=t;(t=o(n))===u?a[t].p(n,f):(y(),p(a[u],1,1,function(){a[u]=null}),d(),(i=a[t])||(i=a[t]=e[t](n)).c(),$(i,1),i.m(r.parentNode,r))},i:function(n){f||($(i),f=!0)},o:function(n){p(i),f=!1},d:function(n){a[t].d(n),n&&v(r)}}}function F(n){var t,i,r;return{c:function(){t=j("Alert of "),i=j(n[1]),r=j(" cannot be found")},l:function(f){t=k(f,"Alert of "),i=k(f,n[1]),r=k(f," cannot be found")},m:function(n,f){m(n,t,f),m(n,i,f),m(n,r,f)},p:function(n,t){2&t&&N(i,n[1])},i:w,o:w,d:function(n){n&&v(t),n&&v(i),n&&v(r)}}}function Q(n){var t,i=new B({props:{myAlert:n[0],levels:C}});return{c:function(){b(i.$$.fragment)},l:function(n){g(i.$$.fragment,n)},m:function(n,r){h(i,n,r),t=!0},p:function(n,t){var r={};1&t&&(r.myAlert=n[0]),i.$set(r)},i:function(n){t||($(i.$$.fragment,n),t=!0)},o:function(n){p(i.$$.fragment,n),t=!1},d:function(n){x(i,n)}}}function R(n){var t,i,r,f,e=[E,D],a=[];function o(n,t){return n[0]?0:1}return t=o(n),i=a[t]=e[t](n),{c:function(){i.c(),r=s()},l:function(n){i.l(n),r=s()},m:function(n,i){a[t].m(n,i),m(n,r,i),f=!0},p:function(n,f){var u=l(f,1)[0],c=t;(t=o(n))===c?a[t].p(n,u):(y(),p(a[c],1,1,function(){a[c]=null}),d(),(i=a[t])||(i=a[t]=e[t](n)).c(),$(i,1),i.m(r.parentNode,r))},i:function(n){f||($(i),f=!0)},o:function(n){p(i),f=!1},d:function(n){a[t].d(n),n&&v(r)}}}function Z(n,t){return _.apply(this,arguments)}function _(){return(_=n(t.mark(function n(i,r){var f;return t.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return f=i.params.identifier,n.abrupt("return",{identifier:f});case 2:case"end":return n.stop()}},n)}))).apply(this,arguments)}function q(i,r,f){var e=r.identifier,a=r.myAlert;return A(n(t.mark(function n(){return t.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:S(e).then(function(n){f(0,a=n.data)});case 1:case"end":return n.stop()}},n)}))),i.$set=function(n){"identifier"in n&&f(1,e=n.identifier),"myAlert"in n&&f(0,a=n.myAlert)},[a,e]}export default(function(n){function t(n){var i;return r(this,t),i=f(this,e(t).call(this)),a(u(i),n,q,R,o,{identifier:1,myAlert:0}),i}return i(t,c),t}());export{Z as preload};
