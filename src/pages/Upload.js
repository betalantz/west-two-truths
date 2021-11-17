import React, { useState } from 'react'

export default function Upload() {
    const [uploadStatus, setUploadStatus] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        truth1: '',
        truth2: '',
        lie: ''
    })


    const handleChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const handleSubmit = async () => {
        setUploadStatus('Submitting...')
        console.log('Saving submission')
        const dbresp = await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        const dbData = await dbresp.json()
        dbData.message ? setSuccess() : console.error('Something went wrong...')
    }
   

    const setSuccess = () => {
        setUploadStatus('Submit successful!')
        resetInputs()
    }

    const resetInputs = () => {
        setFormData({
            name: '',
            truth1: '',
            truth2: '',
            lie: ''
        })
    }

    const reset = () => {
        setUploadStatus(false)
        resetInputs()
    }

    const showUploadWidget = () => {
        return (
            <>
            <input type="text" name="name" value={formData.name} placeholder="Your name" onChange={handleChange}/>
            <input type="text" name="truth1" value={formData.truth1} placeholder="Your first truth" onChange={handleChange}/>
            <input type="text" name="truth2" value={formData.truth2} placeholder="Your second truth" onChange={handleChange}/>
            <input type="text" name="lie" value={formData.lie} placeholder="Your lie" onChange={handleChange}/>
            
            <button onClick={handleSubmit}>Submit!</button>
            </>
        )
    }

    return (
        <>
        <div id="example">
            <p>Example:</p>
            <ul>
                <li style={{color: "greenyellow"}}>I have been ice fishing.</li>
                <li style={{color: "greenyellow"}}>Once I chatted with Cher in an airport.</li>
                <li style={{color: "red"}}>I have never seen a movie made in the 20th century.</li>
            </ul>

        </div>
        <div id="upload">
            {
                uploadStatus ? 
                    <div>
                        <h2>{uploadStatus}</h2>
                        <button onClick={reset} disabled={uploadStatus !== 'Submit successful!'}>Upload another?</button>
                    </div> 
                : showUploadWidget()
            }
            
        </div>
        </>
    )
}
