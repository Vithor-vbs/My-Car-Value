import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor{ // if you give me any class I will be satisfied
    new (...args: any[]): {}
}

// creating custom decorator
export function Serialize(dto: ClassConstructor){
    return UseInterceptors( new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{

    // Apply reusable behavior
    constructor(private dto: any){}
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        //run something before a request is handled by the request handler
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true, // gets only the filds with @Expose()
                })
            }) 
        )
    }
}