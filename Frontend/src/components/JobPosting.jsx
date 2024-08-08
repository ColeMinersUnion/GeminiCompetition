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

                <button type="submit" value="Check Resume" onClick={async() => {
                    const joburl = { content };
                    
                    await axios.post('/api/v1/jobposting', {
                        joburl: joburl,
                    })
                    .then(function(response){
                        console.log(response);
                        setResp(response);
                    })
                    .then(function(error){
                        console.error(error);
                    })
                }}>Submit</button>

            </form>

            {resp && <div>
                <p>
                    About the Job: {resp.Res}
                </p>
            </div>}

        </>
    );
}