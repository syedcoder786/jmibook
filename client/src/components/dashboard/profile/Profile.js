import React, { useEffect, useState } from 'react';
import '../../../styles/profilestyle.css'
import { connect } from 'react-redux'
import { fetchProfileUser, fetchProfilePost, clearProfilePosts } from '../../../actions/profileActions';
import { addComment, addLike } from '../../../actions/postActions'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation,useHistory } from 'react-router-dom';

function Profile(props) {
    const location = useLocation();
    const [newData,setNewData] = useState([])
    const [page,setPage] = useState(-1)
    const [limit,setLimit] = useState(10)
    const [pPosts,setPposts] = useState([])


    const history = useHistory() 

    useEffect(() => {
       return history.listen((location) => { 
          console.log(`You changed the page to: ${location.pathname}`) 
          props.clearProfilePosts()
          setPposts([])
          setNewData([])
          setPage(-1)
        //   alert("changing")
        //   socket.emit('forceDisconnect');
       }) 
    },[history]) 

    // useEffect(()=>{

    //     console.log(props.match.params.id)
    //     // setParamid(props.match.params.id)
    //     props.fetchProfileUser(props.match.params.id)
    //     props.fetchProfilePost(props.match.params.id)


    //     // this.props.findPost({id:this.props.match.params.id})    
    // },[])

    useEffect(()=>{

        console.log(props.match.params.id)
        // setParamid(props.match.params.id)
        window.scrollTo(0, 0)
        props.fetchProfileUser(props.match.params.id)

        // // check this comment for infinite scroll
        const fetchData = {
            id:props.match.params.id,
            newData,
            page: page+1,
            limit,
        }
        // console.log("sending request")
        // console.log(page)
        props.fetchProfilePost(fetchData)
        setPage(page+1)

        // this.props.findPost({id:this.props.match.params.id})    
    },[location])

    useEffect(()=>{
        if(props.profileUser.id === -1){
            console.log("Wrong User")
            // window.location.replace('/paytm')
            window.location.replace('/')
        }
    },[props.profileUser])

    useEffect(()=>{
            // console.log("profilepost:")
            // console.log(props.profilePost)
            setPposts(props.profilePost)
            setNewData(props.profilePost)
        // if(props.profilePost){

        // }
    },[props.profilePost])

    useEffect(()=>{
        // console.log(props.comment)
        let newArr = [...pPosts];
        // console.log(newArr)
        // for(var i in pPosts){
        //     if(pPosts[i]._id === props.comment.post_id){
        //         newArr[i].comments.unshift(props.comment)
        //         break;
        //     }
        // }
        if(Object.keys(props.comment).length != 0 && newArr[props.comment.index]){
            newArr[props.comment.index].comments.unshift(props.comment)
            setPposts(newArr)
        }

    },[props.comment])


    useEffect(()=>{
        // console.log(props.like)
        if(props.like && pPosts.length > 0){
        let newLikes = [...pPosts];
        const newOneLike = {
            user_id: props.like.user_id
        }
        var removeByAttr = function(arr, attr, value){
            var i = arr.length;
            while(i--){
               if( arr[i] 
                   && arr[i].hasOwnProperty(attr) 
                   && (arguments.length > 2 && arr[i][attr] === value ) ){ 
        
                   arr.splice(i,1);
        
               }
            }
            return arr;
        }
        if(Object.keys(props.like).length != 0){
            if(props.like.likeno){
                // console.log("adding like:"+props.like.likeno)
                // console.log(pPosts)
                newLikes[props.like.index].likes.unshift(newOneLike) 
                setPposts(newLikes)
                
            }else{
                // console.log("removing like:"+props.like.likeno)
                // console.log(newLikes)
                removeByAttr(newLikes[props.like.index].likes, 'user_id', props.like.user_id);
                setPposts(newLikes)
            }
        }
    }

    },[props.like])

    const fetchStatePosts = () => {
        // console.log("Length"+pPosts.length)
        if(newData.length > 0){
        // console.log(page+1)
        const fetchData = {
            id:props.match.params.id,
            newData,
            page: page+1,
            limit,
        }
        // console.log("sending request:2")
        props.fetchProfilePost(fetchData)
        setPage(page+1)
        }
    };

    const onKeyPress = (e,index) => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            e.preventDefault()
            const post_id = e.target.id
            const user_id = props.user._id
            const comment = e.target.value
            // console.log(comment)
            if(comment.length>0 && comment.trim() !== ''){
                const newComment = {
                    post_id,
                    user_id,
                    fname:props.user.fname,
                    lname:props.user.lname,
                    user_img:props.user.profile_imgsrc,
                    comment,
                    index
                }
                props.addComment(newComment)
                // this.setState({cmt:''})
                e.target.value = ''
            }
        }
    }


    
    const onClick = (e, post, index) => {
        // if(e.target.id)
        let t=0;
        post.likes.map(userid => {
            if(userid.user_id === props.user._id){
                console.log('Already Liked')
                t=1;
                const newLike = {
                    post_id:post._id,
                    user_id:props.user._id,
                    index,
                    likeno:0
                }
                props.addLike(newLike)
            }
        })
        if(t==0){
            console.log('Not Liked')
            const newLike = {
                post_id:post._id,
                user_id:props.user._id,
                index,
                likeno:1
            }
            props.addLike(newLike)
        }
    }

    const postItems = pPosts.map((post, index) => (
        <div class="row">
                    
        <div class="col-sm-8 mx-auto">
            <div class="panel panel-white post" style={{backgroundColor: "#D8D8D8", borderRadius:"5px"}}>
                <div class="post-heading">
                    <div class="pull-left image">
                        <img src={post.user.profile_imgsrc} class="img-circle avatar" alt="user profile image"/>
                    </div>
                    <div class="pull-left meta">
                        <div class="title h6" style={{fontSize:"15px"}}>
                            <a><b>{post.user.fname} {post.user.lname}</b></a>
                            <span style={{fontSize:"12px"}}> ({post.user.semester})</span>
                        </div>
                        <h6 class="text-muted time">{post.user.branch}</h6>
                    </div>
                </div>
                <div class="post-image">
                    <img src=""/><img src={post.post_img} class="image" alt="image post" style={{maxHeight: '550px'}}/>
                </div>
                <div class="post-description">
                    <h5>{post.discp}</h5>
                    {/* <p>Here is a picture of the walkway to our product shoot.</p> */}
                    <div class="stats">
                        <a href="javascript:void(0);" class="btn btn-default stat-item" onClick={(e)=>{onClick(e,post,index)}}>
                            <i class="fa fa-thumbs-up icon"></i>{post.likes.length}
                        </a>
                        {/* <a href="javascript:void(0);" class="btn btn-default stat-item">
                            <i class="fa fa-share icon"></i>128
                        </a> */}
                    </div>
                </div>
                <div class="post-footer">
                    <div class="input-group"> 
                        <input class="form-control" 
                            placeholder="Add a comment" 
                            type="text"
                            id={post._id}
                            onKeyPress={(e)=>{onKeyPress(e,index)}}
                        />
                        {/* <span class="input-group-addon">
                            <a href="javascript:void(0);"><i class="fa fa-edit"></i></a>  
                        </span> */}
                    </div>
                    <ul class="comments-list">
                    {post.comments.map(comment => (
                        <li class="comment">
                            <a class="pull-left" href="javascript:void(0);">
                                <img class="avatar" src={comment.user.profile_imgsrc} alt="avatar"/>
                            </a>
                            <div class="comment-body">
                                <div class="comment-heading">
                                    <h4 class="user">{props.user?(props.user._id === comment.user_id?'You':(<span>{comment.fname} {comment.lname}</span>)):''}</h4>
                                    {/* <h5 class="time">7 minutes ago</h5> */}
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            </div>
        </div>
    ))

    return (
        <div style={{backgroundColor: "#A0A0A0", marginTop: "45px"}}>
        <div class="container">
            <div class="row">
            <div class="col-sm-11 col-sm-offset-2 mx-auto" style={{overflowX:"hidden"}}>
                <div class="panel panel-white profile-widget" style={{backgroundColor:"#D8D8D8", borderRadius:'5px'}}>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="image-container bg2" style={{backgroundImage:"url("+"https://i.pinimg.com/originals/6f/49/d6/6f49d6555e2472b3f00e9e4e21e23f11.jpg"+")"}}>  
                                <img src={props.profileUser.profile_imgsrc} class="avatar" alt="avatar"/> 
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="details">
                                <h4>{props.profileUser.fname} {props.profileUser.lname}<i class="fa fa-sheild"></i></h4>
                                <div>{props.profileUser.branch}</div>
                                <div>{props.profileUser.semester}</div>
                                <div>{props.profileUser.gender}</div>
                                {(props.user && props.profileUser)?(props.user._id === props.profileUser._id)?
                                <div class="mg-top-10">
                                    {/* <a href="#" class="btn btn-default">About Kevin</a> */}
                                    <Link to="/editprofile"><a href="#" class="btn btn-success">Edit Profile</a></Link>
                                </div>
                                :<div></div>:<div>Loading...</div>}
                            </div>
                        </div>
                        
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={newData.length}
                    next={fetchStatePosts}
                    hasMore={true}
                    loader={<center><h4>Loading/End of posts...</h4><br/><br/><br/><br/><br/><br/><br/><br/><br/></center>}
                    // scrollableTarget="scrollableDiv"
                    style={{overflowX:"hidden"}}
                >
                    {postItems}

                </InfiniteScroll>   

                {/* <div class="row">
                    
                    <div class="col-sm-10 mx-auto">
                        <div class="panel panel-white post"  style={{backgroundColor: "#D8D8D8"}}>
                            <div class="post-heading">
                                <div class="pull-left image">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-circle avatar" alt="user profile image"/>
                                </div>
                                <div class="pull-left meta">
                                    <div class="title h6" style={{fontSize:"18px"}}>
                                        <a href="#"><b>John Doe</b></a>
                                        <span style={{fontSize:"16px"}}> uploaded a photo.</span>
                                    </div>
                                    <h6 class="text-muted time">5 seconds ago</h6>
                                </div>
                            </div>
                            <div class="post-image">
                                <img src=""/><img src="https://thumbs.dreamstime.com/b/cybersecurity-computer-hacker-hoodie-cybersecurity-computer-hacker-hoodie-obscured-face-computer-code-overlaying-132493371.jpg" class="image" alt="image post" style={{maxHeight: '550px'}}/>
                            </div>
                            <div class="post-description">
                                <h5>Product Shoot</h5>
                                <div class="stats">
                                    <a href="javascript:void(0);" class="btn btn-default stat-item">
                                        <i class="fa fa-thumbs-up icon"></i>228
                                    </a>
                                </div>
                            </div>
                            <div class="post-footer">
                                <div class="input-group"> 
                                    <input class="form-control" placeholder="Add a comment" type="text"/>
                                </div>
                                <ul class="comments-list">
                                    <li class="comment">
                                        <a class="pull-left" href="javascript:void(0);">
                                            <img class="avatar" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
                                        </a>
                                        <div class="comment-body">
                                            <div class="comment-heading">
                                                <h4 class="user">John dOE</h4>
                                                {/* <h5 class="time">7 minutes ago</h5> */}
                                            {/* </div>
                                            <p>I really love this picture. I really wish i could have been there.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
                    
                    
                    {/* <div class="col-sm-12">
                        <div class="panel panel-white post">
                            <div class="post-heading">
                                <div class="pull-left image">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-circle avatar" alt="user profile image"/>
                                </div>
                                <div class="pull-left meta">
                                    <div class="title h5">
                                        <a href="#"><b>John Doe</b></a>
                                        made a post.
                                    </div>
                                    <h6 class="text-muted time">1 minute ago</h6>
                                </div>
                            </div> 
                            <div class="post-description"> 
                                <p>Anyone who is interested in helping out with the Mark &amp; Markson dinner party, please let me know before the week is over.</p>
                                <div class="stats">
                                    <a href="javascript:void(0);" class="btn btn-default stat-item">
                                        <i class="fa fa-thumbs-up icon"></i>2
                                    </a>
                                    <a href="javascript:void(0);" class="btn btn-default stat-item">
                                        <i class="fa fa-share icon"></i>12
                                    </a>
                                </div>
                            </div>
                            <div class="post-footer">
                                <div class="input-group"> 
                                    <input class="form-control" placeholder="Add a comment" type="text"/>
                                    <span class="input-group-addon">
                                        <a href="javascript:void(0);"><i class="fa fa-edit"></i></a>  
                                    </span>
                                </div>
                                <ul class="comments-list">
                                    <li class="comment">
                                        <a class="pull-left" href="javascript:void(0);">
                                            <img class="avatar" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar"/>
                                        </a>
                                        <div class="comment-body">
                                            <div class="comment-heading">
                                                <h4 class="user">Gavino Free</h4>
                                                <h5 class="time">5 minutes ago</h5>
                                            </div>
                                            <p>Sure, I'd help out.</p>
                                        </div>
                                        <ul class="comments-list">
                                            <li class="comment">
                                                <a class="pull-left" href="javascript:void(0);">
                                                    <img class="avatar" src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="avatar"/>
                                                </a>
                                                <div class="comment-body">
                                                    <div class="comment-heading">
                                                        <h4 class="user">John Doe</h4>
                                                        <h5 class="time">3 minutes ago</h5>
                                                    </div>
                                                    <p>I will email you the details.</p>
                                                </div>
                                            </li> 
                                            <li class="comment">
                                                <a class="pull-left" href="javascript:void(0);">
                                                    <img class="avatar" src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="avatar"/>
                                                </a>
                                                <div class="comment-body">
                                                    <div class="comment-heading">
                                                        <h4 class="user">John Doe</h4>
                                                        <h5 class="time">3 minutes ago</h5>
                                                    </div>
                                                    <p>Ok, cool.</p>
                                                </div>
                                            </li> 
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                    
                    {/* <div class="col-sm-12">
                        <div class="panel panel-white post">
                            <div class="post-heading">
                                <div class="pull-left image">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="img-circle avatar" alt="user profile image"/>
                                </div>
                                <div class="pull-left meta">
                                    <div class="title h5">
                                        <a href="#"><b>Yanique Robinson</b></a>
                                        shared a video.
                                    </div>
                                    <h6 class="text-muted time">1 minute ago</h6>
                                </div>
                            </div> 
                            <div class="post-video">
                                <div class="fluid-width-video-wrapper" style={{paddingTop: "56.2%" }}><iframe src="https://player.vimeo.com/video/98417189" id="fitvid369523"></iframe></div>
                            </div>
                            <div class="post-description">  
                                <div class="stats">
                                    <a href="javascript:void(0);" class="btn btn-default stat-item">
                                        <i class="fa fa-thumbs-up icon"></i>2
                                    </a>
                                    <a href="javascript:void(0);" class="btn btn-default stat-item">
                                        <i class="fa fa-share icon"></i>12
                                    </a>
                                </div>
                            </div>
                            <div class="post-footer">
                                <div class="input-group"> 
                                    <input class="form-control" placeholder="Add a comment" type="text"/>
                                    <span class="input-group-addon">
                                        <a href="javascript:void(0);"><i class="fa fa-edit"></i></a> 
                                    </span>
                                </div> 
                            </div>
                        </div>
                    </div> */}
                
            </div>
        </div>
        </div>
        </div>
    );
}


const mapStateToProps=state=>({
    profileUser:state.profile.profileUser,
    profilePost:state.profile.profilePost,
    user:state.auth.user,
    comment:state.post.cmtitem,
    like:state.post.likeitem,
});

export default connect(mapStateToProps, { fetchProfileUser, fetchProfilePost, clearProfilePosts,addComment, addLike })(Profile);
// export default Profile;