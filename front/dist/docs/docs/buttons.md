# 按钮

在 Meowdream Docs 中，您可以方便的将 超链接 改写为 按钮。

**对于未指定按钮类型的Markdown链接，将会以普通链接的方式渲染**

具体可分为以下几种：

### 自定义按钮

创建该按钮后，将会同时设置该按钮的onclick事件，以便后续操作。

``` markdown
[自定义按钮](Button:SOME_CODE_HERE;)
```

[弹出alert](Button:alert('Hello,world!');)


### 超链接按钮

单击此按钮时，将会在新标签页中打开该按钮指定的链接。

``` markdown
[超链接按钮](LinkButton:YouLinkHere)
```

[超链接按钮 ( 此处链接到 https://meowdream.cn )](LinkButton:https://meowdream.cn)

### "页内打开"按钮

单击该按钮时，本页面将尝试加载按钮所指向的Markdown文档并渲染到本区域。

```markdown
["页内打开"按钮](InPage:/docs/welcome.md)
```

["页内打开"按钮](InPage:/docs/welcome.md)