export default () => ({
  select: {
    display: "flex",
    paddingLeft: "30px",
    alignItems: "center",
    minWidth: 75,
    height: 50,
    background: "#fff",
    borderRadius: 100,
    border: "none",
    boxShadow: "none",
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineheight: "19px",
    boxSizing: "border-box",
    color: "#424242",

    "&:focus": {
      borderRadius: 100,
      background: "#fff",
      color: "#424242",
      border: "0.5px solid #E52C32",
      boxShadow: "0px 0px 5px rgba(229, 44, 50, 0.25)",
    },

    "& > div": {
      display: "inline-flex", // this shows the icon in the SelectInput but not the dropdown
    },
  },
  paper: {
    height: 200,
    borderRadius: 10,

    marginTop: 0,
  },
icon:{
  width: 24,
  height: 24,
  backgroundColor: "#df3030",
  borderRadius: 50,
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  right: "5%",
  color: "#fff",
},
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "auto !important",
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "25px",
    padding: "0px 0px",
    background: "#fff !important",
    border: "none",
    
    "& li": {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 12,
      paddingBottom: 12,
      background: "#fff !important",
    },
    "& li:hover": {
      width: "100%",
      borderRadius: 5,
      background: "#c4c4c4 !important",
    },
    "& li.Mui-selected": {
      color: "#424242",
      background: "#fff !important",
    },
    "& li.Mui-selected:hover": {
      width: "100%",
      borderRadius: 5,
      background: "#fff !important",
    },
  },
});
