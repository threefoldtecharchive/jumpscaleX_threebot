import{a0 as n,a1 as t,_ as i,b as r,d as e,e as f,i as a,s as o,f as u,S as c,x as s,o as m,y as l,E as p,R as d,D as $,l as v,Z as A,Q as y,A as g,B as h,C as b,z as w,F as x,t as j,p as k,r as N}from"./client.3e1747f8.js";import{b as S,S as z,A as B,l as C}from"./data.24b8f63c.js";function D(n){var t,i=new z({});return{c:function(){g(i.$$.fragment)},l:function(n){h(i.$$.fragment,n)},m:function(n,r){b(i,n,r),t=!0},p:w,i:function(n){t||($(i.$$.fragment,n),t=!0)},o:function(n){p(i.$$.fragment,n),t=!1},d:function(n){x(i,n)}}}function E(n){var t,i,r,e,f=[Q,F],a=[];function o(n,t){return n[0].identifier?0:1}return t=o(n),i=a[t]=f[t](n),{c:function(){i.c(),r=s()},l:function(n){i.l(n),r=s()},m:function(n,i){a[t].m(n,i),m(n,r,i),e=!0},p:function(n,e){var u=t;(t=o(n))===u?a[t].p(n,e):(y(),p(a[u],1,1,function(){a[u]=null}),d(),(i=a[t])||(i=a[t]=f[t](n)).c(),$(i,1),i.m(r.parentNode,r))},i:function(n){e||($(i),e=!0)},o:function(n){p(i),e=!1},d:function(n){a[t].d(n),n&&v(r)}}}function F(n){var t,i,r;return{c:function(){t=j("Alert of "),i=j(n[1]),r=j(" cannot be found")},l:function(e){t=k(e,"Alert of "),i=k(e,n[1]),r=k(e," cannot be found")},m:function(n,e){m(n,t,e),m(n,i,e),m(n,r,e)},p:function(n,t){2&t&&N(i,n[1])},i:w,o:w,d:function(n){n&&v(t),n&&v(i),n&&v(r)}}}function Q(n){var t,i=new B({props:{myAlert:n[0],levels:C}});return{c:function(){g(i.$$.fragment)},l:function(n){h(i.$$.fragment,n)},m:function(n,r){b(i,n,r),t=!0},p:function(n,t){var r={};1&t&&(r.myAlert=n[0]),i.$set(r)},i:function(n){t||($(i.$$.fragment,n),t=!0)},o:function(n){p(i.$$.fragment,n),t=!1},d:function(n){x(i,n)}}}function R(n){var t,i,r,e,f=[E,D],a=[];function o(n,t){return n[0]?0:1}return t=o(n),i=a[t]=f[t](n),{c:function(){i.c(),r=s()},l:function(n){i.l(n),r=s()},m:function(n,i){a[t].m(n,i),m(n,r,i),e=!0},p:function(n,e){var u=l(e,1)[0],c=t;(t=o(n))===c?a[t].p(n,u):(y(),p(a[c],1,1,function(){a[c]=null}),d(),(i=a[t])||(i=a[t]=f[t](n)).c(),$(i,1),i.m(r.parentNode,r))},i:function(n){e||($(i),e=!0)},o:function(n){p(i),e=!1},d:function(n){a[t].d(n),n&&v(r)}}}function Z(n,t){return _.apply(this,arguments)}function _(){return(_=n(t.mark(function n(i,r){var e;return t.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e=i.params.identifier,n.abrupt("return",{identifier:e});case 2:case"end":return n.stop()}},n)}))).apply(this,arguments)}function q(i,r,e){var f=r.identifier,a=r.myAlert;return A(n(t.mark(function n(){return t.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:S(f).then(function(n){e(0,a=n.data)});case 1:case"end":return n.stop()}},n)}))),i.$set=function(n){"identifier"in n&&e(1,f=n.identifier),"myAlert"in n&&e(0,a=n.myAlert)},[a,f]}export default(function(n){function t(n){var i;return r(this,t),i=e(this,f(t).call(this)),a(u(i),n,q,R,o,{identifier:1,myAlert:0}),i}return i(t,c),t}());export{Z as preload};
