# 简历字段助手

Chrome Manifest V3 扩展。提前填写个人资料和自选 AI 接口，在招聘网页上识别表单字段，预览映射后填入。支持姓名、联系方式、教育、工作、技能，以及起止时间等字段。不会自动提交申请。

## 安装

1. 在 Chrome 打开 `chrome://extensions`，开启“开发者模式”。
2. 点击“加载已解压的扩展程序”，选择本目录 `resume-autofill`。
3. 打开扩展的“设置”，填写需要使用的资料、API 地址、模型名称和密钥并保存。
4. 打开招聘表单，点击扩展图标 →“识别字段”→核对并勾选→“填入已勾选字段”。

## API 接口

支持 **OpenAI Chat Completions 兼容格式**：`POST` 到用户填写的完整 URL，使用 `Authorization: Bearer <key>`，请求包含 `model` 和 `messages`，响应读取 `choices[0].message.content`。可以使用 GPT、DeepSeek 等兼容接口，也可以通过自建适配网关连接 Claude 或其他服务。原生 Claude Messages API 与 Chat Completions 格式不同，不能把原生地址直接填入。

扩展在保存设置时申请指定 API 域名的访问权限。远程接口必须使用 HTTPS；本地网关可用 `http://localhost` 或 `http://127.0.0.1`。扩展不限定供应商，也没有内置 API Key。

发送到接口的内容仅包括当前网页的可见字段描述与个人资料中**已填写字段的名称**，不包括资料值。请自行评估所选 API 服务的数据处理规则。资料和 API Key 保存在 Chrome 本地扩展存储中，建议仅在个人设备使用。

## 日期字段

资料中的“开始时间”“结束时间”建议写为 `YYYY-MM`。扩展可填写常见的 `input[type=month]`、`input[type=date]`、文本框，以及按“年”“月”拆分的下拉框。`date` 控件要求具体日期时，默认使用该月 1 日；提交前请核对。自定义日历、动态加载表单、跨域 iframe 和文件上传不在当前支持范围内。

## 边界

AI 只负责字段映射，填入前会显示对应关系供用户确认。扩展不会自动点击提交，也不会覆盖未映射字段。招聘平台的表单结构各异，使用者应逐项检查填入结果。

## 开发

无构建步骤、无第三方运行依赖。运行 `node --test` 检查资料解析与映射过滤。源码位于 `schema.js`、`background.js`、`content.js` 与两个页面脚本中。

MIT License
