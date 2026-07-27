
export const EXTRA_GUEST_FEE = 30;


export function baseOccupancy(room) {
  if (!room) return 2;
  if (room.baseOccupancy) return room.baseOccupancy;
  switch (room.category) {
    case "Single":
      return 1;
    case "Family":
      return 4;
    default:
      return 2;
  }
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const diff = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  return diff > 0 ? Math.round(diff) : 0;
}


export function computeTotal(room, checkIn, checkOut, guests) {
  const nights = nightsBetween(checkIn, checkOut);

  if (!room || nights < 1) {
    return {
      nights,
      base: 0,
      extraGuests: 0,
      extraGuestFeeTotal: 0,
      total: 0,
    };
  }

  const included = baseOccupancy(room);
  const extraGuests = Math.max(0, (Number(guests) || 1) - included);
  const base = room.price * nights;
  const extraGuestFeeTotal = extraGuests * EXTRA_GUEST_FEE * nights;

  return {
    nights,
    base,
    extraGuests,
    extraGuestFeeTotal,
    total: base + extraGuestFeeTotal,
  };
}