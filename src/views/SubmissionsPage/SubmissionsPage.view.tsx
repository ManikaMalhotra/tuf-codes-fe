import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Modal,
  Button
} from '@mantine/core';
import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './SubmissionsPage.module.css';
import { useDisclosure } from '@mantine/hooks';

type RowData = {
  username: string;
  codeLanguage: string;
  stdin: string;
  submissionTimestamp: string;
  sourceCode: string;
}

type ThProps = {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
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

const data = [
  {
    username: 'user1',
    codeLanguage: 'c++',
    stdin: '1 2 3 4',
    submissionTimestamp: '2022-01-01T00:00:00Z',
    sourceCode: 'int main() { return 0; }',
  },
  {
    username: 'user2',
    codeLanguage: 'java',
    stdin: '1 2 3 4',
    submissionTimestamp: '2022-01-01T00:00:00Z',
    sourceCode: 'public static void main(String[] args) { }',
  },
  {
    username: 'user3',
    codeLanguage: 'javascript',
    stdin: '1 2 3 4',
    submissionTimestamp: '2022-01-01T00:00:00Z',
    sourceCode: 'console.log("Hello, World!");',
  },
  {
    username: 'user4',
    codeLanguage: 'python',
    stdin: '1 2 3 4',
    submissionTimestamp: '2022-01-01T00:00:00Z',
    sourceCode: 'print("Hello, World!")',
  },
  {
    username: 'user5',
    codeLanguage: 'c++',
    stdin: '1 2 3 4',
    submissionTimestamp: '2022-01-01T00:00:00Z',
    sourceCode: 'int main() { return 0; }',
  },
  {
    username: 'user6',
    codeLanguage: 'java',
    stdin: '1 2 3 4',
    submissionTimestamp: '2022-01-01T00:00:00Z',
    sourceCode: 'public static void main(String[] args) { }',
  },
  {
    username: 'user7',
    codeLanguage: 'javascript',
    stdin: '1 2 3 4',
    submissionTimestamp: '2022-01-01T00:00:00Z',
    sourceCode: 'console.log("Hello, World!");',
  },
  {
    username: 'user8',
    codeLanguage: 'python',
    stdin: '1 2 3 4',
    submissionTimestamp: '2022-01-01T00:00:00Z',
    sourceCode: 'print("Hello, World!")',
  }
];

const SubmissionsPage = () => {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [showMore, setShowMore] = useState(false);

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

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.username}>
      <Table.Td>{row.username}</Table.Td>
      <Table.Td>{row.codeLanguage}</Table.Td>
      <Table.Td>{row.stdin}</Table.Td>
      <Table.Td>{row.submissionTimestamp}</Table.Td>
      {/* button which opens a modal with codehighlight and view more option */}
      <Table.Td>
        <Button onClick={() => open()} color='var(--secondary-color)'>
          View Code
        </Button>
        <Modal
          size="xl"
          withCloseButton
          opened={opened}
          onClose={close}
        >
          {
            showMore 
              ? <CodeHighlight
                language={row.codeLanguage}
                code={row.sourceCode}
              /> 
              : <CodeHighlight
                language={row.codeLanguage}
                code={row.sourceCode.length > 100 ? row.sourceCode.substring(0, 100) + '...' : row.sourceCode.substring(0, 100)}
              />
          }
          {
            row.sourceCode.length > 100 
              ? <Button 
                  onClick={() => setShowMore(!showMore)} 
                  color='var(--primary-color)'>
                    {showMore ? 'Show less' : 'Show more'}
                </Button> 
              : <></>
          }
        </Modal>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
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
            <Th
              sorted={sortBy === 'username'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('username')}
            >
              Username
            </Th>
            <Th
              sorted={sortBy === 'codeLanguage'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('codeLanguage')}
            >
              Code Language
            </Th>
            <Th
              sorted={false}
              reversed={false}
              onSort={() => {}}
            >
              Stdin
            </Th>
            <Th
              sorted={sortBy === 'submissionTimestamp'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('submissionTimestamp')}
            >
              Submission Timestamp
            </Th>
            <Th sorted={false} reversed={false} onSort={() => {}}>
              Source Code
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default SubmissionsPage;