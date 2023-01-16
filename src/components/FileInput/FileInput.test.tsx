import { render, fireEvent, screen } from '@testing-library/react';
import FileInput from './FileInput';

describe('FileInput', () => {
  it('should render the title', () => {
    const { getByText } = render(<FileInput />);
    expect(screen.getByText('Upload Files')).toBeInTheDocument();
  });

  it('should render the input field', () => {
    const { getByTestId } = render(<FileInput />);
    expect(screen.getByTestId('file-input')).toBeInTheDocument();
  });

  it('should call the getFileDirection API when a file is selected', () => {
    const { getByTestId } = render(<FileInput />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [new File([], 'test.jpg', { type: 'image/jpg' })] } });  });
});