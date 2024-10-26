import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {toast} from "react-toastify"

import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
const Reviews = ({ gigId }) => {

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
     
      return newRequest.post("/reviews", review);
      
    },
    onError : (err) => {
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
      <hr/>
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Write your opinion..." />
          <h2 style= {{alignSelf: "flex-end", margin:0,fontSize :16}}>How many stars do you rate this gig?</h2>
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;