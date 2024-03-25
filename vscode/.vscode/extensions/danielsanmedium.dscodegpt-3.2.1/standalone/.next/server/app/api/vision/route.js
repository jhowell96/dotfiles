"use strict";(()=>{var e={};e.id=2588,e.ids=[2588],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},85477:e=>{e.exports=require("punycode")},12781:e=>{e.exports=require("stream")},24404:e=>{e.exports=require("tls")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},44827:(e,t,o)=>{o.r(t),o.d(t,{headerHooks:()=>x,originalPathname:()=>b,patchFetch:()=>k,requestAsyncStorage:()=>y,routeModule:()=>g,serverHooks:()=>f,staticGenerationAsyncStorage:()=>w,staticGenerationBailout:()=>v});var s={};o.r(s),o.d(s,{POST:()=>m});var a=o(95419),n=o(69108),r=o(99678);let i=`You are an expert web developer who specializes in building working website prototypes. Your job is to accept low-fidelity wireframes and instructions, then turn them into interactive and **responsive** working prototypes. When sent new designs, you should reply with your best attempt at a high fidelity working prototype as a SINGLE static React JSX file, which export a default component as the UI implementation.
When using static JSX, the React component does not accept any props and everything is hard-coded inside the component.
DON'T assume that the component can get any data from outside, all required data should be included in your generated code.
Rather than defining data as separate variables, we prefer to inline it directly in the JSX code.

- There are no libraries or frameworks to use, just vanilla React. You have to use React 18 with functional components. You can use any version of React 18, but we recommend using the latest version.
- You don't need to import components or libraries, just write the code.
- Always respond as the following format: "() => { return <div>...</div> }" without the export default keyword.
- useState and useRef are available. You can use them directly without importing them. e.g. "() => { const [state, setState] = useState(); return <div>...</div> } }"
- Do not use svg or images.

When creating JSX code, refer to the usage method in the following sample code without omitting any code.
Your code is not just a simple example, it should be as complete as possible so that users can use it directly. Therefore, incomplete content such as \`// TODO\`, \`// implement it by yourself\`, etc. should not appear.
You can refer to the layout example to beautify the UI layout you generate.
Since the code is COMPLETELY STATIC(do not accept any props), there is no need to think too much about scalability and flexibility. It is more important to make its UI results rich and complete.
Also there is no need to consider the length or complexity of the generated code.

Use semantic HTML elements and aria attributes to ensure the accessibility of results, and more. Also need to use Tailwind to adjust spacing, margins and padding between elements, especially when using elements like \`main\` or \`div\`. Also need to make sure to rely on default styles as much as possible and avoid adding color to components without explicitly telling them to do so.
No need to import tailwind.css.

Your prototype should look and feel much more complete and advanced than the wireframes provided. Flesh it out, make it real! Try your best to figure out what the designer wants and make it happen. If there are any questions or underspecified features, use what you know about applications, user experience, and website design patterns to "fill in the blanks". If you're unsure of how the designs should work, take a guess—it's better for you to get it wrong than to leave things incomplete.

Remember: you love your designers and want them to be happy. The more complete and impressive your prototype, the happier they will be. Good luck, you've got this!

- use borders, shadows, dividers, rounded corners, good spacing, alignment, and other design elements to make your prototype look polished and professional.
- It have to send an header with the introduction of the example, the code and the explanation of the example.

Example: 

    Heres a simple counter in React:
    
    \`\`\`jsx
    () => {
      const [count, setCount] = useState(0);
    
      return (
        <div className="flex justify-center items-center h-full w-full">
          <div className="text-center p-10 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-5">You clicked {count} times</h1>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              onClick={() => setCount(count + 1)}
            >
              Click me
            </button>
          </div>
        </div>
      );
    }
    \`\`\`
    
    This example uses the useState hook in React to manage state in a functional component. The useState hook returns a pair: the current state value and a function that lets you update it.
    
    The Counter component has a count state variable, which is initially set to 0. When you click the button, the onClick event handler calls the setCount function, incrementing the count by one.



Create JSX code when you get the detailed instructions.
`;var u=o(6733),c=o(8624),d=o(6037),l=o(66285),p=o(18766);async function h(e){let t=e.body?.getReader();if(!t)throw Error("No reader available");return new ReadableStream({async start(e){for(;;){let{done:o,value:s}=await t.read();if(o){e.close();return}s&&e.enqueue(s)}},cancel(){t.releaseLock()}})}async function m(e){let t;if(u.Xd?.config?.apiKey?.toLowerCase()!=="codegpt plus beta")return Response.json("You are not using CodeGPT Plus as your provider.",{status:400});let{prompt:o}=await e.json(),{prompt:s,image:a,code:n}=JSON.parse(o),r=a?"gpt-4-vision":"gpt-4",m=await d.Z.getIdeLanguage();console.log({prompt:s,code:n,image:a}),t=a?[{role:"user",content:[{type:"image_url",image_url:{url:a,detail:"high"}}]}]:[{role:"user",content:[{type:"text",text:s}]}],n&&t.unshift({role:"system",content:[{type:"text",text:"This is the code you have to work on: \n"+n}]}),t.unshift({role:"system",content:[{type:"text",text:i+"\nwrite the code in English and explain it in "+m}]});let g=u.Xd?.globalState?.config,y=JSON.stringify({model:r?.toLowerCase(),messages:t,max_tokens:3e3,temperature:g?.temperature||.7});try{let e=u.Xd.secrets?.["CodeGPT Plus Beta_orgId"],t=await (0,p.Z)();if(!t&&!u.Xd.apiKey){let e=Error("You need to connect to CodeGPT Plus first.");throw e.status=401,e}let o=await fetch("https://api-beta.codegpt.co/api/v1/chat/completion",{method:"POST",headers:{Authorization:`Bearer ${t||u.Xd.apiKey||""}`,"Content-Type":"application/json",...e?{"CodeGPT-Org-Id":e}:{}},body:y});(0,c.q)({promptType:"ReactSandbox",isAnonymous:!0,provider:"CodeGPT Plus Beta",model:r,statusCode:o.status});let s=await h(o);return new l.wn(s)}catch(e){return(0,c.q)({promptType:"ReactSandbox",isAnonymous:!0,provider:"CodeGPT Plus Beta",model:r,statusCode:e.status}),Response.json({message:e.message,status:e.status??500},{status:e.status??500})}}let g=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/vision/route",pathname:"/api/vision",filename:"route",bundlePath:"app/api/vision/route"},resolvedPagePath:"/Users/danipower/Proyectos/Node/vscode-blog/codegpt-nextjs/app/api/vision/route.ts",nextConfigOutput:"standalone",userland:s}),{requestAsyncStorage:y,staticGenerationAsyncStorage:w,serverHooks:f,headerHooks:x,staticGenerationBailout:v}=g,b="/api/vision/route";function k(){return(0,r.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:w})}},18766:(e,t,o)=>{o.d(t,{Z:()=>i});var s=o(6733),a=o(1362),n=o(11184),r=o(7439);async function i(){let e=s.Xd?.secrets?.vicunaSession,t=e?JSON.parse(e):void 0,o=t?.accessToken;if(o&&parseInt(t.expiresAt+"000")<Date.now()){let e=(0,a.R)((0,r.cookies)()),{data:s,error:i}=await e.auth.refreshSession({refresh_token:t.refreshToken});i?(console.log("vicu\xf1a refreshSession error: ",i.message),(i.message.includes("Refresh Token Not Found")||i.message.includes("Already Used"))&&await (0,n.j)({accessToken:"",refreshToken:"",expiresAt:""})):(await (0,n.j)({accessToken:s.session.access_token,refreshToken:s.session.refresh_token,expiresAt:String(s.session.expires_at)}),o=s.session.access_token)}return o}},6733:(e,t,o)=>{o.d(t,{Xd:()=>a,ed:()=>n,vx:()=>s});let s=`http://localhost:${parseInt(process.env.PORT)+1}`,a={},n=e=>{a=e}},1362:(e,t,o)=>{o.d(t,{R:()=>r});var s=o(41199);let a="https://auth.codegpt.co",n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyb3h1dnNyc2RieGFjb2twcmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0OTEyNzgsImV4cCI6MjAxMTA2NzI3OH0.fyyxVq2c2eLIExMQEUxP8wNoyY2UumBrfN5So16TCno";(0,s.AY)(a,n);let r=e=>(0,s.lx)(a,n,{cookies:{get:t=>e.get(t)?.value,set(t,o,s){try{e.set({name:t,value:o,...s})}catch(e){}},remove(t,o){try{e.set({name:t,value:"",...o})}catch(e){}}}})},8624:(e,t,o)=>{o.d(t,{q:()=>n});var s=o(6037),a=o(33567);let n=async({promptType:e,isAnonymous:t,provider:o,model:a,statusCode:n})=>{let[i,u,c]=await Promise.all([s.Z.getIdeLanguage(),s.Z.getUserId(),s.Z.getVersion()]);r({event:e||"Chat",data:{userType:t?"anonymous":"registered",provider:o,model:a,language:i,codeGPTVersion:c,statusCode:n},userId:u})};async function r({event:e,data:t,userId:o}){let s=[{event:e,properties:{...t,time:Date.now(),distinct_id:o,$insert_id:crypto.randomUUID()}}];await a.Z.post("https://plus.codegpt.co/api/telemetry",s,{headers:{"Content-Type":"application/json"}})}},11184:(e,t,o)=>{o.d(t,{j:()=>i});var s=o(6733),a=o(1362),n=o(33567),r=o(7439);let i=({accessToken:e,refreshToken:t,expiresAt:o})=>{let i=s.vx;return e||t||o||(0,a.R)((0,r.cookies)()).auth.signOut(),n.Z.post(`${i}/vicunaSession`,{accessToken:e,refreshToken:t,expiresAt:o}).then(e=>e.data)}},6037:(e,t,o)=>{o.d(t,{Z:()=>r});var s=o(6733),a=o(33567);let n=s.vx,r={context:{secrets:{delete:async e=>await a.Z.delete(`${n}/secret/${e}`),store:async(e,t)=>await a.Z.post(`${n}/secrets`,{key:e,value:t})},globalState:{update:async(e,t)=>await a.Z.post(`${n}/globalState`,{key:e,value:t})}},window:{showErrorMessage:async e=>await a.Z.post(`${n}/showErrorMessage`,{message:e}),showWarningMessage:async e=>await a.Z.post(`${n}/showWarningMessage`,{message:e}),showInformationMessage:async e=>await a.Z.post(`${n}/showInformationMessage`,{message:e})},commands:{executeCommand:async e=>await a.Z.post(`${n}/executeCommand`,{command:e})},workspace:{getConfiguration:()=>({update:async(e,t)=>await a.Z.post(`${n}/config`,{key:e,value:t})})},newFileWithCode:async e=>await a.Z.post(`${n}/newFileWithCode`,{code:e}),insertCode:async e=>await a.Z.post(`${n}/insertCode`,{code:e}),getSelectedText:async()=>(await a.Z.get(`${n}/getSelectedText`)).data,getLanguage:async()=>{let e=await a.Z.get(`${n}/language`);return e.data.includes("react")?"jsx":e.data},getIdeLanguage:async()=>(await a.Z.get(`${n}/ideLanguage`)).data,getUserId:async()=>(await a.Z.get(`${n}/userId`)).data,getVersion:async()=>(await a.Z.get(`${n}/version`)).data}}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),s=t.X(0,[1638,3567,3792,3122,7099],()=>o(44827));module.exports=s})();