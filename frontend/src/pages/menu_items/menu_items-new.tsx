import { mdiAccount, mdiChartTimelineVariant, mdiMail, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import { SelectFieldMany } from "../../components/SelectFieldMany";
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/menu_items/menu_itemsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    title: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    description: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    price: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    category: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    item_type: 'Coffee',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    photos: [],
    
    
    
    
    
    
    ingredients: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    is_featured: false,
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    is_available: false,
    
    
    
    
    
    
    
    
}


const Menu_itemsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/menu_items/menu_items-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                
                initialValues
                
            }
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







































  <FormField label="Category" labelFor="category">
      <Field name="category" id="category" component={SelectField} options={[]} itemRef={'categories'}></Field>
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

Menu_itemsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_MENU_ITEMS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Menu_itemsNew
