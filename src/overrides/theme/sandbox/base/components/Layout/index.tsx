"use client";
const Layout = ({ children }: any) => {
  return (
    <div className="w-full h-screen flex flex-row overflow-hidden">
      <div className="w-auto h-full p-4 border-r-2 text-center bg-red-600">
        <p>Sidebar Sandbox</p>
      </div>
      <div className="w-full flex flex-col overflow-auto">
        <div className="w-full p-2 h-24 text-center bg-red-600">
          <p>Header Sandbox</p>
        </div>
        <div className="w-full flex">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
