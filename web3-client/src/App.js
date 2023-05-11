import "./App.css";
import Web3 from "web3";
import {useEffect, useState} from "react";

function App() {

  const [result, setResult] = useState();
  const [result2, setResult2] = useState();
  const [address, setAddress] = useState('');

  useEffect(() => {
  }, []);

    async function signIn() {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(() => {
                window.web3 = new Web3(window.ethereum);
            });
        }
        return false;
    }

    async function getAccounts() {
        const accounts = await window.web3.eth.getAccounts();
        setAddress(accounts[0])
        console.log(accounts);
    }

    async function sendTx() {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      web3.eth.sendTransaction(
          {
            from: accounts[0],
            to: '0x89995e30DAB8E3F9113e216EEB2f44f6B8eb5730',
            value: web3.utils.toWei('1', 'ether'),
            gas: 21000,
            gasPrice: web3.utils.toWei('1000', 'gwei'),
          }).then((x) => {
            setResult(x.transactionHash);
            console.log(x);
      }).catch(e => {
        console.error(e);
      })
    }

    async function sendERC20() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        // deployed address
        const contractAddress = '0x0dAb17934F94EFFaBa5E3CBDCe556f352c440D84';
        // application binary interface
        const contractABI = [
            // transfer
            {
                'constant': false,
                'inputs': [
                    {
                        'name': '_to',
                        'type': 'address'
                    },
                    {
                        'name': '_value',
                        'type': 'uint256'
                    }
                ],
                'name': 'transfer',
                'outputs': [
                    {
                        'name': '',
                        'type': 'bool'
                    }
                ],
                'type': 'function'
            }
        ]
        let contract = new web3.eth.Contract(contractABI, contractAddress, { from: accounts[0] });
        contract.methods.transfer('0x89995e30DAB8E3F9113e216EEB2f44f6B8eb5730', 1).send().then((x) => {
            setResult2(x.transactionHash);
        }).catch(e => {
            console.error(e);
        });

    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => signIn()}>signIn</button>
                <button onClick={() => getAccounts()}>get accounts</button>
                <p >{address}</p>
                <button onClick={() => sendTx()}>send</button>
              {result && <a style={{color: 'white'}}　href={`https://explorer-testnet.corexchain.io/transactions/${result}`}
                            target='_blank' rel='noopener noreferrer'>{result}</a>}

                <button onClick={() => sendERC20()}>send ERC20</button>
                {result2 && <a style={{color: 'white'}} href={`https://explorer-testnet.corexchain.io/transactions/${result2}`}
                              target='_blank' rel='noopener noreferrer'>{result2}</a>}
            </header>
        </div>
    );
}

export default App;
