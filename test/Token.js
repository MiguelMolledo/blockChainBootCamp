const { ethers, waffle} = require('hardhat')
const {expect } = require('chai')

// const hardhat = require('hardhat')

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}





describe('Token', ()=>{
	const name = 'Dapp University'
	const symbol = 'DAPP'
	const decimals = '18'
	const totalSupply = '1000000'
	async function deployedToken(){
		const Token = await ethers.getContractFactory('DappToken')
		token = await Token.deploy('Dapp University', 'DAPP', 1000000)
		const accounts = await ethers.getSigners()
		const deployer = accounts.shift()
		// const deployer = accounts[0]
		return {token, deployer, accounts}
	}

	describe('Deployment', ()=>{


		it('Has correct name', async () => {
			const {token} = await waffle.loadFixture(deployedToken)
			expect(await token.name()).to.equal(name)
		})
		it('Has correct Symbol', async () => {
			const {token} = await waffle.loadFixture(deployedToken)
			expect(await token.symbol()).to.equal(symbol)
		})
			it('Has correct Decimals', async () => {
			const {token} = await waffle.loadFixture(deployedToken)
			expect(await token.decimals()).to.equal(decimals)
		})
		it('Has correct Total Supply', async () => {
			const {token} = await waffle.loadFixture(deployedToken)
			const value = ethers.utils.parseUnits(totalSupply, 'ether')
			expect(await token.totalSupply()).to.equal(value)
		})		
		it('Assigns Total Supply to deployer', async () => {
			const {token, deployer} = await waffle.loadFixture(deployedToken)
			expect(await token.totalSupply()).to.equal(await token.balanceOf(deployer.address))
		})		

	})



	describe('Sending Tokens', () => {

		let ammount, transaction, result, token, accounts, deployer
		describe('success Cases', ()=>{

			
			beforeEach( async ()=>{
				Token = await ethers.getContractFactory('DappToken')
				token = await Token.deploy(name, symbol, 1000000)
				accounts = await ethers.getSigners()
				deployer = accounts.shift()

				ammount = tokens(100)
				transaction = await token.connect(deployer).transfer(accounts[0].address, ammount)
				result = await transaction.wait()


			})


			it ('Sending Token', async () => {
				expect(await token.balanceOf(accounts[0].address)).to.equal(ammount)
				expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
				

			})

			it ('Emits a Transfer event', async ()=>{

				// Checking Event Transfer
				const event = result.events[0]
				expect(event.event).to.equal('Transfer')

				// Checking Arguments
				expect(event.args['to']).to.equal(accounts[0].address)
				expect(event.args['from']).to.equal(deployer.address)
				expect(event.args['value']).to.equal(ammount)

			})

		})

		describe('Failure Cases', () => {

			it('rejects insufficient balances', async ()=>{
				//transfer more tokens than deployer has.
				const invalidAmount = tokens(totalSupply + 1)
				await expect(token.connect(deployer).transfer(accounts[0].address, invalidAmount)).to.be.reverted

			})

			it('rejects invalid recipient', async ()=>{
				const amount = tokens(100)
				await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted


			})


		})


	})




})




	//  WITH HOOK Before each
	// let token
	// beforeEach(async ()=>{
	// 	const Token =a wait ethers.getContractFactory('Token')
	// 	token = await Token.deploy()
	// 	return token
	// })

	// all tests
