# jfLightBoxLoad
jQuery plugin that loads external files via ajax loading or an iframe with a lightbox effect. 

##Note
Because it uses ajax loading, to test locally, you will need either allow local file access or use a local server like MAMP.
###Launch Chrome with allow file access
* http://www.chrome-allow-file-access-from-file.com/
* http://blog.derraab.com/2013/05/30/start-google-chrome-with-local-file-access-on-mac-os-x/

###MAMP
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

## Options and Defaults
__Options__ and *Defaults*
#### Basics
* __loadElement:__ *'body'*
  * The element you want the light box to be loaded into.
* __hash:__ *$element.attr('href')*
  * The path to the file you want loaded. The default assumes you're using an anchor element so it references an href attribute. But, as an option, you can use any element.  
* __mouseEvent:__ *'click'*
  * The mouse event that you want to trigger the loading. If you're not wanting it to trigger on a mouse event, set this to 'none' and use the public function launch() when you want to the stuff to launch.
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

#### Other External File Options
* __pathToScript:__ *null*
	* For straight loading you may want to trigger an external script after loading is completed – you pass the path here. Keep in mind that the path should be relative to the page you're loading into, not necessarily the page you're loading.
* __pathToTransit:__ *null*
	* Transit.js is a nice css3 jQuery animation library. If you include a path to it, all of the animations will be CSS3 instead of the older jQuery animate method. http://ricostacruz.com/jquery.transit/


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
	pathToTransit:'https://cdnjs.cloudflare.com/ajax/libs/jquery.transit/0.9.12/jquery.transit.min.js',
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
There is a public function that can be called.
* launch(): This function can be called to launch the window. It's handy for launching on a unique event like drag stop. You will most likely need to disable the click functionality by setting the __loadEvent__:"none".

```js
$(".lbLoad").data("jfLightBoxLoad").launch();
```

## Credits
I used http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/ as a starting point for the plugin.


