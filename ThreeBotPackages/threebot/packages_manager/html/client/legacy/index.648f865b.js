import{_ as a,a as t,b as e,c,i as n,s,d as o,S as r,e as l,t as h,q as i,f as u,g as p,h as f,j as g,r as d,k as v,m,o as k,A as E,L as P,M as _,N as T,O as b,n as I,P as D,Q as w,R as O,T as S,I as A,J as H,U as N}from"./index.5be34265.js";function y(a,t,e){var c=Object.create(a);return c.pkg=t[e],c}function B(a){var t,e,c,n,s,o,r,P,_,T,b,I,D,w=a.pkg.name+"",O=a.pkgStatus[a.pkg.status].name+"",S=a.pkg.path+"";return{c:function(){t=l("tr"),e=l("th"),c=h(w),n=i(),s=l("td"),o=h(O),r=i(),P=l("td"),_=h(S),T=i(),b=l("td"),I=h("aaaa"),D=i(),this.h()},l:function(a){t=u(a,"TR",{},!1);var l=p(t);e=u(l,"TH",{scope:!0},!1);var h=p(e);c=f(h,w),h.forEach(g),n=d(l),s=u(l,"TD",{},!1);var i=p(s);o=f(i,O),i.forEach(g),r=d(l),P=u(l,"TD",{},!1);var v=p(P);_=f(v,S),v.forEach(g),T=d(l),b=u(l,"TD",{},!1);var m=p(b);I=f(m,"aaaa"),m.forEach(g),D=d(l),l.forEach(g),this.h()},h:function(){v(e,"scope","row")},m:function(a,l){m(a,t,l),k(t,e),k(e,c),k(t,n),k(t,s),k(s,o),k(t,r),k(t,P),k(P,_),k(t,T),k(t,b),k(b,I),k(t,D)},p:function(a,t){a.packages&&w!==(w=t.pkg.name+"")&&E(c,w),a.packages&&O!==(O=t.pkgStatus[t.pkg.status].name+"")&&E(o,O),a.packages&&S!==(S=t.pkg.path+"")&&E(_,S)},d:function(a){a&&g(t)}}}function R(a){for(var t,e,c,n,s,o,r,E,O,A,H,N,R,x,C,M,V,j,F,L,U,G,q,J,Q,Y,z,K,W,X,Z,$,aa,ta,ea,ca,na,sa,oa,ra,la,ha,ia,ua,pa=a.packages,fa=[],ga=0;ga<pa.length;ga+=1)fa[ga]=B(y(a,pa,ga));return{c:function(){t=i(),e=l("h2"),c=h("3Bot Package Manager"),n=l("br"),s=l("br"),o=i(),r=l("form"),E=i(),O=l("div"),A=l("div"),H=l("select"),N=l("option"),R=h("path"),x=l("option"),C=h("giturl"),M=i(),V=l("div"),j=l("div"),F=l("input"),L=i(),U=l("div"),G=l("button"),q=h("Add package"),J=i(),Q=l("table"),Y=l("caption"),z=h("Packages"),K=i(),W=l("thead"),X=l("tr"),Z=l("th"),$=h("Name"),aa=i(),ta=l("th"),ea=h("Status"),ca=i(),na=l("th"),sa=h("Path"),oa=i(),ra=l("th"),la=h("Actions"),ha=i(),ia=l("tbody");for(var a=0;a<fa.length;a+=1)fa[a].c();this.h()},l:function(a){t=d(a),e=u(a,"H2",{},!1);var l=p(e);c=f(l,"3Bot Package Manager"),l.forEach(g),n=u(a,"BR",{},!1),p(n).forEach(g),s=u(a,"BR",{},!1),p(s).forEach(g),o=d(a),r=u(a,"FORM",{},!1);var h=p(r);E=d(h),O=u(h,"DIV",{class:!0},!1);var i=p(O);A=u(i,"DIV",{class:!0},!1);var v=p(A);H=u(v,"SELECT",{class:!0,id:!0},!1);var m=p(H);N=u(m,"OPTION",{value:!0,selected:!0},!1);var k=p(N);R=f(k,"path"),k.forEach(g),x=u(m,"OPTION",{value:!0},!1);var P=p(x);C=f(P,"giturl"),P.forEach(g),m.forEach(g),v.forEach(g),M=d(i),V=u(i,"DIV",{class:!0},!1);var _=p(V);j=u(_,"DIV",{class:!0},!1);var T=p(j);F=u(T,"INPUT",{type:!0,class:!0,id:!0},!1),p(F).forEach(g),T.forEach(g),_.forEach(g),L=d(i),U=u(i,"DIV",{class:!0},!1);var b=p(U);G=u(b,"BUTTON",{type:!0,class:!0},!1);var I=p(G);q=f(I,"Add package"),I.forEach(g),b.forEach(g),i.forEach(g),h.forEach(g),J=d(a),Q=u(a,"TABLE",{class:!0,style:!0},!1);var D=p(Q);Y=u(D,"CAPTION",{},!1);var w=p(Y);z=f(w,"Packages"),w.forEach(g),K=d(D),W=u(D,"THEAD",{},!1);var S=p(W);X=u(S,"TR",{},!1);var y=p(X);Z=u(y,"TH",{scope:!0},!1);var B=p(Z);$=f(B,"Name"),B.forEach(g),aa=d(y),ta=u(y,"TH",{scope:!0},!1);var ua=p(ta);ea=f(ua,"Status"),ua.forEach(g),ca=d(y),na=u(y,"TH",{scope:!0},!1);var pa=p(na);sa=f(pa,"Path"),pa.forEach(g),oa=d(y),ra=u(y,"TH",{scope:!0},!1);var ga=p(ra);la=f(ga,"Actions"),ga.forEach(g),y.forEach(g),S.forEach(g),ha=d(D),ia=u(D,"TBODY",{},!1);for(var da=p(ia),va=0;va<fa.length;va+=1)fa[va].l(da);da.forEach(g),D.forEach(g),this.h()},h:function(){document.title="3bot Package Manager",N.__value="path",N.value=N.__value,N.selected=!0,x.__value="git_url",x.value=x.__value,void 0===a.method&&S(function(){return a.select_change_handler.call(H)}),v(H,"class","custom-select mr-sm-3"),v(H,"id","inlineFormCustomSelect"),v(A,"class","col-auto"),v(F,"type","text"),v(F,"class","form-control"),v(F,"id","inlineFormInputGroup"),v(j,"class","input-group mb-2"),v(V,"class","col-6"),v(G,"type","button"),v(G,"class","btn btn-primary mb-2"),v(U,"class","col-auto"),v(O,"class","form-row align-items-center"),v(Z,"scope","col"),v(ta,"scope","col"),v(na,"scope","col"),v(ra,"scope","col"),v(Q,"class","table"),P(Q,"margin-top","20px"),ua=[_(H,"change",a.select_change_handler),_(F,"input",a.input_input_handler)]},m:function(l,h){m(l,t,h),m(l,e,h),k(e,c),m(l,n,h),m(l,s,h),m(l,o,h),m(l,r,h),k(r,E),k(r,O),k(O,A),k(A,H),k(H,N),k(N,R),k(H,x),k(x,C),T(H,a.method),k(O,M),k(O,V),k(V,j),k(j,F),b(F,a.newPackagePath),k(O,L),k(O,U),k(U,G),k(G,q),m(l,J,h),m(l,Q,h),k(Q,Y),k(Y,z),k(Q,K),k(Q,W),k(W,X),k(X,Z),k(Z,$),k(X,aa),k(X,ta),k(ta,ea),k(X,ca),k(X,na),k(na,sa),k(X,oa),k(X,ra),k(ra,la),k(Q,ha),k(Q,ia);for(var i=0;i<fa.length;i+=1)fa[i].m(ia,null)},p:function(a,t){if(a.method&&T(H,t.method),a.newPackagePath&&F.value!==t.newPackagePath&&b(F,t.newPackagePath),a.packages||a.pkgStatus){var e;for(pa=t.packages,e=0;e<pa.length;e+=1){var c=y(t,pa,e);fa[e]?fa[e].p(a,c):(fa[e]=B(c),fa[e].c(),fa[e].m(ia,null))}for(;e<fa.length;e+=1)fa[e].d(1);fa.length=pa.length}},i:I,o:I,d:function(a){a&&(g(t),g(e),g(n),g(s),g(o),g(r)),a&&(g(J),g(Q)),D(fa,a),w(ua)}}}function x(a,t,e){var c="path",n="",s=[];return O(A(H.mark(function a(){return H.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:localGedisClient.executeCommand("package_manager","packages_list").then(function(a){a.json().then(function(a){e("packages",s=a.packages)})});case 1:case"end":return a.stop()}},a)}))),{method:c,newPackagePath:n,packages:s,pkgStatus:{0:{name:"Init",actions:["delete"]},1:{name:"Installed",actions:["delete","start"]},2:{name:"Running",actions:["delete","stop"]},3:{name:"Halted",actions:["delete","start","disable"]},4:{name:"Disabled",actions:["delete","enable"]},5:{name:"Error",actions:["delete"]}},select_change_handler:function(){c=N(this),e("method",c)},input_input_handler:function(){n=this.value,e("newPackagePath",n)}}}export default(function(l){function h(a){var r;return t(this,h),r=e(this,c(h).call(this)),n(o(r),a,x,R,s,[]),r}return a(h,r),h}());
