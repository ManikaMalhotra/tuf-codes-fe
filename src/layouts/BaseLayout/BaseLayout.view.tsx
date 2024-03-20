import Footer from "./_components/Footer";
import Header from "./_components/Header";

const BaseLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;