
import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './Wallet.module.css'
// import simple_token_abi from './Contracts/simple_token_abi.json'
import Interactions from './Interactions';
import ErrorModal from './ErrorModal';
import token_abi from './contracts/abi.json'

import EventTable from './EventTable';

const Wallet = () => {

    const contractAddress = "0x290Aa71b3e2A0ce00CeD0b2178985114a66B8e36";

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

    
    const checkIfWalletIsConnected = async () => {
        try{
            const { ethereum } = window;
      
            if(!ethereum){
              console.log("Use Metamask!");
            } else{
              console.log("Ethereum object found", ethereum);
            //   detailsOn();
            }
      
            const accounts = await ethereum.request({method: 'eth_accounts'});
            // console.log(accounts)
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
        setDefaultAccount(newAddress);
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

     useEffect(() => {
        if (defaultAccount == null){
            checkIfWalletIsConnected();
        }
        //checkIfWalletIsConnected();
        // if (contract != null){
            
        //     updateBalance();
        //     updateTokenName();
        // } 
    }, [contract, defaultAccount, window.ethereum])

     let props = {
         contract: contract,
         defaultAccount: defaultAccount,
         provider: provider,
         setOpenModal: (x) => {setModalOpen(x)},
         setErrorMessage: (x) => {setErrorMessage(x)},

     }

     let modal_props = {
        contract: contract,
        defaultAccount: defaultAccount,
        provider: provider,
        setOpenModal: (x) => {setModalOpen(x)},
        ErrorMessage: errorMessage
        
     }

    return (
    <div>
        <button id={styles.connectWalletButton} onClick={connectWalletHandler}>{connButtonText}</button>
        <div>
            <h3 className='pt-5'>Slug Token</h3>
            {/* <div>
                <h3>Address: {defaultAccount}</h3>
            </div> */}                


            <div className='mt-[50px]'>

                <div className='flex items-center justify-center mb-7'>
                    
                <Interactions contract={props}/>
                </div>
                <div className='flex items-center justify-center mb-3'>
                    {modalOpen && <ErrorModal setOpenModal={modal_props}></ErrorModal>}

                </div>


                <hr className='my-10'/>
                <h3 className='mb-5'>Recent Taxes Collected</h3>
                <div className='mt-2 mb-[150px] flex items-center justify-center'>
                <EventTable contract={props}/>
                </div>
                



                {/* <EventTable contract={props}/> */}
            </div>

            <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        ERROR TEST
      </button>
          

            
            
            {/* <p>{errorMessage}</p> */}
        </div>

    </div>

    );
}

export default Wallet;
