
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
	src > current smart contracts
	scripts > scripts to deploy or get config files
	Test  > To develop all de Tests
		mocks > To fake contracts that are not existing in our local test env


## NICE stuff to Remember

1. import {YourContract} from "lib";
2. in foundry. vm.startbroadcast() <--> vm.stopBroadcast()
3. Pure function declares that no state variable will be changed or read.
4. View function declares that no state will be changed.




## Code Example  

### STRUCTS
```solidity
struct YourStruct {
	typeVarialbe [yourVariable];
	address MyAddress;
}
```
