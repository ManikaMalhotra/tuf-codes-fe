import Image from 'next/image';
import { Flex } from '@mantine/core';
import { ROUTES } from '@/routes';
import tufIcon from './assets/tuf-icon.webp';

const TufLogo = ({ textColor }: { textColor: string }) => {
  return (
    <a href={ROUTES.HOME} style={{ textDecoration: "none", color: `${textColor}` }}>
      <Flex align="center" gap="md">
        <Image
          src={tufIcon}
          alt="tufCodes"
          width={50}
          height={50}
        />
        <h1>tufCodes</h1>
      </Flex>
    </a>
  );
};

export default TufLogo;