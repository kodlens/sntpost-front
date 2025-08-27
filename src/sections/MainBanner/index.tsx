import './index.css';
import axios from "axios";
import { config } from "../../config/config";
import type { Banner } from "../../types/banner";
import Loader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query";

const MainBanner: React.FC = () => {

    const { data, isFetching } = useQuery<Banner>({
        queryKey: ['videos'],
        queryFn: async () => {
          const res = await axios.get(`${config.baseUri}/api/load-banner`, {
            headers: {
              Accept: 'application/json',
              'Authorization': `Bearer ${config.apiToken}`
            }
          })
          return res.data
        }
    });

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="mb-0">
          <img src={`${config.baseUri}/storage/banner_images/${data?.img}`} alt={'Banner'} loading={"lazy"} />
        </div>
        // <div className="h-[calc(100vh-70px)] transform transition-transform duration-500 ease-in-out group-hover:scale-110" style={{
        //   backgroundImage: `url(${config.baseUri}/storage/banner_images/${banner})`,
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   borderRadius: '0',
        // }}></div>
      )}
    </>
  )
}

export default MainBanner;