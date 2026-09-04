# vue-tech-demo
> English version please see [README‑en.md](./README-en.md)

> 技术演示项目：沉淀过往工作中的Vue3工程化实践、通用组件封装方案，无任何公司业务代码。

## 🛠 技术栈
Vue3 + TypeScript + Vite + Pinia + VueRouter + ESLint/Prettier + Axios + ECharts

## ✨ 实现能力
1. 工程化：完整ESLint+Prettier代码规范、husky提交校验；Axios拦截器封装；Pinia状态管理；路由守卫鉴权模拟；开发代理配置
2. 通用组件：虚拟滚动大数据表格、ECharts封装图表、弹窗、文件上传、分页组件；全部TS类型约束
3. 性能实践：路由懒加载、图片懒加载、防抖节流工具函数

## 🚀 快速运行

```bash
pnpm install
pnpm dev
```

打包构建：

```bash
pnpm build
pnpm preview
```

## 📁 目录结构

```
vue-tech-demo
├── .husky              # git hooks
├── .vscode             # 编辑器配置
├── public              # 静态资源
├── src
│   ├── api             # axios封装 + 本地mock数据
│   ├── assets          # 全局样式、图片
│   ├── components      # 通用组件（base / business / demo-pages）
│   ├── composables     # 组合式函数（防抖节流、图片懒加载）
│   ├── router          # 路由 + 守卫鉴权
│   ├── store           # Pinia 状态管理
│   ├── utils           # 工具函数
│   ├── views           # 页面
│   ├── App.vue
│   └── main.ts
├── .eslintrc.cjs
├── .prettierrc
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📝 说明

本项目纯技术Demo，无任何公司业务代码，全部使用本地mock数据。任何人 `clone` 之后执行 `pnpm install && pnpm dev` 即可直接运行查看全部效果。
