import React, { Component } from 'react';
import '../../styles/inst.css'

class Instructions extends Component {

    state = {
        myImage:'',
        address:'',
        phoneno:'',
        msg:null
    }

    onChange = (e) => {
        this.setState({ myImage:e.target.files[0] })
        this.setState({ msg:null })
    }

    onTextChange = (e) => {
        this.setState({ [e.target.name]:e.target.value })
        this.setState({ msg:null })
    }

//  async
    onSubmit = e => {
        e.preventDefault();
        window.location.assign('/')
        console.log('submitting')
        // const formData = new FormData();
        
        // formData.append('user_id', this.props.user._id);
        // formData.append('address', this.state.address);
        // formData.append('phoneno', this.state.phoneno);
        // formData.append('myImage', this.state.myImage);
        // // console.log(formData.get('user_img'))
        // if(!this.state.discp.trim() || !this.state.myImage){
        //     this.setState({msg:'Please enter all fields.'})
        // }else{
        //     this.setState({msg:null})
        //     // this.props.addPost(formData);
        // }
        // this.setState({ discp:'' })
        // this.setState({ myImage:'' })
    }

    render() {
        return (
            <div class="inst" style={{backgroundColor: 'white'}}>
                <br/>
                <div class="row myrow">
                    <div class="col-md-6">
                        <div class="first">
                            <h2>General Instructions</h2>
                            
                            <ul>
                            <li>Make sure your email address is valid because --</li>
                            <ul>      
                                <li>It is what uniquely defines you inside this domain</li>
                                <li>It would be used to send notifications from this site</li>
                                <li>it may be used in the future in case of conflicts like resetting passwords</li>
                            </ul>
                            <li>Be respectful towards other people. No harassing, bullying or personally targeting anyone</li>
                            <li>No affiliate, malicious links or advertising allowed here. Links must be verified by the sender before sending on the website</li>
                            <li>Respect the opinion of others. Feel free to debate, but keep the discussion objective and respectful</li>
                            <li>Do not impersonate anyone else, or steal someone's identity</li>
                            <li>Considering University's audience, it is not allowed to discuss any NSFW topic in this website</li>
                            <li>If anything is found violating the said conditions, it would be immediately removed</li>
                            <li>These rules can change depending on how big this community turns out to be, and what consequences or scenarios are formed. Please keep yourself and others updated by reading the instructions given here</li>
                            <li><strong>Failing on the terms may lead to temporary or permanent ban from this website depending on the frequency and severity of the matter</strong></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="second">
                            <h2>Instructions regarding posts</h2>
                            <p>Your psots must comply with the following standards</p>
                            <ul>
                            <li>Posts should not contain
                                <ul>
                                    <li>Pornography, nudity, racism, sexism, swearing, hate speech</li>
                                    <li>Any personal (undisclosable) material</li>
                                    <li>Memes, jokes or any other unproductive stuff. These to be discussed under the global chat section only</li>
                                    <li>Religious content</li>
                                    <li>any affiliate links</li>
                                    <li>And basically anyting that may present our community or in general <strong>JAMIA MILLIA ISLAMIA</strong> (our university) in a bad light</li>
                                </ul>
                            </li>
                            <br/>
                            <li>Posts can have
                                <ul>
                                    <li>Useful and verified (by sender) links for courses, tutorials, resources</li>
                                    <li>Personal suggestions, path, roadmap for anything asked/demanded by any member(s)</li>
                                    <li>Motivational content</li>
                                    <li>Self or others' stories of success/failure</li>
                                    <li>Or anything that would be helpful to other people on the website</li>
                                </ul>
                            </li>
                            <li><strong>Posts not complying with the given guidelines would be removed and further action may be taken against the sender</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr/>

                <div class="row myrow">
                    
                    <div class="col-md-6">
                        <h5>This website is designed and developed in ❤ with Jamia Millia Islamia by</h5>

                        <table  style={{width:'80%'}}>
                            {/* <tr>
                            <td><img src="images/user.png" class="logo" alt=""  style={{width:'80%'}}/></td>
                            <td style={{width:'60%'}}>
                                <h6>MD Rashid Hussain (FET-JMI)</h6>
                                <p class="intro">Designer</p>
                            </td>
                            </tr> */}
                            <tr>
                            <td><img src="images/Anonymous.jpg" class="logo" alt="" style={{width:'80%'}}/></td>
                            <td style={{width:'60%'}}>
                                <h6>SM Mohdin (Jamia Millia Islamia)</h6>
                                <p class="intro">SDE</p>
                            </td>
                            </tr>
                        </table>
                    </div>

                    <div class="col-md-6">
                        <form class="optional" onSubmit={this.onSubmit}>
                            <fieldset>
                            <legend>Optional Fields</legend>
                            <input
                                type="text"
                                placeholder="Adress"
                                name="address"
                                onChange={this.onTextChange}
                                value={this.state.address}
                            />
                            <br/>
                            <input 
                                type="number" 
                                placeholder="Phone Number"
                                name="phoneno"
                                onChange={this.onTextChange}
                                value={this.state.phoneno}
                            />
                            <br/>
                            <div class="upload">
                                <label for="file">Please Uplaod a profile picture</label>
                                <input type="file" id="file" name="file" accept="image/png, image/jpg, image/jpeg"/>
                            </div>
                            </fieldset>
                            <br/>
                            <input type="checkbox" name="confirm" id="confirm"/>
                            <label for="confirm">I agree to all the rules given above</label>
                            <br/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instructions;