export type Seat = {
  id: string;

  label: string;

  occupied: boolean;
};

export function generateSeats() {
  const rows = 10;

  const seatLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const seats: Seat[] = [];

  for (let row = 1; row <= rows; row++) {
    for (const letter of seatLetters) {
      seats.push({
        id: `${row}${letter}`,

        label: `${row}${letter}`,

        occupied:
          Math.random() < 0.3,
      });
    }
  }

  return seats;
}