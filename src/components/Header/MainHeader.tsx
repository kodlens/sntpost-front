import AppLogo from "../AppLogo";
import MenuButton from "../MenuButton";
import MagnifyGlass from "./MagnifyGlass";
import Search from "./Search";

const MainHeader = () => {
    return (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
            <div className="h-1 bg-gradient-to-r from-[#0D4E86] via-[#2D79D3] to-[#80CAEE]" />
            <div className="border-b border-[#e2ebf4] shadow-[0_2px_12px_rgba(16,50,82,0.06)]">
                <div className="mx-auto flex w-full max-w-[1240px] items-center gap-4 px-4 py-4 lg:px-8">
                    <div className="shrink-0">
                        <AppLogo />
                    </div>

                    <div className="hidden min-w-0 lg:block">
                        <p className="line-clamp-1 text-xs font-semibold tracking-[0.12em] text-[#5c7d9d] uppercase">
                            Science and Technology Stories
                        </p>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <div className="hidden min-w-[320px] lg:block">
                            <Search />
                        </div>

                        <div className="h-full">
                            <MagnifyGlass />
                        </div>

                        <div>
                            <MenuButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default MainHeader
