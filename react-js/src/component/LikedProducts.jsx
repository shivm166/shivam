/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Categories from './Categories';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Home.css';
import { IoHeart } from "react-icons/io5";


function LikedProducts() {
  // State and variables
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [Cproducts, setCProducts] = useState([]);
   const [search, setsearch] = useState(['']);
   

  // useEffect to check for authentication token
 /* useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  // useEffect to fetch products from the server
  useEffect(() => {
    const url = 'http://localhost:4000/liked-products';
    axios.get(url)
      .then((res) => {
        // Log the response
        if (res.data.Products) {
          setProducts(res.data.Products);
         // Log the state after setting
        }
      })
      .catch((err) => {
       
        alert('Something went wrong while fetching products.');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handlesearch=(value)=>{
    setsearch(value);

  }

  const handleClick=()=>{
    let filteredProducts =products.filter((item)=>{
      if(item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())){
        return item;
      }
    })
    setCProducts(filteredProducts)
  }

  const handleCategory=(value)=>{
     let filteredProducts =products.filter((item,index)=>{
      if( item.category==value){
        return item;
      }
    })
    setCProducts(filteredProducts)

  }

  const handleLike = (ProductId)=>{
    let userId = localStorage.getItem('userId');
    console.log('userId',"ProductId",ProductId,userId);
    
    const url = 'http://localhost:4000/like-product';
    const data={userId,ProductId}
    axios.post(url,data)
      .then((res) => {
        if(res.data.message ){
          alert ('like succesfull')
        }
      })
      .catch((err) => {
       
        alert('Something went wrong while fetching products.');
      });
  }

  // JSX rendering
  return (
    <div>
      <Header  search = {search}handlesearch={handlesearch} handleClick = {handleClick}/>
         <Categories handleCategory={handleCategory} />

        

        <h5>SEARCH RESULTS</h5>

<div className="d-flex justify-content-center flex-wrap">
      {Cproducts && products.length > 0 &&
      Cproducts.map((item, index) => {
        
        return (
          <div key={item._id} className="card mt-3" >
           <div className="icon-con">
                    <IoHeart  onClick={()=>handleLike(item._id)} className="icons"/>
                  </div>
                     
                  <img width="400px"  height="300px" src={'http://localhost:4000/'+ item.pimage}/>
                 
                <p className="m-2">{item.pname} | {item.category}</p>
               <h3 className="m-2 text-danger">{item.pdesc}</h3>
                <p className="m-2 text-success">{item.price}</p>
              </div>
            )
          })}
        </div>

       <h5> ALL RESULTS</h5>


      <div className="d-flex justify-content-center flex-wrap">
      {products && products.length > 0 &&
      products.map((item, index) => {
        
        return (
          <div key={item._id} className="card mt-3" >

                  <div onClick={()=>handleLike(item._id)} className="icon-con">
                    <IoHeart  className="icons"/>
                  </div>
                   
                   
                  <img width="400px" height="300px" src={'http://localhost:4000/'+ item.pimage}/>
                   
                <p className="m-2">{item.pname} |  {item.category}</p>
               <h3 className="m-2 text-danger">{item.pdesc}</h3>
                <p className="m-2 text-success">{item.price}</p>
              </div>
            )
          },)}
        </div>

           <Footer />

   
    </div>


  );
}

export default LikedProducts;
