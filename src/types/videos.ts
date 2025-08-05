export interface Videos {
    id: number;
     data(data: any): unknown;
    title:string;
    link:string;
    is_featured:number;
    active:number;
    created_at:Date;
    updated_at:Date;
}
