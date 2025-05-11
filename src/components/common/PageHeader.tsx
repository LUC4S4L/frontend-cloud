import React, { ReactNode } from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  actions?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, actions }) => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.titleSection}>
        {icon && (
          <div className={styles.iconContainer}>
            {icon}
          </div>
        )}
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>
      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;