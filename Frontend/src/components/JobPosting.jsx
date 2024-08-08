import { useState } from 'react'
import axios from 'axios'


export default function JobPostingReview(){
    const [content, setContent] = useState('');
    const [resp, setResp] = useState('');
    const uri='/api/v1/jobposting';

    return (
        <>
        <form>
            <input type="text" value={content} onChange={e=>
                setContent(e.target.value)}/>

            <button type="button" value="Call Gemi" onClick={async() => {
                const data ={
                    Joburl: {content}
                }
                try {
                    const response = await axios.post(uri, data);
                    //console.log('Response:', response.data);
                    setResp(response.data["Res"]);
                    setContent('');
                } catch (error) {
                    console.error('Error:', error);
                }
            }}>Submit</button>

        </form>
        {resp && <div>
                <p>
                    {resp}
                </p>
            
            </div>}
        
        </>
    );
}