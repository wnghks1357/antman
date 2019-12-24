window.requestAnimatedFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/60)}}();var m4thUtil={};m4thUtil.IndexManager=new function(){var n=this;n.all=[],n.hashMap={},n.add=function(t){function e(n,t,e){var i=t,a=0,u=e;return{getIndex:function(n){return void 0===n?a:(a+=n,u?a>=i?a=0:0>a&&(a=i-1):a>=i?a=i:0>a&&(a=0),a)},setIndex:function(n){return a=n},isLimited:function(){return a>=i?!0:0>=a?!0:!1},setLength:function(n){i=n},getLength:function(){return i},reset:function(){a=0}}}var i=new e(t.id,t.len,t.isNext);return n.hashMap[t.id]=i,n.all.push(i),n},n.find=function(t){return n.hashMap[t]},n.remove=function(t){n.all.splice(n.all.indexOf(n.hashMap[t]),1),n.hashMap[t]=null}},m4thUtil.TimerManager=new function(){function n(){if(t.count+=1,t.count>=t.fps){var e=-1,i=t.all.length;for(t.count=0;++e<i;)t.all[e].call()}requestAnimatedFrame(n)}var t=this;t.all=[],t.hashMap={},t.count=0,t.isStop=!1,t.fps=60,t.isStartup=!1,t.add=function(e){function i(n,t,e,i){var a=0,u=t,r=e,o=i;return{id:function(){return n},call:function(){o?++a>=u&&(r(),a=0):a=0},auto:function(){return arguments.length?(o=arguments[0],void(a=0)):o},reset:function(){a=0}}}var a=new i(e.id,e.end,e.success,e.isAutoPlay);return t.hashMap[e.id]=a,t.all.push(a),t.isStartup||(requestAnimatedFrame(n),t.isStartup=!0),t},t.find=function(n){return t.hashMap[n]},t.remove=function(n){t.all.splice(t.all.indexOf(t.hashMap[n]),1),t.hashMap[n]=null}};
var Model = new ModelIndex();
ModelIndex.prototype.make = function( id ){
    return this.add( id );
}

function ModelIndex()
{
    this.hashMap = {};
    this.all = [];
    this.add = function(id)
    {
        var m = new model(id);
        this.hashMap[id] = m;
        this.all.push( m )
    }

    this.find = function( id ){ return this.hashMap[id]; }

    function model( id ){
        this.hashMap = {};
        this.all = [];
        this.add = function(d)
        {
            this.hashMap[d.id] = d;
            this.all.push( d )
        }

        this.sort = function(val){
            this.all.sort( function(a,b){
                return a[val] - b[val];
            })
        }

        this.resetTurn = function( val ){
            var j = -1, k = 0, q = 0;
            while( ++j < this.all.length )
            {
                var al = j-1;
                if( al > -1 ){
                    if( this.all[j][val] === this.all[j-1][val] )   this.all[j].turn = k;
                    else    this.all[j].turn = q, k +=1, k = q;
                }
                q+=1;
            }
        }
        this.find = function( id ){
            return this.hashMap[id];
        }

        this.reset = function( arr )
        {
            var i = -1;
            while( ++i < arr.length ){
                this.add( new this.constructor.Data( arr[i] ) );
            }
        }

        this.constructor.Data = function( obj ){
            this.id = obj.id;
        }
    }
}

function trace(){ try{ var args = [].join.call(arguments, ' '); console.log( args );}catch(e){ }  }
function timeStamp(){ try{ var args = [].join.call(arguments, ' '); console.timeStamp( args );}catch(e){ }  }
function hasJqueryObject( elem ){    return elem.length > 0;        }

var app = {};
app.isAnimated = false;
app.isCanvas = false;
app.isBannerAnimated = false;
app.isNoticeAnimated = false;
app.isconImgSdAnimated = false;
app.$activeDepth1 = -1;
app.$activeDepth2 = -1;
var calendarApp = {};

$(function(){
    init();
})

function setActive()
{
    app.$activeDepth1 = arguments[0];
    app.$activeDepth2 = arguments[1];
}

function init()
{
    app.$body = $("body");
    app.$content = app.$body.find("#content");
    var canvas = document.createElement('canvas');
    app.hasCanvas = ( ('getContext' in canvas) ) ? true : false;
    trace( "init" );

    if( hasJqueryObject( app.$body.find("#nav") ) )     initGnb();
    if( hasJqueryObject( app.$body.find("#main") ) )    initMainSlideBox();
    if( hasJqueryObject( app.$body.find( "#mainBanner") ) )     initMainRollingBanner();
    if( hasJqueryObject( app.$body.find(".mainChartTabBox") ) )     initMainChartTabBox();
    if( hasJqueryObject( app.$body.find(".mainKeywordWrap") ) )     initMainKeyWordWrap();
    if( hasJqueryObject( app.$body.find(".mainKobic") ) )   initMainKobic();
    if( hasJqueryObject( app.$body.find(".faqWrap") ) )   initFaq();
    if( hasJqueryObject( app.$body.find(".sortDeep") ) )   sortDeep();
    if( hasJqueryObject( app.$body.find(".conImgSdWrap") ) )   conImgSdSlide();
    if( hasJqueryObject( app.$body.find(".trAddClassOn") ) )   trAddClassOn();
    if( hasJqueryObject( app.$body.find(".listTableBody") ) )   listTableAddClass();
	if( hasJqueryObject( app.$body.find(".searchWrap.srch") ) )     srchView();
    if( hasJqueryObject( app.$body.find(".calLayer") ) )    calendarStartup();
    if( hasJqueryObject( app.$body.find(".overlayPop") ) ) initOverlayPop();
    if( hasJqueryObject( app.$body.find(".loading") ) ) initOverlayPop();
    if( hasJqueryObject( app.$body.find(".pathLnbWrap") ) ) initPathLnb();
    if( hasJqueryObject( app.$body.find(".detailChart") ) ) initDetailChart();
    if( hasJqueryObject( app.$body.find(".relativeBar_1") ) ) initRelativeBar_1();
    if( hasJqueryObject( app.$body.find(".relativeBar_2") ) ) initRelativeBar_2();
    if( hasJqueryObject( app.$body.find(".relativeBar_3") ) ) initRelativeBar_3();
    if( hasJqueryObject( app.$body.find(".subVisual") ) ) initSubVisual();
    if( hasJqueryObject( app.$body.find(".mainNoti") ) ) initMainNotice();
    addEvents();
}

function initMainNotice()
{
    app.$mainNoticeBox =app.$body.find(".mainNoti");
    app.$mainNoticeView = app.$mainNoticeBox.find(".notiRollingView");
    app.$mainNoticeView.append( app.$mainNoticeView.find("li").first().clone() );
    app.mainNoticeLength = app.$mainNoticeView.find("li").length;
    m4thUtil.IndexManager.add( { id : "mainNotice", len : app.mainNoticeLength, isNext : true } );
    m4thUtil.TimerManager.add( { id : "mainNotice", end : 4 , success : completeMainNoticeRolling, isAutoPlay : true });
    function completeMainNoticeRolling( count )
    {
        var idx = m4thUtil.IndexManager.find("mainNotice").getIndex( +1 );
        trace( idx , app.mainNoticeLength );
        TweenMax.to( app.$mainNoticeView ,1, { "margin-top" : -20*idx, ease : Circ.easeInOut, onComplete : function(){
            if( idx === app.mainNoticeLength-1 ){
                app.$mainNoticeView.css("margin-top", 0 );
                m4thUtil.IndexManager.find("mainNotice").setIndex( 0 );
            }
        }});
    }

}


