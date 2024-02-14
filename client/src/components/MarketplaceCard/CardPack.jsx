import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { AiOutlineThunderbolt, AiOutlineFire } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import Tilt from "react-parallax-tilt";

import CardWrapper from "./CardStyle";

import ImageLoader from "react-loading-image";
import { Audio } from "react-loader-spinner";

import { ipfsGateway } from "../../config/default";
import { getPurchaseToken, getUserAddress } from "../../utils/tokenWrapper";
import { getNFt } from "../../utils/nftWrapper";

import { mintNft } from "../../actions/nftActions";
// import { getPurchaseToken } from "../../utils/contractWrapper"

import { tokenAdd, nftAdd } from "../../config/contAdd.json";
import { ethers } from "ethers";

import { useSelector, useDispatch } from "react-redux";

const CardPack = ({
  key,
  id,
  rare,
  name,
  price,
  image,
  description,
  isMinted,
  uri,
}) => {
  const [emAnimacao, setEmAnimacao] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { mintedNft } = useSelector((state) => state.nft);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mintedNft) {
      console.log(mintedNft);
    }
  }, [mintedNft]);

  const mint = async () => {
    if (window.ethereum) {
      try {
        const accounts = await getUserAddress();
        const address = accounts[0];
        console.log("Address is: " + address);
        const tokenContract = await getPurchaseToken();

        console.log(tokenContract);
        setLoading(true);
        const balance = await tokenContract.balanceOf(address);
        const allowance = await tokenContract.allowance(address, nftAdd);

        console.log("Address is: " + address);
        console.log("Balance is: " + balance / 10 ** 18);
        console.log("Allowance is: " + allowance / 10 ** 18);
        if (balance / 10 ** 18 >= price) {
          if (allowance / 10 ** 18 < price) {
            try {
              const tx = await tokenContract.approve(
                nftAdd,
                price + "0".repeat(18)
              );
              console.log(tx);
              const rx = await tx.wait();
              console.log(rx);
            } catch (e) {
              setLoading(false);
              console.log(e);
              return;
            }
          }
          const newAllowance = await tokenContract.allowance(address, nftAdd);
          let mintCount = 0;
          if (newAllowance / 10 ** 18 >= price) {
            try {
              const nftContract = await getNFt();
              console.log(nftContract);
              const getCount = await nftContract.getMintCount();
              mintCount = ethers.utils.formatEther(getCount) * 10 ** 18;
              console.log(mintCount);
              console.log(uri);
              const tx2 = await nftContract.mintCard(
                price + "0".repeat(18),
                uri
              );
              console.log(tx2);
              const rc2 = await tx2.wait();
              console.log(rc2);
            } catch (err) {
              console.log(err);
              setLoading(false);
              return;
            }
          } else {
            alert("Not Enough Allowanace");
            setLoading(false);
            return;
          }
          dispatch(
            mintNft({
              id,
              ownerId: user._id,
              ownerAddress: address,
              tokenId: mintCount,
              isMinted: true,
            })
          );
          setLoading(false);
        } else {
          // toast.error("Insufficent Purchase Tokens.")
          setLoading(false);
          alert("Insufficent Purchase Tokens.");
          return;
        }
      } catch (e) {
        console.log(e);
        alert("Network Error or Switch to rikeby test network.");
        setLoading(false);
      }
    } else {
      alert("Install Metamask.");
    }
  };

  return (
    <CardWrapper className="cardPack" animado={emAnimacao} key={key}>
      <div className="icons">
        {isMinted && (
          <div className="soldOff">
            <p>
              <MdClose /> Sold Off
            </p>
          </div>
        )}
        {rare === "Legendary" && (
          <div className="featured">
            <p>
              <AiOutlineThunderbolt /> {rare}
            </p>
          </div>
        )}
        {rare === "Epic" && (
          <div className="rare">
            <p>
              <AiOutlineFire /> {rare}
            </p>
          </div>
        )}
      </div>
      <div className="card" style={{ backgroundColor: "#1F1E1D" }}>
        <Tilt
          onEnter={(e) => setEmAnimacao(false)}
          onLeave={(e) => {
            setEmAnimacao(true);
          }}
        >
          <ImageLoader
            style={{ height: "320px", width: "100%" }}
            className="card-image"
            src={ipfsGateway + image.slice(7)}
            loading={() => (
              <div style={{ height: "400px", paddingTop: "50%" }}>
                <Audio
                  heigth="500"
                  width="500"
                  color="grey"
                  ariaLabel="loading"
                />
              </div>
            )}
            error={() => (
              <h3>
                <center>Error Reload Page</center>
              </h3>
            )}
          />
          {/* <img src={image} alt={name} style={{height:"320px"}} /> */}
        </Tilt>
      </div>

      <div className="infos">
        <h4 style={{ textAlign: "left" }}>{name}</h4>
        <div className="priceAndStock">
          <span className="price">{price} JMI Token</span>
          <span className="stock">Rarity: {rare}</span>
        </div>
        <hr />
        <p style={{ textAlign: "left" }}>{description}</p>
      </div>

      <div className="footer">
        {loading ? (
          <Link className="soldOut">
            <div>Loading...</div>
          </Link>
        ) : (
          <Link
            onClick={mint}
            // href={path}
            // href={{
            // 	pathname: path,
            // 	query: {
            // 		packid: key
            // 	}
            // }}
          >
            {/* {saleSoon ? 'Sale Soon' : 'Buy'} */}
            Buy
          </Link>
        )}

        {/* <p className='likes'>
					<span>
						<AiOutlineHeart />
					</span>{' '}
					2.7k
				</p> */}
      </div>
    </CardWrapper>
  );
};

export default CardPack;
