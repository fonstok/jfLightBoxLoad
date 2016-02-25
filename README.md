# jfLightBoxLoad
jQuery plugin that loads external files via ajax loading or an iframe with a lightbox effect. 

##Note
Because it uses ajax loading, to test locally, you will need either allow local file access or use a local server like MAMP.
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

```
	
### Options as Data Attributes
Options can also be passed through data attributes in opening of the parent element. __Notice that the data attributes use dashes instead of camel case__.
```html

```

## Public functions
There is a public function that can be called.
* launch(): This function can be called to launch the window. It's handy for launching on a unique event like drag stop.

```js
$(".lbLoad").data("jfLightBoxLoad").launch();
```

## Credits
I used http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/ as a starting point for the plugin.


