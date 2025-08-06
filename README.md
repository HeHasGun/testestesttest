# 摇骰子应用 🎲

一个使用 Next.js 构建的简单有趣的摇骰子网页应用。

## 功能特点

- 🎲 点击摇骰子，随机生成1-6的数字
- ✨ 流畅的动画效果
- 📱 响应式设计，支持移动端
- 🎨 现代化的UI设计
- 🔒 使用加密级真随机数生成
- ⏰ 显示摇骰子的精确时间
- 🎮 每次只能摇一次，支持重新开始
- 🛡️ 防调试保护，禁用F12开发者工具

## 技术栈

- Next.js 14
- React 18
- TypeScript
- CSS3 动画
- disable-devtool (防调试保护)
- Web Crypto API (真随机数)

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 上导入项目
3. Vercel 会自动检测 Next.js 项目并进行部署

## 使用方法

- 点击骰子或下方按钮开始摇骰子
- 骰子会显示滚动动画，然后显示最终结果
- 支持连续摇骰子，会显示摇骰子的次数和结果

## 项目结构

```
shaizi/
├── app/
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx         # 主页面
├── package.json         # 项目配置
├── next.config.js       # Next.js 配置
├── tsconfig.json        # TypeScript 配置
└── README.md           # 项目说明
```