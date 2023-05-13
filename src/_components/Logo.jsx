
import React from "react"

const Logo = () => {
    return <div className='flex justify-center items-center my-3'>
        <div>
            <img src={'/assets/images/logo.png'} className="w-20 h-20 mx-auto" />
        </div>
        <div className="clear-both text-center">Audio AI Tool</div>
    </div>
}

export default Logo