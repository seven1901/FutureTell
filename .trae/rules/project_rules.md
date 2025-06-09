1. 产品概述
 
1.1 产品定位
一款基于生辰八字和紫薇斗数的命理解析网页应用程序，为用户提供个性化的命理报告和解读服务。
1.2 产品功能
用户可以通过输入我们制定的信息，获取到个性化的命理报告和解读。


2. 功能模块
 
2.1 基础信息采集
根据以下信息进行排盘，采集信息需要明确告诉用户输入格式，以便正确调用MCP进行排盘：
- 出生年月日
- 出生时间
- 出生地点
- 性别选择

收集信息后，使用Bazi MCP获取排盘，并展现给用户。
Bazi MCP可以使用工具叫getBaziDetail，参数如下：

solarDatetime: String

ISO 格式的阳历时间。例如：2000-05-15T12:00:00+08:00。
Solar datetime in ISO format. Example: 2000-05-15T12:00:00+08:00.

gender: Number

性别。可选。0 - 女，1-男。默认 1。
Gender. Optional. 0 for female, 1 for male. 1 by default.

 
2.2 基础命理分析功能
基于上述获得的排盘信息，继续使用deepseek V3模型进行命理基础信息获取及展现
调用示例：
curl https://ark.cn-beijing.volces.com/api/v3/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ARK_API_KEY" \
  -d '{
    "model": "ep-20250609150606-8mlsb",
    "messages": [
      {"role": "system","content": "你是人工智能助手."},
      {"role": "user","content": "你好"}
    ]
  }'


2.2.1 基础命理报告
- 五行属性分析
- 性格特点速览
- 感情缘分简析
  - 理想伴侣特征
  - 桃花运势概述
- 事业发展方向
- 财运基础分析