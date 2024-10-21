import Calendar from "@/components/Calendar";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Calendar QR Code Generator</h1>
      <Calendar />
    </div>
  );
}
