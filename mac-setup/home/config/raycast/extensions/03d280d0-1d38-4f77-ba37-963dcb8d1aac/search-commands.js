"use strict";var ce=Object.create;var N=Object.defineProperty;var le=Object.getOwnPropertyDescriptor;var de=Object.getOwnPropertyNames;var me=Object.getPrototypeOf,he=Object.prototype.hasOwnProperty;var ue=(n,r)=>{for(var t in r)N(n,t,{get:r[t],enumerable:!0})},K=(n,r,t,e)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of de(r))!he.call(n,i)&&i!==t&&N(n,i,{get:()=>r[i],enumerable:!(e=le(r,i))||e.enumerable});return n};var z=(n,r,t)=>(t=n!=null?ce(me(n)):{},K(r||!n||!n.__esModule?N(t,"default",{value:n,enumerable:!0}):t,n)),ge=n=>K(N({},"__esModule",{value:!0}),n);var Pe={};ue(Pe,{default:()=>oe});module.exports=ge(Pe);var s=require("@raycast/api");var h=z(require("react")),u=require("@raycast/api");var J=Object.prototype.hasOwnProperty;function j(n,r){var t,e;if(n===r)return!0;if(n&&r&&(t=n.constructor)===r.constructor){if(t===Date)return n.getTime()===r.getTime();if(t===RegExp)return n.toString()===r.toString();if(t===Array){if((e=n.length)===r.length)for(;e--&&j(n[e],r[e]););return e===-1}if(!t||typeof n=="object"){e=0;for(t in n)if(J.call(n,t)&&++e&&!J.call(r,t)||!(t in r)||!j(n[t],r[t]))return!1;return Object.keys(r).length===e}}return n!==n&&r!==r}var D=z(require("node:fs")),q=z(require("node:path")),te=z(require("node:crypto"));var ne=require("react/jsx-runtime");function fe(n){let r=(0,h.useRef)(n),t=(0,h.useRef)(0);return j(n,r.current)||(r.current=n,t.current+=1),(0,h.useMemo)(()=>r.current,[t.current])}function R(n){let r=(0,h.useRef)(n);return r.current=n,r}function pe(n,r){let t=n instanceof Error?n.message:String(n);return(0,u.showToast)({style:u.Toast.Style.Failure,title:r?.title??"Something went wrong",message:r?.message??t,primaryAction:r?.primaryAction??Z(n),secondaryAction:r?.primaryAction?Z(n):void 0})}var Z=n=>{let r=!0,t="[Extension Name]...",e="";try{let c=JSON.parse((0,D.readFileSync)((0,q.join)(u.environment.assetsPath,"..","package.json"),"utf8"));t=`[${c.title}]...`,e=`https://raycast.com/${c.owner||c.author}/${c.name}`,(!c.owner||c.access==="public")&&(r=!1)}catch{}let i=u.environment.isDevelopment||r,g=n instanceof Error?n?.stack||n?.message||"":String(n);return{title:i?"Copy Logs":"Report Error",onAction(c){c.hide(),i?u.Clipboard.copy(g):(0,u.open)(`https://github.com/raycast/extensions/issues/new?&labels=extension%2Cbug&template=extension_bug_report.yml&title=${encodeURIComponent(t)}&extension-url=${encodeURI(e)}&description=${encodeURIComponent(`#### Error:
\`\`\`
${g}
\`\`\`
`)}`)}}};function ye(n,r,t){let e=(0,h.useRef)(0),[i,g]=(0,h.useState)({isLoading:!0}),c=R(n),f=R(t?.abortable),l=R(r||[]),x=R(t?.onError),b=R(t?.onData),$=R(t?.onWillExecute),p=R(t?.failureToastOptions),I=R(i.data),S=(0,h.useRef)(null),w=(0,h.useRef)({page:0}),P=(0,h.useRef)(!1),_=(0,h.useRef)(!0),L=(0,h.useRef)(50),E=(0,h.useCallback)(()=>(f.current&&(f.current.current?.abort(),f.current.current=new AbortController),++e.current),[f]),k=(0,h.useCallback)((...a)=>{let d=E();$.current?.(a),g(o=>({...o,isLoading:!0}));let m=be(c.current)(...a);function v(o){return o.name=="AbortError"||d===e.current&&(x.current?x.current(o):u.environment.launchType!==u.LaunchType.Background&&pe(o,{title:"Failed to fetch latest data",primaryAction:{title:"Retry",onAction(A){A.hide(),S.current?.(...l.current||[])}},...p.current}),g({error:o,isLoading:!1})),o}return typeof m=="function"?(P.current=!0,m(w.current).then(({data:o,hasMore:A,cursor:F})=>(d===e.current&&(w.current&&(w.current.cursor=F,w.current.lastItem=o?.[o.length-1]),b.current&&b.current(o,w.current),A&&(L.current=o.length),_.current=A,g(W=>w.current.page===0?{data:o,isLoading:!1}:{data:(W.data||[])?.concat(o),isLoading:!1})),o),o=>(_.current=!1,v(o)))):(P.current=!1,m.then(o=>(d===e.current&&(b.current&&b.current(o),g({data:o,isLoading:!1})),o),v))},[b,x,l,c,g,S,$,w,p,E]);S.current=k;let C=(0,h.useCallback)(()=>{w.current={page:0};let a=l.current||[];return k(...a)},[k,l]),U=(0,h.useCallback)(async(a,d)=>{let m;try{if(d?.optimisticUpdate){E(),typeof d?.rollbackOnError!="function"&&d?.rollbackOnError!==!1&&(m=structuredClone(I.current?.value));let v=d.optimisticUpdate;g(o=>({...o,data:v(o.data)}))}return await a}catch(v){if(typeof d?.rollbackOnError=="function"){let o=d.rollbackOnError;g(A=>({...A,data:o(A.data)}))}else d?.optimisticUpdate&&d?.rollbackOnError!==!1&&g(o=>({...o,data:m}));throw v}finally{d?.shouldRevalidateAfter!==!1&&(u.environment.launchType===u.LaunchType.Background||u.environment.commandMode==="menu-bar"?await C():C())}},[C,I,g,E]),O=(0,h.useCallback)(()=>{w.current.page+=1;let a=l.current||[];k(...a)},[w,l,k]);(0,h.useEffect)(()=>{w.current={page:0},t?.execute!==!1?k(...r||[]):E()},[fe([r,t?.execute,k]),f,w]),(0,h.useEffect)(()=>()=>{E()},[E]);let B=t?.execute!==!1?i.isLoading:!1,Y={...i,isLoading:B},G=P.current?{pageSize:L.current,hasMore:_.current,onLoadMore:O}:void 0;return{...Y,revalidate:C,mutate:U,pagination:G}}function be(n){return n===Promise.all||n===Promise.race||n===Promise.resolve||n===Promise.reject?n.bind(Promise):n}function Q(n){return typeof n!="function"?!1:/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(n))!==null}function we(n){return n instanceof URLSearchParams?n.toString():n}function re(n,r=[]){function t(e){return"update"in n?n.update(e,"utf8"):n.write(e)}return{dispatch:function(e){e=we(e),e===null?this._null():this["_"+typeof e](e)},_object:function(e){let i=/\[object (.*)\]/i,g=Object.prototype.toString.call(e),c=i.exec(g)?.[1]??"unknown:["+g+"]";c=c.toLowerCase();let f=null;if((f=r.indexOf(e))>=0){this.dispatch("[CIRCULAR:"+f+"]");return}else r.push(e);if(Buffer.isBuffer(e))return t("buffer:"),t(e.toString("utf8"));if(c!=="object"&&c!=="function"&&c!=="asyncfunction")if(this["_"+c])this["_"+c](e);else throw new Error('Unknown object type "'+c+'"');else{let l=Object.keys(e);l=l.sort(),Q(e)||l.splice(0,0,"prototype","__proto__","constructor"),t("object:"+l.length+":");let x=this;return l.forEach(function(b){x.dispatch(b),t(":"),x.dispatch(e[b]),t(",")})}},_array:function(e,i){i=typeof i<"u"?i:!1;let g=this;if(t("array:"+e.length+":"),!i||e.length<=1){e.forEach(function(l){g.dispatch(l)});return}let c=[],f=e.map(function(l){let x=ke(),b=r.slice();return re(x,b).dispatch(l),c=c.concat(b.slice(r.length)),x.read().toString()});r=r.concat(c),f.sort(),this._array(f,!1)},_date:function(e){t("date:"+e.toJSON())},_symbol:function(e){t("symbol:"+e.toString())},_error:function(e){t("error:"+e.toString())},_boolean:function(e){t("bool:"+e.toString())},_string:function(e){t("string:"+e.length+":"),t(e.toString())},_function:function(e){t("fn:"),Q(e)?this.dispatch("[native]"):this.dispatch(e.toString()),this.dispatch("function-name:"+String(e.name)),this._object(e)},_number:function(e){t("number:"+e.toString())},_xml:function(e){t("xml:"+e.toString())},_null:function(){t("Null")},_undefined:function(){t("Undefined")},_regexp:function(e){t("regex:"+e.toString())},_uint8array:function(e){t("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){t("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){t("int8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){t("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){t("int16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){t("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){t("int32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){t("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){t("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){t("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){t("url:"+e.toString())},_map:function(e){t("map:");let i=Array.from(e);this._array(i,!0)},_set:function(e){t("set:");let i=Array.from(e);this._array(i,!0)},_file:function(e){t("file:"),this.dispatch([e.name,e.size,e.type,e.lastModified])},_blob:function(){throw Error(`Hashing Blob objects is currently not supported
(see https://github.com/puleos/object-hash/issues/26)
Use "options.replacer" or "options.ignoreUnknown"
`)},_domwindow:function(){t("domwindow")},_bigint:function(e){t("bigint:"+e.toString())},_process:function(){t("process")},_timer:function(){t("timer")},_pipe:function(){t("pipe")},_tcp:function(){t("tcp")},_udp:function(){t("udp")},_tty:function(){t("tty")},_statwatcher:function(){t("statwatcher")},_securecontext:function(){t("securecontext")},_connection:function(){t("connection")},_zlib:function(){t("zlib")},_context:function(){t("context")},_nodescript:function(){t("nodescript")},_httpparser:function(){t("httpparser")},_dataview:function(){t("dataview")},_signal:function(){t("signal")},_fsevent:function(){t("fsevent")},_tlswrap:function(){t("tlswrap")}}}function ke(){return{buf:"",write:function(n){this.buf+=n},end:function(n){this.buf+=n},read:function(){return this.buf}}}function ve(n,r){let t=this[n];return t instanceof Date?`__raycast_cached_date__${t.toISOString()}`:Buffer.isBuffer(t)?`__raycast_cached_buffer__${t.toString("base64")}`:r}function xe(n,r){return typeof r=="string"&&r.startsWith("__raycast_cached_date__")?new Date(r.replace("__raycast_cached_date__","")):typeof r=="string"&&r.startsWith("__raycast_cached_buffer__")?Buffer.from(r.replace("__raycast_cached_buffer__",""),"base64"):r}function X(n){let r=te.default.createHash("sha1");return re(r).dispatch(n),r.digest("hex")}var $e=Symbol("cache without namespace"),ee=new Map;function H(n,r,t){let e=t?.cacheNamespace||$e,i=ee.get(e)||ee.set(e,new u.Cache({namespace:t?.cacheNamespace})).get(e);if(!i)throw new Error("Missing cache");let g=R(n),c=R(r),f=(0,h.useSyncExternalStore)(i.subscribe,()=>{try{return i.get(g.current)}catch($){console.error("Could not get Cache data:",$);return}}),l=(0,h.useMemo)(()=>{if(typeof f<"u"){if(f==="undefined")return;try{return JSON.parse(f,xe)}catch($){return console.warn("The cached data is corrupted",$),c.current}}else return c.current},[f,c]),x=R(l),b=(0,h.useCallback)($=>{let p=typeof $=="function"?$(x.current):$;if(typeof p>"u")i.set(g.current,"undefined");else{let I=JSON.stringify(p,ve);i.set(g.current,I)}return p},[i,g,x]);return[l,b]}var M=Symbol();function ae(n,r,t){let{initialData:e,keepPreviousData:i,internal_cacheKeySuffix:g,...c}=t||{},f=(0,h.useRef)(null),[l,x]=H(X(r||[])+g,M,{cacheNamespace:X(n)}),b=(0,h.useRef)(l!==M?l:e),$=(0,h.useRef)(void 0),{mutate:p,revalidate:I,...S}=ye(n,r||[],{...c,onData(E,k){$.current=k,c.onData&&c.onData(E,k),!(k&&k.page>0)&&(f.current="promise",b.current=E,x(E))}}),w,P=S.pagination;$.current&&$.current.page>0&&S.data?w=S.data:f.current==="promise"?w=b.current:i&&l!==M?(w=l,P&&(P.hasMore=!0,P.pageSize=l.length)):i&&l===M?w=b.current:l!==M?(w=l,P&&(P.hasMore=!0,P.pageSize=l.length)):w=e;let _=R(w),L=(0,h.useCallback)(async(E,k)=>{let C;try{if(k?.optimisticUpdate){typeof k?.rollbackOnError!="function"&&k?.rollbackOnError!==!1&&(C=structuredClone(_.current));let U=k.optimisticUpdate(_.current);f.current="cache",b.current=U,x(U)}return await p(E,{shouldRevalidateAfter:k?.shouldRevalidateAfter})}catch(U){if(typeof k?.rollbackOnError=="function"){let O=k.rollbackOnError(_.current);f.current="cache",b.current=O,x(O)}else k?.optimisticUpdate&&k?.rollbackOnError!==!1&&(f.current="cache",b.current=C,x(C));throw U}},[x,p,_,b,f]);return(0,h.useEffect)(()=>{l!==M&&(f.current="cache",b.current=l)},[l]),{data:w,isLoading:S.isLoading,error:S.error,mutate:$.current&&$.current.page>0?p:L,pagination:P,revalidate:I}}var V=require("react");var se=[{name:"g",command:"git",type:"show",description:`Runs Git so you can execute repository commands.

**Example:** \`git status\`

**Pitfalls:**
- Running outside a repo fails; cd into a repo first.
- Typos in subcommands are common; use \`git help\` when unsure.

**Why?** entry point for all version control work`,keywords:["commands","g","git","help"]},{name:"ga",command:"git add",type:"default",description:"Stages selected files so they are included in the next commit.\n\n**Example:** `git add src/app.ts`\n\n**Pitfalls:**\n- Using `git add .` can stage unwanted files; review `git status`.\n- Large binaries should not be staged; add to `.gitignore` if needed.\n\n**Why?** build clean, intentional commits",keywords:["add","files","ga","index","stage","staging"]},{name:"gaa",command:"git add --all",type:"default",description:`Stages all changes, including deletions and new files.

**Example:** \`git add --all\`

**Pitfalls:**
- You may stage generated or binary files; check \`git status\` first.
- It will stage deletions you may not want; unstage with \`git restore --staged <file>\`.

**Why?** fast when you want everything in one commit`,keywords:["add","all","everything","files","gaa","index","stage","staging"]},{name:"gapa",command:"git add --patch",type:"default",description:`Stages only selected chunks of changes interactively.

**Example:** \`git add --patch src/app.ts\`

**Pitfalls:**
- Picking wrong hunks mixes unrelated changes; review with \`git diff --cached\`.
- Skipping needed hunks can break builds; ensure all required changes are staged.

**Why?** create small, reviewable commits`,keywords:["add","files","gapa","hunks","index","interactive","patch","stage","staging"]},{name:"gau",command:"git add --update",type:"default",description:`Stages only changes to already tracked files.

**Example:** \`git add --update\`

**Pitfalls:**
- New files remain unstaged; add them explicitly.
- Deleted tracked files are staged too; confirm before commit.

**Why?** update tracked files without grabbing new ones`,keywords:["add","files","gau","index","stage","staging","tracked","update"]},{name:"gav",command:"git add --verbose",type:"default",description:`Stages files and prints what Git is adding.

**Example:** \`git add --verbose src/app.ts\`

**Pitfalls:**
- Verbose output can hide mistakes; still review with \`git status\`.
- Staging the wrong file is easy; double-check paths.

**Why?** extra visibility while staging`,keywords:["add","files","gav","index","stage","staging"]},{name:"gwip",command:'git add -A; git rm $(git ls-files --deleted) 2> /dev/null; git commit --no-verify --no-gpg-sign -m "--wip-- [skip ci]"',type:"default",description:`Creates a quick WIP commit from all current changes.

**Example:** \`git add -A && git commit -m "--wip-- [skip ci]"\`

**Pitfalls:**
- This can include unwanted files; check \`git status\` first.
- WIP commits can be pushed by mistake; avoid pushing them to shared branches.

**Why?** capture progress before context switching`,keywords:["add","all","commit","gwip","quick","save","snapshot","wip"]},{name:"gam",command:"git am",type:"default",description:`Applies email-style patch files as commits.

**Example:** \`git am 0001-fix-login.patch\`

**Pitfalls:**
- Patch context can fail; update your branch or resolve conflicts.
- Skipping patches can drop changes; review skipped commits later.

**Why?** apply patch series cleanly`,keywords:["am","email","gam","patch"]},{name:"gama",command:"git am --abort",type:"delete",description:`Aborts an in-progress patch apply and restores the previous state.

**Example:** \`git am --abort\`

**Pitfalls:**
- Manual conflict edits will be discarded; save changes if needed.
- If no \`git am\` is in progress, this will fail.

**Why?** safely exit a broken patch apply`,keywords:["am","email","gama","patch"]},{name:"gamc",command:"git am --continue",type:"default",description:`Continues applying patches after resolving conflicts.

**Example:** \`git am --continue\`

**Pitfalls:**
- You must stage resolved files before continuing.
- Unresolved conflicts will block progress; resolve all files first.

**Why?** finish applying a patch series`,keywords:["am","email","gamc","patch"]},{name:"gamscp",command:"git am --show-current-patch",type:"show",description:`Shows the patch currently being applied.

**Example:** \`git am --show-current-patch\`

**Pitfalls:**
- Large patches can be noisy; pipe to a pager if needed.
- If no patch is active, output may be empty.

**Why?** inspect the failing patch quickly`,keywords:["am","email","gamscp","patch"]},{name:"gams",command:"git am --skip",type:"default",description:`Skips the current patch and continues with the rest.

**Example:** \`git am --skip\`

**Pitfalls:**
- Skipping can drop important changes; review skipped patches later.
- Skipping too much can leave the series incomplete.

**Why?** move past a failing patch quickly`,keywords:["am","email","gams","patch"]},{name:"gap",command:"git apply",type:"default",description:`Applies a patch without creating a commit.

**Example:** \`git apply fix.patch\`

**Pitfalls:**
- Patch may fail if files changed; try \`--3way\`.
- Applied changes are not committed; remember to commit later.

**Why?** test patch changes before committing`,keywords:["apply","gap","patch"]},{name:"gapt",command:"git apply --3way",type:"default",description:`Applies a patch and tries a three-way merge if needed.

**Example:** \`git apply --3way fix.patch\`

**Pitfalls:**
- It can still conflict; resolve, stage, and commit afterward.
- Three-way merge needs base info; some patches won't support it.

**Why?** apply patches more safely when files changed`,keywords:["3way","apply","gapt","merge","patch","three-way"]},{name:"gbs",command:"git bisect",type:"show",description:`Starts and manages a bisect session to find a bad commit.

**Example:** \`git bisect start\`

**Pitfalls:**
- You must mark one good and one bad commit to proceed.
- Stop bisect with \`git bisect reset\` to return to normal.

**Why?** pinpoint regressions quickly`,keywords:["bisect","bug","gbs","regression","search"]},{name:"gbsb",command:"git bisect bad",type:"default",description:`Marks the current commit as bad during bisect.

**Example:** \`git bisect bad\`

**Pitfalls:**
- Make sure you tested this commit; wrong marks give wrong results.
- You must be on the commit you tested; do not mark from another branch.

**Why?** drive the bisect search correctly`,keywords:["bad","bisect","bug","gbsb","regression","search"]},{name:"gbsg",command:"git bisect good",type:"default",description:`Marks the current commit as good during bisect.

**Example:** \`git bisect good\`

**Pitfalls:**
- Make sure you tested this commit; wrong marks give wrong results.
- You must be on the commit you tested; do not mark from another branch.

**Why?** drive the bisect search correctly`,keywords:["bisect","bug","gbsg","good","regression","search"]},{name:"gbsr",command:"git bisect reset",type:"delete",description:`Ends the bisect session and returns to your original branch.

**Example:** \`git bisect reset\`

**Pitfalls:**
- Save or stash any edits made during bisect before resetting.
- If you skip reset, you stay in detached HEAD mode.

**Why?** exit bisect cleanly`,keywords:["bisect","bug","end","gbsr","regression","reset","search","stop"]},{name:"gbss",command:"git bisect start",type:"default",description:`Starts a new bisect session.

**Example:** \`git bisect start\`

**Pitfalls:**
- You must mark at least one good and one bad commit to proceed.
- Remember to run \`git bisect reset\` when finished.

**Why?** begin finding the first bad commit`,keywords:["bisect","bug","gbss","regression","search","start"]},{name:"gbl",command:"git blame -b -w",type:"show",description:`Shows who last changed each line in a file.

**Example:** \`git blame src/app.ts\`

**Pitfalls:**
- Blame lacks context; review related commits before deciding.
- Large files can be slow; limit to specific files.

**Why?** trace code history per line`,keywords:["annotate","author","blame","gbl","line"]},{name:"gb",command:"git branch",type:"show",description:`Lists local branches and shows the current branch.

**Example:** \`git branch\`

**Pitfalls:**
- It does not show remote branches; use \`git branch -a\`.
- If the list looks stale, run \`git fetch --prune\`.

**Why?** see your branch landscape at a glance`,keywords:["branch","branches","create","delete","gb","list"]},{name:"gbda",command:'git branch --no-color --merged | command grep -vE "^([+*]|\\s*($(git_main_branch)|$(git_develop_branch))\\s*$)" | command xargs git branch -d 2>/dev/null',type:"delete",description:`Deletes merged local branches (excluding main/develop).

**Example:** \`git branch --merged | grep -v "main" | xargs git branch -d\`

**Pitfalls:**
- If your main/develop names differ, review the branch list first.
- Only merged branches are removed; unmerged work remains.

**Why?** bulk cleanup after merging feature branches`,keywords:["branch","branches","cleanup","delete","gbda","gone","upstream"]},{name:"gbnm",command:"git branch --no-merged",type:"show",description:`Lists branches not yet merged into the current branch.

**Example:** \`git branch --no-merged\`

**Pitfalls:**
- Results depend on your current branch; check out the right base first.
- Remote branch info can be stale; run \`git fetch --prune\`.

**Why?** spot branches that still need merging`,keywords:["branch","branches","create","delete","gbnm","list","unmerged"]},{name:"gbr",command:"git branch --remote",type:"show",description:`Lists remote-tracking branches only.

**Example:** \`git branch --remote\`

**Pitfalls:**
- You cannot commit to these directly; create a local branch first.
- Run \`git fetch\` to update the list of remote branches.

**Why?** see what exists on the server`,keywords:["branch","branches","create","delete","gbr","list","remote"]},{name:"gba",command:"git branch -a",type:"show",description:`Lists local and remote-tracking branches.

**Example:** \`git branch -a\`

**Pitfalls:**
- Remote names are pointers; they are not local branches.
- Stale remotes remain until \`git fetch --prune\`.

**Why?** find branches on the server without switching`,keywords:["branch","branches","create","delete","gba","list"]},{name:"gbd",command:"git branch -d",type:"delete",description:`Deletes a local branch if it is fully merged.

**Example:** \`git branch -d feature/old\`

**Pitfalls:**
- If not merged, Git will refuse; use \`-D\` only after checking.
- Deleting the wrong branch can lose work; verify the name.

**Why?** clean up local branches after merging`,keywords:["branch","branches","create","delete","gbd","list"]},{name:"gbD",command:"git branch -D",type:"delete",description:`Force-deletes a local branch even if unmerged.

**Example:** \`git branch -D feature/old\`

**Pitfalls:**
- You can lose unmerged commits; back them up first.
- Double-check the branch name to avoid deleting the wrong one.

**Why?** remove abandoned branches quickly`,keywords:["branch","branches","create","delete","gbd","list"]},{name:"gco",command:"git checkout",type:"default",description:`Switches to another branch.

**Example:** \`git checkout main\`

**Pitfalls:**
- Uncommitted changes can block switching; stash or commit first.
- Switching to the wrong branch can misplace work; verify the name.

**Why?** move between tasks safely`,keywords:["branch","checkout","gco","switch"]},{name:"gcor",command:"git checkout --recurse-submodules",type:"default",description:`Switches branches and updates submodules to match.

**Example:** \`git checkout --recurse-submodules main\`

**Pitfalls:**
- Uncommitted changes can block switching; stash or commit first.
- Submodule updates can be slow; ensure you have access.

**Why?** keep submodules aligned when switching branches`,keywords:["branch","checkout","gcor","switch"]},{name:"gcb",command:"git checkout -b",type:"default",description:`Creates a new branch and switches to it.

**Example:** \`git checkout -b feature/login\`

**Pitfalls:**
- Uncommitted changes can block switching; stash or commit first.
- Branch names should be descriptive; avoid spaces.

**Why?** start new work without affecting main`,keywords:["branch","checkout","create","gcb","new","switch"]},{name:"gcd",command:"git checkout $(git config gitflow.branch.develop)",type:"default",description:`Switches to the Git Flow develop branch from your config.

**Example:** \`git checkout develop\`

**Pitfalls:**
- If Git Flow is not configured, this will fail; run \`git flow init\`.
- The develop branch may not exist locally; run \`git branch -a\`.

**Why?** jump to your integration branch quickly`,keywords:["branch","checkout","config","configure","gcd","settings","switch"]},{name:"gch",command:"git checkout $(git config gitflow.prefix.hotfix)",type:"default",description:`Switches to a Git Flow hotfix branch name from your config.

**Example:** \`git checkout hotfix/1.2.1\`

**Pitfalls:**
- If the branch does not exist, create it with \`git checkout -b\`.
- Git Flow config must be set; run \`git flow init\` if needed.

**Why?** move to hotfix work quickly`,keywords:["branch","checkout","config","configure","gch","settings","switch"]},{name:"gcr",command:"git checkout $(git config gitflow.prefix.release)",type:"default",description:`Switches to a Git Flow release branch name from your config.

**Example:** \`git checkout release/1.2.0\`

**Pitfalls:**
- If the branch does not exist, create it with \`git checkout -b\`.
- Git Flow config must be set; run \`git flow init\` if needed.

**Why?** jump to release work quickly`,keywords:["branch","checkout","config","configure","gcr","settings","switch"]},{name:"gcm",command:"git checkout $(git_main_branch)",type:"default",description:`Switches to another branch.

**Example:** \`git checkout main\`

**Pitfalls:**
- Uncommitted changes can block switching; stash or commit first.
- Switching to the wrong branch can misplace work; verify the name.

**Why?** move between tasks safely`,keywords:["branch","checkout","gcm","switch"]},{name:"gcp",command:"git cherry-pick",type:"default",description:`Copies a specific commit onto your current branch.

**Example:** \`git cherry-pick a1b2c3d\`

**Pitfalls:**
- Picking commits out of order can break builds; include dependencies.
- Conflicts need resolution and staging before continue.

**Why?** move targeted fixes without merging branches`,keywords:["cherry-pick","commit","gcp","pick"]},{name:"gcpa",command:"git cherry-pick --abort",type:"delete",description:`Aborts an in-progress cherry-pick and restores the previous state.

**Example:** \`git cherry-pick --abort\`

**Pitfalls:**
- Manual conflict edits will be discarded; save changes if needed.
- If no cherry-pick is in progress, this will fail.

**Why?** safely exit a bad cherry-pick`,keywords:["cherry-pick","commit","gcpa","pick"]},{name:"gcpc",command:"git cherry-pick --continue",type:"default",description:`Continues a cherry-pick after resolving conflicts.

**Example:** \`git cherry-pick --continue\`

**Pitfalls:**
- You must stage resolved files before continuing.
- Unresolved conflicts will block progress; resolve all files first.

**Why?** complete the cherry-pick cleanly`,keywords:["cherry-pick","commit","gcpc","pick"]},{name:"gclean",command:"git clean -id",type:"delete",description:`Deletes untracked files and folders.

**Example:** \`git clean -id\`

**Pitfalls:**
- This can remove important local files; preview with \`git clean -nd\`.
- It does not remove tracked files; use \`git reset\` for those.

**Why?** reset cluttered working directories`,keywords:["clean","gclean","remove","untracked","wipe"]},{name:"gcl",command:"git clone --recurse-submodules",type:"default",description:`Clones a repo and initializes its submodules.

**Example:** \`git clone --recurse-submodules https://github.com/org/repo.git\`

**Pitfalls:**
- Submodules can still be outdated; run \`git submodule update --init --recursive\` if needed.
- Auth failures stop the clone; use the correct HTTPS/SSH URL.

**Why?** get all nested dependencies in one step`,keywords:["clone","download","gcl","recursive","repo","repository","submodule","submodules"]},{name:"gcam",command:"git commit -a -m",type:"default",description:`Creates a commit from staged changes.

**Example:** \`git commit -a -m "Fix bug"\`

**Pitfalls:**
- Apostrophes can break the message; use \`\\'\` or open the editor instead.
- Forgot \`git add\`? You will create an empty commit or omit files.

**Why?** save progress with a clear message`,keywords:["all","cmsg","commit","commits","gcam","message","msg","save","snapshot","tracked"]},{name:"gcas",command:"git commit -a -s",type:"default",keywords:["commit","commits","signoff","sign-off","dco","signed-off-by","s","-s","all","tracked","message"],description:'Commit all tracked changes and add a DCO sign-off line (`Signed-off-by:`).\n\n**Example:** `git commit -a -s`\n\n**Pitfalls:**\n- `-a` skips new files; run `git add <file>` first.\n- Wrong name/email in the sign-off: set `git config user.name "Your Name"` and `git config user.email "you@example.com"`.\n\n**Why?** Some projects require DCO sign-offs on every commit.'},{name:"gcasm",command:"git commit -a -s -m",type:"default",keywords:["commit","commits","message","msg","cmsg","signoff","sign-off","dco","signed-off-by","s","-s","all","tracked"],description:'Commit all tracked changes with a message, and add a DCO sign-off line.\n\n**Example:** `git commit -a -s -m "Fix lint errors"`\n\n**Pitfalls:**\n- Quote issues in `-m` (like `Don\'t`): use double quotes or your editor.\n- `-a` can commit more than you intended; check `git status` / `git diff` first.\n\n**Why?** Fast, compliant commits (message + sign-off) for DCO repos.'},{name:"gcmsg",command:"git commit -m",type:"default",description:`Creates a commit from staged changes.

**Example:** \`git commit -m "Fix bug"\`

**Pitfalls:**
- Apostrophes can break the message; use \`\\'\` or open the editor instead.
- Forgot \`git add\`? You will create an empty commit or omit files.

**Why?** save progress with a clear message`,keywords:["cmsg","commit","commits","gcmsg","message","msg","save","snapshot"]},{name:"gcs",command:"git commit -S",type:"default",description:`Creates a commit from staged changes.

**Example:** \`git commit -S -m "Fix bug"\`

**Pitfalls:**
- Apostrophes can break the message; use \`\\'\` or open the editor instead.
- Forgot \`git add\`? You will create an empty commit or omit files.

**Why?** save progress with a clear message`,keywords:["commit","commits","dco","gcs","gpg","save","sign","signed","signoff","snapshot"]},{name:"gcsm",command:"git commit -s -m",type:"default",keywords:["commit","commits","message","msg","cmsg","signoff","sign-off","dco","signed-off-by","s","-s","staged","index"],description:'Commit staged changes with a message, and add a DCO sign-off line.\n\n**Example:** `git commit -s -m "Add README"`\n\n**Pitfalls:**\n- Nothing to commit: stage first (`git add .`) and re-run.\n- Wrong sign-off identity: fix `user.name` / `user.email` in git config.\n\n**Why?** Keeps history clean and meets \u201Csign-off required\u201D contribution rules.'},{name:"gcss",command:"git commit -S -s",type:"default",keywords:["commit","commits","sign","signing","gpg","pgp","verify","verified","dco","signoff","sign-off","signed-off-by","S","-S","s","-s"],description:"Commit (from staged changes) with GPG signing (`-S`) and a DCO sign-off line (`-s`).\n\n**Example:** `git commit -S -s`\n\n**Pitfalls:**\n- `gpg failed to sign`: set up a signing key (`git config user.signingkey <keyid>`) or drop `-S`.\n- Still need staging: run `git add <file>` first if \u201Cnothing to commit\u201D.\n\n**Why?** Produces \u201CVerified\u201D commits plus DCO sign-off when a project requires both."},{name:"gcssm",command:"git commit -S -s -m",type:"default",description:`Creates a commit from staged changes.

**Example:** \`git commit -m "Fix bug"\`

**Pitfalls:**
- Apostrophes can break the message; use \`\\'\` or open the editor instead.
- Forgot \`git add\`? You will create an empty commit or omit files.

**Why?** save progress with a clear message`,keywords:["cmsg","commit","commits","dco","gcssm","gpg","message","msg","save","sign","signed","signoff","snapshot"]},{name:"gc",command:"git commit -v",type:"default",description:`Creates a commit from staged changes.

**Example:** \`git commit\`

**Pitfalls:**
- Apostrophes can break the message; use \`\\'\` or open the editor instead.
- Forgot \`git add\`? You will create an empty commit or omit files.

**Why?** save progress with a clear message`,keywords:["commit","commits","gc","save","snapshot"]},{name:"gc!",command:"git commit -v --amend",type:"default",description:`Rewrites the most recent commit with new staged changes.

**Example:** \`git commit --amend -m "Fix bug"\`

**Pitfalls:**
- Amending a pushed commit rewrites history; avoid on shared branches.
- If nothing is staged, amend changes only the message; stage files first.

**Why?** fix the last commit before sharing`,keywords:["amend","commit","commits","edit","gc!","rewrite","save","snapshot"]},{name:"gcn",command:"git commit -v --no-edit",type:"default",description:`Creates a commit from staged changes.

**Example:** \`git commit\`

**Pitfalls:**
- Apostrophes can break the message; use \`\\'\` or open the editor instead.
- Forgot \`git add\`? You will create an empty commit or omit files.

**Why?** save progress with a clear message`,keywords:["commit","commits","gcn","save","snapshot"]},{name:"gcn!",command:"git commit -v --no-edit --amend",type:"default",description:`Rewrites the most recent commit with new staged changes.

**Example:** \`git commit --amend --no-edit\`

**Pitfalls:**
- Amending a pushed commit rewrites history; avoid on shared branches.
- If nothing is staged, amend changes only the message; stage files first.

**Why?** fix the last commit before sharing`,keywords:["amend","commit","commits","edit","gcn!","rewrite","save","snapshot"]},{name:"gca",command:"git commit -v -a",type:"default",description:`Creates a commit from staged changes.

**Example:** \`git commit\`

**Pitfalls:**
- Apostrophes can break the message; use \`\\'\` or open the editor instead.
- Forgot \`git add\`? You will create an empty commit or omit files.

**Why?** save progress with a clear message`,keywords:["all","commit","commits","gca","save","snapshot","tracked"]},{name:"gca!",command:"git commit -v -a --amend",type:"default",description:`Rewrites the most recent commit with new staged changes.

**Example:** \`git commit --amend -m "Fix bug"\`

**Pitfalls:**
- Amending a pushed commit rewrites history; avoid on shared branches.
- If nothing is staged, amend changes only the message; stage files first.

**Why?** fix the last commit before sharing`,keywords:["all","amend","commit","commits","edit","gca!","rewrite","save","snapshot","tracked"]},{name:"gcan!",command:"git commit -v -a --no-edit --amend",type:"default",description:`Rewrites the most recent commit with new staged changes.

**Example:** \`git commit --amend --no-edit\`

**Pitfalls:**
- Amending a pushed commit rewrites history; avoid on shared branches.
- If nothing is staged, amend changes only the message; stage files first.

**Why?** fix the last commit before sharing`,keywords:["all","amend","commit","commits","edit","gcan!","rewrite","save","snapshot","tracked"]},{name:"gcans!",command:"git commit -v -a -s --no-edit --amend",type:"default",description:`Rewrites the most recent commit with new staged changes.

**Example:** \`git commit --amend --no-edit\`

**Pitfalls:**
- Amending a pushed commit rewrites history; avoid on shared branches.
- If nothing is staged, amend changes only the message; stage files first.

**Why?** fix the last commit before sharing`,keywords:["all","amend","commit","commits","dco","edit","gcans!","rewrite","save","signoff","snapshot","tracked"]},{name:"gcf",command:"git config --list",type:"show",description:`Shows Git configuration values and their sources.

**Example:** \`git config --list\`

**Pitfalls:**
- Local and global configs can conflict; check \`--show-origin\`.
- Typos in config keys silently do nothing; verify spelling.

**Why?** debug identity, editor, and signing issues`,keywords:["config","configure","gcf","settings"]},{name:"gd",command:"git diff",type:"show",description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,keywords:["changes","compare","diff","gd","patch"]},{name:"gdca",command:"git diff --cached",type:"show",description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff --staged\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,keywords:["cached","changes","compare","diff","gdca","patch","staged"]},{name:"gdcw",command:"git diff --cached --word-diff",type:"show",description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff --staged\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,keywords:["cached","changes","compare","diff","gdcw","patch","staged","text","word"]},{name:"gds",command:"git diff --staged",type:"show",description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff --staged\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,keywords:["cached","changes","compare","diff","gds","patch","staged"]},{name:"gdw",command:"git diff --word-diff",type:"show",description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff --word-diff\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,keywords:["changes","compare","diff","gdw","patch","text","word"]},{name:"gdup",command:"git diff @{upstream}",type:"show",description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,keywords:["changes","compare","diff","gdup","patch"]},{name:"gdt",command:"git diff-tree --no-commit-id --name-only -r",type:"show",description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,keywords:["changes","compare","diff","diff-tree","gdt","patch"]},{name:"gf",command:"git fetch",type:"default",description:`Downloads updates from remotes without merging.

**Example:** \`git fetch origin\`

**Pitfalls:**
- Fetch does not update your working branch; merge or rebase after.
- Stale remote branches can mislead; use \`--prune\` if needed.

**Why?** inspect remote changes safely`,keywords:["download","fetch","gf","update"]},{name:"gfo",command:"git fetch origin",type:"default",description:`Downloads updates from remotes without merging.

**Example:** \`git fetch origin\`

**Pitfalls:**
- Fetch does not update your working branch; merge or rebase after.
- Stale remote branches can mislead; use \`--prune\` if needed.

**Why?** inspect remote changes safely`,keywords:["download","fetch","gfo","update"]},{name:"gfl",command:"git flow",type:"show",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gfl","gitflow","hotfix","release"]},{name:"gflf",command:"git flow feature",type:"show",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow feature\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflf","gitflow","hotfix","release"]},{name:"gflff",command:"git flow feature finish",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow feature finish\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflff","gitflow","hotfix","release"]},{name:"gflffc",command:"git flow feature finish ${$(git_current_branch)#feature/}",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow feature finish \${$(git_current_branch)#feature/}\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflffc","gitflow","hotfix","release"]},{name:"gflfp",command:"git flow feature publish",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow feature publish\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflfp","gitflow","hotfix","release"]},{name:"gflfpc",command:"git flow feature publish ${$(git_current_branch)#feature/}",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow feature publish \${$(git_current_branch)#feature/}\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflfpc","gitflow","hotfix","release"]},{name:"gflfpll",command:"git flow feature pull",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow feature pull\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","fetch","flow","gflfpll","gitflow","hotfix","pull","release","sync","update"]},{name:"gflfs",command:"git flow feature start",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow feature start\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflfs","gitflow","hotfix","release"]},{name:"gflh",command:"git flow hotfix",type:"show",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow hotfix\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflh","gitflow","hotfix","release"]},{name:"gflhf",command:"git flow hotfix finish",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow hotfix finish\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflhf","gitflow","hotfix","release"]},{name:"gflhfc",command:"git flow hotfix finish ${$(git_current_branch)#hotfix/}",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow hotfix finish \${$(git_current_branch)#hotfix/}\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflhfc","gitflow","hotfix","release"]},{name:"gflhp",command:"git flow hotfix publish",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow hotfix publish\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflhp","gitflow","hotfix","release"]},{name:"gflhpc",command:"git flow hotfix publish ${$(git_current_branch)#hotfix/}",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow hotfix publish \${$(git_current_branch)#hotfix/}\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflhpc","gitflow","hotfix","release"]},{name:"gflhs",command:"git flow hotfix start",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow hotfix start\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflhs","gitflow","hotfix","release"]},{name:"gfli",command:"git flow init",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow init\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gfli","gitflow","hotfix","release"]},{name:"gflr",command:"git flow release",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow release\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflr","gitflow","hotfix","release"]},{name:"gflrf",command:"git flow release finish",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow release finish\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflrf","gitflow","hotfix","release"]},{name:"gflrfc",command:"git flow release finish ${$(git_current_branch)#release/}",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow release finish \${$(git_current_branch)#release/}\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflrfc","gitflow","hotfix","release"]},{name:"gflrp",command:"git flow release publish",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow release publish\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflrp","gitflow","hotfix","release"]},{name:"gflrpc",command:"git flow release publish ${$(git_current_branch)#release/}",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow release publish \${$(git_current_branch)#release/}\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflrpc","gitflow","hotfix","release"]},{name:"gflrs",command:"git flow release start",type:"default",description:`Runs Git Flow helpers for feature/release/hotfix branches.

**Example:** \`git flow release start\`

**Pitfalls:**
- Git Flow may not match your team workflow; confirm first.
- Missing config can break flow commands; run \`git flow init\`.

**Why?** structured branching for release-driven teams`,keywords:["feature","flow","gflrs","gitflow","hotfix","release"]},{name:"gg",command:"git gui citool",type:"default",description:`Opens a graphical commit tool.

**Example:** \`git gui citool\`

**Pitfalls:**
- GUI tools may not be installed; use CLI instead.
- Amending commits in GUI can still rewrite history; be careful.

**Why?** visual staging for beginners`,keywords:["gg","gui","visual"]},{name:"gga",command:"git gui citool --amend",type:"default",description:`Opens a graphical commit tool.

**Example:** \`git gui citool\`

**Pitfalls:**
- GUI tools may not be installed; use CLI instead.
- Amending commits in GUI can still rewrite history; be careful.

**Why?** visual staging for beginners`,keywords:["gga","gui","visual"]},{name:"ghh",command:"git help",type:"show",description:`Opens Git documentation for commands and options.

**Example:** \`git help commit\`

**Pitfalls:**
- Man pages are long; use search to find flags.
- Different Git versions vary slightly; check your local docs.

**Why?** most reliable source of Git behavior`,keywords:["docs","ghh","help","manual"]},{name:"glgg",command:"git log --graph",type:"show",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,keywords:["commits","glgg","graph","history","log"]},{name:"glgga",command:"git log --graph --decorate --all",type:"show",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,keywords:["commits","glgga","graph","history","log"]},{name:"glo",command:"git log --oneline --decorate",type:"show",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,keywords:["commits","glo","graph","history","log"]},{name:"glog",command:"git log --oneline --decorate --graph",type:"show",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,keywords:["commits","glog","graph","history","log"]},{name:"gloga",command:"git log --oneline --decorate --graph --all",type:"show",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,keywords:["commits","gloga","graph","history","log"]},{name:"glg",command:"git log --stat",type:"show",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,keywords:["commits","glg","graph","history","log"]},{name:"glgp",command:"git log --stat -p",type:"show",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,keywords:["commits","glgp","graph","history","log"]},{name:"gunwip",command:'git log -n 1 | grep -q -c "\\--wip--" && git reset HEAD~1',type:"show",description:`Removes the most recent WIP commit if it is labeled --wip--.

**Example:** \`git log -n 1 | grep -q -c "--wip--" && git reset HEAD~1\`

**Pitfalls:**
- If the last commit is not WIP, nothing happens; verify with \`git log\`.
- Undoing a pushed WIP rewrites history; avoid on shared branches.

**Why?** clean up temporary commits safely`,keywords:["commit","gunwip","remove","reset","undo","unwip","wip"]},{name:"gignored",command:'git ls-files -v | grep "^[[:lower:]]"',type:"show",description:`Lists tracked files marked as assume-unchanged.

**Example:** \`git ls-files -v | grep "^[[:lower:]]"\`

**Pitfalls:**
- These flags are local only; teammates will still see changes.
- Clear with \`git update-index --no-assume-unchanged <file>\` when done.

**Why?** find files you hid from local status`,keywords:["assume-unchanged","gignored","hidden","ignored","ls-files","tracked"]},{name:"gfg",command:"git ls-files | grep",type:"show",description:`Finds tracked files whose paths match a pattern.

**Example:** \`git ls-files | grep "\\.test\\."\`

**Pitfalls:**
- Search is case-sensitive; add \`-i\` if needed.
- Untracked files will not appear; add them or search with \`rg\`.

**Why?** quickly locate files by name`,keywords:["files","filter","find","gfg","grep","search"]},{name:"gm",command:"git merge",type:"default",description:`Combines another branch into your current branch.

**Example:** \`git merge feature/login\`

**Pitfalls:**
- Merging the wrong branch causes confusion; verify branch names.
- Conflicts need careful resolution; use a mergetool if available.

**Why?** integrate completed work`,keywords:["combine","gm","integrate","merge"]},{name:"gma",command:"git merge --abort",type:"delete",description:`Aborts a merge and returns to the pre-merge state.

**Example:** \`git merge --abort\`

**Pitfalls:**
- Any manual conflict edits are discarded; save changes elsewhere first.
- If you are not in a merge, this will fail; check \`git status\`.

**Why?** safely exit a bad merge`,keywords:["combine","gma","integrate","merge"]},{name:"gmom",command:"git merge origin/$(git_main_branch)",type:"default",description:`Combines another branch into your current branch.

**Example:** \`git merge feature/login\`

**Pitfalls:**
- Merging the wrong branch causes confusion; verify branch names.
- Conflicts need careful resolution; use a mergetool if available.

**Why?** integrate completed work`,keywords:["combine","gmom","integrate","merge"]},{name:"gmum",command:"git merge upstream/$(git_main_branch)",type:"default",description:`Combines another branch into your current branch.

**Example:** \`git merge feature/login\`

**Pitfalls:**
- Merging the wrong branch causes confusion; verify branch names.
- Conflicts need careful resolution; use a mergetool if available.

**Why?** integrate completed work`,keywords:["combine","gmum","integrate","merge"]},{name:"gmtl",command:"git mergetool --no-prompt",type:"default",description:`Opens your merge tool to resolve conflicts.

**Example:** \`git mergetool --no-prompt\`

**Pitfalls:**
- Mergetool must be configured; set \`git config merge.tool <tool>\`.
- Incorrect conflict resolution can break builds; run tests after.

**Why?** resolve conflicts with fewer mistakes`,keywords:["gmtl","mergetool"]},{name:"gl",command:"git pull",type:"default",description:`Fetches and merges remote changes into your current branch.

**Example:** \`git pull origin main\`

**Pitfalls:**
- Pulling on the wrong branch causes messy merges; check branch first.
- If you have local changes, pull may fail; stash or commit first.

**Why?** quickly sync with teammates`,keywords:["fetch","gl","pull","sync","update"]},{name:"gpr",command:"git pull --rebase",type:"default",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,keywords:["fetch","gpr","linear","pull","rebase","sync","update"]},{name:"gup",command:"git pull --rebase",type:"default",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,keywords:["fetch","gup","linear","pull","rebase","sync","update"]},{name:"gupa",command:"git pull --rebase --autostash",type:"default",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,keywords:["fetch","gupa","linear","pull","rebase","sync","update"]},{name:"gupav",command:"git pull --rebase --autostash -v",type:"default",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,keywords:["fetch","gupav","linear","pull","rebase","sync","update"]},{name:"gupv",command:"git pull --rebase -v",type:"default",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,keywords:["fetch","gupv","linear","pull","rebase","sync","update"]},{name:"gupom",command:"git pull --rebase origin $(git_main_branch)",type:"default",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,keywords:["fetch","gupom","linear","pull","rebase","sync","update"]},{name:"ggpull",command:'git pull origin "$(git_current_branch)"',type:"default",description:`Fetches and merges remote changes into your current branch.

**Example:** \`git pull origin main\`

**Pitfalls:**
- Pulling on the wrong branch causes messy merges; check branch first.
- If you have local changes, pull may fail; stash or commit first.

**Why?** quickly sync with teammates`,keywords:["fetch","ggpull","pull","sync","update"]},{name:"gluc",command:"git pull upstream $(git_current_branch)",type:"default",description:`Fetches and merges remote changes into your current branch.

**Example:** \`git pull origin main\`

**Pitfalls:**
- Pulling on the wrong branch causes messy merges; check branch first.
- If you have local changes, pull may fail; stash or commit first.

**Why?** quickly sync with teammates`,keywords:["fetch","gluc","pull","sync","update"]},{name:"glum",command:"git pull upstream $(git_main_branch)",type:"default",description:`Fetches and merges remote changes into your current branch.

**Example:** \`git pull origin main\`

**Pitfalls:**
- Pulling on the wrong branch causes messy merges; check branch first.
- If you have local changes, pull may fail; stash or commit first.

**Why?** quickly sync with teammates`,keywords:["fetch","glum","pull","sync","update"]},{name:"gp",command:"git push",type:"default",description:`Uploads your local commits to the remote branch.

**Example:** \`git push origin feature/login\`

**Pitfalls:**
- Pushing from the wrong branch is common; check \`git status\` first.
- First push may require \`-u\` to set upstream tracking.

**Why?** share work with teammates and CI`,keywords:["gp","publish","push","remote","upload"]},{name:"gpd",command:"git push --dry-run",type:"default",description:`Shows what would be pushed without changing the remote.

**Example:** \`git push --dry-run origin main\`

**Pitfalls:**
- Dry-run can go stale quickly if the remote changes; push soon after.
- Dry-run does not test permissions fully; real push can still fail.

**Why?** safe preview before an important push`,keywords:["dry-run","gpd","preview","publish","push","remote","upload"]},{name:"gpf!",command:"git push --force",type:"default",description:`Force-pushes local history to the remote branch.

**Example:** \`git push --force origin feature/login\`

**Pitfalls:**
- This can overwrite others' work; prefer \`--force-with-lease\`.
- Force pushes on shared branches can break CI and reviews.

**Why?** update remote after rewriting history`,keywords:["force","gpf!","publish","push","remote","rewrite","upload"]},{name:"gpf",command:"git push --force-with-lease",type:"default",description:`Force-pushes local history to the remote branch.

**Example:** \`git push --force-with-lease origin feature/login\`

**Pitfalls:**
- This can overwrite others' work; prefer \`--force-with-lease\`.
- Force pushes on shared branches can break CI and reviews.

**Why?** update remote after rewriting history`,keywords:["force-with-lease","gpf","lease","publish","push","remote","rewrite","upload"]},{name:"gpsup",command:"git push --set-upstream origin $(git_current_branch)",type:"default",description:`Pushes a branch and sets its upstream tracking branch.

**Example:** \`git push -u origin feature/login\`

**Pitfalls:**
- Wrong upstream links future pulls to the wrong branch; verify names.
- If the remote branch already exists, this may not set tracking as expected.

**Why?** one-time setup for simpler future pushes`,keywords:["gpsup","publish","push","remote","set-upstream","track","upload","upstream"]},{name:"gpv",command:"git push -v",type:"default",description:`Uploads your local commits to the remote branch.

**Example:** \`git push origin feature/login\`

**Pitfalls:**
- Pushing from the wrong branch is common; check \`git status\` first.
- First push may require \`-u\` to set upstream tracking.

**Why?** share work with teammates and CI`,keywords:["gpv","publish","push","remote","upload"]},{name:"gpoat",command:"git push origin --all && git push origin --tags",type:"default",description:`Pushes all branches and tags to the remote.

**Example:** \`git push origin --all && git push origin --tags\`

**Pitfalls:**
- You might push tags you did not intend; review tags first.
- Pushing all branches can leak local work; push specific branches instead.

**Why?** bulk publish when you intentionally want everything pushed`,keywords:["all","gpoat","publish","push","remote","tags"]},{name:"ggpush",command:'git push origin "$(git_current_branch)"',type:"default",description:`Uploads your local commits to the remote branch.

**Example:** \`git push origin feature/login\`

**Pitfalls:**
- Pushing from the wrong branch is common; check \`git status\` first.
- First push may require \`-u\` to set upstream tracking.

**Why?** share work with teammates and CI`,keywords:["ggpush","publish","push","remote","upload"]},{name:"gpu",command:"git push upstream",type:"default",description:`Uploads your local commits to the remote branch.

**Example:** \`git push origin feature/login\`

**Pitfalls:**
- Pushing from the wrong branch is common; check \`git status\` first.
- First push may require \`-u\` to set upstream tracking.

**Why?** share work with teammates and CI`,keywords:["gpu","publish","push","remote","upload"]},{name:"grb",command:"git rebase",type:"default",description:`Reapplies your commits on top of another base commit.

**Example:** \`git rebase main\`

**Pitfalls:**
- Rebasing shared commits rewrites history; avoid on public branches.
- Conflicts must be resolved and staged before continuing.

**Why?** keep history clean and linear`,keywords:["grb","history","rebase","rewrite"]},{name:"grba",command:"git rebase --abort",type:"delete",description:`Aborts a rebase and returns to the pre-rebase state.

**Example:** \`git rebase --abort\`

**Pitfalls:**
- Any manual conflict edits are discarded; save changes elsewhere first.
- If no rebase is in progress, this will fail; check \`git status\`.

**Why?** safely exit a bad rebase`,keywords:["grba","history","rebase","rewrite"]},{name:"grbc",command:"git rebase --continue",type:"default",description:`Continues a rebase after resolving conflicts.

**Example:** \`git rebase --continue\`

**Pitfalls:**
- You must stage resolved files before continuing.
- Unresolved conflicts will block the rebase; resolve all files first.

**Why?** complete the rebase cleanly`,keywords:["grbc","history","rebase","rewrite"]},{name:"grbo",command:"git rebase --onto",type:"default",description:`Moves a commit range onto a new base commit.

**Example:** \`git rebase --onto main old-base feature/login\`

**Pitfalls:**
- Picking the wrong range can lose work; verify commit list first.
- Advanced command; consider standard rebase if unsure.

**Why?** surgically move commits to a new base`,keywords:["grbo","history","rebase","rewrite"]},{name:"grbs",command:"git rebase --skip",type:"default",description:`Skips the current patch during a rebase.

**Example:** \`git rebase --skip\`

**Pitfalls:**
- Skipping can drop important changes; review skipped commits later.
- Repeated skips may hide deeper conflicts; consider resolving instead.

**Why?** move past a broken commit during rebase`,keywords:["grbs","history","rebase","rewrite"]},{name:"grbi",command:"git rebase -i",type:"default",description:`Starts an interactive rebase to edit, reorder, or squash commits.

**Example:** \`git rebase -i HEAD~3\`

**Pitfalls:**
- Editing pushed commits rewrites history; avoid on shared branches.
- Mistakes in the rebase todo can drop commits; read the instructions carefully.

**Why?** polish history before sharing`,keywords:["edit","grbi","history","interactive","rebase","rewrite","squash"]},{name:"grbd",command:"git rebase $(git_develop_branch)",type:"default",description:`Reapplies your commits on top of another base commit.

**Example:** \`git rebase main\`

**Pitfalls:**
- Rebasing shared commits rewrites history; avoid on public branches.
- Conflicts must be resolved and staged before continuing.

**Why?** keep history clean and linear`,keywords:["grbd","history","rebase","rewrite"]},{name:"grbm",command:"git rebase $(git_main_branch)",type:"default",description:`Reapplies your commits on top of another base commit.

**Example:** \`git rebase main\`

**Pitfalls:**
- Rebasing shared commits rewrites history; avoid on public branches.
- Conflicts must be resolved and staged before continuing.

**Why?** keep history clean and linear`,keywords:["grbm","history","rebase","rewrite"]},{name:"grbom",command:"git rebase origin/$(git_main_branch)",type:"default",description:`Reapplies your commits on top of another base commit.

**Example:** \`git rebase main\`

**Pitfalls:**
- Rebasing shared commits rewrites history; avoid on public branches.
- Conflicts must be resolved and staged before continuing.

**Why?** keep history clean and linear`,keywords:["grbom","history","rebase","rewrite"]},{name:"gr",command:"git remote",type:"default",description:`Shows or edits remote repository connections.

**Example:** \`git remote -v\`

**Pitfalls:**
- Wrong URLs cause auth errors; verify with \`git remote -v\`.
- Removing the wrong remote breaks workflows; double-check names.

**Why?** manage origin/upstream cleanly`,keywords:["gr","origin","remote","upstream","url"]},{name:"grv",command:"git remote -v",type:"show",description:`Shows or edits remote repository connections.

**Example:** \`git remote -v\`

**Pitfalls:**
- Wrong URLs cause auth errors; verify with \`git remote -v\`.
- Removing the wrong remote breaks workflows; double-check names.

**Why?** manage origin/upstream cleanly`,keywords:["grv","origin","remote","upstream","url"]},{name:"gra",command:"git remote add",type:"default",description:`Shows or edits remote repository connections.

**Example:** \`git remote add upstream https://github.com/org/repo.git\`

**Pitfalls:**
- Wrong URLs cause auth errors; verify with \`git remote -v\`.
- Removing the wrong remote breaks workflows; double-check names.

**Why?** manage origin/upstream cleanly`,keywords:["add","files","gra","index","origin","remote","stage","staging","upstream","url"]},{name:"grrm",command:"git remote remove",type:"delete",description:`Shows or edits remote repository connections.

**Example:** \`git remote remove upstream\`

**Pitfalls:**
- Wrong URLs cause auth errors; verify with \`git remote -v\`.
- Removing the wrong remote breaks workflows; double-check names.

**Why?** manage origin/upstream cleanly`,keywords:["delete","grrm","origin","remote","remove","upstream","url"]},{name:"grmv",command:"git remote rename",type:"default",description:`Shows or edits remote repository connections.

**Example:** \`git remote rename origin old-origin\`

**Pitfalls:**
- Wrong URLs cause auth errors; verify with \`git remote -v\`.
- Removing the wrong remote breaks workflows; double-check names.

**Why?** manage origin/upstream cleanly`,keywords:["grmv","origin","remote","rename","upstream","url"]},{name:"grset",command:"git remote set-url",type:"default",description:`Shows or edits remote repository connections.

**Example:** \`git remote set-url origin git@github.com:me/repo.git\`

**Pitfalls:**
- Wrong URLs cause auth errors; verify with \`git remote -v\`.
- Removing the wrong remote breaks workflows; double-check names.

**Why?** manage origin/upstream cleanly`,keywords:["grset","origin","remote","set-url","upstream","url"]},{name:"grup",command:"git remote update",type:"default",description:`Shows or edits remote repository connections.

**Example:** \`git remote update\`

**Pitfalls:**
- Wrong URLs cause auth errors; verify with \`git remote -v\`.
- Removing the wrong remote breaks workflows; double-check names.

**Why?** manage origin/upstream cleanly`,keywords:["grup","origin","remote","update","upstream","url"]},{name:"grh",command:"git reset",type:"delete",description:`Moves HEAD and/or the index without deleting working files.

**Example:** \`git reset --mixed HEAD~1\`

**Pitfalls:**
- Using \`--hard\` by mistake is destructive; double-check flags.
- Resetting can unstage work; verify with \`git status\` afterward.

**Why?** fix staging or recent commit mistakes`,keywords:["grh","reset","rollback","undo","unstage"]},{name:"gru",command:"git reset --",type:"delete",description:`Moves HEAD and/or the index without deleting working files.

**Example:** \`git reset -- src/app.ts\`

**Pitfalls:**
- Using \`--hard\` by mistake is destructive; double-check flags.
- Resetting can unstage work; verify with \`git status\` afterward.

**Why?** fix staging or recent commit mistakes`,keywords:["gru","reset","rollback","undo","unstage"]},{name:"grhh",command:"git reset --hard",type:"delete",description:`Resets and discards local changes to match a commit.

**Example:** \`git reset --hard HEAD~1\`

**Pitfalls:**
- This permanently deletes uncommitted work; stash first.
- Running in the wrong repo can destroy work; confirm root.

**Why?** recover from a broken working tree`,keywords:["discard","grhh","hard","reset","rollback","undo","unstage"]},{name:"gpristine",command:"git reset --hard && git clean -dffx",type:"delete",description:`Wipes local changes and untracked files to a clean state.

**Example:** \`git reset --hard && git clean -dffx\`

**Pitfalls:**
- This permanently deletes uncommitted work; stash or commit first.
- Running on the wrong repo can be disastrous; confirm repo root.

**Why?** recover from a broken or messy working tree`,keywords:["clean","discard","gpristine","hard","reset","untracked","wipe"]},{name:"groh",command:"git reset origin/$(git_current_branch) --hard",type:"delete",description:`Resets and discards local changes to match a commit.

**Example:** \`git reset --hard origin/main\`

**Pitfalls:**
- This permanently deletes uncommitted work; stash first.
- Running in the wrong repo can destroy work; confirm root.

**Why?** recover from a broken working tree`,keywords:["discard","groh","hard","reset","rollback","undo","unstage"]},{name:"grs",command:"git restore",type:"default",description:`Restores files from a commit or unstages them.

**Example:** \`git restore src/app.ts\`

**Pitfalls:**
- Restoring discards local edits; check \`git diff\` first.
- Using \`--staged\` only unstages; it does not change file content.

**Why?** undo safely with modern commands`,keywords:["discard","grs","restore","undo","unstage"]},{name:"grss",command:"git restore --source",type:"default",description:`Restores files from a commit or unstages them.

**Example:** \`git restore --source=HEAD~1 src/app.ts\`

**Pitfalls:**
- Restoring discards local edits; check \`git diff\` first.
- Using \`--staged\` only unstages; it does not change file content.

**Why?** undo safely with modern commands`,keywords:["discard","grss","restore","undo","unstage"]},{name:"grst",command:"git restore --staged",type:"default",description:`Restores files from a commit or unstages them.

**Example:** \`git restore --staged src/app.ts\`

**Pitfalls:**
- Restoring discards local edits; check \`git diff\` first.
- Using \`--staged\` only unstages; it does not change file content.

**Why?** undo safely with modern commands`,keywords:["discard","grst","restore","undo","unstage"]},{name:"grev",command:"git revert",type:"default",description:`Creates a new commit that undoes a previous commit.

**Example:** \`git revert a1b2c3d\`

**Pitfalls:**
- Reverting merge commits requires extra flags; read \`git help revert\`.
- Revert conflicts must be resolved and staged before continuing.

**Why?** undo safely without rewriting history`,keywords:["commit","grev","reverse","revert","undo"]},{name:"grm",command:"git rm",type:"delete",description:`Removes files from Git tracking (and optionally disk).

**Example:** \`git rm src/old-file.ts\`

**Pitfalls:**
- Use \`--cached\` if you want to keep the file locally.
- Remove secrets and add to \`.gitignore\` to prevent re-adding.

**Why?** keep repo clean and secure`,keywords:["delete","grm","remove","rm","untrack"]},{name:"grmc",command:"git rm --cached",type:"delete",description:`Removes files from Git tracking (and optionally disk).

**Example:** \`git rm --cached .env\`

**Pitfalls:**
- Use \`--cached\` if you want to keep the file locally.
- Remove secrets and add to \`.gitignore\` to prevent re-adding.

**Why?** keep repo clean and secure`,keywords:["delete","grmc","remove","rm","untrack"]},{name:"gcount",command:"git shortlog -sn",type:"show",description:`Shows commit counts grouped by author.

**Example:** \`git shortlog -sn\`

**Pitfalls:**
- Different emails can split one author; use \`.mailmap\` to fix.
- Counts may be misleading in rebased histories.

**Why?** quick contributor summary`,keywords:["authors","contributors","gcount","shortlog","stats"]},{name:"gsh",command:"git show",type:"show",description:`Displays details for a commit, tag, or object.

**Example:** \`git show HEAD\`

**Pitfalls:**
- Output can be large; limit to a file path when needed.
- Binary diffs can be noisy; use \`--stat\` to summarize.

**Why?** inspect exact changes quickly`,keywords:["details","gsh","inspect","show"]},{name:"gstall",command:"git stash --all",type:"default",description:`Stashes tracked, untracked, and ignored files.

**Example:** \`git stash --all\`

**Pitfalls:**
- Ignored files will be stashed too; be careful with large build output.
- Restoring can bring back lots of files; apply selectively if needed.

**Why?** pause all local work before switching tasks`,keywords:["gstall","save","shelve","stash","temporary","wip"]},{name:"gstaa",command:"git stash apply",type:"default",description:`Applies a stash without removing it from the stash list.

**Example:** \`git stash apply stash@{0}\`

**Pitfalls:**
- Applying can cause conflicts; resolve and commit afterward.
- You might apply the wrong stash; check \`git stash list\` first.

**Why?** reuse a stash safely`,keywords:["apply","gstaa","patch","save","shelve","stash","temporary","wip"]},{name:"gstc",command:"git stash clear",type:"delete",description:`Deletes all stash entries.

**Example:** \`git stash clear\`

**Pitfalls:**
- This permanently removes all stashes; consider dropping selectively.
- Make sure no stash contains needed work.

**Why?** reset stash list when it is no longer needed`,keywords:["clear","gstc","save","shelve","stash","temporary","wip"]},{name:"gstd",command:"git stash drop",type:"delete",description:`Deletes a specific stash entry.

**Example:** \`git stash drop stash@{0}\`

**Pitfalls:**
- Dropping the wrong stash loses work; verify the id first.
- Dropped stashes are hard to recover; be careful.

**Why?** clean up old stashes`,keywords:["drop","gstd","save","shelve","stash","temporary","wip"]},{name:"gstl",command:"git stash list",type:"show",description:`Lists all stash entries.

**Example:** \`git stash list\`

**Pitfalls:**
- Stash indexes change when dropping entries; copy the exact id.
- Long lists get confusing; use meaningful stash messages.

**Why?** find the right stash to apply`,keywords:["gstl","list","save","shelve","stash","temporary","wip"]},{name:"gstp",command:"git stash pop",type:"default",description:`Applies the latest stash and removes it from the list.

**Example:** \`git stash pop\`

**Pitfalls:**
- Conflicts can occur; resolve them and commit.
- If conflicts happen, the stash may still be dropped; use \`apply\` for safety.

**Why?** quickly resume stashed work`,keywords:["gstp","pop","save","shelve","stash","temporary","wip"]},{name:"gsta",command:"git stash push",type:"default",description:`Temporarily saves local work without committing.

**Example:** \`git stash push -m "WIP"\`

**Pitfalls:**
- Untracked files are skipped unless you use \`-u\`.
- Stashes are easy to forget; name them and list regularly.

**Why?** switch tasks without messy WIP commits`,keywords:["gsta","publish","push","remote","save","shelve","stash","temporary","upload","wip"]},{name:"gsts",command:"git stash show --text",type:"show",description:`Shows the changes stored in a stash.

**Example:** \`git stash show --text stash@{0}\`

**Pitfalls:**
- Output can be brief; add \`-p\` or \`--text\` for full patch.
- Review before applying to avoid surprises.

**Why?** inspect stashed changes safely`,keywords:["details","gsts","inspect","save","shelve","show","stash","temporary","wip"]},{name:"gst",command:"git status",type:"show",description:`Shows what is staged, unstaged, and untracked.

**Example:** \`git status\`

**Pitfalls:**
- Skipping status leads to wrong commits; run it often.
- Short format can be cryptic; use full \`git status\` when unsure.

**Why?** best daily safety check`,keywords:["changes","gst","state","status"]},{name:"gss",command:"git status -s",type:"show",description:`Shows what is staged, unstaged, and untracked.

**Example:** \`git status -s\`

**Pitfalls:**
- Skipping status leads to wrong commits; run it often.
- Short format can be cryptic; use full \`git status\` when unsure.

**Why?** best daily safety check`,keywords:["changes","gss","state","status"]},{name:"gsb",command:"git status -sb",type:"show",description:`Shows what is staged, unstaged, and untracked.

**Example:** \`git status -sb\`

**Pitfalls:**
- Skipping status leads to wrong commits; run it often.
- Short format can be cryptic; use full \`git status\` when unsure.

**Why?** best daily safety check`,keywords:["changes","gsb","state","status"]},{name:"gsi",command:"git submodule init",type:"default",description:`Initializes or updates nested repositories.

**Example:** \`git submodule update --init --recursive\`

**Pitfalls:**
- Forget \`--recursive\` and nested submodules stay empty.
- Submodules require separate commits; remember to update the parent pointer.

**Why?** keep dependency repos aligned`,keywords:["dependencies","gsi","submodule","submodules"]},{name:"gsu",command:"git submodule update",type:"default",description:`Initializes or updates nested repositories.

**Example:** \`git submodule update --init --recursive\`

**Pitfalls:**
- Forget \`--recursive\` and nested submodules stay empty.
- Submodules require separate commits; remember to update the parent pointer.

**Why?** keep dependency repos aligned`,keywords:["dependencies","gsu","submodule","submodules"]},{name:"gsd",command:"git svn dcommit",type:"default",description:`Bridges Git work with an SVN repository.

**Example:** \`git svn dcommit\`

**Pitfalls:**
- SVN replays can rewrite commits; keep branch linear.
- Wrong SVN mappings can publish bad history; verify config.

**Why?** support legacy SVN workflows`,keywords:["gsd","legacy","subversion","svn"]},{name:"git-svn-dcommit-push",command:"git svn dcommit && git push github $(git_main_branch):svntrunk",type:"default",description:`Sends commits to SVN, then mirrors to GitHub.

**Example:** \`git svn dcommit && git push github main:svntrunk\`

**Pitfalls:**
- Wrong branch mapping can publish bad history; verify branch names.
- SVN replays can rewrite commits; keep branch linear.

**Why?** bridge Git work into SVN workflows`,keywords:["dcommit","git-svn-dcommit-push","mirror","push","svn"]},{name:"gsr",command:"git svn rebase",type:"default",description:`Bridges Git work with an SVN repository.

**Example:** \`git svn rebase\`

**Pitfalls:**
- SVN replays can rewrite commits; keep branch linear.
- Wrong SVN mappings can publish bad history; verify config.

**Why?** support legacy SVN workflows`,keywords:["gsr","history","legacy","rebase","rewrite","subversion","svn"]},{name:"gsw",command:"git switch",type:"default",description:`Switches to another branch.

**Example:** \`git switch main\`

**Pitfalls:**
- Uncommitted changes can block switching; stash or commit first.
- Switching to the wrong branch can misplace work; verify the name.

**Why?** move between tasks safely`,keywords:["branch","checkout","gsw","switch"]},{name:"gswc",command:"git switch -c",type:"default",description:`Creates a new branch and switches to it.

**Example:** \`git switch -c feature/login\`

**Pitfalls:**
- Uncommitted changes can block switching; stash or commit first.
- Branch names should be descriptive; avoid spaces.

**Why?** start new work without affecting main`,keywords:["branch","checkout","create","gswc","new","switch"]},{name:"gswd",command:"git switch $(git_develop_branch)",type:"default",description:`Switches to another branch.

**Example:** \`git switch main\`

**Pitfalls:**
- Uncommitted changes can block switching; stash or commit first.
- Switching to the wrong branch can misplace work; verify the name.

**Why?** move between tasks safely`,keywords:["branch","checkout","gswd","switch"]},{name:"gswm",command:"git switch $(git_main_branch)",type:"default",description:`Switches to another branch.

**Example:** \`git switch main\`

**Pitfalls:**
- Uncommitted changes can block switching; stash or commit first.
- Switching to the wrong branch can misplace work; verify the name.

**Why?** move between tasks safely`,keywords:["branch","checkout","gswm","switch"]},{name:"gts",command:"git tag -s",type:"default",description:`Creates or lists tags for releases.

**Example:** \`git tag -s v1.2.0 -m "Release 1.2.0"\`

**Pitfalls:**
- Tagging the wrong commit confuses releases; verify with \`git show <tag>\`.
- Signed tags require GPG setup; configure before tagging.

**Why?** mark release points clearly`,keywords:["gpg","gts","release","sign","signed","tag","tags","version"]},{name:"gtv",command:"git tag | sort -V",type:"show",description:`Creates or lists tags for releases.

**Example:** \`git tag | sort -V\`

**Pitfalls:**
- Tagging the wrong commit confuses releases; verify with \`git show <tag>\`.
- Signed tags require GPG setup; configure before tagging.

**Why?** mark release points clearly`,keywords:["gtv","release","tag","tags","version"]},{name:"gignore",command:"git update-index --assume-unchanged",type:"default",description:`Adjusts low-level tracking for already tracked files.

**Example:** \`git update-index --assume-unchanged\`

**Pitfalls:**
- Easy to forget hidden changes; undo with \`--no-assume-unchanged\`.
- Only affects local repo; teammates still track changes normally.

**Why?** reduce noise from machine-specific files`,keywords:["assume-unchanged","gignore","ignore","update-index"]},{name:"gunignore",command:"git update-index --no-assume-unchanged",type:"default",description:`Adjusts low-level tracking for already tracked files.

**Example:** \`git update-index --no-assume-unchanged\`

**Pitfalls:**
- Easy to forget hidden changes; undo with \`--no-assume-unchanged\`.
- Only affects local repo; teammates still track changes normally.

**Why?** reduce noise from machine-specific files`,keywords:["assume-unchanged","gunignore","ignore","update-index"]},{name:"gwt",command:"git worktree",type:"default",description:`Manages multiple working directories for one repo.

**Example:** \`git worktree list\`

**Pitfalls:**
- You cannot check out the same branch in two worktrees.
- Remove worktrees only after saving work; uncommitted changes can be lost.

**Why?** work on multiple branches in parallel`,keywords:["gwt","multiple","worktree","worktrees"]},{name:"gwta",command:"git worktree add",type:"default",description:`Manages multiple working directories for one repo.

**Example:** \`git worktree add ../repo-hotfix hotfix/login\`

**Pitfalls:**
- You cannot check out the same branch in two worktrees.
- Remove worktrees only after saving work; uncommitted changes can be lost.

**Why?** work on multiple branches in parallel`,keywords:["add","create","files","gwta","index","multiple","stage","staging","worktree","worktrees"]},{name:"gwtls",command:"git worktree list",type:"show",description:`Manages multiple working directories for one repo.

**Example:** \`git worktree list\`

**Pitfalls:**
- You cannot check out the same branch in two worktrees.
- Remove worktrees only after saving work; uncommitted changes can be lost.

**Why?** work on multiple branches in parallel`,keywords:["gwtls","list","multiple","worktree","worktrees"]},{name:"gwtmv",command:"git worktree move",type:"default",description:`Manages multiple working directories for one repo.

**Example:** \`git worktree move ../old-path ../new-path\`

**Pitfalls:**
- You cannot check out the same branch in two worktrees.
- Remove worktrees only after saving work; uncommitted changes can be lost.

**Why?** work on multiple branches in parallel`,keywords:["gwtmv","move","multiple","worktree","worktrees"]},{name:"gwtrm",command:"git worktree remove",type:"delete",description:`Manages multiple working directories for one repo.

**Example:** \`git worktree remove ../repo-hotfix\`

**Pitfalls:**
- You cannot check out the same branch in two worktrees.
- Remove worktrees only after saving work; uncommitted changes can be lost.

**Why?** work on multiple branches in parallel`,keywords:["delete","gwtrm","multiple","remove","worktree","worktrees"]},{name:"gbg",command:'git branch -vv | grep ": gone\\]"',description:`Lists local branches whose upstream is gone on the remote.

**Example:** \`git branch -vv | grep ": gone]"\`

**Pitfalls:**
- This only lists branches; it does not delete anything.
- Upstream may be gone due to a rename; verify before cleanup.

**Why?** find branches that can be cleaned up`,type:"show",keywords:["branch","branches","cleanup","delete","gbg","gone","upstream"]},{name:"gbgD",command:`git branch --no-color -vv | grep ": gone\\]" | awk '{print $1}' | xargs git branch -D`,description:`Force-deletes local branches whose upstream is gone.

**Example:** \`git branch -vv | grep ": gone]" | awk '{print $1}' | xargs git branch -D\`

**Pitfalls:**
- Force delete can lose unmerged commits; verify with \`git log\`.
- If upstream was renamed, you may delete the wrong branch; double-check.

**Why?** remove stale branches quickly`,type:"delete",keywords:["branch","branches","cleanup","delete","gbgd","gone","upstream"]},{name:"gbgd",command:`git branch --no-color -vv | grep ": gone\\]" | awk '{print $1}' | xargs git branch -d`,description:`Deletes local branches whose upstream is gone (safe delete).

**Example:** \`git branch -vv | grep ": gone]" | awk '{print $1}' | xargs git branch -d\`

**Pitfalls:**
- If a branch has unmerged commits, \`-d\` will refuse; inspect first.
- Upstream might be renamed; confirm the correct replacement branch.

**Why?** clean up stale branches safely`,type:"delete",keywords:["branch","branches","cleanup","delete","gbgd","gone","upstream"]},{name:"gdct",command:"git describe --tags $(git rev-list --tags --max-count=1)",description:`Finds the nearest tag name for a commit.

**Example:** \`git describe --tags\`

**Pitfalls:**
- Missing tags give poor results; run \`git fetch --tags\`.
- Describe output can be confusing on shallow clones.

**Why?** useful for build/version strings`,type:"show",keywords:["describe","gdct","tags","version"]},{name:"gfa",command:"git fetch --all --prune --jobs=10",description:`Downloads updates from remotes without merging.

**Example:** \`git fetch --all --prune\`

**Pitfalls:**
- Fetch does not update your working branch; merge or rebase after.
- Stale remote branches can mislead; use \`--prune\` if needed.

**Why?** inspect remote changes safely`,type:"default",keywords:["download","fetch","gfa","update"]},{name:"ggsup",command:"git branch --set-upstream-to=origin/$(git_current_branch)",description:"Sets the upstream tracking branch for your current branch.\n\n**Example:** `git branch --set-upstream-to=origin/feature/login`\n\n**Pitfalls:**\n- Setting the wrong upstream breaks pull/push defaults; verify names.\n- The remote branch must exist; run `git fetch` first.\n\n**Why?** enable simple `git pull` and `git push`",type:"default",keywords:["branch","branches","create","delete","ggsup","list","set-upstream","track","upstream"]},{name:"gk",command:"\\gitk --all --branches &!",description:`Opens GitK, a graphical history viewer.

**Example:** \`gitk --all --branches\`

**Pitfalls:**
- GitK may not be installed; use \`git log --graph\` instead.
- Large repos can make GitK slow; limit history if needed.

**Why?** visualize branches and merges easily`,type:"show",keywords:["gitk","gk","graph","gui","history","visual"]},{name:"gke",command:"\\gitk --all $(git log --walk-reflogs --pretty=%h) &!",description:`Opens GitK, a graphical history viewer.

**Example:** \`gitk --all --branches\`

**Pitfalls:**
- GitK may not be installed; use \`git log --graph\` instead.
- Large repos can make GitK slow; limit history if needed.

**Why?** visualize branches and merges easily`,type:"show",keywords:["gitk","gke","graph","gui","history","visual"]},{name:"glgm",command:"git log --graph --max-count=10",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,type:"show",keywords:["commits","glgm","graph","history","log"]},{name:"glod",command:"git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ad) %C(bold blue)<%an>%Creset'",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,type:"show",keywords:["commits","glod","graph","history","log"]},{name:"glods",command:"git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ad) %C(bold blue)<%an>%Creset' --date=short",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,type:"show",keywords:["commits","glods","graph","history","log"]},{name:"glol",command:"git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ar) %C(bold blue)<%an>%Creset'",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,type:"show",keywords:["commits","glol","graph","history","log"]},{name:"glola",command:"git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ar) %C(bold blue)<%an>%Creset' --all",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,type:"show",keywords:["commits","glola","graph","history","log"]},{name:"glols",command:"git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ar) %C(bold blue)<%an>%Creset' --stat",description:`Shows commit history and branch graph.

**Example:** \`git log --oneline --decorate --graph\`

**Pitfalls:**
- Large output can be noisy; limit with \`--max-count\`.
- You may miss other branches; add \`--all\` if needed.

**Why?** understand history quickly`,type:"show",keywords:["commits","glols","graph","history","log"]},{name:"glp",command:"_git_log_prettily",description:`Shows git log using a helper's pretty format.

**Example:** \`glp\`

**Pitfalls:**
- The helper may not exist outside your shell setup; use \`git log\` then.
- Custom formats can hide details; switch to \`git log -p\` when debugging.

**Why?** read history in a cleaner format`,type:"show",keywords:["format","glp","history","log","pretty"]},{name:"gms",command:"git merge --squash",description:`Brings changes from another branch without creating a merge commit.

**Example:** \`git merge --squash feature/login\`

**Pitfalls:**
- Squash merges lose individual commit history; keep original branch if needed.
- You must commit after squashing; it does not auto-commit.

**Why?** keep history simpler for small features`,type:"default",keywords:["combine","gms","integrate","merge","squash"]},{name:"gmtlvim",command:"git mergetool --no-prompt --tool=vimdiff",description:`Opens your merge tool to resolve conflicts.

**Example:** \`git mergetool --no-prompt\`

**Pitfalls:**
- Mergetool must be configured; set \`git config merge.tool <tool>\`.
- Incorrect conflict resolution can break builds; run tests after.

**Why?** resolve conflicts with fewer mistakes`,type:"default",keywords:["gmtlvim","mergetool"]},{name:"gpod",command:"git push origin --delete",description:`Deletes a branch on the remote.

**Example:** \`git push origin --delete feature/old-branch\`

**Pitfalls:**
- Deleting the wrong branch affects teammates; verify branch name.
- You may lose unmerged work if the branch is not backed up.

**Why?** clean up remote branches after merges`,type:"delete",keywords:["delete","gpod","publish","push","remote","remove","upload"]},{name:"gpsupf",command:"git push --set-upstream origin $(git_current_branch) --force-with-lease --force-if-includes",description:`Force-pushes local history to the remote branch.

**Example:** \`git push -u origin feature/login\`

**Pitfalls:**
- This can overwrite others' work; prefer \`--force-with-lease\`.
- Force pushes on shared branches can break CI and reviews.

**Why?** update remote after rewriting history`,type:"default",keywords:["force-with-lease","gpsupf","lease","publish","push","remote","rewrite","set-upstream","track","upload","upstream"]},{name:"grep",command:"grep --color=auto --exclude-dir={.bzr,CVS,.git,.hg,.svn,.idea,.tox}",description:`Searches for text in files while skipping common VCS/build folders.

**Example:** \`grep --color=auto -R "TODO" src\`

**Pitfalls:**
- Broad searches can be noisy; limit to a folder like \`src/\`.
- Pattern quoting differs by shell; wrap patterns in quotes.

**Why?** find TODOs or errors quickly`,type:"show",keywords:["find","grep","pattern","search","text"]},{name:"grt",command:'cd "$(git rev-parse --show-toplevel || echo .)"',description:`Jumps your shell to the Git repository root.

**Example:** \`cd "$(git rev-parse --show-toplevel)"\`

**Pitfalls:**
- Outside a repo this will fail; confirm you are in a repo.
- If it returns '.', you are already at the repo root.

**Why?** avoid long relative paths in deep folders`,type:"default",keywords:["cd","grt","repo","root","toplevel"]},{name:"gsps",command:"git show --pretty=short --show-signature",description:`Displays details for a commit, tag, or object.

**Example:** \`git show HEAD\`

**Pitfalls:**
- Output can be large; limit to a file path when needed.
- Binary diffs can be noisy; use \`--stat\` to summarize.

**Why?** inspect exact changes quickly`,type:"show",keywords:["details","gsps","inspect","show"]},{name:"gtl",command:'gtl(){ git tag --sort=-v:refname -n --list "${1}*" }; noglob gtl',description:`Lists tags by version, filtered by a prefix.

**Example:** \`git tag --sort=-v:refname -n --list "v1.*"\`

**Pitfalls:**
- Broad prefixes can dump too many tags; narrow the prefix.
- If tags are missing, run \`git fetch --tags\` first.

**Why?** quickly find the latest release tag`,type:"show",keywords:["gtl","list","release","tag","tags","version"]},{name:"gupomi",command:"git pull --rebase=interactive origin $(git_main_branch)",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase=interactive origin main\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,type:"default",keywords:["fetch","gupomi","linear","pull","rebase","sync","update"]},{name:"gwch",command:"git whatchanged -p --abbrev-commit --pretty=medium",description:`Shows commit history with patch details.

**Example:** \`git whatchanged -p\`

**Pitfalls:**
- Output gets very long; limit by path or range.
- Older command style; \`git log -p\` is similar.

**Why?** deep debugging of history changes`,type:"show",keywords:["gwch","history","patch","whatchanged"]},{name:"ggpnp",command:"ggl && ggp",description:`Pulls remote changes, then pushes your branch.

**Example:** \`git pull origin feature/login && git push origin feature/login\`

**Pitfalls:**
- Pull may stop on conflicts; resolve and commit before pushing.
- Push can be rejected if upstream moved; pull again after resolving.

**Why?** keep your branch in sync with minimal typing`,type:"default",keywords:["ggpnp","publish","pull","push","sync","update"]},{name:"ggpur",command:"git pull --rebase origin $(current_branch)",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,type:"default",keywords:["fetch","ggpur","linear","pull","rebase","sync","update"]},{name:"gbsn",command:"git bisect new",description:`Marks the current commit as new (bad) during bisect.

**Example:** \`git bisect new\`

**Pitfalls:**
- Make sure you tested this commit; wrong marks give wrong results.
- Use \`old\` for the known-good commit.

**Why?** label tested commits consistently`,type:"default",keywords:["bisect","bug","gbsn","new","regression","search"]},{name:"gbso",command:"git bisect old",description:`Marks the current commit as old (good) during bisect.

**Example:** \`git bisect old\`

**Pitfalls:**
- Make sure you tested this commit; wrong marks give wrong results.
- Use \`new\` for the known-bad commit.

**Why?** label tested commits consistently`,type:"default",keywords:["bisect","bug","gbso","old","regression","search"]},{name:"gbm",command:"git branch --move",description:`Renames a local branch.

**Example:** \`git branch --move old-name new-name\`

**Pitfalls:**
- If the branch was pushed, update the remote name and upstream.
- Teammates will still have the old name until they prune.

**Why?** fix branch naming mistakes cleanly`,type:"default",keywords:["branch","branches","create","delete","gbm","list","move","rename"]},{name:"gccd",command:'git clone --recurse-submodules "$@" && cd "$(basename $_ .git)"',description:`Clones a repo and changes into the new folder.

**Example:** \`git clone https://github.com/org/repo.git && cd repo\`

**Pitfalls:**
- Repo folder name may differ; check directory name after clone.
- Auth failures stop the clone; use the correct HTTPS/SSH URL.

**Why?** start working in a repo immediately after cloning`,type:"default",keywords:["cd","clone","download","gccd","repo","repository"]},{name:"gdv",command:'git diff -w "$@" | view -',description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,type:"show",keywords:["changes","compare","diff","gdv","patch"]},{name:"gdnolock",command:'git diff $@ ":(exclude)package-lock.json" ":(exclude)\\*.lock"',description:`Shows changes between files, staged data, and commits.

**Example:** \`git diff\`

**Pitfalls:**
- Empty output may mean changes are staged; try \`git diff --staged\`.
- Large diffs can hide issues; limit to specific files when reviewing.

**Why?** review changes before committing`,type:"show",keywords:["changes","compare","diff","gdnolock","patch"]},{name:"gprv",command:"git pull --rebase -v",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,type:"default",keywords:["fetch","gprv","linear","pull","rebase","sync","update"]},{name:"gpra",command:"git pull --rebase --autostash",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,type:"default",keywords:["fetch","gpra","linear","pull","rebase","sync","update"]},{name:"gprav",command:"git pull --rebase --autostash -v",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,type:"default",keywords:["fetch","gprav","linear","pull","rebase","sync","update"]},{name:"gprom",command:"git pull --rebase origin $(git_main_branch)",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,type:"default",keywords:["fetch","gprom","linear","pull","rebase","sync","update"]},{name:"gpromi",command:"git pull --rebase=interactive origin $(git_main_branch)",description:`Fetches and rebases your local commits on top of remote changes.

**Example:** \`git pull --rebase=interactive origin main\`

**Pitfalls:**
- Conflicts are common; resolve, \`git add\`, then \`git rebase --continue\`.
- Rebasing shared commits rewrites history; avoid on public branches.

**Why?** keep history linear while syncing`,type:"default",keywords:["fetch","gpromi","linear","pull","rebase","sync","update"]},{name:"ggl",command:"git pull origin $(current_branch)",description:`Fetches and merges remote changes into your current branch.

**Example:** \`git pull origin main\`

**Pitfalls:**
- Pulling on the wrong branch causes messy merges; check branch first.
- If you have local changes, pull may fail; stash or commit first.

**Why?** quickly sync with teammates`,type:"default",keywords:["fetch","ggl","pull","sync","update"]},{name:"ggf",command:"git push --force origin $(current_branch)",description:`Force-pushes local history to the remote branch.

**Example:** \`git push --force origin feature/login\`

**Pitfalls:**
- This can overwrite others' work; prefer \`--force-with-lease\`.
- Force pushes on shared branches can break CI and reviews.

**Why?** update remote after rewriting history`,type:"default",keywords:["force","ggf","publish","push","remote","rewrite","upload"]},{name:"ggfl",command:"git push --force-with-lease origin $(current_branch)",description:`Force-pushes local history to the remote branch.

**Example:** \`git push --force-with-lease origin feature/login\`

**Pitfalls:**
- This can overwrite others' work; prefer \`--force-with-lease\`.
- Force pushes on shared branches can break CI and reviews.

**Why?** update remote after rewriting history`,type:"default",keywords:["force-with-lease","ggfl","lease","publish","push","remote","rewrite","upload"]},{name:"ggp",command:"git push origin $(current_branch)",description:`Uploads your local commits to the remote branch.

**Example:** \`git push origin feature/login\`

**Pitfalls:**
- Pushing from the wrong branch is common; check \`git status\` first.
- First push may require \`-u\` to set upstream tracking.

**Why?** share work with teammates and CI`,type:"default",keywords:["ggp","publish","push","remote","upload"]},{name:"grhk",command:"git reset --keep",description:`Moves HEAD and/or the index without deleting working files.

**Example:** \`git reset --keep HEAD~1\`

**Pitfalls:**
- Using \`--hard\` by mistake is destructive; double-check flags.
- Resetting can unstage work; verify with \`git status\` afterward.

**Why?** fix staging or recent commit mistakes`,type:"delete",keywords:["grhk","keep","reset","rollback","undo","unstage"]},{name:"grhs",command:"git reset --soft",description:`Moves HEAD and/or the index without deleting working files.

**Example:** \`git reset --soft HEAD~1\`

**Pitfalls:**
- Using \`--hard\` by mistake is destructive; double-check flags.
- Resetting can unstage work; verify with \`git status\` afterward.

**Why?** fix staging or recent commit mistakes`,type:"delete",keywords:["grhs","reset","rollback","soft","undo","unstage"]},{name:"gstu",command:"git stash --include-untracked",description:`Stashes tracked and untracked files (not ignored).

**Example:** \`git stash --include-untracked\`

**Pitfalls:**
- Ignored files are not saved; use \`--all\` if you need them.
- Restoring can cause conflicts; resolve and commit afterward.

**Why?** save new files without committing`,type:"default",keywords:["gstu","save","shelve","stash","temporary","wip"]},{name:"gta",command:"git tag --annotate",description:`Creates or lists tags for releases.

**Example:** \`git tag -a v1.2.0 -m "Release 1.2.0"\`

**Pitfalls:**
- Tagging the wrong commit confuses releases; verify with \`git show <tag>\`.
- Signed tags require GPG setup; configure before tagging.

**Why?** mark release points clearly`,type:"show",keywords:["annotate","gta","release","tag","tags","version"]},{name:"gcB",command:"git checkout -B",type:"default",description:`Creates or resets a branch to a start point, then switches to it.

**Example:** \`git checkout -B feature/login main\`

**Pitfalls:**
- This can move an existing branch and drop commits; verify first.
- Use \`-b\` if you do not want to overwrite an existing branch.

**Why?** recreate a branch from a clean base`,keywords:["branch","checkout","create","gcb","new","switch"]},{name:"gcann!",command:"git commit --verbose --all --date=now --no-edit --amend",type:"default",description:`Rewrites the most recent commit with new staged changes.

**Example:** \`git commit --amend --no-edit\`

**Pitfalls:**
- Amending a pushed commit rewrites history; avoid on shared branches.
- If nothing is staged, amend changes only the message; stage files first.

**Why?** fix the last commit before sharing`,keywords:["amend","commit","commits","edit","gcann!","rewrite","save","snapshot"]},{name:"gmc",command:"git merge --continue",type:"default",description:`Continues a merge after resolving conflicts.

**Example:** \`git merge --continue\`

**Pitfalls:**
- You must stage resolved files before continuing.
- Unresolved conflicts will block the merge; resolve all files first.

**Why?** finish the merge cleanly`,keywords:["combine","gmc","integrate","merge"]},{name:"grf",command:"git reflog",type:"show",description:`Shows local history of where HEAD and branches pointed.

**Example:** \`git reflog\`

**Pitfalls:**
- Reflog is local only; it will not show on other machines.
- Reflog expires; recover lost commits sooner rather than later.

**Why?** recover from bad resets or rebases`,keywords:["grf","history","recover","reflog"]},{name:"gwipe",command:"git reset --hard && git clean --force -df",type:"delete",description:`Wipes local changes and untracked files to a clean state.

**Example:** \`git reset --hard && git clean -df\`

**Pitfalls:**
- This permanently deletes uncommitted work; stash or commit first.
- Running on the wrong repo can be disastrous; confirm repo root.

**Why?** recover from a broken or messy working tree`,keywords:["clean","discard","gwipe","hard","reset","untracked","wipe"]},{name:"greva",command:"git revert --abort",type:"delete",description:`Aborts an in-progress revert and restores the previous state.

**Example:** \`git revert --abort\`

**Pitfalls:**
- Manual conflict edits will be discarded; save changes if needed.
- If no revert is in progress, this will fail.

**Why?** safely exit a bad revert`,keywords:["commit","greva","reverse","revert","undo"]},{name:"grevc",command:"git revert --continue",type:"default",description:`Continues a revert after resolving conflicts.

**Example:** \`git revert --continue\`

**Pitfalls:**
- You must stage resolved files before continuing.
- Unresolved conflicts will block progress; resolve all files first.

**Why?** finish the revert cleanly`,keywords:["commit","grevc","reverse","revert","undo"]}];var y=require("react/jsx-runtime"),ie=new s.Cache;function oe(){let[n,r]=H("show-details",!1),[t,e]=(0,V.useState)(""),i=(0,s.getPreferenceValues)(),g=Number(i.MaxRecent),c=Number(i.MaxPins),f=i.IconPinColored,l=i.ShowTypeIcon,x={show:s.Color.Green,default:s.Color.Blue,delete:s.Color.Red},b=async()=>{let{aliases:a=se}=JSON.parse(ie.get("data")||"{}"),d=a.slice().reverse(),m=d.filter(o=>o.pin),v=d.filter(o=>o.recent);return{aliases:a,pins:m,recent:v}},{isLoading:$,data:p,revalidate:I}=ae(b,[],{initialData:{aliases:[],pins:[],recent:[]}}),S=async a=>{ie.set("data",JSON.stringify({aliases:a})),I()},w=a=>{let d=p.aliases.map(m=>m.name===a.name?{...m,pin:!m.pin,recent:m.pin?m.recent:!1}:m);S(d).then(()=>{(0,s.showToast)(a.pin?{title:"Unpin",message:a.name+" is no longer pinned"}:{title:"Pinned",message:a.name+" is now pinned"})})},P=a=>{let d=p.aliases.map(m=>{let v=m.pin?m.recent:!0;return m.name===a.name?{...m,recent:v}:m});S(d)},_=()=>{let a=p.aliases.map(d=>({...d,recent:!1}));S(a).then(()=>(0,s.showToast)({title:"All recent removed",message:"All recent commands have been removed"}))},L=a=>{let d=a.replace(/[^a-zA-Z0-9- ]/g," ").replace(/\s+/g," ").trim();return d?[...new Set([d,d.replace(/--/g,"")])]:[]},E=a=>a.toLowerCase().trim(),k=a=>E(a).split(/\s+/).filter(Boolean),C=(a,d)=>{if(!d)return 0;let m=k(d);if(m.length===0)return 0;let v=E(a.name),o=E(a.command),A=E(a.description||""),F=(a.keywords||[]).map(E),W=0;for(let T of m)v===T&&(W+=60),v.startsWith(T)&&(W+=25),o.startsWith(`git ${T}`)&&(W+=40),o.includes(` ${T}`)&&(W+=10),F.includes(T)&&(W+=20),A.includes(T)&&(W+=5);return W+=Math.max(0,10-v.length),W},U=a=>{if(!t.trim())return a;let d=t;return a.slice().sort((m,v)=>C(v,d)-C(m,d)||m.name.localeCompare(v.name))},O=(0,V.useMemo)(()=>U(p.pins),[p.pins,t]),B=(0,V.useMemo)(()=>U(p.recent),[p.recent,t]),Y=(0,V.useMemo)(()=>U(p.aliases),[p.aliases,t]),G=({alias:a,hidePin:d})=>{let{name:m,command:v,type:o,description:A,pin:F=!1,recent:W=!1}=a,T=`## ${m}
  ####
  \`\`\`
  ${v}
  \`\`\`
  ####
  ${A}`;return(0,y.jsx)(s.List.Item,{icon:l?{source:s.Icon.Dot,tintColor:x[o]}:void 0,title:m,subtitle:{value:v,tooltip:v},detail:(0,y.jsx)(s.List.Item.Detail,{markdown:T}),keywords:[...a.keywords||[],...v.split(" ").map(L).flat(),m],accessories:[...F&&!d?[{icon:{source:s.Icon.Tack,...f&&{tintColor:s.Color.Yellow}}}]:[]],actions:(0,y.jsxs)(s.ActionPanel,{children:[(0,y.jsxs)(s.ActionPanel.Section,{children:[(0,y.jsx)(s.Action.CopyToClipboard,{title:"Copy Alias",content:m,onCopy:()=>P(a)}),(0,y.jsx)(s.Action.Paste,{title:"Paste Alias",content:m,onPaste:()=>P(a)}),(0,y.jsx)(s.Action.CopyToClipboard,{title:"Copy Command",content:v,onCopy:()=>P(a)}),(0,y.jsx)(s.Action.Paste,{title:"Paste Command",content:v,onPaste:()=>P(a)})]}),(0,y.jsxs)(y.Fragment,{children:[F&&(0,y.jsx)(s.Action,{icon:s.Icon.TackDisabled,title:"Unpin",onAction:()=>w(a),shortcut:s.Keyboard.Shortcut.Common.Remove}),F||(0,y.jsx)(s.Action,{icon:s.Icon.Tack,title:"Pin",onAction:()=>w(a),shortcut:s.Keyboard.Shortcut.Common.Pin})]}),(0,y.jsx)(s.ActionPanel.Section,{children:(0,y.jsx)(s.Action,{icon:s.Icon.AppWindowSidebarRight,title:"Toggle Details",onAction:()=>r(!n),shortcut:s.Keyboard.Shortcut.Common.ToggleQuickLook})}),W&&p.recent.length&&(0,y.jsx)(s.Action,{icon:s.Icon.XMarkCircle,title:"Clear All Recent",onAction:_,shortcut:s.Keyboard.Shortcut.Common.RemoveAll}),(0,y.jsx)(s.Action,{icon:s.Icon.Gear,title:"Change Colors in Preferences",onAction:s.openCommandPreferences})]})})};return(0,y.jsxs)(s.List,{isLoading:$,searchBarPlaceholder:"Search command, description or alias",isShowingDetail:n,onSearchTextChange:e,children:[(0,y.jsx)(s.List.Section,{title:"Pinned",subtitle:p.pins.length>c?`${p.pins.length}`:"",children:O.slice(0,c).map(a=>(0,y.jsx)(G,{alias:a,hidePin:!0},a.name))}),(0,y.jsx)(s.List.Section,{title:"Recent",subtitle:p.recent.length>g?`${p.recent.length}`:"",children:B.slice(0,g).map(a=>(0,y.jsx)(G,{alias:a},a.name))}),(0,y.jsx)(s.List.Section,{title:"All aliases",subtitle:`${p.aliases.length}`,children:Y.map(a=>(0,y.jsx)(G,{alias:a},a.name))})]})}
