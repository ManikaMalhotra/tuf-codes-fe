import { useEffect, useState } from 'react';
import { Text, Loader } from '@mantine/core';
import SubmissionsTable from './_components/SubmissionsTable';
import { RowData } from './SubmissionsPage.types';

const SubmissionsPage = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('https://tufcodes.onrender.com/forms')
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "center" }}>
        <Text color="red">An error occurred: {error}</Text>
      </div>
    );
  }

  return (
    <SubmissionsTable data={data} />
  );
}

export default SubmissionsPage;