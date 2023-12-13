import { apiSlice } from "./BaseApiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "./posts",
      }),
      providesTags: ["Post"],
    }),
    getPostInfo: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
      }),
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts/",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, updatedPost }) => {
        const formData = new FormData();
        formData.append("content", updatedPost.title);
        formData.append("content", updatedPost.content);
        formData.append("image", updatedPost.image);

        console.log("updatePost", updatedPost);
        return {
          url: `/posts/${postId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostInfoQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
