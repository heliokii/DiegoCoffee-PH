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

import { update, fetch } from '../../stores/pitches/pitchesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditPitches = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'name': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'email': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    pitch_type: '',
    

    

    

    

    
    
    

    

    
    message: '',
    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    submitted_at: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    notified: false,
    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { pitches } = useAppSelector((state) => state.pitches)
  

  const { pitchesId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: pitchesId }))
  }, [pitchesId])

  useEffect(() => {
    if (typeof pitches === 'object') {
      setInitialValues(pitches)
    }
  }, [pitches])

  useEffect(() => {
      if (typeof pitches === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (pitches)[el])

          setInitialValues(newInitialVal);
      }
  }, [pitches])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: pitchesId, data }))
    await router.push('/pitches/pitches-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit pitches')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit pitches'} main>
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
        label="Name"
    >
        <Field
            name="name"
            placeholder="Name"
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
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Type" labelFor="pitch_type">
        <Field name="pitch_type" id="pitch_type" component="select">
          
            <option value="event">event</option>
          
            <option value="collaboration">collaboration</option>
          
            <option value="sponsorship">sponsorship</option>
          
            <option value="other">other</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  
    <FormField label='Message' hasTextareaHeight>
        <Field
            name='message'
            id='message'
            component={RichTextField}
        ></Field>
    </FormField>
  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="SubmittedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.submitted_at ?
                  new Date(
                      dayjs(initialValues.submitted_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'submitted_at': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='EmailSent' labelFor='notified'>
        <Field
            name='notified'
            id='notified'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/pitches/pitches-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditPitches.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_PITCHES'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditPitches
