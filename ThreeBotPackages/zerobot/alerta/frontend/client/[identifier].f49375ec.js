import{S as t,i as e,s as n,b as r,j as a,v as s,J as i,u as o,f as c,N as l,I as f,p as m,q as u,r as d,o as p,w as $,t as A,k as g,m as y}from"./client.186cb6ed.js";import{b,S as j,A as w,l as x}from"./data.da2211c7.js";function N(t){let e;const n=new j({});return{c(){m(n.$$.fragment)},l(t){u(n.$$.fragment,t)},m(t,r){d(n,t,r),e=!0},p:p,i(t){e||(o(n.$$.fragment,t),e=!0)},o(t){s(n.$$.fragment,t),e=!1},d(t){$(n,t)}}}function h(t){let e,n,l,m;const u=[S,v],d=[];function p(t,e){return t[0].identifier?0:1}return e=p(t),n=d[e]=u[e](t),{c(){n.c(),l=r()},l(t){n.l(t),l=r()},m(t,n){d[e].m(t,n),a(t,l,n),m=!0},p(t,r){let a=e;(e=p(t))===a?d[e].p(t,r):(f(),s(d[a],1,1,()=>{d[a]=null}),i(),(n=d[e])||(n=d[e]=u[e](t)).c(),o(n,1),n.m(l.parentNode,l))},i(t){m||(o(n),m=!0)},o(t){s(n),m=!1},d(t){d[e].d(t),t&&c(l)}}}function v(t){let e,n,r;return{c(){e=A("Alert of "),n=A(t[1]),r=A(" cannot be found")},l(a){e=g(a,"Alert of "),n=g(a,t[1]),r=g(a," cannot be found")},m(t,s){a(t,e,s),a(t,n,s),a(t,r,s)},p(t,e){2&e&&y(n,t[1])},i:p,o:p,d(t){t&&c(e),t&&c(n),t&&c(r)}}}function S(t){let e;const n=new w({props:{myAlert:t[0],levels:x}});return{c(){m(n.$$.fragment)},l(t){u(n.$$.fragment,t)},m(t,r){d(n,t,r),e=!0},p(t,e){const r={};1&e&&(r.myAlert=t[0]),n.$set(r)},i(t){e||(o(n.$$.fragment,t),e=!0)},o(t){s(n.$$.fragment,t),e=!1},d(t){$(n,t)}}}function k(t){let e,n,l,m;const u=[h,N],d=[];function p(t,e){return t[0]?0:1}return e=p(t),n=d[e]=u[e](t),{c(){n.c(),l=r()},l(t){n.l(t),l=r()},m(t,n){d[e].m(t,n),a(t,l,n),m=!0},p(t,[r]){let a=e;(e=p(t))===a?d[e].p(t,r):(f(),s(d[a],1,1,()=>{d[a]=null}),i(),(n=d[e])||(n=d[e]=u[e](t)).c(),o(n,1),n.m(l.parentNode,l))},i(t){m||(o(n),m=!0)},o(t){s(n),m=!1},d(t){d[e].d(t),t&&c(l)}}}async function q(t,e){const{identifier:n}=t.params;return{identifier:n}}function I(t,e,n){let{identifier:r}=e,{myAlert:a}=e;return l(async()=>{b(r).then(t=>{n(0,a=t.data)})}),t.$set=(t=>{"identifier"in t&&n(1,r=t.identifier),"myAlert"in t&&n(0,a=t.myAlert)}),[a,r]}export default class extends t{constructor(t){super(),e(this,t,I,k,n,{identifier:1,myAlert:0})}}export{q as preload};
