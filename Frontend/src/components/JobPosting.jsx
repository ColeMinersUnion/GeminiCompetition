import { useState } from 'react'
import axios from 'axios'


export default function JobPostingReview(){
    const [content, setContent] = useState('');
    const [resp, setResp] = useState('');
    
    return (
        <>
            <form>
                <input type="text" value={content} onChange={e=>
                    setContent(e.target.value)}/>

                <button type="submit" value="Call Gemi" onClick={async() => {
                    const prompt = { content };
                    
                    await axios.post('/api/v1/jobposting', {
                        Prompt: prompt,
                    })
                    .then(function(response){
                        console.log(response);
                    })
                    .then(function(error){
                        console.error(error);
                    })
                }}>Submit</button>

            </form>

        </>
    );
}