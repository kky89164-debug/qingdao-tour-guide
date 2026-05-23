# 🚀 青岛旅游攻略 - 极速部署指南

## 最简单的部署方法（3步搞定！）

### 第一步：在 GitHub 上创建仓库（1分钟）

1. **打开 GitHub**：https://github.com/new
2. **填写信息**：
   - Repository name: `qingdao-travel-guide`
   - 选择 **Public**
   - **不**勾选任何初始化选项
   - 点击 **"Create repository"**

3. **推送到 GitHub**（在终端运行）：
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/qingdao-travel-guide.git
git branch -M main
git push -u origin main
```

### 第二步：在 Vercel 上部署（2分钟）

1. **打开 Vercel**：https://vercel.com/new
2. **导入项目**：
   - 点击 **"Import"** 您刚创建的 GitHub 仓库
   - 配置页面：
     - Framework Preset: 选择 **Vite**
     - Build Command: `npm run build`（自动填充）
     - Output Directory: `dist`（自动填充）
3. **点击 "Deploy"** → 等待 1-2 分钟 ✨

### 第三步：完成！

部署成功后，您会获得一个永久网址，类似：
`https://qingdao-travel-guide.vercel.app`

---

## 🎯 超简单的网页版部署（推荐！）

### 方式A：使用 Vercel Dashboard（最简单）

1. 先把代码推送到 GitHub（见上）
2. 访问 https://vercel.com/new
3. 点击 "Import" 导入仓库
4. 点击 "Deploy"，就这么简单！

### 方式B：使用 Vercel CLI（如果您想手动操作）

如果您想在本地操作，需要先完成登录：

```bash
# 1. 在终端运行
npx vercel login

# 2. 选择用 GitHub 登录（会打开浏览器）
# 3. 在浏览器中授权
# 4. 然后运行部署
npx vercel --prod
```

---

## 📝 项目特点

- ✅ 已准备好所有 Vercel 配置
- ✅ 响应式设计
- ✅ SEO 友好
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 永久免费

---

## 💡 提示

1. **如果需要修改内容**：
   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```
   Vercel 会自动重新部署！

2. **绑定自定义域名**：部署后在 Vercel 设置中配置

---

**祝您部署顺利！** 🌊✨
