import { useCallback, useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password, setpassword] = useState("")
  const passwordReference = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass= "" 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@#$%^&*(){};:'<>?|"

    for (let i = 1; i <= length; i++) {      
      let randomIndex = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(randomIndex);
    }
    setpassword(pass);
  }, [length, numberAllowed, characterAllowed, setpassword])

  const copyPasswordtoClipboard = useCallback(() => {
    passwordReference.current?.select();
    //passwordReference.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
    <h1>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwordReference}
            readOnly          
            />

            <button 
            onClick={copyPasswordtoClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

            </div>  
            <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input type="range"
                min = {6}
                max = {20} 
                value = {length}
                className='custom-pointer'
                onChange={(e) => {setLength(e.target.value)}}
                />
                <label>Length: {length}</label>
              </div>

              <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                defaultChecked = {numberAllowed}                
                id="numberInput"
                onChange={(e) => {
                  setnumberAllowed((prev) => !prev);
                }}
                 />
                 <label htmlFor='numberInput'>Numbers</label>
              </div>

              <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                defaultChecked = {characterAllowed}  
                id = "characterInput"
                onChange={(e) => {
                  setcharacterAllowed((prev) => !prev);
                }}              
                 />
                 <label htmlFor='characterInput'>Characters</label>
              </div>



            </div>
      </div>

    </>
  )
}

export default App
