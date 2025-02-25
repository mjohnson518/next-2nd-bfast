'use client';

import styles from '@components/TableColumn.module.scss';

import * as React from 'react';

type TableColumnProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const TableColumn = ({ children, ...rest }) => {
  return (
    <td className={styles.root} {...rest}>
      {children}
    </td>
  );
};

TableColumn.displayName = 'TableColumn';

export default TableColumn;
