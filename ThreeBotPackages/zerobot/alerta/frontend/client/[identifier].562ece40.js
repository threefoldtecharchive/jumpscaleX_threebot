import{S as t,i as e,s as n,o as r,h as a,w as s,J as i,v as o,d as l,N as c,I as f,q as m,r as u,u as d,p,x as $,t as A,j as g,l as y}from"./client.e7c55d35.js";import{b as x,S as b,A as h,l as j}from"./data.92929636.js";function w(t){let e;const n=new b({});return{c(){m(n.$$.fragment)},l(t){u(n.$$.fragment,t)},m(t,r){d(n,t,r),e=!0},p:p,i(t){e||(o(n.$$.fragment,t),e=!0)},o(t){s(n.$$.fragment,t),e=!1},d(t){$(n,t)}}}function N(t){let e,n,c,m;const u=[S,v],d=[];function p(t,e){return t[0].identifier?0:1}return e=p(t),n=d[e]=u[e](t),{c(){n.c(),c=r()},l(t){n.l(t),c=r()},m(t,n){d[e].m(t,n),a(t,c,n),m=!0},p(t,r){let a=e;(e=p(t))===a?d[e].p(t,r):(f(),s(d[a],1,1,()=>{d[a]=null}),i(),(n=d[e])||(n=d[e]=u[e](t)).c(),o(n,1),n.m(c.parentNode,c))},i(t){m||(o(n),m=!0)},o(t){s(n),m=!1},d(t){d[e].d(t),t&&l(c)}}}function v(t){let e,n,r;return{c(){e=A("Alert of "),n=A(t[1]),r=A(" cannot be found")},l(a){e=g(a,"Alert of "),n=g(a,t[1]),r=g(a," cannot be found")},m(t,s){a(t,e,s),a(t,n,s),a(t,r,s)},p(t,e){2&e&&y(n,t[1])},i:p,o:p,d(t){t&&l(e),t&&l(n),t&&l(r)}}}function S(t){let e;const n=new h({props:{myAlert:t[0],levels:j}});return{c(){m(n.$$.fragment)},l(t){u(n.$$.fragment,t)},m(t,r){d(n,t,r),e=!0},p(t,e){const r={};1&e&&(r.myAlert=t[0]),n.$set(r)},i(t){e||(o(n.$$.fragment,t),e=!0)},o(t){s(n.$$.fragment,t),e=!1},d(t){$(n,t)}}}function q(t){let e,n,c,m;const u=[N,w],d=[];function p(t,e){return t[0]?0:1}return e=p(t),n=d[e]=u[e](t),{c(){n.c(),c=r()},l(t){n.l(t),c=r()},m(t,n){d[e].m(t,n),a(t,c,n),m=!0},p(t,[r]){let a=e;(e=p(t))===a?d[e].p(t,r):(f(),s(d[a],1,1,()=>{d[a]=null}),i(),(n=d[e])||(n=d[e]=u[e](t)).c(),o(n,1),n.m(c.parentNode,c))},i(t){m||(o(n),m=!0)},o(t){s(n),m=!1},d(t){d[e].d(t),t&&l(c)}}}async function I(t,e){const{identifier:n}=t.params;return{identifier:n}}function J(t,e,n){let{identifier:r}=e,{myAlert:a}=e;return c(async()=>{x(r).then(t=>{n(0,a=t.data)})}),t.$set=(t=>{"identifier"in t&&n(1,r=t.identifier),"myAlert"in t&&n(0,a=t.myAlert)}),[a,r]}export default class extends t{constructor(t){super(),e(this,t,J,q,n,{identifier:1,myAlert:0})}}export{I as preload};
