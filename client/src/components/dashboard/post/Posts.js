import React, { Component } from 'react';
import AddPost from './AddPost';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { fetchPosts } from '../../../actions/postActions';
import { addComment } from '../../../actions/postActions';
import { addLike } from '../../../actions/postActions';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import ImageLoader from 'react-loading-image'
import { Audio } from  'react-loader-spinner'
import { BiSolidLike } from "react-icons/bi";


class Posts extends Component {

    state = {
        posts:[],
        // cmt:'',
    }

    componentDidMount() {
        // this.setState({posts:this.props.posts})
        console.log("triggered")
        this.props.fetchPosts({ page: this.props.page, limit: this.props.limit })
    }


    componentDidUpdate(prevProps){
        if(prevProps.posts !== this.props.posts){
            this.setState({posts:this.props.posts})
        }
        // else if(prevProps.post != this.props.post){
        //     if(this.props.post){
        //         let newposts = [...this.state.posts];
        //         newposts.unshift(this.props.post)
        //         // console.log('add post:'+this.props.post.fname)
        //         this.setState({posts:newposts})
        //     }
        // }
        else if(prevProps.comment != this.props.comment){
            if(this.props.comment){
                let newComments = [...this.state.posts];
                // for(var i in newComments){
                //     if(newComments[i]._id === this.props.comment.post_id){
                //         newComments[i].comments.unshift(this.props.comment)
                //         break;
                //     }
                // }
                if(Object.keys(this.props.comment).length != 0){
                    console.log(this.props.comment)
                    newComments[this.props.comment.index].comments.unshift(this.props.comment)
                    this.setState({posts:newComments})
                }
                
            }
        }else if(prevProps.like != this.props.like){
            if(this.props.like.hasOwnProperty("index")){
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
                let newLikes = [...this.state.posts];
                const newOneLike = {
                    user_id: this.props.like.user_id
                }
                // for(var j in newLikes){
                //     if(newLikes[j]._id === this.props.like.post_id){
                //         newLikes[j].likes.unshift(newOneLike)
                //         break;
                //     }
                // }
                if(Object.keys(this.props.like).length != 0){

                    if(this.props.like.likeno){
                        console.log("adding like:"+this.props.like.likeno)
                        newLikes[this.props.like.index].likes.unshift(newOneLike) 
                        this.setState({posts:newLikes})
                        
                    }else{
                        console.log("removing like:"+this.props.like.likeno)
                        removeByAttr(newLikes[this.props.like.index].likes, 'user_id', this.props.like.user_id);
                        this.setState({posts:newLikes})
                    }
                }
                
            }
        }
    }

    fetchStatePosts = () => {
        console.log("infinte triggered")
        this.props.fetchPosts({ page: this.props.page, limit: this.props.limit })
    };


    // onChange = (e) => {
    //     this.setState({cmt:e.target.value})
    // }
    
