import React, { useState, useEffect } from 'react';
import '../../../styles/editprofilestyle.css'
import Resizer from "react-image-file-resizer";
import firebase from '../../firebase/firebase'
import { connect } from 'react-redux';
import { updateUserImage, updateUserDetails } from '../../../actions/profileActions';


// import S3FileUpload from 'react-s3';

// const config = {
//     bucketName: 'jamiabook-images',
//     dirName: 'photos', /* optional */
//     region: 'eu-west-1',
//     accessKeyId: 'AKIA5G3KDKUSGJWEGGNF',
//     secretAccessKey: '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',
// }

function Editprofile(props) {

    const [myImage,setMyImage] = useState('')
    const [myImageURL,setMyImageURL] = useState(false)
    const [userImageLoader,setUserImageLoader] = useState(false)
    // text inputs
    // const [profile_imgsrc,setProfile_imgsrc] = useState('')
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [gender,setGender] = useState('')
    const [dob,setDob] = useState('')
    const [branch,setBranch] = useState('')
    const [semester,setSemester] = useState('')
    //error msg
    const [errmsg,setErrmsg] = useState('')
    //success msg
    const [successmsg,setSuccessmsg] = useState('')


    useEffect(() => {
        setUserImageLoader(false)
        // console.log(props.updatedImage)
        //loding ends here
    },[props.updatedImage])

    useEffect(()=> {
        if(props.user){
            if(props.user.hasOwnProperty("fname")){
                setFname(props.user.fname)
                setLname(props.user.lname)
                setGender(props.user.gender)
                setDob(props.user.dob)
                setBranch(props.user.branch)
                setSemester(props.user.semester)
                // setProfile_imgsrc(props.user.profile_imgsrc)
            }
        }
    },[props.user])

    useEffect(() => {
        if(Object.keys(props.updatedDetails).length != 0){
            const { fname, lname, gender, dob, branch, semester } = props.updatedDetails
            setFname(fname)
            setLname(lname)
            setGender(gender)
            setDob(dob)
            setBranch(branch)
            setSemester(semester)
            // console.log(props.updatedDetails)
            setSuccessmsg('Updated :)')
        }
    },[props.updatedDetails])

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
            file,
            500,
            800,
            "JPEG",
            400,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
            );
        });

    const onChange = async (e) => {
        console.log(e.target.files[0])
        const image = await resizeFile(e.target.files[0]);
        console.log(image);
        setMyImage(image)
        setMyImageURL(URL.createObjectURL(image)) 

        //cors error was there
        // S3FileUpload
        //     .uploadFile(image, config)
        //     .then(data => console.log(data))
        //     .catch(err => console.error(err))

        // this.setState({ msg:null })
    }

    const onUpload = (e) => {
        e.preventDefault()
        if(myImage){
        let bucketName = 'images';
        let file = myImage;
        // console.log(Date())
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name + Date()}`)
        let uploadTask = storageRef.put(file)
        uploadTask.on('state_changed', (snapshot) => {
            console.log("Image Upload Progress")
            e.target.reset();
            setMyImage('')
            setUserImageLoader('Uploading...')
            },
            (error) => {
                console.log(error);
            },
            () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                setUserImageLoader('Uploaded')
                console.log(downloadURL)
                props.updateUserImage({id:props.user._id, downloadURL})
            })
        })
        }
    }

    const onSubmit=(e)=>{
        e.preventDefault();

        // console.log({ fname, lname, gender, dob, branch, semester })
        // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const date = new Date(dob);
        const yearNow = new Date().getFullYear();
        // console.log(yearNow - date.getFullYear() <= 16)
        // console.log(date.getFullYear())

        if(!fname || !lname || !gender || !dob || !branch || !semester || branch==='Branch' || semester==='Semester'){
            setErrmsg('Please enter all fields.')
        }else if(fname.trim()==='' || lname.trim()==='' ){
            setErrmsg('Invalid fields.')
        }else if( fname.length < 3 || fname.length >10 || lname.length<3 || lname.length>10 ){
            setErrmsg('Name must contain 3-10 characters.')
        }else if( yearNow - date.getFullYear() <= 16){
            // console.log(yearNow - date.getFullYear())
            setErrmsg('Wrong DOB.')
        }else{
            const user = {
                id:props.user._id,
                fname,
                lname,
                gender,
                dob,
                semester,
                branch,
                // // optional fields
                // backprofile_imgsrc:'./images/college.png',
                // address:'not given',
                // phoneno:'null'
            };
            console.log(user)
            // setErrmsg('')
            setSuccessmsg('Updating...')
            props.updateUserDetails(user)
            e.target.reset();
            setFname('')
            setLname('')
            setGender('')
            setDob('')
            setBranch('')
            setSemester('')
      
        }
    }

    return (
        <div style={{backgroundColor: "white"}}>
            <div class="container bootstrap snippets bootdey">
                <h1 class="text-primary">Edit Profile</h1>
                <hr/>
            <div class="row">
                <div class="col-md-3">
                    <div class="text-center">
                    <img src={myImageURL?myImageURL:props.user?props.user.hasOwnProperty("fname")?props.user.profile_imgsrc:'../loading.jpg':''} 
                        class="avatar img-circle " 
                        alt="avatar"/>
                    <h6>{userImageLoader?userImageLoader:"Upload a new photo..."}</h6>
                    <form onSubmit={onUpload}>
                        <input type="file" class="form-control" 
                            // style={{width:"85%", marginLeft:"30px"}}
                            onChange={onChange}
                            accept=".jpg, .png, .jpeg|image/*"
                        />
                        <button type="submit" 
                            class="btn btn-primary" 
                            style={{marginTop:"8px"}}
                            // onClick={onUpload}
                        >Upload
                        </button>
                    </form>
                    </div>
                </div>
                
                {/* <!-- edit form column --> */}
                <div class="col-md-9 personal-info">
                    {/* <div class="alert alert-info alert-dismissable">
                    <a 
                        class="panel-close close" 
                        style={{cursor: "pointer"}}
                        onClick={()=>setErrmsg('')}
                        // data-dismiss="alert"
                    >x
                    </a> 
                    <i class="fa fa-coffee"></i>
                    {errmsg?errmsg: ''}
                    </div> */}
                    {/* <div class={errmsg?"alert alert-danger":''}
                        role="alert"
                        style={{cursor: "pointer"}}
                        onClick={()=>setErrmsg('')}
                    >
                    {errmsg?errmsg: ''}
                    </div> */}
                    {
                        successmsg && (
                            <div class="alert alert-success"
                                role="alert"
                                style={{cursor: "pointer"}}
                                onClick={()=>setSuccessmsg('')}
                            >
                            {successmsg}
                            </div>
                        )
                    }
                    {
                        errmsg && (
                            <div class="alert alert-danger"
                                role="alert"
                                style={{cursor: "pointer"}}
                                onClick={()=>setErrmsg('')}
                            >
                            {errmsg}
                            </div>
                        )
                    }
                    <h3>Personal info</h3>
                    
                    <form class="form-horizontal" role="form" onSubmit={onSubmit}>
                    {/* <div class="form-group">
                        <label class="col-lg-3 control-label">First name:</label>
                        <div class="col-lg-8">
                        <input class="form-control" type="text" value="dey-dey"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Last name:</label>
                        <div class="col-lg-8">
                        <input class="form-control" type="text" value="bootdey"/>
                        </div>
                    </div> */}
                    <div class="form-row">
                        <div class="col">
                            <label class="col-lg-3 control-label">First name:</label>
                            <div class="col-lg-8">
                            <input class="form-control" 
                                type="text" 
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                            </div>
                        </div>
                        <div class="col">
                            <label class="col-lg-3 control-label">Last name:</label>
                            <div class="col-lg-8">
                            <input class="form-control" 
                                type="text"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                            </div>
                        </div>
                    </div><br/>
                    {/*<div class="form-group">
                        <label class="col-lg-3 control-label">Email:</label>
                        <div class="col-lg-8">
                        <input class="form-control" type="text" value="janesemail@gmail.com">
                        </div>
                    </div> */}
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Gender:</label>
                        <div class="col-lg-8">

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" 
                                type="radio" 
                                name="inlineRadioOptions" 
                                id="inlineRadio1" 
                                value="Male"
                                onChange={(e) => setGender(e.target.value)}
                                checked={gender.toLocaleLowerCase() === "male"?"checked":''}
                            />
                            <label class="form-check-label" for="inlineRadio1">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" 
                                type="radio" 
                                name="inlineRadioOptions" 
                                id="inlineRadio2" 
                                value="Female"
                                onChange={(e) => setGender(e.target.value)}
                                checked={gender.toLocaleLowerCase() === "female"?"checked":''}
                            />
                            <label class="form-check-label" for="inlineRadio2">Female</label>
                        </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label">Dob:</label>
                        <div class="col-lg-8">
                        <input class="form-control" 
                            id="date" 
                            name="date" 
                            type="date"
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}
                        />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label">Branch:</label>
                        <div class="col-lg-8">
                        <div class="ui-select">
                            <select id="user_time_zone" 
                                class="form-control"
                                onChange={(e) => setBranch(e.target.value)}
                                value={branch}
                            >
                            <option value="Branch" selected="selected">Branch</option>
                            <option value="Computer Science Engineering">CSE</option>
                            <option value="Electronics Engineering">ECE</option>
                            <option value="Electrical Engineering">EE</option>
                            <option value="Mechanical Engineering">ME</option>
                            <option value="Civil Engineering">CE</option>
                            </select>
                        </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Semester:</label>
                        <div class="col-lg-8">
                        <div class="ui-select">
                            <select id="user_time_zone" 
                                class="form-control"
                                onChange={(e) => setSemester(e.target.value)}
                                value={semester}
                            >
                            <option value="Semester" selected="selected">Semester</option>
                            <option value="Semester I">I</option>
                            <option value="Semester II">II</option>
                            <option value="Semester III">III</option>
                            <option value="Semester IV">IV</option>
                            <option value="Semester V">V</option>
                            <option value="Semester VI">VI</option>
                            <option value="Semester VII">VII</option>
                            <option value="Semester VIII">VIII</option>
                            </select>
                        </div>
                        </div>
                    </div>

                    <div class="form-group">
                        {/* <label class="col-lg-3 control-label">Dob:</label> */}
                        <center>
                            <button type="submit" 
                                class="btn btn-primary" 
                                style={{width:"100px"}}
                            >Edit
                            </button>
                        </center>
                    </div>
                    </form>
                </div>
            </div>
            </div>
            <br/><br/><br/>
            <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-white text-black-50">
                <div class="container text-center">
                <small>Copyright &copy; JamiaBook</small>
                </div>
            </footer>
        </div>
    );
}

const mapStateToProps = state => ({
    updatedImage:state.profile.updateUserImage,
    updatedDetails:state.profile.updateUserDetails,
    user:state.auth.user,
});

export default connect(mapStateToProps, { updateUserImage, updateUserDetails })(Editprofile);
// export default Editprofile;