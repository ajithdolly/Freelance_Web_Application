import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  const [secondUser,setSecondUser] = useState(null);


  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  
  useEffect(()=>{
    const getUser = async () => {
      const conversation = await newRequest.get(`/conversations/single/${id}`).then((res)=>(res.data))
      if(currentUser.isSeller){
        const user = await newRequest.get(`/users/${conversation.buyerId}`).then((res)=>(res.data))
        setSecondUser(user);
      }else{
        const user = await newRequest.get(`/users/${conversation.sellerId}`).then((res)=>(res.data))
        setSecondUser(user);

      }
    }
    getUser();
    
  },[])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  console.log(currentUser._id)

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {'>'} John Doe {'>'}
        </span>
        {isLoading ? (
          <LoadingSpinner/>
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                { m.userId === currentUser._id ? ( <img
                  src={currentUser.img}
                  alt=""
                />) :
                  (<img
                  src={secondUser?.img}
                  alt=""
                />)
                }
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
