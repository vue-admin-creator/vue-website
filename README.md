# VUE 臻域國際不動產官網

VUE 臻域國際不動產的品牌官網原始碼，包含品牌首頁、展示型建案卡片、預約諮詢入口、社群連結與法定資訊頁面。

## 開發環境

- Node.js 22.13 或更新版本
- npm

## 本機啟動

```bash
npm install
npm run dev
```

開啟終端機顯示的本機網址即可預覽。

## 正式建置

```bash
npm run build
```

## 專案結構

- `app/`：網站頁面、元件與全站樣式
- `public/`：Logo、建案圖片、社群圖示及法定文件
- `worker/`：Cloudflare Worker 進入點
- `vite.config.ts`：網站建置設定

## GitHub

在此資料夾建立 Git repository 後，即可推送至新的 GitHub repository：

```bash
git init
git add .
git commit -m "Initial VUE website"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## 上線前檢查

- 將示範建案文字與圖片換成正式資料
- 確認表單、社群及法定文件連結
- 設定正式網域 `vue.com.tw`
- 依選用的部署平台完成環境與網域設定

© 2026 VUE 臻域國際不動產有限公司
