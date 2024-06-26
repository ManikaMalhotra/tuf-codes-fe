import { Center, Group, Table, UnstyledButton, rem, Text } from "@mantine/core";
import { ThProps } from "../../SubmissionsPage.types";
import classes from "./CustomTableHead.module.css";
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const CustomTableHead = ({ children, reversed, sorted, onSort }: ThProps) => {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-around">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            {
              onSort 
              ? <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} /> 
              : <></>
            }
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export default CustomTableHead;