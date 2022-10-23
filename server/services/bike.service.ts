import Bikes from "../repos/bikes";


interface IBike {
    model?: string;
    color?: string;
    location?: string;
    rating?: number | string;
}
interface Ifilter {
    [k: string]: string | Date | Ifilter | number | unknown;
}

class BikeService {
    // Create a bike and return the created bike
    static async createBike(input: Omit<IBike, 'rating'>){
        const bikeAdded = await Bikes.add(input as unknown as Ifilter);
        if(bikeAdded){
            const doc = await Bikes.getOne<IBike>(input);
            return doc;
        }
    }

    // All available bikes [for specified date]
    static async availableByDate(date: string){
        return await Bikes.emptyBikesForDate(date)
    }

    // View Single bike
    static async viewBike(bikeId: string){
        return await Bikes.getOne<IBike>({ _id: bikeId })
    }

    // Rate a bike
    static async rateBike(rating: number,bikeId: string){
        return await Bikes.rateBike(rating, bikeId)
    }

    // Edit a bike using input and return newly edited document
    static async edit(input: IBike, bikeId: string){
        return await Bikes.update(bikeId, input as unknown as Ifilter)
    }

    // Delete the bike
    static async delete(bikeId: string){
        return await Bikes._delete({ _id: bikeId })
    }
}

export default BikeService