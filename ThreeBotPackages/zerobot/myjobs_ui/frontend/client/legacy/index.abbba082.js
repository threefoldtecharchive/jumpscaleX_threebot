import{_ as t,a,b as s,c as r,i as c,s as n,d as e,S as o,e as i,t as l,f as u,g as f,h,j as d,k as v,l as E,m as T,o as k,p as m,B as p,n as g,K as b,L as N,H as D,z as R,I as A,y as L,M as I,r as _,u as $,v as H,A as S,O as w,C as x,N as y}from"./index.f5bf138d.js";import{_ as U}from"./index.30d9a632.js";import{a as F,f as O}from"./common.d4049a01.js";import{S as B}from"./Spinner.5e0638bc.js";function V(t){var a,s,r,c,n,e,o,b,N,D,R,A,L,I,_,$,H,S,w,x,y,U,F,O,B,V,J,C,j,G,W,P,K,M,Y,z,q,Q,X,Z,tt,at,st,rt,ct,nt,et,ot,it,lt,ut,ft,ht,dt,vt,Et,Tt,kt,mt,pt,gt,bt,Nt,Dt,Rt,At,Lt,It,_t,$t,Ht,St,wt=t.task.category+"",xt=t.task.time_start+"",yt=t.task.time_stop+"",Ut=t.task.state+"",Ft=t.task.timeout+"",Ot=t.task.action_id+"",Bt=t.task.kwargs+"",Vt=t.task.result+"",Jt=t.task.error+"";return{c:function(){a=i("div"),s=i("div"),r=i("div"),c=i("div"),n=i("h5"),e=l("Job Details"),o=u(),b=i("button"),N=i("span"),D=l("×"),R=u(),A=i("div"),L=i("ul"),I=i("li"),_=i("b"),$=l("Category :"),H=u(),S=l(wt),w=u(),x=i("li"),y=i("b"),U=l("Time Start :"),F=u(),O=l(xt),B=u(),V=i("li"),J=i("b"),C=l("Time Stop :"),j=u(),G=l(yt),W=u(),P=i("li"),K=i("b"),M=l("State :"),Y=u(),z=l(Ut),q=u(),Q=i("li"),X=i("b"),Z=l("Timeout :"),tt=u(),at=l(Ft),st=u(),rt=i("li"),ct=i("b"),nt=l("Action Id :"),et=u(),ot=l(Ot),it=u(),lt=i("li"),ut=i("b"),ft=l("Kwargs :"),ht=u(),dt=l(Bt),vt=u(),Et=i("li"),Tt=i("b"),kt=l("Result :"),mt=u(),pt=l(Vt),gt=u(),bt=i("li"),Nt=i("b"),Dt=l("Error :"),Rt=u(),At=i("p"),Lt=l(Jt),It=u(),_t=i("div"),$t=i("button"),Ht=l("Close"),this.h()},l:function(t){a=f(t,"DIV",{class:!0,id:!0,tabindex:!0,role:!0,"aria-labelledby":!0,"aria-hidden":!0});var i=h(a);s=f(i,"DIV",{class:!0,role:!0});var l=h(s);r=f(l,"DIV",{class:!0});var u=h(r);c=f(u,"DIV",{class:!0});var T=h(c);n=f(T,"H5",{class:!0,id:!0});var k=h(n);e=d(k,"Job Details"),k.forEach(v),o=E(T),b=f(T,"BUTTON",{type:!0,class:!0,"data-dismiss":!0,"aria-label":!0});var m=h(b);N=f(m,"SPAN",{"aria-hidden":!0});var p=h(N);D=d(p,"×"),p.forEach(v),m.forEach(v),T.forEach(v),R=E(u),A=f(u,"DIV",{class:!0});var g=h(A);L=f(g,"UL",{class:!0});var St=h(L);I=f(St,"LI",{class:!0});var Ct=h(I);_=f(Ct,"B",{});var jt=h(_);$=d(jt,"Category :"),jt.forEach(v),H=E(Ct),S=d(Ct,wt),Ct.forEach(v),w=E(St),x=f(St,"LI",{class:!0});var Gt=h(x);y=f(Gt,"B",{});var Wt=h(y);U=d(Wt,"Time Start :"),Wt.forEach(v),F=E(Gt),O=d(Gt,xt),Gt.forEach(v),B=E(St),V=f(St,"LI",{class:!0});var Pt=h(V);J=f(Pt,"B",{});var Kt=h(J);C=d(Kt,"Time Stop :"),Kt.forEach(v),j=E(Pt),G=d(Pt,yt),Pt.forEach(v),W=E(St),P=f(St,"LI",{class:!0});var Mt=h(P);K=f(Mt,"B",{});var Yt=h(K);M=d(Yt,"State :"),Yt.forEach(v),Y=E(Mt),z=d(Mt,Ut),Mt.forEach(v),q=E(St),Q=f(St,"LI",{class:!0});var zt=h(Q);X=f(zt,"B",{});var qt=h(X);Z=d(qt,"Timeout :"),qt.forEach(v),tt=E(zt),at=d(zt,Ft),zt.forEach(v),st=E(St),rt=f(St,"LI",{class:!0});var Qt=h(rt);ct=f(Qt,"B",{});var Xt=h(ct);nt=d(Xt,"Action Id :"),Xt.forEach(v),et=E(Qt),ot=d(Qt,Ot),Qt.forEach(v),it=E(St),lt=f(St,"LI",{class:!0});var Zt=h(lt);ut=f(Zt,"B",{});var ta=h(ut);ft=d(ta,"Kwargs :"),ta.forEach(v),ht=E(Zt),dt=d(Zt,Bt),Zt.forEach(v),vt=E(St),Et=f(St,"LI",{class:!0});var aa=h(Et);Tt=f(aa,"B",{});var sa=h(Tt);kt=d(sa,"Result :"),sa.forEach(v),mt=E(aa),pt=d(aa,Vt),aa.forEach(v),gt=E(St),bt=f(St,"LI",{class:!0});var ra=h(bt);Nt=f(ra,"B",{});var ca=h(Nt);Dt=d(ca,"Error :"),ca.forEach(v),Rt=E(ra),At=f(ra,"P",{class:!0});var na=h(At);Lt=d(na,Jt),na.forEach(v),ra.forEach(v),St.forEach(v),g.forEach(v),It=E(u),_t=f(u,"DIV",{class:!0});var ea=h(_t);$t=f(ea,"BUTTON",{type:!0,class:!0,"data-dismiss":!0});var oa=h($t);Ht=d(oa,"Close"),oa.forEach(v),ea.forEach(v),u.forEach(v),l.forEach(v),i.forEach(v),this.h()},h:function(){T(n,"class","modal-title"),T(n,"id","exampleModalLabel"),T(N,"aria-hidden","true"),T(b,"type","button"),T(b,"class","close"),T(b,"data-dismiss","modal"),T(b,"aria-label","Close"),T(c,"class","modal-header"),T(I,"class","list-group-item"),T(x,"class","list-group-item"),T(V,"class","list-group-item"),T(P,"class","list-group-item"),T(Q,"class","list-group-item"),T(rt,"class","list-group-item"),T(lt,"class","list-group-item"),T(Et,"class","list-group-item"),T(At,"class","text-wrap svelte-1gah4ou"),T(bt,"class","list-group-item"),T(L,"class","list-group"),T(A,"class","modal-body"),T($t,"type","button"),T($t,"class","btn btn-secondary"),T($t,"data-dismiss","modal"),T(_t,"class","modal-footer"),T(r,"class","modal-content"),T(s,"class","modal-dialog job-modal svelte-1gah4ou"),T(s,"role","document"),T(a,"class","modal fade"),T(a,"id",St="modal"+t.index),T(a,"tabindex","-1"),T(a,"role","dialog"),T(a,"aria-labelledby","exampleModalLabel"),T(a,"aria-hidden","true")},m:function(t,i){k(t,a,i),m(a,s),m(s,r),m(r,c),m(c,n),m(n,e),m(c,o),m(c,b),m(b,N),m(N,D),m(r,R),m(r,A),m(A,L),m(L,I),m(I,_),m(_,$),m(I,H),m(I,S),m(L,w),m(L,x),m(x,y),m(y,U),m(x,F),m(x,O),m(L,B),m(L,V),m(V,J),m(J,C),m(V,j),m(V,G),m(L,W),m(L,P),m(P,K),m(K,M),m(P,Y),m(P,z),m(L,q),m(L,Q),m(Q,X),m(X,Z),m(Q,tt),m(Q,at),m(L,st),m(L,rt),m(rt,ct),m(ct,nt),m(rt,et),m(rt,ot),m(L,it),m(L,lt),m(lt,ut),m(ut,ft),m(lt,ht),m(lt,dt),m(L,vt),m(L,Et),m(Et,Tt),m(Tt,kt),m(Et,mt),m(Et,pt),m(L,gt),m(L,bt),m(bt,Nt),m(Nt,Dt),m(bt,Rt),m(bt,At),m(At,Lt),m(r,It),m(r,_t),m(_t,$t),m($t,Ht)},p:function(t,s){t.task&&wt!==(wt=s.task.category+"")&&p(S,wt),t.task&&xt!==(xt=s.task.time_start+"")&&p(O,xt),t.task&&yt!==(yt=s.task.time_stop+"")&&p(G,yt),t.task&&Ut!==(Ut=s.task.state+"")&&p(z,Ut),t.task&&Ft!==(Ft=s.task.timeout+"")&&p(at,Ft),t.task&&Ot!==(Ot=s.task.action_id+"")&&p(ot,Ot),t.task&&Bt!==(Bt=s.task.kwargs+"")&&p(dt,Bt),t.task&&Vt!==(Vt=s.task.result+"")&&p(pt,Vt),t.task&&Jt!==(Jt=s.task.error+"")&&p(Lt,Jt),t.index&&St!==(St="modal"+s.index)&&T(a,"id",St)},i:g,o:g,d:function(t){t&&v(a)}}}function J(t,a,s){var r=a.task,c=a.index;return t.$set=function(t){"task"in t&&s("task",r=t.task),"index"in t&&s("index",c=t.index)},{task:r,index:c}}var C=function(i){function l(t){var o;return a(this,l),o=s(this,r(l).call(this)),c(e(o),t,J,V,n,{task:0,index:0}),o}return t(l,o),l}();function j(t,a,s){var r=Object.create(t);return r.task=a[s],r.i=s,r}function G(t){var a,s,r,c,n,e,o,g,b,N,D,R,A,L,I,_,$,H,S,w,x,y,U,F,O,B,V,J,C,j,G,W,P,K,M,Y,z,q,Q,X,Z,tt=t.allTasks.length+"",at=t.counters.success+"",st=t.counters.error+"",rt=t.counters.new+"",ct=t.counters.running+"",nt=t.counters.halted+"";return{c:function(){a=i("div"),s=i("div"),r=i("table"),c=i("thead"),n=i("tr"),e=i("th"),o=l("Total Tasks"),g=u(),b=i("th"),N=l("Success Tasks"),D=u(),R=i("th"),A=l("Failure Tasks"),L=u(),I=i("th"),_=l("New Tasks"),$=u(),H=i("th"),S=l("Running Tasks"),w=u(),x=i("th"),y=l("Halted Tasks"),U=u(),F=i("tbody"),O=i("td"),B=l(tt),V=u(),J=i("td"),C=l(at),j=u(),G=i("td"),W=l(st),P=u(),K=i("td"),M=l(rt),Y=u(),z=i("td"),q=l(ct),Q=u(),X=i("td"),Z=l(nt),this.h()},l:function(t){a=f(t,"DIV",{class:!0});var i=h(a);s=f(i,"DIV",{class:!0});var l=h(s);r=f(l,"TABLE",{class:!0});var u=h(r);c=f(u,"THEAD",{});var T=h(c);n=f(T,"TR",{});var k=h(n);e=f(k,"TH",{class:!0,scope:!0});var m=h(e);o=d(m,"Total Tasks"),m.forEach(v),g=E(k),b=f(k,"TH",{class:!0,scope:!0});var p=h(b);N=d(p,"Success Tasks"),p.forEach(v),D=E(k),R=f(k,"TH",{class:!0,scope:!0});var et=h(R);A=d(et,"Failure Tasks"),et.forEach(v),L=E(k),I=f(k,"TH",{class:!0,scope:!0});var ot=h(I);_=d(ot,"New Tasks"),ot.forEach(v),$=E(k),H=f(k,"TH",{class:!0,scope:!0});var it=h(H);S=d(it,"Running Tasks"),it.forEach(v),w=E(k),x=f(k,"TH",{class:!0,scope:!0});var lt=h(x);y=d(lt,"Halted Tasks"),lt.forEach(v),k.forEach(v),T.forEach(v),U=E(u),F=f(u,"TBODY",{class:!0});var ut=h(F);O=f(ut,"TD",{});var ft=h(O);B=d(ft,tt),ft.forEach(v),V=E(ut),J=f(ut,"TD",{});var ht=h(J);C=d(ht,at),ht.forEach(v),j=E(ut),G=f(ut,"TD",{});var dt=h(G);W=d(dt,st),dt.forEach(v),P=E(ut),K=f(ut,"TD",{});var vt=h(K);M=d(vt,rt),vt.forEach(v),Y=E(ut),z=f(ut,"TD",{});var Et=h(z);q=d(Et,ct),Et.forEach(v),Q=E(ut),X=f(ut,"TD",{});var Tt=h(X);Z=d(Tt,nt),Tt.forEach(v),ut.forEach(v),u.forEach(v),l.forEach(v),i.forEach(v),this.h()},h:function(){T(e,"class","text-center"),T(e,"scope","col"),T(b,"class","text-center"),T(b,"scope","col"),T(R,"class","text-center"),T(R,"scope","col"),T(I,"class","text-center"),T(I,"scope","col"),T(H,"class","text-center"),T(H,"scope","col"),T(x,"class","text-center"),T(x,"scope","col"),T(F,"class","text-center"),T(r,"class","table table-striped"),T(s,"class","col-sm-12"),T(a,"class","row mt-5")},m:function(t,i){k(t,a,i),m(a,s),m(s,r),m(r,c),m(c,n),m(n,e),m(e,o),m(n,g),m(n,b),m(b,N),m(n,D),m(n,R),m(R,A),m(n,L),m(n,I),m(I,_),m(n,$),m(n,H),m(H,S),m(n,w),m(n,x),m(x,y),m(r,U),m(r,F),m(F,O),m(O,B),m(F,V),m(F,J),m(J,C),m(F,j),m(F,G),m(G,W),m(F,P),m(F,K),m(K,M),m(F,Y),m(F,z),m(z,q),m(F,Q),m(F,X),m(X,Z)},p:function(t,a){t.allTasks&&tt!==(tt=a.allTasks.length+"")&&p(B,tt),t.counters&&at!==(at=a.counters.success+"")&&p(C,at),t.counters&&st!==(st=a.counters.error+"")&&p(W,st),t.counters&&rt!==(rt=a.counters.new+"")&&p(M,rt),t.counters&&ct!==(ct=a.counters.running+"")&&p(q,ct),t.counters&&nt!==(nt=a.counters.halted+"")&&p(Z,nt)},d:function(t){t&&v(a)}}}function W(t){var a,s;return{c:function(){a=i("h3"),s=l("There is no Jobs matching your criteria")},l:function(t){a=f(t,"H3",{});var r=h(a);s=d(r,"There is no Jobs matching your criteria"),r.forEach(v)},m:function(t,r){k(t,a,r),m(a,s)},p:g,i:g,o:g,d:function(t){t&&v(a)}}}function P(t){for(var a,s,r,c,n,e,o,p,g,b,N,I,_,$,H,S,x,y,U,F,O,B,V,J,C,G,W,P,K,M,Y,z,q,X,Z,tt=t.filteredTasks(),at=[],st=0;st<tt.length;st+=1)at[st]=Q(j(t,tt,st));var rt=function(t){return R(at[t],1,1,function(){at[t]=null})};return{c:function(){a=i("table"),s=i("thead"),r=i("tr"),c=i("th"),n=l("#"),e=u(),o=i("th"),p=l("Category"),g=u(),b=i("th"),N=l("Time Start"),I=u(),_=i("th"),$=l("Time Stop"),H=u(),S=i("th"),x=l("State"),y=u(),U=i("th"),F=l("Timeout"),O=u(),B=i("th"),V=l("Action"),J=u(),C=i("th"),G=l("kwargs"),W=u(),P=i("th"),K=l("Result"),M=u(),Y=i("th"),z=l("Actions"),q=u(),X=i("tbody");for(var t=0;t<at.length;t+=1)at[t].c();this.h()},l:function(t){a=f(t,"TABLE",{class:!0});var i=h(a);s=f(i,"THEAD",{});var l=h(s);r=f(l,"TR",{});var u=h(r);c=f(u,"TH",{scope:!0});var T=h(c);n=d(T,"#"),T.forEach(v),e=E(u),o=f(u,"TH",{scope:!0});var k=h(o);p=d(k,"Category"),k.forEach(v),g=E(u),b=f(u,"TH",{scope:!0});var m=h(b);N=d(m,"Time Start"),m.forEach(v),I=E(u),_=f(u,"TH",{scope:!0});var D=h(_);$=d(D,"Time Stop"),D.forEach(v),H=E(u),S=f(u,"TH",{scope:!0});var R=h(S);x=d(R,"State"),R.forEach(v),y=E(u),U=f(u,"TH",{scope:!0});var A=h(U);F=d(A,"Timeout"),A.forEach(v),O=E(u),B=f(u,"TH",{scope:!0});var L=h(B);V=d(L,"Action"),L.forEach(v),J=E(u),C=f(u,"TH",{scope:!0});var w=h(C);G=d(w,"kwargs"),w.forEach(v),W=E(u),P=f(u,"TH",{scope:!0});var j=h(P);K=d(j,"Result"),j.forEach(v),M=E(u),Y=f(u,"TH",{scope:!0,class:!0});var Q=h(Y);z=d(Q,"Actions"),Q.forEach(v),u.forEach(v),l.forEach(v),q=E(i),X=f(i,"TBODY",{});for(var Z=h(X),tt=0;tt<at.length;tt+=1)at[tt].l(Z);Z.forEach(v),i.forEach(v),this.h()},h:function(){T(c,"scope","col"),T(o,"scope","col"),T(b,"scope","col"),T(_,"scope","col"),T(S,"scope","col"),T(U,"scope","col"),T(B,"scope","col"),T(C,"scope","col"),T(P,"scope","col"),T(Y,"scope","col"),T(Y,"class","text-center"),T(a,"class","table table-striped")},m:function(t,i){k(t,a,i),m(a,s),m(s,r),m(r,c),m(c,n),m(r,e),m(r,o),m(o,p),m(r,g),m(r,b),m(b,N),m(r,I),m(r,_),m(_,$),m(r,H),m(r,S),m(S,x),m(r,y),m(r,U),m(U,F),m(r,O),m(r,B),m(B,V),m(r,J),m(r,C),m(C,G),m(r,W),m(r,P),m(P,K),m(r,M),m(r,Y),m(Y,z),m(a,q),m(a,X);for(var l=0;l<at.length;l+=1)at[l].m(X,null);Z=!0},p:function(t,a){if(t.filteredTasks||t.state){var s;for(tt=a.filteredTasks(),s=0;s<tt.length;s+=1){var r=j(a,tt,s);at[s]?(at[s].p(t,r),L(at[s],1)):(at[s]=Q(r),at[s].c(),L(at[s],1),at[s].m(X,null))}for(D(),s=tt.length;s<at.length;s+=1)rt(s);A()}},i:function(t){if(!Z){for(var a=0;a<tt.length;a+=1)L(at[a]);Z=!0}},o:function(t){at=at.filter(Boolean);for(var a=0;a<at.length;a+=1)R(at[a]);Z=!1},d:function(t){t&&v(a),w(at,t)}}}function K(t){var a,s,r,c=t.task.state+"";return{c:function(){a=i("td"),s=i("span"),r=l(c),this.h()},l:function(t){a=f(t,"TD",{});var n=h(a);s=f(n,"SPAN",{class:!0});var e=h(s);r=d(e,c),e.forEach(v),n.forEach(v),this.h()},h:function(){T(s,"class","badge badge-info")},m:function(t,c){k(t,a,c),m(a,s),m(s,r)},p:function(t,a){t.filteredTasks&&c!==(c=a.task.state+"")&&p(r,c)},d:function(t){t&&v(a)}}}function M(t){var a,s,r,c=t.task.state+"";return{c:function(){a=i("td"),s=i("span"),r=l(c),this.h()},l:function(t){a=f(t,"TD",{});var n=h(a);s=f(n,"SPAN",{class:!0});var e=h(s);r=d(e,c),e.forEach(v),n.forEach(v),this.h()},h:function(){T(s,"class","badge badge-warning")},m:function(t,c){k(t,a,c),m(a,s),m(s,r)},p:function(t,a){t.filteredTasks&&c!==(c=a.task.state+"")&&p(r,c)},d:function(t){t&&v(a)}}}function Y(t){var a,s,r,c=t.task.state+"";return{c:function(){a=i("td"),s=i("span"),r=l(c),this.h()},l:function(t){a=f(t,"TD",{});var n=h(a);s=f(n,"SPAN",{class:!0});var e=h(s);r=d(e,c),e.forEach(v),n.forEach(v),this.h()},h:function(){T(s,"class","badge badge-primary")},m:function(t,c){k(t,a,c),m(a,s),m(s,r)},p:function(t,a){t.filteredTasks&&c!==(c=a.task.state+"")&&p(r,c)},d:function(t){t&&v(a)}}}function z(t){var a,s,r,c=t.task.state+"";return{c:function(){a=i("td"),s=i("span"),r=l(c),this.h()},l:function(t){a=f(t,"TD",{});var n=h(a);s=f(n,"SPAN",{class:!0});var e=h(s);r=d(e,c),e.forEach(v),n.forEach(v),this.h()},h:function(){T(s,"class","badge badge-danger")},m:function(t,c){k(t,a,c),m(a,s),m(s,r)},p:function(t,a){t.filteredTasks&&c!==(c=a.task.state+"")&&p(r,c)},d:function(t){t&&v(a)}}}function q(t){var a,s,r,c=t.task.state+"";return{c:function(){a=i("td"),s=i("span"),r=l(c),this.h()},l:function(t){a=f(t,"TD",{});var n=h(a);s=f(n,"SPAN",{class:!0});var e=h(s);r=d(e,c),e.forEach(v),n.forEach(v),this.h()},h:function(){T(s,"class","badge badge-success")},m:function(t,c){k(t,a,c),m(a,s),m(s,r)},p:function(t,a){t.filteredTasks&&c!==(c=a.task.state+"")&&p(r,c)},d:function(t){t&&v(a)}}}function Q(t){var a,s,r,c,n,e,o,g,b,N,D,A,I,w,x,y,U,F,O,B,V,J,j,G,W,P,Q,X,Z,tt,at,st,rt,ct,nt,et=t.i+1+"",ot=t.task.category+"",it=t.task.time_start+"",lt=t.task.time_stop+"",ut=t.task.timeout+"",ft=t.task.action_id+"",ht=t.task.kwargs+"",dt=t.task.result+"";function vt(t,a){return a.task.state==a.state.RESULT?q:a.task.state==a.state.ERROR?z:a.task.state==a.state.NEW?Y:a.task.state==a.state.RUNNING?M:a.task.state==a.state.HALTED?K:void 0}var Et=vt(0,t),Tt=Et&&Et(t),kt=new C({props:{task:t.task,index:t.i}});return{c:function(){a=i("tr"),s=i("th"),r=l(et),c=u(),n=i("td"),e=l(ot),o=u(),g=i("td"),b=l(it),N=u(),D=i("td"),A=l(lt),I=u(),Tt&&Tt.c(),w=u(),x=i("td"),y=l(ut),U=u(),F=i("td"),O=l(ft),B=u(),V=i("td"),J=l(ht),j=u(),G=i("td"),W=l(dt),P=u(),Q=i("td"),X=i("div"),Z=i("div"),tt=i("button"),at=l("Details"),st=u(),rt=i("div"),_(kt.$$.fragment),ct=u(),this.h()},l:function(t){a=f(t,"TR",{});var i=h(a);s=f(i,"TH",{scope:!0});var l=h(s);r=d(l,et),l.forEach(v),c=E(i),n=f(i,"TD",{});var u=h(n);e=d(u,ot),u.forEach(v),o=E(i),g=f(i,"TD",{});var T=h(g);b=d(T,it),T.forEach(v),N=E(i),D=f(i,"TD",{});var k=h(D);A=d(k,lt),k.forEach(v),I=E(i),Tt&&Tt.l(i),w=E(i),x=f(i,"TD",{});var m=h(x);y=d(m,ut),m.forEach(v),U=E(i),F=f(i,"TD",{});var p=h(F);O=d(p,ft),p.forEach(v),B=E(i),V=f(i,"TD",{});var R=h(V);J=d(R,ht),R.forEach(v),j=E(i),G=f(i,"TD",{});var L=h(G);W=d(L,dt),L.forEach(v),P=E(i),Q=f(i,"TD",{class:!0});var _=h(Q);X=f(_,"DIV",{});var H=h(X);Z=f(H,"DIV",{});var S=h(Z);tt=f(S,"BUTTON",{type:!0,class:!0,"data-toggle":!0,"data-target":!0});var C=h(tt);at=d(C,"Details"),C.forEach(v),S.forEach(v),H.forEach(v),_.forEach(v),st=E(i),rt=f(i,"DIV",{});var K=h(rt);$(kt.$$.fragment,K),K.forEach(v),ct=E(i),i.forEach(v),this.h()},h:function(){T(s,"scope","row"),T(tt,"type","button"),T(tt,"class","btn btn-warning pointer"),T(tt,"data-toggle","modal"),T(tt,"data-target","#modal"+t.i),T(Q,"class","text-center")},m:function(t,i){k(t,a,i),m(a,s),m(s,r),m(a,c),m(a,n),m(n,e),m(a,o),m(a,g),m(g,b),m(a,N),m(a,D),m(D,A),m(a,I),Tt&&Tt.m(a,null),m(a,w),m(a,x),m(x,y),m(a,U),m(a,F),m(F,O),m(a,B),m(a,V),m(V,J),m(a,j),m(a,G),m(G,W),m(a,P),m(a,Q),m(Q,X),m(X,Z),m(Z,tt),m(tt,at),m(a,st),m(a,rt),H(kt,rt,null),m(a,ct),nt=!0},p:function(t,s){nt&&!t.filteredTasks||ot===(ot=s.task.category+"")||p(e,ot),nt&&!t.filteredTasks||it===(it=s.task.time_start+"")||p(b,it),nt&&!t.filteredTasks||lt===(lt=s.task.time_stop+"")||p(A,lt),Et===(Et=vt(0,s))&&Tt?Tt.p(t,s):(Tt&&Tt.d(1),(Tt=Et&&Et(s))&&(Tt.c(),Tt.m(a,w))),nt&&!t.filteredTasks||ut===(ut=s.task.timeout+"")||p(y,ut),nt&&!t.filteredTasks||ft===(ft=s.task.action_id+"")||p(O,ft),nt&&!t.filteredTasks||ht===(ht=s.task.kwargs+"")||p(J,ht),nt&&!t.filteredTasks||dt===(dt=s.task.result+"")||p(W,dt);var r={};t.filteredTasks&&(r.task=s.task),kt.$set(r)},i:function(t){nt||(L(kt.$$.fragment,t),nt=!0)},o:function(t){R(kt.$$.fragment,t),nt=!1},d:function(t){t&&v(a),Tt&&Tt.d(),S(kt)}}}function X(t){var a,s,r,c,n,e,o,p,g,_,$,H,S,w,x,y,U,F,O,B,V,J,C,j,K,M,Y,z,q,Q,X,Z,tt,at,st=1!=t.isError&&G(t),rt=[P,W],ct=[];function nt(t,a){return(null==Q||t.filteredTasks)&&(Q=!!(a.filteredTasks().length>0)),Q?0:1}return X=nt(null,t),Z=ct[X]=rt[X](t),{c:function(){a=i("div"),s=i("div"),r=i("button"),c=l("All"),n=u(),e=i("div"),o=i("button"),p=l("Success"),g=u(),_=i("div"),$=i("button"),H=l("Failure"),S=u(),w=i("div"),x=i("button"),y=l("New"),U=u(),F=i("div"),O=i("button"),B=l("Running"),V=u(),J=i("div"),C=i("button"),j=l("Halted"),K=u(),st&&st.c(),M=u(),Y=i("div"),z=i("div"),q=i("div"),Z.c(),this.h()},l:function(t){a=f(t,"DIV",{class:!0});var i=h(a);s=f(i,"DIV",{class:!0});var l=h(s);r=f(l,"BUTTON",{class:!0});var u=h(r);c=d(u,"All"),u.forEach(v),l.forEach(v),n=E(i),e=f(i,"DIV",{class:!0});var T=h(e);o=f(T,"BUTTON",{class:!0});var k=h(o);p=d(k,"Success"),k.forEach(v),T.forEach(v),g=E(i),_=f(i,"DIV",{class:!0});var m=h(_);$=f(m,"BUTTON",{class:!0});var b=h($);H=d(b,"Failure"),b.forEach(v),m.forEach(v),S=E(i),w=f(i,"DIV",{class:!0});var N=h(w);x=f(N,"BUTTON",{class:!0});var D=h(x);y=d(D,"New"),D.forEach(v),N.forEach(v),U=E(i),F=f(i,"DIV",{class:!0});var R=h(F);O=f(R,"BUTTON",{class:!0});var A=h(O);B=d(A,"Running"),A.forEach(v),R.forEach(v),V=E(i),J=f(i,"DIV",{class:!0});var L=h(J);C=f(L,"BUTTON",{class:!0});var I=h(C);j=d(I,"Halted"),I.forEach(v),L.forEach(v),i.forEach(v),K=E(t),st&&st.l(t),M=E(t),Y=f(t,"DIV",{});var G=h(Y);z=f(G,"DIV",{class:!0});var W=h(z);q=f(W,"DIV",{class:!0});var P=h(q);Z.l(P),P.forEach(v),W.forEach(v),G.forEach(v),this.h()},h:function(){T(r,"class","btn"),b(r,"active",t.currentFilter===t.state.ALL),T(s,"class","mr-3"),T(o,"class","btn"),b(o,"active",t.currentFilter===t.state.RESULT),T(e,"class","mr-3"),T($,"class","btn"),b($,"active",t.currentFilter===t.state.ERROR),T(_,"class","mr-3"),T(x,"class","btn"),b(x,"active",t.currentFilter===t.state.NEW),T(w,"class","mr-3"),T(O,"class","btn"),b(O,"active",t.currentFilter===t.state.RUNNING),T(F,"class","mr-3"),T(C,"class","btn"),b(C,"active",t.currentFilter===t.state.HALTED),T(J,"class","mr-3"),T(a,"class","d-flex justify-content-start"),T(q,"class","col-sm-12"),T(z,"class","row mt-5"),at=[N(r,"click",t.click_handler),N(o,"click",t.click_handler_1),N($,"click",t.click_handler_2),N(x,"click",t.click_handler_3),N(O,"click",t.click_handler_4),N(C,"click",t.click_handler_5)]},m:function(t,i){k(t,a,i),m(a,s),m(s,r),m(r,c),m(a,n),m(a,e),m(e,o),m(o,p),m(a,g),m(a,_),m(_,$),m($,H),m(a,S),m(a,w),m(w,x),m(x,y),m(a,U),m(a,F),m(F,O),m(O,B),m(a,V),m(a,J),m(J,C),m(C,j),k(t,K,i),st&&st.m(t,i),k(t,M,i),k(t,Y,i),m(Y,z),m(z,q),ct[X].m(q,null),tt=!0},p:function(t,a){(t.currentFilter||t.state)&&b(r,"active",a.currentFilter===a.state.ALL),(t.currentFilter||t.state)&&b(o,"active",a.currentFilter===a.state.RESULT),(t.currentFilter||t.state)&&b($,"active",a.currentFilter===a.state.ERROR),(t.currentFilter||t.state)&&b(x,"active",a.currentFilter===a.state.NEW),(t.currentFilter||t.state)&&b(O,"active",a.currentFilter===a.state.RUNNING),(t.currentFilter||t.state)&&b(C,"active",a.currentFilter===a.state.HALTED),1!=a.isError?st?st.p(t,a):((st=G(a)).c(),st.m(M.parentNode,M)):st&&(st.d(1),st=null);var s=X;(X=nt(t,a))===s?ct[X].p(t,a):(D(),R(ct[s],1,1,function(){ct[s]=null}),A(),(Z=ct[X])||(Z=ct[X]=rt[X](a)).c(),L(Z,1),Z.m(q,null))},i:function(t){tt||(L(Z),tt=!0)},o:function(t){R(Z),tt=!1},d:function(t){t&&v(a),t&&v(K),st&&st.d(t),t&&v(M),t&&v(Y),ct[X].d(),I(at)}}}function Z(t,a,s){var r=a.allTasks,c=void 0===r?[]:r,n=a.isError,e=void 0!==n&&n,o={RESULT:"OK",ERROR:"ERROR",NEW:"NEW",RUNNING:"RUNNING",HALTED:"HALTED",ALL:"all"},i={success:0,error:0,new:0,running:0,halted:0},l=o.ALL;function u(t){var a=[];return c.forEach(function(s){s.state==t&&a.push(s)}),a}function f(t){s("currentFilter",l=t)}var h;return t.$set=function(t){"allTasks"in t&&s("allTasks",c=t.allTasks),"isError"in t&&s("isError",e=t.isError)},t.$$.update=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{currentFilter:1,allTasks:1};(t.currentFilter||t.allTasks)&&s("filteredTasks",h=function(){return s("counters",i={success:0,error:0,new:0,running:0,halted:0}),c.forEach(function(t){t.state===o.RESULT?s("counters",i.success++,i):t.state===o.ERROR?s("counters",i.error++,i):t.state===o.NEW?s("counters",i.new++,i):t.state===o.RUNNING?s("counters",i.running++,i):t.state===o.HALTED&&s("counters",i.halted++,i)}),l==o.ALL?c:l==o.RESULT?u(o.RESULT):l==o.ERROR?u(o.ERROR):l==o.NEW?u(o.NEW):l==o.RUNNING?u(o.RUNNING):l==o.HALTED?u(o.HALTED):void 0})},{allTasks:c,isError:e,state:o,counters:i,currentFilter:l,updateFilter:f,filteredTasks:h,click_handler:function(){return f(o.ALL)},click_handler_1:function(){return f(o.RESULT)},click_handler_2:function(){return f(o.ERROR)},click_handler_3:function(){return f(o.NEW)},click_handler_4:function(){return f(o.RUNNING)},click_handler_5:function(){return f(o.HALTED)}}}var tt=function(i){function l(t){var o;return a(this,l),o=s(this,r(l).call(this)),c(e(o),t,Z,X,n,{allTasks:0,isError:0}),o}return t(l,o),l}();function at(t){var a,s=new B({});return{c:function(){_(s.$$.fragment)},l:function(t){$(s.$$.fragment,t)},m:function(t,r){H(s,t,r),a=!0},p:g,i:function(t){a||(L(s.$$.fragment,t),a=!0)},o:function(t){R(s.$$.fragment,t),a=!1},d:function(t){S(s,t)}}}function st(t){var a,s,r;return{c:function(){a=i("div"),s=i("h2"),r=l("There is no Jobs")},l:function(t){a=f(t,"DIV",{});var c=h(a);s=f(c,"H2",{});var n=h(s);r=d(n,"There is no Jobs"),n.forEach(v),c.forEach(v)},m:function(t,c){k(t,a,c),m(a,s),m(s,r)},p:g,i:g,o:g,d:function(t){t&&v(a)}}}function rt(t){var a,s=new tt({props:{allTasks:t.allTasks}});return{c:function(){_(s.$$.fragment)},l:function(t){$(s.$$.fragment,t)},m:function(t,r){H(s,t,r),a=!0},p:function(t,a){var r={};t.allTasks&&(r.allTasks=a.allTasks),s.$set(r)},i:function(t){a||(L(s.$$.fragment,t),a=!0)},o:function(t){R(s.$$.fragment,t),a=!1},d:function(t){S(s,t)}}}function ct(t){var a,s,r,c,n,e,o,T=[rt,st,at],p=[];function g(t,a){return a.allTasks&&a.allTasks.length>0&&a.isAllTasksAvailable?0:0==a.allTasks.length&&a.isAllTasksAvailable?1:a.isAllTasksAvailable?-1:2}return~(c=g(0,t))&&(n=p[c]=T[c](t)),{c:function(){a=i("h1"),s=l("Jobs"),r=u(),n&&n.c(),e=x()},l:function(t){a=f(t,"H1",{});var c=h(a);s=d(c,"Jobs"),c.forEach(v),r=E(t),n&&n.l(t),e=x()},m:function(t,n){k(t,a,n),m(a,s),k(t,r,n),~c&&p[c].m(t,n),k(t,e,n),o=!0},p:function(t,a){var s=c;(c=g(0,a))===s?~c&&p[c].p(t,a):(n&&(D(),R(p[s],1,1,function(){p[s]=null}),A()),~c?((n=p[c])||(n=p[c]=T[c](a)).c(),L(n,1),n.m(e.parentNode,e)):n=null)},i:function(t){o||(L(n),o=!0)},o:function(t){R(n),o=!1},d:function(t){t&&v(a),t&&v(r),~c&&p[c].d(t),t&&v(e)}}}function nt(t,a,s){var r=[],c=!1;return r.forEach(function(t){t.state=t.state.toUpperCase()}),y(function(){return U.async(function(t){for(;;)switch(t.prev=t.next){case 0:s("isAllTasksAvailable",c=!1),F().then(function(t){s("isAllTasksAvailable",c=!0),t&&(s("allTasks",r=t.data.jobs),r.forEach(function(t){t.state=t.state.toUpperCase(),t.kwargs=JSON.stringify(t.kwargs),t.result=JSON.stringify(t.result),t.error=JSON.stringify(t.error),t.time_start=O(t.time_start),t.time_stop=O(t.time_stop)}))}).catch(function(t){console.log(t)});case 2:case"end":return t.stop()}})}),{allTasks:r,isAllTasksAvailable:c}}var et=function(i){function l(t){var o;return a(this,l),o=s(this,r(l).call(this)),c(e(o),t,nt,ct,n,{}),o}return t(l,o),l}();function ot(t){var a,s=new et({});return{c:function(){_(s.$$.fragment)},l:function(t){$(s.$$.fragment,t)},m:function(t,r){H(s,t,r),a=!0},p:g,i:function(t){a||(L(s.$$.fragment,t),a=!0)},o:function(t){R(s.$$.fragment,t),a=!1},d:function(t){S(s,t)}}}export default(function(i){function l(t){var o;return a(this,l),o=s(this,r(l).call(this)),c(e(o),t,null,ot,n,{}),o}return t(l,o),l}());
