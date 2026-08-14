# VUE 建案管理後台使用說明

## 後台網址

正式部署後，開啟：

`https://vue-admin-creator.github.io/vue-website/#/admin`

後台沒有放在官網選單中，請將網址交給獲授權的管理人員。

## 第一次啟用管理員

1. 登入 Supabase Dashboard。
2. 開啟 `vue-admin-creator's Project`。
3. 進入 **Authentication → Users**。
4. 選擇 **Add user → Create new user**。
5. 輸入管理員信箱與一組安全密碼，並勾選自動確認信箱。
6. 將該信箱告訴網站維護者，以加入 `admin_users` 管理員名單。

只有同時存在於 Supabase Auth 與 `admin_users` 名單中的帳號，才能新增、修改、上架或下架建案。

## 新增建案

1. 登入後台。
2. 選擇右上角 **＋ 新增建案**。
3. 填寫中文名稱、英文名稱、城市、標籤、房型、坪數、售價與交屋時間。
4. 上傳 JPG、PNG 或 WebP 圖片，檔案上限為 10MB。
5. 用「排序」控制官網順序；數字越小越前面。
6. 如要立即顯示在官網，勾選 **儲存後立即上架**。
7. 選擇 **儲存建案**。

## 修改建案

1. 在建案列表找到該筆資料。
2. 選擇 **編輯**。
3. 修改資料或重新上傳主圖。
4. 選擇 **儲存建案**。

## 上架與下架

- **上架**：建案會立即出現在官網。
- **下架**：建案會從官網隱藏，但資料仍保留在後台，可日後重新上架。

上下架是資料變更，不需要修改程式、GitHub Commit 或重新部署網站。訪客重新整理官網後即可看到最新狀態。

## 安全注意事項

- 不要共用管理員密碼。
- 人員離職或不再負責時，應立即從 Supabase Authentication 停用或刪除帳號，並移除 `admin_users` 權限。
- 瀏覽器端只使用 Supabase publishable key；高權限 secret/service-role key 未放入網站。
- 資料表與圖片上傳皆有 Row Level Security 保護。
