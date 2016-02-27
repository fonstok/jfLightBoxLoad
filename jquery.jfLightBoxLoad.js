(function($) {

    $.jfLightBoxLoad = function(element, options) {
        var plugin = this;
        var $element = $(element),
             element = element;
        var $ldElement;
        var dataatts = $element.data();
        var win = false;

        var defaults = {
            loadElement: 'body',
            hash:$element.attr('href'),
            mouseEvent:'click',
            iframe:false,
            animationFrom:{},
            animationTo:{},
            pause:100,
            speed:500,
            ease:'swing',
            pathToScript:null,
            useTransit:false,
            onStart: function() {}, 
            onStartArgs: [],
            onComplete: function() {}, 
            onCompleteArgs: [],
            onClose: function() {}, 
            onCloseArgs: [],
        }
        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options, dataatts);             
            $ldElement = $(plugin.settings.loadElement);

            if (plugin.settings.useTransit){
                $.fn.animate = $.fn.transition;
            }	
			if (plugin.settings.event != 'none'){
				$element.bind(plugin.settings.mouseEvent, onMouse)
			}
        }
        // mouse event
        function onMouse(event){
            event.preventDefault();              
            lightBoxAcivate();
        };

        // activate
        function lightBoxAcivate(){
            win = true;
            // call on start function
            plugin.settings.onStart.apply(plugin,plugin.settings.onStartArgs);
            // make tags
            $ldElement.prepend('<div class="lb_lightbox"></div>');
            $lb = $('.lb_lightbox');  
            $lb.append('<div class="lb_shade"></div><div class="lb_loadanimation">loading</div>');
            // iframe?
            if (plugin.settings.iframe){
                $lb.append('<div class="lb_window"><iframe frameborder="0" src ='+plugin.settings.hash+' width="100%" height:"100%" class="lb_content"></iframe><div class="lb_closeBtn">close</div></div>');
            } else {
                $lb.append('<div class="lb_window"><div class="lb_content"></div><div class="lb_closeBtn">close</div></div>');
            }
            $lbWin = $('.lb_window');
            $lbWin.css(plugin.settings.animationFrom);
            
            if (!plugin.settings.iframe){
                $('.lb_content').load(plugin.settings.hash, loadComplete);
            } else {
                $('.lb_content').load(loadComplete);
            }
            $lbshd = $('.lb_shade');
            $lbshd.css({opacity:'0'});
            $lbshd.animate({opacity:'1'}, plugin.settings.speed);

            function loadComplete() {
                $('.lb_window').delay(plugin.settings.pause).animate(plugin.settings.animationTo, plugin.settings.speed, plugin.settings.ease, completed);
                $('.lb_loadanimation').animate({opacity:'0'}, plugin.settings.speed*.8, function(){
                    $(this).remove();
                });     
            };
            // add close functionality
            $('.lb_closeBtn, .lb_shade').bind('click',function(e){
                // call on close function
                plugin.settings.onClose.apply(plugin,plugin.settings.onCloseArgs);
                $lb.animate({opacity:'0'},plugin.settings.speed, "", closeLB);
                $('.lb_window').animate(plugin.settings.animationFrom, plugin.settings.speed, plugin.settings.ease);
            });        
        }
        function completed(){
            //console.log(plugin.settings.pathToScript)
            if (plugin.settings.pathToScript){
                 $.getScript(plugin.settings.pathToScript, function( data, textStatus, jqxhr ) {
                });
            }
            plugin.settings.onComplete.apply(plugin,plugin.settings.onCompleteArgs); 
        }
        // delete the tags
        function closeLB(){
            win = false;
            $('.lb_content').unload();
            $('.lb_closeBtn, .lb_shade').unbind('click');
            $lb.remove();  
        }  
        // public functions
        plugin.launch = function(){
            lightBoxAcivate();
        };

        plugin.destroy = function(){
            if (win){
                closeLB();
            }  
            $element.unbind(plugin.settings.mouseEvent, onMouse)
            $element.removeData('jfLightBoxLoad', plugin);
            plugin = null;
        }  
        plugin.init();
    }

    $.fn.jfLightBoxLoad = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('jfLightBoxLoad')) {
                var plugin = new $.jfLightBoxLoad(this, options);
                $(this).data('jfLightBoxLoad', plugin);
            }
        });
    }
})(jQuery);