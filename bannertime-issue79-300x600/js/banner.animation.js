"use strict";Banner.prototype.start=function(){this.banner=document.querySelector(".banner"),this.bannerWidth=this.banner.offsetWidth,this.bannerHeight=this.banner.offsetHeight,this.images=["images/logo.png"];var e=this;this.preloadImages(this.images,function(){e.createElements(),e.setup(),e.hidePreloader(),e.animate(),e.bindEvents()})},Banner.prototype.createElements=function(){this.logo=this.smartObject({backgroundImage:"images/logo.png",retina:!0,parent:this.banner})},Banner.prototype.setup=function(){this.logo.center(),this.logo.set({autoAlpha:0,scale:.4})},Banner.prototype.hidePreloader=function(){TweenLite.to(".preloader",1,{autoAlpha:0})},Banner.prototype.animate=function(){function e(){t.timeline.gotoAndPlay("start")}var t=this;this.timeline=new TimelineLite({onComplete:e}).addLabel("start",0).add(TweenLite.to(this.logo,2,{autoAlpha:1,scale:.7,delay:1,ease:Elastic.easeOut})).add(TweenLite.to(this.logo,1,{autoAlpha:0,scale:.4,delay:1}))};