function initSubVisual()
{
    $(".subVisual").addClass("bg"+ parseInt( Math.random()*9+1 ) );
}

function addEvents()
{
    $(window).on("scroll", handleWindowScrolling );
    $(window).on("resize", handleWindowResizing );
}

function handleWindowResizing( e )
{
    if( app.$pop ) updateOverlayPop();
}

function handleWindowScrolling(  e )
{
    if( app.$pop ) updateOverlayPop();
    if( app.$pathLnbWrap ) updatePathLnb()
}

function updatePathLnb()
{
    if( $(window).scrollTop() > app.$pathLnbTop )
    {
        app.$pathLnbWrap.addClass("onTop" );
        app.$content.css("margin-top", app.$pathLnbWrap.css("height") );
    }
    else
    {
        app.$pathLnbWrap.removeClass("onTop" );
        app.$content.css("margin-top", 0 );
    }
}



function initPathLnb()
{
    app.$pathLnbWrap = app.$body.find(".pathLnbWrap");
    app.$pathLnbTop = app.$pathLnbWrap.offset().top;
    app.$pathLnbBox = app.$pathLnbWrap.find(".pathLnb");
    app.$pathLnbBox.find("a").on("click", handlePathLnbClick );
    function handlePathLnbClick( e )
    {
        if( !app.$pathLnbBox.hasClass("on") )   app.$pathLnbBox.addClass("on");
        else    app.$pathLnbBox.removeClass("on");
    }
}

function initOverlayPop()
{
    app.$pop = $(".overlayPop, .loading");
    var t = ( $(window).height() - app.$pop.height() ) *.5 + $(window).scrollTop();
    var l  =( $(window).width() - app.$pop.width() ) *.5;
    app.$pop.css( { "margin-top" : t , "margin-left" : l } );
    $(".btnPopClose").on("click", function(){   app.$pop.hide(), $(".dim").hide(); });
}

function updateOverlayPop()
{
    var l,t;
    if( $(window).width() > 1280 ) ll  =( $(window).width() - app.$pop.width() ) *.5;
    t = ( $(window).height() - app.$pop.height() ) *.5 + $(window).scrollTop();
    app.$pop.css( { "margin-top" : t , "margin-left" : l } );
}

function initMainKobic()
{
    trace( "initMainKobic" );
    app.$mainKobicWrap = app.$body.find(".mainKobic");
    app.$mainKobicBox = app.$mainKobicWrap.find(".kobicBanner ul");
    app.$mainKobicView = app.$mainKobicBox.find("li");
    app.$mainKobicPrevCtrl = app.$mainKobicWrap.find(".btnBnPre");
    app.$mainKobicNextCtrl = app.$mainKobicWrap.find(".btnBnNext");
    app.$mainKobicStopCtrl = app.$mainKobicWrap.find(".btnBnStop");
    app.$mainKobicPlayCtrl = app.$mainKobicWrap.find(".btnBnPlay");
	m4thUtil.TimerManager.add( { id : "mainKobic", end : 4 , success : completeMainKobic, isAutoPlay : true });
    app.$mainKobicPrevCtrl.on("click", handleMainKobicPrevCtrlClick );
    app.$mainKobicNextCtrl.on("click", handleMainKobicNextCtrlClick );
	app.$mainKobicStopCtrl.on("click", handleMainKobicStopCtrlClick );
    app.$mainKobicPlayCtrl.on("click", handleMainKobicPlayCtrlClick );

	function completeMainKobic( count )
    {
        app.$mainKobicNextCtrl.trigger( "click" );
    }

	function handleMainKobicStopCtrlClick( e )
    {
        m4thUtil.TimerManager.find("mainKobic").auto( false );
        var $stopImg = $(this).find("img");
        var $playImg = $(this).siblings(".btnBnPlay").find("img");
        var stopSrc = $stopImg.attr("src").replace( "off", "on" );
        var playSrc =$playImg .attr("src").replace("on", "off");
        $playImg.attr( "src", playSrc );
        $stopImg.attr( "src", stopSrc );
        return false;
    }

    function handleMainKobicPlayCtrlClick( e )
    {
		
        m4thUtil.TimerManager.find("mainKobic").auto( true );
        var $playImg = $(this).find("img");
        var $stopImg = $(this).siblings(".btnBnStop").find("img");
        var playSrc = $playImg.attr("src").replace( "off", "on" );
        var stopSrc =$stopImg .attr("src").replace("on", "off");
        $playImg.attr( "src", playSrc );
        $stopImg.attr( "src", stopSrc );
        return false;
    }

	function handleMainKobicNextCtrlClick( e )
	{
		if( app.isNoticeAnimated ) return false;
		app.isNoticeAnimated = true;
		m4thUtil.TimerManager.find("mainKobic").reset();
		app.$mainKobicBox.find("li:first-child").fadeOut();
		app.$mainKobicBox.find("li:eq(1)").fadeIn();
		app.$mainKobicBox.append( $(".kobicBanner li").first() );
		app.isNoticeAnimated = false;
        return false;
	}

	 function handleMainKobicPrevCtrlClick( e )
    {
		 if( app.isNoticeAnimated ) return false;
		app.isNoticeAnimated = true;
		m4thUtil.TimerManager.find("mainKobic").reset();
        app.$mainKobicBox.prepend( $(".kobicBanner li").last() );
		app.$mainKobicBox.find("li:first-child").fadeIn();
		app.$mainKobicBox.find("li:eq(1)").fadeOut();
		app.isNoticeAnimated = false;
        return false;
    }
}



