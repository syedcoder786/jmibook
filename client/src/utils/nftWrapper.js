import { ethers } from 'ethers';

import {nftAbi} from "../config/contAbi.json"
import {nftAdd} from "../config/contAdd.json"


// @returns Contract object
export const getNFt = () => {

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// const provider = connect();

	if (!provider) {
		console.log('Provider is null');
		return null;
	}

	const signer = provider.getSigner();
	const contract = new ethers.Contract(nftAdd, nftAbi, signer);

	return contract;
};