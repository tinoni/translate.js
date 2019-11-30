/**
 * @file jquery.translate.js
 * @brief jQuery plugin to translate text in the client side.
 * @author Manuel Fernandes
 * @site
 * @version 0.9
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * translate.js is a jQuery plugin to translate text in the client side.
 *
 */

(function($){
  $.fn.translate = function(options) {

    var that = this; //a reference to ourselves
	
    var settings = {
      css: "trn",
      tag: "trn",
      css_attr: "trn-attr",
      lang: "en",
      debug: false,
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;
    if (settings.css_attr.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css_attr = "." + settings.css_attr;

    var t = settings.t;
 
    //public methods
    this.lang = function(l) {
      if (l) {
        settings.lang = l;
        this.translate(settings);  //translate everything
      }
        
      return settings.lang;
    };


    this.get = function(index) {
      var res = index;

      try {
        res = t[index][settings.lang];
      }
      catch (err) {
        //not found, return index
        if (settings.debug) {
          console.log("No '" + settings.lang + "' translation for '" + index + "'");
        }
        return index;
      }
      
      if (res)
        return res;
      else
        return index;
    };

    this.g = this.get;


    
    //main
    this.find(settings.tag).each(function(i) {
      var $this = $(this);

      var trn_key = $this.attr("data-trn-key");
      if (!trn_key) {
        trn_key = $this.html();
        $this.attr("data-trn-key", trn_key);   //store key for next time
      }

      $this.html(that.get(trn_key));
    });
    this.find(settings.css).each(function(i) {
      var $this = $(this);

      var trn_key = $this.attr("data-trn-key");
      if (!trn_key) {
        trn_key = $this.html();
        $this.attr("data-trn-key", trn_key);   //store key for next time
      }

      $this.html(that.get(trn_key));
    });
    this.find(settings.css_attr).each(function(i) {
      var $this = $(this);

      var trn_attr_names = $this.attr("data-trn-attr");
      trn_attr_names = trn_attr_names.split(" ");
      // for each attribute
      for (i = 0; i < trn_attr_names.length; i++) {
        trn_attr_name = trn_attr_names[i];
        var trn_key = $this.attr("data-trn-key-" + trn_attr_name);
        if (!trn_key) {
          trn_key = $this.attr(trn_attr_name);
          $this.attr("data-trn-key-" + trn_attr_name, trn_key);   //store key for next time
        }
        $this.attr(trn_attr_name, that.get(trn_key));
      }
    });

    
		return this;
		
		

  };
})(jQuery);