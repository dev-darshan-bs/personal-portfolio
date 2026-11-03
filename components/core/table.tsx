import { ReactNode } from "react";

import styles from "./table.module.css";

type Children = { children: ReactNode };

export const Table = ({ children }: Children) => (
  <table className={styles.table}>{children}</table>
);

export const TableRow = ({ children }: Children) => (
  <tr className={styles.row}>{children}</tr>
);

export const TableHead = ({ children }: Children) => (
  <thead className={styles.head}>{children}</thead>
);

export const TableBody = ({ children }: Children) => (
  <tbody className={styles.body}>{children}</tbody>
);

export const TableHeadCell = ({ children }: Children) => (
  <th className={styles.headCell}>{children}</th>
);

export const TableCell = ({ children }: Children) => (
  <td className={styles.cell}>{children}</td>
);
