import "./Subscription.css";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularIndeterminate from "./CircularIndeterminate";
import axios from "axios";

const Subscription = ({isSent,setIsSent}) => {
  const [email, setEmail] = useState("");
    const [isdisable,setIsDisable] = useState(true)
    const [isLoading,setIsLoading] =useState(false)
    const [isItOk,setIsItOk]= useState(false)

    const checkVaild = () =>{
        if(email.includes("@") && email.includes(".")){
            setIsDisable(false)
        }else{
            setIsDisable(true)
        }
    }
    const sendEmail= () =>{
        setIsLoading(true)
        axios.post('https://demoapi.com/api/series/newsletter', {
            email: email
          })
          .then(function (response) {
                if(response.status ===201){
                    setIsSent(true)
                }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    React.useEffect(()=>{
        checkVaild()
    },[email])
  return (
    <div>
    {!isLoading &&  <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Email" value={email} onChange={e =>setEmail(e.target.value)} variant="outlined" />
      </Box>}
      {!isLoading && <button disabled={isdisable} onClick={sendEmail}>Submit</button>}
      {isLoading && !isSent &&  <CircularIndeterminate></CircularIndeterminate>}
        {isSent && <h1>Subscribed</h1>}
    </div>
  );
};

export default Subscription;
