import{a as i,b as a,c as t,d as e,i as n,e as s,S as o,s as d,f as h,h as r,j as f,l as c,q as g,v as u,y as l,z as p,A as m,N as v}from"./index.cb477d3d.js";import{a as $}from"./app.08636f3d.js";import"./_commonjsHelpers.24e35f0d.js";import{H as C,g as _}from"./HighlightedCode.fc07047e.js";function j(i){var a,t,e=new C({props:{highlightedCode:i.highlightedCode}});return{c:function(){a=h("div"),e.$$.fragment.c()},l:function(i){a=r(i,"DIV",{},!1);var t=f(a);e.$$.fragment.l(t),t.forEach(c)},m:function(i,n){g(i,a,n),u(e,a,null),t=!0},p:function(i,a){var t={};i.highlightedCode&&(t.highlightedCode=a.highlightedCode),e.$set(t)},i:function(i){t||(l(e.$$.fragment,i),t=!0)},o:function(i){p(e.$$.fragment,i),t=!1},d:function(i){i&&c(a),m(e)}}}function H(i,a,t){var e,n=$(),s=(n.preloading,n.page);n.session;v(i,s,function(i){t("$page",e=i)});var o,d=a.paste_id,h=void 0===d?e.params.paste_id:d;return function(i){_(i).then(function(i){var a,e=i.data.code;a=e,t("highlightedCode",o=hljs.highlightAuto(a).value)}).catch(function(i){console.log(i)})}(h),i.$set=function(i){"paste_id"in i&&t("paste_id",h=i.paste_id)},{page:s,paste_id:h,highlightedCode:o}}export default(function(h){function r(i){var o;return a(this,r),o=t(this,e(r).call(this)),n(s(o),i,H,j,d,["paste_id"]),o}return i(r,o),r}());
