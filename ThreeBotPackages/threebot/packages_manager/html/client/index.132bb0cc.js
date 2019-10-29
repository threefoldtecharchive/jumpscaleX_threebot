import{S as a,i as t,s as e,e as s,t as c,c as r,a as o,b as l,d as n,f as h,h as p,j as i,w as g,l as u,m as d,E as f,F as m,G as v,H as E,n as k,I as P,J as T,K as _,L as b,M as I}from"./index.92d55523.js";function w(a,t,e){const s=Object.create(a);return s.pkg=t[e],s}function D(a){var t,e;return{c(){t=s("div"),e=c(a.lastError),this.h()},l(s){t=r(s,"DIV",{class:!0,role:!0},!1);var c=o(t);e=l(c,a.lastError),c.forEach(n),this.h()},h(){h(t,"class","alert alert-danger"),h(t,"role","alert")},m(a,s){p(a,t,s),i(t,e)},p(a,t){a.lastError&&g(e,t.lastError)},d(a){a&&n(t)}}}function H(a){var t,e,f,m,v,E,k,P,T,_,b,I,w=a.pkg.name+"",D=a.pkgStatus[a.pkg.status].name+"",H=a.pkg.path+"";return{c(){t=s("tr"),e=s("th"),f=c(w),m=u(),v=s("td"),E=c(D),k=u(),P=s("td"),T=c(H),_=u(),b=s("td"),I=u(),this.h()},l(a){t=r(a,"TR",{},!1);var s=o(t);e=r(s,"TH",{scope:!0},!1);var c=o(e);f=l(c,w),c.forEach(n),m=d(s),v=r(s,"TD",{},!1);var h=o(v);E=l(h,D),h.forEach(n),k=d(s),P=r(s,"TD",{},!1);var p=o(P);T=l(p,H),p.forEach(n),_=d(s),b=r(s,"TD",{},!1),o(b).forEach(n),I=d(s),s.forEach(n),this.h()},h(){h(e,"scope","row")},m(a,s){p(a,t,s),i(t,e),i(e,f),i(t,m),i(t,v),i(v,E),i(t,k),i(t,P),i(P,T),i(t,_),i(t,b),i(t,I)},p(a,t){a.packages&&w!==(w=t.pkg.name+"")&&g(f,w),a.packages&&D!==(D=t.pkgStatus[t.pkg.status].name+"")&&g(E,D),a.packages&&H!==(H=t.pkg.path+"")&&g(T,H)},d(a){a&&n(t)}}}function O(a){var t,e,g,_,I,O,S,y,N,A,B,x,R,V,C,M,j,F,G,L,$,J,U,K,Y,q,z,Q,W,X,Z,aa,ta,ea,sa,ca,ra,oa,la,na,ha,pa,ia,ga,ua=null!=a.lastError&&D(a);let da=a.packages,fa=[];for(let t=0;t<da.length;t+=1)fa[t]=H(w(a,da,t));return{c(){t=u(),e=s("h2"),g=c("3Bot Package Manager"),_=s("br"),I=s("br"),O=u(),S=s("form"),ua&&ua.c(),y=u(),N=s("div"),A=s("div"),B=s("select"),x=s("option"),R=c("path"),V=s("option"),C=c("giturl"),M=u(),j=s("div"),F=s("div"),G=s("input"),L=u(),$=s("div"),J=s("button"),U=c("Add package"),K=u(),Y=s("table"),q=s("caption"),z=c("Packages"),Q=u(),W=s("thead"),X=s("tr"),Z=s("th"),aa=c("Name"),ta=u(),ea=s("th"),sa=c("Status"),ca=u(),ra=s("th"),oa=c("Path"),la=u(),na=s("th"),ha=c("Actions"),pa=u(),ia=s("tbody");for(let a=0;a<fa.length;a+=1)fa[a].c();this.h()},l(a){t=d(a),e=r(a,"H2",{},!1);var s=o(e);g=l(s,"3Bot Package Manager"),s.forEach(n),_=r(a,"BR",{},!1),o(_).forEach(n),I=r(a,"BR",{},!1),o(I).forEach(n),O=d(a),S=r(a,"FORM",{},!1);var c=o(S);ua&&ua.l(c),y=d(c),N=r(c,"DIV",{class:!0},!1);var h=o(N);A=r(h,"DIV",{class:!0},!1);var p=o(A);B=r(p,"SELECT",{class:!0,id:!0},!1);var i=o(B);x=r(i,"OPTION",{value:!0,selected:!0},!1);var u=o(x);R=l(u,"path"),u.forEach(n),V=r(i,"OPTION",{value:!0},!1);var f=o(V);C=l(f,"giturl"),f.forEach(n),i.forEach(n),p.forEach(n),M=d(h),j=r(h,"DIV",{class:!0},!1);var m=o(j);F=r(m,"DIV",{class:!0},!1);var v=o(F);G=r(v,"INPUT",{type:!0,class:!0,id:!0},!1),o(G).forEach(n),v.forEach(n),m.forEach(n),L=d(h),$=r(h,"DIV",{class:!0},!1);var E=o($);J=r(E,"BUTTON",{type:!0,class:!0},!1);var k=o(J);U=l(k,"Add package"),k.forEach(n),E.forEach(n),h.forEach(n),c.forEach(n),K=d(a),Y=r(a,"TABLE",{class:!0,style:!0},!1);var P=o(Y);q=r(P,"CAPTION",{},!1);var T=o(q);z=l(T,"Packages"),T.forEach(n),Q=d(P),W=r(P,"THEAD",{},!1);var b=o(W);X=r(b,"TR",{},!1);var w=o(X);Z=r(w,"TH",{scope:!0},!1);var D=o(Z);aa=l(D,"Name"),D.forEach(n),ta=d(w),ea=r(w,"TH",{scope:!0},!1);var H=o(ea);sa=l(H,"Status"),H.forEach(n),ca=d(w),ra=r(w,"TH",{scope:!0},!1);var ga=o(ra);oa=l(ga,"Path"),ga.forEach(n),la=d(w),na=r(w,"TH",{scope:!0},!1);var da=o(na);ha=l(da,"Actions"),da.forEach(n),w.forEach(n),b.forEach(n),pa=d(P),ia=r(P,"TBODY",{},!1);var ma=o(ia);for(let a=0;a<fa.length;a+=1)fa[a].l(ma);ma.forEach(n),P.forEach(n),this.h()},h(){document.title="3bot Package Manager",x.__value="path",x.value=x.__value,x.selected=!0,V.__value="git_url",V.value=V.__value,void 0===a.method&&b(()=>a.select_change_handler.call(B)),h(B,"class","custom-select mr-sm-3"),h(B,"id","inlineFormCustomSelect"),h(A,"class","col-auto"),h(G,"type","text"),h(G,"class","form-control"),h(G,"id","inlineFormInputGroup"),h(F,"class","input-group mb-2"),h(j,"class","col-6"),h(J,"type","button"),h(J,"class","btn btn-primary mb-2"),h($,"class","col-auto"),h(N,"class","form-row align-items-center"),h(Z,"scope","col"),h(ea,"scope","col"),h(ra,"scope","col"),h(na,"scope","col"),h(Y,"class","table"),f(Y,"margin-top","20px"),ga=[m(B,"change",a.select_change_handler),m(G,"input",a.input_input_handler)]},m(s,c){p(s,t,c),p(s,e,c),i(e,g),p(s,_,c),p(s,I,c),p(s,O,c),p(s,S,c),ua&&ua.m(S,null),i(S,y),i(S,N),i(N,A),i(A,B),i(B,x),i(x,R),i(B,V),i(V,C),v(B,a.method),i(N,M),i(N,j),i(j,F),i(F,G),E(G,a.newPackagePath),i(N,L),i(N,$),i($,J),i(J,U),p(s,K,c),p(s,Y,c),i(Y,q),i(q,z),i(Y,Q),i(Y,W),i(W,X),i(X,Z),i(Z,aa),i(X,ta),i(X,ea),i(ea,sa),i(X,ca),i(X,ra),i(ra,oa),i(X,la),i(X,na),i(na,ha),i(Y,pa),i(Y,ia);for(let a=0;a<fa.length;a+=1)fa[a].m(ia,null)},p(a,t){if(null!=t.lastError?ua?ua.p(a,t):((ua=D(t)).c(),ua.m(S,y)):ua&&(ua.d(1),ua=null),a.method&&v(B,t.method),a.newPackagePath&&G.value!==t.newPackagePath&&E(G,t.newPackagePath),a.packages||a.pkgStatus){let e;for(da=t.packages,e=0;e<da.length;e+=1){const s=w(t,da,e);fa[e]?fa[e].p(a,s):(fa[e]=H(s),fa[e].c(),fa[e].m(ia,null))}for(;e<fa.length;e+=1)fa[e].d(1);fa.length=da.length}},i:k,o:k,d(a){a&&(n(t),n(e),n(_),n(I),n(O),n(S)),ua&&ua.d(),a&&(n(K),n(Y)),P(fa,a),T(ga)}}}function S(a,t,e){const s=new GedisHTTPClient(`${location.protocol}//${location.hostname}/web/gedis/http`);let c="path",r="",o=null,{packages:l=[]}=t;return _(async()=>{s.executeCommand("package_manager","packages_list").then(a=>{console.log(JSON.stringify(a)),e("packages",l=a.json().packages),e("lastError",o=null)}).catch(a=>{throw e("lastError",o=a),a})}),a.$set=(a=>{"packages"in a&&e("packages",l=a.packages)}),{method:c,newPackagePath:r,lastError:o,packages:l,pkgStatus:{0:{name:"Init",actions:["delete"]},1:{name:"Installed",actions:["delete","start"]},2:{name:"Running",actions:["delete","stop"]},3:{name:"Halted",actions:["delete","start","disable"]},4:{name:"Disabled",actions:["delete","enable"]},5:{name:"Error",actions:["delete"]}},select_change_handler:function(){c=I(this),e("method",c)},input_input_handler:function(){r=this.value,e("newPackagePath",r)}}}export default class extends a{constructor(a){super(),t(this,a,S,O,e,["packages"])}}
