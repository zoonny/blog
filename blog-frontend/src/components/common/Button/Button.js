import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.scss';

const cx = classNames.bind(styles);

// JSX에서 ...을 사용하면 내부에 있는 값을 props로 넣어줌
const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;

const Button = ({ children, to, onClick, disabled, theme = 'default' }) => {
  // to 값이 존재하면 Link 사용, 그렇지 않으면 div 사용
  // 비활성화인 경우도 div 사용
  const Element = to && !disabled ? Link : Div;

  // 비활성화하면 onClick은 실행되지 않음.
  // disabled 값이 true가 되면 className에 disabled를 추가
  return (
    <Element
      to={to}
      className={cx('button', theme, { disabled })}
      onClick={disabled ? () => null : onClick}
    >
      {children}
    </Element>
  );
};

export default Button;
