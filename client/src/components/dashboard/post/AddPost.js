import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFPost } from '../../../actions/postActions';
import firebase from '../../firebase/firebase'

class AddPost extends Component {

    state={
        myImage:'',
        discp:'',
        msg:null,
        loading:null,
    }

    onChange = (e) => {
        this.setState({ myImage:e.target.files[0] })
        console.log(e.target.files[0])
        this.setState({ msg:null })
    }

    onTextChange = (e) => {
        this.setState({ discp:e.target.value })
        this.setState({ msg:null })
    }

//  async
    onSubmit = e => {
        e.preventDefault();
        // console.log('submitting')
        // const formData = new FormData();
        
        // formData.append('user_id', this.props.user._id);
        // formData.append('fname', this.props.user.fname);
        // formData.append('lname', this.props.user.lname);
        // formData.append('user_img', this.props.user.profile_imgsrc);
        // formData.append('discp', this.state.discp);
        // formData.append('myImage', this.state.myImage);

        if(!this.state.discp.trim() || !this.state.myImage){
            this.setState({msg:'Please enter all fields.'})
        }else{

            let bucketName = 'images';
            let file = this.state.myImage;
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name + Date()}`)
            let uploadTask = storageRef.put(file)
            uploadTask.on('state_changed', (snapshot) => {
              console.log("Image Upload Progress")
              this.setState({loading:'Uploading...'})
              },
              (error) => {
                  console.log(error);
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log(downloadURL)
                const post = {
                    user_id: this.props.user._id,
                    // fname: this.props.user.fname,
                    // lname: this.props.user.lname,
                    // branch: this.props.user.branch,
                    // semester: this.props.user.semester,
                    // user_img: this.props.user.profile_imgsrc,
                    discp: this.state.discp,
                    myImageURL: downloadURL,
                }
                e.target.reset();
                this.props.addFPost(post);
                })
                // .then(asd=>{
                //   console.log(asd)
                // })
              }
            )
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.post != this.props.post){
            if(this.props.post){
                this.setState({myImage:null})
                this.setState({ discp:'' })
                this.setState({ loading:null })
                this.setState({ loading:null })
            }
        }
    }

    render() {
        return (
            <div>
                <div class="create-post">
                <center><p style={{color:'red'}}><b>{this.state.msg}</b></p></center>
                <center><p style={{color:'green'}}><b>{this.state.loading}</b></p></center>
                <form method='post' onSubmit={this.onSubmit}>
                    <img src={this.props.user?this.props.user.profile_imgsrc:"loading.jpg"} class="user-create-post" alt=""/>
                    <textarea 
                        name="create" 
                        id="textarea" 
                        placeholder="Share Something with the community" 
                        cols="50" 
                        rows="2"
                        onChange={this.onTextChange}
                        value={this.state.discp}
                    />    
                    <input
                        type="file"
                        class="file-input extreme-right"
                        id="file-choose" 
                        name="myImage"
                        onChange={this.onChange}
                        accept=".jpg, .png, .jpeg, .gif|image/*"
                        // value={this.state.myImage}
                        // ref={this.state.myImage}
                    />
                    {/* <label for="file-choose" class="svg-pos"/> */}
                    {/* <table class="extreme-right">
                        <tr>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                                </svg>
                            </td>
                        </tr>
                        <tr>
                            <td><button type="submit" class="submit-button">Post</button></td>
                        </tr>
                    </table> */}
                    <button type="submit" class="submit-button">Post</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user:state.auth.user,
    post:state.post.item,
});

export default connect(mapStateToProps, { addFPost })(AddPost);
// export default AddPost;