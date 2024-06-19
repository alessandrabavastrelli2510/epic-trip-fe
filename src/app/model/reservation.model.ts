import { RestaurantCheckIns } from "./restaurant-check-in.model";

export interface ReservationModel{
    id? : number;
    packageId : number;
    userId? : number;
    peopleCount: number;
    cost: number;
    creationDate: Date;
    startDate: Date;
    guideId : number;
    startPerformanceDate : Date;
    endPerformanceDate : Date;
    hotelId : number;
    restaurantCheckIns: RestaurantCheckIns[]; 
}