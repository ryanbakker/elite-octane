const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
      <section className="flex flex-col items-center justify-center">
        <h1>EliteOctane</h1>
      </section>
      <section className="flex flex-col items-center justify-center">
        {children}
      </section>
    </main>
  );
};

export default Layout;
