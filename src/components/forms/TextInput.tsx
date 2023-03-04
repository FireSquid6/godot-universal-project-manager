import { version } from "react"

interface props {
  label?: string
  initialValue?: string
  inputId: string
  versionInput?: boolean
  onChange: (value: string) => void
}


export default function TextInput({versionInput=false, initialValue, inputId, label="", onChange}: props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    let valid = true;
    if (versionInput) {
      // validate that the version is valid
      const versionRegex = /^\d+\.\d+\.\d+/;
      valid = versionRegex.test(value) 
    }

    if (valid) {
      onChange(value);
    }
  }


  return (
    <div className="text-input">
      <label htmlFor={inputId}>{label}</label>
      <input type="text" onChange={handleChange} defaultValue={initialValue}></input>
    </div>
  )
}