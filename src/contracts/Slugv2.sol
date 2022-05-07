pragma solidity ^0.8.0;
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Slug is ERC20 {

    struct Stake {
        
        uint256 amountTokensStaked;
        address owner;
    }

    mapping (address => uint256) public stakedTokens;
    address[] public stakeholders; //make internal
    uint256 public stakedTokensAmount = 0;
    uint256 public minStake = 10;
    uint256 private totalTransactions = 0;

    event TaxCollected (address indexed to, uint256 indexed amount);

    constructor() ERC20("SlugToken", "SLUG"){
        _mint(msg.sender,1000*10**18);
    }
    

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        uint256 tax = (amount * 10) / 100;
        amount = amount - tax;
        
        _transfer(from, to, amount);
        address random = getRandomStaker();
        _transfer(from, random, tax);
        emit TaxCollected(random, tax);

        return true;
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        uint256 tax = (amount * 10) / 100;
        amount = amount - tax;
        _transfer(owner, to, amount);
        address random = getRandomStaker();
        _transfer(owner, random, tax);
        emit TaxCollected(random, tax);
        return true;
    }

    function transferWithoutTax(address to, uint256 amount) public returns (bool) {
        address owner = _msgSender();
        // uint256 tax = (amount * 10) / 100;
        // amount = amount - tax;
        _transfer(owner, to, amount);
        decreaseAllowance(to, amount);
        // address random = getRandomStaker();
        // _transfer(owner, random, tax);
        // emit TaxCollected(random, tax);
        return true;
    }

    function transferFromWithoutTax(
        address from,
        address to,
        uint256 amount
    ) private returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        // uint256 tax = (amount * 10) / 100;
        // amount = amount - tax;
        
        _transfer(from, to, amount);
        // address random = getRandomStaker();
        // _transfer(from, random, tax);

        return true;
    }


    function getRandomStaker() public returns (address){

        if (stakeholders.length != 0){
            uint256 num = rand();
            return stakeholders[num - 1];
        }
        return msg.sender;
    }

    function stakeToken(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "You don't have enough coins");
        require(balanceOf(msg.sender) > 0, "Must be staking more than 0 coins");
        uint256 allowanceAmount = allowance(msg.sender, address(this));
        require(allowanceAmount >= amount, "Check the token allowance");

        // transferFromWithoutTax(msg.sender, address(this), amount);
        transferWithoutTax(address(this), amount);

        stakedTokens[msg.sender] += amount;
        //balances[msg.sender] -= amount;
        stakedTokensAmount += amount;
        bool newlyeligible = false;
        (newlyeligible, ) = isStakeholder(msg.sender);
        if (newlyeligible == false){
            addStakeholder(msg.sender);
        }

        //addStakeholder(msg.sender);
    }
    function unstakeToken(uint256 amount) external {
        require(balanceOf(address(this)) >= amount, "Contract address does not have enough coins");
        require(amount > 0, "Must unstake more than 0 coins");
        require(stakedTokens[msg.sender] >= amount, "Not enough coins in stake");
        // uint256 allowanceAmount = allowance(address(this), msg.sender);
        // require(allowanceAmount >= amount, "Check the token allowance");

        //approve(msg.sender, amount);
        uint256 ogAmount = amount;
        uint256 tax = (amount * 15) / 100;
        amount = amount - tax;
        _transfer(address(this), msg.sender, amount);
        address random = getRandomStaker();
        _transfer(address(this), random, tax);
        
        //transferFrom(address(this), msg.sender, amount);
        
        stakedTokens[msg.sender] = stakedTokens[msg.sender] - ogAmount;
        stakedTokensAmount -= ogAmount;
        //balances[msg.sender] += amount;

        if (stakedTokens[msg.sender] < minStake){
            removeStakeholder(msg.sender);
        }
        emit TaxCollected(random, tax);




        
    }

    function isStakeholder(address _address)
       public
       view
       returns(bool, uint256)
   {
       for (uint256 s = 0; s < stakeholders.length; s += 1){
           if (_address == stakeholders[s]) return (true, s);
       }
       return (false, 0);
   }

    function addStakeholder(address _stakeholder)
       public
   {
       (bool _isStakeholder, ) = isStakeholder(_stakeholder);
       if(!_isStakeholder) stakeholders.push(_stakeholder);
   }

   /**
    * @notice A method to remove a stakeholder.
    * @param _stakeholder The stakeholder to remove.
    */
   function removeStakeholder(address _stakeholder)
       public
   {
       (bool _isStakeholder, uint256 s) = isStakeholder(_stakeholder);
       if(_isStakeholder){
           stakeholders[s] = stakeholders[stakeholders.length - 1];
           stakeholders.pop();
       }
   }
   function rand()
    public
    view
     returns(uint256)
{
    uint256 seed = uint256(keccak256(abi.encodePacked(
        block.timestamp + block.difficulty +
        ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (block.timestamp)) +
        block.gaslimit + 
        ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) +
        block.number 
        + stakeholders.length + stakedTokensAmount + totalTransactions
    )));
    return (seed % stakeholders.length) + 1;
}


  
}