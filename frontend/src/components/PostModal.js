import React ,{useState}from 'react'
import styled from 'styled-components'
import axios from 'axios';

const url = "http://localhost:8000/api/photos"

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




const PostModal = (props) => {

    const[closed, setClosed]= useState('')
    const initialData = { title : "", images: "" };
    // eslint-disable-next-line react-hooks/rules-of-hooks
  
    const [User, setUser] = useState(initialData);
    const createPost = async (datas) => {
      try{
        await axios.post(url, datas)
      }catch(error){
        console.log(error)
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createPost(User)
      console.log("Uploaded")
    }
  
  

  const nameUpload=async(e)=>{
    const title = e.target.value
    setUser({...User, title:title})
  }
  
    const handleFileUpload = async (e) => {
      
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setUser({ ...User,  images : base64 })
    }
  
  
    const reset =(e)=>{
        props.handleClick(e)
        
    }
  return (
    <React.Fragment>

{ props.showModal === 'open' &&
    <Container>
    
    <Content>
        <Header>  

        <h2> POST </h2>
        <button onClick={(e)=>reset(e)}>

        <img src='/images/close3.svg' alt=''/>
        </button>

       

        </Header>
        <form onSubmit={handleSubmit}>
        
        <SharedContent>
        <UserInfo>
        <img src='/images/user.svg' alt=''/>
        <span><Input type='text' placeholder='enter title'  name= 'title'   onChange={(e) => nameUpload(e)} /></span>

        
        </UserInfo>

        <PhotoSection>
       
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
            <label htmlFor='file' style={{cursor:'pointer'}}> select an image to post</label>
            </p>
        </UploadImageSection>
        </PhotoSection>
       

    </SharedContent>

    <ShareCreation>
        <PhotoUpload type= 'submit'>
         post
        
        </PhotoUpload>
    
    </ShareCreation>
        </form>

       
    </Content>

    </Container>
}

   
    </React.Fragment>
   
  )
}

export default PostModal


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