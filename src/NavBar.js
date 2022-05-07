import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
// import styles from './NavBar.module.css'
import Hamburger from 'hamburger-react'




const MenuItem = (props) => {
    let text = props.text;
    let pathDict = {
        Stake: "Stake",
        Buy: "",
        Community: "",
        Docs: "",
        Slugmap: ""
    }
    let url = window.location.origin;
    return <a href={url+pathDict[text]} className=' '>
        <button className=' header-button justify-center bg-white border hover:bg-gray-300 '>
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
        console.log('called')
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
            {/* <button className='left-0 absolute header-button '>
                Slug Token
            </button> */}

          <div className='wrapper justify-center absolute right-0 mt-2 '>
            
            <div id='navButtonLanding' className='justify-end bg-white  border absolute right-0 hover:bg-gray-300'>
            
                <Hamburger id='' size={20} toggled={open} toggle={() => {openMenu()}} className='justify-end' style={{'display': 'none'}}>X</Hamburger>

            </div>
            <div className='bg-white bgf-[url("/src/slugp.png")] ml-20 pixel-border border button-container ' style={{'visibility': open ? 'visible' : 'hidden'}}>
                <ul className='justify-center ' style={{'display': menuOpen, 'visibility': 'visible'}}>
                        
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