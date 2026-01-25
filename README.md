# 🌍 YG Travel - 个人旅行计划展示网站

一个现代化的个人旅行网站，用于展示和分享精心策划的旅行路线。

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://yibinpro.github.io/TripPlanGenerator/)

## ✨ 特色功能

- 🎨 **现代化设计** - 渐变色、动画效果、glassmorphism风格
- 📱 **响应式布局** - 完美适配各种设备
- 🗺️ **地图可视化** - 使用Leaflet.js展示旅行路线
- 🤖 **多AI版本** - 对比不同AI生成的旅行计划
- ⚡ **快速轻量** - 纯静态网站，无需后端

## 🚀 在线访问

访问网站：[https://yibinpro.github.io/TripPlanGenerator/](https://yibinpro.github.io/TripPlanGenerator/)

## 📁 项目结构

```
TripPlanGenerator/
├── index.html          # 主页
├── css/
│   └── style.css      # 样式系统
├── js/
│   └── main.js        # 交互脚本
├── trips/
│   ├── index.html     # 旅行列表页
│   └── dalian/        # 大连旅行计划
│       ├── dalian_trip_gemini.html
│       ├── dalian_trip_deepeek.html
│       ├── dalian_trip_doubao.html
│       └── dalian_trip_qwen.html
└── README.md
```

## 🎯 当前旅行计划

### 大连 · 海滨之城 🏖️

4天3晚精品路线，包含：
- 🛀 高颜值温泉度假
- 🌊 海滨风光打卡
- 🍜 地道美食探索
- 📸 网红景点攻略

提供4个AI版本对比：
- **Gemini版本** - 简洁优雅，地图可视化
- **DeepSeek版本** - 详细攻略，预算建议
- **豆包版本** - 创意设计，网红打卡
- **通义千问版本** - 智能推荐，时间优化

## 💻 本地开发

### 克隆项目

```bash
git clone https://github.com/yibinpro/TripPlanGenerator.git
cd TripPlanGenerator
```

### 本地预览

直接在浏览器中打开 `index.html` 即可：

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

或使用本地服务器（推荐）：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# VS Code Live Server
# 在VS Code中右键点击index.html，选择"Open with Live Server"
```

然后访问 `http://localhost:8000`

## 🌐 部署到GitHub Pages

### 方法1: 通过GitHub网页界面

1. 进入仓库设置页面
2. 找到 **Pages** 选项
3. 在 **Source** 下选择 `main` 分支
4. 点击 **Save**
5. 等待几分钟，网站将部署到 `https://yibinpro.github.io/TripPlanGenerator/`

### 方法2: 通过命令行

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "🎉 Initial commit: YG Travel website"

# 推送到GitHub
git push origin main
```

然后按照方法1启用GitHub Pages。

## 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - 现代样式特性
  - CSS变量
  - Flexbox & Grid
  - 动画和过渡
  - 渐变和阴影
- **JavaScript** - 增强交互
  - 平滑滚动
  - Scroll事件监听
  - Intersection Observer API
- **Leaflet.js** - 地图可视化
- **Google Fonts** - Inter字体

## 📝 添加新旅行计划

1. 在 `trips/` 目录下创建新城市文件夹
2. 添加旅行HTML文件
3. 在 `trips/index.html` 中添加新的城市卡片
4. 在主页 `index.html` 中更新旅行计数

## 🎨 自定义样式

所有颜色、字体、间距等都通过CSS变量定义在 `css/style.css` 的顶部：

```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    /* ... 更多变量 */
}
```

修改这些变量即可快速定制整体风格。

## 📄 许可证

MIT License

## 👤 作者

**YG (Yestin Geng)**

- GitHub: [@yibinpro](https://github.com/yibinpro)

## 🙏 致谢

- 地图数据来自 [OpenStreetMap](https://www.openstreetmap.org/)
- 地图库使用 [Leaflet.js](https://leafletjs.com/)
- 字体来自 [Google Fonts](https://fonts.google.com/)

---

⭐ 如果这个项目对你有帮助，欢迎给个Star！
