import{S as a,i as e,s,l as t,e as c,t as o,m as n,c as r,a as l,b as h,d as i,f as u,E as d,h as p,j as g,F as v,G as f,n as m,H as _,I as k,J as P,K as E}from"./index.5f98fd0e.js";function b(a){var e,s,k,E,b,I,w,T,y,O,B,D,N,V,x,F,M,S,C,G,H,R,$,j;return{c(){e=t(),s=c("h2"),k=o("3Bot Package Manager"),E=c("br"),b=c("br"),I=t(),w=c("form"),T=t(),y=c("div"),O=c("div"),B=c("select"),D=c("option"),N=o("path"),V=c("option"),x=o("giturl"),F=t(),M=c("div"),S=c("div"),C=c("input"),G=t(),H=c("div"),R=c("button"),$=o("Add package"),this.h()},l(a){e=n(a),s=r(a,"H2",{},!1);var t=l(s);k=h(t,"3Bot Package Manager"),t.forEach(i),E=r(a,"BR",{},!1),l(E).forEach(i),b=r(a,"BR",{},!1),l(b).forEach(i),I=n(a),w=r(a,"FORM",{},!1);var c=l(w);T=n(c),y=r(c,"DIV",{class:!0},!1);var o=l(y);O=r(o,"DIV",{class:!0},!1);var u=l(O);B=r(u,"SELECT",{class:!0,id:!0},!1);var d=l(B);D=r(d,"OPTION",{value:!0,selected:!0},!1);var p=l(D);N=h(p,"path"),p.forEach(i),V=r(d,"OPTION",{value:!0},!1);var g=l(V);x=h(g,"giturl"),g.forEach(i),d.forEach(i),u.forEach(i),F=n(o),M=r(o,"DIV",{class:!0},!1);var v=l(M);S=r(v,"DIV",{class:!0},!1);var f=l(S);C=r(f,"INPUT",{type:!0,class:!0,id:!0},!1),l(C).forEach(i),f.forEach(i),v.forEach(i),G=n(o),H=r(o,"DIV",{class:!0},!1);var m=l(H);R=r(m,"BUTTON",{type:!0,class:!0},!1);var _=l(R);$=h(_,"Add package"),_.forEach(i),m.forEach(i),o.forEach(i),c.forEach(i),this.h()},h(){document.title="3bot Package Manager",D.__value="path",D.value=D.__value,D.selected=!0,V.__value="git_url",V.value=V.__value,void 0===a.method&&P(()=>a.select_change_handler.call(B)),u(B,"class","custom-select mr-sm-3"),u(B,"id","inlineFormCustomSelect"),u(O,"class","col-auto"),u(C,"type","text"),u(C,"class","form-control"),u(C,"id","inlineFormInputGroup"),u(S,"class","input-group mb-2"),u(M,"class","col-6"),u(R,"type","button"),u(R,"class","btn btn-primary mb-2"),u(H,"class","col-auto"),u(y,"class","form-row align-items-center"),j=[d(B,"change",a.select_change_handler),d(C,"input",a.input_input_handler)]},m(t,c){p(t,e,c),p(t,s,c),g(s,k),p(t,E,c),p(t,b,c),p(t,I,c),p(t,w,c),g(w,T),g(w,y),g(y,O),g(O,B),g(B,D),g(D,N),g(B,V),g(V,x),v(B,a.method),g(y,F),g(y,M),g(M,S),g(S,C),f(C,a.newPackagePath),g(y,G),g(y,H),g(H,R),g(R,$)},p(a,e){a.method&&v(B,e.method),a.newPackagePath&&C.value!==e.newPackagePath&&f(C,e.newPackagePath)},i:m,o:m,d(a){a&&(i(e),i(s),i(E),i(b),i(I),i(w)),_(j)}}}function I(a,e,s){const t=new GedisHTTPClient(`${location.protocol}//${location.hostname}/web/gedis/http`);let c="path",o="",{packages:n=[]}=e;return k(async()=>{t.actors.package_manager.packages_list().then(a=>{console.log("debug",JSON.stringify(a))})}),a.$set=(a=>{"packages"in a&&s("packages",n=a.packages)}),{method:c,newPackagePath:o,packages:n,select_change_handler:function(){c=E(this),s("method",c)},input_input_handler:function(){o=this.value,s("newPackagePath",o)}}}export default class extends a{constructor(a){super(),e(this,a,I,b,s,["packages"])}}
