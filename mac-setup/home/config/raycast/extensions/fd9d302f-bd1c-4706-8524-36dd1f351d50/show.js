"use strict";var Me=Object.create;var J=Object.defineProperty;var Le=Object.getOwnPropertyDescriptor;var We=Object.getOwnPropertyNames;var De=Object.getPrototypeOf,Ne=Object.prototype.hasOwnProperty;var Ve=(e,t)=>{for(var n in t)J(e,n,{get:t[n],enumerable:!0})},de=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of We(t))!Ne.call(e,a)&&a!==n&&J(e,a,{get:()=>t[a],enumerable:!(r=Le(t,a))||r.enumerable});return e};var z=(e,t,n)=>(n=e!=null?Me(De(e)):{},de(t||!e||!e.__esModule?J(n,"default",{value:e,enumerable:!0}):n,e)),ze=e=>de(J({},"__esModule",{value:!0}),e);var ot={};Ve(ot,{default:()=>Ce,onlyName:()=>fe,openIn:()=>U,terminal:()=>D});module.exports=ze(ot);var u=require("@raycast/api");var l=z(require("react")),h=require("@raycast/api");var he=Object.prototype.hasOwnProperty;function Z(e,t){var n,r;if(e===t)return!0;if(e&&t&&(n=e.constructor)===t.constructor){if(n===Date)return e.getTime()===t.getTime();if(n===RegExp)return e.toString()===t.toString();if(n===Array){if((r=e.length)===t.length)for(;r--&&Z(e[r],t[r]););return r===-1}if(!n||typeof e=="object"){r=0;for(n in e)if(he.call(e,n)&&++r&&!he.call(t,n)||!(n in t)||!Z(e[n],t[n]))return!1;return Object.keys(t).length===r}}return e!==e&&t!==t}var L=z(require("node:fs")),Y=z(require("node:path"));var we=z(require("node:child_process")),ye=require("node:buffer"),F=z(require("node:stream")),$e=require("node:util");var ke=require("react/jsx-runtime");var Q=globalThis;function Fe(e){let t=(0,l.useRef)(e),n=(0,l.useRef)(0);return Z(e,t.current)||(t.current=e,n.current+=1),(0,l.useMemo)(()=>t.current,[n.current])}function C(e){let t=(0,l.useRef)(e);return t.current=e,t}function je(e,t){let n=e instanceof Error?e.message:String(e);return(0,h.showToast)({style:h.Toast.Style.Failure,title:t?.title??"Something went wrong",message:t?.message??n,primaryAction:t?.primaryAction??pe(e),secondaryAction:t?.primaryAction?pe(e):void 0})}var pe=e=>{let t=!0,n="[Extension Name]...",r="";try{let s=JSON.parse((0,L.readFileSync)((0,Y.join)(h.environment.assetsPath,"..","package.json"),"utf8"));n=`[${s.title}]...`,r=`https://raycast.com/${s.owner||s.author}/${s.name}`,(!s.owner||s.access==="public")&&(t=!1)}catch{}let a=h.environment.isDevelopment||t,i=e instanceof Error?e?.stack||e?.message||"":String(e);return{title:a?"Copy Logs":"Report Error",onAction(s){s.hide(),a?h.Clipboard.copy(i):(0,h.open)(`https://github.com/raycast/extensions/issues/new?&labels=extension%2Cbug&template=extension_bug_report.yml&title=${encodeURIComponent(n)}&extension-url=${encodeURI(r)}&description=${encodeURIComponent(`#### Error:
\`\`\`
${i}
\`\`\`
`)}`)}}};function xe(e,t,n){let r=(0,l.useRef)(0),[a,i]=(0,l.useState)({isLoading:!0}),s=C(e),c=C(n?.abortable),o=C(t||[]),f=C(n?.onError),w=C(n?.onData),$=C(n?.onWillExecute),S=C(n?.failureToastOptions),R=C(a.data),T=(0,l.useRef)(null),y=(0,l.useRef)({page:0}),O=(0,l.useRef)(!1),m=(0,l.useRef)(!0),p=(0,l.useRef)(50),g=(0,l.useCallback)(()=>(c.current&&(c.current.current?.abort(),c.current.current=new AbortController),++r.current),[c]),k=(0,l.useCallback)((...P)=>{let _=g();$.current?.(P),i(d=>({...d,isLoading:!0}));let N=He(s.current)(...P);function V(d){return d.name=="AbortError"||_===r.current&&(f.current?f.current(d):h.environment.launchType!==h.LaunchType.Background&&je(d,{title:"Failed to fetch latest data",primaryAction:{title:"Retry",onAction(M){M.hide(),T.current?.(...o.current||[])}},...S.current}),i({error:d,isLoading:!1})),d}return typeof N=="function"?(O.current=!0,N(y.current).then(({data:d,hasMore:M,cursor:Ue})=>(_===r.current&&(y.current&&(y.current.cursor=Ue,y.current.lastItem=d?.[d.length-1]),w.current&&w.current(d,y.current),M&&(p.current=d.length),m.current=M,i(Oe=>y.current.page===0?{data:d,isLoading:!1}:{data:(Oe.data||[])?.concat(d),isLoading:!1})),d),d=>(m.current=!1,V(d)))):(O.current=!1,N.then(d=>(_===r.current&&(w.current&&w.current(d),i({data:d,isLoading:!1})),d),V))},[w,f,o,s,i,T,$,y,S,g]);T.current=k;let v=(0,l.useCallback)(()=>{y.current={page:0};let P=o.current||[];return k(...P)},[k,o]),I=(0,l.useCallback)(async(P,_)=>{let N;try{if(_?.optimisticUpdate){g(),typeof _?.rollbackOnError!="function"&&_?.rollbackOnError!==!1&&(N=structuredClone(R.current?.value));let V=_.optimisticUpdate;i(d=>({...d,data:V(d.data)}))}return await P}catch(V){if(typeof _?.rollbackOnError=="function"){let d=_.rollbackOnError;i(M=>({...M,data:d(M.data)}))}else _?.optimisticUpdate&&_?.rollbackOnError!==!1&&i(d=>({...d,data:N}));throw V}finally{_?.shouldRevalidateAfter!==!1&&(h.environment.launchType===h.LaunchType.Background||h.environment.commandMode==="menu-bar"?await v():v())}},[v,R,i,g]),Re=(0,l.useCallback)(()=>{y.current.page+=1;let P=o.current||[];k(...P)},[y,o,k]);(0,l.useEffect)(()=>{y.current={page:0},n?.execute!==!1?k(...t||[]):g()},[Fe([t,n?.execute,k]),c,y]),(0,l.useEffect)(()=>()=>{g()},[g]);let Te=n?.execute!==!1?a.isLoading:!1,Ie={...a,isLoading:Te},Pe=O.current?{pageSize:p.current,hasMore:m.current,onLoadMore:Re}:void 0;return{...Ie,revalidate:v,mutate:I,pagination:Pe}}function He(e){return e===Promise.all||e===Promise.race||e===Promise.resolve||e===Promise.reject?e.bind(Promise):e}var q=e=>!!e&&typeof e=="object"&&typeof e.removeListener=="function"&&typeof e.emit=="function"&&typeof e.reallyExit=="function"&&typeof e.listeners=="function"&&typeof e.kill=="function"&&typeof e.pid=="number"&&typeof e.on=="function",ee=Symbol.for("signal-exit emitter"),re=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),Q[ee])return Q[ee];Object.defineProperty(Q,ee,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(t,n){this.listeners[t].push(n)}removeListener(t,n){let r=this.listeners[t],a=r.indexOf(n);a!==-1&&(a===0&&r.length===1?r.length=0:r.splice(a,1))}emit(t,n,r){if(this.emitted[t])return!1;this.emitted[t]=!0;let a=!1;for(let i of this.listeners[t])a=i(n,r)===!0||a;return t==="exit"&&(a=this.emit("afterExit",n,r)||a),a}},ae=class{onExit(){return()=>{}}load(){}unload(){}},se=class{#o;#t;#e;#s;#i;#a;#r;#n;constructor(t){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new re,this.#a={},this.#r=!1,this.#n=[],this.#n.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#n.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#n.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=t,this.#a={};for(let n of this.#n)this.#a[n]=()=>{let r=this.#e.listeners(n),{count:a}=this.#t,i=t;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(a+=i.__signal_exit_emitter__.count),r.length===a){this.unload();let s=this.#t.emit("exit",null,n),c=n==="SIGHUP"?this.#o:n;s||t.kill(t.pid,c)}};this.#i=t.reallyExit,this.#s=t.emit}onExit(t,n){if(!q(this.#e))return()=>{};this.#r===!1&&this.load();let r=n?.alwaysLast?"afterExit":"exit";return this.#t.on(r,t),()=>{this.#t.removeListener(r,t),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#r){this.#r=!0,this.#t.count+=1;for(let t of this.#n)try{let n=this.#a[t];n&&this.#e.on(t,n)}catch{}this.#e.emit=(t,...n)=>this.#l(t,...n),this.#e.reallyExit=t=>this.#c(t)}}unload(){this.#r&&(this.#r=!1,this.#n.forEach(t=>{let n=this.#a[t];if(!n)throw new Error("Listener not defined for signal: "+t);try{this.#e.removeListener(t,n)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(t){return q(this.#e)?(this.#e.exitCode=t||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(t,...n){let r=this.#s;if(t==="exit"&&q(this.#e)){typeof n[0]=="number"&&(this.#e.exitCode=n[0]);let a=r.call(this.#e,t,...n);return this.#t.emit("exit",this.#e.exitCode,null),a}else return r.call(this.#e,t,...n)}},te=null,Ge=(e,t)=>(te||(te=q(process)?new se(process):new ae),te.onExit(e,t));function Be(e,{timeout:t}={}){let n=new Promise((c,o)=>{e.on("exit",(f,w)=>{c({exitCode:f,signal:w,timedOut:!1})}),e.on("error",f=>{o(f)}),e.stdin&&e.stdin.on("error",f=>{o(f)})}),r=Ge(()=>{e.kill()});if(t===0||t===void 0)return n.finally(()=>r());let a,i=new Promise((c,o)=>{a=setTimeout(()=>{e.kill("SIGTERM"),o(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},t)}),s=n.finally(()=>{clearTimeout(a)});return Promise.race([i,s]).finally(()=>r())}var ie=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function Ke(e){let{encoding:t}=e,n=t==="buffer",r=new F.default.PassThrough({objectMode:!1});t&&t!=="buffer"&&r.setEncoding(t);let a=0,i=[];return r.on("data",s=>{i.push(s),a+=s.length}),r.getBufferedValue=()=>n?Buffer.concat(i,a):i.join(""),r.getBufferedLength=()=>a,r}async function me(e,t){let n=Ke(t);return await new Promise((r,a)=>{let i=s=>{s&&n.getBufferedLength()<=ye.constants.MAX_LENGTH&&(s.bufferedData=n.getBufferedValue()),a(s)};(async()=>{try{await(0,$e.promisify)(F.default.pipeline)(e,n),r()}catch(s){i(s)}})(),n.on("data",()=>{n.getBufferedLength()>8e7&&i(new ie)})}),n.getBufferedValue()}async function ge(e,t){e.destroy();try{return await t}catch(n){return n.bufferedData}}async function Je({stdout:e,stderr:t},{encoding:n},r){let a=me(e,{encoding:n}),i=me(t,{encoding:n});try{return await Promise.all([r,a,i])}catch(s){return Promise.all([{error:s,exitCode:null,signal:s.signal,timedOut:s.timedOut||!1},ge(e,a),ge(t,i)])}}function Ze(e){let t=typeof e=="string"?`
`:10,n=typeof e=="string"?"\r":13;return e[e.length-1]===t&&(e=e.slice(0,-1)),e[e.length-1]===n&&(e=e.slice(0,-1)),e}function be(e,t){return e.stripFinalNewline?Ze(t):t}function qe({timedOut:e,timeout:t,signal:n,exitCode:r}){return e?`timed out after ${t} milliseconds`:n!=null?`was killed with ${n}`:r!=null?`failed with exit code ${r}`:"failed"}function Ye({stdout:e,stderr:t,error:n,signal:r,exitCode:a,command:i,timedOut:s,options:c,parentError:o}){let w=`Command ${qe({timedOut:s,timeout:c?.timeout,signal:r,exitCode:a})}: ${i}`,$=n?`${w}
${n.message}`:w,S=[$,t,e].filter(Boolean).join(`
`);return n?n.originalMessage=n.message:n=o,n.message=S,n.shortMessage=$,n.command=i,n.exitCode=a,n.signal=r,n.stdout=e,n.stderr=t,"bufferedData"in n&&delete n.bufferedData,n}function Xe({stdout:e,stderr:t,error:n,exitCode:r,signal:a,timedOut:i,command:s,options:c,parentError:o}){if(n||r!==0||a!==null)throw Ye({error:n,exitCode:r,signal:a,stdout:e,stderr:t,command:s,timedOut:i,options:c,parentError:o});return e}var ve=(function(e){return e.Required="required",e})({});function ne(e,t){if(e){if(typeof e=="function")return e(t);if(e==="required"){let n=typeof t<"u"&&t!==null;if(n)switch(typeof t){case"string":n=t.length>0;break;case"object":Array.isArray(t)?n=t.length>0:t instanceof Date&&(n=t.getTime()>0);break;default:break}if(!n)return"The item is required"}}}function _e(e){let{onSubmit:t,validation:n,initialValues:r={}}=e,[a,i]=(0,l.useState)(r),[s,c]=(0,l.useState)({}),o=(0,l.useRef)({}),f=C(n||{}),w=C(t),$=(0,l.useCallback)(m=>{o.current[m]?.focus()},[o]),S=(0,l.useCallback)(async m=>{let p=!1;for(let[k,v]of Object.entries(f.current)){let I=ne(v,m[k]);I&&(p||(p={},$(k)),p[k]=I)}if(p)return c(p),!1;let g=await w.current(m);return typeof g=="boolean"?g:!0},[f,w,$]),R=(0,l.useCallback)((m,p)=>{c(g=>({...g,[m]:p}))},[c]),T=(0,l.useCallback)(function(m,p){i(g=>({...g,[m]:typeof p=="function"?p(g[m]):p}))},[i]),y=(0,l.useMemo)(()=>new Proxy({},{get(m,p){let g=f.current[p],k=a[p];return{onChange(v){s[p]&&(ne(g,v)||R(p,void 0)),T(p,v)},onBlur(v){let I=ne(g,v.target.value);I&&R(p,I)},error:s[p],id:p,value:typeof k>"u"?null:k,ref:v=>{o.current[p]=v}}}}),[s,f,R,a,o,T]),O=(0,l.useCallback)(m=>{c({}),Object.entries(o.current).forEach(([p,g])=>{m?.[p]||g?.reset()}),m&&i(m)},[i,c,o]);return{handleSubmit:S,setValidationError:R,setValue:T,values:a,itemProps:y,focus:$,reset:O}}var ft=!!process.env.RAYCASTX;async function E(e,t,n){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:r,language:a,timeout:i,...s}=Array.isArray(t)?n||{}:t||{},c=r!==!1?[]:["-ss"];a==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(t)&&c.push("-",...t);let o=we.default.spawn("osascript",c,{...s,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),f=Be(o,{timeout:i??1e4});o.stdin.end(e);let[{error:w,exitCode:$,signal:S,timedOut:R},T,y]=await Je(o,{encoding:"utf8"},f),O=be({stripFinalNewline:!0},T),m=be({stripFinalNewline:!0},y);return Xe({stdout:O,stderr:m,error:w,exitCode:$,signal:S,timedOut:R,command:"osascript",options:n,parentError:new Error})}var B=require("@raycast/api"),j=z(require("fs")),oe=(0,B.getPreferenceValues)(),G=oe.sshConfig==="localStorage"?"localStorage":oe.sshConfigFile||oe.sshConfig.replace("~",process.env.HOME||"");function Qe(e){let n=j.readFileSync(e,"utf8").split(`
`),r=[],a=null;for(let i of n){let s=i.trim();if(!(s.startsWith("#")||s==="")){if(s.startsWith("Host ")&&s!=="Host *")a!==null&&r.push(a),a={id:r.length.toString(),address:"",name:s.substring(5),user:""};else if(a!==null){let c=s.indexOf(" "),o=s.substring(0,c),f=s.substring(c+1);switch(o){case"HostName":a.address=f;break;case"User":a.user=f;break;case"Port":a.port=f;break;case"IdentityFile":a.sshKey=f;break;case"HostNameKey":break;case"RemoteCommand":a.command=f;break;default:break}}}}return a!==null&&r.push(a),r}function et(e,t){let n="";for(let r of t)n+=`Host ${r.name}
`,n+=`  HostName ${r.address}
`,r.user&&(n+=`  User ${r.user}
`),r.port&&(n+=`  Port ${r.port}
`),r.sshKey&&(n+=`  IdentityFile ${r.sshKey}
`),r.command&&(n+=`  RemoteCommand ${r.command}
`),n+=`
`;j.writeFileSync(e,n.trimEnd())}async function K(){switch(G){case"localStorage":{let{connections:e}=await B.LocalStorage.allItems();return e?JSON.parse(e):[]}default:return j.existsSync(G)?Qe(G):[]}}async function X(e){switch(G){case"localStorage":await B.LocalStorage.setItem("connections",JSON.stringify(e));break;default:et(G,e);break}}var b=require("@raycast/api");var ce=require("node:crypto");var Se="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var tt=128,W,H;function nt(e){!W||W.length<e?(W=Buffer.allocUnsafe(e*tt),ce.webcrypto.getRandomValues(W),H=0):H+e>W.length&&(ce.webcrypto.getRandomValues(W),H=0),H+=e}function Ee(e=21){nt(e|=0);let t="";for(let n=H-e;n<H;n++)t+=Se[W[n]&63];return t}var A=require("react/jsx-runtime");function le({connectionToEdit:e}){let t=!!e,{pop:n}=(0,b.useNavigation)(),{handleSubmit:r,itemProps:a}=_e({onSubmit(s){i(s)},validation:{name:ve.Required},initialValues:e??{}});async function i(s){let c=await K();if(t){let o=c.findIndex(f=>f.id===e.id);o!==-1&&c.splice(o,1)}c.push({...s,id:t?e.id:Ee()}),await X(c),t?n():await(0,b.showHUD)(`\u2705 Connection [${s.name}] saved!`,{popToRootType:b.PopToRootType.Immediate})}return(0,A.jsxs)(b.Form,{actions:(0,A.jsx)(b.ActionPanel,{children:(0,A.jsx)(b.Action.SubmitForm,{icon:b.Icon.SaveDocument,title:"Save",onSubmit:r})}),children:[(0,A.jsx)(b.Form.TextField,{title:"Connection Name",...a.name}),(0,A.jsx)(b.Form.TextField,{title:"Server Address",placeholder:"A resolvable DNS name or IP",...a.address}),(0,A.jsx)(b.Form.TextField,{title:"Username (optional)",placeholder:"A username to authenticate with",...a.user}),(0,A.jsx)(b.Form.TextField,{title:"Port (optional)",placeholder:"An optional custom port (other than 22)",...a.port}),(0,A.jsx)(b.Form.TextField,{title:"SSH Key Location (optional)",placeholder:"An optional key path to authenticate with",...a.sshKey}),(0,A.jsx)(b.Form.TextField,{title:"Command to Execute (optional)",placeholder:"An optional command to execute on the remote server after connecting",...a.command})]})}var Ae=le;var x=require("react/jsx-runtime"),ue=(0,u.getPreferenceValues)(),D=ue.terminal,U=ue.openin,fe=ue.onlyname;async function rt(e){let t;if(fe)t=["ssh",e.name].join(" ");else{let o="";e.sshKey&&(o=`-i ${e.sshKey} `);let f="";e.port&&(f=`-p ${e.port} `);let w="",$="";e.command&&(w=`\\"${e.command}\\" `,$="-t");let S=e.address;e.user&&(S=`${encodeURIComponent(e.user)}@${S}`),t=["ssh",$,o,S,f,w].filter(Boolean).join(" ")}let n=`
      -- For the latest version:
      -- https://github.com/DavidMChan/custom-alfred-warp-scripts

      -- Set this property to true to always open in a new window
      property open_in_new_window : ${U=="newWindow"}

      -- Set this property to true to always open in a new tab
      property open_in_new_tab : ${U=="newTab"}

      -- Don't change this :)
      property opened_new_window : false

      -- Handlers
      on new_window()
          tell application "System Events" to tell process "Warp"
              click menu item "New Window" of menu "File" of menu bar 1
              set frontmost to true
          end tell
          delay 0.5
      end new_window

      on new_tab()
          tell application "System Events" to tell process "Warp"
              click menu item "New Tab" of menu "File" of menu bar 1
              set frontmost to true
          end tell
      end new_tab

      on call_forward()
          tell application "Warp" to activate
      end call_forward

      on is_running()
          application "Warp" is running
      end is_running

      on has_windows()
          if not is_running() then return false
          tell application "System Events"
              if windows of process "Warp" is {} then return false
          end tell
          true
      end has_windows

      on send_text(custom_text)
          tell application "System Events"
              keystroke custom_text
          end tell
      end send_text


      -- Main
      if not is_running() then
          call_forward()
          set opened_new_window to true
      else
          call_forward()
          set opened_new_window to false
      end if

      if has_windows() then
          if open_in_new_window and not opened_new_window then
              new_window()
          else if open_in_new_tab and not opened_new_window then
              new_tab()
          end if
      else
          new_window()
      end if


      -- Make sure a window exists before we continue, or the write may fail
      repeat until has_windows()
          delay 0.5
      end repeat
      delay 0.5

      send_text("${t}")
      call_forward()
  `,r=`
    tell application "Terminal"
      do script ""
      activate
      set position of front window to {1, 1}
      set shell to do script "${t}" in window 1
    end tell

    tell application "System Events" to tell process "Terminal"
        set frontmost to true
        windows where title contains "bash"
        if result is not {} then perform action "AXRaise" of item 1 of result
    end tell
  `,a=`
    -- Set this property to true to open in a new window instead of a new tab
      property open_in_new_window : ${U=="newWindow"}

    on new_window()
    	tell application "iTerm" to create window with default profile
    end new_window

    on new_tab()
    	tell application "iTerm" to tell the first window to create tab with default profile
    end new_tab

    on call_forward()
    	tell application "iTerm" to activate
    end call_forward

    on is_running()
    	application "iTerm" is running
    end is_running

    on is_processing()
    	tell application "iTerm" to tell the first window to tell current session to get is processing
    end is_processing

    on has_windows()
    	if not is_running() then return false
    	if windows of application "iTerm" is {} then return false
    	true
    end has_windows

    on send_text(custom_text)
    	tell application "iTerm" to tell the first window to tell current session to write text custom_text
    end send_text

    -- Main
    if has_windows() then
      if open_in_new_window then
        new_window()
      else
        new_tab()
      end if
    else
    	-- If iTerm is not running and we tell it to create a new window, we get two
    	-- One from opening the application, and the other from the command
    	if is_running() then
    		new_window()
    	else
    		call_forward()
    	end if
    end if

    -- Make sure a window exists before we continue, or the write may fail
    repeat until has_windows()
    	delay 0.01
    end repeat

    send_text("${t}")
    call_forward()
  `,i=`
  -- Set this property to true to always open in a new window
  property open_in_new_window : ${U=="newWindow"}

  -- Set this property to true to always open in a new tab
  property open_in_new_tab : ${U=="newTab"}

  -- Don't change this :)
  property opened_new_window : false

  -- Handlers
  on new_window()
      tell application "Alacritty"
          activate
          delay 0.5
          tell application "System Events" to tell process "Alacritty"
              keystroke "n" using {command down}
          end tell
      end tell
      delay 0.5
  end new_window

  on new_tab()
      tell application "Alacritty"
          activate
          tell application "System Events" to tell process "Alacritty"
              keystroke "t" using {command down}
          end tell
      end tell
      delay 0.5
  end new_tab

  on call_forward()
      tell application "Alacritty" to activate
      tell application "Alacritty" to reopen
  end call_forward

  on is_running()
      application "Alacritty" is running
  end is_running

  on has_windows()
      if not is_running() then return false
      tell application "System Events"
          if windows of process "Alacritty" is {} then return false
      end tell
      true
  end has_windows

  on send_text(custom_text)
      tell application "System Events" to tell process "Alacritty"
          keystroke custom_text
      end tell
  end send_text


  -- Main
  if not is_running() then
      call_forward()
      set opened_new_window to true
  else
      call_forward()
      set opened_new_window to false
  end if

  if not has_windows() then
    tell application "Alacritty" to reopen
    delay 0.2
    tell application "Alacritty" to activate
  end if

  if open_in_new_window and not opened_new_window then
      new_window()
  else if open_in_new_tab and not opened_new_window then
      new_tab()
  end if


  -- Make sure a window exists before we continue, or the write may fail
  repeat until has_windows()
      delay 0.5
  end repeat
  delay 0.5
  send_text("${t}
") -- Enter at the end of string
  call_forward()
  `,s=`
  -- Set this property to true to open in a new window instead of a new tab
  property open_in_new_window : ${U=="newWindow"}

  on new_window()
      tell application "System Events" 
          launch application "Hyper"
      end tell
  end new_window

  on new_tab()
      tell application "System Events"
          -- Check if Hyper is already running
          set isRunning to (exists process "Hyper")

          if isRunning then
              -- If Hyper is running, bring it to the front and open a new tab
              tell application "Hyper" to activate
              tell application "System Events" to keystroke "t" using command down
          else
              -- If Hyper isn't running, launch it
              launch application "Hyper"
          end if
      end tell
  end new_tab

  on call_forward()
      tell application "Hyper" to activate
  end call_forward

  on is_running()
      application "Hyper" is running
  end is_running

  -- Hyper doesn't have a direct equivalent to 'is processing', so we'll assume it's ready if it's running
  on is_processing()
      is_running()
  end is_processing

  on has_windows()
      if not is_running() then return false
      -- Hyper always has at least one window, so we'll just check if it's running
      true
  end has_windows

  on send_text(custom_text)
      tell application "System Events"
          keystroke custom_text & return
      end tell
  end send_text

  -- Main
  if has_windows() then
      if open_in_new_window then
          new_window()
      else
          new_tab()
      end if
  else
      -- If Hyper is not running and we tell it to create a new window, we get two
      -- One from opening the application, and the other from the command
      if is_running() then
          new_window()
      else
          call_forward()
      end if
  end if 


  -- Give Hyper some time to load 
  repeat until has_windows()
      delay 0.5
  end repeat
  delay 0.5

  send_text("${t}")
  call_forward()
  `,c=`
  -- Set this property to true to open in a new window instead of a new tab
  property open_in_new_window : ${U=="newWindow"}

  on new_window()
      tell application "Ghostty"
          activate
          tell application "System Events" to tell process "Ghostty"
              keystroke "n" using {command down}
          end tell
      end tell
      delay 0.5
  end new_window

  on new_tab()
      tell application "Ghostty"
          activate
          tell application "System Events" to tell process "Ghostty"
              keystroke "t" using {command down}
          end tell
      end tell
      delay 0.5
  end new_tab

  on call_forward()
      tell application "Ghostty" to activate
  end call_forward

  on is_running()
      application "Ghostty" is running
  end is_running

  on has_windows()
      if not is_running() then return false
      tell application "System Events"
          if windows of process "Ghostty" is {} then return false
      end tell
      true
  end has_windows

  on send_text(custom_text)
      tell application "System Events" to tell process "Ghostty"
          keystroke custom_text & return
      end tell
  end send_text

  -- Main
  if has_windows() then
      if open_in_new_window then
          new_window()
      else
          new_tab()
      end if
  else
      if is_running() then
          new_window()
      else
          call_forward()
      end if
  end if

  -- Give Ghostty some time to load
  repeat until has_windows()
      delay 0.5
  end repeat
  delay 0.5

  send_text("${t}")
  call_forward()
  `;if(D=="iTerm")try{await E(a)}catch(o){await E(r),console.log(o)}else if(D=="Warp")try{await E(n)}catch(o){await E(r),console.log(o)}else if(D=="Alacritty")try{await(0,u.closeMainWindow)(),await E(i)}catch(o){await E(r),console.log(o)}else if(D=="Hyper")try{await E(s)}catch(o){await E(r),console.log(o)}else if(D=="Ghostty")try{await E(c)}catch(o){await E(r),console.log(o)}else await E(r);await(0,u.showHUD)(`\u2705 Connection [${e.name}] opened with [${D}].`)}function at(e){if(fe)return e.name;let t=[];e.sshKey&&t.push(`-i ${e.sshKey}`),e.port&&t.push(`-p ${e.port}`),e.command&&t.push(`"${e.command}"`);let n=e.user?`${e.user}@${e.address}`:e.address;return t.unshift("ssh",n),t.filter(Boolean).join(" ")}function Ce(){let{isLoading:e,data:t=[],revalidate:n}=xe(K),{push:r}=(0,u.useNavigation)();async function a(s){if(await(0,u.confirmAlert)({title:"Remove Connection",message:`Are you sure you want to remove connection [${s.name}]?`,primaryAction:{title:"Remove",style:u.Alert.ActionStyle.Destructive},dismissAction:{title:"Cancel"}})){let o=await K();o=o.filter(f=>f.id!==s.id),await X(o),n(),await(0,u.showHUD)(`\u{1F5D1} Connection [${s.name}] removed!`)}}async function i(s){r((0,x.jsx)(Ae,{connectionToEdit:s}),n)}return(0,x.jsx)(u.List,{isLoading:e,children:t.map(s=>(0,x.jsx)(u.List.Item,{actions:(0,x.jsx)(st,{item:s,onItemRemove:a,onItemEdit:i}),id:s.id,title:s.name,subtitle:it(s)},s.name))})}function st({item:e,onItemRemove:t,onItemEdit:n}){let r=at(e);return(0,x.jsxs)(u.ActionPanel,{children:[(0,x.jsxs)(u.ActionPanel.Section,{title:"Operations",children:[(0,x.jsx)(u.Action,{icon:u.Icon.Terminal,title:"Open Connection",onAction:()=>rt(e)}),(0,x.jsx)(u.Action.CopyToClipboard,{title:"Copy Connection String",content:r,shortcut:{modifiers:["cmd"],key:"c"}}),(0,x.jsx)(u.Action.Paste,{icon:u.Icon.Text,title:"Paste Connection String",content:r,shortcut:{modifiers:["cmd"],key:"v"},onPaste:()=>(0,u.showHUD)(`\u{1F4DD} Pasting conn. [${e.name}] to active app`)}),(0,x.jsx)(u.Action,{title:"Edit Connection",icon:u.Icon.Pencil,style:u.Action.Style.Regular,onAction:()=>n(e),shortcut:{modifiers:["cmd"],key:"e"}})]}),(0,x.jsx)(u.ActionPanel.Section,{title:"Danger zone",children:(0,x.jsx)(u.Action,{title:"Remove Connection",icon:u.Icon.Trash,style:u.Action.Style.Destructive,onAction:()=>t(e),shortcut:{modifiers:["ctrl"],key:"x"}})})]})}function it(e){return`${e.user?e.user+"@":""}${e.address}${e.port?" Port: "+e.port:""}${e.sshKey?" SSH Key: "+e.sshKey:""} ${e.command?' Command: "'+e.command+'"':""}`}0&&(module.exports={onlyName,openIn,terminal});
