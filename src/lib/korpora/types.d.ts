declare module "archiver" {
  import { Writable } from "stream";
  
  interface ArchiverOptions {
    zlib?: { level?: number };
  }
  
  interface Archiver {
    pipe(stream: Writable): void;
    file(path: string, options?: { name?: string }): void;
    finalize(): void;
    on(event: "error", callback: (err: Error) => void): void;
  }
  
  function archiver(format: string, options?: ArchiverOptions): Archiver;
  export = archiver;
}

