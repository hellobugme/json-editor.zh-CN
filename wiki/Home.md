Translate from [jdorn/json-editor/wiki](https://github.com/jdorn/json-editor/wiki) by [kainanhong](https://github.com/hellobugme/json-editor.zh-CN) updated on 2017-10-04.

这个 wiki 主要面向想要修改、贡献、定制功能，需要了解 JSON Editor 代码结构的开发童鞋，如果只是简单的想要使用 JSON Editor，参考 README 文档就足够了。

本文档基于对 JSON Schema 有基本的了解。

本文档会持续更新，更多内容将很快添加（并没有）。

框架结构
---------------------
JSON Editor 基于模块化开发，本章节概览所有的模块组件以及它们如何配合运作。

### 闭包头和闭包尾（src/intro.js 和 src/outro.js）

这两个文件形成一个闭包，将所有代码包裹在里面，确保代码自包含。

另外，`intro.js` 头部的注释里还包含了许可信息、版本号和日期。<br/>
JSON Editor 使用了语义化版本控制，目前处于 1.0 版本之前的阶段。每次推送代码到 github，这个版本号都会递增。当添加了重要新特性或不能向下兼容的功能时，次版本号会递增，否则修订号会递增。

### 类继承（src/class.js）

JSON Editor 使用的是 John Resig 的简单 Javascript 继承模型（ http://ejohn.org/blog/simple-javascript-inheritance/ ）。我不推荐在复杂的继承结构里使用这个，但它非常适合 JSON Editor 的使用场景。

```js
var MyParentClass = Class.extend({
  method1: function() {},
  method2: function() {}
});

var MyChildClass = MyParentClass.extend({
  method1: function() {
    this._super();
  },
  method3: function() {}
});
```

JSON Editor 的每个部分都是一个类，在需要时可以进行扩展而不需要直接修改核心代码。

### 工具函数（src/utilities.js）

JSON Editor 最初是作为一个 jQuery 插件来开发的，在移除对 jQuery 的依赖后，添加了几个实用的工具函数。

*  __$extend__ - 类似于 `jQuery.extend`，不过默认递归（即深度复制）
*  __$each__ - 功能与 `jQuery.each` 一致
*  __$trigger__ - 触发一个原生的 JavaScript 事件
*  __$triggerc__ - 触发一个自定义的 JavaScript 事件

#### IE9（src/ie9.js）

这个文件包含了对旧浏览器的 polyfill，目前有 3 个 polyfill：

*  requestAnimationFrame
*  CustomEvent 构造函数
*  Array.isArray

### 校验器 (src/validator.js)

校验器负责检查 JSON 数据是否符合 JSON Schema 的定义，并返回一个错误信息列表。
当编辑器的值发生变更时，校验器都会自动运行。

校验结果应用于不同的场景，最明显的使用场景是在已渲染的表单中显示行内错误提示，以及提供给 `validate` api 调用。另一个不是很明显的使用场景，是判断渲染表单某个部分时，要使用哪个 `oneOf` schema。

思考下面的 JSON Schema：

```json
{
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "name": {"type": "string"}
      },
      "required": ["name"],
      "additionalProperties": false
    },
    {
      "properties": {
        "id": {"type": "integer"}
      },
      "required": ["id"],
      "additionalProperties": false
    }
  ]
}
```

当通过代码设置表单的值时，JSON Editor 校验每个 schema，并使用第一个校验通过的 schema 来渲染表单。复合类型与此类似（如 `{ "type": ["integer","string"] }`）。

校验器本身的代码非常复杂，它从最外层的 schema 开始，递归下降，校验每一个子 schema。支持 JSON Schema 草案 3 和 4 的所有关键字。

校验到错误时，将一个简单的错误信息对象添加到一个数组，校验结束后，返回这个错误信息数组。如果没有校验到错误，则返回一个空数组。每个错误信息对象包含 3 个属性：`path`、`property`、`message`。

```json
{
  "path": "root.person.first_name",
  "property": "minLength",
  "message": "不能少于 2 个字符"
}
```

每一步递归下降，JSON Editor 也会执行在 `JSONEditor.defaults.custom_validators` 中自定义的校验函数

图标库（src/iconlib.js）
-----------------
JSON Editor 支持多个图标库，用于给按钮添加图标。

所有的图标库继承自 `JSONEditor.AbstractIconLib`，AbstractIconLib 使支持一个新的图标库变得非常容易。这是支持 FontAwesome4 的代码（src/iconlibs/fontawesome4.js）：

```js
JSONEditor.defaults.iconlibs.fontawesome4 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'caret-square-o-down',
    expand: 'caret-square-o-right',
    delete: 'times',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'fa fa-'
});
```

调用 `getIcon("cancel")` 会返回 DOM 元素 `<i class="fa fa-ban"></i>`。如果想要添加一个不符合这种结构的图标库，可以重写 `getIcon` 方法，返回自定义的 DOM 结构。

主题（src/theme.js）
-------------------
theme.js 负责处理 JSON Editor 表单的 DOM 创建、布局和渲染风格。所有的主题继承自 `JSONEditor.AbstractTheme` 类。

JSON Editor 只附带了几个的主题，要创建自己的主题非常简单。抽象类中的方法返回一个最基础的 DOM 节点结构，所以大部分情况下你只需要这样：

```js
JSONEditor.defaults.themes.mytheme = JSONEditor.AbstractTheme.extend({
  getTable: function() {
    // 基类方法创建了一个空的 <table> DOM 元素
    var el = this._super();
    
    // 修改这个基础元素
    el.style.fontSize = '50px';

    return el;
  }
});
```

模板（src/template.js）
--------------------
JSON Editor 中的 “template” 指 javascript 模板引擎，如 Mustache、Handlebars。模板引擎是一个带有 `compile` 方法的对象，`compile` 方法返回一个用于编译模板的函数。编译函数接受一个包含变量的 `view` 参数，并返回一个字符串。这是一个最简单的模板示例：

```js
var mytemplate = {
  compile: function(template_string) {
    return function(view) {
      return template_string + ' (' + JSON.stringify(view) + ')';
    }
  }
};
```

模板引擎应用于不同的场景：
*  `string` 类型的 schema 的 `template` 关键字
*  schema 的 `headerTemplate` 关键字
*  schema 的 `enumSource.filter`、`enumSource.title`、`enumSource.value` 关键字

编辑器（src/editor.js）
---------------------
这个文件定义了所有编辑器的基类 - `JSONEditor.AbstractEditor`。一个 `editor` 就是一个类，给一个 schema 提供一个编辑界面。例如，一个布尔值编辑器可能渲染为一个复选框和一个标签。一些编辑器，如用于编辑对象和数组的编辑器，可以包含子编辑器，这个递归结构使 JSON Editor 可以支持任意嵌套层级的 JSON Schema。

`JSONEditor.defaults.resolvers` 包含了一个由 resolver 函数组成的数组，resolver 函数用于判断对于特定的 schema 使用哪个编辑器，resolver 函数匹配到时返回对应编辑器的名字，否则返回 null 并执行下一个 resolver 函数。例如，拿一个 resolver 函数来匹配 `{"type":"boolean"}`，如果匹配到了则返回布尔值编辑器的名字。

AbstractEditor 类定义了许多方法可以让子类扩展，这个后面会阐述。

### editor.preBuild()
这个方法会在编辑器实例化后调用，可以在这里放置初始化代码，但不要创建任何 DOM 元素。例如，你可以解析 schema 配置项，建立数据结构，实例化和预编译子编辑器等等。

这个方法可以访问下面这些对象属性：

*  `this.schema` - 编辑器的 JSON Schema 的副本
*  `this.options` - 编辑器的配置项（源于实例配置和全局配置）
*  `this.jsoneditor` - JSONEditor 实例的引用
*  `this.parent` - 父编辑器的引用，如果是根编辑器则为 `null`
*  `this.key` - 字段的键。例如，在 `{"properties": { "name": {"type": "string"}}}` 中，字符串编辑器的键为 `name`。根编辑器的键为 `root`
*  `this.path` - 编辑器的路径，用 “.” 分隔（如 `root.person.name`），路径的最后一部分等同于 `this.key`
*  `this.formname` - 编辑器的路径，对表单更友好的格式（如 `root[person][name]`）

### editor.build()
这个函数用于创建 DOM 元素并渲染到界面上，它可以访问 `preBuild` 函数中的所有对象属性，并追加：

*  `this.container` - 编辑器包裹 DOM 元素的容器
*  `this.theme` - 主题类的实例（例如一个扩展于 `JSONEditor.AbstractTheme` 的主题），通过它来创建 DOM 结构。

当用户修改了编辑器的值（如勾选一个复选框），它需要调用 `this.onChange(true);` 来通知 JSON Editor。你也可能希望通过调用 `this.refreshValue()` 来保存这个值。

### editor.postBuild()
这个函数会在 `build` 后立即执行，通常用于创建事件侦听器和一些收尾工作。

抽象类的 `postBuild` 函数有一些功能逻辑，如果你扩展了该函数，请确保调用了 `this._super()`。

### editor.setValue(value, initial=false)
通过代码修改编辑器的值时，该函数会被调用，通过它来更新 UI 以映射新的值。例如，对布尔值编辑器调用 `setValue(false)`，复选框应该取消勾选。

设置编辑器的初始（或默认）值时，`initial` 参数设置为 `true`。

该函数执行完成后，应该调用 `this.refreshValue()`。

### editor.refreshValue()
这个函数为编辑器建立 JSON 数据并保存到 `this.value`。例如，一个简单的字符串编辑器可以这样做 `this.value = this.input.value;`。

*注 - `this.value` 就是 `editor.getValue()` 返回的

### editor.destroy()
这个函数应该销毁编辑器的所有 DOM 元素和事件侦听器，删除所有变量，释放使用的内存。抽象类中该函数处理了一些公共的 `destroy` 任务，如果你扩展了该函数，应该在尾部调用 `this._super()`。

### 其它方法
其它方法的说明会很快添加（并没有）：
*  setupWatchListeners()
*  onWatchedFieldChange()
*  showValidationErrors(errors)
*  enable()
*  disable()
*  getNumColumns()
*  register()
*  unregister()
*  addLinks()
*  updateHeaderText()

核心代码 (src/core.js)
-----------------------
core.js 是 JSON Editor 的核心代码，提供了一些工具函数，并把其它的模块组件结合在一起。

`JSONEditor.expandSchema` 工具函数处理所有的 `$ref`、`allOf`、`extends` 关键字，通过将这些关键字引用的 schema 合并到父项中来进行扁平化。

这个：
```json
{
  "type": "string",
  "allOf": [
    { "minLength": 3 },
    { "maxLength": 10 }
  ]
}
```
扁平化为：
```json
{
  "type": "string",
  "minLength": 3,
  "maxLength": 10
}
```

这个预处理步骤大大降低了其余代码的复杂性。

扩展 schema 是 JSON Editor 中唯一异步的部分，这是为了支持通过 ajax 加载 `$ref` 的外部 URL。

`core.js` 的更多说明会很快添加（并没有）。

默认配置（src/defaults.js）
------------------------
这个文件提供了默认的 JSON Editor 配置，使 JSON Editor 在没有进行任何配置时也可以正常运行。所有配置项的默认值，在 JSON Editor 加载完成后都可以修改。

jQuery 集成（src/jquery.js）
------------------------
JSON Editor 可以当作普通的 jQuery 插件来使用。该方式不建议使用，且可能在未来的版本不被支持。

这个文件创建了一个简单的 jQuery 插件，将 jQuery 的函数调用分发给 JSONEditor 库。如果页面没有加载 jQuery，这个文件没什么卵用。