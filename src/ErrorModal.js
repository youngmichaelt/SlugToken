import React, { useState } from 'react';

const ErrorModal = (props) => {

    let setOpenModal = props.setOpenModal.setOpenModal;
    let ErrorMessage = props.setOpenModal.ErrorMessage;
    


    return (
        <div className='p-4 bg-white mx-20 rounded-3xl border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700'>
             <div className="modalContainer">
                <div className="titleCloseBtn">
                {/* <button
                    onClick={() => {
                    setOpenModal(false);

                    }}
                >
                    X
                </button> */}
                </div>
                <div className="title">
                <h1>Error</h1>
                <hr/>
                </div>
                <div className="body mt-3 mb-3 max-w-[700px]">
                <p className='max-w-[700px]'>{(ErrorMessage).toString()}</p>
                </div>
                <div className="footer mt-4">
                <button className='rounded-3xl bg-indigo-300 w-16 hover:bg-indigo-500'
                    onClick={() => {
                    setOpenModal(false);
                    }}
                    id="cancelBtn"
                >
                    Okay
                </button>
                {/* <button>Continue</button> */}
                </div>
            </div>
            
        </div>


        );
}



export default ErrorModal;
