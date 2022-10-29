if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
  function con(){
    ethereum.request({ method: 'eth_requestAccounts' });
}
