import{S as a,i as t,s as e,e as l,t as c,c as n,a as s,b as r,d as o,f as u,h as p,j as i,y as h,m as d,p as g,G as k,H as m,I as f,J as E,n as b,K as _,L as v,M as T,N as S,O as C}from"./index.4ed08320.js";function P(a,t,e){const l=Object.create(a);return l.pkg=t[e],l}function y(a){let t,e;return{c(){t=l("div"),e=c(a.lastError),this.h()},l(l){t=n(l,"DIV",{class:!0,role:!0});var c=s(t);e=r(c,a.lastError),c.forEach(o),this.h()},h(){u(t,"class","alert alert-danger"),u(t,"role","alert")},m(a,l){p(a,t,l),i(t,e)},p(a,t){a.lastError&&h(e,t.lastError)},d(a){a&&o(t)}}}function D(a){let t,e,h;function d(...t){return a.click_handler_1(a,...t)}return{c(){t=l("button"),e=c("Start"),this.h()},l(a){t=n(a,"BUTTON",{type:!0,class:!0});var l=s(t);e=r(l,"Start"),l.forEach(o),this.h()},h(){u(t,"type","button"),u(t,"class","btn btn-success btn-sm"),h=k(t,"click",d)},m(a,l){p(a,t,l),i(t,e)},p(t,e){a=e},d(a){a&&o(t),h()}}}function O(a){let t,e,h;function d(...t){return a.click_handler_2(a,...t)}return{c(){t=l("button"),e=c("Stop"),this.h()},l(a){t=n(a,"BUTTON",{type:!0,class:!0});var l=s(t);e=r(l,"Stop"),l.forEach(o),this.h()},h(){u(t,"type","button"),u(t,"class","btn btn-danger btn-sm"),h=k(t,"click",d)},m(a,l){p(a,t,l),i(t,e)},p(t,e){a=e},d(a){a&&o(t),h()}}}function I(a){let t,e,h;function d(...t){return a.click_handler_3(a,...t)}return{c(){t=l("button"),e=c("Enable"),this.h()},l(a){t=n(a,"BUTTON",{type:!0,class:!0});var l=s(t);e=r(l,"Enable"),l.forEach(o),this.h()},h(){u(t,"type","button"),u(t,"class","btn btn-primary btn-sm"),h=k(t,"click",d)},m(a,l){p(a,t,l),i(t,e)},p(t,e){a=e},d(a){a&&o(t),h()}}}function N(a){let t,e,h;function d(...t){return a.click_handler_4(a,...t)}return{c(){t=l("button"),e=c("Disable"),this.h()},l(a){t=n(a,"BUTTON",{type:!0,class:!0});var l=s(t);e=r(l,"Disable"),l.forEach(o),this.h()},h(){u(t,"type","button"),u(t,"class","btn btn-light btn-sm"),h=k(t,"click",d)},m(a,l){p(a,t,l),i(t,e)},p(t,e){a=e},d(a){a&&o(t),h()}}}function x(a){let t,e,h;function d(...t){return a.click_handler_5(a,...t)}return{c(){t=l("button"),e=c("Delete"),this.h()},l(a){t=n(a,"BUTTON",{type:!0,class:!0});var l=s(t);e=r(l,"Delete"),l.forEach(o),this.h()},h(){u(t,"type","button"),u(t,"class","btn btn-dark btn-sm"),h=k(t,"click",d)},m(a,l){p(a,t,l),i(t,e)},p(t,e){a=e},d(a){a&&o(t),h()}}}function B(a){let t,e,k,m,f,E,b,_,v,T,S,C,P,y,B,w,G=a.pkg.name+"",H=a.pkgStatus[a.pkg.status].name+"",A=a.pkg.path+"",U=a.pkgStatus[a.pkg.status].actions.includes("start"),R=a.pkgStatus[a.pkg.status].actions.includes("stop"),V=a.pkgStatus[a.pkg.status].actions.includes("enable"),M=a.pkgStatus[a.pkg.status].actions.includes("disable"),j=a.pkgStatus[a.pkg.status].actions.includes("delete"),F=U&&D(a),L=R&&O(a),J=V&&I(a),K=M&&N(a),Y=j&&x(a);return{c(){t=l("tr"),e=l("th"),k=c(G),m=d(),f=l("td"),E=c(H),b=d(),_=l("td"),v=c(A),T=d(),S=l("td"),F&&F.c(),C=d(),L&&L.c(),P=d(),J&&J.c(),y=d(),K&&K.c(),B=d(),Y&&Y.c(),w=d(),this.h()},l(a){t=n(a,"TR",{});var l=s(t);e=n(l,"TH",{scope:!0});var c=s(e);k=r(c,G),c.forEach(o),m=g(l),f=n(l,"TD",{});var u=s(f);E=r(u,H),u.forEach(o),b=g(l),_=n(l,"TD",{});var p=s(_);v=r(p,A),p.forEach(o),T=g(l),S=n(l,"TD",{});var i=s(S);F&&F.l(i),C=g(i),L&&L.l(i),P=g(i),J&&J.l(i),y=g(i),K&&K.l(i),B=g(i),Y&&Y.l(i),i.forEach(o),w=g(l),l.forEach(o),this.h()},h(){u(e,"scope","row")},m(a,l){p(a,t,l),i(t,e),i(e,k),i(t,m),i(t,f),i(f,E),i(t,b),i(t,_),i(_,v),i(t,T),i(t,S),F&&F.m(S,null),i(S,C),L&&L.m(S,null),i(S,P),J&&J.m(S,null),i(S,y),K&&K.m(S,null),i(S,B),Y&&Y.m(S,null),i(t,w)},p(a,t){a.packages&&G!==(G=t.pkg.name+"")&&h(k,G),a.packages&&H!==(H=t.pkgStatus[t.pkg.status].name+"")&&h(E,H),a.packages&&A!==(A=t.pkg.path+"")&&h(v,A),a.packages&&(U=t.pkgStatus[t.pkg.status].actions.includes("start")),U?F?F.p(a,t):((F=D(t)).c(),F.m(S,C)):F&&(F.d(1),F=null),a.packages&&(R=t.pkgStatus[t.pkg.status].actions.includes("stop")),R?L?L.p(a,t):((L=O(t)).c(),L.m(S,P)):L&&(L.d(1),L=null),a.packages&&(V=t.pkgStatus[t.pkg.status].actions.includes("enable")),V?J?J.p(a,t):((J=I(t)).c(),J.m(S,y)):J&&(J.d(1),J=null),a.packages&&(M=t.pkgStatus[t.pkg.status].actions.includes("disable")),M?K?K.p(a,t):((K=N(t)).c(),K.m(S,B)):K&&(K.d(1),K=null),a.packages&&(j=t.pkgStatus[t.pkg.status].actions.includes("delete")),j?Y?Y.p(a,t):((Y=x(t)).c(),Y.m(S,null)):Y&&(Y.d(1),Y=null)},d(a){a&&o(t),F&&F.d(),L&&L.d(),J&&J.d(),K&&K.d(),Y&&Y.d()}}}function w(a){let t,e,h,T,C,D,O,I,N,x,w,G,H,A,U,R,V,M,j,F,L,J,K,Y,q,z,Q,W,X,Z,$,aa,ta,ea,la,ca,na,sa,ra,oa,ua,pa,ia,ha,da=null!=a.lastError&&y(a),ga=a.packages,ka=[];for(let t=0;t<ga.length;t+=1)ka[t]=B(P(a,ga,t));return{c(){t=d(),e=l("h2"),h=c("3Bot Package Manager"),T=l("br"),C=l("br"),D=d(),O=l("form"),da&&da.c(),I=d(),N=l("div"),x=l("div"),w=l("select"),G=l("option"),H=c("path"),A=l("option"),U=c("giturl"),R=d(),V=l("div"),M=l("div"),j=l("input"),F=d(),L=l("div"),J=l("button"),K=c("Add package"),Y=d(),q=l("table"),z=l("caption"),Q=c("Packages"),W=d(),X=l("thead"),Z=l("tr"),$=l("th"),aa=c("Name"),ta=d(),ea=l("th"),la=c("Status"),ca=d(),na=l("th"),sa=c("Path"),ra=d(),oa=l("th"),ua=c("Actions"),pa=d(),ia=l("tbody");for(let a=0;a<ka.length;a+=1)ka[a].c();this.h()},l(a){t=g(a),e=n(a,"H2",{});var l=s(e);h=r(l,"3Bot Package Manager"),l.forEach(o),T=n(a,"BR",{}),C=n(a,"BR",{}),D=g(a),O=n(a,"FORM",{});var c=s(O);da&&da.l(c),I=g(c),N=n(c,"DIV",{class:!0});var u=s(N);x=n(u,"DIV",{class:!0});var p=s(x);w=n(p,"SELECT",{class:!0,id:!0});var i=s(w);G=n(i,"OPTION",{value:!0,selected:!0});var d=s(G);H=r(d,"path"),d.forEach(o),A=n(i,"OPTION",{value:!0});var k=s(A);U=r(k,"giturl"),k.forEach(o),i.forEach(o),p.forEach(o),R=g(u),V=n(u,"DIV",{class:!0});var m=s(V);M=n(m,"DIV",{class:!0});var f=s(M);j=n(f,"INPUT",{type:!0,class:!0,id:!0}),f.forEach(o),m.forEach(o),F=g(u),L=n(u,"DIV",{class:!0});var E=s(L);J=n(E,"BUTTON",{type:!0,class:!0});var b=s(J);K=r(b,"Add package"),b.forEach(o),E.forEach(o),u.forEach(o),c.forEach(o),Y=g(a),q=n(a,"TABLE",{class:!0,style:!0});var _=s(q);z=n(_,"CAPTION",{});var v=s(z);Q=r(v,"Packages"),v.forEach(o),W=g(_),X=n(_,"THEAD",{});var S=s(X);Z=n(S,"TR",{});var P=s(Z);$=n(P,"TH",{scope:!0});var y=s($);aa=r(y,"Name"),y.forEach(o),ta=g(P),ea=n(P,"TH",{scope:!0});var B=s(ea);la=r(B,"Status"),B.forEach(o),ca=g(P),na=n(P,"TH",{scope:!0});var ha=s(na);sa=r(ha,"Path"),ha.forEach(o),ra=g(P),oa=n(P,"TH",{scope:!0});var ga=s(oa);ua=r(ga,"Actions"),ga.forEach(o),P.forEach(o),S.forEach(o),pa=g(_),ia=n(_,"TBODY",{});var ma=s(ia);for(let a=0;a<ka.length;a+=1)ka[a].l(ma);ma.forEach(o),_.forEach(o),this.h()},h(){document.title="3bot Package Manager",G.__value="path",G.value=G.__value,G.selected=!0,A.__value="git_url",A.value=A.__value,u(w,"class","custom-select mr-sm-3"),u(w,"id","inlineFormCustomSelect"),void 0===a.method&&S(()=>a.select_change_handler.call(w)),u(x,"class","col-auto"),u(j,"type","text"),u(j,"class","form-control"),u(j,"id","inlineFormInputGroup"),u(M,"class","input-group mb-2"),u(V,"class","col-6"),u(J,"type","button"),u(J,"class","btn btn-primary mb-2"),u(L,"class","col-auto"),u(N,"class","form-row align-items-center"),u($,"scope","col"),u(ea,"scope","col"),u(na,"scope","col"),u(oa,"scope","col"),u(q,"class","table"),m(q,"margin-top","20px"),ha=[k(w,"change",a.select_change_handler),k(j,"input",a.input_input_handler),k(J,"click",a.click_handler)]},m(l,c){p(l,t,c),p(l,e,c),i(e,h),p(l,T,c),p(l,C,c),p(l,D,c),p(l,O,c),da&&da.m(O,null),i(O,I),i(O,N),i(N,x),i(x,w),i(w,G),i(G,H),i(w,A),i(A,U),f(w,a.method),i(N,R),i(N,V),i(V,M),i(M,j),E(j,a.newPackagePath),i(N,F),i(N,L),i(L,J),i(J,K),p(l,Y,c),p(l,q,c),i(q,z),i(z,Q),i(q,W),i(q,X),i(X,Z),i(Z,$),i($,aa),i(Z,ta),i(Z,ea),i(ea,la),i(Z,ca),i(Z,na),i(na,sa),i(Z,ra),i(Z,oa),i(oa,ua),i(q,pa),i(q,ia);for(let a=0;a<ka.length;a+=1)ka[a].m(ia,null)},p(a,t){if(null!=t.lastError?da?da.p(a,t):((da=y(t)).c(),da.m(O,I)):da&&(da.d(1),da=null),a.method&&f(w,t.method),a.newPackagePath&&j.value!==t.newPackagePath&&E(j,t.newPackagePath),a.pkgStatus||a.packages||a.packageDelete||a.packageDisable||a.packageEnable||a.packageStop||a.packageStart){let e;for(ga=t.packages,e=0;e<ga.length;e+=1){const l=P(t,ga,e);ka[e]?ka[e].p(a,l):(ka[e]=B(l),ka[e].c(),ka[e].m(ia,null))}for(;e<ka.length;e+=1)ka[e].d(1);ka.length=ga.length}},i:b,o:b,d(a){a&&o(t),a&&o(e),a&&o(T),a&&o(C),a&&o(D),a&&o(O),da&&da.d(),a&&o(Y),a&&o(q),_(ka,a),v(ha)}}}function G(a,t,e){let l="path",c="",n=null,s=[];function r(){localGedisClient.executeCommand("package_manager","packages_list").then(a=>{if(!a.ok){let t=new Error(a);throw e("lastError",n=t),t}a.json().then(a=>{e("packages",s=a.packages),e("lastError",n=null)})})}function o(){let a={};a[l]=c,localGedisClient.executeCommand("package_manager","package_add",a).then(a=>{a.ok?(e("lastError",n=null),r()):e("lastError",n="Couldn't add package "+c)})}function u(a){let t={name:a};localGedisClient.executeCommand("package_manager","package_enable",t).then(t=>{t.ok?(e("lastError",n=null),r()):e("lastError",n="Couldn't enable package "+a)})}function p(a){let t={name:a};localGedisClient.executeCommand("package_manager","package_disable",t).then(t=>{t.ok?(e("lastError",n=null),r()):e("lastError",n="Couldn't disable package "+a)})}function i(a){let t={name:a};localGedisClient.executeCommand("package_manager","package_stop",t).then(t=>{t.ok?(e("lastError",n=null),r()):e("lastError",n="Couldn't stop package "+a)})}function h(a){let t={name:a};localGedisClient.executeCommand("package_manager","package_start",t).then(t=>{t.ok?(e("lastError",n=null),r()):e("lastError",n="Couldn't start package "+a)})}function d(a){let t={name:a};localGedisClient.executeCommand("package_manager","package_delete",t).then(t=>{t.ok?(e("lastError",n=null),r()):e("lastError",n="Couldn't delete package "+a)})}T(async()=>{r()});return{method:l,newPackagePath:c,lastError:n,packages:s,pkgStatus:{0:{name:"Init",actions:["delete"]},1:{name:"Installed",actions:["delete","start"]},2:{name:"Running",actions:["delete","stop"]},3:{name:"Halted",actions:["delete","start","disable"]},4:{name:"Disabled",actions:["delete","enable"]},5:{name:"Error",actions:["delete"]}},packageAdd:o,packageEnable:u,packageDisable:p,packageStop:i,packageStart:h,packageDelete:d,select_change_handler:function(){l=C(this),e("method",l)},input_input_handler:function(){c=this.value,e("newPackagePath",c)},click_handler:()=>o(),click_handler_1:({pkg:a})=>h(a.name),click_handler_2:({pkg:a})=>i(a.name),click_handler_3:({pkg:a})=>u(a.name),click_handler_4:({pkg:a})=>p(a.name),click_handler_5:({pkg:a})=>d(a.name)}}export default class extends a{constructor(a){super(),t(this,a,G,w,e,{})}}
