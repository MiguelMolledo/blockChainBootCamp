const { ethers, waffle} = require('hardhat')
const {expect } = require('chai')

// const hardhat = require('hardhat')




describe('Token', ()=>{

	async function deployedToken(){
		const Token = await ethers.getContractFactory('DappToken')
		token = await Token.deploy('Dapp University', 'DAPP', 1000000)
		const accounts = await ethers.getSigners()
		const deployer = accounts[0]
		return {token, deployer}
	}

	describe('Deployment', ()=>{
		const name = 'Dapp University'
		const symbol = 'DAPP'
		const decimals = '18'
		const totalSupply = '1000000'

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

	//  WITH HOOK Before each
	// let token
	// beforeEach(async ()=>{
	// 	const Token =a wait ethers.getContractFactory('Token')
	// 	token = await Token.deploy()
	// 	return token
	// })

	// all tests


})


