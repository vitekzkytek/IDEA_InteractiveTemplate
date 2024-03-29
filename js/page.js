var sizes = {}

var waypoints;

const shareLink = 'https://vitekzkytek.github.io/PatentCitations2/'
const shareTitle = 'Kde jsou nejcitovanější patenty?'

const fbLink = 'https://www.facebook.com/ideacerge/posts/997690760422768/'

function loadJS() {

    waypoints = waypointing();

    checkResolution();

    shareLinks();

}

function shareLinks() {
    //Facebook
    $('#fb').attr('href',"https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(shareLink));

    //Twitter
    $('#tw').attr('href',"https://twitter.com/intent/tweet?text=" + encodeURI(shareTitle + ' ' + shareLink) );

    //LinkedIn
    $('#li').attr('href',"http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURI(shareLink) + "&title=" + encodeURI(shareTitle))

    $('#mail').attr('href',"mailto:?subject="+ encodeURIComponent(shareTitle) + "&body=" + encodeURIComponent(shareLink) )

}


function checkResolution() {
    w = $(window).width()
    if (w<999) {
        $('#myurl2').val(weblink);
        showModal('modRozliseni');
        $('#modalWrap').off('click');
    }
}

function waypointing() {
    function activatefix(selector) {
        $('.fixactive').removeClass('fixactive');
        $(selector).addClass('fixactive');
    };

    function fixBox(selector,parent,target,toppos) {
        element = $(parent+ ' ' +selector).detach();
        $(target).append(element)
        $(target  + ' ' + selector).css({top:toppos,'box-shadow':'0 0 0 0'})
    }

    function floatBox(selector,parent,target) {
        element = $(parent + ' ' + selector).detach();
        $(target).append(element)
        $(element).css({top:'0px','box-shadow': '0px 0px 20px 4px #d1d4d3'})
    }

    // fixing menu and adding shadow
    waypoints = $('#menu').waypoint(function(direction) {
        if(direction === 'down') {
            $('#everything').append($('<div class="stickyshadow"></div>'));
            $('#menu').addClass('sticky');
            $('#menu').removeClass('floaty');
            $('#menuempty').css('display','block')
        } else {
            $('#menu').addClass('floaty');
            $('#menu').removeClass('sticky');
            $('#menuempty').css('display','none')
            $('.stickyshadow').remove();
        }});

    // MENU INTERACTIONS
    waypoints = $('#intro').waypoint({handler:function(direction) {
                if (direction === 'down') {
                    $('#mIntro').addClass('storyPast')
                } else {
                    $('#mIntro').removeClass('storyPast')
                }},offset:'17%'});


    waypoints = $('#intro').waypoint(function(direction) {
        if (direction === 'down') {
            activatefix('#app')
        } else {
            activatefix('#intro')
        }});

    waypoints = $('#empt-app').waypoint({handler:function(direction) {
        if (direction === 'down') {
            $('#mapp').addClass('storyPast')
        } else {
            $('#mapp').removeClass('storyPast')
        }},offset:'17%'});



    waypoints = $('#conclusions').waypoint({handler:function(direction) {
        if (direction === 'down') {
            $('#mConclusion').addClass('storyPast')
        } else {
            $('#mConclusion').removeClass('storyPast')
        }},offset:'17%'});


    // CHART INTERACTIONS

    waypoints = $('#conclusion').waypoint({handler:function(direction) {
        if(direction === 'down') {

        } else {

        }
    },offset:'60%'}    );

    return waypoints;
};

function getSizes() {
    sizes.screen = {};
    sizes.screen.height = $('.fullscreen').height();
    sizes.screen.width = $('.fullscreen').width();

    sizes.menu = {};
    sizes.menu.height = $('#menu').height();

    sizes.chart = {};
    sizes.chart.width = (0.7*sizes.screen.height > 500) ? 0.7*sizes.screen.height : 500 ;
    sizes.chart.height = 0.7*sizes.screen.height;// +50;

}


function showCopyLink() {
    $('#myurl').val(shareLink);
    showModal('modCopyLink')
    //copyLink();
}

function MoveOn(selector) {
    $('html,body').animate({
        scrollTop: $('#' +selector).offset().top
    })
};


function showModal(modal) {
    if ($('#' + modal).length) {
        $('.modalBackground').fadeIn(200,function() {$('#' + modal).addClass('modalActive')});
    } else {
        alert('THERE IS NO MODAL NAMED ' + modal + '!!!')
    }
};

function hideModal() {
    $('.modalBackground').fadeOut(200,function() {});
    $('.modalActive').removeClass('modalActive')
};

window.onclick = function(event) {
    modal = document.getElementById('modalWrap')
    if (event.target == modal) {
        id = $('.modalActive').attr('id')
        if(id != 'modRozliseni') {
            hideModal();
        }
    }
}

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        hideModal()
    }   // esc
  });
