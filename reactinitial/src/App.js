import React, { useEffect, useState } from "react"
import axios from "axios"
import LoadingMask from "./components/LoadingMask"
import Characters from "./components/Characters"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Subscription from "./components/Subscription";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const App = () => {

  const [characters,setCharacters] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] =useState(true)
  const [open, setOpen] = React.useState(false);
  const [isSent,setIsSent] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async() => {
    setLoading(true)
    const response = await axios.get("https://demoapi.com/api/series/howimetyourmother")
    setCharacters(response.data)
    console.log(characters)
    setLoading(false)
}

useEffect(()=>{
    getData()
    setTimeout(() => setOpen(true), 10000);
},[])

useEffect(()=>{
  setTimeout(() => setOpen(false), 5000);
},[isSent])
  return (
    <div>

      {loading && <LoadingMask></LoadingMask>}
      {!loading && characters && characters.map((character=>{ return <Characters name={character.name} detail={character.details} ></Characters> }))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Subscription setIsSent = {setIsSent} isSent={isSent}></Subscription>
        </Box>
      </Modal>
    </div>
  )
}

export default App
