# Glass Chrome New Tab

一个高颜值、可自定义的 Chrome 新标签页（New Tab Page）。

采用 **Glassmorphism（磨砂玻璃）** 风格设计，支持分组管理、快捷入口增删改、图标自动识别、数据本地持久化，并且可以通过 Docker 一键运行。

![Glass Chrome New Tab](https://via.placeholder.com/800x450/302b63/ffffff?text=Glass+Chrome+New+Tab)

## ✨ 特性

- 🎨 **Glassmorphism 磨砂玻璃 UI**：渐变背景 + 半透明卡片 + 柔和阴影
- 📁 **分组管理**：工作 / 娱乐 / 学习等分组，支持新增、重命名、删除
- 🔗 **快捷入口**：新增、编辑、删除网站卡片
- 🖼️ **自动图标 / 标题识别**：输入 URL 后自动获取 Favicon 和网站标题
- 💾 **本地持久化**：所有配置保存在浏览器 `localStorage`，刷新不丢失
- 🔍 **内置搜索框**：页面加载自动聚焦，回车在新标签页 Google 搜索
- 📱 **响应式布局**：宽屏 3 列分组并排，适配不同分辨率
- 🐳 **Docker 一键启动**：宿主机暴露端口 `4000`

## 🚀 快速开始

### 方式一：直接打开 HTML

直接在浏览器中打开项目根目录的 `index.html` 即可使用。

### 方式二：Docker 运行（推荐）

确保已安装 Docker 和 Docker Compose。

```bash
docker compose up -d
```

然后访问：

```
http://localhost:4000
```

## 🔧 Chrome 设置为新标签页

项目已附带一个最小化 Chrome 扩展，安装后可将新标签页重定向到本地主页。

1. 打开 Chrome，访问 `chrome://extensions`
2. 开启右上角 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择项目中的 `chrome-extension` 文件夹
5. 新建标签页即可看到自定义主页

> 若在其他设备使用，需将扩展中的 `localhost:4000` 替换为宿主机实际 IP。

## 🛠️ 技术栈

- HTML5
- CSS3（Grid / Flexbox / backdrop-filter）
- Vanilla JavaScript（无框架依赖）
- Nginx（Docker 部署）

## 📁 项目结构

```
chrome-homepage/
├── index.html              # 主页面（HTML + CSS + JS）
├── docker-compose.yml      # Docker Compose 配置
├── chrome-extension/       # Chrome 新标签页扩展
│   ├── manifest.json
│   └── redirect.html
└── README.md
```

## 📝 数据说明

所有分组和快捷入口数据保存在浏览器本地存储中。首次打开会加载内置的默认数据，可通过右上角的 **重置** 按钮恢复默认。

## 👥 Contributors

- [@zyjarge](https://github.com/zyjarge) — 项目作者
- [Moonshot AI](https://www.moonshot.cn/) — 本项目在 Kimi（Moonshot AI）的辅助下完成

## 📄 License

MIT
