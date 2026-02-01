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

import { create } from '../../stores/reservations/reservationsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    name: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    email: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    phone: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    message: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    reservation_start: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    reservation_end: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    party_size: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    location: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    status: 'pending',
    
    
    
    
    
    
}


const ReservationsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    
    // get from url params
    const { dateRangeStart, dateRangeEnd } = router.query
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/reservations/reservations-list')
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
                
                
                
                dateRangeStart && dateRangeEnd ?
                {
                    ...initialValues,
                    reservation_start: moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    reservation_end: moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                } : initialValues
                
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>



  <FormField
      label="FullName"
  >
      <Field
          name="name"
          placeholder="FullName"
      />
  </FormField>



























  <FormField
      label="Email"
  >
      <Field
          name="email"
          placeholder="Email"
      />
  </FormField>



























  <FormField
      label="Phone"
  >
      <Field
          name="phone"
          placeholder="Phone"
      />
  </FormField>





























    <FormField label="Message" hasTextareaHeight>
        <Field name="message" as="textarea" placeholder="Message" />
    </FormField>



































  <FormField
      label="ReservationStart"
  >
      <Field
          type="datetime-local"
          name="reservation_start"
          placeholder="ReservationStart"
      />
  </FormField>



























  <FormField
      label="ReservationEnd"
  >
      <Field
          type="datetime-local"
          name="reservation_end"
          placeholder="ReservationEnd"
      />
  </FormField>























    <FormField
        label="PartySize"
    >
        <Field
            type="number"
            name="party_size"
            placeholder="PartySize"
        />
    </FormField>







































  <FormField label="Location" labelFor="location">
      <Field name="location" id="location" component={SelectField} options={[]} itemRef={'locations'}></Field>
  </FormField>























  <FormField label="Status" labelFor="status">
      <Field name="status" id="status" component="select">
      
        <option value="pending">pending</option>
      
        <option value="confirmed">confirmed</option>
      
        <option value="cancelled">cancelled</option>
      
        <option value="completed">completed</option>
      
      </Field>
  </FormField>











              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/reservations/reservations-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

ReservationsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_RESERVATIONS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default ReservationsNew
