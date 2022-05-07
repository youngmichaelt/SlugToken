import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './EventTable.module.css'


const EventTable = (props) => {
    let contract = props.contract.contract;
    let defaultAccount = props.contract.defaultAccount;
    let provider = props.contract.provider;
    const [Event, setEvent] = useState();

    const getEvents = async () => {
        let contractAddress = await contract.address;

        // let events = contract.filters.TaxCollected(null, defaultAccount);
        // console.log(events);

        let filter = contract.filters.TaxCollected(defaultAccount)

        let events = await contract.queryFilter(filter);
        // console.log(events[0].args);

        let rows = []

        let headers = <tr className='table-fixed' key='10000'>
            <th className='px-10'>Timestamp</th>
            <th className='px-10'>Transaction Hash</th>
            <th className='px-10'>Amount</th>
            
        </tr>

        // rows.push(headers)

        if (events instanceof Array && events.length > 0){
            for (let i = events.length-1; i > -1; i--){

                if (i == events.length-10){
                    break;
                }
                let block = await provider.getBlock(events[i].blockNumber);
                let timestamp = block.timestamp;
                let date = new Date(timestamp*1000)

                let num = ethers.utils.formatUnits(events[i].args[1], 18)
                // console.log(num)
                let fixedNum = parseFloat(num);
                fixedNum = fixedNum.toFixed(3);
                
                
                console.log(events[i]);
                let row = <tr className='' key={i}>
                    <td className='pt-3'>{date.toDateString()}</td>
                    <td className=' xl:pl-10 lg:pl-10 md:pl-10 sm:pl-10 xl:max-w-[300px] lg:max-w-[300px] md:max-w-[300px] sm:max-w-[300px] max-w-[150px] truncate ... pt-3'>
                        <a className='' href={'https://rinkeby.etherscan.io/tx/'+events[i].transactionHash}>{events[i].transactionHash}</a>
                    </td>
                    <td className='xl:pl-10 lg:pl-10 md:pl-10 sm:pl-10 xl:pr-10 lg:pr-10 md:pr-10 sm:pr-10 min-w-min pt-3'>{fixedNum}</td>
                    
                </tr>
                // headers += row;
                rows.push(row);
            }
        }
        // console.log(headers);
        setEvent(rows);
    }

    useEffect(() =>{
        if (contract != null){
            getEvents();
        } else {
            setEvent("null");
        }
    },[contract, defaultAccount])

    return (
        <div className='p-4 bg-white pixel-border border border-gray-200 xl:mx-32 lg:mx-20 md:mx-20 sm:mx-5 mx-3 xl:text-xl lg:text-xl md:text-xl sm:text-xl text-xl'>
            
            <table className='flex justify-center table-fixed ' id={styles.eventtable}>
                <tbody className=' table-fixed '>
                <tr className='table-fixed' key='10000'>
                    <th className='xl:px-16 lg:px-16 md:px-10 sm:px-10 px-3'>Timestamp</th>
                    <th className='xl:px-16 lg:px-16 md:px-10 sm:px-10 px-3'>Txn Hash</th>
                    <th className='xl:px-16 lg:px-16 md:px-10 sm:px-10 px-3'>Amount</th>
                    
                </tr>
                    {Event}
                </tbody>
            </table>
        </div>

    );
}
export default EventTable;