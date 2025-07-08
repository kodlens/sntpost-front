import AppLogo from "../AppLogo";
import MenuButton from "../MenuButton";
import MagnifyGlass from "./MagnifyGlass";
import Search from "./Search";

const MainHeader = () => {
    return (
        <>
            <div className="h-4 bg-blue-primary"></div>
            <div className="shadow-sm py-6">
                <div className="flex px-4 w-full md:max-w-7xl md:mx-auto">
                    <div>
                        <AppLogo />
                    </div>


                    <div className="ml-auto flex">
                        <div className="h-full items-center hidden md:flex">
                            <Search />
                        </div>
                        
                        <div className="h-full relative">
                           <MagnifyGlass />
                        </div>

                        <div>
                            <MenuButton />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default MainHeader