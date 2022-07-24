const { ethers, waffle} = require('hardhat')
const {expect } = require('chai')

// const hardhat = require('hardhat')




describe('Token', ()=>{

	async function deployedToken(){
		const Token = await ethers.getContractFactory('DappToken')
		token = await Token.deploy('Dapp University', 'DAPP', 1000000)
		return {token}
	}

	describe('Deployment', ()=>{
		const name = 'Dapp University'
		const symbol = 'DAPP'
		const decimals = '18'
		const supply = '1000000'

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
			const value = ethers.utils.parseUnits(supply, 'ether')
			expect(await token.totalSupply()).to.equal(value)
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


