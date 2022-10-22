import Bikes from "../repos/bikes";

class BikeService {
    // Create a bike and return the created bike
    async createBike(input: Omit<IBike, 'rating'>){
        const bikeAdded = await Bikes.add(input as unknown as Ifilter);
        if(bikeAdded){
            const doc = await Bikes.getOne(input);
            return doc;
        }
    }

    // Rate a bike
    async rateBike(rating: number,bikeId: string){
        return await Bikes.rateBike(rating, bikeId)
    }

    // Edit a bike using input and return newly edited document
    async edit(input: IBike, bikeId: string){
        return await Bikes.update(bikeId, input as unknown as Ifilter)
    }

    // Delete the user account
    async delete(bikeId: string){
        return await Bikes._delete({ _id: bikeId })
    }
}

export default BikeService