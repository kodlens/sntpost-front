import React, { useEffect, useState } from 'react'
import type { Magazine } from '../../../types/magazine'
import axios from 'axios'
import { config } from '../../../config/config'
import MainLayout from '../../../layouts/MainLayout'
import Loader from '../../../components/Loader'


const MagazinesAll: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [magazines, setMagazines] = useState<Magazine[]>([])


    const loadMagazines = ():void => {
        setLoading(true)
        axios.get<Magazine[]>(`${config.baseUri}/api/magazines/load-magazines`, {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${config.apiToken}`
            }
        }).then(res=>{
            setLoading(false)
            setMagazines(res.data);
        })
    }

    useEffect(()=>{
        loadMagazines()
    },[])

    return (
        <MainLayout>
            <section className='h-screen mx-auto lg:w-[80%]'>
                { loading ? (<Loader />) : (
                    <div className='mt-[100px] flex gap-6 flex-wrap justify-center'>
                    { magazines.map(magazine => (
                        <div key={magazine.id} className='relative'>
                            <div className="h-[300px] w-[300px]" style={{
                                backgroundImage: `url(./storage/magazines/${magazine.cover})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}>
                                <div className='absolute top-0 left-0 text-sm bg-red-900 text-white py-1 px-2'>
                                    {magazine.title}
                                </div>
                            
                            </div>
                            
                        </div>
                    ))}
                    </div>
                )}
            </section>
        </MainLayout>
    )
}

export default MagazinesAll;
