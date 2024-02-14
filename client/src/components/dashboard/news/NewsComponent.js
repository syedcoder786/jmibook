import React, { useEffect, useState } from 'react';
import '../../../styles/style.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNewsComponent, fetchLatestNews, clearNewsComponent, addNewsComment } from '../../../actions/newsActions'
import { Link, useLocation, useHistory } from 'react-router-dom';

function NewsComponent(props) {
    const location = useLocation();
    const history = useHistory() 
    const dispatch = useDispatch()

    const news = useSelector((state) => state.news)
    const { latestNews, newsComponent, newsCommment } = news

    const auth = useSelector((state) => state.auth)
    const { user } = auth

    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState("")

    useEffect(() => {
        // console.log(props.match.params.newsid)
        // dispatch(fetchNewsComponent(props.match.params.newsid))
        dispatch(fetchLatestNews())
    },[])

    useEffect(() => {
        // console.log(props.match.params.newsid)
        dispatch(fetchNewsComponent(props.match.params.newsid))
        window.scrollTo(0, 0);
    },[location])

    useEffect(() => {
        return history.listen((location) => { 
           console.log(`You changed the page to: ${location.pathname}`) 
           dispatch(clearNewsComponent())
        }) 
     },[history]) 

    useEffect(() => {
        // console.log(newsComponent)
        if(newsComponent._id === -1){
            window.location.replace('/')
        }
        if(newsComponent.hasOwnProperty("_id")){
            // console.log("newsCOmponent changed")
            setComments(newsComponent.comments)
        }
    },[newsComponent])

    useEffect(() => {
        if(newsCommment){
            console.log(comments)
            console.log(newsCommment.comments)
            // console.log("changed")
            // console.log(comments)
            // let newArr = [newsCommment,...comments]
            // let newArr = comments
            // newArr.unshift(newsCommment) // never use unshift for this
            // console.log(newArr)
            setComments(newsCommment.comments) //somethimes change state this way to reflect in .map
            // setComments(newArr)
        }
    },[newsCommment])

    const latestNewsItems = latestNews.map(latestnews => (
        <Link to={"/news/"+latestnews._id} style={{textDecoration: "none", color:"black"}}>
            <div class="single-blog-post d-flex align-items-center widget-post">
                {/* <!-- Post Thumbnail --> */}
                <div class="post-thumbnail">
                    <img src={latestnews.news_img} alt=""/>
                </div>
                {/* <!-- Post Content --> */}
                <div class="post-content">
                    {/* <a href="#" class="post-tag">Lifestyle</a> */}
                    <h4><a href="#" class="post-headline">{latestnews.heading.split(' ').slice(0, 10).join(' ')}...</a></h4>
                    <div class="post-meta">
                        {/* <p><a href="#">12 March</a></p> */}
                    </div>
                </div>
            </div>
        </Link>
    ))

    const newsComments = comments.map(comment => (
        <li class="single_comment_area">
            <div class="comment-content d-flex">
                <div class="comment-author">
                    <img src={comment.user.profile_imgsrc} alt="author" style={{height:"70px"}}/>
                </div>
                <div class="comment-meta">
                    {/* <a href="#" class="post-date">March 12</a> */}
                    <Link style={{textDecoration: "none"}} to={"/profile/"+comment.user.user_id}><p><a class="post-author" style={{color:"silver"}}>{comment.user.fname} {comment.user.lname}</a></p></Link>
                    <p>{comment.comment}</p>
                    {/* <a href="#" class="comment-reply">Reply</a> */}
                </div>
            </div>
        </li>
    ))

    const onComment = (e) => {
        e.preventDefault()
        console.log(addComment)
        const onecomment = {
            news_id: newsComponent._id,
            user_id: user._id,
            // fname: user.fname,
            // lname: user.lname,
            // user_img: user.profile_imgsrc,
            comment: addComment,
        }
        if(addComment.trim().length > 0){
            dispatch(addNewsComment(onecomment))
            setAddComment("")
        }
    }

    return (
        <div style={{backgroundColor: "white"}}>
            {/* <div id="preloader">
            <div class="preload-content">
                <div id="original-load"></div>
            </div>
            </div> */}


            <div class="single-blog-wrapper section-padding-0-100">

                <div class="single-blog-area blog-style-2 mb-50">
                    <div class="single-blog-thumbnail">
                        <img src={newsComponent?newsComponent.news_img:"../loading.jpg"} style={{height: "400px"}} alt=""/>
                        <div class="post-tag-content">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        {/* <div class="post-date">
                                            <a href="#">12 <span>march</span></a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-9">
                            <div class="single-blog-area blog-style-2 mb-50">
                                <div class="single-blog-content">
                                    <div class="line"></div>
                                    <a href="#" class="post-tag">Lifestyle</a>
                                    <h4><a href="#" class="post-headline mb-0">{newsComponent?newsComponent.heading:""}</a></h4>
                                    <div class="post-meta mb-50">
                                        <p>By <a href="#">james smith</a></p>
                                        <p>3 comments</p>
                                    </div>
                                    <p>{newsComponent?newsComponent.content:""}</p>
                                </div>
                            </div>

                            <div class="blog-post-author mt-100 d-flex">
                                <div class="author-thumbnail">
                                    <img src="img/bg-img/b6.jpg" alt=""/>
                                </div>
                                <div class="author-info">
                                    <div class="line"></div>
                                    <span class="author-role">Author</span>
                                    <h4><a href="#" class="author-name">James Morrison</a></h4>
                                    <p>Curabitur venenatis efficitur lorem sed tempor. Integer aliquet tempor cursus. Nullam vestibulum convallis risus vel condimentum. Nullam auctor lorem in libero luctus, vel volutpat quam tincidunt. Nullam vestibulum convallis risus vel condimentum. Nullam auctor lorem in libero.</p>
                                </div>
                            </div>

                            <div class="comment_area clearfix mt-70">
                                <h5 class="title">Comments</h5>

                                <ol>
                                    {/* Take comment from here */}
                                    {/* <li class="single_comment_area">
                                        <div class="comment-content d-flex">
                                            <div class="comment-author">
                                                <img src="img/bg-img/b7.jpg" alt="author"/>
                                            </div>
                                            <div class="comment-meta">
                                                <a href="#" class="post-date">March 12</a>
                                                <p><a href="#" class="post-author">William James</a></p>
                                                <p>Efficitur lorem sed tempor. Integer aliquet tempor cursus. Nullam vestibulum convallis risus vel condimentum. Nullam auctor lorem in libero luctus, vel volutpat quam tincidunt.</p>
                                                <a href="#" class="comment-reply">Reply</a>
                                            </div>
                                        </div>
                                    </li> */}
                                    {newsComments}
                                </ol>
                            </div>

                            <div class="post-a-comment-area mt-70">
                                <h5>Leave a reply</h5>
                                <form onSubmit={onComment}>
                                    <div class="row">
                                        {/* <div class="col-12 col-md-6">
                                            <div class="group">
                                                <input type="text" name="name" id="name" required/>
                                                <span class="highlight"></span>
                                                <span class="bar"></span>
                                                <label>Name</label>
                                            </div>
                                        </div> */}
                                        {/* <div class="col-12 col-md-6">
                                            <div class="group">
                                                <input type="email" name="email" id="email" required/>
                                                <span class="highlight"></span>
                                                <span class="bar"></span>
                                                <label>Email</label>
                                            </div>
                                        </div> */}
                                        {/* <div class="col-12">
                                            <div class="group">
                                                <input type="text" name="subject" id="subject" required/>
                                                <span class="highlight"></span>
                                                <span class="bar"></span>
                                                <label>Subject</label>
                                            </div>
                                        </div> */}
                                        <div class="col-12">
                                            <div class="group">
                                                <textarea 
                                                    name="message" 
                                                    id="message"
                                                    onChange={(e) => setAddComment(e.target.value)}
                                                    value={addComment}
                                                ></textarea>
                                                <span class="highlight"></span>
                                                <span class="bar"></span>
                                                <label>Comment</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button type="submit" class="btn original-btn">Reply</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="post-sidebar-area">

                                <div class="sidebar-widget-area">
                                    <h5 class="title">Latest Posts</h5>

                                    <div class="widget-content">

                                        {latestNewsItems}

                                        {/* <div class="single-blog-post d-flex align-items-center widget-post">
                                            <div class="post-thumbnail">
                                                <img src="img/blog-img/lp1.jpg" alt=""/>
                                            </div>
                                            <div class="post-content">
                                                <a href="#" class="post-tag">Lifestyle</a>
                                                <h4><a href="#" class="post-headline">Party people in the house</a></h4>
                                                <div class="post-meta">
                                                    <p><a href="#">12 March</a></p>
                                                </div>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default NewsComponent;