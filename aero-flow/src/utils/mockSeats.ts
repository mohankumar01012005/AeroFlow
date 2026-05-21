export type SeatStatus =
  | "available"
  | "booked"
  | "selected";

export interface Seat {
  id: string;

  row: string;

  col: number;

  status: SeatStatus;
}

export const ROWS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];

const BOOKED = new Set([
  "A3",
  "B5",
  "C3",
  "C4",
  "D6",
  "E3",
  "E4",
  "E5",
  "G4",
  "G5",
  "G6",
  "H2",
  "I5",
  "J3",
  "K1",
  "L6",
  "M2",
  "M4",
  "N3",
  "O2",
  "P4",
  "P5",
]);

export function generateSeats(): Seat[] {
  const seats: Seat[] = [];

  ROWS.forEach((row) => {
    for (let col = 1; col <= 6; col++) {
      const id = `${row}${col}`;

      seats.push({
        id,
        row,
        col,
        status: BOOKED.has(id)
          ? "booked"
          : "available",
      });
    }
  });

  return seats;
}