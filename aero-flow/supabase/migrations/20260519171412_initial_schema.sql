create type booking_status as enum (
  'confirmed',
  'cancelled',
  'rescheduled'
);

create type flight_status as enum (
  'scheduled',
  'delayed',
  'cancelled',
  'boarding',
  'departed'
);

create type seat_class as enum (
  'economy',
  'business',
  'first'
);




create table flights (
  id uuid primary key default gen_random_uuid(),

  flight_no text not null unique,

  origin text not null,
  destination text not null,

  departs_at timestamptz not null,
  arrives_at timestamptz not null,

  aircraft_type text not null,

  status flight_status not null default 'scheduled',

  base_price numeric(10,2) not null check (base_price >= 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (origin <> destination),
  check (arrives_at > departs_at)
);



create index idx_flights_route
on flights(origin, destination);

create index idx_flights_departure
on flights(departs_at);


alter table flights enable row level security;


create or replace function update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_flights_updated_at
before update on flights
for each row
execute function update_updated_at_column();








create table seats (
  id uuid primary key default gen_random_uuid(),

  flight_id uuid not null references flights(id) on delete cascade,

  seat_number text not null check (length(trim(seat_number)) > 0),

  class seat_class not null,

  is_available boolean not null default true,

  extra_fee numeric(10,2) not null default 0 check (extra_fee >= 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique(flight_id, seat_number),
  unique(flight_id, id)
);






create index idx_seats_flight_id
on seats(flight_id);

create index idx_seats_availability
on seats(is_available);



alter table seats enable row level security;





create trigger update_seats_updated_at
before update on seats
for each row
execute function update_updated_at_column();





create table bookings (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users(id) on delete cascade,

  flight_id uuid not null references flights(id) on delete restrict,

  seat_id uuid not null,

  status booking_status not null default 'confirmed',

  booked_at timestamptz not null default now(),

  total_price numeric(10,2) not null check (total_price >= 0),

  pnr_code text not null unique check (length(trim(pnr_code)) >= 6),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);



alter table bookings
add constraint bookings_flight_seat_fk
foreign key (flight_id, seat_id)
references seats(flight_id, id)
on delete restrict;



create index idx_bookings_user_id
on bookings(user_id);

create index idx_bookings_flight_id
on bookings(flight_id);

create index idx_bookings_status
on bookings(status);




alter table bookings enable row level security;



create trigger update_bookings_updated_at
before update on bookings
for each row
execute function update_updated_at_column();






create table passengers (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null references bookings(id) on delete cascade,

  full_name text not null check (length(trim(full_name)) >= 2),

  passport_no text not null check (length(trim(passport_no)) >= 6),

  nationality text not null check (length(trim(nationality)) >= 2),

  dob date not null check (dob < current_date),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


alter table passengers
add constraint unique_booking_passport
unique (booking_id, passport_no);

create index idx_passengers_booking_id
on passengers(booking_id);



alter table passengers enable row level security;



create trigger update_passengers_updated_at
before update on passengers
for each row
execute function update_updated_at_column();





create table reschedules (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null references bookings(id) on delete cascade,

  old_flight_id uuid not null references flights(id) on delete restrict,

  new_flight_id uuid not null references flights(id) on delete restrict,

  requested_at timestamptz not null default now(),

  fee_charged numeric(10,2) not null default 0
  check (fee_charged >= 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (old_flight_id <> new_flight_id)
);







create index idx_reschedules_booking_id
on reschedules(booking_id);

create index idx_reschedules_old_flight
on reschedules(old_flight_id);

create index idx_reschedules_new_flight
on reschedules(new_flight_id);




alter table reschedules enable row level security;


create trigger update_reschedules_updated_at
before update on reschedules
for each row
execute function update_updated_at_column();


-- =========================================
-- RLS Policies
-- =========================================

create policy "Users can view their own bookings"
on bookings
for select
using (auth.uid() = user_id);