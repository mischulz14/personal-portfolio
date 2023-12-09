import { ColorThemeContext } from '@/context/ColorThemeContextProvider';
import { CreateFeedbackInput } from '@/server/types/graphqlTypes';
import { gql, useMutation, useQuery } from '@apollo/client';
import type { Feedback } from '@prisma/client';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useContext, useState } from 'react';
import { useLocalStorage } from 'react-use';

import Button from '../ui/Button';
import Loader from '../ui/Loader';

const getAllFeedbackQuery = gql`
  query getFeedback {
    getFeedback {
      id
      feedback
      createdAt
    }
  }
`;

const createFeedbackMutation = gql`
  mutation createFeedback($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
      feedback
      createdAt
    }
  }
`;

type answerChoices =
  | 'animations'
  | 'design'
  | 'minigames'
  | 'changeTheme'
  | null;

const answerChoices: answerChoices[] = [
  'animations',
  'design',
  'minigames',
  'changeTheme',
];

export default function Feedback() {
  const { t } = useTranslation('common');
  const [answerChoicesArray, setChosenAnswerChoicesArray] = useState<
    answerChoices[]
  >([]);
  const [feedbackSent, setFeedbackSent] = useLocalStorage(
    'feedbackSent',
    false,
  );
  const [createFeedback, { data, loading, error }] = useMutation(
    createFeedbackMutation,
  );
  const [showThankYouScreen, setShowThankYouScreen] = useState(false);

  function handleClick() {
    setShowThankYouScreen(true);
    answerChoicesArray.forEach((choice) => {
      const mutationInput: CreateFeedbackInput = {
        feedback: choice!,
      };

      createFeedback({
        variables: {
          input: mutationInput,
        },
      });
    });

    setTimeout(() => {
      setFeedbackSent(true);
      setShowThankYouScreen(false);
    }, 1500);
  }

  return (
    <div className="max-w-sm flex flex-col items-center">
      {showThankYouScreen ? <ThankYou /> : null}
      {feedbackSent && !showThankYouScreen && <ShowFeedback />}
      {!feedbackSent && !showThankYouScreen && (
        <>
          <div className="flex flex-col gap-4">
            <p className="text-center pb-6">{t('help-me-feedback')}</p>
            {answerChoices.map((choice) => {
              return (
                <Button
                  className="!border-2"
                  key={choice}
                  onClick={() => {
                    setChosenAnswerChoicesArray((prev) => {
                      if (prev.includes(choice)) {
                        return prev.filter((item) => item !== choice);
                      } else {
                        return [...prev, choice];
                      }
                    });
                  }}
                  kind={
                    answerChoicesArray.includes(choice)
                      ? 'primary'
                      : 'secondary'
                  }
                >
                  <span className="text-sm sm:text-base">
                    {' '}
                    {t(`${choice}`).toUpperCase()}
                  </span>
                </Button>
              );
            })}
          </div>
          <Button
            kind="outlined"
            className="!mt-10"
            disabled={answerChoicesArray.length === 0}
            onClick={() => {
              if (answerChoicesArray.length === 0) return;
              handleClick();
            }}
          >
            {t('send-feedback')}
          </Button>
        </>
      )}
    </div>
  );
}

export function ShowFeedback() {
  const colorContext = useContext(ColorThemeContext);
  const { t } = useTranslation('common');

  const { data, loading, error } = useQuery(getAllFeedbackQuery);

  const feedback = data?.getFeedback;

  const calculatedFeedback =
    filterAnswerChoicesAndCalculateTheirPercentage(feedback);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-sm">
      <p className="w-full text-center pb-8">{t('the-people-liked')}</p>
      {calculatedFeedback.map((feedback) => {
        return (
          <div
            className="grid grid-cols-2 pb-5 gap-2"
            key={feedback.answerChoice}
          >
            <div className="flex items-center text-xs sm:text-base">
              {t(`${feedback.answerChoice}`).toUpperCase()}
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                className="relative h-10 text-gray-200 rounded-sm overflow-hidden flex justify-center items-center"
                initial={{ width: 0 }}
                animate={{ width: `${feedback.percentage}%` }}
                transition={{
                  duration: 0.7,
                  type: 'spring',
                  damping: 5,
                  stiffness: 40,
                  mass: 1,
                }}
                style={{
                  backgroundColor: colorContext.colorThemeColor,
                }}
              />
              <span> {feedback.percentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function filterAnswerChoicesAndCalculateTheirPercentage(feedback: Feedback[]) {
  if (!feedback) return [];
  const AnswerChoicesReduced = feedback.reduce((acc, curr) => {
    answerChoices.forEach((choice) => {
      if (choice === curr.feedback) {
        acc[choice] = acc[choice] ? acc[choice] + 1 : 1;
      }
    });
    return acc;
    // @ts-ignore
  }, {} as { [key in answerChoices]: number });

  const totalFeedback = feedback.length;

  const answerChoicesWithPercentage = Object.entries(AnswerChoicesReduced).map(
    ([key, value]) => {
      return {
        answerChoice: key,
        percentage: Math.round((value / totalFeedback) * 100),
      };
    },
  );

  return answerChoicesWithPercentage;
}

export function ThankYou() {
  const { t } = useTranslation('common');
  return (
    <div className="max-w-sm">
      <p className="text-center pb-8">{t('thanks-for-feedback')}</p>
    </div>
  );
}
