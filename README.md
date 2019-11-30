translate.js
============

A jQuery plugin to translate text in the client side.

## Usage
Step 1: include JQuery and translate.js in your page

    <script src="jquery.js"/>
    <script src="jquery.translate.js"/>

Step 2: there are multiple ways to translate your text, you can add the trn class, use the trn tag or translate attribute content with trn-attr class and a data-trn-attr attribute containing a space separated list of attributes that must be translated

    <span class="trn">text to translate</span>
    <span><trn>text to translate</trn></span>
    <a href="/test" title="title to translate" class="trn-attr" data-trn-attr="title">Go!</a>

Instead using your text as key you can use the data-trn-key attribute to specify the key or the data-trn-key-attribute-name attribute to specify the key to use for attribute-name translation.

Step 3: create your dictionary

    var dict = {
      "Home": {
        pt: "Início"
      },
      "Download plugin": {
         pt: "Descarregar plugin",
         en: "Download plugin"
      }
    }

Step 4: initialize the plugin and translate the entire page body

    var translator = $('body').translate({lang: "en", t: dict}); //use English

Step 5: change to another language

    translator.lang("pt"); //change to Portuguese

## License
You may use translate.js under the terms of the MIT License. [More information](http://en.wikipedia.org/wiki/MIT_License).
