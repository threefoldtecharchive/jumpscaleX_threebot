import{S as a,i as e,s as t,l as s,e as c,t as o,m as n,c as r,a as l,b as h,d as i,f as u,E as d,h as p,j as g,F as m,G as v,n as f,H as _,I as k,J as P,K as E}from"./index.5f98fd0e.js";function b(a){var e,t,k,E,b,I,w,T,y,O,x,B,D,N,V,C,F,M,S,G,H,R,$,j;return{c(){e=s(),t=c("h2"),k=o("3Bot Package Manager"),E=c("br"),b=c("br"),I=s(),w=c("form"),T=s(),y=c("div"),O=c("div"),x=c("select"),B=c("option"),D=o("path"),N=c("option"),V=o("giturl"),C=s(),F=c("div"),M=c("div"),S=c("input"),G=s(),H=c("div"),R=c("button"),$=o("Add package"),this.h()},l(a){e=n(a),t=r(a,"H2",{},!1);var s=l(t);k=h(s,"3Bot Package Manager"),s.forEach(i),E=r(a,"BR",{},!1),l(E).forEach(i),b=r(a,"BR",{},!1),l(b).forEach(i),I=n(a),w=r(a,"FORM",{},!1);var c=l(w);T=n(c),y=r(c,"DIV",{class:!0},!1);var o=l(y);O=r(o,"DIV",{class:!0},!1);var u=l(O);x=r(u,"SELECT",{class:!0,id:!0},!1);var d=l(x);B=r(d,"OPTION",{value:!0,selected:!0},!1);var p=l(B);D=h(p,"path"),p.forEach(i),N=r(d,"OPTION",{value:!0},!1);var g=l(N);V=h(g,"giturl"),g.forEach(i),d.forEach(i),u.forEach(i),C=n(o),F=r(o,"DIV",{class:!0},!1);var m=l(F);M=r(m,"DIV",{class:!0},!1);var v=l(M);S=r(v,"INPUT",{type:!0,class:!0,id:!0},!1),l(S).forEach(i),v.forEach(i),m.forEach(i),G=n(o),H=r(o,"DIV",{class:!0},!1);var f=l(H);R=r(f,"BUTTON",{type:!0,class:!0},!1);var _=l(R);$=h(_,"Add package"),_.forEach(i),f.forEach(i),o.forEach(i),c.forEach(i),this.h()},h(){document.title="3bot Package Manager",B.__value="path",B.value=B.__value,B.selected=!0,N.__value="git_url",N.value=N.__value,void 0===a.method&&P(()=>a.select_change_handler.call(x)),u(x,"class","custom-select mr-sm-3"),u(x,"id","inlineFormCustomSelect"),u(O,"class","col-auto"),u(S,"type","text"),u(S,"class","form-control"),u(S,"id","inlineFormInputGroup"),u(M,"class","input-group mb-2"),u(F,"class","col-6"),u(R,"type","button"),u(R,"class","btn btn-primary mb-2"),u(H,"class","col-auto"),u(y,"class","form-row align-items-center"),j=[d(x,"change",a.select_change_handler),d(S,"input",a.input_input_handler)]},m(s,c){p(s,e,c),p(s,t,c),g(t,k),p(s,E,c),p(s,b,c),p(s,I,c),p(s,w,c),g(w,T),g(w,y),g(y,O),g(O,x),g(x,B),g(B,D),g(x,N),g(N,V),m(x,a.method),g(y,C),g(y,F),g(F,M),g(M,S),v(S,a.newPackagePath),g(y,G),g(y,H),g(H,R),g(R,$)},p(a,e){a.method&&m(x,e.method),a.newPackagePath&&S.value!==e.newPackagePath&&v(S,e.newPackagePath)},i:f,o:f,d(a){a&&(i(e),i(t),i(E),i(b),i(I),i(w)),_(j)}}}function I(a,e,t){const s=new GedisHTTPClient(`${location.protocol}//${location.hostname}/web/gedis/http`);let c="path",o="",{packages:n=[]}=e;return k(async()=>{s.executeCommand("package_manager","packages_list").then(a=>{console.log("debug",JSON.stringify(a))})}),a.$set=(a=>{"packages"in a&&t("packages",n=a.packages)}),{method:c,newPackagePath:o,packages:n,select_change_handler:function(){c=E(this),t("method",c)},input_input_handler:function(){o=this.value,t("newPackagePath",o)}}}export default class extends a{constructor(a){super(),e(this,a,I,b,t,["packages"])}}
