"use strict";(()=>{var e={};e.id=6106,e.ids=[6106],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},20140:(e,o,r)=>{r.r(o),r.d(o,{headerHooks:()=>h,originalPathname:()=>v,patchFetch:()=>f,requestAsyncStorage:()=>c,routeModule:()=>u,serverHooks:()=>l,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>g});var t={};r.r(t),r.d(t,{GET:()=>p});var s=r(95419),a=r(69108),n=r(99678),i=r(6733);async function p(){if(i.Xd?.config?.apiKey?.toLowerCase()!=="cohere")return Response.json("You are not using Cohere as your provider.",{status:400});let e=i.Xd?.globalState?.config;return Response.json(e,{status:200})}let u=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/(providers)/cohere/config/route",pathname:"/api/cohere/config",filename:"route",bundlePath:"app/api/(providers)/cohere/config/route"},resolvedPagePath:"/Users/danipower/Proyectos/Node/vscode-blog/codegpt-nextjs/app/api/(providers)/cohere/config/route.ts",nextConfigOutput:"standalone",userland:t}),{requestAsyncStorage:c,staticGenerationAsyncStorage:d,serverHooks:l,headerHooks:h,staticGenerationBailout:g}=u,v="/api/(providers)/cohere/config/route";function f(){return(0,n.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:d})}},6733:(e,o,r)=>{r.d(o,{Xd:()=>s,ed:()=>a,vx:()=>t});let t=`http://localhost:${parseInt(process.env.PORT)+1}`,s={},a=e=>{s=e}},95419:(e,o,r)=>{e.exports=r(30517)}};var o=require("../../../../../webpack-runtime.js");o.C(e);var r=e=>o(o.s=e),t=o.X(0,[1638],()=>r(20140));module.exports=t})();