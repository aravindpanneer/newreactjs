import React,{useEffect,useState} from "react";
import styled from "styled-components";
import { useParams,Link } from "react-router-dom";
import axios from 'axios'

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
function Modal({ setOpenModal }) {

    const initialMenuState = {
        id: null,
        title:'',
        images:''

      };
    
      const {id}= useParams()
    
      const [users, setusers] = useState(initialMenuState);




  const handleFileUpload = async (e) => {
    
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setusers({ ...users,  images : base64 })
  }



  useEffect(() => {
    retrieveMenu();
  }, []);
  const retrieveMenu = () => {
    axios
      .get(`http://localhost:8000/api/images/${id}/`, {
        headers:{
            "Content-type": "application/json",
        }
      })
      .then((response) => {
        setusers({
          id: response.data.id,
          title: response.data.title,
          images:response.data.images
          
        });
        console.log(response);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateMenu = (e) => {
    e.preventDefault();
        let data = {
          id:users.id,
          title: users.title,
          images: users.images,
         
    
        };
    
        axios
          .put(`http://localhost:8000/api/update/${id}/`, data, {
            headers:{
                "Content-type": "application/json",
            }
          })
          .then((response) => {
            setusers({
                id: response.data.id,
                title: response.data.title,
                images:response.data.images
             
    
            });
           
            console.log(response.data);
          })
          .catch((e) => {
            console.error(e);
          });
      };



      const nameUpload=async(e)=>{
        const title = e.target.value
        setusers({...users, title:title})
      }

   

     
  return (
    <React.Fragment>
    <Container>
    
    <Content>
        <Header>  

        <h2> Update  </h2>
        <Link to='/'> <button >
 <img src='/images/close3.svg' alt=''/>
        </button></Link>

       

        </Header>
       
        <SharedContent>
        <UserInfo>
        <img src='/images/user.svg' alt=''/>
        <span><Input type='text' placeholder='enter title'  id="name"
        required
        value={users.title}
        onChange={(e) => nameUpload(e)}
        name="title" /></span>

        
        </UserInfo>

        <PhotoSection>
        <label htmlFor="file-upload" className='custom-file-upload'>
        <img src={users.images} style={{width:'100%'}} alt="" />
        </label>

            <UploadImageSection>
            <input type='file'
            accept='image/gif, image/jpeg, image/png'
            lable="Image"
            name="images"
            id='file'
            style={{display:'none'}}
           
            onChange={(e) => handleFileUpload(e)}

            />
            <p>
            <label htmlFor='file' style={{cursor:'pointer'}}> select an image to Update</label>
            </p>
        </UploadImageSection>
        </PhotoSection>
       

    </SharedContent>

    <ShareCreation>
        <PhotoUpload type= 'submit' onClick={updateMenu} style={{textAlign:'center'}}>
         Update
        
        </PhotoUpload>
    
    </ShareCreation>
      

       
    </Content>

    </Container>
    </React.Fragment>
  );
}

export default Modal;





const Container= styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
z-index:9999;
color:black;
background-color:rgba(0,0,0,0.8);
animation: fadein 0.3s;

`

const Content=styled.div`
width:100%;
max-width:552px;
background-color:white;
max-height:90%;
overflow:initial;
border-radius:5px;
position:relative;
display:flex;
flex-direction:column;
top:32px;
margin:0 auto;


`


const Header= styled.div`
 display:block;
 padding:16px 2px;
 border-bottom:1px solid rgba(0,0,0,0.15);

 font-size:16px;
 line-height:1.5%;
 color:rgba(0,0,0,0.6);
 display:flex;
 justify-content:space-between;
 align-items:center;
 button{
    height:40px;
    width:40px;
    min-width:auto;
    color:rgba(0,0,0,0.15);
    border-radius:90%;
    border-color:white;
    svg,img{
        
        pointer-events:none
    }
 }
`


const SharedContent= styled.div`
display:flex;
flex-direction:column;
flex-grow:1;
overflow-y:auto;
vertical-align:baseline;
background:transparent;
padding:8px 12px;

`

const UserInfo=styled.div`
display:flex;
align-items:center;
padding: 12px 24px;
svg,img{
    width:48px;
    height:48px;
    background-clip:content-box;
    border:2px solid transparent;
    border-radius:50%
}
span{
    font-weight:600;
    font-size:16px;
    line-height:1.5;
    margin-left:5px;

}
`

const ShareCreation = styled.div`

display:flex;
justify-content:flex-end;
padding:12px 24px 12px 16px;
`

const PhotoUpload= styled.button`
min-width:60px;
border-radius:20px;
padding-left:16px;
padding-right:16px;
background:#DFF1D5;
&:hover{
    background:#68E81B
}

`

const PhotoSection= styled.div`
padding:12px 24px;

`

const UploadImageSection=styled.div`
 text-align:center;

 img{
    width:100%;

 }
`

const Input= styled.input`


border:none;
outline:#F87B56 solid 1px;
display:inline-block;
height:34px;
vertical-align:middle;
position:relative;
bottom:1px;
right:2px;
border-radius:22px;
width:220px;
box-sizing:border-box;
padding:0 18px; 
`