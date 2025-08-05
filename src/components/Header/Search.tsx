import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
    
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate(); // This should work now

    // const keyParam: string | any | unknown = useParams().search;


    // useEffect(()=> {
    //     setSearch(keyParam)
    // }, [])

    const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Enter') {
            if(search){
                navigate('/search/' + search);
            }
            // Redirect to another page when Enter is pressed
        }
    };

    
    return (
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" name=""
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search" id="" />
    )
}

export default Search;