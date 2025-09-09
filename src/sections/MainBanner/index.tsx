import './index.css';
import axios from "axios";
import { config } from "../../config/config";
import type { Banner } from "../../types/banner";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from '../../components/ErrorComponent';

const MainBanner: React.FC = () => {

  const { data, error } = useQuery<Banner>({
    queryKey: ['banner'],
    queryFn: async () => {
      const res = await axios.get<Banner>(`${config.baseUri}/api/load-banner`, {
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${config.apiToken}`
        }
      })

      console.log(res);
      return res.data
    }
  });

  
  if(error){
    return <ErrorComponent />
  }

  return (
    <>
      <div className="">
        <img src={`${config.baseUri}/storage/banner_images/${data?.img}`} 
          alt={'Banner'} 
          loading={"lazy"} />
      </div>
    </>
  )
}

export default MainBanner;