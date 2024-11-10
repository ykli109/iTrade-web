import { format } from "date-fns";

interface ColumnDef {
    field: string;
    headerName: string;
    sortable: boolean;
    filter: boolean;
    pinned?: 'left' | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellRenderer?: (params: any) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellStyle?: (params: any) => { color?: string } | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createHyperlink = (params: any) => {
  if (!params.value) return '';
  const row = params.node.data;
  const url = `/instock/data/indicators?code=${row.code}&date=${format(new Date(row.date), 'yyyy-MM-dd')}&name=${row.name}`;
  return <a href={url} target="_blank" rel="noopener noreferrer">{params.value}</a>;
};

export function createColumnDefs(cols: { [key: string]: { cn: string } }): ColumnDef[] {
    return Object.keys(cols).map(k => {
        const col = cols[k];
        const columnDef: ColumnDef = {
            field: k,
            headerName: col.cn,
            sortable: true,
            filter: true,
            pinned: ['date', 'code', 'name'].includes(k) ? 'left' : null,
            cellRenderer: k === 'code' ? createHyperlink : undefined,
        };

        columnDef.cellStyle = params => {
            const numericColumns = ['change_rate', 'ups_downs', 'speed_increase', 
                                    'speed_increase_5', 'speed_increase_60', 'speed_increase_all'];
            if (k === 'change_rate') {
                if (params.value > 0) return { color: 'red' };
                if (params.value < 0) return { color: 'green' };
            } else if (numericColumns.includes(k)) {
                if (params.value > 0) return { color: 'red' };
                if (params.value < 0) return { color: 'green' };
            }
            return null;
        };

        return columnDef;
    });
}
