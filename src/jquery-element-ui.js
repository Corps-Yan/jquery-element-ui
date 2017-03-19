(function ($) {

    var collections = {
        loading: function (text) {
            text = text ? '<p class="el-loading-text">' + text + '</p>' : '';
            var html = '<div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>' + text + '</div>';

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
                html = '<div class="el-message"><img src="' + icons[options.type] + '" alt="" class="el-message__img"><div class="el-message__group"><p>标签删除成功</p></div></div>',
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
        }
    }

    $.extend({
        elementUI: collections
    });

}(jQuery));