import { RowData } from "../../SubmissionsPage.types";

export const filterData = (data: RowData[], search: string) => {
  if (data.length === 0) return data;

  const query = search.toLowerCase().trim();
  
  return data.filter((item) =>
    Object.keys(data[0]).some((key) => item[key] && item[key].toString().toLowerCase().includes(query))
  );
}

export const sortData = (
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export const formatSourceCode = (sourceCode: string) => {
  return sourceCode.replace(/\\n/g, '\n').replace(/\\t/g, '    ').replace(/\\s/g, ' ');
}