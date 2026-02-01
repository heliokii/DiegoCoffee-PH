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

import { update, fetch } from '../../stores/promotions/promotionsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditPromotions = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'title': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    
    description: '',
    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    start: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    end: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    
    banner: [],
    

    

    
    
    

    

    

    

    

    

    
    active: false,
    

    

    

    

    

    

    
    
    
    'discount': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { promotions } = useAppSelector((state) => state.promotions)
  

  const { promotionsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: promotionsId }))
  }, [promotionsId])

  useEffect(() => {
    if (typeof promotions === 'object') {
      setInitialValues(promotions)
    }
  }, [promotions])

  useEffect(() => {
      if (typeof promotions === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (promotions)[el])

          setInitialValues(newInitialVal);
      }
  }, [promotions])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: promotionsId, data }))
    await router.push('/promotions/promotions-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit promotions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit promotions'} main>
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
          label="StartDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.start ?
                  new Date(
                      dayjs(initialValues.start).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'start': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="EndDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.end ?
                  new Date(
                      dayjs(initialValues.end).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'end': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  

    
        <FormField>
            <Field
                label='Banner'
                color='info'
                icon={mdiUpload}
                path={'promotions/banner'}
                name='banner'
                id='banner'
                schema={{
                    size: undefined,
                    formats: undefined,
                }}
                component={FormImagePicker}
            ></Field>
        </FormField>
    

  



  

  

  

  

  

  

  

  

  
    <FormField label='Active' labelFor='active'>
        <Field
            name='active'
            id='active'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  



  

  

  

  
    <FormField
        label="Discount"
    >
        <Field
            type="number"
            name="discount"
            placeholder="Discount"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/promotions/promotions-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditPromotions.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_PROMOTIONS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditPromotions
