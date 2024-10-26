import './Update.scss'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

import React, {  useState } from "react";

import upload from "../../utils/upload";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate , useParams} from "react-router-dom";
import { toast } from "react-toastify";
import ErrorDisplayer from '../../components/errorDisplayer/ErrorDisplayer';
import { addFeature, addImages, changeInput } from '../../store/gig/gig.slice';
import { useDispatch, useSelector } from 'react-redux';

const Update = () => {
    const [singleFile, setSingleFile] = useState(undefined);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
  
    const dispatch = useDispatch();

    const state = useSelector((state)=>state.gig);

    const { id } = useParams();
    console.log(id);

    const { isLoading, error, data } = useQuery({
        queryKey: ["gig"],
        queryFn: () =>
          newRequest.get(`/gigs/single/${id}`).then((res) => {
            return res.data;
          }),
      });

      const handleChange = (e) => {
        dispatch(changeInput({name : e.target.name , value : e.target.value}));
      };
      const handleFeature = (e) => {
        e.preventDefault();
        dispatch(addFeature(e.target[0].value));
        e.target[0].value = "";
      };
    
      const handleUpload = async () => {
        setUploading(true);
        try {
          const cover = await upload(singleFile);
    
          const images = await Promise.all(
            [...files].map(async (file) => {
              const url = await upload(file);
              return url;
            })
          );
          setUploading(false);
          toast.success("Successfully uploaded!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(addImages({ cover, images }));
        } catch (err) {
          console.log(err);
        }
      };
    
  
    const navigate = useNavigate();
  
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: (gig) => {
        return newRequest.post(`/gigs/update/${id}`, gig);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["myGigs"]);
      },
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      mutation.mutate(state);
      navigate("/mygigs");
    };
    console.log(state);



  
    return (

      <div className="add">
        {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplayer />
          ) : (
            <div className="container">
          <h1>Re-Enter complete details of  {data.title}</h1>
          <div className="sections">
            <div className="info">
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. I will do something I'm really good at"
                onChange={handleChange}
              />
              <label htmlFor="">Category</label>
              <select name="cat" id="cat" onChange={handleChange}>
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
                <option value="written">Writing</option>
                <option value="ai">AI</option>
                <option value="business">Business</option>
              </select>
              <div className="images">
                <div className="imagesInputs">
                  <label htmlFor="">Cover Image</label>
                  <input
                    type="file"
                    onChange={(e) => setSingleFile(e.target.files[0])}
                  />
                  <label htmlFor="">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <button onClick={handleUpload}>
                  {uploading ? "uploading" : "Upload"}
                </button>
              </div>
              <label htmlFor="">Description</label>
              <textarea
                name="desc"
                id=""
                placeholder="Brief descriptions to introduce your service to customers"
                cols="0"
                rows="16"
                onChange={handleChange}
               
              ></textarea>
              <button onClick={handleSubmit}>Update</button>
            </div>
            <div className="details">
              <label htmlFor="">Service Title</label>
              <input
                type="text"
                name="shortTitle"
                placeholder="e.g. One-page web design"
                onChange={handleChange}
               

              />
              <label htmlFor="">Short Description</label>
              <textarea
                name="shortDesc"
                onChange={handleChange}
                id=""
                placeholder="Short description of your service"
                cols="30"
                rows="10"
               

              ></textarea>
              <label htmlFor="">Delivery Time (e.g. 3 days)</label>
              <input type="number" name="deliveryTime" onChange={handleChange}  />
              <label htmlFor="">Revision Number</label>
              <input
                type="number"
                name="revisionNumber"
                onChange={handleChange}
                
              />
              <label htmlFor="">Add Features</label>
              <form action="" className="add" onSubmit={handleFeature}>
                <input type="text" placeholder="e.g. page design" />
                <button type="submit">Add</button>
              </form>
              <div className="addedFeatures">
                {state?.features?.map((f) => (
                  <div className="item" key={f}>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_FEATURE", payload: f })
                      }
                    >
                      {f}
                      <span>X</span>
                    </button>
                  </div>
                ))}
              </div>
              <label htmlFor="">Price</label>
              <input type="number" onChange={handleChange} name="price"/>
            </div>
          </div>
                   
        </div>
        

          )}
        
      </div>
    );
}

export default Update