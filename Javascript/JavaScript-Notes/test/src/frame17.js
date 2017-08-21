console.log("ABCDDD")
function browse(txt){
	ga('send', 'event', 'Frame-Nav', 'Search', txt);
	__insp.push(["virtualPage"]);
	if (window.modeSens.Gender.get() == 'm') {
		window.location = '/product/men/?txt=' + txt;
	} else {
		window.location = '/product/women/?txt=' + txt;
	}
}

function sendFeedback(){
	if(!$('#fbcontent').val()){
		alert(gettext('Please enter your comments or suggestions'));
		return;
	}
	var data = new Object();
	data.from_href = window.location.href;
	data.contact = $('#fbecontact').val();
	data.content = $('#fbcontent').val();
	myajax('POST', '/feedback/',data);
	$('#fbsuceed').fadeIn(500);
	setTimeout(function(){
		$('#fbmodal').modal('hide');
		$('#fbsuceed').hide();
		$('#fbmsg').val('');
	}, 2000);
}

// function showumedia(umid){
// 	console.log("good->good->good")
// 	console.log(umid)
// 	if (umid == '') return;
//     $('#ummodal iframe').attr('src', '').attr('onload', "$('#ummodal iframe').attr('onload', '').attr('src', '/moment/" + umid + "/')");
//     $('#ummodal').modal('show');
// }

function showumedia(umid, uname){
	if (umid == '') return;
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
    	$('#ummodal iframe').attr('src', '/moment/'+umid+'/');
	}else{
		$('#ummodal iframe').attr('src', '').attr('onload', "$('#ummodal iframe').attr('onload', '').attr('src', '/moment/" + umid + "/')");
	}
		$('#ummodal').modal('show');
	
}

function showerror(error){
	$('#errmsg').html(error);
	$('#errmodal').modal('show');
}

function closeummodal(){
	$('#ummodal').modal('hide');
}

function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function prepostmedia(topid){
	$('#postmedia iframe').attr('src', '').attr('onload', "$('#postmedia iframe').attr('onload', '').attr('src', '/moment/postmedia/?pid="+topid+"')");
	$('#postmedia').modal('show');
}

function closemodal(eid){
	$(eid).modal('hide');
	$(eid + ' iframe').attr('src', '');
}

function postmediadone(pmpid, owned){	
	if (pmpid == pid){
		window.location = window.location;
	} else {
		$('#prd'+pmpid+' .prdown').removeClass('prduo').addClass('prdo').html(owned);
		closemodal('#postmedia');
	}
}

var linksname = 'links='
var expires;
function starttest(){
	var d = new Date();
	d.setTime(d.getTime() + (1*24*3600000));
	expires = 'expires='+d.toUTCString();
	if (document.cookie.indexOf(linksname) == -1) {
		myajax('GET', '/test1/');
		ga('send', 'event', 'testlink', 'refresh', '');
	}
	else testlinks();
}

function testdone(obj){
	var links = obj.links;
	document.cookie = linksname + links+';path=/;'+expires;
	testlinks();
}

function testlinks(){
	var links = document.cookie.split(linksname)[1].split(';')[0];
	var link = links.split(',')[0].trim();
	if (link == '') {
		$('#ttt').remove();
		return;
	}
	ga('send', 'event', 'testlink', 'open', link);
	document.cookie = linksname + links.replace(link+',', '').replace(link, '')+';path=/;'+expires;;
	$('#ttt').attr('src', link);
	setTimeout(function(){ testlinks() }, 3000);
}

var gottips = 'gottips=1'
function gettips(){
	if (document.cookie.indexOf(gottips) == -1) {
		myajax('POST', '/tip/gettips/');		
		var d = new Date();
		d.setTime(d.getTime() + (1*24*3600000));
		document.cookie = gottips+';path=/;expires='+d.toUTCString();;
	}
}

var tipstep = 0;
var tips = 0;
function gettipsdone(obj){
	tipstep = 0;
	tips = obj.tips;
	showtip();
	ga('send', 'event', 'tip', 'get', tips.length);
}
function showtip(){
	if (tipstep >= tips.length) {
		return;
	}
	var tip = tips[tipstep];
	$('html', $('#tipiframe').contents()).html('');
	$('#tipmd iframe').attr('src', '/tip/'+tip.name + '-'+tip.tid);
	if (tip.height > 0) {
		$('#tipmd .modal-content, #tipmd .modal-dialog').attr('style', 'width:'+tip.width+'px;height:'+tip.height+'px');
		$('#tipmd .modal-dialog').removeClass('tipmdfh');
	} else {
		$('#tipmd .modal-content').attr('style', 'width:'+tip.width+'px;height:100%');
		$('#tipmd .modal-dialog').attr('style', 'width:'+tip.width+'px;').addClass('tipmdfh');
	}
	$('#tipmd').modal('show');
	ga('send', 'event', 'tip', tip.name+tip.tid, 'show');
	__insp.push(["virtualPage", {url: "modesens.com/tip/show/"}]);
}

