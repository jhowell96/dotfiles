"use strict";(()=>{var e={};e.id=8629,e.ids=[8629],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},85477:e=>{e.exports=require("punycode")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},58576:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>w,originalPathname:()=>P,patchFetch:()=>j,requestAsyncStorage:()=>y,routeModule:()=>x,serverHooks:()=>f,staticGenerationAsyncStorage:()=>q,staticGenerationBailout:()=>v});var o={};r.r(o),r.d(o,{HEAD:()=>g,POST:()=>m});var s=r(95419),n=r(69108),a=r(99678),i=r(6733),p=r(8624),u=r(16904),l=r(26836),c=r(6037),d=r(24041),h=r(66285);async function g(){return Response.json("",{status:i.Xd?.apiKey?200:401})}async function m(e){if(i.Xd?.config?.apiKey?.toLowerCase()!=="cohere")return Response.json("You are not using Cohere as your provider.",{status:400});let{messages:t}=await e.json();t=(0,d.D)({messages:t});let r=e.headers.get("model"),o=e.headers.get("promptType"),s=await c.Z.getLanguage(),n=await c.Z.getIdeLanguage();if(o){let e=(0,u.u)({promptType:t[t.length-1].content,cleanPromptText:await c.Z.getSelectedText(),language:n});e&&(t[t.length-1].content=e)}t.unshift({role:"system",content:"I am a helpful programming expert assistant. If you ask me a question that is rooted in truth. Follow the user's instructions with precision and attention to detail. Provide the code in a single block. Minimize any additional text."});let a=await c.Z.getSelectedText();a&&(t[t.length-1].content+="\n```"+s+"\n"+a+"\n```");let g=t.slice(0,t.length-1),m=[];for(let e=0;e<g.length;e++){let t={role:"user"===g[e].role?"User":"Chatbot",message:g[e].content};m.push(t)}let x=i.Xd?.globalState?.config,y=JSON.stringify({model:r||"command",message:t[t.length-1].content,preamble_override:"",prompt_truncation:"auto",temperature:x?.temperature||.7,stream:!0,chat_history:m,return_prompt:!0});try{if(!i.Xd.apiKey){let e=Error("You need to set your API key first.");throw e.status=401,e}let e=await fetch("https://api.cohere.ai/v1/chat",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i.Xd.apiKey}`},body:y});if((0,p.q)({promptType:o?t[t.length-1].content+"CodeGPT":"Chat",provider:"Cohere",model:r??"command",statusCode:200}),!e.ok){let t=await e.text(),r=Error(t);throw r.status=e.status,r}let n=(0,h.Ks)(e),u=t.slice(0,-1).some(e=>e.content.includes(a));if(a&&(o||!u)){let e=await (0,l.V)(["```"+s+"\n"+a+"\n```"],n);return new h.wn(e)}return new h.wn(n)}catch(e){return Response.json({message:e.message,status:e.status??500},{status:e.status??500})}}let x=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/(providers)/cohere/route",pathname:"/api/cohere",filename:"route",bundlePath:"app/api/(providers)/cohere/route"},resolvedPagePath:"/Users/danipower/Proyectos/Node/vscode-blog/codegpt-nextjs/app/api/(providers)/cohere/route.ts",nextConfigOutput:"standalone",userland:o}),{requestAsyncStorage:y,staticGenerationAsyncStorage:q,serverHooks:f,headerHooks:w,staticGenerationBailout:v}=x,P="/api/(providers)/cohere/route";function j(){return(0,a.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:q})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[1638,9667,889,6285,9751],()=>r(58576));module.exports=o})();