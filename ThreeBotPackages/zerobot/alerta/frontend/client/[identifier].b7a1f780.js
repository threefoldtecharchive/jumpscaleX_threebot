import{S as t,i as n,s as e,n as r,f as a,v as s,J as i,u as o,d as c,N as l,I as f,p as m,q as u,r as d,o as p,w as $,t as A,h as g,l as y}from"./client.65c0a831.js";import{b,S as h,A as w,l as x}from"./data.b8ab9ec7.js";function N(t){let n;const e=new h({});return{c(){m(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,r){d(e,t,r),n=!0},p:p,i(t){n||(o(e.$$.fragment,t),n=!0)},o(t){s(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function j(t){let n,e,l,m;const u=[S,v],d=[];function p(t,n){return t[0].identifier?0:1}return n=p(t),e=d[n]=u[n](t),{c(){e.c(),l=r()},l(t){e.l(t),l=r()},m(t,e){d[n].m(t,e),a(t,l,e),m=!0},p(t,r){let a=n;(n=p(t))===a?d[n].p(t,r):(f(),s(d[a],1,1,()=>{d[a]=null}),i(),(e=d[n])||(e=d[n]=u[n](t)).c(),o(e,1),e.m(l.parentNode,l))},i(t){m||(o(e),m=!0)},o(t){s(e),m=!1},d(t){d[n].d(t),t&&c(l)}}}function v(t){let n,e,r;return{c(){n=A("Alert of "),e=A(t[1]),r=A(" cannot be found")},l(a){n=g(a,"Alert of "),e=g(a,t[1]),r=g(a," cannot be found")},m(t,s){a(t,n,s),a(t,e,s),a(t,r,s)},p(t,n){2&n&&y(e,t[1])},i:p,o:p,d(t){t&&c(n),t&&c(e),t&&c(r)}}}function S(t){let n;const e=new w({props:{myAlert:t[0],levels:x}});return{c(){m(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,r){d(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.myAlert=t[0]),e.$set(r)},i(t){n||(o(e.$$.fragment,t),n=!0)},o(t){s(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function q(t){let n,e,l,m;const u=[j,N],d=[];function p(t,n){return t[0]?0:1}return n=p(t),e=d[n]=u[n](t),{c(){e.c(),l=r()},l(t){e.l(t),l=r()},m(t,e){d[n].m(t,e),a(t,l,e),m=!0},p(t,[r]){let a=n;(n=p(t))===a?d[n].p(t,r):(f(),s(d[a],1,1,()=>{d[a]=null}),i(),(e=d[n])||(e=d[n]=u[n](t)).c(),o(e,1),e.m(l.parentNode,l))},i(t){m||(o(e),m=!0)},o(t){s(e),m=!1},d(t){d[n].d(t),t&&c(l)}}}async function I(t,n){const{identifier:e}=t.params;return{identifier:e}}function J(t,n,e){let{identifier:r}=n,{myAlert:a}=n;return l(async()=>{b(r).then(t=>{e(0,a=t.data)})}),t.$set=(t=>{"identifier"in t&&e(1,r=t.identifier),"myAlert"in t&&e(0,a=t.myAlert)}),[a,r]}export default class extends t{constructor(t){super(),n(this,t,J,q,e,{identifier:1,myAlert:0})}}export{I as preload};