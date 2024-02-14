// const express = require('express');
// const router = express.Router();
// const pool = require('../../helpers/database');

const cccToken = require('./cccToken');
const openerCoC = require('./openerCoC');

const { allowance, balanceOf } = require('./cccToken');
const { transferCards, ownerOf } = require('./openerCoC');

const config = require('config');

// router.post('/buyPack', async (req, res) => {
// 	const { packId, address } = req.body;

try {
	// 		const x =
	// 			'SELECT cards.code, cards.rarity, mintid.tokenId, mintid.owner FROM mintid LEFT JOIN cards ON cards.code = mintid.code WHERE rarity="Common" AND owner="owner"';
	// 		const sqlQuery = 'SELECT * FROM packdetails WHERE packId=?';
	// 		const rows = await pool.query(sqlQuery, [packId]);

	// 		let common = rows[0].commonAmount;
	// 		let rare = rows[0].rareAmount;
	// 		const sqlQueryCommon =
	// 			'SELECT cards.code, cards.rarity, mintid.tokenId, mintid.owner FROM mintid LEFT JOIN cards ON cards.code = mintid.code WHERE rarity="Common" AND owner="owner"';
	// 		const rowsCommon = await pool.query(sqlQueryCommon);
	// 		// Shuffle array
	// 		const shuffledCommon = rowsCommon.sort(() => 0.5 - Math.random());

	// 		let selected1 = shuffledCommon.slice(0, common);

	// 		const sqlQueryRare =
	// 			'SELECT cards.code, cards.rarity, mintid.tokenId, mintid.owner FROM mintid LEFT JOIN cards ON cards.code = mintid.code WHERE rarity="Rare" AND owner="owner"';
	// 		const rowsRare = await pool.query(sqlQueryRare);
	// 		// Shuffle array
	// 		const shuffledRare = rowsRare.sort(() => 0.5 - Math.random());
	// 		// Get sub-array of first n elements after shuffled
	// 		let selected2 = shuffledRare.slice(0, rare);

	const finalArr = [15, 16, 17, 18, 19];

	// console.log(finalArr);
	let tokenBalance;
	let allowanceAmount;
	// await buyPack(finalArr[i].tokenId)

	const address = '0x1D12b4BEDcb5f250bdBC1CE4f3aeeDad67f87936';

	try {
		const getRequire = async () => {
			console.log(cccToken);
			console.log(cccToken.getTokenAmount);
			tokenBalance = await balanceOf(address);
			console.log('tokenBalance', tokenBalance);

			allowanceAmount = await allowance(
				address,
				config.get('openerCoCAddr'),
			);
			console.log('allowance', allowanceAmount);
		};

		getRequire();

		// tokenBalance = await balanceOf(address);
		// console.log(tokenBalance);

		// allowanceAmount = await allowance(
		// 	address,
		// 	config.get('openerCoCAddr'),
		// );
	} catch (e) {
		console.log(e);
	}

	tokenBalance /= 10 ^ 18;
	allowanceAmount /= 10 ^ 18;

	// if (
	// 	tokenBalance >= rows[0].price &&
	// 	allowanceAmount >= rows[0].price
	// ) {
	// TODO: check if admin is the owner of all tokens ELSE select different tokenIds
	// all elements following array should be true
	// finalArr.forEach(async ({tokenId}) => {config.get('ownerAdd') === await ownerOf(tokenId)})

	try {
		console.log('address', address);
		//console.log(openerCoC);
		const executeTransfer = async () => {
			return await transferCards(100, address, finalArr);

			// return await openerCoC
			// 	.getWeb3Contract()
			// 	.methods.transferCards(100, address, finalArr)
			// 	.send({ from: config.get('ownerAdd') });
		};

		executeTransfer();

		// const txreceipt = await transferCards(
		// 	rows[0].price,
		// 	address,
		// 	finalArr.map(({ tokenId }) => tokenId),
		// );

		// TODO: check receipt for successfull transaction then reflect it into DB
		// for (var i = 0; i < finalArr.length; i++) {
		// 	const sqlQueryRare =
		// 		'UPDATE mintid SET owner=? where tokenId=?';
		// 	const rows = await pool.query(sqlQueryRare, [
		// 		address,
		// 		finalArr[i].tokenId,
		// 	]);
		// }
	} catch (e) {
		//return res.json(e.message);
		console.log('error in openerCoC TRANSFER');
	}
	// } else {
	// 	return res
	// 		.status(400)
	// 		.json({ err: 'Not Enough Purchase Token Balance/Allownace.' });
	// }

	// const sqlQuery2 =
	// 	'SELECT cards.code, cards.type, cards.typeName, cards.name, card.rarity, cards.imageUri,  FROM mintid LEFT JOIN cards on cards.code=mintid.code WHERE owner=?';
	// // const sqlQuery = 'SELECT * FROM mintid WHERE owner=?';
	// const data = await pool.query(sqlQuery2, [address]);
	// console.log(data);
	// res.status(200).json(data);
} catch (error) {
	// res.status(400).json({ msg: error.message });
}
//});

// module.exports = router;
