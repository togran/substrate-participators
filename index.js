const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const util = require('util');

const start = process.argv[2];
const end = process.argv[3];

async function main () {
  const provider = new WsProvider('ws://127.0.0.1:9949');
  const api = await ApiPromise.create({ provider });
  const rewards={}, eras={};

  for (let e=start; e<end; e++){
    const now = await api.query.timestamp.now();
    const eraRewards = await api._query.staking.erasRewardPoints(e)
    eras[e]=eraRewards.toHuman();
  }
  for (let e=start; e<end; e++){
    for (let v in eras[e].individual){
      if(rewards[v]===undefined)rewards[v]=0;
      rewards[v]++;
    }
  }
  console.log(JSON.stringify(rewards))
  process.exit(0);
}

main()