(function($) {

    $.jfLightBoxLoad = function(element, options) {
        var plugin = this;
        var $element = $(element),
             element = element;
        var $ldElement;
        var dataatts = $element.data();

        var defaults = {
            loadElement: "body",
            hash:$element.attr('href'),
            loadEvent:'click',
            ease:'',
            animationFrom:{},
            animationTo:{},
            pause:100,
            speed:500,
            pathToScript:null,
            pathToTransit:null,
            iframe:false,
        }
        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options, dataatts);             
            $ldElement = $(plugin.settings.loadElement);

            if (plugin.settings.pathToTransit){
                $.getScript(plugin.settings.pathToTransit, function( data, textStatus, jqxhr ) {
                  $.fn.animate = $.fn.transition;
                  console.log('work')
                });
            }
			
			if (plugin.settings.event != 'none'){
				$element.bind(plugin.settings.loadEvent, function(event){
					event.preventDefault();              
					lightBoxAcivate();
				});
			}
        }
		plugin.launch = function(){
            lightBoxAcivate();
		};

        // JavaScript Document
        function lightBoxAcivate(){
            // make tags
            $ldElement.prepend('<div class="lb_lightbox"></div>');
            $lb = $('.lb_lightbox');  
            $lb.append('<div class="lb_shade"></div><div class="lb_loadanimation">loading</div>');

            if (plugin.settings.iframe){
                $lb.append('<div class="lb_window"><iframe frameborder="0" src ='+plugin.settings.hash+' width="100%" height:"100%" class="lb_content"></iframe><div class="lb_closeBtn">close</div></div>');
            } else {
                $lb.append('<div class="lb_window"><div width="100%" height:"100%" class="lb_content"></div><div class="lb_closeBtn">close</div></div>');
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
                $('.lb_window').delay(plugin.settings.pause).animate(plugin.settings.animationTo, plugin.settings.speed, plugin.settings.ease, callScript);
                $('.lb_loadanimation').animate({opacity:'0'}, plugin.settings.speed*.8, function(){
                    $(this).remove();
                });     
            };
            // add close functionality
            $('.lb_closeBtn, .lb_shade').bind('click',function(e){
                $lb.animate({opacity:'0'},plugin.settings.speed, "", closeLB);
                $('.lb_window').animate(plugin.settings.animationFrom, plugin.settings.speed, plugin.settings.ease);
            });        
        }
        function callScript(){
            //console.log(plugin.settings.pathToScript)
            if (plugin.settings.pathToScript){
                 $.getScript(plugin.settings.pathToScript, function( data, textStatus, jqxhr ) {
                });
            } 
        }
        // delete the tags
        function closeLB(){
            $('.lb_content').unload();
            $('.lb_closeBtn, .lb_shade').unbind('click');
            $lb.remove();  
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