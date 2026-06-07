# 世界杯2026 AI分析

## 部署步骤

### 1. 上传到 GitHub
把这个文件夹里所有文件上传到你的 GitHub 仓库。

### 2. 配置 Supabase
- 登录 supabase.com
- 创建新项目
- 进入 SQL Editor，执行 SUPABASE_SETUP.md 里的 SQL
- 在项目设置里找到 URL 和 anon key

### 3. 配置 Vercel
- 登录 vercel.com，连接你的 GitHub 仓库
- 在 Environment Variables 里添加：
  - `NEXT_PUBLIC_SUPABASE_URL` = 你的Supabase URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = 你的Supabase anon key
  - `DEEPSEEK_API_KEY` = 你的DeepSeek API key
  - `ADMIN_SECRET` = 你自己设的管理员密码

### 4. 部署
Vercel 会自动构建并部署，完成后你会得到一个网址。

### 5. 生成分析
访问 `你的网址/admin`，输入管理员密码，点击每场比赛的"生成"按钮。

## 页面说明
- `/` 首页，赛程列表
- `/match/[id]` 比赛详情和AI分析
- `/admin` 管理员后台（生成分析用）
