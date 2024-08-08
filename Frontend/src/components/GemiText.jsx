import { useState, useEffect } from 'react'
import axios from 'axios'


export default function GemiTextbox(){
    const [content, setContent] = useState('');
    
    return (
        <>
        <form>
            <input type="text" value={content} onChange={e=>
                setContent(e.target.value)}/>

            <button type="button" value="Call Gemi" onClick={async() => {
                const prompt = { content };
                
                await axios.post('/api/v1/gemi', {
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