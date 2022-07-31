import s from './authorization.module.css'
// import cabbage from '../../../images/cabbage.svg'

import AuthForm from 'components/AuthForm'
import kapusta from '../../img/AuthorizationPage/kapusta.svg'
import { useContext } from 'react'
import { ThemeContext } from 'components/App'


const AuthorizationPage = () => {

const themeColor = useContext(ThemeContext)
const themeStyle = themeColor === "dark" ? {background: '#2c3639', color: 'white'} : {}


    return (
        <section className={s.section} style={themeStyle}>
            <div className={s.container}>
                <div className={s.authBox}>
                <div className={s.title}>
                    <img className={s.titleIcon} src={kapusta} alt="" />
                    <p className={s.text}>smart finance</p>
                </div>
                <AuthForm/>
                </div> 
                {/* <img className={s.cab} src={cabbage} alt="" /> */}
            </div>
        </section>
    )
}

export default AuthorizationPage