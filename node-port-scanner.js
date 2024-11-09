import net from 'net';

export const nodePortScanner = (host, ports) => {
  return new Promise((resolve, reject) => {
  
    const connectToPort = (host, port, callback) => {
      
      let socket = new net.Socket();
      let timeout = 200;
      
      socket._scan = {};
      socket._scan.status = 'initialized';
      socket._scan.host = host;
      socket._scan.port = port;
      socket._scan._events = { complete : callback };
      
      socket.on('connect', function () {
        this._scan.status = 'connect';
        socket.destroy();
      });
      socket.on('timeout', function () {
        this._scan.status = 'timeout';
        socket.destroy();
      });
      socket.on('error', function (exception) {
        this._scan.status = 'error';
        socket.destroy();
      });
      socket.on('close', function (exception) {
        this._scan._events.complete(this._scan);
      });
      
      socket.setTimeout(timeout);
      socket.connect(port, host);
      
    };
  
    const connectToPorts = (host, ports, scanResults) => {
      let port = ports.shift();
      
      connectToPort(host, port, function (result) {
        
        if (result.status == 'connect') {
          scanResults.ports.open.push(result.port);
        } 
        else {
          scanResults.ports.closed.push(result.port);
        }
        
        if (ports.length) {
          connectToPorts(host, ports, scanResults);
        }
        else {
          resolve(scanResults.ports.open);
        }
        
      });
      
    };

    let scanResults = { 'host' : host, 'ports' : { 'open' : [], 'closed' : [] } };
    
    connectToPorts(host, ports, scanResults);
  
  });
  
};
