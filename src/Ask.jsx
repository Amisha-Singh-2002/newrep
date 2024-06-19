import React,{useState} from 'react'
import './Ask.css'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { FaPerson } from "react-icons/fa6";
import { PiFinnTheHumanFill } from "react-icons/pi";
const Ask = () => {
  const [loading, setLoading] = useState(false)
  const User = useUser();
  React.useEffect(() => {
   const f=async() =>{
     if(User && User.isLoaded && User.user)
      {
        
        
        console.log(User.user.emailAddresses[0].emailAddress);
      }
   else{
      console.log("User not loaded");
   }
  }
  f();
   
  }, [User])
    const genAI = new GoogleGenerativeAI('AIzaSyC9D09pfSRttFDvPgKYuxQ4KDSMzRMh4kY');
    const [q, setQ] = useState('')
    const [data, setData] = useState([])
    async function getdata(){
      console.log("Get", User)
      if(User.user)
        {
          const res= await axios.get('http://localhost:8080/ask',{params:{Email:User.user.emailAddresses[0].emailAddress}})
          console.log(res.data)

          setData(res.data)
        }
    }

    React.useEffect(() => {
      getdata()
    }, [User.isLoaded])
    async function run(question) {
      try{
      // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        
        const prompt = question;
        console.log("prompt ",prompt);
        const result = await model.generateContent(prompt);
        console.log("result ", result);
        const response = await result.response;
        console.log("response ", response);
        const text = response.text();
        console.log(text);
        const q={
          Ques:prompt,
          Ans:text,
          Email: User.user.emailAddresses[0].emailAddress
        }
        setData([...data,q])
       const res= await axios.post('http://localhost:8080/ask',q)
        console.log(res.data)
      }catch(e){
        console.log(e)
      }
    }
    
  
    const changeq = (e) => {
      setQ(e.target.value)
    }
    const ask = async() => {
      setLoading(true)
      await run(q);
      setLoading(false)
    }
  return (
    <div className='askout'>
      {(User.user) ? 
       <div>
        {loading?<div className='outsideload'>
          <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
	<div className="wheel"></div>
	<div className="hamster">
		<div className="hamster__body">
			<div className="hamster__head">
				<div className="hamster__ear"></div>
				<div className="hamster__eye"></div>
				<div className="hamster__nose"></div>
			</div>
			<div className="hamster__limb hamster__limb--fr"></div>
			<div className="hamster__limb hamster__limb--fl"></div>
			<div className="hamster__limb hamster__limb--br"></div>
			<div className="hamster__limb hamster__limb--bl"></div>
			<div className="hamster__tail"></div>
		</div>
	</div>
	<div className="spoke"></div>
</div>


        </div>:

          <div className='unfix'>
            
            {data.map((d,k) => {
              return(
                <div key={k} className="container1">
                    <div className="input-container1">
                        <div className="input-content1">
                            <div className="input-dist1">
                                <div className="input-type1">
                                      <div className="input-is1">
                                          <FaPerson />&nbsp; &nbsp; &nbsp;{d.Ques}
                                      </div>
                                      <div className="input-is1">
                                        <PiFinnTheHumanFill /> &nbsp; &nbsp; &nbsp;{d.Ans}
                                      </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
                })}
            </div>
      }
          <div className='fix'>
          <div className="box-input">
            <div className="border">
              <input type="text" name="text" className="input" placeholder="Name" onChange={changeq} />
            </div>
          </div>

              
          <button onClick={ask}> Submit
          </button>
                </div>
            </div>:
            <div>
              <h1>Sign in to ask questions</h1>
              </div>}
            
    </div>
  )
}

export default Ask