# jfLightBoxLoad
jQuery plugin that loads external files via ajax loading or an iframe with a lightbox effect. 

##Note
To test locally, because it uses ajax loading you will need either allow local file access or use a local server like MAMP.
###Launch Chrome with allow file access
* <a href="http://www.chrome-allow-file-access-from-file.com/">http://www.chrome-allow-file-access-from-file.com/</a>
* <a href="http://blog.derraab.com/2013/05/30/start-google-chrome-with-local-file-access-on-mac-os-x/">http://blog.derraab.com/2013/05/30/start-google-chrome-with-local-file-access-on-mac-os-x/</a>

###MAMP
* <a href="https://www.mamp.info/en/">https://www.mamp.info/en/</a>


## Script Set Up
Just follow these steps to enable the magnify effect:

1. Include jQuery on your page.

    ```html
    <script src="http://code.jquery.com/jquery.min.js"></script>
    ```

2. Download and include jfLightBoxLoad after jQuery and before its first use.

    ```html
    <script src="jquery.jfLightBoxLoad.js"></script>
    ```

3. Init the plugin by attaching it the elements you want responsable for launching external files.
    ```js
    $(".lbLoad").jfLightBoxLoad();
    ```

## HTML
This is the default setup in the HTML, but class names can be customized via arguments in the init function or a data attributes in the parent element. 
* __All of the elements should be parented into one element__ and the parent element should be the one attached to jfMagnify.
* The element being magnified and the magnify glass need to have the same grid context starting at the same top and left (0,0), so it's easier if they have the same direct parent. 



```html
<div class="magnify">
	<div class="magnify_glass"></div>
	<div class = "element_to_magnify">
		<img src="image/IMG_2209.jpg" draggable="false"/>
	</div>
</div>
```
   
## CSS
I wanted the structure to be as adaptable as possible, so the default class names can be changed as arguments in the init function or data attributes in the opening of the parent element. 
* The __parent element__ cannot be statically positioned. It needs to be positioned: relative, absolute, or fixed.
* The __magnifyGlass__ (default class name '.magnify_glass') element needs to be positioned absolute.
* The __magnifiedZone__ (default class name '.magnify_glass') is where the magnified area will appear. This element needs to be positioned absolute with the the overflow set to hidden.
* The element being magnified and the magnify glass need to have the same grid context starting at (0,0) so the __elementToMagnify__ should be positioned at top, left.
* With this plugin it's a good practice to use __classes__ instead of id attributes because the magnified element and the element being magnified are cloned.
* The element being magnified and the magnified version of that element share a class (default class name '.element_to_magnify'). 
	* This is so it and its children appear identical to their counterparts.
	* If you need to select only the __element being magnified__ you can add an id attribute to its opening. The plugin will remove the ID from the magnified version.
	* If you need to select the __magnified version of the element__, it is given a unique class (default class name '.magnified_element') that can be selected.   

```css
.magnify {
	position: relative;
	width: 900px;
	height: 675px;
}
.magnify_glass {
	z-index: 100;
	position: absolute;
	overflow: hidden;
}
.element_to_magnify {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
}
#elementBeingMagnified {

}
.magnified_element {
	
}
```

## Defaults and Options
* __loadElement:__ "body"
* __hash:__ $element.attr('href')
* __loadEvent:__ 'click'
* __ease:__''
* __animationFrom:__ {}
* __animationTo:__ {}
* __pause:__ 100
* __speed:__ 500
* __pathToScript:__ null,
* __pathToTransit:__ null
* __iframe:__ false

### Options as Arguments
Options can be passed as arguments through the init function.
```js
$(".magnify").jfMagnify({
	center: true,
	scale:2,
	containment:'magnify',
	magnifyGlass : '.magnify_glass',
	magnifiedElement: '.magnified_element',
	magnifiedZone:'.magnify_glass',
	elementToMagnify : '.element_to_magnify',
});
```
	
### Options as Data Attributes
Options can also be passed through data attributes in opening of the parent element. __Notice that the data attributes use dashes instead of camel case__.
```html
<div class="magnify" 
	data-center = "true"
	data-scale ="2"
	data-containment =".magnify"
	data-magnify-glass = ".magnify_glass"
	data-magnified-element = ".magnified_element"
	data-magnified-zone =".magnify_glass"
	data-element-to-magnify = ".element_to_magnify" >
```

## Public functions
There is a public function that can be called.
* launch(): This function can be called to launch the window. It's handy for launching on a unique event like drag stop.

```js
$(".lbLoad").data("jfLightBoxLoad").launch();
```

## Credits
I used http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/ as a starting point for the plugin.


