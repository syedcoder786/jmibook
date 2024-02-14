import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import '../../../styles/style.css'
import { fetchNews, fetchLatestNews } from '../../../actions/newsActions'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
// import Background from '../../../images/coding.png';

function News(props) {

    const [page,setPage] = useState(0)
    const [limit,setLimit] = useState(10)
    const [newnews,setNewNews] = useState([])
    const [topNews,setTopNews] = useState([])

    const dispatch = useDispatch()

    const news = useSelector((state) => state.news)
    const { newsData, latestNews } = news

    useEffect(()=> {
        dispatch(fetchNews({oldData:newnews, page, limit}))
        setPage(page+1)
        dispatch(fetchLatestNews())
        window.scrollTo(0, 0)
    },[])

    useEffect(()=> {
        // console.log(newsData)
        setNewNews(newsData)
    },[newsData])

    useEffect(()=> {
        // console.log(newsData)
        // setTopNews(newsData)
        const slicedArray = latestNews.slice(1, 3);
        // console.log(slicedArray)
        setTopNews(slicedArray)
    },[latestNews])

    const newsItem = newnews.map(( oneNews ) => (
        <div class="single-blog-area blog-style-2 mb-50 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1000ms">
            <Link to={"/news/"+oneNews._id} style={{textDecoration: "none", color:"black"}}>

            <div class="row align-items-center">
                <div class="col-12 col-md-6">
                    <div class="single-blog-thumbnail">
                        <img src={oneNews.news_img} alt=""/>
                        {/* <div class="post-date">
                            <a href="#">12 <span>march</span></a>
                        </div> */}
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    {/* <!-- Blog Content --> */}
                    <div class="single-blog-content">
                        <div class="line"></div>
                        {/* <a href="#" class="post-tag">Lifestyle</a> */}
                        <h4><a href="#" class="post-headline">{oneNews.heading.split(' ').slice(0, 15).join(' ')}...</a></h4>
                        <p>{oneNews.content.split(' ').slice(0, 30).join(' ')}...</p>
                        <div class="post-meta">
                            {/* <p>By <a href="#">james smith</a></p> */}
                            <p>{oneNews.comments.length} comments</p>
                        </div>
                    </div>
                </div>
                
            </div>
            </Link>
        </div>
    ))

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

    const topNewsItem = topNews.map(topnews => (
        <div class="carousel-item">
            <img src={topnews.news_img} class="d-block w-100" style={{height: "400px"}} alt="First slide"/>
            <div class="carousel-caption d-none d-md-block">
                <h5>{topnews.heading}</h5>
                {/* <p>hii</p> */}
            </div>
        </div>
    ))

    const fetchStateNews = () => {
        dispatch(fetchNews({oldData:newsData, page, limit}))
        setPage(page+1)
    }

    return (
        <div style={{backgroundColor:"white"}}>
            {/* <div id="preloader">
                <div class="preload-content">
                    <div id="original-load"></div>
                </div>
            </div> */}

            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block w-100" style={{height: "400px"}} src={latestNews.length>0?latestNews[0].news_img:"loading.jpg"} alt="First slide"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>{latestNews.length>0?latestNews[0].heading:""}</h5>
                        {/* <p>hii</p> */}
                    </div>
                    </div>
                    {topNewsItem}
                    {/* <div class="carousel-item">
                    <img class="d-block w-100" style={{height: "400px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd9_0HQd3ipyQHpJRgyAvJETdVf2NY8JeFyw&usqp=CAU" alt="Second slide"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>hii</h5>
                        <p>hii</p>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" style={{height: "400px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd9_0HQd3ipyQHpJRgyAvJETdVf2NY8JeFyw&usqp=CAU" alt="Third slide"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>hii</h5>
                        <p>hii</p>
                    </div>
                    </div> */}
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            {/* <div class="hero-area">
                <div class="hero-slides owl-carousel">
                    <div class="single-hero-slide bg-img" style={{backgroundImage: `url(${Background})`}}>
                        <div class="container h-100">
                            <div class="row h-100 align-items-center">
                                <div class="col-12">
                                    <div class="slide-content text-center">
                                        <div class="post-tag">
                                            <a href="#" data-animation="fadeInUp">lifestyle</a>
                                        </div>
                                        <h2 data-animation="fadeInUp" data-delay="250ms"><a href="single-post.html">Take a look at last night’s party!</a></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="single-hero-slide bg-img" style={{backgroundImage: `url(${Background})`}}>
                        <div class="container h-100">
                            <div class="row h-100 align-items-center">
                                <div class="col-12">
                                    <div class="slide-content text-center">
                                        <div class="post-tag">
                                            <a href="#" data-animation="fadeInUp">lifestyle</a>
                                        </div>
                                        <h2 data-animation="fadeInUp" data-delay="250ms"><a href="single-post.html">Take a look at last night’s party!</a></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="single-hero-slide bg-img" style={{backgroundImage: `url(${Background})`}}>
                        <div class="container h-100">
                            <div class="row h-100 align-items-center">
                                <div class="col-12">
                                    <div class="slide-content text-center">
                                        <div class="post-tag">
                                            <a href="#" data-animation="fadeInUp">lifestyle</a>
                                        </div>
                                        <h2 data-animation="fadeInUp" data-delay="250ms"><a href="single-post.html">Take a look at last night’s party!</a></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
                <br/><br/>
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-9">
                            {/* {newsItem} */}

                            <InfiniteScroll
                                dataLength={newnews.length}
                                next={fetchStateNews}
                                hasMore={true}
                                loader={<center><h4>Loading/End of posts...</h4><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></center>}
                                // scrollableTarget="scrollableDiv"
                                style={{overflowX:"hidden"}}
                            >
                                {newsItem}

                            </InfiniteScroll>   
                            {/* <!-- Load More --> */}
                            {/* <div class="load-more-btn mt-100 wow fadeInUp" data-wow-delay="0.7s" data-wow-duration="1000ms">
                                <a href="#" class="btn original-btn">Read More</a>
                            </div> */}
                        </div>

                        {/* <!-- ##### Sidebar Area ##### --> */}
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="post-sidebar-area">


                                {/* <!-- Widget Area --> */}
                                <div class="sidebar-widget-area">
                                    <h5 class="title">Latest News</h5>

                                    <div class="widget-content">

                                        {latestNewsItems}
                                        
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        </div>
        // </div>
    );
}

export default News;