import { useState } from 'react'
import axios from 'axios'


export default function ResumeInput(){
    const [content, setContent] = useState(null);
    const [resp, setResp] = useState('');
    const uri='/api/v1/resume';

    return (
        <>
        <form>
            <input type="file" value={content} onChange={e=>
                setContent(e.target.value)}/>

            <button type="button" value="Resume Reviewer" onClick={async() => {
                const data ={
                    Resume: {content}
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