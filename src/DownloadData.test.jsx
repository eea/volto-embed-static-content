import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Download from './DownloadData';
import { downloadDataURL, getFileExtension } from './helpers';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./helpers', () => ({
  downloadDataURL: jest.fn(),
  getFileExtension: jest.fn(() => 'png'),
}));

describe('Download component', () => {
  const props = {
    file: 'test-file-url',
    fileName: 'test-file.csv',
    data: {
      preview_image: {
        download: 'test-image.png',
        filename: 'test-image.png',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with the download button', () => {
    render(<Download {...props} />);

    const button = screen.getByText('Download');
    expect(button).toBeInTheDocument();
  });

  it('opens the popup when the download button is clicked', () => {
    render(<Download {...props} />);

    const button = screen.getByText('Download');
    fireEvent.click(button);

    expect(screen.getByText('Chart')).toBeInTheDocument();
  });

  it('triggers downloadDataURL for file when File download button is clicked', () => {
    render(<Download {...props} />);

    // Click pe butonul de download pentru a deschide popup-ul
    const button = screen.getByText('Download');
    fireEvent.click(button);

    const fileButton = screen.getByText('CSV');
    fireEvent.click(fileButton);

    expect(downloadDataURL).toHaveBeenCalledWith(
      'test-file-url',
      'test-file.csv',
    );
  });

  it('triggers downloadDataURL for image when Chart download button is clicked', () => {
    render(<Download {...props} />);

    const button = screen.getByText('Download');
    fireEvent.click(button);
    const imageButton = screen.getByText('PNG');
    fireEvent.click(imageButton);

    expect(downloadDataURL).toHaveBeenCalledWith(
      'test-image.png',
      'test-image.png',
    );
  });

  it('closes the popup when clicking outside', () => {
    render(<Download {...props} />);

    const button = screen.getByText('Download');
    fireEvent.click(button);

    expect(screen.getByText('Chart')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText('Chart')).not.toBeInTheDocument();
  });
});
