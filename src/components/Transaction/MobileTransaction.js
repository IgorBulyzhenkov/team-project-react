import { DeleteOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import s from './MobileTransaction.module.css';

export default function MobileTransaction() {
  const transactions = [
    {
      description: 'description',
      category: 'Продукты',
      amount: 0,
      date: '2020-12-31',
      _id: '507f1f77bcf86cd799439013',
    },
    {
      description: 'description',
      category: 'Продукты',
      amount: 0,
      date: '2020-12-31',
      _id: '507f1f77bcf86cd799439013',
    },
    {
      description: 'description',
      category: 'Продукты',
      amount: 0,
      date: '2020-12-31',
      _id: '507f1f77bcf86cd799439013',
    },
    {
      description: 'description',
      category: 'Продукты',
      amount: 0,
      date: '2020-12-31',
      _id: '507f1f77bcf86cd799439013',
    },
  ];
  return (
    <table className={s.table}>
      {transactions.map(({ description, category, amount, date, _id }) => {
        return (
          <tbody key={_id}>
            <tr>
              <td colSpan="2" className={s.descriptionItem}>
                <span className={s.description}>{description}</span>
              </td>
              <td rowSpan="2" className={s.amount}>
                {amount}
              </td>
              <td rowSpan="2">
                <IconButton aria-label="button delete" component="label">
                  <DeleteOutline />
                </IconButton>
              </td>
            </tr>
            <tr>
              <td className={s.date}>{date}</td>
              <td>{category}</td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}