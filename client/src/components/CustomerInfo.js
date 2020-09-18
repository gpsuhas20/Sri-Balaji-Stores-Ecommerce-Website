import React,{useState,useEffect} from 'react'
import Cookie from 'js-cookie'
import axios from 'axios';
import { createBrowserHistory } from 'history'
import {Modal,ModalBody,ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap'
const history=createBrowserHistory()
function CustomerInfo(props)
{
    let props1=props;
    const re=/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    //const re = /^[(]?[6-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [nameerror, setnameerror]= useState({})
    const [phoneerror, setphoneerror]= useState({})
    const [addresserror, setaddresserror]= useState({});

    const[ isNameValid,setNameValid]=useState(false)
    const[ isPhoneValid,setPhoneValid]=useState(false)
    const[ isAddressValid,setAddressValid]=useState(false)

    const [isSuccessOpen1, setSuccessOpen1] = useState(false);

    function red()
    {
        const modeoflogin=(Cookie.getJSON('modeoflogin'));

        if(modeoflogin=="normal")
            {props1.history.push('/login')}
        else
        {
            props1.history.push('/')
        }
    }

    function toggleSuccessModal1(prevState) {
        setSuccessOpen1(!isSuccessOpen1)

        setTimeout(()=>
        {
            red();
        },3000)
    } 

    const formValidation=(e)=>{
        const nameerror={};
        if(name.trim().length<5)
        {
            nameerror.nameshort="Name is too short"        
            setNameValid(false)
            setnameerror(nameerror)
        }
       
        else{
            setNameValid(true)
        }
      }
      const formValidation2=(e)=>{
        const phoneerror={};
      
        if(!re.test(phone) || phone.trim().length!=10)
        {
            phoneerror.notphone="Contact number should be a valid number"
            setPhoneValid(false)
            setphoneerror(phoneerror)
        }
        else{
            setPhoneValid(true)
        }
        
      }
      const formValidation3=(e)=>{
        const addresserror={}; 
      
        if(address.trim().length<10)
        {
            addresserror.shortaddress="Enter detailed address"
            setAddressValid(false)
            setaddresserror(addresserror)
        }
        else{
            setAddressValid(true)
        }
      }


    async function registration(e)
    {
        e.preventDefault();

        if(isNameValid  && isPhoneValid && isAddressValid){
    
   
            var modeoflogin=Cookie.getJSON('modeoflogin')
            var userid=''
            var userSignin=Cookie.getJSON("userSignin")
            if(modeoflogin==="normal")
             {userid=userSignin._id
              Cookie.set('modeoflogin',JSON.stringify("normal"))
            }
             else
             {
              userid=Cookie.getJSON("userSignin").user._id;
              Cookie.set('modeoflogin',JSON.stringify("google"))
             }
           
             
            const {data}= await axios.put("http://localhost:5000/users/signin", {userid,name,phone,address },
            {headers: {
             Authorization: 'Bearer ' + userSignin.token
           }}
           )
           toggleSuccessModal1();

        }




    }
   
    return(
        <>


                    <Form >
                        <FormGroup>
                            <Label htmlFor='name'><strong> Name</strong> </Label>
                            <Input type='text' name="name" id='name' onChange={(e)=>setName(e.target.value)} onBlur={(e)=>formValidation(e.target.value)} />
                            {Object.keys(nameerror).map((key)=>{
                                if(!isNameValid)
                                return <p style={{color:"red"}}>{nameerror[key]}</p>
                                else
                                return <p></p>
                            })}   
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='phone'><strong> Contact Number</strong> </Label>
                            <Input type="number" name="phone" id='phone' onChange={(e)=>setPhone(e.target.value)} onBlur={(e)=>formValidation2(e.target.value)}/>
                            {Object.keys(phoneerror).map((key)=>{
                                if(!isPhoneValid)
                                return <p style={{color:"red"}}>{phoneerror[key]}</p>
                                else
                                return <p></p>
                            })}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='address'><strong>Address</strong>  </Label>
                            <Input type='textarea' name='address' id='address' onChange={(e)=>setAddress(e.target.value)} onBlur={(e)=>formValidation3(e.target.value)}/>
                            {Object.keys(addresserror).map((key)=>{
                                if(!isAddressValid)
                                return <p style={{color:"red"}}>{addresserror[key]}</p>
                                else
                                return <p></p>
                            })}
                        </FormGroup>
                        <FormGroup className='row'>
                            <Button className='col-10 col-sm-6 offset-sm-3' type='submit' onClick={(e)=>registration(e)}> Submit </Button>
                        </FormGroup>
                    </Form>
                   

                    <div className="container">
            <Modal className='success-modal' isOpen = {isSuccessOpen1} toggle={toggleSuccessModal1}>
            <ModalHeader toggle={toggleSuccessModal1} className='success-modal-text'> <strong></strong> </ModalHeader>
            <ModalBody>
                
                    <p>Thank you for providing your details!</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
    </div>  


        </>

    )
}
export default CustomerInfo