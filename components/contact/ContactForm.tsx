import emailjs from '@emailjs/browser';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { TFunction, useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { ReactChild, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../ui/Button';
import Loader from '../ui/Loader';

interface ContactFormProps {
  setIsContactFormOpen: (isOpen: boolean) => void;
  setHideNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const profanityRegex =
  /(\b(f+[\*u]+ck|sh[\*i]+t|b[\*i]+tch|a[\*s]+hole|c[\*u]+nt|d[\*i]+ck|p[\*i]+ss|v[\*a]+gina|p[\*e]+nis|s[\*o]+n[\*o]+f[\*a]+[\*b]+[\*i]+tch)\b|\b(schei[\*ß]+e|verdammt|arschloch|arsch|hurensohn|missgeburt|wichser|wixxer|wixer|retard)\b)/gi;

const createValidationSchema = (t: TFunction) => {
  return yup
    .object({
      name: yup
        .string()
        .required(t('nameRequired'))
        .min(2, t('nameMoreThan2'))
        .test(
          'no-profanity',
          t('messageProfanity'),
          (value) => !profanityRegex.test(value),
        ),
      message: yup
        .string()
        .required(t('messageRequired'))
        .max(200)
        .test(
          'no-profanity',
          t('messageProfanity'),
          (value) => !profanityRegex.test(value),
        ),
      contactInfoOther: yup.string().optional().max(100),
      privacyPolicy: yup.boolean().oneOf([true], t('privacyPolicyRequired')),
    })
    .required();
};

type FormData = yup.InferType<ReturnType<typeof createValidationSchema>>;

export default function ContactForm({
  setIsContactFormOpen,
  setHideNav,
}: ContactFormProps) {
  const [isSuccessViewOpen, setIsSuccessViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="absolute left-0 flex justify-center items-center w-full -top-10 md:top-0 backdrop-blur-sm p-4 bg-black/80 h-screen z-30">
        <Loader />
      </div>
    );
  }

  return (
    <div className="absolute left-0 flex justify-center items-center w-full -top-10 md:top-0 backdrop-blur-sm p-4 bg-black/80 h-screen z-30">
      {isSuccessViewOpen && !isLoading ? (
        <Success
          setIsContactFormOpen={setIsContactFormOpen}
          setIsSuccessViewOpen={setIsSuccessViewOpen}
          setHideNav={setHideNav}
        />
      ) : (
        <Form
          setIsSuccessViewOpen={setIsSuccessViewOpen}
          setIsContactFormOpen={setIsContactFormOpen}
          setIsLoading={setIsLoading}
          setHideNav={setHideNav}
        />
      )}
    </div>
  );
}

interface SuccessProps {
  setIsContactFormOpen: (isOpen: boolean) => void;
  setIsSuccessViewOpen: (isOpen: boolean) => void;
  setHideNav: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormProps {
  setIsContactFormOpen: (isOpen: boolean) => void;
  setIsSuccessViewOpen: (isOpen: boolean) => void;
  setIsLoading?: (isLoading: boolean) => void;
  setHideNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Form({
  setIsContactFormOpen,
  setIsSuccessViewOpen,
  setIsLoading,
  setHideNav,
}: FormProps) {
  const { t } = useTranslation();
  const schema = createValidationSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);
  const onSubmit = (data: FormData) => {
    console.log(data);
    return;
    handleSubmitEmail(
      data.name,
      data.message,
      data.contactInfoOther ? data.contactInfoOther : '',
    );
  };

  const form = useRef(null) as React.MutableRefObject<HTMLFormElement | null>;

  const handleSubmitEmail = async (
    name: string,
    message: string,
    contactInfo: string | undefined,
  ) => {
    setIsLoading && setIsLoading(true);
    const response = await axios.post('api/send-email', {
      data: getFeedbackHTMLTemplate(name, message, contactInfo),
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
    setIsLoading && setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 max-w-md p-3">
      <h3 className="pt-2 text-lg">{t('contact')}</h3>
      <p className="pb-3">{t('contact-text')}</p>
      <form
        ref={form}
        className="flex flex-col gap-2 max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name">{t('name')}</label>
        <input
          type="text"
          className={`bg-transparent border-white/50 border-2 rounded-lg p-2 ${
            errors.name?.message && 'border-red-300'
          }`}
          id="name"
          {...register('name')}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <label htmlFor="message">{t('message')}</label>
        <input
          type="text"
          className={`!inline-block bg-transparent border-white/50 border-2 rounded-lg p-2 h-[100px] ${
            errors.message?.message && 'border-red-300'
          }`}
          id="message"
          {...register('message')}
        />
        <ErrorMessage>{errors.message?.message}</ErrorMessage>

        <label htmlFor="contactInfoOther">{t('contact-info-other')}</label>
        <input
          type="text"
          className="bg-transparent border-white/50 border-2 rounded-lg p-2 mb-4"
          id="contactInfoOther"
          {...register('contactInfoOther')}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="bg-transparent bg-gray-300 cursor-pointer rounded-xl h-5 w-5 border-white/50 border-2  p-2"
            id="privacyPolicy"
            {...register('privacyPolicy')}
          />

          <label className="sr-only" htmlFor="privacyPolicy">
            {t('privacy-policy')}
          </label>
          <NextLink target="_blank" href="/privacy">
            {t('privacy-policy')}
          </NextLink>
        </div>

        <ErrorMessage>{errors.privacyPolicy?.message}</ErrorMessage>

        <Button className="mt-4" kind="primary" type="submit">
          {t('submit')}
        </Button>
        <Button
          onClick={() => {
            setIsContactFormOpen(false);
            setHideNav(false);
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

export function Success({
  setIsContactFormOpen,
  setIsSuccessViewOpen,
  setHideNav,
}: SuccessProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 max-w-md">
      <h3 className="pt-2 text-lg">{t('message-thanks')}</h3>
      <p className="pb-3">{t('get-back')}</p>
      <Button
        onClick={() => {
          setIsContactFormOpen(false);
          setIsSuccessViewOpen(false);
          setHideNav(false);
        }}
        kind="primary"
      >
        {t('back')}
      </Button>
    </div>
  );
}

function getFeedbackHTMLTemplate(
  name: string,
  message: string,
  contactInfo?: string,
) {
  return `<h3>Neues Feedback von ${name}</h3>
    <p>Feedback: </p>
    <p>${message}</p>
    <p>Kontaktinformationen: </p>
    <p>${contactInfo}</p>
  `;
}

const ErrorMessage = ({ children }: React.PropsWithChildren) => {
  return <div className="text-red-300">{children}</div>;
};
