!function(){var o=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");function e(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}console.log(document.body.style.backgroundColor),o.addEventListener("click",(function(){document.body.style.backgroundColor=e();var n=setInterval((function(){document.body.style.backgroundColor=e()}),1e3);o.disabled=!0,t.addEventListener("click",(function(){clearInterval(n),o.disabled=!1}))}))}();
//# sourceMappingURL=01-color-switcher.9ef1b7c7.js.map
