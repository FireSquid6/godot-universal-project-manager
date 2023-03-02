interface props {
  label: string
  inputId: string
}


export default function TextInput({label, inputId}: props) {
  return (
    <div className="text-input">
      <label htmlFor={inputId}>{label}</label>
      <input type="text" id={inputId} defaultValue={''}></input>
    </div>
  )
}