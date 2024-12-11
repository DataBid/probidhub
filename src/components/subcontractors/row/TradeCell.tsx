import { getTradeIcon, getTradeColor } from "../utils/tradeUtils";

interface TradeCellProps {
  trade: string;
}

export const TradeCell = ({ trade }: TradeCellProps) => {
  const TradeIcon = getTradeIcon(trade);
  const tradeColor = getTradeColor(trade);

  return (
    <div className="flex items-center space-x-2">
      <TradeIcon className={`h-4 w-4 ${tradeColor}`} />
      <span>{trade}</span>
    </div>
  );
};