function initMainSlideBox()
{
    trace( "initMainSlideBox")
    app.$mainSlideWrap = app.$body.find("#slideWrap");
    app.$mainSlideView = app.$mainSlideWrap.find("li");
    app.$mainSlidePrevCtrl = app.$mainSlideWrap.find(".btnSdPre");
    app.$mainSlideNextCtrl = app.$mainSlideWrap.find(".btnSdNext");
    app.$mainSlideStopCtrl = app.$mainSlideWrap.find(".btnSdStop");

    app.$mainSlideView.hide().css("opacity" , 0 ).eq(0).show().css("opacity", 1 );
    app.$mainSlideView.find(".sdTit").css("opacity", 0 );
    app.$mainSlideView.find(".sdTxt").css("opacity", 0 );

    m4thUtil.IndexManager.add( { id : "mainSlide", len : app.$mainSlideView.length , isNext : true} );
    m4thUtil.TimerManager.add( { id : "mainSlide", end : 6 , success : completeMainTimer, isAutoPlay : true });
    app.$mainSlidePrevCtrl.on("click", handleMainSlidePrevCtrlClick );
    app.$mainSlideNextCtrl.on("click", handleMainSlideNextCtrlClick );
    app.$mainSlideStopCtrl.on("click", handleMainSlideStopCtrlClick );

    showMotion( -1, 0  );

    function completeMainTimer( count )
    {
        app.$mainSlideNextCtrl.trigger( "click" );
    }

    function handleMainSlidePrevCtrlClick( e )
    {
        if( app.isAnimated ) return false;
        app.isAnimated = true;
        var currentIdx = m4thUtil.IndexManager.find("mainSlide").getIndex();
        var nextIdx = m4thUtil.IndexManager.find("mainSlide").getIndex(-1);
        showMotion( currentIdx, nextIdx );
        return false;
    }

    function handleMainSlideNextCtrlClick( e )
    {
        if( app.isAnimated ) return false;
        app.isAnimated = true;
        var currentIdx = m4thUtil.IndexManager.find("mainSlide").getIndex();
        var nextIdx = m4thUtil.IndexManager.find("mainSlide").getIndex(+1);
        showMotion( currentIdx, nextIdx );
        return false;
    }

    function showMotion( currentIdx, nextIdx )
    {
        m4thUtil.TimerManager.find("mainSlide").reset();
        var $current = app.$mainSlideView.eq( currentIdx );
        var $next = app.$mainSlideView.eq( nextIdx );
		var $nextSdInfoLeft = parseInt($next.find(".sdInfo").css("left"));
		var $nextSdImgLeft = parseInt($next.find(".sdImg").css("left"));
		if($next.hasClass("left")){
			$next.find(".sdInfo").css({"left":$nextSdInfoLeft-100,"opacity":"0"});
			$next.find(".sdImg").css({"left":$nextSdImgLeft+20,"opacity":"0"});
		}else if($next.hasClass("right")){
			$next.find(".sdInfo").css({"left":$nextSdInfoLeft+100,"opacity":"0"});
			$next.find(".sdImg").css({"left":$nextSdImgLeft-20,"opacity":"0"});
		}
        $next.css("display", "block");
        TweenMax.to( $current,.8, { opacity : 0 , onComplete : function(){
            $current.hide();
        }} );

        TweenMax.set( $next, { opacity : 0 } );
        TweenMax.to( $next, .8, { opacity : 1 } );
        $next.find(".sdTit").css( { "top" :  "+=20", opacity : 0 } );
        $next.find(".sdTxt").css( { "top" :  "+=20", opacity : 0 } );
        TweenMax.to( $next.find(".sdTit"),.7,{ top : "-=20", delay :1, opacity : 1 , ease : Quint.easeOut, onComplete : function(){
            app.isAnimated = false;
        } } );
        TweenMax.to( $next.find(".sdTxt"),.7,{ top : "-=20", delay :.8, opacity : 1 ,  ease : Quint.easeOut } );
		TweenMax.to( $next.find(".sdInfo"),.7,{ left : $nextSdInfoLeft, delay :1.1, opacity : 1 ,  ease : Quint.easeOut } );
		TweenMax.to( $next.find(".sdImg"),.7,{ left : $nextSdImgLeft, delay :1.2, opacity : 1 ,  ease : Quint.easeOut } );
    }

    function handleMainSlideStopCtrlClick( e )
    {
        if( m4thUtil.TimerManager.find("mainSlide").auto() )    m4thUtil.TimerManager.find("mainSlide").auto( false), $(this).find("img").attr( {"src" : "../../images/main/btnSdStop_off.png", alt : "애니메이션 재생" } );
        else        m4thUtil.TimerManager.find("mainSlide").auto( true ),  $(this).find("img").attr( { "src" : "../../images/main/btnSdStop.png" , alt : "애니메이션 정지"});
        return false;
    }
}

function initMainKeyWordWrap()
{
    trace( "initMainKeyWordWrap")
    app.$mainKeywordWrap = $(".mainKeywordWrap");
    app.$mainKeywordMoreCtrl = app.$mainKeywordWrap.find(".btnMore");
    app$mainKeywordCloseMoreCtrl = app.$mainKeywordWrap.find(".btnMoreClose");
    app.$mainKeywordList = app.$mainKeywordWrap.find(".mainKeywordList");
    app.$mainKeywordRollingView = app.$mainKeywordWrap.find(".keywordRollingView");
    app.$mainKeywordRollingView.append( app.$mainKeywordRollingView.find("li").first().clone() );
    m4thUtil.IndexManager.add( { id : "mainKeyward", len : app.$mainKeywordRollingView.find("li").length , isNext : true } );
    m4thUtil.TimerManager.add( { id : "mainKeyward", end : 3 , success : completeMainKeyWordRolling, isAutoPlay : true });
    app.$mainKeywordMoreCtrl.on("click", handleMainkeywordMoreCtrlClick );
    app$mainKeywordCloseMoreCtrl.on("click", handleMainKeywordMoreCtrlClick );

    function completeMainKeyWordRolling( count )
    {
        var idx = m4thUtil.IndexManager.find("mainKeyward").getIndex( +1 );
        TweenMax.to( app.$mainKeywordRollingView ,1, { "margin-top" : -20*idx, ease : Circ.easeInOut, onComplete : function(){
            if( idx === 10 ){
                app.$mainKeywordRollingView.css("margin-top", 0 );
                m4thUtil.IndexManager.find("mainKeyward").setIndex( 0 );
            }
        }});
    }

    function handleMainkeywordMoreCtrlClick( e )
    {
        app.$mainKeywordList.show();
        return false;
    }

    function handleMainKeywordMoreCtrlClick( e )
    {
        app.$mainKeywordList.hide();
        return false;
    }
}

function initMainChartTabBox()
{
    app.$mainChartTabBox = $(".mainChartTabBox");
    app.$mainChartView = app.$mainChartTabBox.find(".tabView");
    app.$mainChartCtrl = app.$mainChartTabBox.find(".tabCtrl");
    app.$mainChartCtrl.find("a").on("click", handleMainChartTabCtrlClick );

    function handleMainChartTabCtrlClick( e )
    {
        var idx = app.$mainChartCtrl.index( $(this).parents(".tabCtrl")[0] );
        app.$mainChartCtrl.removeClass("on").eq(idx).addClass("on");
        mainTabClicked( idx );
        return false;
    }
}

