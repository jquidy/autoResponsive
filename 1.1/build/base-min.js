/*! autoResponsive - v1.1 - 2013-07-11 11:32:54 PM
* Copyright (c) 2013 xudafeng; Licensed  */
KISSY.add("gallery/autoResponsive/1.1/config",function(){"use strict";function t(){return{container:{value:e},selector:{value:e},filter:{value:e},fixedSelector:{value:e},priority:{value:e},gridWidth:{value:10},unitMargin:{value:{x:0,y:0}},closeAnim:{value:!1},duration:{value:1},easing:{value:"easeNone"},direction:{value:"left"},random:{value:!1},sortBy:{value:e},autoHeight:{value:!0},closeResize:{value:!1},autoInit:{value:!0},plugins:{value:[]},suspend:{value:!0},cache:{value:!1},resizeFrequency:{value:200},whensRecountUnitWH:{value:[]},delayOnResize:-1}}var e="";return t}),KISSY.add("gallery/autoResponsive/1.1/anim",function(t){"use strict";function e(t){this.cfg=t,this._init()}var i=t.DOM,n=t.Anim,r=11>t.UA.ie,o=["-webkit-","-moz-","-ms-","-o-",""],s=r?"fixedAnim":"css3Anim";return t.augment(e,{_init:function(){this[s]()},cssPrefixes:function(t,e){for(var i={},n=0,r=o.length;r>n;n++)i[o[n]+t]=e;return i},css3Anim:function(){var t=this.cfg;i.css(t.elm,this.cssPrefixes("transform","translate("+("right"!==t.direction?t.x:t.owner.gridSort.containerWH-t.elm.__width-t.x)+"px,"+t.y+"px) ")),t.owner.fire("afterUnitSort",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}})},fixedAnim:function(){var t=this.cfg,e={top:t.y};return t.closeAnim?(this.noneAnim(),void 0):(e["right"==t.direction?"right":"left"]=t.x,new n(t.elm,e,t.duration,t.easing,function(){t.owner.fire("afterUnitSort",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}})}).run(),void 0)},noneAnim:function(){var t=this.cfg;i.css(t.elm,{left:t.x,top:t.y}),t.owner.fire("afterUnitSort",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}})}}),e},{requires:["dom","anim"]}),KISSY.add("gallery/autoResponsive/1.1/linkedlist",function(t){"use strict";function e(t){var e=this;e.length=0,e.head=null,e.tail=null,e.type=t.type||!0,e.query=[],e.init()}return t.augment(e,{init:function(){t.augment(Array,{shuffle:function(){for(var t,e,i=this.length;i;t=parseInt(Math.random()*i),e=this[--i],this[i]=this[t],this[t]=e);return this}})},add:function(t){var e=this;if(e.type)return e.query.push(t),void 0;var i={value:t,next:null,prev:null};0==e.length?e.head=e.tail=i:(e.tail.next=i,i.prev=e.tail,e.tail=i),e.length++},remove:function(t){var e=this;if(t>e.length-1||0>t)return null;var i=e.head,n=0;if(0==t)e.head=i.next,null==e.head?e.tail=null:e.head.previous=null;else if(t==e.length-1)i=e.tail,e.tail=i.prev,e.tail.next=null;else{for(;t>n++;)i=i.next;i.prev.next=i.next,i.next.prev=i.prev}e.length--},get:function(t){var e=this;return e.type?e.query[t]:e.node(t).value},node:function(t){var e=this;if(t>e.length-1||0>t)return null;for(var i=e.head,n=0;t>n++;)i=i.next;return i},update:function(t,e){var i=this;return i.type?(i.query[t]=e,void 0):(i.node(t).value=e,void 0)},size:function(){return this.query.length||this.length}}),e}),KISSY.add("gallery/autoResponsive/1.1/gridsort",function(t,e,i){"use strict";function n(){}var r=t.DOM,o="";return n.prototype={init:function(e,i){this.cfg=e,e.owner=i;var n=t.query(e.selector,e.container);switch(e.sortBy){case o:case"grid":default:this._gridSort(n);break;case"cell":this._cellSort(n)}},_gridSort:function(t){var e=this.cfg,i=this._getCols();this._setFrame(),e.random&&(t=t.shuffle()),e.owner.fire("beforeSort",{autoResponsive:{elms:t}});var n=[];e.filter!==o&&n.push("_filter"),e.priority!==o&&n.push("_priority");var r=n.length,s=t.length,a=e.cache?e.owner._lastPos:0;if(0==r)for(var u=a;s>u;u++)this._render(i,t[u]);else{var l=[];n.push("_tail");for(var c=a;s>c;c++)for(var f,h=0;r+1>h;h++){if(f=this[n[h]](l,c,t[c]),"number"==typeof f){l.splice(f,0,c);break}if("boolean"==typeof f&&f)break}for(var d=0,g=l.length;g>d;d++)this._render(i,t[l[d]])}e.owner._lastPos=s;var v=this._getMinMaxColHeight();e.owner.fire("afterSort",{autoResponsive:{elms:t,curMinMaxColHeight:v,frame:e.owner.frame}}),this.setHeight(v.max)},_getCols:function(){var t=this.cfg;if(this.containerWH=r.outerWidth(t.container),t.owner.curQuery&&t.cache)return t.owner.curQuery;for(var e=new i({}),n=0,o=Math.ceil(this.containerWH/t.gridWidth);o>n;n++)e.add(0);return t.owner.curQuery=e},_setFrame:function(){this.cfg.owner.frame++},_filter:function(t,e,i){var n=this.cfg;return r.show(i),r.hasClass(i,n.filter)?(r.hide(i),!0):!1},_priority:function(t,e,i){return void 0==t._priorityInsertPos?(t._priorityInsertPos=0,this._priority=function(t,e,i){var n=this.cfg;return r.hasClass(i,n.priority)?t._priorityInsertPos++:1/0},this._priority(t,e,i)):void 0},_tail:function(){return 1/0},_render:function(t,e){var i=this,n=i.cfg;n.owner.fire("beforeUnitSort",{autoResponsive:{elm:e,frame:n.owner.frame}});var r=i.coordinate(t,e);i.asyncize(function(){i.callAnim(e,r)})},coordinate:function(t,e){var i=this.cfg,n=i.isRecountUnitWH;return(n||!e.__width)&&(e.__width=r.outerWidth(e),e.__height=r.outerHeight(e)),this._autoFit(t,e.__width,e.__height)},_autoFit:function(t,e,i){for(var n=this.cfg,r=Math.ceil((e+n.unitMargin.x)/n.gridWidth),o=this._getCur(r,t),s=o[0],a=r+o[0],u=o[1]+i+n.unitMargin.y;a>s;s++)t.update(s,u);return[o[0]*n.gridWidth+n.unitMargin.x,o[1]+n.unitMargin.y]},_getCur:function(t,e){return this._skipALG(t,e)},_stepALG:function(t,e){for(var i=[null,1/0],n=0,r=e.size();r-t+1>n;n++){for(var o=0,s=n;n+t>s;s++)e.get(s)>o&&(o=e.get(s));i[1]>o&&(i=[n,o])}return i},_skipALG:function(t,e){for(var i=1/0,n=0,r=0,o=e.size();o-t+1>n;n++){for(var s,a=-1/0,u=0;t>u;u++)if(s=e.get(n+u),s>=i){if(n+=u+1,n>o-t){a=i;break}u=-1,a=-1/0}else s>a&&(a=s);i>a&&(i=a,r=n)}return[r,i]},asyncize:function(t){var e=this,i=e.cfg;i.owner.get("suspend")?setTimeout(function(){t.call(e)},0):t.call(e)},callAnim:function(t,i){var n=this.cfg;new e({elm:t,x:i[0],y:i[1],closeAnim:n.closeAnim,duration:n.duration,easing:n.easing,direction:n.direction,frame:n.owner.frame,owner:n.owner})},_getMinMaxColHeight:function(){var t=this.cfg,e=1/0,i=t.owner.curQuery.query,n=Math.max.apply(Math,i);if(0==n)e=0;else for(var r=0,o=i.length;o>r;r++)0!=i[r]&&e>i[r]&&(e=i[r]);return{min:e,max:n}},setHeight:function(t){var e=this.cfg;e.autoHeight&&r.height(e.container,t+e.unitMargin.y)},_cellSort:function(e){var i=this,n=[];t.each(e,function(){t.log("star from here!"),n.push(i._getCells())})},_getCells:function(){return this._getCols()}},n},{requires:["./anim","./linkedlist","dom"]}),KISSY.add("gallery/autoResponsive/1.1/base",function(t,e,i,n){"use strict";function r(){return r.superclass.constructor.apply(this,arguments),t.get(this.get("container"))?(this.fire("beforeInit",{autoResponsive:this}),this.get("autoInit")&&this.init(),this.fire("afterInit",{autoResponsive:this}),void 0):(t.log("can not init, lack of container!"),void 0)}var o=t.DOM,s=t.Event,a=window;return t.extend(r,n,{init:function(){this._bindEvent(),this.initPlugins(),this.render(),t.log("autoResponsive init!")},initPlugins:function(){this.api={};for(var e,i=0,n=this.get("plugins"),r=n.length;r>i;i++)e=n[i],e.init(this),t.mix(this.api,e.api)},render:function(){var e=this.getAttrVals(),n=this.get("whensRecountUnitWH");e.isRecountUnitWH=!!n.length,this.frame=this.frame||0,arguments[0]&&t.each(arguments[0],function(t,i){e[i]=t}),t.mix(e,this.api),this.gridSort=this.gridSort||new i,this.gridSort.init(e,this)},_bind:function(e){var i=this,n=i.get("whensRecountUnitWH");i.get("closeResize")||s.on(a,"resize",function(){e.call(i,{isRecountUnitWH:t.inArray("resize",n)})})},_bindEvent:function(){var e=this;e._bind(t.buffer(function(){var t=e.get("delayOnResize");e.fire("beforeResize"),-1!==t?setTimeout(function(){e.render(arguments)},t):e.render(arguments),e.fire("resize")},e.get("resizeFrequency"),e))},adjust:function(e){var i=this.get("whensRecountUnitWH");this.__isAdjusting=1,this.render({isRecountUnitWH:e||t.inArray("adjust",i)}),this.__isAdjusting=0},isAdjusting:function(){return this.__isAdjusting||0},priority:function(t){this.render({priority:t})},filter:function(t){this.render({filter:t})},margin:function(t){this.render({unitMargin:t})},direction:function(t){this.render({direction:t})},random:function(){this.render({random:!0})},changeCfg:function(e){var i=this;t.each(e,function(t,e){i.set(e,t)})},append:function(t){o.append(t,this.get("container")),this.render({cache:!0})},prepend:function(t){o.prepend(t,this.get("container")),this.render()}},{ATTRS:new e}),r},{requires:["./config","./gridsort","base","dom","event"]});