var cache = new Array();

var qstr = undefined;

var xhr = undefined;


function position_show() {
    pop = $('div#pop');
    overlay = $('div#click_overlay');
    w_h = $(window).height();
    w_w = $(window).width();
    opr = $('#' + qstr).offset();
    
    if((opr.top + 25 + pop.height()) <= w_h) {
        opr.top += 25;
    } else {
        opr.top -= (pop.height());
    }
    
    if((opr.left + 25 + pop.width()) <= w_w) {
        opr.left += 50;
    } else {
        opr.left -= (pop.width());
    }
    
    $('body').css('cursor', 'default'); 
    $('#' + qstr).css('cursor', 'pointer'); 
    pop.css(opr);
    overlay.show();
    pop.show();
    
}

function abort_inprogress() {
    if(xhr != undefined) {
        xhr.abort();
    }
}

$(document).ready(function() {
    $('div#click_overlay').click(
        function()
        {
            pop = $('div#pop');
            pop.hide()
            $(this).hide()
        }
    );
    
    $('a.eplink').click(
        function () 
        {
           qstr = $(this).attr('id');
           if(cache[qstr] == undefined) {
                abort_inprogress();
                $('body').css('cursor', 'progress'); 
                $(this).css('cursor', 'progress'); 
                xhr = $.get('query.php',{q:qstr}, 
                    function(data) 
                    {  
                      
                        $('div#pop').html(data);
                        cache[qstr] = data;
                        position_show();
                        qstr = undefined;
                    }
                );
            } else {
                abort_inprogress();
                $('div#pop').html(cache[qstr]);
                position_show();
                qstr = undefined;
            }
            return false;
        }
    );
});