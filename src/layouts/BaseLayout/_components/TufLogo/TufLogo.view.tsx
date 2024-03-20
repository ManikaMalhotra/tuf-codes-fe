import Image from 'next/image';
import { Flex } from '@mantine/core';
import { ROUTES } from '@/routes';

const TufLogo = ({ textColor }: { textColor: string }) => {
  return (
    <a href={ROUTES.HOME} style={{ textDecoration: "none", color: `${textColor}` }}>
      <Flex align="center" gap="md">
        <Image
          src="https://takeuforward.org/wp-content/uploads/2021/09/cropped-logo_circle_red-192x192.gif"
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