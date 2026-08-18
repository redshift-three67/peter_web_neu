create table if not exists contact_messages (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  topic text,
  message text not null,
  consent boolean not null default false
);

create table if not exists anamnesis_submissions (
  id text primary key,
  created_at timestamptz not null default now(),
  user_id text,
  payload text not null,
  status text not null default 'received'
);
