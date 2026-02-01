import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/promotions/promotionsSlice'
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


const PromotionsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { promotions } = useAppSelector((state) => state.promotions)
    

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
              <title>{getPageTitle('View promotions')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View promotions')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/promotions/promotions-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Title</p>
                    <p>{promotions?.title}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Description</p>
                  {promotions.description
                    ? <p dangerouslySetInnerHTML={{__html: promotions.description}}/>
                    : <p>No data</p>
                  }
                </div>
              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='StartDate'>
                    {promotions.start ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={promotions.start ?
                        new Date(
                          dayjs(promotions.start).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No StartDate</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='EndDate'>
                    {promotions.end ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={promotions.end ?
                        new Date(
                          dayjs(promotions.end).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No EndDate</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Banner</p>
                    {promotions?.banner?.length
                      ? (
                        <ImageField
                          name={'banner'}
                          image={promotions?.banner}
                          className='w-20 h-20'
                        />
                      ) : <p>No Banner</p>
                    }
                </div>
              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Active'>
                    <SwitchField
                      field={{name: 'active', value: promotions?.active}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Discount</p>
                  <p>{promotions?.discount || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/promotions/promotions-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

PromotionsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_PROMOTIONS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default PromotionsView;