//Dashboard cannot be accessed unless logged in

import {Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({component:Component, authenticated, ...rest}) => {
    console.log("auth", authenticated)
  return (
      <Route
       {...rest}
        render={
            (props)=> authenticated ? (<Component {...props} />) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: props.location
                    }}
                    />
            )
        }
        />
  )
}

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated
})

export default connect(mapStateToProps) (AuthRoute);
