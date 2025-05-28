export interface Banner {
    name:string;
    description:string;
    active:number;
    img:string;
    data(data: any): unknown;
}