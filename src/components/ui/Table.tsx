import React, { ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import styles from './Table.module.css';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  className?: string;
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ className = '', children, ...props }) => {
  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table} {...props}>
        {children}
      </table>
    </div>
  );
};

interface TableHeaderProps {
  className?: string;
  children: ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ className = '', children, ...props }) => {
  return (
    <thead className={`${styles.tableHeader} ${className}`} {...props}>
      {children}
    </thead>
  );
};

interface TableBodyProps {
  className?: string;
  children: ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ className = '', children, ...props }) => {
  return (
    <tbody className={`${styles.tableBody} ${className}`} {...props}>
      {children}
    </tbody>
  );
};

interface TableRowProps {
  className?: string;
  children: ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ className = '', children, ...props }) => {
  return (
    <tr className={`${styles.tableRow} ${className}`} {...props}>
      {children}
    </tr>
  );
};

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ className = '', children, ...props }) => {
  return (
    <td className={`${styles.tableCell} ${className}`} {...props}>
      {children}
    </td>
  );
};

interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: ReactNode;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ className = '', children, ...props }) => {
  return (
    <th className={`${styles.tableHeaderCell} ${className}`} {...props}>
      {children}
    </th>
  );
};

export default Table;