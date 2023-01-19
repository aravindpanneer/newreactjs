import React,{useEffect,useState,useCallback } from 'react'

import axios from 'axios'
import styled from 'styled-components'
import ImageViewer from 'react-simple-image-viewer';
import PostModal from './PostModal';
import Modal from './UpdatePhotos';
import { Link, } from 'react-router-dom';
const url = "http://localhost:8000/api/images"
const MiddleSide = (props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const[showModal, setShowModal]= useState("close") 
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
     const[Photos, setPhotos]=useState([])
     

    useEffect(() => {
        getPhotos()
      },[]);

      

      let getPhotos = async () => {
        let response = await fetch(
            url
        );
        let data = await response.json();
        console.log(data);
        setPhotos(data)
       
      };
 
      const newImages = Photos.map(item=> item.images)
      console.log('new',newImages)

    const handleClick=(e)=>{
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }

        switch(showModal){
            case "open":
                setShowModal("close")
                break;
            case "close":
                setShowModal('open')
                break;
            default:
                setShowModal('close')
                break;
        }

    }






    const handleClickOpen=()=>{
        setModalOpen(!modalOpen)
    }





    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    
      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
      };


      const deleteImages = (id) => {
       
        axios.delete(`http://localhost:8000/api/${id}`)
            .then(res => console.log(res.data)) }
            
        
  return (
    <Container>
    <Sharebox>
    
     
   

    <div>
    <img src= '/images/user.svg' alt =''/>
    <button onClick={handleClick} style={{cursor:'pointer'}}>Click here to Upload  images</button>
    </div>
    <div>

   {/* <button>
    <img src= '/images/new.svg' alt =''/>
    <span>Photos</span>
  </button>*/}
   
    </div>
 
     
    </Sharebox>
    <div>

    {Photos.map((src, index) => (


    <Posts>
    <AllPosts>

   
    
    <a>
    <img src='/images/user.svg' alt=''/>
    <div>
    <span>
    {src.title}
    </span>
    <span>
    Date
    </span>
    </div>
    </a>

    <button>


    <img src= '/images/dots.svg'/></button>

    </AllPosts>


    <Images>

    
   
        <img
          src={ src.images}
          onClick={ () => openImageViewer(index) }
          style={{cursor:'pointer'}}
          key={ index }
         
          alt=""
        />
   
    </Images>
    <Actions>
    <button style={{backgroundColor:'white', cursor:'pointer'}} onClick={()=>deleteImages(src.id)}>
    <img src= '/images/delete2.svg' alt=''/>
   
    </button>

   

    <Link to={`/update/${src.id}`}><button  style={{backgroundColor:'white', cursor:'pointer'}}  onClick={handleClickOpen} >
    
    <img src= '/images/new_edit.svg' alt=''/>
    </button>
{modalOpen &&  <Modal setOpenModal={setModalOpen} />} </Link> 

 
    
    
    </Actions>
    </Posts>

    ))}
    
    {isViewerOpen && (
      <ImageViewer
        src={ newImages }

        currentIndex={ currentImage }
        disableScroll={ false }
        closeOnClickOutside={ true }
        onClose={ closeImageViewer }
      />
    )}
    </div>
<PostModal  showModal={showModal}  handleClick={handleClick} />

    </Container> 
  )
}

export default MiddleSide


const Container= styled.div`
grid-area:middle
`

const Common= styled.div`
text-align:center;
overflow:hidden;
margin-bottom:8px;
background-color:#fff;
border-radius:5px;
position:relative;
border:none; 
box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%)

` 


const Sharebox= styled(Common)`
    display:flex;
    flex-direction:column;
    color:#958b7b;
    margin:0 0 8px;
    background:white;
    
    div{
        button{
            outline:none;
            color:rgba(0, 0,0 0.6);
            line-height:1.5;
            font-size:14px;
            line-height:1.5;
            min-height:48px;
            background:transparent;
            border:none;
            display:flex;
            align-items:center;
            font-weight:600;
        }
        &:first-child{
        display:flex;
        align-items:center;
        padding:8px 16px 0px 16px; 
        img{
           
            width:48px !important;
            border-radius:50%;
            margin-right:8px;
            
         }
        
        button{
            margin:4px 0;
            flex-grow:1;
            padding-left:16px;
            border:1px solid rgba(0, 0,0 0.15);
            border-radius:35px;
            background-color:white;
            text-align:left;
            align-items:center
        }
        }
        &:nth-child(2){
            display:flex;
            flex-wrap:wrap;
            justify-content:space-around;
            padding-bottom:4px;
            button{
                img{
                    margin:0 4px 0 --2px;
                    color:#76E72D

                }
                span{
                    color:#00d084; 

                }
            }
        }
      


        }
    
`
const Posts= styled(Common)`
padding:0;
margin: 0 0 8px;
overflow:visible;
`

const AllPosts= styled.div`
 padding-right:40px;
 flex-wrap:nowrap;
 padding:12px 16px 0;
 margin-bottom:8px;
 align-items:center;
 display:flex;
a{
    margin-right:12px;
    flex-grow:1;
    overflow:hidden;
    display:flex;
    text-decoration:none;

    img{
        width:40px;
        height:40px;}

    &>div{
        display:flex;
        flex-direction:column;
        flex-grow:1;
        flex-basis:0;
    margin-left:8px;
overflow:hidden;
span{
    text-align:left;
    &:first-child{
        font-size:14px;
        font-weight:700;
        color:rgba(0,0,0,1);

    }
    &:nth-child(n+1){
        font-size:12px;
        color:rgba(0,0,0,0.6);

    }
}    }

}


button{
    position:absolute;
    right:12px;
    top:0;
    background:transparent;
    border:none;
    outline:none
}
`



const Images= styled.div`
 margin-top:8px;
 width:100%;
 display:block;
 position:relative;
 background-color:#f9fafb; 
 img{
    object-fit:contain;
    width:100%;
    height:50%
 }
`



const Actions= styled.div`
align-items:center;
display:flex;
justify-content:flex-end;
margin:0;
min-height:40px;
padding:4px 8px;


button{
    display:inline-flex;
    align-items:center;
    padding:3px;
    color:#0a66c2;
    border:none;

  
    


    @media(min-width:768px){
        span{
            margin-left:8px 
        }
       
    }
}


`


