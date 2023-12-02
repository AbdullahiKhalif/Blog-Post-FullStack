import React from 'react'
import Protected from '../Authentication/Protected'
import CreatePost from '../Components/CreatePost'

const CreatePostPage = () => {
  return <Protected><CreatePost/></Protected>
}

export default CreatePostPage