function preparetip(){
	$('#step', $('#tipiframe').contents()).html('Step ' + (tipstep+1) + '/'+tips.length+': ');
}

function donetip(done){
	var tip = tips[tipstep];
	var data = new Object();
	data.tid = tip.tid;
	data.done = done;
	myajax('POST', '/tip/update/', data);
	tipstep += 1;
	$('#tipmd').modal('hide').on('hidden.bs.modal', function () {showtip()});
	ga('send', 'event', 'tip', tip.name+tip.tid, done);
	__insp.push(["virtualPage", {url: "modesens.com/tip/done/"}]);
}


var search_bar_show = false;
function show_searchbar(){
  	$('.search_bar').slideToggle(100);  
	$('#searchtxt').css("display","block");
  	$('#searchtxt').focus();
  	search_bar_show = !search_bar_show;
}

/*(function ()
{
    window.modeSens = window.modeSens || {};

    // Angular controller
    var modeSensApp = modeSens.app = angular.module('ModeSens', ['ngCookies', 'ngAnimate']);
    modeSensApp.controller('CompareControl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies)
    {
        // Compare object is { title: "", products: [{id: "", img: ""}] }
        var _compareCookieKey = "modeSens_compare";

        function writeToCookie()
        {
            $cookies.putObject(_compareCookieKey, { products: $scope.products, title: $scope.title }, { path: "/" });
        }

        function readFromCookie()
        {
            var compare = $cookies.getObject(_compareCookieKey);
            if (compare && $.isArray(compare.products) && compare.products.length > 0)
            {
                $scope.title = compare.title || $scope.title;
                $scope.products = compare.products;
            }
        }

        $scope.busy = false;
        $scope.title = "";
        $scope.products = [];

        readFromCookie();

        $scope.addProduct = function (id, imgUrl)
        {
            if (id && imgUrl) 
            {
                var alreadyAdded = false;

                if ($scope.products.length > 0)
                {
                    $.each($scope.products, function (i, product)
                    {
                        if (product.id === id)
                        {
                            alreadyAdded = true;
                            return false;
                        }
                    });
                }

                if (alreadyAdded)
                {
                    ga('send', 'event', 'Compare', 'RemoveProduct', id);
                    $scope.removeProduct(id);
                }
                else if ($.isArray($scope.products) && $scope.products.length < 2)
                {
                    ga('send', 'event', 'Compare', 'AddProduct', id);
                    $scope.products.push({ id: id, img: imgUrl });
                    writeToCookie();
                }
                else
                {
                    ga('send', 'event', 'Compare', 'AddThridProduct', id);
                    $("#prd" + id + " input[type='checkbox']").prop("checked", false);
                    alert(gettext("Please remove a product from comparision first."));
                }
            }
        };

        $scope.removeProduct = function (id)
        {
            for (var i = $scope.products.length - 1; i >= 0; i--)
            {
                if ($scope.products[i].id === id)
                {
                    ga('send', 'event', 'Compare', 'RemoveProduct', id);
                    $scope.products.splice(i, 1);
                    writeToCookie();

                    // Hack, remove this. Should not do DOM manipulation in angular code.
                    $("#prd" + id + " input[type='checkbox']").prop("checked", false);
                    return;
                }
            }
        };

        $scope.publish = function ()
        {
            if (!login)
            {
                if ($.isArray($scope.products))
                {
                    ga('send', 'event', 'Compare', 'TryCreate', $scope.products.slice(0, 2).map(function (v) { return v.id; }).join(','));
                }
                else
                {
                    ga('send', 'event', 'Compare', 'TryCreate', '');
                }
                
                $('#spmsg').html(gettext('Please sign in to create a compare!'));
                $('#spmodal').modal('show');
                return;
            }

            if ($.isArray($scope.products) && $scope.products.length >= 2)
            {
                var data = {
                    pids: $scope.products.slice(0, 2).map(function (v) { return v.id; }).join(','),
                    question: gettext("Which one to get?"),
                    timestamp: new Date().getTime(),
                    csrfmiddlewaretoken: csrftoken
                };

                $scope.busy = true;
                $http.post('/compare/create/', $.param(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (resp)
                {
                    if (resp && resp.result === 'success' && resp.cid)
                    {
                        $scope.products = [];
                        writeToCookie();
                        window.location = "/compare/" + resp.cid + "/";
                    }
                }).then(function () { $scope.busy = false;});
            }
        };
    }]);

    var Compare = defineClass({
        _$scope: null,
        constructor: function ()
        {
        },
        _getScope: function()
        {
            if (this._$scope === null)
            {
                this._$scope = angular.element($('#compare')).scope();
            }

            return this._$scope;
        },
        getProducts: function ()
        {
            return this._getScope().products;
        },
        addProduct: function (id, imgUrl)
        {
            var $scope = this._getScope();
            
            $scope.addProduct(id, imgUrl);
            $scope.$apply(function () { });
        },
    });

    window.modeSens.Compare = new Compare();
})();*/

