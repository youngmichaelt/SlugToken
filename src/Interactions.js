import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import * as Loader from 'react-loader-spinner';

const Interactions = (props) => {

    const [txnHash, setTxnHash] = useState();

    const [allowance, setAllowance] = useState();
    const [selfAllowance, setSelfAllowance] = useState();
    const [ApproveOrStake, setApproveOrStake] = useState();
    const [stakeBalance, setStakeBalance] = useState(0);
    const [unstakeBalance, setUnstakeBalance] = useState();

    const [stakeAmountState, setStakeAmount] = useState();
    const [stakeState, setStakeState] = useState();

    const [txnPending, setTxnPending] = useState();
    const [txnComplete, setTxnComplete] = useState();

    const [tokenName, setTokenName] = useState("Token");
    const [balance, setBalance] = useState(0);

    const [maxStakeAmount, setMaxStakeAmount] = useState(null);


    

    let contract = props.contract.contract;
    let defaultAccount = props.contract.defaultAccount;
    let provider = props.contract.provider;
    let setOpenModal = props.contract.setOpenModal;
    let setErrorMessage = props.contract.setErrorMessage;
    let network = props.contract.network;

    

    const approveOrStake = async () => {
        try{
            if (defaultAccount != null && defaultAccount.length != 0){
                let contractAddress = await contract.address;
                let account = defaultAccount
                if (account instanceof Array){
                    account = account[0];
                }
                let allowance = await contract.allowance(account, contractAddress);

                let allowanceBalance = allowance * Math.pow(10, 18);
                setAllowance(ethers.utils.formatUnits(allowance,18));
                console.log(ethers.utils.formatUnits(allowance,18))

                let selfAllowance = await contract.allowance(account, account);
                let selfAllowanceBalance = selfAllowance * Math.pow(10, 18);
                setSelfAllowance(ethers.utils.formatUnits(selfAllowance,18));

                if (allowanceBalance > 0 && selfAllowanceBalance > 0){
                    setApproveOrStake("Stake");
                } else {
                    setApproveOrStake("Approve");
                }
            } else {
                setApproveOrStake("Stake");
            }
            
        } catch (e) {   
            setOpenModal(true);
            setErrorMessage(e);
        }
        
    }

    const getStakeBalance = async () =>{
        try {
            let isStakeHolder = false;
            let stakeId = 0;
            if (defaultAccount != null && defaultAccount.length > 0){
                if (defaultAccount instanceof Array){
                    [isStakeHolder, stakeId] = await contract.isStakeholder(defaultAccount[0]);
                } else {
                    [isStakeHolder, stakeId] = await contract.isStakeholder(defaultAccount);
                }
                
                
                if (isStakeHolder == true){
                    let stakeAmountBig = 0;
                    if (defaultAccount instanceof Array){
                        stakeAmountBig = await contract.stakedTokens(defaultAccount[0]);
                    } else {
                        stakeAmountBig = await contract.stakedTokens(defaultAccount);
                    }
                    
                    let stakeAmount = ethers.utils.formatUnits(stakeAmountBig, 18)
                    setStakeBalance(stakeAmount);
                } else {
                    setStakeBalance(0);
                }
            } else {
                setStakeBalance(0);
                setBalance(0)

            }
            
        } catch (e) {   
            setOpenModal(true);
            setErrorMessage(e);
        }
        
    }

    const stakeStateHandler = () => {
        if (stakeState == "Unstake"){
            setApproveOrStake("Unstake")


        } else {
            if (defaultAccount != null && defaultAccount.length > 0){
                approveOrStake();
            }
            
        }
    }

    const approveStakeHandler = (e) => {

        let stakeAmount = e;
        if (stakeState != "Unstake"){
            if (stakeAmount <= parseInt(allowance) && stakeAmount <= parseInt(selfAllowance)){
                setApproveOrStake("Stake");
            }
            else if (stakeAmount == 0){
                setApproveOrStake("Stake");
            }
            else {
                setApproveOrStake("Approve");
            }
        }
    }

    

    

    const stakeHandler = async (e) => {
        e.preventDefault();
        console.log(defaultAccount);

        try {
            if (stakeState == "Unstake"){
                let contractAddress = await contract.address;
                let unstakeAmount = parseInt(stakeAmountState);
                let unstakeAmountBig = ethers.utils.parseUnits(stakeAmountState, 18);
    
                if (stakeBalance > unstakeAmount){
                    let txn = await contract.unstakeToken(unstakeAmountBig);
                    console.log(txn);
                    setTxnHash("Unstake transaction confirmation hash: " + txn.hash);
    
                    pollTransaction(txn.hash);
                    // setStakeAmount(0);
    
                    // let balance = 0;
                    
                } else {
                    window.alert("You cannot unstake more tokens than you have staked...");
                }
            } else {
                let contractAddress = await contract.address;
               
                let stakeAmount = parseFloat(stakeAmountState);
                let stakeAmountBig = ethers.utils.parseUnits(stakeAmountState, 18);
                // let allowanceBig = ethers.utils.parseUnits(allowance.toString());
                console.log(parseFloat(allowance),selfAllowance, parseFloat(ethers.utils.formatUnits(stakeAmountBig,0)), stakeAmount)
                if (stakeAmount > balance){
                    window.alert("You do not have enough tokens...");
                } else {
                    if (stakeAmount <= parseFloat(allowance) && stakeAmount <= parseFloat(selfAllowance)){
    
                        let txn = await contract.stakeToken(stakeAmountBig);
                        console.log(txn);
                        setTxnHash("Stake transaction confirmation hash: " + txn.hash);
                        pollTransaction(txn.hash);
                        // setStakeAmount(0);
        
                    } else {
                        let approveSelftxn = await contract.approve(defaultAccount, stakeAmountBig);
                        let txn = await contract.approve(contractAddress, stakeAmountBig);
                        console.log(txn);
                        setTxnHash("Approval transaction confirmation hash: " + txn.hash);
                        pollTransaction(txn.hash);
                    }
                }
                
            }
        } catch (e) {   
            setOpenModal(true);

            if (typeof e === 'object'){
                setErrorMessage(e.message);
            } else {
                console.log(e);
                setErrorMessage(e);
            }
            
        }

        
        
    }

    // const unstakeHandler = async (e) => {
    //     e.preventDefault();
    //     let contractAddress = await contract.address;
    //     let unstakeAmount = parseInt(e.target.unstakeAmount.value);
    //     let unstakeAmountBig = ethers.utils.parseUnits(e.target.unstakeAmount.value, 18);

    //     if (stakeBalance > unstakeAmount){
    //         let txn = await contract.unstakeToken(unstakeAmountBig);
    //         console.log(txn);
    //         setTxnHash("Unstake transaction confirmation hash: " + txn.hash);

    //         pollTransaction(txn.hash);

    //         balance = 0;
            
    //     } else {
    //         window.alert("You cannot unstake more tokens than you have staked...");
    //     }
        
    // }

    const pollTransaction = async (txnHash) => {
        try{
            let txn = await provider.getTransactionReceipt(txnHash);
            let time = 0;
            setApproveOrStake(<span className='justify-center flex'>                
            <Loader.Oval className='' type="Circles" color="#000000" height={30} width={30}/>
            </span>);
        

            while (txn == null && time < 30){
                await new Promise(r => setTimeout(r, 2000));
                txn = await provider.getTransactionReceipt(txnHash);
                time += 1;
                
            }
            if (time == 30){
                setTxnPending("Time out error, check your transaction to make sure it went through");
            } else {
                setTxnPending("txn complete");
            }
            
            setTxnComplete(txnHash);
            stakeStateHandler();
        } catch (e) {   
            setOpenModal(true);
            setErrorMessage(e);
        }
        

        
    }
    const updateTokenName = async () => {
        let name = await contract.name();

        setTokenName(name);
    }
    const updateBalance = async () => {
        
        let balanceBigN = 0;

        if (defaultAccount instanceof Array){
            balanceBigN = await contract.balanceOf(defaultAccount[0]);
        } else {
            balanceBigN = await contract.balanceOf(defaultAccount);
        }

        let balanceNumber = balanceBigN;

        let tokenDecimals = await contract.decimals();

		let tokenBalance = balanceNumber / Math.pow(10, 18);
        console.log(2 * Math.pow(10,18))
        setBalance(tokenBalance.toFixed(5));
    };

    const maxStakeAmountHandler = () => {

        if (stakeState == "Unstake"){   
            setStakeAmount(stakeBalance);
        } else {
            setStakeAmount(balance);
        }
        
    }

   

    useEffect(() =>{
        
        
        if (contract != null){  

            

            if (network == 'rinkeby') {
                updateBalance();
                updateTokenName();
                // approveOrStake();
                stakeStateHandler();
                getStakeBalance();
            } else if (network != null){
                setOpenModal(true);
                setErrorMessage("Wrong network");
            }
            
            
        } else {
            setApproveOrStake("Approve");
        }
    },[contract, defaultAccount, stakeState, txnComplete, network])
    //contract, defaultAccount, txnPending, stakeState]

    return (
        <div className=' pt-4 bg-white pixel-border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 '>
            <div className=''>
                <button className='mx-5 mb-5 px-4 py-2 bg-lime-400 hover:bg-lime-600 pixel-border text-center' onClick={() => setStakeState("Stake")}>
                    <span className=''>Stake</span>
                </button>
                <button className='mx-5 mb-5 px-4 py-2 bg-lime-400 hover:bg-lime-600 pixel-border text-center' onClick={() => setStakeState("Unstake")}>
                    <span>Unstake</span>
                </button>
                <hr className='pb-5'></hr>
            </div>
            <div id='stake-detail' className='mx-3'>
                <div id='amount' className='bg-lime-500 pixel-border px-3 py-10 '>
                        <div className='px-15 mb-2 text-left text-black'>Amount</div>
                        <div className='flex md:mx-5 '>
                            {/* <form className='flex' onSubmit={stakeHandler}> */}
                            <div className='ml-10 mr-4'>
                                <input className='pixel-border xl:text-xl lg:text-xl md:text-xl sm:text-xl' onChange= {(e) => {setStakeAmount(e.target.value);approveStakeHandler(e.target.value)}} id='stakeAmount' type='number' min='0' step='0.001' placeholder='0' value={stakeAmountState}></input>
                            </div>
                            <button className='pixel-border bg-lime-200 w-16 hover:bg-lime-600' onClick={(e) => {maxStakeAmountHandler()}}>
                                <span>Max</span>
                            </button>
                            {/* </form> */}
                        </div>
                        
                    


                </div>
                
                {/* <form onSubmit={unstakeHandler}>
                    <h3>Unstake tokens </h3>
                    <p>Amount</p>
                    <input type='number' id='unstakeAmount' min='0' step='0.001' placeholder='0'></input>
                    <button type='submit'>Unstake</button>
                </form> */}
            </div>

            <div className='mt-10 mb-10 mr-3 ml-3  '>
                    <div className='flex pb-10 relative'>
                        <p className='left-0 absolute'>Balance: </p>
                        <p className='right-0 absolute'>{balance}</p>
                    </div>
                    <div className='flex mb-10 relative'>
                        <p className='left-0 absolute' >Staked balance: </p>
                        <p className='right-0 absolute' >{stakeBalance}</p>
                    </div>
            </div>
                {/* <button type='submit' onClick={stakeHandler}>{ApproveOrStake}</button> */}
                {/* <form onSubmit={stakeHandler}>
                    <h3>Stake tokens </h3>
                    <p>Amount</p> */}
                    {/* <input type='number' id='stakeAmount' min='0' step='0.001' placeholder='0'></input> */}
                    {/* <button type='submit' onClick={stakeHandler}>{ApproveOrStake}</button> */}
                {/* </form> */}
                

                <button disabled={stakeAmountState==0 || stakeAmountState == null} className='pixel-border bg-lime-500 disabled:bg-lime-100 active:bg-lime-500 hover:bg-lime-600 xl:w-96 lg:w-96 md:w-96 sm:w-96 w-80 py-3 my-5' type='submit' onClick={stakeHandler}>
                    
                {ApproveOrStake}
                </button>
                
            
            <div className='px-10'>
                {/* {txnPending} */}
                


            </div>
            {/* <div>
				{txnHash}
			</div> */}


            {/* <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6" action="#">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
            <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required=""/>
            </div>
            <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required=""/>
            </div>
            <div class="flex items-start">
            <div class="flex items-start">
            <div class="flex items-center h-5">
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <a href="#" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
            </div>
            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
            </div>
            </form>
            </div> */}


        </div>
        

    );

}

export default Interactions;