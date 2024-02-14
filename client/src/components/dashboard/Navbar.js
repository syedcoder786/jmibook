import React, { Component } from 'react';
import '../../styles/dashboard.css'
// import ScriptTag from 'react-script-tag';
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { Link } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { GoHomeFill } from 'react-icons/go';
import { HiChatAlt2 } from 'react-icons/hi';
import { PiNewspaperClippingDuotone } from 'react-icons/pi';
import { RiNftFill } from 'react-icons/ri';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Navbar extends Component{

    state = {
        address: null
    }

    componentDidMount(){
        this.getAddress()
    }

    getAddress = async () => {
        try{
            const accounts = await window.ethereum.request({ method: 'eth_accounts' })
            // console.log(accounts[0])
            this.setState({ address: accounts[0] })
        }catch(err){
            console.log(err)
        }
	}

    connectWallet = async() => {
        if(window.ethereum){
            try{
                console.log("clicked")
                await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                this.getAddress()
            }catch(err){
                alert("Unlock Metamask!!!")
                console.log(err)
            }
        }else{
            confirmAlert({
				title: 'Wallet Not Installed.',
				message: 'Would You like to install it?',
				buttons: [
				{
					label: 'Yes',
					onClick: () => {
						window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en', '_blank');
					}
				},
				{
					label: 'No',
				}
				]
			});
        }
    }

    render(){
        return(
            <div className='navbarjs'>
                {/* <ScriptTag type="text/javascript" src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" />
                <ScriptTag type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js"/> */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
                {/* <!-- Navbar --> */}
                <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark" style={{paddingTop: '0', paddingBottom: '0'}}>
                    <div class="container-fluid" style={{paddingLeft: '5px', paddingRight: '5px'}}>
                        <Link to="/"><a class="navbar-brand" href="/"><img src="./images/connect.png" alt="" style={{height: '30px'}}/>&nbsp;&nbsp;JamiaBook</a></Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex" onSubmit={(e)=>{e.preventDefault()}}>
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-secondary" type="submit">Search</button>
                        </form>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ul class="navbar-nav me-auto mb-0 mb-lg-0 m-1">

                            <div class="btn-group btn-group-lg mx-auto" style={{height: '40px', marginTop: '5px'}} role="group" aria-label="Basic radio toggle button group">
                            <Link to="/">
                                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onclick="window.location.href='index.html'" />
                                <label class="btn btn-outline-secondary btn-sm" style={{paddingTop: '5px', color:"white"}} for="btnradio1"><GoHomeFill size="2em"/><span style={{paddingLeft: "5px", paddingTop:"15px"}}>Feed</span></label>
                            </Link>
                            <Link to="/chat">
                            <div>
                                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onclick="window.location.href='chat.html'"/>
                                <label class="btn btn-outline-secondary btn-sm" style={{paddingTop: '5px', color:"white"}} for="btnradio2"><HiChatAlt2 size="2em"/><span style={{paddingLeft: "5px", paddingTop:"15px"}}>Global Chat</span></label>
                            </div>
                            </Link>
                            <Link to="/new">
                                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off"  onclick="window.location.href='news.html'"/>
                                <label class="btn btn-outline-secondary btn-sm" style={{paddingTop: '5px', color:"white"}} for="btnradio3"><PiNewspaperClippingDuotone size="2em"/><span style={{paddingLeft: "5px", paddingTop:"15px"}}>News</span></label>
                            </Link>
                            <Link to="/nfts">
                                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
                                <label class="btn btn-outline-secondary btn-sm" style={{paddingTop: '5px', color:"white"}} for="btnradio4"><RiNftFill size="2em"/><span style={{paddingLeft: "5px", paddingTop:"15px"}}>NFTs</span></label>
                            </Link>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to={this.props.user?"/profile/"+this.props.user._id:'#'}>
                            <button class="btn btn-outline-secondary text-nowrap btn-sm" type="button" style={{marginTop: '5px', marginBottom: '5px', paddingTop: '0', paddingBottom: '0', height: '38px'}} onclick="window.location.href='me.html'">
                            <img src={this.props.user?this.props.user.profile_imgsrc:'loading.jpg'} style={{height: '33px', width:'35px', margin: '0', borderRadius: '50%', backgroundColor: 'green'}} alt=""/>&nbsp;&nbsp;{this.props.user?this.props.user.fname:''} {this.props.user?this.props.user.lname:''}
                            </button>
                            </Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                            <li class="nav-item dropdown" style={{height: '38px', marginTop: 'auto', marginBottom: 'auto'}}>
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Settings</a>
                            <ul class="dropdown-menu mr-0" aria-labelledby="navbarDropdown">
                                {/* <!-- <li><a class="dropdown-item" href="#">Profile</a></li> --> */}
                                <li><a class="dropdown-item"><Link to="/editprofile" style={{textDecoration:"none", color:"black"}}>Edit Profile</Link></a></li>
                                <li><a class="dropdown-item" href="#">Notifications</a></li>
                                <li><a class="dropdown-item" href="#"><Link to="/signup" style={{textDecoration:"none", color:"black"}}>Instructions</Link></a></li>
                                <li><a class="dropdown-item" href="#">Privacy Policy</a></li>
                                <Link to="/" style={{textDecoration:"none", color:"black"}}><li><a class="dropdown-item" onClick={this.props.logout}>Logout</a></li></Link>
                            </ul>
                            </li>
                        </ul>   

                        <button class="btn btn-outline-secondary text-nowrap btn-sm" type="button" style={{marginTop: '5px', marginBottom: '5px', paddingTop: '0', paddingBottom: '0', height: '38px', fontWeight:"bold", color:"white", paddingRight:"18px"}} 
                            onClick={this.connectWallet}
                        >
                            &nbsp;&nbsp;{this.state.address?<span style={{color: "#90EE90"}}>{this.state.address.slice(0,6) + "..." + this.state.address.slice(-4)} <AiOutlineCheck /></span>:<span>Connect Wallet</span> }
                            
                        </button>       
                        </div>
                    </div>
                    </nav>

                {/* <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossorigin="anonymous"></script> */}
            {/* <Sidebar/> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user:state.auth.user,
});

export default connect(mapStateToProps,{logout})(Navbar);
// export default Navbar;