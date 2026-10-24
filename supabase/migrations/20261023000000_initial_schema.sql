-- Contenido: Curso -> Módulo -> Lección -> Ejercicio
create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  slug text not null,
  title text not null,
  position int not null default 0,
  unique (course_id, slug)
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  slug text not null,
  title text not null,
  content_md text not null default '',
  position int not null default 0,
  unique (module_id, slug)
);

create table exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  slug text not null unique,
  type text not null check (type in ('sql', 'python', 'agent')),
  statement text not null,
  starter_code text not null default '',
  -- dataset, tests, rubric y hints del ejercicio (ver formato YAML en el SPEC)
  spec jsonb not null default '{}'::jsonb,
  position int not null default 0
);

-- Actividad de cada usuario (los usuarios viven en auth.users, gestionado por Supabase Auth)
create table submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete cascade,
  code text not null,
  passed boolean not null,
  created_at timestamptz not null default now()
);
create index submissions_user_exercise_idx on submissions (user_id, exercise_id);

create table progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, exercise_id)
);

-- Una fila por llamada a la IA: sirve para el límite diario y para medir el costo real
create table feedback_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  submission_id uuid references submissions(id) on delete set null,
  model text not null,
  input_tokens int not null,
  output_tokens int not null,
  cost_usd numeric(10, 6) not null,
  latency_ms int,
  created_at timestamptz not null default now()
);
create index feedback_events_user_day_idx on feedback_events (user_id, created_at);

-- Seguridad: solo el backend (con la service key) accede a los datos.
-- RLS activado sin políticas = nadie puede leerlas directo con la clave pública.
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table exercises enable row level security;
alter table submissions enable row level security;
alter table progress enable row level security;
alter table feedback_events enable row level security;
