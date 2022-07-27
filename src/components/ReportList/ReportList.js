import ReportSvgSelector from './ReportSvgSelector';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import s from './ReportList.module.css';
function ReportList() {
  return (
    <div>
      <div className={s.wrapBtn}>
        <button type="button" className={s.button}>
          <FiChevronLeft size="25" className={s.arrowBtn} />
        </button>
        <p className={s.textBtn}>Expenses</p>
        <button type="button" className={s.button}>
          <FiChevronRight size="25" className={s.arrowBtn} />
        </button>
      </div>
      <ul className={s.list}>
        {ReportSvgSelector.map(({ id, name, image }) => (
          <li key={id} className={s.item}>
            <p className={s.text}>numder</p>
            <div className={s.itemSpan}>
              <span className={s.span}>{image}</span>
            </div>

            <p className={s.text}>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ReportList;
