import emailjs from '@emailjs/browser';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../ui/Button';

interface ContactFormProps {
  setIsContactFormOpen: (isOpen: boolean) => void;
}

const schema = yup
  .object({
    name: yup.string().required(),
    message: yup.string().max(200).required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function ContactForm({
  setIsContactFormOpen,
}: ContactFormProps) {
  const [isSuccessViewOpen, setIsSuccessViewOpen] = useState(false);

  return (
    <div className="absolute left-0 flex justify-center items-center w-full -top-10 md:top-0 backdrop-blur-sm p-4 bg-black/80 h-screen z-[9999]">
      {isSuccessViewOpen ? (
        <Success
          setIsContactFormOpen={setIsContactFormOpen}
          setIsSuccessViewOpen={setIsSuccessViewOpen}
        />
      ) : (
        <Form
          setIsSuccessViewOpen={setIsSuccessViewOpen}
          setIsContactFormOpen={setIsContactFormOpen}
        />
      )}
    </div>
  );
}

interface SuccessAndFormProps {
  setIsContactFormOpen: (isOpen: boolean) => void;
  setIsSuccessViewOpen: (isOpen: boolean) => void;
}

export function Success({
  setIsContactFormOpen,
  setIsSuccessViewOpen,
}: SuccessAndFormProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 max-w-md">
      <h3 className="pt-2 text-lg">Thanks for your message!</h3>
      <p className="pb-3">I will get back to you as soon as possible.</p>
      <Button
        onClick={() => {
          setIsContactFormOpen(false);
          setIsSuccessViewOpen(false);
        }}
        kind="primary"
      >
        {t('back')}
      </Button>
    </div>
  );
}

export function Form({
  setIsContactFormOpen,
  setIsSuccessViewOpen,
}: SuccessAndFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    handleSubmitEmail(data.name, data.message);
  };

  const form = useRef(null) as React.MutableRefObject<HTMLFormElement | null>;

  const handleSubmitEmail = async (name: string, message: string) => {
    const response = await axios.post('api/send-email', {
      data: getFeedbackHTMLTemplate(name, message),
    });
    if (response.request.status === 200) {
      console.log('Emails sent successfully!');
      setIsSuccessViewOpen(true);
    } else {
      console.log('Emails could not be sent!');
      console.log(response.request.status);
      console.log(response.request.statusText);
      throw new Error('Emails could not be sent!');
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-md p-3">
      <h3 className="pt-2 text-lg">{t('contact')}</h3>
      <p className="pb-3">
        I am always open to new opportunities and projects. If you have any
        questions or just want to say hi, feel free to contact me!
      </p>
      <form
        ref={form}
        className="flex flex-col gap-2 max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name">{t('name')}</label>
        <input
          type="text"
          className="bg-transparent border-white/50 border-2 rounded-lg p-2"
          id="name"
          {...register('name')}
        />
        <p>{errors.name?.message}</p>

        <label htmlFor="message">{t('message')}</label>
        <input
          type="text"
          className="!inline-block bg-transparent border-white/50 border-2 rounded-lg p-2 h-[100px]"
          id="message"
          {...register('message')}
        />
        <p>{errors.message?.message}</p>

        <Button kind="primary" type="submit">
          {t('submit')}
        </Button>
        <Button
          onClick={() => {
            setIsContactFormOpen(false);
          }}
          kind="tertiary"
          type="button"
        >
          {t('back')}
        </Button>
      </form>
    </div>
  );
}

function getFeedbackHTMLTemplate(name: string, message: string) {
  return `<h3>Neues Feedback von ${name}</h3>
    <p>Feedback: </p>
    <p>${message}</p>
  `;
}
