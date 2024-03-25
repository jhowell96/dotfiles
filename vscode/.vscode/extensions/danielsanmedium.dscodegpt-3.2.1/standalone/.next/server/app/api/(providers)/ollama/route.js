"use strict";(()=>{var e={};e.id=3295,e.ids=[3295],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},86683:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>v,originalPathname:()=>T,patchFetch:()=>b,requestAsyncStorage:()=>w,routeModule:()=>x,serverHooks:()=>q,staticGenerationAsyncStorage:()=>y,staticGenerationBailout:()=>P});var r={};a.r(r),a.d(r,{HEAD:()=>h,POST:()=>f});var o=a(95419),s=a(69108),n=a(99678),i=a(6733),l=a(8624),u=a(16904),p=a(26836),d=a(6037),c=a(24041),m=a(66285);async function g(e){let t=e.body?.getReader();if(!t)throw Error("No reader available");return new ReadableStream({async start(e){let a=new TextDecoder;for(;;){let{done:r,value:o}=await t.read();if(r){e.close();return}for(let t of a.decode(o).split("\n"))try{if(!t)continue;let a=JSON.parse(t.trim()),r=a?.message?.content;r&&e.enqueue(r)}catch{}}},cancel(){t.releaseLock()}})}async function h(){return Response.json("",{status:200})}async function f(e){if(i.Xd?.config?.apiKey?.toLowerCase()!=="ollama")return Response.json("You are not using Ollama as your provider.",{status:400});let{messages:t}=await e.json();t=(0,c.D)({messages:t});let a=e.headers.get("model"),r=e.headers.get("promptType"),o=await d.Z.getLanguage(),s=await d.Z.getIdeLanguage();if(r){let e=(0,u.u)({promptType:t[t.length-1].content,cleanPromptText:await d.Z.getSelectedText(),language:s});e&&(t[t.length-1].content=e)}t.unshift({role:"assistant",content:"I am a helpful programming expert assistant. If you ask me a question that is rooted in truth. Follow the user's instructions with precision and attention to detail. Provide the code in a single block. Minimize any additional text."});let n=await d.Z.getSelectedText();n&&(t[t.length-1].content+="\n```"+o+"\n"+n+"\n```");try{let e={model:a||"mistral",messages:t},s=await fetch("http://localhost:11434/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});(0,l.q)({promptType:r?t[t.length-1].content+"CodeGPT":"Chat",isAnonymous:!0,provider:"Ollama",model:a??"mistral",statusCode:s.status});let i=await g(s),u=t.slice(0,-1).some(e=>e.content.includes(n));if(n&&(r||!u)){let e=await (0,p.V)(["```"+o+"\n"+n+"\n```"],i);return new m.wn(e)}return new m.wn(i)}catch(e){if(e.message.includes("fetch failed"))return Response.json({message:"Ollama is not running.",status:500},{status:500});return Response.json({message:e.message,status:e.status??500},{status:e.status??500})}}let x=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/(providers)/ollama/route",pathname:"/api/ollama",filename:"route",bundlePath:"app/api/(providers)/ollama/route"},resolvedPagePath:"/Users/danipower/Proyectos/Node/vscode-blog/codegpt-nextjs/app/api/(providers)/ollama/route.ts",nextConfigOutput:"standalone",userland:r}),{requestAsyncStorage:w,staticGenerationAsyncStorage:y,serverHooks:q,headerHooks:v,staticGenerationBailout:P}=x,T="/api/(providers)/ollama/route";function b(){return(0,n.patchFetch)({serverHooks:q,staticGenerationAsyncStorage:y})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[1638,3567,3792,9751],()=>a(86683));module.exports=r})();