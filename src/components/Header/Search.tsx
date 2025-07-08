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
        <input className="rounded-lg" type="text" name="" 
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search" id="" />
    )
}

export default Search;