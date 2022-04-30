import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
// import styles from './NavBar.module.css'




const MenuItem = (props) => {
    let text = props.text;
    return <li className='menu-item'>{text}</li>
}

const NavBar = () => {

    var myMenu = ['Home','Settings','About us', 'Other stuff'];
    return (
        <div className='w-5'>
          <button className='hamburger'>m</button>
          <ul className='menu'>
            {myMenu.map(item => {
              return <MenuItem key={item} text={item}/>
            })}
          </ul>
        </div>    
      );
}

export default NavBar;