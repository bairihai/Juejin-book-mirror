(window.webpackJsonp=window.webpackJsonp||[]).push([[197],{3106:function(t,e,n){},4371:function(t,e,n){"use strict";n(3106)},4560:function(t,e,n){"use strict";n.r(e);n(16),n(15),n(11),n(6),n(14),n(39);var o=n(0),r=n(4),c=n(84),l=n(183),v=n(49),d=n(7),h=n(3064);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _="https://juejin.cn/extension/?utm_source=standalone&utm_medium=Pop-ups2&utm_campaign=extension_promotion",x=["gettingStarted","pin"],j={timelineIndex:1,column:2,other:3},O=Object(d.b)({data:function(){return{extLink:_,timer:null,visibleForRoute:!0,visibleExtension:!1}},computed:f(f({},Object(c.mapGetters)({logined:r.LOGINED})),{},{isFromExtension:function(){var t,e;return(null===(e=null===(t=this.$route)||void 0===t?void 0:t.query)||void 0===e?void 0:e.utm_source)===l.i},visible:function(){return this.visibleExtension&&this.visibleForRoute},teaFromValue:function(){return j[this.$route.name||""]||j.other}}),watch:{$route:function(t){x.indexOf(t.name)>-1?this.visibleForRoute=!1:this.visibleForRoute=!0},visible:function(t){t&&Object(v.d)("jj_ext_bottom_ad_show",{from:this.teaFromValue})}},mounted:function(){this.visibleExtension=this.checkVisibility(),this.visibleExtension&&this.loopGetExtensionState()},beforeDestroy:function(){var t;clearInterval(null!==(t=this.timer)&&void 0!==t?t:-1)},methods:{checkVisibility:function(){var t;return Object(h.a)(null===(t=this.$nuxt)||void 0===t?void 0:t.context,this.$route.query)},linkExtension:function(){var t=this;setTimeout((function(){t.hideExtension(!1)}),3e3),Object(v.d)("jj_ext_bottom_ad_download_click",{from:this.teaFromValue}),window.open(_,"_blank")},hideExtension:function(){var t,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$emit("close");var n=window.localStorage;n.setItem("hideExtension","true"),this.visibleExtension=!1,window.clearInterval(null!==(t=this.timer)&&void 0!==t?t:-1),e&&Object(v.d)("jj_ext_bottom_ad_close_click",{from:this.teaFromValue})},loopGetExtensionState:function(){var t=this;this.timer=window.setInterval((function(){var e;t.checkVisibility()||(t.visibleExtension=!1,clearInterval(null!==(e=t.timer)&&void 0!==e?e:-1))}),5e3)}}}),w=(n(4371),n(28)),component=Object(w.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.visible?n("div",{staticClass:"recommend-box"},[n("div",{staticClass:"extension",on:{click:t.linkExtension}},[t._m(0),t._v(" "),n("div",{staticClass:"ion-close",on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.hideExtension()}}})])]):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"link",attrs:{"data-growing-container":"true","data-growing-title":"掘金插件"}},[e("div",{staticClass:"title"},[this._v("稀土掘金浏览器插件——你的一站式工作台")]),this._v(" "),e("div",{staticClass:"description"},[this._v("\n        多内容聚合浏览、多引擎快捷搜索、多工具便捷提效、多模式随心畅享，你想要的，这里都有。\n      ")])])}],!1,null,"2da5e12f",null);e.default=component.exports}}]);