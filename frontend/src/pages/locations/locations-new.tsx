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

import { create } from '../../stores/locations/locationsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    name: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    address: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    latitude: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    longitude: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    hours: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    phone: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    city: 'Lucena',
    
    
    
    
    
    
    
    
    
    
    
    
    
    is_open: false,
    
    
    
    
    
    
    
    
}


const LocationsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/locations/locations-list')
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
      label="Name"
  >
      <Field
          name="name"
          placeholder="Name"
      />
  </FormField>





























    <FormField label="Address" hasTextareaHeight>
        <Field name="address" as="textarea" placeholder="Address" />
    </FormField>































    <FormField
        label="Latitude"
    >
        <Field
            type="number"
            name="latitude"
            placeholder="Latitude"
        />
    </FormField>



























    <FormField
        label="Longitude"
    >
        <Field
            type="number"
            name="longitude"
            placeholder="Longitude"
        />
    </FormField>























    <FormField label="OperatingHours" hasTextareaHeight>
        <Field name="hours" as="textarea" placeholder="OperatingHours" />
    </FormField>

























  <FormField
      label="Phone"
  >
      <Field
          name="phone"
          placeholder="Phone"
      />
  </FormField>









































  <FormField label="City" labelFor="city">
      <Field name="city" id="city" component="select">
      
        <option value="Lucena">Lucena</option>
      
        <option value="Lucban">Lucban</option>
      
        <option value="Sariaya">Sariaya</option>
      
      </Field>
  </FormField>





























  <FormField label='Open' labelFor='is_open'>
      <Field
          name='is_open'
          id='is_open'
          component={SwitchField}
      ></Field>
  </FormField>









              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/locations/locations-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

LocationsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_LOCATIONS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default LocationsNew
