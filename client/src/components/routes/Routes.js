import React, { Component } from 'react';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes'
import { connect } from 'react-redux'
import { Audio } from  'react-loader-spinner'

class Routes extends Component {

  render() {
        if(this.props.token){
            if(this.props.user && this.props.user.hasOwnProperty("fname")){
                return(
                    <DashboardRoutes/>
                )
            }else{
                return(
                    <div style={{postition:"absolute", marginLeft:"30%", marginTop:"20%"}}>
                        <Audio
                            heigth="500"
                            width="500"
                            color='grey'
                            ariaLabel='loading'
                    /></div>
                )
            }
        }else{
            return(
                <AuthRoutes/>
            )
        }
    }
}

const mapStateToProps = state => ({
    token:state.auth.token,
    user:state.auth.user
});
  
export default connect(mapStateToProps,{})(Routes);
// export default Routes;
