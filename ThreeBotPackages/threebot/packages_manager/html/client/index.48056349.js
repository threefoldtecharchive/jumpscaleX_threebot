import{S as a,i as e,s,e as t,t as r,c,a as l,b as o,d as n,f as h,h as i,j as u,w as d,l as p,m as g,E as v,F as f,G as m,n as E,H as k,I as _,J as P,K as b}from"./index.5f98fd0e.js";function w(a){var e,s;return{c(){e=t("div"),s=r(a.lastError),this.h()},l(t){e=c(t,"DIV",{class:!0,role:!0},!1);var r=l(e);s=o(r,a.lastError),r.forEach(n),this.h()},h(){h(e,"class","alert alert-danger"),h(e,"role","alert")},m(a,t){i(a,e,t),u(e,s)},p(a,e){a.lastError&&d(s,e.lastError)},d(a){a&&n(e)}}}function I(a){var e,s,d,_,b,I,T,y,D,O,V,B,x,F,M,N,j,C,G,H,R,S,$,A,U=null!=a.lastError&&w(a);return{c(){e=p(),s=t("h2"),d=r("3Bot Package Manager"),_=t("br"),b=t("br"),I=p(),T=t("form"),U&&U.c(),y=p(),D=t("div"),O=t("div"),V=t("select"),B=t("option"),x=r("path"),F=t("option"),M=r("giturl"),N=p(),j=t("div"),C=t("div"),G=t("input"),H=p(),R=t("div"),S=t("button"),$=r("Add package"),this.h()},l(a){e=g(a),s=c(a,"H2",{},!1);var t=l(s);d=o(t,"3Bot Package Manager"),t.forEach(n),_=c(a,"BR",{},!1),l(_).forEach(n),b=c(a,"BR",{},!1),l(b).forEach(n),I=g(a),T=c(a,"FORM",{},!1);var r=l(T);U&&U.l(r),y=g(r),D=c(r,"DIV",{class:!0},!1);var h=l(D);O=c(h,"DIV",{class:!0},!1);var i=l(O);V=c(i,"SELECT",{class:!0,id:!0},!1);var u=l(V);B=c(u,"OPTION",{value:!0,selected:!0},!1);var p=l(B);x=o(p,"path"),p.forEach(n),F=c(u,"OPTION",{value:!0},!1);var v=l(F);M=o(v,"giturl"),v.forEach(n),u.forEach(n),i.forEach(n),N=g(h),j=c(h,"DIV",{class:!0},!1);var f=l(j);C=c(f,"DIV",{class:!0},!1);var m=l(C);G=c(m,"INPUT",{type:!0,class:!0,id:!0},!1),l(G).forEach(n),m.forEach(n),f.forEach(n),H=g(h),R=c(h,"DIV",{class:!0},!1);var E=l(R);S=c(E,"BUTTON",{type:!0,class:!0},!1);var k=l(S);$=o(k,"Add package"),k.forEach(n),E.forEach(n),h.forEach(n),r.forEach(n),this.h()},h(){document.title="3bot Package Manager",B.__value="path",B.value=B.__value,B.selected=!0,F.__value="git_url",F.value=F.__value,void 0===a.method&&P(()=>a.select_change_handler.call(V)),h(V,"class","custom-select mr-sm-3"),h(V,"id","inlineFormCustomSelect"),h(O,"class","col-auto"),h(G,"type","text"),h(G,"class","form-control"),h(G,"id","inlineFormInputGroup"),h(C,"class","input-group mb-2"),h(j,"class","col-6"),h(S,"type","button"),h(S,"class","btn btn-primary mb-2"),h(R,"class","col-auto"),h(D,"class","form-row align-items-center"),A=[v(V,"change",a.select_change_handler),v(G,"input",a.input_input_handler)]},m(t,r){i(t,e,r),i(t,s,r),u(s,d),i(t,_,r),i(t,b,r),i(t,I,r),i(t,T,r),U&&U.m(T,null),u(T,y),u(T,D),u(D,O),u(O,V),u(V,B),u(B,x),u(V,F),u(F,M),f(V,a.method),u(D,N),u(D,j),u(j,C),u(C,G),m(G,a.newPackagePath),u(D,H),u(D,R),u(R,S),u(S,$)},p(a,e){null!=e.lastError?U?U.p(a,e):((U=w(e)).c(),U.m(T,y)):U&&(U.d(1),U=null),a.method&&f(V,e.method),a.newPackagePath&&G.value!==e.newPackagePath&&m(G,e.newPackagePath)},i:E,o:E,d(a){a&&(n(e),n(s),n(_),n(b),n(I),n(T)),U&&U.d(),k(A)}}}function T(a,e,s){const t=new GedisHTTPClient(`${location.protocol}//${location.hostname}/web/gedis/http`);let r="path",c="",l=null,{packages:o=[]}=e;return _(async()=>{t.actors.package_manager.packages_list().then(a=>{if(!a.ok)throw console.log("bbbbbbb",a),new Error(res);console.log("aaaaaaa",a),s("packages",o=a.json())}).catch(a=>{throw s("lastError",l=a),a})}),a.$set=(a=>{"packages"in a&&s("packages",o=a.packages)}),{method:r,newPackagePath:c,lastError:l,packages:o,select_change_handler:function(){r=b(this),s("method",r)},input_input_handler:function(){c=this.value,s("newPackagePath",c)}}}export default class extends a{constructor(a){super(),e(this,a,T,I,s,["packages"])}}