function initMainRollingBanner()
{
    trace( "initMainRollingBanner")
    app.$mainBannerWrap = app.$body.find( "#mainBanner");
    app.$mainBannerBox = app.$mainBannerWrap.find(".bnSiteList");
    app.$mainBannerView = app.$mainBannerBox.find("li");
    app.$mainBannerStopCtrl = app.$mainBannerWrap.find(".btnBnStop");
    app.$mainBannerPlayCtrl = app.$mainBannerWrap.find(".btnBnPlay");
    app.$mainBannerPrevCtrl = app.$mainBannerWrap.find(".btnBnPre");
    app.$mainBannerNextCtrl = app.$mainBannerWrap.find(".btnBnNext");
    m4thUtil.TimerManager.add( { id : "mainBanner", end : 5 , success : completeMainRollingBanner, isAutoPlay : true });
    app.$mainBannerStopCtrl.on("click", handleMainBannerStopCtrlClick );
    app.$mainBannerPlayCtrl.on("click", handleMainBannerPlayCtrlClick );
    app.$mainBannerPrevCtrl.on("click", handleMainBannerPrevCtrlClick );
    app.$mainBannerNextCtrl.on("click", handleMainBannerNextCtrlClick );

    function completeMainRollingBanner( count )
    {
        app.$mainBannerNextCtrl.trigger( "click" );
    }

    function handleMainBannerStopCtrlClick( e )
    {
        m4thUtil.TimerManager.find("mainBanner").auto( false );
        var $stopImg = $(this).find("img");
        var $playImg = $(this).siblings(".btnBnPlay").find("img");
        var stopSrc = $stopImg.attr("src").replace( "off", "on" );
        var playSrc =$playImg .attr("src").replace("on", "off");
        $playImg.attr( "src", playSrc );
        $stopImg.attr( "src", stopSrc );
        return false;
    }

    function handleMainBannerPlayCtrlClick( e )
    {
        m4thUtil.TimerManager.find("mainBanner").auto( true );
        var $playImg = $(this).find("img");
        var $stopImg = $(this).siblings(".btnBnStop").find("img");
        var playSrc = $playImg.attr("src").replace( "off", "on" );
        var stopSrc =$stopImg .attr("src").replace("on", "off");
        $playImg.attr( "src", playSrc );
        $stopImg.attr( "src", stopSrc );
        return false;
    }

    function handleMainBannerPrevCtrlClick( e )
    {
        if( app.isBannerAnimated ) return false;
        m4thUtil.TimerManager.find("mainBanner").reset();
        app.isBannerAnimated = true;
        app.$mainBannerBox.css("margin-left", -165);
        $(".bnSiteList").prepend( $(".bnSiteList li").last() );
        TweenMax.to( app.$mainBannerBox , 1, { "margin-left" : 0, ease : Quint.easeInOut,
            onComplete : function(){
                app.$mainBannerBox.css("margin-left", 0 );
                app.isBannerAnimated = false;
            }
        } );
        return false;
    }

    function handleMainBannerNextCtrlClick( e )
    {
        if( app.isBannerAnimated ) return false;
        m4thUtil.TimerManager.find("mainBanner").reset();
        app.isBannerAnimated = true;
        TweenMax.to( app.$mainBannerBox , 1, { "margin-left" : -165, ease : Quint.easeInOut,
            onComplete : function(){
                $(".bnSiteList").append( $(".bnSiteList li").first() );
                app.$mainBannerBox.css("margin-left", 0 );
                app.isBannerAnimated = false;
            }
        } );
        return false;
    }
}

function initGnb()
{
    trace( "initGnb")
    app.$gnbWrap = app.$body.find("#nav");
    app.$gnbList =app.$gnbWrap.find("li");
    app.$lnbBg = app.$body.find(".lnbBg");
    app.$lnbBgAtfer = app.$body.find(".lnbBg>.gradient");
	app.$openAllGnbCtrl = app.$body.find("");
    app.$closeAllGnbCtrl = app.$body.find(".btnLnbCloae");
    app.$gnbAllWrap = app.$body.find(".gnbAllWrap");
    app.gnbOutTimer = null;
    app.$gnbAllWrap.css( "height", 0 );
    app.$gnbList.find(".lnb").css("height", 0 );
    app.$gnbList.on("mouseenter", handleGnbMouseOver );
    app.$gnbList.on("focusin", handleGnbMouseOver )
    app.$gnbWrap.on("mouseleave", handleGnbMouseOut );
    app.$gnbWrap.on("focusout", handleGnbMouseOut );
    app.$openAllGnbCtrl.on("click", handleOpenAllGnbCtrlClick );
    app.$closeAllGnbCtrl.on("click", handleCloseAllGnbCtrlClick );
    activeGnb();
    function activeGnb( isAni )
    {
        var del = ( isAni ) ? 0.3 : 0;
        if( app.$activeDepth1 > -1)     app.$gnbWrap.find(">li").eq( app.$activeDepth1).addClass("on");
        if( app.$activeDepth2 > -1 )
        {
            app.isActiveGnb = true;
            $(".lnb").eq( app.$activeDepth1).find("li").eq(app.$activeDepth2).addClass("on");
            TweenMax.to( app.$lnbBg,del, { height : 47, ease : Quint.easeInOut } );
            TweenMax.to( app.$lnbBgAtfer,del, { top : 47, ease : Quint.easeInOut} );
            TweenMax.set(  $(".lnb").eq( app.$activeDepth1),{ height : 0 } );
            TweenMax.to(  $(".lnb").eq( app.$activeDepth1),del, { height : 52, ease : Quint.easeInOut } );
        }
    }

    function handleGnbMouseOver( e )
    {
        if( app.$gnbAllWrap.hasClass("active") ) return false;
        var delay = ( e.type === "focusin") ? 0 : .3;
        $(this).addClass("on").siblings("li").removeClass("on");
        TweenMax.to( app.$lnbBg,delay, { height : 47 } );
        TweenMax.to( app.$lnbBgAtfer,delay, { top : 47} );
        TweenMax.to( $(this).find(".lnb"),delay, { height : 52} );
        TweenMax.to( app.$gnbList.find(".lnb").not(this), { height : 52} );
        app.$gnbList.not( $(this) ).find(".lnb").css("height", 52 );
        if( app.$gnbAllWrap.hasClass("active") )
        {
            TweenMax.to( app.$gnbAllWrap ,delay, { height : 0, ease : Quint.easeInOut } );
            app.$gnbAllWrap.removeClass("active");
        }

    }

    function handleGnbMouseOut( e )
    {
        if( app.$gnbAllWrap.hasClass("active") ) return false;
        app.$gnbList.removeClass("on");
        if( app.isActiveGnb )   activeGnb();
        else
        {
            var delay = ( e.type === "focusout") ? 0 : .3;
            TweenMax.to(app.$lnbBg, delay, {height: 0} );
            TweenMax.to(app.$lnbBgAtfer, delay, {top: 2} );
            TweenMax.to(app.$gnbList.find(".lnb"), delay, {height: 0} );
        }
    }

    function handleOpenAllGnbCtrlClick( e )
    {
        if( app.$gnbAllWrap.hasClass("active") )    app.$closeAllGnbCtrl.trigger( "click" );
        else
        {
            app.$gnbAllWrap.show();
            app.$gnbAllWrap.addClass("active");
            TweenMax.to( app.$gnbAllWrap ,.5, { height : 222, delay :.1, ease : Quint.easeInOut } );
            TweenMax.to( app.$lnbBg,.6, { height : 252,ease : Quint.easeInOut } );
            TweenMax.to( app.$lnbBgAtfer,.6, { top : 252,ease : Quint.easeInOut  } );
            app.$gnbList.removeClass("on");
        }
    }

    function handleCloseAllGnbCtrlClick( e )
    {
        app.$gnbAllWrap.removeClass("active");
        TweenMax.to( app.$gnbAllWrap ,.5, { height : 0, ease : Quint.easeInOut, onComplete : function(){
            app.$gnbAllWrap.hide();
            if( app.isActiveGnb )   activeGnb( true );
        }} );
        TweenMax.to( app.$lnbBg,.6, { height : 0,ease : Quint.easeInOut } );
        TweenMax.to( app.$lnbBgAtfer,.6, { top : 2,ease : Quint.easeInOut  } );
    }

}

