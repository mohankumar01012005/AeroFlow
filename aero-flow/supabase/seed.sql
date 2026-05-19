insert into flights (
  flight_no,
  origin,
  destination,
  departs_at,
  arrives_at,
  aircraft_type,
  status,
  base_price
)
values
  (
    'AF101',
    'Delhi',
    'Mumbai',
    '2026-06-01 08:00:00+05:30',
    '2026-06-01 10:10:00+05:30',
    'Airbus A320',
    'scheduled',
    4500.00
  ),
  (
    'AF102',
    'Delhi',
    'Mumbai',
    '2026-06-01 18:30:00+05:30',
    '2026-06-01 20:40:00+05:30',
    'Boeing 737',
    'scheduled',
    5200.00
  ),
  (
    'AF201',
    'Mumbai',
    'Delhi',
    '2026-06-02 07:15:00+05:30',
    '2026-06-02 09:25:00+05:30',
    'Airbus A320',
    'scheduled',
    4700.00
  ),
  (
    'AF202',
    'Mumbai',
    'Delhi',
    '2026-06-02 19:00:00+05:30',
    '2026-06-02 21:10:00+05:30',
    'Boeing 737',
    'scheduled',
    5300.00
  ),
  (
    'AF301',
    'Delhi',
    'Bangalore',
    '2026-06-03 06:45:00+05:30',
    '2026-06-03 09:35:00+05:30',
    'Airbus A321',
    'scheduled',
    6200.00
  ),
  (
    'AF302',
    'Delhi',
    'Bangalore',
    '2026-06-03 17:20:00+05:30',
    '2026-06-03 20:10:00+05:30',
    'Airbus A320',
    'scheduled',
    6800.00
  ),
  (
    'AF401',
    'Bangalore',
    'Delhi',
    '2026-06-04 09:00:00+05:30',
    '2026-06-04 11:50:00+05:30',
    'Airbus A321',
    'scheduled',
    6400.00
  ),
  (
    'AF402',
    'Bangalore',
    'Delhi',
    '2026-06-04 21:15:00+05:30',
    '2026-06-05 00:05:00+05:30',
    'Airbus A320',
    'scheduled',
    7000.00
  );





  insert into seats (
  flight_id,
  seat_number,
  class,
  is_available,
  extra_fee
)
select
  f.id,
  row_no::text || seat_letter as seat_number,
  case
    when row_no between 1 and 2 then 'first'::seat_class
    when row_no between 3 and 6 then 'business'::seat_class
    else 'economy'::seat_class
  end as class,
  true as is_available,
  case
    when row_no between 1 and 2 then 5000.00
    when row_no between 3 and 6 then 2500.00
    else 0.00
  end as extra_fee
from flights f
cross join generate_series(1, 30) as row_no
cross join unnest(array['A', 'B', 'C', 'D', 'E', 'F']) as seat_letter
where f.flight_no in (
  'AF101',
  'AF102',
  'AF201',
  'AF202',
  'AF301',
  'AF302',
  'AF401',
  'AF402'
);