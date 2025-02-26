import { exec } from 'node:child_process';

/**
 * Checks if a hostname resolves to a local IP address
 * @param hostname The hostname to check
 * @returns Promise<boolean | null> - true if local, false if not local, null if error
 */
export async function isHostLocal(hostname: string): Promise<boolean | null> {
  return new Promise((resolve, _reject) => {
    exec(`ping ${hostname} -c 1 -t 1`, (error, stdout, _stderr) => {
      if (error) {
        console.error(`Error checking host for ${hostname}:`, error.message);
        resolve(null); // Indicate an error occurred
        return;
      }

      const localhostRegex = /PING .* \(127\.0\.0\.1\)/;
      const otherLocalRegex = /PING .* \((10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+|192\.168\.\d+\.\d+)\)/;

      if (localhostRegex.test(stdout) || otherLocalRegex.test(stdout)) {
        resolve(true); // Hostname resolved to localhost or other local IP
      } else {
        resolve(false); // Hostname resolved to a public IP or failed to resolve
      }
    });
  });
}

export default isHostLocal;
