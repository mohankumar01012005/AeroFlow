DO $$
DECLARE
    current_day DATE := CURRENT_DATE;
    end_day DATE := CURRENT_DATE + INTERVAL '30 days';
BEGIN
    WHILE current_day <= end_day LOOP

        -- DELHI → MUMBAI
        INSERT INTO flights (
            flight_no,
            origin,
            destination,
            departs_at,
            arrives_at,
            aircraft_type,
            total_seats,
            base_price,
            status
        )
        VALUES
        (
            'AF101',
            'Delhi',
            'Mumbai',
            current_day + TIME '08:00',
            current_day + TIME '10:10',
            'Airbus A320',
            60,
            4500,
            'boarding'
        ),
        (
            'AF102',
            'Delhi',
            'Mumbai',
            current_day + TIME '18:30',
            current_day + TIME '20:40',
            'Boeing 737',
            60,
            5200,
            'scheduled'
        );

        -- MUMBAI → DELHI
        INSERT INTO flights (
            flight_no,
            origin,
            destination,
            departs_at,
            arrives_at,
            aircraft_type,
            total_seats,
            base_price,
            status
        )
        VALUES
        (
            'AF201',
            'Mumbai',
            'Delhi',
            current_day + TIME '09:00',
            current_day + TIME '11:15',
            'Airbus A320',
            60,
            4700,
            'scheduled'
        ),
        (
            'AF202',
            'Mumbai',
            'Delhi',
            current_day + TIME '19:00',
            current_day + TIME '21:20',
            'Boeing 737',
            60,
            5400,
            'delayed'
        );

        current_day := current_day + INTERVAL '1 day';
    END LOOP;
END $$;