import { DeleteOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import s from './TransactionItem.module.css';
import { ReactComponent as DeleteIcon } from '../../img/DeleteIcon.svg';

export default function TransactionItem({
  description,
  category,
  amount,
  date,
  id,
  expenses,
  handleClick,
  themeStyle,
}) {
  return (
    <>
      <tr>
        <td style={themeStyle}>{date}</td>
        <td style={themeStyle}>{description}</td>
        <td style={themeStyle}>{category}</td>
        <td style={themeStyle}>
          <span
            style={
              expenses
                ? {
                    color: '#FF751D',
                    fontWeight: '700',
                    fontSize: '12px',
                    lineHeight: '14px',
                  }
                : {
                    color: '#407946',
                    fontWeight: '700',
                    fontSize: '12px',
                    lineHeight: '14px',
                  }
            }
          >
            {amount}.00 грн.
          </span>
        </td>
        <td style={themeStyle}>
          <IconButton
            style={themeStyle}
            onClick={e => handleClick(e)}
            aria-label="button delete"
            component="label"
            id={id}
          >
            <DeleteOutline />
          </IconButton>
          <div style={themeStyle} className={s.deleteBox} id={`delete${id}`}>
            <DeleteIcon
              className={s.deleteIcon}
              width="50"
              height="100%"
              fill="#FF751D"
            />
          </div>
        </td>
      </tr>
    </>
  );
}

TransactionItem.propTypes = {
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
