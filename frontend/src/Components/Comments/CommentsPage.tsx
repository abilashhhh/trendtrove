import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Layout'

const CommentsPage : React.FC = () =>{
  const { postId} = useParams<{postId :string}>
  return (
  
    <Layout >
        <div>CommentsPage</div>

    </Layout>
  )
}

export default CommentsPage