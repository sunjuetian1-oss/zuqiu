# Supabase 数据库初始化

在 Supabase 后台的 SQL Editor 中执行以下语句：

```sql
create table analyses (
  id uuid default gen_random_uuid() primary key,
  match_id text not null unique,
  data jsonb not null,
  created_at timestamptz default now()
);

-- 开放读取权限（所有用户可以读分析数据）
alter table analyses enable row level security;

create policy "允许所有人读取"
  on analyses for select
  using (true);

create policy "只允许服务端写入"
  on analyses for insert
  with check (true);

create policy "允许更新"
  on analyses for update
  using (true);
```
