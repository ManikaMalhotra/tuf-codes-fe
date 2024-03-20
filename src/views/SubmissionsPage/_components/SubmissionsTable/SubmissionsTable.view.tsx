import { Button, ScrollArea, Table, TextInput, rem, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { RowData } from "../../SubmissionsPage.types";
import { sortData } from "./SubmissionsTable.helpers";
import CustomTableHead from "../CustomTableHead";
import CodeModal from "../CodeModal";

const SubmissionsTable = ({ data }: { data: RowData[] }) => {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>{row.username}</Table.Td>
      <Table.Td>{row.codeLanguage}</Table.Td>
      <Table.Td>{row.stdin}</Table.Td>
      <Table.Td>{row.submissionTimestamp}</Table.Td>
      <Table.Td>
        <Button 
          onClick={() => {  
            open();
            setSelectedRow(row);
          }} 
          color='var(--secondary-color)'
        >
          View Code
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
    {
      opened && selectedRow && (
        <CodeModal selectedRow={selectedRow} opened={opened} close={close} />
      )
    }
    <div style={{ display: "flex", padding: "10px", alignItems: "center", justifyContent: "center" }}>
      <ScrollArea style={{ marginTop: "80px", width: "90%" }}>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
          <Table.Tbody>
            <Table.Tr>
              <CustomTableHead
                sorted={sortBy === 'username'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('username')}
              >
                Username
              </CustomTableHead>
              <CustomTableHead
                sorted={sortBy === 'codeLanguage'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('codeLanguage')}
              >
                Code Language
              </CustomTableHead>
              <CustomTableHead
                sorted={false}
                reversed={false}
                onSort={() => {}}
              >
                Stdin
              </CustomTableHead>
              <CustomTableHead
                sorted={sortBy === 'submissionTimestamp'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('submissionTimestamp')}
              >
                Submission Timestamp
              </CustomTableHead>
              <CustomTableHead sorted={false} reversed={false} onSort={() => {}}>
                Source Code
              </CustomTableHead>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
    </>
  );
};

export default SubmissionsTable;