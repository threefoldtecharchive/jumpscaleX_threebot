import{S as e,i as t,s as a,e as s,p as r,f as n,h,k as i,r as o,u as p,m as c,l as u,n as l,J as m}from"./index.9569dcac.js";import{a as g}from"./app.40fc729e.js";import{s as d}from"./showdown.28949a86.js";function f(e){var t,a,m,g,d=e.converter.makeHtml(e.thepage.content)+"";return document.title=t=e.thepage.title,{c(){a=s("link"),m=r(),g=s("div"),this.h()},l(e){a=n(e,"LINK",{rel:!0,href:!0},!1),h(a).forEach(i),m=o(e),g=n(e,"DIV",{class:!0},!1),h(g).forEach(i),this.h()},h(){p(a,"rel","stylesheet"),p(a,"href","//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.8/build/styles/default.min.css"),p(g,"class","content svelte-hmgdk5")},m(e,t){c(document.head,a),u(e,m,t),u(e,g,t),g.innerHTML=d},p(e,a){e.thepage&&t!==(t=a.thepage.title)&&(document.title=t),e.thepage&&d!==(d=a.converter.makeHtml(a.thepage.content)+"")&&(g.innerHTML=d)},i:l,o:l,d(e){i(a),e&&(i(m),i(g))}}}async function v({params:e,query:t}){const a=await this.fetch(`${e.theuser}/pages/${e.slug}.json`),s=await a.json();if(200===a.status)return{thepage:s};this.error(a.status,s.message)}function $(e,t,a){let s,{thepage:r={}}=t;const{preloading:n,page:h,session:i}=g();m(e,h,e=>{a("$page",s=e)});let{username:o=s.params.theuser}=t;const p={h1:"ui large header",h2:"ui medium header",ul:"ui list",li:"ui item"};Object.keys(p).map(e=>({type:"output",regex:new RegExp(`<${e}(.*)>`,"g"),replace:`<${e} class="${p[e]}" $1>`}));let c,u=new d.Converter({metadata:!0});return u.setFlavor("github"),e.$set=(e=>{"thepage"in e&&a("thepage",r=e.thepage),"username"in e&&a("username",o=e.username)}),e.$$.update=((e={converter:1,thepage:1})=>{(e.converter||e.thepage)&&(c=u.makeHtml(r.content))}),{thepage:r,page:h,username:o,converter:u}}export default class extends e{constructor(e){super(),t(this,e,$,f,a,["thepage","username"])}}export{v as preload};
