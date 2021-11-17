import React, { useState } from 'react'

export default function Upload() {
    const [uploadStatus, setUploadStatus] = useState(false)
    // const [file, setFile] = useState("")
    // const [name, setName] = useState("")
    const [formData, setFormData] = useState({
        name: '',
        truth1: '',
        truth2: '',
        lie: ''
    })

    /*
    questionSet = {
        name: 'Bill',
        truth1: 'a',
        truth2: 'b',
        lie: 'c',
        shown: true
    }
    let diplayOrder = ['truth1', 'truth2', 'lie']
    let shuffleArray = array => {
        for (let i = array.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    shuffleArray(displayOrder)
    const sentences = displayOrder.map(order => <Sentence text={questionSet[order]} className={order} reveal={reveal}/>)
    */

    const handleChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    // const storeFileLocally = e => setFile(e.target.files[0])

    // const handleNameChange = e => setName(e.target.value)

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
    // const handleUploadClick = async () => {
    //     setUploadStatus('Uploading . . .')
    //     const imageData = new FormData()
    //     imageData.append('upload_preset', 'stand-app')
    //     imageData.append('file', file)

    //     // 1. store the image on eg. Cloudinary, get the link 
    //     console.log('Storing image')
    //     const resp = await fetch('https://api.cloudinary.com/v1_1/dv6zt4gxq/image/upload', {
    //         method: 'POST',
    //         body: imageData
    //     })
    //     const { error, url } = await resp.json()
    //     if(error){return}

    //     const imageUrl = url

    //     // // 2. send the image link and user's name to our storage
    //     console.log('Saving submission')
    //     const submissionData = { imageUrl, name }
    //     const dbresp = await fetch('/api/upload', {
    //         method: 'POST',
    //         body: JSON.stringify(submissionData)
    //     })
    //     const dbdata = await dbresp.json()
    //     dbdata.message ? setSuccess() : console.error('Something went wrong....')    
    // }

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
    )
}
