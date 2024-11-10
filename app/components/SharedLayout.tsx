import Link from 'next/link';

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* 侧边导航栏 */}
      <nav className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
        <Link href="/" className="block mb-4 font-bold">
          首页
        </Link>
        {/* 添加更多导航项 */}
      </nav>
      
      <div className="flex-1 flex flex-col">
        {/* 顶部操作区 */}
        {/* <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        </header> */}
        
        {/* 主内容区 */}
        <main className="flex-1 overflow-auto px-4">
          {children}
        </main>
      </div>
    </div>
  );
}