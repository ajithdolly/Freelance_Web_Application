import React, { useEffect } from 'react'
import { useNavigate , useLocation} from 'react-router-dom'
import newRequest from '../../utils/newRequest';
import './Success.scss'
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner"

const Success = () => {

  const {search} = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(()=> {
    const makeRequest = async () => {
      try{
        await newRequest.put("/orders",{payment_intent})
        setTimeout(()=>{
          navigate("/orders");

        },5000)
      }catch(error){
        console.log(error)
      }
    }
    makeRequest();
  },[])


  return (
    <div className='container'>
      <div className="message-container">
      <span className='s1'>Payment Successful.</span>
      <span className='s2'>You are being redirected to the orders page. Please wait...</span>
      <LoadingSpinner/>

      </div>
    </div>
  )
}

export default Success