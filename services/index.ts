export type TransactionDto = {
  id: string;
  buyerId: string;
  sellerId: string;
  escrowAgentId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type UserDto = {
  id: string
  email: string
}
