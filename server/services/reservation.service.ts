import Reservations from "../repos/reservations";

class ReservationService {

    // Cancel a reservation
    async cancel(reservationId: string){
        const query = { _id: reservationId }
        return await Reservations._delete(query);
    }

    // Add a reservation with date and bikeId
    async reserveBike(start: string, end: string, user_id: string, bike_id: string){
        const newEntity = {
            startDate: start,
            endDate: end,
            user_id,
            bike_id
        }
        return await Reservations.add(newEntity as unknown as Ifilter)
    }

    // View all reservations
    async viewAllReservation(){
        return await Reservations.allReservations()
    }

    // Users reserved and Dates
    async viewAllUserReservations(){
        return await Reservations.allUsersReservationAndDates()
    }

    // Bikes reserved and Dates
    async viewAllBikeReservations(){
        return await Reservations.allBikesReservationAndDates()
    }
}

export default ReservationService