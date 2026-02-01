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

import { update, fetch } from '../../stores/orders/ordersSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditOrdersPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'reference': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    customer: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    

    
    items: [],
    
    
    
    'total': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    status: '',
    

    

    

    

    
    
    

    

    

    

    

    
    pickup_time: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    paid: false,
    

    

    

    

    

    

    
    
    
    'stripe_charge': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { orders } = useAppSelector((state) => state.orders)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof orders === 'object') {
      setInitialValues(orders)
    }
  }, [orders])

  useEffect(() => {
      if (typeof orders === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (orders)[el])
          setInitialValues(newInitialVal);
      }
  }, [orders])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/orders/orders-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit orders')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit orders'} main>
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
        label="Reference"
    >
        <Field
            name="reference"
            placeholder="Reference"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Customer' labelFor='customer'>
        <Field
            name='customer'
            id='customer'
            component={SelectField}
            options={initialValues.customer}
            itemRef={'users'}
      
        
            showField={'firstName'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  
      <FormField label='Items' labelFor='items'>
          <Field
              name='items'
              id='items'
              component={SelectFieldMany}
              options={initialValues.items}
              itemRef={'menu_items'}
            
            
            
            
            
            
            
            
              showField={'title'}
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
          ></Field>
      </FormField>
  

    

  



  

  

  

  
    <FormField
        label="Total"
    >
        <Field
            type="number"
            name="total"
            placeholder="Total"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Status" labelFor="status">
        <Field name="status" id="status" component="select">
          
            <option value="pending">pending</option>
          
            <option value="paid">paid</option>
          
            <option value="preparing">preparing</option>
          
            <option value="ready">ready</option>
          
            <option value="completed">completed</option>
          
            <option value="cancelled">cancelled</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="PickupTime"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.pickup_time ?
                  new Date(
                      dayjs(initialValues.pickup_time).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'pickup_time': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='Paid' labelFor='paid'>
        <Field
            name='paid'
            id='paid'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  



  
    <FormField
        label="StripeCharge"
    >
        <Field
            name="stripe_charge"
            placeholder="StripeCharge"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/orders/orders-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditOrdersPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_ORDERS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditOrdersPage
