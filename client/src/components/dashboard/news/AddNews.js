import React, { useState, useEffect } from 'react';
import '../../../styles/editprofilestyle.css'
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../../firebase/firebase'
import { addNews } from '../../../actions/newsActions';


function AddNews(props) {

    const [myImage,setMyImage] = useState('')
    const [myImageURL,setMyImageURL] = useState(false)
    const [userImageLoader,setUserImageLoader] = useState(false)
    // text inputs
    // const [fname,setFname] = useState('')
    // const [lname,setLname] = useState('')
    const [heading,setHeading] = useState('')
    const [content,setContent] = useState('')
    //error msg
    const [errmsg,setErrmsg] = useState('')

    const dispatch = useDispatch()

    const news = useSelector((state) => state.news)
    const { addNewsData } = news


    useEffect(() => {
        if(addNewsData){
            setUserImageLoader(false)
            setErrmsg("Updated")
            console.log("uploaded")
            console.log(addNewsData)
        }
        // console.log(props.updatedImage)
        //loding ends here
    },[addNewsData])

    useEffect(() => {
        let password = prompt("Please enter your password");
        if (password != "jmipassword786" || password === "" || password===null) {
          console.log("wrong password")
          window.location.assign("/")
        }
    },[])

    // useEffect(()=> {
    //     if(props.user){
    //         if(props.user.hasOwnProperty("fname")){
    //             setFname(props.user.fname)
    //             setLname(props.user.lname)
    //             setGender(props.user.gender)
    //             setDob(props.user.dob)
    //             setBranch(props.user.branch)
    //             setSemester(props.user.semester)
    //             // setProfile_imgsrc(props.user.profile_imgsrc)
    //         }
    //     }
    // },[props.user])

    // useEffect(() => {
    //     if(Object.keys(props.updatedDetails).length != 0){
    //         const { fname, lname, gender, dob, branch, semester } = props.updatedDetails
    //         setFname(fname)
    //         setLname(lname)
    //         setGender(gender)
    //         setDob(dob)
    //         setBranch(branch)
    //         setSemester(semester)
    //         // console.log(props.updatedDetails)
    //         setErrmsg('Updated :)')
    //     }
    // },[props.updatedDetails])

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
            file,
            500,
            500,
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

    // const onUpload = (e) => {
    //     e.preventDefault()
    //     if(myImage){
    //     let bucketName = 'images';
    //     let file = myImage;
    //     // console.log(Date())
    //     let storageRef = firebase.storage().ref(`${bucketName}/${file.name + Date()}`)
    //     let uploadTask = storageRef.put(file)
    //     uploadTask.on('state_changed', (snapshot) => {
    //         console.log("Image Upload Progress")
    //         e.target.reset();
    //         setMyImage('')
    //         setUserImageLoader('Uploading...')
    //         },
    //         (error) => {
    //             console.log(error);
    //         },
    //         () => {
    //         uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
    //             setUserImageLoader('Uploaded')
    //             console.log(downloadURL)
    //             setMyImageURL(downloadURL)
    //         })
    //     })
    //     }
    // }

    const onSubmit=(e)=>{
        e.preventDefault();

        if(heading.trim()==='' || content.trim()==='' || !myImage){
            setErrmsg('Plz Enter All fields.')
        }else{

            e.target.reset();
            setMyImage('')
            setHeading('')
            setContent('')

            if(myImage){
                let bucketName = 'images';
                let file = myImage;
                // console.log(Date())
                let storageRef = firebase.storage().ref(`${bucketName}/${file.name + Date()}`)
                let uploadTask = storageRef.put(file)
                uploadTask.on('state_changed', (snapshot) => {
                    console.log("Image Upload Progress")
                    // e.target.reset();
                    // setMyImage('')
                    // setHeading('')
                    // setContent('')
                    setUserImageLoader('Uploading...')
                    },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        setUserImageLoader('Uploaded')
                        console.log(downloadURL)
                        setMyImageURL(downloadURL)

                        //sending request to backend
                        const news = {
                            news_img:downloadURL,
                            heading,
                            content,
                            // // optional fields
                            // backprofile_imgsrc:'./images/college.png',
                            // address:'not given',
                            // phoneno:'null'
                        };
                        console.log(news)
                        // setErrmsg('')
                        setErrmsg('Updating...')
                        dispatch(addNews(news))

                    })
                })
            }
      
        }
    }

    return (
        <div style={{backgroundColor: "white"}}>
            <div class="container bootstrap snippets bootdey">
                <h1 class="text-primary">Add News</h1>
                <hr/>
            <div class="row">
                <center>
                <form class="form-horizontal" role="form" onSubmit={onSubmit}>
                <div class="col-md-3">
                    <div class="text-center">
                    <img src={myImageURL?myImageURL:''} 
                        class="avatar img-circle " 
                        alt="avatar"/>
                    <h6>{userImageLoader?userImageLoader:"Upload a new photo..."}</h6>
                    {/* <form onSubmit={onUpload}> */}
                        <input type="file" class="form-control" 
                            // style={{width:"85%", marginLeft:"30px"}}
                            onChange={onChange}
                            accept=".jpg, .png, .jpeg|image/*"
                        />
                        {/* <button type="submit" 
                            class="btn btn-primary" 
                            style={{marginTop:"8px"}}
                            // onClick={onUpload}
                        >Upload
                        </button> */}
                    {/* </form> */}
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
                    <div class={errmsg?"alert alert-danger":''}
                        role="alert"
                        style={{cursor: "pointer"}}
                        onClick={()=>setErrmsg('')}
                    >
                    {errmsg?errmsg: ''}
                    </div>
                    <h3>News info</h3>
                    
                    {/* <form class="form-horizontal" role="form" onSubmit={onSubmit}> */}
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
                    {/* <br/> */}
                    {/*<div class="form-group">
                        <label class="col-lg-3 control-label">Email:</label>
                        <div class="col-lg-8">
                        <input class="form-control" type="text" value="janesemail@gmail.com">
                        </div>
                    </div> */}

                    <div class="form-group">
                        <label class="col-lg-3 control-label">Heading:</label>
                        <div class="col-lg-8">
                        <input class="form-control" 
                            id="haeding" 
                            name="heading" 
                            type="text"
                            onChange={(e) => setHeading(e.target.value)}
                            value={heading}
                        />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label" for="exampleFormControlTextarea1">Content:</label>
                        <div class="col-lg-10">
                        <textarea class="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="15"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        ></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        {/* <label class="col-lg-3 control-label">Dob:</label> */}
                        <center>
                            <button type="submit" 
                                class="btn btn-primary" 
                                style={{width:"100px"}}
                            >Add
                            </button>
                        </center>
                    </div>
                </div>
                </form>
                </center>
            </div>
            </div>
            <hr></hr>
            <br/><br/>
        </div>
    );
}

export default AddNews;