function calendarStartup()
{
	calendarApp.date = new Date();
	calendarApp.currentYear  = calendarApp.date.getFullYear();
	calendarApp.currentMonth = calendarApp.date.getMonth() + 1;
	calendarApp.currentDay = calendarApp.date.getDate();
    calendarApp.$calView = $(".calLayer");
	calendarApp.$prevBtn = $(".calPrev>a");
	calendarApp.$nextBtn = $(".calNext>a");
	calendarApp.$yearBox = $(".calSelect .selectedYear");
	calendarApp.$monthBox = $(".calSelect .selectedMonth");
	calendarApp.$openBtn = $(".calendarBox .btnR>a");
	calendarApp.$closeBtn = $(".calClose>a");
	calendarApp.dayList = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    calendarApp.$calView.each( function(idx){
        $(this).data("idx", idx );
        var selectedYear = parseInt( $(this).find(".selectedYear").find("option:selected").text() );
        var selectedMonth = parseInt( $(this).find(".selectedMonth").find("option:selected").text() );
        $(this).data( "m", selectedMonth );
        $(this).data( "y", selectedYear );
    });
    calendarApp.$prevBtn.on( "click", handlePrevBtn );
    calendarApp.$nextBtn.on( "click", handleNextBtn );
    calendarApp.$openBtn.on("click", handleOpenBtn );
    calendarApp.$closeBtn.on("click", handleCloseBtn );
    calendarApp.$yearBox.on( "change", handleChangedYearBox );
    calendarApp.$monthBox.on( "change", handleChangedMonthBox );
    $(".calDays").on("click", "td", handleDaysClick );

    function handlePrevBtn( e )
    {
        var $cal = $(this).parents(".calLayer");
        var calcMonth = parseInt( $cal.data("m") ) + 1 ;
        var calcYear = $cal.data("y");
        if( calcMonth <= 0 ){
            calcMonth = 12;
            calcYear -=1;
        }
        $cal.find(".selectedMonth").find("option:selected").attr("selected" , null );
        $cal.find(".selectedMonth").find("option").eq( calcMonth-1 ).attr("selected", "selected")
        $cal.find(".selectedYear").find("option:selected").attr("selected" , null );
        $cal.find(".selectedYear").find("option").each( function( idx ){
            if( parseInt( $(this).text() ) === calcYear ){
                $(this).attr( "selected", "selected" );
            }
        });
        $cal.data( "m", calcMonth );
        $cal.data( "y", calcYear );
        selectedDate( $cal );
    }

    function handleNextBtn( e )
    {
        var $cal = $(this).parents(".calLayer");
        var calcMonth = parseInt( $cal.data("m") ) + 1 ;
        var calcYear = $cal.data("y");
        if( calcMonth > 12 ){
            calcMonth = 1;
            calcYear+=1;
        }
        $cal.find(".selectedMonth").find("option:selected").attr("selected" , null );
        $cal.find(".selectedMonth").find("option").eq( calcMonth-1 ).attr("selected", "selected")
        $cal.find(".selectedYear").find("option:selected").attr("selected" , null );
        $cal.find(".selectedYear").find("option").each( function( idx ){
            if( parseInt( $(this).text() ) === calcYear ){
                $(this).attr( "selected", "selected" );
            }
        });
        $cal.data( "m", calcMonth );
        $cal.data( "y", calcYear );
        selectedDate( $cal );
    }

    function handleOpenBtn( e )
    {
        $(this).parents().next(".calLayer").addClass("active");
        selectedDate( $(this).parents().next(".calLayer") );
    }

    function handleCloseBtn( e )
    {
        //window.open("about:blank","_self").close();
        $(this).parents(".calLayer").removeClass("active");
    }

    function handleChangedYearBox( e )
    {
        var $currentView = $(this).parents(".calLayer");
        var selectedYear = parseInt( $currentView.find(".selectedYear").find("option:selected").text() );
        var selectedMonth = parseInt( $currentView.find(".selectedMonth").find("option:selected").text() );
        $currentView.data( "m", selectedMonth );
        $currentView.data( "y", selectedYear );
        selectedDate( $currentView );
    }

    function handleChangedMonthBox( e )
    {
        var $currentView = $(this).parents(".calLayer");
        var selectedYear = parseInt( $currentView.find(".selectedYear").find("option:selected").text() );
        var selectedMonth = parseInt( $currentView.find(".selectedMonth").find("option:selected").text() );
        $currentView.data( "m", selectedMonth );
        $currentView.data( "y", selectedYear );
        selectedDate( $currentView );
    }

    function handleDaysClick( e )
    {
        var $calBox = $(this).parents(".calendarBox");
        $calBox.find(".calDays").find("a").removeClass("on");
        $(this).find("a").addClass("on");
        var selectedYear = $calBox.find(".selectedYear").find("option:selected").text();
        var selectedMonth = $calBox.find(".selectedMonth").find("option:selected").text()
        selectedMonth = ( selectedMonth.length === 2 ) ? "0"+selectedMonth : selectedMonth;
        var selectedDay = ( $(this).find("a").html().length === 1 ) ? "0"+$(this).find("a").html() : $(this).find("a").html();
        var day = getDay( $(this).attr("data-day") );
        $calBox.find(".disabled input").attr("value", selectedYear + " " + selectedMonth +" " + selectedDay +"일" + " " +  day );
        return false;
    }

    function selectedDate( $view )
    {
        var fDay = findFirstDay( $view );
        var dayList = $view.find("td");
        dayList.find("a").text("");
        var dayBoxLength = dayList.length;
        var enteredLength = fDay + calendarApp.dayList[(parseInt( $view.data("m") )-1)];
        if( dayBoxLength < enteredLength )
        {
            var $clone = $(".calDays tr").eq(0).clone();
            $view.find(".calDays").append( $clone );
            calendarApp.$calendarDayList =$view.find(".calDays").find("td");
        }
        else
        {
            var trLength = $view.find(".calDays>tr").length ;
            if( trLength > 5 )
            {
                $( $view.find(".calDays>tr")[trLength-1] ).remove();
            }
            calendarApp.$calendarDayList =$view.find(".calDays").find("td");
        }

        calendarApp.$calendarDayList.each( function( idx ){
            $(this).find("a").remove();
            if( fDay <= idx ) {
                if ($(this).find("a").length <= 0) $(this).append("<a href='#'></a>");
                if (calendarApp.dayList[parseInt($view.data("m")) - 1] > idx - fDay)      $(this).find("a").text(idx - fDay + 1);
                else    $(this).find("a").remove();
            }
        });
    }

// 윤년 확인.
    function findLeapYear( year, month )
    {
        if (month == 2){
            if ( (year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0)) )  return 29;
            else return 28;
        }
        return 0;
    }
    function getDay( val )
    {
        _val = parseInt( val );
        var str = "";
        switch( _val )
        {
            case 1 :
                str = "(월)";
                break;
            case 2 :
                str = "(화)";
                break;
            case 3 :
                str = "(수)";
                break;
            case 4 :
                str =  "(목)";
                break;
            case 5 :
                str = "(금)";
                break;
            case 6 :
                str = "(토)";
                break;
            case 7 :
                str =  "(일)";
                break;
        }
        return str;
    }

    function findFirstDay( $view )
    {
        calendarApp.date.setYear( parseInt( $view.data("y") ) );
        calendarApp.date.setMonth( parseInt( $view.data("m") )-1 );
        calendarApp.date.setDate( 1 );
        return calendarApp.date.getDay();
    }
}



