import type { Submission,Question } from '../types/types'
import React,{useState, useEffect} from 'react'
import { getSubmission } from '../services/supabase/submissions'
import { getQuestionBySessionId } from '../services/supabase/questions'
import QuestionListComponent from '../components/lists/QuestionListComponent'
import { useParams } from 'react-router-dom'
import LoadingState from '../components/state/LoadingState'
const QueuePage = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const {queueId} = useParams<{queueId:string}>();
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(()=>{
    setLoading(true)
    const fetchData = async() =>{
      try{

    if(!queueId){
      throw new Error("Queue Does not Exist")
    }
        const submission = await getSubmission(queueId) 
        setSubmission(submission)
        const questions = await getQuestionBySessionId(queueId); 
        setQuestions(questions)

      setLoading(false)
      }

      catch(error){
        alert(error)
      }
    }

    fetchData()
  },[])

if (!submission && !loading) {
  return <div className="p-4 text-gray-500">Queue Does Not Exist.</div>;
}

// At this point, submission is guaranteed to exist if not loading
const currentSubmission = submission!; // non-null assertion

return (
  <div className="h-full w-full m-4">
    {loading ? (
      <div className="flex items-center justify-center h-full">
        <LoadingState message="Fetching Queue" />
      </div>
    ) : (
      <div>
        <h1 className="text-xl">{currentSubmission.queueId}</h1>
        <QuestionListComponent questions={questions} />
      </div>
    )}
  </div>
);

}

export default QueuePage
