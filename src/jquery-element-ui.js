(function ($) {

    var collections = {
        loading: function (message) {
            message = message ? '<p class="el-loading-text">' + message + '</p>' : '';
            var html = '<div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>' + message + '</div>';
            var $html = $(html);

            $html.appendTo($('body'));

            return function () {
                $html.fadeOut(300, function () {
                    this.remove();
                });
            };
        },
        alert: function (title, message) {
            var html = '<div class="el-message-box__wrapper"><div class="el-message-box"><div class="el-message-box__title">' + title + '</div><div class="el-message-box__message"><p>' + message + '</p></div><div class="el-message-box__btns"><button type="button" class="el-button">确定</button></div></div></div>';
            var $html = $(html);

            $html.appendTo($('body'));

            $html.find('.el-button').one('click', function () {
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
            },
                html = '<div class="el-message"><img src="' + icons[options.type] + '" alt="" class="el-message__img"><div class="el-message__group"><p>' + options.message + '</p></div></div>',
                $html = $(html);

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

            var closeIcon = options.closable ? '<i class="el-tag__close el-icon-close"></i>' : '',
                html = '<span class="el-tag el-tag--' + options.type + '">' + options.message + closeIcon + '</span>',
                $html = $(html);

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