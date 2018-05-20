import {HttpHeaders, HttpParams} from "@angular/common/http";

export class Utilz {

  static getUrl(protocol: string, base: string, port: string, parts: string[]): string {

    let url: string = "".concat(protocol, "://", base, ":", port);

    parts.forEach(part => {

      url = url.concat("/", part);

    });

    return url;

  }

  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

}
