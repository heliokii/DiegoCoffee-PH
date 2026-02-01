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

import { create } from '../../stores/orders/ordersSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    reference: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    customer: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    items: [],
    
    
    
    total: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    status: 'pending',
    
    
    
    
    
    
    
    
    
    
    
    
    pickup_time: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    paid: false,
    
    
    
    
    
    
    
    
    
    stripe_charge: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}


const OrdersNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/orders/orders-list')
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
      label="Reference"
  >
      <Field
          name="reference"
          placeholder="Reference"
      />
  </FormField>













































  <FormField label="Customer" labelFor="customer">
      <Field name="customer" id="customer" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>





























    <FormField label='Items' labelFor='items'>
        <Field
            name='items'
            id='items'
            itemRef={'menu_items'}
            options={[]}
            component={SelectFieldMany}>
        </Field>
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
      <Field
          type="datetime-local"
          name="pickup_time"
          placeholder="PickupTime"
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

OrdersNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_ORDERS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default OrdersNew