function initFaq()
{
	trace("initFaq")
	app.$faq = app.$body.find(".faqWrap");
	app.$faqList = app.$faq.find("li");
	app.$faqList.on("click", handleFaqClick );

	function handleFaqClick( e )
	{
		$(this).addClass("on").siblings("li").removeClass("on");
	}
}

function sortDeep()
{
	trace("sortDeep")
	app.$sortDeep = app.$body.find(".sortDeep");
	app.$sortDeepList = app.$sortDeep.find("em");
	app.$sortDeepList.on("click", handleSortDeepClick);
	function handleSortDeepClick( e )
	{
        var he = 0;
		if(!$(this).parent("p").parent("li").hasClass("on")){
			$(this).parent("p").parent("li").addClass("on").children("em").text("하위 목록 닫기");
		}else{
			$(this).parent("p").parent("li").removeClass("on").children("em").text("하위 목록 열기");
		}
        app.$sortDeep.find(">li").each( function(idx){
            he+= $(this).height();
        });
        if( $(this).parents(".sortDeep").hasClass("onlyDepth") )
        {
            var liHeight = $(this).parents(".sortDeep").find("li").first().innerHeight();
            var sortHeight =  $(this).parents(".sortDeep").innerHeight();
            if( sortHeight < liHeight ) $(this).parents(".sortDeep").animate( { "scrollTop" : liHeight-sortHeight+53 }, 10 );
        }
	}
}


function conImgSdSlide()
{
	trace("conImgSdSlide")
	app.$conImgSdWrap = app.$body.find(".conImgSdWrap");
	app.$conImgSdBox = app.$conImgSdWrap.find(".conSdFrame");
    app.$conImgSdView = app.$conImgSdBox.find("ul");
	app.$conImgSdViewNum = app.$conImgSdView.find("li").length;
	app.$conImgSdView.css("width","227"*app.$conImgSdViewNum);
    app.$conImgSdPrevCtrl = app.$conImgSdWrap.find(".btnSdPre");
    app.$conImgSdNextCtrl = app.$conImgSdWrap.find(".btnSdNext");
	app.$conImgSdImgCtrl = app.$conImgSdBox.find("img");
	app.$conImgSdPrevCtrl.on("click", handleconImgSdPrevCtrlClick );
    app.$conImgSdNextCtrl.on("click", handleconImgSdNextCtrlClick );
	app.$conImgSdImgCtrl.on("click", handleconImgSdImgCtrlClick );

	function handleconImgSdPrevCtrlClick( e )
	{
		if( app.isconImgSdAnimated ) return false;
        app.isconImgSdAnimated = true;
		if(parseInt(app.$conImgSdView.css("margin-left")) >= 0){
			alert("첫번째장입니다.");
			app.isconImgSdAnimated = false;
		}else{
			TweenMax.to( app.$conImgSdView , 1, { "margin-left" : '+='+227, ease : Quint.easeInOut,
				onComplete : function(){
					app.isconImgSdAnimated = false;
				}
			} );
		}		
	}

	function handleconImgSdNextCtrlClick( e )
	{
		if( app.isconImgSdAnimated ) return false;
        app.isconImgSdAnimated = true;
		if(app.$conImgSdBox.hasClass("popup")){
			if(parseInt(app.$conImgSdView.css("margin-left")) <= -227*(app.$conImgSdViewNum-3)){
				alert("마지막장입니다");
				app.isconImgSdAnimated = false;
			}else{
				TweenMax.to( app.$conImgSdView , 1, { "margin-left" : '-='+227, ease : Quint.easeInOut,
					onComplete : function(){
						app.isconImgSdAnimated = false;
					}
				} );
			}
		}else{
			if(parseInt(app.$conImgSdView.css("margin-left")) <= -227*(app.$conImgSdViewNum-5)){
				alert("마지막장입니다");
				app.isconImgSdAnimated = false;
			}else{
				TweenMax.to( app.$conImgSdView , 1, { "margin-left" : '-='+227, ease : Quint.easeInOut,
					onComplete : function(){
						app.isconImgSdAnimated = false;
					}
				} );
			}
		}
	}

	function handleconImgSdImgCtrlClick( e )
	{
		var conImgSdUrl = $(this).attr("src");
		var comImgSdAltPopup = $(this).attr("alt");
		var comImgSdUrlPopup = conImgSdUrl;
		comImgSdUrlPopup = comImgSdUrlPopup.replace(".jpg","_origin.jpg");
		//$(this).next("img").attr("src",comImgSdUrlPopup);
		//var originWidth = parseInt($(this).next("img").width());
		//var originHeight = parseInt($(this).next("img").height());
		var originImg = new Image()
		originImg.src = comImgSdUrlPopup;
		$(originImg).load(function(){
			var nW = originImg.width;
			var nH = originImg.height;
			if(nW<800){
				var popUp = window.open('','',"width="+ nW +",height="+ nH +",scrollbars=no,left=0,top=0");
			}else{
				var popUp = window.open('','',"width=800,height=600,scrollbars=yes");
			}
			var popDoc = popUp.document;
			popDoc.open();
			popDoc.write("<html><head><title>"+ comImgSdAltPopup +"</title></head>");
			popDoc.write("<body style='padding:0;margin:0'>");
			popDoc.write("<img src='"+ comImgSdUrlPopup + "'/>");
			popDoc.write("</body></html>");
			popDoc.close();
		});
	}
}

function trAddClassOn()
{
	trace("trAddClassOn")
	app.$trAddClassWrap = app.$body.find(".trAddClassOn");
	app.$trAddClassAnchor = app.$trAddClassWrap.find("a");
	app.$trAddClassAnchor.on("click", handletrAddClassAnchorClick );
	
	function handletrAddClassAnchorClick( e )
	{
		if(app.$trAddClassWrap.hasClass("single"))
		{
			if(!$(this).parents("tr").hasClass("on")){
				$(this).parents("tr").addClass("on").siblings("tr.on").removeClass("on");
			}else{
				$(this).parents("tr").removeClass("on");
			}
		}else if(app.$trAddClassWrap.hasClass("multi"))
		{
			if(!$(this).parents("tr").hasClass("on")){
				$(this).parents("tr").addClass("on");
			}else{
				$(this).parents("tr").removeClass("on");
			}
		}
	}
}

function listTableAddClass()
{
	trace("listTableAddClass");
	app.$listTableAddWrap = app.$body.find(".listTableBody");
	app.$listTableAddAnchor = app.$listTableAddWrap.find("span");
	app.$listTableAddAnchor.on("click", handlelistTableAddClassAnchorClick );
	function handlelistTableAddClassAnchorClick( e )
	{
		$(this).parents("li").addClass("on").siblings("li.on").removeClass("on");
	}
}

/* 2015-04-22 추가 -상세검색 */
function srchView()
{
	trace("srchView")
	app.$srchView = app.$body.find(".searchWrap.srch");
	app.$srchViewBtn = app.$srchView.find(".btnSrchView");
	app.$srchViewBtn.on("click", handleSrchViewClick);

	function handleSrchViewClick( e )
	{
		if(!$(this).parents(".container_22").next(".tableWrap").hasClass("on")){
			$(this).parents(".container_22").next(".tableWrap").addClass("on");
		}else{
			$(this).parents(".container_22").next(".tableWrap").removeClass("on");
		}
	}
}

