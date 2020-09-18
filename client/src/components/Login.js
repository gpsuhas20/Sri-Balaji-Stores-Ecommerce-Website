import React,{useState,useEffect} from 'react'
import Cookie from 'js-cookie'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Modal,ModalBody,ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'
const history=createBrowserHistory()



function Login(props)
{
    let props1=props
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    

    const[isEmailValid,setEmailValid]=useState(false)
   

    const [emailerror, setemailerror]= useState('')
  
    let emailRegex = /^\S+@\S+\.\S+$/;
    
    function red()
    {
      props1.history.push('/')
    }

    const [isSuccessOpen2 , setSuccessOpen2] = useState(false);
    function toggleSuccessModal2(prevState) {
        setSuccessOpen2(!isSuccessOpen2)

        setTimeout(()=>
        {
            red();
        },3000)
    }     



    const responsegoogle = (response )=> {// for login response google
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
             toggleSuccessModal2()
           
           
          })
          .catch(error => {
            console.log('GOOGLE SIGNIN ERROR', error.response);
          });
        }
     
      const responseFacebook = (response) => {
        
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
               toggleSuccessModal2()
             
              })
              .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
              });
             
    }


    const formValidation4=(e)=>{
        const emailerror={};
      
        if(!emailRegex.test(email))
        {
            emailerror.notemail="Enter valid email"
            setEmailValid(false)
            setemailerror(emailerror)
        }
        else{
            setEmailValid(true)
            
            emailerror.notemail=""
          
            setemailerror(emailerror)
        }
        
      }


   async function handlelogin(e)
    {
        e.preventDefault();
        
       
        const {data}= await axios.post("http://localhost:5000/users/login", {email,password})
    
        if(data=="Invalid Username and password")
        {
            const emailerror={};
            emailerror.notemail="Invalid Email or Password"
            setemailerror(emailerror)
            
        }
        else
        {
           
            Cookie.set('userInfo', JSON.stringify(data));
            Cookie.set('login',JSON.stringify(true))
            Cookie.set("modeoflogin",JSON.stringify("normal"))
            console.log(data)
            await toggleSuccessModal2()
            
            
           
         }
    
     
      
       
    }

   
   
    return(
        <>
        <div className='login-heading'>LOGIN FORM</div>
            <Form className='container login-form ' >
                    <FormGroup className='login-input'>
                        <Label   htmlFor='email'><strong> Email</strong> </Label>
                        <Input type='email' name='email' id='email' placeholder='Email'  onChange= {(e)=> setEmail(e.target.value)} onBlur={(e)=>formValidation4()}></Input>
                        {Object.keys(emailerror).map((key)=>{
                                if(!isEmailValid)
                                return <p style={{color:"red"}}>{emailerror[key]}</p>
                                else
                                return <p></p>
                            })}    
                    </FormGroup>
                    <FormGroup className='login-input'>
                        <Label htmlFor='password'> <strong>Password</strong></Label>
                        <Input type='password' name='password' id='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)} ></Input>
                        
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-4' style={{marginLeft:'1rem'}} type='submit' onClick={(e)=>handlelogin(e)}  color='primary'><span className='fa fa-paper-plane fa-lg' ></span> LOGIN </Button>
                    </FormGroup>
                   
              
<FormGroup className='row'>
                <FacebookLogin 
    appId="316383022969965" 

    fields="name,email,picture"
    autoLoad={false}
    callback={responseFacebook}
    
    render={renderProps => (
        <span className='col-10 col-sm-4 fa fa-facebook' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login With facebook</span>
      )}
     />
     </FormGroup>

     <FormGroup className='row'>
   <GoogleLogin 
        clientId="323182642781-39lt59q309bkj7n90486390v79tt2jip.apps.googleusercontent.com"
        onSuccess={responsegoogle}
        onFailure={responsegoogle}
        render={renderProps => (
          <Button  className='col-10 col-sm-4'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{marginLeft:'1rem'}}
          ><span className='fa fa-google'></span>
            Login With Google
          </Button>
        )}/> 
      </FormGroup>
  </Form>

  <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen2} toggle={toggleSuccessModal2}>
            <ModalHeader toggle={toggleSuccessModal2} className='success-modal-text'> <p><strong></strong></p> </ModalHeader>
            <ModalBody>
                
                    <p>You are successfully logged in!</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
    </div>    
              
        </>
    )
}
export default Login