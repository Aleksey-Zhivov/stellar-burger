import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <Link
              className={clsx(
                styles.link,
                currentLocation === '/'
                  ? [styles.link_active, styles.link]
                  : styles.link
              )}
              to={'/'}
            >
              <BurgerIcon type={'primary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </Link>
          </>
          <>
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              <Link
                className={clsx(
                  styles.link,
                  currentLocation === '/feed'
                    ? [styles.link_active, styles.link]
                    : styles.link
                )}
                to={'/feed'}
              >
                Лента заказов
              </Link>
            </p>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            <Link
              className={clsx(
                currentLocation === '/profile'
                  ? [styles.link_active, styles.link]
                  : styles.link
              )}
              to={'/login'}
            >
              {userName || 'Личный кабинет'}
            </Link>
          </p>
        </div>
      </nav>
    </header>
  );
};
