import React from 'react'
import './Button.css'

const Button = (props) => (
    <div className={props.value}>       
        <button 
            value={props.value} 
            onClick={(e)=>props.onclick(e.target.value)}
        >
            {props.value}
        </button>
    </div>
)

export default Button

        