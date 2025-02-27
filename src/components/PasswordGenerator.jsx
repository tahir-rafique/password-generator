import { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {


    // password length ka variable
    const [length, setLength] = useState(8)

    // number include ka variable
    const [numInclude, setNumInclude] = useState(false)

    // Symbol/character include ka variable
    const [charInclude, setCharInclude] = useState(false)

    // password initial value + Change Password
    const [password, setPassword] = useState('')



    // useRef -- Hook
    const passwordRef = useRef(null);


    // password generator method/fun
    //  useCallback -- HOOK
    const passwordGenerator = useCallback(() => {
        let pass = ''
        let str = 'ACBDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

        if (numInclude) str += '0123456789'
        if (charInclude) str += '!@#$%^&*~`'

        // length pa looop la gee hia.
        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char)
        }
        setPassword(pass)
    }, [length, numInclude, charInclude, setPassword])


    const copyPasswordToClipboard = useCallback(()=>{
        window.navigator.clipboard.writeText(password)
        alert('copied')
        // passwordRef.current? Select()
        // passwordRef.current ? setSelectionRange()
    } ,[password])

    // useEffect - HOOK
    useEffect(() => { passwordGenerator() }, [length, numInclude, charInclude, passwordGenerator])




    return (
        <div>
            <h1 className="bg-green-300 text-center">Password Generator</h1>
            <div className="w-full max-w-md mx-auto bg-gray-700 text-blue-500 rounded-lg my-8  ">
                {/* top Div input-Password-Generator + copy button */}
                <div className="flex rounded-lg shadow overflow-hidden mb-4">
                    <input
                        type="text"
                        value={password}
                        className="outline-none w-full py-1 px-4 bg-amber-50"
                        placeholder="password"
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        onClick={copyPasswordToClipboard}
                        className="outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0">copy</button>
                </div>

                {/* other inputs */}
                <div className="text-sm flex gap-x-2">
                    <div className="flex items-center gap-x-1">
                        <input
                            type="range"
                            min={6}
                            max={100}
                            value={length}
                            className="cursor-pointer"
                            onChange={(e) => { setLength(e.target.value) }}
                        />
                        <label htmlFor="">Length:{length}</label>
                    </div>


                    {/* Check box  */}
                    {/* jab user Check kary ga tou state update hogee aur checked mark ho jay ga */}
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            defaultChecked={numInclude}
                            id="numInput"
                            className="cursor-pointer"
                            onChange={() => { setNumInclude((prev) => !prev) }}
                        />
                        <label htmlFor="numInput">Number</label>

                    </div>

                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            defaultChecked={charInclude}
                            id="charInput"
                            className="cursor-pointer"
                            onChange={() => { setCharInclude((prev) => !prev) }}
                        />
                        <label htmlFor="charInput">Charcters</label>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default PasswordGenerator;