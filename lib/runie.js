(function (define) {
    define('runie', ['jquery', 'asyncall'], function ($, asyncall) {
        if (!$) throw Error('Undefined a dependencies "jQuery".');
        if (!asyncall) throw Error('Undefined a dependencies "asyncall".');

        var Runie = {};

        Runie.tag = function (key, value, isJq) {
            var tag = $('<var style="display:none;">').attr('data-runie-key', key).text(JSON.stringify(value));
            if (isJq) {
                return tag;
            } else {
                return $('<span>').append(tag).html();
            }
        };

        Runie.write = function (key, value) {
            var tag = this.tag(key, value, true);
            $('body').append(tag);
        };

        Runie.read = function (key, fn) {
            var isCallback = (typeof fn === 'function');
            var selector = 'var[data-runie-key=' + escapeSelector(key) + ']';

            function getJson () {
                var $tags = $(selector);
                if (!$tags.length) {
                    return;
                }

                var value = $tags.eq(0).text();
                return value ? JSON.parse(value) : undefined;
            }

            if (isCallback) {
                asyncall(function () {
                    fn(getJson());
                });
            } else {
                return getJson();
            }
        };

        Runie.find = function (key, fn) {
            var isCallback = (typeof fn === 'function');
            var selector = 'var[data-runie-key=' + escapeSelector(key) + ']';

            function getJsons () {
                return $(selector).map(function () {
                    var value = $(this).text();
                    return value ? JSON.parse(value) : undefined;
                }).get();
            }

            if (isCallback) {
                asyncall(function () {
                    fn(getJsons());
                });
            } else {
                return getJsons();
            }
        };

        function escapeSelector(value) {
            return String(value)
                .replace(/([#;&,\.\+\*\~'`:"\!\^$%\[\]\(\)\{\}=>\|\/])/g, "\\$1");
        }

        return Runie;
    });
})(typeof define === 'function'  ? define :
   typeof module !== 'undefined' ? function(name, deps, factory) {
       module.exports = factory.apply(this, deps.map(require));
   } :
   function(name, deps, factory) {
       var dependencies = [ this.jQuery, this.asyncall ];
       this[name] = factory.apply(this, dependencies);
   });
