import{_ as n,a as t,b as r,c as i,i as c,d as o,S as u,s as a,C as e,o as f,z as s,I as m,y as d,k as l,Q as p,H as A,r as $,u as y,v,n as g,A as b,t as h,j as x,B as j}from"./index.222c6d19.js";import{_ as w}from"./index.25a50f90.js";import{c as S,S as N,A as _}from"./Spinner.7b8cac5b.js";function k(n){var t,r=new N({});return{c:function(){$(r.$$.fragment)},l:function(n){y(r.$$.fragment,n)},m:function(n,i){v(r,n,i),t=!0},p:g,i:function(n){t||(d(r.$$.fragment,n),t=!0)},o:function(n){s(r.$$.fragment,n),t=!1},d:function(n){b(r,n)}}}function z(n){var t,r,i,c,o=[C,B],u=[];function a(n,t){return t.myAlert.id?0:1}return t=a(0,n),r=u[t]=o[t](n),{c:function(){r.c(),i=e()},l:function(n){r.l(n),i=e()},m:function(n,r){u[t].m(n,r),f(n,i,r),c=!0},p:function(n,c){var e=t;(t=a(0,c))===e?u[t].p(n,c):(A(),s(u[e],1,1,function(){u[e]=null}),m(),(r=u[t])||(r=u[t]=o[t](c)).c(),d(r,1),r.m(i.parentNode,i))},i:function(n){c||(d(r),c=!0)},o:function(n){s(r),c=!1},d:function(n){u[t].d(n),n&&l(i)}}}function B(n){var t,r,i;return{c:function(){t=h("Alert of "),r=h(n.id),i=h(" cannot be found")},l:function(c){t=x(c,"Alert of "),r=x(c,n.id),i=x(c," cannot be found")},m:function(n,c){f(n,t,c),f(n,r,c),f(n,i,c)},p:function(n,t){n.id&&j(r,t.id)},i:g,o:g,d:function(n){n&&l(t),n&&l(r),n&&l(i)}}}function C(n){var t,r=new _({props:{myAlert:n.myAlert}});return{c:function(){$(r.$$.fragment)},l:function(n){y(r.$$.fragment,n)},m:function(n,i){v(r,n,i),t=!0},p:function(n,t){var i={};n.myAlert&&(i.myAlert=t.myAlert),r.$set(i)},i:function(n){t||(d(r.$$.fragment,n),t=!0)},o:function(n){s(r.$$.fragment,n),t=!1},d:function(n){b(r,n)}}}function H(n){var t,r,i,c,o=[z,k],u=[];function a(n,t){return t.myAlert?0:1}return t=a(0,n),r=u[t]=o[t](n),{c:function(){r.c(),i=e()},l:function(n){r.l(n),i=e()},m:function(n,r){u[t].m(n,r),f(n,i,r),c=!0},p:function(n,c){var e=t;(t=a(0,c))===e?u[t].p(n,c):(A(),s(u[e],1,1,function(){u[e]=null}),m(),(r=u[t])||(r=u[t]=o[t](c)).c(),d(r,1),r.m(i.parentNode,i))},i:function(n){c||(d(r),c=!0)},o:function(n){s(r),c=!1},d:function(n){u[t].d(n),n&&l(i)}}}function I(n,t){var r;return w.async(function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.params.id,t.abrupt("return",{id:r});case 2:case"end":return t.stop()}})}function Q(n,t,r){var i=t.id,c=t.myAlert;return p(function(){return w.async(function(n){for(;;)switch(n.prev=n.next){case 0:S(i).then(function(n){r("myAlert",c=n.data)});case 1:case"end":return n.stop()}})}),n.$set=function(n){"id"in n&&r("id",i=n.id),"myAlert"in n&&r("myAlert",c=n.myAlert)},{id:i,myAlert:c}}export default(function(e){function f(n){var u;return t(this,f),u=r(this,i(f).call(this)),c(o(u),n,Q,H,a,{id:0,myAlert:0}),u}return n(f,u),f}());export{I as preload};
