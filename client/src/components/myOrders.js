import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody, Button} from 'reactstrap';
import {ORDERS} from '../shared/orders';
import SearchBar from './searchbar'
import axios from 'axios'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'

function RenderCard({item}) {

    return(

        <>
         <SearchBar back={'/home'}/>
        <Card className='order-card' style={{textAlign:'center'}}>
            <CardHeader>
                <div>Placed on {item.placedon} </div>
                <div>Scheduled for {item.scheduledon}</div>
            </CardHeader>
            <CardBody>
                <div className='p-1'><span className='fa fa-shopping-bag'>{' '}</span> Delivered by SBS</div>
                <div className='p-1'><strong>SBS store - RT Nagar</strong> - <span>{' '}</span><span className='fa fa-rupee fa-xs'>{' '}</span> {item.totalamount}</div>
                <div>Delivery Charges - <span style={{color:'green'}}><strong>FREE</strong></span></div>
                <div className='pb-1'>Order ID: {item.orderid}</div>
                <div className='pb-2'> <strong>Total Payable Amount</strong> -<span>{' '}</span><span className='fa fa-rupee fa-xs'>{' '}</span> {item.totalamount}</div>
                
                <Link to={{
            pathname: "/orders",
            search: "?orderid="+item.orderid 
          }}>  
          <p></p>
          <Button type='submit' value='submit'  className='col-10 col-sm-3 myorder-button'> View Details </Button>
                </Link> 
            </CardBody>
        </Card>
</>
            

           
    )

}

function MyOrders(props)
 {

    const [data, setdata] = useState('')
    var userinform=(Cookie.getJSON('userInfo'))||null

    var logintype=Cookie.getJSON('modeoflogin')||''
  
        userinform=(Cookie.getJSON('userInfo'))||null
        var logintype=Cookie.getJSON('modeoflogin')||false
        const[noorders,setnoorders]=useState(false)

    
    
    useEffect(() => {
        
        const fetchorders=async()=>{

            if(logintype)
            {let config
            if(logintype=="normal")
            {
             config = {
                
                params: {
                    email: userinform.email
                }
              }
            }
            else
            {
                 config = {
                   
                    params: {
                        email: userinform.user.email
                    }
                  }

            }

         const d = await axios.get('http://localhost:5000/orders/userorder',config)
        setdata(d.data)}
        else
        {
            setdata(false)
            setnoorders(true)
        }
        }
       fetchorders()        
        console.log(data)
      }, [])

      console.log(data)
     



if(data) 
    {const orders = data.map((item) => {
        return(
            <div key={item.id} className='col-12 col-sm-11 '>
                <RenderCard item={item}/>

            </div>
        )
    })

    return(
        <div className='container'>
            <div className='row'>
                <div className='col-10 col-sm-11 p-2'>
            <div className='myorder-heading'>
            <strong>My Orders</strong>
            </div>
            </div>
            </div>
           
            <div className='row'>
                {orders}
            </div>

        </div>
    )
    }
    else
    {
        if(noorders)

        {
            return(<>No orders</>)
        }
        else

        {return(
            <> <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div></>
        )}
    }

}

export default MyOrders