"use client";
// components/Calendar.tsx
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
// import QRCode from 'react-qr-code'; // Use react-qr-code instead
import "react-datepicker/dist/react-datepicker.css";
// import QRCode from "./QRCode";

// import { QrCode } from "@/third-party/qrcodegen/";
// import * as QRCodeGen from "@/third-party/qrcodegen/index"
import { qrcodegen } from "@/third-party/qrcodegen/index";

// Returns a string of SVG code for an image depicting the given QR Code, with the given number
// of border modules. The string always uses Unix newlines (\n), regardless of the platform.

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [qrCodeValue, setQrCodeValue] = useState<string>("");
  const [qrCodeObjectValue, setQrCodeObjectValue] = useState(Object); // fix this

  const handleGenerateQRCode = () => {
    if (selectedDate) {
      console.log('selectedDate::: ', selectedDate)
      const calendarInvite = generateICSFile(selectedDate);
      // Wrap the ICS data in a `data:text/calendar` URI
      // const dataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(
      //   calendarInvite
      // )}`;

      /* 
        Look at what tpe of data the calendar is passing it, and choose the correct method, "encode..." 

        S/b able to encode text here.

        Look at line 262: https://github.com/zpao/qrcode.react/blob/trunk/src/index.tsx

        490 starts the SVG code, maybe we can inject the encoded data into that?

      */

      const qrCode = qrcodegen.QrCode.encodeText(
        calendarInvite,
        qrcodegen.QrCode.Ecc.MEDIUM
      );

      setQrCodeValue(calendarInvite);

      setShowQRCode(true);
      console.log("calendarInvite::: ", calendarInvite);
      console.log('calendar invite end')
      console.log( calendarInvite);

      console.log("qrCode::: ", qrCode);
      setQrCodeObjectValue(qrCode);
      return qrCode;
    }

    /* 
      insert error handling here
    */
  };

  useEffect(() => {
    console.log("showQRCode1, qrCodeValue1::: ", showQRCode, qrCodeValue);
  });

  const generateICSFile = (date: Date): string => {
    const startDate = formatDateToICS(date);
    const endDate = formatDateToICS(new Date(date.getTime() + 60 * 60 * 1000)); // 1-hour event

    const icsData = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:No Obligation Consultation with Trinity Solar
DESCRIPTION:Whatever you want.  All the text in this section is customizable.
LOCATION:Put whatever you want here.
END:VEVENT
END:VCALENDAR
    `.trim();

    console.log("icsData:::", icsData);

    return icsData;
  };

  const formatDateToICS = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = "00";

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Select Date and Time</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        className="border rounded-md p-2 mb-4 border-8 border-red-500"
      />
      <button
        onClick={handleGenerateQRCode}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate QR Code
      </button>

      {showQRCode && qrCodeValue && (
        <div className="flex flex-col items-center bg-gray-100 mt-10">
          <div id="qr-code"> </div>
          
          {/* <QRCode value={qrCodeValue} /> */}
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
                    // x={colIndex * moduleSize}
                    // y={rowIndex * moduleSize}
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
      )}
      {/* {showQRCode && qrCodeValue && (
        <div className="mt-6 flex flex-col items-center">
          <QRCode value={qrCodeValue} className="mb-4" />
          <p>Scan the QR code to add the event to your calendar.</p>
        </div>
      )} */}
    </div>
  );
};

export default Calendar;
