const ethers = require('ethers');
const config = require('config');
const { cccTokenAbi } = require('./connection.config.js');
// for provider
const provider = new ethers.providers.JsonRpcProvider(config.get('jsonRPC'));

// // for signer
// var privateKey = config.get('PRIVATE_KEY');
// var signer = new ethers.Wallet(privateKey, provider);

cccToken = new ethers.Contract(
	config.get('cccTokenAddr'),
	cccTokenAbi,
	provider,
); // Read only

/**
 * @param {string-address} owner
 * @param {string-address} spender
 * @returns allowance permitted by owner to spender
 */
const allowance = async (owner, spender) => {
	const txReceipt = await cccToken.allowance(owner, spender);
	console.log(txReceipt);
	return txReceipt;
};

/**
 *
 * @param {string-address} owner
 * @returns balance of owner
 */
const balanceOf = async (owner) => {
	const txReceipt = await cccToken.balanceOf(ethers.utils.getAddress(owner));
	console.log(txReceipt);
	return txReceipt;
};

module.exports = {
	allowance,
	balanceOf,
};
