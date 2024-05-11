# 目录编写指南

在 Meowdream Docs中，您需要手动创建左侧目录，并将其保存至 `/docs/list.txt` 中

其中，每行文本都将在目录中被渲染为指定内容，具体可分为以下数种：

## 分割线

分割线由至少三个 `=` 或 `-` 组成

* `-----`

* `=====`

*以上两种都是合法的分割线*

## 标题

标题由若干个 `+` 以及一段文字组成。其中 `+` 的个数为 1~3个， `+` 的数量决定了标题字体的大小。

| `+` 的数量 | 字体大小 | 示例 |
|:-|:-|:-|
| 1|   larger |<div style="font-size: larger;">标题</div>|
| 2|   x-large |<div style="font-size: x-large;">标题</div>|
| 3|   xx-large |<div style="font-size: xx-large;">标题</div>|

## 链接

当单击链接是，将会在本页面渲染指定的 Markdown 文档。

``` plaintext
(概述)[/docs/outline.md]
(用户协议)[/docs/rule.md]
(隐私政策)[/docs/privacy.md]
(联系我们)[/docs/contact.md]
```

## 其他文本

文本为其他格式时，渲染为普通的文本，没有其他功能。