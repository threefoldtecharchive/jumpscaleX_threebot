import{S as a,i as s,s as e,l as c,e as t,t as n,m as o,c as r,a as g,b as i,d as p,h,j as k,n as l,E as d}from"./index.b0cd38b9.js";function u(a){var s,e,d,u,m;return{c(){s=c(),e=t("h2"),d=n("3Bot Package Manager"),u=t("br"),m=t("br"),this.h()},l(a){s=o(a),e=r(a,"H2",{},!1);var c=g(e);d=i(c,"3Bot Package Manager"),c.forEach(p),u=r(a,"BR",{},!1),g(u).forEach(p),m=r(a,"BR",{},!1),g(m).forEach(p),this.h()},h(){document.title="3bot Package Manager"},m(a,c){h(a,s,c),h(a,e,c),k(e,d),h(a,u,c),h(a,m,c)},p:l,i:l,o:l,d(a){a&&(p(s),p(e),p(u),p(m))}}}function m(a,s,e){let{packages:c=[]}=s;return d(async()=>{localGedisClient.executeCommand("package_manager","packages_list").then(a=>{console.log("packages",a.json())})}),a.$set=(a=>{"packages"in a&&e("packages",c=a.packages)}),{packages:c}}export default class extends a{constructor(a){super(),s(this,a,m,u,e,["packages"])}}
