import QRCode from 'qrcode.react';

interface Props {
    url: string;
}

const QRCodeGenerator = ({ url }: Props) => {
    return (
        <div>
            <QRCode value={url} />
        </div>
    );
};

export default QRCodeGenerator;
