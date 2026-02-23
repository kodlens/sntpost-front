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
        <input className="block w-full rounded-full border border-[#c7dced] bg-white px-4 py-2.5 text-sm text-[#123b60] outline-none transition focus:border-[#0D4E86] focus:ring-2 focus:ring-[#0D4E86]/15" type="text" name=""
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search stories, topics, and updates" id="" />
    )
}

export default Search;
