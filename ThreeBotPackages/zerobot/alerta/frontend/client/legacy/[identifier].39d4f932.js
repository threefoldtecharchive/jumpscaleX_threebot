import{a as n,b as t,c as i,d as r,i as e,s as f,e as o,S as a,D as u,p as c,A as s,K as m,z as p,l,Y as d,J as $,u as v,v as A,w as g,n as h,B as y,t as b,k as w,C as x}from"./index.5fcb2529.js";import{a as j,b as k,_ as S}from"./index.21fd9a47.js";import{a as N,S as z,A as B,l as C}from"./Spinner.137d97b8.js";function D(n){var t,i=new z({});return{c:function(){v(i.$$.fragment)},l:function(n){A(i.$$.fragment,n)},m:function(n,r){g(i,n,r),t=!0},p:h,i:function(n){t||(p(i.$$.fragment,n),t=!0)},o:function(n){s(i.$$.fragment,n),t=!1},d:function(n){y(i,n)}}}function J(n){var t,i,r,e,f=[Y,K],o=[];function a(n,t){return n[0].identifier?0:1}return t=a(n),i=o[t]=f[t](n),{c:function(){i.c(),r=u()},l:function(n){i.l(n),r=u()},m:function(n,i){o[t].m(n,i),c(n,r,i),e=!0},p:function(n,e){var u=t;(t=a(n))===u?o[t].p(n,e):($(),s(o[u],1,1,function(){o[u]=null}),m(),(i=o[t])||(i=o[t]=f[t](n)).c(),p(i,1),i.m(r.parentNode,r))},i:function(n){e||(p(i),e=!0)},o:function(n){s(i),e=!1},d:function(n){o[t].d(n),n&&l(r)}}}function K(n){var t,i,r;return{c:function(){t=b("Alert of "),i=b(n[1]),r=b(" cannot be found")},l:function(e){t=w(e,"Alert of "),i=w(e,n[1]),r=w(e," cannot be found")},m:function(n,e){c(n,t,e),c(n,i,e),c(n,r,e)},p:function(n,t){2&t&&x(i,n[1])},i:h,o:h,d:function(n){n&&l(t),n&&l(i),n&&l(r)}}}function Y(n){var t,i=new B({props:{myAlert:n[0],levels:C}});return{c:function(){v(i.$$.fragment)},l:function(n){A(i.$$.fragment,n)},m:function(n,r){g(i,n,r),t=!0},p:function(n,t){var r={};1&t&&(r.myAlert=n[0]),i.$set(r)},i:function(n){t||(p(i.$$.fragment,n),t=!0)},o:function(n){s(i.$$.fragment,n),t=!1},d:function(n){y(i,n)}}}function _(n){var t,i,r,e,f=[J,D],o=[];function a(n,t){return n[0]?0:1}return t=a(n),i=o[t]=f[t](n),{c:function(){i.c(),r=u()},l:function(n){i.l(n),r=u()},m:function(n,i){o[t].m(n,i),c(n,r,i),e=!0},p:function(n,e){var u=S(e,1)[0],c=t;(t=a(n))===c?o[t].p(n,u):($(),s(o[c],1,1,function(){o[c]=null}),m(),(i=o[t])||(i=o[t]=f[t](n)).c(),p(i,1),i.m(r.parentNode,r))},i:function(n){e||(p(i),e=!0)},o:function(n){s(i),e=!1},d:function(n){o[t].d(n),n&&l(r)}}}function q(n,t){return E.apply(this,arguments)}function E(){return(E=j(k.mark(function n(t,i){var r;return k.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.params.identifier,n.abrupt("return",{identifier:r});case 2:case"end":return n.stop()}},n)}))).apply(this,arguments)}function F(n,t,i){var r=t.identifier,e=t.myAlert;return d(j(k.mark(function n(){return k.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:N(r).then(function(n){i(0,e=n.data)});case 1:case"end":return n.stop()}},n)}))),n.$set=function(n){"identifier"in n&&i(1,r=n.identifier),"myAlert"in n&&i(0,e=n.myAlert)},[e,r]}export default(function(u){function c(n){var a;return t(this,c),a=i(this,r(c).call(this)),e(o(a),n,F,_,f,{identifier:1,myAlert:0}),a}return n(c,a),c}());export{q as preload};
