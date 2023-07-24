import React from 'react'

export const Button = ({onClick, text = '', type = 'primary'}) => {
    const selectClass = () => {
        let _class = ''
        switch (type) {
            case 'primary':
                _class = 'button--primary'
                break;
            case 'secondary':
                _class = 'button--secondary'
                break;
            default:
                _class = 'button--primary'
                break;
        }
        return _class
    }

    return <button  type='submit'
            className={`button ${selectClass()}`}
            {...{onClick}}>
          {text}
        </button>
}