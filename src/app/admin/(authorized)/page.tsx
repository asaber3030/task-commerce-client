import { ShortcutCard } from "./_components/shortcut";
import { shortcuts } from "./_helpers/lists";
import { PageTitle } from "./_components/navbar/page-title";

export default async function AdminDashboard() {
  return (
    <div>
      <PageTitle title='Dashboard' />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {shortcuts.map((shortcut) => (
          <ShortcutCard
            key={shortcut.title}
            url={shortcut.url}
            title={shortcut.title}
            description={shortcut.description}
          />
        ))}
      </div>
    </div>
  );
}
