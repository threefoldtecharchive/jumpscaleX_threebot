import{S as t,i as n,s as e,y as r,j as a,v as s,F as i,u as o,f as c,R as f,E as l,m,o as u,p as d,n as p,w as $,t as y,d as A,x as g}from"./index.9c196a74.js";import{b,S as x,A as j,l as w}from"./data.b9deb335.js";function h(t){let n;const e=new x({});return{c(){m(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,r){d(e,t,r),n=!0},p:p,i(t){n||(o(e.$$.fragment,t),n=!0)},o(t){s(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function v(t){let n,e,f,m;const u=[S,N],d=[];function p(t,n){return t[0].identifier?0:1}return n=p(t),e=d[n]=u[n](t),{c(){e.c(),f=r()},l(t){e.l(t),f=r()},m(t,e){d[n].m(t,e),a(t,f,e),m=!0},p(t,r){let a=n;(n=p(t))===a?d[n].p(t,r):(l(),s(d[a],1,1,()=>{d[a]=null}),i(),(e=d[n])||(e=d[n]=u[n](t)).c(),o(e,1),e.m(f.parentNode,f))},i(t){m||(o(e),m=!0)},o(t){s(e),m=!1},d(t){d[n].d(t),t&&c(f)}}}function N(t){let n,e,r;return{c(){n=y("Alert of "),e=y(t[1]),r=y(" cannot be found")},l(a){n=A(a,"Alert of "),e=A(a,t[1]),r=A(a," cannot be found")},m(t,s){a(t,n,s),a(t,e,s),a(t,r,s)},p(t,n){2&n&&g(e,t[1])},i:p,o:p,d(t){t&&c(n),t&&c(e),t&&c(r)}}}function S(t){let n;const e=new j({props:{myAlert:t[0],levels:w}});return{c(){m(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,r){d(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.myAlert=t[0]),e.$set(r)},i(t){n||(o(e.$$.fragment,t),n=!0)},o(t){s(e.$$.fragment,t),n=!1},d(t){$(e,t)}}}function E(t){let n,e,f,m;const u=[v,h],d=[];function p(t,n){return t[0]?0:1}return n=p(t),e=d[n]=u[n](t),{c(){e.c(),f=r()},l(t){e.l(t),f=r()},m(t,e){d[n].m(t,e),a(t,f,e),m=!0},p(t,[r]){let a=n;(n=p(t))===a?d[n].p(t,r):(l(),s(d[a],1,1,()=>{d[a]=null}),i(),(e=d[n])||(e=d[n]=u[n](t)).c(),o(e,1),e.m(f.parentNode,f))},i(t){m||(o(e),m=!0)},o(t){s(e),m=!1},d(t){d[n].d(t),t&&c(f)}}}async function F(t,n){const{identifier:e}=t.params;return{identifier:e}}function R(t,n,e){let{identifier:r}=n,{myAlert:a}=n;return f(async()=>{b(r).then(t=>{e(0,a=t.data)})}),t.$set=(t=>{"identifier"in t&&e(1,r=t.identifier),"myAlert"in t&&e(0,a=t.myAlert)}),[a,r]}export default class extends t{constructor(t){super(),n(this,t,R,E,e,{identifier:1,myAlert:0})}}export{F as preload};
