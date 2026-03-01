-- 更新 users 表，添加 username 和 password 字段
-- 在 Supabase SQL Editor 中执行

-- 添加 username 字段（如果不存在）
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS username VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- 添加索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- 注意：email 字段可以保留，但不再是必填项
-- 如果现有用户没有 username，可以用 email 的前缀作为临时 username

-- 更新现有数据（可选）
-- UPDATE users SET username = SPLIT_PART(email, '@', 1) WHERE username IS NULL;
