import { Container, Group, Burger, Transition, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import TufLogo from '../TufLogo';
import Link from 'next/link';

const links = [
  { label: 'Twitter', link: 'https://twitter.com/striver_79' },
  { label: 'Instagram', link: 'https://www.instagram.com/striver_79' },
  { label: 'Telegram', link: 'https://t.me/Competitive_Programming_tuf' },
  { label: 'A2Z Sheet  ', link: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/' }
];

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      target='_blank'
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <TufLogo textColor="var(--light-color)" />
        <Group 
          style={{ '--group-gap': 'unset' }}
          gap={5} 
          visibleFrom="xs" 
          className={classes.group}
        >
          {items}
        </Group>
        <Burger 
          opened={opened} 
          onClick={toggle} 
          hiddenFrom="xs" 
          size="sm" 
          aria-label="Open navigation"
        />
        <Transition mounted={opened} transition="scale-y" duration={200}>
					{(styles) => (
						<Stack className={classes.dropdown} style={styles}>
							{items}
						</Stack>
					)}
				</Transition>
      </Container>
    </header>
  );
}

export default Header;