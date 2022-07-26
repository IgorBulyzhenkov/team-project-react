import s from './FormAddExpense.module.css';
import { useState, useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterCategory } from 'redux/reducer';
import { useClickAway } from 'react-use';
import { DayPicker } from 'react-day-picker';
import Moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ThemeContext } from 'components/App';
import { IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  useAddExpenseMutation,
  useAddIncomeMutation,
} from '../../redux/kapustaAPI';
import { ReactComponent as Calculator } from '../../img/Calculator.svg';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { getWidth } from '../../redux/selectors';
import NumberFormat from 'react-number-format';
import { darkThemeStyles } from 'services/theme-styles';
import Draggable from 'react-draggable'; // The default
import { Calculator as CalculatorNew } from 'react-mac-calculator';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import 'react-day-picker/dist/style.css';

export const optionsExpenses = [
  { value: 'Транспорт', label: 'Transport' },
  { value: 'Продукты', label: 'Products' },
  { value: 'Здоровье', label: 'Health' },
  { value: 'Алкоголь', label: 'Alcohol' },
  { value: 'Развлечения', label: 'Entertainment' },
  { value: 'Всё для дома', label: 'Housing' },
  { value: 'Техника', label: 'Technique' },
  { value: 'Коммуналка и связь', label: 'Communal, communication' },
  { value: 'Спорт и хобби', label: 'Sports, hobbies' },
  { value: 'Образование', label: 'Education' },
  { value: 'Прочее', label: 'Other' },
];

export const optionsIncome = [
  { value: 'З/П', label: 'Salary' },
  { value: 'Доп. доход', label: 'Extra income' },
];

