/*import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import data from '../shared/datap';
import {Card,CardImg,CardBody,CardSubtitle, CardTitle, Button, Badge} from 'reactstrap'
import axios from 'axios'
function Demo(props)
{
    const[data2,setdata]=useState()
     useEffect(() => {
     const fetchusers=async()=>
     {

    try{
    var data1=await axios.get('http://localhost:5000/orders?orderid='+props.location.search.split('?orderid=')[1])
    setdata(data2)
    console.log(data1)
   
    }
    catch(error)
    {
      console.log("no orders")
    }
     
   }
   fetchusers()
  },[])
    const checkoutHandler = () => {
        props.history.push("/delivery");
      }
    return(
        <div className="container ">
        <div className="row row-content">
            <div className="col-sm-6 align-items-center justify-content-between">
            <div className="allpageheader">
                <h1><img src="/images/myorders.png" className="icons ml-2"></img> My Orders</h1>
            </div>    
                <br/>
                <div className="products">
                    {
                data.products.map(product =>
                    <Card className="pcard">
                        <div className="row no-gutters">
                            <div className="col-sm-5">
                            <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
                                <img className="pprod-img mt-4" src={product.image}/>                                
                            </div>
                            <div className="col-sm-7">
                                <CardBody className="card-body">                            
                                    <CardSubtitle style={{fontSize:"0.5em"},{textAlign:"center"}}><strong >{product.name}</strong>                                    
                                    <CardTitle className="mt-3" style={{fontSize:"0.5em"},{textAlign:"center"}}><strong><img src="/images/rupee.png" className="icons" alt="icons"></img>
                                    {product.sp}</strong><strong><strike style={{fontSize:"0.5em"},{padding:"3px"},{color:"grey"}}>{product.mrp}</strike></strong><strong>x{product.qty}</strong></CardTitle>                          
                                    <p className="product-price" style={{fontSize:"0.5em"},{textAlign:"center"}}>Total price <img src="/images/rupee.png" className="icons" alt="icons"></img>{product.sp*product.qty}</p>
                                    </CardSubtitle>
                                </CardBody>
                            </div>
                        </div>
                    </Card>   
                )
                }
                </div>
            </div>
            <div className="col-sm">
                <div className="pcard">
                    <h3 className="card-header text-black summary">Order Summary</h3>
                    <div className="card-body">
                        <dl className="row">
                            <dt className="col-6">Total Amount</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons"></img>200</dd>
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Delivery charges</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons"></img>50</dd>
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Total Payable Amount</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons"></img>250</dd>
                        </dl>
                    </div>                    
                </div>
                <br></br>
                            
            </div>
         </div>
    </div>
    );
}

export default Demo;*/



import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge} from 'reactstrap'
//import data from '../shared/datap';
import axios from 'axios'
import Cookie from 'js-cookie'


 var totalmrp=0
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

function Summary()

{
    return(
        <RenderPaymentSummary/>
    )
}



function RenderItem({product})
{
    const[img,setimg]=useState('');
  
    useEffect(async()=>
{
  var base64Flag = 'data:image/png;base64,';
  var imageStr =await arrayBufferToBase64(product.image.data.data) 
 var image= await base64Flag + imageStr
 setimg(image)
 
},[])
   
return(
  
<Card className=' view-card' >
<span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
  <CardImg  className="prod-img"   src={img}/>
  <CardBody className="prod-card-body">
<div className="cart1">
<p className='prod-text m-0' style={{textAlign:"center"}}><strong >{product.productname}</strong><strong >{' '}{product.quantity}*{product.count}</strong></p>
<p className='prod-text m-0' ><strong><span className='fa fa-rupee'></span> {product.sp}</strong><strong><strike style={{color:"grey"}}>{product.mrp}</strike></strong></p></div>
<div className="cart2">

      </div>
  </CardBody>
</Card>

    )

}


function RenderPaymentSummary({product})
{
if(product)
   { const total=product.products.map((item)=>
    {
        totalmrp=totalmrp+(item.mrp*item.count)
    })
    return(
        <div className='container detailsummary'>
            
        <div className="offset-sm-1 col-12 col-sm-10">
                <div className="paysummarycard">
                    <h3 className="card-header text-black summary">Order Summary</h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">Total MRP</div>
                            <div className="col-6"><img src="/images/rupee.png" className="icons"></img>{totalmrp}</div>
                            <div className="col-6"></div>
                            <div className="col-6"></div>
                            <div className="col-6">Delivery charges</div>
                            <div className="col-6"><strong style={{color:'green'}}>FREE</strong></div>
                            <div className="col-6"></div>
                            <div className="col-6"></div>
                            <div className="col-6">Total Payable Amount</div>
                            <div className="col-6"><img src="/images/rupee.png" className="icons"></img>{product.totalamount}</div>
                        </div>
                    </div>                    
                </div>
                <br></br>
                           
            </div>
            </div>
    )
   }
   else
   {
       return(<>Loading</>)
   }
}

function Item(props)
  {
    const [data, setdata] = useState('')
    const userinform=JSON.parse(Cookie.get('userInfo'))
    
    
    useEffect(() => {
        
        const fetchorders=async()=>{
            let config = {
                headers: {'Authorization': 'Bearer ' + userinform.token},
                params: {
                    orderid: props.location.search.split('?orderid=')[1]
                }
              }

         const d = await axios.get('http://localhost:5000/orders/',config)
        setdata(d.data.order[0])
        }
       fetchorders()        
       
      }, [])

      console.log(data)
 
 
    if(data) {

    const items=data.products.map((item)=>
    {

      
      return(
        
        <div key={item.productid} className="  col-12 offset-sm-0 col-md-4 col-lg-3">
          <RenderItem product={item}/>
         
           </div>
           
        )
       
    })
    
    
    return(
        <div className="container ">
            <div className="row row-content">
                <div className="col-12 align-items-center justify-content-between">
                    <div className="allpageheader">
                        <h1><img src="/images/myorders.png" className="icons ml-2"></img> Order Details</h1>
                    </div>
                    <br/>
                </div>
            </div>
            <div className="row">
                {items}
            </div>
            <div  className="offset-1 col-10 mt-4">
            <RenderPaymentSummary product={data}/>
            </div>
        </div>      
    )
    }
    else {
        return(<>Loading</>)
    }
}
 export default Item