/* http://newbio.m4nc.net/html/resources/spcResDtl.html 차트 예제.*/
var objList = [
    { count : 80, desc : "1속성"},
    { count : 90, desc : "2속성"},
    { count : 110, desc : "3속성"},
    { count : 90, desc : "4속성"},
    { count : 10, desc : "5속성"},
    { count : 5, desc : "6속성"},
    { count : 27, desc : "7속성"},
    { count : 43, desc : "8속성"},
    { count : 32, desc : "9속성"},
    { count : 60, desc : "10속성"}
];

var obj2List = [
    { count : 80, desc : "1속성"},
    { count : 110, desc : "3속성"},
    { count : 10, desc : "5속성"},
    { count : 5, desc : "6속성"},
    { count : 60, desc : "10속성"}
];


$.fn.circleChart = function( dataList )
{
    var $box = $(this);
    $box.css( { "position" : "absolute", top : "50%", left : "50%" } );
    var i = -1;
    var length = dataList.length;
    var lineLiength = 22;
    var rad = 365/lineLiength
    var appendHTML= "";
    var lineClass = "";
    while( ++i < lineLiength )
    {
        if( dataList[i] === undefined ) dataList.push( { desc : "", count : 0 });
        if( i >= 6 && i <= 15   )   lineClass = "type_2";
        else if( i > 15 )   lineClass = "type_3";
        appendHTML += "<div class='chartBox'><div class='chartView "+lineClass+"'><div class='cir'></div></div><a href='#' class='charTxt'></a></div>";
    }
    $box.append( appendHTML );
    var gap = parseInt( lineLiength/length ) ;
    var listIndex = 0;
    $box.find(".chartView").each( function(idx){
        if( length * gap > idx )
        {
            if( idx%gap === 0 )
            {
                $(this).show();
                TweenMax.set( $(this), { rotation : -90, transformOrigin : "0% 50%", force3D : true });
                $(this).find(".cir").addClass( "type_"+( idx+1 ) );
                $(this).next(".charTxt").addClass( "type_"+( idx+1 )).html( dataList[listIndex].desc + "( " + dataList[listIndex].count + " )" );
                if( idx > 10 )  $(this).next(".charTxt").css("left", "-="+( $(this).next(".charTxt").width()+20 ) );
                var wd = 150-( idx*2);
                TweenMax.set( this, { opacity : 0, width : 0 } );
                TweenMax.to( $(this) , 1, { opacity : 1, rotation : rad*idx-90,  delay : 0.02*idx, width : wd, transformOrigin : "0% 50%", force3D : true, ease : Power4.easeInOut   });
                var radians = ( rad*idx-90) * (Math.PI / 180);
                TweenMax.set( $(this).next(".charTxt"), { left : "+="+parseInt( Math.cos( radians ) * wd ), top: "+="+parseInt( Math.sin(radians) * wd ), force3D : true } );
                TweenMax.to( $(this).next(".charTxt"), 1, { delay : 0.05*idx, opacity : 1,  ease : Power4.easeInOut } );
                listIndex+=1;
            }
        }
    });
}
Math.dsin = function() {
    var piRatio = Math.PI / 180;
    return function dsin(degrees) {
        return Math.sin(degrees * piRatio);
    };
}();

function initDetailChart()
{
    if( app.hasCanvas )
    {
        $(".activeData:eq(0)").circleChart( objList );
        $(".activeData:eq(1)").circleChart( obj2List );
        $(".detailChartIE8").hide();
    }
    else    $(".detailChartIE8").show(), $(".baseDNA").hide();
}

/* http://newbio.m4nc.net/html/stats/statsAll.html 데이터*/
var relativeBar_1ObjList = [
    { id : 1, nm : "동물", totalCaseCount : 1000, totalCateCount : 5000, infoCount : 0, liveCount : 1000 },
    { id : 2, nm : "식물", totalCaseCount : 9000, totalCateCount : 5000,infoCount : 7000, liveCount : 2000 },
    { id : 3, nm : "미생물", totalCaseCount : 8000,totalCateCount : 5000, infoCount : 5000, liveCount : 3000 },
    { id : 4, nm : "실험동물", totalCaseCount : 8000,totalCateCount : 5000, infoCount : 6600, liveCount : 1400 },
    { id : 5, nm : "인체유래", totalCaseCount : 9000,totalCateCount : 5000, infoCount : 9000 }

    //{ id : 1, nm : "동물", totalCaseCount : 1000, totalCateCount : 5000, infoCount : 500, liveCount : 500 },
    //{ id : 2, nm : "식물", totalCaseCount : 1000, totalCateCount : 5000, infoCount : 500, liveCount : 500 },
    //{ id : 3, nm : "미생물", totalCaseCount : 1000, totalCateCount : 5000, infoCount : 500, liveCount : 500},
    //{ id : 4, nm : "실험동물", totalCaseCount : 1000, totalCateCount : 5000, infoCount : 500, liveCount : 500 },
    //{ id : 5, nm : "인체유래", totalCaseCount : 1000, totalCateCount : 5000, infoCount : 500, liveCount : 500  }
];

/* http://newbio.m4nc.net/html/stats/statsOrgAll.html#none 데이터*/
var relativeBar_2ObjList = [
    { id : 1, nm : "미생물자원", totalCaseCount : 1000, totalCateCount : 100, originCount : 500, exCount : 500, bugCount : 0, plantCount : 0, aniCount : 0 },
    { id : 2, nm : "인체유래자원", totalCaseCount : 1000, totalCateCount : 100, originCount : 500, exCount : 500, bugCount : 0, plantCount : 0, aniCount : 0 },
    { id : 3, nm : "해외생물소재연구",  totalCaseCount : 1000, totalCateCount : 100, originCount : 500, exCount : 500, bugCount : 0, plantCount : 0, aniCount : 0 },
    { id : 4, nm : "실험동물자원",  totalCaseCount : 3000, totalCateCount : 100, originCount : 1500, exCount : 500, bugCount : 500, plantCount : 500, aniCount : 0 },
    { id : 5, nm : "국가영장류",  totalCaseCount : 7000, totalCateCount : 100, originCount : 0, exCount : 0, bugCount : 0, plantCount : 7000, aniCount : 0 },
    { id : 6, nm : "한국식물추출물",  totalCaseCount : 4000, totalCateCount : 100, originCount : 0, exCount : 4000, bugCount : 0, plantCount : 0, aniCount : 0 },
    { id : 7, nm : "연구소재중앙센터",  totalCaseCount : 3000, totalCateCount : 100, originCount : 1500, exCount : 500, bugCount : 500, plantCount : 500, aniCount : 0 },
    { id : 8, nm : "KOBIC유전체",  totalCaseCount : 1000, totalCateCount : 100, originCount : 500, exCount : 500, bugCount : 0, plantCount : 0, aniCount : 0 },
    { id : 9, nm : "국립중앙과학관",  totalCaseCount : 6000, totalCateCount : 100, originCount : 0, exCount : 0, bugCount : 6000, plantCount : 0, aniCount : 0 }
];

/* http://newbio.m4nc.net/html/stats/statsResProdAll.html  데이터 */
var relativeBar_3ObjList = [
    { id : 1 , count : 40000 },
    { id : 2 , count : 30000 },
    { id : 3 , count : 40000 }
]

