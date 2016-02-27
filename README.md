# jfLightBoxLoad
jQuery plugin designed to load external html files via ajax loading or an iframe with a lightbox effect. 

##Note
Because it uses ajax loading, to test locally, you will need either allow local file access or use a local server like MAMP.
####Launch Chrome with allow file access
* http://www.chrome-allow-file-access-from-file.com/
* http://blog.derraab.com/2013/05/30/start-google-chrome-with-local-file-access-on-mac-os-x/

####MAMP
* https://www.mamp.info/en/


## Script Set Up
Just follow these steps to enable:

1. Include jQuery on your page.

    ```html
    <script src="http://code.jquery.com/jquery.min.js"></script>
    ```

2. Download and include jfLightBoxLoad after jQuery and before its first use.

    ```html
    <script src="jquery.jfLightBoxLoad.js"></script>
    ```

3. Init the plugin by attaching it the elements you want responsible for launching external files.
    ```js
    $(".lbLoad").jfLightBoxLoad();
    ```

## Structure
These are the elements the plugin creates. If you select the iFrame option *.lb_content* will be an iFrame.

```html
<div class="lb_lightbox">
	<div class="lb_shade"></div>
	<div class="lb_window">
		<div class="lb_content"><!--stuff gets loaded here --></div>
		<div class="lb_closeBtn">close</div>
	</div>
</div>
```

### Classes
* __.lb_lightbox__: The Main element.
* __.lb_shade__: The backdrop area.
* __.lb_window__: The frame of the content area.
* __.lb_content__: Where the external file will be loaded. If you choose iframe this will be an iFrame element.
* __.lb_closeBtn__: The close button.

## Options and Defaults
__Options__ and *Defaults*
#### Basics
* __loadElement:__ *'body'*
  * The element you want the light box to be loaded into.
* __hash:__ *$element.attr('href')*
  * The path to the file you want loaded. The default assumes you're using an anchor element so it references its href attribute. But, because this an option, you can use any element.  
* __mouseEvent:__ *'click'*
  * The mouse event that you want to trigger the loading. If you're not wanting it to trigger on a mouse event, set this to 'none' and use the public function launch() when you want the file to launch and load.
* __iframe:__ *false*
	* If you'd like to use an iframe set this to true.

#### Window Animation
The loading window fades in by default, but you can pass it From and To properties via lists to change its animation in and out. The out will be the reverse of what ever you set.
* __animationFrom:__ *{}*
	* The load window's animation starting properties.
* __animationTo:__ *{}*
	* The load window's animation ending properties.
* __pause:__ *100* 
	* Pause time before the window comes in.
* __speed:__ *500*
	* Speed of window animation.
* __ease:__ *none*
	* You can pass the animation an ease, but you need to link to a library such as, jqueryUI, that has ease options.

#### Other Options
* __pathToScript:__ *null*
	* For straight loading you may want to trigger an external script after loading is completed – you pass the path here. Keep in mind that the path should be relative to the page you're loading into, not necessarily the page you're loading.
* __useTransit:__ *false*
	* Transit.js is a swell CSS3 jQuery animation plugin. In the HTML, if you link to transit.js before the link to this plugin and set this to true, all of the animations will be CSS3 instead of the older jQuery animate method. http://ricostacruz.com/jquery.transit/
* __onStart:__         
	* You can pass a function to be called when the load has started.
* __onStartArgs:__
	* If the onStart function has arguments, you can pass argument values via an array ['arg1', 'arg2'].
* __onComplete:__         
	* You can pass a function to be called when the load is completed.
* __onCompleteArgs:__
	* If the onComplete function has arguments, you can pass argument values via an array ['arg1', 'arg2'].
* __onClose:__         
	* You can pass a function to be called when the window is closed.
* __onCloseArgs:__
	* If the onClose function has arguments, you can pass argument values via an array ['arg1', 'arg2'].


### Options as Arguments
Options can be passed as arguments through the init function.
```js
$('.lbLoad').jfLightBoxLoad({
	iframe:true,
	mouseEvent:'mouseover',
	animationFrom:{opacity:'0', top:'80%'},
	animationTo:{opacity:'1', top:'50%'},
	pause:0,
	speed:250,
	ease:'easeInOutBack',
	pathToScript:'externalScript.js',
	useTransit:true,
	onComplete:function(){console.log("complete")},
  });
```
	
### Options as Data Attributes
Options can also be passed through data attributes in opening of the responsible element. __Notice that the data attributes use dashes instead of camel case__.
```html
<div class="lbLoad" 
	data-mouse-event="mouseover" 
	data-hash="externalFile.html"
	data-path-to-script="externalScript.js"
>Mouse Over Me</div>
```

## Public functions
There are a few public functions that can be called at any time after init.
* launch(): This function can be called to launch the external file associated with the element it's attached to. It's handy for launching on a unique event like drag stop or drop. Additionally, you will most likely need to disable the click functionality by setting the __loadEvent__ to "none".
* destroy(): This deactivates the plugin.

```js
$(".lbLoad").data("jfLightBoxLoad").launch();
$(".lbLoad").data("jfLightBoxLoad").destroy();
```

## Credits
I used http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/ as a starting point for the plugin.


