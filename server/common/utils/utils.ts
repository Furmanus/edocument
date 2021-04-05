import { finished } from 'stream';
import ReadWriteStream = NodeJS.ReadWriteStream;

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
