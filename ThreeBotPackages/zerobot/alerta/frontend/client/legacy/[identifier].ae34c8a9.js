import{a0 as n,a1 as t,_ as i,b as r,d as e,e as a,i as f,s as o,f as u,S as c,j as s,p as m,x as l,D as p,R as d,C as $,m as v,Z as A,Q as y,z as g,A as h,B as b,y as w,E as x,t as j,q as k,v as N}from"./client.69436dc8.js";import{b as S,S as q,A as z,l as B}from"./data.484de2ab.js";function C(n){var t,i=new q({});return{c:function(){g(i.$$.fragment)},l:function(n){h(i.$$.fragment,n)},m:function(n,r){b(i,n,r),t=!0},p:w,i:function(n){t||($(i.$$.fragment,n),t=!0)},o:function(n){p(i.$$.fragment,n),t=!1},d:function(n){x(i,n)}}}function D(n){var t,i,r,e,a=[Q,E],f=[];function o(n,t){return n[0].identifier?0:1}return t=o(n),i=f[t]=a[t](n),{c:function(){i.c(),r=s()},l:function(n){i.l(n),r=s()},m:function(n,i){f[t].m(n,i),m(n,r,i),e=!0},p:function(n,e){var u=t;(t=o(n))===u?f[t].p(n,e):(y(),p(f[u],1,1,function(){f[u]=null}),d(),(i=f[t])||(i=f[t]=a[t](n)).c(),$(i,1),i.m(r.parentNode,r))},i:function(n){e||($(i),e=!0)},o:function(n){p(i),e=!1},d:function(n){f[t].d(n),n&&v(r)}}}function E(n){var t,i,r;return{c:function(){t=j("Alert of "),i=j(n[1]),r=j(" cannot be found")},l:function(e){t=k(e,"Alert of "),i=k(e,n[1]),r=k(e," cannot be found")},m:function(n,e){m(n,t,e),m(n,i,e),m(n,r,e)},p:function(n,t){2&t&&N(i,n[1])},i:w,o:w,d:function(n){n&&v(t),n&&v(i),n&&v(r)}}}function Q(n){var t,i=new z({props:{myAlert:n[0],levels:B}});return{c:function(){g(i.$$.fragment)},l:function(n){h(i.$$.fragment,n)},m:function(n,r){b(i,n,r),t=!0},p:function(n,t){var r={};1&t&&(r.myAlert=n[0]),i.$set(r)},i:function(n){t||($(i.$$.fragment,n),t=!0)},o:function(n){p(i.$$.fragment,n),t=!1},d:function(n){x(i,n)}}}function R(n){var t,i,r,e,a=[D,C],f=[];function o(n,t){return n[0]?0:1}return t=o(n),i=f[t]=a[t](n),{c:function(){i.c(),r=s()},l:function(n){i.l(n),r=s()},m:function(n,i){f[t].m(n,i),m(n,r,i),e=!0},p:function(n,e){var u=l(e,1)[0],c=t;(t=o(n))===c?f[t].p(n,u):(y(),p(f[c],1,1,function(){f[c]=null}),d(),(i=f[t])||(i=f[t]=a[t](n)).c(),$(i,1),i.m(r.parentNode,r))},i:function(n){e||($(i),e=!0)},o:function(n){p(i),e=!1},d:function(n){f[t].d(n),n&&v(r)}}}function Z(n,t){return _.apply(this,arguments)}function _(){return(_=n(t.mark(function n(i,r){var e;return t.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e=i.params.identifier,n.abrupt("return",{identifier:e});case 2:case"end":return n.stop()}},n)}))).apply(this,arguments)}function F(i,r,e){var a=r.identifier,f=r.myAlert;return A(n(t.mark(function n(){return t.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:S(a).then(function(n){e(0,f=n.data)});case 1:case"end":return n.stop()}},n)}))),i.$set=function(n){"identifier"in n&&e(1,a=n.identifier),"myAlert"in n&&e(0,f=n.myAlert)},[f,a]}export default(function(n){function t(n){var i;return r(this,t),i=e(this,a(t).call(this)),f(u(i),n,F,R,o,{identifier:1,myAlert:0}),i}return i(t,c),t}());export{Z as preload};
