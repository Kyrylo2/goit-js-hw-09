!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var i=o("h6c0i");function r(e,n){new Promise((function(t,o){Math.random()>.3?t({position:e,delay:n}):o({position:e,delay:n})})).then((function(e){var n=e.position,t=e.delay;i.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;i.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms"))}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();var n=new FormData(e.target),t=Object.fromEntries(n),o=t.delay,i=t.step,a=t.amount,c=1,l=+o;setTimeout((function(){r(c,l);var e=setInterval((function(){r(++c,l),l+=+i,c===+a&&clearInterval(e)}),+i)}),+o)}))}();
//# sourceMappingURL=03-promises.2be9379b.js.map
