// type QRCodeComponentProps = {
//   modules: any
// }

/* 
  these types are probably already defined in the QR Code code somewhere and just need to be exported
  then imported here to be consumed correctly by this complex type

*/


const QRCodeComponent: React.FC = ({qrCodeObjectValue}) => { 

  console.log('qrCodeObjectValue:::', qrCodeObjectValue)
    return(
        <div className="flex flex-col items-center bg-gray-100 mt-10">
          <div id="qr-code"> </div>
          
          <svg
            width={"20rem"}
            height={"20rem"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${65} ${65}`}
          >
            {qrCodeObjectValue?.modules.map((row: unknown[], rowIndex: number) =>
              row.map((module, colIndex) =>
                module ? (
                  <rect
                    key={`${rowIndex}-${colIndex}`}                  
                    x={(colIndex * 65) / qrCodeObjectValue?.size}
                    y={(rowIndex * 65) / qrCodeObjectValue?.size}
                    width={65 / qrCodeObjectValue?.size}
                    height={65 / qrCodeObjectValue?.size}
                    fill="black"
                  />
                ) : null
              )
            )}
          </svg>
        </div>
    )
}

export default QRCodeComponent;