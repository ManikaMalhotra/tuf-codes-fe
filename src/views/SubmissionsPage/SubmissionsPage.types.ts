export type RowData = {
  username: string;
  codeLanguage: string;
  stdin: string;
  submissionTimestamp: string;
  sourceCode: string;
}

export type ThProps = {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort?: () => void;
}