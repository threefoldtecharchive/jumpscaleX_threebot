import{S as s,i as t,s as a,e,f as r,h as o,k as n,u as l,l as i,w as c,t as p,b as d,z as m,p as h,d as u,r as f,j as g,m as v,o as E,B as I,C as x,J as $}from"./index.9569dcac.js";import{a as _}from"./app.40fc729e.js";import{s as D}from"./showdown.28949a86.js";import{T as b}from"./Tags.076bca96.js";function w(s){var t,a,h=new b({props:{tags:s.post.tags}});return{c(){t=e("div"),h.$$.fragment.c(),this.h()},l(s){t=r(s,"DIV",{class:!0},!1);var a=o(t);h.$$.fragment.l(a),a.forEach(n),this.h()},h(){l(t,"class","post-tags")},m(s,e){i(s,t,e),c(h,t,null),a=!0},p(s,t){var a={};s.post&&(a.tags=t.post.tags),h.$set(a)},i(s){a||(p(h.$$.fragment,s),a=!0)},o(s){d(h.$$.fragment,s),a=!1},d(s){s&&n(t),m(h)}}}function j(s){var t,a,c,p,d,m,I,x,$,_,D,b=s.post.prev.title+"";return{c(){t=e("a"),a=e("div"),c=e("i"),p=h(),d=e("div"),m=e("strong"),I=u("Previous Post"),x=h(),$=e("h6"),_=u(b),this.h()},l(s){t=r(s,"A",{href:!0,class:!0},!1);var e=o(t);a=r(e,"DIV",{class:!0},!1);var l=o(a);c=r(l,"I",{class:!0},!1),o(c).forEach(n),l.forEach(n),p=f(e),d=r(e,"DIV",{class:!0},!1);var i=o(d);m=r(i,"STRONG",{class:!0},!1);var h=o(m);I=g(h,"Previous Post"),h.forEach(n),x=f(i),$=r(i,"H6",{},!1);var u=o($);_=g(u,b),u.forEach(n),i.forEach(n),e.forEach(n),this.h()},h(){l(c,"class","fa fa-angle-left"),l(a,"class","icon prev"),l(m,"class","text-primary"),l(d,"class","text"),l(t,"href",D=s.username+"/posts/"+s.post.prev.slug),l(t,"class","prev-post text-left d-flex align-items-center")},m(s,e){i(s,t,e),v(t,a),v(a,c),v(t,p),v(t,d),v(d,m),v(m,I),v(d,x),v(d,$),v($,_)},p(s,a){s.post&&b!==(b=a.post.prev.title+"")&&E(_,b),(s.username||s.post)&&D!==(D=a.username+"/posts/"+a.post.prev.slug)&&l(t,"href",D)},d(s){s&&n(t)}}}function V(s){var t,a,c,p,d,m,I,x,$,_,D,b=s.post.next.title+"";return{c(){t=e("a"),a=e("div"),c=e("strong"),p=u("Next Post"),d=h(),m=e("h6"),I=u(b),x=h(),$=e("div"),_=e("i"),this.h()},l(s){t=r(s,"A",{href:!0,class:!0},!1);var e=o(t);a=r(e,"DIV",{class:!0},!1);var l=o(a);c=r(l,"STRONG",{class:!0},!1);var i=o(c);p=g(i,"Next Post"),i.forEach(n),d=f(l),m=r(l,"H6",{},!1);var h=o(m);I=g(h,b),h.forEach(n),l.forEach(n),x=f(e),$=r(e,"DIV",{class:!0},!1);var u=o($);_=r(u,"I",{class:!0},!1),o(_).forEach(n),u.forEach(n),e.forEach(n),this.h()},h(){l(c,"class","text-primary"),l(a,"class","text"),l(_,"class","fa fa-angle-right"),l($,"class","icon next"),l(t,"href",D=s.username+"/posts/"+s.post.next.slug),l(t,"class","next-post text-right d-flex align-items-center\n              justify-content-end")},m(s,e){i(s,t,e),v(t,a),v(a,c),v(c,p),v(a,d),v(a,m),v(m,I),v(t,x),v(t,$),v($,_)},p(s,a){s.post&&b!==(b=a.post.next.title+"")&&E(I,b),(s.username||s.post)&&D!==(D=a.username+"/posts/"+a.post.next.slug)&&l(t,"href",D)},d(s){s&&n(t)}}}function y(s){var t,a,c,p,d,m,E;return{c(){t=e("div"),a=h(),c=e("script"),p=u('// configure discuss\n      var disqus_config = function() {\n        this.page.url = location.href;\n        this.page.identifier = location.pathname; // Replace PAGE_IDENTIFIER with your page\'s unique identifier variable\n      };\n\n      (function() {\n        // DON\'T EDIT BELOW THIS LINE\n        var d = document,\n          s = d.createElement("script");\n        s.src = "https://threefoldblog.disqus.com/embed.js";\n        s.setAttribute("data-timestamp", +new Date());\n        (d.head || d.body).appendChild(s);\n      })();'),d=h(),m=h(),E=e("script"),this.h()},l(s){t=r(s,"DIV",{id:!0},!1),o(t).forEach(n),a=f(s),c=r(s,"SCRIPT",{},!1);var e=o(c);p=g(e,'// configure discuss\n      var disqus_config = function() {\n        this.page.url = location.href;\n        this.page.identifier = location.pathname; // Replace PAGE_IDENTIFIER with your page\'s unique identifier variable\n      };\n\n      (function() {\n        // DON\'T EDIT BELOW THIS LINE\n        var d = document,\n          s = d.createElement("script");\n        s.src = "https://threefoldblog.disqus.com/embed.js";\n        s.setAttribute("data-timestamp", +new Date());\n        (d.head || d.body).appendChild(s);\n      })();'),e.forEach(n),d=f(s),m=f(s),E=r(s,"SCRIPT",{id:!0,src:!0,async:!0},!1),o(E).forEach(n),this.h()},h(){l(t,"id","disqus_thread"),l(E,"id","dsq-count-scr"),l(E,"src","//threefoldblog.disqus.com/count.js"),E.async=!0},m(s,e){i(s,t,e),i(s,a,e),i(s,c,e),v(c,p),i(s,d,e),i(s,m,e),i(s,E,e)},d(s){s&&(n(t),n(a),n(c),n(d),n(m),n(E))}}}function T(s){var t,a,$,_,D,T,N,q,P,k,A,R,S,H,C,G,L,O,M,W,B,F,z,J,K,Q,U,X,Y,Z,ss,ts,as,es,rs,os,ns,ls=s.post.title+"",is=s.post.author_name+"",cs=s.post.published_at+"",ps=new b({props:{tags:s.post.tags}}),ds=s.post.tags&&w(s),ms=void 0!==s.post.prev.slug&&j(s),hs=void 0!==s.post.next.slug&&V(s),us=s.metadata.allow_disqus&&y();return{c(){t=e("main"),a=e("div"),$=e("div"),_=e("div"),D=e("img"),T=h(),N=e("div"),q=e("div"),P=e("div"),ps.$$.fragment.c(),k=h(),A=e("h1"),R=u(ls),S=h(),H=e("div"),C=e("a"),G=e("div"),L=e("img"),O=h(),M=e("div"),W=e("span"),B=u(is),z=h(),J=e("div"),K=e("div"),Q=e("i"),U=h(),X=u(cs),Y=h(),Z=e("div"),ss=e("p"),ts=h(),ds&&ds.c(),as=h(),es=e("div"),ms&&ms.c(),rs=h(),hs&&hs.c(),os=h(),us&&us.c(),this.h()},l(s){t=r(s,"MAIN",{class:!0},!1);var e=o(t);a=r(e,"DIV",{class:!0},!1);var l=o(a);$=r(l,"DIV",{class:!0},!1);var i=o($);_=r(i,"DIV",{class:!0},!1);var c=o(_);D=r(c,"IMG",{src:!0,alt:!0,class:!0},!1),o(D).forEach(n),c.forEach(n),T=f(i),N=r(i,"DIV",{class:!0},!1);var p=o(N);q=r(p,"DIV",{class:!0},!1);var d=o(q);P=r(d,"DIV",{class:!0},!1);var m=o(P);ps.$$.fragment.l(m),m.forEach(n),d.forEach(n),k=f(p),A=r(p,"H1",{},!1);var h=o(A);R=g(h,ls),h.forEach(n),S=f(p),H=r(p,"DIV",{class:!0},!1);var u=o(H);C=r(u,"A",{href:!0,class:!0},!1);var v=o(C);G=r(v,"DIV",{class:!0},!1);var E=o(G);L=r(E,"IMG",{src:!0,onerror:!0,alt:!0,class:!0},!1),o(L).forEach(n),E.forEach(n),O=f(v),M=r(v,"DIV",{class:!0},!1);var I=o(M);W=r(I,"SPAN",{},!1);var x=o(W);B=g(x,is),x.forEach(n),I.forEach(n),v.forEach(n),z=f(u),J=r(u,"DIV",{class:!0},!1);var b=o(J);K=r(b,"DIV",{class:!0},!1);var w=o(K);Q=r(w,"I",{class:!0},!1),o(Q).forEach(n),U=f(w),X=g(w,cs),w.forEach(n),b.forEach(n),u.forEach(n),Y=f(p),Z=r(p,"DIV",{class:!0},!1);var j=o(Z);ss=r(j,"P",{},!1),o(ss).forEach(n),j.forEach(n),ts=f(p),ds&&ds.l(p),as=f(p),es=r(p,"DIV",{class:!0},!1);var V=o(es);ms&&ms.l(V),rs=f(V),hs&&hs.l(V),V.forEach(n),p.forEach(n),i.forEach(n),l.forEach(n),os=f(e),us&&us.l(e),e.forEach(n),this.h()},h(){l(D,"src","img/blog-post-3.jpeg"),l(D,"alt","..."),l(D,"class","img-fluid"),l(_,"class","post-thumbnail"),l(P,"class","category"),l(q,"class","post-meta d-flex justify-content-between"),l(L,"src",s.post_image_link),l(L,"onerror","this.src = img/blog-post-1.jpeg"),l(L,"alt","..."),l(L,"class","img-fluid"),l(G,"class","avatar"),l(M,"class","title"),l(C,"href",F=s.username+"/posts/"+s.post.slug),l(C,"class","author d-flex align-items-center flex-wrap"),l(Q,"class","icon-clock"),l(K,"class","date"),l(J,"class","d-flex align-items-center flex-wrap"),l(H,"class","post-footer d-flex align-items-center flex-column flex-sm-row"),l(Z,"class","post-body"),l(es,"class","posts-nav d-flex justify-content-between align-items-stretch\n          flex-column flex-md-row"),l(N,"class","post-details"),l($,"class","post-single"),l(a,"class","container"),l(t,"class","post blog-post col-lg-12")},m(e,r){i(e,t,r),v(t,a),v(a,$),v($,_),v(_,D),v($,T),v($,N),v(N,q),v(q,P),c(ps,P,null),v(N,k),v(N,A),v(A,R),v(N,S),v(N,H),v(H,C),v(C,G),v(G,L),v(C,O),v(C,M),v(M,W),v(W,B),v(H,z),v(H,J),v(J,K),v(K,Q),v(K,U),v(K,X),v(N,Y),v(N,Z),v(Z,ss),ss.innerHTML=s.mdtext,v(N,ts),ds&&ds.m(N,null),v(N,as),v(N,es),ms&&ms.m(es,null),v(es,rs),hs&&hs.m(es,null),v(t,os),us&&us.m(t,null),ns=!0},p(s,a){var e={};s.post&&(e.tags=a.post.tags),ps.$set(e),ns&&!s.post||ls===(ls=a.post.title+"")||E(R,ls),ns&&!s.post_image_link||l(L,"src",a.post_image_link),ns&&!s.post||is===(is=a.post.author_name+"")||E(B,is),ns&&!s.username&&!s.post||F===(F=a.username+"/posts/"+a.post.slug)||l(C,"href",F),ns&&!s.post||cs===(cs=a.post.published_at+"")||E(X,cs),a.post.tags?ds?(ds.p(s,a),p(ds,1)):((ds=w(a)).c(),p(ds,1),ds.m(N,as)):ds&&(I(),d(ds,1,1,()=>{ds=null}),x()),void 0!==a.post.prev.slug?ms?ms.p(s,a):((ms=j(a)).c(),ms.m(es,rs)):ms&&(ms.d(1),ms=null),void 0!==a.post.next.slug?hs?hs.p(s,a):((hs=V(a)).c(),hs.m(es,null)):hs&&(hs.d(1),hs=null),a.metadata.allow_disqus?us||((us=y()).c(),us.m(t,null)):us&&(us.d(1),us=null)},i(s){ns||(p(ps.$$.fragment,s),p(ds),ns=!0)},o(s){d(ps.$$.fragment,s),d(ds),ns=!1},d(s){s&&n(t),m(ps),ds&&ds.d(),ms&&ms.d(),hs&&hs.d(),us&&us.d()}}}function N(s,t,a){let e,{post:r}=t;const{preloading:o,page:n,session:l}=_();$(s,n,s=>{a("$page",e=s)});let{username:i=e.params.theuser,metadata:c={}}=t,p=new D.Converter({metadata:!0});p.setFlavor("github");let d=p.makeHtml(r.content),m=r.post_image,h="";m?m.startsWith("http")?a("post_image_link",h=m):a("post_image_link",h=`/blog_${i}/assets/images/${m}`):a("post_image_link",h="img/blog-post-1.jpeg");let u=r.author_image;return u&&u.startsWith("http"),s.$set=(s=>{"post"in s&&a("post",r=s.post),"username"in s&&a("username",i=s.username),"metadata"in s&&a("metadata",c=s.metadata)}),{post:r,page:n,username:i,metadata:c,mdtext:d,post_image_link:h}}class q extends s{constructor(s){super(),t(this,s,N,T,a,["post","username","metadata"])}}function P(s){var t,a,u,g;document.title=t=s.post.title;var E=new q({props:{post:s.post,metadata:s.metadata}});return{c(){a=e("link"),u=h(),E.$$.fragment.c(),this.h()},l(s){a=r(s,"LINK",{rel:!0,href:!0},!1),o(a).forEach(n),u=f(s),E.$$.fragment.l(s),this.h()},h(){l(a,"rel","stylesheet"),l(a,"href","//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.8/build/styles/default.min.css")},m(s,t){v(document.head,a),i(s,u,t),c(E,s,t),g=!0},p(s,a){g&&!s.post||t===(t=a.post.title)||(document.title=t);var e={};s.post&&(e.post=a.post),s.metadata&&(e.metadata=a.metadata),E.$set(e)},i(s){g||(p(E.$$.fragment,s),g=!0)},o(s){d(E.$$.fragment,s),g=!1},d(s){n(a),s&&n(u),m(E,s)}}}async function k({params:s,query:t}){const a=await this.fetch(`${s.theuser}/metadata.json`),e=await a.json(),r=await this.fetch(`${s.theuser}/posts/${s.slug}.json`),o=await r.json();if(200===r.status)return{post:o,metadata:e};this.error(r.status,o.message)}function A(s,t,a){let e,{post:r,metadata:o}=t;const{preloading:n,page:l,session:i}=_();$(s,l,s=>{a("$page",e=s)});let{username:c=e.params.theuser}=t;return s.$set=(s=>{"post"in s&&a("post",r=s.post),"metadata"in s&&a("metadata",o=s.metadata),"username"in s&&a("username",c=s.username)}),{post:r,metadata:o,page:l,username:c}}export default class extends s{constructor(s){super(),t(this,s,A,P,a,["post","metadata","username"])}}export{k as preload};
