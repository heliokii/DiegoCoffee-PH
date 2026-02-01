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

import { create } from '../../stores/promotions/promotionsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    title: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    description: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    start: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    end: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    banner: [],
    
    
    
    
    
    
    
    
    
    
    
    active: false,
    
    
    
    
    
    
    
    
    
    discount: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}


const PromotionsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    
    // get from url params
    const { dateRangeStart, dateRangeEnd } = router.query
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/promotions/promotions-list')
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
                    start: moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    end: moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                } : initialValues
                
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
      label="StartDate"
  >
      <Field
          type="datetime-local"
          name="start"
          placeholder="StartDate"
      />
  </FormField>



























  <FormField
      label="EndDate"
  >
      <Field
          type="datetime-local"
          name="end"
          placeholder="EndDate"
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

PromotionsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_PROMOTIONS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default PromotionsNew
