import { BigNumber, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import {
  FeeLevel,
  PeerType,
  TransactionArguments,
  TransactionOperation,
} from "fireblocks-sdk";
import { buildTypedData } from "./typedData";

export function buildOnetimeAddressTransferArgs(
  destAddress: string,
  amount: string,
  feeLevel: FeeLevel,
  gasLimit?: string,
): TransactionArguments {
  return {
    operation: TransactionOperation.TRANSFER,
    destination: {
      type: PeerType.ONE_TIME_ADDRESS,
      oneTimeAddress: { address: destAddress },
    },
    amount,
    feeLevel,
    gasLimit,
  };
}
export function buildAccountTransferArgs(
  walletId: string,
  accountId: string,
  amount: string,
  feeLevel: FeeLevel,
  gasLimit?: string,
): TransactionArguments {
  return {
    operation: TransactionOperation.TRANSFER,
    destination: {
      type: PeerType.END_USER_WALLET,
      id: accountId,
      walletId,
    },
    amount,
    feeLevel,
    gasLimit,
  };
}
export function buildTestTypedDataArgs(): TransactionArguments {
  return {
    operation: TransactionOperation.TYPED_MESSAGE,
    extraParameters: {
      rawMessageData: {
        messages: [
          {
            type: "EIP712",
            content: buildTypedData(),
          },
        ],
      },
    },
  };
}
export function buildTypedDataArgs(raw: {
  types: Record<string, { name: string; type: string }[]>;
  domain: Record<string, string | number>;
  message: Record<string, string | number>;
}): TransactionArguments {
  return {
    operation: TransactionOperation.TYPED_MESSAGE,
    extraParameters: {
      rawMessageData: {
        messages: [
          {
            type: "EIP712",
            content: raw,
          },
        ],
      },
    },
  };
}

export function buildContractCallArgs(
  transaction: ethers.providers.TransactionRequest,
): TransactionArguments {
  return {
    operation: transaction.data
      ? TransactionOperation.CONTRACT_CALL
      : TransactionOperation.TRANSFER,
    fee: undefined,
    maxFee: transaction.maxFeePerGas
      ? BigNumber.from(transaction.maxFeePerGas).toString()
      : undefined,
    priorityFee: transaction.maxPriorityFeePerGas
      ? BigNumber.from(transaction.maxPriorityFeePerGas).toString()
      : undefined,
    gasLimit: transaction.gasLimit
      ? BigNumber.from(transaction.gasLimit).toString()
      : undefined,
    feeLevel: undefined,

    destination: {
      type: PeerType.ONE_TIME_ADDRESS,
      oneTimeAddress: {
        address: typeof transaction.to === "string" ? transaction.to : "0x0",
      },
    },
    externalTxId: undefined,
    amount: formatEther(BigNumber.from(transaction.value ?? "0")?.toString()),
    extraParameters: transaction.data
      ? {
          contractCallData: transaction.data,
        }
      : undefined,
  };
}
