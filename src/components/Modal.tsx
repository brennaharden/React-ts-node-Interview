import React, {FC} from 'react';

interface PropsType {
    display: boolean;
    close: (e: React.MouseEvent) => void
}

const Modal: FC<PropsType> = (props) => {
    const {display, close} = props

    const doNotClose = (e: React.MouseEvent) => {
        e.stopPropagation()
    }
    return (
       <div className={`${display ? 'modal' : 'none'}`} onClick={(e) => close(e)}>
            <div className="large card" onClick={doNotClose}>
                <button className="close" onClick={(e) => close(e)}>x</button>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;