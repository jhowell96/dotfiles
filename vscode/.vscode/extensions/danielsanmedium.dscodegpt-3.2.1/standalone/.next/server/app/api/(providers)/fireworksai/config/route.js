"use strict";(()=>{var e={};e.id=9304,e.ids=[9304],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},89148:(e,r,o)=>{o.r(r),o.d(r,{headerHooks:()=>f,originalPathname:()=>v,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>l,staticGenerationAsyncStorage:()=>c,staticGenerationBailout:()=>g});var t={};o.r(t),o.d(t,{GET:()=>p});var i=o(95419),s=o(69108),a=o(99678),n=o(6733);async function p(){if(n.Xd?.config?.apiKey?.toLowerCase()!=="fireworks ai")return Response.json("You are not using Fireworks AI as your provider.",{status:400});let e=n.Xd?.globalState?.config;return Response.json(e,{status:200})}let u=new i.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/(providers)/fireworksai/config/route",pathname:"/api/fireworksai/config",filename:"route",bundlePath:"app/api/(providers)/fireworksai/config/route"},resolvedPagePath:"/Users/danipower/Proyectos/Node/vscode-blog/codegpt-nextjs/app/api/(providers)/fireworksai/config/route.ts",nextConfigOutput:"standalone",userland:t}),{requestAsyncStorage:d,staticGenerationAsyncStorage:c,serverHooks:l,headerHooks:f,staticGenerationBailout:g}=u,v="/api/(providers)/fireworksai/config/route";function h(){return(0,a.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:c})}},6733:(e,r,o)=>{o.d(r,{Xd:()=>i,ed:()=>s,vx:()=>t});let t=`http://localhost:${parseInt(process.env.PORT)+1}`,i={},s=e=>{i=e}},95419:(e,r,o)=>{e.exports=o(30517)}};var r=require("../../../../../webpack-runtime.js");r.C(e);var o=e=>r(r.s=e),t=r.X(0,[1638],()=>o(89148));module.exports=t})();