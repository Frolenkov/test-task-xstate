import { render, cleanup, screen } from '@testing-library/react';
import FileShortcut from './FileShortcut';

afterEach(cleanup);

describe('FileShortcut', () => {
    it('should render the name of the file', () => {
        const file = {
            lastModified: 1599459945,
            lastModifiedDate: new Date(),
            name: 'test.txt',
            size: 1024,
            type: 'text/plain',
            webkitRelativePath: 'test.txt'
        }
        render(<FileShortcut file={file} />);
        expect(screen.getByText('Name: test.txt')).toBeInTheDocument();
    });
});