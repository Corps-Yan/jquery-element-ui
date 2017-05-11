## jquery-element-ui

基于Element UI，提取常用组件封装的jQuery插件。

## 安装

npm install --save jquery-element-ui

## 使用示例

- 创建标签：$.elementUI.createTag(options)

    参数 | 说明 | 类型 | 可选值 | 默认值
    -----|-----|------|--------|------
    message | 标签名称 | string | -- | --
    closable | 是否显示关闭按钮 | boolean | -- | false
    target | 存放标签容器 | string | -- | --
    type |  类型 | string | primary/gray/success/warning/danger | default

- message 消息提示：$.elementUI.message(options)

    参数 | 说明 | 类型 | 可选值 | 默认值
    -----|-----|------|--------|------
    message | 提示信息 | string | -- | --
    type |  类型 | string | success/warning/info/error | info
    duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | -- | 3000

- alert 弹框：$.elementUI.alert(title, message)

    - title：标题。
    - message：提示信息。

- autocomplete 自动远程搜索：$.elementUI.autocomplete(options)

    参数 | 说明 | 类型 | 可选值 | 默认值
    -----|-----|------|--------|------
    target |  input css选择器 | string | -- | --
    getData | 获取数据回调函数（value为输入值） | function(value) | -- | --
    itemSelected | 数据项选择回调参数 | function(id, value) | -- | --
    render | 获取数据后数据渲染方法(每条数据需包含id和value)，在getData中通过this调用 | function(data: array) | -- | --
    reset  | 清空输入框方法，在itemSelected中通过this调用 | function | -- | --

- loading 加载：$.elementUI.loading(text)

    调用返回close函数，关闭loading。
 
    - text：提示文本信息。

