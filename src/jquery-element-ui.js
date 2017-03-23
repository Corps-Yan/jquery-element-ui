(function ($) {

    var collections = {
        loading: function (message) {
            var $html = $(require('./templates/loading.ejs')({ message: message }));

            $html.appendTo($('body'));

            return function () {
                $html.fadeOut(300, function () {
                    this.remove();
                });
            };
        },
        alert: function (title, message) {
            var $html = $(require('./templates/alert.ejs')({
                title: title,
                message: message
            }));

            $html.appendTo($('body'))
                .find('.el-button').one('click', function () {
                    $html.remove();
                });
        },
        message: function (options) {
            var defaultOptions = {
                type: 'info',
                duration: 3000
            }

            options = $.extend({}, defaultOptions, options);

            var icons = {
                success: require('./assets/success.svg'),
                info: require('./assets/info.svg'),
                error: require('./assets/error.svg'),
                warning: require('./assets/warning.svg'),
            };

            options.icon = icons[options.type];

            var $html = $(require('./templates/message.ejs')(options));

            $html.appendTo($('body'))
                .ready(function () {
                    $html.addClass('el-message-fade');
                });

            if (options.duration > 0) {
                setTimeout(function () {
                    $html.removeClass('el-message-fade', function () {
                        this.remove();
                    });
                }, options.duration);
            }
        },
        createTag: function (options) {
            var defaultOptions = {
                closable: false,
                type: 'default'
            }

            options = $.extend({}, defaultOptions, options);

            var $html = $(require('./templates/tag.ejs')(options));

            $(options.target).append($html);

            if (options.closable) {
                $html.find('.el-icon-close').one('click', function () {
                    $html.remove();
                });
            }
        }
    }

    $.extend({
        elementUI: collections
    });

}(jQuery));