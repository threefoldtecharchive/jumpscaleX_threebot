import{S as r,i as a,s as t,e,t as s,a as c,w as o,c as l,b as n,d as i,f as h,g as u,h as v,D as d,E as f,j as E,k,v as T,n as w,F as p,G as N,H as g}from"./index.1069f788.js";import{g as A,f as R}from"./common.137a4ef0.js";function D(r,a,t){const e=Object.create(r);return e.worker=a[t],e.i=t,e}function W(r){var a,t;return{c(){a=e("div"),t=e("img"),this.h()},l(r){a=l(r,"DIV",{class:!0},!1);var e=n(a);t=l(e,"IMG",{src:!0,class:!0,alt:!0},!1),n(t).forEach(h),e.forEach(h),this.h()},h(){v(t,"src","/img/loader.gif"),v(t,"class","img-fluid"),v(t,"alt","Responsive image"),v(a,"class","text-center")},m(r,e){E(r,a,e),k(a,t)},p:w,d(r){r&&h(a)}}}function m(r){var a,t,c;return{c(){a=e("div"),t=e("h2"),c=s("There is no Workers matching your criteria")},l(r){a=l(r,"DIV",{},!1);var e=n(a);t=l(e,"H2",{},!1);var s=n(t);c=i(s,"There is no Workers matching your criteria"),s.forEach(h),e.forEach(h)},m(r,e){E(r,a,e),k(a,t),k(t,c)},p:w,d(r){r&&h(a)}}}function b(r){var a,t,o,d,f,T,w,p,N,A,R,W,m,b,I,_,H,L,G,U,F,O,V,x,y,B,P,j,C,J,Y,$,K,M,q,z,Q;let X=r.workers,Z=[];for(let a=0;a<X.length;a+=1)Z[a]=S(D(r,X,a));return{c(){a=e("div"),t=e("div"),o=e("div"),d=e("table"),f=e("thead"),T=e("tr"),w=e("th"),p=s("#"),N=c(),A=e("th"),R=s("State"),W=c(),m=e("th"),b=s("Halt"),I=c(),_=e("th"),H=s("Pid"),L=c(),G=e("th"),U=s("Current Job"),F=c(),O=e("th"),V=s("Last Update"),x=c(),y=e("th"),B=s("Time Start"),P=c(),j=e("th"),C=s("Timeout"),J=c(),Y=e("th"),$=s("Type"),K=c(),M=e("th"),q=s("Error"),z=c(),Q=e("tbody");for(let r=0;r<Z.length;r+=1)Z[r].c();this.h()},l(r){a=l(r,"DIV",{},!1);var e=n(a);t=l(e,"DIV",{class:!0},!1);var s=n(t);o=l(s,"DIV",{class:!0},!1);var c=n(o);d=l(c,"TABLE",{class:!0},!1);var v=n(d);f=l(v,"THEAD",{},!1);var E=n(f);T=l(E,"TR",{},!1);var k=n(T);w=l(k,"TH",{scope:!0},!1);var g=n(w);p=i(g,"#"),g.forEach(h),N=u(k),A=l(k,"TH",{scope:!0},!1);var D=n(A);R=i(D,"State"),D.forEach(h),W=u(k),m=l(k,"TH",{scope:!0},!1);var S=n(m);b=i(S,"Halt"),S.forEach(h),I=u(k),_=l(k,"TH",{scope:!0},!1);var X=n(_);H=i(X,"Pid"),X.forEach(h),L=u(k),G=l(k,"TH",{scope:!0},!1);var rr=n(G);U=i(rr,"Current Job"),rr.forEach(h),F=u(k),O=l(k,"TH",{scope:!0},!1);var ar=n(O);V=i(ar,"Last Update"),ar.forEach(h),x=u(k),y=l(k,"TH",{scope:!0},!1);var tr=n(y);B=i(tr,"Time Start"),tr.forEach(h),P=u(k),j=l(k,"TH",{scope:!0},!1);var er=n(j);C=i(er,"Timeout"),er.forEach(h),J=u(k),Y=l(k,"TH",{scope:!0},!1);var sr=n(Y);$=i(sr,"Type"),sr.forEach(h),K=u(k),M=l(k,"TH",{scope:!0},!1);var cr=n(M);q=i(cr,"Error"),cr.forEach(h),k.forEach(h),E.forEach(h),z=u(v),Q=l(v,"TBODY",{},!1);var or=n(Q);for(let r=0;r<Z.length;r+=1)Z[r].l(or);or.forEach(h),v.forEach(h),c.forEach(h),s.forEach(h),e.forEach(h),this.h()},h(){v(w,"scope","col"),v(A,"scope","col"),v(m,"scope","col"),v(_,"scope","col"),v(G,"scope","col"),v(O,"scope","col"),v(y,"scope","col"),v(j,"scope","col"),v(Y,"scope","col"),v(M,"scope","col"),v(d,"class","table table-striped"),v(o,"class","col-sm-12"),v(t,"class","row mt-5")},m(r,e){E(r,a,e),k(a,t),k(t,o),k(o,d),k(d,f),k(f,T),k(T,w),k(w,p),k(T,N),k(T,A),k(A,R),k(T,W),k(T,m),k(m,b),k(T,I),k(T,_),k(_,H),k(T,L),k(T,G),k(G,U),k(T,F),k(T,O),k(O,V),k(T,x),k(T,y),k(y,B),k(T,P),k(T,j),k(j,C),k(T,J),k(T,Y),k(Y,$),k(T,K),k(T,M),k(M,q),k(d,z),k(d,Q);for(let r=0;r<Z.length;r+=1)Z[r].m(Q,null)},p(r,a){if(r.workers||r.state){let t;for(X=a.workers,t=0;t<X.length;t+=1){const e=D(a,X,t);Z[t]?Z[t].p(r,e):(Z[t]=S(e),Z[t].c(),Z[t].m(Q,null))}for(;t<Z.length;t+=1)Z[t].d(1);Z.length=X.length}},d(r){r&&h(a),g(Z,r)}}}function I(r){var a,t,c,o=r.worker.state+"";return{c(){a=e("td"),t=e("span"),c=s(o),this.h()},l(r){a=l(r,"TD",{},!1);var e=n(a);t=l(e,"SPAN",{class:!0},!1);var s=n(t);c=i(s,o),s.forEach(h),e.forEach(h),this.h()},h(){v(t,"class","badge badge-warning")},m(r,e){E(r,a,e),k(a,t),k(t,c)},p(r,a){r.workers&&o!==(o=a.worker.state+"")&&T(c,o)},d(r){r&&h(a)}}}function _(r){var a,t,c,o=r.worker.state+"";return{c(){a=e("td"),t=e("span"),c=s(o),this.h()},l(r){a=l(r,"TD",{},!1);var e=n(a);t=l(e,"SPAN",{class:!0},!1);var s=n(t);c=i(s,o),s.forEach(h),e.forEach(h),this.h()},h(){v(t,"class","badge badge-dark")},m(r,e){E(r,a,e),k(a,t),k(t,c)},p(r,a){r.workers&&o!==(o=a.worker.state+"")&&T(c,o)},d(r){r&&h(a)}}}function H(r){var a,t,c,o=r.worker.state+"";return{c(){a=e("td"),t=e("span"),c=s(o),this.h()},l(r){a=l(r,"TD",{},!1);var e=n(a);t=l(e,"SPAN",{class:!0},!1);var s=n(t);c=i(s,o),s.forEach(h),e.forEach(h),this.h()},h(){v(t,"class","badge badge-secondary")},m(r,e){E(r,a,e),k(a,t),k(t,c)},p(r,a){r.workers&&o!==(o=a.worker.state+"")&&T(c,o)},d(r){r&&h(a)}}}function L(r){var a,t,c,o=r.worker.state+"";return{c(){a=e("td"),t=e("span"),c=s(o),this.h()},l(r){a=l(r,"TD",{},!1);var e=n(a);t=l(e,"SPAN",{class:!0},!1);var s=n(t);c=i(s,o),s.forEach(h),e.forEach(h),this.h()},h(){v(t,"class","badge badge-info")},m(r,e){E(r,a,e),k(a,t),k(t,c)},p(r,a){r.workers&&o!==(o=a.worker.state+"")&&T(c,o)},d(r){r&&h(a)}}}function G(r){var a,t,c,o=r.worker.state+"";return{c(){a=e("td"),t=e("span"),c=s(o),this.h()},l(r){a=l(r,"TD",{},!1);var e=n(a);t=l(e,"SPAN",{class:!0},!1);var s=n(t);c=i(s,o),s.forEach(h),e.forEach(h),this.h()},h(){v(t,"class","badge badge-primary")},m(r,e){E(r,a,e),k(a,t),k(t,c)},p(r,a){r.workers&&o!==(o=a.worker.state+"")&&T(c,o)},d(r){r&&h(a)}}}function U(r){var a,t,c,o=r.worker.state+"";return{c(){a=e("td"),t=e("span"),c=s(o),this.h()},l(r){a=l(r,"TD",{},!1);var e=n(a);t=l(e,"SPAN",{class:!0},!1);var s=n(t);c=i(s,o),s.forEach(h),e.forEach(h),this.h()},h(){v(t,"class","badge badge-danger")},m(r,e){E(r,a,e),k(a,t),k(t,c)},p(r,a){r.workers&&o!==(o=a.worker.state+"")&&T(c,o)},d(r){r&&h(a)}}}function F(r){var a,t,c,o=r.worker.state+"";return{c(){a=e("td"),t=e("span"),c=s(o),this.h()},l(r){a=l(r,"TD",{},!1);var e=n(a);t=l(e,"SPAN",{class:!0},!1);var s=n(t);c=i(s,o),s.forEach(h),e.forEach(h),this.h()},h(){v(t,"class","badge badge-success")},m(r,e){E(r,a,e),k(a,t),k(t,c)},p(r,a){r.workers&&o!==(o=a.worker.state+"")&&T(c,o)},d(r){r&&h(a)}}}function S(r){var a,t,o,v,d,f,w,p,N,g,A,R,D,W,m,b,S,O,V,x,y,B,P,j,C,J,Y,$,K,M=r.worker.id+"",q=r.worker.halt+"",z=r.worker.pid+"",Q=r.worker.current_job+"",X=r.worker.last_update+"",Z=r.worker.time_start+"",rr=r.worker.timeout+"",ar=r.worker.type+"",tr=r.worker.error+"";function er(r,a){return a.worker.state==a.state.RESULT?F:a.worker.state==a.state.ERROR?U:a.worker.state==a.state.NEW?G:a.worker.state==a.state.RUNNING?L:a.worker.state==a.state.HALTED?H:a.worker.state==a.state.WAITING?_:I}var sr=er(0,r),cr=sr(r);return{c(){a=e("tr"),t=e("td"),o=s(M),v=c(),cr.c(),d=c(),f=e("td"),w=s(q),p=c(),N=e("td"),g=s(z),A=c(),R=e("td"),D=s(Q),W=c(),m=e("td"),b=s(X),S=c(),O=e("td"),V=s(Z),x=c(),y=e("td"),B=s(rr),P=c(),j=e("td"),C=s(ar),J=c(),Y=e("td"),$=s(tr),K=c()},l(r){a=l(r,"TR",{},!1);var e=n(a);t=l(e,"TD",{},!1);var s=n(t);o=i(s,M),s.forEach(h),v=u(e),cr.l(e),d=u(e),f=l(e,"TD",{},!1);var c=n(f);w=i(c,q),c.forEach(h),p=u(e),N=l(e,"TD",{},!1);var E=n(N);g=i(E,z),E.forEach(h),A=u(e),R=l(e,"TD",{},!1);var k=n(R);D=i(k,Q),k.forEach(h),W=u(e),m=l(e,"TD",{},!1);var T=n(m);b=i(T,X),T.forEach(h),S=u(e),O=l(e,"TD",{},!1);var I=n(O);V=i(I,Z),I.forEach(h),x=u(e),y=l(e,"TD",{},!1);var _=n(y);B=i(_,rr),_.forEach(h),P=u(e),j=l(e,"TD",{},!1);var H=n(j);C=i(H,ar),H.forEach(h),J=u(e),Y=l(e,"TD",{},!1);var L=n(Y);$=i(L,tr),L.forEach(h),K=u(e),e.forEach(h)},m(r,e){E(r,a,e),k(a,t),k(t,o),k(a,v),cr.m(a,null),k(a,d),k(a,f),k(f,w),k(a,p),k(a,N),k(N,g),k(a,A),k(a,R),k(R,D),k(a,W),k(a,m),k(m,b),k(a,S),k(a,O),k(O,V),k(a,x),k(a,y),k(y,B),k(a,P),k(a,j),k(j,C),k(a,J),k(a,Y),k(Y,$),k(a,K)},p(r,t){r.workers&&M!==(M=t.worker.id+"")&&T(o,M),sr===(sr=er(0,t))&&cr?cr.p(r,t):(cr.d(1),(cr=sr(t))&&(cr.c(),cr.m(a,d))),r.workers&&q!==(q=t.worker.halt+"")&&T(w,q),r.workers&&z!==(z=t.worker.pid+"")&&T(g,z),r.workers&&Q!==(Q=t.worker.current_job+"")&&T(D,Q),r.workers&&X!==(X=t.worker.last_update+"")&&T(b,X),r.workers&&Z!==(Z=t.worker.time_start+"")&&T(V,Z),r.workers&&rr!==(rr=t.worker.timeout+"")&&T(B,rr),r.workers&&ar!==(ar=t.worker.type+"")&&T(C,ar),r.workers&&tr!==(tr=t.worker.error+"")&&T($,tr)},d(r){r&&h(a),cr.d()}}}function O(r){var a,t,N,g,A,R,D,I,_,H,L,G,U,F,S,O,V,x,y,B,P,j,C,J,Y,$,K,M,q,z,Q,X,Z,rr,ar,tr,er,sr,cr,or,lr,nr,ir,hr,ur,vr,dr,fr,Er,kr,Tr,wr,pr,Nr,gr,Ar,Rr,Dr,Wr,mr,br,Ir,_r,Hr,Lr,Gr,Ur,Fr,Sr,Or,Vr,xr,yr,Br,Pr,jr,Cr,Jr,Yr,$r,Kr,Mr,qr,zr,Qr,Xr,Zr,ra,aa,ta,ea,sa,ca,oa,la=r.workers.length+"",na=r.counters.new+"",ia=r.counters.success+"",ha=r.counters.error+"",ua=r.counters.warning+"",va=r.counters.running+"",da=r.counters.halted+"",fa=r.counters.waiting+"";function Ea(r,a){return(null==ea||r.filteredWorkers||r.isAllWorkersAvailable)&&(ea=!!(a.filteredWorkers()&&a.filteredWorkers().length>0&&a.isAllWorkersAvailable)),ea?b:((null==sa||r.filteredWorkers||r.isAllWorkersAvailable)&&(sa=!(0!=a.filteredWorkers().length||!a.isAllWorkersAvailable)),sa?m:a.isAllWorkersAvailable?void 0:W)}var ka=Ea(null,r),Ta=ka&&ka(r);return{c(){a=e("h1"),t=s("Workers"),N=c(),g=e("div"),A=e("div"),R=e("button"),D=s("All"),I=c(),_=e("div"),H=e("button"),L=s("New"),G=c(),U=e("div"),F=e("button"),S=s("Success"),O=c(),V=e("div"),x=e("button"),y=s("Failure"),B=c(),P=e("div"),j=e("button"),C=s("Warning"),J=c(),Y=e("div"),$=e("button"),K=s("Running"),M=c(),q=e("div"),z=e("button"),Q=s("Halted"),X=c(),Z=e("div"),rr=e("button"),ar=s("Waiting"),tr=c(),er=e("div"),sr=e("div"),cr=e("table"),or=e("thead"),lr=e("tr"),nr=e("th"),ir=s("Total"),hr=c(),ur=e("th"),vr=s("New"),dr=c(),fr=e("th"),Er=s("Success"),kr=c(),Tr=e("th"),wr=s("Failure"),pr=c(),Nr=e("th"),gr=s("Warning"),Ar=c(),Rr=e("th"),Dr=s("Running"),Wr=c(),mr=e("th"),br=s("Halted"),Ir=c(),_r=e("th"),Hr=s("Waiting"),Lr=c(),Gr=e("tbody"),Ur=e("td"),Fr=s(la),Sr=c(),Or=e("td"),Vr=s(na),xr=c(),yr=e("td"),Br=s(ia),Pr=c(),jr=e("td"),Cr=s(ha),Jr=c(),Yr=e("td"),$r=s(ua),Kr=c(),Mr=e("td"),qr=s(va),zr=c(),Qr=e("td"),Xr=s(da),Zr=c(),ra=e("td"),aa=s(fa),ta=c(),Ta&&Ta.c(),ca=o(),this.h()},l(r){a=l(r,"H1",{},!1);var e=n(a);t=i(e,"Workers"),e.forEach(h),N=u(r),g=l(r,"DIV",{class:!0},!1);var s=n(g);A=l(s,"DIV",{class:!0},!1);var c=n(A);R=l(c,"BUTTON",{class:!0},!1);var v=n(R);D=i(v,"All"),v.forEach(h),c.forEach(h),I=u(s),_=l(s,"DIV",{class:!0},!1);var d=n(_);H=l(d,"BUTTON",{class:!0},!1);var f=n(H);L=i(f,"New"),f.forEach(h),d.forEach(h),G=u(s),U=l(s,"DIV",{class:!0},!1);var E=n(U);F=l(E,"BUTTON",{class:!0},!1);var k=n(F);S=i(k,"Success"),k.forEach(h),E.forEach(h),O=u(s),V=l(s,"DIV",{class:!0},!1);var T=n(V);x=l(T,"BUTTON",{class:!0},!1);var w=n(x);y=i(w,"Failure"),w.forEach(h),T.forEach(h),B=u(s),P=l(s,"DIV",{class:!0},!1);var p=n(P);j=l(p,"BUTTON",{class:!0},!1);var W=n(j);C=i(W,"Warning"),W.forEach(h),p.forEach(h),J=u(s),Y=l(s,"DIV",{class:!0},!1);var m=n(Y);$=l(m,"BUTTON",{class:!0},!1);var b=n($);K=i(b,"Running"),b.forEach(h),m.forEach(h),M=u(s),q=l(s,"DIV",{class:!0},!1);var ea=n(q);z=l(ea,"BUTTON",{class:!0},!1);var sa=n(z);Q=i(sa,"Halted"),sa.forEach(h),ea.forEach(h),X=u(s),Z=l(s,"DIV",{class:!0},!1);var oa=n(Z);rr=l(oa,"BUTTON",{class:!0},!1);var Ea=n(rr);ar=i(Ea,"Waiting"),Ea.forEach(h),oa.forEach(h),s.forEach(h),tr=u(r),er=l(r,"DIV",{class:!0},!1);var ka=n(er);sr=l(ka,"DIV",{class:!0},!1);var wa=n(sr);cr=l(wa,"TABLE",{class:!0},!1);var pa=n(cr);or=l(pa,"THEAD",{},!1);var Na=n(or);lr=l(Na,"TR",{},!1);var ga=n(lr);nr=l(ga,"TH",{class:!0,scope:!0},!1);var Aa=n(nr);ir=i(Aa,"Total"),Aa.forEach(h),hr=u(ga),ur=l(ga,"TH",{class:!0,scope:!0},!1);var Ra=n(ur);vr=i(Ra,"New"),Ra.forEach(h),dr=u(ga),fr=l(ga,"TH",{class:!0,scope:!0},!1);var Da=n(fr);Er=i(Da,"Success"),Da.forEach(h),kr=u(ga),Tr=l(ga,"TH",{class:!0,scope:!0},!1);var Wa=n(Tr);wr=i(Wa,"Failure"),Wa.forEach(h),pr=u(ga),Nr=l(ga,"TH",{class:!0,scope:!0},!1);var ma=n(Nr);gr=i(ma,"Warning"),ma.forEach(h),Ar=u(ga),Rr=l(ga,"TH",{class:!0,scope:!0},!1);var ba=n(Rr);Dr=i(ba,"Running"),ba.forEach(h),Wr=u(ga),mr=l(ga,"TH",{class:!0,scope:!0},!1);var Ia=n(mr);br=i(Ia,"Halted"),Ia.forEach(h),Ir=u(ga),_r=l(ga,"TH",{class:!0,scope:!0},!1);var _a=n(_r);Hr=i(_a,"Waiting"),_a.forEach(h),ga.forEach(h),Na.forEach(h),Lr=u(pa),Gr=l(pa,"TBODY",{class:!0},!1);var Ha=n(Gr);Ur=l(Ha,"TD",{},!1);var La=n(Ur);Fr=i(La,la),La.forEach(h),Sr=u(Ha),Or=l(Ha,"TD",{},!1);var Ga=n(Or);Vr=i(Ga,na),Ga.forEach(h),xr=u(Ha),yr=l(Ha,"TD",{},!1);var Ua=n(yr);Br=i(Ua,ia),Ua.forEach(h),Pr=u(Ha),jr=l(Ha,"TD",{},!1);var Fa=n(jr);Cr=i(Fa,ha),Fa.forEach(h),Jr=u(Ha),Yr=l(Ha,"TD",{},!1);var Sa=n(Yr);$r=i(Sa,ua),Sa.forEach(h),Kr=u(Ha),Mr=l(Ha,"TD",{},!1);var Oa=n(Mr);qr=i(Oa,va),Oa.forEach(h),zr=u(Ha),Qr=l(Ha,"TD",{},!1);var Va=n(Qr);Xr=i(Va,da),Va.forEach(h),Zr=u(Ha),ra=l(Ha,"TD",{},!1);var xa=n(ra);aa=i(xa,fa),xa.forEach(h),Ha.forEach(h),pa.forEach(h),wa.forEach(h),ka.forEach(h),ta=u(r),Ta&&Ta.l(r),ca=o(),this.h()},h(){v(R,"class","btn"),d(R,"active",r.currentFilter===r.state.ALL),v(A,"class","mr-3"),v(H,"class","btn"),d(H,"active",r.currentFilter===r.state.NEW),v(_,"class","mr-3"),v(F,"class","btn"),d(F,"active",r.currentFilter===r.state.RESULT),v(U,"class","mr-3"),v(x,"class","btn"),d(x,"active",r.currentFilter===r.state.ERROR),v(V,"class","mr-3"),v(j,"class","btn"),d(j,"active",r.currentFilter===r.state.WARNING),v(P,"class","mr-3"),v($,"class","btn"),d($,"active",r.currentFilter===r.state.RUNNING),v(Y,"class","mr-3"),v(z,"class","btn"),d(z,"active",r.currentFilter===r.state.HALTED),v(q,"class","mr-3"),v(rr,"class","btn"),d(rr,"active",r.currentFilter===r.state.WAITING),v(Z,"class","mr-3"),v(g,"class","d-flex justify-content-start"),v(nr,"class","text-center"),v(nr,"scope","col"),v(ur,"class","text-center"),v(ur,"scope","col"),v(fr,"class","text-center"),v(fr,"scope","col"),v(Tr,"class","text-center"),v(Tr,"scope","col"),v(Nr,"class","text-center"),v(Nr,"scope","col"),v(Rr,"class","text-center"),v(Rr,"scope","col"),v(mr,"class","text-center"),v(mr,"scope","col"),v(_r,"class","text-center"),v(_r,"scope","col"),v(Gr,"class","text-center"),v(cr,"class","table table-striped"),v(sr,"class","col-sm-12"),v(er,"class","row mt-5"),oa=[f(R,"click",r.click_handler),f(H,"click",r.click_handler_1),f(F,"click",r.click_handler_2),f(x,"click",r.click_handler_3),f(j,"click",r.click_handler_4),f($,"click",r.click_handler_5),f(z,"click",r.click_handler_6),f(rr,"click",r.click_handler_7)]},m(r,e){E(r,a,e),k(a,t),E(r,N,e),E(r,g,e),k(g,A),k(A,R),k(R,D),k(g,I),k(g,_),k(_,H),k(H,L),k(g,G),k(g,U),k(U,F),k(F,S),k(g,O),k(g,V),k(V,x),k(x,y),k(g,B),k(g,P),k(P,j),k(j,C),k(g,J),k(g,Y),k(Y,$),k($,K),k(g,M),k(g,q),k(q,z),k(z,Q),k(g,X),k(g,Z),k(Z,rr),k(rr,ar),E(r,tr,e),E(r,er,e),k(er,sr),k(sr,cr),k(cr,or),k(or,lr),k(lr,nr),k(nr,ir),k(lr,hr),k(lr,ur),k(ur,vr),k(lr,dr),k(lr,fr),k(fr,Er),k(lr,kr),k(lr,Tr),k(Tr,wr),k(lr,pr),k(lr,Nr),k(Nr,gr),k(lr,Ar),k(lr,Rr),k(Rr,Dr),k(lr,Wr),k(lr,mr),k(mr,br),k(lr,Ir),k(lr,_r),k(_r,Hr),k(cr,Lr),k(cr,Gr),k(Gr,Ur),k(Ur,Fr),k(Gr,Sr),k(Gr,Or),k(Or,Vr),k(Gr,xr),k(Gr,yr),k(yr,Br),k(Gr,Pr),k(Gr,jr),k(jr,Cr),k(Gr,Jr),k(Gr,Yr),k(Yr,$r),k(Gr,Kr),k(Gr,Mr),k(Mr,qr),k(Gr,zr),k(Gr,Qr),k(Qr,Xr),k(Gr,Zr),k(Gr,ra),k(ra,aa),E(r,ta,e),Ta&&Ta.m(r,e),E(r,ca,e)},p(r,a){(r.currentFilter||r.state)&&(d(R,"active",a.currentFilter===a.state.ALL),d(H,"active",a.currentFilter===a.state.NEW),d(F,"active",a.currentFilter===a.state.RESULT),d(x,"active",a.currentFilter===a.state.ERROR),d(j,"active",a.currentFilter===a.state.WARNING),d($,"active",a.currentFilter===a.state.RUNNING),d(z,"active",a.currentFilter===a.state.HALTED),d(rr,"active",a.currentFilter===a.state.WAITING)),r.workers&&la!==(la=a.workers.length+"")&&T(Fr,la),r.counters&&na!==(na=a.counters.new+"")&&T(Vr,na),r.counters&&ia!==(ia=a.counters.success+"")&&T(Br,ia),r.counters&&ha!==(ha=a.counters.error+"")&&T(Cr,ha),r.counters&&ua!==(ua=a.counters.warning+"")&&T($r,ua),r.counters&&va!==(va=a.counters.running+"")&&T(qr,va),r.counters&&da!==(da=a.counters.halted+"")&&T(Xr,da),r.counters&&fa!==(fa=a.counters.waiting+"")&&T(aa,fa),ka===(ka=Ea(r,a))&&Ta?Ta.p(r,a):(Ta&&Ta.d(1),(Ta=ka&&ka(a))&&(Ta.c(),Ta.m(ca.parentNode,ca)))},i:w,o:w,d(r){r&&(h(a),h(N),h(g),h(tr),h(er),h(ta)),Ta&&Ta.d(r),r&&h(ca),p(oa)}}}function V(r,a,t){const e={RESULT:"OK",ERROR:"ERROR",NEW:"NEW",HALTED:"HALTED",WAITING:"WAITING",RUNNING:"RUNNING",WARNING:"WARNING",ALL:"all"};let s=!1,c={success:0,error:0,new:0,running:0,halted:0,waiting:0,warning:0},o=e.ALL,l=[];function n(){l.forEach(r=>{r.state==e.RESULT?t("counters",c.success++,c):r.state==e.ERROR?t("counters",c.error++,c):r.state==e.NEW?t("counters",c.new++,c):r.state==e.RUNNING?t("counters",c.running++,c):r.state==e.HALTED?t("counters",c.halted++,c):r.state==e.WAITING?t("counters",c.waiting++,c):r.state==e.WARNING&&t("counters",c.warning++,c)})}function i(r){t("currentFilter",o=r)}function h(r){let a=[];return l.forEach(t=>{t.state==r&&a.push(t)}),a}N(async()=>{t("isAllWorkersAvailable",s=!1),A().then(function(r){r&&(t("isAllWorkersAvailable",s=!0),t("workers",l=r.data.workers),l.forEach(r=>{r.state=r.state.toUpperCase(),r.error&&(r.error=JSON.stringify(r.error)),r.time_start=R(r.time_start),r.last_update=R(r.last_update)}),n())}).catch(r=>{console.log(r)})});let u;return r.$$.update=((r={currentFilter:1,workers:1})=>{(r.currentFilter||r.workers)&&t("filteredWorkers",u=(()=>(t("counters",c={success:0,error:0,new:0,running:0,halted:0,waiting:0,warning:0}),n(),o==e.ALL?l:o==e.RESULT?h(e.RESULT):o==e.ERROR?h(e.ERROR):o==e.NEW?h(e.NEW):o==e.RUNNING?h(e.RUNNING):o==e.HALTED?h(e.HALTED):o==e.WARNING?h(e.WARNING):o==e.WAITING?h(e.WAITING):void 0)))}),{state:e,isAllWorkersAvailable:s,counters:c,currentFilter:o,workers:l,updateFilter:i,filteredWorkers:u,click_handler:()=>i(e.ALL),click_handler_1:()=>i(e.NEW),click_handler_2:()=>i(e.RESULT),click_handler_3:()=>i(e.ERROR),click_handler_4:()=>i(e.WARNING),click_handler_5:()=>i(e.RUNNING),click_handler_6:()=>i(e.HALTED),click_handler_7:()=>i(e.WAITING)}}class x extends r{constructor(r){super(),a(this,r,V,O,t,[])}}export{x as W};
