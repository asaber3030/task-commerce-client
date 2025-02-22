type Props = {
  title: React.ReactNode;
  children?: React.ReactNode;
};

export const PageTitle = ({ title, children }: Props) => {
  return (
    <div className='flex justify-between items-center mb-4'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <div className='flex gap-2 items-center'>{children}</div>
    </div>
  );
};
