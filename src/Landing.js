import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import NavBar from './NavBar';


const Landing = () => {

    let props = {
        defaultAddress: null
    }
    return (
        <div className="bg-[url('/src/nocloud.png')] md:bg-cover bg-no-repeat bg-center md:bg-top w-screen h-screen scroll relative">
            
            <div className="justify-center relative  ">
                    

                <div className='justify-end flex '>
                    <NavBar className=''/>
                    
                </div>

                {/* <div className="bg-[url('/src/title.png')] md:bg-cover bg-no-repeat bg-center">
                    
                </div> */}

                <div className='flex justify-center pt-[100px] xl:mx-32  lg:mx-20 md:mx-20 sm:mx-5 mx-10 '>
                    <img src={require('./title.png')} className=' md:bg-cover bg-no-repeat bg-center'/>

                </div>
                

                <div className='  xl:pt-[75px] lg:pt-[75px] md:pt-[75px] sm:pt-[75px] pt-[50px] pb-14 grid lg:grid-cols-3 md:grid-cols-3 gap-8 sm:grid-cols-3 grid-cols-1  xl:mx-64 lg:mx-20 md:mx-20 sm:mx-5 mx-10'>
                {/* <h5>SLUG TOKEN</h5> */}
                
                    <div className=' flex flex-col items-center justify-center xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2 col-span-1 p-4 bg-white pixel-border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='lg:text-3xl md:text-3xl sm:text-3xl text-3xl'>
                            Stake Tokens, Win Money
                        </h5>
                        <h3 className='pt-4 px-5 lg:text-2xl md:text-2xl sm:text-2xl text-xl'>
                            Stake your $SLUG tokens for a chance to win anytime a transaction takes place.
                        </h3>
                    </div>

                    <div className=' pixel-border min-h-[150px] row-span-1 col-span-1 bg-[url("/src/sluglayer.png")] bg-contain bg-no-repeat bg-center flex flex-col items-center justify-center p-4 bg-white  border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        {/* <img src='/src/sluglayer.png'>
                        </img>
                        <h5 className='lg:text-2xl md:text-2xl sm:text-2xl text-2xl'>
                            Stake $SLUG Here!
                        </h5>
                         */}
                        
                    </div>

                  
                    <div className='pixel-border flex flex-col items-center justify-center row-span-4  xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-3 col-span-1 p-4 bg-white  border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='lg:text-3xl md:text-3xl sm:text-3xl text-3xl'>
                            How it works
                        </h5>
                        <h3 className='pt-4 px-5 lg:text-2xl md:text-2xl sm:text-2xl text-xl'>
                            Each $SLUG Token transaction has a small tax of 10%, this tax is sent to a random stakeholders address.
                            The tokenomics of SlugToken promote hodling with a staking + sell tax model, which increases the wealth of token holders.
                        </h3>

                        <h3 className='pt-4 px-5 lg:text-2xl md:text-2xl sm:text-2xl text-xl'>
                            Check out our documentation for more information.
                        </h3>
                        
                    </div>

                    <div className=' pixel-border flex flex-col justify-center items-center  p-4 bg-white mrt-10  border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='lg:text-2xl md:text-2xl sm:text-2xl text-2xl'>
                            Buy on Quickswap
                        </h5>
                        <h3 className=' pt-4 px-5 lg:text-lg md:text-lg sm:text-lg text-md'>
                            LINK
                        </h3>
                        
                    </div>

                    <div className='pixel-border flex flex-col justify-center items-center  p-4 bg-white mrt-10 border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='lg:text-2xl md:text-2xl sm:text-2xl text-2xl'>
                            Join the Community!
                        </h5>
                        <h3 className=' pt-4 px-5 lg:text-lg md:text-lg sm:text-lg text-md'>
                            DISCORD
                        </h3>
                        
                    </div>

                    <div className='pixel-border flex flex-col justify-center items-center  p-4 bg-white mrt-10 border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='lg:text-2xl md:text-2xl sm:text-2xl text-2xl'>
                            Roadmap
                        </h5>
                        <h3 className=' pt-4 px-5 lg:text-lg md:text-lg sm:text-lg text-md'>
                            Check out our Slugmap!
                        </h3>
                        
                    </div>

                    {/* <div className='xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-3 col-span-1'>
                        <EventTable contract={props}/>

                    </div> */}


                    

                </div>
                {/* <hr className='pt-10'></hr>
                <div className='pb-10 xl:mx-32  lg:mx-20 md:mx-20 sm:mx-5 mx-10'>
                    <div className='p-4 bg-white rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='text-2xl'>
                            How it works
                        </h5>
                        <h3 className='pt-8 px-5'>
                            Each SlugToken transaction has a small tax of 10%, this tax is sent to a random stakeholders address.
                            The tokenomics of SlugToken promote hodling with a staking + sell tax model, which increases the wealth of token holders.
                        </h3>
                    </div>
                    
                </div>

                <hr className='pt-10'></hr>
                <div className='grid lg:grid-cols-2 md:grid-cols-2 gap-5 sm:grid-cols-2 grid-cols-1  xl:mx-32  lg:mx-20 md:mx-20 sm:mx-5 mx-10'>
                    <div className=' bg-white  rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='text-2xl '>
                            Buy SlugToken
                        </h5>
                        <h3 className='pt-8 px-5 '>
                            Link to quickswap
                        </h3>
                    </div>
                    <div className=' bg-white  rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <h5 className='text-2xl'>
                            SlugToken Price
                        </h5>
                        <h3 className='pt-8 px-5 '>
                            $1.00
                        </h3>
                    </div>
                    
                </div> */}

                <hr className='pt-10'></hr>

                


                

                


                
            </div>
        </div>

        
    );
}

export default Landing;