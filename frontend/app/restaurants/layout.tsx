import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full min-h-svh">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};
export default Layout;
