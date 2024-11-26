import styled from "styled-components";

export const Container = styled.form`


    width: 90%;
    padding: 5%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0; 
    bottom: 0;
    left: 0; 
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

`;

export const ModalContainer = styled.div`

    position:fixed;
    left: 50%;
    transform: translate(-50%);
    top: 20px;
    width:400px;
    border: 2px solid #0e453a;
    border-radius: 10px;
    z-index: 10;
    background-color: white;
    display:flex;
    flex-direction: column;

    @media (max-width: 520px) {
        width:280px
    }
    
`;

export const Warning = styled.p`

    padding-left: 30px;
    padding-right: 30px;

`;

export const OkButton = styled.button`

    height: 40px;
    width: 120px;
    background-color: #03a877;
    color:white;
    border:none;
    border-radius: 15px;
    align-self: center;
    cursor:pointer;
    margin: 15px 0;
    :hover {
        transform: scale(1.05);
        background-color: #206091;
    }

`;