import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/locations/locationsSlice'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";


const LocationsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { locations } = useAppSelector((state) => state.locations)
    

    const { id } = router.query;
    
    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);


    return (
      <>
          <Head>
              <title>{getPageTitle('View locations')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View locations')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/locations/locations-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{locations?.name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={locations?.address} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Latitude</p>
                  <p>{locations?.latitude || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Longitude</p>
                  <p>{locations?.longitude || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={locations?.hours} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phone</p>
                    <p>{locations?.phone}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>City</p>
                    <p>{locations?.city ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Open'>
                    <SwitchField
                      field={{name: 'is_open', value: locations?.is_open}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Reservations Location</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                <th>FullName</th>
                                
                                
                                
                                <th>Email</th>
                                
                                
                                
                                <th>Phone</th>
                                
                                
                                
                                <th>Message</th>
                                
                                
                                
                                <th>ReservationStart</th>
                                
                                
                                
                                <th>ReservationEnd</th>
                                
                                
                                
                                <th>PartySize</th>
                                
                                
                                
                                
                                
                                <th>Status</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {locations.reservations_location && Array.isArray(locations.reservations_location) &&
                              locations.reservations_location.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/reservations/reservations-view/?id=${item.id}`)}>
                                    
                                    
                                    <td data-label="name">
                                        { item.name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="email">
                                        { item.email }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="phone">
                                        { item.phone }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="message">
                                        { item.message }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="reservation_start">
                                        { dataFormatter.dateTimeFormatter(item.reservation_start) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="reservation_end">
                                        { dataFormatter.dateTimeFormatter(item.reservation_end) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="party_size">
                                        { item.party_size }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="status">
                                        { item.status }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!locations?.reservations_location?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/locations/locations-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

LocationsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_LOCATIONS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default LocationsView;