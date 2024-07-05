# 如何创建 Monorepo 项目

## 初始化项目

```shell
mkdir my-monorepo
cd my-monorepo
pnpm init
```

## 配置 pnpm-workspace.yaml

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

## 创建项目

### Vue 项目

```shell
mkdir -p packages/vue-app # 创建文件夹 -p 表示没有 packages 文件夹也同步创建
cd packages/vue-app

pnpm create vite@latest
```

### React 项目

```shell
mkdir -p packages/react-app # 创建文件夹 -p 表示没有 packages 文件夹也同步创建
cd packages/react-app

pnpm create vite@latest
```

## 安装和链接依赖

```shell
pnpm i
```

### 示例文件结构

```shell
my-monorepo/
├── apps/
│ ├── react-app/
│ │ ├── package.json
│ │ ├── src/
│ │ ├── public/
│ │ └── vite.config.js
│ └── vue-app/
│   ├── package.json
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── pnpm-workspace.yaml
└── package.json
```

## git 管理

```shell
git init
```

添加 `.gitignore` 文件

```shell
# Node modules
node_modules/
**/node_modules/

# Logs
logs/
*.log
npm-debug.log*
pnpm-debug.log*

# Build outputs
dist/
**/dist/
build/
**/build/

# Vite cache
.vite/
**/.vite/

# System files
.DS_Store
Thumbs.db

# IDE/editor specific files
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Temporary files
tmp/
temp/
*.tmp
*.temp

# Generated files
*.bak
*.backup
*.orig
*.rej

# Ignore packages in pnpm workspace
# apps/react-app/node_modules
# apps/vue-app/node_modules
```

## 启动项目

```shell
pnpm --filter vue-app dev
pnpm --filter react-app dev
```
