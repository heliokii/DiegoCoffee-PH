import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/orders/ordersSlice'
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


const OrdersView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { orders } = useAppSelector((state) => state.orders)
    

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
              <title>{getPageTitle('View orders')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View orders')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/orders/orders-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Reference</p>
                    <p>{orders?.reference}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Customer</p>
                    
                    
                        <p>{orders?.customer?.firstName ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              
                <>
                    <p className={'block font-bold mb-2'}>Items</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                    <th>Title</th>
                                
                                
                                
                                
                                
                                    <th>Price</th>
                                
                                
                                
                                
                                
                                    <th>Type</th>
                                
                                
                                
                                
                                
                                    <th>Ingredients</th>
                                
                                
                                
                                    <th>Featured</th>
                                
                                
                                
                                    <th>Available</th>
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {orders.items && Array.isArray(orders.items) &&
                              orders.items.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/menu_items/menu_items-view/?id=${item.id}`)}>
                                  
                                    
                                    
                                    
                                  
                                    
                                    <td data-label="title">
                                        { item.title }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="price">
                                        { item.price }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="item_type">
                                        { item.item_type }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="ingredients">
                                        { item.ingredients }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="is_featured">
                                        { dataFormatter.booleanFormatter(item.is_featured) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="is_available">
                                        { dataFormatter.booleanFormatter(item.is_available) }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!orders?.items?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Total</p>
                  <p>{orders?.total || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Status</p>
                    <p>{orders?.status ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='PickupTime'>
                    {orders.pickup_time ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={orders.pickup_time ?
                        new Date(
                          dayjs(orders.pickup_time).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No PickupTime</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Paid'>
                    <SwitchField
                      field={{name: 'paid', value: orders?.paid}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>StripeCharge</p>
                    <p>{orders?.stripe_charge}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/orders/orders-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

OrdersView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_ORDERS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default OrdersView;