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
            animationFrom:{opacity:'0'},
            animationTo:{opacity:'1'},
            pause:0,
            speed:500,
            ease:'swing',
            pathToScript:null,
            useTransit:false,
            onStart: function() {}, 
            onStartArgs: [],
            onComplete: function() {}, 
            onCompleteArgs: [],
            onClosed: function() {}, 
            onClosedArgs: [],
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
            plugin.launch();
        };
        // launch function
        plugin.launch = function(){
            win = true;
            // call on start function
            plugin.settings.onStart.apply(plugin,plugin.settings.onStartArgs);
            // make tags
            var tag = new Array();
            tag.push('<div class="lb_lightbox">');
            tag.push('<div class="lb_shade"></div>');
            tag.push('<div class="lb_loadAnimation">loading</div>');
            tag.push('<div class="lb_window">');
            // iframe ?
            if (plugin.settings.iframe){
                tag.push('<iframe class="lb_content" frameborder="0" src ='+plugin.settings.hash+' width="100%" height:"100%"></iframe>');
            } else {
                tag.push('<div class="lb_content"></div>');
            }
            tag.push('<div class="lb_closeBtn">close</div>');
            tag.push('</div></div>');
            var tagString = '';
            $(tag).each(function(index, element){
                tagString+=element;
            });
            $ldElement.prepend(tagString);
            // cache objects 
            $lb = $('.lb_lightbox');  
            $lbWin = $('.lb_window');
            // load into content or iframe ?
            if (plugin.settings.iframe){
                $('.lb_content').load(loadComplete);
            } else {
               $('.lb_content').load(plugin.settings.hash, loadComplete); 
            }
            // shade animation
            $('.lb_shade').css({opacity:'0'})
                .animate({opacity:'1'}, plugin.settings.speed);
            // set, load, and animate window
            $lbWin.css(plugin.settings.animationFrom);
            function loadComplete() {
                $lbWin.delay(plugin.settings.pause).animate(plugin.settings.animationTo, plugin.settings.speed, plugin.settings.ease, completed);
                $('.lb_loadAnimation').animate({opacity:'0'}, plugin.settings.speed*.8, function(){
                    $(this).remove();
                });     
            };          
        }
        function completed(){
            // add close functionality
            $('.lb_closeBtn, .lb_shade').bind('click',plugin.close); 
            // launch external script
            if (plugin.settings.pathToScript){
                 $.getScript(plugin.settings.pathToScript);
            }
            // call on complete function
            plugin.settings.onComplete.apply(plugin,plugin.settings.onCompleteArgs); 
        }
        plugin.close = function(){
            $lbWin.animate(plugin.settings.animationFrom, plugin.settings.speed, plugin.settings.ease);
            $lb.animate({opacity:'0'},plugin.settings.speed, "", function(){      
                $('.lb_content').unload();
                $('.lb_closeBtn, .lb_shade').unbind('click');
                $lb.remove();
                plugin.settings.onClosed.apply(plugin,plugin.settings.onClosedArgs);
                win = false;
            });  
        }  
        plugin.destroy = function(){
            if (win){
                plugin.close();
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