# MeowdreamHub Web

## 部署说明

本项目部分代码使用z1h。

*等以后有空了在迁到别的语言（悄咪咪）*

z1h环境搭建：(https://z1h.org/doc/003.html)

配置文件示例：

```json
// Refer: https://z1h.org/doc/config
{
	"dir": "datas", // Work space
	"log": "datas/log/log", // Log file
	"port": 80, // Http listen port
	"initFiles": ["datas/init.z1h"],
	"serverless":
	{
		"api":
		{
			"router": "/api",
			"dir": "datas/api"
		},
		"socket":
		{
			"router": "/socket",
			"dir": "datas/socket"
		},
	"repl":
	{
		"web":
		{
			"router": "/z1h",
			"users": [
			],
		}
	}
}
```