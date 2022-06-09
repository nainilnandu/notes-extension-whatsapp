import React from 'react'
import PropTypes from 'prop-types'


function Header({text,bgColor, textColor}) {
    const HeaderStyles = {
        backgroundColor: bgColor,
        color: textColor,
    }
    return (
        <header tabIndex={-1} style = {HeaderStyles} className='container'>
            <div className='container'>
                <h2>Notes</h2>
            </div>
                
        </header>
    )
}

Header.defaultProps = {
    text: 'Notes',
    bgColor: '#FFD700',
    textColor: "#0E1318"

}

export default Header