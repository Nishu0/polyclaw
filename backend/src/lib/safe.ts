import { getAddress } from "viem";
import { getContractConfig } from "@polymarket/builder-relayer-client/dist/config/index.js";
import { deriveSafe } from "@polymarket/builder-relayer-client/dist/builder/derive.js";

export function derivePolymarketSafeAddress(ownerEoa: string, chainId = 137): string {
  const owner = getAddress(ownerEoa);
  const contracts = getContractConfig(chainId);
  return deriveSafe(owner, contracts.SafeContracts.SafeFactory);
}
