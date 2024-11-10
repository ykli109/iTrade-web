import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const date = searchParams.get('date');
  console.log(name, date);
  
  // 实现数据获取逻辑
  // const data = await fetchInstockData(name, date);
  
  // 先用写死的数据
  const data = [
    {
      code: '000001',
      name: '平安银行',
      date: '2024-01-10',
      price: 10.25,
      change: 2.5,
      volume: 123456,
      amount: 1234567.89,
      turnover: 1.23,
      pe: 12.34,
      pb: 1.45
    },
    {
      code: '600000', 
      name: '浦发银行',
      date: '2024-01-10',
      price: 8.88,
      change: -1.2,
      volume: 98765,
      amount: 876543.21,
      turnover: 0.98,
      pe: 8.76,
      pb: 0.89
    },
    {
      code: '601318',
      name: '中国平安',
      date: '2024-01-10', 
      price: 45.67,
      change: 0.8,
      volume: 234567,
      amount: 9876543.21,
      turnover: 2.34,
      pe: 15.67,
      pb: 2.34
    }
  ];
  
  
  return NextResponse.json(data);
} 