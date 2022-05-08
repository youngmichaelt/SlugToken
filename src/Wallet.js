
import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './Wallet.module.css'
// import simple_token_abi from './Contracts/simple_token_abi.json'
import Interactions from './Interactions';
import ErrorModal from './ErrorModal';
import token_abi from './contracts/abi2.json'

import EventTable from './EventTable';
// import NavBar from './NavBar';
import NavBar from './NavBar-app.js';



const Wallet = () => {

    // const contractAddress = "0x290Aa71b3e2A0ce00CeD0b2178985114a66B8e36";
    const contractAddress = "0xF8f1fA3C1061fB75f8070c9991d6364dF295b0B6";

    const [tokenName, setTokenName] = useState("Token");
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [balance, setBalance] = useState();

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    const [modalOpen, setModalOpen] = useState();
    const [ethersUpdated, setEthersUpdated] = useState(false);

    const [network, setNetwork] = useState(null);


    
    const checkIfWalletIsConnected = async () => {
        try{
            const { ethereum } = window;
      
            if(!ethereum){
              console.log("Use Metamask!");
            } else{
              console.log("Ethereum object found", ethereum);
            //   detailsOn();
            }
      
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            console.log(accounts)
            if(accounts.length != 0){
                // if(accounts[0] != defaultAccount){
                //     setConnButtonText('Not Connected');
                // } else {
                    const account = accounts[0];
                    console.log("Found an authorized account ", account);
                    setDefaultAccount(account);
                    updateEthers();
                    setConnButtonText('Connected');
                // }
              
            //   detailsOn();
    
            } else{
              console.log("Could not find an authorized account");
              setConnButtonText('Not Connected');
            }
          } catch(error){
            console.log(error);
            setErrorMessage(error);
            setModalOpen(true);
          }
    }

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask){

            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                // console.log(result)
                accountChangedHandler(result[0]);
                setConnButtonText('Connected');
            })
            .catch(error => {
                console.log(error)
                setErrorMessage(error.message);
                setModalOpen(true);
            })

        } else {
            console.log("Please install metamask");
            setErrorMessage("Please install metamask");
            setModalOpen(true);

        }
    }

    const accountChangedHandler = (newAddress) =>
    {
        if (newAddress instanceof Array){
        setDefaultAccount(newAddress[0]);
        } else {
            setDefaultAccount(newAddress);
        }
        updateEthers();
    }

    const updateEthers = () => {
       
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

        let tempSigner = tempProvider.getSigner();

        let tempContract = new ethers.Contract(contractAddress, token_abi, tempSigner);

        setProvider(tempProvider);
        setSigner(tempSigner);
        setContract(tempContract);
    }

    

    

    
    const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}
    if (window.ethereum){
        // listen for account changes
        window.ethereum.on('accountsChanged', accountChangedHandler);

        window.ethereum.on('chainChanged', chainChangedHandler);

    }
	

    function toFixed(x) {
        if (Math.abs(x) < 1.0) {
           var e = parseInt(x.toString().split('e-')[1]);
           if (e) {
              x *= Math.pow(10, e - 1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
           }
        } else {
           var e = parseInt(x.toString().split('+')[1]);
           if (e > 20) {
              e -= 20;
              x /= Math.pow(10, e);
              x += (new Array(e + 1)).join('0');
           }
        }
        return x;
     }
     const getNetwork = async () => {
        let n =  await provider.getNetwork(1);
        console.log(n.name);
        setNetwork(n.name);
    }

     useEffect(() => {
        if (defaultAccount == null && window.ethereum && window.ethereum.isMetaMask){
            checkIfWalletIsConnected();
            
        }
        getNetwork();
        //checkIfWalletIsConnected();
        // if (contract != null){
            
        //     updateBalance();
        //     updateTokenName();
        // } 
    }, [contract, defaultAccount, window.ethereum, network])

     let props = {
         contract: contract,
         defaultAccount: defaultAccount,
         provider: provider,
         setOpenModal: (x) => {setModalOpen(x)},
         setErrorMessage: (x) => {setErrorMessage(x)},
         network: network

     }

     let modal_props = {
        contract: contract,
        defaultAccount: defaultAccount,
        provider: provider,
        setOpenModal: (x) => {setModalOpen(x)},
        ErrorMessage: errorMessage
        
     }

    return (

        
    <div className=" bg-[url('/src/slugpcopy.png')]  md:bg-cover bg-no-repeat bg-center md:bg-top w-screen h-screen scroll  justify-center  ">
        {/* <div className='justify-end flex '>
                    <NavBar className=''/>
                    
        </div> */}
        <div className='justify-end flex relative'>
            <NavBar className=''/>
            <div className='flex justify-start max-w-[300px] p-2 pt-5 absolute left-0'>
                    <img src={require('./title.png')} className=' md:bg-cover bg-no-repeat bg-center'/>

                </div>
            {/* <h3 id={styles.header} className=''>Slug Token</h3> */}
        </div>
        <button className='p-2 bottom-3 left-3 absolute bg-white pixel-border' id={styles.connectWalletButtton} onClick={connectWalletHandler}>{connButtonText}</button>


        
        
        <div>
            
            {/* <div>
                <h3>Address: {defaultAccount}</h3>
            </div> */}                


            <div className='xl:mt-[135px] lg:mt-[135px]  md:mt-[125px]  sm:mt-[100px] mt-[90px] xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl text-xl  ' id={styles.container}>
                
                <div className='flex items-center justify-center mb-7 '>
                    
                <Interactions contract={props}/>
                </div>
                <div className='flex items-center justify-center mb-3'>
                    {modalOpen && <ErrorModal setOpenModal={modal_props}></ErrorModal>}

                </div>

                <hr className='my-10'/>
                <div className='justify-center flex items-center '>
                    <h3 className='mb-5 pixel-border bg-white border px-30 justify-center flex items-center text-2xl'>Recent Fees Collected</h3>
                </div>
                <div className='mt-2 mb-[150px] flex items-center justify-center '>
                <EventTable contract={props}/>
                </div>
                
                



                {/* <EventTable contract={props}/> */}
            </div>

            {/* <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        ERROR TEST
      </button> */}
          

            
            
            {/* <p>{errorMessage}</p> */}
        </div>

    </div>

    );
}

export default Wallet;
