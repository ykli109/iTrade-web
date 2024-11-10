export type WebModuleData = {
    mode: string;
    type: string;
    ico: string;
    name: string;
    table_name: string;
    columns: string[];
    column_names: string[];
    primary_key: string[];
    is_realtime: boolean;
    order_columns?: string;
    order_by?: string;
};

// 定义外部变量
export const TABLE_CN_STOCK_SELECTION = {
    cn: "综合选股",
    name: "cn_stock_selection",
    columns: ["code", "name", "price", "volume"] // 示例列
};

export const TABLE_CN_STOCK_SPOT = {
    cn: "股票基本数据",
    name: "cn_stock_spot",
    columns: ["code", "name", "price", "market_cap"] // 示例列
};

// 其他表结构定义...
export const TABLE_CN_STOCK_FUND_FLOW = { /* ... */ };
export const TABLE_CN_STOCK_BONUS = { /* ... */ };
export const TABLE_CN_STOCK_TOP = { /* ... */ };
export const TABLE_CN_STOCK_BLOCKTRADE = { /* ... */ };
export const TABLE_CN_STOCK_FUND_FLOW_INDUSTRY = { /* ... */ };
export const TABLE_CN_STOCK_FUND_FLOW_CONCEPT = { /* ... */ };
export const TABLE_CN_ETF_SPOT = { /* ... */ };
export const TABLE_CN_STOCK_INDICATORS = { /* ... */ };
export const TABLE_CN_STOCK_INDICATORS_BUY = { /* ... */ };
export const TABLE_CN_STOCK_INDICATORS_SELL = { /* ... */ };
export const TABLE_CN_STOCK_KLINE_PATTERN = { /* ... */ };
export const TABLE_CN_STOCK_SPOT_BUY = { /* ... */ };
export const TABLE_CN_STOCK_STRATEGIES = [ /* ... */ ]; // 示例策略数据

export function getFieldCns(columns: string[]): string[] {
    // 根据列名获取中文名称的逻辑
    return columns.map(col => col); // 示例，实际逻辑需要实现
} 