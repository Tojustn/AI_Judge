import React from 'react'
import { targetModels } from '../types/types';

interface RadioComponentProps{
    chosen: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioComponent = ({chosen, onChange}: RadioComponentProps) => {
  return (
<div className="flex flex-col">
{targetModels.map((model,index) => (
    <div key ={model} className = "flex items-center">
        <input type="radio" onChange={onChange}  name = "target-model" value = {model} checked ={chosen === model}></input>
        <label htmlFor={'radio-${index}'} className = "dark: text-white mx-5">{model}</label>
    </div>
))}
</div>
  )
}

export default RadioComponent
