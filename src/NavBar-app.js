import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
// import styles from './NavBar.module.css'
import Hamburger from 'hamburger-react'




const MenuItem = (props) => {
    let text = props.text;
    return <a href={'http://192.168.1.229:3000/'+text}>
        <button className=' header-button justify-end  bg-white rounded-2xl border  '>
        <span className=''>{text}</span>
        </button>
    </a>
    
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
            setOpen(false);
            // setMenuTransform('translateX(0)')
        }
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    useEffect(() => {
        
    })

    var myMenu = ['Stake','Buy','Community', 'Docs','Slugmap'];
    return (
        <div className='flex w-screen '>
            <button className='left-0 absolute header-button '>
                Slug Token
            </button>

          <div className=' wrapper justify-center absolute right-0 mt-2'>
            
            <div id='navButton' className='justify-end bg-white rounded-2xl border absolute right-0'>
            
                <Hamburger id='navButton' size={20} toggled={open} toggle={() => {openMenu()}} className='' style={{'display': 'none'}}>X</Hamburger>

            </div>
            <div className='bg-white bgf-[url("/src/slugp.png")] ml-20 mr-5 rounded-2xl border button-container' style={{'visibility': open ? 'visible' : 'hidden'}}>
                <ul className='justify-center  ' style={{'display': menuOpen, 'visibility': 'visible'}}>
                        
                        {myMenu.map(item => {
                        return <MenuItem key={item} text={item}/>
                        })}
                </ul>
            </div>
            
            
          </div>
          
          
        </div>    
      );
}

export default NavBar;