function initRelativeBar_1()
{
    Model.make( "relativeBar_1");
    Model.find( "relativeBar_1").constructor.Data = function( obj )
    {
        this.id = obj.id;
        this.totalCaseCount = obj.totalCaseCount;
        this.totalCateCount = obj.totalCateCount
        this.infoCount = ( obj.infoCount === undefined ) ? null : obj.infoCount;
        this.liveCount = ( obj.liveCount ===  undefined ) ? null : obj.liveCount;
        this.turn = 0;
    }
    Model.find("relativeBar_1").reset( relativeBar_1ObjList );
    Model.find("relativeBar_1").sort( "totalCaseCount" );
    Model.find("relativeBar_1").resetTurn( "totalCaseCount" );
    app.RelBar1CssObj = { display: "block", position: "absolute",top: -5, left: 0, width: 48, height: 5, "backgroundRepeat" : "no-repeat", "backgroundPosition" : "0 0" }
    $(".relativeBar_1").showRelativeBar_1( Model.find("relativeBar_1") );

}

function initRelativeBar_2()
{
    Model.make( "relativeBar_2");
    Model.find( "relativeBar_2").constructor.Data = function( obj )
    {
        this.id = obj.id;
        this.nm = obj.nm;
        this.totalCaseCount= obj.totalCaseCount;
        this.totalCateCount= obj.totalCateCount;
        this.originCount = obj.originCount;
        this.exCount = obj.exCount;
        this.bugCount = obj.bugCount;
        this.plantCount = obj.plantCount;
        this.aniCount = obj.aniCount;
        this.turn = 0;
    }

    Model.find("relativeBar_2").reset( relativeBar_2ObjList );
    Model.find("relativeBar_2").sort( "totalCaseCount" );
    Model.find("relativeBar_2").resetTurn( "totalCaseCount" );
    $(".relativeBar_2").find(".graphBox").each( function(idx){
        $(this).attr("data-index", (idx+1) );
    })
    $(".relativeBar_2").showRelativeBar_2( Model.find("relativeBar_2") );
}

function initRelativeBar_3()
{
    Model.make( "relativeBar_3");
    Model.find( "relativeBar_3").constructor.Data = function( obj )
    {
        this.id = obj.id;
        this.count = obj.count;
        this.turn = 0;
    }
    Model.find("relativeBar_3").reset( relativeBar_3ObjList );
    Model.find("relativeBar_3").sort( "count" );
    Model.find("relativeBar_3").resetTurn( "count" );
    $(".relativeBar_3").showRelativeBar_3( Model.find("relativeBar_3") );
}

$.fn.showRelativeBar_3 = function( model )
{
    var i = -1;
    var dataList = model.all;
    var $graphBox = $(".graphBox");
    var graphLength = $graphBox.length-1;
    while( ++i < dataList.length )
    {
        var m = model.all[i];
        var $box = $graphBox.eq( m.id-1 );
        trace( m.turn );
        $box.find(".grBlue").css("height", 100-( ( graphLength- m.turn)*15 )+"%");
        $box.find("strong").html( m.count.format() );
    }
}


$.fn.showRelativeBar_2 = function( model )
{
    var _model = model;
    var i = 0;
    var $graphBox = $(".graphBox");
    var graphLength = $graphBox.length -1;
    while( ++i <= _model.all.length )
    {
        var m = _model.all[i-1];
        var $box = $graphBox.eq( m.id-1);
        $box.find(".graphCon").css("height", "-="+ ( graphLength-m.turn)*10 );
        var total = m.totalCaseCount;
        var origin = Math.round( m.originCount/total * 100 );
        var ex = Math.round( m.exCount/total * 100 );
        var bug = Math.round( m.bugCount/total * 100 );
        var plant = Math.round( m.plantCount/total * 100 );
        var ani = Math.round( m.aniCount/total * 100 );

        if( origin <= 0 ) $box.find(".grOrange").remove();
        else $box.find(".grOrange").css( { "height" : origin+"%"}), $box.find(".grOrange").find(".graphTxt").html( m.originCount.format() )

        if( ex <= 0 ) $box.find(".grBlueGreen").remove();
        else $box.find(".grBlueGreen").css( { "height" : ex+"%", bottom : origin+"%" }), $box.find(".grBlueGreen").find(".graphTxt").html( m.exCount.format() )

        if( bug <= 0 ) $box.find(".grPurple").remove();
        else $box.find(".grPurple").css( { "height" : bug+"%", bottom : (origin+ex)+"%" }), $box.find(".grPurple").find(".graphTxt").html( m.bugCount.format() )

        if( plant <= 0 ) $box.find(".grGreen").remove();
        else $box.find(".grGreen").css( { "height" : plant+"%", bottom : (origin+ex+bug)+"%" }), $box.find(".grGreen").find(".graphTxt").html( m.plantCount.format() )

        if( ani <= 0 ) $box.find(".grBlue").remove();
        else $box.find(".grBlue").css( { "height" : ani+"%", bottom : (origin+ex+bug+plant)+"%" }), $box.find(".grBlue").find(".graphTxt").html( m.aniCount.format() )
    }
}

$.fn.showRelativeBar_1 = function( model )
{
    var i = -1;
    var dataList = model.all;
    var $box = $(".graphBox");
    var boxLength = $box.length-1;
    while( ++i < dataList.length )
    {
        var m = dataList[i];
        var total = m.totalCaseCount;
        var cate = m.totalCateCount;
        var info = m.infoCount;
        var live = m.liveCount;
        var $graphBox = $box.eq( m.id-1 );
        $graphBox.find(".graphCon").css("height", "-="+ (boxLength-m.turn)*20 );
        var $infoBox = $graphBox.find(".grBlue");
        var $liveBox = $graphBox.find(".grBlueGreen");
        var calcInfo = Math.round( info/total * 1000 ) *.1;
        var calcLive = Math.round( live/total * 1000 ) *.1;
        calcInfo = calcInfo.toFixed(1);
        calcLive = calcLive.toFixed(1);
        if( info != null && info != 0 )
        {
            $infoBox.css( { "height" : calcInfo+"%" , "bottom" : calcLive+"%"});
            $infoBox.find(".per").html( calcInfo+"%" );
            $infoBox.find(".graphNum strong").html( info.format() );
        }
        else
        {
            $infoBox.css({ "height" :  "0%" , "minHeight" : 0 });
            $infoBox.find(".per").html( "" );
            $infoBox.find(".graphNum").html( "" );
            $liveBox.find(".graphShape").css( app.RelBar1CssObj );
        }

        if( live != null && live != 0 )
        {
            $liveBox.css("height", calcLive+"%" );
            $liveBox.find(".per").html( calcLive+"%" );
            $liveBox.find(".graphNum strong").html( live.format() );
        }
        else
        {
            $liveBox.css({ "height" :  "0%" , "minHeight" : 0 });
            $liveBox.find(".per").html( "" );
            $liveBox.find(".graphNum").html( "" );
        }



        $graphBox.find(".graphTotal").html( "(총 "+ total.format()+" 건 / 총 "+ cate.format() + " 종)");
    }
}


Number.prototype.format = function(){
    if(this==0) return 0;
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
};

String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
    return num.format();
};

