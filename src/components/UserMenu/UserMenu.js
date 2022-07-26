import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { getEmail } from 'redux/selectors';
import { useLogOutUserMutation } from 'redux/kapustaAPI';
import { resetUser } from 'redux/reducer';
import { kapustaApi } from 'redux/kapustaAPI';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import Avatar from 'components/Avatar';
import s from './UserMenu.module.css';
import ActionModal from 'components/ActionModal';
import { useContext } from 'react';
import { ThemeContext } from 'components/App';
import { darkThemeStyles } from 'services/theme-styles';

export default function UserMenu() {
  const dispatch = useDispatch();
  const [logOutUser] = useLogOutUserMutation();
  const [isModalOpen, setModal] = useState('false');

  const themeColor = useContext(ThemeContext);
  const themeStyle = themeColor === 'dark' ? darkThemeStyles.basic : null;
  const fontColor =
    themeColor === 'dark' ? { color: darkThemeStyles.textColor } : null;

  const toggleModal = () => {
    setModal(!isModalOpen);
    isModalOpen
      ? document.querySelector('body').classList.add('modal-open')
      : document.querySelector('body').classList.remove('modal-open');
  };

  const onLogOutUser = () => {
    logOutUser()
      .unwrap()
      .then(() => {
        dispatch(resetUser());
        dispatch(kapustaApi.util.resetApiState());
      });
    document.querySelector('body').classList.remove('modal-open');
  };

  const email = useSelector(getEmail);
  const userName = email?.split('@')[0];

  return (
    <>
      <div className={s.container} style={themeStyle}>
        <Avatar />
        <p className={s.userName}>{userName}</p>
        <div className={s.line}></div>
        <div onClick={toggleModal} className={s.exitBtn}>
          Exit
        </div>
        <LogoutSharpIcon onClick={toggleModal} className={s.icon} />
      </div>
      {!isModalOpen && (
        <ActionModal toggleModal={toggleModal} logOut={onLogOutUser}>
          <p className={s.text} style={fontColor}>
            Do you really want to leave?
          </p>
        </ActionModal>
      )}
    </>
  );
}
