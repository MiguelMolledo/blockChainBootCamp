
# Install Git packages with FORGE and specific tag
    forge install smartcontractkit/chainlink-brownie-contracts@0.6.1 --no-commit

# Run tests
	forge test
	forge test --match-test testMethodName
	forge test --fork-url
	forge covarage ( to see how much of our code is covered by testing) 

# linux commands
	
	echo $YourVariable > prints the variable
	source <yourFile> adds the content in your environment. ex. source .env 



# Important notes when developing

## Folders
* src > Current smart contracts
* scripts > scripts to deploy or get config files
* Test  > To develop all de Tests
   * mocks > To fake contracts that are not existing in our local test env


## NICE stuff to Remember

1. import {YourContract} from "lib";
2. in foundry. vm.startbroadcast() <--> vm.stopBroadcast()
3. Pure function declares that no state variable will be changed or read.
4. View function declares that no state will be changed.

## Specific Solidity Statements

### Pure Methods
* Pure function declares that no state variable will be changed or read.

### view Methods
* View function declares that no state will be changed.

### Internal 
* The internal visibility specifier restricts access to the current contract and any contracts that inherit from it.
* State variables declared as internal can be accessed by the contract itself and its derived contracts (child contracts).
* Functions declared as internal can only be called from within the contract itself and its derived contracts (through inheritance).

### Private
* The private visibility specifier restricts access to only the current contract.

### STRUCTS
```solidity
struct YourStruct {
	typeVarialbe [yourVariable];
	address MyAddress;
}
```

## Foundry Tips
### shell commands
	>> foundryup
	>> anvil
 	>> forge
	   forge test --match-test <nameTestbyregularExp> -fork-url sepolia/mainet/ url -vv (levels of logging) 
	   forge build
    
### broadCast
```solidity
vm.startBroadcast();
// your Code
vm.stopBroadcast();
```
Remember It cannot exist two broadcasts at the same time. be careful with dependencies 
 

### Testing 
``` solidity
import {Test, console} from "forge-std/Test.sol";
// Asserts 
assertEq
assertFalse

```
### using *stateMent* 
```solidity
library customLibrary {
	function newFunction() public {}
}


using customLibrary for uint256;
```
