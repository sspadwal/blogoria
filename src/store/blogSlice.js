// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   blogs: [
//     {
//       title: "My First Blog",
//       slug: "my-first-blog",
//       content: "This is my first blog content",
//       status: "active",
//       featuredImage: null,
//     },
//   ],
// };

// const blogSlice = createSlice({
//   name: "blog",
//   initialState,
//   reducers: {
//     addBlog: (state, action) => {
//       state.blogs.push(action.payload);
//     },
//     deleteBlog: (state, action) => {
//       state.blogs = state.blogs.filter(blog => blog.slug !== action.payload);
//     },
//     editBlog: (state, action) => {
//       const index = state.blogs.findIndex(
//         blog => blog.slug === action.payload.slug
//       );
//       if (index !== -1) {
//         state.blogs[index] = { ...state.blogs[index], ...action.payload };
//       }
//     },
//   },
// });

// export const { addBlog, deleteBlog, editBlog } = blogSlice.actions;
// export default blogSlice.reducer;
