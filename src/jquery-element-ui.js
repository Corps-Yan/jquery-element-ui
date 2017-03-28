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
                .find('.el-button,.el-message-box__close').one('click', function () {
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
        },
        autocomplete: function (options) {
            var dataList = [];
            for (var i = 0; i < 30; i++) {
                dataList.push({ id: i, value: 'ly' + i });
            }
            options.dataList = dataList;
            var $html = $(require('./templates/autocomplete.ejs')(options));

            var $target = $(options.target)
                .attr('autocomplete', 'off')
                .addClass('el-input__inner')
                .wrap('<div class="el-autocomplete"></div>')
                .after($html)
                .focus(function () {
                    $(this).next('.el-autocomplete-suggestion').slideDown(150);
                })
                .blur(function () {
                    $(this).next('.el-autocomplete-suggestion').slideUp(150);
                });

            if (options.itemSelected) {
                $target
                    .parent()
                    .on('mousedown', 'li', function (event) {
                        event.preventDefault();
                    })
                    .on('click', 'li', function () {
                        options.itemSelected($(this).data('id'), $(this).text());
                        $target.blur();
                    });
            }
        }
    }

    $.extend({
        elementUI: collections
    });

}(jQuery));