"use strict";(()=>{var e={};e.id=6683,e.ids=[6683],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},20469:(e,t,o)=>{o.r(t),o.d(t,{headerHooks:()=>k,originalPathname:()=>I,patchFetch:()=>T,requestAsyncStorage:()=>v,routeModule:()=>x,serverHooks:()=>A,staticGenerationAsyncStorage:()=>P,staticGenerationBailout:()=>q});var a={};o.r(a),o.d(a,{HEAD:()=>h,POST:()=>y});var r=o(95419),s=o(69108),n=o(99678),i=o(6733),l=o(8624),u=o(16904),d=o(26836),p=o(6037),g=o(24041),c=o(66285),m=o(57751);async function h(){return Response.json("",{status:i.Xd?.apiKey?200:401})}async function y(e){if(i.Xd?.config?.apiKey?.toLowerCase()!=="google ai studio")return Response.json("You are not using Google AI Studio as your provider.",{status:400});let{messages:t}=await e.json();t=(0,g.D)({messages:t});let o=e.headers.get("model"),a=e.headers.get("promptType"),r=await p.Z.getLanguage(),s=await p.Z.getIdeLanguage();if(a){let e=(0,u.u)({promptType:t[t.length-1].content,cleanPromptText:await p.Z.getSelectedText(),language:s});e&&(t[t.length-1].content=e)}let n=o.includes("bison");n&&t.unshift({role:"system",content:"I am a helpful programming expert assistant. If you ask me a question that is rooted in truth, I will give you the answer in markdown. Follow the user's instructions with precision and attention to detail. Provide the code in a single block. Minimize any additional text."});let l=await p.Z.getSelectedText();l&&(t[t.length-1].content+="\n```"+r+"\n"+l+"\n```");try{let e=n?await f({messages:t,selectedCode:l,language:r,model:o,promptType:a}):await w({messages:t,selectedCode:l,language:r,model:o,promptType:a});return new c.wn(e)}catch(e){return Response.json({message:e.message,status:e.status??500},{status:e.status??500})}}let f=async({messages:e,selectedCode:t,language:o,model:a,promptType:r})=>{let s={prompt:{context:"I am a helpful programming expert assistant. If you ask me a question that is rooted in truth, I will give you the answer in markdown",examples:[{input:{content:"What is an API?"},output:{content:"An API is a set of rules for interacting with software or a service."}}],messages:e.map(e=>({content:e.content}))},candidate_count:1};if(!i.Xd.apiKey){let e=Error("You need to set your Google details first.");throw e.status=401,e}let n=await fetch(`https://generativelanguage.googleapis.com/v1beta3/models/${a??"gemini-pro"}:generateMessage?key=${i.Xd?.apiKey}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){let e=await n.text();if(e.includes("API key not valid. Please pass a valid API key"))throw Error("Your API key is not valid. Please pass a valid API key");throw Error(e)}(0,l.q)({promptType:r,isAnonymous:!0,provider:"googleAIStudio",model:a??"gemini-pro",statusCode:n.status});let u=await n.json();if(t){let e="```"+o+"\n"+t+"\n```"+u?.candidates?.[0].content;return await (0,d.Y)(e)}return await (0,d.Y)(u?.candidates?.[0].content)},w=async({messages:e,selectedCode:t,language:o,model:a,promptType:r})=>{"user"!==e[0].role&&(e=e.slice(1));let s=i.Xd?.globalState?.config,n={contents:e.map(e=>({role:e.role.replace("system","model").replace("assistant","model").toUpperCase(),parts:{text:e.content}})),safety_settings:{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},generation_config:{temperature:s?.temperature||.7,maxOutputTokens:s?.maxTokens||500,candidateCount:1}};if(!i.Xd.apiKey){let e=Error("You need to set your Google details first.");throw e.status=401,e}let u=`https://generativelanguage.googleapis.com/v1beta/models/${a}:streamGenerateContent?key=${i.Xd?.apiKey}`,p=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if((0,l.q)({promptType:r?e[e.length-1].content+"CodeGPT":"Chat",isAnonymous:!0,provider:"googleAIStudio",model:a,statusCode:p.status}),!p.ok){let e=await p.text();if(e.includes("API key not valid. Please pass a valid API key"))throw Error("Your API key is not valid. Please pass a valid API key");throw Error(e)}let g=await (0,m.O)(p),c=e.slice(0,-1).some(e=>e.content.includes(t));return t&&(r||!c)?await (0,d.V)(["```"+o+"\n"+t+"\n```"],g):g},x=new r.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/(providers)/(google)/googleaistudio/route",pathname:"/api/googleaistudio",filename:"route",bundlePath:"app/api/(providers)/(google)/googleaistudio/route"},resolvedPagePath:"/Users/danipower/Proyectos/Node/vscode-blog/codegpt-nextjs/app/api/(providers)/(google)/googleaistudio/route.ts",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:v,staticGenerationAsyncStorage:P,serverHooks:A,headerHooks:k,staticGenerationBailout:q}=x,I="/api/(providers)/(google)/googleaistudio/route";function T(){return(0,n.patchFetch)({serverHooks:A,staticGenerationAsyncStorage:P})}},57751:(e,t,o)=>{o.d(t,{O:()=>a});async function a(e){let t=e.body?.getReader();if(!t)throw Error("No reader available");return new ReadableStream({async start(e){let o=new TextDecoder("utf-8"),a="";for(;;){let{done:s,value:n}=await t.read();if(s){r(),e.close();return}let i=o.decode(n);a+=i,r()}function r(){let t;let o=/"text":\s*"((\\"|[^"])*)"/g;for(;null!==(t=o.exec(a));){let o=function(e){try{return JSON.parse(`"${e}"`)}catch(t){return console.error("Error unescaping string",e),e}}(t[1]);e.enqueue(o),a=a.slice(t.index+t[0].length)}}},cancel(){t.releaseLock()}})}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),a=t.X(0,[1638,3567,3792,9751],()=>o(20469));module.exports=a})();