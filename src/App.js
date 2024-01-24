import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLIMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_+=?><{}[]~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  function changeLenght(e) {
    setLength(e.target.value);
  }

  function checkNumber() {
    setNumberAllowed((prev) => {
      return !prev;
    });
  }
  function checkChar() {
    setCharAllowed((prev) => {
      return !prev;
    });
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  useEffect(() => {
    console.log("APP -> COMOUNT MOUNT");
    return () => {
      console.log("APP -> UNMOUNT COMOUNT LOADED");
    };
  }, [numberAllowed]);

  return (
    <>
      <div className="h-screen flex justify-center center items-center">
        <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 font-medium py-3 my-8 text-zinc-900 bg-gray-200">
          <h1 className="text-gray-950 text-center my-3 font-bold text-xl">
            Password Generator
          </h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-4 text-lg font-semibold">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className=" outline-none bg-slate-700 text-white px-3 py-1 shrink-0 hover:bg-slate-400 hover:text-black"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-2">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={changeLenght}
              />
              <label className="font-semibold text-lg">Lenght:{length}</label>
            </div>
            <div className=" flex items-center gap-x-1.5">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={checkNumber}
                className="w-5 h-5"
              />
              <label htmlFor="numberInput" className="font-semibold text-lg">
                Number
              </label>
            </div>
            <div className="flex items-center gap-x-1.5">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="numberInput"
                onChange={checkChar}
                className="w-5 h-5"
              />
              <label htmlFor="charInput" className="font-semibold text-lg">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
