const { ethers, waffle} = require('hardhat')
const {expect } = require('chai')


const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}




describe('Exchange', ()=>{
    let deployer, feeAccount, exchange
    let feePercent = 10
    let token1


    beforeEach(async ()=> {
        const Exchange = await ethers.getContractFactory('Exchange')
		const Token = await ethers.getContractFactory('Token')
		
		token1 = await Token.deploy('Dapp University', 'DAPP', 1000000)
		// token2 = await Token.deploy('Dapp University 2', 'DAPP2', 1000000)
        
        accounts = await ethers.getSigners()
		deployer = accounts[0]
		feeAccount = accounts[1]
		user1 = accounts[2]

		let transaction = await token1.connect(deployer).transfer(user1.address, tokens(100))
		await transaction.wait()
		exchange = await Exchange.deploy(feeAccount.address, feePercent)


		

    })

    describe('Deployment', ()=>{

        it('Tracks the fee account', async ()=>{
            expect(await exchange.feeAccount()).to.equal(feeAccount.address)
        })
        it('Tracks the fee percent', async ()=>{
            expect(await exchange.feePercent()).to.equal(feePercent)
        })

    })
    describe('Depositing Tokens', () =>{
    	let transaction, resultDeposit
    	let amount = tokens(10)

		describe('Sucess', () =>{

			beforeEach(async ()=>{
				transaction = await token1.connect(user1).approve(exchange.address, amount)
				resultApprove = await transaction.wait()

				transaction = await exchange.connect(user1).depositToken(token1.address, amount)
				resultDeposit = await transaction.wait()

			})
	    	it('tracks the taken deposit', async ()=>{

	    		// console.log(user.address, exchange.address, amount)
	    		expect(await token1.balanceOf(exchange.address)).to.equal(amount)
	    		expect(await exchange.balanceOf(token1.address, user1.address)).to.equal(amount)

    		})
	    	it('emmits a Deposit event', async ()=>{

	    		const event = resultDeposit.events[1] // 2 events are emitted
	    		expect(event.event).to.equal('Deposit')
	    		expect(event.args.token).to.equal(token1.address)
	    		expect(event.args.user).to.equal(user1.address)
	    		expect(event.args.amount).to.equal(amount)
	    		expect(event.args.balance).to.equal(amount)


	    	})
    	})

		describe('Failure', () =>{
			it('fails when no token are approved', async ()=>{

				await expect(exchange.connect(user1).depositToken(token1.address, amount)).to.be.reverted
				


			})


		})

    })
    describe('Withdrawing Tokens', () =>{
    	let resWithdrawTokens
    	let amount = tokens(10)


    	describe('Success', ()=>{
			beforeEach(async ()=>{
			transaction = await token1.connect(user1).approve(exchange.address, amount)
			resultApprove = await transaction.wait()

			transaction = await exchange.connect(user1).depositToken(token1.address, amount)
			resultDeposit = await transaction.wait()

			transaction = await exchange.connect(user1).withdrawTokens(token1.address, amount)
			resWithdrawTokens = await transaction.wait()


			})

    		it('Withraw Tokens Funds', async ()=>{
    			expect(await token1.balanceOf(exchange.address)).to.be.equal(0)
    			expect(await exchange.balanceOf(token1.address, user1.address)).to.be.equal(0)
    		})
	    	it('emmits a Withdraw event', async ()=>{

	    		const event = resWithdrawTokens.events[1] // 2 events are emitted
	    		expect(event.event).to.equal('Withdraw')
	    		expect(event.args.token).to.equal(token1.address)
	    		expect(event.args.user).to.equal(user1.address)
	    		expect(event.args.amount).to.equal(amount)
	    		expect(event.args.balance).to.equal(0)


	    	})

    	})
		describe('Failure', () =>{
			it('fails for inssuficient balances', async ()=>{
				await expect(exchange.connect(user1).withdrawTokens(token1.address, amount)).to.be.reverted
			})


		})



    })

    describe('Checking Balances', () =>{
    	let resWithdrawTokens
    	let amount = tokens(1)



		beforeEach(async ()=>{
			transaction = await token1.connect(user1).approve(exchange.address, amount)
			resultApprove = await transaction.wait()

			transaction = await exchange.connect(user1).depositToken(token1.address, amount)
			resultDeposit = await transaction.wait()



		})

		it('Return user Balance', async ()=>{
			expect(await exchange.balanceOf(token1.address, user1.address)).to.be.equal(amount)
		})





    })
    // describe('Emits event', ()=>{

    // 	it('Events', async ()=>{

    // 	})

    // })



})