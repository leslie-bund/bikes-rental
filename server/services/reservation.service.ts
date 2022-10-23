import Reservations from "../repos/reservations";

interface Ifilter {
    [k: string]: string | Date | Ifilter | number | unknown;
}

class ReservationService {
  // Cancel a reservation
  static async cancel(reservationId: string) {
    const query = { _id: reservationId };
    return await Reservations._delete(query);
  }

  // Get reservations by single user
  static async userReserved(userId: string) {
    return await Reservations.getAll({ user_id: userId });
  }

  // Add a reservation with date and bikeId
  static async reserveBike(
    start: string | Date,
    end: string | Date,
    user_id: string,
    bike_id: string
  ) {
    const newEntity = {
      startDate: start,
      endDate: end,
      user_id,
      bike_id,
    };
    const reserved = await Reservations.add(newEntity as unknown as Ifilter);
    if(reserved){
      const doc = await Reservations.getOne(newEntity);
      if(doc){
        return doc;
      }
    }
    return null; 
  }

  // View all reservations
  static async viewAllReservation() {
    return await Reservations.allReservations();
  }

  // Users reserved and Dates
  static async viewAllUserReservations() {
    return await Reservations.allUsersReservationAndDates();
  }

  // Bikes reserved and Dates
  static async viewAllBikeReservations() {
    return await Reservations.allBikesReservationAndDates();
  }
}

export default ReservationService;
