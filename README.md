# Glass Chrome New Tab

一个高颜值、可自定义的 Chrome 新标签页（New Tab Page）。

采用 **Glassmorphism（磨砂玻璃）** 风格设计，支持分组管理、快捷入口增删改、图标自动识别、数据本地持久化，并且可以通过 Docker 一键运行。

![Glass Chrome New Tab](https://via.placeholder.com/800x450/302b63/ffffff?text=Glass+Chrome+New+Tab)

## ✨ 特性

- 🎨 **Glassmorphism 磨砂玻璃 UI**：浅色渐变背景 + 半透明卡片 + 柔和阴影
- 🌈 **多配色方案**：内置 4 套预设主题（默认浅色 / 清新海洋 / 柔和暖调 / 莫兰迪多色），头部下拉一键切换，选择自动记忆
- ✏️ **编辑模式**：类似 iOS 桌面，正常状态只能点击图标；切换到编辑模式后才能拖拽、删除、重命名和管理分组，避免误操作
- 🧲 **跨分组拖拽**：编辑模式下直接拖动网站卡片到其他分组，松手即完成移动
- 📁 **分组管理**：工作 / 娱乐 / 学习等分组，支持新增、重命名、删除
- 🔗 **快捷入口**：新增、编辑、删除网站卡片
- 🖼️ **自动图标 / 标题识别**：输入 URL 后自动获取 Favicon 和网站标题
- 📤 **配置导出 / 导入**：一键将全部配置（配色方案、分组、快捷入口）导出为 JSON 备份文件，可在其他设备导入还原
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
# 构建压缩产物（生成 dist/index.html）
cd tools && npm install && cd ..
node tools/minify.mjs

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
├── index.html              # 主页面源码（HTML + CSS + JS，保持可读）
├── dist/index.html         # 构建产物（minify 后由 nginx 提供服务，勿手改）
├── nginx.conf              # nginx 站点配置（开启 gzip 压缩）
├── docker-compose.yml      # Docker Compose 配置
├── tools/                  # 构建与性能测试脚本
│   ├── minify.mjs          # 压缩 index.html -> dist/index.html
│   └── bench.mjs           # 弱网环境下的加载性能基准测试
├── chrome-extension/       # Chrome 新标签页扩展
│   ├── manifest.json
│   └── redirect.html
└── README.md
```

## ⚡ 性能优化

- **Minify 构建**：`index.html` 保持可读源码，`node tools/minify.mjs` 生成压缩产物到 `dist/`，Docker 挂载的是产物
- **gzip 压缩**：`nginx.conf` 开启 gzip，文本资源传输体积约降低 80%
- **内联空 favicon**：消除浏览器自动请求 `/favicon.ico` 产生的 404 往返

性能对比（模拟弱网 150ms RTT / 1.6Mbps，无缓存，5 轮均值）可用基准脚本复测：

```bash
node tools/bench.mjs
```

## 🖱️ 使用说明

- **浏览模式（默认）**：点击卡片直接跳转网站，卡片不可拖动，避免误操作。
- **编辑模式**：点击右上角 **✏️ 编辑** 进入，此时可以：
  - 拖拽卡片在分组内排序，或拖到其他分组完成移动
  - 新增 / 编辑 / 删除快捷入口和分组
  - 再次点击 **✏️ 完成** 退出编辑模式
- **配色方案**：右上角下拉框切换预设主题，选择会保存在本地。
- **导出 / 导入**：编辑模式下点击 **⬇ 导出** 下载 JSON 备份（含配色、分组、全部快捷入口）；在另一台设备上点击 **⬆ 导入** 选择该文件即可完整还原。

## 📝 数据说明

所有分组和快捷入口数据保存在浏览器本地存储（`localStorage`）中。首次打开会加载内置的默认数据，可通过右上角的 **重置** 按钮恢复默认。换设备或重装浏览器时，使用导出 / 导入功能迁移配置。

## 👥 Contributors

- [@zyjarge](https://github.com/zyjarge) — 项目作者
- [Moonshot AI](https://github.com/MoonshotAI) — 本项目在 Kimi（Moonshot AI）的辅助下完成，感谢 Kimi 提供的代码与文案协助

## 📄 License

MIT
