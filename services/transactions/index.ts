export type TransactionDto = {
  id: number;
  buyerId: string;
  sellerId: string;
  escrowAgentId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
