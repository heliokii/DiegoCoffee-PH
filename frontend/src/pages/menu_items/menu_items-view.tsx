import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/menu_items/menu_itemsSlice'
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


const Menu_itemsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { menu_items } = useAppSelector((state) => state.menu_items)
    

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
              <title>{getPageTitle('View menu_items')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View menu_items')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/menu_items/menu_items-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Title</p>
                    <p>{menu_items?.title}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Description</p>
                  {menu_items.description
                    ? <p dangerouslySetInnerHTML={{__html: menu_items.description}}/>
                    : <p>No data</p>
                  }
                </div>
              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>Price</p>
                  <p>{menu_items?.price || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Category</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{menu_items?.category?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Type</p>
                    <p>{menu_items?.item_type ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Photos</p>
                    {menu_items?.photos?.length
                      ? (
                        <ImageField
                          name={'photos'}
                          image={menu_items?.photos}
                          className='w-20 h-20'
                        />
                      ) : <p>No Photos</p>
                    }
                </div>
              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={menu_items?.ingredients} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Featured'>
                    <SwitchField
                      field={{name: 'is_featured', value: menu_items?.is_featured}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='Available'>
                    <SwitchField
                      field={{name: 'is_available', value: menu_items?.is_available}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/menu_items/menu_items-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Menu_itemsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_MENU_ITEMS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default Menu_itemsView;