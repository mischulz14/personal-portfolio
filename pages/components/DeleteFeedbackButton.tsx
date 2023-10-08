// import { DeleteFeedbackInput } from '@/server/types/graphqlTypes';
// import { gql, useMutation } from '@apollo/client';
// import { Feedback } from '@prisma/client';
// import React from 'react';

// import { getFeedback } from './Home';

// const DELETE_FEEDBACK = gql`
//   mutation DeleteFeedback($input: DeleteFeedbackInput!) {
//     deleteFeedback(input: $input) {
//       id
//     }
//   }
// `;

// interface Props {
//   id: string;
//   children?: any;
// }

// export default function DeleteFeedbackComponent({ id, children }: Props) {
//   const [deleteFeedback] = useMutation(DELETE_FEEDBACK, {
//     // Specify refetchQueries to run the getAllPosts query again
//     refetchQueries: [{ query: getFeedback }],
//   });

//   const handleDeleteFeedback = async (id: string) => {
//     const input: DeleteFeedbackInput = {
//       id: id,
//     };

//     try {
//       await deleteFeedback({ variables: { input } });
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }
//   };

//   return (
//     <button className="" onClick={() => handleDeleteFeedback(id)}>
//       Delete Feedback
//     </button>
//   );
// }
