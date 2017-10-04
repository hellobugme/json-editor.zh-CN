Translate from [jdorn/json-editor](https://github.com/jdorn/json-editor) by [kainanhong](https://github.com/hellobugme/json-editor.zh-CN) updated on 2017-10-04.

JSON Editor
===========

![JSON Schema -> HTML Editor -> JSON](https://raw.github.com/jdorn/json-editor/master/jsoneditor.png)

JSON Editor 通过一个 JSON Schema 来生成 HTML 表单。

> JSON Schema：JSON 模式，用于描述 JSON 的数据格式，便于表单数据校验、自动化测试。<br/>
> 参考：[ [json-schema.org](http://json-schema.org/) ]、[ [json-schema入门](http://imweb.io/topic/570ba3e9708d4d2039debc0b) ]

支持 JSON Schema 版本 3 和 4，且集成了一些流行的 CSS 框架（bootstrap、foundation、jQueryUI）。

示例（demo.html）：http://jeremydorn.com/json-editor/

下载： [生产版本][min]（压缩后 22K），[开发版本][max]

[min]: https://raw.github.com/jdorn/json-editor/master/dist/jsoneditor.min.js
[max]: https://raw.github.com/jdorn/json-editor/master/dist/jsoneditor.js

依赖
-----------------

JSON Editor 没有任何依赖，它只需要一个现代浏览器（在 Chrome 和 Firefox 中测试）。

### 可选依赖

下面的内容不是必需的，但添加后可以改进 JSON Editor 的风格和易用性。

*  一个兼容的 JS 模板引擎（Mustache、Underscore、Hogan、Handlebars、Swig、Markup、 EJS）
*  一个兼容的 CSS 框架（bootstrap 2/3、foundation 3/4/5、jqueryui）
*  一个兼容的图标库（bootstrap 2/3 glyphicons、foundation icons 2/3、jqueryui、font awesome 3/4）
*  [SCEditor](http://www.sceditor.com/) 用于编辑 HTML 和 BBcode 内容的富文本编辑器
*  [EpicEditor](http://epiceditor.com/) 用于编辑 Markdown 内容
*  [Ace Editor](http://ace.c9.io/) 用于编辑代码
*  [Select2](http://ivaynberg.github.io/select2/) 更好的下拉选框
*  [Selectize](https://selectize.github.io/selectize.js/) 更好的选择框和数组框
*  [math.js](http://mathjs.org/) 更精确的浮点数计算（multipleOf、divisibleBy 等等）

用法
--------------

最好的示例，请查看下面这些：

*  基本用法示例：http://rawgithub.com/jdorn/json-editor/master/examples/basic.html
*  高级用法示例：http://rawgithub.com/jdorn/json-editor/master/examples/advanced.html
*  CSS集成示例：http://rawgithub.com/jdorn/json-editor/master/examples/css_integration.html

这个 README 文档下面的内容，包含了 JSON Editor 各个方面详细的说明，更底层的介绍，请查看 wiki。

### 初始化

```js
var element = document.getElementById('editor_holder');

var editor = new JSONEditor(element, options);
```

#### 配置项

配置项可以设置为全局配置，也可以在 JSONEditor 实例初始化时单独设置。

```js
// 设置为全局配置
JSONEditor.defaults.options.theme = 'bootstrap2';

// 在初始化时单独设置
var editor = new JSONEditor(element, {
  //...
  theme: 'bootstrap2'
});
```

可用的配置项如下：

<table>
  <thead>
  <tr>
    <th>配置项</th>
    <th>描述</th>
    <th>默认值</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>ajax</td>
    <td>如果为 <code>true</code>，JSON Editor 将通过 ajax 加载 <code>$ref</code> 扩展的 URL。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_array_add</td>
    <td>如果为 <code>true</code>，数组编辑器将不显示 “add row”（增加行）按钮。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_array_delete</td>
    <td>如果为 <code>true</code>，数组编辑器将不显示 “delete row”（删除行）按钮。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_array_reorder</td>
    <td>如果为 <code>true</code>，数组编辑器将不显示 “move up”（上移）按钮。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_collapse</td>
    <td>如果为 <code>true</code>，数组和对象编辑器将不显示折叠按钮。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_edit_json</td>
    <td>如果为 <code>true</code>，将不显示 “Edit JSON”（编辑 JSON）按钮。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>disable_properties</td>
    <td>如果为 <code>true</code>，对象编辑器将不显示 “Edit Properties”（编辑属性）按钮。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>form_name_root</td>
    <td>编辑器表单头部的 `name` 属性。例如一个完整的 name 为 `root[person][name]`，其中的 “root” 就是 form_name_root。</td>
    <td>root</td>
  </tr>
  <tr>
    <td>iconlib</td>
    <td>编辑器使用的图标库。可以在 <strong>CSS Integration</strong> 章节查看更多信息。</td>
    <td><code>null</code></td>
  </tr>
  <tr>
    <td>no_additional_properties</td>
    <td>如果为 <code>true</code>，对象编辑器将只包含 <code>properties</code> 中定义的属性。<br/>如果为 <code>false</code>，不在 <code>properties</code> 中定义的属性会自动附加到对象编辑器中。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>refs</td>
    <td>一个包含 schema 定义对象的 URL。它允许你预定义外部的 schema。</td>
    <td><code>{}</code></td>
  </tr>
  <tr>
    <td>required_by_default</td>
    <td>如果为 <code>true</code>，所有没有明确标识 <code>required</code> 属性的 schema 将被请求。</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>keep_oneof_values</td>
    <td>If <code>true</code>, makes oneOf copy properties over when switching.</td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td>schema</td>
    <td>一个用于编辑器的有效的 JSON Schema，支持 JSON Schema 版本 3 和 4。</td>
    <td><code>{}</code></td>
  </tr>
  <tr>
    <td>show_errors</td>
    <td>什么时候在 UI 上显示校验错误信息。有效的值有：<code>interaction</code>、<code>change</code>、<code>always</code>、<code>never</code>。</td>
    <td><code>"interaction"</code></td>
  </tr>
  <tr>
    <td>startval</td>
    <td>编辑器的初始值，需符合编辑器的 schema。</td>
    <td><code>null</code></td>
  </tr>
  <tr>
    <td>template</td>
    <td>要使用的 JS 模板引擎。可以在 <strong>模板和变量</strong> 章节查看更多信息。</td>
    <td><code>default</code></td>
  </tr>
  <tr>
    <td>theme</td>
    <td>要使用的 CSS 主题。可以再 <strong>CSS 集成</strong> 章节查看更多信息。</td>
    <td><code>html</code></td>
  </tr>
  <tr>
    <td>display_required_only</td>
    <td>If <code>true</code>, only required properties will be included by default.</td>
    <td><code>false</code></td>
  </tr>
  </tbody>
</table>

__*Note__ 如果 `ajax` 属性设置为 `true`，且 JSON Editor 需要获取外部数据，api 中的一些方法不能立即生效，需要在侦听 `ready` 事件触发后才能使用：

```js
editor.on('ready',function() {
  // 现在这些 api 方法可以用了
  editor.validate();
});
```

### 获取和设置数据

```js
editor.setValue({name: "John Smith"});

var value = editor.getValue();
console.log(value.name) // 将输出："John Smith"
```

也可以操作 JSON Schema 的某个部分，而不是整个编辑器：

```js
// 获取编辑器中指定节点的引用
var name = editor.getEditor('root.name');

// 当路径无效时，`getEditor` 将返回 null
if(name) {
  name.setValue("John Smith");

  console.log(name.getValue());
}
```


### 校验

如果可能，JSON Editor 将通过遮罩和智能启用/禁用输入框，使用户无法输入无效数据。

但是，在某些情况下，仍可以输入不符合 schema 的数据。这时可以使用 `validate` 方法来校验数据是否有效。

```javascript
// 校验编辑器当前的值是否有效
var errors = editor.validate();

if(errors.length) {
  // errors 是一个对象数组，元素带有 `path`、`property`、`message` 信息
  // `property` 是引发校验错误的 schema 关键词（如 "minLength"）
  // `path` 是一个以“.”分隔的 JSON 对象路径（如 "root.path.to.field"）
  console.log(errors);
}
else {
  // 值是有效的！
}
```

默认校验编辑器当前的值，如果想要校验其它值，可以将值作为参数传入。


```javascript
// 校验任意一个值是否有效
var errors = editor.validate({
  value: {
    to: "test"
  }
});
```

### 侦听数据变更

编辑器的值发生变更时，会广播 `change` 事件。

```javascript
editor.on('change',function() {
  // Do something
});

editor.off('change',function_reference);
```

也可以观察指定字段的变更：

```javascript
editor.watch('path.to.field',function() {
  // Do something
});

editor.unwatch('path.to.field',function_reference);
```

### 启用和禁用编辑器

可以启用或禁用全部或部分表单。

```js
// 禁用全部表单
editor.disable();

// 禁用部分表单
editor.getEditor('root.location').disable();

// 启用全部表单
editor.enable();

// 启用部分表单
editor.getEditor('root.location').enable();

// 检查表单当前是否启用
if(editor.isEnabled()) alert("It's editable!");
```

### 销毁

将编辑器从 DOM 中移除，并释放资源。

```javascript
editor.destroy();
```

CSS 集成
----------------
JSON Editor 可以集成一些流行的 CSS 框架。

当前支持的主题有：

*  barebones
*  html（默认）
*  bootstrap2
*  bootstrap3
*  foundation3
*  foundation4
*  foundation5
*  foundation6
*  jqueryui

默认主题是 `html`，不依赖外部框架。

可以通过设置 `JSONEditor.defaults.options.theme` 来修改主题。

如果想要设置自定义的 CSS 样式，可以使用几乎没有类和内联样式的 `barebones`。

```javascript
JSONEditor.defaults.options.theme = 'foundation5';
```

可以在实例化时传入 `theme` 参数来覆盖默认主题。

```js
var editor = new JSONEditor(element,{
  schema: schema,
  theme: 'jqueryui'
});
```

### 图标库

JSON Editor 支持一些流行的图标库。图标库需要在主题之外单独设置，即使这有些重复。

支持的图标库有：

*  bootstrap2（字体图标）
*  bootstrap3（字体图标）
*  foundation2
*  foundation3
*  jqueryui
*  fontawesome3
*  fontawesome4

默认不使用图标库。和 CSS 主题一样，可以将图标库设置为全局配置，也可以在 JSONEditor 实例初始化时单独设置。

```js
// 设置为全局配置
JSONEditor.defaults.options.iconlib = "bootstrap2";

// 在初始化时单独设置
var editor = new JSONEditor(element,{
  schema: schema,
  iconlib: "fontawesome4"
});
```

也可以参考现有的样式文件，创建自己的主题或图标库。


支持的 JSON Schema
-----------------

JSON Editor 完整支持 JSON Schema 版本 3 和 4 [core][core] 和 [validation][validation] 规范。  
部分 [hyper-schema][hyper] 规范也支持的很好。

[core]: http://json-schema.org/latest/json-schema-core.html
[validation]: http://json-schema.org/latest/json-schema-validation.html
[hyper]: http://json-schema.org/latest/json-schema-hypermedia.html

### $ref 和定义

JSON Editor 支持引用外部 schema 和内部定义。下面是两种方式的示例：

```json
{
  "type": "object",
  "properties": {
    "name": {
      "title": "Full Name",
      "$ref": "#/definitions/name"
    },
    "location": {
      "$ref": "http://mydomain.com/geo.json"
    }
  },
  "definitions": {
    "name": {
      "type": "string",
      "minLength": 5
    }
  }
}
```

内部引用需要指向 schema 根节点的 `definitions` 对象。
所以， `#/customkey/name` 将抛出一个异常。

如果通过 Ajax 来加载一个外部 url，url 必须在同个域名下，或返回正确的跨域 HTTP 头。

If your URLs don't meet this requirement, you can pass in the references to JSON Editor during initialization (see Usage section above).
如果 url 不能满足这些要求，可以在 JSON Editor 初始化时引入（参考上面章节的示例）。

Self-referential $refs （自引用）也是支持的，示例可以参考 `examples/recursive.html`。

### hyper-schema links

hyper-schema 规范的 `links` 关键字可以给文档添加一些相关链接。

JSON Editor 将通过 links 的 `mediaType` 属性来确定如何更好的显示这些链接。
图片、音频、视频链接将显示媒体内容，并提供一个文本链接。

下面是两个例子：

简单的文本链接
```js+jinja
{
  "title": "Blog Post Id",
  "type": "integer",
  "links": [
    {
      "rel": "comments",
      "href": "/posts/{{self}}/comments/",
      // 可选 - 给链接设置 CSS 样式
      "class": "comment-link open-in-modal primary-text"
    }
  ]
}
```

让链接在点击时下载
```js+jinja
{
  "title": "Document filename",
  "type": "string",
  "links": [
    {
      "rel": "Download File",
      "href": "/documents/{{self}}",
      // 也可以按照 HTML5 规范将 `download` 设置为一个字符串
      "download": true
    }
  ]
}
```

显示一个预览视频（使用 HTML5 video）
```js+jinja
{
  "title": "Video filename",
  "type": "string",
  "links": [
    {
      "href": "/videos/{{self}}.mp4",
      "mediaType": "video/mp4"
    }
  ]
}
```

`href` 属性使用了模板，每当 `self` 的值发生变更时都会重新获取。
参考下面的 __依赖关系__ 章节，了解如何包含其它字段和使用自定义的模板引擎。

### 属性排序

JSON Schema 没有办法指定属性的排序（尽管这个可能会在 v5 规范得到改变）。

为了实现特定的属性排序，JSON Editor 引入一个新的关键字 `propertyOrder`。如果没有指定，属性默认的排序值为 1000。如果属性的排序值相同，则使用默认的 JSON 键排序。

```json
{
  "type": "object",
  "properties": {
    "prop1": {
      "type": "string"
    },
    "prop2": {
      "type": "string",
      "propertyOrder": 10
    },
    "prop3": {
      "type": "string",
      "propertyOrder": 1001
    },
    "prop4": {
      "type": "string",
      "propertyOrder": 1
    }
  }
}
```

上面的示例 schema 中，`prop1` 没有指定排序值，默认为 1000。

所以最终这些属性在表单（和返回的 JSON 数据）中的顺序为：

1.  prop4 (order 1)
2.  prop2 (order 10)
3.  prop1 (order 1000)
4.  prop3 (order 1001)

### defaultProperties

JSON Editor 默认包含对象在 `properties` 中定义的所有属性。

可以通过 `defaultProperties` 来设置要包含哪些属性：

```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "integer"}
  },
  "defaultProperties": ["name"]
}
```

现在，默认只包含 `name` 属性。可以通过 “Object Properties”（对象属性）按钮来添加 “age” 属性。

### format

JSON Editor 的 schema 中的 `string` 类型支持许多不同的 `format`。有些 `format` 对于 `integer` 和 `number` 类型也表现的很好，但有些可能会产生奇怪的结果。

如果指定了 `enum` 属性，`format` 将被忽略。

JSON Editor 使用的是 HTML5 input 类型，所以在一些老的浏览器中，部分 `format` 可能会渲染为基础的文本输入框。

*  color
*  date
*  datetime
*  datetime-local
*  email
*  month
*  number
*  range
*  tel
*  text
*  textarea
*  time
*  url
*  week

![JSON Editor string formats](https://raw.github.com/hellobugme/json-editor.zh-CN/master/formats.png)

下面的示例在支持的浏览器中，将显示一个颜色选择器：

```json
{
  "type": "object",
  "properties": {
    "color": {
      "type": "string",
      "format": "color"
    }
  }
}
```

#### 字符串的专用编辑器

除了标准的 HTML input 的 format，JSON Editor 也可以集成一些第三方的专用编辑器，JSON Editor 没有附带这些库，需自行下载。

__SCEditor__ 提供一个 HTML 和 BBCode 的 WYSIWYG 编辑器。

将 `format` 设置为 `html` 或 `bbcode`，并将 `wysiwyg` 设置为 `true` 来使用它：

> BBCode：BB代码，在编译时会解析为相应的 HTML 结构。例如 “[微笑]”，在输出时会渲染为一个微笑的表情。<br/>
> WYSIWYG：What You See Is What You Get，所见即所得。

```json
{
  "type": "string",
  "format": "html",
  "options": {
    "wysiwyg": true
  }
}
```

可以通过设置 `JSONEditor.plugins.sceditor` 来配置 SCEditor。这是一个示例：

```js
JSONEditor.plugins.sceditor.emoticonsEnabled = false;
```

__EpicEditor__ 是一个简单的、带有实时预览的 Markdown 编辑器。

将 `format` 设置为 `markdown` 来使用它：

```json
{
  "type": "string",
  "format": "markdown"
}
```

可以通过设置 `JSONEditor.plugins.epiceditor` 来配置 EpicEditor。这是一个示例：

```js
JSONEditor.plugins.epiceditor.basePath = 'epiceditor';
```

__Ace Editor__ 是一个带有语法高亮的源码编辑器。

将 `format` 设置为下面的任意值来使用它：

*  actionscript
*  batchfile
*  c
*  c++
*  cpp (alias for c++)
*  coffee
*  csharp
*  css
*  dart
*  django
*  ejs
*  erlang
*  golang
*  groovy
*  handlebars
*  haskell
*  haxe
*  html
*  ini
*  jade
*  java
*  javascript
*  json
*  less
*  lisp
*  lua
*  makefile
*  markdown
*  matlab
*  mysql
*  objectivec
*  pascal
*  perl
*  pgsql
*  php
*  python
*  r
*  ruby
*  sass
*  scala
*  scss
*  smarty
*  sql
*  stylus
*  svg
*  twig
*  vbscript
*  xml
*  yaml

```json
{
  "type": "string",
  "format": "yaml"
}
```

如果想格式化为 mime type，可以使用 hyper-schema 的关键字 `media` 代替 `format`：

```json
{
  "type": "string",
  "media": {
    "type": "text/html"
  }
}
```

通过设置 `JSONEditor.plugins.ace.theme` 来修改 Ace 的默认皮肤：

```js
JSONEditor.plugins.ace.theme = 'twilight';
```

#### 布尔值编辑器

布尔值默认的编辑器为下拉选项框（带有 `true` 和 `false` 选项），想要换成复选框，将 `format` 设置为 `checkbox`。

```json
{
  "type": "boolean",
  "format": "checkbox"
}
```

#### 数组编辑器

默认的数组编辑器占用大量的屏幕空间，`table` 和 `tabs` 格式提供更紧凑的 UI 来编辑数组。

The `table` format works great when every array element has the same schema and is not too complex.

如果数组元素有相同的 schema，且数据结构不复杂，非常适合使用 `table` 格式。

`tabs` 格式可以处理任何数组，但同一时间只能显示一个数组元素，左侧的标签栏可以切换不同的数组元素。

这是一个 `table` 格式的示例：

```json
{
  "type": "array",
  "format": "table",
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      }
    }
  }
}
```

如果数组是由枚举的值组成，也可以使用 `select` 或 `checkbox` 格式，这种情况需要一个特殊的 schema 结构：

```json
{
  "type": "array",
  "uniqueItems": true,
  "items": {
    "type": "string",
    "enum": ["value1","value2"]
  }
}
```

当枚举的值少于 8 个选项时，默认使用 `checkbox` 编辑器（多个复选框）。当多于 8 个时，则使用 `select` 编辑器（一个多选框）。

也可以传入 `format` 来指定使用哪种格式：

```json
{
  "type": "array",
  "format": "select",
  "uniqueItems": true,
  "items": {
    "type": "string",
    "enum": ["value1","value2"]
  }
}
```

#### 对象编辑器

对象编辑器默认的布局是一行一个子编辑器。

可以将 `format` 设置为 `grid`，使一行内放置多个子编辑器。这可以让编辑器变得更紧凑，但不能保证子编辑器的顺序。

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  },
  "format": "grid"
}
```


编辑器配置项
----------------

编辑器可以传入配置项来改变一些行为。

*  `collapsed` - 如果为 true，编辑器的初始状态将为折叠状态（对象和数组编辑器有效）
*  `disable_array_add` - 如果为 true，“add row”（增加行）按钮将被隐藏（数组编辑器有效）
*  `disable_array_delete` - 如果为 true，所有的 “delete”（删除）按钮将被隐藏（数组编辑器有效）
*  `disable_array_delete_all_rows` - 如果为 true，“delete all rows”（删除所有行）按钮将被隐藏（数组编辑器有效）
*  `disable_array_delete_last_row` - 如果为 true，“delete last row”（删除最后一行）按钮将被隐藏（数组编辑器有效）
*  `disable_array_reorder` - 如果为 true，“move up/down”（上移/下移）按钮将被隐藏（数组编辑器有效）
*  `disable_collapse` - 如果为 true，折叠按钮将被隐藏（对象和数组编辑器有效）
*  `disable_edit_json` - 如果为 true，“Edit JSON”（编辑 JSON）按钮将被隐藏（对象编辑器有效）
*  `disable_properties` - 如果为 true，“Properties”（属性）按钮将被隐藏（对象编辑器有效）
*  `enum_titles` - 一个定义下拉选择框选项显示文本的数组，元素顺序和 `enum` 的值一一对应。
*  `expand_height` - 如果为 true，输入框将自动拉伸以适应内容。对于 textarea 作用最大。
*  `grid_columns` - 用于网格布局（`format` 为 `grid`）的对象编辑器的子编辑器，显式地设置子编辑器所占的网格列数（1-12）。
*  `hidden` - 如果为 true，编辑器将不会在 UI 中显示（适用于所以类型）
*  `input_height` - 显式地设置 input 元素的高度，字符串样式值有效（如 “100px”），对于 textarea 作用最大。
*  `input_width` - 显式地设置 input 元素的宽度，字符串样式值有效（如 “100px”），用于 string、number、integer 数据类型。
*  `remove_empty_properties` - 如果为 true，getValue() 时将不会返回对象中的空属性。

```json
{
  "type": "object",
  "options": {
    "collapsed": true
  },
  "properties": {
    "name": {
      "type": "string"
    }
  }
}
```

也可以将这些配置项设置为全局配置：

```js
JSONEditor.defaults.editors.object.options.collapsed = true;
```


依赖关系
------------------
有时，有些字段的值需要取决于其它字段。

JSON Schema 规范的 `dependencies` 关键字不能足够灵活地处理大多数情景。JSON Editor 引入了一对自定义的关键词来解决这个问题。

第一步是让一个字段 “watch” （监控）其它字段的变更。

```json
{
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "full_name": {
      "type": "string",
      "watch": {
        "fname": "first_name",
        "lname": "last_name"
      }
    }
  }
}
```

`watch` 关键字告诉 JSON Editor 需要监控哪些字段的变更。

`watch` 的键（`fname` 和 `lname`）是字段的别名。

`watch` 的值（`first_name` 和 `last_name`）是字段的路径。要访问嵌套的对象属性，使用 “.” 来分隔（如 “path.to.field”）。

默认情况下，路径从 schema 的根节点开始，不过有需要的话，你可以给任意的祖先节点定义一个 schema `id` 来创建相对路径，这在数组中非常有用。这是一个示例：

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "id": "arr_item",
    "properties": {
      "first_name": {
        "type": "string"
      },
      "last_name": {
        "type": "string"
      },
      "full_name": {
        "type": "string",
        "watch": {
          "fname": "arr_item.first_name",
          "lname": "arr_item.last_name"
        }
      }
    }
  }
}
```

现在，每个数组元素的 `full_name` 字段将监控同个数组元素中 `first_name` 和 `last_name` 字段的变更。

### 模板

单单是监控字段变更并没什么卵用，你需要告诉 JSON Editor `full_name` 是 `fname [空格] lname` 这样组成。

JSON Editor 使用一个 JavaScript 模板引擎来完成这个工作。JSON Editor 内置了一个简单的模板引擎（只是简单的 `{{变量}}` 替换），但也支持许多流行的模板引擎：

*  ejs
*  handlebars
*  hogan
*  markup
*  mustache
*  swig
*  underscore

可以设置 `JSONEditor.defaults.options.template` 来修改为任意支持的模板引擎：

```javascript
JSONEditor.defaults.options.template = 'handlebars';
```

也可以给每个实例单独设置模板引擎：

```js
var editor = new JSONEditor(element,{
  schema: schema,
  template: 'hogan'
});
```

这是使用默认模板引擎实现 `full_name` 的完整示例：

```js+jinja
{
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "full_name": {
      "type": "string",
      "template": "{{fname}} {{lname}}",
      "watch": {
        "fname": "first_name",
        "lname": "last_name"
      }
    }
  }
}
```

### 枚举值

另一个常见的依赖关系是下拉菜单的选项取决于其它字段。这是一个示例：

> 例如，城市下拉框的选项取决于省份下拉框的值

```json
{
  "type": "object",
  "properties": {
    "possible_colors": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "primary_color": {
      "type": "string"
    }
  }
}
```

想要 `primary_color` 的取值是 `possible_colors` 数组里的一个元素，首先，需要让 `primary_color` 字段监控 `possible_colors` 数组。

```json
{
  "primary_color": {
    "type": "string",
    "watch": {
      "colors": "possible_colors"
    }
  }
}
```

然后，使用特殊关键字 `enumSource` 来告诉 JSON Editor 使用这个字段来填充下拉菜单。

```json
{
  "primary_color": {
    "type": "string",
    "watch": {
      "colors": "possible_colors"
    },
    "enumSource": "colors"
  }
}
```

现在，`possible_colors` 数组发生变更时，下拉菜单的选项也将同时变更。

这是 `enumSource` 最基本的用法，在更复杂的表单中，`enumSource` 还支持过滤、多数据源、常量值等。

下面是一个更复杂的示例（使用了 Swig 模板引擎语法来展示更高级的特性）：

```js+jinja
{
  // 一个数组数据源
  "enumSource": [
    // 常量值数据源
    ["none"],
    {
      // 监控字段的数据源
      "source": "colors",
      // 使用数组的一个子集
      "slice": [2,5],
      // 用模板过滤元素（过滤空字符串）
      "filter": "{% if it em !== 'black' %}1{% endif %}",
      // 指定枚举选项的显示文本
      "title": "{{item|upper}}",
      // 指定枚举选项的值
      "value": "{{item|trim}}"
    },
    // 列表尾部的另一个常量值数据源
    ["transparent"]
  ]
}
```

也可以指定一个静态数据列表：

```js+jinja
{
  "enumSource": [{
      // 静态数据源
      "source": [
        {
          "value": 1,
          "title": "One"
        },
        {
          "value": 2,
          "title": "Two"
        }
      ],
      "title": "{{item.title}}",
      "value": "{{item.value}}"
    }]
  ]
}
```

上面的示例是直接使用一个字符串数组作为枚举数据源，在复杂的表单中，也可以使用对象数组作为枚举数据源。这是一个示例：

```js+jinja
{
  "type": "object",
  "properties": {
    "possible_colors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string"
          }
        }
      }
    },
    "primary_color": {
      "type": "string",
      "watch": {
        "colors": "possible_colors"
      },
      "enumSource": [{
        "source": "colors",
        "value": "{{item.text}}"
      }]
    }
  }
}
```

所有可选的模板在复杂表单中都会传入 `item` 和 `i` 属性，`item` 指向数组元素，`i` 是从 0 计数的索引值。

### 动态表单头

schema 的 `title` 关键词用于在编辑界面添加一个友好的表单头，有时，一个根据某些字段实时变更的动态表单头会很有用。

假设有一个 Child 组成的数组，没有动态表单头时，数组元素的编辑界面将显示 `Child 1`、`Child 2` 等等。
如果数组元素的表单头能动态地显示元素的相关信息，那也是极好的，例如 `1 - 张三（9 岁）`、`2 - 李四（11 岁）`。

可以通过 `headerTemplate` 属性来实现这一点。所有被监控的变量都会和静态标题 `title`（如 “Child”）、从 0 计数的索引值 `i0`（如 “0” 和 “1”）、从 1 计数的索引值 `i1`、字段值 `self`（如 `{"name": "张三", "age": 9}`）一起传入这个模板。

```js+jinja
{
  "type": "array",
  "title": "Children",
  "items": {
    "type": "object",
    "title": "Child",
    "headerTemplate": "{{ i1 }} - {{ self.name }} (age {{ self.age }})",
    "properties": {
      "name": { "type": "string" },
      "age": { "type": "integer" }
    }
  }
}
```

### 自定义模板引擎

如果可选的模板引擎不能满足需求，你可以使用任意带有 `compile` 方法的自定义模板引擎，示例：

```js
var myengine = {
  compile: function(template) {
    // compile 方法返回一个渲染函数
    return function(vars) {
      // 模板引擎在这里渲染模板
      var result = template;
      return result;
    }
  }
};

// 设置为全局配置
JSONEditor.defaults.options.template = myengine;

// 在初始化时单独设置
var editor = new JSONEditor(element,{
  schema: schema,
  template: myengine
});
```

自定义语言
-----------------

JSON Editor 通过一个翻译函数来生成 UI 上的文字。提供了一个默认的 `en` 英文映射表。

要自定义翻译，可以覆盖默认的语言映射表，也可以创建一个新的语言映射表。

```js+jinja
// 覆盖指定的语言映射表
JSONEditor.defaults.languages.en.error_minLength =
  "This better be at least {{0}} characters long or else!";


// 创建自己的语言映射表
// 自定义的映射表没有定义的关键字，将使用默认的 `en` 映射表中对应的关键字代替
JSONEditor.defaults.languages.es = {
  error_notset: "propiedad debe existir"
};
```

JSON Editor 默认使用 `en` 语言翻译，通过设置 `JSONEditor.defaults.language` 属性来指定自定义的语言。

```js
JSONEditor.defaults.language = "es";
```

自定义编辑器接口
-----------------

JSON Editor 自带了基本的 JSON 数据类型和一些特殊数据类型的编辑器接口。

参考现有的编辑器接口，可以很容易地添加自定义的编辑器接口。

JSON Editor 通过 resolver 函数来指定对特定 schema 或 subschema 使用哪个编辑器接口。

假设自定义了一个 `location` 编辑器用于编辑地理数据，通过添加一个 resolver 函数，让 format 为 `location` 的数据使用该编辑器：

```js
// 添加到 resolver 列表的头部，可以确保比其它 resolver 更优先执行
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema.type === "object" && schema.format === "location") {
    return "location";
  }

  // 如果没有返回有效的编辑器，将继续执行下一个 resolver 函数
});
```

现在，下面的 schema 将使用自定义的 `location` 编辑器来处理数组的每个元素，而不是默认的 `object` 编辑器。

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "format": "location",
    "properties": {
      "longitude": {
        "type": "number"
      },
      "latitude": {
        "type": "number"
      }
    }
  }
}
```

如果你创建了一个自定义编辑器接口，且可能对他人有所帮助，可以提交一个 pull request！

可能性无止境！一些点子：

*  一个紧凑的方式编辑对象
*  `select` 编辑器的单选按钮版本
*  字符串自动提示（像 enum，但不受限于它的取值）
*  更好的字符串数组编辑器（标签编辑器）
*  基于 Canvas 的、可生成 Base64 数据 URL 的图片编辑器

Select2 & Selectize 支持
----------------
默认启用 Select2 支持，当检测到 Select2 库时将自动生效。

通过下面代码来启用 Selectize 支持：
```js
JSONEditor.plugins.selectize.enable = true;
```
启用 Selectize 支持可参考 `array` 和 `select` 编辑器的示例。

自定义校验
----------------

JSON Editor 提供了一个钩子可以给校验引擎添加自定义的校验。

下面的示例，给所有 `format` 为 `date` 的 schema 添加了一个校验，使日期必须为 `YYYY-MM-DD` 格式。

```js
// 自定义校验必须返回一个错误信息数组，校验通过时返回一个空数组
JSONEditor.defaults.custom_validators.push(function(schema, value, path) {
  var errors = [];
  if(schema.format==="date") {
    if(!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
      // 错误信息必须是一个带有 `path`、`property`、`message` 字段的对象
      errors.push({
        path: path,
        property: 'format',
        message: '日期必须是 "YYYY-MM-DD" 格式'
      });
    }
  }
  return errors;
});
```

jQuery 集成
-------------------

__*WARNING__：该方式不建议使用，且可能在未来的版本不被支持。

如果加载了 jQuery（或 Zepto），JSON Editor 可以当作普通的 jQuery 插件来使用。

```js
$("#editor_holder")
  .jsoneditor({
    schema: {},
    theme: 'bootstrap3'
  })
  .on('ready', function() {
    // 获取值
    var value = $(this).jsoneditor('value');

    value.name = "John Smith";

    // 设置值
    $(this).jsoneditor('value',value);
  });
```