    onKeyPress = (e,index) => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            e.preventDefault()
            const post_id = e.target.id
            const user_id = this.props.user._id
            const comment = e.target.value
            // console.log(comment)
            if(comment.length>0 && comment.trim() !== ''){
                const newComment = {
                    post_id,
                    user_id,
                    // fname:this.props.user.fname,
                    // lname:this.props.user.lname,
                    // user_img:this.props.user.profile_imgsrc,
                    comment,
                    index
                }
                this.props.addComment(newComment)
                // this.setState({cmt:''})
                e.target.value = ''
            }
        }
    }

    onClick = (e, post, index) => {
        // if(e.target.id)
        const newLike = {
            post_id:post._id,
            user_id:this.props.user._id,
            index,
            likeno:0
        }
        // this.props.addLike(newLike)

        let t=0;
        post.likes.map(userid => {
            if(userid.user_id === this.props.user._id){
                console.log('Already Liked')
                t=1;
                const newLike = {
                    post_id:post._id,
                    user_id:this.props.user._id,
                    index,
                    likeno:0
                }
                this.props.addLike(newLike)
            }
        })
        if(t==0){
            console.log('Not Liked')
            const newLike = {
                post_id:post._id,
                user_id:this.props.user._id,
                index,
                likeno:1
            }
            this.props.addLike(newLike)
        }
    }


    render() {

        const postItems = this.props.posts.map((post, index) => (

            <div class="post">
                <table>
                <tr>
                    <td><img src={post.user.profile_imgsrc} class="logo-img" alt=""/></td>
                    <td><strong><Link to={'/profile/' + post.user._id} style={{textDecoration:"none", color:"black"}}><a style={{textDecoration:"none", color:"black"}} href={'/profile/' + post.user._id}>{post.user.fname} {post.user.lname} ({post.user.branch}, {post.user.semester})
                        <div style={{fontSize: "12px"}}>
                            <Moment fromNow ago>{post.createdAt}</Moment>
                            <span> · ago</span>
                        </div>
                        
                    </a></Link>
                    </strong></td>
                    {/* <div></div> */}

                    {/* <button class="report">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
                            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
                        </svg>
                    </button> */}
                </tr>
                </table>
                <hr style={{margin: '5px'}}/>
                <p class="post-text">
                    {post.discp}
                </p>
                {/* <img src={`./uploads/${post.post_img}`} class="post-img" alt=""/> */}
                <ImageLoader
                    // style={{height: "320px", width: "100%"}}
                    className="post-img"
                    src={post.post_img}
                    alt=""
                    loading={() => <div style={{height:"300px", paddingLeft:"10%", paddingTop:"10%"}}><Audio
                        heigth="500"
                        width="500"
                        color='grey'
                        ariaLabel='loading'
                    /></div>}
                    error={() => <h3><center>Error Reload Page</center></h3>}
            	/>
                {/* <img src={post.post_img} class="post-img" alt=""/> */}
                <hr style={{marginTop:'0', backgroundColor:'black'}}/>
                <button class="like" style={{cursor: "pointer"}} id={post._id} onClick={(e)=>{this.onClick(e,post,index)}}><BiSolidLike size="1.4em"/></button>
                <span class="no-of-likes">{post.likes.length}</span>

                <input 
                    type="text" 
                    class="comment" 
                    placeholder="Comment"
                    id={post._id}
                    // onChange={this.onChange}
                    onKeyPress={(e)=>{this.onKeyPress(e, index)}}
                    // value={this.state.cmt}
                />
                <span class="no-of-comments">{post.comments.length}</span>
                <hr/>

                {post.comments.map(comment => (
                    <div class="comment-by-others">
                    <img src={comment.user.profile_imgsrc} class="comment-img" alt=""/>
                    <span class="commentor">{this.props.user?(this.props.user._id === comment.user._id?(<>
                            You
                            <span style={{fontSize: "10px", marginLeft:"5px"}}>
                            <Moment fromNow ago>{comment.time}</Moment>
                            <span> · ago</span>
                            </span>
                    </>):(
                        <span>{comment.user.fname} {comment.user.lname} <span style={{fontSize: "10px", marginLeft:"5px"}}>
                            <Moment fromNow ago>{comment.time}</Moment>
                            <span> · ago</span>
                        </span></span>)):''}</span><br/>
                    <span class="actual-comment">   
                    {comment.comment}
                    </span>
                    </div>
                ))}
                {/* <div class="comment-by-others">
                <img src="Images/user.png" class="comment-img" alt=""/>
                <span class="commentor">Another User</span><br/>
                <span class="actual-comment">   
                This is a comment
                </span>
                </div> */}
            </div>

        ));


        return (
            // <div>
                <div class="col-md-6" style={{padding: '10px 30px 10px 30px'}}>
                    {/* <!-- posts go here --> */}

                    <AddPost/>

                    <InfiniteScroll
                        dataLength={this.props.posts.length}
                        next={this.fetchStatePosts}
                        hasMore={true}
                        loader={<center><h4 style={{color:'white'}}>Loading/End of posts...</h4></center>}
                    >
                        {postItems}
                    </InfiniteScroll>                 





        {/* <div class="post">
            <table>
               <tr>
                  <td><img src="Images/user.png" class="logo-img" alt=""/></td>
                  <td><strong>User name (CSE, Sem I)</strong></td>

                  <button class="report">
                     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
                        <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                        <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
                      </svg>
                  </button>
               </tr>
            </table>
            <hr style={{margin: '5px'}}/>
            <p class="post-text">
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, unde harum nesciunt nobis amet sit quod asperiores animi ipsa officiis blanditiis esse fugit, omnis aut possimus explicabo autem error molestiae beatae aliquam deleniti expedita perspiciatis. Molestias quis voluptas quasi exercitationem ducimus minima corrupti ipsum iusto deleniti asperiores, accusamus omnis fugiat, voluptate aut, qui totam dolore? Libero culpa similique alias reprehenderit tempore vitae consectetur consequuntur blanditiis eveniet! In modi fugit corrupti atque quasi voluptatibus sint, dolore nemo vero sapiente placeat sequi eius esse odit impedit ipsum dolorum. Nemo saepe, aperiam enim minima, ea necessitatibus error numquam a, quidem odit fugiat.
            </p>
            <img src="Images/logo.jpg" class="post-img" alt=""/>
            <hr style={{marginTop: '0px', backgroundColor: 'black'}}/>
            <button class="like">❤</button>
            <span class="no-of-likes">0</span>

            <input type="text" class="comment" placeholder="Comment"/>
            <span class="no-of-comments">0</span>
            <hr/>
            <div class="comment-by-others">
               <img src="Images/user.png" class="comment-img" alt=""/>
               <span class="commentor">Another User</span><br/>
               <span class="actual-comment">   
               This is a comment
               </span>
            </div>

            <div class="comment-by-others">
               <img src="Images/user.png" class="comment-img" alt=""/>
               <span class="commentor">Another User</span><br/>
               <span class="actual-comment">   
               This is a comment
               </span>
            </div>

            <div class="comment-by-others">
               <img src="Images/user.png" class="comment-img" alt=""/>
               <span class="commentor">Another User</span><br/>
               <span class="actual-comment">   
               This is a comment
               </span>
            </div>
         </div>


         <div class="post">
            <table>
               <tr>
                  <td><img src="Images/user.png" class="logo-img" alt=""/></td>
                  <td><strong>User name (CSE, Sem I)</strong></td>

                  <button class="report">
                     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
                        <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                        <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
                      </svg>
                  </button>
               </tr>
            </table>
            <hr style={{margin: '5px'}}/>
            <p class="post-text">
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, unde harum nesciunt nobis amet sit quod asperiores animi ipsa officiis blanditiis esse fugit, omnis aut possimus explicabo autem error molestiae beatae aliquam deleniti expedita perspiciatis. Molestias quis voluptas quasi exercitationem ducimus minima corrupti ipsum iusto deleniti asperiores, accusamus omnis fugiat, voluptate aut, qui totam dolore? Libero culpa similique alias reprehenderit tempore vitae consectetur consequuntur blanditiis eveniet! In modi fugit corrupti atque quasi voluptatibus sint, dolore nemo vero sapiente placeat sequi eius esse odit impedit ipsum dolorum. Nemo saepe, aperiam enim minima, ea necessitatibus error numquam a, quidem odit fugiat.
            </p>
            <img src="Images/logo.jpg" class="post-img" alt=""/>
            <hr style={{marginTop: '0px', backgroundColor: 'black'}}/>
            <button class="like">❤</button>
            <span class="no-of-likes">0</span>

            <input type="text" class="comment" placeholder="Comment"/>
            <span class="no-of-comments">0</span>
            <hr/>
            <div class="comment-by-others">
               <img src="Images/user.png" class="comment-img" alt=""/>
               <span class="commentor">Another User</span><br/>
               <span class="actual-comment">   
               This is a comment
               </span>
            </div>

            <div class="comment-by-others">
               <img src="Images/user.png" class="comment-img" alt=""/>
               <span class="commentor">Another User</span><br/>
               <span class="actual-comment">   
               This is a comment
               </span>
            </div>

            <div class="comment-by-others">
               <img src="Images/user.png" class="comment-img" alt=""/>
               <span class="commentor">Another User</span><br/>
               <span class="actual-comment">   
               This is a comment
               </span>
            </div>
         </div> */}


                </div>
            // </div>
        );
    }
}

const mapStateToProps=state=>({
    posts:state.post.items,
    post:state.post.item,
    page:state.post.page,
    limit:state.post.limit,
    comment:state.post.cmtitem,
    like:state.post.likeitem,
    postLoading:state.post.postLoading,
    auth:state.auth,
    user:state.auth.user,
});

export default connect(mapStateToProps, { fetchPosts, addComment, addLike })(Posts);
// export default Posts;