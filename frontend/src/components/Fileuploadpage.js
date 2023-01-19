import React from 'react'
import styled from 'styled-components'
import LeftSide from './LeftSide'
import MiddleSide from './MiddleSide'
import RightSide from './RightSide'
const Fileuploadpage = (props) => {
  return (
  <Container>
 <Section>
 <h5>Custom Image Upload components</h5>
 </Section>
 <Layout>
 <LeftSide/>
<MiddleSide/>
<RightSide/>
 </Layout>
  </Container>
  )   
}

export default Fileuploadpage



const Container= styled.div`
  padding-top:52px;
  max-width: 100%
`;
const Section= styled.div`

 min-height:50px;
 padding:16px 0;
 box-sizing:content-box;
 text-align:center;
 text-decoration:unde rline;
 display:flex;
 justify-content:center;
 h5{
    color:#0a66c2;
    font-size:14px;
 }

 @media(max-width:768px){
    flex-direction:column;
    padding:0 5px
 }
`
const Layout = styled.div`
 display:grid;
 grid-template-areas:'left middle right';
 grid-template-columns:minmax(0, 5fr) minmax(0,12fr) minmax(300px, 7fr);
 column-gap:25px; 
 row-gap:25px;
 margin:25px;
  
 @media(max-width: 768px){
    display:flex;
    flex-direction:column;
    padding:0 5px
 }


`;