const FormAddExpense = ({ expense, handleClick }) => {
  const dispatch = useDispatch();
  const [addExpense] = useAddExpenseMutation();
  const [addIncome] = useAddIncomeMutation();

  const [calculator, setCalculator] = useState(false);
  const [amount, setAmount] = useState('');
  const [select, setSelect] = useState(null);
  const [description, setDescription] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [isDatePikerShown, setIsDatePikerShown] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [date, setDate] = useState(new Date());
  const [openDateNotification, setOpenDateNotification] = useState(false);
  const ref = useRef();
  const VpWidth = useSelector(getWidth);

  const [iconCheck, setIconCheck] = useState(true);

  const openCalculator = () => {
    setCalculator(true);
  };

  const closeCalculator = () => {
    if (calculator) {
      setCalculator(false);
    }
  };

  const openCalendar = e => {
    iconCheck && setIsDatePikerShown(true);
    setIconCheck(true);
  };

  const handleDateChange = date => {
    setDate(date);
    setIsDatePikerShown(false);
  };

  useClickAway(ref, e => {
    e.path[1].id === 'icon' || e.path[0].id === 'icon'
      ? setIconCheck(false)
      : setIconCheck(true);
    setIsDatePikerShown(false);
  });

  const formReset = () => {
    setAmount('');
    setSelect(null);
    setDescription('');
    setDate(new Date());
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    const { date } = ev.currentTarget;

    const isDescriptionCorrect = () => {
      if (!description) {
        setOpenDescription(true);
        setTimeout(() => {
          setOpenDescription(false);
        }, 4000);
        return 1;
      }
      return 0;
    };
    const isSelectorCorrect = () => {
      if (!select?.value) {
        setOpenSelect(true);
        setTimeout(() => {
          setOpenSelect(false);
        }, 4000);
        return 1;
      }
      return 0;
    };

    const isAmountCorrect = () => {
      if (!amount) {
        setOpenInput(true);
        setTimeout(() => {
          setOpenInput(false);
        }, 4000);
        return 1;
      }
      return 0;
    };
    const isdDateCorrect = () => {
      if (!date) {
        setOpenDateNotification(true);
        setTimeout(() => {
          setOpenDateNotification(false);
        }, 4000);
        return 1;
      }
      return 0;
    };
    const isFormValid =
      isSelectorCorrect() +
        isDescriptionCorrect() +
        isAmountCorrect() +
        isdDateCorrect() ===
      0;

    if (isFormValid) {
      const transaction = {
        description,
        amount: amount,
        date: date?.value,
        category: select?.value,
      };

      if (expense) {
        addExpense(transaction)
          .unwrap()
          .then(() => {
            toast.success('Transaction added');
            dispatch(setFilterCategory(''));
            formReset();
            if (VpWidth === 'mobile') {
              handleClick();
              document.querySelector('body').classList.remove('modal-open');
            }
          })
          .catch(error => toast.error(error.data.message));
      } else {
        addIncome(transaction)
          .unwrap()
          .then(() => {
            toast.success('Transaction added');
            dispatch(setFilterCategory(''));
            formReset();
            if (VpWidth === 'mobile') {
              handleClick();
              document.querySelector('body').classList.remove('modal-open');
            }
          })
          .catch(error => toast.error(error.data.message));
      }
    }
  };

  const themeColor = useContext(ThemeContext);

  const backColor =
    themeColor === 'dark' ? `${darkThemeStyles.backgroundColor}` : '#FFFFFF';

  const styles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#52555F' : '#C7CCDC',
      fontSize: '12px',
      backgroundColor: state.isSelected ? '#C7CCDC' : `${backColor}`,
    }),

    singleValue: (provided, state) => ({
      ...provided,
      color: '#52555F',
      fontSize: '12px',
    }),
    control: (provided, state) => ({
      ...provided,
      border: '2px solid #ffffff',
      borderRadius: '0 0 20px 0',
      height: '44px',
      width: '280px',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
  };

  const themeStyle2 = themeColor === 'dark' ? darkThemeStyles.basic : null;
  const calendarColor =
    themeColor === 'dark'
      ? {
          color: 'white',
        }
      : { color: '#52555f' };

  return (
    <div className={s.formWrap}>
      <div className={s.exitBtn}>
        <IconButton
          color="warning"
          onClick={handleClick}
          aria-label="button close"
          component="button"
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.inputWrap}>
          <div className={s.notificationWraps}>
            <div className={s.dateInputWrap}>
              <CalendarMonthIcon
                style={calendarColor}
                onClick={openCalendar}
                id="icon"
              />
              <input
                id="date"
                name="date"
                type="date"
                value={Moment(date).format('YYYY-MM-DD')}
                onChange={ev => setDate(ev.target.value)}
                className={s.dateInput}
                style={calendarColor}
              />
              {isDatePikerShown && (
                <div className={s.datePikerWrap} ref={ref}>
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    styles={{
                      color: '#52555f',
                      day: { color: '#52555F' },
                      caption: { color: '#52555F' },
                    }}
                  />
                </div>
              )}
            </div>

            {openDateNotification && (
              <div className={s.errorNotification}>"Please enter date"</div>
            )}
          </div>
          <div className={s.notificationWraps}>
            <input
              autoComplete="off"
              type="text"
              id="description"
              name="description"
              className={s.description}
              placeholder="Product description"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
            />
            {openDescription && (
              <div className={s.errorNotification}>"Please enter amount"</div>
            )}
          </div>
          <div className={s.notificationWraps}>
            <Select
              style={themeStyle2}
              type="text"
              id="category"
              name="category"
              options={expense ? optionsExpenses : optionsIncome}
              styles={styles}
              placeholder="Product category"
              className={s.select}
              value={select}
              onChange={data => setSelect(data)}
            />
            {openSelect && (
              <div className={s.errorNotification}>Please choose category</div>
            )}
          </div>
          <div className={s.currencyWrapp}>
            <div className={s.notificationWraps}>
              <NumberFormat
                autoComplete="off"
                allowNegative={false}
                suffix={VpWidth === 'mobile' ? ' UAH' : ''}
                decimalScale={2}
                inputMode="numeric"
                placeholder={VpWidth === 'mobile' ? '00.00 UAH' : '0.00'}
                thousandSeparator={' '}
                fixedDecimalScale={true}
                className={s.input}
                id="amount"
                name="amount"
                value={amount}
                maxLength={VpWidth === 'mobile' ? 16 : 12}
                onValueChange={(values, sourceInfo) =>
                  setAmount(values.floatValue)
                }
              />
              {openInput && (
                <div className={s.errorNotification}>Please enter amount</div>
              )}
            </div>
            <div className={s.calculateWrap}>
              <Calculator width="20" height="20" onClick={openCalculator} />
              {calculator && (
                <Draggable cancel=".calculator-key, .closeIcon">
                  <div className={s.calculatorWrap}>
                    <AiOutlineCloseCircle
                      onClick={closeCalculator}
                      onTouchStart={closeCalculator}
                      className={`${s.closeCalcIcon} .closeIcon`}
                    />
                    <CalculatorNew className={s.calculator} />
                  </div>
                </Draggable>
              )}
            </div>
          </div>
        </div>

        <div className={s.buttonWrap}>
          <button type="submit" className={s.buttonInput}>
            Input
          </button>
          <button type="reset" className={s.buttonClear} onClick={formReset}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddExpense;
