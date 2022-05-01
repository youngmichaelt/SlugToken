import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import NavBar from './NavBar';

const Landing = () => {
    return (
        <div className=''>
            
            <div className='justify-center relative'>
                    

                <div className='justify-end flex'>
                    <NavBar className=''/>
                    
                </div>

                <div className='pt-[100px] pb-10'>
                    <div className='p-4 bg-white mx-20 rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='text-2xl'>
                            Stake Tokens, Win Money
                        </h5>
                        <h3 className='pt-8 px-10'>
                            Stake your tokens for a chance to win anytime a transaction takes place.
                        </h3>
                    </div>

                    

                </div>
                <hr className='pt-10'></hr>
                <div className='pb-10'>
                    <div className='p-4 bg-white mx-20 rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='text-2xl'>
                            How it works
                        </h5>
                        <h3 className='pt-8 px-10'>
                            Each SlugToken transaction has a small tax of 10%, this tax is sent to a random stakeholders address.
                            The tokenomics of SlugToken promote hodling with a staking + sell tax model, which increases the wealth of token holders.
                        </h3>
                    </div>
                    
                </div>

                <hr className='pt-10'></hr>
                <div className='flex justify-center'>
                    <div className='p-4 bg-white mx-20 rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='text-2xl'>
                            Buy SlugToken
                        </h5>
                        <h3 className='pt-4 px-10'>
                            Link to quickswap
                        </h3>
                    </div>
                    <div className='p-4 mr-20 bg-white rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='text-2xl'>
                            SlugToken Price
                        </h5>
                        <h3 className='pt-4 px-10'>
                            $1.00
                        </h3>
                    </div>
                    
                </div>

                
            </div>
        </div>

        
    );
}

export default Landing;