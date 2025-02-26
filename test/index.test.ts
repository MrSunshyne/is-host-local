import { isHostLocal } from '../src/index';
import { exec } from 'node:child_process';
import { vi } from 'vitest';

vi.mock('node:child_process', () => ({
  exec: vi.fn()
}));

describe('isHostLocal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return true for localhost (127.0.0.1)', async () => {
    const mockExec = vi.mocked(exec);
    mockExec.mockImplementation((_command, options, callback) => {
      const cb = typeof options === 'function' ? options : callback;
      if (cb) {
        cb(null, 'PING localhost (127.0.0.1): 56 data bytes', '');
      }
      return {} as any;
    });

    const result = await isHostLocal('localhost');
    expect(result).toBe(true);
  });

  it('should return true for private IP (192.168.1.1)', async () => {
    const mockExec = vi.mocked(exec);
    mockExec.mockImplementation((_command, options, callback) => {
      const cb = typeof options === 'function' ? options : callback;
      if (cb) {
        cb(null, 'PING router.local (192.168.1.1): 56 data bytes', '');
      }
      return {} as any;
    });

    const result = await isHostLocal('router.local');
    expect(result).toBe(true);
  });

  it('should return false for public domain', async () => {
    const mockExec = vi.mocked(exec);
    mockExec.mockImplementation((_command, options, callback) => {
      const cb = typeof options === 'function' ? options : callback;
      if (cb) {
        cb(null, 'PING google.com (142.250.185.78): 56 data bytes', '');
      }
      return {} as any;
    });

    const result = await isHostLocal('google.com');
    expect(result).toBe(false);
  });

  it('should return null on error', async () => {
    const mockExec = vi.mocked(exec);
    mockExec.mockImplementation((_command, options, callback) => {
      const cb = typeof options === 'function' ? options : callback;
      if (cb) {
        cb(new Error('ping: cannot resolve host'), '', 'ping: cannot resolve host');
      }
      return {} as any;
    });

    const result = await isHostLocal('nonexistent.domain');
    expect(result).toBe(null);
  });

  it('should return true for other private IP ranges (10.x.x.x)', async () => {
    const mockExec = vi.mocked(exec);
    mockExec.mockImplementation((_command, options, callback) => {
      const cb = typeof options === 'function' ? options : callback;
      if (cb) {
        cb(null, 'PING internal.network (10.0.0.1): 56 data bytes', '');
      }
      return {} as any;
    });

    const result = await isHostLocal('internal.network');
    expect(result).toBe(true);
  });

  it('should return true for other private IP ranges (172.16-31.x.x)', async () => {
    const mockExec = vi.mocked(exec);
    mockExec.mockImplementation((_command, options, callback) => {
      const cb = typeof options === 'function' ? options : callback;
      if (cb) {
        cb(null, 'PING vpn.local (172.16.0.1): 56 data bytes', '');
      }
      return {} as any;
    });

    const result = await isHostLocal('vpn.local');
    expect(result).toBe(true);
  });
});
