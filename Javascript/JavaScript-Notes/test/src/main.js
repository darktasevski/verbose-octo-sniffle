var uoffset = 0;
var ustep = 20;
var hasmore = true;
var mmstamp = false;
var designers = '';
var hashtag = '';
function getmore(entry){
	hasmore = false;
    var data = new Object();
    data.offset = uoffset;
    data.amount = ustep;
	if(entry){
		data.following = entry.val();
	}else{
		data.following = $('#following').val();
	}
    data.category = $('#category').val();
    data.designers = designers;
    data.hashtag = $('#hashtag').val();
	if (typeof realonly !== 'undefined' && realonly){
		data.realonly = true;
	}
	mmstamp = new Date().getTime() + "";
	data.timestamp = mmstamp;
    myajax('POST', '/moment/v2/getusermedia/', data);
	uoffset += ustep;
}

/*var step = 9;
function getPicks(offset, amount, subcategory){
    var data = new Object();
    data.offset = offset;
    data.amount = amount;
    data.category = 's';
    data.subcategory = subcategory;
    myajax('POST', URLPREFIX + '/channel/getpicks/', data);
}

getPicks(0, step, 'BOOTS');
getPicks(0, step, 'PUMPS');
getPicks(0, step, 'FLATS');
getPicks(0, step, 'SNEAKERS');
getPicks(0, step, 'SANDALS');*/

function getusermediadone(obj){
//	console.log(obj.umedias[0])
	if (obj.timestamp != mmstamp) return;
	mmstamp = false;
	
    $.each(obj.umedias, function( index, value ) {
		media = formatumd(value, true);
		$('#wmedias').waterfall('append', media, function(){});
	});

    if (obj.umedias.length < ustep){
        if (uoffset == 0 && obj.umedias.length == 0){
			$('#more').html(gettext('No moments. Try changing the filters.')).unbind();
		} else {
			$('#more').html(gettext('That\'s all we\'ve got right now')).unbind();
		}
    } else {
        hasmore = true;
    }
}


function followRefresh(entry){
	if (!login) {		
		$('#spmodal h4', window.top.document).html(gettext('Please sign in'));
		$('#spmsg', window.top.document).html(gettext("Please login to build your following list"));
		$('#spmodal', window.top.document).modal('show');

		var reveryone = gettext("From Everyone");
		var rfollowing = gettext("I'm Following");	
		$("#rfollowing").empty();
		$("#rfollowing").append("<option value='0' selected>"+reveryone+"</option>");
		$("#rfollowing").append("<option value='1'>"+rfollowing+"</option>");
		
		$("#following").empty();
		$("#following").append("<option value='0' selected>"+reveryone+"</option>");
		$("#following").append("<option value='1'>"+rfollowing+"</option>");
		return;
	}else{
		refresh(entry)
	}
}


function refresh(entry){
    uoffset = 0;
	hasmore = true;
	$('#wmedias').html('').attr('style', '');
	$('#more').html("<img src='/static/img/sync.gif'>");
    getmore(entry);
}


/*
function showdetail(bid){
	var b = $('#'+bid);
	$('#mdddesigner').html(b.find('.bdesigner').html());
	$('#mddname').html(b.find('.bname').html());
	$('#mdddprice').html(b.find('.bprice').html());
	$('#mddimg').attr('src', b.find('img').attr('src'));
	$('#mddetail').modal('show');
}*/

var moretmp = "<div class='more'><a href='/product/browse/?subcategory=_subc'>See more _subc</a></div>";
function getpickdone(obj){
    var picksid;
    if (obj.subcategory == 'BOOTS') {
        picksid = '#boots';
    } else if (obj.subcategory == 'PUMPS') {
        picksid = '#pumps';
    } else if (obj.subcategory == 'FLATS') {
        picksid = '#flats';
    } else if (obj.subcategory == 'SNEAKERS') {
        picksid = '#sneakers';
    } else if (obj.subcategory == 'SANDALS') {
        picksid = '#sandals';
    }
    var count = 0;
    $.each(obj.picks, function( index, value ) {
		var product = value.product;
        var prd = formatprd(product);
		prd = prd.replace('_cover', value.cover)
		prd = prd.replace('_href', URLPREFIX + '/channel/pick/' + value.id + '/');
        $(picksid + " .picks").append(prd);
        count++;
    });

    if (count < step) {
		var padding = (3-obj.picks.length%3)%3;
		while (padding > 0){
			padding -= 1;
			$(picksid + " .picks").append(formatemptyprd());
		}

        $(picksid + " .picks").append(moretmp.replace(/_subc/g,  obj.subcategory.toLowerCase()));
	}

	$(picksid + ' > ').css('color', 'black');
    /*$('.pickinfo').hover(
        function() {
            $(this).animate({opacity: 1}, 500, function() {});
            $(this).siblings('.pickmask').animate({opacity: 0.5}, 500, function() {});
        },
        function() {
            $(this).animate({opacity: 0}, 500, function() {});
            $(this).siblings('.pickmask').animate({opacity: 0}, 500, function() {});
        }
    );*/

}

