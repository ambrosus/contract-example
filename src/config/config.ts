export interface Config {
  web3Rpc: string;

  defaultGas: number;
  defaultGasPrice: string;

  gitCommit: string | undefined;

  creatorPrivateKey: string | undefined;
  ownerPrivateKey: string | undefined;
}

const config: Readonly<Config> = Object.freeze({
  web3Rpc: process.env.WEB3_RPC || '',

  defaultGas: Number(process.env.DEFAULT_GAS) || 4000000,
  defaultGasPrice: String(process.env.DEFAULT_GAS_PRICE) || '30000000000000',

  gitCommit: process.env.GIT_COMMIT,

  creatorPrivateKey: process.env.WEB3_CREATOR_PRIVATEKEY,
  ownerPrivateKey: process.env.WEB3_OWNER_PRIVATEKEY
});

export default config;
