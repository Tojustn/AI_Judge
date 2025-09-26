import React,{useEffect, useState} from 'react'
import { Judge } from '../types/types'
import { getJudges } from '../services/supabase/judges';

const JudgeCheckbox = () => {
    const [judges, setJudges] = useState<Judge[]>([]);
    useEffect([]=>{
        const fetchJudges = async() =>{ 
            try{
            await getJudges
            }catch(error){
                alert(error)
            }

        }

    },[])
  return (
    <div>
      
    </div>
  )
}

export default JudgeCheckbox
