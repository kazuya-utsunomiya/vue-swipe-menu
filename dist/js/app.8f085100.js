(function(t){function e(e){for(var i,a,o=e[0],h=e[1],u=e[2],l=0,d=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&d.push(s[a][0]),s[a]=0;for(i in h)Object.prototype.hasOwnProperty.call(h,i)&&(t[i]=h[i]);c&&c(e);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,o=1;o<n.length;o++){var h=n[o];0!==s[h]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},s={app:0},r=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/dist/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],h=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var c=h;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"24e7":function(t,e,n){"use strict";var i=n("a690"),s=n.n(i);s.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"screen"},[t._v(t._s(t.currentPageA))]),n("SwipeMenu",{staticClass:"buttons",attrs:{loop:!0,currentPage:t.currentPageA,itemWidth:224},on:{move:t.onMoveA,"touch-end":t.onTouchEnd,"change-page":t.onChangePageA}},t._l(t.buttonsA,(function(e,i){return n("div",{key:i,staticClass:"infinity-swipe-item"},[n("button",{class:{active:t.currentPageA==i+1,disabled:e.disabled},on:{click:function(e){return t.onButtonClickA(i+1)}}},[t._v(" "+t._s(e.name)+" ")])])})),0),n("div",{staticClass:"screen"},[t._v(t._s(t.buttonsB[t.currentPageB-1].color))]),n("SwipeMenu",{staticClass:"buttons",attrs:{loop:!0,currentPage:t.currentPageB,itemWidth:50},on:{move:t.onMoveB,"touch-end":t.onTouchEnd,"change-page":t.onChangePageB}},t._l(t.buttonsB,(function(e,i){return n("div",{key:i,staticClass:"infinity-swipe-item"},[n("button",{staticClass:"btn-color",class:{active:t.currentPageB==i+1,disabled:e.disabled},style:"background-color:"+e.color+";",on:{click:function(e){return t.onButtonClickB(i+1)}}},[t._v(" "+t._s(e.color)+" ")])])})),0)],1)},r=[],a=(n("fb6a"),n("d3b7"),n("25f0"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"swipe_menu",class:[{dragging:t.dragging}],on:{touchstart:t._onTouchStart,mousedown:t._onTouchStart,wheel:t._onWheel}},[n("div",{ref:"infinitySwipeWrapper",staticClass:"wrapper",style:t.styleObject,on:{transitionend:t._onTransitionEnd}},[t._t("default")],2)])}),o=[],h=(n("d81d"),n("13d5"),n("a9e3"),{name:"SwipeMenu",props:{currentPage:{type:Number,default:1},loop:{type:Boolean,default:!1},speed:{type:Number,default:500},center:{type:Boolean,default:!0},itemWidth:{type:Number,default:100}},data:function(){return{lastPage:1,translateX:0,startTranslate:0,startTime:0,delta:0,dragging:!1,startPos:null,transitioning:!1,slideEls:[],translateOffset:0,transitionDuration:0,centerOffset:0,bulletWidth:null}},computed:{styleObject:function(){return{transform:"translate3d("+this.translateX+"px, 0, 0)",transitionDuration:this.transitionDuration+"ms"}}},mounted:function(){this.$nextTick((function(){this.center&&(this.handleResize(),this.translateOffset=this.centerOffset),this._onTouchMove=this._onTouchMove.bind(this),this._onTouchEnd=this._onTouchEnd.bind(this),this.slideEls=[].map.call(this.$refs.infinitySwipeWrapper.children,(function(t){return t})),this.loop?this.$nextTick((function(){this._createLoop(),this.setPage(this.currentPage,!0)})):this.setPage(this.currentPage)}))},watch:{currentPage:function(t){this.center&&(this.handleResize(),this.translateOffset=this.centerOffset),this.slideEls=[].map.call(this.$refs.infinitySwipeWrapper.children,(function(t){return t})),this.setPage(t,!1)}},methods:{next:function(){var t=this.currentPage;t<this.slideEls.length||this.loop?this.setPage(t+1):this._revert()},prev:function(){var t=this.currentPage;t>1||this.loop?this.setPage(t-1):this._revert()},setPage:function(t,e){if(!this.dragging){var n=this;if(this.loop)0===this.delta&&this._setTranslate(n._getTranslateOfPage(this.lastPage)),setTimeout((function(){n._setTranslate(n._getTranslateOfPage(t)),e||n._onTransitionStart()}),0);else{if(this._setTranslate(this._getTranslateOfPage(t)),e)return;this._onTransitionStart()}}this._isPageChanged()&&this.$emit("change-page",t),this.lastPage=this.currentPage},_onTouchStart:function(t){this.startPos=this._getTouchPos(t),this.delta=0,this.startTranslate=this._getTranslateOfPage(this.currentPage),this.startTime=(new Date).getTime(),this.dragging=!0,this.transitionDuration=0,document.addEventListener("touchmove",this._onTouchMove,{passive:!1}),document.addEventListener("touchend",this._onTouchEnd,!1),document.addEventListener("mousemove",this._onTouchMove,!1),document.addEventListener("mouseup",this._onTouchEnd,!1)},_onTouchMove:function(t){this.delta=this._getTouchPos(t)-this.startPos,this._setTranslate(this.startTranslate+this.delta);var e=Math.abs(this._getTranslate()-this.translateOffset),n=Math.ceil((e+this.itemWidth/2)/this.itemWidth);n!==this.currentPage&&this.setPage(n),this.$emit("move",n),Math.abs(this.delta)>0&&t.preventDefault()},_onTouchEnd:function(){this.dragging=!1,this.transitionDuration=this.speed,this.setPage(this.currentPage),document.removeEventListener("touchmove",this._onTouchMove),document.removeEventListener("touchend",this._onTouchEnd),document.removeEventListener("mousemove",this._onTouchMove),document.removeEventListener("mouseup",this._onTouchEnd),this.$emit("touch-end",this.currentPage,(new Date).getTime()-this.startTime)},_onWheel:function(){},_revert:function(){this.setPage(this.currentPage)},_getTouchPos:function(t){var e="pageX";return t.changedTouches?t.changedTouches[0][e]:t[e]},_onTransitionStart:function(){this.transitioning=!0,this.transitionDuration=this.speed,this._isPageChanged()?this.$emit("change-start",this.currentPage):this.$emit("revert-start",this.currentPage)},_onTransitionEnd:function(){this.transitioning=!1,this.transitionDuration=0,this.delta=0,this._isPageChanged()?this.$emit("change-end",this.currentPage):this.$emit("revert-end",this.currentPage)},_isPageChanged:function(){return this.lastPage!==this.currentPage},_setTranslate:function(t){var e="translateX";this[e]=t},_getTranslate:function(){var t="translateX";return this[t]},_getTranslateOfPage:function(t){if(0===t)return 0;var e="clientWidth";return-[].reduce.call(this.slideEls,(function(n,i,s){return s>t-2?n:n+i[e]}),0)+this.translateOffset},_createLoop:function(){},handleResize:function(){var t=this;this.bulletWidth||(this.bulletWidth=160,this.$refs.infinitySwipeWrapper.children[0]&&(this.bulletWidth=this.$refs.infinitySwipeWrapper.children[0].clientWidth));var e=Math.round(this.$el.clientWidth/2-this.bulletWidth/2);this.centerOffset!==e&&(this.centerOffset=e,this.translateOffset=this.centerOffset,this.setPage(this.currentPage)),this.center&&(window.requestAnimationFrame?window.requestAnimationFrame((function(){t.handleResize()})):setTimeout((function(){t.handleResize()}),1e3))}},serverCacheKey:function(t){return t.show}}),u=h,c=(n("cd8b"),n("2877")),l=Object(c["a"])(u,a,o,!1,null,"73b99aad",null),d=l.exports,f={name:"App",components:{SwipeMenu:d},data:function(){return{touchTime:0,currentPageA:1,buttonsA:[{name:"メニュー１"},{name:"メニュー２"},{name:"メニュー３"},{name:"メニュー４"}],currentPageB:1,buttonsB:[]}},created:function(){var t=0;while(t<50)this.buttonsB.push({color:"#"+("00"+Math.floor(Math.random()*Math.floor(255)).toString(16)).slice(-2)+("00"+Math.floor(Math.random()*Math.floor(255)).toString(16)).slice(-2)+("00"+Math.floor(Math.random()*Math.floor(255)).toString(16)).slice(-2)}),t++},methods:{onButtonClickA:function(t){this.touchTime<300&&this.onChangePageA(t)},onChangePageA:function(t){this.currentPageA=t},onMoveA:function(t){t<=0&&(t=1),t>this.buttonsB.length&&(t=this.buttonsA.length),t!==this.currentPageA&&this.onChangePageA(t)},onButtonClickB:function(t){this.touchTime<300&&this.onChangePageB(t)},onChangePageB:function(t){this.currentPageB=t},onMoveB:function(t){t<=0&&(t=1),t>this.buttonsB.length&&(t=this.buttonsB.length),t!==this.currentPageB&&this.onChangePageB(t)},onTouchEnd:function(t,e){this.touchTime=e}}},g=f,p=(n("24e7"),Object(c["a"])(g,s,r,!1,null,"5cadd597",null)),m=p.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(m)}}).$mount("#app")},a690:function(t,e,n){},cd8b:function(t,e,n){"use strict";var i=n("e532"),s=n.n(i);s.a},e532:function(t,e,n){}});
//# sourceMappingURL=app.8f085100.js.map