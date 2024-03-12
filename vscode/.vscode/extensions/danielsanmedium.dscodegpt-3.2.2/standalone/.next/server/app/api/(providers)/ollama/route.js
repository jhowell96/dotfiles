"use strict";(()=>{var e={};e.id=3295,e.ids=[3295],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},85477:e=>{e.exports=require("punycode")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},86683:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>v,originalPathname:()=>P,patchFetch:()=>T,requestAsyncStorage:()=>q,routeModule:()=>f,serverHooks:()=>w,staticGenerationAsyncStorage:()=>y,staticGenerationBailout:()=>j});var a={};r.r(a),r.d(a,{HEAD:()=>x,POST:()=>h});var s=r(95419),o=r(69108),n=r(99678),i=r(6733),u=r(8624),l=r(16904),p=r(26836),c=r(6037),d=r(24041),m=r(66285);async function g(e){let t=e.body?.getReader();if(!t)throw Error("No reader available");return new ReadableStream({async start(e){let r=new TextDecoder;for(;;){let{done:a,value:s}=await t.read();if(a){e.close();return}for(let t of r.decode(s).split("\n"))try{if(!t)continue;let r=JSON.parse(t.trim()),a=r?.message?.content;a&&e.enqueue(a)}catch{}}},cancel(){t.releaseLock()}})}async function x(){return Response.json("",{status:200})}async function h(e){if(i.Xd?.config?.apiKey?.toLowerCase()!=="ollama")return Response.json("You are not using Ollama as your provider.",{status:400});let{messages:t}=await e.json();t=(0,d.D)({messages:t});let r=e.headers.get("model"),a=e.headers.get("promptType"),s=await c.Z.getLanguage(),o=await c.Z.getIdeLanguage();if(a){let e=(0,l.u)({promptType:t[t.length-1].content,cleanPromptText:await c.Z.getSelectedText(),language:o});e&&(t[t.length-1].content=e)}t.unshift({role:"assistant",content:"I am a helpful programming expert assistant. If you ask me a question that is rooted in truth. Follow the user's instructions with precision and attention to detail. Provide the code in a single block. Minimize any additional text."});let n=await c.Z.getSelectedText();n&&(t[t.length-1].content+="\n```"+s+"\n"+n+"\n```");try{let e={model:r||"mistral",messages:t},o=await fetch("http://localhost:11434/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});(0,u.q)({promptType:a?t[t.length-1].content+"CodeGPT":"Chat",provider:"Ollama",model:r??"mistral",statusCode:o.status});let i=await g(o),l=t.slice(0,-1).some(e=>e.content.includes(n));if(n&&(a||!l)){let e=await (0,p.V)(["```"+s+"\n"+n+"\n```"],i);return new m.wn(e)}return new m.wn(i)}catch(e){if(e.message.includes("fetch failed"))return Response.json({message:"Ollama is not running.",status:500},{status:500});return Response.json({message:e.message,status:e.status??500},{status:e.status??500})}}let f=new s.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/(providers)/ollama/route",pathname:"/api/ollama",filename:"route",bundlePath:"app/api/(providers)/ollama/route"},resolvedPagePath:"/Users/danipower/Proyectos/Node/vscode-blog/codegpt-nextjs/app/api/(providers)/ollama/route.ts",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:q,staticGenerationAsyncStorage:y,serverHooks:w,headerHooks:v,staticGenerationBailout:j}=f,P="/api/(providers)/ollama/route";function T(){return(0,n.patchFetch)({serverHooks:w,staticGenerationAsyncStorage:y})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[1638,9667,889,6285,9751],()=>r(86683));module.exports=a})();