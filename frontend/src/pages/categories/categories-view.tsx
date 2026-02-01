import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/categories/categoriesSlice'
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


const CategoriesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { categories } = useAppSelector((state) => state.categories)
    

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
              <title>{getPageTitle('View categories')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View categories')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/categories/categories-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{categories?.name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={categories?.description} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Icon</p>
                    {categories?.icon?.length
                      ? (
                        <ImageField
                          name={'icon'}
                          image={categories?.icon}
                          className='w-20 h-20'
                        />
                      ) : <p>No Icon</p>
                    }
                </div>
              

              
              

                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Menu_items Category</p>
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
                            {categories.menu_items_category && Array.isArray(categories.menu_items_category) &&
                              categories.menu_items_category.map((item: any) => (
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
                        {!categories?.menu_items_category?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/categories/categories-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

CategoriesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_CATEGORIES'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default CategoriesView;