import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

import metadata from './incrementor.json';

function App() {
  const [api, setApi] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [count, setCount] = useState(0);
  const [incrementBy, setIncrementBy] = useState(1);
  const [error, setError] = useState('');

   // Initialize API and contract with error handling
   useEffect(() => {
    const connect = async () => {
      try {
        const wsProvider = new WsProvider('wss://rpc.shibuya.astar.network');
        const api = await ApiPromise.create({ 
          provider: wsProvider,
          types: {
            Address: 'AccountId',
            LookupSource: 'AccountId',
          }
        });
        
        const contract = new ContractPromise(
          api,
          metadata,
          'YOUR_CONTRACT_ADDRESS' // Replace with actual address
        );
        
        setApi(api);
        setContract(contract);
        setError('');
      } catch (err) {
        setError(`Connection failed: ${err.message}`);
      }
    };
    
    connect();
  }, []);

  // Updated connect wallet with error handling
  const connectWallet = async () => {
    try {
      const extensions = await web3Enable('Incrementor DApp');
      if (extensions.length === 0) {
        throw new Error('No extension installed');
      }
      
      const accounts = await web3Accounts();
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }
      
      setAccount(accounts[0]);
      setError('');
    } catch (err) {
      setError(`Wallet connection failed: ${err.message}`);
    }
  };

  // Get current count
  const getCount = async () => {
    if (!contract) return;
    
    const { output } = await contract.query.getCount(account.address, {});
    setCount(output.toNumber());
  };

  // Increment count
  const increment = async () => {
    if (!contract || !account) return;

    await contract.tx
      .increment({ value: 0, gasLimit: -1 }, incrementBy)
      .signAndSend(account.address, (result) => {
        if (result.status.isInBlock) {
          console.log('Transaction included in block');
          getCount(); // Refresh count
        }
      });
  };

  // Reset count
  const reset = async () => {
    if (!contract || !account) return;

    await contract.tx
      .reset({ value: 0, gasLimit: -1 })
      .signAndSend(account.address, (result) => {
        if (result.status.isInBlock) {
          console.log('Reset transaction included in block');
          getCount(); // Refresh count
        }
      });
  };

  return (
    <div className="App">
      <h1>Incrementor DApp</h1>
      
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {account.meta.name}</p>
          <div>
            <h2>Current Count: {count}</h2>
            <button onClick={getCount}>Refresh Count</button>
          </div>
          
          <div>
            <input
              type="number"
              value={incrementBy}
              onChange={(e) => setIncrementBy(Number(e.target.value))}
            />
            <button onClick={increment}>Increment</button>
          </div>
          
          <div>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
