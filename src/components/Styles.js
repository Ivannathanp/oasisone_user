import styled from "styled-components";

export const Styles = styled.div`
    h1{
        text-align: clearInterval;
        color: #777;
    }

    form{
        display: flex;
        flex-direction: CardColumns;
        width: 25%;
        margin: 100px auto;

        label{
            margin-top: 20px;
        }

        input,select{
            font-size: 1.2rem;
        }

        .error{
            color:red;
            font-size: .6rem;
        }
    }

    button{
        background: #1997BF;
        padding: 10px;
        color: white;
        margin-top: 20px;
        border-radius: 5px;
        font-size: 1.2rem;
    }
`