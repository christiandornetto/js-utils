export class Guid {
  private static validator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');

  public static EMPTY = '00000000-0000-0000-0000-000000000000';

  public static isGuid(guid: any) {
    const value: string = guid.toString();
    return guid && (guid instanceof Guid || Guid.validator.test(value));
  }

  public static new(): string {
    if (typeof window !== 'undefined' && typeof window.crypto !== 'undefined' && typeof window.crypto.getRandomValues !== 'undefined') {
      let buf: Uint16Array = new Uint16Array(8);
      window.crypto.getRandomValues(buf);
      return (
        this.pad4(buf[0]) +
        this.pad4(buf[1]) +
        '-' +
        this.pad4(buf[2]) +
        '-' +
        this.pad4(buf[3]) +
        '-' +
        this.pad4(buf[4]) +
        '-' +
        this.pad4(buf[5]) +
        this.pad4(buf[6]) +
        this.pad4(buf[7])
      );
    } else {
      return this.random4() + this.random4() + '-' + this.random4() + '-' + this.random4() + '-' + this.random4() + '-' + this.random4() + this.random4() + this.random4();
    }
  }

  private static pad4(num: number): string {
    let ret: string = num.toString(16);
    while (ret.length < 4) {
      ret = '0' + ret;
    }
    return ret;
  }

  private static random4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
