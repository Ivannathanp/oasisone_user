import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../../Form/FormLib";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useOutlineSelectStyles } from "../../Select/index";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPhone,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./CallWaiterPage.css";
import { SocketContext } from "../../socketContext";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { ThreeDots } from "react-loader-spinner";

function CallWaiterPage() {
  const history = useHistory();
  const location = useLocation();
  const myparam = location.state || {};
  let { tenant_id } = useParams();
  const tablelUrl = process.env.REACT_APP_TABLEURL;
  const tenantUrl = process.env.REACT_APP_TENANTURL;
  const [color, setColor] = useState();
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableRetrieved, setTableRetrieved] = useState(false);

  // Get Tenant Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant_id != undefined) {
        const url = tenantUrl + "/user/" + tenant_id;
        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTenantData([result.data]);
              setTenantRetrieved(() => true);
            } else {
              setTenantRetrieved(() => false);
            }
          });
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenantRetrieved]);

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

  useEffect(() => {
    if (tenantData[0] != undefined) {
      setColor(tenantData[0].profileColor);
    }
  });

  // socket connection
  const socket = useContext(SocketContext);

  const [tablenumber, setTableNumber] = useState(
    myparam.order_id != null ? myparam.order_table : ""
  );
  const [numberofpeople, setNumberOfPeople] = useState(
    myparam.order_id != null ? myparam.user_guest : 1
  );

  const [error, setError] = useState(false);

  function renderHeader() {
    return (
      <div className="cartheader" style={{ background: color }}>
        <button className="backbutton" onClick={() => history.goBack()}>
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
        style={{ background: color }}
        className={props.className + " " + outlineSelectClasses.icon}
      />
    );
  };

  function waiterCall(values) {
    const localUrl = process.env.REACT_APP_WAITERURL;
    const url = localUrl + "/" + tenant_id;

    const payload = JSON.stringify({
      user_name: values.name,
      user_phonenumber: values.phonenumber,
      order_instruction: values.specialinstruction,
      order_table: tablenumber,
      user_guest: numberofpeople,
    });

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

  console.log(myparam.order_id);

  return (
    <div className="outercontainer">
      {tenantRetrieved ? (
        <div className="innercontainer">
          {renderHeader()}
          <div className="waiterbackgroundcontainer">
            <div className="backgroundoverlay"></div>
          </div>
          <div className="restaurantcontainer">
            <Formik
              initialValues={
                myparam.order_id != undefined
                  ? {
                      name: myparam.user_name,
                      phonenumber: myparam.user_phonenumber,
                      tablenumber: myparam.order.table,
                      specialinstruction: "",
                    }
                  : {
                      name: "",
                      phonenumber: "",
                      specialinstruction: "",
                      tablenumber: "",
                      numberofpeople: "1",
                    }
              }
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

                    {myparam.order_id == undefined ? (
                      <div className="forminputs">
                        <div className="formlabel">Number of People</div>
                        <div className="numberofpeople">
                          <button
                            style={
                              numberofpeople == 1 ? null : { background: color }
                            }
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
                            style={{ background: color }}
                            type="button"
                            className={
                              numberofpeople < 1 ? "sbuttonR" : "sbuttonactiveR"
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
                    ) : null}
                  </div>
                  <button
                    style={{ background: color }}
                    className="waiterbutton"
                    onClick={() => {
                      if (tablenumber == null) {
                        setError(true);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faPhone} className="callicon" />
                    <div className="callbuttontext">Call Now</div>
                  </button>
                </Form>
              )}
            </Formik>
          </div>{" "}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <ThreeDots color={color} height={80} width={80} />
        </div>
      )}
    </div>
  );
}

export default CallWaiterPage;
