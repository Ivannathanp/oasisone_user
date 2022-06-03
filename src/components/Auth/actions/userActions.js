import axios from "axios";
import { sessionService } from "redux-react-session";


// the remote endpoint and local

const remoteUrl = "https://oasisone.herokuapp.com/";
const localUrl = "http://localhost:5000/";
const currentUrl = remoteUrl;

export const loginUser = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  //make checks and get some data

  return () => {
    axios
      .post(`${currentUrl}tenant/signin`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;

          //check for specific error
          if (message.includes("credentials")) {
            setFieldError("email", message);
            setFieldError("password", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          }else if (message.toLowerCase().includes("email")) {
            setFieldError("email", message);
          }
        } else if (data.status === "SUCCESS") {
          const userData = data.data[0];

          const token = userData._id;

          sessionService
            .saveSession(token)
            .then(() => {
              sessionService
                .saveUser(userData)
                .then(() => {
                  history.push("/dashboard");
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        }

        //complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};

export const signupUser = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
    return (dispatch) => {
        axios
          .post(`${currentUrl}tenant/signup`, credentials, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            const { data } = response;
    
            if (data.status === "FAILED") {
              const { message } = data;
    
              //check for specific error
              if (message.includes("name")) {
                setFieldError("name", message);
              } else if (message.includes("email")) {
                setFieldError("email", message);
              // }else if (message.includes("address")) {
              //   setFieldError("address", message);
              // }else if (message.includes("phonenumber")) {
              //   setFieldError("phonenumber", message);
              }else if (message.includes("password")) {
                setFieldError("password", message);
              }else if (message.includes("confirmPassword")) {
                setFieldError("confirmPassword", message);
              }              
           
            } else if (data.status === "PENDING") {
              //display message for email verification
              const {email} = credentials;
              history.push(`/emailsent/${email}`);

              //dispatch(loginUser({email,password},history,setFieldError,setSubmitting));
    
            }
            //complete submission
            setSubmitting(false);
          })
          .catch((err) => console.error(err));
      };
};

export const logoutUser = (history) => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    history.push('/');
  };
};


export const forgetpassword = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  //make checks and get some data

  return () => {
    axios
      .post(`${currentUrl}tenant/passwordresetrequest`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;

          //check for specific error
          if (message.toLowerCase().includes("user") || message.toLowerCase().includes("password") || message.toLowerCase().includes("email") ) {
            setFieldError("email", message);
          } 
        } else if (data.status === "PENDING") {
         const {email} = credentials;
         history.push(`/emailsent/${email}/${true}`);
        }

        //complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};


export const resetPassword = (
  credentials,
  history,
  setFieldError,
  setSubmitting
) => {
  //make checks and get some data

  return () => {
    axios
      .post(`${currentUrl}tenant/passwordreset`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;

          //check for specific error
          if (message.toLowerCase().includes("password")) {
            setFieldError("newPassword", message);
          } 
        } else if (data.status === "SUCCESS") {
         history.push(`/emailsent`);
        }

        //complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};

