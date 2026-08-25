import{b as G,d as V,$ as k,e as T,o as h,c as g,f as C,s as J,g as L,C as B,h as A,i as H,r as P,K as _,j as K,t as Y,F as Q,k as O,l as R,m as ee,n as $}from"./index.js";class te{constructor(){this.cache=new Map,this.loadingPromises=new Map}loadScript(e){if(this.loadingPromises.has(e))return this.loadingPromises.get(e);const t=new Promise((i,n)=>{const o=g("script",{attributes:{src:e}});o.onload=()=>i(),o.onerror=()=>n(new Error(`Failed to load ${e}`)),document.head.appendChild(o)});return this.loadingPromises.set(e,t),t}loadStylesheet(e){if(this.loadingPromises.has(e))return this.loadingPromises.get(e);const t=new Promise((i,n)=>{const o=g("link",{attributes:{rel:"stylesheet",href:e}});o.onload=()=>i(),o.onerror=()=>n(new Error(`Failed to load ${e}`)),document.head.appendChild(o)});return this.loadingPromises.set(e,t),t}async mammoth(){if(this.cache.has("mammoth"))return this.cache.get("mammoth");await this.loadScript($("mammoth"));const e=window.mammoth;return this.cache.set("mammoth",e),e}async xlsx(){if(this.cache.has("xlsx"))return this.cache.get("xlsx");await this.loadScript($("xlsx"));const e=window.XLSX;return this.cache.set("xlsx",e),e}async pdfjs(){if(this.cache.has("pdfjs"))return this.cache.get("pdfjs");await Promise.all([this.loadScript($("pdfjs","js")),this.loadScript($("pdfjs","viewer")),this.loadStylesheet($("pdfjs","viewerCss"))]);const e=window.pdfjsLib;return e.GlobalWorkerOptions.workerSrc=$("pdfjs","worker"),this.cache.set("pdfjs",e),this.cache.set("pdfjsViewer",window.pdfjsViewer),e}async pdfjsViewer(){return this.cache.has("pdfjsViewer")||await this.pdfjs(),this.cache.get("pdfjsViewer")}async jszip(){if(this.cache.has("jszip"))return this.cache.get("jszip");await this.loadScript($("jszip"));const e=window.JSZip;return this.cache.set("jszip",e),e}async docx(){if(this.cache.has("docx"))return this.cache.get("docx");const e=$("docx");if(e.includes("esm.sh")){const i=await import(e);return this.cache.set("docx",i),i}await this.loadScript(e);const t=window.docx;return this.cache.set("docx",t),t}async jsPDF(){if(this.cache.has("jsPDF"))return this.cache.get("jsPDF");await this.loadScript($("jspdf"));const e=window.jspdf&&window.jspdf.jsPDF?window.jspdf.jsPDF:window.jsPDF;if(!e)throw new Error("jsPDF failed to load");return this.cache.set("jsPDF",e),e}async html2canvas(){if(window.html2canvas)return window.html2canvas;{const e="https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.8/dist/html2canvas-pro.min.js";if(await new Promise((t,i)=>{const n=g("script",{attributes:{src:e}});n.onload=t,n.onerror=()=>i(new Error("html2canvas-pro failed to load")),document.head.appendChild(n)}),!window.html2canvas)throw new Error("html2canvas-pro failed to load")}return window.html2canvas}}const S=new te,w={getExtension(m){return!m||typeof m!="string"?"":m.includes(".")?"."+ee(m):""},escapeXml(m){return m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")},mimeForExtension(m){return{".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".xls":"application/vnd.ms-excel",".odt":"application/vnd.oasis.opendocument.text",".pdf":"application/pdf",".odp":"application/vnd.oasis.opendocument.presentation",".csv":"text/csv",".txt":"text/plain",".html":"text/html"}[m]||"application/octet-stream"},isBinaryExtension(m){return[".docx",".xlsx",".xls",".odt",".pdf",".odp"].includes(m)},arrayBufferToBase64(m){const e=new Uint8Array(m),t=8192;let i="";for(let n=0;n<e.length;n+=t){const o=e.subarray(n,n+t);i+=String.fromCharCode.apply(null,o)}return btoa(i)},arrayBufferToDataUrl(m,e){const t=this.arrayBufferToBase64(m);return`data:${e};base64,${t}`},isBase64(m){if(!m||typeof m!="string")return!1;const e=/^[A-Za-z0-9+/]+=*$/;return m.length>100&&e.test(m.replace(/\s/g,""))},base64ToArrayBuffer(m){const e=atob(m),t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t.buffer},async toArrayBuffer(m){return m instanceof ArrayBuffer?m:m instanceof Uint8Array?m.buffer:m instanceof Blob?m.arrayBuffer():typeof m=="string"?m.startsWith("data:")||m.startsWith("http")||m.startsWith("/")?(await fetch(m)).arrayBuffer():new TextEncoder().encode(m).buffer:null},colLabel(m){let e="",t=m;for(;t>=0;)e=String.fromCharCode(t%26+65)+e,t=Math.floor(t/26)-1;return e},odpUnitToPx(m){if(!m)return 0;const e=parseFloat(m);return m.endsWith("cm")?e*37.795:m.endsWith("mm")?e*3.7795:m.endsWith("in")?e*96:m.endsWith("pt")?e*1.333:e}};class z{static triggerUpload(e=!1){return new Promise(t=>{const i=g("input",{attributes:{type:"file",accept:".docx,.xlsx,.xls,.csv,.odt,.pdf,.odp,.txt,.html"}});i.multiple=e,C(i,{display:"none"}),i.addEventListener("change",async()=>{const n=Array.from(i.files);if(n.length===0){t([]),i.remove();return}const o=[];for(const s of n)try{const a=await s.arrayBuffer();o.push({name:s.name,arrayBuffer:a})}catch(a){console.error(`Error reading file ${s.name}:`,a)}t(o),i.remove()}),document.body.appendChild(i),i.click()})}static triggerDownload(e,t){let i;if(t instanceof Blob)i=t;else if(t instanceof Uint8Array||t instanceof ArrayBuffer){const s=w.getExtension(e);i=new Blob([t],{type:w.mimeForExtension(s)})}else typeof t=="string"?i=new Blob([t],{type:"text/plain"}):i=new Blob([t]);const n=URL.createObjectURL(i),o=g("a",{attributes:{href:n,download:e}});C(o,{display:"none"}),document.body.appendChild(o),o.click(),setTimeout(()=>{URL.revokeObjectURL(n),o.remove()},1e3)}}class M{static collectStyles(e,t=!1){const i={},n=["font-weight","font-style","font-size","color","text-align","margin-left","margin-bottom","margin-top","background-color"];for(const o of e){if(!o)continue;const a=new DOMParser().parseFromString(o,"application/xml").getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style");for(let l=0;l<a.length;l++){const r=a[l],c=r.getAttribute("style:name");if(!c)continue;const d={},f=r.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0","*");for(let u=0;u<f.length;u++)for(let b=0;b<f[u].attributes.length;b++){const y=f[u].attributes[b];n.includes(y.localName)&&(d[y.localName]=y.value)}const p=r.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties");for(let u=0;u<p.length;u++)p[u].getAttribute("style:text-underline-style")==="solid"&&(d["text-decoration"]="underline"),p[u].getAttribute("style:font-name")&&(d["font-family"]=p[u].getAttribute("style:font-name"));if(t){const u=r.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","graphic-properties");for(let b=0;b<u.length;b++)u[b].getAttribute("draw:fill-color")&&(d["background-color"]=u[b].getAttribute("draw:fill-color"))}i[c]=d}}return i}static styleStringFor(e,t){return!e||!t[e]?"":Object.entries(t[e]).map(([i,n])=>`${i}:${n}`).join(";")}}class q{static async loadPictures(e){const t={},i=e.folder("Pictures");if(!i)return t;const n=[];i.forEach((o,s)=>n.push({rp:o,file:s}));for(const o of n){const s=await o.file.async("blob");t["Pictures/"+o.rp]=URL.createObjectURL(s)}return t}}class W{static async toOdtBlob(e){const t=await S.jszip(),i=new t;i.file("mimetype","application/vnd.oasis.opendocument.text",{compression:"STORE"}),i.file("META-INF/manifest.xml",'<?xml version="1.0" encoding="UTF-8"?><manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"><manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.text"/><manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/></manifest:manifest>');const n=g("div",{html:e});let o="";const s=l=>{if(l.nodeType===3)return w.escapeXml(l.textContent);if(l.nodeType!==1)return"";const r=l.tagName.toLowerCase();let c="";for(const d of l.childNodes)c+=s(d);return r==="p"||r==="div"?`<text:p>${c}</text:p>`:r.match(/^h[1-6]$/)?`<text:h text:outline-level="${r[1]}">${c}</text:h>`:r==="ul"||r==="ol"?`<text:list>${c}</text:list>`:r==="li"?`<text:list-item><text:p>${c}</text:p></text:list-item>`:r==="br"?"<text:line-break/>":["b","strong","i","em","span","u"].includes(r)?`<text:span>${c}</text:span>`:c};for(const l of n.childNodes)o+=s(l);o||(o=`<text:p>${w.escapeXml(n.textContent||"")}</text:p>`),i.file("content.xml",`<?xml version="1.0" encoding="UTF-8"?><office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" office:version="1.2"><office:body><office:text>${o}</office:text></office:body></office:document-content>`);const a=await i.generateAsync({type:"blob"});return new Uint8Array(await a.arrayBuffer())}static async toDocxParagraphs(e){const{Paragraph:t,TextRun:i,HeadingLevel:n,UnderlineType:o}=await S.docx(),s=g("div",{html:e}),a=[],l={1:n.HEADING_1,2:n.HEADING_2,3:n.HEADING_3,4:n.HEADING_4,5:n.HEADING_5,6:n.HEADING_6},r=d=>{const f=[],p=(u,b)=>{if(u.nodeType===3){if(u.textContent){const v={text:u.textContent};b.b&&(v.bold=!0),b.i&&(v.italics=!0),b.u&&(v.underline={type:o.SINGLE}),b.s&&(v.strike=!0),f.push(new i(v))}return}if(u.nodeType!==1)return;const y=u.tagName.toLowerCase(),x={...b};(y==="b"||y==="strong")&&(x.b=!0),(y==="i"||y==="em")&&(x.i=!0),y==="u"&&(x.u=!0),(y==="s"||y==="strike"||y==="del")&&(x.s=!0);for(const v of u.childNodes)p(v,x)};return p(d,{b:!1,i:!1,u:!1,s:!1}),f},c=d=>{if(d.nodeType===3){d.textContent.trim()&&a.push(new t({children:[new i(d.textContent)]}));return}if(d.nodeType!==1)return;const f=d.tagName.toLowerCase();if(f==="p"||f==="div")a.push(new t({children:r(d)}));else if(f.match(/^h[1-6]$/))a.push(new t({children:r(d),heading:l[parseInt(f[1])]}));else if(f==="ul"||f==="ol")for(const p of d.children)p.tagName.toLowerCase()==="li"&&a.push(new t({children:r(p),bullet:f==="ul"?{level:0}:void 0}));else for(const p of d.childNodes)c(p)};for(const d of s.childNodes)c(d);return a.length||a.push(new t({children:[new i(s.textContent||"")]})),a}}class Z{static init(e,t,i){const n=g("div",{className:"office-toolbar"}),o=[{label:"B",cmd:"bold",cls:"office-toolbar__btn--bold"},{label:"I",cmd:"italic",cls:"office-toolbar__btn--italic"},{label:"U",cmd:"underline",cls:"office-toolbar__btn--underline"},{label:"S",cmd:"strikeThrough",cls:"office-toolbar__btn--strike"},{label:"UL",cmd:"insertUnorderedList",cls:""},{label:"OL",cmd:"insertOrderedList",cls:""},{label:"←",cmd:"justifyLeft",cls:""},{label:"↔",cmd:"justifyCenter",cls:""},{label:"→",cmd:"justifyRight",cls:""}],s=g("div",{className:"office-richtext-editor",html:t||""});s.contentEditable="true",o.forEach(r=>{const c=g("button",{text:r.label,className:`office-toolbar__btn ${r.cls}`});c.title=r.cmd,A(c,"mousedown",d=>{d.preventDefault(),document.execCommand(r.cmd,!1,null),s.focus()}),n.appendChild(c)});const a=g("select",{className:"office-toolbar__select"});["Serif","Sans-Serif","Monospace","Arial","Georgia","Times New Roman","Courier New"].forEach(r=>{const c=g("option",{text:r,attributes:{value:r}});a.appendChild(c)}),A(a,"change",()=>{document.execCommand("fontName",!1,a.value),s.focus()}),n.appendChild(a);const l=g("select",{className:"office-toolbar__select"});[1,2,3,4,5,6,7].forEach(r=>{const c=g("option",{text:r*4+8+"px",attributes:{value:String(r)}});r===3&&(c.selected=!0),l.appendChild(c)}),A(l,"change",()=>{document.execCommand("fontSize",!1,l.value),s.focus()}),n.appendChild(l),e.appendChild(n),e.appendChild(s),i.editor=s,i.editorType="contenteditable"}}class U{canHandle(){return!1}async init(){}}class I extends U{canHandle(e){return[".xlsx",".xls",".csv"].includes(e)}async init(e,t,i){const n=await S.xlsx();let o=t;(!o||!(o instanceof ArrayBuffer))&&(console.warn("SpreadsheetEditor: Invalid buffer, creating empty workbook"),o=null);let s;if(o&&o.byteLength>0)try{const a=new Uint8Array(o);s=n.read(a,{type:"array"})}catch(a){console.error("XLSX read error:",a),s=this.createEmptyWorkbook(n)}else s=this.createEmptyWorkbook(n);i.workbook=s,i.activeSheet=s.SheetNames[0],this.renderNativeTable(e,s,i,n)}createEmptyWorkbook(e){const t=e.utils.book_new(),i=Array.from({length:50},()=>Array(26).fill(""));return e.utils.book_append_sheet(t,e.utils.aoa_to_sheet(i),"Sheet1"),t}renderNativeTable(e,t,i,n){const o=t.Sheets[i.activeSheet],s=n.utils.sheet_to_json(o,{header:1,defval:""});for(;s.length<50;)s.push([]);s.forEach(c=>{for(;c.length<26;)c.push("")});const a=Array.from({length:26},(c,d)=>String.fromCharCode(65+d));let l='<div class="office-sheet-wrapper">';l+=this.renderSheetTabs(t,i),l+='<div class="office-table-wrap"><table class="office-spreadsheet" cellspacing="0">',l+='<thead><tr><th class="office-th-corner"></th>',a.forEach(c=>{l+=`<th class="office-th-col">${c}</th>`}),l+="</tr></thead><tbody>",s.forEach((c,d)=>{l+=`<tr><th class="office-th-row">${d+1}</th>`,c.forEach((f,p)=>{const u=f!=null?String(f):"";l+=`<td class="office-cell" contenteditable="true" data-row="${d}" data-col="${p}">${u}</td>`}),l+="</tr>"}),l+="</tbody></table></div></div>",e.innerHTML=l;const r=e.querySelector(".office-spreadsheet");this.bindCellEvents(r,i,n),k(".office-sheet-tab",e).forEach(c=>{A(c,"click",()=>{i.activeSheet=c.dataset.sheet,this.renderNativeTable(e,t,i,n)})}),i.editor=r,i.editorType="spreadsheet"}renderSheetTabs(e,t){return e.SheetNames.length<=1?"":`<div class="office-sheet-tabs">
      ${e.SheetNames.map(i=>`
        <button class="office-sheet-tab ${i===t.activeSheet?"office-sheet-tab--active":""}"
                data-sheet="${i}">${i}</button>
      `).join("")}
    </div>`}bindCellEvents(e,t,i){let n=!1;e.addEventListener("input",()=>{n=!0}),e.addEventListener("blur",()=>{n&&(this.syncNativeTable(t,i),n=!1)},!0),e.addEventListener("keydown",o=>{if(o.key==="Enter"&&!o.shiftKey){o.preventDefault();const s=o.target.closest("td");s&&s.blur()}})}syncNativeTable(e,t){if(!e.editor||!e.workbook)return;const i=e.editor,n=[];i.querySelectorAll("tbody tr").forEach(o=>{const s=[];o.querySelectorAll("td").forEach(a=>{s.push(a.textContent)}),n.push(s)}),e.workbook.Sheets[e.activeSheet]=t.utils.aoa_to_sheet(n)}static async syncTable(e){const t=await S.xlsx();if(e.editorType!=="spreadsheet"||!e.editor)return;const i=[];e.editor.querySelectorAll("tbody tr").forEach(n=>{const o=[];n.querySelectorAll("td").forEach(s=>{o.push(s.textContent)}),i.push(o)}),e.workbook.Sheets[e.activeSheet]=t.utils.aoa_to_sheet(i)}}class ie extends U{canHandle(e){return e===".docx"}async init(e,t,i){let n="";if(t&&t.byteLength>0)try{n=(await(await S.mammoth()).convertToHtml({arrayBuffer:t})).value}catch(o){console.error("mammoth error:",o),n="<p>Error loading DOCX file.</p>"}Z.init(e,n,i)}}class X extends U{canHandle(e){return e===".odt"}async init(e,t,i){if(i.editorType="odt-iframe",!t||t.byteLength===0){Z.init(e,"",i);return}const n=g("div",{className:"office-odt-wrapper"});try{const s=await(await S.jszip()).loadAsync(t),a=await s.file("content.xml")?.async("string"),l=await s.file("styles.xml")?.async("string")||"";if(!a){n.innerHTML='<div class="office-info-msg">Nothing found in this ODT file</div>',e.appendChild(n),i.editor=n;return}const r=await q.loadPictures(s),c=X.renderContent(a,l,r),d=g("iframe",{className:"office-odt-iframe",attributes:{sandbox:"allow-same-origin"}});n.appendChild(d),e.appendChild(n);const f=d.contentDocument||d.contentWindow.document;f.open(),f.write(`<!DOCTYPE html><html><head><link rel="stylesheet" href="../styles/style.css"><link rel="stylesheet" href="../styles/office.css"></head><body class="office-odt-content">${c}</body></html>`),f.close(),i.editor=d,i.odtHtml=c}catch(o){n.innerHTML=`<div class="office-error-msg">Error loading ODT: ${o.message}</div>`,e.appendChild(n),i.editor=n}}static renderContent(e,t,i){const n=new DOMParser().parseFromString(e,"application/xml"),o=M.collectStyles([e,t]),s=r=>M.styleStringFor(r,o),a=r=>{if(!r)return"";let c="";for(let d=0;d<r.childNodes.length;d++){const f=r.childNodes[d];if(f.nodeType===3){c+=R(f.textContent);continue}if(f.nodeType!==1)continue;const p=f.localName,u=f.getAttribute("text:style-name")||f.getAttribute("table:style-name")||"",b=s(u),y=b?` style="${b}"`:"";switch(p){case"h":{const x=Math.min(parseInt(f.getAttribute("text:outline-level")||"1"),6);c+=`<h${x}${y}>${a(f)}</h${x}>`;break}case"p":c+=`<p${y}>${a(f)||"&nbsp;"}</p>`;break;case"span":c+=`<span${y}>${a(f)}</span>`;break;case"a":c+=`<a href="${R(f.getAttribute("xlink:href")||"#")}"${y}>${a(f)}</a>`;break;case"list":c+=`<ul${y}>${a(f)}</ul>`;break;case"list-item":c+=`<li>${a(f)}</li>`;break;case"tab":c+="&emsp;";break;case"line-break":c+="<br>";break;case"s":c+="&nbsp;".repeat(parseInt(f.getAttribute("text:c")||"1"));break;case"table":c+=`<table${y}>${a(f)}</table>`;break;case"table-row":c+=`<tr>${a(f)}</tr>`;break;case"table-cell":{let x=y;const v=f.getAttribute("table:number-columns-spanned"),E=f.getAttribute("table:number-rows-spanned");v&&(x+=` colspan="${v}"`),E&&(x+=` rowspan="${E}"`),c+=`<td${x}>${a(f)}</td>`;break}case"frame":{const x=f.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","image")[0]||f.querySelector("image");if(x){const v=x.getAttribute("xlink:href"),E=v&&i[v]?i[v]:"",N=f.getAttribute("svg:width")||"",F=f.getAttribute("svg:height")||"";let j="max-width:100%;";N&&(j+=`width:${N};`),F&&(j+=`height:${F};`),c+=E?`<img src="${E}" style="${j}">`:'<span style="color:var(--text-muted);">[image]</span>'}else c+=a(f);break}default:c+=a(f);break}}return c},l=n.getElementsByTagName("office:body")[0];return a(l||n.documentElement)}}class ne extends U{canHandle(e){return e===".pdf"}async init(e,t,i){i.editorType="pdf";try{const n=await S.pdfjs(),o=await n.getDocument({data:new Uint8Array(t)}).promise;i.pdfDoc=o;const s=g("div",{className:"office-pdf-viewer"}),a=g("div",{className:"office-pdf-info",text:`PDF - ${o.numPages} page(s)`});s.appendChild(a),e.innerHTML="",e.appendChild(s);const l=1.5;for(let r=1;r<=o.numPages;r++){const c=await o.getPage(r),d=c.getViewport({scale:l}),f=g("div",{className:"office-pdf-page"});C(f,{width:`${d.width}px`,height:`${d.height}px`});const p=g("canvas");p.width=d.width,p.height=d.height,await c.render({canvasContext:p.getContext("2d"),viewport:d}).promise,f.appendChild(p);const u=await c.getTextContent(),b=g("div",{className:"office-pdf-text-layer"});for(const x of u.items){if(!x.str)continue;const v=n.Util.transform(d.transform,x.transform),E=g("span",{text:x.str});C(E,{position:"absolute",left:`${v[4]}px`,top:`${v[5]}px`,fontSize:`${Math.abs(v[0])}px`,fontFamily:"sans-serif",whiteSpace:"pre",color:"transparent",userSelect:"text"}),b.appendChild(E)}f.appendChild(b);const y=g("div",{className:"office-pdf-page-label",text:`Page ${r} of ${o.numPages}`});s.appendChild(f),s.appendChild(y)}i.editor=s}catch(n){e.innerHTML=`<div class="office-error-msg">Error rendering PDF: ${n.message}</div>`}}}class D extends U{canHandle(e){return e===".odp"}async init(e,t,i){i.editorType="presentation";try{const o=await(await S.jszip()).loadAsync(t),s=await o.file("content.xml")?.async("string");if(!s){e.innerHTML='<div class="office-info-msg">Nothing found in this ODP file</div>';return}const a=await o.file("styles.xml")?.async("string")||"",l=await q.loadPictures(o),r=new DOMParser().parseFromString(s,"application/xml"),c=M.collectStyles([s,a],!0),f=r.getElementsByTagName("office:body")[0]?.getElementsByTagName("office:presentation")[0];if(!f){e.innerHTML='<div class="office-info-msg">No presentation content in ODP.</div>';return}const p=f.getElementsByTagName("draw:page"),u=g("div",{className:"office-presentation-viewer"}),b=g("div",{className:"office-presentation-info",text:`Presentation - ${p.length} slide(s)`});u.appendChild(b);for(let y=0;y<p.length;y++){const x=D.renderSlide(p[y],c,l),v=g("div",{className:"office-slide-wrapper"}),E=g("div",{className:"office-slide-content",html:x});v.appendChild(E);const N=g("div",{className:"office-slide-label",text:`Slide ${y+1} of ${p.length}`});u.appendChild(v),u.appendChild(N)}e.innerHTML="",e.appendChild(u),i.editor=u}catch(n){e.innerHTML=`<div class="office-error-msg">Error loading ODP: ${n.message}</div>`}}static renderSlide(e,t,i){let n="";const s=1.0000072917198355,a=540/(19.05*37.795);for(let l=0;l<e.childNodes.length;l++){const r=e.childNodes[l];if(r.nodeType!==1)continue;const c=r.localName;if(c!=="frame"&&c!=="custom-shape")continue;const d=w.odpUnitToPx(r.getAttribute("svg:x")||"0cm")*s,f=w.odpUnitToPx(r.getAttribute("svg:y")||"0cm")*a,p=w.odpUnitToPx(r.getAttribute("svg:width")||"10cm")*s,u=w.odpUnitToPx(r.getAttribute("svg:height")||"5cm")*a,b=r.getAttribute("draw:style-name")||"",y=t[b]?.["background-color"]?`background-color:${t[b]["background-color"]};`:"",x=r.getElementsByTagName("draw:image")[0];if(x){const F=x.getAttribute("xlink:href"),j=F&&i[F]?i[F]:null;j&&(n+=`<div style="position:absolute;left:${d}px;top:${f}px;width:${p}px;height:${u}px;"><img src="${j}" style="width:100%;height:100%;object-fit:contain;"></div>`);continue}const v=r.getElementsByTagName("draw:text-box")[0],E=r.getElementsByTagName("text:p"),N=v||(E.length>0?r:null);if(N){const F=D.renderText(N,t);n+=`<div style="position:absolute;left:${d}px;top:${f}px;width:${p}px;height:${u}px;overflow:hidden;padding:4px;box-sizing:border-box;${y}">${F}</div>`}}return n}static renderText(e,t){let i="";for(let n=0;n<e.childNodes.length;n++){const o=e.childNodes[n];if(o.nodeType===3){i+=R(o.textContent);continue}if(o.nodeType!==1)continue;const s=o.localName,a=o.getAttribute("text:style-name")||"",l=M.styleStringFor(a,t);s==="p"?i+=`<div style="margin:1px 0;${l}">${D.renderText(o,t)||"&nbsp;"}</div>`:s==="span"?i+=`<span style="${l}">${D.renderText(o,t)}</span>`:s==="list"?i+=`<ul style="margin:0;padding-left:1.5em;">${D.renderText(o,t)}</ul>`:s==="list-item"?i+=`<li>${D.renderText(o,t)}</li>`:s==="tab"?i+="&emsp;":s==="line-break"?i+="<br>":s==="s"?i+="&nbsp;".repeat(parseInt(o.getAttribute("text:c")||"1")):s==="a"?i+=`<a href="${R(o.getAttribute("xlink:href")||"#")}">${D.renderText(o,t)}</a>`:i+=D.renderText(o,t)}return i}}class oe extends U{canHandle(){return!0}async init(e,t,i){const n=t?new TextDecoder().decode(t):"";Z.init(e,n,i)}}class se{constructor(){this.strategies=[]}register(e){this.strategies.push(e)}getStrategy(e){return this.strategies.find(t=>t.canHandle(e))||null}}class ce extends G{constructor(e){super(e),this.fs=e.fs,this.idleTimer=null,this.idleDelay=15e3,this.editors={},this.registry=new se,this.registry.register(new I),this.registry.register(new ie),this.registry.register(new X),this.registry.register(new ne),this.registry.register(new D),this.registry.register(new oe)}get explorerApp(){return this.explorerAppService||(this.explorerAppService=this.getService(V.EXPLORER)),this.explorerAppService}open(e="Untitled",t=null,i=null){let n="Untitled",o={};e&&typeof e=="object"&&!Array.isArray(e)?(o=e,n=o.title||"Untitled",t=o.content||null,i=o.filePath||null):n=e||"Untitled";const s=String(n).replace(/[^a-zA-Z0-9.-]/g,"_"),a=k('[id^="office-"]');for(const b of a){const y=T(".window-header span",b);if(y&&y.textContent===`${n} - Office`){h.window.focus(b);return}}const l=o.forceId||`office-${s}-${Date.now()}`,r=w.getExtension(typeof i=="string"?i:n),c=`
<div class="app-menubar">
  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">File</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="new">
        <span class="office-menu-item__icon"><i class="fas fa-file"></i></span>
        <span class="office-menu-item__label">New</span>
        <span class="office-menu-item__shortcut">Ctrl+N</span>
      </button>
      <button class="office-menu-item" data-action="open">
        <span class="office-menu-item__icon"><i class="fas fa-folder-open"></i></span>
        <span class="office-menu-item__label">Open</span>
        <span class="office-menu-item__shortcut">Ctrl+O</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="save">
        <span class="office-menu-item__icon"><i class="fas fa-save"></i></span>
        <span class="office-menu-item__label">Save</span>
        <span class="office-menu-item__shortcut">Ctrl+S</span>
      </button>
      <button class="office-menu-item" data-action="saveAs">
        <span class="office-menu-item__icon"><i class="fas fa-save"></i></span>
        <span class="office-menu-item__label">Save As...</span>
        <span class="office-menu-item__shortcut">Ctrl+Shift+S</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="download">
        <span class="office-menu-item__icon"><i class="fas fa-download"></i></span>
        <span class="office-menu-item__label">Download</span>
        <span class="office-menu-item__shortcut"></span>
      </button>
      <div class="office-menu-submenu">
        <button class="office-menu-item office-menu-item--has-submenu">
          <span class="office-menu-item__icon"><i class="fas fa-file-export"></i></span>
          <span class="office-menu-item__label">Export As</span>
          <span class="office-menu-item__arrow"><i class="fas fa-caret-right"></i></span>
        </button>
        <div class="office-menu-submenu__content">
          <button class="office-menu-item" data-action="exportPDF">
            <span class="office-menu-item__icon"><i class="fas fa-file-pdf"></i></span>
            <span class="office-menu-item__label">PDF Document</span>
          </button>
          <button class="office-menu-item" data-action="exportHTML">
            <span class="office-menu-item__icon"><i class="fas fa-file-code"></i></span>
            <span class="office-menu-item__label">HTML Page</span>
          </button>
          <button class="office-menu-item" data-action="exportTXT">
            <span class="office-menu-item__icon"><i class="fas fa-file-alt"></i></span>
            <span class="office-menu-item__label">Plain Text</span>
          </button>
        </div>
      </div>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="print">
        <span class="office-menu-item__icon"><i class="fas fa-print"></i></span>
        <span class="office-menu-item__label">Print</span>
        <span class="office-menu-item__shortcut">Ctrl+P</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Edit</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="undo">
        <span class="office-menu-item__icon"><i class="fas fa-undo"></i></span>
        <span class="office-menu-item__label">Undo</span>
        <span class="office-menu-item__shortcut">Ctrl+Z</span>
      </button>
      <button class="office-menu-item" data-action="redo">
        <span class="office-menu-item__icon"><i class="fas fa-redo"></i></span>
        <span class="office-menu-item__label">Redo</span>
        <span class="office-menu-item__shortcut">Ctrl+Y</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="cut">
        <span class="office-menu-item__icon"><i class="fas fa-cut"></i></span>
        <span class="office-menu-item__label">Cut</span>
        <span class="office-menu-item__shortcut">Ctrl+X</span>
      </button>
      <button class="office-menu-item" data-action="copy">
        <span class="office-menu-item__icon"><i class="fas fa-copy"></i></span>
        <span class="office-menu-item__label">Copy</span>
        <span class="office-menu-item__shortcut">Ctrl+C</span>
      </button>
      <button class="office-menu-item" data-action="paste">
        <span class="office-menu-item__icon"><i class="fas fa-paste"></i></span>
        <span class="office-menu-item__label">Paste</span>
        <span class="office-menu-item__shortcut">Ctrl+V</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="selectAll">
        <span class="office-menu-item__icon"><i class="fas fa-border-all"></i></span>
        <span class="office-menu-item__label">Select All</span>
        <span class="office-menu-item__shortcut">Ctrl+A</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="find">
        <span class="office-menu-item__icon"><i class="fas fa-search"></i></span>
        <span class="office-menu-item__label">Find</span>
        <span class="office-menu-item__shortcut">Ctrl+F</span>
      </button>
      <button class="office-menu-item" data-action="replace">
        <span class="office-menu-item__icon"><i class="fas fa-exchange-alt"></i></span>
        <span class="office-menu-item__label">Find & Replace</span>
        <span class="office-menu-item__shortcut">Ctrl+H</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">View</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="zoomIn">
        <span class="office-menu-item__icon"><i class="fas fa-search-plus"></i></span>
        <span class="office-menu-item__label">Zoom In</span>
        <span class="office-menu-item__shortcut">Ctrl++</span>
      </button>
      <button class="office-menu-item" data-action="zoomOut">
        <span class="office-menu-item__icon"><i class="fas fa-search-minus"></i></span>
        <span class="office-menu-item__label">Zoom Out</span>
        <span class="office-menu-item__shortcut">Ctrl+-</span>
      </button>
      <button class="office-menu-item" data-action="zoomReset">
        <span class="office-menu-item__icon"><i class="fas fa-search"></i></span>
        <span class="office-menu-item__label">Reset Zoom</span>
        <span class="office-menu-item__shortcut">Ctrl+0</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="fullscreen">
        <span class="office-menu-item__icon"><i class="fas fa-expand"></i></span>
        <span class="office-menu-item__label">Fullscreen</span>
        <span class="office-menu-item__shortcut">F11</span>
      </button>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="toggleGrid">
        <span class="office-menu-item__icon"><i class="fas fa-border-all"></i></span>
        <span class="office-menu-item__label">Show Gridlines</span>
        <span class="office-menu-item__check"><i class="fas fa-check"></i></span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Insert</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item office-menu-item--document" data-action="insertImage">
        <span class="office-menu-item__icon"><i class="fas fa-image"></i></span>
        <span class="office-menu-item__label">Image</span>
      </button>
      <button class="office-menu-item office-menu-item--document" data-action="insertTable">
        <span class="office-menu-item__icon"><i class="fas fa-table"></i></span>
        <span class="office-menu-item__label">Table</span>
      </button>
      <button class="office-menu-item office-menu-item--document" data-action="insertLink">
        <span class="office-menu-item__icon"><i class="fas fa-link"></i></span>
        <span class="office-menu-item__label">Link</span>
        <span class="office-menu-item__shortcut">Ctrl+K</span>
      </button>
      <button class="office-menu-item office-menu-item--document" data-action="insertHR">
        <span class="office-menu-item__icon"><i class="fas fa-minus"></i></span>
        <span class="office-menu-item__label">Horizontal Line</span>
      </button>
      <div class="office-menu-divider office-menu-item--spreadsheet"></div>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="addRow">
        <span class="office-menu-item__icon"><i class="fas fa-plus"></i></span>
        <span class="office-menu-item__label">Row</span>
      </button>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="addColumn">
        <span class="office-menu-item__icon"><i class="fas fa-plus"></i></span>
        <span class="office-menu-item__label">Column</span>
      </button>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="addSheet">
        <span class="office-menu-item__icon"><i class="fas fa-file-alt"></i></span>
        <span class="office-menu-item__label">New Sheet</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Format</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="formatBold">
        <span class="office-menu-item__icon"><i class="fas fa-bold"></i></span>
        <span class="office-menu-item__label">Bold</span>
        <span class="office-menu-item__shortcut">Ctrl+B</span>
      </button>
      <button class="office-menu-item" data-action="formatItalic">
        <span class="office-menu-item__icon"><i class="fas fa-italic"></i></span>
        <span class="office-menu-item__label">Italic</span>
        <span class="office-menu-item__shortcut">Ctrl+I</span>
      </button>
      <button class="office-menu-item" data-action="formatUnderline">
        <span class="office-menu-item__icon"><i class="fas fa-underline"></i></span>
        <span class="office-menu-item__label">Underline</span>
        <span class="office-menu-item__shortcut">Ctrl+U</span>
      </button>
      <button class="office-menu-item" data-action="formatStrike">
        <span class="office-menu-item__icon"><i class="fas fa-strikethrough"></i></span>
        <span class="office-menu-item__label">Strikethrough</span>
      </button>
      <div class="office-menu-divider"></div>
      <div class="office-menu-submenu">
        <button class="office-menu-item office-menu-item--has-submenu">
          <span class="office-menu-item__icon"><i class="fas fa-paragraph"></i></span>
          <span class="office-menu-item__label">Paragraph</span>
          <span class="office-menu-item__arrow"><i class="fas fa-caret-right"></i></span>
        </button>
        <div class="office-menu-submenu__content">
          <button class="office-menu-item" data-action="alignLeft">
            <span class="office-menu-item__icon"><i class="fas fa-align-left"></i></span>
            <span class="office-menu-item__label">Align Left</span>
          </button>
          <button class="office-menu-item" data-action="alignCenter">
            <span class="office-menu-item__icon"><i class="fas fa-align-center"></i></span>
            <span class="office-menu-item__label">Align Center</span>
          </button>
          <button class="office-menu-item" data-action="alignRight">
            <span class="office-menu-item__icon"><i class="fas fa-align-right"></i></span>
            <span class="office-menu-item__label">Align Right</span>
          </button>
          <button class="office-menu-item" data-action="alignJustify">
            <span class="office-menu-item__icon"><i class="fas fa-align-justify"></i></span>
            <span class="office-menu-item__label">Justify</span>
          </button>
        </div>
      </div>
      <div class="office-menu-submenu">
        <button class="office-menu-item office-menu-item--has-submenu">
          <span class="office-menu-item__icon"><i class="fas fa-heading"></i></span>
          <span class="office-menu-item__label">Heading</span>
          <span class="office-menu-item__arrow"><i class="fas fa-caret-right"></i></span>
        </button>
        <div class="office-menu-submenu__content">
          <button class="office-menu-item" data-action="heading1">
            <span class="office-menu-item__label" style="font-size:18px;font-weight:bold">Heading 1</span>
          </button>
          <button class="office-menu-item" data-action="heading2">
            <span class="office-menu-item__label" style="font-size:16px;font-weight:bold">Heading 2</span>
          </button>
          <button class="office-menu-item" data-action="heading3">
            <span class="office-menu-item__label" style="font-size:14px;font-weight:bold">Heading 3</span>
          </button>
          <button class="office-menu-item" data-action="paragraph">
            <span class="office-menu-item__label">Normal Text</span>
          </button>
        </div>
      </div>
      <div class="office-menu-divider"></div>
      <button class="office-menu-item" data-action="clearFormat">
        <span class="office-menu-item__icon"><i class="fas fa-eraser"></i></span>
        <span class="office-menu-item__label">Clear Formatting</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Tools</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="spellCheck">
        <span class="office-menu-item__icon"><i class="fas fa-check"></i></span>
        <span class="office-menu-item__label">Spell Check</span>
      </button>
      <button class="office-menu-item" data-action="wordCount">
        <span class="office-menu-item__icon"><i class="fas fa-list-ol"></i></span>
        <span class="office-menu-item__label">Word Count</span>
      </button>
      <div class="office-menu-divider office-menu-item--spreadsheet"></div>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="sortAsc">
        <span class="office-menu-item__icon"><i class="fas fa-sort-alpha-down"></i></span>
        <span class="office-menu-item__label">Sort A → Z</span>
      </button>
      <button class="office-menu-item office-menu-item--spreadsheet" data-action="sortDesc">
        <span class="office-menu-item__icon"><i class="fas fa-sort-alpha-up"></i></span>
        <span class="office-menu-item__label">Sort Z → A</span>
      </button>
    </div>
  </div>

  <div class="office-menu-dropdown app-menubar-item">
    <button class="office-menu-dropdown__trigger">Help</button>
    <div class="office-menu-dropdown__content">
      <button class="office-menu-item" data-action="shortcuts">
        <span class="office-menu-item__icon"><i class="fas fa-keyboard"></i></span>
        <span class="office-menu-item__label">Keyboard Shortcuts</span>
      </button>
      <button class="office-menu-item" data-action="about">
        <span class="office-menu-item__icon"><i class="fas fa-info-circle"></i></span>
        <span class="office-menu-item__label">About</span>
      </button>
    </div>
  </div>
</div>
      <div class="office-window-content">
        <div class="office-editor-area">
          <div class="office-loading-indicator">Loading...</div>
        </div>
      </div>
    `,d=h.window.create(l,`${n} - Office`,o.width||"800px",o.height||"600px",{icon:"static/icons/office.webp",style:{left:"200px",top:"100px",...o.style||{}}}),f=g("div",{className:"window-content"});C(f,{width:"100%",height:"100%",overflow:"hidden"}),f.innerHTML=c,d.appendChild(f);const p=T(".office-editor-area",d),u={winId:l,title:n,filePath:i,ext:r,editor:null,workbook:null,activeSheet:null,editorType:null,rawArrayBuffer:null};this.setupMenuBar(d,u),this.editors[l]=u,this.setupMenuActions(d,u),t!==null?this.initEditor(p,t,u,d).catch(b=>{console.error("Editor init error:",b),J(p,`<div class="office-error-msg">Error loading file: ${b.message}</div>`)}):(T(".office-loading-indicator",p)?.remove(),this.showDropZone(p,u,d))}async saveFilesToDocuments(e){if(!this.fs||!e||e.length===0)return[];const t=["Documents"];await h.fs.mkdir(t);const i=[];for(const n of e)try{const o=w.getExtension(n.name),s=w.mimeForExtension(o);let a;w.isBinaryExtension(o)?a=w.arrayBufferToDataUrl(n.arrayBuffer,s):a=new TextDecoder().decode(n.arrayBuffer),await h.fs.write([...t,n.name],a),i.push({name:n.name,path:t,arrayBuffer:n.arrayBuffer})}catch(o){console.error(`Error saving ${n.name}:`,o)}if(i.length>0){const n=i.map(o=>o.name).join(", ");h.notify.send(`Saved to Documents as ${n}`),L(i.length===1?"All saved to your Documents folder!":`I've saved ${i.length} files to your Documents folder!`,B.Greeting)}return i}showDropZone(e,t,i){const n=g("div",{className:"office-dropzone",html:`
    <div class="office-dropzone__icon"><i class="fas fa-file-upload fa-3x"></i></div>
    <div class="office-dropzone__title">Drop file(s) here or click to upload</div>
    <div class="office-dropzone__subtitle">Supports: DOCX, XLSX, XLS, CSV, ODT, PDF, ODP, TXT, HTML (Multiple files supported)</div>
  `});A(n,"dragover",o=>{o.preventDefault(),o.stopPropagation(),H(n,"office-dropzone--active")}),A(n,"dragleave",o=>{o.preventDefault(),o.stopPropagation(),P(n,"office-dropzone--active")}),A(n,"drop",async o=>{o.preventDefault(),o.stopPropagation(),P(n,"office-dropzone--active");const s=Array.from(o.dataTransfer.files);s.length>0&&await this.handleMultipleFiles(s,e,t,i)}),A(n,"click",async()=>{const o=await z.triggerUpload(!0);o.length>0&&await this.handleUploadedFiles(o,e,t,i)}),e.appendChild(n)}async handleMultipleFiles(e,t,i,n){const o=[];for(const s of e)try{const a=await s.arrayBuffer();o.push({name:s.name,arrayBuffer:a})}catch(a){console.error(`Error reading file ${s.name}:`,a)}await this.handleUploadedFiles(o,t,i,n)}async handleUploadedFiles(e,t,i,n){if(e.length===0)return;const o=await this.saveFilesToDocuments(e);if(o.length>0){const s=o[0];this.applyFileToState(s.name,i,n),i.filePath=s.path,await this.replaceEditorContent(t,s.arrayBuffer,i,n);for(let a=1;a<o.length;a++){const l=o[a];this.open(l.name,l.arrayBuffer,l.path)}}}applyFileToState(e,t,i){t.title=e,t.ext=w.getExtension(e),h.window.setTitle(i.id,`${e} - Office`)}async replaceEditorContent(e,t,i,n){e.innerHTML="";const o=g("div",{className:"office-loading-indicator",text:"Loading..."});e.appendChild(o),await this.initEditor(e,t,i,n)}async initEditor(e,t,i,n){let o=await w.toArrayBuffer(t);if(!o&&i.ext&&i.filePath){const a=i.ext.toLowerCase();if([".pdf",".docx",".xlsx",".xls",".pptx",".ppt"].includes(a))try{const l=await h.fs.read([...i.filePath,i.title]);l&&(o=await l.arrayBuffer())}catch(l){console.error("Error loading from binary storage:",l)}}o&&(i.rawArrayBuffer=o),T(".office-loading-indicator",e)?.remove();const s=this.registry.getStrategy(i.ext);s&&await s.init(e,o,i),this.setupIdleDetection(n,i.ext)}setupMenuActions(e,t){const i={new:()=>this.createNewFile(e,t),open:()=>this.openFileViaUpload(e,t),save:()=>this.saveFile(e,t),saveAs:()=>this.saveAsFile(t),download:()=>this.downloadFile(t),exportPDF:()=>this.exportToPDF(t),exportHTML:()=>this.exportToHTML(t),exportTXT:()=>this.exportToTXT(t),print:()=>this.printDocument(e,t),cut:()=>this.cutToClipboard(t),copy:()=>this.copyToClipboard(t),paste:()=>this.pasteFromClipboard(t),undo:()=>this.executeCommand("undo",t),redo:()=>this.executeCommand("redo",t),selectAll:()=>this.executeCommand("selectAll",t),find:()=>this.showFindDialog(e,t),replace:()=>this.showReplaceDialog(e,t),zoomIn:()=>this.adjustZoom(e,t,1.1),zoomOut:()=>this.adjustZoom(e,t,.9),zoomReset:()=>this.resetZoom(e,t),fullscreen:()=>this.toggleFullscreen(e),toggleGrid:()=>this.toggleGrid(e,t),insertImage:()=>this.insertImage(t),insertTable:()=>this.insertTable(t),insertLink:()=>this.insertLink(t),insertHR:()=>this.executeCommand("insertHorizontalRule",t),addRow:()=>this.addSpreadsheetRow(t),addColumn:()=>this.addSpreadsheetColumn(t),addSheet:()=>this.addSpreadsheetSheet(t),formatBold:()=>this.executeCommand("bold",t),formatItalic:()=>this.executeCommand("italic",t),formatUnderline:()=>this.executeCommand("underline",t),formatStrike:()=>this.executeCommand("strikeThrough",t),alignLeft:()=>this.executeCommand("justifyLeft",t),alignCenter:()=>this.executeCommand("justifyCenter",t),alignRight:()=>this.executeCommand("justifyRight",t),alignJustify:()=>this.executeCommand("justifyFull",t),heading1:()=>this.formatBlock("h1",t),heading2:()=>this.formatBlock("h2",t),heading3:()=>this.formatBlock("h3",t),paragraph:()=>this.formatBlock("p",t),clearFormat:()=>this.executeCommand("removeFormat",t),spellCheck:()=>this.spellCheck(t),wordCount:()=>this.showWordCount(e,t),sortAsc:()=>this.sortSpreadsheet(t,!0),sortDesc:()=>this.sortSpreadsheet(t,!1),shortcuts:()=>this.showShortcuts(e),about:()=>this.showAbout(e)};k(".office-menu-item[data-action]",e).forEach(n=>{const o=i[n.dataset.action];o&&A(n,"click",s=>{s.stopPropagation(),k(".office-menu-dropdown",e).forEach(a=>P(a,"active")),o()})}),this.setupKeyboardShortcuts(e,t,i)}async sortSpreadsheet(e,t=!0){if(e.editorType!=="spreadsheet"||!e.editor){h.notify.send("Sorting only works in spreadsheets");return}const n=e.editor.querySelector("tbody");if(!n)return;const o=Array.from(n.querySelectorAll("tr"));if((o[0]?.querySelectorAll("td").length||0)===0)return;const a=0;o.sort((c,d)=>{const f=c.querySelectorAll("td")[a]?.textContent||"",p=d.querySelectorAll("td")[a]?.textContent||"",u=parseFloat(f),b=parseFloat(p);return!isNaN(u)&&!isNaN(b)?t?u-b:b-u:t?f.localeCompare(p):p.localeCompare(f)}).forEach(c=>n.appendChild(c));const r=await S.xlsx();this.syncNativeTable(e,r),h.notify.send(`Sorted ${t?"A→Z":"Z→A"}`)}setupKeyboardShortcuts(e,t,i){e.addEventListener("keydown",n=>{_.matches(n,"office.new")?(n.preventDefault(),i.new()):_.matches(n,"office.open")?(n.preventDefault(),i.open()):_.matches(n,"office.save")?(n.preventDefault(),i.save()):_.matches(n,"office.saveAs")?(n.preventDefault(),i.saveAs()):_.matches(n,"office.print")?(n.preventDefault(),i.print()):_.matches(n,"office.undo")?(n.preventDefault(),i.undo()):_.matches(n,"office.redo")?(n.preventDefault(),i.redo()):_.matches(n,"office.cut")?(n.preventDefault(),i.cut()):_.matches(n,"office.copy")?(n.preventDefault(),i.copy()):_.matches(n,"office.selectAll")?(n.preventDefault(),i.selectAll()):_.matches(n,"office.find")?(n.preventDefault(),i.find()):_.matches(n,"office.replace")?(n.preventDefault(),i.replace()):_.matches(n,"office.bold")?(n.preventDefault(),i.formatBold()):_.matches(n,"office.italic")?(n.preventDefault(),i.formatItalic()):_.matches(n,"office.underline")?(n.preventDefault(),i.formatUnderline()):_.matches(n,"office.insertLink")?(n.preventDefault(),i.insertLink()):_.matches(n,"office.zoomIn")?(n.preventDefault(),i.zoomIn()):_.matches(n,"office.zoomOut")?(n.preventDefault(),i.zoomOut()):_.matches(n,"office.zoomReset")?(n.preventDefault(),i.zoomReset()):_.matches(n,"office.fullscreen")&&(n.preventDefault(),i.fullscreen())}),e.addEventListener("paste",n=>{const o=document.activeElement;if(o?.classList.contains("office-spreadsheet__cell")){n.preventDefault();const s=n.clipboardData?.getData("text/plain")||"";o.textContent=s}})}executeCommand(e,t){t.editorType==="contenteditable"&&t.editor&&(t.editor.focus(),document.execCommand(e))}formatBlock(e,t){t.editorType==="contenteditable"&&t.editor&&(t.editor.focus(),document.execCommand("formatBlock",!1,e))}resetZoom(e){const t=T(".office-editor-area",e);t.dataset.zoom="1",C(t,{zoom:"1"})}insertImage(e){if(e.editorType!=="contenteditable")return;const t=g("input",{attributes:{type:"file",accept:"image/*"}});t.onchange=async i=>{const n=i.target.files[0];if(!n)return;const o=new FileReader;o.onload=()=>{document.execCommand("insertImage",!1,o.result)},o.readAsDataURL(n)},t.click()}async insertTable(e){if(e.editorType!=="contenteditable")return;const t=await h.dialog.prompt("Prompt","How many rows?","3"),i=await h.dialog.prompt("Prompt","How many columns?","3");if(!t||!i)return;let n='<table style="border-collapse:collapse;width:100%">';for(let o=0;o<parseInt(t);o++){n+="<tr>";for(let s=0;s<parseInt(i);s++)n+='<td style="border:1px solid var(--glass-border);padding:8px">&nbsp;</td>';n+="</tr>"}n+="</table>",document.execCommand("insertHTML",!1,n)}async insertLink(e){if(e.editorType!=="contenteditable")return;const t=await h.dialog.prompt("Prompt","Enter a URL:","https://");t&&document.execCommand("createLink",!1,t)}showWordCount(e,t){let i="";t.editorType==="contenteditable"&&t.editor?i=t.editor.innerText:t.odtHtml&&(i=g("div",{html:t.odtHtml}).innerText);const n=i.trim().split(/\s+/).filter(a=>a.length>0).length,o=i.length;i.replace(/\s/g,"").length;const s=i.split(`
`).length;h.notify.send(`${n} words · ${o} chars · ${s} lines`)}showShortcuts(){h.notify.send(`
    <div class="office-shortcuts-container">
      <div><b>File</b></div>
      <div>Ctrl+N - New</div>
      <div>Ctrl+O - Open</div>
      <div>Ctrl+S - Save</div>
      <div>Ctrl+Shift+S - Save As</div>
      <div>Ctrl+P - Print</div>
      <br>
      <div><b>Edit</b></div>
      <div>Ctrl+Z - Undo</div>
      <div>Ctrl+Y - Redo</div>
      <div>Ctrl+X/C/V - Cut/Copy/Paste</div>
      <div>Ctrl+A - Select All</div>
      <div>Ctrl+F - Find</div>
      <div>Ctrl+H - Replace</div>
      <br>
      <div><b>Format</b></div>
      <div>Ctrl+B - Bold</div>
      <div>Ctrl+I - Italic</div>
      <div>Ctrl+U - Underline</div>
      <br>
      <div><b>View</b></div>
      <div>Ctrl++ - Zoom In</div>
      <div>Ctrl+- - Zoom Out</div>
      <div>Ctrl+0 - Reset Zoom</div>
      <div>F11 - Fullscreen</div>
    </div>
  `)}showAbout(e){K({title:"Office",version:"1.0.0",description:"YukiOS Office Suite for editing documents, spreadsheets, and presentations.",icon:"static/icons/office.webp",iconType:"image"})}spellCheck(e){e.editorType==="contenteditable"&&e.editor&&(e.editor.spellcheck=!e.editor.spellcheck,h.notify.send(`Spell check ${e.editor.spellcheck?"on":"off"}`))}toggleGrid(e,t){if(t.editorType==="spreadsheet"){const i=T(".office-spreadsheet",e);i&&Y(i,"office-spreadsheet--no-grid")}}exportToTXT(e){let t="";e.editorType==="contenteditable"&&e.editor&&(t=e.editor.innerText),z.triggerDownload(`${e.title}.txt`,t),h.notify.send("Exported as .txt")}async createNewFile(e,t){if(await h.dialog.confirm("Confirm","Start a new file? Any unsaved changes will be lost.")){const i=T(".office-editor-area",e);t.title="Untitled",t.filePath=null,t.rawArrayBuffer=null,this.replaceEditorContent(i,"",t,e),h.window.setTitle(e.id,"Untitled - Office")}}async showFindDialog(e,t){const i=await h.dialog.prompt("Prompt","Find what?");i&&(t.editorType==="contenteditable"&&t.editor?window.find(i):t.editorType==="spreadsheet"&&this.findInSpreadsheet(t,i))}async showReplaceDialog(e,t){const i=await h.dialog.prompt("Prompt","Find what?");if(!i)return;const n=await h.dialog.prompt("Prompt","Replace with");if(n!==null&&t.editorType==="contenteditable"&&t.editor){const o=t.editor.innerHTML;t.editor.innerHTML=o.replaceAll(i,n)}}async copyToClipboard(e){if(e.editorType==="contenteditable"&&e.editor){e.editor.focus();const i=window.getSelection().toString();if(!i){h.notify.send("Select something first to copy");return}try{await navigator.clipboard.writeText(i)}catch{document.execCommand("copy")}}else if(e.editorType==="spreadsheet"){const t=document.activeElement;if(t?.classList.contains("office-spreadsheet__cell")){const i=window.getSelection().toString()||t.textContent;try{await navigator.clipboard.writeText(i)}catch{document.execCommand("copy")}}}}async cutToClipboard(e){if(e.editorType==="contenteditable"&&e.editor){e.editor.focus();const i=window.getSelection().toString();if(!i){h.notify.send("Select something first to cut");return}try{await navigator.clipboard.writeText(i),document.execCommand("delete"),h.notify.send("Cut to clipboard")}catch{document.execCommand("cut")}}else if(e.editorType==="spreadsheet"){const t=document.activeElement;if(t?.classList.contains("office-spreadsheet__cell"))try{await navigator.clipboard.writeText(t.textContent),t.textContent="",h.notify.send("Cut to clipboard")}catch{document.execCommand("cut")}}}async pasteFromClipboard(e){if(e.editorType==="contenteditable"&&e.editor){e.editor.focus();try{const t=await navigator.clipboard.readText();document.execCommand("insertText",!1,t)}catch{h.notify.send("Can't access clipboard. Try Ctrl+V.")}}else if(e.editorType==="spreadsheet"){const t=document.activeElement;if(t?.classList.contains("office-spreadsheet__cell"))try{const i=await navigator.clipboard.readText();t.textContent=i}catch{h.notify.send("Can't access clipboard. Try Ctrl+V.")}}}printDocument(e,t){const i=window.open("","","width=800,height=600");let n="";t.editorType==="contenteditable"?n=t.editor.innerHTML:t.editorType==="odt-iframe"&&(n=t.odtHtml);const o=t.title.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");i.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${o}</title>
        <link rel="stylesheet" href="styles/office.css">
      </head>
      <body class="office-print-content">${n}</body>
    </html>
  `),i.document.close(),i.focus(),setTimeout(()=>{i.print(),i.close()},250)}adjustZoom(e,t,i){const n=T(".office-editor-area",e),o=parseFloat(n.dataset.zoom||"1"),s=Math.max(.5,Math.min(3,o*i));n.dataset.zoom=s,C(n,{zoom:s})}toggleFullscreen(e){if(!e.classList.contains("office-fullscreen"))e.dataset.previousStyle=JSON.stringify({left:e.style.left,top:e.style.top,width:e.style.width,height:e.style.height}),C(e,{left:"0",top:"0",width:"100vw",height:"100vh"}),H(e,"office-fullscreen");else{const t=JSON.parse(e.dataset.previousStyle||"{}");C(e,t),P(e,"office-fullscreen")}}async addSpreadsheetRow(e){if(e.editorType!=="spreadsheet"||!e.editor)return;const i=e.editor.querySelector("tbody");if(!i)return;const n=i.querySelectorAll("tr"),o=n[0]?.querySelectorAll("td").length||26,s=n.length,a=g("tr"),l=g("th",{className:"office-th-row",text:String(s+1)});a.appendChild(l);const r=document.createDocumentFragment();for(let c=0;c<o;c++){const d=g("td",{className:"office-cell",attributes:{contentEditable:"true"}});d.dataset.row=s,d.dataset.col=c,r.appendChild(d)}a.appendChild(r),i.appendChild(a),h.notify.send("Row added")}async addSpreadsheetColumn(e){if(e.editorType!=="spreadsheet"||!e.editor)return;const t=e.editor,i=t.querySelector("thead"),n=t.querySelector("tbody");if(!i||!n)return;const o=i.querySelectorAll("th").length-1,s=g("th",{className:"office-th-col",text:String.fromCharCode(65+o)});i.querySelector("tr").appendChild(s),n.querySelectorAll("tr").forEach((a,l)=>{const r=g("td",{className:"office-cell",attributes:{contentEditable:"true"}});r.dataset.row=l,r.dataset.col=o,a.appendChild(r)}),h.notify.send("New column added")}async addSpreadsheetSheet(e){if(e.editorType!=="spreadsheet"||!e.workbook)return;const t=await h.dialog.prompt("Prompt","Name your sheet:",`Sheet${e.workbook.SheetNames.length+1}`);if(!t)return;const i=await S.xlsx(),n=Array.from({length:50},()=>Array(26).fill(""));i.utils.book_append_sheet(e.workbook,i.utils.aoa_to_sheet(n),t),e.activeSheet=t;const o=T(`#${e.winId} .office-editor-area`);o.innerHTML="",new I().renderNativeTable(o,e.workbook,e,i)}async exportToPDF(e){if([".pdf",".odp"].includes(e.ext)||!e.editor){h.notify.send("Export to PDF","This format cannot be exported to PDF.",{type:"warning"});return}try{h.notify.send("Export to PDF","Generating PDF, please wait...");const i=await S.jsPDF(),n=await S.html2canvas(),o=this.getExportSourceNode(e);if(!o){h.notify.send("Export to PDF","Nothing to export.",{type:"warning"});return}const s=o.cloneNode(!0),a=g("div",{className:"office-pdf-export-source"});C(a,{position:"fixed",left:"-10000px",top:"0",width:"794px",background:"#ffffff",color:"#000000",padding:"32px",boxSizing:"border-box",fontFamily:"sans-serif",fontSize:"14px",lineHeight:"1.5",zIndex:"-1"}),a.appendChild(s),document.body.appendChild(a);const l=new i({unit:"pt",format:"a4"}),r=l.internal.pageSize.getWidth(),c=24,d=r-c*2;await l.html(a,{html2canvas:{scale:2,backgroundColor:"#ffffff",useCORS:!0,allowTaint:!0},x:c,y:c,width:d,windowWidth:794,autoPaging:"slice",callback:f=>{f.save(`${e.title}.pdf`),a.remove(),h.notify.send("Export to PDF",`Saved ${e.title}.pdf`)}})}catch(i){console.error("PDF export error:",i),h.notify.send("Export to PDF","Failed to generate PDF.",{type:"error"})}}getExportSourceNode(e){return e.editorType==="contenteditable"&&e.editor?e.editor:e.editorType==="odt-iframe"&&e.editor&&e.editor.contentDocument?e.editor.contentDocument.body:e.editorType==="spreadsheet"&&e.editor?e.editor:e.editorType==="pdf"||e.editorType==="presentation"?null:e.editor||null}async exportToHTML(e){const t=this.getEditorContent(e),i=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${e.title}</title>
  <link rel="stylesheet" href="styles/office.css">
</head>
<body class="office-doc-export">${t}</body>
</html>`;z.triggerDownload(`${e.title}.html`,i),h.notify.send("Exported as .html")}findInSpreadsheet(e,t){const i=k(".office-spreadsheet__cell");i.forEach(n=>P(n,"office-cell-highlight")),i.forEach(n=>{n.textContent.toLowerCase().includes(t.toLowerCase())&&(H(n,"office-cell-highlight"),n.scrollIntoView({behavior:"smooth",block:"center"}))})}setupMenuBar(e,t){const i=T(".app-menubar",e),n=t.ext,o=[".xlsx",".xls",".csv"].includes(n),s=[".pdf",".odp",".odt"].includes(n),a=[".docx",".txt",".html",""].includes(n)||!n;i.dataset.mode=o?"spreadsheet":"document";const l=T(".office-menu-dropdown:nth-child(5)",e);l&&C(l,{display:a?"":"none"});const r=T(".office-menu-dropdown:nth-child(4)",e);k(".office-menu-item--document",e).forEach(p=>{C(p,{display:a?"":"none"})}),k(".office-menu-item--spreadsheet",e).forEach(p=>{C(p,{display:o?"":"none"})}),r&&C(r,{display:s?"none":""});const c=T(".office-menu-dropdown:nth-child(2)",e);s&&c&&k(".office-menu-item",c).forEach(p=>{H(p,"office-menu-item--disabled"),C(p,{pointerEvents:"none",opacity:"0.5"})}),k('[data-action^="sort"]',e).forEach(p=>{C(p,{display:o?"":"none"})}),k(".office-menu-divider.office-menu-item--spreadsheet",e).forEach(p=>{C(p,{display:o?"":"none"})}),k('[data-action="toggleGrid"]',e).forEach(p=>{C(p,{display:o?"":"none"})});const d=k(".office-menu-dropdown",e);d.forEach(p=>{const u=T(".office-menu-dropdown__trigger",p);if(!u)return;const b=u.cloneNode(!0);u.parentNode.replaceChild(b,u),A(b,"click",y=>{y.stopPropagation();const x=p.classList.contains("active");d.forEach(v=>P(v,"active")),x||H(p,"active")}),A(b,"mouseenter",()=>{const y=T(".office-menu-dropdown.active",e);y&&y!==p&&(d.forEach(x=>P(x,"active")),H(p,"active"))})});const f=p=>{p.target.closest(".office-menu-dropdown")||d.forEach(u=>P(u,"active"))};document.removeEventListener("click",e.closeDropdownsHandler),e.closeDropdownsHandler=f,document.addEventListener("click",f)}async openFileViaUpload(e,t){L("Looking for something?",B.Searching);const i=await z.triggerUpload(!0);if(i.length===0)return;const n=T(".office-editor-area",e);await this.handleUploadedFiles(i,n,t,e)}setupIdleDetection(e,t){const i=e.querySelector(".office-richtext-editor")||e.querySelector(".office-spreadsheet");if(!i)return;const n=()=>{this.idleTimer&&clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{const s=[".xlsx",".xls",".csv"].includes(t)?"Still there? Need help with your spreadsheet?":"Still there? I can check your formatting.";L(s,B.IdleEyeBrowRaise)},this.idleDelay)};i.addEventListener("input",n),i.addEventListener("keydown",n);const o=new MutationObserver(()=>{document.contains(e)||(this.idleTimer&&clearTimeout(this.idleTimer),o.disconnect())});o.observe(desktop,{childList:!0})}getEditorContent(e){return e.editorType==="contenteditable"&&e.editor?e.editor.innerHTML:e.editorType==="spreadsheet"&&e.workbook?e.workbook:""}async generateFileContent(e){const t=e.ext,i=[".pdf",".odp"];if(t===".xlsx"||t===".xls"){if(e.workbook){const n=await S.xlsx();return await I.syncTable(e),new Uint8Array(n.write(e.workbook,{bookType:t===".xls"?"xls":"xlsx",type:"array"}))}return new Uint8Array}if(t===".csv"){if(e.workbook){const n=await S.xlsx();return await I.syncTable(e),n.utils.sheet_to_csv(e.workbook.Sheets[e.activeSheet])}return""}if(t===".docx"){const n=this.getEditorContent(e);try{const{Document:o,Packer:s}=await S.docx(),a=await W.toDocxParagraphs(n),l=new o({sections:[{children:a}]});return new Uint8Array(await s.toBuffer(l))}catch{return new Blob([n],{type:"text/html"})}}return t===".odt"?W.toOdtBlob(this.getEditorContent(e)):i.includes(t)?e.rawArrayBuffer?new Uint8Array(e.rawArrayBuffer):(L("This format is read-only.",B.CheckingSomething),null):this.getEditorContent(e)}async saveFile(e,t){if(!t.filePath&&this.explorerApp){this.saveAsFile(t);return}try{const i=await this.generateFileContent(t);if(i===null)return;if(t.filePath&&this.fs){const n=t.ext;if(n===".pdf"&&i instanceof Uint8Array){const o=new Blob([i],{type:"application/pdf"});await h.fs.write(t.filePath,t.title,o,Q.OTHER,"/static/icons/pdf.webp")}else if(w.isBinaryExtension(n)&&i instanceof Uint8Array){const o=w.mimeForExtension(n),s=w.arrayBufferToDataUrl(i.buffer,o);await h.fs.write(t.filePath,s)}else await h.fs.write(t.filePath,i);h.notify.send(`Saved: ${t.title}`),L("Great, your file has been saved!",B.Greeting)}else this.downloadFile(t)}catch(i){console.error("Save error:",i),O().playCriticalWarning(),h.notify.send("Couldn't save that file")}}async saveAsFile(e){if(this.explorerApp){const t=e.title.includes(".")?e.title:`${e.title}${e.ext||".docx"}`;this.explorerApp.openSaveDialog(t,async(i,n)=>{try{const o=w.getExtension(n);o&&o!==e.ext&&(e.ext=o);const s=await this.generateFileContent(e);if(s===null)return;let a=s;if(w.isBinaryExtension(e.ext)&&s instanceof Uint8Array){const r=w.mimeForExtension(e.ext);a=w.arrayBufferToDataUrl(s.buffer,r)}await h.fs.write([...i,n],a);const l=i.length?`/${i.join("/")}/${n}`:`/${n}`;e.title=n,e.filePath=[...i,n],h.notify.send(`Saved: ${l}`),L("Great, your file has been saved!",B.Greeting)}catch{O().playCriticalWarning(),h.notify.send("Couldn't save that file")}})}else await this.downloadFile(e)}async downloadFile(e){try{const t=await this.generateFileContent(e);if(t===null)return;const i=e.title.includes(".")?e.title:`${e.title}${e.ext||".txt"}`;z.triggerDownload(i,t),h.notify.send(`Downloaded ${i}`),L("Great, your file has been downloaded!",B.Greeting)}catch{O().playCriticalWarning(),h.notify.send("Couldn't download that file")}}openFileDialog(){this.open()}loadContent(e,t,i){this.open(e,t,i)}}export{ce as OfficeApp};
