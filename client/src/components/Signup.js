import React,{useState,useEffect} from 'react'
import Cookie from 'js-cookie'
import { createBrowserHistory } from 'history'


import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Modal,ModalBody,ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios';

const history=createBrowserHistory()
function Signup(props)
{
    let props1=props
    const re = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
    let emailRegex = /^\S+@\S+\.\S+$/;

    /*let isEmailValid2=false;
    let isPasswordValid2=false;
    let isRepasswordValid2=false;*/

    const [isSuccessOpen3 , setSuccessOpen3] = useState(false);
    function toggleSuccessModal3(prevState) {
        setSuccessOpen3(!isSuccessOpen3)
    }    

    const[ isEmailValid2,setemailValid2]=useState(false)
    const[ isPasswordValid2,setpasswordValid2]=useState(false)
    const[ isRepasswordValid2,setrepasswordValid2]=useState(false)

    const [emailerror2, setemailerror2]= useState('')
const [passworderror2, setpassworderror2]= useState({})
const [repassworderror2, setrepassworderror2]= useState({})

const [isSuccessOpen1, setSuccessOpen1] = useState(false);
    const [email2, setEmail2] = useState('');
    const [password2 , setPassword2] = useState('');
    const [repassword2 , setRepassword2] = useState('');

    function red()
    {
      props1.history.push('/customerinfo')
    }

    const [isSuccessOpen2 , setSuccessOpen2] = useState(false);
    function toggleSuccessModal3(prevState) {
        setSuccessOpen3(!isSuccessOpen3)

        setTimeout(()=>
        {
            red();
        },3000)
    }     

    function redirectlogin()
  {
    props1.history.push('/login')
  }
    const formValidation6=(e)=>{
        const emailerror2={};
      
        if(!emailRegex.test(email2))
        {
            emailerror2.notemail2="Enter valid email"
           setemailValid2(false)
            setemailerror2(emailerror2)
        }
        else{
            setemailValid2(true)

            emailerror2.notemail2=""
           
            setemailerror2(emailerror2)
        }
        
      }
      
      const formValidation7=(e)=>{
        const passworderror2={};
      
        if(password2.trim().length<=6)
        {
            passworderror2.notpassword2="Password should be more than 6 characters"
            setpasswordValid2(false)
            setpassworderror2(passworderror2)
        }
        else{
            
            setpasswordValid2(true)
            
            passworderror2.notpassword2=""
         
            setpassworderror2(passworderror2)
        }
        
      }
      const formValidation8=()=>{
        const repassworderror2={};
      
        if(password2!=repassword2)
        {
            repassworderror2.notrepassword2="Password does not match the above password"
            setrepasswordValid2(false)
            setrepassworderror2(repassworderror2)
        }
        else{
           
            repassworderror2.notrepassword2=""
            setrepasswordValid2(true)
            setrepassworderror2(repassworderror2)
        }
        
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    const responsegooglesignup = (response )=> {// for signupresponse google
        console.log(response)
        console.log(response.accessToken);
        axios({
          method: 'POST',
          url: `http://localhost:5000/users/google`,
          data: { idToken: response.tokenId }
        })
       
          .then(response => {
            console.log('GOOGLE SIGNIN SUCCESS', response);
            Cookie.set('login',JSON.stringify(true))
            Cookie.set('userInfo', JSON.stringify(response.data));
            Cookie.set('modeoflogin',JSON.stringify("google"))
            Cookie.set('userSignin', JSON.stringify(response.data));
            toggleSuccessModal3()
           
           
          })
          .catch(error => {
            console.log('GOOGLE SIGNIN ERROR', error.response);
          });
        }
     
      const responseFacebooksignup = (response) => {
        
            console.log(response);
           
            axios({
              method: 'POST',
              url: "http://localhost:5000/users/facebooklogin",
              data: { response}
            })
              .then(response => {
                console.log('FACEBOOK SIGNIN SUCCESS', response.data);
             
                Cookie.set('login',JSON.stringify(true))
                Cookie.set('modeoflogin',JSON.stringify("facebook"))
                Cookie.set('userInfo', JSON.stringify(response.data));
                Cookie.set('userSignin', JSON.stringify(response.data));
              
                toggleSuccessModal3()
              })
              .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
              });
             
    }
    

   async function handleSignup(e)
   {
    e.preventDefault()

  
  if(isEmailValid2 && isPasswordValid2 && isRepasswordValid2){
      const email=email2;
      const password=password2;
    const {data}= await axios.post("http://localhost:5000/users/signin", {email,password})
    Cookie.set('userSignin', JSON.stringify(data));
    Cookie.set('modeoflogin',JSON.stringify("normal"))

    toggleSuccessModal3()
    
   
   }
   else{
       alert("Enter details properly")
      
   }
   }
    return(

        <>

                <Form>
                    <FormGroup>
                        <Label htmlFor='email'><strong> Email</strong> </Label>
                        <Input type='email' name='email2' id='email2' placeholder='Email'  onChange= {(e)=> setEmail2(e.target.value) } onBlur={(e)=>formValidation6(e.target.value)}></Input>
                        {Object.keys(emailerror2).map((key)=>{
                                if(!isEmailValid2)
                                return <p style={{color:"red"}}>{emailerror2[key]}</p>
                                else
                                return <p></p>
                            })}  
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'> <strong>Password</strong></Label>
                        <Input type='password' name='password2' id='password2' placeholder='Password' onChange={(e)=> setPassword2(e.target.value)} onBlur={(e)=>formValidation7(e.target.value)}></Input>
                        {Object.keys(passworderror2).map((key)=>{
                                if(!isPasswordValid2)
                                return <p style={{color:"red"}}>{passworderror2[key]}</p>
                                else
                                return <p></p>
                            })} 
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='repassword'> <strong>Confirm Password</strong></Label>
                        <Input type='password' name='repassword2' id='repassword2' placeholder=' Confirm Password' onChange={(e)=> setRepassword2(e.target.value)} onBlur={(e)=>formValidation8()}></Input>
                        {Object.keys(repassworderror2).map((key)=>{
                                if(!isRepasswordValid2)
                                return <p style={{color:"red"}}>{repassworderror2[key]}</p>
                                else
                                return <p></p>
                            })} 
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-6 offset-sm-3' type='submit'  onClick={(e)=>handleSignup(e)} color='primary'><span className='fa fa-paper-plane fa-lg' ></span>  Submit </Button>
                    </FormGroup>
                   
              

                <FacebookLogin
            appId="316383022969965" 

            fields="name,email,picture"
            autoLoad={false}
            callback={responseFacebooksignup}
    
    render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom FB button</button>
      )}
     />
   <GoogleLogin
        clientId="323182642781-39lt59q309bkj7n90486390v79tt2jip.apps.googleusercontent.com"
        onSuccess={responsegooglesignup}
        onFailure={responsegooglesignup}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
          >
            <div className=' p-2 rounded-full '>
              <i className='fab fa-google ' />
            </div>
            <span className='ml-4'>Sign In with Google</span>
          </button>
        )}/> 
         <Button className="btn" onClick={redirectlogin}>Already have an account?</Button>
         </Form>

         <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen3} toggle={toggleSuccessModal3}>
            <ModalHeader toggle={toggleSuccessModal3} className='success-modal-text'> <strong></strong> </ModalHeader>
            <ModalBody>
                
                    <p>You are successfully signed in!</p>
                    
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                              
                    
            </ModalBody>
        </Modal>
    </div>

        </>
      
    )
}
export default Signup