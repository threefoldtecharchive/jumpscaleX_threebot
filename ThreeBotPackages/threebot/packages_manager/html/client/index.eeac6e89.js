import{S as a,i as s,s as e,l as c,e as t,t as n,m as o,c as r,a as g,b as i,d as h,h as l,j as p,n as k,E as d}from"./index.b0cd38b9.js";function u(a){var s,e,d,u,m;return{c(){s=c(),e=t("h2"),d=n("3Bot Package Manager"),u=t("br"),m=t("br"),this.h()},l(a){s=o(a),e=r(a,"H2",{},!1);var c=g(e);d=i(c,"3Bot Package Manager"),c.forEach(h),u=r(a,"BR",{},!1),g(u).forEach(h),m=r(a,"BR",{},!1),g(m).forEach(h),this.h()},h(){document.title="3bot Package Manager"},m(a,c){l(a,s,c),l(a,e,c),p(e,d),l(a,u,c),l(a,m,c)},p:k,i:k,o:k,d(a){a&&(h(s),h(e),h(u),h(m))}}}function m(a,s,e){let{packages:c=[]}=s;return d(async()=>{localGedisClient.executeCommand("package_manager","packages_list").then(a=>{console.log(a.json())})}),a.$set=(a=>{"packages"in a&&e("packages",c=a.packages)}),{packages:c}}export default class extends a{constructor(a){super(),s(this,a,m,u,e,["packages"])}}