var gdstamp = false;
function getdesigners(){
    var data = new Object();
    data.category = category;   
	gdstamp = new Date().getTime() + "";
	data.timestamp = gdstamp; 
    myajax('POST', '/moment/getdesigners/', data);
}

function getDesignersDone(obj){
	if (obj.timestamp != gdstamp) return;
	gdstamp = false;
    prepareDesigners(obj.fdesigners, obj.pdesigners, obj.cdesigners);
}

function newhash(){
	var nhash = $('#hashtag').val();
	if (nhash == hashtag) return;
	hashtag = nhash;
	refresh();
}

$(document).ready( function() {	
	$('.pickright').click(function() {
		var parent = $(this).parent();
		var picks = parent.find('.picks:first');
		var left = picks.position().left; //parseInt(picks.css("marginLeft").replace('px', ''));
		var width = picks.width();
		var length = Math.floor(width / 900);
		var current = Math.floor((50 - left) / 900);
		if (length - current <= 1) {
			return;
		}
		picks.animate({left: left-900}, 1000, function() {});
		current += 1;
		if (length - current <= 1) {
			$(this).css('color', '#999');
		} else if(length - current == 2){
			if (parent.find('.more').length == 0) {
				getPicks(length*3, step, parent.attr('id').toUpperCase());
			}
		}
		$(this).parent().find('.pickleft').css('color', 'black');
	});

	$('.pickleft').click(function() {
		var picks = $(this).parent().find('.picks:first');
		var left = picks.position().left; //parseInt(picks.css("marginLeft").replace('px', ''));
		var width = picks.width();
		var length = Math.floor(width / 900);
		var current = Math.floor((50 - left) / 900);
		if (current <= 0) {
			return;
		}
		picks.animate({left: left+900}, 1000, function() {});
		current -= 1;
		if (current <= 0) {
			$(this).css('color', '#999');
		}
		$(this).parent().find('.pickright').css('color', 'black');
	});

	$(window).scroll(bindScroll);
	
	$("#hashtag").typeahead({
		showHintOnFocus:false,
		minLength:0,
		delay:500,
		autoSelect:true,
		amount:5,
		queryhelper: function (query) {
			var words = query.split(' ');
			if (words.length > 0 ) {
				var lastword = words[words.length - 1];
				if (lastword.length > 0) {
					return lastword;
				}
			}
			return '#';
		},
		select: function () {
		  var txt = this.$element.val();
		  var val = this.$menu.find('.active').data('value');
		  this.$element.data('active', val);
		  var newVal = txt.replace(this.query, '') + this.updater(val);
		  this.$element
			  .val(this.displayText(newVal) || newVal)
			  .change();
		  this.afterSelect(newVal);
		  $('#hashtag').blur();
		  return this.hide();		  
		}
	});
	
	$('#hashtag').blur(function(){newhash()}).keyup(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == 13) newhash();
	});
});

var w2ftmp= "<div class='w2f'>"+
				"<a target='_blank' href='/_uname/'>"+
					"<div class='valign'>"+
						"<img src='_uicons' alt='_uname'>"+
					"</div>"+
					"<div class='w2fname'>_uname</div>"+
					"<div id='mstar_icon'></div>"+
				"</a>"+
				// "<button id='follow' onclick=\"follow('_uid', '_uname', $(this));\">+_follow</button>"+
			"</div>";

function get2follow(){
	var data = new Object();
    data.amount = 8;
	myajax('POST', '/who2follow/', data);
}

function get2followdone(obj){
	$.each(obj.tofollow, function(index, value) {
		if(value.ismstar){
			var w2f = w2ftmp.replace(/_uname/g, value.username).replace('_words', value.words).replace('_uicon', value.icon).replace('_uid', value.uid);
			if(value.isofficial){
				w2f = w2f.replace("<div id='mstar_icon'></div>","<div id='official_icon'></div>")
			}
		}
		else{
			var w2f = w2ftmp.replace("<div id='mstar_icon'></div>",'').replace(/_uname/g, value.username).replace('_words', value.words).replace('_uicon', value.icon).replace('_uid', value.uid);
		}
		w2f = w2f.replace('_follow',gettext('Follow'));
		$('#w2fs').append(w2f);
	});
}

function mreset(){
	designers = '';
	hashtag = '';
	$('#designersel').multiselect('checkAll');
	$('#hashtag').val('');
	$('#category').val('');
	refresh();
}

getmore();
initwaterfall();