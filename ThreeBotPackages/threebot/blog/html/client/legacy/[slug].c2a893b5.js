import{a as t,b as s,c as a,d as e,i as n,s as o,e as r,S as i,k as c,m as l,o as u,q as f,z as p,r as h,B as d,t as m,j as g,E as v,w as E,l as x,y as I,p as $,u as b,v as _,G as D,H as w,P as j}from"./index.da608116.js";import{b as y,_ as V,d as T}from"./app.fecb3c59.js";import{s as k}from"./showdown.f97ad806.js";import{T as q}from"./Tags.45b6ef89.js";function N(t){var s,a,e=new q({props:{tags:t.post.tags}});return{c:function(){s=c("div"),e.$$.fragment.c(),this.h()},l:function(t){s=l(t,"DIV",{class:!0},!1);var a=u(s);e.$$.fragment.l(a),a.forEach(f),this.h()},h:function(){p(s,"class","post-tags")},m:function(t,n){h(t,s,n),d(e,s,null),a=!0},p:function(t,s){var a={};t.post&&(a.tags=s.post.tags),e.$set(a)},i:function(t){a||(m(e.$$.fragment,t),a=!0)},o:function(t){g(e.$$.fragment,t),a=!1},d:function(t){t&&f(s),v(e)}}}function P(t){var s,a,e,n,o,r,i,d,m,g,v,D=t.post.prev.title+"";return{c:function(){s=c("a"),a=c("div"),e=c("i"),n=E(),o=c("div"),r=c("strong"),i=x("Previous Post"),d=E(),m=c("h6"),g=x(D),this.h()},l:function(t){s=l(t,"A",{href:!0,class:!0},!1);var c=u(s);a=l(c,"DIV",{class:!0},!1);var p=u(a);e=l(p,"I",{class:!0},!1),u(e).forEach(f),p.forEach(f),n=I(c),o=l(c,"DIV",{class:!0},!1);var h=u(o);r=l(h,"STRONG",{class:!0},!1);var v=u(r);i=$(v,"Previous Post"),v.forEach(f),d=I(h),m=l(h,"H6",{},!1);var E=u(m);g=$(E,D),E.forEach(f),h.forEach(f),c.forEach(f),this.h()},h:function(){p(e,"class","fa fa-angle-left"),p(a,"class","icon prev"),p(r,"class","text-primary"),p(o,"class","text"),p(s,"href",v=t.username+"/posts/"+t.post.prev.slug),p(s,"class","prev-post text-left d-flex align-items-center")},m:function(t,c){h(t,s,c),b(s,a),b(a,e),b(s,n),b(s,o),b(o,r),b(r,i),b(o,d),b(o,m),b(m,g)},p:function(t,a){t.post&&D!==(D=a.post.prev.title+"")&&_(g,D),(t.username||t.post)&&v!==(v=a.username+"/posts/"+a.post.prev.slug)&&p(s,"href",v)},d:function(t){t&&f(s)}}}function A(t){var s,a,e,n,o,r,i,d,m,g,v,D=t.post.next.title+"";return{c:function(){s=c("a"),a=c("div"),e=c("strong"),n=x("Next Post"),o=E(),r=c("h6"),i=x(D),d=E(),m=c("div"),g=c("i"),this.h()},l:function(t){s=l(t,"A",{href:!0,class:!0},!1);var c=u(s);a=l(c,"DIV",{class:!0},!1);var p=u(a);e=l(p,"STRONG",{class:!0},!1);var h=u(e);n=$(h,"Next Post"),h.forEach(f),o=I(p),r=l(p,"H6",{},!1);var v=u(r);i=$(v,D),v.forEach(f),p.forEach(f),d=I(c),m=l(c,"DIV",{class:!0},!1);var E=u(m);g=l(E,"I",{class:!0},!1),u(g).forEach(f),E.forEach(f),c.forEach(f),this.h()},h:function(){p(e,"class","text-primary"),p(a,"class","text"),p(g,"class","fa fa-angle-right"),p(m,"class","icon next"),p(s,"href",v=t.username+"/posts/"+t.post.next.slug),p(s,"class","next-post text-right d-flex align-items-center\n              justify-content-end")},m:function(t,c){h(t,s,c),b(s,a),b(a,e),b(e,n),b(a,o),b(a,r),b(r,i),b(s,d),b(s,m),b(m,g)},p:function(t,a){t.post&&D!==(D=a.post.next.title+"")&&_(i,D),(t.username||t.post)&&v!==(v=a.username+"/posts/"+a.post.next.slug)&&p(s,"href",v)},d:function(t){t&&f(s)}}}function H(t){var s,a,e,n,o,r,i;return{c:function(){s=c("div"),a=E(),e=c("script"),n=x('// configure discuss\n      var disqus_config = function() {\n        this.page.url = location.href;\n        this.page.identifier = location.pathname; // Replace PAGE_IDENTIFIER with your page\'s unique identifier variable\n      };\n\n      (function() {\n        // DON\'T EDIT BELOW THIS LINE\n        var d = document,\n          s = d.createElement("script");\n        s.src = "https://threefoldblog.disqus.com/embed.js";\n        s.setAttribute("data-timestamp", +new Date());\n        (d.head || d.body).appendChild(s);\n      })();'),o=E(),r=E(),i=c("script"),this.h()},l:function(t){s=l(t,"DIV",{id:!0},!1),u(s).forEach(f),a=I(t),e=l(t,"SCRIPT",{},!1);var c=u(e);n=$(c,'// configure discuss\n      var disqus_config = function() {\n        this.page.url = location.href;\n        this.page.identifier = location.pathname; // Replace PAGE_IDENTIFIER with your page\'s unique identifier variable\n      };\n\n      (function() {\n        // DON\'T EDIT BELOW THIS LINE\n        var d = document,\n          s = d.createElement("script");\n        s.src = "https://threefoldblog.disqus.com/embed.js";\n        s.setAttribute("data-timestamp", +new Date());\n        (d.head || d.body).appendChild(s);\n      })();'),c.forEach(f),o=I(t),r=I(t),i=l(t,"SCRIPT",{id:!0,src:!0,async:!0},!1),u(i).forEach(f),this.h()},h:function(){p(s,"id","disqus_thread"),p(i,"id","dsq-count-scr"),p(i,"src","//threefoldblog.disqus.com/count.js"),i.async=!0},m:function(t,c){h(t,s,c),h(t,a,c),h(t,e,c),b(e,n),h(t,o,c),h(t,r,c),h(t,i,c)},d:function(t){t&&(f(s),f(a),f(e),f(o),f(r),f(i))}}}function R(t){var s,a,e,n,o,r,i,j,y,V,T,k,R,S,G,L,O,C,M,W,B,F,z,K,J,Q,U,X,Y,Z,tt,st,at,et,nt,ot,rt,it=t.post.title+"",ct=t.post.author_name+"",lt=t.post.published_at+"",ut=new q({props:{tags:t.post.tags}}),ft=t.post.tags&&N(t),pt=void 0!==t.post.prev.slug&&P(t),ht=void 0!==t.post.next.slug&&A(t),dt=t.metadata.allow_disqus&&H();return{c:function(){s=c("main"),a=c("div"),e=c("div"),n=c("div"),o=c("img"),r=E(),i=c("div"),j=c("div"),y=c("div"),ut.$$.fragment.c(),V=E(),T=c("h1"),k=x(it),R=E(),S=c("div"),G=c("a"),L=c("div"),O=c("img"),C=E(),M=c("div"),W=c("span"),B=x(ct),z=E(),K=c("div"),J=c("div"),Q=c("i"),U=E(),X=x(lt),Y=E(),Z=c("div"),tt=c("p"),st=E(),ft&&ft.c(),at=E(),et=c("div"),pt&&pt.c(),nt=E(),ht&&ht.c(),ot=E(),dt&&dt.c(),this.h()},l:function(t){s=l(t,"MAIN",{class:!0},!1);var c=u(s);a=l(c,"DIV",{class:!0},!1);var p=u(a);e=l(p,"DIV",{class:!0},!1);var h=u(e);n=l(h,"DIV",{class:!0},!1);var d=u(n);o=l(d,"IMG",{src:!0,alt:!0,class:!0},!1),u(o).forEach(f),d.forEach(f),r=I(h),i=l(h,"DIV",{class:!0},!1);var m=u(i);j=l(m,"DIV",{class:!0},!1);var g=u(j);y=l(g,"DIV",{class:!0},!1);var v=u(y);ut.$$.fragment.l(v),v.forEach(f),g.forEach(f),V=I(m),T=l(m,"H1",{},!1);var E=u(T);k=$(E,it),E.forEach(f),R=I(m),S=l(m,"DIV",{class:!0},!1);var x=u(S);G=l(x,"A",{href:!0,class:!0},!1);var b=u(G);L=l(b,"DIV",{class:!0},!1);var _=u(L);O=l(_,"IMG",{src:!0,onerror:!0,alt:!0,class:!0},!1),u(O).forEach(f),_.forEach(f),C=I(b),M=l(b,"DIV",{class:!0},!1);var D=u(M);W=l(D,"SPAN",{},!1);var w=u(W);B=$(w,ct),w.forEach(f),D.forEach(f),b.forEach(f),z=I(x),K=l(x,"DIV",{class:!0},!1);var q=u(K);J=l(q,"DIV",{class:!0},!1);var N=u(J);Q=l(N,"I",{class:!0},!1),u(Q).forEach(f),U=I(N),X=$(N,lt),N.forEach(f),q.forEach(f),x.forEach(f),Y=I(m),Z=l(m,"DIV",{class:!0},!1);var P=u(Z);tt=l(P,"P",{},!1),u(tt).forEach(f),P.forEach(f),st=I(m),ft&&ft.l(m),at=I(m),et=l(m,"DIV",{class:!0},!1);var A=u(et);pt&&pt.l(A),nt=I(A),ht&&ht.l(A),A.forEach(f),m.forEach(f),h.forEach(f),p.forEach(f),ot=I(c),dt&&dt.l(c),c.forEach(f),this.h()},h:function(){p(o,"src","img/blog-post-3.jpeg"),p(o,"alt","..."),p(o,"class","img-fluid"),p(n,"class","post-thumbnail"),p(y,"class","category"),p(j,"class","post-meta d-flex justify-content-between"),p(O,"src",t.post_image_link),p(O,"onerror","this.src = img/blog-post-1.jpeg"),p(O,"alt","..."),p(O,"class","img-fluid"),p(L,"class","avatar"),p(M,"class","title"),p(G,"href",F=t.username+"/posts/"+t.post.slug),p(G,"class","author d-flex align-items-center flex-wrap"),p(Q,"class","icon-clock"),p(J,"class","date"),p(K,"class","d-flex align-items-center flex-wrap"),p(S,"class","post-footer d-flex align-items-center flex-column flex-sm-row"),p(Z,"class","post-body"),p(et,"class","posts-nav d-flex justify-content-between align-items-stretch\n          flex-column flex-md-row"),p(i,"class","post-details"),p(e,"class","post-single"),p(a,"class","container"),p(s,"class","post blog-post col-lg-12")},m:function(c,l){h(c,s,l),b(s,a),b(a,e),b(e,n),b(n,o),b(e,r),b(e,i),b(i,j),b(j,y),d(ut,y,null),b(i,V),b(i,T),b(T,k),b(i,R),b(i,S),b(S,G),b(G,L),b(L,O),b(G,C),b(G,M),b(M,W),b(W,B),b(S,z),b(S,K),b(K,J),b(J,Q),b(J,U),b(J,X),b(i,Y),b(i,Z),b(Z,tt),tt.innerHTML=t.mdtext,b(i,st),ft&&ft.m(i,null),b(i,at),b(i,et),pt&&pt.m(et,null),b(et,nt),ht&&ht.m(et,null),b(s,ot),dt&&dt.m(s,null),rt=!0},p:function(t,a){var e={};t.post&&(e.tags=a.post.tags),ut.$set(e),rt&&!t.post||it===(it=a.post.title+"")||_(k,it),rt&&!t.post_image_link||p(O,"src",a.post_image_link),rt&&!t.post||ct===(ct=a.post.author_name+"")||_(B,ct),rt&&!t.username&&!t.post||F===(F=a.username+"/posts/"+a.post.slug)||p(G,"href",F),rt&&!t.post||lt===(lt=a.post.published_at+"")||_(X,lt),a.post.tags?ft?(ft.p(t,a),m(ft,1)):((ft=N(a)).c(),m(ft,1),ft.m(i,at)):ft&&(D(),g(ft,1,1,function(){ft=null}),w()),void 0!==a.post.prev.slug?pt?pt.p(t,a):((pt=P(a)).c(),pt.m(et,nt)):pt&&(pt.d(1),pt=null),void 0!==a.post.next.slug?ht?ht.p(t,a):((ht=A(a)).c(),ht.m(et,null)):ht&&(ht.d(1),ht=null),a.metadata.allow_disqus?dt||((dt=H()).c(),dt.m(s,null)):dt&&(dt.d(1),dt=null)},i:function(t){rt||(m(ut.$$.fragment,t),m(ft),rt=!0)},o:function(t){g(ut.$$.fragment,t),g(ft),rt=!1},d:function(t){t&&f(s),v(ut),ft&&ft.d(),pt&&pt.d(),ht&&ht.d(),dt&&dt.d()}}}function S(t,s,a){var e,n=s.post,o=y(),r=(o.preloading,o.page);o.session;j(t,r,function(t){a("$page",e=t)});var i=s.username,c=void 0===i?e.params.theuser:i,l=s.metadata,u=void 0===l?{}:l,f=new k.Converter({metadata:!0});f.setFlavor("github");var p=f.makeHtml(n.content),h=n.post_image,d="";h?h.startsWith("http")?a("post_image_link",d=h):a("post_image_link",d="/blog_".concat(c,"/assets/images/").concat(h)):a("post_image_link",d="img/blog-post-1.jpeg");var m=n.author_image;return m&&m.startsWith("http"),t.$set=function(t){"post"in t&&a("post",n=t.post),"username"in t&&a("username",c=t.username),"metadata"in t&&a("metadata",u=t.metadata)},{post:n,page:r,username:c,metadata:u,mdtext:p,post_image_link:d}}var G=function(c){function l(t){var i;return s(this,l),i=a(this,e(l).call(this)),n(r(i),t,S,R,o,["post","username","metadata"]),i}return t(l,i),l}();function L(t){var s,a,e,n;document.title=s=t.post.title;var o=new G({props:{post:t.post,metadata:t.metadata}});return{c:function(){a=c("link"),e=E(),o.$$.fragment.c(),this.h()},l:function(t){a=l(t,"LINK",{rel:!0,href:!0},!1),u(a).forEach(f),e=I(t),o.$$.fragment.l(t),this.h()},h:function(){p(a,"rel","stylesheet"),p(a,"href","//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.8/build/styles/default.min.css")},m:function(t,s){b(document.head,a),h(t,e,s),d(o,t,s),n=!0},p:function(t,a){n&&!t.post||s===(s=a.post.title)||(document.title=s);var e={};t.post&&(e.post=a.post),t.metadata&&(e.metadata=a.metadata),o.$set(e)},i:function(t){n||(m(o.$$.fragment,t),n=!0)},o:function(t){g(o.$$.fragment,t),n=!1},d:function(t){f(a),t&&f(e),v(o,t)}}}function O(t){return C.apply(this,arguments)}function C(){return(C=V(T.mark(function t(s){var a,e,n,o,r;return T.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=s.params,s.query,t.next=3,this.fetch("".concat(a.theuser,"/metadata.json"));case 3:return e=t.sent,t.next=6,e.json();case 6:return n=t.sent,t.next=9,this.fetch("".concat(a.theuser,"/posts/").concat(a.slug,".json"));case 9:return o=t.sent,t.next=12,o.json();case 12:if(r=t.sent,200!==o.status){t.next=17;break}return t.abrupt("return",{post:r,metadata:n});case 17:this.error(o.status,r.message);case 18:case"end":return t.stop()}},t,this)}))).apply(this,arguments)}function M(t,s,a){var e,n=s.post,o=s.metadata,r=y(),i=(r.preloading,r.page);r.session;j(t,i,function(t){a("$page",e=t)});var c=s.username,l=void 0===c?e.params.theuser:c;return t.$set=function(t){"post"in t&&a("post",n=t.post),"metadata"in t&&a("metadata",o=t.metadata),"username"in t&&a("username",l=t.username)},{post:n,metadata:o,page:i,username:l}}export default(function(c){function l(t){var i;return s(this,l),i=a(this,e(l).call(this)),n(r(i),t,M,L,o,["post","metadata","username"]),i}return t(l,i),l}());export{O as preload};
