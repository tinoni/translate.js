/**
    * @file jquery.translate.js
    * @brief jQuery plugin to translate text in the client side.
    * @author Manuel Fernandes
    * @contribution Jorge Jeferson
    * @site http://www.openxrest.com/translatejs/
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
            attrs: ["alt", "placeholder", "title"],
            lang: "en"/*,
            t: {
                "translate": {
                    pt: "tradução",
                    br: "tradução"
                }
            }*/
        };
        settings = $.extend(settings, options || {});
        if (settings.css.lastIndexOf(".", 0) !== 0) { //doesn't start with '.'
            settings.css = "." + settings.css; 
        }

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
            } catch (err) { //not found, return index
                return index;
            }

            if (res) {
                return res;
            } else {
                return index;
            }
        };

        this.g = this.get;

        //main
        this.find(settings.css).each(function(i) {
            var $this = $(this);

            var trn_key = $this.attr("data-trn-key");
            if (!trn_key) {
                trn_key = $this.html();
                $this.attr("data-trn-key", trn_key);
            }

            $.each(this.attributes, function() {
                if ($.inArray(this.name, settings.attrs) !== -1) {
                    var trn_attr_key = $this.attr("data-trn-attr");
                    if (!trn_attr_key) {
                        trn_attr_key = $this.attr(this.name);
                        $this.attr("data-trn-attr", trn_attr_key);
                    }
                    $this.attr(this.name, that.get(trn_attr_key));
                }
            });

            $this.html(that.get(trn_key));
        });

        return this;

    };
})(jQuery);
