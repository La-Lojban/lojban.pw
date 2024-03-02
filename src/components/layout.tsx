// import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  meta?: { [key: string]: string | undefined };
};

const Layout = ({ preview, children, meta }: Props) => {
  return (
    <>
      <Meta meta={meta}/>
      <div className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
