/*! autoResponsive - v1.0 - 2013-07-02 3:19:43 PM
* Copyright (c) 2013 xudafeng; Licensed  */
KISSY.add("gallery/autoResponsive/1.0/plugin/hash",function(e){"use strict";function t(e){var t=this;t.prefix=e.prefix||"ks-",t.api={}}var n=(e.Event,"&"),i="=";return e.augment(t,{init:function(){var t=this;e.log("hash init!"),t.hasHash()&&t.parse()},hasHash:function(){return location.hash?!0:!1},parse:function(){var e=this;e.getParam()},getParam:function(){var t=this;t.hash=location.hash.split(n),e.each(t.hash,function(e){t.getPriority(e),t.getFilter(e)})},getPriority:function(t){var n=this,r=n.prefix+"priority";-1!=t.indexOf(r)&&e.mix(n.api,{priority:t.split(i)[1]})},getFilter:function(t){var n=this,r=n.prefix+"filter";-1!=t.indexOf(r)&&e.mix(n.api,{filter:t.split(i)[1]})}}),t},{requires:["event"]});