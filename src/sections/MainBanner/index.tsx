import React, { useEffect, useState } from "react";

import './index.css';
import axios from "axios";
import { config } from "../../config/config";
import type { Banner } from "../../types/banner";
import Loader from "../../components/Loader";

const MainBanner: React.FC = () => {

  const [banner, setBanner] = useState<Banner>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadMainBanner = () => {
    setLoading(true)
    axios.get(`${config.baseUri}/api/load-banner`, {
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${config.apiToken}`
      }
    }).then(res => {
      setBanner(res.data.img)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      throw err
    })
  }

  useEffect(() => {
    loadMainBanner()
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mb-0">
          <img src={`${config.baseUri}/storage/banner_images/${banner}`} />
        </div>
      )}
    </>
  )
}

export default MainBanner;