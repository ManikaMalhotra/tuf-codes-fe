import { useState } from 'react';
import { Container, Group, Burger, Transition, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import TufLogo from '../TufLogo';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <TufLogo textColor="var(--light-color)" />
        <Group gap={5} visibleFrom="xs" className={classes.group}>
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