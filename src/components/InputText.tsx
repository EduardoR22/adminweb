export default function InputText({setText}: {setText:Function}){
  
  // const onChange = (text: string) => {
  //   console.log('onchange');
  //   console.log(text);
  // }
  
  return(
    // <input type="text" />
    <textarea 
      className="w-2/3 border border-gray-300 mx-2 resize-none py-1 px-1 outline-none outline-0" 
      rows={2}
      onChange={(e) => setText(e.target.value)} 
      //onChange={(e) => onChange(e.target.value)}
    />
  )
}