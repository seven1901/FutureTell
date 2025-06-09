# FutureTell - 智能命理解析平台

一款基于生辰八字和紫薇斗数的命理解析网页应用程序，结合传统命理学与现代AI技术，为用户提供个性化的命理报告和解读服务。

## 🌟 功能特色

- **智能八字排盘**：根据出生信息自动生成精准的八字命盘
- **五行分析**：详细展示五行分布和属性特征
- **AI命理解读**：基于DeepSeek V3模型的专业命理分析
- **现代化UI**：采用React + TypeScript + TailwindCSS构建的美观界面
- **响应式设计**：完美适配桌面端和移动端
- **安全保障**：严格保护用户隐私信息

## 🛠 技术栈

### 前端
- React 18 + TypeScript
- TailwindCSS + Headless UI
- Heroicons
- Axios

### 后端
- Node.js + Express
- DeepSeek V3 API
- Bazi MCP服务
- CORS支持

## 📦 安装与运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 1. 克隆项目
```bash
git clone <repository-url>
cd FutureTell
```

### 2. 安装依赖
```bash
# 安装后端依赖
npm install

# 安装前端依赖
cd client
npm install
cd ..
```

### 3. 环境配置
项目根目录已包含 `.env` 文件，包含以下配置：
```env
# DeepSeek V3 API Configuration
ARK_API_KEY=92be235f-bd41-4d79-847e-665a2ec61af9
ARK_API_URL=https://ark.cn-beijing.volces.com/api/v3/chat/completions
ARK_MODEL=ep-20250609150606-8mlsb

# Server Configuration
PORT=3001

# Client Configuration
REACT_APP_API_URL=http://localhost:3001
```

### 4. 启动应用

#### 开发模式（推荐）
```bash
# 同时启动前后端服务
npm run dev
```

#### 分别启动
```bash
# 启动后端服务
npm run server

# 新开终端，启动前端服务
npm run client
```

### 5. 访问应用
- 前端地址：http://localhost:3000
- 后端API：http://localhost:3001/api

## 🚀 使用指南

### 1. 输入出生信息
- **出生日期**：选择准确的公历日期（格式：YYYY-MM-DD）
- **出生时间**：选择具体时间（格式：HH:MM，24小时制）
- **性别**：选择男或女

### 2. 查看八字排盘
- 系统自动生成四柱八字
- 展示五行分布图表
- 显示各元素的数量和百分比

### 3. 获取命理分析
- 点击"获取详细命理分析"按钮
- AI将生成包含以下内容的报告：
  - 五行属性分析
  - 性格特点速览
  - 感情缘分简析
  - 事业发展方向
  - 财运基础分析

## 📁 项目结构

```
FutureTell/
├── client/                 # React前端应用
│   ├── src/
│   │   ├── components/     # React组件
│   │   │   ├── BirthInfoForm.tsx
│   │   │   ├── BaziDisplay.tsx
│   │   │   └── FortuneAnalysis.tsx
│   │   ├── services/       # API服务
│   │   │   └── api.ts
│   │   ├── App.tsx         # 主应用组件
│   │   └── index.tsx       # 应用入口
│   ├── public/             # 静态资源
│   └── package.json        # 前端依赖
├── server.js               # Express后端服务
├── package.json            # 后端依赖
├── .env                    # 环境变量
├── .gitignore             # Git忽略文件
└── README.md              # 项目说明
```

## 🔧 API接口

### 获取八字信息
```http
POST /api/bazi
Content-Type: application/json

{
  "birthDate": "1990-01-01",
  "birthTime": "14:30",
  "gender": 1
}
```

### 获取命理分析
```http
POST /api/analysis
Content-Type: application/json

{
  "baziData": {
    "bazi": "甲子 丙寅 戊辰 庚午",
    "wuxing": { "wood": 2, "fire": 2, "earth": 2, "metal": 1, "water": 1 },
    "datetime": "1990-01-01T14:30:00+08:00",
    "gender": 1
  }
}
```

### 健康检查
```http
GET /api/health
```

## 🔒 安全特性

- **环境变量保护**：API密钥存储在环境变量中，不会暴露在代码中
- **CORS配置**：合理配置跨域访问策略
- **输入验证**：前后端双重数据验证
- **错误处理**：完善的错误捕获和用户友好的错误提示

## 🎨 界面特色

- **现代化设计**：采用渐变色彩和卡片式布局
- **动画效果**：流畅的页面切换和加载动画
- **响应式布局**：完美适配各种屏幕尺寸
- **中文字体优化**：针对中文内容优化的字体配置
- **无障碍支持**：符合Web无障碍标准

## 📝 开发说明

### 添加新功能
1. 在 `client/src/components/` 中创建新组件
2. 在 `client/src/services/api.ts` 中添加API调用
3. 在 `server.js` 中添加对应的后端路由

### 样式定制
- 修改 `client/tailwind.config.js` 中的主题配置
- 在 `client/src/index.css` 中添加自定义样式类

### API集成
- 当前使用模拟的Bazi MCP数据，实际部署时需要集成真实的MCP服务
- DeepSeek V3 API已配置完成，可直接使用

## ⚠️ 免责声明

本应用仅供娱乐和文化交流使用，分析结果不构成任何人生决策建议。命运掌握在自己手中，积极努力才是改变人生的根本途径。请理性对待命理分析，以科学的态度面对生活。

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

---

**FutureTell** - 探索命运奥秘，洞察人生智慧 ✨