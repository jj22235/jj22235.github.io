# 个人主页 · GitHub Pages 静态站点

现代极简风格的个人主页与作品集，基于纯静态 **HTML + CSS + JavaScript** 构建，零构建依赖，直接推送到 GitHub Pages 即可生效。

## 目录结构

```text
.
├── index.html             # 首页（个人简介、技能、项目、经历、联系方式）
├── 404.html               # 自定义 404 页面（GitHub Pages 自动生效）
├── .nojekyll              # 禁用 Jekyll 构建，直接托管静态资源
├── README.md              # 使用与部署说明
└── assets/
    ├── css/
    │   └── style.css      # 现代极简样式系统（含明暗主题与响应式布局）
    └── js/
        ├── site-data.js   # 【主要修改文件】全站文案、项目与社交链接配置
        └── main.js        # 页面渲染、明暗主题切换、项目筛选、弹窗与复制交互
```

## 快速定制内容

1. 打开 `assets/js/site-data.js`，修改其中的 `profile`、`socials`、`about`、`skills`、`projects` 与 `timeline`。
2. 如需自定义头像，将图片放入 `assets/images/avatar.jpg`，并在 `site-data.js` 中设置：
   ```js
   avatarUrl: "./assets/images/avatar.jpg",
   ```
3. 如需接入简历链接，在 `profile.resumeUrl` 中填入地址即可自动显示“查看简历”按钮。

## 本地预览

由于是纯静态页面，你可以直接双击 `index.html` 在浏览器中打开，或使用任意本地静态服务器预览：

```powershell
# 使用 Python 3
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

然后在浏览器访问 `http://localhost:8000`。

## 推送到 GitHub Pages

远程仓库地址：`git@github.com:jj22235/jj22235.github.io.git`

```powershell
git add .
git commit -m "chore: update personal homepage"
git push -u origin main
```

推送完成后，等待约 1–2 分钟即可在 `https://maojiajun.site`（或 `https://jj22235.github.io`）访问（确保仓库 `Settings -> Pages` 的部署分支已选择 `main` / `/ (root)`，并保留根目录 `CNAME` 文件）。
