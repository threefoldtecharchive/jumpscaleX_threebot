import{_ as r,a as t,b as a,c,i as e,s as o,d as s,S as n,e as i,t as l,f as u,A as f,g as h,h as v,j as d,k as E,l as k,m as T,I as p,J as w,o as m,p as A,z as b,F as D,x as g,G as W,w as N,K as R,L as H,r as _,n as L,y as I,M as S}from"./index.ac27d65c.js";import{_ as F}from"./index.61e4d1b5.js";import{g as O,f as U}from"./common.1d417693.js";import{S as y}from"./Spinner.38020c36.js";function x(r,t,a){var c=Object.create(r);return c.worker=t[a],c.i=a,c}function V(r){var t,a=new y({});return{c:function(){a.$$.fragment.c()},l:function(r){a.$$.fragment.l(r)},m:function(r,c){_(a,r,c),t=!0},p:L,i:function(r){t||(N(a.$$.fragment,r),t=!0)},o:function(r){g(a.$$.fragment,r),t=!1},d:function(r){I(a,r)}}}function j(r){var t,a,c;return{c:function(){t=i("div"),a=i("h2"),c=l("There is no Workers matching your criteria")},l:function(r){t=h(r,"DIV",{},!1);var e=v(t);a=h(e,"H2",{},!1);var o=v(a);c=d(o,"There is no Workers matching your criteria"),o.forEach(E),e.forEach(E)},m:function(r,e){m(r,t,e),A(t,a),A(a,c)},p:L,i:L,o:L,d:function(r){r&&E(t)}}}function B(r){for(var t,a,c,e,o,s,n,f,p,w,b,D,g,W,N,R,H,_,I,F,O,U,y,V,j,B,G,$,P,J,C,K,Y,z,q,Q,X,Z=r.workers,rr=[],tr=0;tr<Z.length;tr+=1)rr[tr]=M(x(r,Z,tr));return{c:function(){t=i("div"),a=i("div"),c=i("div"),e=i("table"),o=i("thead"),s=i("tr"),n=i("th"),f=l("#"),p=u(),w=i("th"),b=l("State"),D=u(),g=i("th"),W=l("Halt"),N=u(),R=i("th"),H=l("Pid"),_=u(),I=i("th"),F=l("Current Job"),O=u(),U=i("th"),y=l("Last Update"),V=u(),j=i("th"),B=l("Time Start"),G=u(),$=i("th"),P=l("Timeout"),J=u(),C=i("th"),K=l("Type"),Y=u(),z=i("th"),q=l("Error"),Q=u(),X=i("tbody");for(var r=0;r<rr.length;r+=1)rr[r].c();this.h()},l:function(r){t=h(r,"DIV",{},!1);var i=v(t);a=h(i,"DIV",{class:!0},!1);var l=v(a);c=h(l,"DIV",{class:!0},!1);var u=v(c);e=h(u,"TABLE",{class:!0},!1);var T=v(e);o=h(T,"THEAD",{},!1);var m=v(o);s=h(m,"TR",{},!1);var A=v(s);n=h(A,"TH",{scope:!0},!1);var L=v(n);f=d(L,"#"),L.forEach(E),p=k(A),w=h(A,"TH",{scope:!0},!1);var S=v(w);b=d(S,"State"),S.forEach(E),D=k(A),g=h(A,"TH",{scope:!0},!1);var x=v(g);W=d(x,"Halt"),x.forEach(E),N=k(A),R=h(A,"TH",{scope:!0},!1);var M=v(R);H=d(M,"Pid"),M.forEach(E),_=k(A),I=h(A,"TH",{scope:!0},!1);var Z=v(I);F=d(Z,"Current Job"),Z.forEach(E),O=k(A),U=h(A,"TH",{scope:!0},!1);var tr=v(U);y=d(tr,"Last Update"),tr.forEach(E),V=k(A),j=h(A,"TH",{scope:!0},!1);var ar=v(j);B=d(ar,"Time Start"),ar.forEach(E),G=k(A),$=h(A,"TH",{scope:!0},!1);var cr=v($);P=d(cr,"Timeout"),cr.forEach(E),J=k(A),C=h(A,"TH",{scope:!0},!1);var er=v(C);K=d(er,"Type"),er.forEach(E),Y=k(A),z=h(A,"TH",{scope:!0},!1);var or=v(z);q=d(or,"Error"),or.forEach(E),A.forEach(E),m.forEach(E),Q=k(T),X=h(T,"TBODY",{},!1);for(var sr=v(X),nr=0;nr<rr.length;nr+=1)rr[nr].l(sr);sr.forEach(E),T.forEach(E),u.forEach(E),l.forEach(E),i.forEach(E),this.h()},h:function(){T(n,"scope","col"),T(w,"scope","col"),T(g,"scope","col"),T(R,"scope","col"),T(I,"scope","col"),T(U,"scope","col"),T(j,"scope","col"),T($,"scope","col"),T(C,"scope","col"),T(z,"scope","col"),T(e,"class","table table-striped"),T(c,"class","col-sm-12"),T(a,"class","row mt-5")},m:function(r,i){m(r,t,i),A(t,a),A(a,c),A(c,e),A(e,o),A(o,s),A(s,n),A(n,f),A(s,p),A(s,w),A(w,b),A(s,D),A(s,g),A(g,W),A(s,N),A(s,R),A(R,H),A(s,_),A(s,I),A(I,F),A(s,O),A(s,U),A(U,y),A(s,V),A(s,j),A(j,B),A(s,G),A(s,$),A($,P),A(s,J),A(s,C),A(C,K),A(s,Y),A(s,z),A(z,q),A(e,Q),A(e,X);for(var l=0;l<rr.length;l+=1)rr[l].m(X,null)},p:function(r,t){if(r.workers||r.state){var a;for(Z=t.workers,a=0;a<Z.length;a+=1){var c=x(t,Z,a);rr[a]?rr[a].p(r,c):(rr[a]=M(c),rr[a].c(),rr[a].m(X,null))}for(;a<rr.length;a+=1)rr[a].d(1);rr.length=Z.length}},i:L,o:L,d:function(r){r&&E(t),S(rr,r)}}}function G(r){var t,a,c,e=r.worker.state+"";return{c:function(){t=i("td"),a=i("span"),c=l(e),this.h()},l:function(r){t=h(r,"TD",{},!1);var o=v(t);a=h(o,"SPAN",{class:!0},!1);var s=v(a);c=d(s,e),s.forEach(E),o.forEach(E),this.h()},h:function(){T(a,"class","badge badge-warning")},m:function(r,e){m(r,t,e),A(t,a),A(a,c)},p:function(r,t){r.workers&&e!==(e=t.worker.state+"")&&b(c,e)},d:function(r){r&&E(t)}}}function $(r){var t,a,c,e=r.worker.state+"";return{c:function(){t=i("td"),a=i("span"),c=l(e),this.h()},l:function(r){t=h(r,"TD",{},!1);var o=v(t);a=h(o,"SPAN",{class:!0},!1);var s=v(a);c=d(s,e),s.forEach(E),o.forEach(E),this.h()},h:function(){T(a,"class","badge badge-dark")},m:function(r,e){m(r,t,e),A(t,a),A(a,c)},p:function(r,t){r.workers&&e!==(e=t.worker.state+"")&&b(c,e)},d:function(r){r&&E(t)}}}function P(r){var t,a,c,e=r.worker.state+"";return{c:function(){t=i("td"),a=i("span"),c=l(e),this.h()},l:function(r){t=h(r,"TD",{},!1);var o=v(t);a=h(o,"SPAN",{class:!0},!1);var s=v(a);c=d(s,e),s.forEach(E),o.forEach(E),this.h()},h:function(){T(a,"class","badge badge-secondary")},m:function(r,e){m(r,t,e),A(t,a),A(a,c)},p:function(r,t){r.workers&&e!==(e=t.worker.state+"")&&b(c,e)},d:function(r){r&&E(t)}}}function J(r){var t,a,c,e=r.worker.state+"";return{c:function(){t=i("td"),a=i("span"),c=l(e),this.h()},l:function(r){t=h(r,"TD",{},!1);var o=v(t);a=h(o,"SPAN",{class:!0},!1);var s=v(a);c=d(s,e),s.forEach(E),o.forEach(E),this.h()},h:function(){T(a,"class","badge badge-primary")},m:function(r,e){m(r,t,e),A(t,a),A(a,c)},p:function(r,t){r.workers&&e!==(e=t.worker.state+"")&&b(c,e)},d:function(r){r&&E(t)}}}function C(r){var t,a,c,e=r.worker.state+"";return{c:function(){t=i("td"),a=i("span"),c=l(e),this.h()},l:function(r){t=h(r,"TD",{},!1);var o=v(t);a=h(o,"SPAN",{class:!0},!1);var s=v(a);c=d(s,e),s.forEach(E),o.forEach(E),this.h()},h:function(){T(a,"class","badge badge-danger")},m:function(r,e){m(r,t,e),A(t,a),A(a,c)},p:function(r,t){r.workers&&e!==(e=t.worker.state+"")&&b(c,e)},d:function(r){r&&E(t)}}}function K(r){var t,a,c,e=r.worker.state+"";return{c:function(){t=i("td"),a=i("span"),c=l(e),this.h()},l:function(r){t=h(r,"TD",{},!1);var o=v(t);a=h(o,"SPAN",{class:!0},!1);var s=v(a);c=d(s,e),s.forEach(E),o.forEach(E),this.h()},h:function(){T(a,"class","badge badge-success")},m:function(r,e){m(r,t,e),A(t,a),A(a,c)},p:function(r,t){r.workers&&e!==(e=t.worker.state+"")&&b(c,e)},d:function(r){r&&E(t)}}}function Y(r){var t,a,c=r.worker.current_job+"";return{c:function(){t=i("td"),a=l(c)},l:function(r){t=h(r,"TD",{},!1);var e=v(t);a=d(e,c),e.forEach(E)},m:function(r,c){m(r,t,c),A(t,a)},p:function(r,t){r.workers&&c!==(c=t.worker.current_job+"")&&b(a,c)},d:function(r){r&&E(t)}}}function z(r){var t,a;return{c:function(){t=i("td"),a=l("N/A")},l:function(r){t=h(r,"TD",{},!1);var c=v(t);a=d(c,"N/A"),c.forEach(E)},m:function(r,c){m(r,t,c),A(t,a)},p:L,d:function(r){r&&E(t)}}}function M(r){var t,a,c,e,o,s,n,f,T,p,w,D,g,W,N,R,H,_,L,I,S,F,O,U,y,x,V,j=r.worker.id+"",B=r.worker.halt+"",M=r.worker.pid+"",q=r.worker.last_update+"",Q=r.worker.time_start+"",X=r.worker.timeout+"",Z=r.worker.type+"",rr=r.worker.error+"";function tr(r,t){return t.worker.state==t.state.RESULT?K:t.worker.state==t.state.ERROR?C:t.worker.state==t.state.NEW?J:t.worker.state==t.state.HALTED?P:t.worker.state==t.state.WAITING?$:G}var ar=tr(0,r),cr=ar(r);function er(r,t){return 2147483647==t.worker.current_job?z:Y}var or=er(0,r),sr=or(r);return{c:function(){t=i("tr"),a=i("td"),c=l(j),e=u(),cr.c(),o=u(),s=i("td"),n=l(B),f=u(),T=i("td"),p=l(M),w=u(),sr.c(),D=u(),g=i("td"),W=l(q),N=u(),R=i("td"),H=l(Q),_=u(),L=i("td"),I=l(X),S=u(),F=i("td"),O=l(Z),U=u(),y=i("td"),x=l(rr),V=u()},l:function(r){t=h(r,"TR",{},!1);var i=v(t);a=h(i,"TD",{},!1);var l=v(a);c=d(l,j),l.forEach(E),e=k(i),cr.l(i),o=k(i),s=h(i,"TD",{},!1);var u=v(s);n=d(u,B),u.forEach(E),f=k(i),T=h(i,"TD",{},!1);var m=v(T);p=d(m,M),m.forEach(E),w=k(i),sr.l(i),D=k(i),g=h(i,"TD",{},!1);var A=v(g);W=d(A,q),A.forEach(E),N=k(i),R=h(i,"TD",{},!1);var b=v(R);H=d(b,Q),b.forEach(E),_=k(i),L=h(i,"TD",{},!1);var G=v(L);I=d(G,X),G.forEach(E),S=k(i),F=h(i,"TD",{},!1);var $=v(F);O=d($,Z),$.forEach(E),U=k(i),y=h(i,"TD",{},!1);var P=v(y);x=d(P,rr),P.forEach(E),V=k(i),i.forEach(E)},m:function(r,i){m(r,t,i),A(t,a),A(a,c),A(t,e),cr.m(t,null),A(t,o),A(t,s),A(s,n),A(t,f),A(t,T),A(T,p),A(t,w),sr.m(t,null),A(t,D),A(t,g),A(g,W),A(t,N),A(t,R),A(R,H),A(t,_),A(t,L),A(L,I),A(t,S),A(t,F),A(F,O),A(t,U),A(t,y),A(y,x),A(t,V)},p:function(r,a){r.workers&&j!==(j=a.worker.id+"")&&b(c,j),ar===(ar=tr(0,a))&&cr?cr.p(r,a):(cr.d(1),(cr=ar(a))&&(cr.c(),cr.m(t,o))),r.workers&&B!==(B=a.worker.halt+"")&&b(n,B),r.workers&&M!==(M=a.worker.pid+"")&&b(p,M),or===(or=er(0,a))&&sr?sr.p(r,a):(sr.d(1),(sr=or(a))&&(sr.c(),sr.m(t,D))),r.workers&&q!==(q=a.worker.last_update+"")&&b(W,q),r.workers&&Q!==(Q=a.worker.time_start+"")&&b(H,Q),r.workers&&X!==(X=a.worker.timeout+"")&&b(I,X),r.workers&&Z!==(Z=a.worker.type+"")&&b(O,Z),r.workers&&rr!==(rr=a.worker.error+"")&&b(x,rr)},d:function(r){r&&E(t),cr.d(),sr.d()}}}function q(r){var t,a,c,e,o,s,n,H,_,L,I,S,F,O,U,y,x,G,$,P,J,C,K,Y,z,M,q,Q,X,Z,rr,tr,ar,cr,er,or,sr,nr,ir,lr,ur,fr,hr,vr,dr,Er,kr,Tr,pr,wr,mr,Ar,br,Dr,gr,Wr,Nr,Rr,Hr,_r,Lr,Ir,Sr,Fr,Or,Ur,yr,xr,Vr,jr,Br,Gr,$r,Pr,Jr,Cr,Kr,Yr=r.workers.length+"",zr=r.counters.new+"",Mr=r.counters.success+"",qr=r.counters.error+"",Qr=r.counters.halted+"",Xr=r.counters.waiting+"",Zr=[B,j,V],rt=[];function tt(r,t){return(null==Br||r.filteredWorkers||r.isAllWorkersAvailable)&&(Br=!!(t.filteredWorkers()&&t.filteredWorkers().length>0&&t.isAllWorkersAvailable)),Br?0:((null==Gr||r.filteredWorkers||r.isAllWorkersAvailable)&&(Gr=!(0!=t.filteredWorkers().length||!t.isAllWorkersAvailable)),Gr?1:t.isAllWorkersAvailable?-1:2)}return~($r=tt(null,r))&&(Pr=rt[$r]=Zr[$r](r)),{c:function(){t=i("h1"),a=l("Workers"),c=u(),e=i("div"),o=i("div"),s=i("button"),n=l("All"),H=u(),_=i("div"),L=i("button"),I=l("New"),S=u(),F=i("div"),O=i("button"),U=l("Success"),y=u(),x=i("div"),G=i("button"),$=l("Failure"),P=u(),J=i("div"),C=i("button"),K=l("Halted"),Y=u(),z=i("div"),M=i("button"),q=l("Waiting"),Q=u(),X=i("div"),Z=i("div"),rr=i("table"),tr=i("thead"),ar=i("tr"),cr=i("th"),er=l("Total"),or=u(),sr=i("th"),nr=l("New"),ir=u(),lr=i("th"),ur=l("Success"),fr=u(),hr=i("th"),vr=l("Failure"),dr=u(),Er=i("th"),kr=l("Halted"),Tr=u(),pr=i("th"),wr=l("Waiting"),mr=u(),Ar=i("tbody"),br=i("td"),Dr=l(Yr),gr=u(),Wr=i("td"),Nr=l(zr),Rr=u(),Hr=i("td"),_r=l(Mr),Lr=u(),Ir=i("td"),Sr=l(qr),Fr=u(),Or=i("td"),Ur=l(Qr),yr=u(),xr=i("td"),Vr=l(Xr),jr=u(),Pr&&Pr.c(),Jr=f(),this.h()},l:function(r){t=h(r,"H1",{},!1);var i=v(t);a=d(i,"Workers"),i.forEach(E),c=k(r),e=h(r,"DIV",{class:!0},!1);var l=v(e);o=h(l,"DIV",{class:!0},!1);var u=v(o);s=h(u,"BUTTON",{class:!0},!1);var T=v(s);n=d(T,"All"),T.forEach(E),u.forEach(E),H=k(l),_=h(l,"DIV",{class:!0},!1);var p=v(_);L=h(p,"BUTTON",{class:!0},!1);var w=v(L);I=d(w,"New"),w.forEach(E),p.forEach(E),S=k(l),F=h(l,"DIV",{class:!0},!1);var m=v(F);O=h(m,"BUTTON",{class:!0},!1);var A=v(O);U=d(A,"Success"),A.forEach(E),m.forEach(E),y=k(l),x=h(l,"DIV",{class:!0},!1);var b=v(x);G=h(b,"BUTTON",{class:!0},!1);var D=v(G);$=d(D,"Failure"),D.forEach(E),b.forEach(E),P=k(l),J=h(l,"DIV",{class:!0},!1);var g=v(J);C=h(g,"BUTTON",{class:!0},!1);var W=v(C);K=d(W,"Halted"),W.forEach(E),g.forEach(E),Y=k(l),z=h(l,"DIV",{class:!0},!1);var N=v(z);M=h(N,"BUTTON",{class:!0},!1);var R=v(M);q=d(R,"Waiting"),R.forEach(E),N.forEach(E),l.forEach(E),Q=k(r),X=h(r,"DIV",{class:!0},!1);var V=v(X);Z=h(V,"DIV",{class:!0},!1);var j=v(Z);rr=h(j,"TABLE",{class:!0},!1);var B=v(rr);tr=h(B,"THEAD",{},!1);var Br=v(tr);ar=h(Br,"TR",{},!1);var Gr=v(ar);cr=h(Gr,"TH",{class:!0,scope:!0},!1);var $r=v(cr);er=d($r,"Total"),$r.forEach(E),or=k(Gr),sr=h(Gr,"TH",{class:!0,scope:!0},!1);var Cr=v(sr);nr=d(Cr,"New"),Cr.forEach(E),ir=k(Gr),lr=h(Gr,"TH",{class:!0,scope:!0},!1);var Kr=v(lr);ur=d(Kr,"Success"),Kr.forEach(E),fr=k(Gr),hr=h(Gr,"TH",{class:!0,scope:!0},!1);var Zr=v(hr);vr=d(Zr,"Failure"),Zr.forEach(E),dr=k(Gr),Er=h(Gr,"TH",{class:!0,scope:!0},!1);var rt=v(Er);kr=d(rt,"Halted"),rt.forEach(E),Tr=k(Gr),pr=h(Gr,"TH",{class:!0,scope:!0},!1);var tt=v(pr);wr=d(tt,"Waiting"),tt.forEach(E),Gr.forEach(E),Br.forEach(E),mr=k(B),Ar=h(B,"TBODY",{class:!0},!1);var at=v(Ar);br=h(at,"TD",{},!1);var ct=v(br);Dr=d(ct,Yr),ct.forEach(E),gr=k(at),Wr=h(at,"TD",{},!1);var et=v(Wr);Nr=d(et,zr),et.forEach(E),Rr=k(at),Hr=h(at,"TD",{},!1);var ot=v(Hr);_r=d(ot,Mr),ot.forEach(E),Lr=k(at),Ir=h(at,"TD",{},!1);var st=v(Ir);Sr=d(st,qr),st.forEach(E),Fr=k(at),Or=h(at,"TD",{},!1);var nt=v(Or);Ur=d(nt,Qr),nt.forEach(E),yr=k(at),xr=h(at,"TD",{},!1);var it=v(xr);Vr=d(it,Xr),it.forEach(E),at.forEach(E),B.forEach(E),j.forEach(E),V.forEach(E),jr=k(r),Pr&&Pr.l(r),Jr=f(),this.h()},h:function(){T(s,"class","btn"),p(s,"active",r.currentFilter===r.state.ALL),T(o,"class","mr-3"),T(L,"class","btn"),p(L,"active",r.currentFilter===r.state.NEW),T(_,"class","mr-3"),T(O,"class","btn"),p(O,"active",r.currentFilter===r.state.RESULT),T(F,"class","mr-3"),T(G,"class","btn"),p(G,"active",r.currentFilter===r.state.ERROR),T(x,"class","mr-3"),T(C,"class","btn"),p(C,"active",r.currentFilter===r.state.HALTED),T(J,"class","mr-3"),T(M,"class","btn"),p(M,"active",r.currentFilter===r.state.WAITING),T(z,"class","mr-3"),T(e,"class","d-flex justify-content-start"),T(cr,"class","text-center"),T(cr,"scope","col"),T(sr,"class","text-center"),T(sr,"scope","col"),T(lr,"class","text-center"),T(lr,"scope","col"),T(hr,"class","text-center"),T(hr,"scope","col"),T(Er,"class","text-center"),T(Er,"scope","col"),T(pr,"class","text-center"),T(pr,"scope","col"),T(Ar,"class","text-center"),T(rr,"class","table table-striped"),T(Z,"class","col-sm-12"),T(X,"class","row mt-5"),Kr=[w(s,"click",r.click_handler),w(L,"click",r.click_handler_1),w(O,"click",r.click_handler_2),w(G,"click",r.click_handler_3),w(C,"click",r.click_handler_4),w(M,"click",r.click_handler_5)]},m:function(r,i){m(r,t,i),A(t,a),m(r,c,i),m(r,e,i),A(e,o),A(o,s),A(s,n),A(e,H),A(e,_),A(_,L),A(L,I),A(e,S),A(e,F),A(F,O),A(O,U),A(e,y),A(e,x),A(x,G),A(G,$),A(e,P),A(e,J),A(J,C),A(C,K),A(e,Y),A(e,z),A(z,M),A(M,q),m(r,Q,i),m(r,X,i),A(X,Z),A(Z,rr),A(rr,tr),A(tr,ar),A(ar,cr),A(cr,er),A(ar,or),A(ar,sr),A(sr,nr),A(ar,ir),A(ar,lr),A(lr,ur),A(ar,fr),A(ar,hr),A(hr,vr),A(ar,dr),A(ar,Er),A(Er,kr),A(ar,Tr),A(ar,pr),A(pr,wr),A(rr,mr),A(rr,Ar),A(Ar,br),A(br,Dr),A(Ar,gr),A(Ar,Wr),A(Wr,Nr),A(Ar,Rr),A(Ar,Hr),A(Hr,_r),A(Ar,Lr),A(Ar,Ir),A(Ir,Sr),A(Ar,Fr),A(Ar,Or),A(Or,Ur),A(Ar,yr),A(Ar,xr),A(xr,Vr),m(r,jr,i),~$r&&rt[$r].m(r,i),m(r,Jr,i),Cr=!0},p:function(r,t){(r.currentFilter||r.state)&&(p(s,"active",t.currentFilter===t.state.ALL),p(L,"active",t.currentFilter===t.state.NEW),p(O,"active",t.currentFilter===t.state.RESULT),p(G,"active",t.currentFilter===t.state.ERROR),p(C,"active",t.currentFilter===t.state.HALTED),p(M,"active",t.currentFilter===t.state.WAITING)),Cr&&!r.workers||Yr===(Yr=t.workers.length+"")||b(Dr,Yr),Cr&&!r.counters||zr===(zr=t.counters.new+"")||b(Nr,zr),Cr&&!r.counters||Mr===(Mr=t.counters.success+"")||b(_r,Mr),Cr&&!r.counters||qr===(qr=t.counters.error+"")||b(Sr,qr),Cr&&!r.counters||Qr===(Qr=t.counters.halted+"")||b(Ur,Qr),Cr&&!r.counters||Xr===(Xr=t.counters.waiting+"")||b(Vr,Xr);var a=$r;($r=tt(r,t))===a?~$r&&rt[$r].p(r,t):(Pr&&(D(),g(rt[a],1,1,function(){rt[a]=null}),W()),~$r?((Pr=rt[$r])||(Pr=rt[$r]=Zr[$r](t)).c(),N(Pr,1),Pr.m(Jr.parentNode,Jr)):Pr=null)},i:function(r){Cr||(N(Pr),Cr=!0)},o:function(r){g(Pr),Cr=!1},d:function(r){r&&(E(t),E(c),E(e),E(Q),E(X),E(jr)),~$r&&rt[$r].d(r),r&&E(Jr),R(Kr)}}}function Q(r,t,a){var c={RESULT:"OK",ERROR:"ERROR",NEW:"NEW",HALTED:"HALTED",WAITING:"WAITING",ALL:"all"},e=!1,o={success:0,error:0,new:0,halted:0,waiting:0},s=c.ALL,n=[];function i(){n.forEach(function(r){r.state==c.RESULT?a("counters",o.success++,o):r.state==c.ERROR?a("counters",o.error++,o):r.state==c.NEW?a("counters",o.new++,o):r.state==c.HALTED?a("counters",o.halted++,o):r.state==c.WAITING&&a("counters",o.waiting++,o)})}function l(r){a("currentFilter",s=r)}function u(r){var t=[];return n.forEach(function(a){a.state==r&&t.push(a)}),t}H(function(){return F.async(function(r){for(;;)switch(r.prev=r.next){case 0:a("isAllWorkersAvailable",e=!1),O().then(function(r){r&&(a("isAllWorkersAvailable",e=!0),a("workers",n=r.data.workers),n.forEach(function(r){r.state=r.state.toUpperCase(),r.error&&(r.error=JSON.stringify(r.error)),r.time_start=U(r.time_start),r.last_update=U(r.last_update)}),i())}).catch(function(r){console.log(r)});case 2:case"end":return r.stop()}})});var f;return r.$$.update=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{currentFilter:1,workers:1};(r.currentFilter||r.workers)&&a("filteredWorkers",f=function(){return a("counters",o={success:0,error:0,new:0,halted:0,waiting:0}),i(),s==c.ALL?n:s==c.RESULT?u(c.RESULT):s==c.ERROR?u(c.ERROR):s==c.NEW?u(c.NEW):s==c.HALTED?u(c.HALTED):s==c.WAITING?u(c.WAITING):void 0})},{state:c,isAllWorkersAvailable:e,counters:o,currentFilter:s,workers:n,updateFilter:l,filteredWorkers:f,click_handler:function(){return l(c.ALL)},click_handler_1:function(){return l(c.NEW)},click_handler_2:function(){return l(c.RESULT)},click_handler_3:function(){return l(c.ERROR)},click_handler_4:function(){return l(c.HALTED)},click_handler_5:function(){return l(c.WAITING)}}}var X=function(i){function l(r){var n;return t(this,l),n=a(this,c(l).call(this)),e(s(n),r,Q,q,o,[]),n}return r(l,n),l}();export{X as W};
