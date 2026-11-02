-- FangMath weekly email: subscriber list (parents & teachers).
-- Run once in Supabase → SQL Editor → New query → paste → Run.
create table if not exists public.fm_subscribers (
  email text primary key,
  role text,
  source text,
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);
alter table public.fm_subscribers enable row level security;   -- nobody can read the list from the website

create or replace function public.fm_subscribe(p_email text, p_role text default '', p_source text default '')
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_email) > 200 then raise exception 'Please enter a valid email.'; end if;
  insert into public.fm_subscribers(email, role, source) values (lower(trim(p_email)), left(p_role, 20), left(p_source, 40))
  on conflict (email) do update set unsubscribed_at = null, role = excluded.role;
end $$;

create or replace function public.fm_unsubscribe(p_email text)
returns void language sql security definer set search_path = public as $$
  update public.fm_subscribers set unsubscribed_at = now() where email = lower(trim(p_email));
$$;

grant execute on function public.fm_subscribe(text, text, text) to anon, authenticated;
grant execute on function public.fm_unsubscribe(text) to anon, authenticated;
