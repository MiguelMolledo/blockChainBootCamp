const { ethers, waffle} = require('hardhat')
const {expect } = require('chai')

// const hardhat = require('hardhat')

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}





describe('Token', ()=>{

	let token, accounts, deployer, receiver, exchange

	beforeEach( async ()=>{
		const Token = await ethers.getContractFactory('Token')
		token = await Token.deploy('Dapp University', 'DAPP', 1000000)
		accounts = await ethers.getSigners()
		deployer = accounts[0]
		receiver = accounts[1]
		exchange = accounts[2]

	})

	describe('Deployment', ()=>{
		const name = 'Dapp University'
		const symbol = 'DAPP'
		const decimals = '18'
		const totalSupply = '1000000'

		it('Has correct name', async () => {
			expect(await token.name()).to.equal(name)
		})
		it('Has correct Symbol', async () => {
			expect(await token.symbol()).to.equal(symbol)
		})
			it('Has correct Decimals', async () => {
			expect(await token.decimals()).to.equal(decimals)
		})
		it('Has correct Total Supply', async () => {
			const value = ethers.utils.parseUnits(totalSupply, 'ether')
			expect(await token.totalSupply()).to.equal(value)
		})		
		it('Assigns Total Supply to deployer', async () => {
			// const {token, deployer} = await waffle.loadFixture(deployedToken)
			expect(await token.totalSupply()).to.equal(await token.balanceOf(deployer.address))
		})		

	})



	describe('Sending Tokens', () => {

		let ammount, transaction, result
		describe('success Cases', ()=>{

			
			beforeEach( async ()=>{
				ammount = tokens(100)
				transaction = await token.connect(deployer).transfer(receiver.address, ammount)
				result = await transaction.wait()


			})


			it ('Transfer Token Balances', async () => {
				expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
				expect(await token.balanceOf(receiver.address)).to.equal(ammount)
				

			})

			it ('Emits a Transfer event', async ()=>{

				// Checking Event Transfer
				const event = result.events[0]
				expect(event.event).to.equal('Transfer')

				// Checking Arguments
				const args = event.args
				expect(event.args.to).to.equal(receiver.address)
				expect(event.args.from).to.equal(deployer.address)
				expect(event.args.value).to.equal(ammount)

			})

		})

		describe('Failure Cases', () => {
			const totalSupply = tokens(1000000)
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


	describe('Approving Tokens', () => {

		let amount, transaction, result

		beforeEach(async ()=>{
			amount = tokens(100)
			transaction = await token.connect(deployer).approve(exchange.address, amount)
			result = await transaction.wait()
		})

		describe('Success', () => {

			it('allocates an allowance for delegated Token Spending', async ()=>{
				expect(amount).to.equal(await token.allowance(deployer.address, exchange.address))
			})

			it('Emmits an approval Event', async ()=>{

				const event = result.events[0]
				expect(event.event).to.equal('Approval')

				// Checking Arguments
				const args = event.args
				expect(event.args.spender).to.equal(exchange.address)
				expect(event.args.value).to.equal(amount)
			})


		})

	    describe('Failure', () => {
	      it('rejects invalid spenders', async () => {
	        await expect(token.connect(deployer).approve('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
	      })
	    })

	})


	describe('Delegated Token Transfers', ()=>{

		let amount, transaction, result

		beforeEach(async ()=>{
			amount = tokens(100)
			transaction = await token.connect(deployer).approve(exchange.address, amount)
			result = await transaction.wait()
		})

		describe('Success', ()=>{
			beforeEach(async ()=>{
				tTransferFrom = await token.connect(exchange).transferFrom(deployer.address, receiver.address, amount)
				rTransferFrom = await tTransferFrom.wait()
			})

			it ('Transfer Token Balances', async () => {
				expect(await token.balanceOf(deployer.address)).to.be.equal(tokens(999900))
				expect(await token.balanceOf(receiver.address)).to.be.equal(amount)
			})
			it ('Rests the allowance', async () => {
				expect(await token.allowance(deployer.address, exchange.address)).to.be.equal(0)

			})
			it ('Emits a Transfer Event', async () => {
				const event = rTransferFrom.events[0]
				expect(event.event).to.equal('Transfer')

				const args = event.args
				expect(args.from).to.equal(deployer.address)
				expect(args.to).to.equal(receiver.address)
				expect(args.value).to.equal(amount)
			})


		})
		describe('Failure', ()=>{
			const invalidAmount = tokens(1000000000)
			it ('Transfer invalid Amount', async () => {

				await expect(token.connect(exchange).transferFrom(deployer.address, receiver.address, invalidAmount)).to.be.reverted
			})
				


		})


	})	

})