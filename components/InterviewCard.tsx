import dayjs from 'dayjs'
const InterviewCard = ({interviewId, userId, role, type,techstack, levels, questions, createdAt}:InterviewCardProps)=> {
    
        const feedback = null as Feedback | null;
        const normalizedType = /mix/gi.test(type) ? "Mixed" : type;   
        const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("DD/MM/YYYY HH:mm") 
        
        return (
        <div className='card-border w-[360px] min-h-[300] max-sm:w-full'>
           <div className='card-interview' >
            <div>
                <div className='absolute top-0 right-0 w-fit px-4 py-4'>
                    <p className='badge-text'>{normalizedType}</p>
                </div>

                <Image src={getRandomInterviewCover()} alt='company-image' width={90} height={90} className="rounded-full object"></Image>

            </div>

           </div>
        </div>
        )
    


}

export default InterviewCard;

