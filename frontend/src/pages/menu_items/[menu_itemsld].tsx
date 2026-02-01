import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import FormFilePicker from '../../components/FormFilePicker'
import FormImagePicker from '../../components/FormImagePicker'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/menu_items/menu_itemsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditMenu_items = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'title': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    
    description: '',
    

    

    

    

    

    

    

    

    

    

    
    
    
    'price': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    category: null,
    

    
    
    

    

    

    

    

    

    

    

    
    item_type: '',
    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    
    photos: [],
    

    

    
    
    

    
    ingredients: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    is_featured: false,
    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    is_available: false,
    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { menu_items } = useAppSelector((state) => state.menu_items)
  

  const { menu_itemsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: menu_itemsId }))
  }, [menu_itemsId])

  useEffect(() => {
    if (typeof menu_items === 'object') {
      setInitialValues(menu_items)
    }
  }, [menu_items])

  useEffect(() => {
      if (typeof menu_items === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (menu_items)[el])

          setInitialValues(newInitialVal);
      }
  }, [menu_items])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: menu_itemsId, data }))
    await router.push('/menu_items/menu_items-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit menu_items')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit menu_items'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  
    <FormField
        label="Title"
    >
        <Field
            name="title"
            placeholder="Title"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  
    <FormField label='Description' hasTextareaHeight>
        <Field
            name='description'
            id='description'
            component={RichTextField}
        ></Field>
    </FormField>
  

  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="Price"
    >
        <Field
            type="number"
            name="price"
            placeholder="Price"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Category' labelFor='category'>
        <Field
            name='category'
            id='category'
            component={SelectField}
            options={initialValues.category}
            itemRef={'categories'}
      
        
      
        
      
        
      
        
      
        
            showField={'name'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Type" labelFor="item_type">
        <Field name="item_type" id="item_type" component="select">
          
            <option value="Coffee">Coffee</option>
          
            <option value="Cocktail">Cocktail</option>
          
            <option value="Food">Food</option>
          
            <option value="Frappes">Frappes</option>
          
            <option value="Ice">Ice</option>
          
            <option value="Hot">Hot</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  

    
        <FormField>
            <Field
                label='Photos'
                color='info'
                icon={mdiUpload}
                path={'menu_items/photos'}
                name='photos'
                id='photos'
                schema={{
                    size: undefined,
                    formats: undefined,
                }}
                component={FormImagePicker}
            ></Field>
        </FormField>
    

  



  

  
    <FormField label="Ingredients" hasTextareaHeight>
        <Field name="ingredients" as="textarea" placeholder="Ingredients" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='Featured' labelFor='is_featured'>
        <Field
            name='is_featured'
            id='is_featured'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='Available' labelFor='is_available'>
        <Field
            name='is_available'
            id='is_available'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/menu_items/menu_items-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditMenu_items.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_MENU_ITEMS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditMenu_items
