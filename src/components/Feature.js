import React, { useState } from 'react'

export default function Feature({ sub, submit, submitLie }) {
    const { name } = sub.data
    // const imageId = sub.ref['@ref'].id
    const id = sub.ref['@ref'].id
    // const id = sub.ts
    const [revealed, setRevealed] = useState(false)
    const [revealedLie, setRevealedLie] = useState(false)
    const [responded, setResponded] = useState(false)
    const [respondedLie, setRespondedLie] = useState(false)
    // const [overview, setOverview] = useState(false)

    let displayOrder = ['truth1', 'truth2', 'lie']
    let shuffleArray = array => {
        for (let i = array.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i+1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    shuffleArray(displayOrder)
    console.log('displayOrder: ', displayOrder);
    const sentences = displayOrder.map(order => (
        <li 
            key={id + order}
            className={revealedLie ? order : 'sentence'}
        >
            {sub.data[order]}
        </li>))

    const handleRevealClick = async () => {
        if(revealed){return}
        const resp = await fetch('/api/reveal', {
            method: 'PATCH',
            body: JSON.stringify({ id })
        })
        const { error, message } = resp.json()
        error ? console.error('Something went wrong...', message) : setRevealed(true)
    }

    const handleRevealLie = () => {
        if(revealedLie){return}
        setRevealedLie(true)
    }

    const setResult = async result => {
        if(responded){return}
        // const resp = await submit(imageId, result)
        await submit(id, result)
        setResponded(result ? "Y" : "N")
    }
    const setResultLie = async result => {
        if(respondedLie){return}
        // const resp = await submit(imageId, result)
        await submitLie(id, result)
        setRespondedLie(result ? "Y" : "N")
    }

    const resultClasses = revealed ? "result visible" : "result hidden"

    const resultMessage = () => (
        <div>
            <p>{responded === "Y" ? "Nice! you guessed the name!" : "Boo... wrong person" }</p>
        </div>)
    const lieResultMessage = () => (
        <div>
            <p>{respondedLie === "Y" ? "Great, you're a lie detector!" : "Aww... fooled again!" }</p>
        </div>)

    return (
        <div className="featured">
            <code>:belongs_to <span onClick={handleRevealClick} disabled={revealed}>{revealed ? name : 'Reveal'}</span></code>
            <ul>
                {sentences}
            </ul>
            <button disabled={revealedLie} onClick={handleRevealLie}>Reveal LIE</button>
            <div className={resultClasses}>
                { responded ? 
                    resultMessage()
                :
                    <><div>Did you get the right person?</div>
                    <button disabled={responded} onClick={()=>setResult(false)}>No</button>  <button disabled={responded} onClick={()=>setResult(true)}>Yes!</button></>
                }
                { respondedLie ? 
                    lieResultMessage()
                :
                    <><div>Did you guess which was the lie?</div>
                    <button disabled={respondedLie} onClick={()=>setResultLie(false)}>No</button>  <button disabled={respondedLie} onClick={()=>setResultLie(true)}>Yes!</button></>
                }
            </div>
        </div>
    )
}
