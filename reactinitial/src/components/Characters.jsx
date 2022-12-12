import './Characters.css'
import { useState } from 'react'
const Characters = ({name,detail}) =>{
    const [ isShown, setIsShown ] = useState(false)

    return(
        <div>
            <h1>{name}</h1>
            <button onClick={() => setIsShown(!isShown)}>
                { isShown ? " Show less" : "Show more" }
            </button>
            {isShown && ( <p>Details: {detail}</p>)}
        </div>
    )
}

export default Characters