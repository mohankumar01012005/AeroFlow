export function calculateDuration(
  departure: string,
  arrival: string
) {
  const departureTime = new Date(departure).getTime();

  const arrivalTime = new Date(arrival).getTime();

  const difference = arrivalTime - departureTime;

  const hours = Math.floor(difference / (1000 * 60 * 60));

  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `${hours}h ${minutes}m`;
}