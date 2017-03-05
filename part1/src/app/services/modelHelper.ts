export class ModelHelperService {
  public static extractIdFromUrl(url: string): number {
    url += url.endsWith('/') ? '' : '/';

    const parts = url.split('/');

    return +parts[parts.length - 2];
  }
}
