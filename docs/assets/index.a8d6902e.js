import{d as i,r as m,o as d,c as p,a as o,t as _,F as f,p as g,b as h,e as a,f as v,g as y}from"./vendor.018de31c.js";const b=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}};b();var V="/assets/logo.03d6d6da.png";const k=1;var S=(r,n)=>{for(const[l,s]of n)r[l]=s;return r};const u=r=>(g("data-v-b4955ab6"),r=r(),h(),r),x=u(()=>o("p",null,[a(" Recommended IDE setup: "),o("a",{href:"https://code.visualstudio.com/",target:"_blank"},"VSCode"),a(" + "),o("a",{href:"https://github.com/johnsoncodehk/volar",target:"_blank"},"Volar")],-1)),I=u(()=>o("p",null,[o("a",{href:"https://vitejs.dev/guide/features.html",target:"_blank"}," Vite Documentation "),a(" | "),o("a",{href:"https://v3.vuejs.org/",target:"_blank"},"Vue 3 Documentation")],-1)),N=u(()=>o("p",null,[a(" Edit "),o("code",null,"components/HelloWorld.vue"),a(" to test hot module replacement. ")],-1)),L=i({props:{msg:String},setup(r){console.log(k);const n=m(0);return(l,s)=>(d(),p(f,null,[o("h1",null,_(r.msg),1),x,I,o("button",{type:"button",onClick:s[0]||(s[0]=e=>n.value++)}," count is: "+_(n.value),1),N],64))}});var j=S(L,[["__scopeId","data-v-b4955ab6"]]);const D=o("img",{alt:"Vue logo",src:V},null,-1),E=i({setup(r){return(n,l)=>(d(),p(f,null,[D,v(j,{msg:"Hello Vue 3 + Vite"})],64))}});y(E).mount("#app");