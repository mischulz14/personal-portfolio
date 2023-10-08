// import { CreateFeedbackInput } from '@/server/types/graphqlTypes';
// import { gql, useMutation } from '@apollo/client';
// import React from 'react';

// import { getFeedback } from './Home';

// const CREATE_POST = gql`
//   mutation CreateFeedback($input: CreateFeedbackInput!) {
//     createFeedback(input: $input) {
//       id
//       title
//       content
//       icon
//       author
//       stars
//     }
//   }
// `;

// export default function CreateFeedbackComponent() {
//   const [createFeedback] = useMutation(CREATE_POST, {
//     // Specify refetchQueries to run the getAllPosts query again
//     refetchQueries: [{ query: getFeedback }],
//   });

//   const handleCreateFeedback = async () => {
//     const input: CreateFeedbackInput = {
//       title: 'My Post',
//       content: 'This is the NEWEST another post.',
//       icon: '🚀',
//       author: 'me',
//       stars: 0,
//     };

//     try {
//       await createFeedback({ variables: { input } });
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }
//   };

//   return (
//     <button className="absolute top-0 right-0" onClick={handleCreateFeedback}>
//       Create Post
//     </button>
//   );
// }
