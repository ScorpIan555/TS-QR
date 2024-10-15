import Calendar from "@/components/Calendar";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Calendar QR Code Generator</h1>
      <p>The final version will look nicer.  This is a prototype/proof of concept.</p>
      <p>Anything can go here.</p>
      <p></p>
      <Calendar />
    </div>
  );
}
