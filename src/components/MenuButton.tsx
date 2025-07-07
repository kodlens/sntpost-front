import { useEffect, useRef, useState } from "react";
import { HamburgerIcon } from "./HamburgerIcon";
import { Link } from "react-router-dom";
import { config } from "../config/config";
import axios from "axios";

interface Category {
    id:number;
    metadata: string;
    slug:string;
    title:string;
    description:string;
    image:string;
    active:number;
}


const MenuButton = () => {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [categories, setCategories] = useState<Category[]>([])
   
   
   
    const loadCategories = () => {
        axios.get<Category[]>(`${config.baseUri}/api/load-categories`, {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setCategories(res.data)
        })
    }

    useEffect(()=>{
        loadCategories()
    },[])


    useEffect(() => {
        function handleClickOutside(event:MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const renderCategories = () => {
        const mappedCategories = categories?.map((category, index) => (
            <Link className="w-full hover:bg-blue-50 px-6 py-1" 
                key={`menu${index}`}
                onClick={()=>{
                    setOpen(false)
                }}
                to={`/category/${category.slug}`}>
                {category.title}
            </Link>
        ))

        mappedCategories.push(
            <Link className="w-full hover:bg-blue-50 px-6 py-1"
                key='archives'
                 onClick={()=>{
                    setOpen(false)
                }}
                to="/archives">
                Archives
            </Link>
        );

        return mappedCategories
    }
    

    return (
        <>
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                className="flex items-center h-full md:ml-4 px-4 hover:bg-blue-200 hover:cursor-pointer transition ease-in-out duration-200"
                onClick={()=>setOpen(!open)}>
                
                <span className="hidden md:inline uppercase font-semibold text-black mr-1">Menu</span>
                <HamburgerIcon />
            </button>

            {/* Dropdown panel */}
            { open && (
                <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-blue-100 ring-opacity-5">
                    <div className="flex flex-col w-[300px] p-4">
                        {renderCategories()}
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default MenuButton