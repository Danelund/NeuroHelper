/*
* Kendo UI v2014.3.1411 (http://www.telerik.com/kendo-ui)
* Copyright 2015 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
!function(e,define){define(["./kendo.draganddrop.min"],e)}(function(){return function(e,t){function n(e,t,n){var i=n?" k-slider-horizontal":" k-slider-vertical",r=e.style?e.style:t.attr("style"),o=t.attr("class")?" "+t.attr("class"):"",a="";return"bottomRight"==e.tickPlacement?a=" k-slider-bottomright":"topLeft"==e.tickPlacement&&(a=" k-slider-topleft"),r=r?" style='"+r+"'":"","<div class='k-widget k-slider"+i+o+"'"+r+"><div class='k-slider-wrap"+(e.showButtons?" k-slider-buttons":"")+a+"'></div></div>"}function i(e,t,n){var i="";return i="increase"==t?n?"k-i-arrow-e":"k-i-arrow-n":n?"k-i-arrow-w":"k-i-arrow-s","<a class='k-button k-button-"+t+"'><span class='k-icon "+i+"' title='"+e[t+"ButtonTitle"]+"'>"+e[t+"ButtonTitle"]+"</span></a>"}function r(e,t){var n,i="<ul class='k-reset k-slider-items'>",r=x.floor(c(t/e.smallStep))+1;for(n=0;r>n;n++)i+="<li class='k-tick' role='presentation'>&nbsp;</li>";return i+="</ul>"}function o(e,t){var n=t.is("input")?1:2,i=2==n?e.leftDragHandleTitle:e.dragHandleTitle;return"<div class='k-slider-track'><div class='k-slider-selection'><!-- --></div><a href='#' class='k-draghandle' title='"+i+"' role='slider' aria-valuemin='"+e.min+"' aria-valuemax='"+e.max+"' aria-valuenow='"+(n>1?e.selectionStart||e.min:e.value||e.min)+"'>Drag</a>"+(n>1?"<a href='#' class='k-draghandle' title='"+e.rightDragHandleTitle+"'role='slider' aria-valuemin='"+e.min+"' aria-valuemax='"+e.max+"' aria-valuenow='"+(e.selectionEnd||e.max)+"'>Drag</a>":"")+"</div>"}function a(e){return function(t){return t+e}}function s(e){return function(){return e}}function l(e){return(e+"").replace(".",p.cultures.current.numberFormat["."])}function c(e){e=parseFloat(e,10);var t=x.pow(10,q||0);return x.round(e*t)/t}function d(e,n){var i=y(e.getAttribute(n));return null===i&&(i=t),i}function u(e){return typeof e!==Y}function h(e){return 1e4*e}var f,p=window.kendo,g=p.ui.Widget,m=p.ui.Draggable,v=e.extend,_=p.format,y=p.parseFloat,w=e.proxy,b=e.isArray,x=Math,k=p.support,C=k.pointers,S=k.msPointers,T="change",D="slide",A=".slider",E="touchstart"+A+" mousedown"+A,M=C?"pointerdown"+A:S?"MSPointerDown"+A:E,P="touchend"+A+" mouseup"+A,I=C?"pointerup":S?"MSPointerUp"+A:P,z="moveSelection",B="keydown"+A,F="click"+A,L="mouseover"+A,R="focus"+A,O="blur"+A,N=".k-draghandle",H=".k-slider-track",V=".k-tick",U="k-state-selected",W="k-state-focused",j="k-state-default",G="k-state-disabled",q=3,$="disabled",Y="undefined",Q="tabindex",X=p.getTouches,K=g.extend({init:function(e,t){var n,i=this;g.fn.init.call(i,e,t),t=i.options,i._distance=c(t.max-t.min),i._isHorizontal="horizontal"==t.orientation,i._isRtl=i._isHorizontal&&p.support.isRtl(e),i._position=i._isHorizontal?"left":"bottom",i._sizeFn=i._isHorizontal?"width":"height",i._outerSize=i._isHorizontal?"outerWidth":"outerHeight",t.tooltip.format=t.tooltip.enabled?t.tooltip.format||"{0}":"{0}",i._createHtml(),i.wrapper=i.element.closest(".k-slider"),i._trackDiv=i.wrapper.find(H),i._setTrackDivWidth(),i._maxSelection=i._trackDiv[i._sizeFn](),i._sliderItemsInit(),i._reset(),i._tabindex(i.wrapper.find(N)),i[t.enabled?"enable":"disable"](),n=p.support.isRtl(i.wrapper)?-1:1,i._keyMap={37:a(-1*n*t.smallStep),40:a(-t.smallStep),39:a(1*n*t.smallStep),38:a(+t.smallStep),35:s(t.max),36:s(t.min),33:a(+t.largeStep),34:a(-t.largeStep)},p.notify(i)},events:[T,D],options:{enabled:!0,min:0,max:10,smallStep:1,largeStep:5,orientation:"horizontal",tickPlacement:"both",tooltip:{enabled:!0,format:"{0}"}},_resize:function(){this._setTrackDivWidth(),this.wrapper.find(".k-slider-items").remove(),this._maxSelection=this._trackDiv[this._sizeFn](),this._sliderItemsInit(),this._refresh()},_sliderItemsInit:function(){var e=this,t=e.options,n=e._maxSelection/((t.max-t.min)/t.smallStep),i=e._calculateItemsWidth(x.floor(e._distance/t.smallStep));"none"!=t.tickPlacement&&n>=2&&(e._trackDiv.before(r(t,e._distance)),e._setItemsWidth(i),e._setItemsTitle()),e._calculateSteps(i),"none"!=t.tickPlacement&&n>=2&&t.largeStep>=t.smallStep&&e._setItemsLargeTick()},getSize:function(){return p.dimensions(this.wrapper)},_setTrackDivWidth:function(){var e=this,t=2*parseFloat(e._trackDiv.css(e._isRtl?"right":e._position),10);e._trackDiv[e._sizeFn](e.wrapper[e._sizeFn]()-2-t)},_setItemsWidth:function(t){var n,i=this,r=i.options,o=0,a=t.length-1,s=i.wrapper.find(V),l=0,c=2,d=s.length,u=0;for(n=0;d-2>n;n++)e(s[n+1])[i._sizeFn](t[n]);if(i._isHorizontal?(e(s[o]).addClass("k-first")[i._sizeFn](t[a-1]),e(s[a]).addClass("k-last")[i._sizeFn](t[a])):(e(s[a]).addClass("k-first")[i._sizeFn](t[a]),e(s[o]).addClass("k-last")[i._sizeFn](t[a-1])),i._distance%r.smallStep!==0&&!i._isHorizontal){for(n=0;t.length>n;n++)u+=t[n];l=i._maxSelection-u,l+=parseFloat(i._trackDiv.css(i._position),10)+c,i.wrapper.find(".k-slider-items").css("padding-top",l)}},_setItemsTitle:function(){for(var t=this,n=t.options,i=t.wrapper.find(V),r=n.min,o=i.length,a=t._isHorizontal&&!t._isRtl?0:o-1,s=t._isHorizontal&&!t._isRtl?o:-1,l=t._isHorizontal&&!t._isRtl?1:-1;a-s!==0;a+=l)e(i[a]).attr("title",_(n.tooltip.format,c(r))),r+=n.smallStep},_setItemsLargeTick:function(){var t,n,i,r=this,o=r.options,a=r.wrapper.find(V),s=0;if(h(o.largeStep)%h(o.smallStep)===0||r._distance/o.largeStep>=3)for(r._isHorizontal||r._isRtl||(a=e.makeArray(a).reverse()),s=0;a.length>s;s++)t=e(a[s]),n=r._values[s],i=c(h(n-this.options.min)),i%h(o.smallStep)===0&&i%h(o.largeStep)===0&&(t.addClass("k-tick-large").html("<span class='k-label'>"+t.attr("title")+"</span>"),0!==s&&s!==a.length-1&&t.css("line-height",t[r._sizeFn]()+"px"))},_calculateItemsWidth:function(e){var t,n,i,r=this,o=r.options,a=parseFloat(r._trackDiv.css(r._sizeFn))+1,s=a/r._distance;for(r._distance/o.smallStep-x.floor(r._distance/o.smallStep)>0&&(a-=r._distance%o.smallStep*s),t=a/e,n=[],i=0;e-1>i;i++)n[i]=t;return n[e-1]=n[e]=t/2,r._roundWidths(n)},_roundWidths:function(e){var t,n=0,i=e.length;for(t=0;i>t;t++)n+=e[t]-x.floor(e[t]),e[t]=x.floor(e[t]);return n=x.round(n),this._addAdditionalSize(n,e)},_addAdditionalSize:function(e,t){if(0===e)return t;var n,i=parseFloat(t.length-1)/parseFloat(1==e?e:e-1);for(n=0;e>n;n++)t[parseInt(x.round(i*n),10)]+=1;return t},_calculateSteps:function(e){var t,n=this,i=n.options,r=i.min,o=0,a=x.ceil(n._distance/i.smallStep),s=1;if(a+=n._distance/i.smallStep%1===0?1:0,e.splice(0,0,2*e[a-2]),e.splice(a-1,1,2*e.pop()),n._pixelSteps=[o],n._values=[r],0!==a){for(;a>s;)o+=(e[s-1]+e[s])/2,n._pixelSteps[s]=o,r+=i.smallStep,n._values[s]=c(r),s++;t=n._distance%i.smallStep===0?a-1:a,n._pixelSteps[t]=n._maxSelection,n._values[t]=i.max,n._isRtl&&(n._pixelSteps.reverse(),n._values.reverse())}},_getValueFromPosition:function(e,t){var n,i=this,r=i.options,o=x.max(r.smallStep*(i._maxSelection/i._distance),0),a=0,s=o/2;if(i._isHorizontal?(a=e-t.startPoint,i._isRtl&&(a=i._maxSelection-a)):a=t.startPoint-e,i._maxSelection-(parseInt(i._maxSelection%o,10)-3)/2<a)return r.max;for(n=0;i._pixelSteps.length>n;n++)if(x.abs(i._pixelSteps[n]-a)-1<=s)return c(i._values[n])},_getFormattedValue:function(e,t){var n,i,r,o=this,a="",s=o.options.tooltip;return b(e)?(i=e[0],r=e[1]):t&&t.type&&(i=t.selectionStart,r=t.selectionEnd),t&&(n=t.tooltipTemplate),!n&&s.template&&(n=p.template(s.template)),b(e)||t&&t.type?n?a=n({selectionStart:i,selectionEnd:r}):(i=_(s.format,i),r=_(s.format,r),a=i+" - "+r):(t&&(t.val=e),a=n?n({value:e}):_(s.format,e)),a},_getDraggableArea:function(){var e=this,t=p.getOffset(e._trackDiv);return{startPoint:e._isHorizontal?t.left:t.top+e._maxSelection,endPoint:e._isHorizontal?t.left+e._maxSelection:t.top}},_createHtml:function(){var e=this,t=e.element,r=e.options,a=t.find("input");2==a.length?(a.eq(0).prop("value",l(r.selectionStart)),a.eq(1).prop("value",l(r.selectionEnd))):t.prop("value",l(r.value)),t.wrap(n(r,t,e._isHorizontal)).hide(),r.showButtons&&t.before(i(r,"increase",e._isHorizontal)).before(i(r,"decrease",e._isHorizontal)),t.before(o(r,t))},_focus:function(t){var n=this,i=t.target,r=n.value(),o=n._drag;o||(i==n.wrapper.find(N).eq(0)[0]?(o=n._firstHandleDrag,n._activeHandle=0):(o=n._lastHandleDrag,n._activeHandle=1),r=r[n._activeHandle]),e(i).addClass(W+" "+U),o&&(n._activeHandleDrag=o,o.selectionStart=n.options.selectionStart,o.selectionEnd=n.options.selectionEnd,o._updateTooltip(r))},_focusWithMouse:function(t){t=e(t);var n=this,i=t.is(N)?t.index():0;window.setTimeout(function(){n.wrapper.find(N)[2==i?1:0].focus()},1),n._setTooltipTimeout()},_blur:function(t){var n=this,i=n._activeHandleDrag;e(t.target).removeClass(W+" "+U),i&&(i._removeTooltip(),delete n._activeHandleDrag,delete n._activeHandle)},_setTooltipTimeout:function(){var e=this;e._tooltipTimeout=window.setTimeout(function(){var t=e._drag||e._activeHandleDrag;t&&t._removeTooltip()},300)},_clearTooltipTimeout:function(){var e,t=this;window.clearTimeout(this._tooltipTimeout),e=t._drag||t._activeHandleDrag,e&&e.tooltipDiv&&e.tooltipDiv.stop(!0,!1).css("opacity",1)},_reset:function(){var t=this,n=t.element,i=n.attr("form"),r=i?e("#"+i):n.closest("form");r[0]&&(t._form=r.on("reset",w(t._formResetHandler,t)))},destroy:function(){this._form&&this._form.off("reset",this._formResetHandler),g.fn.destroy.call(this)}}),Z=K.extend({init:function(n,i){var r,o=this;n.type="text",i=v({},{value:d(n,"value"),min:d(n,"min"),max:d(n,"max"),smallStep:d(n,"step")},i),n=e(n),i&&i.enabled===t&&(i.enabled=!n.is("[disabled]")),K.fn.init.call(o,n,i),i=o.options,u(i.value)&&null!==i.value||(i.value=i.min,n.prop("value",l(i.min))),i.value=x.max(x.min(i.value,i.max),i.min),r=o.wrapper.find(N),new Z.Selection(r,o,i),o._drag=new Z.Drag(r,"",o,i)},options:{name:"Slider",showButtons:!0,increaseButtonTitle:"Increase",decreaseButtonTitle:"Decrease",dragHandleTitle:"drag",tooltip:{format:"{0:#,#.##}"},value:null},enable:function(n){var i,r,o,a=this,s=a.options;a.disable(),n!==!1&&(a.wrapper.removeClass(G).addClass(j),a.wrapper.find("input").removeAttr($),i=function(n){var i,r,o,s=X(n)[0];if(s){if(i=a._isHorizontal?s.location.pageX:s.location.pageY,r=a._getDraggableArea(),o=e(n.target),o.hasClass("k-draghandle"))return o.addClass(W+" "+U),t;a._update(a._getValueFromPosition(i,r)),a._focusWithMouse(n.target),a._drag.dragstart(n),n.preventDefault()}},a.wrapper.find(V+", "+H).on(M,i).end().on(M,function(){e(document.documentElement).one("selectstart",p.preventDefault)}).on(I,function(){a._drag._end()}),a.wrapper.find(N).attr(Q,0).on(P,function(){a._setTooltipTimeout()}).on(F,function(e){a._focusWithMouse(e.target),e.preventDefault()}).on(R,w(a._focus,a)).on(O,w(a._blur,a)),r=w(function(e){var t=a._nextValueByIndex(a._valueIndex+1*e);a._setValueInRange(t),a._drag._updateTooltip(t)},a),s.showButtons&&(o=w(function(e,t){this._clearTooltipTimeout(),(1===e.which||k.touch&&0===e.which)&&(r(t),this.timeout=setTimeout(w(function(){this.timer=setInterval(function(){r(t)},60)},this),200))},a),a.wrapper.find(".k-button").on(P,w(function(e){this._clearTimer(),a._focusWithMouse(e.target)},a)).on(L,function(t){e(t.currentTarget).addClass("k-state-hover")}).on("mouseout"+A,w(function(t){e(t.currentTarget).removeClass("k-state-hover"),this._clearTimer()},a)).eq(0).on(E,w(function(e){o(e,1)},a)).click(!1).end().eq(1).on(E,w(function(e){o(e,-1)},a)).click(p.preventDefault)),a.wrapper.find(N).off(B,!1).on(B,w(this._keydown,a)),s.enabled=!0)},disable:function(){var t=this;t.wrapper.removeClass(j).addClass(G),e(t.element).prop($,$),t.wrapper.find(".k-button").off(E).on(E,p.preventDefault).off(P).on(P,p.preventDefault).off("mouseleave"+A).on("mouseleave"+A,p.preventDefault).off(L).on(L,p.preventDefault),t.wrapper.find(V+", "+H).off(M).off(I),t.wrapper.find(N).attr(Q,-1).off(P).off(B).off(F).off(R).off(O),t.options.enabled=!1},_update:function(e){var t=this,n=t.value()!=e;t.value(e),n&&t.trigger(T,{value:t.options.value})},value:function(e){var n=this,i=n.options;return e=c(e),isNaN(e)?i.value:(e>=i.min&&i.max>=e&&i.value!=e&&(n.element.prop("value",l(e)),i.value=e,n._refreshAriaAttr(e),n._refresh()),t)},_refresh:function(){this.trigger(z,{value:this.options.value})},_refreshAriaAttr:function(e){var t,n=this,i=n._drag;t=i&&i._tooltipDiv?i._tooltipDiv.text():n._getFormattedValue(e,null),this.wrapper.find(N).attr("aria-valuenow",e).attr("aria-valuetext",t)},_clearTimer:function(){clearTimeout(this.timeout),clearInterval(this.timer)},_keydown:function(e){var t=this;e.keyCode in t._keyMap&&(t._clearTooltipTimeout(),t._setValueInRange(t._keyMap[e.keyCode](t.options.value)),t._drag._updateTooltip(t.value()),e.preventDefault())},_setValueInRange:function(e){var n=this,i=n.options;return e=c(e),isNaN(e)?(n._update(i.min),t):(e=x.max(x.min(e,i.max),i.min),n._update(e),t)},_nextValueByIndex:function(e){var t=this._values.length;return this._isRtl&&(e=t-1-e),this._values[x.max(0,x.min(e,t-1))]},_formResetHandler:function(){var e=this,t=e.options.min;setTimeout(function(){var n=e.element[0].value;e.value(""===n||isNaN(n)?t:n)})},destroy:function(){var e=this;K.fn.destroy.call(e),e.wrapper.off(A).find(".k-button").off(A).end().find(N).off(A).end().find(V+", "+H).off(A).end(),e._drag.draggable.destroy(),e._drag._removeTooltip(!0)}});Z.Selection=function(e,t,n){function i(i){var r=i-n.min,o=t._valueIndex=x.ceil(c(r/n.smallStep)),a=parseInt(t._pixelSteps[o],10),s=t._trackDiv.find(".k-slider-selection"),l=parseInt(e[t._outerSize]()/2,10),d=t._isRtl?2:0;s[t._sizeFn](t._isRtl?t._maxSelection-a:a),e.css(t._position,a-l-d)}i(n.value),t.bind([T,D,z],function(e){i(parseFloat(e.value,10))})},Z.Drag=function(e,t,n,i){var r=this;r.owner=n,r.options=i,r.element=e,r.type=t,r.draggable=new m(e,{distance:0,dragstart:w(r._dragstart,r),drag:w(r.drag,r),dragend:w(r.dragend,r),dragcancel:w(r.dragcancel,r)}),e.click(!1)},Z.Drag.prototype={dragstart:function(e){this.owner._activeDragHandle=this,this.draggable.userEvents.cancel(),this.draggable.userEvents._start(e)},_dragstart:function(n){var i=this,r=i.owner,o=i.options;return o.enabled?(this.owner._activeDragHandle=this,r.element.off(L),r.wrapper.find("."+W).removeClass(W+" "+U),i.element.addClass(W+" "+U),e(document.documentElement).css("cursor","pointer"),i.dragableArea=r._getDraggableArea(),i.step=x.max(o.smallStep*(r._maxSelection/r._distance),0),i.type?(i.selectionStart=o.selectionStart,i.selectionEnd=o.selectionEnd,r._setZIndex(i.type)):i.oldVal=i.val=o.value,i._removeTooltip(!0),i._createTooltip(),t):(n.preventDefault(),t)},_createTooltip:function(){var t,n,i=this,r=i.owner,o=i.options.tooltip,a="",s=e(window);o.enabled&&(o.template&&(t=i.tooltipTemplate=p.template(o.template)),e(".k-slider-tooltip").remove(),i.tooltipDiv=e("<div class='k-widget k-tooltip k-slider-tooltip'><!-- --></div>").appendTo(document.body),a=r._getFormattedValue(i.val||r.value(),i),i.type||(n="k-callout-"+(r._isHorizontal?"s":"e"),i.tooltipInnerDiv="<div class='k-callout "+n+"'><!-- --></div>",a+=i.tooltipInnerDiv),i.tooltipDiv.html(a),i._scrollOffset={top:s.scrollTop(),left:s.scrollLeft()},i.moveTooltip())},drag:function(e){var t,n=this,i=n.owner,r=e.x.location,o=e.y.location,a=n.dragableArea.startPoint,s=n.dragableArea.endPoint;e.preventDefault(),n.val=i._isHorizontal?i._isRtl?n.constrainValue(r,a,s,s>r):n.constrainValue(r,a,s,r>=s):n.constrainValue(o,s,a,s>=o),n.oldVal!=n.val&&(n.oldVal=n.val,n.type?("firstHandle"==n.type?n.selectionStart=n.selectionEnd>n.val?n.val:n.selectionEnd=n.val:n.val>n.selectionStart?n.selectionEnd=n.val:n.selectionStart=n.selectionEnd=n.val,t={values:[n.selectionStart,n.selectionEnd],value:[n.selectionStart,n.selectionEnd]}):t={value:n.val},i.trigger(D,t)),n._updateTooltip(n.val)},_updateTooltip:function(e){var t=this,n=t.options,i=n.tooltip,r="";i.enabled&&(t.tooltipDiv||t._createTooltip(),r=t.owner._getFormattedValue(c(e),t),t.type||(r+=t.tooltipInnerDiv),t.tooltipDiv.html(r),t.moveTooltip())},dragcancel:function(){return this.owner._refresh(),e(document.documentElement).css("cursor",""),this._end()},dragend:function(){var t=this,n=t.owner;return e(document.documentElement).css("cursor",""),t.type?n._update(t.selectionStart,t.selectionEnd):(n._update(t.val),t.draggable.userEvents._disposeAll()),t._end()},_end:function(){var e=this,t=e.owner;return t._focusWithMouse(e.element),t.element.on(L),!1},_removeTooltip:function(t){var n=this,i=n.owner;n.tooltipDiv&&i.options.tooltip.enabled&&i.options.enabled&&(t?(n.tooltipDiv.remove(),n.tooltipDiv=null):n.tooltipDiv.fadeOut("slow",function(){e(this).remove(),n.tooltipDiv=null}))},moveTooltip:function(){var t,n,i,r,o=this,a=o.owner,s=0,l=0,c=o.element,d=p.getOffset(c),u=8,h=e(window),f=o.tooltipDiv.find(".k-callout"),g=o.tooltipDiv.outerWidth(),m=o.tooltipDiv.outerHeight();o.type?(t=a.wrapper.find(N),d=p.getOffset(t.eq(0)),n=p.getOffset(t.eq(1)),a._isHorizontal?(s=n.top,l=d.left+(n.left-d.left)/2):(s=d.top+(n.top-d.top)/2,l=n.left),r=t.eq(0).outerWidth()+2*u):(s=d.top,l=d.left,r=c.outerWidth()+2*u),a._isHorizontal?(l-=parseInt((g-c[a._outerSize]())/2,10),s-=m+f.height()+u):(s-=parseInt((m-c[a._outerSize]())/2,10),l-=g+f.width()+u),a._isHorizontal?(i=o._flip(s,m,r,h.outerHeight()+o._scrollOffset.top),s+=i,l+=o._fit(l,g,h.outerWidth()+o._scrollOffset.left)):(i=o._flip(l,g,r,h.outerWidth()+o._scrollOffset.left),s+=o._fit(s,m,h.outerHeight()+o._scrollOffset.top),l+=i),i>0&&f&&(f.removeClass(),f.addClass("k-callout k-callout-"+(a._isHorizontal?"n":"w"))),o.tooltipDiv.css({top:s,left:l})},_fit:function(e,t,n){var i=0;return e+t>n&&(i=n-(e+t)),0>e&&(i=-e),i},_flip:function(e,t,n,i){var r=0;return e+t>i&&(r+=-(n+t)),0>e+r&&(r+=n+t),r},constrainValue:function(e,t,n,i){var r=this,o=0;return o=e>t&&n>e?r.owner._getValueFromPosition(e,r.dragableArea):i?r.options.max:r.options.min}},p.ui.plugin(Z),f=K.extend({init:function(n,i){var r,o=this,a=e(n).find("input"),s=a.eq(0)[0],c=a.eq(1)[0];s.type="text",c.type="text",i=v({},{selectionStart:d(s,"value"),min:d(s,"min"),max:d(s,"max"),smallStep:d(s,"step")},{selectionEnd:d(c,"value"),min:d(c,"min"),max:d(c,"max"),smallStep:d(c,"step")},i),i&&i.enabled===t&&(i.enabled=!a.is("[disabled]")),K.fn.init.call(o,n,i),i=o.options,u(i.selectionStart)&&null!==i.selectionStart||(i.selectionStart=i.min,a.eq(0).prop("value",l(i.min))),u(i.selectionEnd)&&null!==i.selectionEnd||(i.selectionEnd=i.max,a.eq(1).prop("value",l(i.max))),r=o.wrapper.find(N),new f.Selection(r,o,i),o._firstHandleDrag=new Z.Drag(r.eq(0),"firstHandle",o,i),o._lastHandleDrag=new Z.Drag(r.eq(1),"lastHandle",o,i)},options:{name:"RangeSlider",leftDragHandleTitle:"drag",rightDragHandleTitle:"drag",tooltip:{format:"{0:#,#.##}"},selectionStart:null,selectionEnd:null},enable:function(n){var i,r=this,o=r.options;r.disable(),n!==!1&&(r.wrapper.removeClass(G).addClass(j),r.wrapper.find("input").removeAttr($),i=function(n){var i,a,s,l,c,d,u,h=X(n)[0];if(h){if(i=r._isHorizontal?h.location.pageX:h.location.pageY,a=r._getDraggableArea(),s=r._getValueFromPosition(i,a),l=e(n.target),l.hasClass("k-draghandle"))return r.wrapper.find("."+W).removeClass(W+" "+U),l.addClass(W+" "+U),t;o.selectionStart>s?(c=s,d=o.selectionEnd,u=r._firstHandleDrag):s>r.selectionEnd?(c=o.selectionStart,d=s,u=r._lastHandleDrag):o.selectionEnd-s>=s-o.selectionStart?(c=s,d=o.selectionEnd,u=r._firstHandleDrag):(c=o.selectionStart,d=s,u=r._lastHandleDrag),u.dragstart(n),r._setValueInRange(c,d),r._focusWithMouse(u.element)}},r.wrapper.find(V+", "+H).on(M,i).end().on(M,function(){e(document.documentElement).one("selectstart",p.preventDefault)}).on(I,function(){r._activeDragHandle&&r._activeDragHandle._end()}),r.wrapper.find(N).attr(Q,0).on(P,function(){r._setTooltipTimeout()}).on(F,function(e){r._focusWithMouse(e.target),e.preventDefault()}).on(R,w(r._focus,r)).on(O,w(r._blur,r)),r.wrapper.find(N).off(B,p.preventDefault).eq(0).on(B,w(function(e){this._keydown(e,"firstHandle")},r)).end().eq(1).on(B,w(function(e){this._keydown(e,"lastHandle")},r)),r.options.enabled=!0)},disable:function(){var e=this;e.wrapper.removeClass(j).addClass(G),e.wrapper.find("input").prop($,$),e.wrapper.find(V+", "+H).off(M).off(I),e.wrapper.find(N).attr(Q,-1).off(P).off(B).off(F).off(R).off(O),e.options.enabled=!1},_keydown:function(e,t){var n,i,r,o=this,a=o.options.selectionStart,s=o.options.selectionEnd;e.keyCode in o._keyMap&&(o._clearTooltipTimeout(),"firstHandle"==t?(r=o._activeHandleDrag=o._firstHandleDrag,a=o._keyMap[e.keyCode](a),a>s&&(s=a)):(r=o._activeHandleDrag=o._lastHandleDrag,s=o._keyMap[e.keyCode](s),a>s&&(a=s)),o._setValueInRange(a,s),n=Math.max(a,o.options.selectionStart),i=Math.min(s,o.options.selectionEnd),r.selectionEnd=Math.max(i,o.options.selectionStart),r.selectionStart=Math.min(n,o.options.selectionEnd),r._updateTooltip(o.value()[o._activeHandle]),e.preventDefault())},_update:function(e,t){var n=this,i=n.value(),r=i[0]!=e||i[1]!=t;n.value([e,t]),r&&n.trigger(T,{values:[e,t],value:[e,t]})},value:function(e){return e&&e.length?this._value(e[0],e[1]):this._value()},_value:function(e,n){var i=this,r=i.options,o=r.selectionStart,a=r.selectionEnd;return isNaN(e)&&isNaN(n)?[o,a]:(e=c(e),n=c(n),e>=r.min&&r.max>=e&&n>=r.min&&r.max>=n&&n>=e&&(o!=e||a!=n)&&(i.element.find("input").eq(0).prop("value",l(e)).end().eq(1).prop("value",l(n)),r.selectionStart=e,r.selectionEnd=n,i._refresh(),i._refreshAriaAttr(e,n)),t)},values:function(e,t){return b(e)?this._value(e[0],e[1]):this._value(e,t)},_refresh:function(){var e=this,t=e.options;e.trigger(z,{values:[t.selectionStart,t.selectionEnd],value:[t.selectionStart,t.selectionEnd]}),t.selectionStart==t.max&&t.selectionEnd==t.max&&e._setZIndex("firstHandle")},_refreshAriaAttr:function(e,t){var n,i=this,r=i.wrapper.find(N),o=i._activeHandleDrag;n=i._getFormattedValue([e,t],o),r.eq(0).attr("aria-valuenow",e),r.eq(1).attr("aria-valuenow",t),r.attr("aria-valuetext",n)},_setValueInRange:function(e,t){var n=this.options;e=x.max(x.min(e,n.max),n.min),t=x.max(x.min(t,n.max),n.min),e==n.max&&t==n.max&&this._setZIndex("firstHandle"),this._update(x.min(e,t),x.max(e,t))},_setZIndex:function(t){this.wrapper.find(N).each(function(n){e(this).css("z-index","firstHandle"==t?1-n:n)})},_formResetHandler:function(){var e=this,t=e.options;setTimeout(function(){var n=e.element.find("input"),i=n[0].value,r=n[1].value;e.values(""===i||isNaN(i)?t.min:i,""===r||isNaN(r)?t.max:r)})},destroy:function(){var e=this;K.fn.destroy.call(e),e.wrapper.off(A).find(V+", "+H).off(A).end().find(N).off(A),e._firstHandleDrag.draggable.destroy(),e._lastHandleDrag.draggable.destroy()}}),f.Selection=function(e,t,n){function i(i){i=i||[];var o=i[0]-n.min,a=i[1]-n.min,s=x.ceil(c(o/n.smallStep)),l=x.ceil(c(a/n.smallStep)),d=t._pixelSteps[s],u=t._pixelSteps[l],h=parseInt(e.eq(0)[t._outerSize]()/2,10),f=t._isRtl?2:0;e.eq(0).css(t._position,d-h-f).end().eq(1).css(t._position,u-h-f),r(d,u)}function r(e,n){var i,r,o=t._trackDiv.find(".k-slider-selection");i=x.abs(e-n),o[t._sizeFn](i),t._isRtl?(r=x.max(e,n),o.css("right",t._maxSelection-r-1)):(r=x.min(e,n),o.css(t._position,r-1))}i(t.value()),t.bind([T,D,z],function(e){i(e.values)})},p.ui.plugin(f)}(window.kendo.jQuery),window.kendo},"function"==typeof define&&define.amd?define:function(e,t){t()});