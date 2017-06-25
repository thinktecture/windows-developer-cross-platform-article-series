import {BrowserShareService, CordovaShareService, ElectronShareService, ShareService} from './share';
import {ElectronService} from './electron';
import {instance, mock, verify, when} from 'ts-mockito';

describe('ShareService', () => {
  let sut: ShareService;

  describe('BrowserShareService', () => {
    beforeEach(() => {
      sut = new BrowserShareService();
    });

    describe('share', () => {
      it('uses window.open to open the mail client', done => {
        const spy = spyOn(window, 'open');

        sut.share('Foo', 'Bar')
          .then(() => {
            expect(spy).toHaveBeenCalledWith(jasmine.stringMatching('mailto:'), '_self');
            expect(spy).toHaveBeenCalledWith(jasmine.stringMatching('subject=Foo'), '_self');
            expect(spy).toHaveBeenCalledWith(jasmine.stringMatching('body=Bar'), '_self');
            done();
          });
      });
    });
  });

  describe('CordovaShareService', () => {
    beforeEach(() => {
      sut = new CordovaShareService();
    });

    describe('share', () => {
      it('calls cordova\'s social sharing plugin', done => {
        (window as any).plugins = {
          socialsharing: {
            shareWithOptions: (options, cb) => cb()
          }
        };

        const spy = spyOn(window.plugins.socialsharing, 'shareWithOptions').and.callThrough();

        sut.share('Foo', 'Bar')
          .then(() => {
            expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
              message: 'Bar',
              subject: 'Foo'
            }), jasmine.any(Function), jasmine.any(Function));

            done();
          });
      });
    });
  });

  describe('ElectronShareService', () => {
    let electronServiceMock: ElectronService;

    beforeEach(() => {
      electronServiceMock = mock(ElectronService);

      sut = new ElectronShareService(instance(electronServiceMock));
    });

    describe('share', () => {
      it('rejects, when electron is not available', done => {
        when(electronServiceMock.electron).thenReturn(void 0);

        sut.share('n/a', 'n/a')
          .then(
            () => {
              fail('Test should fail, since Electron is not available');
              done();
            },
            () => {
              done();
            }
          );

        verify(electronServiceMock.electron).once();
      });

      it('opens the mail client via electron shell', done => {
        const electron = {
          shell: {
            openExternal: jasmine.createSpy('openExternal').and.returnValue(true)
          }
        };

        when(electronServiceMock.electron).thenReturn(electron as any);

        sut.share('Foo', 'Bar')
          .then(
            () => {
              verify(electronServiceMock.electron).twice();
              expect(electron.shell.openExternal).toHaveBeenCalledWith(jasmine.stringMatching('mailto:'));
              expect(electron.shell.openExternal).toHaveBeenCalledWith(jasmine.stringMatching('subject=Foo'));
              expect(electron.shell.openExternal).toHaveBeenCalledWith(jasmine.stringMatching('body=Bar'));
              done();
            },
            () => {
              fail();
              done();
            });
      });
    });
  });
});
