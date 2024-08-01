import { Expose, Transform } from "class-transformer";

export class ReportDto { // pick a report entity instance and convert it to this object 

    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    year: number;
    @Expose()
    mileage: number;
    @Expose()
    lng:number;
    @Expose()
    lat: number;
    @Expose()
    price: number;
    @Expose()
    approved: boolean;

    @Transform(({obj}) => obj.user.id) //generate new property that will pull information from the original report
    @Expose()
    userId: number;
}