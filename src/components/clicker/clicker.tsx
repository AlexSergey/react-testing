import { useState } from 'react';

import styles from './style.module.scss';

export const Clicker = (): JSX.Element => {
  const [count, setClicked] = useState(0);
  const incrementCount = (): void => setClicked((state) => state + 1);
  const resetCount = (): void => setClicked(0);
  const decrementCount = (): void => setClicked((state) => state - 1);

  return (
    <div className={styles.block}>
      <div className={`${styles.clicker} border border-secondary rounded`}>
        <div className="clicker-display d-flex align-items-center bg-light text-secondary">
          <div className="mx-auto display-1">{count}</div>
        </div>
        <div className="clicker-button-panel d-flex flex-row">
          <button className="btn btn-success w-100" onClick={incrementCount}>
            <i className="fa fa-plus fa-2x"></i>
          </button>
          <button className="btn btn-warning w-100" onClick={resetCount}>
            <i className="fa fa-refresh fa-2x"></i>
          </button>
          <button className="btn btn-danger w-100" onClick={decrementCount}>
            <i className="fa fa-minus fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
