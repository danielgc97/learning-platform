-- Permite ejercicios de opción múltiple (type = 'quiz').
alter table exercises drop constraint exercises_type_check;
alter table exercises
  add constraint exercises_type_check check (type in ('sql', 'python', 'agent', 'quiz'));
