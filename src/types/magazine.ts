export interface Magazine {
    id:number;
    cover:string;
    slug:string;
    title:string;
    magazine_path: string;
    quarter:number;
    excerpt:string;
    year:number;
    is_featured:number;
    created_at:Date;
    updated_at:Date;
    data(data: any): unknown;
}