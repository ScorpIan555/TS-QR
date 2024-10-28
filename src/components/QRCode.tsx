const GeneratedQRCode = ({ value }: { value: string }) => {
  return (
    <div style={{ background: "white", padding: "16px" }}>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={value}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};

export default GeneratedQRCode;
