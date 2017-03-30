(function ($) {

    var utils = {
        debounce: function (fn, delay) {
            var timer;
            return function () {
                var ctx = this,
                    args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(ctx, args);
                }, delay);
            }
        }
    }

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

            $html
                .appendTo($('body'))
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
            var $html = $(require('./templates/message.ejs')(options));

            $html
                .appendTo($('body'))
                .ready(function () {
                    $html.animate({ opacity: 1, top: '20px' }, 300);
                });

            if (options.duration > 0) {
                setTimeout(function () {
                    $html.animate({ opacity: 0, top: '-20px' }, 300, function () {
                        $(this).remove();
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

            if (options.target) {
                $(options.target).append($html);
            }

            if (options.closable) {
                $html.find('.el-icon-close').one('click', function () {
                    $html.remove();
                });
            }
        },
        autocomplete: function (options) {
            options.message = options.message ? options.message : '请输入查询条件';

            var $html = $(require('./templates/autocomplete.ejs')(options)),
                $target = $(options.target)
                    .attr('autocomplete', 'off')
                    .addClass('el-input__inner')
                    .wrap('<div class="el-autocomplete"></div>')
                    .after($html),
                $autocomplete = $target.parent(),
                $dataWrapper = $autocomplete.find('.el-autocomplete-suggestion-data'),
                $loading = $autocomplete.find('.el-autocomplete-loading'),
                $hint = $autocomplete.find('.el-autocomplete-hint');

            $target
                .focus(function () {
                    $(this).next('.el-autocomplete-suggestion').slideDown(150);
                })
                .blur(function () {
                    $(this).next('.el-autocomplete-suggestion').slideUp(150);
                })
                .on('input', utils.debounce(function () {
                    var value = $.trim($(this).val());
                    $dataWrapper.html('');
                    if (!value) {
                        return $hint.show();
                    }
                    if (options.getData) {
                        $loading.show();
                        $hint.hide();
                        options.getData(value);
                    }
                }, 300));

            options.render = function (data) {
                $loading.hide();
                var html = '';
                data.forEach(function (item) {
                    html += '<li data-id="' + item.id + '">' + item.value + '</li>';
                });
                $dataWrapper.html(html);
            }

            options.reset = function () {
                $target.val('').removeAttr('data-id');
            }

            if (options.itemSelected) {
                $autocomplete
                    .on('mousedown', 'li', function (event) {
                        event.preventDefault();
                    })
                    .on('click', 'li', function () {
                        var value = $(this).text(), id = $(this).data('id');
                        $target.blur().val(value).attr('data-id', id);
                        options.itemSelected(id, value);
                    });
            }
        }
    }

    $.extend({
        elementUI: collections
    });

}(jQuery));