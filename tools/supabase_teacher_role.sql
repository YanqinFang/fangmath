-- FangMath: let anyone who signs up as a teacher turn on teacher tools (free for everyone).
-- Run once in Supabase → SQL Editor → New query → paste → Run.
create or replace function public.fm_set_teacher(p_teacher boolean default true)
returns void language sql security definer set search_path = public as $$
  update public.fm_adults set is_teacher = p_teacher where id = auth.uid();
$$;
grant execute on function public.fm_set_teacher(boolean) to authenticated;
