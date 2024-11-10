import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404 - 页面未找到</h1>
      <p className="mt-4 text-lg">抱歉，您访问的页面不存在。</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        返回首页
      </Link>
    </div>
  );
} 