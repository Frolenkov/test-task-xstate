import filesMachine from './filesMachine';

describe('filesMachine', () => {
    it('should transition to readyToUpload state when getURL event is triggered', () => {
        const files = [{lastModified: 1599459945,
            lastModifiedDate: new Date(),
            name: 'test.txt',
            size: 1024,
            type: 'text/plain',
            webkitRelativePath: 'test.txt'}];
        const state = filesMachine.transition('initial', 'getURL', {files});
        expect(state.value).toBe('readyToUpload');
    });

    it('should transition to uploadInProgress state when getDestinationURL service is done', () => {
        const state = filesMachine.transition('readyToUpload', {type: 'done', data: {id: '123', url: 'http://test.com'}});
        expect(state.value).toBe('uploadInProgress');
    });

    it('should transition to notify state when uploadFileService service is done', () => {
        const state = filesMachine.transition('uploadInProgress', {type: 'done', data: {}});
        expect(state.value).toBe('notify');
    });

    it('should transition to uploadError state when uploadFileService service is error', () => {
        const state = filesMachine.transition('uploadInProgress', {type: 'error', data: {}});
        expect(state.value).toBe('uploadError');
    });

    it('should transition to initial state when cancel event is triggered', () => {
        const state = filesMachine.transition('uploadError', 'cancel');
        expect(state.value).toBe('initial');
    });
});