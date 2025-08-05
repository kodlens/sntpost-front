import './index.css'
import { useNavigate } from "react-router-dom";

const MagnifyGlass: React.FC = () =>{
    const navigate = useNavigate(); // This should work now

    
    const handleModal = () => {
        // if(isModalOpen)
        //     setIsModalOpen(false)
        // else
        //     setIsModalOpen(true)

       const div:any = document.getElementById('search');
        div.classList.toggle('show');
    }

    const handleSearch = () => {
        const search:any = document.getElementById('searchtext');
        navigate('/search/' + search.value);
        handleModal()
    }


    const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Enter') {
        const search:any = document.getElementById('searchtext');

            if(search){
                navigate('/search/' + search.value);
                handleModal()
            }
            // Redirect to another page when Enter is pressed
        }
    };



    return (
        <>
            <button onClick={handleModal} className="md:hidden flex items-center ml-4 h-full py-2 px-4 hover:bg-gray-100 transition ease-in-out duration-200">
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    width="25px" height="25px" viewBox="0 0 49.999 49.999">
                <g>
                    <g>
                        <path d="M48.681,42.295l-8.925-8.904c-0.045-0.045-0.098-0.078-0.145-0.11c-0.802,1.233-1.761,2.405-2.843,3.487
                            c-1.081,1.082-2.255,2.041-3.501,2.845c0.044,0.046,0.077,0.1,0.122,0.144l8.907,8.924c1.763,1.76,4.626,1.758,6.383,0
                            C50.438,46.921,50.439,44.057,48.681,42.295z"/>
                        <path d="M35.496,6.079C27.388-2.027,14.198-2.027,6.089,6.081c-8.117,8.106-8.118,21.306-0.006,29.415
                            c8.112,8.105,21.305,8.105,29.413-0.001C43.604,27.387,43.603,14.186,35.496,6.079z M9.905,31.678
                            C3.902,25.675,3.904,15.902,9.907,9.905c6.003-6.002,15.77-6.002,21.771-0.003c5.999,6,5.997,15.762,0,21.774
                            C25.676,37.66,15.91,37.682,9.905,31.678z"/>
                        <path d="M14.18,22.464c-0.441-1.812-2.257-4.326-3.785-3.525c-1.211,0.618-0.87,3.452-0.299,5.128
                            c2.552,7.621,11.833,9.232,12.798,8.268C23.843,31.387,15.928,29.635,14.18,22.464z"/>
                    </g>
                </g>
                </svg>
            </button>

           

            <div className="search-modal" id="search">
                <div className="flex flex-col">
                    <button className="text-white ml-auto px-4 py-2 ease-in-out duration-500 hover:bg-gray-300 hover:text-black font-bold text-sm z-10" onClick={handleModal}>X</button>
                    
                    <div className="mx-4 h-screen flex justify-center m-[-30px]">
                        <div className="flex items-center search w-full">
                            <input type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-0 focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Search" maxLength={100} id="searchtext" onKeyDown={handleKeyDown}/>
                            <button className="px-2 text-sm font-bold bg-white" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MagnifyGlass;