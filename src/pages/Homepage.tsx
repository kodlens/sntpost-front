import MainLayout from "../layouts/MainLayout";
import MainBanner from "../sections/MainBanner";
import FeaturedArticles from "../sections/FeaturedArticles";
import LatestArticles from "../sections/LatestArticles";
import MagazineSlider from "../sections/MagazineSlider";
import FeaturedMagazine from "../sections/FeaturedMagazine";
import FeaturedVideoTwoLayout from "../sections/FeaturedVideoTwoLayout";
import NewsLetter from "../sections/NewsLetter";
import DostV from "../sections/Dostv";

const Homepage: React.FC = () => {

    return (
        <>
            <MainLayout>
                
                <MainBanner />

                <FeaturedArticles />

                <LatestArticles />

                <FeaturedMagazine />
                
                <MagazineSlider />

                <DostV />

                <FeaturedVideoTwoLayout />

                <NewsLetter />


            </MainLayout>
        </>
    )
};

export default Homepage;
