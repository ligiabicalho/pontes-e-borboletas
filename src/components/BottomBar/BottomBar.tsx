export const BottomBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full p-4 bottom-0 left-0 rounded-tl-[1rem] rounded-tr-[1rem] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] flex justify-between items-center fixed bg-background lg:hidden">
      {children}
    </div>
  );
};
