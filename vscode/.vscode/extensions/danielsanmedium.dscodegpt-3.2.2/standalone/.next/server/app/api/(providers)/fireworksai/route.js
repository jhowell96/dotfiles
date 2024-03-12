"use strict";(()=>{var e={};e.id=339,e.ids=[339],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},87561:e=>{e.exports=require("node:fs")},84492:e=>{e.exports=require("node:stream")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},85477:e=>{e.exports=require("punycode")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},71267:e=>{e.exports=require("worker_threads")},59796:e=>{e.exports=require("zlib")},24989:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>k,originalPathname:()=>P,patchFetch:()=>T,requestAsyncStorage:()=>f,routeModule:()=>w,serverHooks:()=>y,staticGenerationAsyncStorage:()=>q,staticGenerationBailout:()=>v});var s={};r.r(s),r.d(s,{HEAD:()=>g,POST:()=>h});var o=r(95419),a=r(69108),n=r(99678),i=r(6733),u=r(8624),p=r(16904),l=r(26836),d=r(6037),c=r(24041),m=r(66285),x=r(72314);async function g(){return Response.json("",{status:i.Xd?.apiKey?200:401})}async function h(e){if(i.Xd?.config?.apiKey?.toLowerCase()!=="fireworks ai")return Response.json("You are not using Fireworks AI as your provider.",{status:400});let{messages:t}=await e.json();t=(0,c.D)({messages:t});let r=e.headers.get("model"),s=e.headers.get("promptType"),o=await d.Z.getLanguage(),a=await d.Z.getIdeLanguage();if(s){let e=(0,p.u)({promptType:t[t.length-1].content,cleanPromptText:await d.Z.getSelectedText(),language:a});e&&(t[t.length-1].content=e)}t.unshift({role:"system",content:"I am a helpful programming expert assistant. If you ask me a question that is rooted in truth. Follow the user's instructions with precision and attention to detail. Provide the code in a single block. Minimize any additional text."});let n=await d.Z.getSelectedText();n&&(t[t.length-1].content+="\n```"+o+"\n"+n+"\n```");try{let e;let a=new x.ZP({apiKey:i.Xd?.apiKey||"",baseURL:"https://api.fireworks.ai/inference/v1"});if(!i.Xd.apiKey){let e=Error("You need to set your Azure details first.");throw e.status=401,e}let p=i.Xd?.globalState?.config;r?.includes("chat")?e=await a.chat.completions.create({model:`accounts/fireworks/models/${r}`,stream:!0,messages:t,max_tokens:p?.maxTokens||500,temperature:p?.temperature||.7}):(r??="mixtral-8x7b",e=await a.completions.create({model:`accounts/fireworks/models/${r}`,stream:!0,prompt:t.map(e=>`${["system","assistant"].includes(e.role)?"AI":"Human"}: ${e.content}`).join("\n")+"\nAI:",temperature:p?.temperature||.7,max_tokens:p?.maxTokens||500,stop:["\nHuman:","\nAI:"]})),(0,u.q)({promptType:s?t[t.length-1].content+"CodeGPT":"Chat",provider:"Fireworks",model:r??"mixtral-8x7b",statusCode:200});let d=(0,m.HP)(e),c=t.slice(0,-1).some(e=>e.content.includes(n));if(n&&(s||!c)){let e=await (0,l.V)(["```"+o+"\n"+n+"\n```"],d);return new m.wn(e)}return new m.wn(d)}catch(e){if((0,u.q)({promptType:s?t[t.length-1].content+"CodeGPT":"Chat",provider:"Fireworks",model:r??"mixtral-8x7b",statusCode:e.status??500}),e.message.includes("Invalid URL"))return Response.json({message:"Invalid URL",status:401},{status:400});return Response.json({message:e.message,status:e.status??500},{status:e.status??500})}}let w=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/(providers)/fireworksai/route",pathname:"/api/fireworksai",filename:"route",bundlePath:"app/api/(providers)/fireworksai/route"},resolvedPagePath:"/Users/danipower/Proyectos/Node/vscode-blog/codegpt-nextjs/app/api/(providers)/fireworksai/route.ts",nextConfigOutput:"standalone",userland:s}),{requestAsyncStorage:f,staticGenerationAsyncStorage:q,serverHooks:y,headerHooks:k,staticGenerationBailout:v}=w,P="/api/(providers)/fireworksai/route";function T(){return(0,n.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:q})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[1638,9667,889,6285,319,5448,2314,9751],()=>r(24989));module.exports=s})();