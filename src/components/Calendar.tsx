'use client'
// components/Calendar.tsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import QRCode from 'react-qr-code'; // Use react-qr-code instead
import 'react-datepicker/dist/react-datepicker.css';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [qrCodeValue, setQrCodeValue] = useState<string>('');

  const handleGenerateQRCode = () => {
    if (selectedDate) {
      const calendarInvite = generateICSFile(selectedDate);
      const encodedData = `data:text/calendar;base64,${btoa(calendarInvite)}`;
      setQrCodeValue(encodedData);
      setShowQRCode(true);
    }
  };

  const generateICSFile = (date: Date): string => {
    const startDate = formatDateToICS(date);
    const endDate = formatDateToICS(new Date(date.getTime() + 60 * 60 * 1000)); // 1-hour event

    const icsData = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:Your Event Name
DESCRIPTION:Event description here
LOCATION:Your event location
END:VEVENT
END:VCALENDAR
    `.trim();

    console.log('icsData:::', icsData)
    return icsData;
  };

  const formatDateToICS = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';

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
        className="border rounded-md p-2 mb-4"
      />
      <button
        onClick={handleGenerateQRCode}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate QR Code
      </button>

      {showQRCode && qrCodeValue && (
        <div className="mt-6 flex flex-col items-center">
          <QRCode value={qrCodeValue} className="mb-4" />
          <p>Scan the QR code to add the event to your calendar.</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
