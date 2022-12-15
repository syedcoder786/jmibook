const ethers = require('ethers');
const config = require('config');
const { OpenerCoCAbi } = require('./connection.config.js');
// for provider
const provider = new ethers.providers.JsonRpcProvider(config.get('jsonRPC'));

// for signer
var privateKey = config.get('PRIVATE_KEY');
var signer = new ethers.Wallet(privateKey, provider);

openerCoC = new ethers.Contract(
	config.get('openerCoCAddr'),
	OpenerCoCAbi,
	signer,
); // Read only

/**
 *
 * @param {int-uint256} price price of cards
 * @param {string-address} receiver receiver's address
 * @param {int[]-uint256[]} tokenIdArr array of tokenIds to transfer to receiver
 * @returns txreceipt
 */
// const transferCards = async (price, receiver, tokenIdArr) => {
// 	const txReceipt = await openerCoC.transferCards(
// 		price,
// 		receiver,
// 		tokenIdArr,
// 	);

// 	console.log(txReceipt);
// 	return txReceipt;
// };

const transferCards = async (price, receiver, tokenIdArr) => {
	console.log(ethers)
	console.log(ethers.block)
	// const blockGasLimit = ethers.block.gasLimit
	const txReceipt = await openerCoC.transferCards(
		price,
		receiver,
		tokenIdArr,
	);

	console.log(txReceipt);
	return txReceipt;
};



/**
 *
 * @param {int-uint256} tokenId
 * @returns owner's address
 */
const ownerOf = async (tokenId) => {
	const txReceipt = await openerCoC.ownerOf(tokenId);
	console.log(txReceipt);
	return txReceipt;
};


/**
 * @returns mintCount
 */
 const getMintCount = async () => {
	const txReceipt = await openerCoC.getMintCount();
	console.log(txReceipt);
	return txReceipt;
};


// /**
//  *
//  * @param {string-address} to proxy/operator's address
//  * @param {int-uint256} tokenId
//  * @returns txreceipt
//  */
// const approve = async (to, tokenId) => {

// 	const txReceipt = await openerCoC.methods.approve(
// 		to,
// 		tokenId
// 	).send(
// 		config.get('ownerAdd')
// 	);
// 	console.log(txReceipt);
// 	return txReceipt;

// };

// /**
//  *
//  * @param {int-uint256} tokenId
//  * @returns proxy/operator's address
//  */
// const getApproved = async (tokenId) => {

// 	const txReceipt = await openerCoC.methods.getApproved(
// 		tokenId
// 	).call();
// 	console.log(txReceipt);
// 	return txReceipt;

// };

// /**
//  *
//  * @param {string-address} operator proxy/operator's address
//  * @param {bool-bool} approved set true/false for granting permission
//  * @returns txreceipt
//  */
// const setApprovalForAll = async (operator, approved) => {

// 	const txReceipt = await openerCoC.methods.setApprovalForAll(
// 		operator,
// 		approved
// 	).send(
// 		config.get('ownerAdd')
// 	);
// 	console.log(txReceipt);
// 	return txReceipt;

// };

// /**
//  *
//  * @param {string-address} owner tokenOwner address
//  * @param {string-address} operator proxy/operator's address
//  * @returns bool true if approval is granted by owner
//  */
// const isApprovedForAll = async (owner, operator) => {

// 	const txReceipt = await openerCoC.methods.isApprovedForAll(
// 		owner,
// 		operator
// 	).call();
// 	console.log(txReceipt);
// 	return txReceipt;

// };

// /**
//  *
//  * @param {string-address} from owner of tokenid
//  * @param {string-address} to receiver of tokenid
//  * @param {int-uint256} tokenId tokenid to transferred
//  * @returns txreceipt
//  */
// const safeTransferFrom = async (from, to, tokenId) => {

// 	const txReceipt = await openerCoC.methods.safeTransferFrom(
// 		from,
// 		to,
// 		tokenId
// 	).send(
// 		config.get('ownerAdd')
// 	);
// 	console.log(txReceipt);
// 	return txReceipt;

// };

// /**
//  *
//  * @param {string-address} from owner of tokenid
//  * @param {string-address} to receiver of tokenid
//  * @param {int-uint256} tokenId tokenid to transferred
//  * @param {string-bytes32} _data data for erc721Receiver
//  * @returns txreceipt
//  */
// const safeTransferFrom = async (from, to, tokenId, _data) => {

// 	const txReceipt = await openerCoC.methods.safeTransferFrom(
// 		from,
// 		to,
// 		tokenId,
// 		_data
// 	).send(
// 		config.get('ownerAdd')
// 	);
// 	console.log(txReceipt);
// 	return txReceipt;

// };

module.exports = {
	transferCards,
	ownerOf,
	getMintCount,
};
