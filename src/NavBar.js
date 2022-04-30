import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
// import styles from './NavBar.module.css'
import Hamburger from 'hamburger-react'




const MenuItem = (props) => {
    let text = props.text;
    return <button onClick={() => {window.alert({text})}} className=' justify-end '>
        <span className=''>{text}</span>
        </button>
}

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState('none');
    const [menuTransform, setMenuTransform] = useState('')
    const [open, setOpen] = useState(false);


    const openMenu = () => {
        // setMenuTransform('translateX(100%)');
        if (menuOpen == null || menuOpen == 'none'){

            setMenuOpen('flex');
            setOpen(true);

        } else {
            setMenuOpen('none')
            setOpen(false);
        }
        
        
        
    }

    const handleResize = () => {
        if (window.innerWidth < 760){
            setMenuOpen('none');
            // setMenuTransform('translateX(-120%)');
        } else {
            setMenuOpen('flex');
            // setMenuTransform('translateX(0)')
        }
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    useEffect(() => {
        
    })

    var myMenu = ['Home','Settings','About us', 'Other stuff'];
    return (
        <div className='flex p-2 w-screen relative'>
            <button className='left-0 absolute'>
                Slug Token
            </button>

          <div className='wrapper justify-center right-0 absolute'>
            
            <div id='navButton' className='justify-end'>
            
                <Hamburger id='navButton' size={20} toggled={open} toggle={() => {openMenu()}} className='justify-end' style={{'display': 'none'}}>X</Hamburger>

            </div>
            <ul className='justify-center' style={{'display': menuOpen}}>
                    
                {myMenu.map(item => {
                return <MenuItem key={item} text={item}/>
                })}
            </ul>
            
          </div>
          
          
        </div>    
      );
}

export default NavBar;