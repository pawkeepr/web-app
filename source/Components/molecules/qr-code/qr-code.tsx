import React from 'react';
import QRCode from 'qrcode.react';

interface QRCodeProps {
  data: string; // Os dados que serão codificados no QR code
}

const QRCodeGenerator: React.FC<QRCodeProps> = ({ data }) => {
  return (
    <div>
      <QRCode value={data} />
    </div>
  );
};

export default QRCodeGenerator;