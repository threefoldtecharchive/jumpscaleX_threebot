import{a,b as n,d as t,e as s,i,s as e,f as o,S as r,g as c,C as f,j as u,k as d,D as h,m as g,p as l,E as p,w as m,z as v,x as $,F as _,J as j,K as C}from"./client.e8ef47cc.js";import{H as w,g as x}from"./HighlightedCode.ca138077.js";function D(a){var n,t,s=new w({props:{highlightedCode:a[0]}});return{c:function(){n=c("div"),f(s.$$.fragment)},l:function(a){n=u(a,"DIV",{});var t=d(n);h(s.$$.fragment,t),t.forEach(g)},m:function(a,i){l(a,n,i),p(s,n,null),t=!0},p:function(a,n){var t={};1&m(n,1)[0]&&(t.highlightedCode=a[0]),s.$set(t)},i:function(a){t||(v(s.$$.fragment,a),t=!0)},o:function(a){$(s.$$.fragment,a),t=!1},d:function(a){a&&g(n),_(s)}}}function E(a,n,t){var s,i=j(),e=(i.preloading,i.page);i.session;C(a,e,function(a){return t(3,s=a)});var o,r=n.paste_id,c=void 0===r?s.params.paste_id:r;return function(a){x(a).then(function(a){var n,s=a.data.code;n=s,t(0,o=hljs.highlightAuto(n).value)}).catch(function(a){console.log(a)})}(c),a.$set=function(a){"paste_id"in a&&t(2,c=a.paste_id)},[o,e,c]}export default(function(c){function f(a){var r;return n(this,f),r=t(this,s(f).call(this)),i(o(r),a,E,D,e,{paste_id:2}),r}return a(f,r),f}());
