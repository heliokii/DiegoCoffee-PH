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

import { update, fetch } from '../../stores/reservations/reservationsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditReservationsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'name': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'email': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'phone': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    message: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    reservation_start: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    reservation_end: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    
    party_size: '',
    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    location: null,
    

    
    
    

    

    

    

    

    

    

    

    
    status: '',
    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { reservations } = useAppSelector((state) => state.reservations)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof reservations === 'object') {
      setInitialValues(reservations)
    }
  }, [reservations])

  useEffect(() => {
      if (typeof reservations === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (reservations)[el])
          setInitialValues(newInitialVal);
      }
  }, [reservations])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/reservations/reservations-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit reservations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit reservations'} main>
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
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.reservation_start ?
                  new Date(
                      dayjs(initialValues.reservation_start).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'reservation_start': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="ReservationEnd"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.reservation_end ?
                  new Date(
                      dayjs(initialValues.reservation_end).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'reservation_end': date})}
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
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Location' labelFor='location'>
        <Field
            name='location'
            id='location'
            component={SelectField}
            options={initialValues.location}
            itemRef={'locations'}
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
            showField={'name'}
        
      
        
      
        
      
        
      
        ></Field>
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

EditReservationsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_RESERVATIONS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditReservationsPage
