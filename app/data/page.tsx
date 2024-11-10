import DataGrid from '@/app/components/DataGrid';

export default function InstockPage() {
  const columnDefs = [
    // 根据实际需求配置列定义
    { 
      field: 'code',
      headerName: '代码',
      sortable: true,
      filter: true,
      pinned: 'left',
      cellRenderer: 'createHyperlink'
    },
    // ... 其他列定义
  ];

  return (
    <div className="h-screen pt-4">
      <DataGrid
        moduleName="股票数据"
        initialDate={new Date().toISOString().split('T')[0]}
        columnDefs={columnDefs}
      />
    </div>
  );
} 