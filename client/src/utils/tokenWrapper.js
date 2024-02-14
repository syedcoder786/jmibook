import { ethers } from 'ethers';

import {tokenAbi} from "../config/contAbi.json"
import {tokenAdd} from "../config/contAdd.json"

// @returns null if provider or wallet absent else the provider

export const connect = () => {
	const { ethereum } = window;
	if (!ethereum) {
		console.log('Error, wallet absent');
		return null;
	}

	const provider = new ethers.providers.Web3Provider(ethereum);

	return provider;
};

// @returns connected and selected user address
export const getUserAddress = async () => {
    const { ethereum } = window;
	const accounts = await ethereum.request({ method: 'eth_accounts' })
	return accounts;
};

// @returns Contract object
export const getPurchaseToken = async () => {

	// const provider = new ethers.providers.Web3Provider(window.ethereum);
	const provider = connect();

	if (!provider) {
		console.log('Provider is null');
		return null;
	}


	const signer = await provider.getSigner();
	const contract = new ethers.Contract(tokenAdd, tokenAbi, signer);

	return contract;
};