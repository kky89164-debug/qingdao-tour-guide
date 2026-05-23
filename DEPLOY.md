# 青岛旅游攻略网页 - Vercel 部署指南

## 🚀 快速部署步骤

### 第一步：在 GitHub 上创建仓库

1. 打开浏览器访问 [GitHub](https://github.com)
2. 点击右上角的 **"+"** 按钮，选择 **"New repository"**
3. 填写仓库信息：
   - **Repository name**: `qingdao-travel-guide`（或您喜欢的名称）
   - **Description**: 青岛旅游攻略网页应用
   - 选择 **Public**（公开仓库）
   - 不要勾选 "Initialize this repository with a README"
4. 点击 **"Create repository"**

### 第二步：连接本地仓库到 GitHub

在终端中运行以下命令（将 `YOUR_USERNAME` 替换为您的 GitHub 用户名）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/qingdao-travel-guide.git
git branch -M main
git push -u origin main
```

系统会提示您登录 GitHub 进行认证。

### 第三步：在 Vercel 上部署

1. 打开浏览器访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录（推荐）或邮箱注册
3. 点击 **"Add New..."** → **"Project"**
4. 在 "Import Git Repository" 页面，找到您刚创建的仓库
5. 点击 **"Import"**
6. 在配置页面：
   - **Framework Preset**: 选择 `Vite`
   - **Root Directory**: `.`（保持默认）
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. 点击 **"Deploy"** 按钮

### 第四步：等待部署完成 ⏱️

Vercel 会自动构建和部署您的网站，通常需要 1-3 分钟。

### 第五步：获取在线网址 🌐

部署成功后，Vercel 会为您提供：
- **Production URL**: 类似 `https://qingdao-travel-guide.vercel.app`
- 这是一个永久可访问的网址！

## ✨ 恭喜！您的网站已上线！

现在您可以将这个网址分享给任何人，他们都能访问您的青岛旅游攻略网页。

## 📝 后续更新

如果需要更新网站内容：

1. 修改代码
2. 提交更改：
   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```
3. Vercel 会自动检测到更新并重新部署

## 🆘 遇到问题？

### GitHub 认证失败
如果您在推送代码时遇到认证问题：
- 确保已登录 GitHub
- 可能需要创建 Personal Access Token
- 在 GitHub → Settings → Developer settings → Personal access tokens 生成新令牌

### Vercel 部署失败
- 检查 Build Command 是否正确
- 查看 Vercel 提供的错误日志
- 确保所有依赖已正确安装

### 其他问题
欢迎随时寻求帮助！

## 📚 项目技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router
- **图标**: Lucide React
- **部署**: Vercel

---

**祝您使用愉快！** 🎉
