// 创建标签
function createTag(container, closable) {
    var tagTypes = ['default', 'gray', 'primary', 'success', 'warning', 'danger'];
    for (var i = 0; i < tagTypes.length; i++) {
        $.elementUI.createTag({
            message: tagTypes[i] + ' 标签',
            closable: closable,
            target: container,
            type: tagTypes[i]
        });
    }
}

//创建基础标签
createTag('.basic-tags', false);
//创建可关闭标签
createTag('.closable-tags', true);

$('.reset-tag').click(function () {
    $('.closable-tags').html('');
    createTag('.closable-tags', true);
});

//创建弹框
$('.alert').click(function () {
    $.elementUI.alert('参数错误', '数据请求失败');
});

//创建消息提示
var messageTypes = ['info', 'success', 'warning', 'error']
$('.message').click(function () {
    var index = Math.ceil(Math.random() * messageTypes.length) - 1;
    $.elementUI.message({
        message: '标签创建成功',
        type: messageTypes[index]
    });
});

//创建loading加载
var closeLoading;
$('.loading').click(function () {
    closeLoading = $.elementUI.loading('数据加载中');
});
$('.closeLoading').click(function () {
    closeLoading();
});

//创建远程搜索
$.elementUI.autocomplete({
    target: '.autocomplete',
    message: '请输入标签',
    getData: function (value) {
        var data = [],
            self = this;
        for (var i = 0; i < 20; i++) {
            data.push({ id: i, value: 'test' + i });
        }
        setTimeout(function () {
            self.render(data);
        }, 3000);
    },
    itemSelected: function (id, value) {
        console.log(id, value)
    }
});