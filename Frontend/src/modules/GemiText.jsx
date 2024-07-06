import { useState, useEffect } from 'react'
import axios from 'axios'


export default function GemiTextbox(){
    const [content, setContent] = useState('');
    
    return (
        <form>
            <input type="text" value={content} onChange={e=>
                setContent(e.target.value)}/>

            <button type="submit" value="Call Gemi" onClick={async() => {
                const prompt = { content };
                
                const res = await fetch("http://localhost:5173/gemi", {
                    method: "POST",
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(prompt)
                })
                if(res.ok){
                    console.log("It Worked")
                    setContent('')
                }
            }}>Submit</button>

        </form>
    );
}