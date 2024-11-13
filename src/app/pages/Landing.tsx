"use client"

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { qrcodegen } from "@/third-party/qrcodegen/index";
import QRCodeComponent from "@/components/QRCodeComponent";

export default function Landing() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [qrCodeValue, setQrCodeValue] = useState<string>("");
  const [qrCodeObjectValue, setQrCodeObjectValue] = useState(Object);

  const handleGenerateQRCode = () => {
    if (selectedDate) {
      const calendarInvite = generateICSFile(selectedDate);

      const qrCode = qrcodegen.QrCode.encodeText(
        calendarInvite,
        qrcodegen.QrCode.Ecc.MEDIUM
      );

      setQrCodeValue(calendarInvite);
      setShowQRCode(true);
      console.log(calendarInvite);

      setQrCodeObjectValue(qrCode);
      return qrCode;
    }
  };

  const generateICSFile = (date: Date): string => {
    const startDate = formatDateToICS(date);
    const endDate = formatDateToICS(new Date(date.getTime() + 60 * 60 * 1000)); // 1-hour event

    const icsData = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;TZID=America/New_York:${startDate}
DTEND;TZID=America/New_York:${endDate}
SUMMARY:No Obligation Consultation with Trinity Solar
DESCRIPTION:Whatever you want.  All the text in this section is customizable.
LOCATION:Put whatever you want here.
END:VEVENT
END:VCALENDAR
    `.trim();

    return icsData;
  };

  const formatDateToICS = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = "00";

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Appointment Generator</h1>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Select Date and Time</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border rounded-md p-2 mb-4 border-8 border-black text-black"
        />
        <button
          onClick={handleGenerateQRCode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate QR Code
        </button>

        {showQRCode && qrCodeValue && (
          <QRCodeComponent qrCodeObjectValue={qrCodeObjectValue} />
        )}
      </div>
    </div>
  );
}
