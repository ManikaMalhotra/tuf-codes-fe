import { Text, Container } from '@mantine/core';
import TufLogo from '../TufLogo';
import classes from './Footer.module.css';

const data = [
  {
    title: 'Project',
    links: [
      { label: 'Contribute', link: 'https://github.com/ManikaMalhotra/tuf-codes-fe' },
      { label: 'Releases', link: 'https://github.com/ManikaMalhotra/tuf-codes-fe' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'takeuforward.org', link: 'https://takeuforward.org/' },
      { label: 'Follow on Twitter', link: 'https://twitter.com/striver_79' },
      { label: 'Instagram', link: 'https://www.instagram.com/striver_79' },
      { label: 'Telegram', link: 't.me/Competitive_Programming_tuf' },
      { label: 'A2Z Sheet  ', link: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/' },
    ],
  },
];

const Footer = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        target='_blank'
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <TufLogo textColor="var(--light-color)" />
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <p>
          © 2024 tufCodes. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;