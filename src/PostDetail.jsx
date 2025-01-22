import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";
import "./PostDetail.css";

export function PostDetail({ post, deletePost, updatePost }) {
  // replace with useQuery
  const {data, isError, isLoading} = useQuery({
    queryKey:["comments",post.id],
    queryFn:()=>fetchComments(post.id),
    staleTime:2000
  });


  if(isLoading){
    return(<h3>...Loading...</h3>)
  }

if(isError){ 
return(<h3>Something is wrong. Error:</h3>)}


  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
    <div>
      {deletePost.isPending && <p className="loading">Deleting the Post</p>}
      <button onClick={()=>deletePost.mutate(post.id)}>Delete</button> 
      {deletePost.isError && <p className='error'> An Error Occurred</p> }
      {deletePost.isSuccess && <p className="success">Success!!!</p>}
    </div>
    <div>
      <button onClick={()=>updatePost.mutate(post.id)}> Update title</button>
      {updatePost.isPending && <p className="loading"></p>}
      {updatePost.isError && <p className='error'> An Error Occurred</p> }
      {updatePost.isSuccess && <p className="success">Success!!!</p>}
    </div>

      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
