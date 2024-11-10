'use client';

import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { GridApi } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
// import { format } from 'date-fns';

type ColumnDef = {
  field: string;
}

interface DataGridProps {
  moduleName: string;
  initialDate: string;
  columnDefs: ColumnDef[];
}

export default function DataGrid({ moduleName, initialDate, columnDefs }: DataGridProps) {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [currentDate, setCurrentDate] = useState(initialDate);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rowData, setRowData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRows: 0,
    filteredRows: 0,
    currentRow: 0
  });

  const gridOptions = {
    columnDefs,
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      resizable: true,
      filter: true,
      sortable: true
    },
    pagination: true,
    paginationPageSize: 100,
    enableCellTextSelection: true
  };

  // const createHyperlink = (params: any) => {
  //   if (!params.value) return '';
  //   const row = params.node.data;
  //   const url = `/instock/data/indicators?code=${row.code}&date=${format(new Date(row.date), 'yyyy-MM-dd')}&name=${row.name}`;
  //   return <a href={url} target="_blank" rel="noopener noreferrer">{params.value}</a>;
  // };

  const loadData = async () => {
    try {
      const response = await fetch(`http://localhost:9988/instock/api_data?name=cn_stock_selection&date=2024-11-07`);
      const data = await response.json();
      console.log(data);
      setRowData(data);
      updateStatusBar();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const updateStatusBar = () => {
    if (!gridApi) return;
    
    const totalRows = gridApi.getModel().getRowCount();
    const filteredRows = gridApi.getDisplayedRowCount();
    const selectedRow = gridApi.getSelectedRows().length > 0 ?
      ((gridApi.getSelectedNodes()[0] as { rowIndex: number }).rowIndex + 1 as number) : 0;

    setStats({
      totalRows,
      filteredRows,
      currentRow: selectedRow
    });
  };

  const exportToExcel = () => {
    if (!gridApi) return;
    gridApi.exportDataAsExcel({
      fileName: `${moduleName}${currentDate}.xlsx`
    });
  };

  const resetFilter = () => {
    if (!gridApi) return;
    gridApi.setFilterModel(null);
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <div className="h-full overflow-hidden">
      <div className="w-full h-9 flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span>{moduleName}</span>
          <span>日期：</span>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="form-input px-2 py-1 border rounded"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetFilter}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            重置筛选
          </button>
          <button
            onClick={exportToExcel}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            导出Excel
          </button>
        </div>
      </div>

      <div className="ag-theme-alpine h-[calc(100%-7rem)]">
        <AgGridReact
          {...gridOptions}
          rowSelection={'single'}
          rowData={rowData}
          onGridReady={params => setGridApi(params.api)}
          onFilterChanged={updateStatusBar}
          onRowSelected={updateStatusBar}
        />
      </div>

      <div className="h-5 mt-2 text-sm">
        总记录/筛选记录：<b>{stats.totalRows}</b> / <b>{stats.filteredRows}</b> 条 
        - 当前位置：第 <b>{stats.currentRow}</b> 行
      </div>
    </div>
  );
} 