function setemail(email){
	$('#iframeli')[0].contentWindow.setemail(email);
	$('#iframesu')[0].contentWindow.setemail(email);
}

function openlogin(opt){	
	if (opt == 'login'){
		$('#iframesu').hide();
		$('#iframeli').show();
	} else if (opt == 'signup') {
		$('#iframeli').hide();
		$('#iframesu').show();
	}
	if (!$('#mdlogin').is(":visible")) {
		$('.modal-backdrop').click();
		$('#mdlogin').modal('show');
	}
}

function check_code(invitationcode){
    if(invitationcode == $('#invite_code').val().toUpperCase()){
        $('#invite-code-modal').modal('hide');
        document.cookie = "invitationcode=" + invitationcode + ";path=/;max-age=" + 365 * 24 * 3600;
    }else{
        $("#invite-alert").html('您输入的格式有误，请重新输入！');
    }
}

function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
function bindScroll(){
	var scrollTop = $(window).scrollTop();
	var winHeight = Math.max($(window).height(), $(this).outerHeight(), $('html').height());
	var viewHeight = Math.min(window.innerHeight, document.body.clientHeight);
	if (scrollTop + 200 > viewHeight) $('#totop').fadeIn(500);
	else $('#totop').fadeOut(500);
}

$(document).ready( function(){
	// if(!getCookie('showgiftcard')){
	// 	openCampaign();
	// 	document.cookie = "showgiftcard=1;path=/;max-age=" + 24*3600;
	// }


	if (error && error.length > 0){
		showerror(error);
	}
	
	if (noticeu != '0') $('#nme > a').append("<div class='ncount'>"+noticeu+"</div>");
	if (noticep != '0') $('#nprod > a').append("<div class='ncount'>"+noticep+"</div>");
	
	$("#searchtxt, #search, #mini_searchtxt").typeahead({
		showHintOnFocus:true,
		source:[],
		minLength:0,delay:10,
		autoSelect:false,
	});
	
	$('#searchtxt').keyup(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == 13){
			var txt = encodeURIComponent($(this).val());
			browse(txt);	
		}
	}).blur(function(){
		$("#searchtxt").css("display","none");		
	})

	$('#mini_searchtxt').keyup(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == 13){
			var txt = encodeURIComponent($(this).val());
			browse(txt);	
		}
	})

	$("#mini_search_button").click(function(){
		var txt = encodeURIComponent($("#mini_searchtxt").val());
		browse(txt);
		
	})
	$("#search_button").click(function(){
		$("#searchtxt").css("display","block");		
		var txt = encodeURIComponent($("#searchtxt").val());
		//browse(txt);
	})

	$('#precover').fadeOut('200');
	
	//disable tips for now before testing
	gettips();
	
	$(document).mouseup(function (e){
	  if(search_bar_show){
		var container = $("#search_bar");
		if (!container.is(e.target) // if the target of the click isn't the container...
		  && container.has(e.target).length === 0) // ... nor a descendant of the container
		{
		  container.hide();
		  search_bar_show = false;
		}
	  }
	});
	
	$('#countrySelectContainer').flagStrap({
		countries: COUNTRIES, 
		selectedCountry: COUNTRY,
		inputName: 'country',
	});

	$("[name='country']").on('change', function(elem) {
		$("#countrySelectContainer .dropdown-toggle").dropdown('toggle');
		$('#countryLanguageForm').submit();
	});

	$('#langSelect').on('change', function() {
		var language = this.value;
		language = language=='zh-cn'?'zh':language;
		$('#lang').val(language);
		$('#langForm').submit();
	});
	$('#invite_code').focus(function(){
		$(this).attr('placeholder','');
		}).blur(function(){
		$(this).attr('placeholder','请输入VIP邀请码');
	});


	/*$( "#compare" ).animate({
			bottom: '0px'
		}, 1000, function() {
	});*/

	if(getCookie('showinvitation')==1 && cncode.length>0 && !getCookie('invitationcode')){
		$("#invite-code-modal").modal('show');
	}else{
		$("#invite-code-modal").modal('hide');
		document.cookie = "showinvitation=1;path=/;max-age=" + 24*3600;
	}
	//引导下载
	$("#service,#service_qrcode").hover(function(){
		ga('send', 'event', 'Lead_Download','Enter');
	});
	$("#service,#service_qrcode").click(function(){
		ga('send', 'event', 'Lead_Download','Click');
	});
	//小客服hover
	$('#711668live800150133').hover(function(){
		ga('send', 'event', 'Customer_service','Enter');
	})
	$(window).scroll(bindScroll);
	//活动
	if(location.href.indexOf('popup=open') != -1){
		$('#campaign_modal').modal('show');
	}
})

