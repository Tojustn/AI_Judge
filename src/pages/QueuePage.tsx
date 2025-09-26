import type { Submission,Question } from '../types/types'
import React,{useState, useEffect} from 'react'
import { getSubmission } from '../services/supabase/submissions'
import { getQuestionBySessionId } from '../services/supabase/questions'
import QuestionListComponent from '../components/lists/QuestionListComponent'
import { useParams } from 'react-router-dom'
const QueuePage = () => {

  const {queueId} = useParams<{queueId:string}>();
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(()=>{
    const fetchData = async() =>{
      try{

    if(!queueId){
      throw new Error("Queue Does not Exist")
    }
        const submission = await getSubmission(queueId) 
        setSubmission(submission)
        const questions = await getQuestionBySessionId(queueId); 
        setQuestions(questions)
      }
      catch(error){
        alert(error)
      }
    }

    fetchData()
  },[])

  if (!submission) {
    return <div className="p-4 text-gray-500">Queue Does Not Exist.</div>;
  }
  return (
    <div className = "h-full w-full">
      <h1>{submission.queueId}</h1>
      <div className = "">
      <QuestionListComponent questions={questions}></QuestionListComponent>
      </div>
    </div>
  )
}

export default QueuePage
