import React, { useEffect, useState } from 'react';

import ImageLoader from 'react-loading-image'
import { Audio } from  'react-loader-spinner'

import MarketplaceWrapper from "../../MarketplaceCard/MarketplaceGrid"

import { fetchNfts } from '../../../actions/nftActions';

import { useSelector, useDispatch } from "react-redux"

// import Card from "../../CollectionCard/Card"

import CardPack from '../../MarketplaceCard/CardPack';

function Nfts(props) {

    const cardsData = [
        {
            name: "name",
            price: 200,
            rarity:"Common",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name: "name",
            price: 200,
            rarity:"Common",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name: "name",
            price: 200,
            rarity:"Rare",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name: "name",
            price: 200,
            rarity:"Rare",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name: "name",
            price: 200,
            rarity:"Rare",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name: "name",
            price: 200,
            rarity:"Rare",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name: "name",
            price: 200,
            rarity:"Rare",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
    ]

    const images = [
        { url:"https://firebasestorage.googleapis.com/v0/b/jamiabook-46202.appspot.com/o/images%2Fwatch_dogs_2_parkour.jpgFri%20Feb%2004%202022%2013%3A44%3A41%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=dd349e58-2a5b-4e3a-b36a-b84c3e44a009" },
        { url:"https://imageio.forbes.com/specials-images/imageserve/617853670/Drive-by-hacker/960x0.jpg?fit=bounds&format=jpg&width=960" },
        { url:"https://www.howtogeek.com/wp-content/uploads/2021/06/hacker_header.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1" },
        { url:"https://firebasestorage.googleapis.com/v0/b/jamiabook-46202.appspot.com/o/images%2Fabcd.jpgFri%20Dec%2017%202021%2012%3A01%3A11%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=6a2d08dd-202a-456d-8eb4-2fafccaf1e25" }
    ]

    // const allCards = cardsData.map((card, index) => (
    //     <div class="col-auto mb-3" key={index}>
    //         <div class="card" style={{width: "18rem"}}>
    //         {/* <img style={{height: "400px"}} src={card.imageUri?card.imageUri:"card-Airon.jpg"} class="card-img-top" alt="..."/> */}
    //         <Tilt 
    //             onEnter={(e) => setRoatate(false)}
    //         >
    //         <ImageLoader
    //             style={{height: "250px", width: "100%"}}
    //             class="card-img-top"
    //             src={"https://firebasestorage.googleapis.com/v0/b/jamiabook-46202.appspot.com/o/images%2Fwatch_dogs_2_parkour.jpgFri%20Feb%2004%202022%2013%3A44%3A41%20GMT%2B0530%20(India%20Standard%20Time)?alt=media&token=dd349e58-2a5b-4e3a-b36a-b84c3e44a009"}
    //             loading={() => <div style={{height:"400px", paddingTop:"50%"}}><Audio
    //                 heigth="500"
    //                 width="500"
    //                 color='grey'
    //                 ariaLabel='loading'
    //               /></div>}
    //             error={() => <h3><center>Error Reload Page</center></h3>}
    //         />
    //         </Tilt>
    //             <div class="card-body">
    //                 <h5 class="card-title">{card.name}</h5>
    //                 <h6 class="card-subtitle mb-2 text-muted">Price- {card.price}</h6>
    //                 <p class="card-text">{card.description}</p>
    //                 {/* <a class="card-link"
    //                     style={{cursor: "pointer", color:"green"}}
    //                     onClick={() => {
    //                         toggle(card.uri, card.code)
    //                     }}
    //                 >Mint</a> */}
    //                 {/* {card.amount===0 && <a href="" class="card-link"><Link to='/editCard' state={{newCardData:card}} >Edit</Link></a>} */}
    //             </div>
    //         </div>
    //     </div>
    // ))

    const dispatch = useDispatch()

    const {nfts} = useSelector((state) => state.nft)
    // const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(fetchNfts())
    },[])

    const allNfts = nfts.map((card, index) => (
        <CardPack 
            key={index} 
            id={card._id}
            name={card.name} 
            price={card.price} 
            rare={card.rarity} 
            image={card.imageUri} 
            featured={true} 
            description={card.description}
            isMinted={card.isMinted}
            uri={card.uri}
        />
    ))

    return (
        <div style={{color:"white"}}>

            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                </ol>
                <div class="carousel-inner">
                    {/* <div class="carousel-item active">
                    <img class="d-block w-100" src="./logo192.png" alt="First slide"/>
                    </div> */}
                    {/* <div class="carousel-item">
                    <img class="d-block w-100" src="./logo192.png" alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src="./logo192.png" alt="Third slide"/>
                    </div> */}
                    {images.map((image, index) => (
                        <div key={index} class={index===0?"carousel-item active":"carousel-item"}>
                            <img class="d-block w-100" src={image.url} alt="slide" style={{height: "500px"}}/>
                        </div>
                    ))}
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
            {/* <br/> */}
            {/* cards here */}
            {/* <div class="container mt-4">
                <div class="row"> */}
                    {/* {loading?<div style={{marginLeft: "25%"}}><Audio
                    heigth="500"
                    width="500"
                    color='grey'
                    ariaLabel='loading'
                  /></div>: */}
                  <MarketplaceWrapper>
                    <h1>
					    DISCOVER <span> NFTs</span>
				    </h1>
                    <section className='body'>
                        {allNfts}
                    </section>
                  </MarketplaceWrapper>
                {/* </div>
            </div> */}
        </div>
    );
}

export default Nfts;