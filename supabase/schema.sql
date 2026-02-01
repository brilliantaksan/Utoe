create table if not exists public.students (
  id bigserial primary key,
  user_id text not null default auth.jwt()->>'sub',
  name text not null,
  email text not null,
  location text not null,
  github_url text,
  bio text,
  availability text not null default 'available',
  tech_stack text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id bigserial primary key,
  student_id bigint references public.students(id) on delete cascade,
  title text not null,
  description text not null,
  tech_stack text[] not null default '{}',
  impact text,
  github_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.recruiters (
  id bigserial primary key,
  user_id text not null default auth.jwt()->>'sub',
  name text not null,
  email text not null,
  company_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_candidates (
  id bigserial primary key,
  recruiter_id bigint references public.recruiters(id) on delete cascade,
  student_id bigint references public.students(id) on delete cascade,
  saved_at timestamptz not null default now(),
  notes text
);

alter table public.students enable row level security;
alter table public.projects enable row level security;
alter table public.recruiters enable row level security;
alter table public.saved_candidates enable row level security;

create policy "public read students"
  on public.students for select
  to public
  using (true);

create policy "public read projects"
  on public.projects for select
  to public
  using (true);

create policy "student insert own profile"
  on public.students for insert
  to authenticated
  with check ((auth.jwt()->>'sub') = user_id);

create policy "student update own profile"
  on public.students for update
  to authenticated
  using ((auth.jwt()->>'sub') = user_id);

create policy "student insert own projects"
  on public.projects for insert
  to authenticated
  with check (
    exists (
      select 1 from public.students s
      where s.id = student_id and s.user_id = auth.jwt()->>'sub'
    )
  );

create policy "student update own projects"
  on public.projects for update
  to authenticated
  using (
    exists (
      select 1 from public.students s
      where s.id = student_id and s.user_id = auth.jwt()->>'sub'
    )
  );

create policy "recruiter insert own profile"
  on public.recruiters for insert
  to authenticated
  with check ((auth.jwt()->>'sub') = user_id);

create policy "recruiter update own profile"
  on public.recruiters for update
  to authenticated
  using ((auth.jwt()->>'sub') = user_id);

create policy "recruiter manage saved"
  on public.saved_candidates for all
  to authenticated
  using (
    exists (
      select 1 from public.recruiters r
      where r.id = recruiter_id and r.user_id = auth.jwt()->>'sub'
    )
  )
  with check (
    exists (
      select 1 from public.recruiters r
      where r.id = recruiter_id and r.user_id = auth.jwt()->>'sub'
    )
  );
