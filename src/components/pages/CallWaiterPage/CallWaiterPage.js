import React, { useState, useEffect,useContext } from "react";
import { useHistory, useLocation, useParams} from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../Form/FormLib";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useOutlineSelectStyles } from "../../Select/index";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPhone,  faMinus,
  faPlus } from "@fortawesome/free-solid-svg-icons";
import "./CallWaiterPage.css";
import { SocketContext } from "../../socketContext";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

function CallWaiterPage() {
  const history = useHistory();
  const location = useLocation();

  const myparam = location.state || {};
  let { tenant_id } = useParams();

  const tablelUrl = process.env.REACT_APP_TABLEURL;
  const [tableData, setTableData] = useState([]);
  const [tableRetrieved, setTableRetrieved] = useState(false);

  // Get Table Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = tablelUrl + "/" + tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTableData([result.data]);
              setTableRetrieved(() => true);
            } else {
              setTableRetrieved(() => false);
            }
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [tableRetrieved]);

   // socket connection
   const socket = useContext(SocketContext);

   useEffect(() => {
     if (socket) {
       socket.on('add waiter call', (data) => console.log(data));
     }
   });

 
    const [tablenumber, setTableNumber] = useState(myparam.order_id != null? myparam.order_table : "");
    const [numberofpeople, setNumberOfPeople] = useState(myparam.order_id != null? myparam.user_guest : 1);

    
   
 
  const [error, setError] = useState(false);

  function renderHeader() {
    return (
      <div className="cartheader" >
        <button
          className="backbutton"
          onClick={() => history.goBack()}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#fff", marginTop: "-2%", marginRight: "15%" }}
          />
          <div className="heading">Back</div>
        </button>
      </div>
    );
  }

  const outlineSelectClasses = useOutlineSelectStyles();
  const menuProps = {
    classes: {
      paper: outlineSelectClasses.paper,
      list: outlineSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon
        className={props.className + " " + outlineSelectClasses.icon}
      />
    );
  };

  function waiterCall(values){
    const localUrl = process.env.REACT_APP_WAITERURL;
    const url = localUrl +"/" + tenant_id;

    const payload = JSON.stringify({
      user_name: values.name,
      user_phonenumber: values.phonenumber,
      order_instruction: values.specialinstruction,
      order_table: tablenumber,
      user_guest: numberofpeople,
    });

    console.log("Payload is:", payload);
    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          
          socket.emit("add waiter call", result.data);
          history.push({
            pathname: `/${tenant_id}/Order`,
            state: result,
          });
        }
        });
  }

  return (
    <div className="outercontainer">
      <div className="innercontainer">
        {renderHeader()}
        <div className="waiterbackgroundcontainer">
          <div className="backgroundoverlay"></div>
        </div>

        <div className="restaurantcontainer">
        <Formik
                    initialValues={ myparam.order_id != null? {name: myparam.user_name,
                    phonenumber: myparam.user_phonenumber,
                    specialinstruction: "",
                   } : {
                      name: "",
                      phonenumber: "",
                      specialinstruction: "",
                     
                    }}
                    validationSchema={Yup.object().shape({
                      name: Yup.string().required("Required"),
                      phonenumber: Yup.string()
                        .required("Required")
                        .matches(
                          /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
                          "Phone number is not valid."
                        ),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(values);
                      console.log(tablenumber);
                      console.log(numberofpeople);
                      waiterCall(values);
                    }}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <div className="formcontainer">
                          <div className="forminputs">
                            <div className="formlabel">
                              Name<div className="span">*</div>
                            </div>
                            <TextField
                              name="name"
                              type="text"
                              placeholder="Enter Your Name"
                            />
                          </div>
                          <div className="forminputs">
                            <div className="formlabel">
                              Phone Number<div className="span">*</div>
                            </div>
                            <TextField
                              name="phonenumber"
                              type="text"
                              placeholder="Enter Your Phone Number"
                            />
                          </div>
                          <div className="forminputs">
                            <div className="formlabel">
                              Special Instructions (optional)
                            </div>
                            <TextField
                              name="specialinstruction"
                              type="text"
                              placeholder="E.g No onions, please"
                            />
                          </div>
                          <div className="forminputs">
                            <div className="formlabel">
                              Select Your Table<div className="span">*</div>
                            </div>
                            <FormControl error={error}>
                              <Select
                                defaultValue=""
                                disableUnderline
                                classes={{ root: outlineSelectClasses.select }}
                                MenuProps={menuProps}
                                IconComponent={iconComponent}
                                value={tablenumber}
                                onChange={(e) => {
                                  setTableNumber(e.target.value);
                                  setError(false);
                                }}
                                displayEmpty
                                renderValue={(value) =>
                                  value.length === 0 ? (
                                    <div className="placeholder">
                                      Select Your Table
                                    </div>
                                  ) : (
                                    value
                                  )
                                }
                              >
                                {tableData.map((post) => {
                                  return post.map((posts, index) => {
                                    console.log(posts);
                                    if (posts.table.status == "EMPTY") {
                                      return (
                                        <MenuItem value={posts.table.index}>
                                          Table {posts.table.index}
                                        </MenuItem>
                                      );
                                    }
                                  });
                                })}
                              </Select>
                              {error && (
                                <FormHelperText className="selecterror">
                                  Select a value
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>
                          <div className="forminputs">
                            <div className="formlabel">Number of People</div>
                            <div className="numberofpeople">
                              <button
                                type="button"
                                className={
                                  numberofpeople == 1
                                    ? "sbuttonL"
                                    : "sbuttonactiveL"
                                }
                                onClick={() => {
                                  setNumberOfPeople(numberofpeople - 1);
                                }}
                                disabled={numberofpeople == 1 ? true : false}
                              >
                                <FontAwesomeIcon
                                  className="sbuttontext"
                                  icon={faMinus}
                                />
                              </button>

                              <div className="snumberpeople">
                                {numberofpeople}&nbsp;Guest
                              </div>

                              <button
                                type="button"
                                className={
                                  numberofpeople < 1
                                    ? "sbuttonR"
                                    : "sbuttonactiveR"
                                }
                                onClick={() => {
                                  setNumberOfPeople(numberofpeople + 1);
                                }}
                              >
                                <FontAwesomeIcon
                                  className="sbuttontext"
                                  icon={faPlus}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* {isSubmitting? ( <div className="orderbutton"><div className="loading"><ThreeDots color="#f10c0c" height={80} width={80} /></div></div>) 
: (renderButton())
                        } */}
                        <button
          className="waiterbutton"
          /*
          onClick={() => {
            editOrder("+", route.params.v.menuId, route.params.v.price)
          }}*/

          //onClick={() => handlepassdata(1)}
        >
          <FontAwesomeIcon icon={faPhone} className="callicon" />
          <div className="callbuttontext">Call Now</div>
        </button>

                      </Form>
                    )}
                  </Formik>
        </div>
        
      </div>
    </div>
  );
}

export default CallWaiterPage;
