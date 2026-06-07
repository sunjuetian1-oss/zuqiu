# Supabase建表SQL

在Supabase后台 SQL Editor 执行：

```sql
create table analyses (
  id uuid default gen_random_uuid() primary key,
  match_id text not null unique,
  data jsonb not null,
  created_at timestamptz default now()
);

alter table analyses enable row level security;

create policy "允许所有人读取" on analyses for select using (true);
create policy "允许写入" on analyses for insert with check (true);
create policy "允许更新" on analyses for update using (true);
```
